import type { OrderStatus } from "@/lib/types";

const STATUS_STYLES: Record<OrderStatus, string> = {
  pending: "bg-amber-100 text-amber-800",
  "in-progress": "bg-blue-100 text-blue-800",
  completed: "bg-emerald-100 text-emerald-800",
};

const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "Pending",
  "in-progress": "In Progress",
  completed: "Completed",
};

export default function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span
      className={`${STATUS_STYLES[status]} rounded-full px-2.5 py-0.5 text-xs font-medium`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
