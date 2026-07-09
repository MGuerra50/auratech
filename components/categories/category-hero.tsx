import Link from "next/link";
import { HorizontalBanner } from "@/components/ui/horizontal-banner";
import type { Category } from "@/types/category";

interface CategoryHeroProps {
  category: Category;
}

export function CategoryHero({ category }: CategoryHeroProps) {
  return (
    <HorizontalBanner contentClassName="px-6 py-10 lg:px-12 lg:py-14">
      <div className="max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted">
          Curadoria Aura Tech
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-foreground lg:text-6xl">
          {category.headline}
        </h1>
        <p className="mt-4 max-w-lg text-sm text-muted lg:text-base">
          Explore setups premium com {category.name.toLowerCase()} selecionados
          para performance, design e conforto no dia a dia.
        </p>
        <Link
          href={`/categorias/${category.slug}`}
          className="mt-6 inline-flex h-11 items-center justify-center rounded-full border border-foreground/20 bg-foreground px-6 text-sm font-semibold text-background transition-colors hover:bg-foreground/90"
        >
          Comprar por categoria
        </Link>
      </div>
    </HorizontalBanner>
  );
}
