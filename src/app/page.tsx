"use client";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import AnimatedSection from "@/components/AnimatedSection";
import HeroSection from "@/components/home/HeroSection";
import PositioningSection from "@/components/home/PositioningSection";
import AudienceSection from "@/components/home/AudienceSection";
import ServicesSection from "@/components/home/ServicesSection";
import ProcessSection from "@/components/home/ProcessSection";
import ReviewsSection from "@/components/home/ReviewsSection";
import IbizaMapSection from "@/components/home/IbizaMapSectionWrapper";
import { MessageCircle, ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PositioningSection />
      <AudienceSection />
      <ServicesSection />
      <ProcessSection />
      <IbizaMapSection />
      <ReviewsSection />

      {/* FINAL CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(253,126,5,0.3),transparent_60%)]" />
        <div className="container relative z-10 text-center">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-6">
              Inizia a organizzare la tua Ibiza
            </h2>
            <p className="text-primary-foreground/70 mb-10 max-w-lg mx-auto text-lg">
              Ricevi una proposta personalizzata in base a date, budget e stile di viaggio.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contatti" className={cn(buttonVariants({ size: "xl" }), "bg-background text-foreground hover:bg-background/90 shadow-elevated font-bold")}>
                Richiedi il tuo piano viaggio <ArrowRight className="w-5 h-5" />
              </Link>
              
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
