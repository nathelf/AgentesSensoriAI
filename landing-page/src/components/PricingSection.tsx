import { useNavigate } from "react-router-dom";
import { Zap, Crown, Building2, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: "197",
    period: "/mês",
    description: "Ideal para pequenos negócios começando a automatizar.",
    icon: Zap,
    popular: false,
    cta: "Começar Agora",
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
    price: "497",
    period: "/mês",
    description: "Para empresas que querem escalar suas vendas com IA.",
    icon: Crown,
    popular: true,
    cta: "Começar Agora",
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
    price: "Sob consulta",
    period: "",
    description: "Para operações de grande escala e atacadistas.",
    icon: Building2,
    popular: false,
    cta: "Falar com Vendas",
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
  const navigate = useNavigate();

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Invista no seu <span className="text-primary glow-text">crescimento</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Planos que cabem no bolso e se pagam na primeira semana de uso.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.id}
                className={`glass-card rounded-2xl p-6 md:p-8 relative flex flex-col ${plan.popular ? "glow-border-strong" : ""
                  }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-full">
                      Mais Popular
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-bold">{plan.name}</h3>
                </div>

                <div className="mb-2">
                  {plan.price === "Sob consulta" ? (
                    <p className="font-display text-3xl font-bold">Sob consulta</p>
                  ) : (
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm text-muted-foreground">R$</span>
                      <span className="font-display text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                  )}
                </div>

                <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>

                <Button
                  onClick={() => navigate(`/planos?plan=${plan.id}`)}
                  className={`w-full h-12 font-semibold mb-6 ${plan.popular
                      ? "bg-primary text-primary-foreground hover:bg-primary/90 btn-glow"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border"
                    }`}
                >
                  {plan.cta}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>

                <ul className="space-y-3 mt-auto">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
