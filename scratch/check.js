const fs = require('fs');
const parser = require('@babel/parser');

try {
  const code = fs.readFileSync('c:/Users/lenovo/Desktop/DIGITAL MARKETING/03_SOFTWARE, AI AND APP DEVELOPMENT/Rarity Projects/01_Clients Projects/Cilex Ibiza/website_alessandra_ibiza/src/components/TypeformPopup.tsx', 'utf8');
  parser.parse(code, {
    sourceType: 'module',
    plugins: ['typescript', 'jsx']
  });
  console.log('Success: Code parses perfectly!');
} catch (err) {
  console.error('Parse Error:', err.message);
  if (err.loc) {
    console.error(`At line ${err.loc.line}, column ${err.loc.column}`);
  }
}
