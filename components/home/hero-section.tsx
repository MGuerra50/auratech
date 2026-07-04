"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { HeroBentoGrid } from "@/components/home/hero-bento-grid";
import { getHeroSlide, heroLayouts } from "@/data/hero-slides";
import { useHeroFlip } from "@/hooks/use-hero-flip";
import { fetchProducts } from "@/lib/api/products";
import { buildHeroSlideFromProduct } from "@/lib/hero-from-products";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

export function HeroSection() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [heroProducts, setHeroProducts] = useState<Product[]>([]);

  const onBeforeLayoutApply = useCallback((from: number, to: number) => {
    if (from === heroLayouts.length - 1 && to === 0) {
      setSlideIndex((current) => (current + 1) % 3);
    }
  }, []);

  const { layoutIndex, currentLayout, goToLayout, containerRef } = useHeroFlip({
    flipEnabled: isDesktop,
    onBeforeLayoutApply,
  });

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    let cancelled = false;

    fetchProducts("launch")
      .then((products) => {
        if (!cancelled) {
          setHeroProducts(products.slice(0, 3));
        }
      })
      .catch(() => {
        if (!cancelled) {
          setHeroProducts([]);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const slide = useMemo(() => {
    const product = heroProducts[slideIndex % heroProducts.length];

    if (product) {
      return buildHeroSlideFromProduct(slideIndex, currentLayout, product);
    }

    return getHeroSlide(slideIndex, currentLayout);
  }, [slideIndex, currentLayout, heroProducts]);

  return (
    <section className="px-4 pt-6 lg:px-6 lg:pt-8">
      <HeroBentoGrid ref={containerRef} slide={slide} />

      <div className="mt-4 flex items-center justify-center gap-2">
        {heroLayouts.map((layout, index) => (
          <button
            key={layout}
            type="button"
            onClick={() => goToLayout(index)}
            aria-label={`Ir para layout ${index + 1}`}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              layoutIndex === index
                ? "w-6 bg-accent"
                : "w-2 bg-border hover:bg-muted",
            )}
          />
        ))}
      </div>
    </section>
  );
}
