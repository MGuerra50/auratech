"use client";

import Link from "next/link";
import { useState } from "react";
import { AddressForm } from "@/components/checkout/address-form";
import { CheckoutOrderSummary } from "@/components/checkout/checkout-order-summary";
import { CheckoutSection } from "@/components/checkout/checkout-section";
import { CheckoutSubmitBar } from "@/components/checkout/checkout-submit-bar";
import { PaymentMethodSelector } from "@/components/checkout/payment-method-selector";
import { PersonalInfoForm } from "@/components/checkout/personal-info-form";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import {
  initialCheckoutFormData,
  type CheckoutFormData,
} from "@/types/checkout";

export function CheckoutPageClient() {
  const items = useCartStore((state) => state.items);
  const [form, setForm] = useState<CheckoutFormData>(initialCheckoutFormData);

  const handleChange = (field: keyof CheckoutFormData, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  if (items.length === 0) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
        <h1 className="font-display text-2xl font-bold text-foreground">
          Seu carrinho está vazio
        </h1>
        <p className="max-w-md text-sm text-muted">
          Adicione produtos ao carrinho antes de finalizar a compra.
        </p>
        <Link href="/">
          <Button>Continuar comprando</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Checkout
          </h1>
          <p className="mt-2 text-sm text-muted">
            Preencha seus dados para concluir a compra.
          </p>
        </div>

        <CheckoutSection step={1} title="Dados pessoais">
          <PersonalInfoForm values={form} onChange={handleChange} />
        </CheckoutSection>

        <CheckoutSection step={2} title="Endereço de entrega">
          <AddressForm values={form} onChange={handleChange} />
        </CheckoutSection>

        <CheckoutSection step={3} title="Forma de pagamento">
          <PaymentMethodSelector
            value={form.paymentMethod}
            onChange={(method) => handleChange("paymentMethod", method)}
          />
        </CheckoutSection>

        <CheckoutSubmitBar />
      </div>

      <CheckoutOrderSummary paymentMethod={form.paymentMethod} />
    </div>
  );
}
