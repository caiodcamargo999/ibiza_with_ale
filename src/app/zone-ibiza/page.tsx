"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import { ArrowRight, MessageCircle, MapPin, Award, Music, Waves } from "lucide-react";

const zones = [
  {
    name: "Playa d'en Bossa",
    tagline: "Il cuore della nightlife e del lifestyle",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    description: "La zona più dinamica e richiesta di Ibiza per chi vuole vivere l'isola a pieno ritmo. Qui trovi Ushuaïa e Hï Ibiza, i due club più famosi al mondo, raggiungibili a piedi. La spiaggia è la più lunga dell'isola. Vicina all'aeroporto (5 min) e a Ibiza Town (10 min).",
    pros: ["Club principali a piedi (Ushuaïa, Hï Ibiza)", "Spiaggia lunga con servizi completi", "Vicina all'aeroporto e a Ibiza Town", "Ampia offerta di ristoranti e bar", "Vita notturna e diurna sempre attiva"],
    cons: ["Rumorosa, soprattutto vicino ai club", "Prezzi degli alloggi più alti in estate", "Meno adatta a chi cerca tranquillità"],
    bestFor: "Gruppi party, chi vuole la nightlife a portata di mano, viaggiatori 20–35 anni",
    nightlife: 5, beach: 4, food: 4, quiet: 1,
  },
  {
    name: "Ibiza Town (Eivissa)",
    tagline: "Cultura, charme e vita notturna sofisticata",
    image: "https://images.unsplash.com/photo-1555992336-03a23c7b20eb?w=800&q=80",
    description: "Il centro storico di Ibiza, con Dalt Vila (patrimonio UNESCO), il porto, i negozi e una vita notturna raffinata. Pacha è qui. Base strategica per Formentera e per esplorare tutta l'isola.",
    pros: ["Pacha e vita notturna sofisticata", "Porto e traghetti per Formentera", "Dalt Vila, storia e cultura", "Ristoranti di alto livello", "Centrale e ben collegata"],
    cons: ["Traffico e parcheggio difficili in estate", "Alloggi in centro spesso costosi", "Meno spiagge a portata di mano"],
    bestFor: "Coppie, viaggiatori culturali, chi vuole un mix di tutto",
    nightlife: 4, beach: 2, food: 5, quiet: 2,
  },
  {
    name: "San Antonio",
    tagline: "Tramonto, prezzi accessibili e festa",
    image: "https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?w=800&q=80",
    description: "Famosa per il Sunset Strip (Café del Mar, Café Mambo) e per i tramonti più belli di Ibiza. Club come Eden, Es Paradis e O Beach, atmosfera giovane e vivace. Miglior rapporto qualità-prezzo per gli alloggi.",
    pros: ["Sunset Strip leggendario", "Prezzi alloggi più accessibili", "Club e beach club nella zona", "Water taxi per Cala Bassa e Cala Comte", "Atmosfera giovane e internazionale"],
    cons: ["Lontana da Ushuaïa/Hï (30 min in auto)", "Alcune zone molto turistiche", "Qualità dei ristoranti variabile"],
    bestFor: "Gruppi giovani, budget medio, amanti del tramonto",
    nightlife: 4, beach: 3, food: 3, quiet: 2,
  },
  {
    name: "Santa Eulalia",
    tagline: "Relax, natura e qualità della vita",
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
    description: "La terza città dell'isola, sulla costa est. Tranquilla e residenziale, perfetta per coppie e famiglie. Bel lungomare, porto turistico, ristoranti di qualità e spiagge facilmente accessibili.",
    pros: ["Tranquilla e rilassante", "Ottimi ristoranti (La Paloma, Cala Bonita)", "Spiagge accessibili nelle vicinanze", "Mercatino hippie Las Dalias vicino", "Buon rapporto qualità-prezzo"],
    cons: ["Lontana dalla nightlife (30–40 min)", "Meno animata di sera", "Necessaria auto per spostarsi"],
    bestFor: "Coppie, famiglie, chi cerca tranquillità con qualità",
    nightlife: 1, beach: 4, food: 5, quiet: 5,
  },
  {
    name: "San José",
    tagline: "Natura, spiagge e paesaggi mozzafiato",
    image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&q=80",
    description: "Il comune più grande dell'isola, con le spiagge più belle: Cala Comte, Cala d'Hort, Cala Tarida, Cala Jondal. Zona più scenografica di Ibiza, con colline, pinete e viste su Es Vedrà. Alloggi spesso ville e fincas.",
    pros: ["Le spiagge più belle dell'isola", "Paesaggi mozzafiato e natura", "Villa e fincas con privacy", "Blue Marlin e beach club premium", "Lontana dal turismo di massa"],
    cons: ["Auto indispensabile", "Lontana dai club principali", "Supermercati e servizi limitati"],
    bestFor: "Amanti della natura, ville di gruppo, viaggi luxury",
    nightlife: 1, beach: 5, food: 4, quiet: 4,
  },
  {
    name: "San Juan",
    tagline: "Il nord autentico e alternativo",
    image: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=800&q=80",
    description: "La zona più autentica di Ibiza, nel nord dell'isola. Cala Benirrás (tamburi al tramonto), ristoranti locali, mercatino di Sant Joan e atmosfera bohémien. Ibiza diversa, lontana dai club.",
    pros: ["Atmosfera autentica e alternativa", "Cala Benirrás e spiagge del nord", "Mercatino di Sant Joan", "Ristoranti locali di qualità", "Tranquillità assoluta"],
    cons: ["Molto lontana dalla nightlife (40–50 min)", "Servizi e trasporti limitati", "Auto obbligatoria"],
    bestFor: "Viaggiatori alternativi, chi cerca autenticità, coppie",
    nightlife: 0, beach: 4, food: 3, quiet: 5,
  },
];

