"use client";

import { forwardRef } from "react";
import { HeroBentoBlock } from "@/components/home/hero-bento-block";
import { cn } from "@/lib/utils";
import type { HeroLayout, HeroSlide } from "@/types/hero";

const layoutClassMap: Record<HeroLayout, string> = {
  initial: "hero-grid-initial",
  topExpanded: "hero-grid-topExpanded",
  bottomSplit: "hero-grid-bottomSplit",
};

interface HeroBentoGridProps {
  slide: HeroSlide;
}

export const HeroBentoGrid = forwardRef<HTMLDivElement, HeroBentoGridProps>(
  function HeroBentoGrid({ slide }, ref) {
    return (
      <div
        ref={ref}
        className={cn("hero-bento-grid", layoutClassMap[slide.layout])}
      >
        {slide.blocks.map((block) => (
          <HeroBentoBlock
            key={block.id}
            block={block}
            isMain={block.id === "main"}
            title={block.id === "main" ? slide.title : undefined}
            subtitle={block.id === "main" ? slide.subtitle : undefined}
            ctaLabel={block.id === "main" ? slide.ctaLabel : undefined}
            ctaHref={block.id === "main" ? slide.ctaHref : undefined}
          />
        ))}
      </div>
    );
  },
);
