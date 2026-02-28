import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Package, Shirt, UtensilsCrossed, CalendarCheck } from "lucide-react";

const niches = [
  {
    id: "atacado",
    label: "Atacado",
    icon: Package,
    messages: [
      { from: "user", text: "Preciso de 100 caixas do sabão líquido 5L" },
      { from: "ai", text: "Temos em estoque! 🏭 Para 100cx, consigo R$ 18,50/un (preço de tabela R$ 22). Quer que eu gere o pedido?" },
      { from: "user", text: "Fecha! Entrega até sexta?" },
      { from: "ai", text: "Pedido #4821 confirmado! Entrega prevista: Quinta-feira. Boleto enviado no seu e-mail. ✅" },
    ],
  },
  {
    id: "varejo",
    label: "Varejo / Moda",
    icon: Shirt,
    messages: [
      { from: "user", text: "Tem essa camiseta em M?" },
      { from: "ai", text: "Temos sim! 👕 E ela combina perfeitamente com essa calça jogger. Quer ver o look completo?" },
      { from: "user", text: "Quero! Quanto fica os dois?" },
      { from: "ai", text: "Look completo por R$ 189,90 (economia de R$ 40!). Envio o link de pagamento? 🛒" },
    ],
  },
  {
    id: "delivery",
    label: "Restaurante",
    icon: UtensilsCrossed,
    messages: [
      { from: "user", text: "Quero 2 burgers artesanais, tira a cebola de um" },
      { from: "ai", text: "Anotado! 🍔 1 burger completo + 1 sem cebola. Adicionei batata frita por +R$ 5? Combo sai mais em conta!" },
      { from: "user", text: "Bota a batata sim" },
      { from: "ai", text: "Total: R$ 67,80. Tempo estimado: 35min. Pix ou cartão na entrega? 🚴" },
    ],
  },
  {
    id: "servicos",
    label: "Serviços",
    icon: CalendarCheck,
    messages: [
      { from: "user", text: "Tem horário amanhã de manhã?" },
      { from: "ai", text: "Tenho às 9h e 10:30h com a Dra. Marina. Qual prefere? 📋" },
      { from: "user", text: "10:30 por favor" },
      { from: "ai", text: "Agendado! ✅ Dra. Marina, amanhã 10:30h. Enviei a confirmação por aqui e por e-mail. Até lá!" },
    ],
  },
];

const VersatilitySection = () => {
  const [active, setActive] = useState("atacado");
  const current = niches.find((n) => n.id === active)!;

  return (
    <section className="py-24 sm:py-32 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Personalizado para o{" "}
            <span className="glow-text-secondary">SEU Nicho</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Não importa o segmento. A SensoriAI se adapta ao seu negócio.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
            {niches.map((niche) => (
              <button
                key={niche.id}
                onClick={() => setActive(niche.id)}
                className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  active === niche.id
                    ? "bg-primary/15 text-primary border border-primary/40"
                    : "bg-muted/30 text-muted-foreground border border-border hover:border-glass-border hover:text-foreground"
                }`}
              >
                <niche.icon className="w-4 h-4" />
                {niche.label}
              </button>
            ))}
          </div>

          {/* Chat simulation */}
          <div className="glass-card p-6 sm:p-8 max-w-lg mx-auto">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <current.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">SensoriAI — {current.label}</p>
                <p className="text-xs text-primary">● Online</p>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-3"
              >
                {current.messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.from === "user"
                        ? "ml-auto bg-primary/15 text-foreground rounded-br-sm"
                        : "bg-muted text-foreground rounded-bl-sm"
                    }`}
                  >
                    {msg.text}
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VersatilitySection;
