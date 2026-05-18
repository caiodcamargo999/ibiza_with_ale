"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useFormStore } from "@/store/useFormStore";
import React from "react";

export function CtaButton({ className, text = "Richiedi il tuo piano viaggio" }: { className?: string, text?: string }) {
  const { openForm } = useFormStore();
  
  return (
    <Button onClick={openForm} variant="hero" className={className}>
      <div className="w-9 h-9 rounded-full bg-[#EA580C] flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105 shrink-0">
        <ArrowRight className="w-4 h-4 text-white transition-transform duration-300 group-hover:translate-x-1" />
      </div>
      <span className="text-sm font-bold tracking-wide">{text}</span>
    </Button>
  );
}
