import { NextResponse } from 'next/server';
import crypto from 'crypto';

function sha256(text: string): string {
  if (!text) return '';
  return crypto.createHash('sha256').update(text.trim().toLowerCase()).digest('hex');
}

function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, '');
}

function normalizeName(name: string): string {
  return name.trim().toLowerCase();
}

async function sendMetaCAPIEvent(
  pixelId: string,
  accessToken: string,
  eventData: {
    phone: string;
    name: string;
    isQualified: boolean;
    ipAddress: string;
    userAgent: string;
    referer: string;
  }
) {
  const { phone, name, isQualified, ipAddress, userAgent, referer } = eventData;

  const normalizedPhone = normalizePhone(phone);
  const normalizedName = normalizeName(name);

  // Split name into first and last name if possible
  const nameParts = normalizedName.split(/\s+/);
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const payload = {
    data: [
      {
        event_name: 'Lead',
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website',
        event_source_url: referer || 'https://cilexibiza.com',
        user_data: {
          ph: normalizedPhone ? [sha256(normalizedPhone)] : [],
          fn: firstName ? [sha256(firstName)] : [],
          ln: lastName ? [sha256(lastName)] : [],
          client_ip_address: ipAddress || undefined,
          client_user_agent: userAgent || undefined
        },
        custom_data: {
          lead_status: isQualified ? 'Qualified' : 'Normal',
          value: isQualified ? 100.00 : 30.00,
          currency: 'EUR'
        }
      }
    ]
  };

  const requestBody: any = {
    ...payload,
    access_token: accessToken
  };

  if (process.env.META_TEST_EVENT_CODE) {
    requestBody.test_event_code = process.env.META_TEST_EVENT_CODE;
  }

  try {
    const response = await fetch(`https://graph.facebook.com/v19.0/${pixelId}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Meta CAPI Error:', errorText);
    } else {
      const resData = await response.json();
      console.log('Meta CAPI Success:', resData);
    }
  } catch (error) {
    console.error('Meta CAPI Exception:', error);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { answers, score, contact } = body;

    const subdomain = process.env.KOMMO_SUBDOMAIN;
    const accessToken = process.env.KOMMO_ACCESS_TOKEN;
    const pipelineId = process.env.KOMMO_PIPELINE_ID;
    const statusEntry = process.env.KOMMO_STATUS_ENTRY;
    const statusQualified = process.env.KOMMO_STATUS_QUALIFIED;

    const metaPixelId = process.env.META_PIXEL_ID;
    const metaAccessToken = process.env.META_ACCESS_TOKEN;

    // Determine status based on score
    // >= 120 means qualified (as per our previous WhatsApp logic)
    const isQualified = score >= 120;

    // Trigger Meta Conversions API event in the background (non-blocking)
    if (metaPixelId && metaAccessToken && contact) {
      const ipAddress = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || req.headers.get('x-real-ip') || '';
      const userAgent = req.headers.get('user-agent') || '';
      const referer = req.headers.get('referer') || '';

      sendMetaCAPIEvent(metaPixelId, metaAccessToken, {
        phone: contact.phone || '',
        name: contact.name || '',
        isQualified,
        ipAddress,
        userAgent,
        referer
      }).catch(err => {
        console.error('Unhandled background Meta CAPI Error:', err);
      });
    }

    if (!subdomain || !accessToken || !pipelineId || !statusEntry || !statusQualified) {
      console.warn('Kommo integration is missing environment variables. Lead was not sent to CRM.');
      return NextResponse.json({ success: true, message: 'Simulated success (missing env vars)' });
    }

    const targetStatusId = isQualified ? parseInt(statusQualified) : parseInt(statusEntry);

    const payload = [
      {
        name: `Lead Ibiza: ${contact.name}`,
        pipeline_id: parseInt(pipelineId),
        status_id: targetStatusId,
        _embedded: {
          tags: [
            {
              name: "website-ale"
            }
          ],
          contacts: [
            {
              first_name: contact.name,
              custom_fields_values: [
                {
                  field_code: "PHONE",
                  values: [
                    {
                      value: contact.phone,
                      enum_code: "MOB"
                    }
                  ]
                },
                ...(contact.email ? [
                  {
                    field_code: "EMAIL",
                    values: [
                      {
                        value: contact.email,
                        enum_code: "PRIV"
                      }
                    ]
                  }
                ] : [])
              ]
            }
          ]
        }
      }
    ];

    const response = await fetch(`https://${subdomain}.kommo.com/api/v4/leads/complex`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Kommo API error:', errorData);
      return NextResponse.json({ success: false, error: 'Kommo API Error' }, { status: 500 });
    }

    const data = await response.json();
    const leadId = data?.[0]?.id;

    // Trigger transactional email via Resend in the background (non-blocking)
    const resendApiKey = process.env.RESEND_API_KEY;
    const resendFrom = process.env.RESEND_FROM || 'onboarding@resend.dev';
    if (resendApiKey && contact?.email) {
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: resendFrom,
          to: contact.email,
          subject: 'Grazie per la tua richiesta - Alessandra Ibiza Planner',
          html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #eef2f6; border-radius: 16px; background-color: #ffffff; color: #1e293b; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05);">
              <div style="text-align: center; margin-bottom: 24px;">
                <span style="font-size: 40px;">🌴</span>
              </div>
              <h2 style="color: #EA580C; font-size: 24px; font-weight: 700; text-align: center; margin-top: 0; margin-bottom: 16px; font-family: system-ui, -apple-system, sans-serif;">Richiesta Ricevuta con Successo!</h2>
              <p style="font-size: 16px; line-height: 1.6; margin-bottom: 16px;">Ciao <strong>${contact.name}</strong>,</p>
              <p style="font-size: 16px; line-height: 1.6; margin-bottom: 16px;">Grazie mille per aver compilato il questionario per pianificare il tuo viaggio a Ibiza sul mio sito.</p>
              <p style="font-size: 16px; line-height: 1.6; margin-bottom: 16px;">Ho ricevuto tutti i dettagli del tuo profilo e sto già lavorando per creare una proposta esclusiva, su misura per te e per le tue preferenze.</p>
              <p style="font-size: 16px; line-height: 1.6; margin-bottom: 24px;">A breve mi metterò in contatto con te direttamente su <strong>WhatsApp</strong> per presentarti l'itinerario perfetto e definire gli ultimi dettagli.</p>
              <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 24px;">
                <p style="font-size: 15px; line-height: 1.5; color: #64748b; margin: 0;">A presto,</p>
                <p style="font-size: 16px; font-weight: 700; color: #0f172a; margin: 4px 0 0 0;">Alessandra</p>
                <p style="font-size: 14px; color: #94a3b8; margin: 2px 0 0 0;">Ibiza Luxury Planner</p>
              </div>
            </div>
          `
        })
      }).then(res => {
        if (!res.ok) {
          res.text().then(err => console.error('Resend API Error:', err));
        } else {
          console.log('Resend email sent successfully to:', contact.email);
        }
      }).catch(err => {
        console.error('Unhandled background Resend Error:', err);
      });
    }

    // Attach questionnaire answers as a note to the created lead
    if (leadId) {
      try {
        const questionMap: Record<string, string> = {
          q1: "Volo acquistato?",
          q2: "Periodo viaggio:",
          q3: "Persone nel gruppo:",
          q4: "Genere preferito:",
          q5: "Feste in mente:",
          q6: "Notti in cui uscire:",
          q7: "Interessati a yacht party?",
          q8: "Bisogno di trasporti?",
          q9: "Tipo di alloggio cercato:",
          q10: "Budget indicativo a persona:",
          q11: "Disponibilità consulenza:",
        };

        let noteText = `=== DETTAGLI QUESTIONARIO IBIZA ===\n\n`;
        noteText += `Nome: ${contact.name}\n`;
        noteText += `Telefono: ${contact.phone}\n`;
        if (contact.email) {
          noteText += `Email: ${contact.email}\n`;
        }
        noteText += `Lead Score: ${score} points (${score >= 120 ? 'QUALIFIED / HOT 🔥' : 'ENTRY / WARM'})\n\n`;

        for (const [qId, answer] of Object.entries(answers || {})) {
          const qText = questionMap[qId] || qId;
          noteText += `${qText} ${answer}\n`;
        }

        const noteResponse = await fetch(`https://${subdomain}.kommo.com/api/v4/leads/notes`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify([
            {
              entity_id: leadId,
              note_type: "common",
              params: {
                text: noteText
              }
            }
          ])
        });

        if (!noteResponse.ok) {
          console.warn('Failed to add note to lead:', await noteResponse.text());
        }
      } catch (noteError) {
        console.error('Error attaching questionnaire note to lead:', noteError);
      }
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error processing Kommo webhook:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

