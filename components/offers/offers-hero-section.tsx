import Link from "next/link";
import { ArrowRight, RotateCcw, Shield, Truck } from "lucide-react";
import { OffersFlashBanner } from "@/components/offers/offers-flash-banner";
import { HorizontalBanner } from "@/components/ui/horizontal-banner";
import type { OffersPageData } from "@/types/offer";

interface OffersHeroSectionProps {
  data: OffersPageData;
}

const trustItems = [
  { icon: Truck, label: "Frete grátis acima de R$ 299" },
  { icon: RotateCcw, label: "Troca fácil em 30 dias" },
  { icon: Shield, label: "Pagamento seguro + PIX 5% off" },
];

export function OffersHeroSection({ data }: OffersHeroSectionProps) {
  const { hero, flashDeal } = data;

  return (
    <section className="min-w-0 space-y-6">
      <HorizontalBanner contentClassName="px-6 py-8 lg:px-10 lg:py-12">
        <div className="absolute right-6 top-6 hidden rounded-full bg-amber-400 px-4 py-2 text-center sm:block">
          <p className="font-display text-xs font-bold uppercase tracking-wide text-background">
            {hero.maxDiscountLabel}
          </p>
        </div>

        <div className="relative max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-amber-400">
            {hero.tagline}
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-foreground lg:text-5xl">
            {hero.headline}{" "}
            <span className="text-accent">{hero.highlight}</span>
          </h1>
          <p className="mt-4 max-w-lg text-sm text-muted lg:text-base">
            {hero.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="#ofertas-relampago"
              className="inline-flex h-12 items-center justify-center gap-2.5 rounded-lg bg-accent px-6 text-base font-medium text-background shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-colors hover:bg-accent-hover"
            >
              Comprar agora
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/categorias"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-border bg-background/40 px-6 text-base font-medium text-foreground backdrop-blur-sm transition-colors hover:border-accent hover:text-accent"
            >
              Explorar categorias
            </Link>
          </div>
        </div>

        <div className="relative mt-8 grid gap-4 border-t border-border/60 pt-6 sm:grid-cols-3">
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="flex items-center gap-3 rounded-xl border border-border/60 bg-background/50 px-4 py-3 backdrop-blur-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-muted text-accent">
                  <Icon className="h-4 w-4" />
                </div>
                <p className="text-sm text-foreground">{item.label}</p>
              </div>
            );
          })}
        </div>
      </HorizontalBanner>

      <OffersFlashBanner flashDeal={flashDeal} />
    </section>
  );
}
