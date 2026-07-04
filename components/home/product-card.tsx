"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  className?: string;
  featured?: boolean;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
}

export function ProductCard({
  product,
  className,
  featured = false,
}: ProductCardProps) {
  const { showToast } = useToast();

  const handleAdd = () => {
    showToast(`${product.title} adicionado ao carrinho`);
  };

  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl border border-border bg-surface",
        className,
      )}
    >
      <div
        className={cn(
          "relative aspect-[4/3] overflow-hidden bg-surface-elevated",
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
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex-1">
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
            {product.category}
          </p>
          <h3 className="mt-1 font-medium text-foreground line-clamp-2">
            {product.title}
          </h3>
          <p className="mt-2 font-display text-lg font-semibold text-accent">
            {formatPrice(product.price)}
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
