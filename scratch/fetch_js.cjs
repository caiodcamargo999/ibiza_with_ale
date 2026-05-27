const https = require('https');
const fs = require('fs');

https.get('https://ibizamymood.com/assets/index-BZDfl4DR.js', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    // Find header/nav strings
    const headerRegex = /className:\s*["']([^"']*header[^"']*)["']/gi;
    let match;
    const classes = new Set();
    while ((match = headerRegex.exec(data)) !== null) {
      classes.add(match[1]);
    }
    
    const navRegex = /className:\s*["']([^"']*nav[^"']*)["']/gi;
    while ((match = navRegex.exec(data)) !== null) {
      classes.add(match[1]);
    }
    
    // Also try looking for generic strings containing flex, justify, etc near header
    const allStrings = data.match(/["'][a-zA-Z0-9-\s:]+flex[a-zA-Z0-9-\s:]+["']/gi);
    if (allStrings) {
        fs.writeFileSync('scratch/js_strings.txt', allStrings.join('\n'));
    }
    
    console.log('Found Header/Nav Classes:', Array.from(classes));
  });
}).on('error', (err) => {
  console.error(err);
});
