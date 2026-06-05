"use client";
import { CtaButton } from "@/components/CtaButton";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Image from "next/image";
import AnimatedSection from "@/components/AnimatedSection";
import { 
  CalendarIcon, 
  StarIcon, 
  LightningBoltIcon, 
  MixerHorizontalIcon, 
  SewingPinIcon, 
  MagicWandIcon
} from "@radix-ui/react-icons";
import { useFormStore } from "@/store/useFormStore";

const daysOfWeek = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"];

interface Residency {
  club: string;
  party: string;
  dj: string;
  genre: string;
  image: string;
  highlight?: boolean;
}

const residenciesByDay: Record<string, Residency[]> = {
  "Lunedì": [
    {
      club: "Ushuaïa",
      party: "F*** Me I'm Famous!",
      dj: "David Guetta",
      genre: "EDM / Pop Dance",
      highlight: true,
      image: "https://dv7zfk0hwmxgu.cloudfront.net/sites/default/files/styles/embedded_auto_740_width/public/promoter-images/137878/coupon-1651067479.jpg",
    },
    {
      club: "Pacha",
      party: "Sonny Fodera",
      dj: "Sonny Fodera",
      genre: "House",
      image: "https://dv7zfk0hwmxgu.cloudfront.net/sites/default/files/styles/embedded_auto_740_width/public/promoter-images/142651/coupon-1752077820.jpg",
    },
    {
      club: "[UNVRS]",
      party: "Experts Only",
      dj: "John Summit",
      genre: "Tech House / Techno",
      highlight: true,
      image: "https://dv7zfk0hwmxgu.cloudfront.net/sites/default/files/styles/embedded_auto_740_width/public/promoter-images/144979/coupon-1768925938.jpg",
    },
    {
      club: "DC-10",
      party: "Circoloco",
      dj: "Various Artists",
      genre: "Underground / Minimal",
      image: "https://dv7zfk0hwmxgu.cloudfront.net/sites/default/files/styles/embedded_auto_740_width/public/promoter-images/88910/coupon-1778845830.jpg",
    }
  ],
  "Martedì": [
    {
      club: "Ushuaïa",
      party: "Calvin Harris",
      dj: "Calvin Harris",
      genre: "EDM / Dance",
      highlight: true,
      image: "https://dv7zfk0hwmxgu.cloudfront.net/sites/default/files/styles/embedded_auto_740_width/public/promoter-images/133059/coupon-1770842235.jpg",
    },
    {
      club: "Hï Ibiza",
      party: "The Martinez Brothers",
      dj: "The Martinez Brothers",
      genre: "Tech House / NYC House",
      image: "https://dv7zfk0hwmxgu.cloudfront.net/sites/default/files/styles/embedded_auto_740_width/public/promoter-images/136287/coupon-1677235954.jpg",
    },
    {
      club: "Pikes",
      party: "Pikes Presents",
      dj: "Various Artists",
      genre: "House / Disco",
      image: "https://dv7zfk0hwmxgu.cloudfront.net/sites/default/files/styles/embedded_auto_740_width/public/promoter-images/142651/coupon-1752077820.jpg",
    }
  ],
  "Mercoledì": [
    {
      club: "Ushuaïa",
      party: "Tomorrowland Presents",
      dj: "Dimitri Vegas & Like Mike",
      genre: "EDM / Mainstage",
      highlight: true,
      image: "https://dv7zfk0hwmxgu.cloudfront.net/sites/default/files/styles/embedded_auto_740_width/public/promoter-images/121873/coupon-1769016185.jpg",
    },
    {
      club: "Hï Ibiza",
      party: "Our House",
      dj: "Meduza & James Hype",
      genre: "Tech House",
      highlight: true,
      image: "https://dv7zfk0hwmxgu.cloudfront.net/sites/default/files/styles/embedded_auto_740_width/public/promoter-images/142666/coupon-1768345822.jpg",
    },
    {
      club: "[UNVRS]",
      party: "Jamie Jones",
      dj: "Jamie Jones",
      genre: "House / Tech House",
      image: "https://dv7zfk0hwmxgu.cloudfront.net/sites/default/files/styles/embedded_auto_740_width/public/promoter-images/144979/coupon-1768925938.jpg",
    }
  ],
  "Giovedì": [
    {
      club: "Ushuaïa",
      party: "Martin Garrix",
      dj: "Martin Garrix",
      genre: "EDM / Future Bass",
      highlight: true,
      image: "https://dv7zfk0hwmxgu.cloudfront.net/sites/default/files/styles/embedded_auto_740_width/public/promoter-images/121873/coupon-1769016185.jpg",
    },
    {
      club: "Chinois",
      party: "Defected",
      dj: "Various Artists",
      genre: "House",
      highlight: true,
      image: "https://dv7zfk0hwmxgu.cloudfront.net/sites/default/files/styles/embedded_auto_740_width/public/promoter-images/144884/coupon-1780662089.jpg",
    },
    {
      club: "Pacha",
      party: "Pure Pacha",
      dj: "Purple Disco Machine",
      genre: "Disco / House",
      image: "https://dv7zfk0hwmxgu.cloudfront.net/sites/default/files/styles/embedded_auto_740_width/public/promoter-images/132969/coupon-1716029008.jpg",
    }
  ],
  "Venerdì": [
    {
      club: "Pacha",
      party: "Music On",
      dj: "Marco Carola",
      genre: "Techno / Tech House",
      highlight: true,
      image: "https://dv7zfk0hwmxgu.cloudfront.net/sites/default/files/styles/embedded_auto_740_width/public/promoter-images/132969/coupon-1716029008.jpg",
    },
    {
      club: "Hï Ibiza",
      party: "Dom Dolla",
      dj: "Dom Dolla",
      genre: "Tech House",
      highlight: true,
      image: "https://dv7zfk0hwmxgu.cloudfront.net/sites/default/files/styles/embedded_auto_740_width/public/promoter-images/142666/coupon-1768345822.jpg",
    },
    {
      club: "Amnesia",
      party: "Glitterbox",
      dj: "Various Artists",
      genre: "Disco / Classic House",
      image: "https://dv7zfk0hwmxgu.cloudfront.net/sites/default/files/styles/embedded_auto_740_width/public/promoter-images/144900/coupon-1780562947.jpg",
    },
    {
      club: "[UNVRS]",
      party: "David Guetta",
      dj: "David Guetta",
      genre: "EDM",
      image: "https://dv7zfk0hwmxgu.cloudfront.net/sites/default/files/styles/embedded_auto_740_width/public/promoter-images/143100/coupon-1755518491.jpg",
    }
  ],
  "Sabato": [
    {
      club: "Ushuaïa",
      party: "ANTS",
      dj: "Andrea Oliva & Guests",
      genre: "Tech House / Minimal",
      highlight: true,
      image: "https://dv7zfk0hwmxgu.cloudfront.net/sites/default/files/styles/embedded_auto_740_width/public/promoter-images/88910/coupon-1778845830.jpg",
    },
    {
      club: "[UNVRS]",
      party: "Elrow",
      dj: "Various Artists",
      genre: "Tech House / Party",
      highlight: true,
      image: "https://dv7zfk0hwmxgu.cloudfront.net/sites/default/files/styles/embedded_auto_740_width/public/promoter-images/144979/coupon-1768925938.jpg",
    },
    {
      club: "Pacha",
      party: "Flower Power",
      dj: "Roger Sanchez",
      genre: "House / Classic",
      image: "https://dv7zfk0hwmxgu.cloudfront.net/sites/default/files/styles/embedded_auto_740_width/public/promoter-images/142651/coupon-1752077820.jpg",
    },
    {
      club: "Chinois",
      party: "The Masquerade",
      dj: "Claptone",
      genre: "House",
      image: "https://dv7zfk0hwmxgu.cloudfront.net/sites/default/files/styles/embedded_auto_740_width/public/promoter-images/144884/coupon-1780662089.jpg",
    }
  ],
  "Domenica": [
    {
      club: "Pacha",
      party: "Solomun +1",
      dj: "Solomun",
      genre: "Deep / Melodic House",
      highlight: true,
      image: "https://dv7zfk0hwmxgu.cloudfront.net/sites/default/files/styles/embedded_auto_740_width/public/promoter-images/136287/coupon-1677235954.jpg",
    },
    {
      club: "[UNVRS]",
      party: "Carl Cox",
      dj: "Carl Cox",
      genre: "Techno",
      highlight: true,
      image: "https://dv7zfk0hwmxgu.cloudfront.net/sites/default/files/styles/embedded_auto_740_width/public/promoter-images/142543/coupon-1755943137.jpg",
    },
    {
      club: "Chinois",
      party: "SAGA",
      dj: "Bedouin",
      genre: "Deep House",
      image: "https://dv7zfk0hwmxgu.cloudfront.net/sites/default/files/styles/embedded_auto_740_width/public/promoter-images/144884/coupon-1780662089.jpg",
    }
  ]
};

