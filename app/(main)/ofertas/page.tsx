import type { Metadata } from "next";
import { OffersCarouselRow } from "@/components/offers/offers-carousel-row";
import { OffersDealDayBanner } from "@/components/offers/offers-deal-day-banner";
import { OffersHeroSection } from "@/components/offers/offers-hero-section";
import { offersPageData } from "@/data/offers";

export const metadata: Metadata = {
  title: "Ofertas | Aura Tech",
  description: "Ofertas exclusivas em equipamentos premium para o seu setup.",
};

export default function OffersPage() {
  return (
    <div className="flex min-w-0 flex-col gap-10 overflow-x-hidden px-4 py-6 lg:gap-12 lg:px-6 lg:py-8">
      <OffersHeroSection data={offersPageData} />

      <div className="flex min-w-0 flex-col gap-12">
        {offersPageData.carouselSections.map((section) => (
          <OffersCarouselRow key={section.id} section={section} />
        ))}
      </div>

      <OffersDealDayBanner endsAt={offersPageData.dealOfTheDayEndsAt} />
    </div>
  );
}
