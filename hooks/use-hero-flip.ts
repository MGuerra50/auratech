"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Flip, gsap } from "@/lib/gsap";
import type { HeroLayout } from "@/types/hero";
import { heroLayouts } from "@/data/hero-slides";

const SLIDE_DURATION = 5000;
const FLIP_DURATION = 1.2;

interface UseHeroFlipOptions {
  flipEnabled: boolean;
  onBeforeLayoutApply?: (from: number, to: number) => void;
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
  onBeforeLayoutApply,
}: UseHeroFlipOptions): UseHeroFlipReturn {
  const [layoutIndex, setLayoutIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const layoutIndexRef = useRef(0);
  const isTransitioningRef = useRef(false);
  const isPausedRef = useRef(false);
  const flipEnabledRef = useRef(flipEnabled);
  const onBeforeLayoutApplyRef = useRef(onBeforeLayoutApply);
  const scheduleAutoplayRef = useRef<() => void>(() => {});

  useEffect(() => {
    flipEnabledRef.current = flipEnabled;
    onBeforeLayoutApplyRef.current = onBeforeLayoutApply;
    isPausedRef.current = isPaused;
  }, [flipEnabled, onBeforeLayoutApply, isPaused]);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const runTransition = useCallback(
    (nextIndex: number) => {
      if (isTransitioningRef.current) return;

      const fromIndex = layoutIndexRef.current;
      if (fromIndex === nextIndex) return;

      const container = containerRef.current;
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (!flipEnabledRef.current || prefersReducedMotion || !container) {
        onBeforeLayoutApplyRef.current?.(fromIndex, nextIndex);
        layoutIndexRef.current = nextIndex;
        setLayoutIndex(nextIndex);
        scheduleAutoplayRef.current();
        return;
      }

      const blocks = container.querySelectorAll(".hero-block");
      const state = Flip.getState(blocks);

      isTransitioningRef.current = true;
      setIsTransitioning(true);

      flushSync(() => {
        onBeforeLayoutApplyRef.current?.(fromIndex, nextIndex);
        layoutIndexRef.current = nextIndex;
        setLayoutIndex(nextIndex);
      });

      Flip.from(state, {
        targets: blocks,
        duration: FLIP_DURATION,
        ease: "power3.inOut",
        absolute: true,
        stagger: 0.05,
        onComplete: () => {
          gsap.set(blocks, { clearProps: "transform" });
          isTransitioningRef.current = false;
          setIsTransitioning(false);
          scheduleAutoplayRef.current();
        },
      });
    },
    [],
  );

  const scheduleAutoplay = useCallback(() => {
    clearTimer();
    if (isPausedRef.current) return;

    timerRef.current = setTimeout(() => {
      const next =
        (layoutIndexRef.current + 1) % heroLayouts.length;
      runTransition(next);
    }, SLIDE_DURATION);
  }, [clearTimer, runTransition]);

  useEffect(() => {
    scheduleAutoplayRef.current = scheduleAutoplay;
  }, [scheduleAutoplay]);

  const goToLayout = useCallback(
    (index: number) => {
      if (index === layoutIndexRef.current) return;
      clearTimer();

      const blocks = containerRef.current?.querySelectorAll(".hero-block");
      if (blocks && blocks.length > 0) {
        gsap.killTweensOf(blocks);
      }

      isTransitioningRef.current = false;
      setIsTransitioning(false);
      runTransition(index);
    },
    [clearTimer, runTransition],
  );

  useEffect(() => {
    scheduleAutoplay();
    return clearTimer;
  }, [scheduleAutoplay, clearTimer]);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        clearTimer();
        setIsPaused(true);
      } else {
        setIsPaused(false);
        if (!isTransitioningRef.current) {
          scheduleAutoplayRef.current();
        }
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
