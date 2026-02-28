import { formatCurrency, type Product } from "@/data/products";
import { Package } from "lucide-react";

interface ChatProductCardProps {
  product: Product;
  quantity: number;
  finalPrice: number;
  totalValue: number;
  discountPercent: number;
}

export function ChatProductCard({ product, quantity, finalPrice, totalValue, discountPercent }: ChatProductCardProps) {
  return (
    <div className="bg-white/[0.06] rounded-xl p-3 border border-white/[0.08] my-1.5">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Package className="w-6 h-6 text-primary" strokeWidth={1.5} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-foreground truncate">{product.name}</p>
          <p className="text-[11px] text-muted-foreground">Qtd: {quantity} un.</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-bold text-emerald-400">{formatCurrency(finalPrice)}/un</span>
            {discountPercent > 0 && (
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded-full font-medium">
                -{discountPercent}%
              </span>
            )}
          </div>
          <p className="text-xs font-semibold text-foreground mt-1">Total: {formatCurrency(totalValue)}</p>
        </div>
      </div>
    </div>
  );
}
