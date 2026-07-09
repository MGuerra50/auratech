import { DEFAULT_PRODUCT_IMAGE } from "@/lib/product-images";
import type { Category } from "@/types/category";

export const categories: Category[] = [
  {
    slug: "monitores",
    name: "Monitores",
    tagline: "Imersão total",
    headline: "MONITORES",
    gradient: "from-zinc-900 via-zinc-800 to-zinc-950",
    accentColor: "#f4f4f5",
    image: DEFAULT_PRODUCT_IMAGE,
  },
  {
    slug: "teclados",
    name: "Teclados",
    tagline: "Precisão mecânica",
    headline: "TECLADOS",
    gradient: "from-red-600 via-red-500 to-rose-700",
    accentColor: "#ffffff",
    image: DEFAULT_PRODUCT_IMAGE,
  },
  {
    slug: "cadeiras",
    name: "Cadeiras",
    tagline: "Conforto premium",
    headline: "CADEIRAS",
    gradient: "from-cyan-600 via-teal-500 to-cyan-800",
    accentColor: "#ffffff",
    image: DEFAULT_PRODUCT_IMAGE,
  },
  {
    slug: "acessorios",
    name: "Acessórios",
    tagline: "Detalhes que elevam",
    headline: "ACESSÓRIOS",
    gradient: "from-amber-400 via-yellow-400 to-amber-500",
    accentColor: "#050506",
    image: DEFAULT_PRODUCT_IMAGE,
  },
  {
    slug: "iluminacao",
    name: "Iluminação",
    tagline: "Ambiente perfeito",
    headline: "ILUMINAÇÃO",
    gradient: "from-violet-600 via-purple-500 to-fuchsia-700",
    accentColor: "#ffffff",
    image: DEFAULT_PRODUCT_IMAGE,
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}

export function getCategoryByName(name: string): Category | undefined {
  return categories.find((category) => category.name === name);
}