const specialEvents = [
  {
    icon: LightningBoltIcon,
    title: "Opening Parties",
    period: "Maggio – Giugno 2026",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80",
    description: "L'inizio della stagione: i club aprono con eventi speciali, line-up stellari e un'energia unica.",
    events: ["Ushuaïa Opening – Fine maggio", "Hï Ibiza Opening – Inizio giugno", "Amnesia Opening – Giugno", "Pacha Opening – Fine maggio", "DC-10 Circoloco Opening – Giugno"],
  },
  {
    icon: StarIcon,
    title: "Closing Parties",
    period: "Settembre – Ottobre 2026",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80",
    description: "Le ultime serate della stagione sono leggendarie. Set più lunghi, DJ che danno il massimo.",
    events: ["Ushuaïa Closing – Fine settembre", "Hï Ibiza Closing – Ottobre", "Amnesia Closing – Ottobre", "DC-10 Closing – Prima settimana ottobre", "Pacha Closing – Ultimo weekend ottobre"],
  },
  {
    icon: MixerHorizontalIcon,
    title: "Eventi Speciali 2026",
    period: "Tutta la stagione",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80",
    description: "Oltre alle residenze settimanali, Ibiza offre eventi unici durante tutta la stagione.",
    events: ["IMS (International Music Summit) – Maggio", "Ibiza Gay Pride – Giugno", "Medieval Fair Dalt Vila – Maggio", "Fiestas de la Tierra – Agosto", "Ibiza Spirit Festival – Settembre"],
  },
];

