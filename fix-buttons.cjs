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

      // Replace Button wrapping Link
      c = c.replace(/<Button\s+asChild(.*?)>\s*<Link\s+href=([^\s>]+)>(.*?)<\/Link>\s*<\/Button>/gs, (match, btnProps, href, content) => {
        let variantMatch = btnProps.match(/variant=["'](.*?)["']/);
        let sizeMatch = btnProps.match(/size=["'](.*?)["']/);
        let classMatch = btnProps.match(/className=["'](.*?)["']/);
        
        let v = variantMatch ? `variant: '${variantMatch[1]}'` : '';
        let s = sizeMatch ? `size: '${sizeMatch[1]}'` : '';
        let cls = classMatch ? `"${classMatch[1]}"` : '';
        
        let bvArgs = [v, s].filter(Boolean).join(', ');
        let bv = `buttonVariants({ ${bvArgs} })`;
        let finalClass = cls ? `{cn(${bv}, ${cls})}` : `{${bv}}`;
        
        changed = true;
        return `<Link href=${href} className=${finalClass}>${content}</Link>`;
      });

      // Replace Button wrapping a tag
      c = c.replace(/<Button\s+asChild(.*?)>\s*<a\s+href=([^\s>]+)(.*?)>(.*?)<\/a>\s*<\/Button>/gs, (match, btnProps, href, aProps, content) => {
        let variantMatch = btnProps.match(/variant=["'](.*?)["']/);
        let sizeMatch = btnProps.match(/size=["'](.*?)["']/);
        let classMatch = btnProps.match(/className=["'](.*?)["']/);
        
        let v = variantMatch ? `variant: '${variantMatch[1]}'` : '';
        let s = sizeMatch ? `size: '${sizeMatch[1]}'` : '';
        let cls = classMatch ? `"${classMatch[1]}"` : '';
        
        let bvArgs = [v, s].filter(Boolean).join(', ');
        let bv = `buttonVariants({ ${bvArgs} })`;
        let finalClass = cls ? `{cn(${bv}, ${cls})}` : `{${bv}}`;
        
        changed = true;
        return `<a href=${href}${aProps} className=${finalClass}>${content}</a>`;
      });

      if (changed) {
        if (!c.includes('buttonVariants')) {
          c = c.replace(/import\s+{\s*Button\s*}\s+from\s+["']@\/components\/ui\/button["'];/, 'import { Button, buttonVariants } from "@/components/ui/button";');
        }
        if (c.includes('cn(') && !c.includes('import { cn }')) {
          c = `import { cn } from "@/lib/utils";\n` + c;
        }
        fs.writeFileSync(p, c);
        console.log('Fixed ' + p);
      }
    }
  });
}

walk('./src/app');
console.log('done');
