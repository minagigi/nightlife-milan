'use client';

import React, { useMemo, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import type { UnifiedSiteRow } from '@/lib/unifiedAnalytics';
import { refreshUnifiedAnalyticsAction } from '@/app/[locale]/analytics/actions';

type SortKey =
  | 'sessions'
  | 'gscClicks'
  | 'whatsappClicks'
  | 'xceedClicks'
  | 'beginCheckout'
  | 'abandonedCarts'
  | 'purchases'
  | 'revenueEur';

type GroupFilter = 'all' | 'nightlife' | 'axel';

function fmtInt(n: number): string {
  return new Intl.NumberFormat('it-IT').format(Math.round(n || 0));
}

function fmtEur(n: number): string {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: n % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(n || 0);
}

export function UnifiedRefreshButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleRefresh = () => {
    startTransition(async () => {
      await refreshUnifiedAnalyticsAction();
      router.refresh();
    });
  };

  return (
    <button
      type="button"
      onClick={handleRefresh}
      disabled={isPending}
      className="border border-champagne/40 bg-champagne/10 text-champagne hover:bg-champagne hover:text-[#050505] rounded-full px-4 py-2 text-xs font-semibold transition-colors disabled:opacity-60 cursor-pointer"
    >
      {isPending ? 'Aggiornamento in corso...' : 'Aggiorna dati ora'}
    </button>
  );
}

