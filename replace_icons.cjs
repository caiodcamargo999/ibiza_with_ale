const fs = require('fs');
const path = require('path');

const iconMap = {
  'ArrowRight': 'ArrowRightIcon',
  'CheckCircle': 'CheckCircledIcon',
  'MessageCircle': 'ChatBubbleIcon',
  'BadgeCheck': 'BadgeIcon',
  'ShieldCheck': 'LockClosedIcon',
  'ClipboardList': 'ReaderIcon',
  'Send': 'PaperPlaneIcon',
  'PhoneCall': 'MobileIcon',
  'Star': 'StarFilledIcon',
  'Home': 'HomeIcon',
  'Car': 'LightningBoltIcon',
  'Compass': 'GlobeIcon',
  'Music': 'SpeakerLoudIcon',
  'Handshake': 'HeartIcon',
  'Menu': 'HamburgerMenuIcon',
  'X': 'Cross2Icon',
  'Instagram': 'InstagramLogoIcon',
  'ChevronDown': 'ChevronDownIcon',
  'Award': 'StarIcon',
  'MapPin': 'SewingPinIcon',
  'Waves': 'ActivityLogIcon',
  'Sun': 'SunIcon',
  'Clock': 'ClockIcon',
  'Globe': 'GlobeIcon',
  'Ship': 'PaperPlaneIcon',
  'Settings2': 'MixerHorizontalIcon',
  'Moon': 'MoonIcon',
  'Utensils': 'CookieIcon',
  'AlertTriangle': 'ExclamationTriangleIcon',
  'XCircle': 'CrossCircledIcon',
  'Calendar': 'CalendarIcon',
  'Zap': 'LightningBoltIcon',
  'Euro': 'TokensIcon',
  'Umbrella': 'ShadowIcon',
  'CreditCard': 'ColorWheelIcon', // fallback
  'MoreHorizontal': 'DotsHorizontalIcon',
  'ChevronLeft': 'ChevronLeftIcon',
  'ChevronUp': 'ChevronUpIcon',
  'Check': 'CheckIcon',
  'Search': 'MagnifyingGlassIcon',
  'Circle': 'ValueNoneIcon',
  'PanelLeft': 'ViewVerticalIcon',
  'GripVertical': 'DragHandleDots2Icon',
  'Dot': 'DotIcon',
  'ChevronRight': 'ChevronRightIcon',
  'NotebookPen': 'Pencil1Icon',
  'Sparkle': 'MagicWandIcon',
  'AudioLines': 'SpeakerLoudIcon',
  'MenuIcon': 'HamburgerMenuIcon',
  'XIcon': 'Cross2Icon',
  'ChevronRightIcon': 'ChevronRightIcon',
  'CheckIcon': 'CheckIcon',
  'LucideIcon': 'IconProps'
};

function replaceInFiles(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInFiles(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;

      // Replace lucide-react with @radix-ui/react-icons
      if (content.includes('lucide-react')) {
        content = content.replace(/['"]lucide-react['"]/g, "'@radix-ui/react-icons'");
        
        // Find import { ... } from "@radix-ui/react-icons"
        const regex = /import\s*\{\s*([^}]+)\s*\}\s*from\s*['"]@radix-ui\/react-icons['"]/g;
        content = content.replace(regex, (match, importsStr) => {
          const imports = importsStr.split(',').map(s => s.trim()).filter(Boolean);
          const newImports = imports.map(imp => {
            const parts = imp.split(/\s+as\s+/);
            const originalName = parts[0];
            const alias = parts[1] || originalName;
            const newName = iconMap[originalName] || originalName + 'Icon'; // Fallback append Icon
            
            // We need to also replace the usage in the rest of the file
            // Let's do a global replace for the usage of `alias` as `<Alias` or `Alias ` etc.
            // Actually, we can just map the import names and let the user do a manual regex replace on the file contents
            return newName + (parts[1] ? ` as ${alias}` : '');
          });
          return `import { ${newImports.join(', ')} } from "@radix-ui/react-icons"`;
        });
        
        // Replace JSX tags
        Object.keys(iconMap).forEach(lucideIcon => {
          const radixIcon = iconMap[lucideIcon];
          const tagRegex = new RegExp(`<${lucideIcon}(\\s|>)`, 'g');
          const closingTagRegex = new RegExp(`</${lucideIcon}>`, 'g');
          
          if (content.match(tagRegex)) {
            content = content.replace(tagRegex, `<${radixIcon}$1`);
            content = content.replace(closingTagRegex, `</${radixIcon}>`);
          }
        });
        
        // Extra replace for any other stragglers
        content = content.replace(/<ArrowRight /g, '<ArrowRightIcon ');
        content = content.replace(/<\/ArrowRight>/g, '</ArrowRightIcon>');
        content = content.replace(/<ArrowRight>/g, '<ArrowRightIcon>');
        
        changed = true;
      }
      
      if (changed) {
        fs.writeFileSync(fullPath, content);
        console.log('Updated icons in', fullPath);
      }
    }
  });
}

replaceInFiles('./src');
