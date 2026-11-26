'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from '@/components/LocalizedLink';
import { capodannoCategoryPath, capodannoEventPath } from '@/lib/capodanno/routes';
import {
  formatCapodannoHours35,
  formatCapodannoPriceBadge35,
  getCapodannoCategoryBadge35,
  getCapodannoCategoryShortLabel35,
  getCapodannoFilterOptions35,
  getCapodannoLocalizedEventContent,
  getCapodannoUiCopy,
} from '@/lib/capodanno/i18n';
import { isRepvblicNyeSlug } from '@/lib/capodanno/repvblic35';
import { isGateNyeSlug } from '@/lib/capodanno/gate35';
import { getScarcityAndChatCopy } from '@/lib/i18n/scarcityAndChatCopy';
import { toCardPoster4x5 } from '@/lib/cardPoster4x5';
import type {
  CapodannoEventItem,
  CapodannoVenueType,
  CapodannoAudience,
  CapodannoFormula,
  CapodannoMusicTag,
  CapodannoZoneTag,
  CapodannoCategoryPageDef,
} from '@/lib/capodannoEvents';

type Props = {
  events: readonly CapodannoEventItem[];
  categoryPages: readonly CapodannoCategoryPageDef[];
  activeSlug: string;
  isIt: boolean;
  locale?: string;
  prefix: string;
};

