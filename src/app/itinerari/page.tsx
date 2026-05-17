"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import { MessageCircle, ArrowRight, Music, Sun, Ship, Settings2, Moon, Waves, MapPin, Utensils, Award, Clock, Globe, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const itineraries = [
  {
    id: "weekend-party",
    title: "Weekend Party Experience",
    subtitle: "3 notti di energia pura tra pool party, club leggendari e beach bar",
    badge: "Party",
    duration: "3 notti",
    badgeColor: "bg-sunset-red/20 text-sunset-red",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80",
    ideal: "Gruppi di amici, addii al celibato/nubilato",
    highlights: ["Ushuaïa pool party", "Hï Ibiza o Pacha", "Boat party opzionale"],
    days: [
      {
        day: "Giorno 1 – Arrivo & Prima Serata",
        mood: "Energia crescente",
        items: [
          { icon: MapPin, text: "Check-in a Playa d'en Bossa – la zona più strategica per la nightlife", time: "15:00" },
          { icon: Waves, text: "Primo bagno e relax in spiaggia con drink al chiringuito", time: "16:00" },
          { icon: Utensils, text: "Aperitivo lungo al Bora Bora Beach Club sulla spiaggia", time: "18:30" },
          { icon: Utensils, text: "Cena da CBbC Playa d'en Bossa o Nagai", time: "21:00" },
          { icon: Music, text: "Serata a Hï Ibiza: Theatre room per tech-house, Club per melodic", time: "23:30" },
        ],
      },
      {
        day: "Giorno 2 – Pool Party & Club",
        mood: "Giornata leggendaria",
        items: [
          { icon: Sun, text: "Colazione lenta e recupero energie", time: "11:00" },
          { icon: Music, text: "Pool party a Ushuaïa – il palcoscenico open-air più iconico di Ibiza", time: "14:00" },
          { icon: Utensils, text: "Pausa cena in zona Ibiza Town – Cas Costas o La Brasa", time: "21:00" },
          { icon: Music, text: "Serata a Pacha (dal 1973) o Amnesia (Terrace + Main Room)", time: "00:00" },
        ],
      },
      {
        day: "Giorno 3 – Beach Day & Closing",
        mood: "Ultimo rush",
        items: [
          { icon: Sun, text: "Mattina a Ses Salines – spiaggia iconica, vibe internazionale", time: "11:00" },
          { icon: Utensils, text: "Pranzo al Jockey Club o Sa Trinxa sulla spiaggia", time: "13:30" },
          { icon: Ship, text: "Opzione: Boat Party pomeridiana con DJ e open bar (facoltativa)", time: "15:00" },
          { icon: MapPin, text: "Tramonto dalla terrazza di Dalt Vila", time: "19:30" },
          { icon: Utensils, text: "Ultima cena al porto di Ibiza Town", time: "21:30" },
          { icon: Music, text: "Ultima serata: DC-10 Circoloco (lunedì) o Club Chinois", time: "23:00" },
        ],
      },
    ],
  },
  {
    id: "ibiza-formentera",
    title: "Ibiza + Formentera Experience",
    subtitle: "5 giorni tra l'energia di Ibiza e le spiagge caraibiche di Formentera",
    badge: "Due Isole",
    duration: "5 giorni",
    badgeColor: "bg-sky-400/20 text-sky-400",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    ideal: "Coppie, gruppi misti che vogliono varietà",
    highlights: ["Giornata a Formentera", "Ses Illetes", "Cala Comte al tramonto"],
    days: [
      {
        day: "Giorno 1 – Ibiza Town & Dalt Vila",
        mood: "Scoperta",
        items: [
          { icon: MapPin, text: "Arrivo e check-in – consiglio zona Ibiza Town o Playa d'en Bossa", time: "14:00" },
          { icon: MapPin, text: "Esplorazione di Dalt Vila – patrimonio UNESCO, viste mozzafiato", time: "16:00" },
          { icon: Utensils, text: "Aperitivo al porto con vista sulle barche", time: "19:00" },
          { icon: Utensils, text: "Cena a Sa Capella – ex cappella del '700 trasformata in ristorante", time: "21:00" },
          { icon: Music, text: "Prima serata: drink al porto o ingresso a Pacha", time: "23:30" },
        ],
      },
      {
        day: "Giorno 2 – Costa Ovest & Tramonti",
        mood: "Meraviglia naturale",
        items: [
          { icon: Sun, text: "Mattina a Cala Comte – le acque più turchesi di Ibiza", time: "10:00" },
          { icon: Utensils, text: "Pranzo al Sunset Ashram o al chiringuito sulla spiaggia", time: "13:00" },
          { icon: Sun, text: "Pomeriggio a Cala Tarida – spiaggia ampia e versatile", time: "15:00" },
          { icon: MapPin, text: "Tramonto al viewpoint di Es Vedrà – panorama mistico", time: "19:30" },
          { icon: Utensils, text: "Cena a Es Torrent – ristorante di pesce leggendario", time: "21:00" },
        ],
      },
      {
        day: "Giorno 3 – Formentera",
        mood: "Paradiso",
        items: [
          { icon: Ship, text: "Ferry mattutino dal porto di Ibiza (30 min) – prenota in anticipo", time: "09:30" },
          { icon: Sun, text: "Ses Illetes – la spiaggia più bella del Mediterraneo, acqua trasparente", time: "10:30" },
          { icon: Utensils, text: "Pranzo a Es Molí de Sal o Juan y Andrea sulla spiaggia", time: "13:00" },
          { icon: Sun, text: "Giro dell'isola in scooter: Cala Saona, Es Pujols, faro La Mola", time: "15:00" },
          { icon: Ship, text: "Rientro a Ibiza con il ferry al tramonto", time: "19:00" },
          { icon: Music, text: "Serata relax o uscita a Lío Ibiza (cena-show)", time: "22:00" },
        ],
      },
      {
        day: "Giorno 4 – Nord & Cultura",
        mood: "Autenticità",
        items: [
          { icon: Sun, text: "Mattina a Cala Benirrás – atmosfera boho, spiaggia dei tamburi", time: "10:00" },
          { icon: Utensils, text: "Pranzo a La Paloma – cucina farm-to-table nel giardino", time: "13:00" },
          { icon: MapPin, text: "Mercato hippie Las Dalias – artigianato, vintage, musica", time: "15:30" },
          { icon: Sun, text: "Cala de Sant Vicent – spiaggia del nord, meno turistica", time: "17:00" },
          { icon: Music, text: "Serata a Amnesia o DC-10 – club underground", time: "23:00" },
        ],
      },
      {
        day: "Giorno 5 – Beach Club & Partenza",
        mood: "Ultimo giorno, zero rimpianti",
        items: [
          { icon: Sun, text: "Mattina relax a Talamanca – spiaggia comoda vicina a Ibiza Town", time: "10:00" },
          { icon: Utensils, text: "Brunch al Nikki Beach o al Blue Marlin", time: "12:00" },
          { icon: MapPin, text: "Shopping e ultimo giro nel centro di Ibiza Town", time: "15:00" },
          { icon: Ship, text: "Partenza con il cuore pieno", time: "17:00" },
        ],
      },
    ],
  },
  {
    id: "beach-sunset",
    title: "Beach & Sunset Experience",
    subtitle: "5 giorni tra le spiagge più belle, beach club esclusivi e tramonti indimenticabili",
    badge: "Relax Premium",
    duration: "5 giorni",
    badgeColor: "bg-sunset-gold/20 text-sunset-gold",
    image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&q=80",
    ideal: "Coppie, anniversari, chi ama il lusso accessibile",
    highlights: ["Blue Marlin", "Cotton Beach Club", "Es Vedrà al tramonto"],
    days: [
      {
        day: "Giorno 1 – Arrivo & Sunset",
        mood: "Benvenuti in paradiso",
        items: [
          { icon: MapPin, text: "Check-in in villa o hotel nella zona di San José", time: "14:00" },
          { icon: Sun, text: "Primo bagno a Cala Vadella – baia protetta, acque calme", time: "16:00" },
          { icon: MapPin, text: "Tramonto a Las Puertas del Cielo – installazione artistica sulla scogliera", time: "19:30" },
          { icon: Utensils, text: "Cena romantica a Casa Maca – terrazza panoramica su Dalt Vila", time: "21:00" },
        ],
      },
      {
        day: "Giorno 2 – Costa Ovest",
        mood: "Le acque più belle",
        items: [
          { icon: Sun, text: "Mattina a Cala Comte – le acque turchesi più fotografate dell'isola", time: "10:00" },
          { icon: Utensils, text: "Pranzo al Cotton Beach Club – total white con piscina infinity", time: "13:00" },
          { icon: Sun, text: "Pomeriggio a Cala Bassa – acque calme, ideale per relax", time: "15:30" },
          { icon: MapPin, text: "Tramonto a Hostal La Torre – DJ set acustici con vista", time: "19:00" },
          { icon: Utensils, text: "Cena a Sa Capella – nel bosco, atmosfera magica a lume di candela", time: "21:30" },
        ],
      },
      {
        day: "Giorno 3 – Beach Club Day",
        mood: "Luxury day",
        items: [
          { icon: Sun, text: "Mattina a Cala Jondal – spiaggia dei beach club", time: "10:00" },
          { icon: Utensils, text: "Giornata al Blue Marlin – lettino, champagne, DJ internazionali", time: "12:00" },
          { icon: Sun, text: "Opzione pomeriggio: snorkeling a Cala d'Hort con vista Es Vedrà", time: "16:00" },
          { icon: MapPin, text: "Tramonto dal viewpoint di Es Vedrà", time: "19:30" },
          { icon: Utensils, text: "Cena a Es Torrent – pesce fresco nella caletta segreta", time: "21:00" },
        ],
      },
      {
        day: "Giorno 4 – Nord Selvaggio",
        mood: "Natura e autenticità",
        items: [
          { icon: Sun, text: "Cala Salada e Cala Saladeta – le cale nascoste tra le pinete", time: "10:00" },
          { icon: Utensils, text: "Pranzo a Cala Bonita – sulla spiaggia nel nord", time: "13:00" },
          { icon: Sun, text: "Pomeriggio a Cala Benirrás – la spiaggia boho per eccellenza", time: "15:00" },
          { icon: Utensils, text: "Cena a La Paloma – orto proprio, cucina bio nel giardino incantato", time: "20:00" },
          { icon: Moon, text: "Serata sotto le stelle – cocktail al Bambuddha Grove", time: "22:30" },
        ],
      },
      {
        day: "Giorno 5 – Relax & Partenza",
        mood: "Last magic moments",
        items: [
          { icon: Sun, text: "Mattina a Ses Salines o Talamanca per l'ultimo bagno", time: "10:00" },
          { icon: Utensils, text: "Brunch all'Experimental Beach – boho-chic tra le saline", time: "12:00" },
          { icon: MapPin, text: "Passeggiata nel porto di Ibiza Town", time: "15:00" },
          { icon: Ship, text: "Partenza", time: "17:00" },
        ],
      },
    ],
  },
  {
    id: "nightlife",
    title: "Nightlife Ibiza Experience",
    subtitle: "7 notti nei migliori club del mondo – ogni sera nel posto giusto al momento giusto",
    badge: "Nightlife",
    duration: "7 notti",
    badgeColor: "bg-sunset-purple/20 text-sunset-purple",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80",
    ideal: "Amanti della musica elettronica, gruppi party, chi vuole il massimo dalla nightlife",
    highlights: ["7 club diversi", "Boat party", "DC-10 Circoloco", "Ushuaïa + Hï"],
    days: [
      {
        day: "Giorno 1 – Benvenuti a Ibiza",
        mood: "Warm-up",
        items: [
          { icon: MapPin, text: "Check-in a Playa d'en Bossa – epicentro della nightlife mondiale", time: "15:00" },
          { icon: Sun, text: "Spiaggia e primi drink al Bora Bora", time: "16:00" },
          { icon: Utensils, text: "Cena leggera prima della prima serata", time: "20:30" },
          { icon: Music, text: "Opening night: Club Chinois – atmosfera sofisticata, house & deep tech", time: "23:00" },
        ],
      },
      {
        day: "Giorno 2 – Pool Party + Hï Ibiza",
        mood: "Day-to-night",
        items: [
          { icon: Sun, text: "Recupero e spiaggia", time: "12:00" },
          { icon: Music, text: "Pool party a Ushuaïa nel pomeriggio – l'open air più famoso", time: "15:00" },
          { icon: Utensils, text: "Cena rapida a Playa d'en Bossa", time: "21:00" },
          { icon: Music, text: "Hï Ibiza – Afterlife by Tale of Us o Fisher nella Theatre", time: "23:30" },
        ],
      },
      {
        day: "Giorno 3 – Recupero + Pacha",
        mood: "Il mito",
        items: [
          { icon: Sun, text: "Mattina relax a Talamanca – la spiaggia più vicina a Ibiza Town", time: "11:00" },
          { icon: Utensils, text: "Pranzo a Jul's – concept moderno nel centro", time: "13:30" },
          { icon: MapPin, text: "Pomeriggio libero: shopping Ibiza Town o Dalt Vila", time: "16:00" },
          { icon: Utensils, text: "Cena al porto", time: "21:00" },
          { icon: Music, text: "Pacha – il club più iconico, Solomun +1 o Music On", time: "00:00" },
        ],
      },
      {
        day: "Giorno 4 – Beach + Amnesia",
        mood: "Underground vibes",
        items: [
          { icon: Sun, text: "Giornata a Cala Comte – acque turchesi per ricaricare", time: "11:00" },
          { icon: Utensils, text: "Pranzo al chiringuito sulla spiaggia", time: "13:00" },
          { icon: MapPin, text: "Tramonto al Sunset Ashram con drink", time: "19:00" },
          { icon: Utensils, text: "Cena in zona San Rafael", time: "21:30" },
          { icon: Music, text: "Amnesia – Terrace per set all'aperto, Main Room per techno pura", time: "01:00" },
        ],
      },
      {
        day: "Giorno 5 – Boat Party + Serata",
        mood: "Day party on water",
        items: [
          { icon: Sun, text: "Mattina libera – colazione lenta", time: "11:00" },
          { icon: Ship, text: "Boat Party con DJ, open bar e bagno in mare aperto", time: "14:00" },
          { icon: Utensils, text: "Cena leggera dopo la boat party", time: "20:30" },
          { icon: Music, text: "Eden o Es Paradis a San Antonio – clubbing alternativo", time: "23:30" },
        ],
      },
      {
        day: "Giorno 6 – DC-10 Day",
        mood: "Il rito",
        items: [
          { icon: Sun, text: "Ses Salines – spiaggia e preparazione mentale", time: "11:00" },
          { icon: Utensils, text: "Pranzo al Sa Trinxa – il chiringuito cult", time: "13:00" },
          { icon: Music, text: "DC-10 Circoloco – il lunedì più iconico di Ibiza, techno/minimal puro", time: "16:00" },
          { icon: Moon, text: "After party o rientro all'alba", time: "04:00" },
        ],
      },
      {
        day: "Giorno 7 – Ultima Notte",
        mood: "Grand finale",
        items: [
          { icon: Sun, text: "Recupero totale, relax in piscina o spiaggia", time: "12:00" },
          { icon: Utensils, text: "Ultimo pranzo speciale – Cala Bonita o La Paloma", time: "14:00" },
          { icon: MapPin, text: "Tramonto da Cala d'Hort – ultima cartolina di Es Vedrà", time: "19:00" },
          { icon: Utensils, text: "Cena di chiusura", time: "21:30" },
          { icon: Music, text: "Grand finale: O Beach sunset o Ibiza Rocks pool party", time: "23:00" },
          { icon: Ship, text: "Partenza il giorno dopo", time: "—" },
        ],
      },
    ],
  },
];

