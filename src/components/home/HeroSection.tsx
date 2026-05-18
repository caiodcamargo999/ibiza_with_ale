"use client";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import AnimatedSection from "@/components/AnimatedSection";
import { MessageCircle, ArrowRight, BadgeCheck, ShieldCheck } from "lucide-react";
import { GridPattern } from "@/components/ui/grid-pattern";


export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/ale_y_ciccio_coche.jpg"
          alt="Alessandra e Ciccio"
          className="w-full h-full object-cover scale-105"
        />
      </div>

      {/* Dark gradient overlay with a bit of glass for contrast */}
      <div className="absolute inset-0 bg-background/50 backdrop-blur-[4px]" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-background via-background/80 to-transparent" />
      
      {/* Premium Notio Grid Pattern Background */}
      <GridPattern
        width={40}
        height={40}
        strokeDasharray="2 2"
        className="absolute inset-0 opacity-[0.12] stroke-white/20 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_90%)]"
      />

      {/* Floating glow orbs */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[120px] animate-glow-pulse" />
      <div className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-primary/10 rounded-full blur-[100px] animate-glow-pulse" style={{ animationDelay: '1.5s' }} />

      <div className="container relative z-10 pt-20 pb-6 md:py-24">
        <AnimatedSection className="max-w-3xl">
            <div className="relative z-10">
              {/* Credibility badges */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4 md:mb-8">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-card/60 backdrop-blur-md border border-border/30 text-[10px] sm:text-xs font-medium text-muted-foreground shadow-sm w-fit">
                  <BadgeCheck className="w-3.5 h-3.5 text-primary" />
                  Travel planner specializzata sull'isola
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-card/60 backdrop-blur-md border border-border/30 text-[10px] sm:text-xs font-medium text-muted-foreground shadow-sm w-fit">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                  Collaborazioni attive con realtà turistiche locali
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black leading-[0.9] mb-4 md:mb-6 tracking-tight">
                <span className="text-gradient-warm">IBIZA</span>
                <br />
                <span className="text-foreground/50 font-light text-2xl md:text-4xl lg:text-5xl">WITH</span>
                <span className="text-foreground ml-2 text-2xl md:text-4xl lg:text-5xl">ALE</span>
              </h1>

              <p className="text-base sm:text-xl lg:text-2xl font-display font-medium text-foreground/90 mb-3 md:mb-6 leading-snug max-w-2xl drop-shadow-md">
                La tua Ibiza la organizzo nella vacanza perfetta.
              </p>

              <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-3 leading-relaxed max-w-xl drop-shadow-md">
                Organizzo viaggi, alloggi ed esperienze a Ibiza e Formentera.
              </p>
              <p className="text-xs text-muted-foreground/70 mb-4 md:mb-10 leading-relaxed max-w-xl drop-shadow-md hidden sm:block">
                Collaboro direttamente con CILEX Ibiza e partner turistici locali dell'isola per offrire un'organizzazione reale, aggiornata e completa.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button asChild variant="hero">
                  <Link href="#" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event('open-typeform')); }}>
                    <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#EA580C] flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105 shrink-0">
                      <ArrowRight className="w-4 h-4 text-white transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                    <span className="text-xs md:text-sm font-bold tracking-wide">
                      Richiedi il tuo piano viaggio
                    </span>
                  </Link>
                </Button>
              </div>

              {/* Authority line */}
              <p className="mt-4 md:mt-8 pl-3 text-xs md:text-sm text-muted-foreground/80 leading-relaxed max-w-2xl border-l-2 border-primary/40 pl-4 italic">
                Ogni anno centinaia di viaggiatori organizzano Ibiza con il mio supporto, grazie alla mia esperienza diretta sull'isola e alle collaborazioni con partner turistici locali.
              </p>
            </div>
        </AnimatedSection>
      </div>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-sunset opacity-40" />
    </section>
  );
}

