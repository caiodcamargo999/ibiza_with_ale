"use client";
import AnimatedSection from "@/components/AnimatedSection";

export default function PositioningSection() {
  return (
    <section className="py-24 bg-dark-section watermark-ale relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-sunset opacity-20" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-sunset-orange/5 rounded-full blur-[150px]" />
      
      <div className="container max-w-4xl relative z-10">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-10">
            <span className="text-gradient-sunset">Organizzare Ibiza bene</span>
            <br />
            <span className="text-foreground">cambia tutto</span>
          </h2>
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
            <p>
              Ibiza non è una destinazione che si improvvisa. Zone, spostamenti, tempistiche, prenotazioni ed esperienze vanno pianificati con criterio — altrimenti il rischio è perdere tempo, spendere male e ritrovarsi nel posto sbagliato al momento sbagliato.
            </p>
            <p>
              Ogni zona dell'isola ha una sua identità: Playa d'en Bossa non è San Antonio, Ibiza Town non è Santa Eulalia. La scelta dell'alloggio condiziona tutto il viaggio. I trasporti vanno pensati in anticipo. Le esperienze migliori si prenotano settimane prima.
            </p>
            <p className="text-foreground/80 font-medium">
              Il mio lavoro è costruire il viaggio insieme a te, passo dopo passo, con una conoscenza reale dell'isola — non basata su guide turistiche, ma su esperienza diretta, contatti locali e aggiornamenti costanti dal territorio.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

