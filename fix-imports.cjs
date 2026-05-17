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

      if (c.includes('buttonVariants') && !c.includes('buttonVariants } from')) {
        c = c.replace(/import\s+{\s*Button\s*}\s+from\s+["']@\/components\/ui\/button["'];/, 'import { Button, buttonVariants } from "@/components/ui/button";');
        changed = true;
      }
      
      if (changed) {
        fs.writeFileSync(p, c);
        console.log('Fixed imports in ' + p);
      }
    }
  });
}

walk('./src/app');
console.log('done');
