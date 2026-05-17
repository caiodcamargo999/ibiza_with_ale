"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import { MessageCircle, ArrowRight, Music, Calendar, Award, Zap, Settings2, MapPin, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const daysOfWeek = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"];

interface ClubEvent {
  party: string;
  genre: string;
  highlight?: boolean;
}

interface Club {
  name: string;
  location: string;
  vibe: string;
  season: string;
  image: string;
  schedule: Record<string, ClubEvent[]>;
}

const clubs: Club[] = [
  {
    name: "Ushuaïa",
    location: "Playa d'en Bossa",
    vibe: "Open-air pool party, mega produzioni, main stage spettacolare",
    season: "Maggio – Ottobre 2026",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80",
    schedule: {
      "Lunedì": [{ party: "Ants", genre: "Tech house / Techno" }],
      "Martedì": [{ party: "ONGX", genre: "Urban / Reggaeton" }],
      "Mercoledì": [{ party: "Tomorrowland presents", genre: "EDM / House" }],
      "Giovedì": [{ party: "Calvin Harris", genre: "House / Pop", highlight: true }],
      "Venerdì": [{ party: "David Guetta – F*** Me I'm Famous", genre: "House / EDM", highlight: true }],
      "Sabato": [{ party: "Martin Garrix", genre: "EDM / Future bass", highlight: true }],
      "Domenica": [{ party: "Kygo – Palm Tree Music Festival", genre: "Tropical house" }],
    },
  },
  {
    name: "Hï Ibiza",
    location: "Playa d'en Bossa",
    vibe: "Indoor club premium, sound system di livello mondiale, due sale",
    season: "Maggio – Ottobre 2026",
    image: "https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=600&q=80",
    schedule: {
      "Lunedì": [{ party: "Glitterbox", genre: "Disco / House" }],
      "Martedì": [{ party: "Black Coffee", genre: "Afro house / Deep" }],
      "Mercoledì": [{ party: "Fisher", genre: "Tech house" }],
      "Giovedì": [{ party: "The Martinez Brothers", genre: "House / Tech house" }],
      "Venerdì": [{ party: "Tale of Us – Afterlife", genre: "Melodic techno", highlight: true }],
      "Sabato": [{ party: "Eric Prydz – HOLO", genre: "Progressive / Techno", highlight: true }],
    },
  },
  {
    name: "Pacha",
    location: "Ibiza Town (porto)",
    vibe: "Il club più iconico di Ibiza dal 1973, eleganza e tradizione",
    season: "Tutto l'anno",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80",
    schedule: {
      "Lunedì": [{ party: "Hot Since 82", genre: "Deep house" }],
      "Mercoledì": [{ party: "Solomun +1", genre: "Deep / Melodic house", highlight: true }],
      "Venerdì": [{ party: "Marco Carola – Music On", genre: "Techno", highlight: true }],
      "Sabato": [{ party: "Flower Power", genre: "Disco / Retro" }],
    },
  },
  {
    name: "Amnesia",
    location: "San Rafael",
    vibe: "Due sale leggendarie, terrace e main room. Atmosfera underground",
    season: "Giugno – Ottobre 2026",
    image: "https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=600&q=80",
    schedule: {
      "Martedì": [{ party: "Together", genre: "House / Tech house" }],
      "Giovedì": [{ party: "Pyramid", genre: "Techno / House" }],
      "Sabato": [{ party: "Elrow", genre: "Tech house / Party", highlight: true }],
    },
  },
  {
    name: "DC-10",
    location: "Ses Salines",
    vibe: "Underground puro, il club dei veri appassionati. Zero fronzoli",
    season: "Giugno – Ottobre 2026",
    image: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=600&q=80",
    schedule: {
      "Lunedì": [{ party: "Circoloco", genre: "Techno / Minimal", highlight: true }],
      "Venerdì": [{ party: "Paradise – Jamie Jones", genre: "House / Tech house" }],
    },
  },
  {
    name: "Club Chinois",
    location: "San Rafael",
    vibe: "Nuovo club di lusso con estetica orientale, sound house e deep tech",
    season: "Maggio – Ottobre 2026",
    image: "https://images.unsplash.com/photo-1545128485-c400e7702796?w=600&q=80",
    schedule: {
      "Mercoledì": [{ party: "Luciano & Friends", genre: "House / Minimal" }],
      "Sabato": [{ party: "Ritual", genre: "House / Tech house" }],
    },
  },
  {
    name: "O Beach",
    location: "San Antonio",
    vibe: "Day club con pool party, show e atmosfera festosa",
    season: "Maggio – Ottobre 2026",
    image: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=600&q=80",
    schedule: {
      "Venerdì": [{ party: "Ibiza Anthems", genre: "Commercial house" }],
      "Sabato": [{ party: "Pool Party Show", genre: "Commercial / House" }],
      "Domenica": [{ party: "Sunday Session", genre: "House" }],
    },
  },
  {
    name: "Ibiza Rocks",
    location: "San Antonio",
    vibe: "Hotel-club all'aperto, concerti live e pool party diurne",
    season: "Giugno – Settembre 2026",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&q=80",
    schedule: {
      "Mercoledì": [{ party: "Craig David TS5", genre: "R&B / Garage / House" }],
      "Giovedì": [{ party: "Pool party", genre: "Vari" }],
    },
  },
  {
    name: "Eden",
    location: "San Antonio",
    vibe: "Club rinnovato con line-up underground di qualità",
    season: "Giugno – Ottobre 2026",
    image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=600&q=80",
    schedule: {
      "Giovedì": [{ party: "Defected", genre: "House / Deep" }],
      "Sabato": [{ party: "Toolroom", genre: "Tech house" }],
    },
  },
  {
    name: "Es Paradis",
    location: "San Antonio",
    vibe: "Piramide di vetro iconica, water party leggendarie",
    season: "Giugno – Settembre 2026",
    image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=600&q=80",
    schedule: {
      "Lunedì": [{ party: "Water Party", genre: "House / Commercial", highlight: true }],
      "Mercoledì": [{ party: "Ibiza Classics", genre: "Dance classics" }],
    },
  },
];

