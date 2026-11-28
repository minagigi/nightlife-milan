'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { getHumanCarouselCopy, type HumanCarouselCopy } from '@/lib/i18n/humanCarouselCopy35';

export type HumanAutoScrollState = 'idle' | 'running' | 'paused-hover' | 'paused-user';

const ORGANIC_DWELL_CADENCE_MS = [4100, 4650, 3850, 5150, 4350, 4900] as const;
const END_OF_TRACK_DWELL_MS = 5800;
const HOVER_RESUME_GRACE_MS = 2600;
const SINGLE_STEP_GLIDE_MS = 760;
const LONG_REWIND_GLIDE_MS = 920;

let clientStaggerCounter = 0;

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

function isRtlElement(el: HTMLElement): boolean {
  if (typeof window === 'undefined') return false;
  return window.getComputedStyle(el).direction === 'rtl';
}

function getNormalizedScrollOffset(el: HTMLElement, isRtl: boolean, maxScroll: number): number {
  const raw = isRtl ? -el.scrollLeft : el.scrollLeft;
  return clamp(raw, 0, maxScroll);
}

function toBrowserScrollLeft(normalizedOffset: number, isRtl: boolean, maxScroll: number): number {
  const clamped = clamp(normalizedOffset, 0, maxScroll);
  return isRtl ? -clamped : clamped;
}

export function getCarouselCardElements(el: HTMLElement): HTMLElement[] {
  return Array.from(el.children).filter(
    (child): child is HTMLElement =>
      child instanceof HTMLElement &&
      child.tagName !== 'SCRIPT' &&
      child.getAttribute('aria-hidden') !== 'true' &&
      child.offsetWidth > 48,
  );
}

function computeCardStepTargetOffset(
  el: HTMLElement,
  stepSign: 1 | -1,
  allowAutoRewind: boolean,
): number {
  const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
  if (maxScroll <= 12) return 0;

  const isRtl = isRtlElement(el);
  const currentOffset = getNormalizedScrollOffset(el, isRtl, maxScroll);

  if (stepSign === 1 && currentOffset >= maxScroll - 8) {
    return allowAutoRewind ? 0 : maxScroll;
  }
  if (stepSign === -1 && currentOffset <= 8) {
    return 0;
  }

  const cards = getCarouselCardElements(el);
  if (cards.length === 0) {
    const fallbackStep = Math.max(240, Math.round(el.clientWidth * 0.78));
    return clamp(currentOffset + stepSign * fallbackStep, 0, maxScroll);
  }

  const containerRect = el.getBoundingClientRect();
  const signedDistances = cards.map((card) => {
    const rect = card.getBoundingClientRect();
    return isRtl ? containerRect.right - rect.right : rect.left - containerRect.left;
  });

  if (stepSign === 1) {
    const nextDist = signedDistances.find((d) => d > 18);
    if (nextDist !== undefined) {
      return clamp(Math.round(currentOffset + nextDist), 0, maxScroll);
    }
    return allowAutoRewind ? 0 : maxScroll;
  }

  const prevCandidates = signedDistances.filter((d) => d < -18);
  if (prevCandidates.length > 0) {
    const prevDist = prevCandidates[prevCandidates.length - 1];
    return clamp(Math.round(currentOffset + prevDist), 0, maxScroll);
  }
  return 0;
}

export interface UseHumanAutoScrollOptions {
  locale?: string | null;
  resetKey?: string | number;
  disabled?: boolean;
}

