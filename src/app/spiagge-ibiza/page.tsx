"use client";
import { CtaButton } from "@/components/CtaButton";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import { ArrowRight, MessageCircle, Waves, MapPin, Sun, Award, Clock } from "lucide-react";

const beaches = [
  {
    name: "Cala Comte",
    zone: "San José",
    vibe: "Tramonto leggendario",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    description: "La spiaggia più famosa per il tramonto a Ibiza. Acque turchesi su più livelli con fondali rocciosi che creano sfumature incredibili. Ha diversi chiringuiti e zone sia libere che attrezzate.",
    bestTime: "Arrivo entro le 11:00 in alta stagione",
    sunset: "Spettacolare – tra i più belli dell'isola",
    nearbyRestaurants: "Sunset Ashram, Cotton Beach Club (a Cala Tarida)",
    tips: ["Porta scarpette da scoglio per i tratti rocciosi", "Il tramonto è spettacolare ma il posto si riempie dalle 18:00", "Parcheggio limitato: arriva presto"],
    bestFor: "Coppie, gruppi, fotografia",
    type: "Sabbia e rocce",
  },
  {
    name: "Ses Salines",
    zone: "Sud dell'isola",
    vibe: "Beach club e lifestyle",
    image: "https://images.unsplash.com/photo-1520454974749-611b7248ffdb?w=800&q=80",
    description: "Una delle spiagge più iconiche di Ibiza, lunga e con sabbia fine. È la spiaggia del lifestyle ibicenco: beach club, musica, gente internazionale. L'acqua è cristallina e bassa per decine di metri.",
    bestTime: "Tutto il giorno – perfetta anche al mattino presto",
    sunset: "Non visibile direttamente, ma atmosfera dorata",
    nearbyRestaurants: "Jockey Club, Sa Trinxa, El Chiringuito (Es Cavallet)",
    tips: ["Parcheggio a pagamento in alta stagione", "La zona nord è più tranquilla", "Perfetta anche per famiglie nella zona nord"],
    bestFor: "Lifestyle, beach club, gruppi",
    type: "Sabbia fine",
  },
  {
    name: "Cala Bassa",
    zone: "San José",
    vibe: "Spiaggia completa",
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
    description: "Una delle spiagge più versatili di Ibiza: ampia, ben organizzata, con sabbia chiara e acque calme. Ha un beach club di riferimento e zone libere ampie. Facilmente raggiungibile anche in water taxi da San Antonio.",
    bestTime: "Dalle 10:00 – l'acqua è calma tutto il giorno",
    sunset: "Non diretto, ma la luce dorata del tardo pomeriggio è magnifica",
    nearbyRestaurants: "Cala Bassa Beach Club, chiringuiti sulla spiaggia",
    tips: ["Raggiungibile in water taxi da San Antonio", "Ottimo beach club con cucina di qualità", "Adatta anche ai bambini per le acque calme"],
    bestFor: "Famiglie, gruppi, relax",
    type: "Sabbia chiara",
  },
  {
    name: "Cala d'Hort",
    zone: "San José",
    vibe: "Vista su Es Vedrà",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80",
    description: "La spiaggia con la vista più iconica di Ibiza: l'isolotto di Es Vedrà. Il panorama è unico al mondo. Ha due ristoranti sulla spiaggia e il tramonto qui è un'esperienza mistica. Da vedere almeno una volta.",
    bestTime: "Pomeriggio per il tramonto (dalle 17:00)",
    sunset: "Il tramonto più mistico dell'isola – assolutamente da vedere",
    nearbyRestaurants: "Es Boldadó, ristorante sulla spiaggia",
    tips: ["Parcheggio limitato, arriva presto", "Prenota al ristorante per cena al tramonto", "Il mare può essere mosso, controlla le condizioni"],
    bestFor: "Coppie, fotografia, esperienza unica",
    type: "Sabbia e ciottoli",
  },
  {
    name: "Cala Salada",
    zone: "San Antonio",
    vibe: "Paradiso nascosto",
    image: "https://images.unsplash.com/photo-1468413253725-0d5181091126?w=800&q=80",
    description: "Una delle cale più belle e pittoresche dell'isola. Incastonata tra pinete e scogliere, ha acque incredibilmente limpide. Da qui puoi camminare fino a Cala Saladeta, una caletta più piccola e selvaggia.",
    bestTime: "Mattina presto (prima delle 10:00) per evitare la folla",
    sunset: "Non diretto, ma la luce tra le rocce è splendida",
    nearbyRestaurants: "Chiringuito basico sulla spiaggia",
    tips: ["In estate navetta obbligatoria dal parcheggio", "Cala Saladeta vale la camminata extra", "Porta pranzo al sacco, i servizi sono limitati"],
    bestFor: "Avventura, snorkeling, natura",
    type: "Sabbia e rocce",
  },
  {
    name: "Cala Benirrás",
    zone: "San Juan",
    vibe: "Tramonto e tamburi",
    image: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=800&q=80",
    description: "Famosa per il rituale dei tamburi al tramonto, ogni domenica. L'atmosfera è hippie, rilassata e spirituale. La spiaggia è circondato da colline coperte di pini e l'acqua è pulita e profonda.",
    bestTime: "Domenica pomeriggio per il rituale dei tamburi",
    sunset: "Iconico – i tamburi accompagnano il tramonto ogni domenica",
    nearbyRestaurants: "Chiringuito sulla spiaggia, Elements a pochi km",
    tips: ["Vai di domenica per l'esperienza dei tamburi", "Arrivo presto, parcheggio difficile", "Porta qualcosa da mangiare, i chiringuiti sono semplici"],
    bestFor: "Esperienza culturale, coppie, viaggiatori alternativi",
    type: "Ciottoli e sabbia",
  },
  {
    name: "Talamanca",
    zone: "Ibiza Town",
    vibe: "Pratica e comoda",
    image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=800&q=80",
    description: "La spiaggia più vicina a Ibiza Town, raggiungibile anche a piedi dal centro. Lunga, con sabbia fine e servizi completi. Perfetta per chi alloggia in città e vuole una mattinata di mare senza spostarsi.",
    bestTime: "Mattina – ideale per recuperare dopo una serata",
    sunset: "Non visibile direttamente",
    nearbyRestaurants: "Nobu Ibiza Bay, Chambao, S'Espartar",
    tips: ["Raggiungibile a piedi da Ibiza Town", "Ottima per la mattina dopo una serata", "Ristoranti consigliati lungo la passeggiata"],
    bestFor: "Chi alloggia a Ibiza Town, praticità",
    type: "Sabbia fine",
  },
  {
    name: "Cala Jondal",
    zone: "San José",
    vibe: "Beach club premium",
    image: "https://images.unsplash.com/photo-1437719417032-8799b0796b95?w=800&q=80",
    description: "La spiaggia di Blue Marlin Ibiza, uno dei beach club più esclusivi al mondo. La spiaggia è di ciottoli con acque profonde e limpide. L'atmosfera è luxury e internazionale. Yemanjá è un'istituzione per il pesce.",
    bestTime: "Dalle 12:00 per il beach club, tutto il giorno per la spiaggia",
    sunset: "Non diretto, ma la luce del pomeriggio è dorata",
    nearbyRestaurants: "Blue Marlin, Yemanjá (tra i migliori di pesce dell'isola)",
    tips: ["Prenota il lettino al Blue Marlin con anticipo", "Scarpette da mare consigliate (ciottoli)", "Yemanjá è tra i migliori ristoranti di pesce dell'isola"],
    bestFor: "Luxury, beach club, coppie",
    type: "Ciottoli",
  },
];

