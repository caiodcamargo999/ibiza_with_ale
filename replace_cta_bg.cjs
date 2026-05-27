const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/app/**/*.tsx');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    const target = '<div className="absolute inset-0 bg-gradient-hero opacity-90" />';
    const replacement = `<div className="absolute inset-0 bg-black/40 backdrop-blur-md" />\n        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(249,115,22,0.15),transparent_60%)] border-t border-white/5" />`;
    
    if (content.includes(target)) {
        let newContent = content.replace(target, replacement);
        
        // Let's also check if the text needs to change from `text-primary-foreground` to `text-foreground` or similar, 
        // actually `text-primary-foreground` (which is white) works well on black background, but let's see. 
        // Let's just do the background replacement.
        
        fs.writeFileSync(file, newContent, 'utf8');
        console.log(`Updated background in ${file}`);
    }
});
