'use client';

import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { EventVisualGallery } from '@/lib/eventVisualGallery';

export default function EventImageGallery({ gallery }: { gallery: EventVisualGallery }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeImage = activeIndex === null ? null : gallery.images[activeIndex];

  useEffect(() => {
    if (activeIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveIndex(null);
      if (event.key === 'ArrowLeft') setActiveIndex((index) => index === null ? null : (index - 1 + gallery.images.length) % gallery.images.length);
      if (event.key === 'ArrowRight') setActiveIndex((index) => index === null ? null : (index + 1) % gallery.images.length);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeIndex, gallery.images.length]);

  return (
    <section className="mt-14 border-t border-white/10 pt-10" aria-labelledby="event-gallery-heading" data-event-section="gallery">
      <h2 id="event-gallery-heading" className="text-2xl font-serif font-bold text-champagne mb-6">
        {gallery.heading}
      </h2>

      <div className="grid grid-cols-1 min-[520px]:grid-cols-2 gap-x-4 gap-y-7 not-prose">
        {gallery.images.map((image, index) => (
          <figure key={image.src} className={index === 0 ? 'min-[900px]:col-span-2' : ''}>
            <button
              type="button"
              className="group relative block w-full aspect-square overflow-hidden rounded-lg border border-white/10 bg-white/[0.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
              onClick={() => setActiveIndex(index)}
              aria-label={image.title}
            >
              <Image
                src={image.src}
                alt={image.alt}
                title={image.title}
                fill
                unoptimized
                priority={index === 0}
                sizes={index === 0 ? '(max-width: 899px) 100vw, 66vw' : '(max-width: 519px) 100vw, 33vw'}
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
              />
            </button>
            <figcaption className="mt-3 font-serif text-base text-white">{image.title}</figcaption>
          </figure>
        ))}
      </div>

      {activeImage && activeIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" role="dialog" aria-modal="true" aria-label={activeImage.title}>
          <button
            type="button"
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-black/40 text-white hover:border-champagne hover:text-champagne focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
            onClick={() => setActiveIndex(null)}
            aria-label="Fechar galeria"
          >
            <X size={22} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="absolute left-3 sm:left-6 grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-black/40 text-white hover:border-champagne hover:text-champagne focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
            onClick={() => setActiveIndex((activeIndex - 1 + gallery.images.length) % gallery.images.length)}
            aria-label="Imagem anterior"
          >
            <ChevronLeft size={24} aria-hidden="true" />
          </button>
          <div className="relative h-[min(78vh,820px)] w-[min(92vw,820px)]">
            <Image src={activeImage.src} alt={activeImage.alt} title={activeImage.title} fill unoptimized sizes="92vw" className="object-contain" priority />
          </div>
          <button
            type="button"
            className="absolute right-3 sm:right-6 grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-black/40 text-white hover:border-champagne hover:text-champagne focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
            onClick={() => setActiveIndex((activeIndex + 1) % gallery.images.length)}
            aria-label="Proxima imagem"
          >
            <ChevronRight size={24} aria-hidden="true" />
          </button>
        </div>
      )}
    </section>
  );
}
