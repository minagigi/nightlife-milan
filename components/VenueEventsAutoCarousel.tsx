'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type {
  VenueUi35,
  CarouselEventCard,
  CelebrationOption,
  VenueServiceItem,
  VenueTargetProfile,
} from '@/lib/venueDossiers35';

interface VenueEventsAutoCarouselProps {
  venueName: string;
  ui: VenueUi35;
  tonight: CarouselEventCard[];
  thisWeek: CarouselEventCard[];
  curatedProposals: CarouselEventCard[];
  future: CarouselEventCard[];
  targetProfile: VenueTargetProfile;
  celebrations: CelebrationOption[];
  services: VenueServiceItem[];
}

type TabKey = 'tonight' | 'thisWeek' | 'curated' | 'future';

export default function VenueEventsAutoCarousel({
  venueName,
  ui,
  tonight,
  thisWeek,
  curatedProposals,
  future,
  targetProfile,
  celebrations,
  services,
}: VenueEventsAutoCarouselProps) {
  const defaultTab: TabKey =
    tonight.length > 0
      ? 'tonight'
      : thisWeek.length > 0
        ? 'thisWeek'
        : curatedProposals.length > 0
          ? 'curated'
          : 'future';

  const [activeTab, setActiveTab] = useState<TabKey>(defaultTab);
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const rawItems: CarouselEventCard[] =
    activeTab === 'tonight'
      ? tonight
      : activeTab === 'thisWeek'
        ? thisWeek
        : activeTab === 'curated'
          ? curatedProposals
          : future;

  const showTonightFallback = activeTab === 'tonight' && tonight.length === 0;
  const activeItems: CarouselEventCard[] =
    rawItems.length > 0 ? rawItems : curatedProposals.length > 0 ? curatedProposals : future;

  const handleScroll = (dir: 'prev' | 'next') => {
    if (!scrollRef.current) return;
    const offset = dir === 'next' ? 380 : -380;
    scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  return (
    <div className="space-y-12 my-12">
      {/* 1. AUTO-UPDATED EVENTS CAROUSEL & TABS */}
      <section
        aria-label={ui.eventsTitle}
        className="rounded-3xl border border-amber-500/25 bg-gradient-to-b from-zinc-900/95 via-zinc-950 to-black p-6 sm:p-8 shadow-2xl"
      >
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-6">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-amber-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              {ui.eventsEyebrow}
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {venueName} · {ui.eventsTitle}
            </h2>
            <p className="mt-1.5 text-sm text-zinc-300 max-w-3xl">{ui.eventsSubtitle}</p>
          </div>

          {/* View Mode & Carousel Arrows */}
          <div className="flex items-center gap-2 self-start lg:self-end">
            <div className="inline-flex rounded-xl border border-white/10 bg-zinc-900/90 p-1">
              <button
                type="button"
                onClick={() => setViewMode('carousel')}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  viewMode === 'carousel'
                    ? 'bg-amber-500 text-black'
                    : 'text-zinc-300 hover:text-white'
                }`}
              >
                {ui.viewCarousel}
              </button>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  viewMode === 'grid'
                    ? 'bg-amber-500 text-black'
                    : 'text-zinc-300 hover:text-white'
                }`}
              >
                {ui.viewGrid}
              </button>
            </div>
            {viewMode === 'carousel' && (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleScroll('prev')}
                  aria-label="Previous slide"
                  className="h-9 w-9 rounded-xl border border-white/15 bg-zinc-900 text-white hover:border-amber-400/50 hover:text-amber-300 flex items-center justify-center transition"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={() => handleScroll('next')}
                  aria-label="Next slide"
                  className="h-9 w-9 rounded-xl border border-white/15 bg-zinc-900 text-white hover:border-amber-400/50 hover:text-amber-300 flex items-center justify-center transition"
                >
                  ›
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 4 Category Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4 mb-6" role="tablist">
          {(
            [
              { key: 'tonight', label: ui.tabTonight, count: tonight.length },
              { key: 'thisWeek', label: ui.tabThisWeek, count: thisWeek.length },
              { key: 'curated', label: ui.tabCurated, count: curatedProposals.length },
              { key: 'future', label: ui.tabFuture, count: future.length },
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

        {showTonightFallback && (
          <div className="mb-5 rounded-2xl border border-amber-400/30 bg-amber-500/10 px-4 py-3 text-xs sm:text-sm text-amber-200">
            {ui.tonightFallbackNotice}
          </div>
        )}

        {/* Cards Container (Carousel or Grid) */}
        <div
          ref={scrollRef}
          className={
            viewMode === 'carousel'
              ? 'flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-amber-500/40'
              : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'
          }
        >
          {activeItems.map((ev) => (
            <article
              key={ev.id}
              className={`${
                viewMode === 'carousel' ? 'min-w-[295px] sm:min-w-[335px] max-w-[350px] snap-start' : ''
              } flex flex-col justify-between rounded-2xl border border-white/12 bg-zinc-900/90 overflow-hidden hover:border-amber-400/50 transition group`}
            >
              <div>
                {/* Uncropped Flyer / Image Frame */}
                <div className="relative h-56 w-full bg-zinc-950 flex items-center justify-center overflow-hidden border-b border-white/10">
                  <Image
                    src={ev.imageSrc}
                    alt={`${ev.title} - ${venueName}`}
                    fill
                    sizes="(max-width: 768px) 90vw, 350px"
                    quality={80}
                    className="object-contain p-1.5 group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-black/85 border border-amber-400/40 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-300">
                    {ev.badge}
                  </span>
                  <span className="absolute top-3 right-3 rounded-full bg-emerald-500/95 px-2.5 py-1 text-xs font-extrabold text-black shadow">
                    {ui.fromPrice} {ev.priceLabel}
                  </span>
                </div>

                {/* Card Copy */}
                <div className="p-4">
                  <div className="flex items-center justify-between text-xs text-amber-300/90 font-medium mb-1.5">
                    <span>📅 {ev.dateLabel}</span>
                    <span>🕒 {ev.timeLabel}</span>
                  </div>
                  <h3 className="text-base font-bold text-white line-clamp-2 group-hover:text-amber-300 transition">
                    {ev.title}
                  </h3>
                  <p className="mt-1 text-xs text-zinc-400">{ev.categoryLabel}</p>

                  {ev.genres && ev.genres.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {ev.genres.map((g) => (
                        <span
                          key={g}
                          className="rounded-md bg-white/5 border border-white/10 px-2 py-0.5 text-[11px] text-zinc-300"
                        >
                          {g}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Dual Action Footer */}
              <div className="p-4 pt-0 flex flex-col gap-2">
                <a
                  href={ev.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] px-3.5 py-2.5 text-xs font-bold text-black transition shadow"
                >
                  <span>💬 {ui.bookWhatsApp}</span>
                </a>
                <Link
                  href={ev.href}
                  className="w-full inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 px-3.5 py-2 text-xs font-semibold text-white transition"
                >
                  {ui.viewEvent} →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 2. TARGET, CROWD, DRESS CODE, MUSIC & LOGISTICS DOSSIER */}
      <section
        aria-label={ui.targetTitle}
        className="rounded-3xl border border-white/12 bg-zinc-900/75 p-6 sm:p-8"
      >
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
          {ui.targetEyebrow}
        </span>
        <h2 className="mt-2 text-2xl font-bold text-white">
          {venueName} · {ui.targetTitle}
        </h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { label: ui.labelAge, value: targetProfile.ageRange, icon: '👥' },
            { label: ui.labelCrowd, value: targetProfile.crowdVibe, icon: '✨' },
            { label: ui.labelDressCode, value: targetProfile.dressCode, icon: '👔' },
            { label: ui.labelMusic, value: targetProfile.musicStyle, icon: '🎧' },
            { label: ui.labelMetro, value: targetProfile.metroAndParking, icon: '🚇' },
            { label: ui.labelSchedule, value: targetProfile.openingSchedule, icon: '🕒' },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/10 bg-zinc-950/80 p-4 flex flex-col justify-between"
            >
              <div className="text-xs font-semibold uppercase tracking-wider text-amber-300 flex items-center gap-2">
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </div>
              <p className="mt-2 text-sm text-zinc-200 leading-relaxed">{item.value}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              💎 {ui.labelPrices}
            </span>
            <p className="text-sm text-white font-medium mt-0.5">{targetProfile.priceSummary}</p>
          </div>
          <a
            href={`https://wa.me/393519127047?text=${encodeURIComponent(
              `Ciao Nightlife Milan, vorrei info e prezzi aggiornati per ${venueName}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center justify-center rounded-xl bg-[#25D366] px-4 py-2.5 text-xs font-bold text-black hover:bg-[#20bd5a] transition"
          >
            WhatsApp +39 351 912 7047
          </a>
        </div>
      </section>

      {/* 3. VENUE DECLARED AVAILABLE FOR ALL PARTY TYPES & CELEBRATIONS */}
      <section
        aria-label={ui.celebrationsTitle}
        className="rounded-3xl border border-amber-500/25 bg-zinc-900/80 p-6 sm:p-8"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
            {ui.celebrationsEyebrow}
          </span>
          <span className="rounded-full border border-emerald-400/40 bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">
            ✓ {ui.availableBadge}
          </span>
        </div>
        <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-white">
          {venueName} · {ui.celebrationsTitle}
        </h2>
        <p className="mt-2 text-sm text-zinc-300 max-w-3xl">{ui.celebrationsSubtitle}</p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {celebrations.map((cel) => (
            <div
              key={cel.id}
              className="rounded-2xl border border-white/10 bg-zinc-950/90 p-5 flex flex-col justify-between hover:border-amber-400/40 transition"
            >
              <div>
                <span className="inline-block rounded-lg bg-amber-500/15 border border-amber-400/30 px-2.5 py-1 text-[11px] font-semibold text-amber-300">
                  {cel.formula}
                </span>
                <h3 className="mt-3 text-lg font-bold text-white">{cel.title}</h3>
                <p className="mt-1 text-xs font-semibold text-emerald-400">
                  {cel.priceIndication}
                </p>
                <p className="mt-2.5 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {cel.details}
                </p>
              </div>
              <a
                href={`https://wa.me/393519127047?text=${encodeURIComponent(cel.whatsappText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full inline-flex items-center justify-center rounded-xl border border-amber-400/40 bg-amber-500/10 hover:bg-amber-500 hover:text-black px-3.5 py-2 text-xs font-bold text-amber-300 transition"
              >
                💬 {ui.askQuoteCta}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* 4. ALL 10 TURNKEY SERVICES OFFERED AT THIS VENUE */}
      <section
        aria-label={ui.servicesTitle}
        className="rounded-3xl border border-white/12 bg-zinc-900/75 p-6 sm:p-8"
      >
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
          {ui.servicesEyebrow}
        </span>
        <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-white">
          {venueName} · {ui.servicesTitle}
        </h2>
        <p className="mt-2 text-sm text-zinc-300 max-w-3xl">{ui.servicesSubtitle}</p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {services.map((srv, idx) => (
            <div
              key={srv.id}
              className="rounded-2xl border border-white/10 bg-zinc-950/85 p-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-amber-400 font-bold">
                  <span>{String(idx + 1).padStart(2, '0')}</span>
                  <span className="text-emerald-400">✓</span>
                </div>
                <h3 className="mt-2 text-sm font-bold text-white">{srv.title}</h3>
                <p className="mt-1 text-[11px] font-semibold text-amber-300/90">{srv.spec}</p>
                <p className="mt-2 text-xs text-zinc-300 leading-relaxed">{srv.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
