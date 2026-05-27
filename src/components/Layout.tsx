"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HamburgerMenuIcon, Cross2Icon, ChatBubbleIcon, InstagramLogoIcon, ChevronDownIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useFormStore } from "@/store/useFormStore";
import TypeformPopup from "@/components/TypeformPopup";

const TiktokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    className={cn("w-5 h-5 shrink-0 transition-transform duration-300 group-hover:scale-110", props.className)}
  >
    <defs>
      <linearGradient id="tiktok-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00F2FE" />
        <stop offset="50%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#FE0979" />
      </linearGradient>
    </defs>
    <path 
      d="M12.525.02c1.31-.03 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.74-3.99-1.72-.72-.65-1.29-1.47-1.63-2.38v8.64a6.41 6.41 0 0 1-1.28 3.86 6.3 6.3 0 0 1-8.52 1.34 6.22 6.22 0 0 1-2.9-4.8 6.31 6.31 0 0 1 4.79-6.38c.84-.23 1.72-.25 2.58-.1v3.53a3.42 3.42 0 0 0-3.37 2.92 3.39 3.39 0 0 0 2.54 3.65c1.47.41 3.12-.34 3.73-1.78.23-.5.33-1.05.32-1.6V0h-3.9v.02z" 
      fill="url(#tiktok-grad)"
    />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    className={cn("w-5 h-5 shrink-0 transition-transform duration-300 group-hover:scale-110", props.className)}
  >
    <defs>
      <linearGradient id="instagram-grad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#405DE6" />
        <stop offset="15%" stopColor="#5851DB" />
        <stop offset="30%" stopColor="#833AB4" />
        <stop offset="45%" stopColor="#C13584" />
        <stop offset="60%" stopColor="#E1306C" />
        <stop offset="75%" stopColor="#FD1D1D" />
        <stop offset="90%" stopColor="#F56040" />
        <stop offset="100%" stopColor="#FCAF45" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="url(#instagram-grad)" strokeWidth="2" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="url(#instagram-grad)" strokeWidth="2" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="url(#instagram-grad)" strokeWidth="2" />
  </svg>
);

const navItems = [
  { label: "Home", path: "/" },
];

const guideItems = [
  { label: "Pacchetti Ibiza 2026", path: "/ibiza-packages" },
  { label: "Errori da evitare", path: "/errori-ibiza" },
  { label: "Spiagge più belle", path: "/spiagge-ibiza" },
  { label: "Calendario party 2026", path: "/calendario-party" },
];

const WHATSAPP_URL = "https://wa.me/393XXXXXXXXX?text=Ciao%20Alessandra!%20Vorrei%20info%20su%20Ibiza";



function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = usePathname();
  const { openForm } = useFormStore();

  // Disable body scroll when menu is open
  React.useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileOpen]);

  return (
    <>
      <header className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <div 
          className={cn(
            "flex items-center gap-3 rounded-full px-5 py-2.5 shadow-lg transition-all duration-300 pointer-events-auto border",
            mobileOpen 
              ? "bg-black border-white/20" 
              : "bg-[#e5e5e5] backdrop-blur-xl border-white/70"
          )}
        >
          <Link href="/" onClick={() => setMobileOpen(false)} className="tracking-tight whitespace-nowrap transition-colors duration-300 uppercase font-menu font-bold text-[1.1rem] flex items-center gap-1.5">
            <span className="text-[#d946ef]">IBIZA</span>
            <span className={cn("font-light", mobileOpen ? "text-white" : "text-black")}>WITH</span>
            <span className={mobileOpen ? "text-white" : "text-black"}>ALE</span>
          </Link>
          
          <button
            className={cn(
              "ml-2 flex items-center justify-center rounded-full transition-all duration-300 hover:opacity-80",
              mobileOpen 
                ? "bg-white text-black px-4 py-1.5 text-xs font-bold h-8"
                : "w-8 h-8 bg-white/90 border border-white/50 text-black p-0"
            )}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              "Close"
            ) : (
              <div className="flex flex-col gap-[3px] items-center justify-center">
                <span className="block w-4 h-[2px] bg-black rounded-full"></span>
                <span className="block w-4 h-[2px] bg-black rounded-full"></span>
                <span className="block w-3 h-[2px] bg-black rounded-full self-start"></span>
              </div>
            )}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-40 overflow-y-auto"
          >
            <div className="min-h-screen flex flex-col items-center justify-center py-32 px-4">
              <nav className="flex flex-col items-center gap-6 md:gap-8 text-center">
                {navItems.map((item) => (
                  <Link key={item.path} href={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "font-menu font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-wider transition-colors duration-300",
                      location.pathname === item.path ? "text-white" : "text-white/40 hover:text-white"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
                
                {guideItems.map((item) => {
                  if (item.path === "#crea-viaggio") {
                    return (
                      <button key={item.path}
                        onClick={() => { setMobileOpen(false); useFormStore.getState().openForm(); }}
                        className={cn(
                          "font-menu font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-wider transition-colors duration-300",
                          location.pathname === item.path ? "text-white" : "text-white/40 hover:text-white"
                        )}
                      >
                        {item.label}
                      </button>
                    );
                  }
                  return (
                    <Link key={item.path} href={item.path}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "font-menu font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-wider transition-colors duration-300",
                        location.pathname === item.path ? "text-white" : "text-white/40 hover:text-white"
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Sunset glow top border */}
      <div className="glow-line" />
      
      <div className="bg-dark-section py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <p className="text-2xl font-display font-bold mb-2">
                <span className="text-primary">IBIZA</span>
                <span className="text-foreground/50 font-light ml-1.5">WITH</span>
                <span className="text-foreground ml-1.5">ALE</span>
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Travel planning Ibiza & Formentera
              </p>
              <p className="text-xs text-muted-foreground/70 leading-relaxed">
                Manager <a href="https://instagram.com/realcilexibiza" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors">@realcilexibiza</a>
                <br />
                Collaborazioni attive con CILEX Ibiza e partner locali.
              </p>
            </div>
            <div>
              <h4 className="font-display font-semibold mb-4 text-xs uppercase tracking-widest text-muted-foreground">Guide Ibiza</h4>
              <ul className="space-y-2">
                {guideItems.map((item) => (
                  <li key={item.path}>
                    <Link href={item.path}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-display font-semibold mb-4 text-xs uppercase tracking-widest text-muted-foreground">Socials</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="https://instagram.com/allaboutibiza_ale" target="_blank" rel="noopener noreferrer" className="group text-muted-foreground hover:text-foreground transition-all duration-300 flex items-center gap-2">
                    <InstagramIcon className="opacity-75 group-hover:opacity-100 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(225,48,108,0.5)]" /> Instagram
                  </a>
                </li>
                <li>
                  <a href="https://www.tiktok.com/@alessandra_ibizaplanner" target="_blank" rel="noopener noreferrer" className="group text-muted-foreground hover:text-foreground transition-all duration-300 flex items-center gap-2">
                    <TiktokIcon className="opacity-75 group-hover:opacity-100 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(0,242,254,0.5)]" /> TikTok
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="glow-line mb-8" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground/40">
              © {new Date().getFullYear()} Ibiza With Ale. Tutti i diritti riservati.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-0">{children}</main>
      <Footer />
      <TypeformPopup />
    </div>
  );
}

export { WHATSAPP_URL };

