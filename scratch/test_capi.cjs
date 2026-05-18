const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

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

const pixelId = env.META_PIXEL_ID || '1522719482849858';
const accessToken = env.META_ACCESS_TOKEN;

function sha256(text) {
  if (!text) return '';
  return crypto.createHash('sha256').update(text.trim().toLowerCase()).digest('hex');
}

function normalizePhone(phone) {
  return phone.replace(/\D/g, '');
}

function normalizeName(name) {
  return name.trim().toLowerCase();
}

async function run() {
  console.log("=== META CAPI DIRECT TEST SUITE ===");
  console.log("Pixel ID:", pixelId);
  console.log("Token Length:", accessToken ? accessToken.length : 0);

  if (!accessToken) {
    console.error("Error: META_ACCESS_TOKEN is missing in .env!");
    return;
  }

  // Sample lead data
  const rawName = "Test CAPI Caio";
  const rawPhone = "+39 333 555 4444";
  const score = 135;
  const isQualified = score >= 120;

  // Hashing and normalization
  const normPhone = normalizePhone(rawPhone);
  const normName = normalizeName(rawName);
  const nameParts = normName.split(/\s+/);
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const hashedPhone = sha256(normPhone);
  const hashedFirstName = sha256(firstName);
  const hashedLastName = sha256(lastName);

  console.log("\n--- Encryption and Normalization Verification ---");
  console.log(`Raw Name: "${rawName}" -> Normalized Name: "${normName}"`);
  console.log(`First Name: "${firstName}" -> Hashed: "${hashedFirstName}"`);
  console.log(`Last Name: "${lastName}" -> Hashed: "${hashedLastName}"`);
  console.log(`Raw Phone: "${rawPhone}" -> Normalized Phone: "${normPhone}" -> Hashed: "${hashedPhone}"`);

  // Build payload
  const payload = {
    data: [
      {
        event_name: 'Lead',
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website',
        event_source_url: 'https://cilexibiza.com/test-capi',
        user_data: {
          ph: hashedPhone ? [hashedPhone] : [],
          fn: hashedFirstName ? [hashedFirstName] : [],
          ln: hashedLastName ? [hashedLastName] : [],
          client_ip_address: "127.0.0.1",
          client_user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
        },
        custom_data: {
          lead_status: isQualified ? 'Qualified' : 'Normal',
          value: isQualified ? 100.00 : 30.00,
          currency: 'EUR'
        }
      }
    ]
  };

  const requestBody = {
    ...payload,
    access_token: accessToken
  };

  // If there's a test event code in the environment or if we want to add one
  // Note: Since we are running direct, we can check if the user has a test code
  if (env.META_TEST_EVENT_CODE) {
    console.log(`Applying Test Event Code: ${env.META_TEST_EVENT_CODE}`);
    requestBody.test_event_code = env.META_TEST_EVENT_CODE;
  }

  console.log("\n--- Sending Lead Event to Meta Conversions API ---");
  try {
    const response = await fetch(`https://graph.facebook.com/v19.0/${pixelId}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    console.log("Response Status:", response.status);
    const text = await response.text();
    console.log("Response Body:", text);

    if (response.ok) {
      console.log("\n🎉 Success! Meta CAPI accepted the event correctly.");
    } else {
      console.log("\n❌ Failed. Please check the error above.");
    }
  } catch (error) {
    console.error("Exception during CAPI request:", error);
  }
}

run();
