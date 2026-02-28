import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export interface Order {
  id: string;
  clientName: string;
  clientAvatar: string;
  products: string;
  totalValue: number;
  discountApplied: number;
  status: "Aprovado IA" | "Manual" | "Pendente";
  payment: "Pix" | "Boleto" | "Cartão";
  timestamp: Date;
  isNew?: boolean;
}

export interface FeedEntry {
  id: string;
  type: "info" | "discount" | "order" | "ai" | "warning" | "cross-sell";
  message: string;
  timestamp: Date;
}

interface SalesState {
  totalRevenue: number;
  totalOrders: number;
  avgTicket: number;
  economyGenerated: number;
  orders: Order[];
  feed: FeedEntry[];
  isAutoPilot: boolean;
}

interface SalesContextType extends SalesState {
  addOrder: (order: Omit<Order, "timestamp" | "isNew">) => void;
  addFeedEntry: (entry: Omit<FeedEntry, "id" | "timestamp">) => void;
  toggleAutoPilot: () => void;
  clearNewFlag: (orderId: string) => void;
}

const SalesContext = createContext<SalesContextType | null>(null);

const seedOrders: Order[] = [
  { id: "#9921", clientName: "Mercado BomPreço", clientAvatar: "MB", products: "Arroz Tio João x100", totalValue: 2420.1, discountApplied: 269.0, status: "Aprovado IA", payment: "Boleto", timestamp: new Date(Date.now() - 7200000) },
  { id: "#9922", clientName: "Distribuidora Silva", clientAvatar: "DS", products: "Coca-Cola 2L x80", totalValue: 3240.0, discountApplied: 360.0, status: "Aprovado IA", payment: "Pix", timestamp: new Date(Date.now() - 5400000) },
  { id: "#9923", clientName: "Supermercado Central", clientAvatar: "SC", products: "Heineken 330ml x40", totalValue: 2080.0, discountApplied: 0, status: "Manual", payment: "Cartão", timestamp: new Date(Date.now() - 3600000) },
  { id: "#9924", clientName: "Adega do João", clientAvatar: "AJ", products: "Combo Churrasco x20, Amendoim x30", totalValue: 1006.0, discountApplied: 54.0, status: "Aprovado IA", payment: "Pix", timestamp: new Date(Date.now() - 1800000) },
];

const seedFeed: FeedEntry[] = [
  { id: "f1", type: "ai", message: "🤖 SensoriAI VendaBot v2.4 — Sistema online", timestamp: new Date(Date.now() - 7200000) },
  { id: "f2", type: "info", message: "📡 WhatsApp Business API (Meta) conectada", timestamp: new Date(Date.now() - 6000000) },
  { id: "f3", type: "order", message: "✅ Pedido #9921 — R$ 2.420,10 (Arroz x100)", timestamp: new Date(Date.now() - 5400000) },
  { id: "f4", type: "discount", message: "💰 Desconto Tier 2 (10%) aplicado — Distribuidora Silva", timestamp: new Date(Date.now() - 4000000) },
  { id: "f5", type: "order", message: "✅ Pedido #9922 — R$ 3.240,00 (Coca-Cola x80)", timestamp: new Date(Date.now() - 3600000) },
  { id: "f6", type: "cross-sell", message: "🎯 Cross-sell ativado: Amendoim +15% OFF para Adega do João", timestamp: new Date(Date.now() - 2000000) },
  { id: "f7", type: "order", message: "✅ Pedido #9924 — R$ 1.006,00 (Combo + Amendoim)", timestamp: new Date(Date.now() - 1800000) },
];

export function SalesProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SalesState>({
    totalRevenue: 12450,
    totalOrders: 14,
    avgTicket: 889.29,
    economyGenerated: 2300,
    orders: seedOrders,
    feed: seedFeed,
    isAutoPilot: true,
  });

  const addOrder = useCallback((order: Omit<Order, "timestamp" | "isNew">) => {
    const newOrder: Order = { ...order, timestamp: new Date(), isNew: true };
    setState((prev) => {
      const newOrders = [newOrder, ...prev.orders];
      const newRevenue = prev.totalRevenue + order.totalValue;
      const newTotalOrders = prev.totalOrders + 1;
      return {
        ...prev,
        orders: newOrders,
        totalRevenue: newRevenue,
        totalOrders: newTotalOrders,
        avgTicket: +(newRevenue / newTotalOrders).toFixed(2),
        economyGenerated: prev.economyGenerated + order.discountApplied,
      };
    });
  }, []);

  const addFeedEntry = useCallback((entry: Omit<FeedEntry, "id" | "timestamp">) => {
    setState((prev) => ({
      ...prev,
      feed: [{ ...entry, id: `feed-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`, timestamp: new Date() }, ...prev.feed],
    }));
  }, []);

  const toggleAutoPilot = useCallback(() => {
    setState((prev) => ({ ...prev, isAutoPilot: !prev.isAutoPilot }));
  }, []);

  const clearNewFlag = useCallback((orderId: string) => {
    setState((prev) => ({
      ...prev,
      orders: prev.orders.map((o) => (o.id === orderId ? { ...o, isNew: false } : o)),
    }));
  }, []);

  return (
    <SalesContext.Provider value={{ ...state, addOrder, addFeedEntry, toggleAutoPilot, clearNewFlag }}>
      {children}
    </SalesContext.Provider>
  );
}

export function useSales() {
  const ctx = useContext(SalesContext);
  if (!ctx) throw new Error("useSales must be used within SalesProvider");
  return ctx;
}
