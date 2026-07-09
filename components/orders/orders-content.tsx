"use client";

import { useMemo, useState } from "react";
import { OrderCard } from "@/components/orders/order-card";
import { OrdersEmptyState } from "@/components/orders/orders-empty-state";
import { OrdersGuard } from "@/components/orders/orders-guard";
import { OrdersHero } from "@/components/orders/orders-hero";
import { filterOrders, getOrdersByUserEmail } from "@/lib/orders";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";
import type { OrderFilter } from "@/types/order";

const filters: { id: OrderFilter; label: string }[] = [
  { id: "all", label: "Todos" },
  { id: "active", label: "Em andamento" },
  { id: "delivered", label: "Entregues" },
];

function OrdersPageInner() {
  const user = useAuthStore((state) => state.user);
  const [filter, setFilter] = useState<OrderFilter>("all");

  const orders = useMemo(() => {
    if (!user) return [];
    return getOrdersByUserEmail(user.email);
  }, [user]);

  const filteredOrders = useMemo(
    () => filterOrders(orders, filter),
    [orders, filter],
  );

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-w-0 flex-col gap-8 overflow-x-hidden px-4 py-6 lg:gap-10 lg:px-6 lg:py-8">
      <OrdersHero userName={user.name} orderCount={orders.length} />

      {orders.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              className={cn(
                "rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
                filter === item.id
                  ? "border-accent bg-accent-muted text-accent"
                  : "border-border bg-surface text-muted hover:border-muted hover:text-foreground",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      {orders.length === 0 ? (
        <OrdersEmptyState />
      ) : filteredOrders.length === 0 ? (
        <p className="rounded-2xl border border-border bg-surface p-6 text-sm text-muted">
          Nenhum pedido encontrado para este filtro.
        </p>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}

export function OrdersContent() {
  return (
    <OrdersGuard>
      <OrdersPageInner />
    </OrdersGuard>
  );
}
