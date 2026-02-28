import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Package, Shirt, UtensilsCrossed, CalendarCheck,
  Stethoscope, Car, Scissors, GraduationCap, Dog, Wrench,
} from "lucide-react";

type Conversation = {
  sector: string;
  icon: typeof Package;
  messages: { from: "user" | "ai"; text: string }[];
};

const conversations: Conversation[] = [
  {
    sector: "Atacado",
    icon: Package,
    messages: [
      { from: "user", text: "Tem desconto em 50 caixas?" },
      { from: "ai", text: "Calculando... 🤖 Consigo 10% OFF! De R$ 500 por R$ 450. Fechamos?" },
      { from: "user", text: "Fechado!" },
      { from: "ai", text: "Pedido #4821 confirmado! Link de pagamento gerado. 🚀" },
    ],
  },
  {
    sector: "Moda / Varejo",
    icon: Shirt,
    messages: [
      { from: "user", text: "Tem essa camiseta em M?" },
      { from: "ai", text: "Temos! 👕 E combina com essa calça jogger. Quer ver o look?" },
      { from: "user", text: "Quero! Quanto fica os dois?" },
      { from: "ai", text: "Look completo R$ 189,90 (economia de R$ 40)! Envio o link? 🛒" },
    ],
  },
  {
    sector: "Restaurante",
    icon: UtensilsCrossed,
    messages: [
      { from: "user", text: "2 burgers artesanais, tira a cebola de um" },
      { from: "ai", text: "Anotado! 🍔 Adicionei batata frita por +R$ 5? Combo sai melhor!" },
      { from: "user", text: "Bota a batata sim" },
      { from: "ai", text: "Total: R$ 67,80. Entrega em 35min. Pix ou cartão? 🚴" },
    ],
  },
  {
    sector: "Clínica / Saúde",
    icon: Stethoscope,
    messages: [
      { from: "user", text: "Tem horário amanhã de manhã?" },
      { from: "ai", text: "Temos às 9h e 10:30h com a Dra. Marina. Qual prefere? 📋" },
      { from: "user", text: "10:30 por favor" },
      { from: "ai", text: "Agendado! ✅ Dra. Marina, amanhã 10:30h. Confirmação enviada!" },
    ],
  },
  {
    sector: "Pet Shop",
    icon: Dog,
    messages: [
      { from: "user", text: "Preciso de ração Golden pra cachorro grande" },
      { from: "ai", text: "Temos Golden 15kg por R$ 149,90! 🐕 Quer adicionar petisco?" },
      { from: "user", text: "Pode colocar um pacote de ossinho" },
      { from: "ai", text: "Perfeito! Total R$ 168,80. Entrega amanhã até 12h. Confirmo? 🐾" },
    ],
  },
  {
    sector: "Oficina",
    icon: Wrench,
    messages: [
      { from: "user", text: "Meu carro tá fazendo barulho na roda" },
      { from: "ai", text: "Pode ser rolamento ou pastilha. 🔧 Tem horário hoje às 14h. Trago?" },
      { from: "user", text: "Pode agendar!" },
      { from: "ai", text: "Agendado! ✅ Endereço: Rua das Oficinas, 123. Até às 14h!" },
    ],
  },
  {
    sector: "Salão de Beleza",
    icon: Scissors,
    messages: [
      { from: "user", text: "Quero agendar corte + escova pra sábado" },
      { from: "ai", text: "Sábado temos 10h e 15h com a Lu! 💇‍♀️ Qual horário?" },
      { from: "user", text: "15h perfeito" },
      { from: "ai", text: "Agendado! Corte + escova R$ 120. Até sábado! ✨" },
    ],
  },
  {
    sector: "Auto Peças",
    icon: Car,
    messages: [
      { from: "user", text: "Tem pastilha de freio pro Civic 2020?" },
      { from: "ai", text: "Temos! 🚗 Cobreq cerâmica R$ 189 ou Fras-le R$ 145. Qual prefere?" },
      { from: "user", text: "Fras-le, pode reservar" },
      { from: "ai", text: "Reservado! Retira hoje até 18h ou entregamos amanhã. ✅" },
    ],
  },
  {
    sector: "Cursos",
    icon: GraduationCap,
    messages: [
      { from: "user", text: "Ainda tem vaga no curso de Excel?" },
      { from: "ai", text: "Últimas 3 vagas! 📚 Turma começa segunda. R$ 297 ou 3x R$ 109." },
      { from: "user", text: "Quero parcelado!" },
      { from: "ai", text: "Matrícula confirmada! 🎓 Link de pagamento + material enviados!" },
    ],
  },
  {
    sector: "Agendamento",
    icon: CalendarCheck,
    messages: [
      { from: "user", text: "Quero agendar uma consulta com o Dr. Paulo" },
      { from: "ai", text: "Dr. Paulo tem quinta 8h e sexta 14h. Convênio ou particular? 🏥" },
      { from: "user", text: "Particular, quinta 8h" },
      { from: "ai", text: "Confirmado! ✅ Quinta 8h, R$ 350. Chegar 15min antes. Até lá!" },
    ],
  },
];

