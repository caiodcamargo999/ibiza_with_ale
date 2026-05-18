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
  console.log("Fetching pipelines from Kommo...");
  try {
    const response = await fetch(`https://${subdomain}.kommo.com/api/v4/leads/pipelines`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      console.error("Error fetching pipelines:", await response.text());
      return;
    }

    const data = await response.json();
    console.log("Pipelines Response:");
    console.log(JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Exception:", error);
  }
}

run();
