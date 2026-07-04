"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { formatPrice } from "@/lib/format-price";
import { useCartStore } from "@/store/cart-store";

export function CartSummary() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const closeCart = useCartStore((state) => state.closeCart);
  const { showToast } = useToast();

  const total = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0,
  );

  const handleCheckout = () => {
    if (items.length === 0) {
      showToast("Seu carrinho está vazio");
      return;
    }

    closeCart();
    router.push("/checkout");
  };

  return (
    <div className="border-t border-border px-6 py-5">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm text-muted">Subtotal</span>
        <span className="font-display text-lg font-semibold text-foreground">
          {formatPrice(total)}
        </span>
      </div>

      <Button className="w-full" size="md" onClick={handleCheckout}>
        Finalizar compra
      </Button>
    </div>
  );
}
