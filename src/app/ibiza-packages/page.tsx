"use client";
import Image from "next/image";
import { CtaButton } from "@/components/CtaButton";
import { cn } from "@/lib/utils";
import AnimatedSection from "@/components/AnimatedSection";
import { 
  HomeIcon, 
  LightningBoltIcon, 
  StarIcon, 
  GlobeIcon, 
  PaperPlaneIcon, 
  CheckCircledIcon,
  CookieIcon,
  HeartIcon
} from "@radix-ui/react-icons";
import { useFormStore } from "@/store/useFormStore";

const completePackages = [
  {
    title: "CILEX EASY STAY",
    price: "1490€",
    target: "Prima volta a Ibiza / gruppi giovani",
    alloggio: "5 notti appartamento condiviso Playa d'en Bossa / San Antonio",
    include: [
      "2 Tantra Open Bar",
      "3 serate",
      "America Paella Experience",
    ],
    omaggio: "Beach Club accesso"
  },
  {
    title: "CILEX PARTY HOUSE",
    price: "1690€",
    target: "Gruppi party",
    alloggio: "5 notti appartamento centrale",
    include: [
      "2 Tantra Open Bar",
      "1 Angelo's Open Bar",
      "3 serate",
      "Boat Party Premium",
      "Rigatoni Dinner Show",
    ],
    omaggio: "Pool Party"
  },
  {
    title: "CILEX SUNSET VIBES",
    price: "1790€",
    target: "Girls trip / vibes / coppie",
    alloggio: "5 notti appartamento vista mare",
    include: [
      "Pavone Dinner",
      "La Cueva Cala Bassa",
      "Formentera mezza giornata",
      "2 Open Bar",
      "3 serate",
    ],
    omaggio: "Drink sunset"
  },
  {
    title: "CILEX FULL IBIZA",
    price: "1990€",
    target: "Esperienza completa",
    alloggio: "5 notti appartamento premium",
    include: [
      "Formentera all inclusive",
      "Boat Party Premium",
      "2 Tantra Open Bar",
      "1 Angelo's Open Bar",
      "3 serate",
      "Rigatoni Dinner Show",
    ],
    omaggio: "Beach Club con drink"
  },
  {
    title: "CILEX GOLD EXPERIENCE",
    price: "2190€",
    target: "Gruppi organizzati",
    alloggio: "5 notti appartamento premium",
    include: [
      "Formentera all inclusive",
      "Boat Party Premium",
      "2 Tantra Open Bar",
      "2 Angelo's Open Bar",
      "4 serate",
      "Rigatoni Dinner",
      "Pavone Dinner",
    ],
    omaggio: "Pool Party VIP"
  },
  {
    title: "CILEX BEACH LIFE",
    price: "2390€",
    target: "Ibiza lifestyle",
    alloggio: "5 notti appartamento Playa d'en Bossa",
    include: [
      "La Cueva Cala Bassa",
      "Formentera all inclusive",
      "2 Open Bar",
      "4 serate",
      "Pavone Dinner",
      "America Paella Experience",
    ],
    omaggio: "Beach Club Experience"
  },
  {
    title: "CILEX NON STOP",
    price: "2590€",
    target: "Party people",
    alloggio: "5 notti appartamento party area",
    include: [
      "Boat Party Premium",
      "Formentera all inclusive",
      "3 Tantra Open Bar",
      "2 Angelo's Open Bar",
      "4 serate top",
      "Rigatoni Dinner Show",
    ],
    omaggio: "Pool Party VIP"
  },
  {
    title: "CILEX COUPLE ESCAPE",
    price: "2790€",
    target: "Coppie",
    alloggio: "5 notti appartamento romantico vista mare",
    include: [
      "Pavone Dinner",
      "Rigatoni Dinner",
      "La Cueva Experience",
      "Formentera all inclusive",
      "3 serate premium",
    ],
    omaggio: "Sunset Experience"
  },
  {
    title: "CILEX PLATINUM",
    price: "3190€",
    target: "Gruppi premium",
    alloggio: "5 notti appartamento luxury",
    include: [
      "Boat Party Premium",
      "Formentera VIP",
      "3 Tantra Open Bar",
      "2 Angelo's Open Bar",
      "5 serate top club",
      "Rigatoni Dinner",
      "Pavone Dinner",
      "La Cueva Cala Bassa",
    ],
    omaggio: "VIP Beach Experience"
  },
  {
    title: "CILEX PRO MAX VILLA",
    price: "3990€",
    target: "Luxury groups",
    alloggio: "5 notti villa con piscina",
    include: [
      "Boat Party Premium",
      "Formentera VIP",
      "3 Tantra Open Bar",
      "3 Angelo's Open Bar",
      "5 serate premium",
      "Tutte le dinner experiences",
      "Beach club multipli",
    ],
    omaggio: "Pool Party VIP + Beach Club drink"
  },
];

