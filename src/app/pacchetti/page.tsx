"use client";
import { CtaButton } from "@/components/CtaButton";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import { MessageCircle, ArrowRight, Music, Sun, Ship, Settings2, Globe, Award } from "lucide-react";

const packages = [
  {
    icon: Music,
    title: "Weekend Party Ibiza",
    tagline: "3 notti di pura energia",
    description: "Il pacchetto perfetto per chi vuole vivere la nightlife di Ibiza al massimo. Arrivi il venerdì, riparte il lunedì con ricordi indimenticabili.",
    includes: [
      "Alloggio in zona Playa d'en Bossa o Ibiza Town",
      "2-3 serate nei migliori club (Ushuaïa, Hï, Pacha, Amnesia)",
      "Pool party pomeridiana",
      "Trasferimenti e logistics serali",
      "Consigli su guest list e biglietti",
      "Supporto WhatsApp durante il weekend",
    ],
    ideal: "Gruppi di amici, addii al celibato/nubilato, weekend di compleanno",
    color: "sunset-red",
  },
  {
    icon: Ship,
    title: "Ibiza + Formentera Experience",
    tagline: "Due isole, un'unica esperienza",
    description: "Combina l'energia di Ibiza con la tranquillità di Formentera. Il modo migliore per vivere entrambe le isole senza stress logistico.",
    includes: [
      "Alloggio a Ibiza con escursione giornaliera a Formentera",
      "Traghetto andata e ritorno organizzato",
      "Noleggio scooter o auto a Formentera",
      "Itinerario spiagge Formentera (Ses Illetes, Cala Saona, Es Pujols)",
      "Ristoranti consigliati su entrambe le isole",
      "Serate selezionate a Ibiza",
    ],
    ideal: "Coppie, gruppi misti, chi cerca varietà",
    color: "sunset-orange",
  },
  {
    icon: Sun,
    title: "Beach Club Experience",
    tagline: "Lusso, sole e cocktail",
    description: "Giornate tra i beach club più esclusivi di Ibiza: lettini riservati, musica dal vivo, cucina gourmet e tramonti da cartolina.",
    includes: [
      "Prenotazioni ai migliori beach club (Blue Marlin, Nikki Beach, Amante)",
      "Alloggio in zona strategica",
      "Spiagge selezionate ogni giorno",
      "Ristoranti con vista mare",
      "Transfer e logistica",
      "Opzione sunset experience inclusa",
    ],
    ideal: "Coppie, anniversari, chi ama il lusso accessibile",
    color: "sunset-gold",
  },
  {
    icon: Settings2,
    title: "Nightlife Experience",
    tagline: "Le notti migliori dell'isola",
    description: "Ogni sera nel club giusto, con la line-up giusta. Organizzo le tue notti in base ai tuoi gusti musicali e al calendario della stagione.",
    includes: [
      "Selezione serate in base ai tuoi gusti (techno, house, commercial, reggaeton)",
      "Biglietti e guest list organizzati",
      "Alloggio vicino ai club principali",
      "Pre-serata con cena e cocktail",
      "Consigli su orari di ingresso e dress code",
      "Supporto completo durante le serate",
    ],
    ideal: "Amanti della musica elettronica, gruppi, chi vuole vivere la vera nightlife",
    color: "sunset-purple",
  },
];

export default function Pacchetti() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&q=80" alt="Ibiza boat" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>
        <div className="container relative z-10">
          <AnimatedSection>
            <p className="text-sm uppercase tracking-widest text-sunset-orange font-semibold mb-4">Esperienze curate</p>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              Pacchetti ed esperienze{" "}
              <span className="text-gradient-warm">Ibiza</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Proposte pensate per diversi stili di viaggio. Ogni pacchetto è completamente personalizzabile in base alle tue date, al tuo budget e ai tuoi desideri.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Packages */}
      <section className="bg-dark-section py-12 md:py-20">
        <div className="container">
          <div className="grid gap-8">
            {packages.map((pkg, idx) => (
              <AnimatedSection key={idx}>
                <div className="bg-card/60 backdrop-blur-sm border border-border/30 rounded-2xl overflow-hidden">
                  <div className="p-8 md:p-10">
                    <div className="flex flex-col md:flex-row md:items-start gap-6">
                      {/* Icon & Title */}
                      <div className="shrink-0">
                        <div className={`w-16 h-16 rounded-2xl bg-${pkg.color}/20 flex items-center justify-center`}>
                          <pkg.icon className={`w-8 h-8 text-${pkg.color}`} />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-semibold text-${pkg.color} mb-1`}>{pkg.tagline}</p>
                        <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">{pkg.title}</h2>
                        <p className="text-muted-foreground mb-6 max-w-2xl">{pkg.description}</p>

                        <div className="grid md:grid-cols-2 gap-8">
                          {/* Includes */}
                          <div>
                            <h3 className="text-sm uppercase tracking-widest text-muted-foreground/60 font-semibold mb-3">Cosa include</h3>
                            <ul className="space-y-2">
                              {pkg.includes.map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                                  <Award className="w-3.5 h-3.5 mt-0.5 text-sunset-gold shrink-0" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                          {/* Ideal for */}
                          <div>
                            <h3 className="text-sm uppercase tracking-widest text-muted-foreground/60 font-semibold mb-3">Ideale per</h3>
                            <div className="flex items-start gap-2 p-4 rounded-xl bg-muted/30">
                              <Globe className="w-5 h-5 text-sunset-orange shrink-0 mt-0.5" />
                              <p className="text-sm text-foreground/80">{pkg.ideal}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(249,115,22,0.15),transparent_60%)] border-t border-white/5" />
        <div className="container relative z-10 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4">
              Richiedi il tuo pacchetto personalizzato
            </h2>
            <p className="text-primary-foreground/70 mb-8 max-w-lg mx-auto">
              Dimmi cosa ti piacerebbe fare a Ibiza e creo il pacchetto su misura per te.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <CtaButton text="Richiedi il tuo pacchetto" />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