const specialEvents = [
  {
    icon: Zap,
    title: "Opening Parties",
    period: "Maggio – Giugno 2026",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80",
    description: "L'inizio della stagione: i club aprono con eventi speciali, line-up stellari e un'energia unica.",
    events: ["Ushuaïa Opening – Fine maggio", "Hï Ibiza Opening – Inizio giugno", "Amnesia Opening – Giugno", "Pacha Opening – Fine maggio", "DC-10 Circoloco Opening – Giugno"],
  },
  {
    icon: Award,
    title: "Closing Parties",
    period: "Settembre – Ottobre 2026",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80",
    description: "Le ultime serate della stagione sono leggendarie. Set più lunghi, DJ che danno il massimo.",
    events: ["Ushuaïa Closing – Fine settembre", "Hï Ibiza Closing – Ottobre", "Amnesia Closing – Ottobre", "DC-10 Closing – Prima settimana ottobre", "Pacha Closing – Ultimo weekend ottobre"],
  },
  {
    icon: Settings2,
    title: "Eventi Speciali 2026",
    period: "Tutta la stagione",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80",
    description: "Oltre alle residenze settimanali, Ibiza offre eventi unici durante tutta la stagione.",
    events: ["IMS (International Music Summit) – Maggio", "Ibiza Gay Pride – Giugno", "Medieval Fair Dalt Vila – Maggio", "Fiestas de la Tierra – Agosto", "Ibiza Spirit Festival – Settembre"],
  },
];

