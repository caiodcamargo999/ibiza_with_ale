"use client";
import { CtaButton } from "@/components/CtaButton";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import { Handshake, Search, Settings2, CalendarCheck, Globe, MapPin, PhoneCall, MessageCircle, ArrowRight } from "lucide-react";
import townImg from "@/assets/ibiza-town.jpg";

const values = [
  { icon: Search, label: "Chiarezza", desc: "Sai sempre cosa aspettarti, senza sorprese." },
  { icon: MapPin, label: "Esperienza reale", desc: "Conosco Ibiza dall'interno, non dai cataloghi." },
  { icon: Settings2, label: "Cura dei dettagli", desc: "Ogni proposta è pensata su misura per te." },
  { icon: CalendarCheck, label: "Organizzazione", desc: "Tutto pianificato, nulla lasciato al caso." },
];

const differentiators = [
  { icon: Handshake, text: "Personalizzazione totale: nessun pacchetto standard" },
  { icon: Globe, text: "Rete locale di contatti verificati e collaborazioni attive" },
  { icon: PhoneCall, text: "Supporto diretto prima e durante il viaggio" },
  { icon: Settings2, text: "Zero caos: un piano chiaro, opzioni ragionate, conferme rapide" },
  { icon: MapPin, text: "Collaborazione con CILEX Ibiza e partner turistici locali" },
];

export default function ChiSonoPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <img src={townImg.src} alt="Ibiza old town" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/70 to-background" />
        </div>
        <div className="container relative z-10 text-center">
          <AnimatedSection>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
              Io sono <span className="text-gradient-warm">Alessandra</span>
            </h1>
            <p className="text-xl text-muted-foreground">La tua guida per organizzare Ibiza</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-dark-section">
        <div className="container max-w-3xl">
          <AnimatedSection>
            <h2 className="text-3xl font-display font-bold mb-8">
              Come nasce <span className="text-gradient-sunset">Ibiza With Ale</span>
            </h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed text-lg">
              <p>
                Tutto è iniziato con la mia passione per Ibiza. Non l'Ibiza dei cliché, ma quella vera: un'isola con mille anime, dove ogni angolo racconta qualcosa di diverso.
              </p>
              <p>
                Ho iniziato a organizzare viaggi per amici, poi per amici di amici, e ho capito che c'era bisogno di qualcuno che conoscesse davvero l'isola e potesse aiutare le persone a viverla al meglio.
              </p>
              <p>
                Oggi Ibiza With Ale è il mio progetto: un servizio di travel planning personalizzato che nasce dall'esperienza diretta. Non vendo sogni, organizzo vacanze concrete. Conosco i posti, le persone, i tempi e i trucchi per ottimizzare ogni giornata sull'isola.
              </p>
              <p className="text-foreground/80 font-medium">
                Organizzare Ibiza "da dentro" significa avere accesso a informazioni, contatti e soluzioni che chi cerca online non trova.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-dark-alt watermark-ale">
        <div className="container">
          <AnimatedSection>
            <h2 className="text-3xl font-display font-bold text-center mb-12">I miei <span className="text-gradient-warm">valori</span></h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {values.map((v, i) => (
              <AnimatedSection key={v.label} delay={i * 0.1}>
                <div className="bg-card/40 backdrop-blur-sm rounded-2xl p-6 border border-border/20 text-center h-full hover:border-sunset-orange/20 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-gradient-purple flex items-center justify-center mx-auto mb-4 shadow-glow-purple">
                    <v.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-display font-semibold mb-2">{v.label}</h3>
                  <p className="text-sm text-muted-foreground">{v.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="py-24 bg-dark-section">
        <div className="container max-w-3xl">
          <AnimatedSection>
            <h2 className="text-3xl font-display font-bold mb-8">Cosa mi <span className="text-gradient-warm">differenzia</span></h2>
          </AnimatedSection>
          <div className="space-y-4">
            {differentiators.map((d, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="flex items-center gap-4 bg-card/40 backdrop-blur-sm rounded-xl p-5 border border-border/20 hover:border-sunset-orange/20 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-gradient-warm flex items-center justify-center flex-shrink-0 shadow-glow-orange">
                    <d.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <p className="text-sm font-medium text-foreground/80">{d.text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(249,115,22,0.15),transparent_60%)] border-t border-white/5" />
        <div className="container relative z-10 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-6">
              Vuoi una proposta su misura?
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <CtaButton />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
