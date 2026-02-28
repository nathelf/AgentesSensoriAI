import { motion } from "framer-motion";
import { Clock, Bot, Brain, CreditCard } from "lucide-react";
import { getCheckoutUrl } from "@/config";

const cards = [
  {
    icon: Clock,
    title: "O Humano",
    subtitle: "Lento e falho",
    text: "Demora 2h para responder. Esquece de fazer follow-up. Não atende fim de semana.",
    iconColor: "text-destructive",
    highlight: false,
  },
  {
    icon: Bot,
    title: "O Chatbot Antigo",
    subtitle: "Limitado",
    text: 'Respostas prontas. Não negocia. Cliente odeia "digite 1 para falar com atendente".',
    iconColor: "text-muted-foreground",
    highlight: false,
  },
  {
    icon: Brain,
    title: "O Agente SensoriAI",
    subtitle: "A solução",
    text: "Responde em 2s. Negocia preços. Integrado ao Estoque. Vende enquanto você dorme.",
    iconColor: "glow-text-primary",
    highlight: true,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const ProblemSolutionSection = () => {
  return (
    <section className="py-24 sm:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="mb-10 flex justify-center">
            <motion.a
              href={getCheckoutUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="animate-planos-cta btn-glow relative inline-flex items-center justify-center gap-3 rounded-xl bg-primary px-10 py-5 text-lg font-bold text-primary-foreground shadow-xl shadow-primary/30 transition-all hover:bg-primary/90 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <CreditCard className="h-6 w-6" />
              Ver Planos e Preços
            </motion.a>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Seu time dorme.{" "}
            <span className="glow-text-primary">A SensoriAI não.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Compare e descubra por que empresas estão migrando para agentes inteligentes.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {cards.map((card) => (
            <motion.div
              key={card.title}
              variants={cardVariants}
              className={`p-6 sm:p-8 rounded-2xl backdrop-blur-xl border transition-all duration-300 ${
                card.highlight
                  ? "glass-card-highlight scale-[1.02]"
                  : "glass-card hover:border-glass-border/80"
              }`}
            >
              <card.icon className={`w-10 h-10 mb-4 ${card.iconColor}`} />
              <h3 className="font-display text-xl font-bold mb-1 text-foreground">{card.title}</h3>
              <p className={`text-sm mb-3 ${card.highlight ? "text-primary" : "text-muted-foreground"}`}>
                {card.subtitle}
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm">{card.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;
