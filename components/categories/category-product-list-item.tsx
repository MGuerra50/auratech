"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { getProductUnitPrice } from "@/data/products";
import { formatPrice } from "@/lib/format-price";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import type { Product } from "@/types/product";

interface CategoryProductListItemProps {
  product: Product;
  index: number;
  observeItem: (index: number, element: HTMLElement | null) => void | (() => void);
}

function getDefaultVariant(product: Product) {
  return product.variants?.[0];
}

export function CategoryProductListItem({
  product,
  index,
  observeItem,
}: CategoryProductListItemProps) {
  const itemRef = useRef<HTMLElement>(null);
  const { showToast } = useToast();
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const cleanup = observeItem(index, itemRef.current);
    return () => cleanup?.();
  }, [index, observeItem]);

  const handleAdd = () => {
    const variant = getDefaultVariant(product);

    addItem({
      productId: product.id,
      title: product.title,
      image: product.image,
      unitPrice: getProductUnitPrice(product, variant?.id),
      variantId: variant?.id,
      variantLabel: variant?.label,
    });

    showToast(`${product.title} adicionado ao carrinho`);
  };

  return (
    <article
      ref={itemRef}
      className={cn(
        "flex gap-4 rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-accent/30",
      )}
    >
      <Link
        href={`/products/${product.id}`}
        className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-surface-elevated sm:h-32 sm:w-32"
      >
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover"
          sizes="128px"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div className="min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
            {product.category}
          </p>
          <Link href={`/products/${product.id}`}>
            <h3 className="mt-1 font-medium text-foreground transition-colors hover:text-accent">
              {product.title}
            </h3>
          </Link>
          <p className="mt-2 line-clamp-2 text-sm text-muted">
            {product.description}
          </p>
          <p className="mt-3 font-display text-lg font-semibold text-accent">
            {formatPrice(getProductUnitPrice(product))}
          </p>
        </div>

        <Button size="sm" variant="primary" className="shrink-0" onClick={handleAdd}>
          <Plus className="h-4 w-4" />
          Adicionar
        </Button>
      </div>
    </article>
  );
}
