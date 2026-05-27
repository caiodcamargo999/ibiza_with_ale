"use client";
import AnimatedSection from "@/components/AnimatedSection";
import { StarFilledIcon } from "@radix-ui/react-icons";

const reviews = [
  {
    name: "Marco Rossi",
    initial: "M",
    color: "bg-blue-500",
    date: "1 mese fa",
    text: "Esperienza fantastica con Cilex Ibiza. Hanno organizzato tutto alla perfezione: dall'appartamento a Playa d'en Bossa, ai biglietti per l'Ushuaia, fino al noleggio auto. Professionalità e disponibilità al top!",
  },
  {
    name: "Giulia Bianchi",
    initial: "G",
    color: "bg-green-500",
    date: "2 mesi fa",
    text: "Cilex Ibiza ci ha salvato la vacanza. Eravamo un gruppo di 10 persone e organizzare era impossibile. Si sono occupati di tutto, incluse le guest list per i migliori club. Rapporto qualità-prezzo eccellente.",
  },
  {
    name: "Luca De Santis",
    initial: "L",
    color: "bg-purple-500",
    date: "3 mesi fa",
    text: "La migliore agenzia per organizzare una vacanza a Ibiza. Grazie a loro abbiamo scoperto calette segrete e cenato in ristoranti spettacolari. L'assistenza in loco è stata fondamentale.",
  },
  {
    name: "Valentina P.",
    initial: "V",
    color: "bg-pink-500",
    date: "4 mesi fa",
    text: "Servizio impeccabile. Avevo richiesto un pacchetto completo e hanno superato le aspettative. Super consigliato per chi vuole vivere l'isola senza stress e nei migliori club.",
  },
  {
    name: "Andrea Esposito",
    initial: "A",
    color: "bg-yellow-500",
    date: "5 mesi fa",
    text: "Organizzazione delle serate perfetta. Abbiamo fatto boat party, Pacha e Hi Ibiza senza dover fare code o preoccuparci di nulla. Staff super cordiale e preparato.",
  },
  {
    name: "Francesca Martini",
    initial: "F",
    color: "bg-teal-500",
    date: "6 mesi fa",
    text: "Un team di veri professionisti. Hanno costruito un itinerario su misura per le nostre esigenze, bilanciando relax in spiaggia e nightlife sfrenata. Torneremo sicuramente con Cilex Ibiza.",
  }
];

export default function ReviewsSection() {
  return (
    <section className="py-24 bg-dark-section relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-primary/20 via-primary/50 to-primary/20" />
      <div className="absolute top-1/3 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[120px]" />
      
      <div className="container relative z-10">
        <AnimatedSection>
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 flex items-center justify-center gap-3">
              Recensioni <span className="text-primary">Google</span>
            </h2>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl font-bold text-foreground">5.0</span>
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <StarFilledIcon key={j} className="w-5 h-5 fill-[#FBBC04] text-[#FBBC04]" />
                ))}
              </div>
            </div>
            <p className="text-muted-foreground">
              Basato sulle recensioni ufficiali di Cilex Ibiza
            </p>
          </div>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <AnimatedSection key={r.name} delay={i * 0.1}>
              <div className="group bg-card/40 backdrop-blur-sm rounded-2xl p-6 border border-border/20 hover:border-primary/30 transition-all duration-500 h-full flex flex-col">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg ${r.color}`}>
                    {r.initial}
                  </div>
                  <div>
                    <p className="text-sm font-display font-semibold text-foreground">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{r.date}</p>
                  </div>
                  <div className="ml-auto">
                    <svg viewBox="0 0 24 24" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <StarFilledIcon key={j} className="w-3.5 h-3.5 fill-[#FBBC04] text-[#FBBC04]" />
                  ))}
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed flex-1">"{r.text}"</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