export default function SpiaggeIbiza() {
  return (
    <>
      <section className="relative pt-24 pb-12 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1920&q=80"
            alt="Spiagge di Ibiza"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/75 to-background" />
        </div>
        <div className="container relative z-10">
          <AnimatedSection>
            <p className="text-sm font-medium text-sunset-orange uppercase tracking-widest mb-4">Guida spiagge 2026</p>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-display font-black leading-[0.9] mb-6">
              Le spiagge più belle
              <br />
              <span className="text-gradient-warm">di Ibiza</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Una selezione curata delle migliori spiagge dell'isola con consigli su quando andare, tramonto e ristoranti vicini.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-dark-section">
        <div className="container">
          <div className="space-y-8">
            {beaches.map((beach, i) => (
              <AnimatedSection key={beach.name} delay={i * 0.04}>
                <div className="group bg-card/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-border/20 hover:border-sunset-orange/20 transition-all duration-500">
                  <div className="flex flex-col lg:flex-row">
                    {/* Image */}
                    <div className="lg:w-96 h-56 lg:h-auto relative overflow-hidden shrink-0">
                      <img
                        src={beach.image}
                        alt={beach.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/60 hidden lg:block" />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card/60 lg:hidden" />
                      <div className="absolute bottom-4 left-4 lg:hidden">
                        <span className="text-xs font-medium text-sunset-gold bg-sunset-gold/10 backdrop-blur-sm px-3 py-1 rounded-full">{beach.vibe}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6 lg:p-8">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl lg:text-2xl font-display font-bold text-foreground mb-1">{beach.name}</h3>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground/60">
                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {beach.zone}</span>
                            <span className="flex items-center gap-1"><Waves className="w-3 h-3" /> {beach.type}</span>
                          </div>
                        </div>
                        <span className="hidden lg:inline text-xs font-medium text-sunset-gold bg-sunset-gold/10 px-3 py-1 rounded-full">{beach.vibe}</span>
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed mb-5">{beach.description}</p>

                      {/* Details grid */}
                      <div className="grid sm:grid-cols-3 gap-4 mb-5">
                        <div className="bg-muted/20 rounded-xl p-3">
                          <div className="flex items-center gap-1.5 mb-1">
                            <Clock className="w-3 h-3 text-sunset-orange" />
                            <p className="text-xs font-medium text-foreground/70">Orario migliore</p>
                          </div>
                          <p className="text-xs text-muted-foreground">{beach.bestTime}</p>
                        </div>
                        <div className="bg-muted/20 rounded-xl p-3">
                          <div className="flex items-center gap-1.5 mb-1">
                            <Sun className="w-3 h-3 text-sunset-gold" />
                            <p className="text-xs font-medium text-foreground/70">Tramonto</p>
                          </div>
                          <p className="text-xs text-muted-foreground">{beach.sunset}</p>
                        </div>
                        <div className="bg-muted/20 rounded-xl p-3">
                          <div className="flex items-center gap-1.5 mb-1">
                            <Award className="w-3 h-3 text-sunset-orange" />
                            <p className="text-xs font-medium text-foreground/70">Ristoranti vicini</p>
                          </div>
                          <p className="text-xs text-muted-foreground">{beach.nearbyRestaurants}</p>
                        </div>
                      </div>

                      {/* Tips */}
                      <div className="space-y-1.5">
                        {beach.tips.map((tip, j) => (
                          <p key={j} className="text-xs text-muted-foreground/80 flex gap-2">
                            <Sun className="w-3 h-3 text-sunset-orange mt-0.5 flex-shrink-0" />
                            {tip}
                          </p>
                        ))}
                      </div>

                      <div className="mt-4 pt-4 border-t border-border/20">
                        <p className="text-xs text-muted-foreground/60">
                          <span className="text-sunset-orange">Ideale per:</span> {beach.bestFor}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(249,115,22,0.15),transparent_60%)] border-t border-white/5" />
        <div className="container relative z-10 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-primary-foreground mb-6">
              Vuoi scoprire le spiagge giuste per te?
            </h2>
            <p className="text-primary-foreground/70 mb-10 max-w-lg mx-auto text-lg">
              Ti aiuto a scegliere le spiagge migliori in base alla tua zona, al tuo stile e al tuo itinerario.
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