function RatingDots({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground/60 w-16">{label}</span>
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className={`w-2 h-2 rounded-full ${i < value ? "bg-sunset-orange" : "bg-border/40"}`} />
        ))}
      </div>
    </div>
  );
}

export default function ZoneIbiza() {
  return (
    <>
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1555992336-03a23c7b20eb?w=1920&q=80"
            alt="Ibiza panorama"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/75 to-background" />
        </div>
        <div className="container relative z-10">
          <AnimatedSection>
            <p className="text-sm font-medium text-sunset-orange uppercase tracking-widest mb-4">Guida zone 2026</p>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-display font-black leading-[0.9] mb-6">
              Le zone migliori
              <br />
              <span className="text-gradient-warm">dove dormire a Ibiza</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Ogni zona di Ibiza ha la sua identità. Scegliere quella giusta cambia l'intera esperienza.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 bg-dark-section">
        <div className="container">
          <div className="space-y-8">
            {zones.map((zone, i) => (
              <AnimatedSection key={zone.name} delay={i * 0.05}>
                <div className="group bg-card/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-border/20 hover:border-sunset-orange/20 transition-all duration-500">
                  <div className="flex flex-col lg:flex-row">
                    {/* Image */}
                    <div className="lg:w-80 h-48 lg:h-auto relative overflow-hidden shrink-0">
                      <img
                        src={zone.image}
                        alt={zone.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/60 hidden lg:block" />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card/60 lg:hidden" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6 lg:p-8">
                      <div className="flex flex-col lg:flex-row gap-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <MapPin className="w-5 h-5 text-sunset-orange" />
                            <h3 className="text-2xl font-display font-bold text-foreground">{zone.name}</h3>
                          </div>
                          <p className="text-sm text-sunset-gold font-medium mb-4">{zone.tagline}</p>
                          <p className="text-sm text-muted-foreground leading-relaxed mb-6">{zone.description}</p>

                          <div className="grid sm:grid-cols-2 gap-6 mb-6">
                            <div>
                              <p className="text-xs font-semibold text-foreground/70 uppercase tracking-wider mb-3">Vantaggi</p>
                              <ul className="space-y-2">
                                {zone.pros.map((pro) => (
                                  <li key={pro} className="text-xs text-muted-foreground flex gap-2">
                                    <Award className="w-3 h-3 text-sunset-gold mt-0.5 flex-shrink-0" /> {pro}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-foreground/70 uppercase tracking-wider mb-3">Da considerare</p>
                              <ul className="space-y-2">
                                {zone.cons.map((con) => (
                                  <li key={con} className="text-xs text-muted-foreground/70 flex gap-2">
                                    <span className="text-sunset-red/50 mt-0.5">•</span> {con}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          <div className="bg-sunset-gold/5 rounded-xl p-4">
                            <p className="text-xs text-sunset-gold/90 font-medium">
                              <span className="text-sunset-orange">Ideale per:</span> {zone.bestFor}
                            </p>
                          </div>
                        </div>

                        <div className="lg:w-40 flex flex-row lg:flex-col gap-3 lg:justify-center">
                          <RatingDots value={zone.nightlife} label="Nightlife" />
                          <RatingDots value={zone.beach} label="Spiagge" />
                          <RatingDots value={zone.food} label="Cucina" />
                          <RatingDots value={zone.quiet} label="Quiete" />
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

      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        <div className="container relative z-10 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-primary-foreground mb-6">
              Non sai dove alloggiare?
            </h2>
            <p className="text-primary-foreground/70 mb-10 max-w-lg mx-auto text-lg">
              Ti aiuto a scegliere la zona perfetta in base al tuo gruppo, al budget e a come vuoi vivere Ibiza.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contatti" className={cn(buttonVariants({ size: 'xl' }), "bg-background text-foreground hover:bg-background/90 shadow-elevated font-bold")}>
                  Richiedi il tuo piano viaggio <ArrowRight className="w-5 h-5" />
                </Link>
              
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
