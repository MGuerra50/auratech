import type { PaymentMethod } from "@/types/checkout";

export const PIX_DISCOUNT_RATE = 0.05;

export function calculateCheckoutTotals(
  subtotal: number,
  paymentMethod: PaymentMethod,
) {
  const pixDiscount =
    paymentMethod === "pix" ? subtotal * PIX_DISCOUNT_RATE : 0;
  const total = subtotal - pixDiscount;

  return { subtotal, pixDiscount, total };
}
