"use client";

import { useEffect, useRef } from "react";
import type { HeroImageEffect } from "@/types/hero";
import { gsap } from "@/lib/gsap";

interface UseHeroImageMotionOptions {
  effect: HeroImageEffect;
  isPaused: boolean;
  isActive: boolean;
}

export function useHeroImageMotion({
  effect,
  isPaused,
  isActive,
}: UseHeroImageMotionOptions) {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = imageRef.current;
    if (!el || !isActive || isPaused) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.set(el, { transformOrigin: "center center", force3D: true });

      if (effect === "zoomIn") {
        gsap.fromTo(
          el,
          { scale: 1 },
          {
            scale: 1.08,
            duration: 12,
            yoyo: true,
            repeat: -1,
            ease: "none",
          },
        );
      } else if (effect === "panRight") {
        gsap.fromTo(
          el,
          { x: "-5%" },
          {
            x: "5%",
            duration: 14,
            yoyo: true,
            repeat: -1,
            ease: "none",
          },
        );
      } else if (effect === "zoomOut") {
        gsap.fromTo(
          el,
          { scale: 1.08 },
          {
            scale: 1,
            duration: 10,
            yoyo: true,
            repeat: -1,
            ease: "none",
          },
        );
      }
    }, el);

    return () => ctx.revert();
  }, [effect, isPaused, isActive]);

  useEffect(() => {
    const el = imageRef.current;
    if (!el) return;

    if (isPaused) {
      gsap.killTweensOf(el);
      gsap.set(el, { clearProps: "transform" });
    }
  }, [isPaused]);

  return imageRef;
}
