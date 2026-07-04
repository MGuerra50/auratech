import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductDetailClient } from "@/app/(main)/products/[id]/product-detail-client";
import { getAllProductIds, getProductById } from "@/lib/products";
import type { Metadata } from "next";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return getAllProductIds().map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return { title: "Produto não encontrado | Aura Tech" };
  }

  return {
    title: `${product.title} | Aura Tech`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="px-4 py-6 lg:px-6 lg:py-8">
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted"
      >
        <Link href="/" className="transition-colors hover:text-accent">
          Início
        </Link>
        <span>/</span>
        <span>{product.category}</span>
        <span>/</span>
        <span className="text-foreground">{product.title}</span>
      </nav>

      <ProductDetailClient product={product} />
    </div>
  );
}
