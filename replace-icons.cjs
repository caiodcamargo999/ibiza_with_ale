const fs = require('fs');
const path = require('path');

const replacements = {
  'Sparkles': 'Settings2',
  'Star': 'Award',
  'Heart': 'Handshake',
  'Eye': 'Search',
  'Shield': 'CalendarCheck',
  'Users': 'Globe',
  'Headphones': 'PhoneCall',
  'Flame': 'Zap'
};

function walk(dir) {
  fs.readdirSync(dir).forEach(file => {
    let p = path.join(dir, file);
    if (fs.statSync(p).isDirectory()) {
      walk(p);
    } else if (p.endsWith('.tsx') || p.endsWith('.ts')) {
      let content = fs.readFileSync(p, 'utf8');
      let changed = false;

      Object.entries(replacements).forEach(([oldIcon, newIcon]) => {
        const regex = new RegExp(`\\b${oldIcon}\\b`, 'g');
        if (regex.test(content)) {
          content = content.replace(regex, newIcon);
          changed = true;
        }
      });

      if (changed) {
        fs.writeFileSync(p, content);
        console.log('Updated icons in ' + p);
      }
    }
  });
}

walk('./src');
