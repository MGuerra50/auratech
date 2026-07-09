import Image from "next/image";
import Link from "next/link";
import { Package, Truck } from "lucide-react";
import { OrderStatusBadge } from "@/components/orders/order-status-badge";
import {
  formatOrderDate,
  paymentMethodLabels,
} from "@/lib/orders";
import { formatPrice } from "@/lib/format-price";
import type { Order } from "@/types/order";

interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-muted">
            Pedido #{order.code}
          </p>
          <p className="mt-1 text-sm text-foreground">
            {formatOrderDate(order.createdAt)}
          </p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <OrderStatusBadge status={order.status} />
          <p className="font-display text-lg font-semibold text-accent">
            {formatPrice(order.total)}
          </p>
        </div>
      </div>

      <div className="space-y-3 px-5 py-4">
        {order.items.map((item) => (
          <div key={`${order.id}-${item.productId}-${item.title}`} className="flex gap-4">
            <Link
              href={`/products/${item.productId}`}
              className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-surface-elevated"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                sizes="80px"
              />
            </Link>

            <div className="min-w-0 flex-1">
              <Link href={`/products/${item.productId}`}>
                <h3 className="font-medium text-foreground transition-colors hover:text-accent">
                  {item.title}
                </h3>
              </Link>
              {item.variantLabel && (
                <p className="mt-0.5 text-xs text-muted">{item.variantLabel}</p>
              )}
              <p className="mt-2 text-sm text-muted">
                {item.quantity}x {formatPrice(item.unitPrice)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-surface-elevated/50 px-5 py-4 text-sm">
        <div className="flex items-center gap-2 text-muted">
          <Package className="h-4 w-4 shrink-0" />
          <span>{paymentMethodLabels[order.paymentMethod]}</span>
          {order.discount > 0 && (
            <span className="text-accent">
              · Desconto {formatPrice(order.discount)}
            </span>
          )}
        </div>

        {order.trackingCode && order.status === "shipped" && (
          <div className="flex items-center gap-2 font-mono text-xs text-foreground">
            <Truck className="h-4 w-4 text-accent" />
            Rastreio: {order.trackingCode}
          </div>
        )}
      </div>
    </article>
  );
}
