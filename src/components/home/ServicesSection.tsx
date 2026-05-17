"use client";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import { ArrowRight, ClipboardList, Home, Car, Compass, Music, Handshake } from "lucide-react";
import sunsetImg from "@/assets/ibiza-sunset.jpg";

const services = [
  {
    icon: ClipboardList,
    title: "Pianificazione completa personalizzata",
    desc: "Costruisco il tuo viaggio da zero partendo da date, composizione del gruppo, budget, zona e obiettivi. Non un pacchetto standard: un piano su misura che tiene conto di ogni variabile, dalla logistica alle esperienze, fino ai dettagli che fanno la differenza tra una vacanza buona e una perfetta.",
  },
  {
    icon: Home,
    title: "Selezione alloggi strategici",
    desc: "La scelta della zona a Ibiza è fondamentale: determina gli spostamenti, la vicinanza ai club, l'accesso alle spiagge e il tipo di esperienza che vivrai. Ti aiuto a individuare l'alloggio più strategico per il tuo gruppo, valutando posizione, budget, comodità e stile di viaggio.",
  },
  {
    icon: Car,
    title: "Trasporti e mobilità sull'isola",
    desc: "Auto, scooter, spostamenti tra zone: muoversi a Ibiza richiede pianificazione. Ti indico le soluzioni migliori in base a dove alloggi, quante persone siete e cosa volete fare, evitando sprechi di tempo e costi inutili. L'obiettivo è muoversi in modo intelligente.",
  },
  {
    icon: Compass,
    title: "Esperienze e giornate",
    desc: "Formentera, boat party, beach club, giornate organizzate con un filo logico. Non si tratta solo di prenotare, ma di costruire un programma che sfrutti al meglio ogni giorno sull'isola — tenendo conto di ritmi, distanze e gusti del gruppo.",
  },
  {
    icon: Music,
    title: "Nightlife planning",
    desc: "Ibiza è nightlife, ma scegliere le serate giuste non è scontato. Ti aiuto a orientarti tra club, eventi, line-up, guest list e accessi, selezionando le serate più adatte al tuo gruppo. Dove disponibile, gestisco liste e ingressi per semplificarti tutto.",
  },
  {
    icon: Handshake,
    title: "Collaborazioni locali",
    desc: "Collaboro direttamente con CILEX Ibiza e partner turistici locali dell'isola. Questo mi permette di offrirti informazioni aggiornate, accesso a servizi verificati e un livello di organizzazione che non trovi cercando online da solo.",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-24 bg-dark-section relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-sunset opacity-20" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-sunset-red/5 rounded-full blur-[150px]" />
      
      <div className="container relative z-10">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
            Cosa posso organizzare
            <br />
            <span className="text-gradient-warm">per il tuo viaggio</span>
          </h2>
          <p className="text-muted-foreground mb-16 text-lg max-w-2xl">
            Ogni servizio è pensato per integrarsi in un piano completo, oppure può essere richiesto singolarmente.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <AnimatedSection key={s.title} delay={i * 0.08}>
              <div className="group relative bg-card/40 backdrop-blur-sm rounded-2xl p-8 border border-border/20 hover:border-sunset-orange/20 transition-all duration-500 h-full">
                {/* Subtle gradient on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-card opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-gradient-warm flex items-center justify-center mb-5 shadow-glow-orange group-hover:shadow-glow-red transition-shadow duration-500">
                    <s.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-display font-bold mb-3 text-foreground">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">{s.desc}</p>
                  <Link href="/servizi" className="text-sm font-medium text-sunset-orange inline-flex items-center gap-1.5 hover:gap-2.5 transition-all group-hover:text-sunset-gold">
                    Scopri di più <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

