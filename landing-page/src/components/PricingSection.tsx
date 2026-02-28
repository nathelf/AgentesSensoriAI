import { motion } from "framer-motion";
import { Check, Zap, Crown, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    id: "starter",
    name: "Starter",
    icon: Zap,
    price: "197",
    period: "/mês",
    description: "Ideal para pequenos negócios começando a automatizar.",
    highlight: false,
    features: [
      "1 número de WhatsApp",
      "500 conversas/mês",
      "Catálogo com até 100 produtos",
      "Respostas automáticas 24/7",
      "Dashboard básico",
      "Suporte por e-mail",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    icon: Crown,
    price: "497",
    period: "/mês",
    description: "Para empresas que querem escalar suas vendas com IA.",
    highlight: true,
    badge: "Mais Popular",
    features: [
      "3 números de WhatsApp",
      "Conversas ilimitadas",
      "Catálogo ilimitado",
      "Negociação inteligente com IA",
      "Integração com estoque",
      "Dashboard avançado + relatórios",
      "Follow-up automático",
      "Suporte prioritário",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    icon: Building2,
    price: "Sob consulta",
    period: "",
    description: "Para operações de grande escala e atacadistas.",
    highlight: false,
    features: [
      "Números ilimitados",
      "Conversas ilimitadas",
      "IA treinada sob medida",
      "API personalizada",
      "Integração ERP/CRM",
      "Gerente de conta dedicado",
      "SLA garantido 99.9%",
      "Onboarding white-glove",
    ],
  },
];

const PricingSection = () => {
  return (
    <section id="precos" className="py-24 sm:py-32 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[150px]" />
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
            Invista no seu{" "}
            <span className="glow-text-primary">crescimento</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Planos que cabem no bolso e se pagam na primeira semana de uso.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className={`relative rounded-2xl p-6 sm:p-8 backdrop-blur-xl border transition-all duration-300 ${
                plan.highlight
                  ? "glass-card-highlight md:scale-105 md:-my-4"
                  : "glass-card hover:border-glass-border/80"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                  {plan.badge}
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    plan.highlight ? "bg-primary/20" : "bg-muted/50"
                  }`}
                >
                  <plan.icon className={`w-5 h-5 ${plan.highlight ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground">{plan.name}</h3>
              </div>

              <div className="mb-4">
                <span className="font-display text-4xl font-bold text-foreground">
                  {plan.price.startsWith("Sob") ? "" : "R$ "}
                  {plan.price}
                </span>
                <span className="text-muted-foreground text-sm">{plan.period}</span>
              </div>

              <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>

              <Button
                className={`w-full mb-6 py-5 font-semibold ${
                  plan.highlight
                    ? "btn-glow bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-muted/50 text-foreground hover:bg-muted border border-border"
                }`}
              >
                {plan.price.startsWith("Sob") ? "Falar com Vendas" : "Começar Agora"}
              </Button>

              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className={`w-4 h-4 mt-0.5 shrink-0 ${plan.highlight ? "text-primary" : "text-muted-foreground"}`} />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
