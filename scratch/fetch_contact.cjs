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
const contactId = '36693979';

async function run() {
  console.log(`Fetching contact ${contactId} details with linked leads...`);
  try {
    const response = await fetch(`https://${subdomain}.kommo.com/api/v4/contacts/${contactId}?with=leads`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    console.log("Response Status:", response.status);
    const text = await response.text();
    console.log("Response Text:", text);
  } catch (error) {
    console.error("Exception:", error);
  }
}

run();
