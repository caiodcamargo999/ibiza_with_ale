"use client";
import AnimatedSection from "@/components/AnimatedSection";
import { CheckCircledIcon } from "@radix-ui/react-icons";

const audience = [
  "Gruppi e coppie che vogliono un piano chiaro e organizzato",
  "Chi vuole evitare errori di zona, alloggi e logistica",
  "Chi vuole sapere come muoversi davvero sull'isola",
  "Chi cerca un riferimento reale prima e durante il viaggio",
  "Chi vuole ottimizzare budget e tempo senza rinunciare a nulla",
  "Chi vuole un'organizzazione completa e affidabile",
];

export default function AudienceSection() {
  return (
    <section className="py-24 bg-dark-alt relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-sunset-purple/5 rounded-full blur-[120px]" />
      
      <div className="container max-w-4xl relative z-10">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Per chi vuole organizzare Ibiza
            <br />
            <span className="text-primary">nel modo giusto</span>
          </h2>
          <p className="text-muted-foreground mb-12 text-lg max-w-2xl">
            Questo servizio è pensato per chi vuole vivere Ibiza con consapevolezza, organizzazione e senza sorprese.
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 gap-4">
          {audience.map((item, i) => (
            <AnimatedSection key={i} delay={i * 0.07}>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-card/50 border border-border/30 backdrop-blur-sm hover:border-sunset-orange/20 transition-colors">
                <CheckCircledIcon className="w-5 h-5 mt-0.5 text-sunset-gold flex-shrink-0" />
                <p className="text-sm text-foreground/80">{item}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

