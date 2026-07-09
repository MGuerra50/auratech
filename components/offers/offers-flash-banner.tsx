import Link from "next/link";
import { Zap } from "lucide-react";
import { OffersCountdown } from "@/components/offers/offers-countdown";
import { HorizontalBanner } from "@/components/ui/horizontal-banner";
import { formatPrice } from "@/lib/format-price";
import type { FlashDeal } from "@/types/offer";

interface OffersFlashBannerProps {
  flashDeal: FlashDeal;
}

export function OffersFlashBanner({ flashDeal }: OffersFlashBannerProps) {
  return (
    <HorizontalBanner
      rounded="rounded-[1.75rem]"
      contentClassName="flex min-w-0 flex-col gap-6 p-5 lg:p-6 xl:flex-row xl:items-center xl:justify-between"
    >
      <div className="min-w-0 text-center xl:text-left">
        <div className="inline-flex items-center gap-2 rounded-full bg-background/30 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-foreground backdrop-blur-sm">
          <Zap className="h-3.5 w-3.5" />
          Oferta relâmpago
        </div>
        <h2 className="mt-3 font-display text-xl font-bold text-foreground sm:text-2xl">
          {flashDeal.title}
        </h2>
        <p className="mt-1 text-sm text-foreground/80">Por tempo limitado</p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-3 xl:justify-start">
          <span className="font-display text-2xl font-bold text-foreground sm:text-3xl">
            {formatPrice(flashDeal.salePrice)}
          </span>
          <span className="text-sm text-foreground/60 line-through">
            {formatPrice(flashDeal.originalPrice)}
          </span>
          <Link
            href={`/products/${flashDeal.productId}`}
            className="inline-flex h-10 items-center rounded-full bg-amber-400 px-5 text-sm font-semibold text-background transition-colors hover:bg-amber-300"
          >
            Ver oferta
          </Link>
        </div>
      </div>

      <div className="w-full min-w-0 max-w-sm self-center xl:max-w-xs xl:shrink-0">
        <OffersCountdown
          endsAt={flashDeal.endsAt}
          className="grid grid-cols-4 gap-2"
        />
      </div>
    </HorizontalBanner>
  );
}
