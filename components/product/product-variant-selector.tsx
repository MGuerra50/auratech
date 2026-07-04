"use client";

import { cn } from "@/lib/utils";
import type { ProductVariant } from "@/types/product";

interface ProductVariantSelectorProps {
  variants: ProductVariant[];
  selectedVariantId?: string;
  onSelect: (variantId: string) => void;
  label?: string;
}

export function ProductVariantSelector({
  variants,
  selectedVariantId,
  onSelect,
  label = "Variação",
}: ProductVariantSelectorProps) {
  if (variants.length === 0) return null;

  return (
    <div className="space-y-3">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {variants.map((variant) => {
          const isSelected = variant.id === selectedVariantId;

          return (
            <button
              key={variant.id}
              type="button"
              onClick={() => onSelect(variant.id)}
              className={cn(
                "rounded-lg border px-3 py-2 text-sm transition-colors",
                isSelected
                  ? "border-accent bg-accent-muted text-accent"
                  : "border-border bg-surface-elevated text-foreground hover:border-muted",
              )}
            >
              {variant.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
