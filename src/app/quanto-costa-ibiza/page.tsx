"use client";
import { CtaButton } from "@/components/CtaButton";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import { ArrowRight, MessageCircle, Euro, Utensils, Home, Car, Music, Ship, Umbrella, CreditCard } from "lucide-react";

const costCategories = [
  {
    icon: Home,
    title: "Alloggio",
    range: "40–250€ a notte a persona",
    details: [
      "Appartamento condiviso in gruppo (4–6 persone): da 40€ a notte a persona in zone come San Antonio o Santa Eulalia.",
      "Appartamento a Playa d'en Bossa o Ibiza Town: da 60–120€ a notte a persona, a seconda della stagione e della posizione.",
      "Villa privata per gruppi grandi (8–12 persone): da 80–250€ a notte a persona, con piscina e spazi comuni.",
      "Hotel 4 stelle: da 120–300€ a notte in camera doppia.",
      "La zona scelta incide enormemente sul prezzo. San Antonio è più economica, Playa d'en Bossa e Ibiza Town sono più care ma strategiche per la nightlife.",
    ],
  },
  {
    icon: Car,
    title: "Trasporti e mobilità",
    range: "25–80€ al giorno",
    details: [
      "Noleggio auto: da 30–80€ al giorno in alta stagione. Prenotare con anticipo può abbassare i costi del 30–40%.",
      "Noleggio scooter: da 25–45€ al giorno. Ideale per coppie o chi vuole muoversi agilmente.",
      "Taxi: una corsa dall'aeroporto a Playa d'en Bossa costa circa 15–25€. Una corsa da San Antonio a Ibiza Town circa 30–40€.",
      "Bus: l'opzione più economica, da 2–4€ a corsa. Funziona bene di giorno ma ha limitazioni di sera.",
      "Consiglio: se siete un gruppo, l'auto è quasi sempre la scelta migliore in termini di rapporto qualità-prezzo.",
    ],
  },
  {
    icon: Utensils,
    title: "Mangiare e bere",
    range: "15–80€ a pasto",
    details: [
      "Pranzo in un chiringuito sulla spiaggia: 15–25€ a persona.",
      "Cena in un ristorante locale di qualità: 30–50€ a persona.",
      "Cena in un ristorante premium (Es Torrent, Casa Maca): 60–100€ a persona.",
      "Aperitivo in un beach club: 15–25€ a drink. I cocktail nei locali notturni costano 15–20€.",
      "Fare la spesa al supermercato è un modo intelligente per risparmiare su colazione e pranzi veloci.",
    ],
  },
  {
    icon: Music,
    title: "Nightlife e club",
    range: "30–150€ a serata",
    details: [
      "Ingresso club con guest list: spesso gratuito o ridotto (15–30€) se organizzato in anticipo.",
      "Ingresso senza guest list: 30–70€ a seconda del club e dell'evento.",
      "Drink nei club: 15–20€ per cocktail, 10–15€ per birra.",
      "Tavolo VIP: da 300€ in su, divisibile nel gruppo. Il costo varia molto in base al club e alla serata.",
      "Open bar pre-party (3 ore): 30–50€. Ottimo modo per iniziare la serata risparmiando sui drink.",
    ],
  },
  {
    icon: Ship,
    title: "Esperienze ed escursioni",
    range: "40–200€ a persona",
    details: [
      "Boat party: da 60–120€ a persona, include drink e DJ set.",
      "Escursione a Formentera (traghetto A/R): 25–40€. Con noleggio scooter o auto a Formentera: +30–50€.",
      "Giornata in catamarano privato (gruppo): da 100–200€ a persona.",
      "Beach club (lettino + consumazione minima): da 40–150€ a persona a seconda del locale.",
      "Jet ski, paddleboard, kayak: 30–80€ per sessione.",
    ],
  },
  {
    icon: Umbrella,
    title: "Spiagge",
    range: "0–60€",
    details: [
      "Molte spiagge a Ibiza sono gratuite e accessibili a tutti (Cala Comte, Ses Salines, Cala Salada).",
      "Lettino + ombrellone in spiagge attrezzate: 15–40€ al giorno.",
      "Lettino in beach club premium: 40–100€, spesso con consumazione minima inclusa.",
      "Parcheggio vicino alle spiagge più famose: 5–10€ in alta stagione.",
      "Consiglio: le spiagge meno conosciute sono spesso più belle e completamente gratuite.",
    ],
  },
];

