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

async function run() {
  console.log("Fetching recent 20 leads from Kommo...");
  try {
    const response = await fetch(`https://${subdomain}.kommo.com/api/v4/leads?limit=20&order[created_at]=desc`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    console.log("Response Status:", response.status);
    const text = await response.text();
    if (response.ok && text) {
      const data = JSON.parse(text);
      const leads = data?._embedded?.leads || [];
      console.log(`Found ${leads.length} leads:`);
      leads.forEach(l => {
        console.log(`ID: ${l.id} | Name: "${l.name}" | Status: ${l.status_id} | Pipeline: ${l.pipeline_id} | Created: ${new Date(l.created_at * 1000).toLocaleString('it-IT')}`);
      });
    } else {
      console.log("Response Text:", text);
    }
  } catch (error) {
    console.error("Exception:", error);
  }
}

run();