function ItineraryCard({ itin, index }: { itin: typeof itineraries[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <AnimatedSection>
      <div className="bg-card/60 backdrop-blur-sm border border-border/30 rounded-2xl overflow-hidden hover:border-sunset-orange/20 transition-all duration-500">
        {/* Hero image */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img
            src={itin.image}
            alt={itin.title}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-3">
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${itin.badgeColor}`}>
                {itin.badge}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" /> {itin.duration}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Globe className="w-3 h-3" /> {itin.ideal}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">{itin.title}</h2>
            <p className="text-muted-foreground mt-1">{itin.subtitle}</p>
          </div>
        </div>

        {/* Highlights */}
        <div className="px-6 md:px-8 py-4 border-b border-border/20">
          <div className="flex flex-wrap gap-2">
            {itin.highlights.map((h, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-sunset-orange/10 text-sunset-orange">
                <Award className="w-3 h-3" /> {h}
              </span>
            ))}
          </div>
        </div>

        {/* Days - collapsible */}
        <div className="px-6 md:px-8 py-6">
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full flex items-center justify-between text-left mb-4 group"
          >
            <span className="text-sm font-display font-bold text-foreground/80 uppercase tracking-widest">
              Itinerario giorno per giorno
            </span>
            <span className="flex items-center gap-2 text-sm text-sunset-orange group-hover:text-sunset-gold transition-colors">
              {expanded ? "Chiudi" : "Espandi"}
              {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </span>
          </button>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="grid gap-4">
                  {itin.days.map((day, dIdx) => (
                    <div key={dIdx} className="bg-muted/20 rounded-xl p-5 md:p-6 border border-border/10">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-display font-bold text-sunset-gold">{day.day}</h3>
                        <span className="text-xs text-muted-foreground/60 italic">{day.mood}</span>
                      </div>
                      <div className="space-y-2.5">
                        {day.items.map((item, iIdx) => (
                          <div key={iIdx} className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-muted/30 transition-colors">
                            <span className="text-xs text-sunset-orange/80 font-mono w-12 shrink-0 mt-0.5">{item.time}</span>
                            <item.icon className="w-4 h-4 mt-0.5 text-sunset-orange shrink-0" />
                            <span className="text-sm text-foreground/80">{item.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!expanded && (
            <p className="text-sm text-muted-foreground/60 italic">
              {itin.days.length} giorni di itinerario dettagliato con orari, luoghi e consigli pratici
            </p>
          )}
        </div>

        {/* CTA */}
        <div className="px-6 md:px-8 pb-6">
          <div className="flex flex-wrap gap-3">
            <Link href="/crea-viaggio" className={cn(buttonVariants({ variant: "hero" }), "flex-1 sm:flex-none")}>
              <div className="w-8 h-8 rounded-full bg-[#EA580C] flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105 shrink-0">
                <ArrowRight className="w-3.5 h-3.5 text-white animate-arrow-slide" />
              </div>
              <span className="text-sm font-bold tracking-wide">
                Richiedi questo itinerario
              </span>
            </Link>
            
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

export default function ItinerariPage() {
  return (
    <>
      <section className="relative py-24 pt-32 overflow-hidden">
        <div className="absolute inset-0 bg-dark-section" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(253,126,5,0.1),transparent_70%)]" />

        <div className="container relative z-10">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card/60 backdrop-blur-md border border-border/30 text-xs font-medium text-sunset-orange mb-6">
              <MapPin className="w-3 h-3" /> Guide & Itinerari
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 tracking-tight">
              I migliori <span className="text-gradient-warm">itinerari</span> per la tua Ibiza
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Dalla nightlife sfrenata al relax assoluto: scopri i percorsi collaudati per vivere l'isola esattamente come vuoi tu.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {itineraries.map((itin, index) => (
              <ItineraryCard key={itin.id} itin={itin} index={index} />
            ))}
          </div>

          <AnimatedSection className="text-center max-w-2xl mx-auto bg-card/40 backdrop-blur-sm border border-border/30 rounded-2xl p-8 md:p-10">
            <h3 className="text-2xl font-display font-bold text-foreground mb-4">Non trovi l'itinerario perfetto per te?</h3>
            <p className="text-muted-foreground mb-8">
              Ogni viaggio è unico. Raccontami cosa cerchi, le tue date e il tuo budget: creerò un itinerario personalizzato al 100% per le tue esigenze.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contatti" className={cn(buttonVariants({ size: 'xl' }), "bg-background text-foreground hover:bg-background/90 shadow-elevated font-bold")}>
                Richiedi il tuo itinerario <ArrowRight className="w-5 h-5" />
              </Link>
              
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
