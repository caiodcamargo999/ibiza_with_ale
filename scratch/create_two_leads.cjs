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

const leadsToCreate = [
  {
    type: "QUALIFIED LEAD",
    score: 145,
    contact: {
      name: "Lead Teste Qualificada (website-ale)",
      phone: "+393335554444"
    },
    answers: {
      q1: "Sì, già comprato volo",
      q2: "Luglio 2026",
      q3: "Da 6 a 10 persone",
      q4: "Techno / Underground",
      q5: "Afterlife e Music On",
      q6: "Tutte le notti",
      q7: "Sì, yacht party da 12 metri",
      q8: "Auto premium / supercar",
      q9: "Villa con piscina",
      q10: "€3.000 a €6.000",
      q11: "Oggi o domani"
    }
  },
  {
    type: "NORMAL LEAD",
    score: 65,
    contact: {
      name: "Lead Teste Normal (website-ale)",
      phone: "+393336665555"
    },
    answers: {
      q1: "Stiamo ancora valutando quando andare",
      q2: "Settembre 2026",
      q3: "Da 3 a 5 persone",
      q4: "House / Deep House",
      q5: "Non sappiamo, ci fidiamo di voi",
      q6: "3 a 4 notti",
      q7: "No, preferiamo altre attività",
      q8: "Scooter",
      q9: "Appartamento",
      q10: "€1.000 a €1.500",
      q11: "La prossima settimana"
    }
  }
];

async function createLead(leadData) {
  const { contact, score, answers, type } = leadData;
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

  console.log(`\nCreating ${type} with status_id ${targetStatusId} and tag 'website-ale'...`);

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
      console.error(`Failed to create ${type}:`, await response.text());
      return null;
    }

    const data = await response.json();
    const leadId = data?.[0]?.id;
    console.log(`Success! ${type} created with ID: ${leadId}`);

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

      console.log(`Attaching questionnaire note to Lead ${leadId}...`);
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
        console.warn(`Failed to attach note to Lead ${leadId}:`, await noteResponse.text());
      } else {
        console.log(`Note successfully attached to Lead ${leadId}!`);
      }
    }

  } catch (error) {
    console.error(`Exception during ${type} creation:`, error);
  }
}

async function run() {
  for (const leadData of leadsToCreate) {
    await createLead(leadData);
  }
  console.log("\n=== TEST COMPLETATO! ===");
}

run();
