import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mic, Paperclip, Phone, MoreVertical, ArrowLeft, CheckCheck, Play } from "lucide-react";
import { useSales } from "@/context/SalesContext";
import {
  findProduct,
  extractQuantity,
  applyVolumeDiscount,
  checkPaymentTerms,
  suggestCombo,
  formatCurrency,
  type Product,
} from "@/data/products";
import { toast } from "sonner";

/* ─── Types ─── */
interface ChatMsg {
  id: string;
  from: "user" | "ai";
  text?: string;
  productCard?: { product: Product; quantity: number; finalPrice: number; totalValue: number; discountPercent: number; tier: string };
  audio?: { duration: string; transcript: string };
  time: string;
}

const now = () => new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
let orderCounter = 9925;

const initialMessages: ChatMsg[] = [
  { id: "m1", from: "ai", text: "Olá! 👋 Sou o assistente da SensoriAI Atacado.\n\nComo posso ajudar você hoje?", time: "14:30" },
  { id: "m2", from: "ai", text: "Temos promoções especiais para atacado! Peça qualquer produto e calculo o melhor preço na hora. 🛒", time: "14:30" },
];

/* ─── Audio Visual ─── */
function AudioBubble({ duration, transcript }: { duration: string; transcript: string }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-3 bg-white/[0.05] rounded-xl px-3 py-2.5">
        <button className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
          <Play className="w-3.5 h-3.5 text-primary ml-0.5" fill="currentColor" strokeWidth={0} />
        </button>
        <div className="flex items-center gap-[3px] flex-1">
          {Array.from({ length: 26 }).map((_, i) => (
            <div
              key={i}
              className="w-[3px] rounded-full bg-primary/50 waveform-bar"
              style={{ height: `${4 + Math.sin(i * 0.7) * 8 + Math.random() * 6}px`, animationDelay: `${i * 0.05}s` }}
            />
          ))}
        </div>
        <span className="text-[10px] text-muted-foreground flex-shrink-0 mono">{duration}</span>
      </div>
      <p className="text-[10px] text-muted-foreground/60 italic">🔊 Transcrição: "{transcript}"</p>
    </div>
  );
}

/* ─── Product Card ─── */
function InlineProductCard({ product, quantity, finalPrice, totalValue, discountPercent, tier }: NonNullable<ChatMsg["productCard"]>) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white/[0.06] rounded-xl p-3 border border-white/[0.08] my-1.5"
    >
      <div className="flex items-start gap-3">
        <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 text-lg">📦</div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-foreground">{product.name}</p>
          <p className="text-[11px] text-muted-foreground">Qtd: {quantity} un. • {tier}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-bold text-success mono">{formatCurrency(finalPrice)}/un</span>
            {discountPercent > 0 && (
              <span className="text-[10px] bg-success/15 text-success px-1.5 py-0.5 rounded-full font-semibold">-{discountPercent}%</span>
            )}
          </div>
          <p className="text-xs font-bold text-foreground mt-1 mono">Total: {formatCurrency(totalValue)}</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Bubble Animation ─── */
const bubbleVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring" as const, stiffness: 400, damping: 25 } },
};

