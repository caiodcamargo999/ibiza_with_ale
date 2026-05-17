"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import {
  ClipboardList, Home as HomeIcon, Car, MapPin, Ship, Wine, Music, Utensils,
  ArrowRight, CheckCircle, Zap, Crown, Award, MessageCircle, Handshake
} from "lucide-react";

const services = [
  {
    icon: ClipboardList,
    title: "Pianificazione completa personalizzata",
    subtitle: "Il servizio principale",
    includes: ["Analisi completa delle esigenze del gruppo", "Proposta itinerario personalizzato", "Logistica e coordinamento totale", "Prenotazioni e consigli dedicati", "Supporto costante"],
    forWho: "Chi vuole un piano completo costruito su misura, senza pensieri.",
    howItWorks: "Compili il form, analizzo le tue esigenze e ti invio una proposta dettagliata con soluzioni e alternative.",
  },
  {
    icon: HomeIcon,
    title: "Selezione alloggi strategici",
    includes: ["Selezione in base a zona, budget e stile", "Analisi della posizione strategica", "Valutazione distanza da club, spiagge, servizi", "Supporto nella scelta finale"],
    forWho: "Chi cerca un alloggio nella zona giusta per il proprio tipo di viaggio.",
    howItWorks: "Indicami date, budget e stile: ti propongo le soluzioni più strategiche.",
  },
  {
    icon: Car,
    title: "Trasporti e mobilità sull'isola",
    includes: ["Opzioni di noleggio auto e scooter", "Consigli sugli spostamenti tra zone", "Soluzioni in base alla posizione dell'alloggio"],
    forWho: "Chi vuole muoversi liberamente senza sprechi di tempo.",
    howItWorks: "Ti indico le opzioni migliori in base a dove alloggi e cosa vuoi fare.",
  },
  {
    icon: MapPin,
    title: "Formentera (escursioni)",
    includes: ["Formule giornaliere e mezza giornata", "Consigli su orari, spiagge e logistica", "Cosa aspettarsi dall'esperienza"],
    forWho: "Chi vuole visitare Formentera senza stress organizzativo.",
    howItWorks: "Ti consiglio la formula giusta e organizzo tutto il necessario.",
  },
  {
    icon: Ship,
    title: "Boat party",
    includes: ["Diverse tipologie di boat party", "Indicazioni su target e atmosfera", "Cosa è compreso e cosa portare"],
    forWho: "Chi vuole vivere l'esperienza in barca a Ibiza.",
    howItWorks: "Ti guido nella scelta della boat party più adatta al tuo gruppo.",
  },
  {
    icon: Wine,
    title: "Open bar / pre-party (3 ore)",
    includes: ["Come funziona l'open bar", "A chi conviene e regole principali", "Integrazione con le serate"],
    forWho: "Chi vuole iniziare la serata nel modo giusto.",
    howItWorks: "Ti spiego le opzioni disponibili e organizzo la prenotazione.",
  },
  {
    icon: Music,
    title: "Club: guest list / ingressi / tavoli",
    includes: ["Orientamento sulla scelta delle serate", "Regole di ingresso e dress code", "Orari consigliati e consigli pratici", "Gestione guest list dove disponibile"],
    forWho: "Chi vuole vivere la nightlife senza imprevisti.",
    howItWorks: "Ti aiuto a scegliere le serate e gestisco accessi dove possibile.",
  },
  {
    icon: Utensils,
    title: "Itinerari + ristoranti + consigli locali",
    includes: ["Consigli su spiagge, ristoranti, mercati", "Itinerari giorno per giorno", "Tips pratici basati su esperienza diretta"],
    forWho: "Tutti. Incluso come valore aggiunto nel pacchetto.",
    howItWorks: "Ricevi consigli personalizzati integrati nel piano viaggio.",
  },
];

