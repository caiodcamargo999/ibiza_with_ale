const https = require('https');

// We use an open cors proxy or prerender service
https.get('https://api.microlink.io/?url=https://ibizamymood.com&prerender=true', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      console.log('Got response from microlink');
      // Unfortunately microlink free tier just gives metadata, not raw HTML unless we pay or use a specific flag.
      // Let's just output the JSON keys
      console.log(Object.keys(json.data || {}));
      console.log(json.data.title);
      console.log(json.data.description);
    } catch (e) {
      console.error(e);
    }
  });
}).on('error', (err) => {
  console.error(err);
});
