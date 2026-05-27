const https = require('https');
https.get('https://ibizamymood.com/', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const fonts = data.match(/font-family:[^;\"\}]+/gi) || [];
    console.log('FONTS:', Array.from(new Set(fonts)));
    const links = data.match(/<link[^>]+stylesheet[^>]+>/gi) || [];
    console.log('LINKS:', links);
    const googleFonts = data.match(/https:\/\/fonts.googleapis.com[^"']+/gi) || [];
    console.log('GOOGLE FONTS:', googleFonts);
    // Find header
    const headerMatch = data.match(/<header[\s\S]*?<\/header>/i);
    if (headerMatch) {
      console.log('HEADER LENGTH:', headerMatch[0].length);
      console.log('HEADER CONTENT:', headerMatch[0].substring(0, 1500));
    }
  });
}).on('error', (err) => {
  console.error(err);
});
