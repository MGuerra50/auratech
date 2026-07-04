"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { HeroBlockConfig } from "@/types/hero";

interface HeroBentoBlockProps {
  block: HeroBlockConfig;
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  isMain?: boolean;
}

export function HeroBentoBlock({
  block,
  title,
  subtitle,
  ctaLabel,
  isMain = false,
}: HeroBentoBlockProps) {
  return (
    <article
      className="hero-block relative min-h-[160px] overflow-hidden rounded-2xl border border-border lg:min-h-0"
      data-flip-id={block.id}
      style={{ gridArea: block.gridArea }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={block.image}
          alt=""
          fill
          className="object-cover"
          sizes={isMain ? "(max-width: 1024px) 100vw, 60vw" : "(max-width: 1024px) 50vw, 30vw"}
          priority={isMain}
        />
      </div>

      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent",
          isMain && "from-background/95 via-background/50",
        )}
      />

      <div
        className={cn(
          "relative flex h-full flex-col justify-end p-4 lg:p-6",
          isMain && "p-6 lg:p-8",
        )}
      >
        {block.label && !isMain && (
          <Badge variant="accent" className="mb-2 w-fit">
            {block.label}
          </Badge>
        )}

        {isMain && title && (
          <>
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-accent">
              Premium Minimal Setups
            </p>
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground lg:text-4xl">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-2 max-w-md text-sm text-muted lg:text-base">
                {subtitle}
              </p>
            )}
            {ctaLabel && (
              <div className="mt-4">
                <Button size="md">{ctaLabel}</Button>
              </div>
            )}
          </>
        )}
      </div>
    </article>
  );
}
