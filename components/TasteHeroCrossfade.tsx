'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import type { EditorialPlate } from '@/lib/guideEditorialMedia';

interface TasteHeroCrossfadeProps {
  slides?: EditorialPlate[];
  images?: string[];
  altPrimary: string;
  altSecondary?: string;
  title: string;
}

/**
 * Editorial Cinema Stage for Taste v2 guide pages.
 * Places slides[0] first in DOM (priority, lightbox-ready, matches og:image)
 * with calm 1600ms ambient crossfade, subtle Ken Burns drift, and clean venue captions.
 */
export default function TasteHeroCrossfade({
  slides: propSlides,
  images,
  altPrimary,
  title,
}: TasteHeroCrossfadeProps) {
  const normalizedSlides: EditorialPlate[] =
    propSlides && propSlides.length > 0
      ? propSlides.slice(0, 4)
      : Array.from(new Set((images || []).filter(Boolean)))
          .slice(0, 4)
          .map((src) => ({ src, caption: title, district: '' }));

  const leadSlide = normalizedSlides[0] || {
    src: '/images/guides-editorial/just-me-pavilion.webp',
    caption: title,
    district: '',
  };

  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (normalizedSlides.length <= 1) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const timer = window.setInterval(() => {
      if (document.hidden) return;
      setActiveIdx((prev) => (prev + 1) % normalizedSlides.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, [normalizedSlides.length]);

  const currentSlide = normalizedSlides[activeIdx] || leadSlide;
  const paddedIndex = `${activeIdx + 1} / ${normalizedSlides.length}`;

  return (
    <div className="relative w-full">
      <figure
        className="relative mx-auto w-full max-w-[560px] aspect-[4/5] overflow-clip bg-[#141311]"
        data-taste-clip
      >
        <Image
          src={leadSlide.src}
          alt={altPrimary}
          title={title}
          fill
          unoptimized
          priority
          quality={92}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className={`object-cover transition-opacity duration-700 ${
            activeIdx === 0 ? 'opacity-100' : 'opacity-100'
          }`}
        />

        {normalizedSlides.slice(1).map((sl, idx) => {
          const slideIdx = idx + 1;
          const visible = activeIdx === slideIdx;
          return (
            <Image
              key={`${sl.src}-${slideIdx}`}
              src={sl.src}
              alt={`${altPrimary} - ${sl.caption}`}
              fill
              unoptimized
              quality={92}
              sizes="(max-width: 1024px) 100vw, 50vw"
              aria-hidden="true"
              data-hero-backdrop="true"
              data-no-lightbox="true"
              className={`object-cover taste-crossfade-slide pointer-events-none ${
                visible ? 'opacity-100' : 'opacity-0'
              }`}
            />
          );
        })}

        <div className="taste-hero-scrim absolute inset-0" aria-hidden="true" />

        <div className="absolute inset-x-0 bottom-0 z-10 flex flex-wrap items-end justify-between gap-3 p-4 sm:p-5">
          <div className="flex items-center gap-3 bg-[#050505]/90 px-3.5 py-2 max-w-[75%]" data-no-lightbox="true">
            <span className="w-1 h-4 bg-[#25D366] shrink-0" aria-hidden="true" />
            <div className="min-w-0">
              <div className="text-[14px] font-semibold text-[#FFFFFF] truncate leading-snug">
                {currentSlide.caption}
              </div>
              {currentSlide.district && (
                <div className="text-[14px] text-[#C9C7C2] truncate leading-snug">
                  {currentSlide.district}
                </div>
              )}
            </div>
          </div>

          {normalizedSlides.length > 1 && (
            <div
              className="flex items-center gap-2 bg-[#050505]/90 px-3 py-2 text-[14px] font-semibold text-[#FFFFFF] tabular-nums"
              data-no-lightbox="true"
            >
              <span>{paddedIndex}</span>
              <div className="flex items-center gap-1" role="tablist" aria-label={title}>
                {normalizedSlides.map((sl, idx) => (
                  <button
                    key={`${sl.src}-tab-${idx}`}
                    type="button"
                    role="tab"
                    aria-selected={activeIdx === idx}
                    aria-label={`${idx + 1} / ${normalizedSlides.length}`}
                    onClick={() => setActiveIdx(idx)}
                    className="h-7 px-0.5 flex items-center cursor-pointer bg-transparent"
                  >
                    <span
                      className={`block h-1.5 transition-[width,background-color] duration-300 ${
                        activeIdx === idx ? 'w-5 bg-[#25D366]' : 'w-2 bg-[#FFFFFF]/45 hover:bg-[#FFFFFF]'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </figure>
    </div>
  );
}
