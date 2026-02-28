import { motion } from "framer-motion";
import { useSales } from "@/context/SalesContext";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/data/products";
import { useEffect } from "react";

const statusColors: Record<string, string> = {
  "Aprovado IA": "bg-success/15 text-success border-success/20",
  Manual: "bg-warning/15 text-warning border-warning/20",
  Pendente: "bg-muted text-muted-foreground border-muted",
};

export function OrdersTable() {
  const { orders, clearNewFlag } = useSales();

  useEffect(() => {
    orders.forEach((o) => {
      if (o.isNew) {
        const t = setTimeout(() => clearNewFlag(o.id), 2500);
        return () => clearTimeout(t);
      }
    });
  }, [orders, clearNewFlag]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      className="glass-card overflow-hidden"
    >
      <div className="px-5 py-4 border-b border-white/[0.05]">
        <h3 className="text-sm font-semibold text-foreground">Histórico de Pedidos</h3>
        <p className="text-xs text-muted-foreground mt-0.5">{orders.length} pedidos registrados hoje</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.05]">
              <th className="text-left px-5 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">ID</th>
              <th className="text-left px-5 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Cliente</th>
              <th className="text-left px-5 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Produtos</th>
              <th className="text-right px-5 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Valor Total</th>
              <th className="text-center px-5 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
              <th className="text-center px-5 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Pagamento</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <motion.tr
                key={order.id}
                initial={order.isNew ? { opacity: 0, x: -20, backgroundColor: "hsl(160 84% 39% / 0.15)" } : undefined}
                animate={{ opacity: 1, x: 0, backgroundColor: "transparent" }}
                transition={{ duration: 0.6 }}
                className={`border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors ${order.isNew ? "row-flash" : ""}`}
              >
                <td className="px-5 py-3 font-mono text-xs font-semibold text-foreground">{order.id}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-accent/15 flex items-center justify-center text-[10px] font-bold text-accent flex-shrink-0">
                      {order.clientAvatar}
                    </div>
                    <span className="text-xs text-foreground font-medium">{order.clientName}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-xs text-muted-foreground max-w-[200px] truncate">{order.products}</td>
                <td className="px-5 py-3 text-right font-mono text-xs font-semibold text-foreground">{formatCurrency(order.totalValue)}</td>
                <td className="px-5 py-3 text-center">
                  <Badge variant="outline" className={`text-[10px] font-semibold ${statusColors[order.status] || ""}`}>
                    {order.status}
                  </Badge>
                </td>
                <td className="px-5 py-3 text-center text-xs text-muted-foreground">{order.payment}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
