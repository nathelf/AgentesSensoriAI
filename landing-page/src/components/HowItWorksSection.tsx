import { motion } from "framer-motion";
import { QrCode, Upload, DollarSign } from "lucide-react";

const steps = [
  {
    icon: QrCode,
    step: "01",
    title: "Conecte",
    description: "Escaneie o QR Code do seu WhatsApp Business.",
  },
  {
    icon: Upload,
    step: "02",
    title: "Treine",
    description: "Suba seu PDF de catálogo ou tabela de preços.",
  },
  {
    icon: DollarSign,
    step: "03",
    title: "Lucre",
    description: "A IA começa a vender imediatamente.",
  },
];

const HowItWorksSection = () => {
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
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Simples assim.{" "}
            <span className="glow-text-primary">3 passos.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Sem instalação complexa. Sem código. Sem dor de cabeça.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting line (desktop) */}
            <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-px bg-gradient-to-r from-primary/40 via-secondary/40 to-primary/40" />

            {steps.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="text-center relative"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-muted/50 border border-border flex items-center justify-center relative z-10">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
                <span className="text-xs font-bold text-primary tracking-widest uppercase mb-2 block">
                  Passo {item.step}
                </span>
                <h3 className="font-display text-2xl font-bold mb-2 text-foreground">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