export function useHumanAutoScroll(
  trackRef: React.RefObject<HTMLElement | null>,
  options: UseHumanAutoScrollOptions = {},
) {
  const { locale = 'en', resetKey, disabled = false } = options;
  const copy = useMemo(() => getHumanCarouselCopy(locale), [locale]);

  const wrapperRef = useRef<HTMLElement | null>(null);
  const staggerSlotRef = useRef<number>(0);
  const hasDoneInitialStaggerRef = useRef<boolean>(false);
  const stepCounterRef = useRef<number>(0);

  const isGlidingRef = useRef<boolean>(false);
  const rafIdRef = useRef<number | null>(null);
  const dwellTimerRef = useRef<number | null>(null);
  const hoverGraceTimerRef = useRef<number | null>(null);
  const scrollDebounceRef = useRef<number | null>(null);

  const inViewportRef = useRef<boolean>(false);
  const tabVisibleRef = useRef<boolean>(true);
  const reducedMotionRef = useRef<boolean>(false);
  const hoverActiveRef = useRef<boolean>(false);
  const focusInsideRef = useRef<boolean>(false);

  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const pointerDragRef = useRef<{
    active: boolean;
    dragging: boolean;
    startX: number;
    startOffset: number;
    isRtl: boolean;
    maxScroll: number;
  } | null>(null);
  const suppressNextClickRef = useRef<boolean>(false);

  const [canScroll, setCanScroll] = useState<boolean>(false);
  const [canScrollPrev, setCanScrollPrev] = useState<boolean>(false);
  const [canScrollNext, setCanScrollNext] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [userPaused, setUserPaused] = useState<boolean>(false);
  const [hoverPaused, setHoverPaused] = useState<boolean>(false);
  const [isVisibleState, setIsVisibleState] = useState<boolean>(false);

  const userPausedRef = useRef<boolean>(false);
  userPausedRef.current = userPaused;

  const cancelGlide = useCallback(() => {
    if (rafIdRef.current !== null) {
      window.cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    if (isGlidingRef.current) {
      isGlidingRef.current = false;
      const el = trackRef.current;
      if (el) {
        el.style.scrollSnapType = '';
        el.style.scrollBehavior = '';
      }
    }
  }, [trackRef]);

  const clearTimers = useCallback(() => {
    if (dwellTimerRef.current !== null) {
      window.clearTimeout(dwellTimerRef.current);
      dwellTimerRef.current = null;
    }
    if (hoverGraceTimerRef.current !== null) {
      window.clearTimeout(hoverGraceTimerRef.current);
      hoverGraceTimerRef.current = null;
    }
  }, []);

  const syncScrollBounds = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
    const scrollable = maxScroll > 12;
    const isRtl = isRtlElement(el);
    const offset = getNormalizedScrollOffset(el, isRtl, maxScroll);

    setCanScroll(scrollable);
    setCanScrollPrev(scrollable && offset > 6);
    setCanScrollNext(scrollable && offset < maxScroll - 6);
    setProgress(scrollable && maxScroll > 0 ? clamp(offset / maxScroll, 0, 1) : 0);
  }, [trackRef]);

  const glideToNormalizedOffset = useCallback(
    (targetOffset: number, onDone?: () => void) => {
      const el = trackRef.current;
      if (!el) return;
      cancelGlide();

      const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
      if (maxScroll <= 12) return;

      const isRtl = isRtlElement(el);
      const startOffset = getNormalizedScrollOffset(el, isRtl, maxScroll);
      const clampedTarget = clamp(targetOffset, 0, maxScroll);
      const delta = clampedTarget - startOffset;

      if (Math.abs(delta) < 2) {
        syncScrollBounds();
        onDone?.();
        return;
      }

      if (reducedMotionRef.current) {
        el.scrollLeft = toBrowserScrollLeft(clampedTarget, isRtl, maxScroll);
        syncScrollBounds();
        onDone?.();
        return;
      }

      const durationMs =
        Math.abs(delta) > el.clientWidth * 3.2 ? LONG_REWIND_GLIDE_MS : SINGLE_STEP_GLIDE_MS;
      const startTime = performance.now();

      isGlidingRef.current = true;
      el.style.scrollSnapType = 'none';
      el.style.scrollBehavior = 'auto';

      const tick = (now: number) => {
        if (!isGlidingRef.current || !trackRef.current) return;
        const elapsed = now - startTime;
        const t = clamp(elapsed / durationMs, 0, 1);
        const eased = easeOutQuart(t);
        const nextNormalized = startOffset + delta * eased;
        el.scrollLeft = toBrowserScrollLeft(nextNormalized, isRtl, maxScroll);

        if (t < 1) {
          rafIdRef.current = window.requestAnimationFrame(tick);
        } else {
          rafIdRef.current = null;
          isGlidingRef.current = false;
          el.scrollLeft = toBrowserScrollLeft(clampedTarget, isRtl, maxScroll);
          window.requestAnimationFrame(() => {
            if (trackRef.current === el && !isGlidingRef.current) {
              el.style.scrollSnapType = '';
              el.style.scrollBehavior = '';
              syncScrollBounds();
              onDone?.();
            }
          });
        }
      };

      rafIdRef.current = window.requestAnimationFrame(tick);
    },
    [cancelGlide, syncScrollBounds, trackRef],
  );

  const pauseForUserAction = useCallback(() => {
    clearTimers();
    cancelGlide();
    hoverActiveRef.current = false;
    setHoverPaused(false);
    setUserPaused(true);
    syncScrollBounds();
  }, [cancelGlide, clearTimers, syncScrollBounds]);

  const scheduleNextAutoStep = useCallback(() => {
    if (dwellTimerRef.current !== null) {
      window.clearTimeout(dwellTimerRef.current);
      dwellTimerRef.current = null;
    }
    const el = trackRef.current;
    if (
      disabled ||
      !el ||
      userPausedRef.current ||
      hoverActiveRef.current ||
      focusInsideRef.current ||
      !inViewportRef.current ||
      !tabVisibleRef.current ||
      reducedMotionRef.current
    ) {
      return;
    }

    const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
    if (maxScroll <= 12) return;

    const isRtl = isRtlElement(el);
    const currentOffset = getNormalizedScrollOffset(el, isRtl, maxScroll);
    const atEnd = currentOffset >= maxScroll - 8;

    const cadenceIdx = (stepCounterRef.current + staggerSlotRef.current) % ORGANIC_DWELL_CADENCE_MS.length;
    const baseDwell = atEnd ? END_OF_TRACK_DWELL_MS : ORGANIC_DWELL_CADENCE_MS[cadenceIdx];
    const staggerBonus = !hasDoneInitialStaggerRef.current ? staggerSlotRef.current * 650 : 0;
    const waitMs = baseDwell + staggerBonus;

    dwellTimerRef.current = window.setTimeout(() => {
      dwellTimerRef.current = null;
      hasDoneInitialStaggerRef.current = true;
      const activeEl = trackRef.current;
      if (
        !activeEl ||
        userPausedRef.current ||
        hoverActiveRef.current ||
        focusInsideRef.current ||
        !inViewportRef.current ||
        !tabVisibleRef.current ||
        reducedMotionRef.current
      ) {
        return;
      }
      const nextTarget = computeCardStepTargetOffset(activeEl, 1, true);
      stepCounterRef.current += 1;
      glideToNormalizedOffset(nextTarget, () => {
        scheduleNextAutoStep();
      });
    }, waitMs);
  }, [disabled, glideToNormalizedOffset, trackRef]);

  // Client stagger assignment (strictly post-SSR for zero hydration mismatch & CLS=0)
  useEffect(() => {
    staggerSlotRef.current = clientStaggerCounter % 4;
    clientStaggerCounter += 1;
  }, []);

  // Reset scroll position & recalculate when dynamic filter/tab key changes
  useEffect(() => {
    if (resetKey === undefined) return;
    const el = trackRef.current;
    if (!el) return;
    cancelGlide();
    el.scrollLeft = 0;
    stepCounterRef.current = 0;
    syncScrollBounds();
  }, [cancelGlide, resetKey, syncScrollBounds, trackRef]);

  // Core observers: reduced-motion, visibilitychange, IntersectionObserver, ResizeObserver, MutationObserver
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const el = trackRef.current;
    const observeTarget = wrapperRef.current || el;
    if (!el || !observeTarget) return;

    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotionRef.current = mql.matches;
    tabVisibleRef.current = document.visibilityState === 'visible';

    syncScrollBounds();

    const onReducedMotionChange = (e: MediaQueryListEvent) => {
      reducedMotionRef.current = e.matches;
      if (e.matches) {
        clearTimers();
        cancelGlide();
      } else {
        scheduleNextAutoStep();
      }
    };

    const onVisibilityChange = () => {
      tabVisibleRef.current = document.visibilityState === 'visible';
      if (!tabVisibleRef.current) {
        clearTimers();
        cancelGlide();
      } else {
        syncScrollBounds();
        scheduleNextAutoStep();
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        const visible = entry.isIntersecting && entry.intersectionRatio >= 0.25;
        inViewportRef.current = visible;
        setIsVisibleState(visible);
        if (visible) {
          syncScrollBounds();
          scheduleNextAutoStep();
        } else {
          clearTimers();
          cancelGlide();
        }
      },
      { threshold: [0, 0.25, 0.6] },
    );
    io.observe(observeTarget);

    const ro = new ResizeObserver(() => {
      syncScrollBounds();
      if (inViewportRef.current && !isGlidingRef.current && dwellTimerRef.current === null) {
        scheduleNextAutoStep();
      }
    });
    ro.observe(el);

    const mo = new MutationObserver(() => {
      syncScrollBounds();
      if (inViewportRef.current && !isGlidingRef.current && dwellTimerRef.current === null) {
        scheduleNextAutoStep();
      }
    });
    mo.observe(el, { childList: true });

    mql.addEventListener('change', onReducedMotionChange);
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      clearTimers();
      cancelGlide();
      if (scrollDebounceRef.current !== null) {
        window.clearTimeout(scrollDebounceRef.current);
      }
      io.disconnect();
      ro.disconnect();
      mo.disconnect();
      mql.removeEventListener('change', onReducedMotionChange);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [cancelGlide, clearTimers, scheduleNextAutoStep, syncScrollBounds, trackRef]);

  // Re-evaluate auto-scroll whenever userPaused clears
  useEffect(() => {
    if (!userPaused) {
      scheduleNextAutoStep();
    }
  }, [userPaused, scheduleNextAutoStep]);

  const setWrapperNode = useCallback((node: HTMLElement | null) => {
    wrapperRef.current = node;
  }, []);

  const stepPrev = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    pauseForUserAction();
    const target = computeCardStepTargetOffset(el, -1, false);
    glideToNormalizedOffset(target);
  }, [glideToNormalizedOffset, pauseForUserAction, trackRef]);

  const stepNext = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    pauseForUserAction();
    const target = computeCardStepTargetOffset(el, 1, false);
    glideToNormalizedOffset(target);
  }, [glideToNormalizedOffset, pauseForUserAction, trackRef]);

  const toggleUserPause = useCallback(() => {
    if (userPausedRef.current) {
      hoverActiveRef.current = false;
      setHoverPaused(false);
      setUserPaused(false);
    } else {
      pauseForUserAction();
    }
  }, [pauseForUserAction]);

  const onPointerEnter = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (e.pointerType !== 'mouse') return;
      if (hoverGraceTimerRef.current !== null) {
        window.clearTimeout(hoverGraceTimerRef.current);
        hoverGraceTimerRef.current = null;
      }
      hoverActiveRef.current = true;
      if (!userPausedRef.current) {
        setHoverPaused(true);
      }
      if (dwellTimerRef.current !== null) {
        window.clearTimeout(dwellTimerRef.current);
        dwellTimerRef.current = null;
      }
      cancelGlide();
    },
    [cancelGlide],
  );

  const onPointerLeave = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (e.pointerType !== 'mouse') return;
      hoverActiveRef.current = false;
      if (hoverGraceTimerRef.current !== null) {
        window.clearTimeout(hoverGraceTimerRef.current);
      }
      hoverGraceTimerRef.current = window.setTimeout(() => {
        hoverGraceTimerRef.current = null;
        if (!hoverActiveRef.current && !focusInsideRef.current && !userPausedRef.current) {
          setHoverPaused(false);
          scheduleNextAutoStep();
        }
      }, HOVER_RESUME_GRACE_MS);
    },
    [scheduleNextAutoStep],
  );

  const onFocusCapture = useCallback(() => {
    focusInsideRef.current = true;
    if (!userPausedRef.current) {
      setHoverPaused(true);
    }
    if (dwellTimerRef.current !== null) {
      window.clearTimeout(dwellTimerRef.current);
      dwellTimerRef.current = null;
    }
    cancelGlide();
  }, [cancelGlide]);

  const onBlurCapture = useCallback(
    (e: React.FocusEvent<HTMLElement>) => {
      const nextTarget = e.relatedTarget as Node | null;
      if (nextTarget && wrapperRef.current?.contains(nextTarget)) {
        return;
      }
      focusInsideRef.current = false;
      if (!hoverActiveRef.current && !userPausedRef.current) {
        setHoverPaused(false);
        scheduleNextAutoStep();
      }
    },
    [scheduleNextAutoStep],
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      const el = trackRef.current;
      if (!el) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const isRtl = isRtlElement(el);
        const dir: 1 | -1 =
          e.key === 'ArrowRight' ? (isRtl ? -1 : 1) : isRtl ? 1 : -1;
        pauseForUserAction();
        glideToNormalizedOffset(computeCardStepTargetOffset(el, dir, false));
      } else if (e.key === 'Home') {
        e.preventDefault();
        pauseForUserAction();
        glideToNormalizedOffset(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        pauseForUserAction();
        const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
        glideToNormalizedOffset(maxScroll);
      }
    },
    [glideToNormalizedOffset, pauseForUserAction, trackRef],
  );

  const onTouchStart = useCallback((e: React.TouchEvent<HTMLElement>) => {
    const t = e.touches[0];
    if (!t) return;
    touchStartRef.current = { x: t.clientX, y: t.clientY };
  }, []);

  const onTouchMove = useCallback(
    (e: React.TouchEvent<HTMLElement>) => {
      const start = touchStartRef.current;
      const t = e.touches[0];
      if (!start || !t) return;
      const dx = t.clientX - start.x;
      const dy = t.clientY - start.y;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 8) {
        touchStartRef.current = null;
        pauseForUserAction();
      }
    },
    [pauseForUserAction],
  );

  const onWheel = useCallback(
    (e: React.WheelEvent<HTMLElement>) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 6) {
        pauseForUserAction();
      }
    },
    [pauseForUserAction],
  );

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      const target = e.target as HTMLElement | null;
      if (target?.closest('button')) return;
      const el = trackRef.current;
      if (!el) return;
      const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
      if (maxScroll <= 12) return;
      const isRtl = isRtlElement(el);
      pointerDragRef.current = {
        active: true,
        dragging: false,
        startX: e.clientX,
        startOffset: getNormalizedScrollOffset(el, isRtl, maxScroll),
        isRtl,
        maxScroll,
      };
    },
    [trackRef],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      const drag = pointerDragRef.current;
      const el = trackRef.current;
      if (!drag || !drag.active || !el) return;
      const dx = e.clientX - drag.startX;
      if (!drag.dragging && Math.abs(dx) > 7) {
        drag.dragging = true;
        suppressNextClickRef.current = true;
        pauseForUserAction();
        el.style.scrollSnapType = 'none';
        el.style.scrollBehavior = 'auto';
      }
      if (drag.dragging) {
        e.preventDefault();
        const signedDelta = drag.isRtl ? dx : -dx;
        const nextOffset = clamp(drag.startOffset + signedDelta, 0, drag.maxScroll);
        el.scrollLeft = toBrowserScrollLeft(nextOffset, drag.isRtl, drag.maxScroll);
      }
    },
    [pauseForUserAction, trackRef],
  );

  const endPointerDrag = useCallback(() => {
    const drag = pointerDragRef.current;
    if (!drag) return;
    pointerDragRef.current = null;
    if (drag.dragging && trackRef.current) {
      const el = trackRef.current;
      el.style.scrollSnapType = '';
      el.style.scrollBehavior = '';
      syncScrollBounds();
      window.setTimeout(() => {
        suppressNextClickRef.current = false;
      }, 80);
    }
  }, [syncScrollBounds, trackRef]);

  const onClickCapture = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (suppressNextClickRef.current) {
      e.preventDefault();
      e.stopPropagation();
      suppressNextClickRef.current = false;
    }
  }, []);

  const onScroll = useCallback(() => {
    if (isGlidingRef.current) return;
    if (scrollDebounceRef.current !== null) {
      window.clearTimeout(scrollDebounceRef.current);
    }
    scrollDebounceRef.current = window.setTimeout(() => {
      scrollDebounceRef.current = null;
      syncScrollBounds();
    }, 90);
  }, [syncScrollBounds]);

  const state: HumanAutoScrollState = userPaused
    ? 'paused-user'
    : hoverPaused
      ? 'paused-hover'
      : canScroll && isVisibleState && !disabled
        ? 'running'
        : 'idle';

  return {
    copy,
    state,
    canScroll,
    canScrollPrev,
    canScrollNext,
    userPaused,
    progress,
    stepPrev,
    stepNext,
    toggleUserPause,
    setWrapperNode,
    wrapperHandlers: {
      onPointerEnter,
      onPointerLeave,
      onFocusCapture,
      onBlurCapture,
      onKeyDown,
    },
    trackHandlers: {
      'data-human-carousel-track': 'true' as const,
      onPointerDown,
      onPointerMove,
      onPointerUp: endPointerDrag,
      onPointerCancel: endPointerDrag,
      onPointerLeave: endPointerDrag,
      onClickCapture,
      onTouchStart,
      onTouchMove,
      onWheel,
      onScroll,
    },
  };
}