const PhoneMockup = () => {
  const [conversationIndex, setConversationIndex] = useState(0);
  const [visibleMessages, setVisibleMessages] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pausing">("typing");

  const current = conversations[conversationIndex];

  const nextConversation = useCallback(() => {
    setConversationIndex((prev) => (prev + 1) % conversations.length);
    setVisibleMessages(0);
    setPhase("typing");
  }, []);

  useEffect(() => {
    if (phase === "pausing") {
      const timeout = setTimeout(nextConversation, 2000);
      return () => clearTimeout(timeout);
    }

    const interval = setInterval(() => {
      setVisibleMessages((prev) => {
        if (prev >= current.messages.length) {
          setPhase("pausing");
          return prev;
        }
        return prev + 1;
      });
    }, 1400);
    return () => clearInterval(interval);
  }, [phase, current.messages.length, nextConversation]);

  const Icon = current.icon;

  return (
    <div className="animate-float">
      <div className="relative mx-auto w-[280px] sm:w-[300px] h-[580px] sm:h-[620px] rounded-[3rem] border-2 border-glass-border bg-card/80 backdrop-blur-xl shadow-glow-secondary p-3">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-background rounded-b-2xl" />

        <div className="w-full h-full rounded-[2.25rem] bg-background overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-muted/50 px-4 py-3 flex items-center gap-3 border-b border-border">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Icon className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <AnimatePresence mode="wait">
                <motion.p
                  key={current.sector}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="text-sm font-semibold text-foreground truncate"
                >
                  SensoriAI — {current.sector}
                </motion.p>
              </AnimatePresence>
              <p className="text-[10px] text-primary">● Online agora</p>
            </div>
          </div>

          {/* Sector indicator dots */}
          <div className="flex items-center justify-center gap-1 py-2 px-3">
            {conversations.map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all duration-500 ${
                  i === conversationIndex
                    ? "w-4 bg-primary"
                    : "w-1 bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>

          {/* Chat area */}
          <div className="flex-1 p-3 space-y-2.5 overflow-hidden flex flex-col justify-end">
            <AnimatePresence mode="wait">
              <motion.div
                key={conversationIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="space-y-2.5 flex flex-col"
              >
                {current.messages.slice(0, visibleMessages).map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`max-w-[85%] px-3 py-2 rounded-2xl text-[11px] leading-relaxed ${
                      msg.from === "user"
                        ? "self-end bg-primary/20 text-foreground rounded-br-sm"
                        : "self-start bg-muted text-foreground rounded-bl-sm"
                    }`}
                  >
                    {msg.text}
                  </motion.div>
                ))}

                {/* Typing indicator */}
                {phase === "typing" && visibleMessages < current.messages.length && visibleMessages > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`max-w-[50px] px-3 py-2 rounded-2xl text-xs ${
                      current.messages[visibleMessages].from === "ai"
                        ? "self-start bg-muted rounded-bl-sm"
                        : "self-end bg-primary/20 rounded-br-sm"
                    }`}
                  >
                    <span className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </span>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneMockup;
