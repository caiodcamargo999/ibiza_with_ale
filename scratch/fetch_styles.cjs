const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
    });
    const page = await browser.newPage();
    await page.goto('https://ibizamymood.com/', { waitUntil: 'networkidle2', timeout: 60000 });
    
    // Extract everything we can about the header
    const data = await page.evaluate(() => {
      const header = document.querySelector('header') || document.querySelector('nav') || document.body;
      const computed = window.getComputedStyle(header);
      
      const links = Array.from(header.querySelectorAll('a')).map(a => {
        const comp = window.getComputedStyle(a);
        return {
          text: a.innerText,
          fontFamily: comp.fontFamily,
          fontSize: comp.fontSize,
          fontWeight: comp.fontWeight,
          textTransform: comp.textTransform,
          letterSpacing: comp.letterSpacing,
          color: comp.color,
          backgroundColor: comp.backgroundColor,
          className: a.className
        };
      });
      
      const buttons = Array.from(header.querySelectorAll('button')).map(b => {
        const comp = window.getComputedStyle(b);
        return {
          text: b.innerText,
          fontFamily: comp.fontFamily,
          backgroundColor: comp.backgroundColor,
          color: comp.color,
          borderRadius: comp.borderRadius,
          className: b.className
        };
      });

      return {
        headerBg: computed.backgroundColor,
        headerClass: header.className,
        links,
        buttons
      };
    });
    
    fs.writeFileSync('scratch/ibiza_style.json', JSON.stringify(data, null, 2));
    console.log('Successfully extracted styles.');
    await browser.close();
  } catch (e) {
    console.error('Error:', e);
    process.exit(1);
  }
})();
