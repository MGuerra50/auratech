"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { heroLayouts, HERO_LAYOUT_INDEX } from "@/data/hero-slides";
import { resetHeroGridBlocks } from "@/lib/hero-grid-reset";
import { Flip, gsap } from "@/lib/gsap";
import type { HeroLayout } from "@/types/hero";

const SLIDE_DURATION = 5000;
const FLIP_DURATION = 1.2;
const FLIP_CLEAR_PROPS =
  "transform,opacity,top,left,right,bottom,width,height,position,gridArea,gridColumn,gridRow,gridColumnStart,gridColumnEnd,gridRowStart,gridRowEnd,zIndex";

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

function finishTransition(
  container: HTMLElement | null,
  isTransitioningRef: React.RefObject<boolean>,
  setIsTransitioning: (value: boolean) => void,
  scheduleAutoplay: () => void,
) {
  if (container) {
    resetHeroGridBlocks(container);
  }

  isTransitioningRef.current = false;
  setIsTransitioning(false);
  scheduleAutoplay();
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

  const runStandardTransition = useCallback(
    (fromIndex: number, nextIndex: number, container: HTMLElement) => {
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
        clearProps: FLIP_CLEAR_PROPS,
        onComplete: () => {
          requestAnimationFrame(() => {
            finishTransition(
              container,
              isTransitioningRef,
              setIsTransitioning,
              scheduleAutoplayRef.current,
            );
          });
        },
      });
    },
    [],
  );

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

      runStandardTransition(fromIndex, nextIndex, container);
    },
    [runStandardTransition],
  );

  const scheduleAutoplay = useCallback(() => {
    clearTimer();
    if (isPausedRef.current) return;

    timerRef.current = setTimeout(() => {
      const next = (layoutIndexRef.current + 1) % heroLayouts.length;
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

      const container = containerRef.current;
      const blocks = container?.querySelectorAll(".hero-block");
      const clones = container?.querySelectorAll(".hero-split-clone");

      if (blocks && blocks.length > 0) {
        gsap.killTweensOf(blocks);
      }
      if (clones && clones.length > 0) {
        gsap.killTweensOf(clones);
      }

      if (container) {
        resetHeroGridBlocks(container);
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
    if (layoutIndex !== HERO_LAYOUT_INDEX.bottomSplit || isTransitioning) return;

    const container = containerRef.current;
    if (!container) return;

    const frame = requestAnimationFrame(() => {
      resetHeroGridBlocks(container);
    });

    return () => cancelAnimationFrame(frame);
  }, [layoutIndex, isTransitioning]);

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
