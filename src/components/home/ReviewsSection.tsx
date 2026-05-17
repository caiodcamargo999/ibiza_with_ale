"use client";
import AnimatedSection from "@/components/AnimatedSection";
import { Award } from "lucide-react";

const reviews = [
  {
    name: "Marco R.",
    type: "Gruppo di 6 amici · Luglio 2024",
    text: "Alessandra ci ha organizzato tutto da zero: alloggio a Playa d'en Bossa, noleggio auto, boat party e tre serate nei club. Non abbiamo dovuto pensare a niente. Il piano che ci ha mandato era dettagliatissimo, con orari, consigli su dove mangiare e come spostarci. Torneremo sicuramente l'anno prossimo.",
  },
  {
    name: "Giulia & Davide",
    type: "Coppia · Agosto 2024",
    text: "Volevamo una vacanza romantica ma anche dinamica. Ale ci ha consigliato Santa Eulalia come base e poi ci ha organizzato un giorno a Formentera, una cena spettacolare al tramonto e una serata al Pacha. Tutto perfetto, senza stress. Il rapporto qualità-prezzo dell'alloggio era imbattibile.",
  },
  {
    name: "Luca D. & gruppo",
    type: "Gruppo di 10 · Giugno 2024",
    text: "Eravamo in dieci e trovare qualcosa di organizzato per tutti sembrava impossibile. Alessandra ha gestito due appartamenti vicini, le auto, le boat party e le serate. Zero problemi, tutto coordinato. È stata disponibilissima anche durante il viaggio quando avevamo dubbi dell'ultimo momento.",
  },
  {
    name: "Valentina P.",
    type: "Pacchetto completo · Settembre 2024",
    text: "Ho preso il pacchetto completo perché era la mia prima volta a Ibiza e non sapevo da dove partire. Ale mi ha mandato una proposta con tre opzioni di alloggio, un itinerario giorno per giorno e tutti i consigli pratici. Mi ha fatto risparmiare tempo e anche soldi, perché sapeva esattamente dove trovare le migliori offerte.",
  },
  {
    name: "Andrea & Co.",
    type: "Gruppo di 8 · Luglio 2024",
    text: "La cosa che mi ha colpito di più è stata la velocità: ho compilato il form il lunedì e il mercoledì avevo già una proposta completa con tre scenari diversi. Abbiamo scelto il secondo, confermato tutto in un giorno e siamo partiti tranquillissimi. L'organizzazione delle serate è stata impeccabile.",
  },
  {
    name: "Francesca M.",
    type: "Viaggio breve 4 giorni · Agosto 2024",
    text: "Avevo solo quattro giorni e volevo sfruttarli al massimo. Ale ha costruito un piano compatto ma pieno: spiagge al mattino, ristoranti locali a pranzo, beach club nel pomeriggio e club la sera. Ogni giorno era diverso e non ho perso un minuto. I consigli sui ristoranti erano oro puro.",
  },
  {
    name: "Simone T.",
    type: "Solo traveler · Giugno 2024",
    text: "Viaggiavo da solo e non sapevo bene come muovermi. Alessandra mi ha consigliato la zona giusta, mi ha organizzato la boat party e mi ha dato dritte su spiagge e locali dove socializzare. Non mi sono sentito mai perso. Avere un punto di riferimento sull'isola ha cambiato tutto.",
  },
  {
    name: "Elena & Chiara",
    type: "Viaggio tra amiche · Luglio 2024",
    text: "Cercavamo qualcuno che conoscesse davvero Ibiza, non le solite guide turistiche. Ale ci ha consigliato spiagge che non avremmo mai trovato, un beach club incredibile e ci ha organizzato la guest list per due serate top. Professionale e alla mano allo stesso tempo.",
  },
  {
    name: "Riccardo B.",
    type: "Viaggio lungo 10 giorni · Agosto 2024",
    text: "Dieci giorni a Ibiza richiedevano un'organizzazione seria per non sprecare nulla. Alessandra ha costruito un programma equilibrato: giorni di relax, giorni più intensi, Formentera nel mezzo. L'alloggio che ci ha trovato era perfetto per la posizione. Un servizio che vale ogni euro.",
  },
  {
    name: "Sofia & gruppo",
    type: "Addio al nubilato · Settembre 2024",
    text: "Dovevo organizzare un addio al nubilato per 12 persone. Un incubo logistico. Ale ha gestito tutto: due appartamenti, una boat party privata, una cena organizzata e due serate con guest list. La festeggiata era felicissima. Non sarei mai riuscita a fare tutto da sola.",
  },
  {
    name: "Tommaso V.",
    type: "Pacchetto esperienze · Luglio 2024",
    text: "Non avevo bisogno dell'alloggio perché l'avevo già. Ho chiesto solo le esperienze: boat party, Formentera e nightlife. Ale mi ha organizzato tre esperienze perfette, con indicazioni precise su orari, cosa portare e come arrivarci. Veloce, precisa, affidabile.",
  },
  {
    name: "Martina & Paolo",
    type: "Coppia · Agosto 2024",
    text: "Avevamo un budget definito e Ale è riuscita a costruire un piano perfetto senza sforare. Ci ha trovato un appartamento stupendo vicino al mare, ci ha consigliato tre ristoranti che sono diventati i nostri preferiti e ci ha organizzato Formentera in giornata. Tutto senza intoppi.",
  },
  {
    name: "Lorenzo C.",
    type: "Gruppo misto · Giugno 2024",
    text: "Il nostro gruppo era misto: alcuni volevano party, altri relax. Ale ha trovato il compromesso perfetto con un alloggio centrale e un programma vario. La sua conoscenza dell'isola si vede: sapeva esattamente cosa proporci e quando. Risultato? Tutti contenti, nessuno escluso.",
  },
  {
    name: "Giorgia N.",
    type: "Prima volta a Ibiza · Luglio 2024",
    text: "Era la prima volta per tutto il gruppo e avevamo mille domande. Ale ha risposto a tutto con pazienza e competenza. Il piano che ci ha preparato era chiaro, dettagliato e realistico. Ci siamo sentiti seguiti dal primo messaggio fino all'ultimo giorno. Esperienza che consiglio a chiunque.",
  },
  {
    name: "Federico & amici",
    type: "Gruppo di 5 · Settembre 2024",
    text: "Abbiamo contattato Ale a tre settimane dalla partenza, pensando fosse troppo tardi. Invece è riuscita a organizzarci tutto: alloggio, auto, due serate e una giornata a Formentera. La sua rete di contatti sull'isola fa davvero la differenza. Professionista seria, la consiglio senza dubbi.",
  },
];

export default function ReviewsSection() {
  return (
    <section className="py-24 bg-dark-section relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-sunset opacity-20" />
      <div className="absolute top-1/3 left-0 w-64 h-64 bg-sunset-gold/5 rounded-full blur-[120px]" />
      
      <div className="container relative z-10">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Cosa dicono
            <span className="text-gradient-warm ml-2">di me</span>
          </h2>
          <p className="text-muted-foreground mb-16 text-lg">
            Recensioni reali di chi ha organizzato Ibiza con il mio supporto.
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <AnimatedSection key={r.name} delay={i * 0.03}>
              <div className="group bg-card/40 backdrop-blur-sm rounded-2xl p-6 border border-border/20 hover:border-sunset-orange/15 transition-all duration-500 h-full flex flex-col">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Award key={j} className="w-3.5 h-3.5 fill-sunset-gold text-sunset-gold" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed flex-1">"{r.text}"</p>
                <div className="border-t border-border/20 pt-4">
                  <p className="text-sm font-display font-semibold text-foreground">{r.name}</p>
                  <p className="text-xs text-muted-foreground/60">{r.type}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

