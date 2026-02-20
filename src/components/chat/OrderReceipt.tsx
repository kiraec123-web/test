import type { Order } from "@/lib/types";
import { formatPrice, formatOrderNumber } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

export default function OrderReceipt({ order }: { order: Order }) {
  return (
    <div className="rounded-xl border border-brand-border bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <CheckCircle2 size={18} strokeWidth={1.5} className="text-brand-accent-green" />
        <span className="font-medium text-sm text-brand-text">Order Confirmed</span>
        <span className="font-mono text-xs text-brand-text-muted ml-auto">
          {formatOrderNumber(order.order_number)}
        </span>
      </div>
      <div className="space-y-2 mb-3">
        {order.items.map((item, i) => (
          <div key={i} className="flex justify-between text-sm">
            <span className="text-brand-text">{item.name}</span>
            <span className="font-mono text-brand-text">{formatPrice(item.itemTotal)}</span>
          </div>
        ))}
      </div>
      <div className="border-t border-brand-border pt-2 space-y-1">
        <div className="flex justify-between text-xs text-brand-text-muted">
          <span>Subtotal</span>
          <span className="font-mono">{formatPrice(order.subtotal)}</span>
        </div>
        <div className="flex justify-between text-xs text-brand-text-muted">
          <span>Tax</span>
          <span className="font-mono">{formatPrice(order.tax)}</span>
        </div>
        <div className="flex justify-between text-sm font-medium text-brand-text">
          <span>Total</span>
          <span className="font-mono">{formatPrice(order.total)}</span>
        </div>
      </div>
    </div>
  );
}
