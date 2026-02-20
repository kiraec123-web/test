import type { Order } from "@/lib/types";
import { formatOrderNumber, formatTime } from "@/lib/utils";
import StatusBadge from "@/components/shared/StatusBadge";

export default function TicketCard({ order }: { order: Order }) {
  return (
    <div className="rounded-xl border border-stone-700 bg-stone-800 p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-sm font-medium text-white">
          {formatOrderNumber(order.order_number)}
        </span>
        <StatusBadge status={order.status} />
      </div>
      <ul className="space-y-1.5 mb-3">
        {order.items.map((item, i) => (
          <li key={i} className="text-sm text-stone-300">
            {item.name}
          </li>
        ))}
      </ul>
      <p className="text-xs text-stone-500 font-mono">
        {formatTime(order.created_at)}
      </p>
    </div>
  );
}
