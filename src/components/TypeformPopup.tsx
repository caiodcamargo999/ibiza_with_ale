"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, Check, ChevronDown } from "lucide-react";
import { useFormStore } from "@/store/useFormStore";

interface Option {
  label: string;
  points?: number;
  descarte?: boolean;
}

interface Question {
  id: string;
  question: string;
  type: "choice" | "text";
  options?: Option[];
}

const questions: Question[] = [
  {
    id: "q1",
    question: "Avete già comprato il volo per Ibiza?",
    type: "choice",
    options: [
      { label: "Sì, già comprato", points: 30 },
      { label: "Abbiamo deciso di andare, manca solo comprare il volo", points: 20 },
      { label: "Stiamo ancora valutando quando andare", points: 5 },
      { label: "Sono solo curioso/a per ora", descarte: true },
    ]
  },
  {
    id: "q2",
    question: "In quale periodo pensate di andare a Ibiza?",
    type: "choice",
    options: [
      { label: "Luglio 2026", points: 20 },
      { label: "Agosto 2026", points: 20 },
      { label: "Maggio 2026", points: 15 },
      { label: "Giugno 2026", points: 15 },
      { label: "Settembre 2026", points: 15 },
      { label: "Ottobre 2026", points: 5 },
      { label: "Non abbiamo ancora deciso il mese esatto", points: 5 },
      { label: "Nel 2027 o dopo", descarte: true },
    ]
  },
  {
    id: "q3",
    question: "Quante persone siete nel gruppo?",
    type: "choice",
    options: [
      { label: "Solo io", descarte: true },
      { label: "Coppia, 2 persone", points: 5 },
      { label: "Da 3 a 5 persone", points: 10 },
      { label: "Da 6 a 10 persone", points: 20 },
      { label: "Più di 10 persone", points: 25 },
    ]
  },
  {
    id: "q4",
    question: "Che tipo di musica vi piace?",
    type: "choice",
    options: [
      { label: "Un mix di tutto", points: 15 },
      { label: "Non sappiamo, ci fidiamo di voi", points: 15 },
      { label: "Techno / Underground", points: 10 },
      { label: "House / Deep House", points: 10 },
      { label: "Reggaeton / Latin", points: 10 },
      { label: "Hip-Hop / Urban", points: 10 },
    ]
  },
  {
    id: "q5",
    question: "Avete già delle feste specifiche in mente?",
    type: "text",
  },
  {
    id: "q6",
    question: "Quante notti pensate di uscire?",
    type: "choice",
    options: [
      { label: "Tutte le notti", points: 20 },
      { label: "3 a 4 notti", points: 15 },
      { label: "Decideremo lì", points: 10 },
      { label: "1 a 2 notti", points: 5 },
    ]
  },
  {
    id: "q7",
    question: "Siete interessati a una festa in yacht con open bar?",
    type: "text",
  },
  {
    id: "q8",
    question: "Avete bisogno di auto, moto o trasporto?",
    type: "choice",
    options: [
      { label: "Auto premium / supercar", points: 20 },
      { label: "Auto", points: 10 },
      { label: "Scooter", points: 5 },
      { label: "No, taxi o transfer", points: 0 },
    ]
  },
  {
    id: "q9",
    question: "Che tipo di alloggio cercate?",
    type: "choice",
    options: [
      { label: "Villa con piscina", points: 25 },
      { label: "Casa con piscina", points: 15 },
      { label: "Siamo aperti a suggerimenti di alloggio", points: 10 },
      { label: "Appartamento", points: 8 },
      { label: "Camera in hotel", points: 5 },
    ]
  },
  {
    id: "q10",
    question: "Qual è il budget indicativo a persona?",
    type: "choice",
    options: [
      { label: "Più di €10.000", points: 35 },
      { label: "€6.000 a €10.000", points: 30 },
      { label: "€3.000 a €6.000", points: 20 },
      { label: "€1.500 a €3.000", points: 10 },
      { label: "€1.000 a €1.500", points: 5 },
      { label: "Fino a €500", descarte: true },
    ]
  },
  {
    id: "q11",
    question: "Quando potete fare una consulenza gratuita di 20 minuti?",
    type: "choice",
    options: [
      { label: "Oggi o domani", points: 25 },
      { label: "Questa settimana", points: 15 },
      { label: "La prossima settimana", points: 8 },
      { label: "Preferisco solo messaggi", points: -5 },
    ]
  },
  {
    id: "contact",
    question: "Ultimo step: come possiamo contattarti?",
    type: "text", // We'll handle this specially in the component
  }
];