export interface HumanCarouselControlsProps {
  copy: HumanCarouselCopy;
  canScroll: boolean;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  userPaused: boolean;
  progress?: number;
  onPrev: () => void;
  onNext: () => void;
  onTogglePause: () => void;
  variant?: 'dark' | 'light';
  showProgress?: boolean;
  className?: string;
}

export function HumanCarouselControls({
  copy,
  canScroll,
  canScrollPrev,
  canScrollNext,
  userPaused,
  progress = 0,
  onPrev,
  onNext,
  onTogglePause,
  variant = 'dark',
  showProgress = true,
  className = '',
}: HumanCarouselControlsProps) {
  const isLight = variant === 'light';
  const btnClass = isLight
    ? 'inline-flex min-h-[44px] min-w-[44px] items-center justify-center border border-[#050505]/25 bg-[#050505] px-2.5 text-[#F6F1E7] transition-colors hover:bg-[#1E1C19] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#050505] disabled:opacity-40 disabled:hover:bg-[#050505]'
    : 'inline-flex min-h-[44px] min-w-[44px] items-center justify-center border border-[#F6F1E7]/28 bg-[#141311] px-2.5 text-[#F6F1E7] transition-colors hover:border-[#EAE3D5] hover:bg-[#EAE3D5] hover:text-[#050505] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] disabled:opacity-40 disabled:hover:border-[#F6F1E7]/28 disabled:hover:bg-[#141311] disabled:hover:text-[#F6F1E7]';

  const trackBg = isLight ? 'bg-[#050505]/15' : 'bg-[#F6F1E7]/14';
  const trackFill = isLight ? 'bg-[#050505]' : 'bg-[#C9A96E]';

  return (
    <div
      aria-hidden={!canScroll ? 'true' : undefined}
      className={`flex min-h-[44px] items-center justify-end gap-2.5 transition-opacity duration-200 ${
        canScroll ? 'opacity-100' : 'pointer-events-none opacity-0 select-none'
      } ${className}`}
    >
      {showProgress ? (
        <div className={`mr-auto hidden h-[2px] w-28 overflow-hidden sm:block md:w-40 ${trackBg}`} aria-hidden="true">
          <div
            className={`h-full transition-transform duration-300 ${trackFill}`}
            style={{
              width: '100%',
              transform: `scaleX(${clamp(0.14 + progress * 0.86, 0.14, 1)})`,
              transformOrigin: 'left center',
            }}
          />
        </div>
      ) : null}

      <button
        type="button"
        tabIndex={canScroll ? 0 : -1}
        onClick={onTogglePause}
        aria-label={userPaused ? copy.play : copy.pause}
        data-human-carousel-toggle="true"
        data-paused={userPaused ? 'true' : 'false'}
        className={`${btnClass} gap-1.5 px-3 font-mono text-[11px] font-bold uppercase tracking-[0.08em]`}
      >
        {userPaused ? (
          <>
            <Play className="h-3.5 w-3.5 shrink-0 fill-current" aria-hidden="true" />
            <span>{copy.playShort}</span>
          </>
        ) : (
          <>
            <Pause className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>{copy.pauseShort}</span>
          </>
        )}
      </button>

      <button
        type="button"
        tabIndex={canScroll ? 0 : -1}
        onClick={onPrev}
        disabled={!canScrollPrev}
        aria-label={copy.prev}
        className={btnClass}
      >
        <ChevronLeft className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
      </button>

      <button
        type="button"
        tabIndex={canScroll ? 0 : -1}
        onClick={onNext}
        disabled={!canScrollNext}
        aria-label={copy.next}
        className={btnClass}
      >
        <ChevronRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
      </button>
    </div>
  );
}

