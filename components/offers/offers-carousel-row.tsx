import { OfferDealCard } from "@/components/offers/offer-deal-card";
import type { OfferCarouselSection } from "@/types/offer";

interface OffersCarouselRowProps {
  section: OfferCarouselSection;
}

export function OffersCarouselRow({ section }: OffersCarouselRowProps) {
  return (
    <section id={section.id} className="min-w-0 space-y-5">
      <div>
        <h2 className="font-display text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
          {section.title}
        </h2>
        {section.subtitle && (
          <p className="mt-1 text-sm text-muted">{section.subtitle}</p>
        )}
      </div>

      <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {section.deals.map((deal, index) => (
          <OfferDealCard
            key={`${section.id}-${deal.productId}-${index}`}
            deal={deal}
          />
        ))}
      </div>
    </section>
  );
}
