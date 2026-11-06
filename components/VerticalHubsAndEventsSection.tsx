'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  getVerticalHubUi35,
  getOccasionsCatalog,
  getTradeFairsCatalog,
  getHolidaysCatalog,
  getAxelNetworkBlueprints,
  resolveSuggestedEventsForVertical,
} from '@/lib/verticalsHubData';

interface VerticalHubsAndEventsSectionProps {
  locale: string;
  initialTab?: 'occasions' | 'fairs' | 'holidays' | 'blueprints';
  eventFocus?: 'all' | 'occasions' | 'tradeFairs' | 'holidays' | 'sanSiro' | 'concerts';
}

export default function VerticalHubsAndEventsSection({
  locale,
  initialTab = 'occasions',
  eventFocus = 'all',
}: VerticalHubsAndEventsSectionProps) {
  const [activeTab, setActiveTab] = useState<'occasions' | 'fairs' | 'holidays' | 'blueprints'>(
    initialTab
  );
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const ui = getVerticalHubUi35(locale);
  const occasions = getOccasionsCatalog(locale);
  const fairs = getTradeFairsCatalog(locale);
  const holidays = getHolidaysCatalog(locale);
  const blueprints = getAxelNetworkBlueprints(locale);
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
      {/* 1. VERTICAL DOSSIERS & GUIDES MATRIX */}
      <div className="rounded-3xl border border-amber-500/25 bg-gradient-to-b from-zinc-900/95 via-zinc-950 to-black p-6 sm:p-10 shadow-2xl">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-amber-300">
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            {ui.eyebrow}
          </span>
          <h2 className="mt-3 text-2xl sm:text-4xl font-bold text-white tracking-tight">
            {ui.mainTitle}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-zinc-300">{ui.mainSubtitle}</p>
        </div>

        {/* 4 Pillar Tabs */}
        <div className="mt-6 flex flex-wrap gap-2 border-b border-white/10 pb-5" role="tablist">
          {(
            [
              { key: 'occasions', label: ui.tabOccasions, count: occasions.length },
              { key: 'fairs', label: ui.tabFairs, count: fairs.length },
              { key: 'holidays', label: ui.tabHolidays, count: holidays.length },
              { key: 'blueprints', label: ui.tabBlueprints, count: blueprints.length },
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
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition ${
                  active
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-black shadow-lg shadow-amber-500/20'
                    : 'border border-white/10 bg-zinc-900/80 text-zinc-300 hover:border-amber-400/40 hover:text-white'
                }`}
              >
                <span>{t.label}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                    active ? 'bg-black/20 text-black' : 'bg-white/10 text-amber-300'
                  }`}
                >
                  {t.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab Content: Cards or CRO/UX/Storytelling Blueprints */}
        {activeTab === 'blueprints' ? (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {blueprints.map((bp) => (
              <div
                key={bp.id}
                className="rounded-2xl border border-white/12 bg-zinc-900/85 p-6 flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block rounded-lg bg-amber-500/15 border border-amber-400/30 px-3 py-1 text-xs font-semibold text-amber-300">
                    {bp.portalCluster}
                  </span>
                  <h3 className="mt-3 text-xl font-bold text-white">{bp.title}</h3>
                  <div className="mt-4 space-y-3 text-xs sm:text-sm">
                    <div className="rounded-xl bg-zinc-950/80 border border-white/10 p-3.5">
                      <span className="font-bold text-emerald-400 uppercase text-[11px] tracking-wider block">
                        CRO & Conversion Architecture
                      </span>
                      <p className="mt-1 text-zinc-200">{bp.croPrinciple}</p>
                    </div>
                    <div className="rounded-xl bg-zinc-950/80 border border-white/10 p-3.5">
                      <span className="font-bold text-amber-300 uppercase text-[11px] tracking-wider block">
                        UX / UI & Interactive Template
                      </span>
                      <p className="mt-1 text-zinc-200">{bp.uxUiPattern}</p>
                    </div>
                    <div className="rounded-xl bg-zinc-950/80 border border-white/10 p-3.5">
                      <span className="font-bold text-sky-300 uppercase text-[11px] tracking-wider block">
                        Copywriting & Storytelling Standard
                      </span>
                      <p className="mt-1 text-zinc-200">{bp.copyStorytellingRule}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {activeCards.map((card) => (
              <article
                key={card.id}
                className="rounded-2xl border border-white/12 bg-zinc-900/90 overflow-hidden flex flex-col justify-between hover:border-amber-400/50 transition"
              >
                <div>
                  <div className="relative h-52 w-full bg-zinc-950 overflow-hidden border-b border-white/10">
                    <Image
                      src={card.imageSrc}
                      alt={card.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      quality={80}
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
                    <span className="absolute top-3 left-3 rounded-full bg-black/85 border border-amber-400/40 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-300">
                      {card.badge}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white leading-snug">{card.title}</h3>
                    <p className="mt-2 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      {card.subtitle}
                    </p>

                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="rounded-xl bg-zinc-950/90 border border-emerald-500/25 p-3">
                        <span className="font-bold text-emerald-400 uppercase text-[10px] tracking-wider block">
                          💎 {ui.priceLabel}
                        </span>
                        <p className="mt-1 text-zinc-200 font-medium">{card.priceRange}</p>
                      </div>
                      <div className="rounded-xl bg-zinc-950/90 border border-amber-500/25 p-3">
                        <span className="font-bold text-amber-300 uppercase text-[10px] tracking-wider block">
                          🚇 {ui.logisticsLabel}
                        </span>
                        <p className="mt-1 text-zinc-200">{card.timingAndLogistics}</p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                        📍 {ui.venuesLabel}:
                      </span>
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {card.recommendedVenues.map((v) => (
                          <span
                            key={v}
                            className="rounded-md bg-white/5 border border-white/10 px-2.5 py-0.5 text-xs text-amber-200"
                          >
                            {v}
                          </span>
                        ))}
                      </div>
                    </div>

                    <ul className="mt-4 space-y-1.5 text-xs text-zinc-300">
                      {card.highlights.map((hl) => (
                        <li key={hl} className="flex items-start gap-2">
                          <span className="text-amber-400 font-bold">✓</span>
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-6 pt-0 flex flex-col sm:flex-row gap-2.5">
                  <a
                    href={`https://wa.me/393519127047?text=${encodeURIComponent(card.whatsappText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center rounded-xl bg-[#25D366] hover:bg-[#20bd5a] px-4 py-2.5 text-xs font-bold text-black transition"
                  >
                    💬 {ui.bookWhatsApp}
                  </a>
                  <Link
                    href={card.href}
                    className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 px-4 py-2.5 text-xs font-semibold text-white transition"
                  >
                    {ui.exploreGuide} →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* 2. AUTO-UPDATING SUGGESTED EVENTS CAROUSEL */}
      <div className="rounded-3xl border border-white/12 bg-zinc-900/80 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              LIVE FEED · XCEED + WEEKLY + SEASONAL
            </span>
            <h3 className="mt-1 text-2xl font-bold text-white">{ui.suggestedEventsTitle}</h3>
            <p className="mt-1 text-xs sm:text-sm text-zinc-300">{ui.suggestedEventsSubtitle}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollCarousel('prev')}
              aria-label="Previous suggested event"
              className="h-9 w-9 rounded-xl border border-white/15 bg-zinc-950 text-white hover:border-amber-400/50 flex items-center justify-center"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => scrollCarousel('next')}
              aria-label="Next suggested event"
              className="h-9 w-9 rounded-xl border border-white/15 bg-zinc-950 text-white hover:border-amber-400/50 flex items-center justify-center"
            >
              ›
            </button>
          </div>
        </div>

        <div
          ref={carouselRef}
          className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-amber-500/40"
        >
          {suggestedEvents.map((ev) => (
            <article
              key={ev.id}
              className="min-w-[290px] sm:min-w-[330px] max-w-[345px] snap-start flex flex-col justify-between rounded-2xl border border-white/10 bg-zinc-950/90 overflow-hidden hover:border-amber-400/50 transition"
            >
              <div>
                <div className="relative h-52 w-full bg-black flex items-center justify-center border-b border-white/10">
                  <Image
                    src={ev.imageSrc}
                    alt={ev.title}
                    fill
                    sizes="340px"
                    quality={80}
                    className="object-contain p-1.5"
                  />
                  <span className="absolute top-2.5 left-2.5 rounded-full bg-black/85 border border-amber-400/40 px-2.5 py-0.5 text-[10px] font-bold uppercase text-amber-300">
                    {ev.badge}
                  </span>
                  <span className="absolute top-2.5 right-2.5 rounded-full bg-emerald-500 px-2.5 py-0.5 text-xs font-extrabold text-black">
                    {ev.priceLabel}
                  </span>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between text-xs text-amber-300 mb-1">
                    <span>📅 {ev.dateLabel}</span>
                    <span>🕒 {ev.timeLabel}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white line-clamp-2">{ev.title}</h4>
                  <p className="mt-1 text-xs text-zinc-400">{ev.categoryLabel}</p>
                </div>
              </div>
              <div className="p-4 pt-0 flex flex-col gap-2">
                <a
                  href={ev.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center rounded-xl bg-[#25D366] hover:bg-[#20bd5a] px-3 py-2 text-xs font-bold text-black transition"
                >
                  💬 {ui.bookWhatsApp}
                </a>
                <Link
                  href={ev.href}
                  className="w-full inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 px-3 py-2 text-xs font-semibold text-white transition"
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
