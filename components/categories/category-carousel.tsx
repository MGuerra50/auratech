"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { CategoryCard } from "@/components/categories/category-card";
import { IconButton } from "@/components/ui/icon-button";
import { categories } from "@/data/categories";

export function CategoryCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (direction: "left" | "right") => {
    const track = trackRef.current;
    if (!track) return;

    const amount = direction === "left" ? -280 : 280;
    track.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="space-y-5">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Navegue por estilo
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
            Categorias em destaque
          </h2>
        </div>

        <div className="hidden gap-2 sm:flex">
          <IconButton
            aria-label="Categorias anteriores"
            variant="default"
            size="md"
            onClick={() => scrollBy("left")}
          >
            <ChevronLeft className="h-4 w-4" />
          </IconButton>
          <IconButton
            aria-label="Próximas categorias"
            variant="default"
            size="md"
            onClick={() => scrollBy("right")}
          >
            <ChevronRight className="h-4 w-4" />
          </IconButton>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory"
      >
        {categories.map((category) => (
          <CategoryCard key={category.slug} category={category} />
        ))}
      </div>
    </section>
  );
}
