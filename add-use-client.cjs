const fs = require('fs');
const path = require('path');

function walk(d) {
  fs.readdirSync(d).forEach(f => {
    let p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) {
      walk(p);
    } else if (p.endsWith('.tsx')) {
      let c = fs.readFileSync(p, 'utf8');
      if (!c.includes('"use client"') && !c.includes("'use client'")) {
        c = '"use client";\n' + c;
        fs.writeFileSync(p, c);
        console.log('Added use client to ' + p);
      }
    }
  });
}

walk('./src/app');
console.log('done');
