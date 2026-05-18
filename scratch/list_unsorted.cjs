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
  console.log("Fetching unsorted leads...");
  try {
    const response = await fetch(`https://${subdomain}.kommo.com/api/v4/leads/unsorted`, {
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
      const unsorted = data?._embedded?.unsorted || [];
      console.log(`Found ${unsorted.length} unsorted items:`);
      unsorted.forEach((u, i) => {
        const leadName = u._embedded?.leads?.[0]?.name || "No Lead Name";
        const leadId = u._embedded?.leads?.[0]?.id || "No Lead ID";
        console.log(`Index: ${i} | UID: ${u.uid} | LeadName: "${leadName}" | LeadID: ${leadId} | Category: ${u.category} | Created: ${new Date(u.created_at * 1000).toLocaleString('it-IT')}`);
      });
    } else {
      console.log("Response Text:", text);
    }
  } catch (error) {
    console.error("Exception:", error);
  }
}

run();
