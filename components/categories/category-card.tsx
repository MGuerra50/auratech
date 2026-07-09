import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/types/category";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  category: Category;
  className?: string;
}

export function CategoryCard({ category, className }: CategoryCardProps) {
  const isLightCard = category.slug === "acessorios";

  return (
    <Link
      href={`/categorias/${category.slug}`}
      className={cn(
        "group relative flex h-[280px] w-[240px] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-[2rem] p-5 transition-transform duration-300 hover:scale-[1.02] sm:h-[300px] sm:w-[260px]",
        `bg-gradient-to-br ${category.gradient}`,
        className,
      )}
    >
      <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/20 blur-2xl" />

      <div className="relative z-10">
        <p
          className="text-xs font-medium"
          style={{ color: category.accentColor, opacity: 0.85 }}
        >
          {category.tagline}
        </p>
        <h3
          className="mt-2 font-display text-2xl font-bold uppercase leading-none tracking-tight"
          style={{ color: category.accentColor }}
        >
          {category.headline}
        </h3>
      </div>

      <div className="relative z-10 flex items-end justify-between gap-3">
        <span
          className={cn(
            "inline-flex h-9 items-center rounded-full px-4 text-xs font-semibold uppercase tracking-wide transition-colors",
            isLightCard
              ? "bg-background text-foreground group-hover:bg-background/90"
              : "border border-white/30 text-white group-hover:bg-white/10",
          )}
        >
          Explorar
        </span>

        <div className="relative h-24 w-24 shrink-0">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-contain drop-shadow-lg transition-transform duration-500 group-hover:scale-110"
            sizes="96px"
          />
        </div>
      </div>
    </Link>
  );
}
