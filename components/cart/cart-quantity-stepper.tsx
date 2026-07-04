"use client";

import { Minus, Plus } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";

interface CartQuantityStepperProps {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
}

export function CartQuantityStepper({
  quantity,
  onDecrease,
  onIncrease,
}: CartQuantityStepperProps) {
  return (
    <div className="flex items-center gap-1 rounded-lg border border-border bg-surface-elevated p-1">
      <IconButton
        aria-label="Diminuir quantidade"
        variant="ghost"
        size="sm"
        onClick={onDecrease}
      >
        <Minus className="h-3.5 w-3.5" />
      </IconButton>
      <span className="min-w-8 text-center text-sm font-medium text-foreground">
        {quantity}
      </span>
      <IconButton
        aria-label="Aumentar quantidade"
        variant="ghost"
        size="sm"
        onClick={onIncrease}
      >
        <Plus className="h-3.5 w-3.5" />
      </IconButton>
    </div>
  );
}
