"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import AnimatedSection from "@/components/AnimatedSection";
import { ChatBubbleIcon, ArrowRightIcon, BadgeIcon, LockClosedIcon } from "@radix-ui/react-icons";
import { GridPattern } from "@/components/ui/grid-pattern";
import { CtaButton } from "@/components/CtaButton";


function Typewriter() {
  const words = ["SCOPRI", "VIVI", "ESPLORA", "SOGNA"];
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), 1500);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 75 : 150, parseInt(Math.random() * 50 + '')));

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  return (
    <>
      <span className="inline-block min-w-[2ch]">
        {words[index].substring(0, subIndex)}
        <span className="animate-pulse">|</span>
      </span>
    </>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/ale_hero.jpg"
          alt="Alessandra"
          fill
          priority
          className="object-cover scale-105"
          sizes="100vw"
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

      <section className="relative flex-1 flex flex-col items-center justify-center text-center px-4 min-h-screen z-10 pt-16">
        <AnimatedSection>
          <p className="font-menu text-[10px] sm:text-xs tracking-[0.3em] uppercase text-white/50 mb-4 sm:mb-6">
            ALESSANDRA
          </p>
          <h1 className="font-black text-white leading-none tracking-tight uppercase" style={{ fontSize: "clamp(3.5rem, 15vw, 12rem)", fontFamily: "sans-serif" }}>
            <Typewriter />
          </h1>
          
          <div className="mt-8 sm:mt-12">
            <CtaButton />
          </div>
        </AnimatedSection>
      </section>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-primary opacity-40" />
    </section>
  );
}
