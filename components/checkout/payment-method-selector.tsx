"use client";

import { Barcode, CreditCard, QrCode } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { PaymentMethod } from "@/types/checkout";

interface PaymentMethodSelectorProps {
  value: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
}

const paymentOptions: {
  id: PaymentMethod;
  label: string;
  description: string;
  icon: typeof CreditCard;
  badge?: string;
}[] = [
  {
    id: "credit_card",
    label: "Cartão de crédito",
    description: "Parcelamento em até 12x",
    icon: CreditCard,
  },
  {
    id: "pix",
    label: "PIX",
    description: "Aprovação imediata",
    icon: QrCode,
    badge: "5% OFF",
  },
  {
    id: "boleto",
    label: "Boleto",
    description: "Vencimento em 3 dias úteis",
    icon: Barcode,
  },
];

export function PaymentMethodSelector({
  value,
  onChange,
}: PaymentMethodSelectorProps) {
  return (
    <div className="grid gap-3">
      {paymentOptions.map((option) => {
        const Icon = option.icon;
        const isSelected = value === option.id;

        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            className={cn(
              "flex items-center gap-4 rounded-xl border p-4 text-left transition-colors",
              isSelected
                ? "border-accent bg-accent-muted"
                : "border-border bg-surface-elevated hover:border-muted",
            )}
          >
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-lg",
                isSelected ? "bg-accent text-background" : "bg-surface text-muted",
              )}
            >
              <Icon className="h-5 w-5" />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-medium text-foreground">{option.label}</p>
                {option.badge && (
                  <Badge variant="accent">{option.badge}</Badge>
                )}
              </div>
              <p className="text-sm text-muted">{option.description}</p>
            </div>

            <div
              className={cn(
                "h-4 w-4 rounded-full border",
                isSelected
                  ? "border-accent bg-accent"
                  : "border-border bg-transparent",
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
