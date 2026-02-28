import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Users, ShoppingCart, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getDashboardUrl } from "@/config";

const stats = [
  { icon: ShoppingCart, value: "1.247", label: "Vendas este mês" },
  { icon: TrendingUp, value: "+312%", label: "Aumento em conversões" },
  { icon: Users, value: "4.8k", label: "Clientes atendidos" },
  { icon: BarChart3, value: "R$ 89k", label: "Faturamento gerado" },
];

const DashboardSection = () => {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -bottom-32 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
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
            Controle Total na{" "}
            <span className="glow-text-primary">Palma da Mão</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Acompanhe cada centavo gerado pela IA em tempo real.
          </p>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto mb-12"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i }}
              className="glass-card p-5 sm:p-6 text-center"
            >
              <stat.icon className="w-6 h-6 text-primary mx-auto mb-3" />
              <p className="font-display text-2xl sm:text-3xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="max-w-5xl mx-auto"
        >
          <div className="glass-card p-2 sm:p-3 shadow-glow-primary">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-primary/60" />
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-muted/50 rounded-md px-3 py-1 text-xs text-muted-foreground text-center">
                  app.sensoriai.com/dashboard
                </div>
              </div>
            </div>

            {/* Dashboard content */}
            <div className="p-4 sm:p-6 space-y-4">
              {/* Chart area */}
              <div className="grid lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 bg-muted/20 rounded-xl p-4 border border-border">
                  <p className="text-sm font-semibold text-foreground mb-4">Vendas — Últimos 7 dias</p>
                  <div className="flex items-end gap-2 h-32">
                    {[40, 65, 45, 80, 55, 90, 75].map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div
                          className="w-full rounded-t-md bg-gradient-to-t from-primary/60 to-primary/20"
                          style={{ height: `${h}%` }}
                        />
                        <span className="text-[10px] text-muted-foreground">
                          {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"][i]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-muted/20 rounded-xl p-4 border border-border space-y-3">
                  <p className="text-sm font-semibold text-foreground">Últimas vendas</p>
                  {[
                    { name: "João M.", value: "R$ 450,00" },
                    { name: "Maria S.", value: "R$ 189,90" },
                    { name: "Pedro L.", value: "R$ 1.200,00" },
                    { name: "Ana R.", value: "R$ 67,80" },
                  ].map((sale) => (
                    <div key={sale.name} className="flex justify-between items-center text-xs">
                      <span className="text-muted-foreground">{sale.name}</span>
                      <span className="text-primary font-semibold">{sale.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Botão para abrir o dashboard em nova aba */}
            <div className="mt-6 flex justify-center">
              <Button size="lg" className="btn-glow bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gap-2" asChild>
                <a href={getDashboardUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Acessar Dashboard
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DashboardSection;
