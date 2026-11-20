'use client';

import { useMemo, useState } from 'react';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import Link from '@/components/LocalizedLink';
import type { LocaleCode } from '@/lib/i18n/localeRegistry';
import type {
  ExplorerFilterId,
  TasteExplorerData,
  TasteExplorerItem,
} from '@/lib/tasteExplorerData';

interface TastePillarExplorerProps {
  data: TasteExplorerData;
  locale: LocaleCode;
}

/**
 * Interactive partner club and thermal directory ("One live thing" per Taste chapter).
 * Flat Couture Noir tonal rows (#0B0A09 / #141311), zero 1px boxed cards, >=14px type.
 */
export default function TastePillarExplorer({ data, locale }: TastePillarExplorerProps) {
  const [activeFilter, setActiveFilter] = useState<ExplorerFilterId>('all');
  const [selectedId, setSelectedId] = useState<string>(data.items[0]?.id || '');

  const visibleItems = useMemo<TasteExplorerItem[]>(() => {
    if (activeFilter === 'all') return data.items;
    return data.items.filter((item) => item.filters.includes(activeFilter));
  }, [activeFilter, data.items]);

  const activeItem = useMemo<TasteExplorerItem | undefined>(() => {
    return visibleItems.find((item) => item.id === selectedId) || visibleItems[0] || data.items[0];
  }, [visibleItems, selectedId, data.items]);

  const filterCounts = useMemo<Record<string, number>>(() => {
    const out: Record<string, number> = {};
    for (const opt of data.filterOptions) {
      out[opt.id] = opt.id === 'all'
        ? data.items.length
        : data.items.filter((it) => it.filters.includes(opt.id)).length;
    }
    return out;
  }, [data.filterOptions, data.items]);

  return (
    <section
      id="explorer"
      aria-labelledby="taste-explorer-title"
      className="bg-[#050505] text-[#F6F1E7] py-16 sm:py-20"
      data-no-lightbox="true"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-10" data-taste-reveal>
          <div className="lg:col-span-7">
            <h2 id="taste-explorer-title" className="taste-section-display font-bold text-[#F6F1E7] m-0">
              {data.heading}
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[15px] sm:text-base text-[#EAE3D5] leading-relaxed m-0">
              {data.lead}
            </p>
          </div>
        </div>

        {/* Flat tonal filter tabs — never pill, never hairline-boxed, >= 14px */}
        <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label={data.heading}>
          {data.filterOptions.map((opt) => {
            const isActive = activeFilter === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveFilter(opt.id)}
                className={`min-h-[44px] px-4 py-2.5 text-[14px] font-semibold transition-colors tabular-nums cursor-pointer ${
                  isActive
                    ? 'bg-[#25D366] text-[#050505]'
                    : 'bg-[#141311] text-[#EAE3D5] hover:bg-[#1F1C18] hover:text-[#F6F1E7]'
                }`}
              >
                {opt.label} ({filterCounts[opt.id] ?? 0})
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Interactive ledger rows (left 7 cols) */}
          <div className="lg:col-span-7 bg-[#050505] flex flex-col gap-[2px]" data-taste-stagger>
            <div className="hidden sm:grid grid-cols-12 gap-3 px-4 py-3 bg-[#141311] text-[14px] font-semibold text-[#C2B9AA]">
              <span className="col-span-5">{data.colVenue}</span>
              <span className="col-span-4">{data.colRate}</span>
              <span className="col-span-3 text-right">{data.colStatus}</span>
            </div>

            {visibleItems.map((item) => {
              const selected = activeItem?.id === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedId(item.id)}
                  className={`w-full text-left px-4 py-4 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-3 items-center transition-colors cursor-pointer ${
                    selected
                      ? 'bg-[#1A1815] text-[#F6F1E7]'
                      : 'bg-[#0B0A09] text-[#EAE3D5] hover:bg-[#141311]'
                  }`}
                >
                  <div className="sm:col-span-5">
                    <div className="text-base font-bold text-[#F6F1E7] leading-snug">
                      {item.name}
                    </div>
                    <div className="text-[14px] text-[#C2B9AA] mt-0.5 leading-snug">
                      {item.district}
                    </div>
                  </div>
                  <div className="sm:col-span-4 text-[14px] font-medium text-[#F6F1E7] tabular-nums">
                    {item.rate}
                  </div>
                  <div className="sm:col-span-3 sm:text-right text-[14px] font-semibold">
                    <span className={selected ? 'text-[#25D366]' : 'text-[#EAE3D5]'}>
                      {item.status}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active venue spotlight drawer (right 5 cols) */}
          {activeItem && (
            <aside
              aria-label={activeItem.name}
              className="lg:col-span-5 lg:sticky lg:top-24 bg-[#141311] p-6 sm:p-8"
              data-no-lightbox="true"
            >
              <h3 className="font-display text-2xl font-bold text-[#F6F1E7] leading-tight mb-2">
                {activeItem.name}
              </h3>
              <p className="text-[14px] text-[#C2B9AA] mb-5 leading-relaxed">
                {data.spotlightHeading} · {activeItem.district}
              </p>

              <dl className="space-y-4 mb-7 text-[15px]">
                <div className="bg-[#0B0A09] p-4">
                  <dt className="text-[14px] text-[#C2B9AA] mb-1">{data.colRate}</dt>
                  <dd className="text-lg font-bold text-[#F6F1E7] tabular-nums m-0">
                    {activeItem.rate}
                  </dd>
                </div>
                <div className="bg-[#0B0A09] p-4">
                  <dt className="text-[14px] text-[#C2B9AA] mb-1">{data.colStatus}</dt>
                  <dd className="text-[15px] font-semibold text-[#25D366] m-0">
                    {activeItem.status}
                  </dd>
                </div>
                <div className="bg-[#0B0A09] p-4 space-y-2">
                  <p className="text-[15px] text-[#F6F1E7] leading-relaxed m-0">
                    {activeItem.subtitle}
                  </p>
                  <p className="text-[14px] text-[#C2B9AA] leading-relaxed m-0">
                    {activeItem.detailNote}
                  </p>
                </div>
              </dl>

              <div className="flex flex-col gap-3">
                <a
                  href={activeItem.waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="taste-btn-primary w-full"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span>{data.whatsappLabel}</span>
                </a>
                <Link
                  href={activeItem.primaryHref}
                  locale={locale}
                  prefetch={false}
                  className="taste-btn-outline-light w-full"
                >
                  <span>{activeItem.primaryLabel}</span>
                  <ArrowUpRight className="w-4 h-4 shrink-0" />
                </Link>
                {activeItem.secondaryHref && activeItem.secondaryLabel && (
                  <Link
                    href={activeItem.secondaryHref}
                    locale={locale}
                    prefetch={false}
                    className="taste-btn-outline-light w-full"
                  >
                    <span>{activeItem.secondaryLabel}</span>
                    <ArrowUpRight className="w-4 h-4 shrink-0" />
                  </Link>
                )}
              </div>
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}
