"use client";

import { DollarSign, ShoppingBag, TrendingUp, Package } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface KpiData {
  revenue: number;
  orderCount: number;
  avgOrderValue: number;
  itemsSold: number;
}

const CARDS = [
  { key: "revenue" as const, label: "Revenue", icon: DollarSign, format: formatPrice },
  { key: "orderCount" as const, label: "Orders", icon: ShoppingBag, format: (v: number) => String(v) },
  { key: "avgOrderValue" as const, label: "Avg Order", icon: TrendingUp, format: formatPrice },
  { key: "itemsSold" as const, label: "Items Sold", icon: Package, format: (v: number) => String(v) },
];

export default function KpiCards({ data }: { data: KpiData }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      {CARDS.map(({ key, label, icon: Icon, format }) => (
        <div
          key={key}
          className="rounded-xl border border-brand-border bg-white p-4 md:p-5 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-2">
            <Icon size={18} strokeWidth={1.5} className="text-brand-primary" />
            <span className="text-xs font-medium text-brand-text-muted">{label}</span>
          </div>
          <p className="font-mono text-xl font-medium text-brand-text">
            {format(data[key])}
          </p>
        </div>
      ))}
    </div>
  );
}
