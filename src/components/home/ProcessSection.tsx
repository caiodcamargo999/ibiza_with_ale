"use client";
import AnimatedSection from "@/components/AnimatedSection";
import { ReaderIcon, PaperPlaneIcon, CheckCircledIcon, MobileIcon } from "@radix-ui/react-icons";

const steps = [
  {
    icon: ReaderIcon,
    title: "Raccolta informazioni viaggio",
    desc: "Compili il form con date, budget, composizione del gruppo, zona e obiettivi. In pochi minuti ho tutto il necessario per iniziare a lavorare sulla tua proposta.",
  },
  {
    icon: PaperPlaneIcon,
    title: "Analisi e proposta personalizzata",
    desc: "Studio le tue esigenze, analizzo le opzioni disponibili e ti invio una proposta dettagliata con soluzioni, alternative e consigli ragionati.",
  },
  {
    icon: CheckCircledIcon,
    title: "Organizzazione e coordinamento",
    desc: "Una volta confermato, coordino tutto: alloggi, trasporti, esperienze, prenotazioni. Tu non devi pensare a nulla.",
  },
  {
    icon: MobileIcon,
    title: "Supporto prima e durante il soggiorno",
    desc: "Ti seguo dalla fase di pianificazione fino alla fine del viaggio. Qualsiasi dubbio o imprevisto, ci sono.",
  },
];

export default function ProcessSection() {
  return (
    <section className="py-24 bg-dark-alt relative overflow-hidden watermark-ale">
      <div className="absolute bottom-0 left-1/2 w-80 h-80 bg-sunset-purple/5 rounded-full blur-[120px]" />
      
      <div className="container max-w-4xl relative z-10">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            <span className="text-primary">Come funziona</span>
          </h2>
          <p className="text-muted-foreground mb-16 text-lg">
            Quattro step. Zero stress. Risultato concreto.
          </p>
        </AnimatedSection>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-sunset-red/40 via-sunset-orange/30 to-sunset-purple/20 hidden md:block" />
          
          <div className="space-y-10">
            {steps.map((s, i) => (
              <AnimatedSection key={s.title} delay={i * 0.12}>
                <div className="flex items-start gap-6">
                  <div className="relative z-10 w-12 flex items-center justify-center flex-shrink-0 pt-1">
                    <s.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-bold mb-2">
                      <span className="text-sunset-gold mr-2">Step {i + 1}</span>
                      {s.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        <AnimatedSection delay={0.5}>
          <p className="mt-12 text-sm text-muted-foreground/70 italic border-l-2 border-sunset-orange/30 pl-4">
            Lavoro in collaborazione con partner locali e realtà turistiche dell'isola per garantire un servizio aggiornato e affidabile.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}