/* ─── Main Component ─── */
export default function ChatSimulator() {
  const [messages, setMessages] = useState<ChatMsg[]>(initialMessages);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const { isAutoPilot, addOrder, addFeedEntry } = useSales();
  const scrollRef = useRef<HTMLDivElement>(null);
  const pendingOrder = useRef<{ product: Product; quantity: number; finalPrice: number; totalValue: number; discountApplied: number; discountPercent: number; tier: string } | null>(null);
  const abandonTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abandonSent = useRef(false);

  const scrollBottom = useCallback(() => {
    setTimeout(() => scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" }), 60);
  }, []);

  const addMsg = useCallback((msg: Omit<ChatMsg, "id">) => {
    setMessages((prev) => [...prev, { ...msg, id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 5)}` }]);
  }, []);

  const aiReply = useCallback(
    (respond: () => void) => {
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        respond();
        scrollBottom();
      }, 1500);
    },
    [scrollBottom]
  );

  // Abandoned cart
  useEffect(() => {
    if (abandonTimer.current) clearTimeout(abandonTimer.current);
    if (pendingOrder.current && !abandonSent.current) {
      abandonTimer.current = setTimeout(() => {
        if (pendingOrder.current && !abandonSent.current) {
          abandonSent.current = true;
          addMsg({ from: "ai", text: "Psiu! 👀 Ainda tenho estoque reservado pra você. Se fechar agora, consigo manter o preço. Vamos?", time: now() });
          addFeedEntry({ type: "warning", message: "⏰ Recuperação de carrinho — mensagem automática enviada" });
          scrollBottom();
        }
      }, 10000);
    }
    return () => { if (abandonTimer.current) clearTimeout(abandonTimer.current); };
  }, [messages, addMsg, addFeedEntry, scrollBottom]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    if (abandonTimer.current) clearTimeout(abandonTimer.current);

    addMsg({ from: "user", text, time: now() });
    scrollBottom();

    if (!isAutoPilot) return;

    const lower = text.toLowerCase();

    // ── Confirm order ──
    if (pendingOrder.current && (lower.includes("fechado") || lower.includes("pode mandar") || lower.includes("fechar") || lower.includes("ok") || lower.includes("confirma"))) {
      const o = pendingOrder.current;
      const orderId = `#${orderCounter++}`;
      aiReply(() => {
        addMsg({ from: "ai", text: `Perfeito! Pedido ${orderId} gerado. ✅\n\n📦 ${o.product.name} x${o.quantity}\n💰 Total: ${formatCurrency(o.totalValue)}\n🚚 Previsão de entrega: Amanhã às 10h.\n\nPedido integrado ao ERP automaticamente! 🚀`, time: now() });
        addOrder({
          id: orderId,
          clientName: "Cliente Demo",
          clientAvatar: "CD",
          products: `${o.product.name} x${o.quantity}`,
          totalValue: o.totalValue,
          discountApplied: o.discountApplied,
          status: "Aprovado IA",
          payment: "Pix",
        });
        addFeedEntry({ type: "order", message: `✅ Pedido ${orderId} Fechado — ${formatCurrency(o.totalValue)} (${o.product.name} x${o.quantity})` });
        toast.success("Novo Pedido Integrado ao ERP!", { description: `${o.product.name} x${o.quantity} — ${formatCurrency(o.totalValue)}` });
        pendingOrder.current = null;
        abandonSent.current = false;
      });
      return;
    }

    // ── Payment terms ──
    if (lower.includes("boleto") || lower.includes("prazo") || lower.includes("parcelar")) {
      const terms = checkPaymentTerms(980);
      aiReply(() => {
        addMsg({ from: "ai", text: terms.message, time: now() });
        addFeedEntry({ type: "ai", message: "🤖 IA consultou Score de crédito — Boleto 30/60/90 liberado" });
      });
      return;
    }

    // ── "Caro" / discount request ──
    if (lower.includes("caro") || lower.includes("mais barato") || lower.includes("desconto")) {
      aiReply(() => {
        addMsg({ from: "ai", text: "Entendo! 😊 Para grandes volumes aplico descontos automáticos:\n\n📦 >10 unidades: **5% OFF** (Tier 1)\n📦 >50 unidades: **10% OFF** (Tier 2)\n\nQual produto e quantidade te interessam?", time: now() });
        addFeedEntry({ type: "ai", message: "🤖 Cenário de recuperação ativado — cliente pediu desconto" });
      });
      return;
    }

    // ── Find product ──
    const product = findProduct(text);
    const qty = extractQuantity(text);

    if (product) {
      const calc = applyVolumeDiscount(qty, product.price);
      pendingOrder.current = { product, quantity: qty, ...calc };
      abandonSent.current = false;

      addFeedEntry({ type: "ai", message: `🤖 Produto identificado: ${product.name} (${qty} un.)` });
      if (calc.discountPercent > 0) {
        addFeedEntry({ type: "discount", message: `💰 Desconto ${calc.tier} (${calc.discountPercent}%) aplicado — economia de ${formatCurrency(calc.discountApplied)}` });
      }

      const originalTotal = product.price * qty;
      const discountText = calc.discountPercent > 0
        ? `\n\nCalculando... 🧮 Para ${qty} unidades, apliquei o desconto de ${calc.tier} (${calc.discountPercent}%). De ${formatCurrency(originalTotal)} por **${formatCurrency(calc.totalValue)}**. Economia de ${formatCurrency(calc.discountApplied)}!`
        : "";

      // Cross-sell check
      const crossSellMsg = suggestCombo(product);

      const useAudio = qty >= 50;
      aiReply(() => {
        if (useAudio) {
          addMsg({
            from: "ai",
            time: now(),
            audio: { duration: "0:12", transcript: `Certo, conferi aqui e consigo fazer a ${formatCurrency(calc.finalPrice)} a unidade, total de ${formatCurrency(calc.totalValue)}.` },
          });
        }
        addMsg({
          from: "ai",
          text: `Encontrei pra você! 👇${discountText}\n\nDeseja confirmar? Responda "fechado" para finalizar! 🤝`,
          time: now(),
          productCard: { product, quantity: qty, finalPrice: calc.finalPrice, totalValue: calc.totalValue, discountPercent: calc.discountPercent, tier: calc.tier },
        });

        // Cross-sell after a delay
        if (crossSellMsg) {
          setTimeout(() => {
            addMsg({ from: "ai", text: crossSellMsg, time: now() });
            addFeedEntry({ type: "cross-sell", message: `🎯 Cross-sell ativado: ${product.name} → Amendoim Japonês` });
            scrollBottom();
          }, 2000);
        }
      });
      return;
    }

    // ── Default ──
    aiReply(() => {
      addMsg({
        from: "ai",
        text: "Posso ajudar com nosso catálogo! Temos:\n\n🥤 Coca-Cola 2L (Fardo)\n🍺 Heineken 330ml (Cx 12)\n🍚 Arroz Tio João 5kg\n🥜 Amendoim Japonês 500g\n🔥 Combo Churrasco\n\nDigite o produto e a quantidade!",
        time: now(),
      });
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 25 }}
        className="w-full max-w-[420px] h-[720px] rounded-2xl border border-white/[0.08] glass-card flex flex-col overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 bg-success/[0.06] border-b border-white/[0.05]">
          <ArrowLeft className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
          <img src="/logo-sensoriai-icon.png" alt="SensoriAI" className="h-10 w-10 object-contain" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">SensoriAI Atacado</p>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <p className="text-[11px] text-success">Online — IA Ativa</p>
            </div>
          </div>
          <Phone className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
          <MoreVertical className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-3 space-y-2"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%23ffffff' fill-opacity='0.015'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        >
          <AnimatePresence mode="popLayout">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                variants={bubbleVariants}
                initial="hidden"
                animate="visible"
                layout
                className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[82%] rounded-xl px-3 py-2 ${msg.from === "user" ? "bg-chat-user rounded-br-sm" : "bg-chat-ai rounded-bl-sm"}`}>
                  {msg.audio && <AudioBubble duration={msg.audio.duration} transcript={msg.audio.transcript} />}
                  {msg.text && <p className="text-[13px] text-foreground whitespace-pre-line leading-relaxed">{msg.text}</p>}
                  {msg.productCard && <InlineProductCard {...msg.productCard} />}
                  <div className={`flex items-center gap-1 mt-1 ${msg.from === "user" ? "justify-end" : ""}`}>
                    <span className="text-[10px] text-muted-foreground/50 mono">{msg.time}</span>
                    {msg.from === "user" && <CheckCheck className="w-3 h-3 text-tech" strokeWidth={1.5} />}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {typing && (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex justify-start">
              <div className="bg-chat-ai rounded-xl rounded-bl-sm px-4 py-3">
                <div className="flex gap-1.5">
                  {[0, 150, 300].map((d) => (
                    <div key={d} className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: `${d}ms` }} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Manual mode warning */}
        <AnimatePresence>
          {!isAutoPilot && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="px-3 py-2 bg-warning/10 border-t border-warning/20 overflow-hidden"
            >
              <p className="text-[11px] text-warning font-semibold text-center">⚠️ MODO MANUAL: Você está no controle</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input */}
        <div className={`flex items-center gap-2 px-3 py-2.5 border-t ${!isAutoPilot ? "border-warning/40 bg-warning/[0.03] border-pulse-warning" : "border-white/[0.05]"}`}>
          <Paperclip className="w-5 h-5 text-muted-foreground flex-shrink-0 cursor-pointer hover:text-foreground transition-colors" strokeWidth={1.5} />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder={isAutoPilot ? "Digite uma mensagem..." : "Modo manual — sua resposta..."}
            className={`flex-1 bg-white/[0.04] rounded-full px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none border transition-colors ${
              !isAutoPilot ? "border-warning/30 focus:border-warning/50" : "border-white/[0.05] focus:border-primary/30"
            }`}
          />
          {input.trim() ? (
            <button onClick={handleSend} className="w-9 h-9 rounded-full bg-primary flex items-center justify-center flex-shrink-0 hover:bg-primary/80 transition-colors">
              <Send className="w-4 h-4 text-primary-foreground" strokeWidth={1.5} />
            </button>
          ) : (
            <Mic className="w-5 h-5 text-muted-foreground flex-shrink-0 cursor-pointer hover:text-foreground transition-colors" strokeWidth={1.5} />
          )}
        </div>
      </motion.div>
    </div>
  );
}
