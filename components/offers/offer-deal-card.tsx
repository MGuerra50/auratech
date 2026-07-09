"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { OffersCountdown } from "@/components/offers/offers-countdown";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { offersPageData } from "@/data/offers";
import { formatPrice } from "@/lib/format-price";
import { getProductById } from "@/lib/products";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import type { OfferDeal } from "@/types/offer";

interface OfferDealCardProps {
  deal: OfferDeal;
  className?: string;
}

export function OfferDealCard({ deal, className }: OfferDealCardProps) {
  const { showToast } = useToast();
  const addItem = useCartStore((state) => state.addItem);
  const stockPercent = Math.round((deal.stock / deal.stockTotal) * 100);

  const handleAdd = () => {
    const product = getProductById(deal.productId);

    if (!product) {
      showToast("Produto indisponível no momento");
      return;
    }

    const variant = product.variants?.[0];

    addItem({
      productId: product.id,
      title: product.title,
      image: product.image,
      unitPrice: deal.salePrice,
      variantId: variant?.id,
      variantLabel: variant?.label,
    });

    showToast(`${product.title} adicionado ao carrinho`);
  };

  return (
    <article
      className={cn(
        "flex min-w-0 w-full flex-col overflow-hidden rounded-2xl border border-border bg-surface",
        className,
      )}
    >
      <div className="border-b border-border">
        <div className="flex items-start justify-between gap-2 px-4 pt-4">
          {deal.badge === "new" ? (
            <span className="rounded-md bg-emerald-500/15 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-400">
              Novo
            </span>
          ) : deal.badge === "discount" ? (
            <span className="rounded-md bg-red-500/15 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-red-400">
              -{deal.discountPercent}% off
            </span>
          ) : (
            <span />
          )}

          <Link
            href={`/products/${deal.productId}`}
            className="shrink-0 text-[11px] font-medium text-muted transition-colors hover:text-accent"
          >
            Visualização rápida
          </Link>
        </div>

        <Link
          href={`/products/${deal.productId}`}
          className="relative mt-3 block aspect-[4/3] w-full overflow-hidden bg-surface-elevated"
        >
          <Image
            src={deal.image}
            alt={deal.title}
            fill
            className="h-full w-full object-cover"
            sizes="(max-width: 640px) 100vw, 33vw"
          />
        </Link>

        {deal.hasCountdown && (
          <div className="px-4 py-4">
            <div className="rounded-xl border border-border bg-surface-elevated px-2 py-2">
              <OffersCountdown
                endsAt={offersPageData.dealOfTheDayEndsAt}
                variant="compact"
                className="grid min-w-0 grid-cols-4 gap-1"
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs text-muted">{deal.vendor}</p>
        <Link href={`/products/${deal.productId}`}>
          <h3 className="mt-1 line-clamp-2 font-medium text-foreground transition-colors hover:text-accent">
            {deal.title}
          </h3>
        </Link>

        <div className="mt-3 flex items-center gap-2">
          <span className="font-display text-lg font-semibold text-emerald-400">
            {formatPrice(deal.salePrice)}
          </span>
          <span className="text-sm text-muted line-through">
            {formatPrice(deal.originalPrice)}
          </span>
        </div>

        <div className="mt-4">
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="text-muted">{deal.stock} em estoque</span>
            <span className="text-muted">{stockPercent}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-surface-elevated">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-500"
              style={{ width: `${stockPercent}%` }}
            />
          </div>
        </div>

        {deal.ctaLabel === "options" ? (
          <Link
            href={`/products/${deal.productId}`}
            className="mt-4 inline-flex h-8 w-full items-center justify-center gap-1.5 rounded-lg bg-accent px-3 text-xs font-medium text-background transition-colors hover:bg-accent-hover"
          >
            Ver opções
          </Link>
        ) : (
          <Button size="sm" className="mt-4 w-full" onClick={handleAdd}>
            <Plus className="h-4 w-4" />
            Adicionar ao carrinho
          </Button>
        )}
      </div>
    </article>
  );
}
