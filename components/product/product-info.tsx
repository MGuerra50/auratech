"use client";

import { Badge } from "@/components/ui/badge";
import { AddToCartButton } from "@/components/product/add-to-cart-button";
import { ProductVariantSelector } from "@/components/product/product-variant-selector";
import { formatPrice } from "@/lib/format-price";
import { getProductUnitPrice } from "@/data/products";
import type { Product } from "@/types/product";

interface ProductInfoProps {
  product: Product;
  selectedVariantId?: string;
  onVariantChange: (variantId: string) => void;
}

export function ProductInfo({
  product,
  selectedVariantId,
  onVariantChange,
}: ProductInfoProps) {
  const selectedVariant = product.variants?.find(
    (variant) => variant.id === selectedVariantId,
  );
  const unitPrice = getProductUnitPrice(product, selectedVariantId);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge variant="muted">{product.category}</Badge>
          {product.isNew && <Badge variant="accent">Novo</Badge>}
        </div>

        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
          {product.title}
        </h1>

        <p className="mt-4 font-display text-3xl font-semibold text-accent">
          {formatPrice(unitPrice)}
        </p>
      </div>

      <p className="text-base leading-relaxed text-muted">{product.description}</p>

      {product.specs && product.specs.length > 0 && (
        <div className="rounded-xl border border-border bg-surface p-4">
          <h2 className="mb-3 font-medium text-foreground">Especificações</h2>
          <dl className="grid gap-3 sm:grid-cols-2">
            {product.specs.map((spec) => (
              <div key={spec.label}>
                <dt className="text-xs uppercase tracking-wider text-muted">
                  {spec.label}
                </dt>
                <dd className="mt-1 text-sm text-foreground">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {product.variants && product.variants.length > 0 && (
        <ProductVariantSelector
          variants={product.variants}
          selectedVariantId={selectedVariantId}
          onSelect={onVariantChange}
          label={
            product.category === "Teclados"
              ? "Switch mecânico"
              : "Variação de hardware"
          }
        />
      )}

      <AddToCartButton
        product={product}
        variantId={selectedVariantId}
        variantLabel={selectedVariant?.label}
        openDrawer
        className="w-full sm:w-auto"
      />
    </div>
  );
}
