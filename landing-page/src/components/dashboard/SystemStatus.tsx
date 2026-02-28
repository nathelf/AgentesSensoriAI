import { motion } from "framer-motion";
import { Wifi, Database, CreditCard, RefreshCw } from "lucide-react";

const systems = [
  { label: "ERP Bling", status: "connected", icon: Database },
  { label: "WhatsApp API (Meta)", status: "connected", icon: Wifi },
  { label: "Gateway Pagamento (Asaas)", status: "connected", icon: CreditCard },
  { label: "Estoque em Tempo Real", status: "syncing", icon: RefreshCw },
];

export function SystemStatus() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="glass-card p-4"
    >
      <h3 className="text-[11px] font-semibold text-foreground mb-3 uppercase tracking-wider">Status do Sistema</h3>
      <div className="space-y-2.5">
        {systems.map((sys) => (
          <div key={sys.label} className="flex items-center gap-2.5">
            <div className={`w-2 h-2 rounded-full ${sys.status === "connected" ? "bg-success" : "bg-warning animate-pulse"}`} />
            <sys.icon className="w-3.5 h-3.5 text-muted-foreground" strokeWidth={1.5} />
            <span className="text-xs text-muted-foreground">{sys.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
