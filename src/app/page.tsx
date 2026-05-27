"use client";
import { CtaButton } from "@/components/CtaButton";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import AnimatedSection from "@/components/AnimatedSection";
import HeroSection from "@/components/home/HeroSection";
import PositioningSection from "@/components/home/PositioningSection";
import ShowcaseSection from "@/components/home/ShowcaseSection";
import AudienceSection from "@/components/home/AudienceSection";
import ServicesSection from "@/components/home/ServicesSection";
import ProcessSection from "@/components/home/ProcessSection";
import ClubsSection from "@/components/home/ClubsSection";
import ReviewsSection from "@/components/home/ReviewsSection";
import { ArrowRightIcon } from "@radix-ui/react-icons";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PositioningSection />
      <ShowcaseSection />
      <AudienceSection />
      <ServicesSection />
      <ProcessSection />
      <ClubsSection />
      <ReviewsSection />

      {/* FINAL CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(217,70,239,0.15),transparent_60%)] border-t border-white/5" />
        <div className="container relative z-10 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6">
              Inizia a organizzare la tua Ibiza
            </h2>
            <p className="text-muted-foreground mb-10 max-w-lg mx-auto text-base">
              Ricevi una proposta personalizzata in base a date, budget e stile di viaggio.
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