const WHATSAPP_NUMBER = "393791315038";

const countries = [
  { code: "+39", flag: "🇮🇹", name: "Italia" },
  { code: "+34", flag: "🇪🇸", name: "España" },
  { code: "+44", flag: "🇬🇧", name: "UK" },
  { code: "+49", flag: "🇩🇪", name: "Deutschland" },
  { code: "+33", flag: "🇫🇷", name: "France" },
  { code: "+41", flag: "🇨🇭", name: "Suisse" },
  { code: "+43", flag: "🇦🇹", name: "Österreich" },
  { code: "+31", flag: "🇳🇱", name: "Nederland" },
  { code: "+32", flag: "🇧🇪", name: "België" },
  { code: "+351", flag: "🇵🇹", name: "Portugal" },
  { code: "+55", flag: "🇧🇷", name: "Brasil" },
  { code: "+1", flag: "🇺🇸", name: "USA" },
];

export default function TypeformPopup() {
  const { isOpen, closeForm } = useFormStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [score, setScore] = useState(0);
  const [isDescarte, setIsDescarte] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [contactData, setContactData] = useState({ name: "", phone: "" });
  const [selectedCountryCode, setSelectedCountryCode] = useState("+39");
  const [phoneInput, setPhoneInput] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      // Reset form when closed
      setTimeout(() => {
        setCurrentStep(0);
        setAnswers({});
        setScore(0);
        setIsDescarte(false);
        setTextInput("");
        setContactData({ name: "", phone: "" });
        setSelectedCountryCode("+39");
        setPhoneInput("");
        setIsDropdownOpen(false);
        setIsSubmitting(false);
      }, 300);
    }
    
    const handleOpen = () => useFormStore.getState().openForm();
    window.addEventListener('open-typeform', handleOpen);
    
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener('open-typeform', handleOpen);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOptionSelect = (option: Option) => {
    if (option.descarte) {
      setIsDescarte(true);
      return;
    }

    setAnswers(prev => ({ ...prev, [questions[currentStep].id]: option.label }));
    setScore(prev => prev + (option.points || 0));
    nextStep();
  };

  const handleTextSubmit = () => {
    setAnswers(prev => ({ ...prev, [questions[currentStep].id]: textInput }));
    setTextInput("");
    nextStep();
  };

  const nextStep = async () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Combine code + phone
      const fullPhone = `${selectedCountryCode}${phoneInput}`;
      const updatedContact = { ...contactData, phone: fullPhone };
      
      // Submitting the form to Kommo (or server action)
      setIsSubmitting(true);
      try {
        await fetch('/api/kommo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answers, score, contact: updatedContact })
        });
      } catch (err) {
        console.error(err);
      } finally {
        setIsSubmitting(false);
        setCurrentStep(questions.length);
      }
    }
  };

  const sendWhatsApp = () => {
    const nome = contactData.name || "Cliente";
    
    // Customize text based on answers
    const volo = answers.q1 === "Sì, già comprato" 
      ? "Ho già prenotato i voli" 
      : (answers.q1 === "Abbiamo deciso di andare, manca solo comprare il volo" ? "Abbiamo già deciso di andare e ci manca solo prendere i voli" : "Stiamo ancora valutando le date dei voli");
      
    const periodo = answers.q2 ? `per ${answers.q2}` : "";
    
    const gruppo = answers.q3 === "Coppia, 2 persone"
      ? "saremo in coppia (2 persone)"
      : (answers.q3 ? `saremo un gruppo di ${answers.q3.toLowerCase()}` : "saremo da soli");
      
    const musica = answers.q4 ? `Ci piace la musica ${answers.q4.toLowerCase()}` : "";
    const feste = answers.q5 && answers.q5.trim() ? ` e abbiamo in mente feste come: "${answers.q5.trim()}"` : "";
    
    const notti = answers.q6 === "Tutte le notti"
      ? "Vorremmo fare serata tutte le notti"
      : (answers.q6 === "3 a 4 notti" ? "Pensiamo di uscire per 3 o 4 notti" : `Usciremo per ${answers.q6 ? answers.q6.toLowerCase() : "alcune notti"}`);
      
    const yacht = answers.q7 && answers.q7.trim() ? `\n• *Esperienze:* Riguardo al party in yacht: "${answers.q7.trim()}"` : "";
    
    const trasporto = answers.q8 === "Auto premium / supercar"
      ? "Avremo assolutamente bisogno di un'auto premium o supercar"
      : (answers.q8 === "Auto" ? "Avremo bisogno di noleggiare un'auto" : (answers.q8 === "Scooter" ? "Preferiremmo noleggiare uno scooter" : "Per i trasporti ci sposteremo in taxi o transfer"));
      
    const alloggio = answers.q9 === "Villa con piscina"
      ? "Cerchiamo una villa con piscina"
      : (answers.q9 === "Casa con piscina" ? "Cerchiamo una casa con piscina" : (answers.q9 === "Appartamento" ? "Cerchiamo un appartamento" : (answers.q9 === "Camera in hotel" ? "Cerchiamo una camera in hotel" : "Siamo aperti a suggerimenti per l'alloggio")));
      
    const budget = answers.q10 ? `Il nostro budget indicativo a persona è di ${answers.q10.toLowerCase()}` : "";
    
    const consulenza = answers.q11 ? `Per la consulenza gratuita di 20 minuti, sarei disponibile ${answers.q11.toLowerCase()}` : "";

    let message = `Ciao Alessandra! Sono *${nome}*.\n\n`;
    message += `Ho appena completato il questionario sul sito perché sto organizzando il mio viaggio a Ibiza ${periodo}! 🌴\n\n`;
    message += `Ecco un riepilogo della mia idea di viaggio:\n`;
    message += `• *Dettagli:* ${volo} e ${gruppo}.\n`;
    message += `• *Musica & Feste:* ${musica}${feste}.\n`;
    message += `• *Notti fuori:* ${notti}.\n`;
    message += `• *Alloggio & Budget:* ${alloggio}. ${budget}.\n`;
    message += `• *Trasporti:* ${trasporto}.${yacht}\n\n`;
    message += `📞 ${consulenza}.\n\n`;
    message += `Non vedo l'ora di ricevere la tua proposta personalizzata per vivere l'isola al massimo! ✨\n\n`;
    
    // Add MQLead status invisibly/subtly at the bottom
    message += `_(Lead Score: ${score} - ${score >= 120 ? 'HOT LEAD 🔥' : 'WARM LEAD'})_`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-xl">
      <button 
        onClick={closeForm}
        className="absolute top-6 right-6 p-2 bg-card border border-border/40 rounded-full text-muted-foreground hover:text-foreground hover:bg-card/80 transition-colors z-[101]"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="w-full max-w-xl px-6 relative h-full flex flex-col justify-center mx-auto">
        
        {/* Progress bar */}
        {!isDescarte && currentStep < questions.length && (
          <div className="absolute top-8 left-6 right-20 h-1.5 bg-card rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#EA580C] transition-all duration-500 ease-out"
              style={{ width: `${(currentStep / questions.length) * 100}%` }}
            />
          </div>
        )}

        <AnimatePresence mode="wait">
          {isDescarte ? (
            <motion.div
              key="descarte"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-foreground">
                Grazie per le tue risposte!
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-lg mx-auto">
                Per vivere la vera esperienza di Ibiza, contattami direttamente su WhatsApp per capire come posso aiutarti.
              </p>
              <a 
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#EA580C] hover:bg-[#c24100] text-white rounded-full font-bold transition-all hover:scale-105"
              >
                Contatta Alessandra su WhatsApp
              </a>
            </motion.div>
          ) : currentStep === questions.length ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-gradient-warm rounded-full flex items-center justify-center mx-auto mb-8 shadow-glow-orange">
                <Check className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-foreground">
                Profilo Completato!
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-lg mx-auto">
                Abbiamo raccolto tutte le informazioni per creare la tua proposta su misura per Ibiza.
              </p>
              <button 
                onClick={sendWhatsApp}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#EA580C] hover:bg-[#c24100] text-white rounded-full font-bold transition-all hover:scale-105"
              >
                Richiedi la tua Proposta su WhatsApp <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <div className="text-center mb-8">
                <p className="text-[#EA580C] font-semibold mb-2">
                  {currentStep === questions.length - 1 ? "Quasi finito!" : `Domanda ${currentStep + 1} di ${questions.length - 1}`}
                </p>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground leading-tight">
                  {questions[currentStep].question}
                </h2>
              </div>
              
              {questions[currentStep].id === "contact" ? (
                <div className="flex flex-col gap-4">
                  <div className="space-y-4">
                    <input
                      type="text"
                      required
                      placeholder="Il tuo nome"
                      value={contactData.name}
                      onChange={(e) => setContactData(p => ({ ...p, name: e.target.value }))}
                      className="w-full p-4 rounded-xl bg-card border border-border/30 focus:border-[#EA580C]/50 focus:outline-none focus:ring-1 focus:ring-[#EA580C]/50 text-foreground"
                    />
                    <div className="flex gap-2 relative">
                      {/* Dropdown container */}
                      <div className="relative shrink-0">
                        <button
                          type="button"
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          className="flex items-center gap-1.5 h-full px-3.5 rounded-xl bg-card border border-border/30 hover:border-[#EA580C]/30 text-foreground transition-all text-base font-medium"
                        >
                          <span>{countries.find(c => c.code === selectedCountryCode)?.flag}</span>
                          <span>{selectedCountryCode}</span>
                          <ChevronDown className="w-4 h-4 opacity-50 shrink-0" />
                        </button>
                        {isDropdownOpen && (
                          <div className="absolute left-0 top-full mt-2 w-48 max-h-60 overflow-y-auto rounded-xl bg-card border border-border/40 shadow-elevated z-50 p-1 flex flex-col scrollbar-thin">
                            {countries.map((c) => (
                              <button
                                key={c.code}
                                type="button"
                                onClick={() => {
                                  setSelectedCountryCode(c.code);
                                  setIsDropdownOpen(false);
                                }}
                                className="flex items-center gap-2 w-full px-3 py-2 text-left rounded-lg hover:bg-[#EA580C]/10 hover:text-foreground text-foreground/80 transition-colors text-sm"
                              >
                                <span className="text-base">{c.flag}</span>
                                <span className="font-medium text-foreground">{c.code}</span>
                                <span className="text-xs text-muted-foreground ml-auto">{c.name}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      <input
                        type="tel"
                        required
                        placeholder="Numero di WhatsApp"
                        value={phoneInput}
                        onChange={(e) => setPhoneInput(e.target.value.replace(/\D/g, ""))}
                        className="flex-1 p-4 rounded-xl bg-card border border-border/30 focus:border-[#EA580C]/50 focus:outline-none focus:ring-1 focus:ring-[#EA580C]/50 text-foreground"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && contactData.name && phoneInput) {
                            e.preventDefault();
                            nextStep();
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-center mt-4">
                    <button
                      onClick={nextStep}
                      disabled={!contactData.name || !phoneInput || isSubmitting}
                      className="inline-flex w-full items-center justify-center gap-2 px-6 py-4 bg-[#EA580C] disabled:bg-card disabled:text-muted-foreground disabled:cursor-not-allowed hover:bg-[#c24100] text-white rounded-full font-bold transition-all"
                    >
                      {isSubmitting ? "Invio in corso..." : "Invia e scopri la tua proposta"} <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ) : questions[currentStep].type === "choice" ? (
                <div className="flex flex-col gap-3">
                  {questions[currentStep].options?.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleOptionSelect(option)}
                      className="group flex items-center justify-between p-3.5 md:p-4 rounded-2xl bg-card border border-border/30 hover:border-[#EA580C]/50 hover:bg-[#EA580C]/10 transition-all text-left w-full"
                    >
                      <span className="text-sm md:text-base font-medium text-foreground/90 group-hover:text-foreground pr-4">
                        {option.label}
                      </span>
                      <div className="w-6 h-6 rounded-full border border-border/50 group-hover:border-[#EA580C] flex items-center justify-center bg-background/50 group-hover:bg-[#EA580C]/20 transition-colors">
                        <div className="w-2.5 h-2.5 rounded-full bg-transparent group-hover:bg-[#EA580C] transition-colors" />
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <textarea
                    autoFocus
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Scrivi la tua risposta qui..."
                    className="w-full min-h-[150px] p-5 rounded-2xl bg-card border border-border/30 focus:border-[#EA580C]/50 focus:outline-none focus:ring-1 focus:ring-[#EA580C]/50 text-foreground resize-none text-lg"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        if (textInput.trim()) handleTextSubmit();
                      }
                    }}
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={handleTextSubmit}
                      disabled={!textInput.trim()}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#EA580C] disabled:bg-card disabled:text-muted-foreground disabled:cursor-not-allowed hover:bg-[#c24100] text-white rounded-full font-bold transition-all"
                    >
                      Continua <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
