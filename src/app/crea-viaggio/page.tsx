"use client";
import { useState } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import {
  MessageCircle, Calendar, MapPin, Settings2, Music, Ship,
  Check, ChevronRight, ChevronLeft, Palmtree, Sun, Waves, Award, Send,
  Globe, Home, Car, PartyPopper, Wine, Umbrella
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  { label: "Date", icon: Calendar },
  { label: "Gruppo", icon: Globe },
  { label: "Zona", icon: MapPin },
  { label: "Esperienze", icon: Settings2 },
  { label: "Nightlife", icon: Music },
  { label: "Extra", icon: Ship },
  { label: "Riepilogo", icon: Check },
];

const groupSizes = [
  { id: "solo", label: "Solo", desc: "Viaggio in solitaria", icon: "🧳" },
  { id: "coppia", label: "Coppia", desc: "Viaggio romantico", icon: "💑" },
  { id: "amici-small", label: "3–5 amici", desc: "Piccolo gruppo", icon: "🎉" },
  { id: "amici-big", label: "6–10 amici", desc: "Grande gruppo", icon: "🔥" },
  { id: "amici-xl", label: "10+ persone", desc: "Maxi gruppo / addio al celibato", icon: "🎊" },
];

const zones = [
  { id: "playa-den-bossa", name: "Playa d'en Bossa", desc: "Nightlife + spiaggia + Ushuaïa/Hï", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80", vibe: "Party & Lifestyle" },
  { id: "ibiza-town", name: "Ibiza Town", desc: "Cultura + Pacha + vita notturna", image: "https://images.unsplash.com/photo-1573576695691-1b498085cf50?w=400&q=80", vibe: "Charme & Cultura" },
  { id: "san-antonio", name: "San Antonio", desc: "Tramonti + budget smart + Eden/Es Paradis", image: "https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?w=400&q=80", vibe: "Sunset & Fun" },
  { id: "santa-eulalia", name: "Santa Eulalia", desc: "Relax + ristoranti + nord facile", image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400&q=80", vibe: "Tranquillità" },
  { id: "san-jose", name: "San José", desc: "Spiagge top + natura + villa privata", image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=400&q=80", vibe: "Natura & Luxury" },
];

const experiences = [
  { id: "beach-day", name: "Giornata spiagge", icon: Waves, desc: "Cala Comte, Ses Salines, Cala Bassa..." },
  { id: "beach-club", name: "Beach club", icon: Sun, desc: "Blue Marlin, Nikki Beach, Cotton..." },
  { id: "sunset", name: "Sunset experience", icon: Settings2, desc: "Es Vedrà, Café del Mar, Hostal La Torre" },
  { id: "snorkeling", name: "Snorkeling & mare", icon: Waves, desc: "Cala Salada, Cala d'Hort, Cala Vadella" },
  { id: "mercati", name: "Mercati hippie", icon: Palmtree, desc: "Las Dalias, Sant Joan, Punta Arabí" },
  { id: "ristoranti", name: "Ristoranti top", icon: Award, desc: "La Paloma, Es Torrent, Casa Maca..." },
];

const nightlifeOptions = [
  { id: "ushuaia", name: "Ushuaïa", desc: "Pool party open-air", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&q=80" },
  { id: "hi", name: "Hï Ibiza", desc: "Mega club, due sale", image: "https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=300&q=80" },
  { id: "pacha", name: "Pacha", desc: "Leggenda dal 1973", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&q=80" },
  { id: "amnesia", name: "Amnesia", desc: "Terrace + Main Room", image: "https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=300&q=80" },
  { id: "dc10", name: "DC-10", desc: "Underground puro", image: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=300&q=80" },
  { id: "club-chinois", name: "Club Chinois", desc: "Elegante & sofisticato", image: "https://images.unsplash.com/photo-1545128485-c400e7702796?w=300&q=80" },
];

const extras = [
  { id: "alloggio", name: "Alloggio", desc: "Hotel, appartamento o villa", icon: Home },
  { id: "auto-scooter", name: "Auto o scooter", desc: "Noleggio per muoversi sull'isola", icon: Car },
  { id: "formentera", name: "Escursione Formentera", desc: "Giornata sull'isola sorella", icon: Ship },
  { id: "boat-party", name: "Boat Party", desc: "DJ + open bar in barca", icon: PartyPopper },
  { id: "open-bar", name: "Open bar", desc: "Pre-party o serata open bar", icon: Wine },
  { id: "guest-list", name: "Guest list club", desc: "Ingresso gratuito o ridotto", icon: Award },
  { id: "beach-club-exp", name: "Beach club experiences", desc: "Tavoli, letti e VIP in spiaggia", icon: Umbrella },
];

export default function CreaViaggio() {
  const [currentStep, setCurrentStep] = useState(0);
  const [arrivo, setArrivo] = useState("");
  const [partenza, setPartenza] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [selectedExperiences, setSelectedExperiences] = useState<Set<string>>(new Set());
  const [selectedNightlife, setSelectedNightlife] = useState<Set<string>>(new Set());
  const [selectedExtras, setSelectedExtras] = useState<Set<string>>(new Set());

  const toggleSet = (set: Set<string>, item: string, setter: (s: Set<string>) => void) => {
    const next = new Set(set);
    if (next.has(item)) next.delete(item); else next.add(item);
    setter(next);
  };

  const canProceed = () => {
    if (currentStep === 0) return arrivo && partenza;
    if (currentStep === 1) return !!selectedGroup;
    if (currentStep === 2) return !!selectedZone;
    return true;
  };

  const selectedZoneData = zones.find(z => z.id === selectedZone);
  const selectedGroupData = groupSizes.find(g => g.id === selectedGroup);

  const summaryWhatsApp = () => {
    const lines = [
      "Ciao Alessandra! Ecco il mio pacchetto Ibiza:",
      "",
      `📅 Date: ${arrivo || "?"} → ${partenza || "?"}`,
      `👥 Gruppo: ${selectedGroupData?.label || "?"}`,
      `📍 Zona: ${selectedZoneData?.name || "?"}`,
    ];
    if (selectedExperiences.size > 0) {
      lines.push(`✨ Esperienze: ${[...selectedExperiences].map(id => experiences.find(e => e.id === id)?.name).filter(Boolean).join(", ")}`);
    }
    if (selectedNightlife.size > 0) {
      lines.push(`🎵 Club: ${[...selectedNightlife].map(id => nightlifeOptions.find(c => c.id === id)?.name).filter(Boolean).join(", ")}`);
    }
    if (selectedExtras.size > 0) {
      lines.push(`🎁 Extra: ${[...selectedExtras].map(id => extras.find(e => e.id === id)?.name).filter(Boolean).join(", ")}`);
    }
    lines.push("", "Vorrei ricevere un preventivo!");
    return `https://wa.me/393XXXXXXXXX?text=${encodeURIComponent(lines.join("\n"))}`;
  };

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1920&q=80"
            alt="Ibiza landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background" />
        </div>
        <div className="container relative z-10 text-center">
          <AnimatedSection>
            <p className="text-sm uppercase tracking-widest text-sunset-orange font-semibold mb-4">Strumento interattivo</p>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
              Crea il tuo pacchetto{" "}
              <span className="text-gradient-warm">Ibiza</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Costruisci il tuo viaggio ideale passo dopo passo e richiedi un preventivo personalizzato.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Trip Builder */}
      <section className="bg-dark-section py-12 md:py-16">
        <div className="container max-w-4xl">
          {/* Step indicator */}
          <div className="flex items-center justify-center gap-1 md:gap-2 mb-12 overflow-x-auto pb-2">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isActive = i === currentStep;
              const isDone = i < currentStep;
              return (
                <div key={i} className="flex items-center">
                  <button
                    onClick={() => i <= currentStep && setCurrentStep(i)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                      isActive
                        ? "bg-sunset-orange text-primary-foreground shadow-glow-orange"
                        : isDone
                        ? "bg-sunset-orange/20 text-sunset-orange"
                        : "bg-card/40 text-muted-foreground/50"
                    }`}
                  >
                    {isDone ? <Check className="w-3 h-3" /> : <Icon className="w-3 h-3" />}
                    <span className="hidden sm:inline">{step.label}</span>
                  </button>
                  {i < steps.length - 1 && (
                    <ChevronRight className={`w-4 h-4 mx-1 ${i < currentStep ? "text-sunset-orange" : "text-border"}`} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Step content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Step 0: Date */}
              {currentStep === 0 && (
                <div className="text-center">
                  <h2 className="text-2xl md:text-3xl font-display font-bold mb-2">Quando vuoi partire?</h2>
                  <p className="text-muted-foreground mb-8">Seleziona le date del tuo viaggio</p>
                  <div className="grid sm:grid-cols-2 gap-4 max-w-md mx-auto">
                    <div className="space-y-2">
                      <label className="text-sm text-foreground/80 font-medium">Data arrivo</label>
                      <input
                        type="date"
                        value={arrivo}
                        onChange={(e) => setArrivo(e.target.value)}
                        className="w-full h-12 rounded-xl bg-card/60 border border-border/30 px-4 text-foreground focus:border-sunset-orange/50 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-foreground/80 font-medium">Data partenza</label>
                      <input
                        type="date"
                        value={partenza}
                        onChange={(e) => setPartenza(e.target.value)}
                        className="w-full h-12 rounded-xl bg-card/60 border border-border/30 px-4 text-foreground focus:border-sunset-orange/50 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 1: Group Size */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-2xl md:text-3xl font-display font-bold mb-2 text-center">Con chi parti?</h2>
                  <p className="text-muted-foreground mb-8 text-center">Seleziona la dimensione del tuo gruppo</p>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-2xl mx-auto">
                    {groupSizes.map((group) => {
                      const selected = selectedGroup === group.id;
                      return (
                        <button
                          key={group.id}
                          onClick={() => setSelectedGroup(group.id)}
                          className={`p-6 rounded-2xl text-center transition-all border ${
                            selected
                              ? "border-sunset-orange/40 bg-sunset-orange/10 shadow-glow-orange ring-2 ring-sunset-orange"
                              : "border-border/30 bg-card/40 hover:border-sunset-orange/20"
                          }`}
                        >
                          <span className="text-3xl mb-3 block">{group.icon}</span>
                          <h3 className="font-display font-bold text-foreground">{group.label}</h3>
                          <p className="text-xs text-muted-foreground mt-1">{group.desc}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 2: Zone */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-2xl md:text-3xl font-display font-bold mb-2 text-center">Dove vuoi alloggiare?</h2>
                  <p className="text-muted-foreground mb-8 text-center">Scegli la zona dell'isola che preferisci</p>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {zones.map((zone) => (
                      <button
                        key={zone.id}
                        onClick={() => setSelectedZone(zone.id)}
                        className={`relative rounded-2xl overflow-hidden text-left transition-all ${
                          selectedZone === zone.id
                            ? "ring-2 ring-sunset-orange shadow-glow-orange"
                            : "hover:ring-1 hover:ring-sunset-orange/30"
                        }`}
                      >
                        <div className="relative h-36 overflow-hidden">
                          <img src={zone.image} alt={zone.name} className="w-full h-full object-cover" loading="lazy" />
                          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
                          {selectedZone === zone.id && (
                            <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-sunset-orange flex items-center justify-center">
                              <Check className="w-4 h-4 text-primary-foreground" />
                            </div>
                          )}
                        </div>
                        <div className="p-4 bg-card/80">
                          <p className="text-xs text-sunset-orange font-medium mb-1">{zone.vibe}</p>
                          <h3 className="font-display font-bold text-foreground">{zone.name}</h3>
                          <p className="text-xs text-muted-foreground mt-1">{zone.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Experiences */}
              {currentStep === 3 && (
                <div>
                  <h2 className="text-2xl md:text-3xl font-display font-bold mb-2 text-center">Cosa vuoi fare?</h2>
                  <p className="text-muted-foreground mb-8 text-center">Seleziona le esperienze che ti interessano</p>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {experiences.map((exp) => {
                      const Icon = exp.icon;
                      const selected = selectedExperiences.has(exp.id);
                      return (
                        <button
                          key={exp.id}
                          onClick={() => toggleSet(selectedExperiences, exp.id, setSelectedExperiences)}
                          className={`p-5 rounded-2xl text-left transition-all border ${
                            selected
                              ? "border-sunset-orange/40 bg-sunset-orange/10 shadow-glow-orange"
                              : "border-border/30 bg-card/40 hover:border-sunset-orange/20"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                              selected ? "bg-sunset-orange/20" : "bg-muted/30"
                            }`}>
                              <Icon className={`w-5 h-5 ${selected ? "text-sunset-orange" : "text-muted-foreground"}`} />
                            </div>
                            <div>
                              <h3 className="font-display font-bold text-sm">{exp.name}</h3>
                              <p className="text-xs text-muted-foreground mt-0.5">{exp.desc}</p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 4: Nightlife */}
              {currentStep === 4 && (
                <div>
                  <h2 className="text-2xl md:text-3xl font-display font-bold mb-2 text-center">Quali club ti interessano?</h2>
                  <p className="text-muted-foreground mb-8 text-center">Seleziona i club dove vorresti andare</p>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {nightlifeOptions.map((club) => {
                      const selected = selectedNightlife.has(club.id);
                      return (
                        <button
                          key={club.id}
                          onClick={() => toggleSet(selectedNightlife, club.id, setSelectedNightlife)}
                          className={`relative rounded-2xl overflow-hidden text-left transition-all ${
                            selected ? "ring-2 ring-sunset-orange shadow-glow-orange" : "hover:ring-1 hover:ring-sunset-orange/30"
                          }`}
                        >
                          <div className="relative h-28 overflow-hidden">
                            <img src={club.image} alt={club.name} className="w-full h-full object-cover" loading="lazy" />
                            <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                            {selected && (
                              <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-sunset-orange flex items-center justify-center">
                                <Check className="w-4 h-4 text-primary-foreground" />
                              </div>
                            )}
                          </div>
                          <div className="p-3 bg-card/80">
                            <h3 className="font-display font-bold text-sm">{club.name}</h3>
                            <p className="text-xs text-muted-foreground">{club.desc}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 5: Extras */}
              {currentStep === 5 && (
                <div>
                  <h2 className="text-2xl md:text-3xl font-display font-bold mb-2 text-center">Vuoi aggiungere qualcosa?</h2>
                  <p className="text-muted-foreground mb-8 text-center">Seleziona i servizi extra per completare il pacchetto</p>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {extras.map((extra) => {
                      const Icon = extra.icon;
                      const selected = selectedExtras.has(extra.id);
                      return (
                        <button
                          key={extra.id}
                          onClick={() => toggleSet(selectedExtras, extra.id, setSelectedExtras)}
                          className={`p-5 rounded-2xl text-left transition-all border ${
                            selected
                              ? "border-sunset-orange/40 bg-sunset-orange/10 shadow-glow-orange"
                              : "border-border/30 bg-card/40 hover:border-sunset-orange/20"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                              selected ? "bg-sunset-orange/20" : "bg-muted/30"
                            }`}>
                              <Icon className={`w-5 h-5 ${selected ? "text-sunset-orange" : "text-muted-foreground"}`} />
                            </div>
                            <div>
                              <h3 className="font-display font-bold text-sm">{extra.name}</h3>
                              <p className="text-xs text-muted-foreground mt-0.5">{extra.desc}</p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 6: Summary */}
              {currentStep === 6 && (
                <div>
                  <h2 className="text-2xl md:text-3xl font-display font-bold mb-2 text-center">
                    Il tuo pacchetto <span className="text-gradient-warm">Ibiza</span>
                  </h2>
                  <p className="text-muted-foreground mb-8 text-center">Ecco il riepilogo delle tue scelte</p>

                  <div className="bg-card/60 backdrop-blur-sm border border-border/30 rounded-2xl p-6 md:p-8 space-y-6">
                    {/* Dates */}
                    <div className="flex items-start gap-4">
                      <Calendar className="w-5 h-5 text-sunset-orange mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Date</p>
                        <p className="text-sm font-medium text-foreground">
                          {arrivo ? new Date(arrivo).toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" }) : "—"} → {partenza ? new Date(partenza).toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" }) : "—"}
                        </p>
                      </div>
                    </div>

                    {/* Group */}
                    <div className="flex items-start gap-4">
                      <Globe className="w-5 h-5 text-sunset-orange mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Gruppo</p>
                        <p className="text-sm font-medium text-foreground">{selectedGroupData ? `${selectedGroupData.icon} ${selectedGroupData.label}` : "Non selezionato"}</p>
                      </div>
                    </div>

                    {/* Zone */}
                    <div className="flex items-start gap-4">
                      <MapPin className="w-5 h-5 text-sunset-orange mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Zona</p>
                        <p className="text-sm font-medium text-foreground">{selectedZoneData?.name || "Non selezionata"}</p>
                      </div>
                    </div>

                    {/* Experiences */}
                    {selectedExperiences.size > 0 && (
                      <div className="flex items-start gap-4">
                        <Settings2 className="w-5 h-5 text-sunset-orange mt-0.5 shrink-0" />
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Esperienze</p>
                          <div className="flex flex-wrap gap-2">
                            {[...selectedExperiences].map(id => {
                              const exp = experiences.find(e => e.id === id);
                              return exp && (
                                <span key={id} className="px-3 py-1 rounded-full text-xs bg-sunset-orange/10 text-sunset-orange">
                                  {exp.name}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Nightlife */}
                    {selectedNightlife.size > 0 && (
                      <div className="flex items-start gap-4">
                        <Music className="w-5 h-5 text-sunset-orange mt-0.5 shrink-0" />
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Club</p>
                          <div className="flex flex-wrap gap-2">
                            {[...selectedNightlife].map(id => {
                              const club = nightlifeOptions.find(c => c.id === id);
                              return club && (
                                <span key={id} className="px-3 py-1 rounded-full text-xs bg-sunset-red/10 text-sunset-red">
                                  {club.name}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Extras */}
                    {selectedExtras.size > 0 && (
                      <div className="flex items-start gap-4">
                        <Ship className="w-5 h-5 text-sunset-orange mt-0.5 shrink-0" />
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Extra</p>
                          <div className="flex flex-wrap gap-2">
                            {[...selectedExtras].map(id => {
                              const ext = extras.find(e => e.id === id);
                              return ext && (
                                <span key={id} className="px-3 py-1 rounded-full text-xs bg-sunset-gold/10 text-sunset-gold">
                                  {ext.name}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <a href={summaryWhatsApp()} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "hero" })}>
                      <div className="w-10 h-10 rounded-full bg-[#EA580C] flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105 shrink-0">
                        <Send className="w-4 h-4 text-white animate-send-slide" />
                      </div>
                      <span className="text-sm font-bold tracking-wide">
                        Richiedi preventivo per questo pacchetto
                      </span>
                    </a>
                    
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          {currentStep < 6 && (
            <div className="flex justify-between mt-10">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
              >
                <ChevronLeft className="w-4 h-4" /> Indietro
              </Button>
              <Button
                variant="hero"
                size="lg"
                onClick={() => setCurrentStep(Math.min(6, currentStep + 1))}
                disabled={!canProceed()}
              >
                Avanti <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}

          {currentStep === 6 && (
            <div className="flex justify-center mt-6">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setCurrentStep(0)}
              >
                <ChevronLeft className="w-4 h-4" /> Ricomincia
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
