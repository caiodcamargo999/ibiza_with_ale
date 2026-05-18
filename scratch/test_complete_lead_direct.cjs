const fs = require('fs');
const path = require('path');

// Read env variables manually
const envPath = path.join(__dirname, '..', '.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    const key = parts[0].trim();
    const value = parts.slice(1).join('=').trim();
    if (key && !key.startsWith('#')) {
      env[key] = value;
    }
  }
});

const subdomain = env.KOMMO_SUBDOMAIN || 'cilexibiza';
const accessToken = env.KOMMO_ACCESS_TOKEN;
const pipelineId = env.KOMMO_PIPELINE_ID || '13758348';
const statusEntry = env.KOMMO_STATUS_ENTRY || '106153180';
const statusQualified = env.KOMMO_STATUS_QUALIFIED || '106153188';

const testPayload = {
  score: 145, // Qualified Hot Lead!
  contact: {
    name: "Alex Ficticio (Test Completo)",
    phone: "+393456789012"
  },
  answers: {
    q1: "Sì, già comprato volo",
    q2: "Agosto 2026",
    q3: "Da 6 a 10 persone",
    q4: "Techno / Underground & House",
    q5: "Circoloco al DC-10, Afterlife all'Hï, Solomun al Pacha",
    q6: "Tutte le notti",
    q7: "Sì, yacht party da 12 metri",
    q8: "Auto premium / supercar (Range Rover)",
    q9: "Villa con piscina a Playa d'en Bossa",
    q10: "€3.000 a €6.000",
    q11: "Oggi o domani",
  }
};

async function run() {
  console.log("=== INIZIO TEST LEAD COMPLETO DIRETTAMENTE SU KOMMO ===");
  
  const { contact, score, answers } = testPayload;
  const isQualified = score >= 120;
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

  console.log(`\n1. Invio Lead con tag 'website-ale' e status [${targetStatusId}]...`);
  
  try {
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
      return;
    }

    const data = await response.json();
    console.log("Lead creata correttamente! Risposta:", JSON.stringify(data, null, 2));

    const leadId = data?.[0]?.id;
    console.log(`\nLead ID estratto: ${leadId}`);

    if (leadId) {
      const questionMap = {
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

      console.log(`\n2. Allegando nota con risposte del questionario al Lead ID: ${leadId}...`);
      
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
      } else {
        const noteData = await noteResponse.json();
        console.log("Nota allegata correttamente su Kommo! Risposta:", JSON.stringify(noteData, null, 2));
      }
    } else {
      console.error("ERRORE: Impossibile estrarre Lead ID dalla risposta");
    }

  } catch (error) {
    console.error("Eccezione durante la chiamata API:", error);
  }
}

run();
