"use client";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import { useState } from "react";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <html lang="it" suppressHydrationWarning>
      <body suppressHydrationWarning className="bg-black relative min-h-screen">
        {/* Grain overlay */}
        <div className="grain-overlay" />
        
        {/* Floating Background Glow Orbs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-1/4 left-[5vw] w-[45vw] h-[45vw] rounded-full bg-orange-600/5 blur-[120px] orb-1" />
          <div className="absolute bottom-1/4 right-[5vw] w-[35vw] h-[35vw] rounded-full bg-amber-500/5 blur-[110px] orb-2" />
          <div className="absolute top-1/2 left-[30vw] w-[40vw] h-[40vw] rounded-full bg-red-700/5 blur-[130px] orb-3" />
        </div>

        <div className="relative z-10">
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <Layout>{children}</Layout>
            </TooltipProvider>
          </QueryClientProvider>
        </div>
      </body>
    </html>
  );
}
