"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import { ArrowRight, MessageCircle, AlertTriangle, XCircle, CheckCircle } from "lucide-react";

const errors = [
  {
    title: "Scegliere l'alloggio nella zona sbagliata",
    problem: "Molti prenotano l'alloggio basandosi solo sul prezzo, senza considerare la posizione. Risultato: ore perse in taxi, costi extra e lontananza dai luoghi che contano. San Antonio è perfetta per chi vuole tramonto e beach club, ma scomoda per chi vuole andare ogni sera a Hï o Ushuaïa. Playa d'en Bossa è strategica per la nightlife, ma meno adatta a chi cerca tranquillità.",
    tip: "La zona va scelta in base a cosa vuoi fare, non solo al prezzo. Ogni zona di Ibiza ha una sua identità e condiziona l'intera vacanza.",
  },
  {
    title: "Prenotare l'auto troppo tardi",
    problem: "In alta stagione (luglio-agosto) le auto a noleggio finiscono settimane prima. Chi prenota all'ultimo paga il doppio o il triplo — oppure non trova disponibilità. Lo stesso vale per gli scooter. Senza un mezzo proprio, spostarsi a Ibiza diventa costoso e limitante.",
    tip: "Prenota almeno 4–6 settimane prima della partenza. Confronta i prezzi su più piattaforme e valuta l'assicurazione completa.",
  },
  {
    title: "Sottovalutare i costi della nightlife",
    problem: "Un ingresso in un club può costare 30–70€. Un drink 15–20€. Tre serate nei club principali possono costare facilmente 200–400€ a persona. Chi non calcola questo budget in anticipo si trova in difficoltà durante il viaggio.",
    tip: "Prevedi un budget dedicato alla nightlife. Le guest list e gli open bar pre-party sono strumenti concreti per ridurre i costi senza rinunciare all'esperienza.",
  },
  {
    title: "Non usare le guest list",
    problem: "Le guest list permettono di entrare gratis o a prezzo ridotto nella maggior parte dei club. Molti viaggiatori non le conoscono o non sanno come accedervi, e finiscono per pagare il prezzo pieno all'ingresso.",
    tip: "Informati sulle guest list disponibili per le serate che ti interessano. Vanno prenotate in anticipo e spesso hanno orari di ingresso specifici.",
  },
  {
    title: "Pianificare tutto last minute",
    problem: "Ibiza in alta stagione è molto richiesta. Alloggi, auto, boat party, ristoranti e serate si riempiono con settimane di anticipo. Chi aspetta l'ultimo momento trova disponibilità limitata, prezzi gonfiati e meno scelta.",
    tip: "Inizia a pianificare almeno 6–8 settimane prima. Le esperienze più richieste (boat party, Formentera, beach club) vanno prenotate con anticipo.",
  },
  {
    title: "Ignorare Formentera",
    problem: "Molti viaggiatori non includono Formentera nel piano, pensando sia complicata da raggiungere o troppo costosa. In realtà bastano 30 minuti di traghetto e la giornata è un'esperienza indimenticabile: spiagge caraibiche, acque cristalline e un'atmosfera unica.",
    tip: "Dedicale almeno una giornata intera. Parti presto per sfruttare al meglio le ore di luce e noleggia uno scooter per esplorare l'isola.",
  },
  {
    title: "Non considerare gli spostamenti tra zone",
    problem: "Ibiza sembra piccola sulla mappa, ma le distanze in auto possono sorprendere — soprattutto di notte, quando i taxi sono pochi e costosi. Organizzare una cena a Santa Eulalia e una serata a Playa d'en Bossa senza un piano di trasporto è un errore frequente.",
    tip: "Pianifica le giornate tenendo conto delle distanze. Raggruppa le attività per zona e prevedi sempre come tornare di notte.",
  },
  {
    title: "Affidarsi solo a blog e guide generiche",
    problem: "Molte informazioni online su Ibiza sono vecchie, incomplete o scritte da chi non vive l'isola. Ristoranti chiusi, serate cambiate, spiagge difficili da raggiungere: le guide generiche non tengono conto dei cambiamenti stagionali e delle novità.",
    tip: "Affidati a chi conosce l'isola in tempo reale. Le informazioni aggiornate fanno la differenza tra una vacanza buona e una perfetta.",
  },
  {
    title: "Prenotare ristoranti senza informarsi",
    problem: "I ristoranti migliori di Ibiza richiedono prenotazione, soprattutto a cena. Arrivare senza prenotazione in un posto come Es Torrent o La Paloma significa quasi sempre non trovare posto. Al contrario, certi ristoranti sono sopravvalutati e costosi.",
    tip: "Chiedi consigli a chi conosce l'isola. Prenota con anticipo i ristoranti che ti interessano e valuta sempre il rapporto qualità-prezzo.",
  },
  {
    title: "Non portare contanti",
    problem: "Molti locali sulla spiaggia, chiringuiti e mercati accettano solo contanti. Anche alcuni taxi preferiscono il pagamento in contanti. Trovarsi senza cash in certe situazioni è scomodo.",
    tip: "Porta sempre una riserva di contanti per le spese minute. Nelle zone più turistiche i bancomat sono disponibili, ma è meglio non dipenderne.",
  },
];

export default function ErroriIbiza() {
  return (
    <>
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=1920&q=80" alt="Ibiza landscape" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/75 to-background" />
        </div>
        <div className="container relative z-10">
          <AnimatedSection>
            <p className="text-sm font-medium text-sunset-orange uppercase tracking-widest mb-4">Guida pratica</p>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-display font-black leading-[0.9] mb-6">
              Errori da evitare
              <br />
              <span className="text-gradient-warm">alla prima Ibiza</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Gli sbagli più comuni che rovinano la vacanza — e come evitarli con una pianificazione intelligente.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 bg-dark-section">
        <div className="container max-w-4xl">
          <div className="space-y-6">
            {errors.map((err, i) => (
              <AnimatedSection key={err.title} delay={i * 0.04}>
                <div className="bg-card/40 backdrop-blur-sm rounded-2xl p-8 border border-border/20 hover:border-sunset-red/20 transition-all duration-500">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-sunset-red/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <AlertTriangle className="w-4 h-4 text-sunset-red" />
                    </div>
                    <h3 className="text-lg font-display font-bold text-foreground">{err.title}</h3>
                  </div>
                  <div className="ml-12 space-y-4">
                    <div className="flex gap-3">
                      <XCircle className="w-4 h-4 text-sunset-red/60 mt-1 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground leading-relaxed">{err.problem}</p>
                    </div>
                    <div className="flex gap-3 bg-sunset-gold/5 rounded-xl p-4">
                      <CheckCircle className="w-4 h-4 text-sunset-gold mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-sunset-gold/90 leading-relaxed font-medium">{err.tip}</p>
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
              Vuoi evitare tutti questi errori?
            </h2>
            <p className="text-primary-foreground/70 mb-10 max-w-lg mx-auto text-lg">
              Ti aiuto a organizzare Ibiza nel modo giusto, senza imprevisti e senza stress.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/crea-viaggio" className={buttonVariants({ variant: "hero" })}>
                <div className="w-9 h-9 rounded-full bg-[#EA580C] flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105 shrink-0">
                  <ArrowRight className="w-4 h-4 text-white animate-arrow-slide" />
                </div>
                <span className="text-sm font-bold tracking-wide">
                  Richiedi il tuo piano viaggio
                </span>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
