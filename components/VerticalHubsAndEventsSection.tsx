'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from '@/components/LocalizedLink';
import {
  getVerticalHubUi35,
  getOccasionsCatalog,
  getTradeFairsCatalog,
  getHolidaysCatalog,
  resolveSuggestedEventsForVertical,
} from '@/lib/verticalsHubData';

interface VerticalHubsAndEventsSectionProps {
  locale: string;
  initialTab?: 'occasions' | 'fairs' | 'holidays';
  eventFocus?: 'all' | 'occasions' | 'tradeFairs' | 'holidays' | 'sanSiro' | 'concerts';
}

export default function VerticalHubsAndEventsSection({
  locale,
  initialTab = 'occasions',
  eventFocus = 'all',
}: VerticalHubsAndEventsSectionProps) {
  const [activeTab, setActiveTab] = useState<'occasions' | 'fairs' | 'holidays'>(
    initialTab
  );
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const ui = getVerticalHubUi35(locale);
  const occasions = getOccasionsCatalog(locale);
  const fairs = getTradeFairsCatalog(locale);
  const holidays = getHolidaysCatalog(locale);
  const suggestedEvents = resolveSuggestedEventsForVertical(eventFocus, locale);

  const activeCards =
    activeTab === 'occasions' ? occasions : activeTab === 'fairs' ? fairs : holidays;

  const scrollCarousel = (dir: 'prev' | 'next') => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({
      left: dir === 'next' ? 370 : -370,
      behavior: 'smooth',
    });
  };

  return (
    <section
      aria-label={ui.mainTitle}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12"
    >
      {/* 1. VERTICAL DOSSIERS & GUIDES MATRIX (30% Warm Editorial Ivory Chapter) */}
      <div className="border border-[#050505]/15 bg-[#F6F1E7] text-[#050505] p-6 sm:p-10">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 border border-[#050505]/20 bg-[#EFE9DC] px-3.5 py-1 font-mono text-xs font-semibold uppercase tracking-widest text-[#050505]">
            <span className="h-2 w-2 rounded-full bg-[#050505]" />
            {ui.eyebrow}
          </span>
          <h2 className="mt-3 font-serif text-2xl sm:text-4xl font-normal text-[#050505] tracking-tight">
            {ui.mainTitle}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#1F1C18]">{ui.mainSubtitle}</p>
        </div>

        {/* 3 Pillar Tabs */}
        <div className="mt-6 flex flex-wrap gap-2 border-b border-[#050505]/14 pb-5" role="tablist">
          {(
            [
              { key: 'occasions', label: ui.tabOccasions, count: occasions.length },
              { key: 'fairs', label: ui.tabFairs, count: fairs.length },
              { key: 'holidays', label: ui.tabHolidays, count: holidays.length },
            ] as const
          ).map((t) => {
            const active = activeTab === t.key;
            return (
              <button
                key={t.key}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveTab(t.key)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 font-mono text-xs uppercase tracking-wider font-semibold transition ${
                  active
                    ? 'bg-[#050505] text-[#F6F1E7]'
                    : 'border border-[#050505]/18 bg-[#EFE9DC] text-[#1F1C18] hover:border-[#050505]'
                }`}
              >
                <span>{t.label}</span>
                <span
                  className={`px-2 py-0.5 text-[11px] font-bold ${
                    active ? 'bg-[#F6F1E7] text-[#050505]' : 'bg-[#050505]/10 text-[#050505]'
                  }`}
                >
                  {t.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab Content: Cards */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {activeCards.map((card) => (
            <article
              key={card.id}
              className="border border-[#050505]/16 bg-[#EFE9DC] overflow-hidden flex flex-col justify-between hover:border-[#050505] transition"
            >
              <div>
                <div className="relative h-52 w-full bg-[#050505] overflow-hidden border-b border-[#050505]/14">
                  <Image
                    src={card.imageSrc}
                    alt={card.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    quality={80}
                    className="object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-[#050505]/92 border border-[#F6F1E7]/25 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-[#F6F1E7]">
                    {card.badge}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="font-serif text-2xl font-normal text-[#050505] leading-snug">{card.title}</h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#1F1C18] leading-relaxed">
                    {card.subtitle}
                  </p>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="bg-[#F6F1E7] border border-[#050505]/14 p-3">
                      <span className="font-mono font-bold text-[#3D372E] uppercase text-[10px] tracking-wider block">
                        {ui.priceLabel}
                      </span>
                      <p className="mt-1 text-[#050505] font-semibold">{card.priceRange}</p>
                    </div>
                    <div className="bg-[#F6F1E7] border border-[#050505]/14 p-3">
                      <span className="font-mono font-bold text-[#3D372E] uppercase text-[10px] tracking-wider block">
                        {ui.logisticsLabel}
                      </span>
                      <p className="mt-1 text-[#1F1C18]">{card.timingAndLogistics}</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#3D372E]">
                      {ui.venuesLabel}:
                    </span>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {card.recommendedVenues.map((v) => (
                        <span
                          key={v}
                          className="bg-[#F6F1E7] border border-[#050505]/16 px-2.5 py-0.5 font-mono text-xs text-[#050505]"
                        >
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>

                  <ul className="mt-4 space-y-1.5 text-xs text-[#1F1C18]">
                    {card.highlights.map((hl) => (
                      <li key={hl} className="flex items-start gap-2">
                        <span className="text-[#050505] font-bold">✓</span>
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Dark Dock for #25D366 CTA inside Warm Editorial Ivory card */}
              <div className="bg-[#050505] p-4 flex flex-col sm:flex-row gap-2.5 border-t border-[#050505]">
                <a
                  href={`https://wa.me/393519127047?text=${encodeURIComponent(card.whatsappText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center bg-[#25D366] hover:bg-[#20bd5a] px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-[#050505] transition"
                >
                  {ui.bookWhatsApp}
                </a>
                <Link
                  href={card.href}
                  className="inline-flex items-center justify-center border border-[#F6F1E7]/25 bg-[#0B0A09] hover:border-[#F6F1E7] px-4 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-[#F6F1E7] transition"
                >
                  {ui.exploreGuide} →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* 2. AUTO-UPDATING SUGGESTED EVENTS CAROUSEL (60% Couture Noir Chapter) */}
      <div className="border border-[#F6F1E7]/16 bg-[#0B0A09] p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#EAE3D5]">
              LIVE FEED · XCEED + WEEKLY + SEASONAL
            </span>
            <h3 className="mt-1 font-serif text-2xl font-normal text-[#F6F1E7]">{ui.suggestedEventsTitle}</h3>
            <p className="mt-1 text-xs sm:text-sm text-[#C2B9AA]">{ui.suggestedEventsSubtitle}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollCarousel('prev')}
              aria-label="Previous suggested event"
              className="h-9 w-9 border border-[#F6F1E7]/20 bg-[#050505] text-[#F6F1E7] hover:border-[#F6F1E7] flex items-center justify-center"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => scrollCarousel('next')}
              aria-label="Next suggested event"
              className="h-9 w-9 border border-[#F6F1E7]/20 bg-[#050505] text-[#F6F1E7] hover:border-[#F6F1E7] flex items-center justify-center"
            >
              ›
            </button>
          </div>
        </div>

        <div
          ref={carouselRef}
          className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin"
        >
          {suggestedEvents.map((ev) => (
            <article
              key={ev.id}
              className="min-w-[290px] sm:min-w-[330px] max-w-[345px] snap-start flex flex-col justify-between border border-[#F6F1E7]/14 bg-[#050505] overflow-hidden hover:border-[#F6F1E7]/45 transition"
            >
              <div>
                <div className="relative h-52 w-full bg-[#050505] flex items-center justify-center border-b border-[#F6F1E7]/12">
                  <Image
                    src={ev.imageSrc}
                    alt={ev.title}
                    fill
                    sizes="340px"
                    quality={80}
                    className="object-contain p-1.5"
                  />
                  <span className="absolute top-2.5 left-2.5 bg-[#050505]/92 border border-[#F6F1E7]/25 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase text-[#EAE3D5]">
                    {ev.badge}
                  </span>
                  <span className="absolute top-2.5 right-2.5 bg-[#F6F1E7] px-2.5 py-0.5 font-mono text-xs font-extrabold text-[#050505]">
                    {ev.priceLabel}
                  </span>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between font-mono text-xs text-[#EAE3D5] mb-1">
                    <span>{ev.dateLabel}</span>
                    <span>{ev.timeLabel}</span>
                  </div>
                  <h4 className="font-serif text-base font-normal text-[#F6F1E7] line-clamp-2">{ev.title}</h4>
                  <p className="mt-1 text-xs text-[#C2B9AA]">{ev.categoryLabel}</p>
                </div>
              </div>
              <div className="p-4 pt-0 flex flex-col gap-2">
                <a
                  href={ev.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center bg-[#25D366] hover:bg-[#20bd5a] px-3 py-2 font-mono text-xs font-bold uppercase tracking-wider text-[#050505] transition"
                >
                  {ui.bookWhatsApp}
                </a>
                <Link
                  href={ev.href}
                  className="w-full inline-flex items-center justify-center border border-[#F6F1E7]/20 bg-[#0B0A09] hover:border-[#F6F1E7] px-3 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#F6F1E7] transition"
                >
                  {ui.exploreGuide} →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
