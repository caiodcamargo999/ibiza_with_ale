const https = require('https');
https.get('https://ibizamymood.com/assets/index-l7QswyL3.css', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    // Extract custom properties
    const customProps = data.match(/--font-[a-zA-Z0-9-]+:\s*([^;}]+)/gi) || [];
    console.log('CUSTOM PROPS:', customProps);
    
    // Extract font-face src URLs
    const fontFaces = data.match(/@font-face\s*{[^}]+}/gi) || [];
    console.log('FONT FACES:', fontFaces);
  });
}).on('error', (err) => {
  console.error(err);
});
