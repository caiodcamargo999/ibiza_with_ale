import fs from 'fs';
import path from 'path';

const srcDir = './src';
const appDir = './src/app';

// Create app dir
if (!fs.existsSync(appDir)) {
  fs.mkdirSync(appDir, { recursive: true });
}

// Read App.tsx routes
// For simplicity we will map known routes
const routeMap = {
  'Home.tsx': '',
  'ChiSono.tsx': 'chi-sono',
  'Servizi.tsx': 'servizi',
  'ComeFunziona.tsx': 'come-funziona',
  'FAQPage.tsx': 'faq',
  'Contatti.tsx': 'contatti',
  'QuantoCostaIbiza.tsx': 'quanto-costa-ibiza',
  'ErroriIbiza.tsx': 'errori-ibiza',
  'SpiaggeIbiza.tsx': 'spiagge-ibiza',
  'ZoneIbiza.tsx': 'zone-ibiza',
  'Itinerari.tsx': 'itinerari',
  'Pacchetti.tsx': 'pacchetti',
  'CalendarioParty.tsx': 'calendario-party',
  'CreaViaggio.tsx': 'crea-viaggio',
  'NotFound.tsx': 'not-found'
};

const replaceRouterImports = (content) => {
  content = content.replace(/import\s+\{\s*Link\s*\}\s+from\s+['"]react-router-dom['"];/g, 'import Link from "next/link";');
  content = content.replace(/import\s+\{\s*Link\s*,\s*useLocation\s*\}\s+from\s+['"]react-router-dom['"];/g, 'import Link from "next/link";\nimport { usePathname } from "next/navigation";');
  content = content.replace(/import\s+\{\s*useLocation\s*\}\s+from\s+['"]react-router-dom['"];/g, 'import { usePathname } from "next/navigation";');
  content = content.replace(/useLocation\(\)/g, 'usePathname()');
  content = content.replace(/pathname/g, 'pathname'); // no-op but reminder
  
  // NavLink replacement is tricky, let's just make it Link for now in NavLink.tsx
  content = content.replace(/import\s+\{\s*NavLink\s+as\s+RouterNavLink.*?\}\s+from\s+['"]react-router-dom['"];/g, 'import Link from "next/link";');
  content = content.replace(/<RouterNavLink/g, '<Link');
  content = content.replace(/<\/RouterNavLink>/g, '</Link>');
  
  return content;
};

const processDir = (dir) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      const newContent = replaceRouterImports(content);
      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent);
      }
    }
  }
};

// Process components
processDir('./src/components');

// Process pages and move to app
const pages = Object.keys(routeMap);
for (const page of pages) {
  const pagePath = path.join(srcDir, 'pages', page);
  if (fs.existsSync(pagePath)) {
    let content = fs.readFileSync(pagePath, 'utf8');
    content = replaceRouterImports(content);
    // Add "use client" if there's interactivity like hooks
    if (content.includes('useState') || content.includes('useEffect') || content.includes('usePathname') || content.includes('useToast')) {
      content = '"use client";\n' + content;
    }
    
    const route = routeMap[page];
    let destDir = appDir;
    if (route !== '') {
      destDir = path.join(appDir, route);
      fs.mkdirSync(destDir, { recursive: true });
    }
    fs.writeFileSync(path.join(destDir, 'page.tsx'), content);
  }
}

// Create layout.tsx
const layoutContent = `"use client";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import { useState } from "react";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <html lang="it">
      <body>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Layout>{children}</Layout>
          </TooltipProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
`;
fs.writeFileSync(path.join(appDir, 'layout.tsx'), layoutContent);

// Rename index.css to globals.css
if (fs.existsSync('./src/index.css')) {
  fs.renameSync('./src/index.css', './src/app/globals.css');
  // Update App.css usages if any
}
if (fs.existsSync('./src/App.css')) {
  fs.unlinkSync('./src/App.css');
}

// Fix imports in components/Layout.tsx (it imports Outlet but Next uses children)
// But we already have Layout taking { children } in components/Layout.tsx probably.
console.log('Migration scripts applied.');
