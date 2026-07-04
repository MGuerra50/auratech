import { products } from "@/data/products";
import type { Product } from "@/types/product";

export function getAllProducts(): Product[] {
  return products;
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
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
