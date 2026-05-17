const fs = require('fs');
const path = require('path');

function walk(d) {
  fs.readdirSync(d).forEach(f => {
    let p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) {
      walk(p);
    } else if (p.endsWith('.tsx') && p !== path.join('src', 'components', 'Layout.tsx')) {
      let c = fs.readFileSync(p, 'utf8');
      let changed = false;

      // Remove the whatsapp link block
      const linkRegex = /<a\s+href=\{WHATSAPP_URL\}[^>]*>[\s\S]*?<\/a>/g;
      if (linkRegex.test(c)) {
        c = c.replace(linkRegex, '');
        changed = true;
      }

      // Remove the import
      const importRegex = /import\s+{\s*WHATSAPP_URL\s*}\s+from\s+["']@\/components\/Layout["'];?\r?\n?/g;
      if (importRegex.test(c)) {
        c = c.replace(importRegex, '');
        changed = true;
      }

      if (changed) {
        fs.writeFileSync(p, c);
        console.log('Removed whatsapp from ' + p);
      }
    }
  });
}

walk('./src/app');
walk('./src/components');
console.log('done');
