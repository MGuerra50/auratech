import { NextResponse } from "next/server";
import {
  getAllProducts,
  getProductById,
  getProductsByFilter,
  type ProductFilter,
} from "@/lib/products";

const VALID_FILTERS = new Set<ProductFilter>(["launch", "featured"]);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const filter = searchParams.get("filter");

  if (id) {
    const product = getProductById(id);

    if (!product) {
      return NextResponse.json(
        { error: "Produto não encontrado" },
        { status: 404 },
      );
    }

    return NextResponse.json({ product });
  }

  if (filter) {
    if (!VALID_FILTERS.has(filter as ProductFilter)) {
      return NextResponse.json(
        { error: "Filtro inválido. Use launch ou featured." },
        { status: 400 },
      );
    }

    return NextResponse.json({
      products: getProductsByFilter(filter as ProductFilter),
    });
  }

  return NextResponse.json({ products: getAllProducts() });
}
