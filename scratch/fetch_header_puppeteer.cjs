const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://ibizamymood.com/', { waitUntil: 'networkidle2' });
  
  // Get the header HTML
  const headerHtml = await page.evaluate(() => {
    const header = document.querySelector('header');
    return header ? header.outerHTML : 'No header found';
  });
  
  fs.writeFileSync('scratch/ibizamymood_header.html', headerHtml);
  console.log('Header written to scratch/ibizamymood_header.html');
  await browser.close();
})();
