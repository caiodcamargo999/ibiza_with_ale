"use client";
import Image from "next/image";
import AnimatedSection from "@/components/AnimatedSection";

export default function ShowcaseSection() {
  return (
    <section className="py-24 bg-dark-section relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-primary/5 blur-[160px] pointer-events-none" />
      
      <div className="container max-w-5xl relative z-10">
        <AnimatedSection className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Living Ibiza</p>
          <h2 className="text-3xl md:text-5xl font-display font-black leading-tight">
            Esperienza Reale, <span className="text-primary">Connessioni Locali</span>
          </h2>
          <p className="text-muted-foreground mt-4 text-base max-w-2xl mx-auto">
            Non semplici consigli da internet, ma collaborazioni ufficiali e presenza costante sull'isola.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Card 1: Ale Party */}
          <AnimatedSection delay={0.1}>
            <div className="group relative rounded-[2rem] border border-white/5 bg-[#0B0C0E] overflow-hidden shadow-2xl p-2 transition-all duration-500 hover:shadow-[0_0_30px_rgba(217,70,239,0.15)] hover:border-white/10">
              {/* Inner Image Container */}
              <div className="relative aspect-[4/5] rounded-[1.7rem] overflow-hidden">
                <Image fill sizes="100vw"
                  src="/images/ale_party.jpg"
                  alt="Ale Party Ibiza"
                  className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                
                {/* Custom SyForge Captions Overlay */}
                <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-[#0B0C0E]/80 backdrop-blur-md border border-white/5 transition-colors duration-300 group-hover:bg-[#121316]/95">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">Nightlife & Clubbing</span>
                  <h3 className="text-lg font-bold text-foreground mt-1 mb-2">Pianifica le tue serate al massimo</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Collaboro direttamente con i pr e i tavoli dei club principali di Ibiza per offrirti accessi reali e l'organizzazione perfetta.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Card 2: Cilex in UNVRS */}
          <AnimatedSection delay={0.2}>
            <div className="group relative rounded-[2rem] border border-white/5 bg-[#0B0C0E] overflow-hidden shadow-2xl p-2 transition-all duration-500 hover:shadow-[0_0_30px_rgba(217,70,239,0.15)] hover:border-white/10">
              {/* Inner Image Container */}
              <div className="relative aspect-[4/5] rounded-[1.7rem] overflow-hidden">
                <Image fill sizes="100vw"
                  src="/images/cilex_in_unvrs.jpg"
                  alt="Cilex in UNVRS Ibiza"
                  className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                
                {/* Custom SyForge Captions Overlay */}
                <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-[#0B0C0E]/80 backdrop-blur-md border border-white/5 transition-colors duration-300 group-hover:bg-[#121316]/95">
                  <span className="text-xs font-bold uppercase tracking-wider text-sunset-gold">CILEX Partnership</span>
                  <h3 className="text-lg font-bold text-foreground mt-1 mb-2">Servizi VIP & Assistenza Esclusiva</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Accesso diretto ai tavoli, prenotazioni ville, noleggio yacht ed esperienze premium tramite CILEX Ibiza, brand leader sull'isola.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
