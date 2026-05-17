"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import { MessageCircle, ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "Quando conviene prenotare Ibiza?", a: "Prima prenoti, meglio è. Per l'alta stagione (giugno-settembre) consiglio di iniziare almeno 2-3 mesi prima. Alloggi e servizi si esauriscono rapidamente, soprattutto per i gruppi. Contattami appena hai le date, anche indicative." },
  { q: "Lavori anche con budget contenuti?", a: "Assolutamente sì. Il mio lavoro è ottimizzare il tuo budget, non gonfiarlo. Ti propongo soluzioni in linea con quanto vuoi spendere, trovando il miglior rapporto qualità-prezzo per ogni servizio." },
  { q: "Posso prenotare solo una parte (es. Formentera/boat party/club)?", a: "Certo. Puoi richiedere anche un singolo servizio, come un'escursione a Formentera, una boat party o assistenza per i club. Non sei obbligato a prendere il pacchetto completo." },
  { q: "I pacchetti sono personalizzati?", a: "Sempre. Non esiste un pacchetto uguale a un altro. Ogni proposta è costruita sulle tue date, budget, numero di persone e stile di viaggio." },
  { q: "Come gestisci pagamenti e conferme?", a: "Ti invio la proposta con le opzioni e i relativi costi. Una volta confermato, ti guido nel processo di pagamento e prenotazione. Tutto trasparente e tracciabile." },
  { q: "Cosa include l'assistenza?", a: "Ti supporto dalla fase di pianificazione fino alla fine del viaggio. Rispondo ai dubbi, ti mando aggiornamenti e sono disponibile per qualsiasi necessità durante il soggiorno." },
  { q: "Cosa succede se cambiamo date o numero di persone?", a: "Nessun problema, capita spesso. Aggiorno la proposta in base alle nuove informazioni. La flessibilità è parte del servizio, compatibilmente con le disponibilità." },
  { q: "Consigli anche ristoranti e spiagge?", a: "Sì, i consigli su ristoranti, spiagge, mercati e attività sono inclusi nel pacchetto come valore aggiunto. Li personalizzo in base al tuo stile." },
  { q: "Come scegli la zona migliore dove alloggiare?", a: "Dipende da cosa cerchi: Playa d'en Bossa per la vita notturna, Santa Eulalia per la tranquillità, Ibiza Town per il centro storico, San Antonio per i tramonti. Te la consiglio io in base al tuo profilo." },
  { q: "Posso contattarti su WhatsApp?", a: "Sì, puoi scrivermi direttamente su WhatsApp. È il canale più veloce per una prima chiacchierata informale. Trovi il link sul sito." },
  { q: "Che dati servono per iniziare?", a: "Le informazioni base: date del viaggio (anche indicative), numero di persone, budget orientativo e cosa ti interessa di più. Tutto il resto lo vediamo insieme." },
  { q: "Quanto tempo ci vuole per ricevere una proposta?", a: "In genere 24-48 ore dal form compilato. Dipende dalla complessità della richiesta, ma cerco di essere sempre rapida e puntuale." },
];

export default function FAQPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-28 md:py-36 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1520454974749-611b7248ffdb?w=1920&q=80" alt="Ibiza beach" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>
        <div className="container text-center relative z-10">
          <AnimatedSection>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
              <span className="text-gradient-sunset">Domande frequenti</span>
            </h1>
            <p className="text-lg text-muted-foreground">Tutto quello che vuoi sapere, in un solo posto.</p>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-dark-alt">
        <div className="container max-w-3xl">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AnimatedSection key={i} delay={i * 0.03}>
                <AccordionItem value={`faq-${i}`} className="bg-card/40 backdrop-blur-sm rounded-xl border border-border/20 px-6 hover:border-sunset-orange/15 transition-colors">
                  <AccordionTrigger className="text-left font-display font-semibold text-sm hover:no-underline py-5">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground pb-5 leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              </AnimatedSection>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        <div className="container relative z-10 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-6">Hai altre domande?</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contatti" className={cn(buttonVariants({ size: 'xl' }), "bg-background text-foreground hover:bg-background/90 shadow-elevated font-bold")}>
                  Richiedi il tuo piano viaggio <ArrowRight className="w-5 h-5" />
                </Link>
              
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
