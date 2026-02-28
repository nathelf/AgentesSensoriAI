import { motion } from "framer-motion";
import { Play, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import PhoneMockup from "@/components/PhoneMockup";
import { DASHBOARD_URL } from "@/config";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Copy */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-medium text-primary">Agente de IA para WhatsApp</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight mb-6">
              Transforme seu WhatsApp em uma{" "}
              <span className="glow-text-primary">Máquina de Vendas Automática</span>.
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              O Agente de IA que atende, negocia e fecha pedidos 24/7. Para Atacado, Varejo e Serviços.{" "}
              <span className="text-foreground font-medium">Pare de perder clientes por demora no atendimento.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                variant="outline"
                className="border-glass-border text-foreground hover:bg-muted/50 text-base px-8 py-6 font-medium gap-2"
                onClick={() => window.open(DASHBOARD_URL, "_blank")}
              >
                <Play className="w-5 h-5" />
                Testar Agente (Demo Grátis)
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-glass-border text-foreground hover:bg-muted/50 text-base px-8 py-6 font-medium gap-2"
                onClick={() => window.open("https://wa.me/5545998294881?text=Olá! Tenho interesse no Agente de Vendas da SensoriAI", "_blank")}
              >
                <MessageCircle className="w-5 h-5" />
                Falar com Consultor
              </Button>
            </div>
          </motion.div>

          {/* Right - Phone */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center"
          >
            <PhoneMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
