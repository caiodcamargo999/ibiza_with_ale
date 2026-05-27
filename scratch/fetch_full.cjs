const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto('https://ibizamymood.com/', { waitUntil: 'networkidle2' });
    
    // Get the full HTML
    const html = await page.content();
    fs.writeFileSync('scratch/ibiza_full.html', html);
    console.log('Saved full HTML');
    await browser.close();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
