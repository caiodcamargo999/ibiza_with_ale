const fs = require('fs');

function updateFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes('<img ') && !content.includes('<img\n')) return;
  
  if (!content.includes('import Image from')) {
    // Attempt to inject import Image from "next/image" after "use client" or other imports
    if (content.includes('"use client"')) {
      content = content.replace(/"use client";?/, '"use client";\nimport Image from "next/image";');
    } else {
      content = 'import Image from "next/image";\n' + content;
    }
  }

  // Replace <img ... /> with <Image fill ... />
  content = content.replace(/<img([\s\S]*?)\/>/g, (match, p1) => {
    let attrs = p1;
    if (!attrs.includes('fill')) {
      attrs = ' fill sizes="100vw"' + attrs;
    }
    return `<Image${attrs}/>`;
  });

  fs.writeFileSync(filePath, content);
  console.log('Updated ' + filePath);
}

const files = [
  'src/components/home/ShowcaseSection.tsx',
  'src/components/home/ClubsSection.tsx',
  'src/app/errori-ibiza/page.tsx',
  'src/app/crea-viaggio/page.tsx',
  'src/app/zone-ibiza/page.tsx',
  'src/app/spiagge-ibiza/page.tsx',
  'src/app/pacchetti/page.tsx',
  'src/app/itinerari/page.tsx',
  'src/app/ibiza-packages/page.tsx'
];

files.forEach(f => {
  if (fs.existsSync(f)) {
    updateFile(f);
  }
});
