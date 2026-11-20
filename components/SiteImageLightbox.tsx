'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { usePathname } from 'next/navigation';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from 'lucide-react';
import { getLightboxCopy } from '@/lib/lightboxCopy35';
import {
  LIGHTBOX_GROUP_SELECTOR,
  extractImageCaption,
  isImageElementLightboxEligible,
  resolveFullResImageSrc,
} from '@/lib/lightboxEligibility';

interface LightboxItem {
  fullSrc: string;
  fallbackSrc: string;
  alt: string;
  caption: string;
}

function getContentRoot(): HTMLElement | null {
  if (typeof document === 'undefined') return null;
  return document.getElementById('main-content') || document.querySelector('main');
}

function buildItemFromImage(img: HTMLImageElement): LightboxItem {
  const fallbackSrc = img.currentSrc || img.getAttribute('src') || '';
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://nightlifemilan.com';
  const fullSrc = resolveFullResImageSrc(fallbackSrc, origin) || fallbackSrc;
  const alt = img.getAttribute('alt')?.trim() || img.getAttribute('title')?.trim() || '';
  const caption = extractImageCaption(img);
  return { fullSrc, fallbackSrc, alt, caption };
}

export default function SiteImageLightbox({ locale }: { locale: string }) {
  const pathname = usePathname();
  const copy = useMemo(() => getLightboxCopy(locale), [locale]);
  const [items, setItems] = useState<LightboxItem[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [useFallbackSrc, setUseFallbackSrc] = useState(false);

  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const closeModal = useCallback(() => {
    setActiveIndex(null);
    setZoomed(false);
    setUseFallbackSrc(false);
    const prev = lastFocusedRef.current;
    lastFocusedRef.current = null;
    if (prev && prev.isConnected) {
      window.setTimeout(() => prev.focus(), 0);
    }
  }, []);

  // Close open lightbox automatically on client-side navigation.
  useEffect(() => {
    setActiveIndex(null);
    setZoomed(false);
    setUseFallbackSrc(false);
  }, [pathname]);

  const openFromImageElement = useCallback((clickedImg: HTMLImageElement) => {
    if (!isImageElementLightboxEligible(clickedImg)) return;
    const root = getContentRoot();
    if (!root) return;

    const groupEl = clickedImg.closest(LIGHTBOX_GROUP_SELECTOR) || root;
    const candidates = Array.from(groupEl.querySelectorAll('img')).filter((candidate) =>
      isImageElementLightboxEligible(candidate),
    );
    const pool = candidates.length > 0 ? candidates : [clickedImg];

    const deduped: LightboxItem[] = [];
    const seen = new Map<string, number>();
    let targetIndex = 0;

    for (const candidate of pool) {
      const built = buildItemFromImage(candidate);
      if (!built.fullSrc) continue;
      let idx = seen.get(built.fullSrc);
      if (idx === undefined) {
        idx = deduped.length;
        seen.set(built.fullSrc, idx);
        deduped.push(built);
      }
      if (candidate === clickedImg) {
        targetIndex = idx;
      }
    }

    if (deduped.length === 0) return;

    lastFocusedRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : clickedImg;
    setUseFallbackSrc(false);
    setZoomed(false);
    setItems(deduped);
    setActiveIndex(targetIndex);
  }, []);

  // Scan eligible images on mount, route changes, DOM mutations, and capture-phase lazy image loads.
  useEffect(() => {
    const root = getContentRoot();
    if (!root) return;

    const syncEligibilityAttributes = () => {
      const imgs = root.querySelectorAll('img');
      imgs.forEach((img) => {
        if (isImageElementLightboxEligible(img)) {
          const baseLabel = img.getAttribute('alt')?.trim() || img.getAttribute('title')?.trim();
          const label = baseLabel ? `${baseLabel} · ${copy.openFullScreen}` : copy.openFullScreen;
          if (img.getAttribute('data-lightbox-ready') !== 'true') {
            img.setAttribute('data-lightbox-ready', 'true');
          }
          if (img.getAttribute('role') !== 'button') {
            img.setAttribute('role', 'button');
          }
          if (img.tabIndex !== 0) {
            img.tabIndex = 0;
          }
          if (img.getAttribute('aria-label') !== label) {
            img.setAttribute('aria-label', label);
          }
        } else if (img.hasAttribute('data-lightbox-ready')) {
          img.removeAttribute('data-lightbox-ready');
          if (img.getAttribute('role') === 'button') {
            img.removeAttribute('role');
          }
          if (img.getAttribute('tabindex') === '0') {
            img.removeAttribute('tabindex');
          }
          if (img.getAttribute('aria-label')?.includes(copy.openFullScreen)) {
            img.removeAttribute('aria-label');
          }
        }
      });
    };

    let rafId: number | null = null;
    const scheduleSync = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        syncEligibilityAttributes();
      });
    };

    syncEligibilityAttributes();
    const timer = window.setTimeout(syncEligibilityAttributes, 350);

    const observer = new MutationObserver(scheduleSync);
    observer.observe(root, { childList: true, subtree: true, attributes: true, attributeFilter: ['src', 'class', 'data-no-lightbox', 'data-hero-backdrop'] });

    const onCaptureLoad = (event: Event) => {
      if (event.target instanceof HTMLImageElement) {
        scheduleSync();
      }
    };

    const onRootClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof HTMLImageElement)) return;
      if (!isImageElementLightboxEligible(target)) return;
      event.preventDefault();
      event.stopPropagation();
      openFromImageElement(target);
    };

    const onRootKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      const target = event.target;
      if (!(target instanceof HTMLImageElement)) return;
      if (target.getAttribute('data-lightbox-ready') !== 'true') return;
      if (!isImageElementLightboxEligible(target)) return;
      event.preventDefault();
      event.stopPropagation();
      openFromImageElement(target);
    };

    root.addEventListener('load', onCaptureLoad, true);
    root.addEventListener('click', onRootClick);
    root.addEventListener('keydown', onRootKeyDown);
    window.addEventListener('resize', scheduleSync, { passive: true });

    return () => {
      window.clearTimeout(timer);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      observer.disconnect();
      root.removeEventListener('load', onCaptureLoad, true);
      root.removeEventListener('click', onRootClick);
      root.removeEventListener('keydown', onRootKeyDown);
      window.removeEventListener('resize', scheduleSync);
    };
  }, [copy.openFullScreen, openFromImageElement, pathname]);

  // Body scroll lock + keyboard modal navigation
  useEffect(() => {
    if (activeIndex === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.setTimeout(() => closeButtonRef.current?.focus(), 0);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeModal();
      } else if (event.key === 'ArrowLeft' && items.length > 1) {
        event.preventDefault();
        setUseFallbackSrc(false);
        setZoomed(false);
        setActiveIndex((cur) => (cur === null ? null : (cur - 1 + items.length) % items.length));
      } else if (event.key === 'ArrowRight' && items.length > 1) {
        event.preventDefault();
        setUseFallbackSrc(false);
        setZoomed(false);
        setActiveIndex((cur) => (cur === null ? null : (cur + 1) % items.length));
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeIndex, closeModal, items.length]);

  if (!mounted || activeIndex === null || !items[activeIndex]) {
    return null;
  }

  const activeItem = items[activeIndex];
  const currentSrc = useFallbackSrc ? activeItem.fallbackSrc : activeItem.fullSrc;
  const hasMultiple = items.length > 1;

  const goPrev = () => {
    setUseFallbackSrc(false);
    setZoomed(false);
    setActiveIndex((cur) => (cur === null ? 0 : (cur - 1 + items.length) % items.length));
  };

  const goNext = () => {
    setUseFallbackSrc(false);
    setZoomed(false);
    setActiveIndex((cur) => (cur === null ? 0 : (cur + 1) % items.length));
  };

  const modal = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={activeItem.alt || copy.dialogLabel}
      data-site-lightbox="open"
      className="fixed inset-0 z-[10010] flex flex-col bg-black/95 backdrop-blur-md text-[#F6F1E7]"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      {/* Top Bar */}
      <div className="flex shrink-0 items-center justify-between border-b border-[#F6F1E7]/15 bg-[#050505]/90 px-4 py-3 sm:px-6">
        <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#EAE3D5]">
          {hasMultiple ? `${activeIndex + 1} / ${items.length}` : 'NIGHTLIFE MILAN'}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setZoomed((z) => !z)}
            aria-label={zoomed ? copy.zoomOut : copy.zoomIn}
            aria-pressed={zoomed}
            className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 border border-[#F6F1E7]/30 bg-[#0B0A09] px-3 text-xs font-semibold text-[#F6F1E7] transition hover:border-[#F6F1E7] hover:bg-[#F6F1E7] hover:text-[#050505] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EAE3D5]"
          >
            {zoomed ? <ZoomOut size={18} aria-hidden="true" /> : <ZoomIn size={18} aria-hidden="true" />}
            <span className="hidden sm:inline font-mono text-[11px] uppercase tracking-wider">
              {zoomed ? '1x' : '1.85x'}
            </span>
          </button>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeModal}
            aria-label={copy.closeGallery}
            data-lightbox-close="true"
            className="grid min-h-11 min-w-11 place-items-center border border-[#F6F1E7]/30 bg-[#0B0A09] text-[#F6F1E7] transition hover:border-[#F6F1E7] hover:bg-[#F6F1E7] hover:text-[#050505] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EAE3D5]"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Image Stage */}
      <div
        className={`relative flex flex-1 items-center justify-center p-3 sm:p-6 ${
          zoomed ? 'overflow-auto' : 'overflow-hidden'
        }`}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeModal();
        }}
        onTouchStart={(e) => {
          touchStartXRef.current = e.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(e) => {
          if (!hasMultiple || touchStartXRef.current === null || zoomed) return;
          const endX = e.changedTouches[0]?.clientX ?? null;
          if (endX === null) return;
          const delta = endX - touchStartXRef.current;
          touchStartXRef.current = null;
          if (Math.abs(delta) >= 48) {
            if (delta > 0) goPrev();
            else goNext();
          }
        }}
      >
        {hasMultiple && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            aria-label={copy.previousImage}
            data-lightbox-prev="true"
            className="fixed left-3 top-1/2 z-[10011] grid min-h-11 min-w-11 -translate-y-1/2 place-items-center border border-[#F6F1E7]/35 bg-black/75 text-[#F6F1E7] transition hover:border-[#F6F1E7] hover:bg-[#F6F1E7] hover:text-[#050505] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EAE3D5] sm:left-6"
          >
            <ChevronLeft size={24} aria-hidden="true" />
          </button>
        )}

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={currentSrc}
          alt={activeItem.alt}
          onError={() => {
            if (!useFallbackSrc && activeItem.fallbackSrc && activeItem.fallbackSrc !== activeItem.fullSrc) {
              setUseFallbackSrc(true);
            }
          }}
          onClick={(e) => {
            e.stopPropagation();
            setZoomed((z) => !z);
          }}
          className={
            zoomed
              ? 'max-w-none w-auto max-h-none h-auto scale-100 cursor-zoom-out select-none shadow-2xl'
              : 'max-h-[78vh] max-w-[92vw] w-auto h-auto object-contain cursor-zoom-in select-none shadow-2xl'
          }
          style={zoomed ? { width: 'min(165vw, 1800px)' } : undefined}
        />

        {hasMultiple && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            aria-label={copy.nextImage}
            data-lightbox-next="true"
            className="fixed right-3 top-1/2 z-[10011] grid min-h-11 min-w-11 -translate-y-1/2 place-items-center border border-[#F6F1E7]/35 bg-black/75 text-[#F6F1E7] transition hover:border-[#F6F1E7] hover:bg-[#F6F1E7] hover:text-[#050505] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EAE3D5] sm:right-6"
          >
            <ChevronRight size={24} aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Caption Footer */}
      {activeItem.caption && (
        <div className="shrink-0 border-t border-[#F6F1E7]/15 bg-[#050505]/92 px-4 py-3 text-center sm:px-6">
          <p className="mx-auto max-w-4xl text-xs leading-relaxed text-[#EAE3D5] sm:text-sm">
            {activeItem.caption}
          </p>
        </div>
      )}
    </div>
  );

  return createPortal(modal, document.body);
}
