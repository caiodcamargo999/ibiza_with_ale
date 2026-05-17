"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import { ClipboardList, Send, CheckCircle, PhoneCall, FileText, ListChecks, Bell, MessageCircle, ArrowRight } from "lucide-react";

const steps = [
  { icon: ClipboardList, title: "Raccolta informazioni viaggio", desc: "Compili il form con date, budget, composizione del gruppo, zona e obiettivi. In pochi minuti ho tutto il necessario per iniziare a lavorare sulla tua proposta." },
  { icon: Send, title: "Analisi e proposta personalizzata", desc: "Studio le tue esigenze, analizzo le opzioni disponibili e ti invio una proposta dettagliata con soluzioni, alternative e consigli ragionati." },
  { icon: CheckCircle, title: "Organizzazione e coordinamento", desc: "Una volta confermato, coordino tutto: alloggi, trasporti, esperienze, prenotazioni. Tu non devi pensare a nulla." },
  { icon: PhoneCall, title: "Supporto prima e durante il soggiorno", desc: "Ti seguo dalla fase di pianificazione fino alla fine del viaggio. Qualsiasi dubbio o imprevisto, ci sono." },
];

const receives = [
  { icon: FileText, text: "Piano chiaro e dettagliato" },
  { icon: ListChecks, text: "Opzioni ragionate, non una lista infinita" },
  { icon: ClipboardList, text: "Checklist pre-partenza" },
  { icon: Bell, text: "Supporto e aggiornamenti costanti" },
];

export default function ComeFunzionaPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-28 md:py-36 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1920&q=80" alt="Ibiza spiaggia" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>
        <div className="container text-center relative z-10">
          <AnimatedSection>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
              <span className="text-gradient-sunset">Come funziona</span>
            </h1>
            <p className="text-lg text-muted-foreground">Zero stress, quattro step, risultato concreto.</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Steps */}
      <section className="py-24 bg-dark-alt">
        <div className="container max-w-4xl">
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-sunset-red/40 via-sunset-orange/30 to-sunset-purple/20 hidden md:block" />
            <div className="space-y-12">
              {steps.map((s, i) => (
                <AnimatedSection key={s.title} delay={i * 0.15}>
                  <div className="flex items-start gap-6">
                    <div className="relative z-10 w-12 h-12 rounded-xl bg-gradient-warm flex items-center justify-center flex-shrink-0 shadow-glow-orange">
                      <s.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-lg font-display font-bold mb-2">
                        <span className="text-sunset-gold mr-2">Step {i + 1}:</span>
                        {s.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>

          <AnimatedSection delay={0.6}>
            <p className="mt-12 text-sm text-muted-foreground/70 italic border-l-2 border-sunset-orange/30 pl-4">
              Lavoro in collaborazione con partner locali e realtà turistiche dell'isola per garantire un servizio sempre aggiornato e affidabile.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* What you receive */}
      <section className="py-24 bg-dark-section watermark-ale relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-sunset opacity-20" />
        <div className="container max-w-3xl relative z-10">
          <AnimatedSection>
            <h2 className="text-3xl font-display font-bold text-center mb-10">
              Cosa <span className="text-gradient-warm">ricevi</span>
            </h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 gap-4">
            {receives.map((r, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="bg-card/40 backdrop-blur-sm rounded-xl p-5 border border-border/20 flex items-center gap-4 hover:border-sunset-orange/15 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-gradient-warm flex items-center justify-center flex-shrink-0 shadow-glow-orange">
                    <r.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <p className="text-sm font-medium">{r.text}</p>
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
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-6">Pronta/o a partire?</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contatti" className={cn(buttonVariants({ size: 'xl' }), "bg-background text-foreground hover:bg-background/90 shadow-elevated font-bold")}>
                  Richiedi il tuo piano viaggio <ArrowRight className="w-5 h-5" />
                </Link>
              
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