export interface HumanEventCarouselProps {
  children: React.ReactNode;
  locale?: string | null;
  as?: 'div' | 'ol' | 'ul';
  cardSize?: 'standard' | 'compact' | 'wide' | 'custom';
  variant?: 'dark' | 'light';
  gapClassName?: string;
  className?: string;
  trackClassName?: string;
  ariaLabel?: string;
  id?: string;
  noLightbox?: boolean;
  resetKey?: string | number;
  trackDataAttributes?: Record<string, string | undefined>;
}

function resolveCardSizeClasses(cardSize: 'standard' | 'compact' | 'wide' | 'custom', itemCount: number): string {
  if (cardSize === 'custom') {
    return '[&>*:not(script)]:shrink-0 [&>*:not(script)]:snap-start';
  }
  if (itemCount <= 1) {
    return '[&>*:not(script)]:shrink-0 [&>*:not(script)]:snap-start [&>*:not(script)]:!w-full [&>*:not(script)]:max-w-[420px]';
  }
  if (itemCount === 2) {
    return '[&>*:not(script)]:shrink-0 [&>*:not(script)]:snap-start [&>*:not(script)]:!w-[78vw] [&>*:not(script)]:max-w-[340px] sm:[&>*:not(script)]:!w-[310px] md:[&>*:not(script)]:!w-[calc((100%-1.5rem)/2)] md:[&>*:not(script)]:max-w-[460px]';
  }
  if (itemCount === 3) {
    return '[&>*:not(script)]:shrink-0 [&>*:not(script)]:snap-start [&>*:not(script)]:!w-[78vw] [&>*:not(script)]:max-w-[340px] sm:[&>*:not(script)]:!w-[300px] lg:[&>*:not(script)]:!w-[calc((100%-2.5rem)/3)] lg:[&>*:not(script)]:max-w-[420px]';
  }
  if (cardSize === 'compact') {
    return '[&>*:not(script)]:shrink-0 [&>*:not(script)]:snap-start [&>*:not(script)]:!w-[74vw] [&>*:not(script)]:max-w-[292px] sm:[&>*:not(script)]:!w-[268px] lg:[&>*:not(script)]:!w-[calc((100%-3rem)/4.18)] lg:[&>*:not(script)]:min-w-[248px] lg:[&>*:not(script)]:max-w-[320px]';
  }
  if (cardSize === 'wide') {
    return '[&>*:not(script)]:shrink-0 [&>*:not(script)]:snap-start [&>*:not(script)]:!w-[82vw] [&>*:not(script)]:max-w-[360px] sm:[&>*:not(script)]:!w-[336px] lg:[&>*:not(script)]:!w-[calc((100%-2.5rem)/2.65)] lg:[&>*:not(script)]:min-w-[320px] lg:[&>*:not(script)]:max-w-[440px]';
  }
  return '[&>*:not(script)]:shrink-0 [&>*:not(script)]:snap-start [&>*:not(script)]:!w-[78vw] [&>*:not(script)]:max-w-[332px] sm:[&>*:not(script)]:!w-[304px] lg:[&>*:not(script)]:!w-[calc((100%-2.5rem)/3.22)] lg:[&>*:not(script)]:min-w-[282px] lg:[&>*:not(script)]:max-w-[372px]';
}

