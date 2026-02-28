import { motion } from "framer-motion";
import { useSales } from "@/context/SalesContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Terminal } from "lucide-react";

const typeStyles: Record<string, string> = {
  info: "text-tech",
  discount: "text-warning",
  order: "text-success",
  ai: "text-secondary",
  warning: "text-danger",
  "cross-sell": "text-purple-400",
};

export function IntelligenceFeed() {
  const { feed } = useSales();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="glass-card flex flex-col h-full"
    >
      <div className="p-4 border-b border-white/[0.05] flex items-center gap-2">
        <Terminal className="w-4 h-4 text-primary" strokeWidth={1.5} />
        <h3 className="text-sm font-semibold text-foreground">Feed de Inteligência</h3>
      </div>
      <ScrollArea className="flex-1 p-3">
        <div className="space-y-1.5">
          {feed.map((entry, i) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i < 4 ? i * 0.05 : 0 }}
              className="px-3 py-2 rounded-lg bg-white/[0.02] border border-white/[0.03]"
            >
              <p className={`text-[11px] font-medium leading-relaxed ${typeStyles[entry.type] || "text-muted-foreground"}`}>
                {entry.message}
              </p>
              <p className="text-[9px] text-muted-foreground/50 mt-0.5 mono">
                {entry.timestamp.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
              </p>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </motion.div>
  );
}
