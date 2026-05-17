"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, MessageCircle, Instagram, ChevronDown } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Chi sono", path: "/chi-sono" },
  { label: "Servizi", path: "/servizi" },
  { label: "Come funziona", path: "/come-funziona" },
];

const guideItems = [
  { label: "Quanto costa Ibiza 2026", path: "/quanto-costa-ibiza" },
  { label: "Errori da evitare", path: "/errori-ibiza" },
  { label: "Spiagge più belle", path: "/spiagge-ibiza" },
  { label: "Zone dove dormire", path: "/zone-ibiza" },
  { label: "Itinerari", path: "/itinerari" },
  { label: "Pacchetti esperienze", path: "/pacchetti" },
  { label: "Calendario party 2026", path: "/calendario-party" },
  { label: "🧭 Crea il tuo viaggio", path: "/crea-viaggio" },
];

const WHATSAPP_URL = "https://wa.me/393XXXXXXXXX?text=Ciao%20Alessandra!%20Vorrei%20info%20su%20Ibiza";

function GuideDropdown() {
  const [open, setOpen] = useState(false);
  const location = usePathname();
  const isGuide = guideItems.some(g => g.path === location.pathname);

  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
          isGuide ? "text-foreground bg-card" : "text-muted-foreground hover:text-foreground hover:bg-card/50"
        }`}
      >
        Guide <ChevronDown className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-1 w-56 bg-card/95 backdrop-blur-xl border border-border/30 rounded-xl shadow-elevated overflow-hidden"
          >
            {guideItems.map((item) => (
              <Link key={item.path} href={item.path}
                onClick={() => setOpen(false)}
                className={`block px-4 py-2.5 text-sm transition-colors ${
                  location.pathname === item.path
                    ? "text-foreground bg-card"
                    : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-xl border-b border-border/30">
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-display font-bold tracking-tight">
            <span className="text-gradient-warm">IBIZA</span>
            <span className="text-foreground/60 font-light ml-1.5">WITH</span>
            <span className="text-foreground ml-1.5">ALE</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link key={item.path} href={item.path}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? "text-foreground bg-card"
                  : "text-muted-foreground hover:text-foreground hover:bg-card/50"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <GuideDropdown />
          <Link href="/crea-viaggio" className={cn(buttonVariants({ variant: "hero" }), "ml-3")}>
            <div className="w-7 h-7 rounded-full bg-[#EA580C] flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105 shrink-0">
              <ChevronDown className="w-3.5 h-3.5 text-white -rotate-90 transform transition-transform duration-300 group-hover:translate-x-0.5" />
            </div>
            <span className="text-xs font-bold tracking-wide">
              Richiedi piano viaggio
            </span>
          </Link>
        </nav>

        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black border-b border-border/30 relative z-50 shadow-2xl"
          >
            <nav className="container py-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? "text-foreground bg-card"
                      : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <p className="px-4 pt-3 pb-1 text-xs uppercase tracking-widest text-muted-foreground/40 font-semibold">Guide</p>
              {guideItems.map((item) => (
                <Link key={item.path} href={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? "text-foreground bg-card"
                      : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/crea-viaggio" onClick={() => setMobileOpen(false)} className={cn(buttonVariants({ variant: "hero" }), "mt-2 justify-center")}>
                <div className="w-8 h-8 rounded-full bg-[#EA580C] flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105 shrink-0">
                  <ChevronDown className="w-4 h-4 text-white -rotate-90 transform transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>
                <span className="text-sm font-bold tracking-wide">
                  Richiedi piano viaggio
                </span>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Sunset glow top border */}
      <div className="glow-line" />
      
      <div className="bg-dark-section py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <p className="text-2xl font-display font-bold mb-2">
                <span className="text-gradient-warm">IBIZA</span>
                <span className="text-foreground/50 font-light ml-1.5">WITH</span>
                <span className="text-foreground ml-1.5">ALE</span>
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Travel planning Ibiza & Formentera
              </p>
              <p className="text-xs text-muted-foreground/70 leading-relaxed">
                Manager <a href="https://instagram.com/realcilexibiza" target="_blank" rel="noopener noreferrer" className="text-sunset-orange hover:text-sunset-gold transition-colors">@realcilexibiza</a>
                <br />
                Collaborazioni attive con CILEX Ibiza e partner locali.
              </p>
            </div>
            <div>
              <h4 className="font-display font-semibold mb-4 text-xs uppercase tracking-widest text-muted-foreground">Menu</h4>
              <ul className="space-y-2">
                {navItems.map((item) => (
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
              <h4 className="font-display font-semibold mb-4 text-xs uppercase tracking-widest text-muted-foreground">Contatti</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="https://instagram.com/allaboutibiza_ale" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-sunset-purple transition-colors flex items-center gap-2">
                    <Instagram className="w-4 h-4" /> Instagram
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
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
    </div>
  );
}

export { WHATSAPP_URL };