export function HumanEventCarousel({
  children,
  locale = 'en',
  as = 'div',
  cardSize = 'standard',
  variant = 'dark',
  gapClassName = 'gap-4 sm:gap-5',
  className = '',
  trackClassName = '',
  ariaLabel,
  id,
  noLightbox = true,
  resetKey,
  trackDataAttributes,
}: HumanEventCarouselProps) {
  const trackRef = useRef<HTMLElement | null>(null);
  const setTrackNode = useCallback((node: HTMLElement | null) => {
    trackRef.current = node;
  }, []);

  const childArray = React.Children.toArray(children);
  const itemCount = childArray.length;

  const {
    copy,
    state,
    canScroll,
    canScrollPrev,
    canScrollNext,
    userPaused,
    progress,
    stepPrev,
    stepNext,
    toggleUserPause,
    setWrapperNode,
    wrapperHandlers,
    trackHandlers,
  } = useHumanAutoScroll(trackRef, { locale, resetKey });

  const sizeClasses = resolveCardSizeClasses(cardSize, itemCount);
  const combinedTrackClass = [
    'flex w-full min-w-0 max-w-full list-none p-0 m-0 overflow-x-auto overscroll-x-contain snap-x snap-proximity pb-2 cursor-grab active:cursor-grabbing select-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden',
    gapClassName,
    sizeClasses,
    trackClassName,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      id={id}
      ref={setWrapperNode}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel || copy.regionLabel}
      data-human-event-carousel="true"
      data-human-autoscroll-state={state}
      data-human-autoscroll-scrollable={canScroll ? 'true' : 'false'}
      data-no-lightbox={noLightbox ? 'true' : undefined}
      className={`relative w-full min-w-0 max-w-full ${className}`.trim()}
      {...wrapperHandlers}
    >
      {itemCount > 1 ? (
        <HumanCarouselControls
          copy={copy}
          canScroll={canScroll}
          canScrollPrev={canScrollPrev}
          canScrollNext={canScrollNext}
          userPaused={userPaused}
          progress={progress}
          onPrev={stepPrev}
          onNext={stepNext}
          onTogglePause={toggleUserPause}
          variant={variant}
          className="mb-3"
        />
      ) : null}

      {as === 'ol' ? (
        <ol
          ref={setTrackNode}
          aria-label={ariaLabel || copy.regionLabel}
          className={combinedTrackClass}
          {...trackDataAttributes}
          {...trackHandlers}
        >
          {children}
        </ol>
      ) : as === 'ul' ? (
        <ul
          ref={setTrackNode}
          aria-label={ariaLabel || copy.regionLabel}
          className={combinedTrackClass}
          {...trackDataAttributes}
          {...trackHandlers}
        >
          {children}
        </ul>
      ) : (
        <div
          ref={setTrackNode}
          className={combinedTrackClass}
          {...trackDataAttributes}
          {...trackHandlers}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export default HumanEventCarousel;
