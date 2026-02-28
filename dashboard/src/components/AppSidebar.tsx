import { NavLink as RouterNavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, MessageCircle, Zap, Activity } from "lucide-react";
import { useSales } from "@/context/SalesContext";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/chat", icon: MessageCircle, label: "Agente de Vendas" },
];

export function AppSidebar() {
  const location = useLocation();
  const { isAutoPilot, toggleAutoPilot, totalOrders } = useSales();

  return (
    <aside className="w-[260px] min-h-screen border-r border-white/[0.05] bg-[hsl(var(--sidebar-background))] flex flex-col">
      {/* Logo */}
      <div className="p-5 border-b border-white/[0.05]">
        <div className="flex items-center gap-3">
          <img src="/logo-sensoriai-icon.png" alt="SensoriAI" className="h-10 w-auto" />
          <div>
            <p className="text-[10px] text-muted-foreground font-semibold tracking-[0.2em] uppercase">VendaBot Pro</p>
          </div>
        </div>
      </div>

      {/* Pilot toggle */}
      <div className="px-4 pt-4 pb-2">
        <motion.div
          className={`glass-card p-4 space-y-3 transition-colors ${isAutoPilot ? "border-success/20" : "border-warning/30 border-pulse-warning"}`}
          layout
        >
          <div className="flex items-center gap-2">
            <Zap className={`w-4 h-4 ${isAutoPilot ? "text-success" : "text-warning"}`} strokeWidth={1.5} />
            <span className="text-xs font-bold text-foreground">🤖 Piloto Automático (IA)</span>
          </div>
          <div className="flex items-center justify-between">
            <span className={`text-[11px] font-medium ${isAutoPilot ? "text-success" : "text-warning"}`}>
              {isAutoPilot ? "IA Ativa" : "Modo Manual"}
            </span>
            <Switch checked={isAutoPilot} onCheckedChange={toggleAutoPilot} />
          </div>
          {!isAutoPilot && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] text-warning font-semibold"
            >
              ⚠️ Você está respondendo como o Agente.
            </motion.p>
          )}
        </motion.div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-2 space-y-1">
        {navItems.map((item) => {
          const active = location.pathname === item.to;
          return (
            <RouterNavLink
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                active
                  ? "bg-primary/10 text-primary border border-primary/15"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/[0.03]"
              }`}
            >
              <item.icon className="w-4 h-4" strokeWidth={1.5} />
              {item.label}
              {item.to === "/" && (
                <span className="ml-auto text-[10px] bg-success/15 text-success px-1.5 py-0.5 rounded-full font-bold mono">{totalOrders}</span>
              )}
            </RouterNavLink>
          );
        })}
      </nav>

      {/* Bottom status */}
      <div className="p-4 border-t border-white/[0.05]">
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <Activity className="w-3.5 h-3.5 text-success" strokeWidth={1.5} />
          <span>Sistema operando normalmente</span>
        </div>
        <p className="text-[10px] text-muted-foreground/40 mt-1.5 mono">SensoriAI v2.4.1 • Build 2025.02</p>
      </div>
    </aside>
  );
}
