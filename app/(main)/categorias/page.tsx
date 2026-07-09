import type { Metadata } from "next";
import { CategoryCarousel } from "@/components/categories/category-carousel";
import { CategoryHero } from "@/components/categories/category-hero";
import { categories } from "@/data/categories";

const featuredCategory = categories[0];

export const metadata: Metadata = {
  title: "Categorias | Aura Tech",
  description: "Explore monitores, teclados, cadeiras, acessórios e iluminação.",
};

export default function CategoriesPage() {
  return (
    <div className="flex flex-col gap-10 px-4 py-6 lg:gap-12 lg:px-6 lg:py-8">
      <CategoryHero category={featuredCategory} />
      <CategoryCarousel />
    </div>
  );
}
