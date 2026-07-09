import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryProductList } from "@/components/categories/category-product-list";
import { categories, getCategoryBySlug } from "@/data/categories";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return { title: "Categoria não encontrada | Aura Tech" };
  }

  return {
    title: `${category.name} | Aura Tech`,
    description: `Produtos de ${category.name} com curadoria premium.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  return (
    <div className="px-4 py-6 lg:px-6 lg:py-8">
      <CategoryProductList key={category.slug} category={category} />
    </div>
  );
}