const partyPacks = [
  {
    title: "CILEX EASY PARTY",
    price: "470€",
    include: [
      "2 Tantra Open Bar",
      "3 serate",
      "1 America Paella Experience",
    ],
    omaggio: "Beach Club accesso"
  },
  {
    title: "CILEX SUNSET PARTY",
    price: "650€",
    include: [
      "2 Tantra Open Bar",
      "1 Angelo's Open Bar",
      "3 serate",
      "1 Pavone Dinner",
    ],
    omaggio: "Drink incluso"
  },
  {
    title: "CILEX PARTY VIBES",
    price: "790€",
    include: [
      "2 Tantra Open Bar",
      "1 Angelo's Open Bar",
      "3 serate",
      "1 Boat Party Premium",
      "1 Rigatoni Dinner Show",
    ],
    omaggio: "Pool Party"
  },
  {
    title: "CILEX FORMENTERA EXPERIENCE",
    price: "890€",
    include: [
      "1 Formentera mezza giornata all inclusive",
      "2 Tantra Open Bar",
      "1 Angelo's Open Bar",
      "3 serate",
    ],
    omaggio: "Beach Club + drink"
  },
  {
    title: "CILEX GOLD PARTY",
    price: "990€",
    include: [
      "1 Formentera all day all inclusive",
      "2 Tantra Open Bar",
      "2 Angelo's Open Bar",
      "3 serate premium",
      "1 Rigatoni Dinner Show",
    ],
    omaggio: "Pool Party VIP"
  },
  {
    title: "CILEX BEACH & PARTY",
    price: "1150€",
    include: [
      "1 Formentera all inclusive",
      "1 La Cueva Cala Bassa",
      "2 Open Bar",
      "4 serate",
      "1 Pavone Dinner",
    ],
    omaggio: "Beach Club Experience"
  },
  {
    title: "CILEX NON STOP",
    price: "1350€",
    include: [
      "1 Boat Party Premium",
      "1 Formentera all inclusive",
      "3 Tantra Open Bar",
      "2 Angelo's Open Bar",
      "4 serate top",
    ],
    omaggio: "Pool Party VIP"
  },
  {
    title: "CILEX PREMIUM PARTY",
    price: "1590€",
    include: [
      "1 Boat Party Premium",
      "1 Formentera VIP",
      "3 Tantra Open Bar",
      "2 Angelo's Open Bar",
      "5 serate premium",
      "1 Rigatoni Dinner",
    ],
    omaggio: "VIP Beach Experience"
  },
];

