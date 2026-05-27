"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useFormStore } from "@/store/useFormStore";
import React from "react";

export function CtaButton({ className, text = "Richiedi il tuo piano viaggio" }: { className?: string, text?: string }) {
  const { openForm } = useFormStore();
  
  return (
    <button 
      onClick={openForm} 
      className={cn(
        "group relative inline-flex items-center pl-1.5 pr-6 py-1.5 bg-[#0B0C0E]/50 backdrop-blur-md border border-white/10 text-white rounded-full transition-all duration-300 select-none cursor-pointer overflow-hidden",
        className
      )}
    >
      {/* The solid purple expanding background with bounce effect */}
      <div className="absolute left-1.5 top-1.5 bottom-1.5 w-10 rounded-full bg-[#d946ef] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:w-[calc(100%-12px)] z-0" />
      
      {/* The premium icon */}
      <div className="relative z-10 w-10 h-10 flex items-center justify-center shrink-0">
        <ArrowRightIcon className="w-5 h-5 text-white transition-transform duration-500 group-hover:translate-x-1" strokeWidth={2.5} />
      </div>
      
      {/* The text */}
      <span className="relative z-10 text-sm font-bold tracking-wide transition-colors duration-500 text-white ml-2">
        {text}
      </span>
    </button>
  );
}
