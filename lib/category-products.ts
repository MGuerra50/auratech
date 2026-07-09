import { products } from "@/data/products";
import type { Product } from "@/types/product";

const TARGET_PER_CATEGORY = 75;

function expandCategoryProducts(category: string): Product[] {
  const base = products.filter((product) => product.category === category);

  if (base.length === 0) {
    return [];
  }

  const expanded: Product[] = [...base];
  let seed = 0;

  while (expanded.length < TARGET_PER_CATEGORY) {
    const template = base[seed % base.length];
    const edition = expanded.length + 1;

    expanded.push({
      ...template,
      id: `${template.id}-ed-${edition}`,
      title: `${template.title} · Série ${edition}`,
      price: template.price + Math.floor(edition / 4) * 120,
      isNew: edition % 5 === 0,
      featured: false,
    });

    seed += 1;
  }

  return expanded;
}

export function getProductsByCategory(category: string): Product[] {
  return expandCategoryProducts(category);
}

export function getPaginatedProductsByCategory(
  category: string,
  offset: number,
  limit: number,
) {
  const all = getProductsByCategory(category);
  const safeOffset = Math.max(0, offset);
  const safeLimit = Math.max(1, limit);
  const slice = all.slice(safeOffset, safeOffset + safeLimit);

  return {
    products: slice,
    total: all.length,
    hasMore: safeOffset + slice.length < all.length,
    offset: safeOffset,
    limit: safeLimit,
  };
}
