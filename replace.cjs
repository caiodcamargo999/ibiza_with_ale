const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/**/*.tsx');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // In React, replacing <Link href="/crea-viaggio" ...> with <button ...> requires matching </Link>.
    // Since most of them are `<Link href="/crea-viaggio" ... > ... </Link>`, we can use a regex that matches the opening tag, inner content, and closing tag.
    // However, some might have nested elements.
    // The safest way is to change href="/crea-viaggio" to href="#" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event('open-typeform')); }}
    
    let changed = false;
    
    let newContent = content.replace(/href="\/crea-viaggio"/g, `href="#" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event('open-typeform')); }}`);
    
    if (newContent !== content) {
        fs.writeFileSync(file, newContent, 'utf8');
        console.log(`Updated ${file}`);
    }
});
