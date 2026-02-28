import { motion } from "framer-motion";
import { funnelData } from "@/data/products";

export function FunnelChart() {
  const max = funnelData[0].value;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="glass-card p-5"
    >
      <h3 className="text-sm font-semibold text-foreground mb-1">Funil de Conversão IA</h3>
      <p className="text-xs text-muted-foreground mb-5">Hoje — Taxa de Fechamento: {((funnelData[3].value / funnelData[0].value) * 100).toFixed(0)}%</p>
      <div className="space-y-3">
        {funnelData.map((item, i) => (
          <div key={item.stage} className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">{item.stage}</span>
              <span className="text-xs font-bold text-foreground mono">{item.value}</span>
            </div>
            <div className="w-full h-6 bg-white/[0.03] rounded overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(item.value / max) * 100}%` }}
                transition={{ duration: 0.8, delay: 0.6 + i * 0.15, ease: "easeOut" }}
                className="h-full rounded"
                style={{ background: item.fill }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
