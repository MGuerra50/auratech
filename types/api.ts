import type { Product } from "@/types/product";

export interface ProductsResponse {
  products: Product[];
}

export interface ProductResponse {
  product: Product;
}

export interface PaginatedProductsResponse {
  products: Product[];
  total: number;
  hasMore: boolean;
  offset: number;
  limit: number;
}
