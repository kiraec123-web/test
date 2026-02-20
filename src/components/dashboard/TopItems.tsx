"use client";

import { formatPrice } from "@/lib/utils";

interface TopItem {
  name: string;
  quantity: number;
  revenue: number;
}

export default function TopItems({ items }: { items: TopItem[] }) {
  return (
    <div className="rounded-xl border border-brand-border bg-white p-4 md:p-5 shadow-sm">
      <h3 className="font-serif text-lg text-brand-text mb-4">Top Items</h3>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={item.name} className="flex items-center gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-primary-light text-xs font-medium text-brand-primary">
              {i + 1}
            </span>
            <span className="flex-1 text-sm text-brand-text">{item.name}</span>
            <span className="text-xs text-brand-text-muted">{item.quantity} sold</span>
            <span className="font-mono text-sm text-brand-text">
              {formatPrice(item.revenue)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
