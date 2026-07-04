"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { formatPrice } from "@/lib/format-price";
import { cn } from "@/lib/utils";
import { getProductUnitPrice } from "@/data/products";
import { useCartStore } from "@/store/cart-store";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  className?: string;
  featured?: boolean;
}

function getDefaultVariant(product: Product) {
  return product.variants?.[0];
}

export function ProductCard({
  product,
  className,
  featured = false,
}: ProductCardProps) {
  const { showToast } = useToast();
  const addItem = useCartStore((state) => state.addItem);

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
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl border border-border bg-surface",
        className,
      )}
    >
      <Link
        href={`/products/${product.id}`}
        className={cn(
          "relative block aspect-[4/3] overflow-hidden bg-surface-elevated",
          featured && "aspect-[4/5] lg:aspect-auto lg:h-full lg:min-h-[320px]",
        )}
      >
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes={
            featured
              ? "(max-width: 1024px) 100vw, 50vw"
              : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          }
        />
        {product.isNew && (
          <Badge variant="accent" className="absolute left-3 top-3">
            Novo
          </Badge>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex-1">
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
            {product.category}
          </p>
          <Link href={`/products/${product.id}`}>
            <h3 className="mt-1 font-medium text-foreground line-clamp-2 transition-colors hover:text-accent">
              {product.title}
            </h3>
          </Link>
          <p className="mt-2 font-display text-lg font-semibold text-accent">
            {formatPrice(getProductUnitPrice(product))}
          </p>
        </div>

        <Button
          size="sm"
          variant="primary"
          className="w-full"
          onClick={handleAdd}
        >
          <Plus className="h-4 w-4" />
          Adicionar
        </Button>
      </div>
    </article>
  );
}
