import { cn } from "@/lib/utils";
import { orderStatusLabels } from "@/lib/orders";
import type { OrderStatus } from "@/types/order";

const statusStyles: Record<OrderStatus, string> = {
  processing: "bg-accent-muted text-accent border-accent/20",
  shipped: "bg-amber-400/15 text-amber-400 border-amber-400/20",
  delivered: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  cancelled: "bg-surface-elevated text-muted border-border",
};

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-md border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider",
        statusStyles[status],
      )}
    >
      {orderStatusLabels[status]}
    </span>
  );
}
