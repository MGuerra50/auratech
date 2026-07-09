export interface OfferDeal {
  productId: string;
  title: string;
  image: string;
  vendor: string;
  originalPrice: number;
  salePrice: number;
  discountPercent: number;
  stock: number;
  stockTotal: number;
  badge?: "new" | "discount";
  hasCountdown?: boolean;
  ctaLabel?: "add" | "options";
}

export interface OfferCarouselSection {
  id: string;
  title: string;
  subtitle?: string;
  deals: OfferDeal[];
}

export interface FlashDeal {
  productId: string;
  title: string;
  image: string;
  originalPrice: number;
  salePrice: number;
  endsAt: string;
}

export interface OffersPageData {
  hero: {
    tagline: string;
    headline: string;
    highlight: string;
    description: string;
    maxDiscountLabel: string;
  };
  flashDeal: FlashDeal;
  carouselSections: OfferCarouselSection[];
  dealOfTheDayEndsAt: string;
}