export default function CapodannoInteractiveFilter({
  events,
  categoryPages,
  activeSlug,
  isIt,
  locale = isIt ? 'it' : 'en',
  prefix,
}: Props) {
  const [venueType, setVenueType] = useState<'all' | CapodannoVenueType>('all');
  const [audience, setAudience] = useState<'all' | CapodannoAudience>('all');
  const [formula, setFormula] = useState<'all' | CapodannoFormula>('all');
  const [musicTag, setMusicTag] = useState<'all' | CapodannoMusicTag>('all');
  const [zoneTag, setZoneTag] = useState<'all' | CapodannoZoneTag>('all');
  const [budget, setBudget] = useState<'all' | 'free' | 'low' | 'mid' | 'lux'>('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return events.filter((ev) => {
      if (venueType !== 'all' && ev.venueType !== venueType) return false;
      if (audience !== 'all' && !ev.audiences.includes(audience)) return false;
      if (formula !== 'all' && !ev.formulas.includes(formula)) return false;
      if (musicTag !== 'all' && ev.musicTag !== musicTag) return false;
      if (zoneTag !== 'all' && ev.zoneTag !== zoneTag) return false;
      if (budget === 'free' && (ev.category !== 'piazza' || ev.priceFromEur > 0)) return false;
      if (budget === 'low' && ((ev.category !== 'piazza' && ev.priceFromEur <= 0) || ev.priceFromEur > 35)) return false;
      if (budget === 'mid' && (ev.priceFromEur < 35 || ev.priceFromEur > 70)) return false;
      if (budget === 'lux' && ev.priceFromEur < 70) return false;
      if (q) {
        const hay = `${ev.venueName} ${ev.titleIt} ${ev.titleEn} ${ev.city} ${ev.address} ${ev.musicAndFormatIt} ${ev.priceSummaryIt}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [events, venueType, audience, formula, musicTag, zoneTag, budget, query]);

  const hasActiveFilter =
    venueType !== 'all' ||
    audience !== 'all' ||
    formula !== 'all' ||
    musicTag !== 'all' ||
    zoneTag !== 'all' ||
    budget !== 'all' ||
    query.trim() !== '';

  const resetFilters = () => {
    setVenueType('all');
    setAudience('all');
    setFormula('all');
    setMusicTag('all');
    setZoneTag('all');
    setBudget('all');
    setQuery('');
  };

  const ui = getCapodannoUiCopy(locale);
  const scarcity = getScarcityAndChatCopy(locale);
  const {
    w,
    venueTypeOptions,
    audienceOptions,
    formulaOptions,
    musicOptions,
    zoneOptions,
    budgetOptions,
  } = getCapodannoFilterOptions35(locale);

  return (
    <div className="mt-10 space-y-10" data-capodanno-interactive-filter>
      {/* 16 Dedicated SEO Category Pages Grid (V01 Couture Noir) */}
      <div id="categorie-capodanno" className="border border-[#F6F1E7]/16 bg-[#0B0A09] text-[#F6F1E7] p-5 sm:p-7">
        <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#EAE3D5]">
              {ui.categoryBoxEyebrow}
            </p>
            <h2 className="mt-1 font-serif text-xl font-bold text-[#F6F1E7] sm:text-2xl">
              {ui.categoryBoxHeading}
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
          {categoryPages.map((cat) => {
            const isCurrent = cat.slug === activeSlug;
            return (
              <Link
                key={cat.slug}
                href={capodannoCategoryPath(cat.slug, locale)}
                prefetch={false}
                className={`flex flex-col justify-between border p-3 transition-colors ${
                  isCurrent
                    ? 'border-[#25D366] bg-[#1E1C19] text-[#F6F1E7]'
                    : 'border-[#F6F1E7]/16 bg-[#141311] text-[#F6F1E7] hover:border-[#EAE3D5]'
                }`}
              >
                <span className={`text-[10px] font-bold uppercase tracking-wider ${isCurrent ? 'text-[#25D366]' : 'text-[#C2B9AA]'}`}>
                  {getCapodannoCategoryBadge35(cat.slug, locale, cat.badgeIt, cat.badgeEn)}
                </span>
                <span className="mt-1 text-xs font-bold leading-snug sm:text-sm">
                  {getCapodannoCategoryShortLabel35(cat.slug, locale, cat.shortLabelIt, cat.shortLabelEn)} →
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Interactive Multi-Filter Controls */}
      <div id="filtro-eventi" className="border border-[#F6F1E7]/25 bg-[#0B0A09] p-5 sm:p-7">
        <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-champagne">
              {ui.filterEyebrow}
            </p>
            <h3 className="mt-1 font-serif text-xl font-bold text-white sm:text-2xl">
              {`${ui.filterHeadingPrefix} (${filtered.length} / ${events.length})`}
            </h3>
          </div>
          {hasActiveFilter && (
            <button
              type="button"
              onClick={resetFilters}
              className="self-start rounded-lg border border-champagne px-4 py-2 text-xs font-bold uppercase tracking-wider text-champagne transition hover:bg-champagne hover:text-black sm:self-auto"
            >
              {ui.resetFiltersBtn}
            </button>
          )}
        </div>

        {/* Quick Target Audience Pills */}
        <div className="mt-4">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-white/60">
            {w.quickTargetPrompt}
          </p>
          <div className="flex flex-wrap gap-2">
            {audienceOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setAudience(opt.value)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                  audience === opt.value
                    ? 'bg-champagne text-black'
                    : 'border border-[#F6F1E7]/14 bg-black/40 text-white/85 hover:border-champagne/60'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* 6 Dropdown / Search Controls */}
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label htmlFor="cap-filter-type" className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-champagne">
              {w.lblVenueType}
            </label>
            <select
              id="cap-filter-type"
              value={venueType}
              onChange={(e) => setVenueType(e.target.value as any)}
              className="min-h-[44px] w-full rounded-xl border border-[#F6F1E7]/14 bg-black/70 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:border-champagne focus:outline-none"
            >
              {venueTypeOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="cap-filter-formula" className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-champagne">
              {w.lblFormula}
            </label>
            <select
              id="cap-filter-formula"
              value={formula}
              onChange={(e) => setFormula(e.target.value as any)}
              className="min-h-[44px] w-full rounded-xl border border-[#F6F1E7]/14 bg-black/70 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:border-champagne focus:outline-none"
            >
              {formulaOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="cap-filter-music" className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-champagne">
              {w.lblMusic}
            </label>
            <select
              id="cap-filter-music"
              value={musicTag}
              onChange={(e) => setMusicTag(e.target.value as any)}
              className="min-h-[44px] w-full rounded-xl border border-[#F6F1E7]/14 bg-black/70 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:border-champagne focus:outline-none"
            >
              {musicOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="cap-filter-zone" className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-champagne">
              {w.lblZone}
            </label>
            <select
              id="cap-filter-zone"
              value={zoneTag}
              onChange={(e) => setZoneTag(e.target.value as any)}
              className="min-h-[44px] w-full rounded-xl border border-[#F6F1E7]/14 bg-black/70 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:border-champagne focus:outline-none"
            >
              {zoneOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="cap-filter-budget" className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-champagne">
              {w.lblBudget}
            </label>
            <select
              id="cap-filter-budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value as any)}
              className="min-h-[44px] w-full rounded-xl border border-[#F6F1E7]/14 bg-black/70 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:border-champagne focus:outline-none"
            >
              {budgetOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="cap-filter-query" className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-champagne">
              {w.lblSearch}
            </label>
            <input
              id="cap-filter-query"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={w.searchPlaceholder}
              className="min-h-[44px] w-full rounded-xl border border-[#F6F1E7]/14 bg-black/70 px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-white/40 focus:border-champagne focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Filtered Results Grid */}
      {filtered.length === 0 ? (
        <div className="border border-[#F6F1E7]/15 bg-[#0B0A09] p-10 text-center">
          <p className="font-serif text-2xl font-bold text-[#F6F1E7]">
            {w.noResultsTitle}
          </p>
          <p className="mt-2 text-sm text-[#C2B9AA]">
            {w.noResultsBody}
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-5 bg-[#F6F1E7] px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#050505] hover:bg-[#EAE3D5]"
          >
            {w.showAllBtn}
          </button>
        </div>
      ) : (
        <div id="catalogo-eventi" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((event, index) => {
            const localized = getCapodannoLocalizedEventContent(event, locale);
            const title = localized.title;
            const description = localized.description;
            const music = localized.musicAndFormat;
            const dress = localized.dressCode;
            const tiers = localized.tiers;
            const detailHref = capodannoEventPath(event.slug, locale);
            return (
              <article
                key={event.slug}
                className="flex flex-col justify-between overflow-hidden border border-[#F6F1E7]/14 bg-[#141311] text-[#F6F1E7] transition hover:border-[#EAE3D5]/32"
              >
                <div>
                  <Link
                    href={detailHref}
                    data-no-lightbox="true"
                    className="relative block aspect-[4/5] w-full overflow-hidden border-b border-[#F6F1E7]/14 bg-[#050505]"
                    aria-label={title}
                  >
                    <Image
                      quality={92}
                      src={toCardPoster4x5(event.image)}
                      alt={title}
                      fill
                      loading={index < 6 ? 'eager' : 'lazy'}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                      className="object-cover"
                    />
                  </Link>

                  <div className="p-5">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span className="border border-[#EAE3D5]/32 bg-[#EAE3D5] px-2.5 py-1 text-xs font-semibold text-[#050505]">
                        {event.city} ({event.province})
                      </span>
                      <span className="font-display text-2xl font-bold tabular-nums text-[#EAE3D5]">
                        {formatCapodannoPriceBadge35(event, locale)}
                      </span>
                      {!isRepvblicNyeSlug(event.slug) && !isGateNyeSlug(event.slug) && (
                        <span className="bg-[#050505] px-2.5 py-1 text-xs font-bold text-[#F6F1E7]" data-selling-fast-badge>
                          {scarcity.sellingFastBadge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-bold text-[#C2B9AA]">{event.venueName}</p>
                    <h3 className="mt-1 mb-3 font-display text-2xl font-bold leading-tight text-[#F6F1E7]">
                      <Link href={detailHref} className="hover:underline">
                        {title}
                      </Link>
                    </h3>
                    <p className="text-xs text-[#C2B9AA]">
                      <strong className="text-[#F6F1E7]">{w.addressLabel}</strong> {event.address} ·{' '}
                      <strong className="text-[#F6F1E7]">{w.hoursLabel}</strong> {formatCapodannoHours35(event.hours, locale)}
                    </p>
                    <p className="mt-2.5 text-sm leading-relaxed text-[#C2B9AA]">{description}</p>

                    <div className="mt-4 border border-[#F6F1E7]/14 bg-[#0B0A09] p-3.5">
                      <p className="mb-2 text-xs font-bold text-[#F6F1E7]">
                        {w.priceTiersHeading}
                      </p>
                      <ul className="space-y-2 text-xs">
                        {tiers.slice(0, 3).map((tier) => (
                          <li key={tier.label} className="border-b border-[#EAE3D5]/32/12 pb-1.5 last:border-0 last:pb-0">
                            <div className="flex items-baseline justify-between gap-2 tabular-nums">
                              <span className="font-semibold text-[#F6F1E7]">{tier.label}</span>
                              <span className="shrink-0 font-bold text-[#F6F1E7]">{tier.price}</span>
                            </div>
                            <p className="mt-0.5 text-xs text-[#C2B9AA]">{tier.details}</p>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2 text-xs text-[#C2B9AA]">
                      <span className="border border-[#F6F1E7]/14 bg-[#0B0A09] px-2.5 py-1">
                        <strong className="text-[#F6F1E7]">{ui.musicLabel}:</strong> {music}
                      </span>
                      <span className="border border-[#F6F1E7]/14 bg-[#0B0A09] px-2.5 py-1">
                        <strong className="text-[#F6F1E7]">{w.dressCodeLabel}:</strong> {dress}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#F6F1E7]/14 bg-[#141311] px-5 py-3.5">
                  <Link
                    href={detailHref}
                    data-capodanno-open-event={event.slug}
                    className="inline-flex min-h-[46px] w-full items-center justify-center bg-[#EAE3D5] px-4 py-2.5 text-center text-xs font-bold uppercase text-[#050505] transition hover:bg-[#25D366] hover:text-[#050505] sm:text-sm"
                  >
                    {scarcity.openEventCardCta}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
