'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Calendar, MapPin, MessageCircle, Sparkles } from 'lucide-react';
import Link from '@/components/LocalizedLink';
import type { BergamoBresciaCardViewModel } from '@/lib/bergamo-brescia/activeNights35';

export interface BergamoBresciaClubFilterItem {
  clubKey: BergamoBresciaCardViewModel['clubKey'];
  name: string;
  city: string;
  province: 'BG' | 'BS';
  href: string;
}

export interface BergamoBresciaExplorerLabels {
  filterProvinceAll: string;
  filterBergamo: string;
  filterBrescia: string;
  filterClubAll: string;
  filterFormatAll: string;
  filterFormatNye: string;
  filterFormatWeekly: string;
  filterFormatDated: string;
  liveCountPrefix: string;
  nyeBadge: string;
  weeklyBadge: string;
  datedBadge: string;
  openEventCta: string;
  bookWaCta: string;
  emptyState: string;
}

export default function BergamoBresciaExplorer({
  clubs,
  nyeCards,
  activeNights,
  initialNow,
  labels,
}: {
  clubs: BergamoBresciaClubFilterItem[];
  nyeCards: BergamoBresciaCardViewModel[];
  activeNights: BergamoBresciaCardViewModel[];
  initialNow: string;
  labels: BergamoBresciaExplorerLabels;
}) {
  const [nowMs, setNowMs] = useState<number>(() => Date.parse(initialNow) || Date.now());
  const [province, setProvince] = useState<'ALL' | 'BG' | 'BS'>('ALL');
  const [club, setClub] = useState<'ALL' | BergamoBresciaCardViewModel['clubKey']>('ALL');
  const [format, setFormat] = useState<'ALL' | 'nye' | 'weekly' | 'dated'>('ALL');

  useEffect(() => {
    const refresh = () => setNowMs(Date.now());
    refresh();
    const timer = window.setInterval(refresh, 60_000);
    const onVis = () => {
      if (document.visibilityState === 'visible') refresh();
    };
    document.addEventListener('visibilitychange', onVis);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  const visibleClubs = useMemo(
    () => (province === 'ALL' ? clubs : clubs.filter((c) => c.province === province)),
    [clubs, province],
  );

  const combined = useMemo(() => {
    const liveNye = nyeCards.filter((item) => Date.parse(item.endISO) > nowMs);
    const liveActive = activeNights.filter((item) => Date.parse(item.endISO) > nowMs);
    return [...liveNye, ...liveActive].filter((item) => {
      if (province !== 'ALL' && item.province !== province) return false;
      if (club !== 'ALL' && item.clubKey !== club) return false;
      if (format !== 'ALL' && item.kind !== format) return false;
      return true;
    });
  }, [nyeCards, activeNights, nowMs, province, club, format]);

  return (
    <div className="space-y-8">
      {/* Interactive Filter Controls */}
      <div className="space-y-4 border border-white/15 bg-[#141311] p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex flex-wrap gap-2">
            {(
              [
                { id: 'ALL', label: labels.filterProvinceAll },
                { id: 'BG', label: labels.filterBergamo },
                { id: 'BS', label: labels.filterBrescia },
              ] as const
            ).map((btn) => {
              const active = province === btn.id;
              return (
                <button
                  key={btn.id}
                  type="button"
                  onClick={() => {
                    setProvince(btn.id);
                    if (
                      btn.id !== 'ALL' &&
                      club !== 'ALL' &&
                      clubs.find((c) => c.clubKey === club)?.province !== btn.id
                    ) {
                      setClub('ALL');
                    }
                  }}
                  className={`min-h-[40px] px-4 py-2 font-mono text-xs font-extrabold uppercase tracking-wider transition-colors ${
                    active
                      ? 'bg-[#EAE3D5] text-[#050505]'
                      : 'border border-white/20 bg-[#050505] text-[#F6F1E7] hover:border-[#EAE3D5]'
                  }`}
                >
                  {btn.label}
                </button>
              );
            })}
          </div>

          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#EAE3D5]">
            {combined.length} {labels.liveCountPrefix}
          </span>
        </div>

        {/* Club Filter Pills */}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setClub('ALL')}
            className={`min-h-[38px] px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
              club === 'ALL'
                ? 'bg-[#25D366] text-[#050505]'
                : 'border border-white/15 bg-[#050505] text-[#EAE3D5] hover:border-[#EAE3D5]'
            }`}
          >
            {labels.filterClubAll}
          </button>
          {visibleClubs.map((c) => {
            const active = club === c.clubKey;
            return (
              <button
                key={c.clubKey}
                type="button"
                onClick={() => setClub(c.clubKey)}
                className={`min-h-[38px] px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                  active
                    ? 'bg-[#25D366] text-[#050505]'
                    : 'border border-white/15 bg-[#050505] text-[#EAE3D5] hover:border-[#EAE3D5]'
                }`}
              >
                {c.name} · {c.city}
              </button>
            );
          })}
        </div>

        {/* Format Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-1">
          {(
            [
              { id: 'ALL', label: labels.filterFormatAll },
              { id: 'nye', label: labels.filterFormatNye },
              { id: 'weekly', label: labels.filterFormatWeekly },
              { id: 'dated', label: labels.filterFormatDated },
            ] as const
          ).map((f) => {
            const active = format === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFormat(f.id)}
                className={`min-h-[36px] px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider transition-colors ${
                  active
                    ? 'bg-[#EAE3D5] text-[#050505]'
                    : 'border border-white/15 bg-[#050505] text-[#C2B9AA] hover:text-[#F6F1E7]'
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filtered Cards Grid */}
      {combined.length === 0 ? (
        <div className="border border-white/15 bg-[#141311] p-8 text-center font-sans text-sm text-[#C2B9AA]">
          {labels.emptyState}
        </div>
      ) : (
        <div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          data-no-lightbox="true"
        >
          {combined.map((card) => {
            const badge =
              card.kind === 'nye'
                ? labels.nyeBadge
                : card.kind === 'dated'
                  ? labels.datedBadge
                  : labels.weeklyBadge;
            return (
              <article
                key={card.id}
                data-no-lightbox="true"
                className="flex flex-col justify-between overflow-hidden border border-white/15 bg-[#141311]"
              >
                <div>
                  <Link href={card.href} prefetch={false} className="block">
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#050505]">
                      <Image
                        src={card.posterSrc}
                        alt={`${card.title} · ${card.venueName} (${card.city}, ${card.province})`}
                        width={1080}
                        height={1350}
                        quality={92}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 340px"
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                      />
                    </div>
                  </Link>

                  <div className="space-y-2.5 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-1.5">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 font-mono text-[10px] font-extrabold uppercase tracking-wider ${
                          card.kind === 'nye'
                            ? 'bg-[#EAE3D5] text-[#050505]'
                            : 'border border-[#EAE3D5]/35 bg-[#050505] text-[#EAE3D5]'
                        }`}
                      >
                        <Sparkles className="h-3 w-3" />
                        {badge}
                      </span>
                      <span className="inline-flex items-center gap-1 font-mono text-[11px] text-[#C2B9AA]">
                        <MapPin className="h-3 w-3 text-[#EAE3D5]" />
                        {card.city} ({card.province})
                      </span>
                    </div>

                    <h3 className="font-serif text-lg leading-snug text-[#F6F1E7]">
                      <Link
                        href={card.href}
                        prefetch={false}
                        className="transition-colors hover:text-[#EAE3D5]"
                      >
                        {card.title}
                      </Link>
                    </h3>

                    <p className="flex items-center gap-1.5 font-mono text-xs text-[#EAE3D5]">
                      <Calendar className="h-3.5 w-3.5 shrink-0" />
                      <span>{card.whenLabel}</span>
                    </p>

                    <p className="font-sans text-xs text-[#C2B9AA]">{card.genresLabel}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 border-t border-white/10 p-4 pt-3">
                  <Link
                    href={card.href}
                    prefetch={false}
                    className="inline-flex min-h-[42px] items-center justify-center gap-1.5 bg-[#EAE3D5] px-3 py-2 text-[11px] font-extrabold uppercase tracking-wider text-[#050505] transition-colors hover:bg-white"
                  >
                    <span>{labels.openEventCta}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <a
                    href={card.waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[42px] items-center justify-center gap-1.5 bg-[#25D366] px-3 py-2 text-[11px] font-extrabold uppercase tracking-wider text-[#050505] transition-colors hover:bg-[#2EE472]"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span>{labels.bookWaCta}</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
