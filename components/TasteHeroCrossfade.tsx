'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface TasteHeroCrossfadeProps {
  images: string[];
  altPrimary: string;
  altSecondary: string;
  title: string;
}

/**
 * Editorial "Two prints in darkness" visual showcase for Taste directions.
 * Places the og:image hero photo first in the DOM (priority) for SEO social parity
 * while running a calm 1600ms ambient crossfade across verified gallery photos.
 */
export default function TasteHeroCrossfade({
  images,
  altPrimary,
  altSecondary,
  title,
}: TasteHeroCrossfadeProps) {
  const uniqueImages = Array.from(new Set(images.filter(Boolean)));
  const leadImg = uniqueImages[0] || '/images/seo-events/master/capodanno-justme-milano-torre-branca.webp';
  const slides = uniqueImages.slice(0, 4);
  const secondaryImg = uniqueImages[1] || leadImg;

  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const timer = window.setInterval(() => {
      if (document.hidden) return;
      setActiveIdx((prev) => (prev + 1) % slides.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  const paddedIndex = `${activeIdx + 1} / ${slides.length}`;

  return (
    <div className="relative pb-6 sm:pb-10 lg:pb-12">
      {/* Main large editorial print (frame 0 is always first body <img> -> matches og:image) */}
      <figure
        className="relative ml-auto w-[90%] sm:w-[86%] aspect-[16/10] overflow-clip bg-[#0B0A09]"
        data-taste-clip
      >
        <Image
          src={leadImg}
          alt={altPrimary}
          title={title}
          fill
          unoptimized
          priority
          quality={92}
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover"
        />

        {slides.slice(1).map((src, idx) => {
          const slideIdx = idx + 1;
          const visible = activeIdx === slideIdx;
          return (
            <Image
              key={src}
              src={src}
              alt={`${altPrimary} - ${slideIdx + 1}`}
              fill
              unoptimized
              quality={92}
              sizes="(max-width: 1024px) 100vw, 55vw"
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

        {slides.length > 1 && (
          <div className="absolute bottom-3 right-3 z-10 flex items-center gap-2 bg-[#050505]/85 px-3 py-1.5 text-[13px] font-medium text-[#F6F1E7] tabular-nums">
            <span>{paddedIndex}</span>
            <div className="flex items-center gap-1" role="tablist" aria-label={title}>
              {slides.map((src, idx) => (
                <button
                  key={src}
                  type="button"
                  role="tab"
                  aria-selected={activeIdx === idx}
                  aria-label={`${idx + 1} / ${slides.length}`}
                  onClick={() => setActiveIdx(idx)}
                  className={`h-2 transition-[width,background-color] duration-300 ${
                    activeIdx === idx ? 'w-5 bg-[#25D366]' : 'w-2 bg-[#F6F1E7]/45 hover:bg-[#F6F1E7]'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </figure>

      {/* Overlapping secondary 1:1 square print (uneven-photographs gallery placement) */}
      <figure
        className="relative -mt-12 sm:-mt-20 w-[34%] sm:w-[30%] aspect-square overflow-clip bg-[#0B0A09] brightness-[0.86] hover:brightness-100 transition-[filter] duration-500"
        data-taste-reveal
      >
        <Image
          src={secondaryImg}
          alt={altSecondary}
          title={altSecondary}
          fill
          unoptimized
          quality={92}
          sizes="(max-width: 640px) 40vw, 28vw"
          className="object-cover"
        />
      </figure>
    </div>
  );
}
