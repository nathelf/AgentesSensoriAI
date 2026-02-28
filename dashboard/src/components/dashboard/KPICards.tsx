import { motion } from "framer-motion";
import { DollarSign, ShoppingCart, TrendingUp, Wallet } from "lucide-react";
import { useSales } from "@/context/SalesContext";
import { CountUp } from "@/components/ui/CountUp";

const kpiConfig = [
  { key: "revenue", icon: DollarSign, label: "Vendas Hoje", color: "text-success", glow: "glow-success" },
  { key: "orders", icon: ShoppingCart, label: "Pedidos IA", color: "text-tech", glow: "glow-tech" },
  { key: "ticket", icon: TrendingUp, label: "Ticket Médio", color: "text-success", glow: "" },
  { key: "economy", icon: Wallet, label: "Economia Operacional", color: "text-tech", glow: "" },
] as const;

export function KPICards() {
  const { totalRevenue, totalOrders, avgTicket, economyGenerated } = useSales();
  const values: Record<string, { value: number; prefix: string; decimals: number }> = {
    revenue: { value: totalRevenue, prefix: "R$ ", decimals: 2 },
    orders: { value: totalOrders, prefix: "", decimals: 0 },
    ticket: { value: avgTicket, prefix: "R$ ", decimals: 2 },
    economy: { value: economyGenerated, prefix: "R$ ", decimals: 2 },
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpiConfig.map((kpi, i) => {
        const v = values[kpi.key];
        return (
          <motion.div
            key={kpi.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`glass-card p-5 ${kpi.glow}`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-white/[0.04] ${kpi.color}`}>
                <kpi.icon className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">{kpi.label}</span>
            </div>
            <p className={`text-2xl font-bold text-foreground mono`}>
              <CountUp end={v.value} prefix={v.prefix} decimals={v.decimals} />
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}
