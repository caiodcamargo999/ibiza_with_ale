"use client";
import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  MapPin, X, ArrowRight, Music, Waves, UtensilsCrossed,
  Umbrella, Search, Ship, Award, Compass
} from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* ───────── data ───────── */

type Category =
  | "zone" | "club" | "beach" | "restaurant"
  | "beachclub" | "viewpoint" | "experience";

interface MapPoint {
  id: string;
  name: string;
  category: Category;
  lat: number;
  lng: number;
  description: string;
  tip?: string;
  image: string;
}

const categoryMeta: Record<Category, { label: string; icon: typeof MapPin; color: string; glow: string; hex: string }> = {
  zone:       { label: "Zone principali",       icon: Compass,           color: "text-sunset-gold",    glow: "bg-sunset-gold/20",    hex: "#FCA201" },
  club:       { label: "Discoteche",             icon: Music,             color: "text-sunset-red",     glow: "bg-sunset-red/20",     hex: "#FD4219" },
  beach:      { label: "Spiagge",                icon: Waves,             color: "text-sky-400",        glow: "bg-sky-400/20",        hex: "#38BDF8" },
  restaurant: { label: "Ristoranti consigliati", icon: UtensilsCrossed,   color: "text-sunset-orange",  glow: "bg-sunset-orange/20",  hex: "#FD7E05" },
  beachclub:  { label: "Beach club",             icon: Umbrella,          color: "text-sunset-purple",  glow: "bg-sunset-purple/20",  hex: "#C77CBF" },
  viewpoint:  { label: "Spot panoramici",        icon: Search,               color: "text-emerald-400",    glow: "bg-emerald-400/20",    hex: "#34D399" },
  experience: { label: "Esperienze",             icon: Ship,              color: "text-sunset-magenta", glow: "bg-sunset-magenta/20", hex: "#B72065" },
};

function createIcon(hex: string) {
  return L.divIcon({
    className: "",
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    html: `<div style="width:28px;height:28px;border-radius:50%;background:${hex}33;border:2px solid ${hex};display:flex;align-items:center;justify-content:center;box-shadow:0 0 12px ${hex}55;"><div style="width:10px;height:10px;border-radius:50%;background:${hex};"></div></div>`,
  });
}

