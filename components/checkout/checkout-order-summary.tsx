"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { formatPrice } from "@/lib/format-price";
import { calculateCheckoutTotals } from "@/lib/checkout-pricing";
import { useCartStore } from "@/store/cart-store";
import type { PaymentMethod } from "@/types/checkout";

interface CheckoutOrderSummaryProps {
  paymentMethod: PaymentMethod;
}

export function CheckoutOrderSummary({
  paymentMethod,
}: CheckoutOrderSummaryProps) {
  const items = useCartStore((state) => state.items);

  const subtotal = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0,
  );
  const { pixDiscount, total } = calculateCheckoutTotals(
    subtotal,
    paymentMethod,
  );

  return (
    <aside className="rounded-2xl border border-border bg-surface p-6 lg:sticky lg:top-24">
      <h2 className="mb-4 font-display text-lg font-semibold text-foreground">
        Resumo do pedido
      </h2>

      <div className="max-h-72 space-y-4 overflow-y-auto pr-1">
        {items.map((item) => (
          <div key={item.cartLineId} className="flex gap-3">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-border bg-surface-elevated">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                sizes="56px"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">
                {item.title}
              </p>
              {item.variantLabel && (
                <p className="text-xs text-muted">{item.variantLabel}</p>
              )}
              <p className="mt-1 text-xs text-muted">
                {item.quantity}x {formatPrice(item.unitPrice)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-3 border-t border-border pt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted">Subtotal</span>
          <span className="text-foreground">{formatPrice(subtotal)}</span>
        </div>

        <AnimatePresence>
          {paymentMethod === "pix" && pixDiscount > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center justify-between overflow-hidden text-sm"
            >
              <span className="text-accent">Desconto PIX (5%)</span>
              <span className="font-medium text-accent">
                - {formatPrice(pixDiscount)}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between border-t border-border pt-3">
          <span className="font-medium text-foreground">Total</span>
          <span className="font-display text-xl font-semibold text-accent">
            {formatPrice(total)}
          </span>
        </div>
      </div>
    </aside>
  );
}
