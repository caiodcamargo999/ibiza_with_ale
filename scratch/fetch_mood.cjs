const https = require('https');
https.get('https://ibizamymood.com/', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const fonts = data.match(/font-family:[^;\"\}]+/gi) || [];
    console.log('FONTS:', Array.from(new Set(fonts)));
    const googleFonts = data.match(/https:\/\/fonts.googleapis.com[^"']+/gi) || [];
    console.log('GOOGLE FONTS:', googleFonts);
    const typekit = data.match(/https:\/\/use.typekit.net[^"']+/gi) || [];
    console.log('TYPEKIT:', typekit);
    
    // Check if it's wordpress or something and find the nav
    const headerMatch = data.match(/<header[\s\S]*?<\/header>/i) || [];
    if (headerMatch.length > 0) {
      console.log('HEADER CONTENT (first 500 chars):', headerMatch[0].substring(0, 500));
      const navMatches = headerMatch[0].match(/<nav[\s\S]*?<\/nav>/gi) || [];
      console.log('NAV FOUND:', navMatches.length);
      if (navMatches.length > 0) {
        console.log('NAV CLASSES:', navMatches[0].match(/class="[^"]+"/g));
      }
    } else {
        const bodyMatch = data.match(/<body[\s\S]*?>/i);
        console.log('BODY:', bodyMatch ? bodyMatch[0] : 'no body');
    }
  });
}).on('error', (err) => {
  console.error(err);
});
