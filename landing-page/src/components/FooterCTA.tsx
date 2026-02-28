import { motion } from "framer-motion";
import { Rocket, Instagram, Linkedin, Mail, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const FooterCTA = () => {
  return (
    <footer className="relative pt-24 sm:pt-32 pb-12">
      {/* Gradient overlay */}
      <div className="absolute inset-0 gradient-footer" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 leading-tight">
            Pronto para automatizar{" "}
            <span className="glow-text-primary">suas vendas?</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Junte-se a centenas de empresas que já triplicaram o faturamento com IA.
          </p>

          <Button
            size="lg"
            className="btn-glow bg-primary text-primary-foreground hover:bg-primary/90 animate-pulse-glow text-base sm:text-lg px-6 sm:px-10 py-6 sm:py-7 font-bold gap-2 sm:gap-3 w-full sm:w-auto"
          >
            <Rocket className="w-5 h-5" />
            Quero minha Demonstração Gratuita
          </Button>

          <div className="flex items-center justify-center gap-2 mt-6 text-sm text-muted-foreground">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span>Teste por 7 dias. Sem cartão de crédito.</span>
          </div>
        </motion.div>

        {/* Footer bottom */}
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <span className="font-display font-bold text-primary text-sm">S</span>
            </div>
            <span className="font-display font-bold text-foreground">SensoriAI</span>
          </div>

          <div className="flex items-center gap-4">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>

          <p className="text-xs text-muted-foreground">
            © 2026 SensoriAI. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterCTA;
