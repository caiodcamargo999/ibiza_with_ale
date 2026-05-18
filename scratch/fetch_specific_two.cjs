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
const leadIds = ['30339484', '30339488'];

async function checkLead(id) {
  try {
    const response = await fetch(`https://${subdomain}.kommo.com/api/v4/leads/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    console.log(`Lead ID: ${id} | Response Status: ${response.status}`);
    if (response.ok) {
      const data = await response.json();
      console.log(`Lead Name: "${data.name}" | Status ID: ${data.status_id} | Pipeline ID: ${data.pipeline_id}`);
    }
  } catch (error) {
    console.error(`Error checking lead ${id}:`, error);
  }
}

async function run() {
  for (const id of leadIds) {
    await checkLead(id);
  }
}

run();