export function UnifiedSitesTable({ sites }: { sites: UnifiedSiteRow[] }) {
  const [query, setQuery] = useState('');
  const [groupFilter, setGroupFilter] = useState<GroupFilter>('all');
  const [sortKey, setSortKey] = useState<SortKey>('sessions');
  const [sortDesc, setSortDesc] = useState(true);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDesc((prev) => !prev);
    } else {
      setSortKey(key);
      setSortDesc(true);
    }
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = sites.filter((s) => {
      if (groupFilter !== 'all' && s.group !== groupFilter) return false;
      if (!q) return true;
      return s.domain.toLowerCase().includes(q) || s.label.toLowerCase().includes(q);
    });

    return [...base].sort((a, b) => {
      const av = Number(a[sortKey] ?? 0);
      const bv = Number(b[sortKey] ?? 0);
      if (av !== bv) return sortDesc ? bv - av : av - bv;
      return b.sessions - a.sessions;
    });
  }, [sites, query, groupFilter, sortKey, sortDesc]);

  const totals = useMemo(() => {
    return filtered.reduce(
      (acc, r) => ({
        sessions: acc.sessions + r.sessions,
        gscClicks: acc.gscClicks + r.gscClicks,
        whatsappClicks: acc.whatsappClicks + r.whatsappClicks,
        xceedClicks: acc.xceedClicks + r.xceedClicks,
        beginCheckout: acc.beginCheckout + (r.beginCheckout ?? 0),
        abandonedCarts: acc.abandonedCarts + (r.abandonedCarts ?? 0),
        purchases: acc.purchases + (r.purchases ?? 0),
        revenueEur: acc.revenueEur + (r.revenueEur ?? 0),
      }),
      {
        sessions: 0,
        gscClicks: 0,
        whatsappClicks: 0,
        xceedClicks: 0,
        beginCheckout: 0,
        abandonedCarts: 0,
        purchases: 0,
        revenueEur: 0,
      },
    );
  }, [filtered]);

  const sortIndicator = (key: SortKey) => {
    if (sortKey !== key) return '';
    return sortDesc ? ' ↓' : ' ↑';
  };

  return (
    <div className="space-y-4 min-w-0">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {(
            [
              ['all', `Tutti i siti (${sites.length})`],
              ['nightlife', 'Solo Nightlife Milan (1)'],
              ['axel', `Rete Axel (${sites.filter((s) => s.group === 'axel').length})`],
            ] as const
          ).map(([val, label]) => {
            const active = groupFilter === val;
            return (
              <button
                key={val}
                type="button"
                onClick={() => setGroupFilter(val)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                  active
                    ? 'bg-champagne text-[#050505]'
                    : 'border border-white/15 text-white/75 hover:border-champagne/40 hover:text-champagne'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        <label className="w-full sm:w-64">
          <span className="sr-only">Cerca dominio o portale</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cerca dominio (es. capodanno...)"
            className="w-full rounded-lg border border-white/15 bg-black/40 px-3.5 py-2 text-xs text-white placeholder:text-white/45 focus:border-champagne focus:outline-none"
          />
        </label>
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.04] text-[11px] uppercase tracking-wider text-white/70">
              <th className="py-3 pl-4 pr-3 font-semibold">Portale / Dominio</th>
              <th className="py-3 px-3 text-right font-semibold">
                <button
                  type="button"
                  onClick={() => toggleSort('sessions')}
                  className="hover:text-champagne cursor-pointer"
                >
                  Visite{sortIndicator('sessions')}
                </button>
              </th>
              <th className="py-3 px-3 text-right font-semibold">
                <button
                  type="button"
                  onClick={() => toggleSort('gscClicks')}
                  className="hover:text-champagne cursor-pointer"
                >
                  Click Google{sortIndicator('gscClicks')}
                </button>
              </th>
              <th className="py-3 px-3 text-right font-semibold">
                <button
                  type="button"
                  onClick={() => toggleSort('whatsappClicks')}
                  className="hover:text-champagne cursor-pointer"
                >
                  Bottoni WhatsApp{sortIndicator('whatsappClicks')}
                </button>
              </th>
              <th className="py-3 px-3 text-right font-semibold">
                <button
                  type="button"
                  onClick={() => toggleSort('xceedClicks')}
                  className="hover:text-champagne cursor-pointer"
                >
                  Click Xceed{sortIndicator('xceedClicks')}
                </button>
              </th>
              <th className="py-3 px-3 text-right font-semibold">
                <button
                  type="button"
                  onClick={() => toggleSort('beginCheckout')}
                  className="hover:text-champagne cursor-pointer"
                >
                  Inizi acquisto{sortIndicator('beginCheckout')}
                </button>
              </th>
              <th className="py-3 px-3 text-right font-semibold">
                <button
                  type="button"
                  onClick={() => toggleSort('abandonedCarts')}
                  className="hover:text-champagne cursor-pointer"
                >
                  Abbandonati{sortIndicator('abandonedCarts')}
                </button>
              </th>
              <th className="py-3 pl-3 pr-4 text-right font-semibold">
                <button
                  type="button"
                  onClick={() => toggleSort('purchases')}
                  className="hover:text-champagne cursor-pointer"
                >
                  Acquisti{sortIndicator('purchases')}
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.map((site) => {
              const isNlm = site.group === 'nightlife';
              return (
                <tr
                  key={site.slug}
                  className={
                    isNlm
                      ? 'bg-champagne/[0.07] text-white'
                      : 'hover:bg-white/[0.02] text-white/85'
                  }
                >
                  <td className="py-3 pl-4 pr-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <a
                        href={`https://${site.domain}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-white hover:text-champagne hover:underline"
                      >
                        {site.domain}
                      </a>
                      {isNlm ? (
                        <span className="rounded-full bg-champagne px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#050505]">
                          Cassa diretta
                        </span>
                      ) : (
                        <span className="rounded-full border border-white/15 px-2 py-0.5 text-[10px] font-medium text-white/70">
                          Axel
                        </span>
                      )}
                      {!site.activeDns && (
                        <span className="rounded-full border border-amber-400/40 bg-amber-400/10 px-2 py-0.5 text-[10px] font-medium text-amber-200">
                          DNS in attivazione
                        </span>
                      )}
                      {site.activeUsersNow > 0 && (
                        <span className="rounded-full bg-emerald-400/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                          {site.activeUsersNow} online ora
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-white/60">{site.label}</p>
                  </td>
                  <td className="py-3 px-3 text-right tabular-nums font-medium">
                    {fmtInt(site.sessions)}
                  </td>
                  <td className="py-3 px-3 text-right tabular-nums text-sky-300">
                    {fmtInt(site.gscClicks)}
                  </td>
                  <td className="py-3 px-3 text-right tabular-nums font-semibold text-emerald-300">
                    {fmtInt(site.whatsappClicks)}
                  </td>
                  <td className="py-3 px-3 text-right tabular-nums font-semibold text-champagne">
                    {fmtInt(site.xceedClicks)}
                  </td>
                  <td className="py-3 px-3 text-right tabular-nums text-white/80">
                    {isNlm ? fmtInt(site.beginCheckout ?? 0) : '-'}
                  </td>
                  <td className="py-3 px-3 text-right tabular-nums text-amber-300">
                    {isNlm ? fmtInt(site.abandonedCarts ?? 0) : '-'}
                  </td>
                  <td className="py-3 pl-3 pr-4 text-right tabular-nums">
                    {isNlm ? (
                      <div>
                        <span className="font-bold text-champagne">
                          {fmtInt(site.purchases ?? 0)}
                        </span>
                        {(site.revenueEur ?? 0) > 0 && (
                          <span className="block text-[11px] text-emerald-300">
                            {fmtEur(site.revenueEur ?? 0)}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-white/45">-</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="border-t border-white/15 bg-white/[0.05] text-xs font-bold text-white">
              <td className="py-3 pl-4 pr-3">
                Totale selezione ({filtered.length} {filtered.length === 1 ? 'sito' : 'siti'})
              </td>
              <td className="py-3 px-3 text-right tabular-nums">{fmtInt(totals.sessions)}</td>
              <td className="py-3 px-3 text-right tabular-nums text-sky-300">
                {fmtInt(totals.gscClicks)}
              </td>
              <td className="py-3 px-3 text-right tabular-nums text-emerald-300">
                {fmtInt(totals.whatsappClicks)}
              </td>
              <td className="py-3 px-3 text-right tabular-nums text-champagne">
                {fmtInt(totals.xceedClicks)}
              </td>
              <td className="py-3 px-3 text-right tabular-nums">
                {fmtInt(totals.beginCheckout)}
              </td>
              <td className="py-3 px-3 text-right tabular-nums text-amber-300">
                {fmtInt(totals.abandonedCarts)}
              </td>
              <td className="py-3 pl-3 pr-4 text-right tabular-nums text-champagne">
                {fmtInt(totals.purchases)}
                {totals.revenueEur > 0 ? ` (${fmtEur(totals.revenueEur)})` : ''}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
