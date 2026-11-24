import type { Metadata } from 'next';
import Link from 'next/link';
import {
  CheckCircle2,
  Download,
  KeyRound,
  LogOut,
  RefreshCw,
  Trash2,
  Users,
} from 'lucide-react';
import { getCrmAuthCopy } from '@/lib/crmAuthCopy';
import { requireCrmServerSession } from '@/lib/crmAuthVault';
import { localePrefix } from '@/lib/i18n/locales';
import { SINGLE_PASS_VENUES, formatEurFromCents } from '@/lib/single-pass/catalog';
import { formatMinorCurrency } from '@/lib/single-pass/currency';
import { listAllCartDrafts, listAllOrders } from '@/lib/single-pass/store';
import { getStripeCredentialStatus } from '@/lib/single-pass/stripe';
import {
  deleteOrderAction,
  saveStripeVaultAction,
  syncWebhookAction,
  updateOrderWhatsappGroupAction,
} from './actions';

export const metadata: Metadata = {
  title: 'CRM E-Commerce & Single Pass Analytics | Nightlife Milan',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

type BreakdownRow = {
  key: string;
  venueName: string;
  skuTitle: string;
  ordersCount: number;
  unitsSold: number;
  headcount: number;
  revenueCents: number;
};

type FlowCountRow = {
  label: string;
  orders: number;
  paid: number;
  revenueCents: number;
};

export default async function CrmSinglePassPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [{ locale }, sp] = await Promise.all([params, searchParams]);
  await requireCrmServerSession(locale);
  const [allOrders, allCartDrafts, gatewayStatus] = await Promise.all([
    listAllOrders(500),
    listAllCartDrafts(250),
    getStripeCredentialStatus(),
  ]);
  const authCopy = getCrmAuthCopy(locale);

  const lp = localePrefix(locale);
  const venueFilter = typeof sp.venue === 'string' ? sp.venue : 'all';
  const statusFilter = typeof sp.status === 'string' ? sp.status : 'all';

  const filtered = allOrders.filter((o) => {
    if (venueFilter !== 'all' && !o.items.some((i) => i.venueId === venueFilter)) {
      return false;
    }
    if (statusFilter !== 'all' && o.status !== statusFilter) {
      return false;
    }
    return true;
  });

  const paidOrders = filtered.filter((o) => o.status === 'paid');
  const failedOrders = filtered.filter((o) => o.status === 'payment_failed');
  const pendingOrders = filtered.filter(
    (o) => o.status === 'awaiting_payment' || o.status === 'expired' || o.status === 'cancelled',
  );
  const filteredCartDrafts = allCartDrafts.filter(
    (c) => venueFilter === 'all' || c.items.some((i) => i.venueId === venueFilter),
  );

  const grossEurCents = paidOrders.reduce((s, o) => s + o.totalCents, 0);
  const feeEurCents = paidOrders.reduce((s, o) => s + o.feeCents, 0);
  const baseEurCents = paidOrders.reduce((s, o) => s + o.subtotalBaseCents, 0);
  const totalConfirmedPeople = paidOrders.reduce(
    (s, o) =>
      s +
      (typeof o.totalHeadcount === 'number' && o.totalHeadcount > 0
        ? o.totalHeadcount
        : o.items.reduce((acc, it) => acc + (typeof it.totalGuests === 'number' ? it.totalGuests : it.quantity), 0)),
    0,
  );
  const totalAllPeople = filtered.reduce(
    (s, o) =>
      s +
      (typeof o.totalHeadcount === 'number' && o.totalHeadcount > 0
        ? o.totalHeadcount
        : o.items.reduce((acc, it) => acc + (typeof it.totalGuests === 'number' ? it.totalGuests : it.quantity), 0)),
    0,
  );

  // Breakdown "Chi ha acquistato cosa" per Locale & Pacchetto
  const productMap = new Map<string, BreakdownRow>();
  for (const o of paidOrders) {
    const seenOrderKeys = new Set<string>();
    for (const item of o.items) {
      const k = `${item.venueName}::${item.title}`;
      const existing = productMap.get(k) || {
        key: k,
        venueName: item.venueName,
        skuTitle: item.title,
        ordersCount: 0,
        unitsSold: 0,
        headcount: 0,
        revenueCents: 0,
      };
      if (!seenOrderKeys.has(k)) {
        existing.ordersCount += 1;
        seenOrderKeys.add(k);
      }
      existing.unitsSold += item.quantity;
      existing.headcount += typeof item.totalGuests === 'number' ? item.totalGuests : item.quantity;
      existing.revenueCents += item.lineTotalCents;
      productMap.set(k, existing);
    }
  }
  const productRows = Array.from(productMap.values()).sort(
    (a, b) => b.revenueCents - a.revenueCents,
  );

  // Attribution breakdown: Source pages where item was added, Landing pages, Referrers/UTM
  const addFlowStat = (
    map: Map<string, FlowCountRow>,
    rawLabel: string,
    o: (typeof filtered)[number],
  ) => {
    const label = rawLabel || 'direct';
    const cur = map.get(label) || { label, orders: 0, paid: 0, revenueCents: 0 };
    cur.orders += 1;
    if (o.status === 'paid') {
      cur.paid += 1;
      cur.revenueCents += o.totalCents;
    }
    map.set(label, cur);
  };

  const addedFromMap = new Map<string, FlowCountRow>();
  const landingMap = new Map<string, FlowCountRow>();
  const referrerUtmMap = new Map<string, FlowCountRow>();

  for (const o of filtered) {
    const addedPaths = o.attribution?.addedFromPaths?.length
      ? o.attribution.addedFromPaths
      : ['(sconosciuta)'];
    for (const p of addedPaths) {
      addFlowStat(addedFromMap, p, o);
    }
    addFlowStat(landingMap, o.attribution?.firstLandingPath || '(sconosciuta)', o);
    const refLabel = o.attribution?.utmSource
      ? `UTM: ${o.attribution.utmSource}${o.attribution.utmCampaign ? ` / ${o.attribution.utmCampaign}` : ''}`
      : o.attribution?.initialReferrer || 'direct';
    addFlowStat(referrerUtmMap, refLabel, o);
  }

  const topAddedFrom = Array.from(addedFromMap.values()).sort((a, b) => b.orders - a.orders);
  const topLandings = Array.from(landingMap.values()).sort((a, b) => b.orders - a.orders);
  const topReferrers = Array.from(referrerUtmMap.values()).sort((a, b) => b.orders - a.orders);

  return (
    <main className="crm-shell min-h-screen bg-[#0c0d0f] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header & Quick Nav */}
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-white/50">
              NIGHTLIFE MILAN CRM · SINGLE PASS &amp; E-COMMERCE
            </p>
            <h1 className="mt-1 font-serif text-3xl font-bold text-white">
              E-Commerce Single Pass &amp; Eventi · Ordini, Persone &amp; Flusso Acquisizione
            </h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href={`${lp}/crm`}
              className="inline-flex h-10 items-center border border-white/20 px-4 text-xs font-bold uppercase tracking-wider text-white/80 hover:border-white hover:text-white"
            >
              CRM Generale
            </Link>
            <a
              href={`${lp}/crm/credentials`}
              className="inline-flex h-10 items-center gap-1.5 border border-white/25 bg-white/10 px-4 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/20"
            >
              <KeyRound className="h-4 w-4" aria-hidden="true" />
              {authCopy.headerCredentialsBtn}
            </a>
            <a
              href={`${lp}/crm/single-pass/export?venue=${encodeURIComponent(venueFilter)}&status=${encodeURIComponent(statusFilter)}`}
              className="inline-flex h-10 items-center gap-2 bg-white px-4 text-xs font-extrabold uppercase tracking-wider text-black hover:bg-emerald-300"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Esporta CSV Completo
            </a>
            <form action="/api/crm/logout" method="post">
              <input type="hidden" name="locale" value={locale} />
              <button
                type="submit"
                className="inline-flex h-10 items-center gap-1.5 border border-white/25 bg-transparent px-4 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/15"
              >
                <LogOut className="h-4 w-4" aria-hidden="true" />
                {authCopy.headerLogoutBtn}
              </button>
            </form>
          </div>
        </header>

        {/* KPI Cards */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          <div className="border border-white/10 bg-white/[0.03] p-4">
            <p className="text-[11px] uppercase text-white/50">Ordini Confermati</p>
            <p className="mt-1 font-mono text-2xl font-bold text-emerald-300">{paidOrders.length}</p>
          </div>
          <div className="border border-white/10 bg-white/[0.03] p-4">
            <p className="text-[11px] uppercase text-white/50">Persone Confermate</p>
            <p className="mt-1 font-mono text-2xl font-bold text-emerald-300">
              {totalConfirmedPeople} <span className="text-xs text-white/50">/ {totalAllPeople} tot</span>
            </p>
          </div>
          <div className="border border-white/10 bg-white/[0.03] p-4">
            <p className="text-[11px] uppercase text-white/50">Falliti / Abbandonati</p>
            <p className="mt-1 font-mono text-xl font-bold text-rose-300">
              {failedOrders.length} falliti{' '}
              <span className="text-xs text-amber-300">
                · {pendingOrders.length + filteredCartDrafts.length} abb.
              </span>
            </p>
          </div>
          <div className="border border-white/10 bg-white/[0.03] p-4">
            <p className="text-[11px] uppercase text-white/50">Base Locale (EUR)</p>
            <p className="mt-1 font-mono text-xl font-bold">{formatEurFromCents(baseEurCents, 'it')}</p>
          </div>
          <div className="border border-white/10 bg-white/[0.03] p-4">
            <p className="text-[11px] uppercase text-white/50">Booking Fee (EUR)</p>
            <p className="mt-1 font-mono text-xl font-bold text-emerald-200">
              +{formatEurFromCents(feeEurCents, 'it')}
            </p>
          </div>
          <div className="border border-white/10 bg-white/[0.03] p-4">
            <p className="text-[11px] uppercase text-white/50">Incasso Totale (EUR)</p>
            <p className="mt-1 font-mono text-2xl font-bold text-white">
              {formatEurFromCents(grossEurCents, 'it')}
            </p>
          </div>
        </section>

        {/* Breakdown: Chi ha acquistato cosa */}
        <section className="grid gap-6 lg:grid-cols-12">
          <div className="border border-white/10 bg-white/[0.02] p-5 lg:col-span-6">
            <h2 className="font-serif text-xl font-bold text-white">
              Chi ha acquistato cosa (Pacchetti &amp; Persone Confermate)
            </h2>
            {productRows.length === 0 ? (
              <p className="mt-4 text-xs text-white/50">Nessun acquisto pagato ancora registrato.</p>
            ) : (
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-white/10 text-white/50">
                    <tr>
                      <th className="py-2 pr-3">Locale · Pacchetto</th>
                      <th className="py-2 pr-3 text-right">Ordini</th>
                      <th className="py-2 pr-3 text-right">Persone</th>
                      <th className="py-2 text-right">Totale EUR</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {productRows.map((row) => (
                      <tr key={row.key}>
                        <td className="py-2 pr-3">
                          <span className="font-semibold text-white">{row.venueName}</span>
                          <span className="block text-[11px] text-white/60">{row.skuTitle}</span>
                        </td>
                        <td className="py-2 pr-3 text-right font-mono">{row.ordersCount} ({row.unitsSold}x)</td>
                        <td className="py-2 pr-3 text-right font-mono font-bold text-emerald-300">{row.headcount}</td>
                        <td className="py-2 text-right font-mono font-bold">
                          {formatEurFromCents(row.revenueCents, 'it')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Attribution Funnel Analytics */}
          <div className="border border-white/10 bg-white/[0.02] p-5 space-y-5 lg:col-span-6">
            <h2 className="font-serif text-xl font-bold text-white">
              Flusso di Acquisizione (Da quale pagina è arrivato l’acquisto)
            </h2>
            <div className="grid gap-4 sm:grid-cols-3 text-xs">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-amber-300">
                  Pagina Aggiunta Carrello
                </p>
                <ul className="mt-2 space-y-1.5">
                  {topAddedFrom.slice(0, 6).map((r) => (
                    <li key={r.label} className="flex justify-between gap-2 border-b border-white/10 pb-1">
                      <span className="truncate font-mono text-[11px]" title={r.label}>
                        {r.label}
                      </span>
                      <span className="shrink-0 font-mono font-bold">
                        {r.paid}/{r.orders}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-emerald-300">
                  Prima Pagina Atterraggio
                </p>
                <ul className="mt-2 space-y-1.5">
                  {topLandings.slice(0, 6).map((r) => (
                    <li key={r.label} className="flex justify-between gap-2 border-b border-white/10 pb-1">
                      <span className="truncate font-mono text-[11px]" title={r.label}>
                        {r.label}
                      </span>
                      <span className="shrink-0 font-mono font-bold">
                        {r.paid}/{r.orders}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-sky-300">
                  Referrer / UTM Fonte
                </p>
                <ul className="mt-2 space-y-1.5">
                  {topReferrers.slice(0, 6).map((r) => (
                    <li key={r.label} className="flex justify-between gap-2 border-b border-white/10 pb-1">
                      <span className="truncate font-mono text-[11px]" title={r.label}>
                        {r.label}
                      </span>
                      <span className="shrink-0 font-mono font-bold">
                        {r.paid}/{r.orders}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Payment Gateway Vault & Webhook Configuration Panel */}
        <section className="border border-white/15 bg-white/[0.03] p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="flex items-center gap-2 font-serif text-xl font-bold">
                <KeyRound className="h-5 w-5 text-emerald-300" aria-hidden="true" />
                Connessione Gateway Pagamento &amp; Webhook (Account: {gatewayStatus.accountId})
              </h2>
              <p className="mt-1 text-xs text-white/60">
                Stato:{' '}
                {gatewayStatus.configured ? (
                  <span className="inline-flex items-center gap-1 font-bold text-emerald-300">
                    <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                    Attivo ({gatewayStatus.maskedKey} · {gatewayStatus.livemode ? 'LIVE' : 'TEST'})
                  </span>
                ) : (
                  <span className="font-bold text-amber-300">Non configurato</span>
                )}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <form action={syncWebhookAction}>
                <input type="hidden" name="locale" value={locale} />
                <input type="hidden" name="siteOrigin" value="https://nightlifemilan.com" />
                <button
                  type="submit"
                  className="inline-flex h-10 items-center gap-1.5 border border-emerald-400/50 bg-emerald-950/40 px-4 text-xs font-bold uppercase tracking-wider text-emerald-200 hover:bg-emerald-900/50"
                >
                  <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
                  Sincronizza Eventi Webhook
                </button>
              </form>

              <form action={saveStripeVaultAction} className="flex flex-wrap items-center gap-2">
                <input type="hidden" name="locale" value={locale} />
                <input type="hidden" name="siteOrigin" value="https://nightlifemilan.com" />
                <input
                  type="password"
                  name="secretKey"
                  required
                  placeholder="sk_live_... oppure rk_live_..."
                  className="h-10 w-64 border border-white/20 bg-black/50 px-3 font-mono text-xs text-white"
                />
                <button
                  type="submit"
                  className="h-10 bg-emerald-400 px-4 text-xs font-extrabold uppercase tracking-wider text-black hover:bg-emerald-300"
                >
                  Salva nel Vault Cifrato
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Filters */}
        <form method="get" className="flex flex-wrap items-end gap-3 border-b border-white/10 pb-5">
          <label className="text-xs text-white/60">
            Locale / Evento
            <select
              name="venue"
              defaultValue={venueFilter}
              className="mt-1 block h-10 border border-white/15 bg-[#17191c] px-3 text-sm text-white"
            >
              <option value="all">Tutti i locali e gli eventi</option>
              {SINGLE_PASS_VENUES.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name}
                </option>
              ))}
            </select>
          </label>
          <label className="text-xs text-white/60">
            Stato Pagamento
            <select
              name="status"
              defaultValue={statusFilter}
              className="mt-1 block h-10 border border-white/15 bg-[#17191c] px-3 text-sm text-white"
            >
              <option value="all">Tutti</option>
              <option value="paid">Pagati</option>
              <option value="payment_failed">Pagamenti Falliti</option>
              <option value="awaiting_payment">Checkout Abbandonati (In attesa)</option>
              <option value="cancelled">Annullati</option>
              <option value="expired">Scaduti</option>
            </select>
          </label>
          <button
            type="submit"
            className="h-10 border border-white/30 px-4 text-xs font-bold uppercase tracking-wider text-white hover:bg-white hover:text-black"
          >
            Filtra ({filtered.length})
          </button>
        </form>

        {/* Complete Orders & Attribution Table */}
        <section className="overflow-x-auto border border-white/10">
          <table className="w-full min-w-[1250px] text-left text-xs">
            <thead className="bg-white/[0.04] uppercase text-white/50">
              <tr>
                <th className="p-3">Ordine / Stato / Data</th>
                <th className="p-3">Cliente / Tel &amp; Email</th>
                <th className="p-3">Acquisto &amp; Ospiti</th>
                <th className="p-3">Flusso &amp; Provenienza</th>
                <th className="p-3 text-right">Importo &amp; Valuta</th>
                <th className="p-3">WhatsApp 20/12 &amp; Azioni</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-white/45">
                    Nessun ordine registrato finora.
                  </td>
                </tr>
              ) : (
                filtered.map((o) => {
                  const headcount =
                    typeof o.totalHeadcount === 'number' && o.totalHeadcount > 0
                      ? o.totalHeadcount
                      : o.items.reduce(
                          (acc, i) => acc + (typeof i.totalGuests === 'number' ? i.totalGuests : i.quantity),
                          0,
                        );
                  const cur = (o.presentmentCurrency || 'EUR').toUpperCase();
                  const presMinor = o.presentmentTotalMinor ?? o.totalCents;

                  return (
                    <tr key={o.id} className="hover:bg-white/[0.02]">
                      <td className="p-3 align-top">
                        <p className="font-mono font-bold text-white">{o.id}</p>
                        <p className="mt-0.5 font-mono text-[10px] text-white/50">
                          PIN: {o.accessPin}
                        </p>
                        <span
                          className={`mt-1 inline-block px-2 py-0.5 text-[10px] font-bold uppercase ${
                            o.status === 'paid'
                              ? 'bg-emerald-400 text-[#050505]'
                              : o.status === 'payment_failed'
                                ? 'bg-rose-400 text-[#050505]'
                                : 'bg-amber-300 text-[#050505]'
                          }`}
                        >
                          {o.status}
                        </span>
                        {o.lastPaymentError && o.status !== 'paid' && (
                          <p className="mt-1 max-w-[200px] border border-rose-400/40 bg-rose-950/40 p-1.5 text-[10px] text-rose-100">
                            <strong className="block font-mono text-rose-200">
                              {o.lastPaymentError.declineCode ||
                                o.lastPaymentError.code ||
                                'rifiutato'}{' '}
                              ({o.paymentAttempts || 1}x)
                            </strong>
                            {o.lastPaymentError.message}
                          </p>
                        )}
                        <p className="mt-1 font-mono text-[10px] text-white/45">
                          {o.createdAt.slice(0, 16).replace('T', ' ')}
                        </p>
                      </td>
                      <td className="p-3 align-top">
                        <p className="font-semibold text-white">
                          {o.customer.fullName} · {o.customer.age} anni
                        </p>
                        <p className="font-mono text-emerald-300">{o.customer.whatsapp}</p>
                        <p className="text-white/75">{o.customer.email}</p>
                        <p className="mt-0.5 text-[11px] text-white/50">
                          {o.customer.country || o.attribution?.ipCountry || '-'} ·{' '}
                          {o.customer.spokenLanguages.join(', ')}
                        </p>
                      </td>
                      <td className="p-3 align-top max-w-[260px]">
                        <p className="mb-1 inline-block bg-white/10 px-2 py-0.5 font-mono text-[10px] font-bold text-white">
                          {headcount} persone totali
                        </p>
                        <ul className="space-y-1 text-white/80">
                          {o.items.map((item) => (
                            <li key={item.skuId}>
                              <strong>{item.venueName}</strong>: {item.title} × {item.quantity}
                              {item.dietaryChoice ? (
                                <span className="block text-[10px] text-amber-200">
                                  Scelta: {item.dietaryChoice}
                                </span>
                              ) : null}
                            </li>
                          ))}
                        </ul>
                        {o.customer.dietaryNotes && (
                          <p className="mt-1.5 border-t border-white/10 pt-1 text-[11px] text-amber-200">
                            Allergie: {o.customer.dietaryNotes}
                          </p>
                        )}
                      </td>
                      <td className="p-3 align-top max-w-[260px] font-mono text-[11px] text-white/75 space-y-1">
                        <p>
                          <span className="text-white/45">Atterraggio:</span>{' '}
                          {o.attribution?.firstLandingPath || '-'}
                        </p>
                        <p>
                          <span className="text-white/45">Aggiunto da:</span>{' '}
                          {o.attribution?.addedFromPaths?.join(', ') || '-'}
                        </p>
                        <p>
                          <span className="text-white/45">Fonte / UTM:</span>{' '}
                          {o.attribution?.utmSource
                            ? `${o.attribution.utmSource} / ${o.attribution.utmCampaign || ''}`
                            : o.attribution?.initialReferrer || 'direct'}
                        </p>
                        {o.attribution?.journeyPaths && o.attribution.journeyPaths.length > 0 && (
                          <p className="truncate text-[10px] text-white/45" title={o.attribution.journeyPaths.join(' -> ')}>
                            Percorso: {o.attribution.journeyPaths.join(' → ')}
                          </p>
                        )}
                      </td>
                      <td className="p-3 align-top text-right font-mono whitespace-nowrap">
                        <p className="text-sm font-bold text-white">
                          {formatEurFromCents(o.totalCents, 'it')}
                        </p>
                        <p className="text-[11px] text-white/55">
                          ({formatEurFromCents(o.subtotalBaseCents, 'it')} + {formatEurFromCents(o.feeCents, 'it')})
                        </p>
                        {cur !== 'EUR' && (
                          <p className="mt-1 font-bold text-amber-300">
                            {formatMinorCurrency(presMinor, cur, 'en')} ({cur})
                          </p>
                        )}
                      </td>
                      <td className="p-3 align-top space-y-2">
                        <form
                          action={updateOrderWhatsappGroupAction}
                          className="flex flex-wrap items-center gap-1.5"
                        >
                          <input type="hidden" name="orderId" value={o.id} />
                          <input type="hidden" name="locale" value={locale} />
                          <select
                            name="whatsappGroupStatus"
                            defaultValue={o.whatsappGroupStatus}
                            className="h-8 border border-white/20 bg-[#17191c] px-2 text-[11px] text-white"
                          >
                            <option value="scheduled_dec_20">Dal 20/12</option>
                            <option value="invited">Invitato</option>
                            <option value="active">Attivo</option>
                          </select>
                          <input
                            type="url"
                            name="whatsappGroupInviteUrl"
                            defaultValue={o.whatsappGroupInviteUrl || ''}
                            placeholder="https://chat.whatsapp.com/..."
                            className="h-8 w-36 border border-white/20 bg-black/40 px-2 text-[11px] text-white"
                          />
                          <button
                            type="submit"
                            className="inline-flex h-8 items-center gap-1 bg-white px-2 text-[11px] font-bold text-black hover:bg-emerald-300"
                          >
                            <Users className="h-3 w-3" aria-hidden="true" />
                            Salva
                          </button>
                        </form>
                        <form action={deleteOrderAction}>
                          <input type="hidden" name="orderId" value={o.id} />
                          <input type="hidden" name="locale" value={locale} />
                          <button
                            type="submit"
                            className="inline-flex h-7 items-center gap-1 border border-rose-500/40 bg-rose-950/30 px-2.5 text-[10px] font-bold uppercase tracking-wider text-rose-200 hover:bg-rose-900/50"
                          >
                            <Trash2 className="h-3 w-3" aria-hidden="true" />
                            Elimina Ordine
                          </button>
                        </form>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </section>
      </div>
    </main>
  );
}
