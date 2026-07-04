"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";
import { CartQuantityStepper } from "@/components/cart/cart-quantity-stepper";
import { IconButton } from "@/components/ui/icon-button";
import { formatPrice } from "@/lib/format-price";
import { useCartStore, type CartItem } from "@/store/cart-store";

interface CartLineItemProps {
  item: CartItem;
}

export function CartLineItem({ item }: CartLineItemProps) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <div className="flex gap-4 border-b border-border py-4">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-border bg-surface-elevated">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate font-medium text-foreground">{item.title}</p>
            {item.variantLabel && (
              <p className="mt-1 text-xs text-muted">{item.variantLabel}</p>
            )}
            <p className="mt-2 text-sm font-semibold text-accent">
              {formatPrice(item.unitPrice)}
            </p>
          </div>

          <IconButton
            aria-label={`Remover ${item.title}`}
            variant="ghost"
            size="sm"
            onClick={() => removeItem(item.cartLineId)}
          >
            <Trash2 className="h-4 w-4" />
          </IconButton>
        </div>

        <CartQuantityStepper
          quantity={item.quantity}
          onDecrease={() =>
            updateQuantity(item.cartLineId, item.quantity - 1)
          }
          onIncrease={() =>
            updateQuantity(item.cartLineId, item.quantity + 1)
          }
        />
      </div>
    </div>
  );
}
