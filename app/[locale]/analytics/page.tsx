import type { Metadata } from 'next';
import Link from 'next/link';
import {
  readDailyStats,
  readXceedManual,
  romeDay,
  type DailyStats,
} from '@/lib/analyticsStore';
import {
  getUnifiedAnalyticsData,
  type UnifiedPeriod,
} from '@/lib/unifiedAnalytics';
import { BarChart } from '@/components/analytics/Charts';
import {
  UnifiedRefreshButton,
  UnifiedSitesTable,
} from '@/components/analytics/UnifiedAnalyticsClient';
import { saveXceedEntry, removeXceedEntry } from './actions';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Analytics Unificato | Nightlife Milan + Rete Axel',
  robots: { index: false, follow: false },
};

const DAYS = 30;

function normalizePeriod(raw: string | undefined): UnifiedPeriod {
  if (raw === '30d' || raw === '7d' || raw === 'today' || raw === 'all') {
    return raw;
  }
  return 'all';
}

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

function fmtRomeTime(iso: string): string {
  try {
    return new Intl.DateTimeFormat('it-IT', {
      timeZone: 'Europe/Rome',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function statusBadge(status: string): { label: string; cls: string } {
  switch (status) {
    case 'paid':
      return {
        label: 'Acquisto pagato',
        cls: 'bg-emerald-400/15 text-emerald-300 border-emerald-400/35',
      };
    case 'payment_failed':
      return {
        label: 'Pagamento non riuscito',
        cls: 'bg-red-400/15 text-red-300 border-red-400/35',
      };
    case 'abandoned_checkout':
      return {
        label: 'Abbandonato in cassa',
        cls: 'bg-amber-400/15 text-amber-200 border-amber-400/35',
      };
    case 'abandoned_cart':
      return {
        label: 'Carrello abbandonato',
        cls: 'bg-amber-400/15 text-amber-200 border-amber-400/35',
      };
    case 'awaiting_payment':
      return {
        label: 'In attesa di saldo',
        cls: 'bg-amber-400/15 text-amber-200 border-amber-400/35',
      };
    case 'expired':
      return {
        label: 'Sessione scaduta',
        cls: 'bg-white/10 text-white/70 border-white/20',
      };
    default:
      return {
        label: status,
        cls: 'bg-white/10 text-white/70 border-white/20',
      };
  }
}

function seriesFor(
  daily: DailyStats[],
  key: string,
  days: number,
): Array<{ label: string; value: number }> {
  const byDate = new Map(daily.map((d) => [d.date, d.counts[key] || 0]));
  const out: Array<{ label: string; value: number }> = [];
  for (let i = days - 1; i >= 0; i--) {
    const day = romeDay(new Date(Date.now() - i * 86400_000));
    out.push({ label: day, value: byDate.get(day) || 0 });
  }
  return out;
}

function topByPrefix(
  daily: DailyStats[],
  prefix: string,
  limit: number,
): Array<[string, number]> {
  const acc = new Map<string, number>();
  for (const d of daily) {
    for (const [k, v] of Object.entries(d.counts)) {
      if (k.startsWith(prefix)) {
        const cleanKey = k.slice(prefix.length);
        acc.set(cleanKey, (acc.get(cleanKey) || 0) + v);
      }
    }
  }
  return [...acc.entries()].sort((a, b) => b[1] - a[1]).slice(0, limit);
}

function StatCard({
  label,
  value,
  sub,
  accent = 'champagne',
}: {
  label: string;
  value: string | number;
  sub?: string;
  accent?: 'champagne' | 'emerald' | 'amber' | 'sky' | 'white';
}) {
  const valueCls =
    accent === 'emerald'
      ? 'text-emerald-300'
      : accent === 'amber'
        ? 'text-amber-300'
        : accent === 'sky'
          ? 'text-sky-300'
          : accent === 'white'
            ? 'text-white'
            : 'text-champagne';

  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
      <p className="text-[11px] uppercase tracking-[0.14em] text-white/65 mb-2 font-semibold">
        {label}
      </p>
      <p className={`text-3xl font-serif font-bold tabular-nums ${valueCls}`}>{value}</p>
      {sub && <p className="text-xs text-white/55 mt-1.5 leading-snug">{sub}</p>}
    </div>
  );
}

function Panel({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="min-w-0 bg-white/[0.03] border border-white/10 rounded-xl p-4 sm:p-6">
      <div className="mb-4">
        <h2 className="text-lg font-serif font-bold text-champagne">{title}</h2>
        {subtitle && <p className="text-xs text-white/60 mt-1">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

const PERIOD_OPTIONS: ReadonlyArray<{ id: UnifiedPeriod; label: string }> = [
  { id: 'all', label: 'Tutto lo storico' },
  { id: '30d', label: 'Ultimi 30 giorni' },
  { id: '7d', label: 'Ultimi 7 giorni' },
  { id: 'today', label: 'Oggi e ieri' },
];

export default async function AnalyticsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ periodo?: string }>;
}) {
  const [{ locale }, sp] = await Promise.all([params, searchParams]);
  const period = normalizePeriod(sp?.periodo);
  const basePath = `/${locale || 'it'}/analytics`;

  const [unified, daily, xceedManual] = await Promise.all([
    getUnifiedAnalyticsData(period),
    readDailyStats(DAYS),
    readXceedManual(),
  ]);

  const totXcSales = xceedManual.reduce((s, e) => s + (e.sales || 0), 0);
  const totXcViews = xceedManual.reduce((s, e) => s + (e.views || 0), 0);
  const topPages = topByPrefix(daily, 'pv:path:', 8);
  const topReferrers = topByPrefix(daily, 'pv:ref:', 8);
  const waBySource = topByPrefix(daily, 'wa:src:', 8);

  const g = unified.globalTotals;
  const f = unified.nlmFunnel;
  const ax = unified.axelTotals;

  return (
    <main className="flex-1 w-full min-w-0 overflow-x-hidden bg-[#050505] min-h-screen py-10 sm:py-12 px-4 sm:px-6 text-white">
      <div className="max-w-7xl mx-auto min-w-0 space-y-8">
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 border-b border-white/10 pb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-champagne font-semibold mb-1.5">
              Punto unico di controllo · 17 Portali collegati
            </p>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              Analytics Unificato: Nightlife Milan + Rete Axel
            </h1>
            <p className="text-white/65 text-sm mt-1.5">
              Finestra Nightlife Milan: <span className="text-white">{unified.nlmStartDate}</span> →{' '}
              <span className="text-white">{unified.endDate}</span> · Rete Axel:{' '}
              <span className="text-white">{unified.axelStartDate}</span> →{' '}
              <span className="text-white">{unified.endDate}</span> · Aggiornato:{' '}
              <span className="text-white">{fmtRomeTime(unified.generatedAtIso)}</span>
              {g.activeUsersNow > 0 && (
                <span className="ml-2 inline-flex items-center rounded-full bg-emerald-400/20 px-2.5 py-0.5 text-xs font-semibold text-emerald-300">
                  {g.activeUsersNow} utenti attivi adesso
                </span>
              )}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <UnifiedRefreshButton />
            <a
              href="https://analytics.google.com/analytics/web/#/a372850359p543047740/reports/intelligenthome"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/15 text-white/75 hover:text-champagne hover:border-champagne/40 rounded-full px-4 py-2 text-xs font-medium transition-colors"
            >
              GA4 Nightlife ↗
            </a>
            <a
              href="https://pro.xceed.me/select-venue"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/15 text-white/75 hover:text-champagne hover:border-champagne/40 rounded-full px-4 py-2 text-xs font-medium transition-colors"
            >
              Xceed Pro ↗
            </a>
          </div>
        </header>

        <nav aria-label="Periodo temporale" className="flex flex-wrap gap-2">
          {PERIOD_OPTIONS.map((opt) => {
            const active = opt.id === period;
            const href = opt.id === 'all' ? basePath : `${basePath}?periodo=${opt.id}`;
            return (
              <Link
                key={opt.id}
                href={href}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                  active
                    ? 'bg-champagne text-[#050505]'
                    : 'border border-white/15 text-white/75 hover:border-champagne/40 hover:text-champagne'
                }`}
              >
                {opt.label}
              </Link>
            );
          })}
        </nav>

        {unified.warnings.length > 0 && (
          <div className="rounded-xl border border-amber-400/35 bg-amber-400/10 px-4 py-3 text-xs text-amber-200">
            Avviso sincronizzazione sorgenti: {unified.warnings.join(' · ')}
          </div>
        )}

        <section className="space-y-3">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-xl font-serif font-bold text-champagne">
              1. Totale Generale (Nightlife Milan + 16 Siti Axel)
            </h2>
            <p className="text-xs text-white/60">
              Somma reale su tutti i 17 domini · costo infrastruttura 0,00 €
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
            <StatCard
              label="Visite Totali (17 Siti)"
              value={fmtInt(g.sessions)}
              sub={`${fmtInt(g.users)} utenti unici · ${fmtInt(g.pageViews)} pagine viste`}
              accent="white"
            />
            <StatCard
              label="Click da Google"
              value={fmtInt(g.gscClicks)}
              sub={`${fmtInt(g.gscImpressions)} impressioni su Google`}
              accent="sky"
            />
            <StatCard
              label="Bottoni WhatsApp"
              value={fmtInt(g.whatsappClicks)}
              sub={`Nightlife: ${fmtInt(f.whatsappClicks)} · Axel: ${fmtInt(ax.whatsappClicks)}`}
              accent="emerald"
            />
            <StatCard
              label="Click verso Xceed"
              value={fmtInt(g.xceedClicks)}
              sub={`Nightlife: ${fmtInt(f.xceedClicks)} · Axel: ${fmtInt(ax.xceedClicks)}`}
              accent="champagne"
            />
            <StatCard
              label="Acquisti Diretti"
              value={fmtInt(g.purchases)}
              sub={
                g.revenueEur > 0
                  ? `Incasso contabilizzato: ${fmtEur(g.revenueEur)}`
                  : 'Cassa diretta Nightlife Milan pronta'
              }
              accent="champagne"
            />
          </div>
        </section>

        <section className="min-w-0 space-y-4 rounded-2xl border border-champagne/25 bg-champagne/[0.03] p-4 sm:p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <h2 className="text-xl font-serif font-bold text-champagne">
                2. Obiettivi di Acquisto e Contatto su Nightlife Milan
              </h2>
              <p className="text-xs text-white/65 mt-1">
                Eventi chiave GA4 (proprietà 543047740 · G-89JEXSWX80) uniti agli ordini e ai carrelli reali della cassa diretta
              </p>
            </div>
            <Link
              href={`/${locale || 'it'}/crm`}
              className="border border-champagne/40 text-champagne hover:bg-champagne hover:text-[#050505] rounded-full px-4 py-1.5 text-xs font-semibold transition-colors"
            >
              Apri gestione ordini CRM →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              label="Acquisti Completati"
              value={fmtInt(f.purchases)}
              sub={`Incasso: ${fmtEur(f.revenueEur)} (evento purchase)`}
              accent="emerald"
            />
            <StatCard
              label="Inizi di Acquisto"
              value={fmtInt(f.beginCheckout)}
              sub={`${fmtInt(f.addPaymentInfo)} arrivati al pagamento (begin_checkout)`}
              accent="champagne"
            />
            <StatCard
              label="Carrelli Abbandonati"
              value={fmtInt(f.abandonedCarts)}
              sub={
                f.abandonedValueEur > 0
                  ? `Valore non saldato: ${fmtEur(f.abandonedValueEur)} (${f.abandonedPreCheckoutCount} pre-cassa, ${f.abandonedOrdersCount} ordini)`
                  : 'Eventi cart_abandoned + carrelli e ordini non saldati'
              }
              accent="amber"
            />
            <StatCard
              label="Aggiunte al Carrello"
              value={fmtInt(f.addToCart)}
              sub={`${fmtInt(f.viewCart)} aperture riepilogo carrello (add_to_cart)`}
              accent="white"
            />
            <StatCard
              label="Bottoni WhatsApp"
              value={fmtInt(f.whatsappClicks)}
              sub="Click diretti verso +39 351 912 7047 (whatsapp_click)"
              accent="emerald"
            />
            <StatCard
              label="Click Biglietti Xceed"
              value={fmtInt(f.xceedClicks)}
              sub="Uscite verso canale partner nightlifemilan-1 (xceed_click)"
              accent="champagne"
            />
            <StatCard
              label="Visite Nightlife Milan"
              value={fmtInt(f.sessions)}
              sub={`${fmtInt(f.users)} utenti · ${fmtInt(f.pageViews)} pagine · ${fmtInt(f.bookingForms)} moduli`}
              accent="white"
            />
            <StatCard
              label="Click da Google (GSC)"
              value={fmtInt(f.gscClicks)}
              sub={`${fmtInt(f.gscImpressions)} impressioni organiche su Google`}
              accent="sky"
            />
          </div>

          {f.recentOrders.length > 0 && (
            <div className="mt-4 pt-4 border-t border-white/10">
              <h3 className="text-sm font-semibold text-white/90 mb-3">
                Ultimi movimenti cassa e carrelli su Nightlife Milan (senza dati personali esposti)
              </h3>
              <div className="overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-white/10 bg-black/30 text-[11px] uppercase tracking-wider text-white/65">
                      <th className="py-2.5 pl-3 pr-3 font-semibold">Codice</th>
                      <th className="py-2.5 px-3 font-semibold">Data e ora</th>
                      <th className="py-2.5 px-3 font-semibold">Stato obiettivo</th>
                      <th className="py-2.5 px-3 font-semibold">Pacchetto / Evento</th>
                      <th className="py-2.5 px-3 text-right font-semibold">Ospiti</th>
                      <th className="py-2.5 pl-3 pr-3 text-right font-semibold">Importo</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {f.recentOrders.map((ord) => {
                      const badge = statusBadge(ord.status);
                      return (
                        <tr key={`${ord.kind}-${ord.id}`} className="text-white/85">
                          <td className="py-2.5 pl-3 pr-3 font-mono font-semibold text-white">
                            {ord.id}
                          </td>
                          <td className="py-2.5 px-3 whitespace-nowrap text-white/70">
                            {fmtRomeTime(ord.paidAt || ord.createdAt)}
                          </td>
                          <td className="py-2.5 px-3 whitespace-nowrap">
                            <span
                              className={`inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${badge.cls}`}
                            >
                              {badge.label}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 max-w-md truncate">{ord.itemSummary}</td>
                          <td className="py-2.5 px-3 text-right tabular-nums">{ord.headcount}</td>
                          <td className="py-2.5 pl-3 pr-3 text-right tabular-nums font-bold text-champagne">
                            {fmtEur(ord.totalEur)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>

        <Panel
          title="3. Totale Rete dei 16 Siti di Axel"
          subtitle="Numeri aggregati delle 16 proprietà GA4 di Axel (dal 16 novembre 2026 ad oggi)"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              label="Visite Rete Axel"
              value={fmtInt(ax.sessions)}
              sub={`${fmtInt(ax.users)} utenti · ${fmtInt(ax.pageViews)} pagine viste`}
              accent="white"
            />
            <StatCard
              label="Click da Google Axel"
              value={fmtInt(ax.gscClicks)}
              sub={`${fmtInt(ax.gscImpressions)} impressioni organiche`}
              accent="sky"
            />
            <StatCard
              label="WhatsApp verso Axel"
              value={fmtInt(ax.whatsappClicks)}
              sub="Click sui bottoni WhatsApp (+39 392 015 7642)"
              accent="emerald"
            />
            <StatCard
              label="Click Xceed Axel"
              value={fmtInt(ax.xceedClicks)}
              sub="Click sui link biglietti e tavoli Xceed"
              accent="champagne"
            />
          </div>
        </Panel>

        <Panel
          title="4. Dettaglio Completo per ciascuno dei 17 Siti"
          subtitle="Clicca sulle intestazioni per ordinare per visite, Google, WhatsApp, Xceed, carrelli o acquisti"
        >
          <UnifiedSitesTable sites={unified.sites} />
        </Panel>

        <div className="grid md:grid-cols-2 gap-6 min-w-0">
          <Panel title="Visite giornaliere su Nightlife Milan (ultimi 30 giorni)">
            <BarChart
              data={
                f.dailySessions30d.some((d) => d.value > 0)
                  ? f.dailySessions30d
                  : seriesFor(daily, 'pv', DAYS)
              }
              ariaLabel={`Visite giornaliere ultimi ${DAYS} giorni`}
            />
          </Panel>
          <Panel title="Click WhatsApp giornalieri su Nightlife Milan (ultimi 30 giorni)">
            <BarChart
              data={seriesFor(daily, 'wa', DAYS)}
              ariaLabel={`Click WhatsApp giornalieri ultimi ${DAYS} giorni`}
            />
          </Panel>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Panel title="Pagine più viste (Nightlife Milan, 30g)">
            <ol className="space-y-2 text-sm">
              {topPages.length === 0 && (
                <li className="text-white/55">Nessun dato registrato negli ultimi 30 giorni.</li>
              )}
              {topPages.map(([path, n]) => (
                <li key={path} className="flex justify-between gap-3 text-white/80">
                  <span className="truncate">{path}</span>
                  <span className="tabular-nums text-champagne font-medium">{fmtInt(n)}</span>
                </li>
              ))}
            </ol>
          </Panel>
          <Panel title="Sorgenti di provenienza (30g)">
            <ol className="space-y-2 text-sm">
              {topReferrers.length === 0 && (
                <li className="text-white/55">Traffico diretto negli ultimi 30 giorni.</li>
              )}
              {topReferrers.map(([host, n]) => (
                <li key={host} className="flex justify-between gap-3 text-white/80">
                  <span className="truncate">{host}</span>
                  <span className="tabular-nums text-champagne font-medium">{fmtInt(n)}</span>
                </li>
              ))}
            </ol>
          </Panel>
          <Panel title="Bottoni WhatsApp per posizione (30g)">
            <ol className="space-y-2 text-sm">
              {waBySource.length === 0 && (
                <li className="text-white/55">Nessun click registrato negli ultimi 30 giorni.</li>
              )}
              {waBySource.map(([src, n]) => (
                <li key={src} className="flex justify-between gap-3 text-white/80">
                  <span className="truncate">{src}</span>
                  <span className="tabular-nums text-champagne font-medium">{fmtInt(n)}</span>
                </li>
              ))}
            </ol>
          </Panel>
        </div>

        <Panel
          title={`5. Registro vendite interne Xceed Pro (${fmtInt(totXcViews)} visite · ${fmtInt(totXcSales)} biglietti)`}
          subtitle="Xceed non espone una API pubblica: puoi annotare qui visite e biglietti letti su pro.xceed.me"
        >
          {xceedManual.length > 0 && (
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="text-white/65 text-xs uppercase tracking-wider border-b border-white/10">
                    <th className="py-2 pr-4 font-semibold">Evento</th>
                    <th className="py-2 pr-4 font-semibold">Data</th>
                    <th className="py-2 pr-4 font-semibold text-right">Visite pagina</th>
                    <th className="py-2 pr-4 font-semibold text-right">Biglietti</th>
                    <th className="py-2 pr-4 font-semibold text-right">Incasso €</th>
                    <th className="py-2 font-semibold"></th>
                  </tr>
                </thead>
                <tbody>
                  {xceedManual.map((e) => (
                    <tr key={e.key} className="border-b border-white/5 text-white/85">
                      <td className="py-2.5 pr-4">{e.eventName}</td>
                      <td className="py-2.5 pr-4 whitespace-nowrap">{e.eventDate}</td>
                      <td className="py-2.5 pr-4 text-right tabular-nums">{e.views ?? '-'}</td>
                      <td className="py-2.5 pr-4 text-right tabular-nums font-bold text-champagne">
                        {e.sales ?? '-'}
                      </td>
                      <td className="py-2.5 pr-4 text-right tabular-nums">{e.revenue ?? '-'}</td>
                      <td className="py-2.5 text-right">
                        <form action={removeXceedEntry}>
                          <input type="hidden" name="key" value={e.key} />
                          <button
                            type="submit"
                            className="text-white/50 hover:text-red-400 text-xs transition-colors cursor-pointer"
                            aria-label={`Elimina ${e.eventName}`}
                          >
                            ✕
                          </button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <form
            action={saveXceedEntry}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-3 items-end"
          >
            <label className="sm:col-span-2 text-xs text-white/70">
              Nome evento
              <input
                name="eventName"
                required
                placeholder="Justme Sabato"
                className="mt-1 w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-champagne"
              />
            </label>
            <label className="text-xs text-white/70">
              Data
              <input
                name="eventDate"
                type="date"
                required
                className="mt-1 w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-champagne"
              />
            </label>
            <label className="text-xs text-white/70">
              Visite
              <input
                name="views"
                type="number"
                min="0"
                inputMode="numeric"
                className="mt-1 w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-champagne"
              />
            </label>
            <label className="text-xs text-white/70">
              Biglietti
              <input
                name="sales"
                type="number"
                min="0"
                inputMode="numeric"
                className="mt-1 w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-champagne"
              />
            </label>
            <label className="text-xs text-white/70">
              Incasso €
              <input
                name="revenue"
                type="number"
                min="0"
                step="0.01"
                inputMode="decimal"
                className="mt-1 w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-champagne"
              />
            </label>
            <button
              type="submit"
              className="sm:col-span-2 md:col-span-6 md:w-auto md:justify-self-start bg-champagne text-[#050505] font-bold text-sm rounded-lg px-6 py-2.5 hover:bg-white transition-colors cursor-pointer"
            >
              Salva voce Xceed
            </button>
          </form>
        </Panel>

        <footer className="text-xs text-white/55 leading-relaxed pb-4">
          <p>
            Fonti collegate gratuitamente: Google Analytics 4 Data API (proprietà 543047740 per Nightlife Milan e le 16 proprietà GA4 della rete Axel), Google Search Console API (sc-domain:nightlifemilan.com), indici ordini e carrelli della cassa diretta Nightlife Milan, contatori interni senza blocchi pubblicitari. Aggiornamento automatico ogni 15 minuti o immediato tramite il pulsante in alto. Il cruscotto separato condiviso con Axel mostra esclusivamente i 16 siti di Axel.
          </p>
        </footer>
      </div>
    </main>
  );
}
