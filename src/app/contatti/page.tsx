"use client";
import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AnimatedSection from "@/components/AnimatedSection";
import { MessageCircle, Instagram, Send } from "lucide-react";
import { toast } from "sonner";

const zones = ["Playa d'en Bossa", "Ibiza Town", "San Antonio", "Santa Eulalia", "Indifferente"];
const styles = ["Relax", "Mix", "Party", "Luxury", "Avventura"];
const priorities = ["Alloggio", "Auto / trasporti", "Formentera", "Boat party", "Open bar", "Club / guest list", "Itinerario", "Ristoranti"];

export default function ContattiPage() {
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [privacy, setPrivacy] = useState(false);

  const togglePriority = (p: string) => {
    setSelectedPriorities((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!privacy) {
      toast.error("Accetta la privacy policy per continuare.");
      return;
    }
    toast.success("Richiesta inviata! Ti ricontatterò al più presto.");
  };

  return (
    <>
      {/* Hero */}
      <section className="py-28 md:py-36 bg-dark-section relative overflow-hidden">
        <div className="absolute top-0 left-1/3 w-80 h-80 bg-sunset-orange/5 rounded-full blur-[120px]" />
        <div className="container text-center relative z-10">
          <AnimatedSection>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
              Richiedi la tua <span className="text-gradient-warm">proposta personalizzata</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg mx-auto">
              Compila il form e riceverai una proposta su misura entro 24-48 ore.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Form */}
      <section className="py-24 bg-dark-alt">
        <div className="container max-w-2xl">
          <AnimatedSection>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome" className="text-foreground/80">Nome e cognome *</Label>
                  <Input id="nome" required placeholder="Mario Rossi" className="bg-card/40 border-border/30 focus:border-sunset-orange/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground/80">Email *</Label>
                  <Input id="email" type="email" required placeholder="mario@email.com" className="bg-card/40 border-border/30 focus:border-sunset-orange/50" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="whatsapp" className="text-foreground/80">WhatsApp *</Label>
                  <Input id="whatsapp" required placeholder="+39 333 1234567" className="bg-card/40 border-border/30 focus:border-sunset-orange/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="persone" className="text-foreground/80">Numero persone *</Label>
                  <Input id="persone" type="number" min="1" required placeholder="4" className="bg-card/40 border-border/30 focus:border-sunset-orange/50" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="data-dal" className="text-foreground/80">Data arrivo *</Label>
                  <Input id="data-dal" type="date" required className="bg-card/40 border-border/30 focus:border-sunset-orange/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="data-al" className="text-foreground/80">Data partenza *</Label>
                  <Input id="data-al" type="date" required className="bg-card/40 border-border/30 focus:border-sunset-orange/50" />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-foreground/80">Budget indicativo (per persona) *</Label>
                <Select required>
                  <SelectTrigger className="bg-card/40 border-border/30">
                    <SelectValue placeholder="Seleziona un range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="300-500">€300 – €500</SelectItem>
                    <SelectItem value="500-800">€500 – €800</SelectItem>
                    <SelectItem value="800-1200">€800 – €1.200</SelectItem>
                    <SelectItem value="1200-2000">€1.200 – €2.000</SelectItem>
                    <SelectItem value="2000+">€2.000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-foreground/80">Zona preferita</Label>
                <Select>
                  <SelectTrigger className="bg-card/40 border-border/30">
                    <SelectValue placeholder="Seleziona zona" />
                  </SelectTrigger>
                  <SelectContent>
                    {zones.map((z) => (
                      <SelectItem key={z} value={z}>{z}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-foreground/80">Stile di viaggio</Label>
                <Select>
                  <SelectTrigger className="bg-card/40 border-border/30">
                    <SelectValue placeholder="Seleziona stile" />
                  </SelectTrigger>
                  <SelectContent>
                    {styles.map((s) => (
                      <SelectItem key={s} value={s.toLowerCase()}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-foreground/80">Priorità (seleziona tutto ciò che ti interessa)</Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {priorities.map((p) => (
                    <label
                      key={p}
                      className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all text-sm ${
                        selectedPriorities.includes(p)
                          ? "border-sunset-orange/50 bg-sunset-orange/10"
                          : "border-border/30 hover:border-sunset-orange/20 bg-card/20"
                      }`}
                    >
                      <Checkbox
                        checked={selectedPriorities.includes(p)}
                        onCheckedChange={() => togglePriority(p)}
                      />
                      <span className="text-foreground/80">{p}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="richieste" className="text-foreground/80">Richieste particolari</Label>
                <Textarea id="richieste" rows={4} placeholder="Raccontami di più: esigenze, preferenze, domande..." className="bg-card/40 border-border/30 focus:border-sunset-orange/50" />
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <Checkbox
                  checked={privacy}
                  onCheckedChange={(checked) => setPrivacy(checked === true)}
                  className="mt-0.5"
                />
                <span className="text-sm text-muted-foreground">
                  Acconsento al trattamento dei miei dati personali come descritto nella Privacy Policy. *
                </span>
              </label>

              <Button type="submit" variant="hero" size="xl" className="w-full">
                <Send className="w-5 h-5" />
                Invia richiesta
              </Button>
            </form>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="mt-12 bg-card/40 backdrop-blur-sm rounded-2xl p-8 border border-border/20 text-center">
              <p className="text-sm font-display font-semibold text-muted-foreground mb-4 uppercase tracking-widest">Oppure</p>
              <div className="flex flex-wrap justify-center gap-4">
                
                <a href="https://instagram.com/allaboutibiza_ale" target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: 'outline-brand', size: 'lg' })}>
                    <Instagram className="w-5 h-5" /> Instagram
                  </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
