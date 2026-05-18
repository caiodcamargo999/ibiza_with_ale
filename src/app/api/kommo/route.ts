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
                }
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