const tiers = [
  {
    icon: Zap,
    name: "Essentials",
    desc: "Per chi ha già qualcosa e vuole completare il piano.",
    features: ["Consulenza mirata", "Organizzazione servizi singoli", "Supporto via chat"],
  },
  {
    icon: Award,
    name: "Complete",
    desc: "Consigliato. Il pacchetto completo su misura.",
    features: ["Tutto incluso nel planning", "Itinerario personalizzato", "Coordinamento completo", "Assistenza dedicata"],
    recommended: true,
  },
  {
    icon: Crown,
    name: "VIP",
    desc: "Massima assistenza, zero pensieri.",
    features: ["Tutto del Complete", "Priorità nelle risposte", "Assistenza H24 durante il viaggio", "Soluzioni last minute"],
  },
];

export default function ServiziPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-28 md:py-36 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1569470128243-d343461b17b5?w=1920&q=80" alt="Ibiza panorama" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>
        <div className="container text-center relative z-10">
          <AnimatedSection>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
              <span className="text-gradient-sunset">Servizi</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg mx-auto">
              Tutto quello che posso organizzarti per vivere Ibiza nel modo giusto.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-dark-alt">
        <div className="container space-y-6">
          {services.map((s, i) => (
            <AnimatedSection key={s.title} delay={i * 0.05}>
              <div className="bg-card/40 backdrop-blur-sm rounded-2xl p-8 border border-border/20 hover:border-sunset-orange/15 transition-all">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-warm flex items-center justify-center flex-shrink-0 shadow-glow-orange">
                    <s.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold">{s.title}</h3>
                    {s.subtitle && <p className="text-sm text-sunset-orange font-medium">{s.subtitle}</p>}
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="text-xs font-display font-semibold uppercase tracking-widest text-muted-foreground mb-3">Cosa include</h4>
                    <ul className="space-y-2">
                      {s.includes.map((inc) => (
                        <li key={inc} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 mt-0.5 text-sunset-gold flex-shrink-0" />
                          {inc}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-display font-semibold uppercase tracking-widest text-muted-foreground mb-3">Per chi è</h4>
                    <p className="text-sm text-muted-foreground">{s.forWho}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-display font-semibold uppercase tracking-widest text-muted-foreground mb-3">Come funziona</h4>
                    <p className="text-sm text-muted-foreground mb-4">{s.howItWorks}</p>
                    <Link href="/contatti" className={buttonVariants({ variant: 'outline-brand', size: 'sm' })}>
                        Richiedi <ArrowRight className="w-3 h-3" />
                      </Link>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Tiers */}
      <section className="py-24 bg-dark-section watermark-ale relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-sunset opacity-20" />
        <div className="container">
          <AnimatedSection>
            <h2 className="text-3xl font-display font-bold text-center mb-4">
              Scegli il tuo livello di <span className="text-gradient-warm">supporto</span>
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-md mx-auto">
              Prezzo in base a date, budget e richieste. Nessun costo fisso.
            </p>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {tiers.map((t, i) => (
              <AnimatedSection key={t.name} delay={i * 0.1}>
                <div className={`bg-card/40 backdrop-blur-sm rounded-2xl p-8 border h-full flex flex-col relative transition-all ${t.recommended ? "border-sunset-orange/40 shadow-glow-orange" : "border-border/20 hover:border-sunset-orange/15"}`}>
                  {t.recommended && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-warm text-primary-foreground text-xs font-bold px-4 py-1 rounded-full shadow-glow-orange">
                      Consigliato
                    </span>
                  )}
                  <div className="w-12 h-12 rounded-xl bg-gradient-warm flex items-center justify-center mb-4 shadow-glow-orange">
                    <t.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-display font-bold mb-2">{t.name}</h3>
                  <p className="text-sm text-muted-foreground mb-6">{t.desc}</p>
                  <ul className="space-y-3 flex-1">
                    {t.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 mt-0.5 text-sunset-gold flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contatti" className={cn(buttonVariants({ variant: t.recommended ? "hero" : "outline-brand", size: 'lg' }), "mt-6 w-full")}>Richiedi info</Link>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        <div className="container relative z-10 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-6">Hai le idee più chiare?</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contatti" className={cn(buttonVariants({ size: 'xl' }), "bg-background text-foreground hover:bg-background/90 shadow-elevated font-bold")}>Richiedi il tuo piano viaggio</Link>
              
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
