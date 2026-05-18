const fs = require('fs');

try {
  const code = fs.readFileSync('c:/Users/lenovo/Desktop/DIGITAL MARKETING/03_SOFTWARE, AI AND APP DEVELOPMENT/Rarity Projects/01_Clients Projects/Cilex Ibiza/website_alessandra_ibiza/src/components/TypeformPopup.tsx', 'utf8');
  const lines = code.split('\n');
  
  // Let's print out lines from 330 to 470 with their tag nesting levels
  let indent = 0;
  for (let i = 330; i < 470; i++) {
    const line = lines[i];
    if (!line) continue;
    let lineStr = line.trim();
    
    // Check tags
    let openTags = (lineStr.match(/<[a-zA-Z]/g) || []).length;
    let closeTags = (lineStr.match(/<\/[a-zA-Z]/g) || []).length;
    let selfCloseTags = (lineStr.match(/\/>/g) || []).length;
    
    let change = openTags - closeTags - selfCloseTags;
    console.log(`${i+1}: [Net change: ${change}] ${line}`);
  }
} catch (err) {
  console.error(err);
}
