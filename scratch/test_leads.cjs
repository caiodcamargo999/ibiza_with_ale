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

async function sendLead(name, phone, score) {
  const isQualified = score >= 120;
  const targetStatusId = isQualified ? parseInt(statusQualified) : parseInt(statusEntry);
  
  const payload = [
    {
      name: `Lead Ibiza Test: ${name}`,
      pipeline_id: parseInt(pipelineId),
      status_id: targetStatusId,
      _embedded: {
        contacts: [
          {
            first_name: name,
            custom_fields_values: [
              {
                field_code: "PHONE",
                values: [
                  {
                    value: phone,
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

  console.log(`Sending Lead [${name}] with Score [${score}] -> Status [${targetStatusId} (${isQualified ? 'Qualified' : 'Entry'})]`);
  
  try {
    const res = await fetch(`https://${subdomain}.kommo.com/api/v4/leads/complex`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Kommo API error:`, errorText);
      return { success: false, error: errorText };
    }

    const data = await res.json();
    console.log(`Success! Lead created:`, JSON.stringify(data, null, 2));
    return { success: true, data };
  } catch (error) {
    console.error(`Fetch error:`, error);
    return { success: false, error };
  }
}

async function run() {
  console.log('--- Test 1: Entry Lead (Non-qualified, e.g. Score = 35) ---');
  await sendLead('Test Lead Entry', '+393339998888', 35);
  
  console.log('\n--- Test 2: Qualified Lead (Score = 145) ---');
  await sendLead('Test Lead Qualified', '+393337776666', 145);
}

run();
