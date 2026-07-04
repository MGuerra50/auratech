"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { HeroBentoGrid } from "@/components/home/hero-bento-grid";
import { getHeroSlide, heroLayouts } from "@/data/hero-slides";
import { useHeroFlip } from "@/hooks/use-hero-flip";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [hoverPaused, setHoverPaused] = useState(false);
  const prevLayoutRef = useRef(0);

  const {
    layoutIndex,
    currentLayout,
    isTransitioning,
    isPaused: visibilityPaused,
    goToLayout,
    containerRef,
  } = useHeroFlip({ flipEnabled: isDesktop });

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const prev = prevLayoutRef.current;
    if (prev === heroLayouts.length - 1 && layoutIndex === 0) {
      setSlideIndex((current) => (current + 1) % 3);
    }
    prevLayoutRef.current = layoutIndex;
  }, [layoutIndex]);

  const slide = useMemo(
    () => getHeroSlide(slideIndex, currentLayout),
    [slideIndex, currentLayout],
  );

  const isPaused =
    isTransitioning || visibilityPaused || hoverPaused;

  return (
    <section
      className="px-4 pt-6 lg:px-6 lg:pt-8"
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => setHoverPaused(false)}
    >
      <HeroBentoGrid
        ref={containerRef}
        slide={slide}
        isPaused={isPaused}
        isActive={!isTransitioning}
      />

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
