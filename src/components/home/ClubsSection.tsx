"use client";
import AnimatedSection from "@/components/AnimatedSection";
import Image from "next/image";

const clubs = [
  {
    name: "Ushuaïa Ibiza",
    description: "La venue open-air più famosa al mondo, celebre per i suoi party diurni in stile festival e produzioni maestose.",
    logo: "/images/clubs/ushuaia.png",
  },
  {
    name: "Hï Ibiza",
    description: "Il club tecnologicamente più avanzato al mondo, eletto numero 1 globale per la sua esperienza immersiva.",
    logo: "/images/clubs/hi_ibiza.png",
  },
  {
    name: "Pacha",
    description: "Il club più antico e glamour dell'isola, un'istituzione leggendaria che ha fatto la storia della musica house.",
    logo: "/images/clubs/pacha.png",
  },
  {
    name: "Amnesia",
    description: "Il tempio dell'elettronica, celebre per la sua indimenticabile terrazza e le feste storiche di Ibiza.",
    logo: "/images/clubs/amnesia.png",
  },
  {
    name: "DC-10",
    description: "Il club underground per eccellenza, situato vicino all'aeroporto, famoso per i suoi party senza compromessi.",
    logo: "/images/clubs/dc_10.png",
  },
  {
    name: "[UNVRS]",
    description: "Il nuovissimo hyperclub del gruppo Ushuaïa che rivoluzionerà il mondo della notte a Ibiza.",
    logo: "/images/clubs/unvrs.png",
  },
  {
    name: "Lío Ibiza",
    description: "Una spettacolare esperienza ibrida che unisce cabaret di altissimo livello, ristorazione esclusiva e clubbing.",
    logo: "/images/clubs/lio.png",
  },
  {
    name: "Tantra Ibiza",
    description: "Il pre-party bar più famoso di Playa d'en Bossa, punto di ritrovo essenziale prima di entrare nei superclub.",
    logo: "/images/clubs/tantra_club.png",
  },
  {
    name: "Swag Ibiza",
    description: "L'unico club a Ibiza dedicato interamente alla musica urban, hip-hop e reggaeton nel cuore di Playa d'en Bossa.",
    logo: "/images/clubs/swag.png",
  },
];

export default function ClubsSection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container relative z-10">
        <AnimatedSection>
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
              I Migliori <span className="text-primary">Club</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl text-lg">
              Collaboriamo direttamente con le strutture più esclusive dell'isola. In base allo stile della tua vacanza, ti garantiremo l'accesso ai club che hanno reso Ibiza la capitale mondiale del divertimento.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
          {clubs.map((club, i) => (
            <AnimatedSection key={club.name} delay={i * 0.1}>
              <div className="group flex flex-col items-center text-center p-6 rounded-2xl bg-card/20 border border-border/10 hover:border-primary/30 transition-all duration-300">
                <div className="h-20 w-32 relative mb-6 transition-transform duration-500 group-hover:scale-105 flex items-center justify-center">
                  {/* Using standard img to avoid Next.js Image optimization issues with local files during dev if they aren't configured, but using generic sizing */}
                  <Image fill sizes="100vw"
                    src={club.logo}
                    alt={`${club.name} Logo`}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <h3 className="text-lg font-display font-bold text-foreground mb-2">{club.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{club.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
