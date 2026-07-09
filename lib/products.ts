import { products } from "@/data/products";
import { categories, getCategoryBySlug } from "@/data/categories";
import type { Product } from "@/types/product";
import {
  getPaginatedProductsByCategory,
  getProductsByCategory,
} from "@/lib/category-products";

export function getAllProducts(): Product[] {
  return products;
}

export function getProductById(id: string): Product | undefined {
  const direct = products.find((product) => product.id === id);
  if (direct) return direct;

  for (const category of categories) {
    const found = getProductsByCategory(category.name).find(
      (product) => product.id === id,
    );
    if (found) return found;
  }

  return undefined;
}

export function getAllProductIds(): string[] {
  return products.map((product) => product.id);
}

export function getLaunchProducts(): Product[] {
  return products.filter((product) => product.isNew);
}

export function getFeaturedSetupProducts(): Product[] {
  return products.filter((product) => product.featured);
}

export type ProductFilter = "launch" | "featured";

export function getProductsByFilter(filter: ProductFilter): Product[] {
  if (filter === "launch") return getLaunchProducts();
  return getFeaturedSetupProducts();
}

export function getProductsByCategorySlug(
  slug: string,
  offset = 0,
  limit = 25,
) {
  const category = getCategoryBySlug(slug);

  if (!category) {
    return null;
  }

  return getPaginatedProductsByCategory(category.name, offset, limit);
}
