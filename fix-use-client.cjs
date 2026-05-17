const fs = require('fs');
const path = require('path');

function walk(d) {
  fs.readdirSync(d).forEach(f => {
    let p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) {
      walk(p);
    } else if (p.endsWith('.tsx')) {
      let c = fs.readFileSync(p, 'utf8');
      let changed = false;

      if (c.startsWith('import { cn } from "@/lib/utils";\n"use client";')) {
        c = c.replace('import { cn } from "@/lib/utils";\n"use client";', '"use client";\nimport { cn } from "@/lib/utils";');
        changed = true;
      }
      if (changed) {
        fs.writeFileSync(p, c);
        console.log('Fixed use client in ' + p);
      }
    }
  });
}

walk('./src/app');
console.log('done');
