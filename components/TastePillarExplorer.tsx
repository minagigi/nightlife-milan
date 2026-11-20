'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import Link from '@/components/LocalizedLink';
import type { LocaleCode } from '@/lib/i18n/locales';
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
 * Interactive partner club & thermal directory (Taste V2 + S17 Obsidian tones).
 * Compact sticky spotlight keeps CTAs well above the bottom-right floating WhatsApp bubble at 1440x900.
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
      className="bg-[#0A0A0C] text-[#FFFFFF] py-14 sm:py-20"
      data-no-lightbox="true"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end mb-8" data-taste-reveal>
          <div className="lg:col-span-7">
            <h2 id="taste-explorer-title" className="taste-section-display font-bold text-[#FFFFFF] m-0">
              {data.heading}
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[15px] sm:text-base text-[#EDEBE6] leading-relaxed m-0">
              {data.lead}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-7" role="tablist" aria-label={data.heading}>
          {data.filterOptions.map((opt) => {
            const isActive = activeFilter === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveFilter(opt.id)}
                className={`min-h-[44px] px-4 py-2 text-[14px] font-semibold transition-colors tabular-nums cursor-pointer inline-flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#FFFFFF] text-[#0A0A0C]'
                    : 'bg-[#141418] text-[#EDEBE6] hover:bg-[#1E1E24] hover:text-[#FFFFFF]'
                }`}
              >
                {isActive && <span className="w-1.5 h-3.5 bg-[#D9381E] shrink-0" aria-hidden="true" />}
                <span>{opt.label} ({filterCounts[opt.id] ?? 0})</span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Interactive ledger rows (left 7 cols) */}
          <div className="lg:col-span-7 bg-[#0A0A0C] flex flex-col gap-[2px]" data-taste-stagger>
            <div className="hidden sm:grid grid-cols-12 gap-3 px-4 py-3 bg-[#18181C] text-[14px] font-semibold text-[#C9C7C2]">
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
                  className={`w-full text-left px-4 py-3.5 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-3 items-center transition-colors cursor-pointer ${
                    selected
                      ? 'bg-[#18181C] text-[#FFFFFF]'
                      : 'bg-[#111115] text-[#EDEBE6] hover:bg-[#16161B]'
                  }`}
                >
                  <div className="sm:col-span-5 flex items-start gap-2.5">
                    <span
                      className={`w-1 self-stretch shrink-0 ${selected ? 'bg-[#D9381E]' : 'bg-transparent'}`}
                      aria-hidden="true"
                    />
                    <div className="min-w-0">
                      <div className="text-base font-bold text-[#FFFFFF] leading-snug">
                        {item.name}
                      </div>
                      <div className="text-[14px] text-[#C9C7C2] mt-0.5 leading-snug">
                        {item.district}
                      </div>
                    </div>
                  </div>
                  <div className="sm:col-span-4 text-[14px] font-medium text-[#FFFFFF] tabular-nums">
                    {item.rate}
                  </div>
                  <div className="sm:col-span-3 sm:text-right text-[14px] font-semibold">
                    <span className={selected ? 'text-[#25D366]' : 'text-[#EDEBE6]'}>
                      {item.status}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Compact Spotlight Drawer with curated 16:9 photo preview */}
          {activeItem && (
            <aside
              aria-label={activeItem.name}
              className="lg:col-span-5 lg:sticky lg:top-20 bg-[#141418] p-5 sm:p-6"
              data-no-lightbox="true"
            >
              <figure className="relative aspect-[16/9] w-full overflow-clip bg-[#0A0A0C] mb-4">
                <Image
                  key={activeItem.image}
                  src={activeItem.image}
                  alt={activeItem.imageCaption}
                  fill
                  unoptimized
                  quality={92}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <figcaption className="absolute bottom-2 left-2 bg-[#0A0A0C]/88 px-2.5 py-1 text-[14px] font-medium text-[#FFFFFF]">
                  {activeItem.imageCaption}
                </figcaption>
              </figure>

              <h3 className="font-display text-xl font-bold text-[#FFFFFF] leading-tight mb-1">
                {activeItem.name}
              </h3>
              <p className="text-[14px] text-[#C9C7C2] mb-4 leading-snug">
                {data.spotlightHeading} · {activeItem.district}
              </p>

              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3 text-[14px]">
                <div className="bg-[#0A0A0C] p-3">
                  <dt className="text-[14px] text-[#C9C7C2] mb-0.5">{data.colRate}</dt>
                  <dd className="text-[15px] font-bold text-[#FFFFFF] tabular-nums m-0">
                    {activeItem.rate}
                  </dd>
                </div>
                <div className="bg-[#0A0A0C] p-3">
                  <dt className="text-[14px] text-[#C9C7C2] mb-0.5">{data.colStatus}</dt>
                  <dd className="text-[15px] font-semibold text-[#25D366] m-0">
                    {activeItem.status}
                  </dd>
                </div>
              </dl>

              <div className="bg-[#0A0A0C] p-3 mb-4 space-y-1">
                <p className="text-[14px] text-[#FFFFFF] leading-snug m-0">
                  {activeItem.subtitle}
                </p>
                <p className="text-[14px] text-[#C9C7C2] leading-snug m-0">
                  {activeItem.detailNote}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <a
                  href={activeItem.waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="taste-btn-primary w-full"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span>{data.whatsappLabel}</span>
                </a>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <Link
                    href={activeItem.primaryHref}
                    locale={locale}
                    prefetch={false}
                    className={`taste-btn-outline-light ${activeItem.secondaryHref ? '' : 'sm:col-span-2'}`}
                  >
                    <span>{activeItem.primaryLabel}</span>
                    <ArrowUpRight className="w-4 h-4 shrink-0" />
                  </Link>
                  {activeItem.secondaryHref && activeItem.secondaryLabel && (
                    <Link
                      href={activeItem.secondaryHref}
                      locale={locale}
                      prefetch={false}
                      className="taste-btn-outline-light"
                    >
                      <span>{activeItem.secondaryLabel}</span>
                      <ArrowUpRight className="w-4 h-4 shrink-0" />
                    </Link>
                  )}
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}
