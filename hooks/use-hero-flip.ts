"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Flip } from "@/lib/gsap";
import type { HeroLayout } from "@/types/hero";
import { heroLayouts } from "@/data/hero-slides";

const SLIDE_DURATION = 5000;
const FLIP_DURATION = 1.2;

interface UseHeroFlipOptions {
  flipEnabled: boolean;
}

interface UseHeroFlipReturn {
  layoutIndex: number;
  currentLayout: HeroLayout;
  isTransitioning: boolean;
  isPaused: boolean;
  goToLayout: (index: number) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export function useHeroFlip({
  flipEnabled,
}: UseHeroFlipOptions): UseHeroFlipReturn {
  const [layoutIndex, setLayoutIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isTransitioningRef = useRef(false);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const animateToLayout = useCallback(
    (nextIndex: number) => {
      if (isTransitioningRef.current) return;

      const container = containerRef.current;
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (!flipEnabled || prefersReducedMotion || !container) {
        setLayoutIndex(nextIndex);
        return;
      }

      isTransitioningRef.current = true;
      setIsTransitioning(true);

      const state = Flip.getState(container.querySelectorAll(".hero-block"));

      setLayoutIndex(nextIndex);

      requestAnimationFrame(() => {
        Flip.from(state, {
          duration: FLIP_DURATION,
          ease: "power3.inOut",
          absolute: true,
          stagger: 0.05,
          onComplete: () => {
            isTransitioningRef.current = false;
            setIsTransitioning(false);
          },
        });
      });
    },
    [flipEnabled],
  );

  const scheduleNext = useCallback(() => {
    clearTimer();
    if (isPaused) return;

    timerRef.current = setTimeout(() => {
      const next = (layoutIndex + 1) % heroLayouts.length;
      animateToLayout(next);
    }, SLIDE_DURATION);
  }, [animateToLayout, clearTimer, isPaused, layoutIndex]);

  const goToLayout = useCallback(
    (index: number) => {
      if (index === layoutIndex) return;
      clearTimer();
      animateToLayout(index);
    },
    [animateToLayout, clearTimer, layoutIndex],
  );

  useEffect(() => {
    if (!isTransitioning && !isPaused) {
      scheduleNext();
    }
    return clearTimer;
  }, [layoutIndex, isTransitioning, isPaused, scheduleNext, clearTimer]);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        clearTimer();
        setIsPaused(true);
      } else {
        setIsPaused(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, [clearTimer]);

  return {
    layoutIndex,
    currentLayout: heroLayouts[layoutIndex],
    isTransitioning,
    isPaused,
    goToLayout,
    containerRef,
  };
}
