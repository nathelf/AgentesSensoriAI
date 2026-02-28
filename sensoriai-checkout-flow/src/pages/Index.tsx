import PricingSection from "@/components/PricingSection";
import { Rocket } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-4 border-b border-border/50">
        <div className="flex items-center gap-2">
          <img src="/logo-sensoriai-icon.png" alt="SensoriAI" className="h-9 w-auto" />
          <span className="font-display text-lg font-bold">SensoriAI</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#pricing" className="hover:text-foreground transition-colors">Preços</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="text-center py-20 px-4 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <Rocket className="w-4 h-4" />
            Agentes de IA para WhatsApp
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold max-w-3xl mx-auto mb-6 leading-tight">
            Venda mais com <span className="text-primary glow-text">Inteligência Artificial</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto">
            Automatize atendimento, negociação e follow-up no WhatsApp da sua empresa.
          </p>
        </div>
      </section>

      {/* Pricing */}
      <div id="pricing">
        <PricingSection />
      </div>

      {/* Footer */}
      <footer className="text-center py-8 border-t border-border/50 text-sm text-muted-foreground">
        © 2026 SensoriAI. Todos os direitos reservados.
      </footer>
    </div>
  );
};

export default Index;
