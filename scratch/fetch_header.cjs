const https = require('https');
https.get('https://ibizamymood.com/', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const headerMatch = data.match(/<header[^>]*>[\s\S]*?<\/header>/i);
    if (headerMatch) {
      console.log('HEADER HTML:');
      console.log(headerMatch[0].replace(/></g, '>\n<'));
    } else {
      console.log('No header found in raw HTML. It must be client rendered.');
    }
  });
}).on('error', (err) => {
  console.error(err);
});