const budgetExamples = [
  {
    title: "Budget contenuto",
    subtitle: "5 giorni · coppia o piccolo gruppo",
    total: "600–900€ a persona",
    includes: ["Appartamento condiviso in zona accessibile", "Scooter o bus per spostarsi", "Pranzi in chiringuito, cene economiche", "1–2 serate con guest list", "Spiagge libere e Formentera in traghetto"],
  },
  {
    title: "Budget medio",
    subtitle: "7 giorni · gruppo di amici",
    total: "1.200–1.800€ a persona",
    includes: ["Appartamento in buona posizione", "Auto a noleggio condivisa", "Mix di ristoranti e self-catering", "3–4 serate nei club principali", "Boat party + Formentera + beach club"],
  },
  {
    title: "Budget premium",
    subtitle: "7–10 giorni · esperienza completa",
    total: "2.500–4.000€+ a persona",
    includes: ["Villa con piscina o hotel 4 stelle", "Auto a noleggio dedicata", "Ristoranti premium ogni sera", "Serate VIP con tavolo", "Tutte le esperienze: boat party, catamarano, beach club, Formentera"],
  },
];

export default function QuantoCostaIbiza() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-24 pb-12 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1520454974749-611b7248ffdb?w=1920&q=80" alt="Ibiza beach" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/75 to-background" />
        </div>
        <div className="container relative z-10">
          <AnimatedSection>
            <p className="text-sm font-medium text-sunset-orange uppercase tracking-widest mb-4">Guida prezzi 2026</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black leading-[0.9] mb-6">
              Quanto costa davvero
              <br />
              <span className="text-gradient-warm">Ibiza nel 2026</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Una guida onesta e dettagliata sui costi reali di una vacanza a Ibiza: alloggio, trasporti, cibo, nightlife, esperienze. Nessuna cifra inventata — solo dati aggiornati basati sulla mia esperienza diretta sull'isola.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Cost categories */}
      <section className="py-12 md:py-20 bg-dark-section">
        <div className="container">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              I costi di Ibiza,
              <span className="text-gradient-warm ml-2">voce per voce</span>
            </h2>
            <p className="text-muted-foreground mb-16 text-lg max-w-2xl">
              Ogni categoria con range di prezzo reali e consigli pratici per ottimizzare il budget.
            </p>
          </AnimatedSection>

          <div className="space-y-8">
            {costCategories.map((cat, i) => (
              <AnimatedSection key={cat.title} delay={i * 0.05}>
                <div className="group bg-card/40 backdrop-blur-sm rounded-2xl p-8 border border-border/20 hover:border-sunset-orange/20 transition-all duration-500">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-gradient-warm flex items-center justify-center flex-shrink-0 shadow-glow-orange">
                      <cat.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
                        <h3 className="text-xl font-display font-bold text-foreground">{cat.title}</h3>
                        <span className="text-sm font-medium text-sunset-gold bg-sunset-gold/10 px-3 py-1 rounded-full w-fit">{cat.range}</span>
                      </div>
                      <ul className="space-y-3">
                        {cat.details.map((d, j) => (
                          <li key={j} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
                            <span className="text-sunset-orange mt-1 flex-shrink-0">•</span>
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Budget examples */}
      <section className="py-12 md:py-20 bg-dark-alt">
        <div className="container">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Esempi di budget
              <span className="text-gradient-warm ml-2">realistici</span>
            </h2>
            <p className="text-muted-foreground mb-16 text-lg max-w-2xl">
              Tre scenari concreti per capire quanto prevedere in base al tuo stile di viaggio.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {budgetExamples.map((b, i) => (
              <AnimatedSection key={b.title} delay={i * 0.1}>
                <div className="relative bg-card/40 backdrop-blur-sm rounded-2xl p-8 border border-border/20 hover:border-sunset-orange/20 transition-all duration-500 h-full flex flex-col">
                  {i === 1 && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold text-primary-foreground bg-gradient-warm px-4 py-1 rounded-full">
                      Più scelto
                    </div>
                  )}
                  <h3 className="text-xl font-display font-bold text-foreground mb-1">{b.title}</h3>
                  <p className="text-xs text-muted-foreground/60 mb-4">{b.subtitle}</p>
                  <p className="text-2xl font-display font-bold text-gradient-warm mb-6">{b.total}</p>
                  <ul className="space-y-2 flex-1">
                    {b.includes.map((item, j) => (
                      <li key={j} className="text-sm text-muted-foreground flex gap-2">
                        <CreditCard className="w-3.5 h-3.5 text-sunset-orange mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(249,115,22,0.15),transparent_60%)] border-t border-white/5" />
        <div className="container relative z-10 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-primary-foreground mb-6">
              Vuoi ottimizzare il tuo budget Ibiza?
            </h2>
            <p className="text-primary-foreground/70 mb-10 max-w-lg mx-auto text-lg">
              Ti aiuto a costruire il viaggio migliore per il tuo budget, senza sprechi e senza sorprese.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <CtaButton />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
