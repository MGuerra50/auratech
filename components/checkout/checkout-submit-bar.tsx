"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { useCartStore } from "@/store/cart-store";

interface CheckoutSubmitBarProps {
  disabled?: boolean;
}

export function CheckoutSubmitBar({ disabled = false }: CheckoutSubmitBarProps) {
  const clearCart = useCartStore((state) => state.clearCart);
  const { showToast } = useToast();

  const handleSubmit = () => {
    showToast("Pedido confirmado — portfolio demo");
    clearCart();
  };

  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <Button
        type="button"
        size="lg"
        className="w-full"
        disabled={disabled}
        onClick={handleSubmit}
      >
        Confirmar pedido
      </Button>
    </div>
  );
}