const points: MapPoint[] = [
  // ZONES
  { id: "z1", name: "Ibiza Town (Eivissa)", category: "zone", lat: 38.9067, lng: 1.4206, description: "Cuore dell'isola: vita notturna, Dalt Vila, porto e ristoranti. Ideale per chi vuole essere nel centro di tutto.", tip: "Perfetta per coppie e nightlife lovers.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/ForbysIbizaTown_03.jpg/960px-ForbysIbizaTown_03.jpg" },
  { id: "z2", name: "Playa d'en Bossa", category: "zone", lat: 38.8808, lng: 1.4008, description: "La zona più famosa: spiaggia lunga, Ushuaïa, Hï Ibiza, beach bar. Energia pura dal mattino alla notte.", tip: "La scelta n.1 per gruppi di amici.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/PlayaDenBossaIbiza.jpg/960px-PlayaDenBossaIbiza.jpg" },
  { id: "z3", name: "San Antonio", category: "zone", lat: 38.9806, lng: 1.3006, description: "Tramonti leggendari al Café del Mar, vibe giovane e alternativa. Base perfetta per esplorare la costa ovest.", tip: "Ottima per budget smart e sunset.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Sant-Antoni-Bahia.JPG/960px-Sant-Antoni-Bahia.JPG" },
  { id: "z4", name: "Santa Eulalia", category: "zone", lat: 38.9847, lng: 1.5328, description: "Tranquilla, familiare, con un bel lungomare e ristoranti autentici. Perfetta per chi cerca relax.", tip: "Ideale per coppie e famiglie.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/DlointheBaleares.JPG/960px-DlointheBaleares.JPG" },
  { id: "z5", name: "San José", category: "zone", lat: 38.9222, lng: 1.3111, description: "Villaggio nell'entroterra circondato da spiagge spettacolari come Cala Comte e Cala Tarida.", tip: "Base strategica per le spiagge ovest.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/The_Center_of_San_Jose_Ibiza_19_may_2011_%281%29.JPG/960px-The_Center_of_San_Jose_Ibiza_19_may_2011_%281%29.JPG" },
  { id: "z6", name: "San Juan", category: "zone", lat: 39.0739, lng: 1.5125, description: "Il nord autentico: mercatini hippie, natura selvaggia e Benirrás. L'Ibiza più vera.", tip: "Per chi cerca autenticità.", image: "https://images.unsplash.com/photo-1569470128243-d343461b17b5?w=600&q=80" },

  // CLUBS
  { id: "c1", name: "Ushuaïa", category: "club", lat: 38.8830, lng: 1.4050, description: "Open-air club di fama mondiale. Pool party diurni con i migliori DJ del pianeta.", image: "/images/ushuaia.jpg" },
  { id: "c2", name: "Hï Ibiza", category: "club", lat: 38.8820, lng: 1.4030, description: "Mega-club all'avanguardia, sound system pazzesco. Theatre e Club room per due experiences diverse.", image: "/images/hi_ibiza.jpg" },
  { id: "c3", name: "Pacha", category: "club", lat: 38.9120, lng: 1.4290, description: "La leggenda di Ibiza dal 1973. Eleganza, house music e le iconiche ciliegie rosse.", image: "/images/pacha.jpg" },
  { id: "c4", name: "Amnesia", category: "club", lat: 38.9500, lng: 1.3650, description: "Tempio della musica elettronica. Main Room epica e Terrace per set più intimi.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Amnesia_ibiza.jpeg/960px-Amnesia_ibiza.jpeg" },
  { id: "c5", name: "DC-10", category: "club", lat: 38.8680, lng: 1.3900, description: "Underground e autentico. Circoloco il lunedì è un rito. Per chi ama la techno vera.", image: "/images/dc10.jpg" },
  { id: "c6", name: "Club Chinois", category: "club", lat: 38.9480, lng: 1.3680, description: "Nuovo club elegante con residenze top e atmosfera sofisticata.", image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=600&q=80" },
  { id: "c7", name: "O Beach", category: "club", lat: 38.9810, lng: 1.3020, description: "Day club a San Antonio con show, pool party e atmosfera festosa.", image: "/images/obeach.jpg" },
  { id: "c8", name: "Ibiza Rocks", category: "club", lat: 38.9820, lng: 1.3040, description: "Hotel-club con pool party live. Vibe giovane, concerti e DJ set in piscina.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Ibiza_Rocks_Hotel_2019.jpg/960px-Ibiza_Rocks_Hotel_2019.jpg" },
  { id: "c9", name: "Es Paradis", category: "club", lat: 38.9800, lng: 1.2990, description: "Club storico con architettura unica e le famose water party.", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80" },
  { id: "c10", name: "Eden", category: "club", lat: 38.9790, lng: 1.2970, description: "Rinato con nuova energia: techno, house e lineup internazionali a San Antonio.", image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=600&q=80" },
  { id: "c11", name: "UNVRS", category: "club", lat: 38.9576, lng: 1.3986, description: "Il primo hyperclub al mondo, nato sulle ceneri dello storico Privilege. Produzioni monumentali e sound system rivoluzionario.", image: "/images/cilex_in_unvrs.jpg" },

  // BEACHES
  { id: "b1", name: "Cala Comte", category: "beach", lat: 38.9601, lng: 1.2231, description: "Acqua cristallina turchese e tramonti da cartolina. La spiaggia più fotografata di Ibiza.", tip: "Arriva presto in alta stagione.", image: "https://images.unsplash.com/photo-1548118086-651ee371df7e?w=600&q=80" },
  { id: "b2", name: "Cala Bassa", category: "beach", lat: 38.9720, lng: 1.2450, description: "Spiaggia ampia, acque calme, chiringuito e vibe rilassata. Perfetta per famiglie e gruppi.", tip: "Raggiungibile anche in barca da San Antonio.", image: "https://images.unsplash.com/photo-1533604100523-9993356e9c4c?w=600&q=80" },
  { id: "b3", name: "Cala Tarida", category: "beach", lat: 38.9380, lng: 1.2280, description: "Grande, sabbiosa, con opzioni di ristoranti sulla spiaggia. Tramonto spettacolare.", tip: "Buona alternativa a Cala Comte.", image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=80" },
  { id: "b4", name: "Cala Salada", category: "beach", lat: 38.9950, lng: 1.2550, description: "Piccola baia nascosta tra le rocce con acqua trasparente. Atmosfera intima e selvaggia.", tip: "Parcheggio limitato: vai presto o in barca.", image: "https://images.unsplash.com/photo-1468413253725-0d5181091126?w=600&q=80" },
  { id: "b5", name: "Cala Benirrás", category: "beach", lat: 39.0800, lng: 1.4400, description: "La spiaggia dei tamburi al tramonto. Ogni domenica, rituale hippie con percussioni.", tip: "La domenica sera è un must.", image: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=600&q=80" },
  { id: "b6", name: "Cala d'Hort", category: "beach", lat: 38.8950, lng: 1.2380, description: "Vista diretta su Es Vedrà. Paesaggio mistico e uno dei panorami più iconici.", tip: "Prenota al ristorante per l'ora del tramonto.", image: "https://images.unsplash.com/photo-1627914713840-0255b1f9b3dd?w=600&q=80" },
  { id: "b7", name: "Ses Salines", category: "beach", lat: 38.8560, lng: 1.3950, description: "Lunga spiaggia dorata tra le saline e il mare. Beach bar trendy, vibe fashion.", tip: "Sa Trinxa è il chiringuito cult.", image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=600&q=80" },
  { id: "b8", name: "Talamanca", category: "beach", lat: 38.9150, lng: 1.4350, description: "Vicina a Ibiza Town, acque calme e ristoranti. Comoda per una giornata rilassata.", tip: "Perfetta per il giorno dopo la discoteca.", image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=600&q=80" },
  { id: "b9", name: "Cala Vadella", category: "beach", lat: 38.9190, lng: 1.2150, description: "Baia protetta con acqua turchese. Tranquilla, ideale per snorkeling e relax.", tip: "Ottima per famiglie.", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&q=80" },
  { id: "b10", name: "Cala Jondal", category: "beach", lat: 38.8700, lng: 1.3400, description: "Ciottoli e acque profonde. Sede di Blue Marlin. La spiaggia luxury di Ibiza.", tip: "Prenota il lettino al beach club.", image: "https://images.unsplash.com/photo-1437719417032-8799b0796b95?w=600&q=80" },

  // RESTAURANTS
  { id: "r1", name: "Casa Maca", category: "restaurant", lat: 38.9200, lng: 1.4100, description: "Terrazza panoramica con vista mozzafiato su Dalt Vila. Cucina mediterranea raffinata, atmosfera magica al tramonto.", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80" },
  { id: "r2", name: "Sa Capella", category: "restaurant", lat: 38.9650, lng: 1.3200, description: "Ristorante dentro una cappella del XVIII secolo. Esperienza unica: candele, storia e cucina eccellente.", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80" },
  { id: "r3", name: "La Paloma", category: "restaurant", lat: 39.0550, lng: 1.4800, description: "Nel cuore del nord, giardino incantato con cucina fresca e biologica. Prenotazione obbligatoria.", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80" },
  { id: "r4", name: "El Chiringuito", category: "restaurant", lat: 38.8580, lng: 1.4000, description: "Piedi nella sabbia a Es Cavallet. Pesce fresco e cocktail con vista mare aperto.", image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600&q=80" },
  { id: "r5", name: "Es Torrent", category: "restaurant", lat: 38.8850, lng: 1.3300, description: "Leggendario ristorante di pesce in una cala nascosta. Freschezza e semplicità al massimo livello.", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80" },
  { id: "r6", name: "Cala Bonita", category: "restaurant", lat: 39.0400, lng: 1.5700, description: "Sulla spiaggia nel nord, cucina curata e panorama da sogno. Perfetto per un pranzo speciale.", image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80" },
  { id: "r7", name: "Jul's Ibiza", category: "restaurant", lat: 38.9090, lng: 1.4250, description: "Concept moderno a Ibiza Town. Fusion creativa, cocktail bar e atmosfera contemporanea.", image: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=600&q=80" },
  { id: "r8", name: "Hostal La Torre", category: "restaurant", lat: 38.9900, lng: 1.2700, description: "Tramonto iconico con DJ set acustici. Cucina semplice ma il vero piatto è la vista.", image: "https://images.unsplash.com/photo-1520454974749-611b7248ffdb?w=600&q=80" },

  // BEACH CLUBS
  { id: "bc1", name: "Blue Marlin", category: "beachclub", lat: 38.8710, lng: 1.3420, description: "Il beach club più esclusivo di Ibiza. DJ internazionali, lettini premium e Champagne sulla spiaggia.", image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600&q=80" },
  { id: "bc2", name: "Nikki Beach", category: "beachclub", lat: 38.9050, lng: 1.3100, description: "Eleganza internazionale, brunch la domenica, pool e spiaggia. Stile Miami a Ibiza.", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80" },
  { id: "bc3", name: "Experimental Beach", category: "beachclub", lat: 38.8520, lng: 1.3900, description: "Nascosto alle saline: boho-chic, cocktail artigianali e tramonto con i piedi nella sabbia.", image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&q=80" },
  { id: "bc4", name: "Amante", category: "beachclub", lat: 38.9550, lng: 1.5600, description: "Incastonato in una scogliera a Sol d'en Serra. Cinema all'aperto, cena romantica e viste incredibili.", image: "https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?w=600&q=80" },
  { id: "bc5", name: "Cotton Beach Club", category: "beachclub", lat: 38.9370, lng: 1.2260, description: "A Cala Tarida, total white con piscina infinity. Elegante e rilassato, perfetto per il tramonto.", image: "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=600&q=80" },

  // VIEWPOINTS
  { id: "v1", name: "Es Vedrà Viewpoint", category: "viewpoint", lat: 38.8700, lng: 1.2200, description: "Vista sull'isolotto mistico di Es Vedrà. Energia unica, uno dei luoghi più fotografati del Mediterraneo.", image: "https://images.unsplash.com/photo-1627914713840-0255b1f9b3dd?w=600&q=80" },
  { id: "v2", name: "Las Puertas del Cielo", category: "viewpoint", lat: 38.9400, lng: 1.2800, description: "Le 'Porte del Cielo': installazione artistica su una scogliera. Panorama infinito al tramonto.", image: "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?w=600&q=80" },
  { id: "v3", name: "Dalt Vila Viewpoint", category: "viewpoint", lat: 38.9080, lng: 1.4210, description: "Dalla cima della città fortificata, vista a 360° sul porto, il mare e la costa. Patrimonio UNESCO.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Eivissa_port_2017.jpg/960px-Eivissa_port_2017.jpg" },
  { id: "v4", name: "Benirrás Sunset", category: "viewpoint", lat: 39.0810, lng: 1.4420, description: "Il tramonto dei tamburi: ogni domenica il sole cala con ritmo e magia. Esperienza imperdibile.", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80" },

  // EXPERIENCES
  { id: "e1", name: "Boat Party", category: "experience", lat: 38.9100, lng: 1.4350, description: "Feste in barca con DJ, open bar e bagno in mare aperto. Partenze dal porto di Ibiza Town.", image: "https://images.unsplash.com/photo-1565520651265-1148c3b277f4?w=600&q=80" },
  { id: "e2", name: "Formentera Ferry", category: "experience", lat: 38.9060, lng: 1.4300, description: "Traghetto per Formentera dal porto di Ibiza. 30 minuti per raggiungere spiagge caraibiche.", image: "https://images.unsplash.com/photo-1538356345686-3023e3bdf8e9?w=600&q=80" },
  { id: "e3", name: "Sunset Strip", category: "experience", lat: 38.9800, lng: 1.2900, description: "La costa ovest è il palcoscenico dei tramonti più belli. Café del Mar, Hostal La Torre, Cala Comte.", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80" },
];

/* ───────── component ───────── */
export default function IbizaMapSection() {
  const [activePoint, setActivePoint] = useState<MapPoint | null>(null);
  const [activeCategories, setActiveCategories] = useState<Set<Category>>(
    new Set(Object.keys(categoryMeta) as Category[])
  );
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.Marker[]>([]);

  const toggleCategory = (cat: Category) => {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const filteredPoints = useMemo(
    () => points.filter((p) => activeCategories.has(p.category)),
    [activeCategories]
  );

  const icons = useMemo(() => {
    const map: Record<Category, L.DivIcon> = {} as any;
    for (const [key, meta] of Object.entries(categoryMeta)) {
      map[key as Category] = createIcon(meta.hex);
    }
    return map;
  }, []);

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;
    const map = L.map(mapContainerRef.current, {
      center: [38.96, 1.38],
      zoom: 12,
      scrollWheelZoom: true,
      attributionControl: false,
    });
    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png").addTo(map);
    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update markers
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    // Clear old markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];
    // Add new markers
    filteredPoints.forEach((point) => {
      const marker = L.marker([point.lat, point.lng], { icon: icons[point.category] })
        .on("click", () => setActivePoint(point))
        .addTo(map);
      markersRef.current.push(marker);
    });
  }, [filteredPoints, icons]);

  // Fly to active point
  useEffect(() => {
    if (activePoint && mapRef.current) {
      mapRef.current.flyTo([activePoint.lat, activePoint.lng], 14, { duration: 0.8 });
    }
  }, [activePoint]);

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-dark-section" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(253,126,5,0.08),transparent_60%)]" />

      <div className="container relative z-10">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card/60 backdrop-blur-md border border-border/30 text-xs font-medium text-sunset-orange mb-6">
            <MapPin className="w-3 h-3" /> Guida interattiva
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
            La mappa di Ibiza <span className="text-gradient-warm">by Ale</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Una guida visiva per capire l'isola, le zone migliori e i luoghi più iconici.
          </p>
        </AnimatedSection>

        {/* Legend */}
        <AnimatedSection delay={0.1} className="mb-10">
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {(Object.entries(categoryMeta) as [Category, typeof categoryMeta[Category]][]).map(
              ([key, meta]) => {
                const Icon = meta.icon;
                const active = activeCategories.has(key);
                return (
                  <button
                    key={key}
                    onClick={() => toggleCategory(key)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium border transition-all duration-300 ${
                      active
                        ? `${meta.color} ${meta.glow} border-current/30`
                        : "text-muted-foreground/40 bg-card/30 border-border/20 opacity-50"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {meta.label}
                  </button>
                );
              }
            )}
          </div>
        </AnimatedSection>

        {/* Map + Detail panel */}
        <AnimatedSection delay={0.2}>
          <div className="relative w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">
            {/* Leaflet Map */}
            <div className="flex-1 rounded-2xl overflow-hidden border border-border/30 shadow-elevated" style={{ minHeight: 500 }}>
              <div ref={mapContainerRef} className="w-full h-full" style={{ minHeight: 500, background: "hsl(0 0% 6%)" }} />
            </div>

            {/* Detail panel */}
            <AnimatePresence mode="wait">
              {activePoint && (
                <motion.div
                  key={activePoint.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.25 }}
                  className="w-full lg:w-96 bg-card/95 backdrop-blur-xl rounded-2xl border border-border/40 overflow-hidden shadow-elevated shrink-0"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={activePoint.image}
                      alt={activePoint.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
                    <button
                      onClick={() => setActivePoint(null)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      {(() => {
                        const Icon = categoryMeta[activePoint.category].icon;
                        return <Icon className={`w-4 h-4 ${categoryMeta[activePoint.category].color}`} />;
                      })()}
                      <span className={`text-xs font-medium ${categoryMeta[activePoint.category].color}`}>
                        {categoryMeta[activePoint.category].label}
                      </span>
                    </div>
                    <h3 className="text-lg font-display font-bold text-foreground mb-3">
                      {activePoint.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {activePoint.description}
                    </p>
                    {activePoint.tip && (
                      <div className="flex items-start gap-2 p-3 rounded-lg bg-sunset-orange/10 border border-sunset-orange/20">
                        <Award className="w-4 h-4 text-sunset-gold mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-sunset-gold/90 leading-relaxed">{activePoint.tip}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </AnimatedSection>

        {/* How to use + CTA */}
        <AnimatedSection delay={0.3} className="mt-16 text-center">
          <div className="max-w-2xl mx-auto bg-card/40 backdrop-blur-sm rounded-2xl border border-border/30 p-8 md:p-10">
            <h3 className="text-2xl font-display font-bold mb-3 text-foreground">
              Come usare questa mappa
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Esplora le zone, i club, le spiagge e i ristoranti di Ibiza per capire com'è organizzata l'isola prima ancora di partire. Filtra per categoria, clicca sui punti e scopri i dettagli di ogni luogo.
            </p>
            <p className="text-foreground/80 font-display font-semibold text-lg mb-6">
              Vuoi organizzare tutto nel modo giusto?
            </p>
            <Button asChild variant="hero">
              <Link href="#" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event('open-typeform')); }}>
                <div className="w-9 h-9 rounded-full bg-[#EA580C] flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105 shrink-0">
                  <ArrowRight className="w-4 h-4 text-white animate-arrow-slide" />
                </div>
                <span className="text-sm font-bold tracking-wide">
                  Richiedi il tuo piano viaggio
                </span>
              </Link>
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

