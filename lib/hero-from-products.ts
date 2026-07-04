import { getBlocksForLayout } from "@/data/hero-slides";
import type { HeroLayout, HeroSlide } from "@/types/hero";
import type { Product } from "@/types/product";

function getProductBlockImages(product: Product) {
  return {
    main: product.image,
    topRight: product.images[1] ?? product.image,
    bottomRight: product.images[2] ?? product.image,
  };
}

export function buildHeroSlideFromProduct(
  slideIndex: number,
  layout: HeroLayout,
  product: Product,
): HeroSlide {
  return {
    id: product.id,
    title: product.title,
    subtitle: product.description,
    ctaLabel: "Ver produto",
    ctaHref: `/products/${product.id}`,
    layout,
    blocks: getBlocksForLayout(slideIndex, layout, getProductBlockImages(product)),
  };
}
