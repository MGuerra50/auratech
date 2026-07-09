import type {
  PaginatedProductsResponse,
  ProductResponse,
  ProductsResponse,
} from "@/types/api";
import type { Product } from "@/types/product";

type ProductFilter = "launch" | "featured";

const PAGE_SIZE = 25;

async function parseJson<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`Erro ao buscar produtos (${response.status})`);
  }

  return response.json() as Promise<T>;
}

export async function fetchProducts(
  filter?: ProductFilter,
): Promise<Product[]> {
  const query = filter ? `?filter=${filter}` : "";
  const data = await parseJson<ProductsResponse>(
    await fetch(`/api/products${query}`),
  );

  return data.products;
}

export async function fetchProductById(id: string): Promise<Product> {
  const data = await parseJson<ProductResponse>(
    await fetch(`/api/products?id=${encodeURIComponent(id)}`),
  );

  return data.product;
}

export async function fetchProductsByCategory(
  categorySlug: string,
  offset = 0,
  limit = PAGE_SIZE,
): Promise<PaginatedProductsResponse> {
  const params = new URLSearchParams({
    category: categorySlug,
    offset: String(offset),
    limit: String(limit),
  });

  return parseJson<PaginatedProductsResponse>(
    await fetch(`/api/products?${params.toString()}`),
  );
}