function WeeklySchedule() {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  return (
    <div>
      {/* Day selector */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setSelectedDay(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            !selectedDay ? "bg-sunset-orange text-primary-foreground shadow-glow-orange" : "bg-card/60 text-muted-foreground hover:text-foreground border border-border/30"
          }`}
        >
          Tutti i giorni
        </button>
        {daysOfWeek.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day === selectedDay ? null : day)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedDay === day ? "bg-sunset-orange text-primary-foreground shadow-glow-orange" : "bg-card/60 text-muted-foreground hover:text-foreground border border-border/30"
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Schedule grid */}
      <div className="grid gap-4">
        {clubs.map((club) => {
          const relevantDays = selectedDay
            ? club.schedule[selectedDay] ? { [selectedDay]: club.schedule[selectedDay] } : {}
            : club.schedule;

          if (Object.keys(relevantDays).length === 0) return null;

          return (
            <AnimatedSection key={club.name}>
              <div className="bg-card/60 backdrop-blur-sm border border-border/30 rounded-2xl overflow-hidden hover:border-sunset-orange/20 transition-all">
                <div className="flex flex-col md:flex-row">
                  {/* Club image */}
                  <div className="md:w-48 h-32 md:h-auto relative overflow-hidden shrink-0">
                    <img src={club.image} alt={club.name} className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/80 hidden md:block" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card/80 md:hidden" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-5 md:p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Music className="w-4 h-4 text-sunset-red" />
                          <h3 className="text-xl font-display font-bold">{club.name}</h3>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <MapPin className="w-3 h-3" /> {club.location}
                        </div>
                      </div>
                      <span className="shrink-0 px-3 py-1 rounded-full text-xs font-semibold bg-muted text-muted-foreground">
                        {club.season}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground/70 mb-4">{club.vibe}</p>

                    {/* Events */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {Object.entries(relevantDays).map(([day, events]) =>
                        events.map((event, eIdx) => (
                          <div
                            key={`${day}-${eIdx}`}
                            className={`p-3 rounded-xl transition-colors ${
                              event.highlight
                                ? "bg-sunset-orange/10 border border-sunset-orange/20"
                                : "bg-muted/30 hover:bg-muted/50"
                            }`}
                          >
                            <p className="text-xs font-semibold text-sunset-gold mb-0.5">{day}</p>
                            <p className="text-sm font-semibold text-foreground">{event.party}</p>
                            <p className="text-xs text-muted-foreground">{event.genre}</p>
                            {event.highlight && (
                              <span className="inline-flex items-center gap-1 text-[10px] text-sunset-orange mt-1">
                                <Award className="w-2.5 h-2.5" /> Top pick
                              </span>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          );
        })}
      </div>
    </div>
  );
}

export default function CalendarioParty() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1920&q=80"
            alt="Ibiza nightlife"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>
        <div className="container relative z-10">
          <AnimatedSection>
            <p className="text-sm uppercase tracking-widest text-sunset-orange font-semibold mb-4">Stagione 2026</p>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              Calendario Party{" "}
              <span className="text-gradient-warm">Ibiza 2026</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Tutte le serate, i club e gli eventi speciali della stagione 2026. Filtra per giorno della settimana e scopri chi suona e dove.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Weekly Schedule */}
      <section className="bg-dark-section py-16">
        <div className="container">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-8">
              <Calendar className="w-6 h-6 text-sunset-orange" />
              <h2 className="text-3xl font-display font-bold">Programma Settimanale</h2>
            </div>
          </AnimatedSection>
          <WeeklySchedule />
        </div>
      </section>

      {/* Special Events */}
      <section className="bg-dark-alt py-16">
        <div className="container">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-10">
              <Settings2 className="w-6 h-6 text-sunset-gold" />
              <h2 className="text-3xl font-display font-bold">Eventi Speciali 2026</h2>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {specialEvents.map((event, idx) => (
              <AnimatedSection key={idx}>
                <div className="bg-card/60 backdrop-blur-sm border border-border/30 rounded-2xl overflow-hidden h-full flex flex-col hover:border-sunset-orange/20 transition-all">
                  <div className="relative h-40 overflow-hidden">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                    <div className="absolute bottom-3 left-4">
                      <div className="w-10 h-10 rounded-xl bg-sunset-orange/20 backdrop-blur-sm flex items-center justify-center">
                        <event.icon className="w-5 h-5 text-sunset-orange" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <p className="text-xs font-semibold text-sunset-gold mb-1">{event.period}</p>
                    <h3 className="text-xl font-display font-bold mb-3">{event.title}</h3>
                    <p className="text-sm text-muted-foreground mb-5">{event.description}</p>
                    <ul className="space-y-2 mt-auto">
                      {event.events.map((e, eIdx) => (
                        <li key={eIdx} className="flex items-start gap-2 text-sm text-foreground/80">
                          <Award className="w-3 h-3 mt-1 text-sunset-gold shrink-0" /> {e}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        <div className="container relative z-10 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4">
              Vuoi sapere quali serate fanno per te?
            </h2>
            <p className="text-primary-foreground/70 mb-8 max-w-lg mx-auto">
              Dimmi i tuoi gusti musicali e le date del viaggio, e ti consiglio le serate migliori.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contatti" className={cn(buttonVariants({ size: 'xl' }), "bg-background text-foreground hover:bg-background/90 shadow-elevated font-bold")}>
                  Pianifica le tue serate <ArrowRight className="w-5 h-5" />
                </Link>
              
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
