import { motion } from "framer-motion";
import { Play, MonitorPlay } from "lucide-react";
import { Button } from "@/components/ui/button";
import PhoneMockup from "@/components/PhoneMockup";

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
              {/* Botão de Teste do Sistema - Abre o Dashboard em nova aba */}
              <Button
                size="lg"
                className="btn-glow bg-primary text-primary-foreground hover:bg-primary/90 animate-pulse-glow text-base px-8 py-6 font-semibold gap-2"
                onClick={() => window.open("https://agentevendas.lovable.app/", "_blank")}
              >
                <Play className="w-5 h-5" />
                Testar Agente Agora (Demo Grátis)
              </Button>

              {/* Botão do Vídeo - Substitua 'SEU_LINK_AQUI' pelo link do YouTube/Vimeo quando tiver */}
              <Button
                size="lg"
                variant="outline"
                className="border-glass-border text-foreground hover:bg-muted/50 text-base px-8 py-6 font-medium gap-2"
                onClick={() => window.open("https://seu-video-aqui.com", "_blank")}
              >
                <MonitorPlay className="w-5 h-5" />
                Ver Vídeo de 1 min
              </Button>
            </div>

            {/* Social proof */}
            <div className="mt-10 flex items-center gap-6 justify-center lg:justify-start">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="text-foreground font-semibold">+500 empresas</span> já automatizaram
              </p>
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
