import type { Metadata } from "next";
import { CheckoutPageClient } from "@/app/(checkout)/checkout/checkout-page-client";

export const metadata: Metadata = {
  title: "Checkout | Aura Tech",
  description: "Finalize sua compra na Aura Tech",
};

export default function CheckoutPage() {
  return <CheckoutPageClient />;
}
