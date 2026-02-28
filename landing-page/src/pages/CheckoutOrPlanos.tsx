import { useSearchParams } from "react-router-dom";
import PricingSection from "@/components/PricingSection";
import CheckoutForm from "./CheckoutForm";

/**
 * /planos → lista de planos (PricingSection)
 * /planos?plan=starter|pro|enterprise → formulário de contratação (CheckoutForm)
 */
export default function CheckoutOrPlanos() {
  const [searchParams] = useSearchParams();
  const plan = searchParams.get("plan");

  if (plan && ["starter", "pro", "enterprise"].includes(plan)) {
    return <CheckoutForm />;
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="flex items-center justify-between px-6 md:px-12 py-4 border-b border-border/50">
        <a href="/" className="flex items-center gap-2">
          <img src="/logo-sensoriai-icon.png" alt="SensoriAI" className="h-9 w-auto" />
          <span className="font-display text-lg font-bold">SensoriAI</span>
        </a>
        <a href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Voltar ao início
        </a>
      </nav>
      <PricingSection />
      <footer className="text-center py-8 border-t border-border/50 text-sm text-muted-foreground">
        © 2026 SensoriAI. Todos os direitos reservados.
      </footer>
    </div>
  );
}
