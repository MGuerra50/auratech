import Link from "next/link";
import { Flame, Gem } from "lucide-react";
import { OffersCountdown } from "@/components/offers/offers-countdown";
import { HorizontalBanner } from "@/components/ui/horizontal-banner";

interface OffersDealDayBannerProps {
  endsAt: string;
}

export function OffersDealDayBanner({ endsAt }: OffersDealDayBannerProps) {
  return (
    <HorizontalBanner
      rounded="rounded-[1.75rem]"
      contentClassName="p-5 sm:p-6"
    >
      <div className="flex min-w-0 flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-background/30 backdrop-blur-sm">
            <Flame className="h-5 w-5 text-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground/90">
              Oferta do dia: termina em
            </p>
            <p className="font-display text-xl font-bold text-foreground sm:text-2xl">
              Não perca os melhores descontos
            </p>
          </div>
        </div>

        <div className="w-full min-w-0 max-w-md self-center lg:max-w-sm">
          <OffersCountdown
            endsAt={endsAt}
            variant="banner"
            className="grid grid-cols-4 gap-2 sm:gap-3"
          />
        </div>

        <Link
          href="#ofertas-relampago"
          className="inline-flex items-center gap-2 self-start text-sm font-semibold text-foreground underline underline-offset-4 transition-opacity hover:opacity-80 lg:self-center"
        >
          <Gem className="h-4 w-4" />
          Garantir esta oferta agora
        </Link>
      </div>
    </HorizontalBanner>
  );
}