export default function INostriPacchettiIbiza() {
  const { openForm } = useFormStore();
  
  return (
    <>
      {/* Hero */}
      <section className="relative pt-24 pb-12 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image fill sizes="100vw" src="https://images.unsplash.com/photo-1520454974749-611b7248ffdb?w=1920&q=80" alt="Ibiza beach" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/75 to-background" />
        </div>
        <div className="container relative z-10">
          <AnimatedSection>
            <p className="text-sm font-medium text-primary uppercase tracking-widest mb-4">Stagione 2026</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black leading-[0.9] mb-6">
              I Nostri Pacchetti
              <br />
              <span className="text-primary">Ibiza 2026</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Dall'esperienza completa con alloggio, boat party ed eventi esclusivi, fino ai nostri "Party Packs" per chi ha già dove dormire e cerca solo il massimo dalla nightlife.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Pacchetti Completi (con alloggio) */}
      <section className="py-16 md:py-24 bg-dark-section">
        <div className="container">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <HomeIcon className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold">
                Pacchetti Completi
              </h2>
            </div>
            <p className="text-muted-foreground mb-16 text-lg max-w-2xl">
              La soluzione ideale per chi vuole vivere l'isola senza pensieri. Includono alloggio per 5 notti, esperienze selezionate e omaggi esclusivi. Prezzi intesi a persona.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completePackages.map((pack, i) => {
              const isBest = pack.title === "CILEX FULL IBIZA";
              return (
              <AnimatedSection key={pack.title} delay={i * 0.05}>
                <div className={cn(
                  "group flex flex-col backdrop-blur-sm rounded-2xl p-8 transition-all duration-500 h-full relative overflow-hidden",
                  isBest ? "bg-card/60 border-2 border-[#d946ef] shadow-[0_0_30px_rgba(217,70,239,0.15)]" : "bg-card/40 border border-border/20 hover:border-[#d946ef]/30"
                )}>
                  {isBest && (
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#d946ef] to-transparent" />
                  )}
                  {isBest && (
                    <div className="absolute top-4 right-4 bg-[#d946ef]/10 text-[#d946ef] text-xs font-bold px-3 py-1 rounded-full border border-[#d946ef]/20">
                      MIGLIOR SCELTA
                    </div>
                  )}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -z-10 group-hover:bg-primary/10 transition-colors duration-500" />
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-display font-bold text-foreground mb-1">{pack.title}</h3>
                    <p className="text-sm text-muted-foreground mb-6 h-10 flex items-center">
                      Target: <span className="text-foreground ml-1 font-medium">{pack.target}</span>
                    </p>
                    
                    <div className="mb-6 pb-6 border-b border-border/20">
                      <p className="text-4xl font-display font-black text-primary">{pack.price}</p>
                      <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">A persona</p>
                    </div>

                    <div className="space-y-4 mb-8">
                      <div className="flex items-start gap-3">
                        <HomeIcon className="w-4 h-4 text-primary mt-1 shrink-0" />
                        <p className="text-sm text-foreground/80">{pack.alloggio}</p>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <CheckCircledIcon className="w-4 h-4 text-primary mt-1 shrink-0" />
                        <ul className="text-sm text-foreground/80 space-y-1">
                          {pack.include.map((item, j) => (
                            <li key={j}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto pt-6 border-t border-border/20 flex flex-col gap-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-sunset-gold bg-sunset-gold/10 px-4 py-2 rounded-lg">
                      <StarIcon className="w-4 h-4 shrink-0" />
                      Omaggio: {pack.omaggio}
                    </div>
                    <button 
                      onClick={() => openForm(pack.title)}
                      className={cn(
                        "w-full py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2",
                        isBest ? "bg-[#d946ef] text-white hover:bg-[#a21caf]" : "bg-card border border-border/40 hover:border-[#d946ef]/50 hover:bg-[#d946ef]/10 text-foreground"
                      )}
                    >
                      Richiedi questo pacchetto
                    </button>
                  </div>
                </div>
              </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Party Packs (Senza Alloggio) */}
      <section className="py-16 md:py-24 bg-dark-alt relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="container relative z-10">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-sunset-gold/20 flex items-center justify-center">
                <LightningBoltIcon className="w-5 h-5 text-sunset-gold" />
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold">
                Party Packs
              </h2>
            </div>
            <p className="text-muted-foreground mb-16 text-lg max-w-2xl">
              Hai già un alloggio? I nostri Party Packs sono pensati per darti accesso alle migliori serate ed esperienze al miglior prezzo garantito. Prezzi intesi a persona.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partyPacks.map((pack, i) => {
              const isBest = pack.title === "CILEX PARTY VIBES";
              return (
              <AnimatedSection key={pack.title} delay={i * 0.05}>
                <div className={cn(
                  "group flex flex-col backdrop-blur-md rounded-2xl p-6 transition-all duration-300 h-full shadow-lg relative",
                  isBest ? "bg-card/80 border-2 border-sunset-gold shadow-[0_0_20px_rgba(253,186,116,0.15)]" : "bg-card/60 border border-border/30 hover:border-primary/40"
                )}>
                  {isBest && (
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-sunset-gold to-transparent" />
                  )}
                  <h3 className="text-lg font-display font-bold text-foreground mb-4 pr-16">{pack.title}</h3>
                  {isBest && (
                    <div className="absolute top-5 right-5 bg-sunset-gold/10 text-sunset-gold text-[10px] font-bold px-2 py-0.5 rounded-full border border-sunset-gold/20">
                      PIÙ SCELTO
                    </div>
                  )}
                  
                  <div className="mb-5 pb-5 border-b border-border/20">
                    <p className="text-3xl font-display font-black text-foreground group-hover:text-primary transition-colors">{pack.price}</p>
                    <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">A persona</p>
                  </div>

                  <div className="space-y-3 mb-6 flex-1">
                    {pack.include.map((item, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <CheckCircledIcon className="w-4 h-4 text-primary/70 mt-0.5 shrink-0" />
                        <span className="text-sm text-foreground/80 leading-tight">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-4 border-t border-border/20 flex flex-col gap-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-primary bg-primary/10 px-3 py-2 rounded-md">
                      <StarIcon className="w-3.5 h-3.5 shrink-0" />
                      Omaggio: {pack.omaggio}
                    </div>
                    <button 
                      onClick={() => openForm(pack.title)}
                      className={cn(
                        "w-full py-2.5 rounded-lg font-semibold text-sm transition-all duration-300",
                        isBest ? "bg-sunset-gold text-background hover:bg-yellow-500" : "bg-muted/30 border border-border/40 hover:bg-muted/50 text-foreground"
                      )}
                    >
                      Richiedi questo
                    </button>
                  </div>
                </div>
              </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(217,70,239,0.15),transparent_60%)] border-t border-white/5" />
        <div className="container relative z-10 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-primary-foreground mb-6">
              Hai trovato il pacchetto perfetto?
            </h2>
            <p className="text-primary-foreground/70 mb-10 max-w-lg mx-auto text-lg">
              I prezzi possono variare in base alla disponibilità. Blocca il tuo pacchetto o richiedine uno personalizzato in base alle tue date.
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
