const fs = require('fs');
const path = require('path');

async function run() {
  const payload = {
    score: 145, // Qualified Hot Lead!
    contact: {
      name: "Marco Rossi (Test Completo)",
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

  console.log("Submitting fully populated test lead to http://localhost:3000/api/kommo...");

  try {
    const response = await fetch("http://localhost:3000/api/kommo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const text = await response.text();
    console.log("Response Status:", response.status);
    console.log("Response Body:", text);
  } catch (error) {
    console.error("Error making request:", error);
  }
}

run();
