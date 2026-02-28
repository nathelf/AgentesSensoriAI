export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  tag: string;
  keywords: string[];
  crossSell?: { productId: number; discount: number; message: string };
}

export const products: Product[] = [
  {
    id: 1,
    name: "Coca-Cola 2L (Fardo c/ 6)",
    price: 45.0,
    stock: 150,
    tag: "Bebidas",
    keywords: ["coca", "coca-cola", "coca cola", "refrigerante"],
  },
  {
    id: 2,
    name: "Heineken 330ml (Cx 12)",
    price: 52.0,
    stock: 200,
    tag: "Bebidas",
    keywords: ["heineken", "cerveja", "beer"],
    crossSell: {
      productId: 4,
      discount: 15,
      message: "Dica: O Amendoim Japonês está saindo com 15% OFF se levar junto. Quer adicionar 10 pacotes por R$ 102,00?",
    },
  },
  {
    id: 3,
    name: "Arroz Tio João 5kg",
    price: 26.9,
    stock: 400,
    tag: "Mercearia",
    keywords: ["arroz", "tio joão", "tio joao"],
  },
  {
    id: 4,
    name: "Amendoim Japonês 500g",
    price: 12.0,
    stock: 300,
    tag: "Snack",
    keywords: ["amendoim", "japonês", "japones", "snack"],
  },
  {
    id: 5,
    name: "Combo Churrasco (Carvão + Sal Grosso)",
    price: 35.0,
    stock: 120,
    tag: "Combo",
    keywords: ["churrasco", "carvão", "carvao", "combo", "sal grosso"],
  },
];

export interface DiscountResult {
  finalPrice: number;
  discountApplied: number;
  totalValue: number;
  discountPercent: number;
  tier: string;
}

export function applyVolumeDiscount(qty: number, price: number): DiscountResult {
  let discountPercent = 0;
  let tier = "Padrão";
  if (qty >= 50) {
    discountPercent = 10;
    tier = "Atacado Tier 2";
  } else if (qty > 10) {
    discountPercent = 5;
    tier = "Atacado Tier 1";
  }

  const finalPrice = +(price * (1 - discountPercent / 100)).toFixed(2);
  const totalValue = +(finalPrice * qty).toFixed(2);
  const discountApplied = +((price - finalPrice) * qty).toFixed(2);

  return { finalPrice, discountApplied, totalValue, discountPercent, tier };
}

export interface PaymentTerms {
  eligible: boolean;
  options: string[];
  message: string;
}

export function checkPaymentTerms(clientScore: number): PaymentTerms {
  if (clientScore > 800) {
    return {
      eligible: true,
      options: ["Boleto 30 dias", "Boleto 60 dias", "Boleto 90 dias"],
      message: `Verifiquei seu Score (${clientScore} pontos). ✅ Consigo liberar Boleto 30/60/90 dias sem juros. Posso emitir?`,
    };
  }
  return {
    eligible: false,
    options: ["Pix", "Cartão"],
    message: `Seu Score atual (${clientScore} pontos) permite pagamento via Pix ou Cartão. Deseja prosseguir?`,
  };
}

export function suggestCombo(product: Product): string | null {
  if (!product.crossSell) return null;
  const crossProduct = products.find((p) => p.id === product.crossSell!.productId);
  if (!crossProduct) return null;
  return `🍺 Tenho as ${product.name}! ${product.crossSell.message}`;
}

export function findProduct(text: string): Product | undefined {
  const lower = text.toLowerCase();
  return products.find((p) => p.keywords.some((k) => lower.includes(k)));
}

export function extractQuantity(text: string): number {
  const match = text.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 1;
}

export const chartData = [
  { hour: "08h", vendas: 800 },
  { hour: "09h", vendas: 1400 },
  { hour: "10h", vendas: 2200 },
  { hour: "11h", vendas: 3100 },
  { hour: "12h", vendas: 3800 },
  { hour: "13h", vendas: 2900 },
  { hour: "14h", vendas: 4200 },
  { hour: "15h", vendas: 5100 },
  { hour: "16h", vendas: 4600 },
  { hour: "17h", vendas: 3900 },
  { hour: "18h", vendas: 3200 },
];

export const funnelData = [
  { stage: "Conversas Iniciadas", value: 48, fill: "hsl(217, 91%, 60%)" },
  { stage: "Orçamentos Enviados", value: 32, fill: "hsl(200, 80%, 55%)" },
  { stage: "Negociações", value: 22, fill: "hsl(180, 70%, 50%)" },
  { stage: "Pedidos Fechados", value: 14, fill: "hsl(160, 84%, 39%)" },
];

export function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