function WeeklySchedule() {
  const [selectedDay, setSelectedDay] = useState<string>("Giovedì"); // Default day just for show
  const { openForm, setPackage } = useFormStore();

  const handleRequestParty = (partyName: string, club: string) => {
    setPackage(`Info Party: ${partyName} @ ${club}`);
    openForm();
  };

  return (
    <div>
      {/* Day selector */}
      <div className="flex flex-nowrap md:flex-wrap overflow-x-auto gap-2 mb-10 pb-2 md:pb-0 scrollbar-hide">
        {daysOfWeek.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`shrink-0 px-6 py-3 rounded-full text-sm font-bold transition-all ${
              selectedDay === day 
                ? "bg-sunset-orange text-white shadow-glow-orange scale-105" 
                : "bg-card/60 text-muted-foreground hover:text-foreground border border-border/30"
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Grid of Parties for the selected day */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {residenciesByDay[selectedDay]?.map((residency, idx) => (
          <AnimatedSection key={idx} delay={idx * 0.1}>
            <div className="group bg-[#0B0C0E] border border-white/5 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:border-white/10 hover:shadow-glow-purple h-full flex flex-col">
              {/* Poster Image */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image 
                  src={residency.image} 
                  alt={residency.party} 
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-[#0B0C0E]/40 to-transparent opacity-90" />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                  <div className="bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5">
                    <SewingPinIcon className="w-3.5 h-3.5 text-white/70" />
                    <span className="text-xs font-bold text-white tracking-wider">{residency.club}</span>
                  </div>
                  {residency.highlight && (
                    <div className="bg-gradient-to-r from-sunset-orange to-pink-500 p-[1px] rounded-full">
                      <div className="bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5">
                        <StarIcon className="w-3.5 h-3.5 text-sunset-gold" />
                        <span className="text-xs font-bold text-white">Top Pick</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content over image */}
                <div className="absolute bottom-4 left-4 right-4 text-left z-10">
                  <p className="text-sunset-gold font-bold text-xs uppercase tracking-widest mb-1">
                    {residency.genre}
                  </p>
                  <h3 className="text-2xl font-display font-bold text-white leading-tight mb-1">
                    {residency.party}
                  </h3>
                  <p className="text-white/70 text-sm flex items-center gap-2">
                    <MagicWandIcon className="w-4 h-4 text-sunset-purple" />
                    {residency.dj}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="p-4 mt-auto">
                <button 
                  onClick={() => handleRequestParty(residency.party, residency.club)}
                  className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium py-3 rounded-xl transition-all hover:border-sunset-purple/50 group-hover:bg-gradient-to-r group-hover:from-sunset-purple/20 group-hover:to-sunset-orange/20"
                >
                  Richiedi Info
                </button>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}

export default function CalendarioParty() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-24 pb-12 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/clubs/imgi_7_Buona_Festa.png"
            alt="Ibiza nightlife"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>
        <div className="container relative z-10">
          <AnimatedSection>
            <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-4">Stagione 2026</p>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              Calendario Party{" "}
              <span className="text-primary">Ibiza 2026</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Scopri i residency e le serate confermate per l'estate. Usa il calendario settimanale per trovare i top event ogni giorno!
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Weekly Schedule */}
      <section className="bg-dark-section py-12 md:py-16">
        <div className="container">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-8">
              <CalendarIcon className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-display font-bold">Calendario Settimanale (Giugno)</h2>
            </div>
          </AnimatedSection>
          <WeeklySchedule />
        </div>
      </section>

      {/* Special Events */}
      <section className="bg-dark-alt py-12 md:py-16">
        <div className="container">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-10">
              <MixerHorizontalIcon className="w-6 h-6 text-sunset-gold" />
              <h2 className="text-3xl font-display font-bold">Eventi Speciali 2026</h2>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {specialEvents.map((event, idx) => (
              <AnimatedSection key={idx}>
                <div className="bg-card/60 backdrop-blur-sm border border-border/30 rounded-2xl overflow-hidden h-full flex flex-col hover:border-sunset-orange/20 transition-all">
                  <div className="relative h-48 overflow-hidden">
                    <Image 
                      src={event.image} 
                      alt={event.title} 
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                    <div className="absolute bottom-3 left-4">
                      <div className="w-10 h-10 rounded-xl bg-sunset-orange/20 backdrop-blur-sm flex items-center justify-center">
                        <event.icon className="w-5 h-5 text-primary" />
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
                          <StarIcon className="w-3 h-3 mt-1 text-sunset-gold shrink-0" /> {e}
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
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(217,70,239,0.15),transparent_60%)] border-t border-white/5" />
        <div className="container relative z-10 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4">
              Cerchi un pass VIP o prevendite?
            </h2>
            <p className="text-primary-foreground/70 mb-8 max-w-lg mx-auto">
              Contattaci e ti garantiamo gli accessi per i party più esclusivi di Ibiza senza fila.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <CtaButton text="Richiedi Prevendite" />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
