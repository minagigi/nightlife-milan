import type { Metadata } from 'next';
import Link from '@/components/LocalizedLink';
import {
  AlertTriangle,
  CheckCircle2,
  Download,
  Eye,
  KeyRound,
  LogOut,
  Mail,
  MessageCircle,
  RefreshCw,
  Search,
  ShieldCheck,
  ShoppingCart,
  Trash2,
  UserRoundCheck,
  Users,
  XCircle,
} from 'lucide-react';
import { getCrmAuthCopy } from '@/lib/crmAuthCopy';
import { requireCrmServerSession } from '@/lib/crmAuthVault';
import { crmFilterOptions, filterCrmContacts, type CrmPermissionStatus } from '@/lib/crmModel';
import { crmStorageConfigured, readCrmDatabase } from '@/lib/crmStore';
import { localePrefix } from '@/lib/i18n/locales';
import { createOrderResumeToken } from '@/lib/single-pass/auth';
import {
  SINGLE_PASS_VENUES,
  VENUE_BY_ID,
  formatEurFromCents,
  resolveOrderChannels,
} from '@/lib/single-pass/catalog';
import { formatMinorCurrency } from '@/lib/single-pass/currency';
import { listAllCartDrafts, listAllOrders } from '@/lib/single-pass/store';
import { getStripeCredentialStatus } from '@/lib/single-pass/stripe';
import type { AbandonedCartRecord, SinglePassOrder } from '@/lib/single-pass/types';
import {
  deleteCrmCartDraftAction,
  deleteCrmOrderAction,
  reconcileCrmEcommerceAction,
  updateCrmOrderWhatsappGroupAction,
} from './actions';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'CRM E-Commerce & Clienti | Nightlife Milan',
  robots: { index: false, follow: false, nocache: true },
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

type VistaTab = 'ecommerce' | 'paid' | 'failed' | 'abandoned' | 'contacts';
type SubBucket =
  | 'all'
  | 'paid'
  | 'failed'
  | 'abandoned_all'
  | 'abandoned_checkout'
  | 'abandoned_cart';

type UnifiedEcommerceRow =
  | {
      kind: 'order';
      bucket: 'paid' | 'failed' | 'abandoned_checkout';
      sortIso: string;
      channels: Array<'single-pass' | 'venue'>;
      order: SinglePassOrder;
    }
  | {
      kind: 'cart';
      bucket: 'abandoned_cart';
      sortIso: string;
      channels: Array<'single-pass' | 'venue'>;
      cart: AbandonedCartRecord;
    };

function param(
  params: Record<string, string | string[] | undefined>,
  key: string,
  fallback = '',
): string {
  const value = params[key];
  return typeof value === 'string' ? value : fallback;
}

function formatDate(value: string | null | undefined): string {
  if (!value) return '-';
  try {
    return new Intl.DateTimeFormat('it-IT', {
      timeZone: 'Europe/Rome',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(new Date(value));
  } catch {
    return value.slice(0, 10);
  }
}

function formatDateTime(value: string | null | undefined): string {
  if (!value) return '-';
  try {
    return new Intl.DateTimeFormat('it-IT', {
      timeZone: 'Europe/Rome',
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(value));
  } catch {
    return value.slice(0, 16).replace('T', ' ');
  }
}

function cleanWhatsappDigits(raw: string | undefined | null): string {
  if (!raw) return '';
  let digits = raw.replace(/\D/g, '');
  if (digits.startsWith('00')) digits = digits.slice(2);
  if (digits.length === 10 && digits.startsWith('3')) {
    digits = `39${digits}`;
  }
  return digits.length >= 8 && digits.length <= 18 ? digits : '';
}

function computeOrderGuests(order: SinglePassOrder): number {
  if (typeof order.totalHeadcount === 'number' && order.totalHeadcount > 0) {
    return order.totalHeadcount;
  }
  return order.items.reduce(
    (sum, item) => sum + (typeof item.totalGuests === 'number' ? item.totalGuests : item.quantity),
    0,
  );
}

const permissionLabels: Record<CrmPermissionStatus, { label: string; color: string }> = {
  opted_in: { label: 'Marketing consentito', color: 'bg-emerald-400' },
  not_opted_in: { label: 'Solo transazionale', color: 'bg-[#EAE3D5]' },
  opted_out: { label: 'Disiscritto', color: 'bg-rose-400' },
};

function buildTabHref(
  crmPath: string,
  next: {
    vista?: VistaTab;
    sub?: SubBucket;
    channel?: string;
    venue?: string;
    q?: string;
  },
): string {
  const sp = new URLSearchParams();
  if (next.vista && next.vista !== 'ecommerce') sp.set('vista', next.vista);
  if (next.sub && next.sub !== 'all') sp.set('sub', next.sub);
  if (next.channel && next.channel !== 'all') sp.set('channel', next.channel);
  if (next.venue && next.venue !== 'all') sp.set('venue', next.venue);
  if (next.q) sp.set('q', next.q);
  const qs = sp.toString();
  return qs ? `${crmPath}?${qs}` : crmPath;
}

export default async function CrmPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: SearchParams;
}) {
  const [{ locale }, queryParams] = await Promise.all([params, searchParams]);
  await requireCrmServerSession(locale);

  const [database, allOrders, allCartDrafts, gatewayStatus] = await Promise.all([
    readCrmDatabase(),
    listAllOrders(250),
    listAllCartDrafts(250),
    getStripeCredentialStatus(),
  ]);

  const authCopy = getCrmAuthCopy(locale);
  const crmPath = locale === 'en' ? '/crm' : `/${locale}/crm`;
  const siteOrigin = (process.env.APP_URL || 'https://nightlifemilan.com').replace(/\/+$/, '');

  const rawVista = param(queryParams, 'vista', 'ecommerce');
  const vista: VistaTab =
    rawVista === 'paid' ||
    rawVista === 'failed' ||
    rawVista === 'abandoned' ||
    rawVista === 'contacts'
      ? rawVista
      : 'ecommerce';

  const rawSub = param(queryParams, 'sub', 'all');
  const sub: SubBucket =
    rawSub === 'paid' ||
    rawSub === 'failed' ||
    rawSub === 'abandoned_all' ||
    rawSub === 'abandoned_checkout' ||
    rawSub === 'abandoned_cart'
      ? rawSub
      : 'all';

  const channelFilter = param(queryParams, 'channel', 'all');
  const ecomVenueFilter = param(queryParams, 'venue', 'all');
  const query = param(queryParams, 'q');
  const syncBannerRaw = param(queryParams, 'sync');

  // Classify all e-commerce records across 100% of nightlifemilan.com
  const paidOrders = allOrders.filter((o) => o.status === 'paid');
  const failedOrders = allOrders.filter((o) => o.status === 'payment_failed');
  const abandonedCheckouts = allOrders.filter(
    (o) =>
      o.status === 'awaiting_payment' || o.status === 'expired' || o.status === 'cancelled',
  );
  const abandonedCarts = allCartDrafts.filter(
    (c) => !c.convertedOrderId && !c.clearedAt && c.items.length > 0,
  );

  const paidGrossCents = paidOrders.reduce((s, o) => s + o.totalCents, 0);
  const paidBaseCents = paidOrders.reduce((s, o) => s + o.subtotalBaseCents, 0);
  const paidFeeCents = paidOrders.reduce((s, o) => s + o.feeCents, 0);
  const paidGuests = paidOrders.reduce((s, o) => s + computeOrderGuests(o), 0);

  const failedAmountCents = failedOrders.reduce((s, o) => s + o.totalCents, 0);
  const failedAttemptsTotal = failedOrders.reduce(
    (s, o) => s + Math.max(1, o.paymentAttempts || 1),
    0,
  );

  const abandonedCheckoutCents = abandonedCheckouts.reduce((s, o) => s + o.totalCents, 0);
  const abandonedCartCents = abandonedCarts.reduce((s, c) => s + c.totalCents, 0);
  const totalAbandonedCount = abandonedCheckouts.length + abandonedCarts.length;
  const totalAbandonedCents = abandonedCheckoutCents + abandonedCartCents;

  const avgPaidOrderCents =
    paidOrders.length > 0 ? Math.round(paidGrossCents / paidOrders.length) : 0;
  const conversionPct =
    allOrders.length > 0 ? Math.round((paidOrders.length / allOrders.length) * 100) : 0;

  let singlePassRecordsCount = 0;
  let venueDirectRecordsCount = 0;
  for (const o of allOrders) {
    const ch = resolveOrderChannels(o.items);
    if (ch.includes('single-pass')) singlePassRecordsCount += 1;
    if (ch.includes('venue')) venueDirectRecordsCount += 1;
  }
  for (const c of abandonedCarts) {
    const ch = c.channels?.length ? c.channels : resolveOrderChannels(c.items);
    if (ch.includes('single-pass')) singlePassRecordsCount += 1;
    if (ch.includes('venue')) venueDirectRecordsCount += 1;
  }

  // Contacts CRM metrics & filtering (preserved 100% intact)
  const emailMarketing = param(queryParams, 'marketing', 'all') as CrmPermissionStatus | 'all';
  const contactVenue = param(queryParams, 'cvenue', 'all');
  const eventLocale = param(queryParams, 'language', 'all');
  const segment = param(queryParams, 'segment', 'all') as
    | 'all'
    | 'repeat'
    | 'single'
    | 'checked_in';
  const contacts = filterCrmContacts(database, {
    query: vista === 'contacts' ? query : '',
    emailMarketing,
    venue: contactVenue,
    locale: eventLocale,
    segment,
  });
  const options = crmFilterOptions(database);
  const allContacts = Object.values(database.contacts);
  const marketingReady = allContacts.filter(
    (contact) => contact.emailMarketing.status === 'opted_in',
  ).length;
  const repeatGuests = allContacts.filter((contact) => contact.stats.events >= 2).length;
  const checkedIn = allContacts.filter((contact) => contact.stats.checkIns > 0).length;
  const lastSync = database.syncRuns[0];

  const contactsExportParams = new URLSearchParams();
  if (vista === 'contacts' && query) contactsExportParams.set('q', query);
  if (contactVenue !== 'all') contactsExportParams.set('venue', contactVenue);
  if (eventLocale !== 'all') contactsExportParams.set('language', eventLocale);
  if (segment !== 'all') contactsExportParams.set('segment', segment);
  const contactsExportQs = contactsExportParams.toString();
  const contactsExportHref = `${crmPath}/export${contactsExportQs ? `?${contactsExportQs}` : ''}`;

  // Build unified e-commerce rows and apply active filters
  const unifiedRows: UnifiedEcommerceRow[] = [
    ...allOrders.map((order): UnifiedEcommerceRow => {
      const bucket =
        order.status === 'paid'
          ? 'paid'
          : order.status === 'payment_failed'
            ? 'failed'
            : 'abandoned_checkout';
      return {
        kind: 'order',
        bucket,
        sortIso: order.paidAt || order.failedAt || order.updatedAt || order.createdAt,
        channels: resolveOrderChannels(order.items),
        order,
      };
    }),
    ...abandonedCarts.map(
      (cart): UnifiedEcommerceRow => ({
        kind: 'cart',
        bucket: 'abandoned_cart',
        sortIso: cart.updatedAt || cart.createdAt,
        channels: cart.channels?.length ? cart.channels : resolveOrderChannels(cart.items),
        cart,
      }),
    ),
  ].sort((a, b) => b.sortIso.localeCompare(a.sortIso));

  const qLower = vista !== 'contacts' ? query.trim().toLowerCase() : '';
  const filteredEcommerceRows = unifiedRows.filter((row) => {
    if (vista === 'paid' && row.bucket !== 'paid') return false;
    if (vista === 'failed' && row.bucket !== 'failed') return false;
    if (vista === 'abandoned') {
      if (sub === 'abandoned_checkout' && row.bucket !== 'abandoned_checkout') return false;
      if (sub === 'abandoned_cart' && row.bucket !== 'abandoned_cart') return false;
      if (row.bucket !== 'abandoned_checkout' && row.bucket !== 'abandoned_cart') return false;
    } else if (vista === 'ecommerce') {
      if (sub === 'paid' && row.bucket !== 'paid') return false;
      if (sub === 'failed' && row.bucket !== 'failed') return false;
      if (
        sub === 'abandoned_all' &&
        row.bucket !== 'abandoned_checkout' &&
        row.bucket !== 'abandoned_cart'
      ) {
        return false;
      }
      if (sub === 'abandoned_checkout' && row.bucket !== 'abandoned_checkout') return false;
      if (sub === 'abandoned_cart' && row.bucket !== 'abandoned_cart') return false;
    }

    if (
      channelFilter !== 'all' &&
      !row.channels.includes(channelFilter as 'single-pass' | 'venue')
    ) {
      return false;
    }

    if (ecomVenueFilter !== 'all') {
      const items = row.kind === 'order' ? row.order.items : row.cart.items;
      if (!items.some((i) => i.venueId === ecomVenueFilter)) return false;
    }

    if (qLower) {
      if (row.kind === 'order') {
        const o = row.order;
        const hay = [
          o.id,
          o.customer.fullName,
          o.customer.email,
          o.customer.whatsapp,
          o.items.map((i) => `${i.venueName} ${i.title} ${i.skuId}`).join(' '),
          o.lastPaymentError?.code || '',
          o.lastPaymentError?.declineCode || '',
          o.lastPaymentError?.message || '',
        ]
          .join(' ')
          .toLowerCase();
        if (!hay.includes(qLower)) return false;
      } else {
        const c = row.cart;
        const hay = [
          c.cartSessionId,
          c.customer?.fullName || '',
          c.customer?.email || '',
          c.customer?.whatsapp || '',
          c.items.map((i) => `${i.venueName} ${i.title} ${i.skuId}`).join(' '),
          c.lastValidationError || '',
        ]
          .join(' ')
          .toLowerCase();
        if (!hay.includes(qLower)) return false;
      }
    }

    return true;
  });

  // Distinct venues present across orders/carts + catalog
  const ecomVenueOptions = Array.from(
    new Map<string, string>([
      ...SINGLE_PASS_VENUES.map((v): [string, string] => [v.id, v.name]),
      ...allOrders.flatMap((o) =>
        o.items.map((i): [string, string] => [
          i.venueId,
          i.venueName || VENUE_BY_ID[i.venueId]?.name || i.venueId,
        ]),
      ),
      ...abandonedCarts.flatMap((c) =>
        c.items.map((i): [string, string] => [
          i.venueId,
          i.venueName || VENUE_BY_ID[i.venueId]?.name || i.venueId,
        ]),
      ),
    ]).entries(),
  ).sort((a, b) => a[1].localeCompare(b[1]));

  const ecomExportParams = new URLSearchParams();
  if (vista !== 'ecommerce' && vista !== 'contacts') ecomExportParams.set('vista', vista);
  if (sub !== 'all') ecomExportParams.set('sub', sub);
  if (channelFilter !== 'all') ecomExportParams.set('channel', channelFilter);
  if (ecomVenueFilter !== 'all') ecomExportParams.set('venue', ecomVenueFilter);
  if (vista !== 'contacts' && query) ecomExportParams.set('q', query);
  const ecomExportQs = ecomExportParams.toString();
  const ecomExportHref = `${crmPath}/ecommerce-export${ecomExportQs ? `?${ecomExportQs}` : ''}`;

  let syncNotice: { ok: boolean; text: string } | null = null;
  if (syncBannerRaw.startsWith('ok:')) {
    const [, scanned = '0', paid = '0', failed = '0', cancelled = '0'] = syncBannerRaw.split(':');
    syncNotice = {
      ok: true,
      text: `Sincronizzazione gateway completata: ${scanned} transazioni verificate, ${paid} nuovi pagati, ${failed} nuovi falliti, ${cancelled} annullati.`,
    };
  } else if (syncBannerRaw.startsWith('err:')) {
    syncNotice = {
      ok: false,
      text: `Impossibile interrogare il gateway pagamenti: ${syncBannerRaw.slice(4)}. Verifica la chiave in Analisi & Gateway.`,
    };
  }

  return (
    <main className="crm-shell min-h-screen bg-[#0c0d0f] px-3 py-8 text-white sm:px-6">
      <div className="mx-auto max-w-[1540px] space-y-6">
        {/* Top Header */}
        <header className="flex flex-col gap-5 border-b border-white/15 pb-6 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-emerald-300">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              <span>Area interna protetta · E-Commerce &amp; Clienti Nightlife Milan</span>
              <span className="border border-white/15 bg-white/[0.04] px-2 py-0.5 font-mono text-[11px] text-white/75">
                Gateway:{' '}
                {gatewayStatus.configured
                  ? `ATTIVO (${gatewayStatus.livemode ? 'LIVE' : 'TEST'})`
                  : 'NON CONFIGURATO'}
              </span>
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-white">
              CRM E-Commerce &amp; Clienti Nightlife Milan
            </h1>
            <p className="mt-2 max-w-4xl text-sm text-white/60">
              Controllo unificato di tutti gli ordini pagati, pagamenti falliti, checkout non
              saldati e carrelli abbandonati pre-checkout su tutto il catalogo{' '}
              <span className="text-white/85">Single Pass</span>,{' '}
              <span className="text-white/85">Capodanno</span>,{' '}
              <span className="text-white/85">eventi speciali e locali</span>, insieme
              all&apos;anagrafica contatti.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <form action={reconcileCrmEcommerceAction}>
              <input type="hidden" name="locale" value={locale} />
              <input type="hidden" name="vista" value={vista} />
              <button
                type="submit"
                className="inline-flex h-10 shrink-0 items-center gap-1.5 border border-[#E8C068]/60 bg-[#E8C068] px-4 text-xs font-extrabold uppercase tracking-wider text-[#050505] hover:bg-[#f2cf7e]"
              >
                <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
                Sincronizza Pagamenti
              </button>
            </form>

            <a
              href={ecomExportHref}
              className="inline-flex h-10 shrink-0 items-center gap-1.5 border border-white/25 bg-white px-4 text-xs font-extrabold uppercase tracking-wider text-[#050505] hover:bg-emerald-300"
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              Esporta CSV E-Commerce
            </a>

            <Link
              href={`${crmPath}/single-pass`}
              className="inline-flex h-10 shrink-0 items-center border border-emerald-400/50 bg-emerald-950/40 px-3.5 text-xs font-bold uppercase tracking-wider text-emerald-200 hover:bg-emerald-900/50"
            >
              Analisi &amp; Gateway →
            </Link>

            <a
              href={`${crmPath}/credentials`}
              className="inline-flex h-10 shrink-0 items-center gap-1.5 border border-white/25 bg-white/10 px-3.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/20"
            >
              <KeyRound className="h-3.5 w-3.5" aria-hidden="true" />
              {authCopy.headerCredentialsBtn}
            </a>

            <form action="/api/crm/logout" method="post">
              <input type="hidden" name="locale" value={locale} />
              <button
                type="submit"
                className="inline-flex h-10 shrink-0 items-center gap-1.5 border border-white/25 bg-transparent px-3.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/15"
              >
                <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
                {authCopy.headerLogoutBtn}
              </button>
            </form>
          </div>
        </header>

        {!crmStorageConfigured() && (
          <div className="border border-[#F6F1E7]/30 bg-[#0B0A09] px-4 py-3 text-sm text-[#EAE3D5]">
            Archivio CRM locale in memoria: configura BLOB_READ_WRITE_TOKEN per la persistenza cloud.
          </div>
        )}

        {syncNotice && (
          <div
            className={`flex items-center gap-2.5 border px-4 py-3 text-sm font-medium ${
              syncNotice.ok
                ? 'border-emerald-400/50 bg-emerald-950/40 text-emerald-100'
                : 'border-rose-400/50 bg-rose-950/40 text-rose-100'
            }`}
          >
            {syncNotice.ok ? (
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />
            ) : (
              <AlertTriangle className="h-4 w-4 shrink-0 text-rose-300" aria-hidden="true" />
            )}
            <span>{syncNotice.text}</span>
          </div>
        )}

        {/* 6 Executive KPI Cards */}
        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          <Link
            href={buildTabHref(crmPath, { vista: 'paid' })}
            className="block border border-emerald-400/30 bg-emerald-950/20 p-4 transition hover:border-emerald-300"
          >
            <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
              Ordini Pagati
            </p>
            <p className="mt-1 font-mono text-2xl font-bold text-white">{paidOrders.length}</p>
            <p className="mt-1 font-mono text-xs text-emerald-200">
              {formatEurFromCents(paidGrossCents, 'it')} · {paidGuests} ospiti
            </p>
            <p className="mt-0.5 text-[11px] text-white/45">
              Base {formatEurFromCents(paidBaseCents, 'it')} + Fee{' '}
              {formatEurFromCents(paidFeeCents, 'it')}
            </p>
          </Link>

          <Link
            href={buildTabHref(crmPath, { vista: 'failed' })}
            className="block border border-rose-400/35 bg-rose-950/20 p-4 transition hover:border-rose-300"
          >
            <p className="text-[11px] font-bold uppercase tracking-wider text-rose-300">
              Pagamenti Falliti
            </p>
            <p className="mt-1 font-mono text-2xl font-bold text-white">{failedOrders.length}</p>
            <p className="mt-1 font-mono text-xs text-rose-200">
              {formatEurFromCents(failedAmountCents, 'it')} rifiutati
            </p>
            <p className="mt-0.5 text-[11px] text-white/45">
              {failedAttemptsTotal} tentativi registrati
            </p>
          </Link>

          <Link
            href={buildTabHref(crmPath, { vista: 'abandoned' })}
            className="block border border-amber-300/35 bg-amber-950/20 p-4 transition hover:border-amber-200"
          >
            <p className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
              Carrelli Abbandonati
            </p>
            <p className="mt-1 font-mono text-2xl font-bold text-white">{totalAbandonedCount}</p>
            <p className="mt-1 font-mono text-xs text-amber-200">
              {formatEurFromCents(totalAbandonedCents, 'it')} recuperabili
            </p>
            <p className="mt-0.5 text-[11px] text-white/45">
              {abandonedCheckouts.length} checkout · {abandonedCarts.length} pre-checkout
            </p>
          </Link>

          <div className="border border-white/12 bg-white/[0.025] p-4">
            <p className="text-[11px] font-bold uppercase tracking-wider text-white/55">
              Scontrino &amp; Resa
            </p>
            <p className="mt-1 font-mono text-2xl font-bold text-white">
              {formatEurFromCents(avgPaidOrderCents, 'it')}
            </p>
            <p className="mt-1 font-mono text-xs text-white/75">
              Conversione ordini: {conversionPct}%
            </p>
            <p className="mt-0.5 text-[11px] text-white/45">
              Su {allOrders.length} ordini inviati
            </p>
          </div>

          <div className="border border-white/12 bg-white/[0.025] p-4">
            <p className="text-[11px] font-bold uppercase tracking-wider text-white/55">
              Canali E-Commerce
            </p>
            <p className="mt-1 font-mono text-xl font-bold text-[#E8C068]">
              {singlePassRecordsCount} SP · {venueDirectRecordsCount} Eventi
            </p>
            <p className="mt-1 text-xs text-white/70">Single Pass + Schede Locali</p>
            <p className="mt-0.5 text-[11px] text-white/45">100% catalogo Nightlife Milan</p>
          </div>

          <Link
            href={buildTabHref(crmPath, { vista: 'contacts' })}
            className="block border border-white/15 bg-white/[0.025] p-4 transition hover:border-white/40"
          >
            <p className="text-[11px] font-bold uppercase tracking-wider text-white/55">
              Anagrafica Contatti
            </p>
            <p className="mt-1 font-mono text-2xl font-bold text-white">{allContacts.length}</p>
            <p className="mt-1 text-xs text-emerald-300">{marketingReady} marketing attivo</p>
            <p className="mt-0.5 text-[11px] text-white/45">
              {repeatGuests} abituali · {checkedIn} check-in
            </p>
          </Link>
        </section>

        {/* Primary Navigation Tabs */}
        <nav
          aria-label="Sezioni CRM"
          className="flex flex-wrap items-center gap-2 border-b border-white/15 pb-4"
        >
          {(
            [
              {
                key: 'ecommerce' as const,
                label: `Tutto l'E-Commerce (${unifiedRows.length})`,
              },
              {
                key: 'paid' as const,
                label: `Ordini Pagati (${paidOrders.length})`,
              },
              {
                key: 'failed' as const,
                label: `Pagamenti Falliti (${failedOrders.length})`,
              },
              {
                key: 'abandoned' as const,
                label: `Carrelli Abbandonati (${totalAbandonedCount})`,
              },
              {
                key: 'contacts' as const,
                label: `Anagrafica Contatti Eventi (${allContacts.length})`,
              },
            ] as const
          ).map((tab) => {
            const active = vista === tab.key;
            return (
              <Link
                key={tab.key}
                href={buildTabHref(crmPath, {
                  vista: tab.key,
                  channel: tab.key === 'contacts' ? undefined : channelFilter,
                  venue: tab.key === 'contacts' ? undefined : ecomVenueFilter,
                })}
                className={`inline-flex h-10 items-center px-4 text-xs font-extrabold uppercase tracking-wider transition ${
                  active
                    ? 'bg-[#E8C068] text-[#050505]'
                    : 'border border-white/20 bg-white/[0.03] text-white/80 hover:border-white/45 hover:text-white'
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>

        {vista !== 'contacts' ? (
          <>
            {/* Sub-filter Pills for E-Commerce / Abandoned */}
            {(vista === 'ecommerce' || vista === 'abandoned') && (
              <div className="flex flex-wrap items-center gap-2">
                {(vista === 'ecommerce'
                  ? ([
                      { id: 'all', label: `Tutti (${unifiedRows.length})` },
                      { id: 'paid', label: `Pagati (${paidOrders.length})` },
                      { id: 'failed', label: `Falliti (${failedOrders.length})` },
                      {
                        id: 'abandoned_all',
                        label: `Tutti gli Abbandonati (${totalAbandonedCount})`,
                      },
                      {
                        id: 'abandoned_checkout',
                        label: `Checkout Non Saldati (${abandonedCheckouts.length})`,
                      },
                      {
                        id: 'abandoned_cart',
                        label: `Carrelli Pre-Checkout (${abandonedCarts.length})`,
                      },
                    ] as const)
                  : ([
                      {
                        id: 'all',
                        label: `Tutti gli Abbandonati (${totalAbandonedCount})`,
                      },
                      {
                        id: 'abandoned_checkout',
                        label: `Checkout Inviati Non Saldati (${abandonedCheckouts.length})`,
                      },
                      {
                        id: 'abandoned_cart',
                        label: `Carrelli Pre-Checkout (${abandonedCarts.length})`,
                      },
                    ] as const)
                ).map((pill) => {
                  const activePill = sub === pill.id;
                  return (
                    <Link
                      key={pill.id}
                      href={buildTabHref(crmPath, {
                        vista,
                        sub: pill.id,
                        channel: channelFilter,
                        venue: ecomVenueFilter,
                        q: query,
                      })}
                      className={`inline-flex h-8 items-center px-3 text-xs font-bold transition ${
                        activePill
                          ? 'bg-white text-[#050505]'
                          : 'border border-white/15 bg-white/[0.02] text-white/70 hover:border-white/35 hover:text-white'
                      }`}
                    >
                      {pill.label}
                    </Link>
                  );
                })}
              </div>
            )}

            {/* E-Commerce Filter Bar */}
            <section className="border border-white/12 bg-white/[0.02] p-4">
              <form
                method="get"
                className="grid gap-3 md:grid-cols-2 xl:grid-cols-[minmax(260px,1.6fr)_minmax(200px,1fr)_minmax(220px,1fr)_auto_auto]"
              >
                {vista !== 'ecommerce' && <input type="hidden" name="vista" value={vista} />}
                {sub !== 'all' && <input type="hidden" name="sub" value={sub} />}

                <label className="text-xs text-white/60">
                  Cerca ordine, cliente, telefono, SKU o codice rifiuto
                  <input
                    type="search"
                    name="q"
                    defaultValue={query}
                    placeholder="Es. NLM-SP, Rossi, +39..., insufficient_funds, Just Me"
                    className="mt-1 h-10 w-full border border-white/20 bg-black/40 px-3 text-sm text-white outline-none focus:border-[#E8C068]"
                  />
                </label>

                <label className="text-xs text-white/60">
                  Canale E-Commerce
                  <select
                    name="channel"
                    defaultValue={channelFilter}
                    className="mt-1 h-10 w-full border border-white/20 bg-[#17191c] px-3 text-sm text-white outline-none focus:border-[#E8C068]"
                  >
                    <option value="all">Tutto l&apos;e-commerce Nightlife Milan</option>
                    <option value="single-pass">Storefront Single Pass (/single-pass)</option>
                    <option value="venue">Schede Evento, Capodanno &amp; Locali</option>
                  </select>
                </label>

                <label className="text-xs text-white/60">
                  Locale / Evento
                  <select
                    name="venue"
                    defaultValue={ecomVenueFilter}
                    className="mt-1 h-10 w-full border border-white/20 bg-[#17191c] px-3 text-sm text-white outline-none focus:border-[#E8C068]"
                  >
                    <option value="all">Tutti i locali e gli eventi</option>
                    {ecomVenueOptions.map(([vId, vName]) => (
                      <option key={vId} value={vId}>
                        {vName}
                      </option>
                    ))}
                  </select>
                </label>

                <button
                  type="submit"
                  className="mt-auto inline-flex h-10 items-center justify-center gap-2 bg-[#E8C068] px-5 text-xs font-extrabold uppercase tracking-wider text-[#050505] hover:bg-[#f2cf7e]"
                >
                  <Search className="h-4 w-4" aria-hidden="true" />
                  Filtra ({filteredEcommerceRows.length})
                </button>

                <Link
                  href={buildTabHref(crmPath, { vista })}
                  className="mt-auto inline-flex h-10 items-center justify-center border border-white/20 px-4 text-xs font-bold uppercase tracking-wider text-white/75 hover:border-white hover:text-white"
                >
                  Azzera
                </Link>
              </form>
            </section>

            {/* Unified Operational E-Commerce Table */}
            <section className="overflow-x-auto border border-white/15">
              <table className="w-full min-w-[1280px] text-left text-xs">
                <thead className="bg-white/[0.04] text-[11px] uppercase tracking-wider text-white/55">
                  <tr>
                    <th className="p-3 font-semibold">Stato / Codice / Data</th>
                    <th className="p-3 font-semibold">Cliente &amp; Contatti</th>
                    <th className="p-3 font-semibold">Canale, Prodotti &amp; Ospiti</th>
                    <th className="p-3 font-semibold">Dettaglio Pagamento / Abbandono</th>
                    <th className="p-3 text-right font-semibold">Importo &amp; Valuta</th>
                    <th className="p-3 font-semibold">Azioni &amp; Recupero Rapido</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {filteredEcommerceRows.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-12 text-center text-sm text-white/50">
                        Nessun ordine o carrello presente per i filtri selezionati. Non appena un
                        visitatore aggiunge prodotti al carrello, avvia il checkout, riceve un
                        rifiuto carta o completa il pagamento, comparirà automaticamente qui.
                      </td>
                    </tr>
                  ) : (
                    filteredEcommerceRows.map((row) => {
                      if (row.kind === 'order') {
                        const o = row.order;
                        const guests = computeOrderGuests(o);
                        const cur = (o.presentmentCurrency || 'EUR').toUpperCase();
                        const presMinor = o.presentmentTotalMinor ?? o.totalCents;
                        const waDigits = cleanWhatsappDigits(o.customer.whatsapp);
                        const orderLp = localePrefix(o.locale || 'it');
                        const resumeToken = createOrderResumeToken(o.id, o.customer.email);
                        const recoveryUrl = `${siteOrigin}${orderLp}/checkout?order=${encodeURIComponent(o.id)}&rt=${encodeURIComponent(resumeToken)}`;
                        const pkgSummaryShort = o.items
                          .map((i) => `${i.venueName} (${i.title} x${i.quantity})`)
                          .join(', ');

                        const waText =
                          row.bucket === 'paid'
                            ? `Ciao ${o.customer.fullName}, confermiamo il tuo ordine ${o.id} su Nightlife Milan (${pkgSummaryShort}). Per qualsiasi esigenza siamo a tua disposizione.`
                            : row.bucket === 'failed'
                              ? `Ciao ${o.customer.fullName}, abbiamo visto che il pagamento per il tuo ordine ${o.id} (${pkgSummaryShort}) su Nightlife Milan non e andato a buon fine. Puoi completarlo subito in sicurezza da qui: ${recoveryUrl}`
                              : `Ciao ${o.customer.fullName}, i tuoi posti per ${pkgSummaryShort} (ordine ${o.id}) su Nightlife Milan sono pronti per la conferma. Puoi completare il pagamento da qui: ${recoveryUrl}`;

                        const badgeConfig =
                          row.bucket === 'paid'
                            ? {
                                label: 'ORDINE PAGATO',
                                cls: 'bg-emerald-400 text-[#050505]',
                              }
                            : row.bucket === 'failed'
                              ? {
                                  label: 'PAGAMENTO FALLITO',
                                  cls: 'bg-rose-400 text-[#050505]',
                                }
                              : {
                                  label:
                                    o.status === 'expired'
                                      ? 'CHECKOUT SCADUTO'
                                      : o.status === 'cancelled'
                                        ? 'CHECKOUT ANNULLATO'
                                        : 'CHECKOUT ABBANDONATO',
                                  cls: 'bg-amber-300 text-[#050505]',
                                };

                        return (
                          <tr key={`ord-${o.id}`} className="hover:bg-white/[0.025]">
                            {/* Col 1: Status & ID */}
                            <td className="p-3 align-top">
                              <span
                                className={`inline-block px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider ${badgeConfig.cls}`}
                              >
                                {badgeConfig.label}
                              </span>
                              <p className="mt-2 font-mono text-xs font-bold text-white">{o.id}</p>
                              <p className="font-mono text-[10px] text-white/50">
                                PIN: {o.accessPin}
                              </p>
                              <p className="mt-1 font-mono text-[11px] text-white/55">
                                Creato: {formatDateTime(o.createdAt)}
                              </p>
                              {o.paidAt && (
                                <p className="font-mono text-[11px] text-emerald-300">
                                  Pagato: {formatDateTime(o.paidAt)}
                                </p>
                              )}
                              {o.failedAt && row.bucket !== 'paid' && (
                                <p className="font-mono text-[11px] text-rose-300">
                                  Fallito: {formatDateTime(o.failedAt)}
                                </p>
                              )}
                            </td>

                            {/* Col 2: Customer */}
                            <td className="p-3 align-top">
                              <p className="font-semibold text-white">
                                {o.customer.fullName} · {o.customer.age} anni
                              </p>
                              <p className="mt-0.5 font-mono text-emerald-300">
                                {o.customer.whatsapp}
                              </p>
                              <p className="text-white/80">{o.customer.email}</p>
                              <p className="mt-1 text-[11px] text-white/50">
                                {o.customer.country || o.attribution?.ipCountry || '-'} ·{' '}
                                {o.customer.spokenLanguages.join(', ')}
                              </p>
                            </td>

                            {/* Col 3: Channels & Items */}
                            <td className="max-w-[290px] p-3 align-top">
                              <div className="mb-1.5 flex flex-wrap gap-1">
                                {row.channels.map((ch) => (
                                  <span
                                    key={ch}
                                    className="border border-white/20 bg-white/[0.06] px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-white"
                                  >
                                    {ch === 'single-pass' ? 'Single Pass' : 'Scheda Evento / Locale'}
                                  </span>
                                ))}
                                <span className="bg-white/15 px-2 py-0.5 font-mono text-[10px] font-bold text-white">
                                  {guests} ospiti
                                </span>
                              </div>
                              <ul className="space-y-1 text-white/85">
                                {o.items.map((item) => (
                                  <li key={`${o.id}-${item.skuId}-${item.channel || 'v'}`}>
                                    <strong>{item.venueName}</strong>: {item.title} × {item.quantity}
                                    {item.dietaryChoice ? (
                                      <span className="block text-[10px] text-amber-200">
                                        Menu/Scelta: {item.dietaryChoice}
                                      </span>
                                    ) : null}
                                  </li>
                                ))}
                              </ul>
                              {o.customer.dietaryNotes && (
                                <p className="mt-1.5 border-t border-white/10 pt-1 text-[11px] text-amber-200">
                                  Note alimentari: {o.customer.dietaryNotes}
                                </p>
                              )}
                            </td>

                            {/* Col 4: Diagnostic / Attribution / Email Confirmation */}
                            <td className="max-w-[300px] p-3 align-top space-y-2">
                              {o.lastPaymentError && row.bucket !== 'paid' && (
                                <div className="border border-rose-400/50 bg-rose-950/45 p-2.5 text-rose-100">
                                  <p className="flex items-center gap-1.5 font-mono text-[10px] font-extrabold uppercase text-rose-200">
                                    <XCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                                    Rifiuto ({o.paymentAttempts || 1} tentativ
                                    {(o.paymentAttempts || 1) === 1 ? 'o' : 'i'})
                                  </p>
                                  {(o.lastPaymentError.declineCode || o.lastPaymentError.code) && (
                                    <p className="mt-1 font-mono text-[11px] font-bold text-white">
                                      Codice:{' '}
                                      {o.lastPaymentError.declineCode || o.lastPaymentError.code}
                                    </p>
                                  )}
                                  <p className="mt-0.5 text-[11px] leading-snug text-rose-100">
                                    {o.lastPaymentError.message}
                                  </p>
                                </div>
                              )}

                              {row.bucket === 'paid' && (
                                <div className="border border-emerald-400/30 bg-emerald-950/30 p-2 text-[11px]">
                                  <p className="font-semibold text-emerald-200">
                                    {o.confirmationEmailSentAt
                                      ? `Email conferma inviata (${formatDateTime(o.confirmationEmailSentAt)})`
                                      : o.emailDeliveryError
                                        ? `Errore email: ${o.emailDeliveryError}`
                                        : 'Email conferma in coda'}
                                  </p>
                                </div>
                              )}

                              <div className="font-mono text-[11px] text-white/65 space-y-0.5">
                                <p className="truncate" title={o.attribution?.firstLandingPath || '-'}>
                                  <span className="text-white/40">Ingresso:</span>{' '}
                                  {o.attribution?.firstLandingPath || '-'}
                                </p>
                                <p
                                  className="truncate"
                                  title={o.attribution?.addedFromPaths?.join(', ') || '-'}
                                >
                                  <span className="text-white/40">Da pagina:</span>{' '}
                                  {o.attribution?.addedFromPaths?.join(', ') || '-'}
                                </p>
                                <p>
                                  <span className="text-white/40">Fonte:</span>{' '}
                                  {o.attribution?.utmSource
                                    ? `${o.attribution.utmSource}${o.attribution.utmCampaign ? ` / ${o.attribution.utmCampaign}` : ''}`
                                    : o.attribution?.initialReferrer || 'diretto'}
                                </p>
                              </div>
                            </td>

                            {/* Col 5: Money */}
                            <td className="whitespace-nowrap p-3 text-right align-top font-mono">
                              <p className="text-sm font-bold text-white">
                                {formatEurFromCents(o.totalCents, 'it')}
                              </p>
                              <p className="text-[11px] text-white/55">
                                {formatEurFromCents(o.subtotalBaseCents, 'it')} +{' '}
                                {formatEurFromCents(o.feeCents, 'it')} fee
                              </p>
                              {cur !== 'EUR' && (
                                <p className="mt-1 text-xs font-bold text-[#E8C068]">
                                  {formatMinorCurrency(presMinor, cur, 'en')} ({cur})
                                </p>
                              )}
                            </td>

                            {/* Col 6: Recovery & Admin Actions */}
                            <td className="p-3 align-top space-y-2">
                              <div className="flex flex-wrap items-center gap-1.5">
                                {waDigits && (
                                  <a
                                    href={`https://wa.me/${waDigits}?text=${encodeURIComponent(waText)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex h-8 items-center gap-1.5 bg-[#25D366] px-3 text-[11px] font-extrabold uppercase tracking-wider text-[#050505] hover:brightness-105"
                                  >
                                    <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                                    {row.bucket === 'paid' ? 'WhatsApp' : 'Recupera WA'}
                                  </a>
                                )}
                                {o.customer.email && (
                                  <a
                                    href={`mailto:${o.customer.email}?subject=${encodeURIComponent(`Ordine ${o.id} - Nightlife Milan`)}`}
                                    className="inline-flex h-8 items-center gap-1 border border-white/25 bg-white/10 px-2.5 text-[11px] font-bold text-white hover:bg-white/20"
                                  >
                                    <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                                    Email
                                  </a>
                                )}
                              </div>

                              {row.bucket === 'paid' && (
                                <form
                                  action={updateCrmOrderWhatsappGroupAction}
                                  className="flex flex-wrap items-center gap-1 pt-1"
                                >
                                  <input type="hidden" name="orderId" value={o.id} />
                                  <input type="hidden" name="locale" value={locale} />
                                  <select
                                    name="whatsappGroupStatus"
                                    defaultValue={o.whatsappGroupStatus}
                                    aria-label="Stato gruppo WhatsApp"
                                    className="h-7 border border-white/20 bg-[#17191c] px-1.5 text-[11px] text-white"
                                  >
                                    <option value="scheduled_dec_20">Gruppo 20/12</option>
                                    <option value="invited">Invitato</option>
                                    <option value="active">Attivo</option>
                                  </select>
                                  <input
                                    type="url"
                                    name="whatsappGroupInviteUrl"
                                    defaultValue={o.whatsappGroupInviteUrl || ''}
                                    placeholder="https://chat.whatsapp.com/..."
                                    aria-label="Link invito gruppo WhatsApp"
                                    className="h-7 w-32 border border-white/20 bg-black/40 px-2 text-[11px] text-white"
                                  />
                                  <button
                                    type="submit"
                                    className="inline-flex h-7 items-center gap-1 bg-white px-2 text-[10px] font-extrabold uppercase text-[#050505] hover:bg-emerald-300"
                                  >
                                    <Users className="h-3 w-3" aria-hidden="true" />
                                    Salva
                                  </button>
                                </form>
                              )}

                              {row.bucket !== 'paid' ? (
                                <form action={deleteCrmOrderAction}>
                                  <input type="hidden" name="orderId" value={o.id} />
                                  <input type="hidden" name="locale" value={locale} />
                                  <button
                                    type="submit"
                                    className="inline-flex h-7 items-center gap-1 border border-rose-400/40 bg-rose-950/30 px-2.5 text-[10px] font-bold uppercase tracking-wider text-rose-200 hover:bg-rose-900/50"
                                  >
                                    <Trash2 className="h-3 w-3" aria-hidden="true" />
                                    Elimina
                                  </button>
                                </form>
                              ) : (
                                <details className="text-[10px] text-white/50">
                                  <summary className="cursor-pointer select-none hover:text-rose-300">
                                    Opzioni cancellazione
                                  </summary>
                                  <form
                                    action={deleteCrmOrderAction}
                                    className="mt-1.5 flex items-center gap-1"
                                  >
                                    <input type="hidden" name="orderId" value={o.id} />
                                    <input type="hidden" name="locale" value={locale} />
                                    <input
                                      type="text"
                                      name="confirmPaid"
                                      placeholder="Scrivi ELIMINA"
                                      aria-label="Scrivi ELIMINA per confermare"
                                      className="h-7 w-28 border border-rose-400/40 bg-black/50 px-2 text-[10px] text-white"
                                    />
                                    <button
                                      type="submit"
                                      className="h-7 border border-rose-400/50 bg-rose-950/50 px-2 text-[10px] font-bold uppercase text-rose-200 hover:bg-rose-900"
                                    >
                                      Conferma
                                    </button>
                                  </form>
                                </details>
                              )}
                            </td>
                          </tr>
                        );
                      }

                      // Pre-checkout Abandoned Cart Row
                      const c = row.cart;
                      const cur = (c.presentmentCurrency || 'EUR').toUpperCase();
                      const presMinor = c.presentmentTotalMinor ?? c.totalCents;
                      const waDigits = cleanWhatsappDigits(c.customer?.whatsapp);
                      const cartLp = localePrefix(c.locale || 'it');
                      const cartCheckoutUrl = `${siteOrigin}${cartLp}/checkout`;
                      const shortCartCode = `CART-${c.cartSessionId.slice(0, 8).toUpperCase()}`;
                      const pkgSummaryShort = c.items
                        .map((i) => `${i.venueName} (${i.title} x${i.quantity})`)
                        .join(', ');
                      const guestName = c.customer?.fullName || '';
                      const waCartText = `${guestName ? `Ciao ${guestName}, ` : 'Ciao, '}abbiamo visto il tuo carrello su Nightlife Milan per ${pkgSummaryShort}. Se hai bisogno di supporto o vuoi completare la prenotazione puoi riprendere da qui: ${cartCheckoutUrl}`;

                      return (
                        <tr key={`cart-${c.cartSessionId}`} className="hover:bg-white/[0.025]">
                          <td className="p-3 align-top">
                            <span className="inline-block bg-[#E8C068] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#050505]">
                              CARRELLO PRE-CHECKOUT
                            </span>
                            <p className="mt-2 font-mono text-xs font-bold text-white">
                              {shortCartCode}
                            </p>
                            <p className="mt-1 font-mono text-[11px] text-white/55">
                              Iniziato: {formatDateTime(c.createdAt)}
                            </p>
                            <p className="font-mono text-[11px] text-[#E8C068]">
                              Ultimo agg.: {formatDateTime(c.updatedAt)}
                            </p>
                          </td>

                          <td className="p-3 align-top">
                            {c.customer?.fullName || c.customer?.email || c.customer?.whatsapp ? (
                              <>
                                <p className="font-semibold text-white">
                                  {c.customer.fullName || 'Nome non inserito'}
                                  {c.customer.age ? ` · ${c.customer.age} anni` : ''}
                                </p>
                                {c.customer.whatsapp && (
                                  <p className="mt-0.5 font-mono text-emerald-300">
                                    {c.customer.whatsapp}
                                  </p>
                                )}
                                {c.customer.email && (
                                  <p className="text-white/80">{c.customer.email}</p>
                                )}
                              </>
                            ) : (
                              <p className="font-medium text-white/70">
                                Visitatore pre-checkout (contatti non ancora inseriti)
                              </p>
                            )}
                            <p className="mt-1 text-[11px] text-white/50">
                              {c.customer?.country ||
                                [c.attribution?.ipCity, c.attribution?.ipCountry]
                                  .filter(Boolean)
                                  .join(', ') ||
                                '-'}{' '}
                              · {c.attribution?.deviceType === 'mobile' ? 'Smartphone' : 'Desktop'}
                            </p>
                          </td>

                          <td className="max-w-[290px] p-3 align-top">
                            <div className="mb-1.5 flex flex-wrap gap-1">
                              {row.channels.map((ch) => (
                                <span
                                  key={ch}
                                  className="border border-white/20 bg-white/[0.06] px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-white"
                                >
                                  {ch === 'single-pass' ? 'Single Pass' : 'Scheda Evento / Locale'}
                                </span>
                              ))}
                              <span className="bg-white/15 px-2 py-0.5 font-mono text-[10px] font-bold text-white">
                                {c.totalHeadcount} ospiti
                              </span>
                            </div>
                            <ul className="space-y-1 text-white/85">
                              {c.items.map((item) => (
                                <li
                                  key={`${c.cartSessionId}-${item.skuId}-${item.channel || 'v'}`}
                                >
                                  <strong>{item.venueName}</strong>: {item.title} × {item.quantity}
                                </li>
                              ))}
                            </ul>
                          </td>

                          <td className="max-w-[300px] p-3 align-top space-y-2">
                            <div className="border border-[#E8C068]/45 bg-[#E8C068]/10 p-2.5 text-amber-100">
                              <p className="flex items-center gap-1.5 font-mono text-[10px] font-extrabold uppercase text-[#E8C068]">
                                <ShoppingCart className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                                {c.stage === 'checkout_form'
                                  ? 'Modulo checkout iniziato (non inviato)'
                                  : 'Prodotti nel carrello (prima del checkout)'}
                              </p>
                              {c.lastValidationError && (
                                <p className="mt-1 text-[11px] leading-snug text-amber-100">
                                  Blocco compilazione: {c.lastValidationError}
                                </p>
                              )}
                            </div>

                            <div className="font-mono text-[11px] text-white/65 space-y-0.5">
                              <p className="truncate" title={c.attribution?.firstLandingPath || '-'}>
                                <span className="text-white/40">Ingresso:</span>{' '}
                                {c.attribution?.firstLandingPath || '-'}
                              </p>
                              <p
                                className="truncate"
                                title={c.attribution?.addedFromPaths?.join(', ') || '-'}
                              >
                                <span className="text-white/40">Da pagina:</span>{' '}
                                {c.attribution?.addedFromPaths?.join(', ') || '-'}
                              </p>
                              <p>
                                <span className="text-white/40">Fonte:</span>{' '}
                                {c.attribution?.utmSource
                                  ? `${c.attribution.utmSource}${c.attribution.utmCampaign ? ` / ${c.attribution.utmCampaign}` : ''}`
                                  : c.attribution?.initialReferrer || 'diretto'}
                              </p>
                            </div>
                          </td>

                          <td className="whitespace-nowrap p-3 text-right align-top font-mono">
                            <p className="text-sm font-bold text-white">
                              {formatEurFromCents(c.totalCents, 'it')}
                            </p>
                            <p className="text-[11px] text-white/55">
                              {formatEurFromCents(c.subtotalBaseCents, 'it')} +{' '}
                              {formatEurFromCents(c.feeCents, 'it')} fee
                            </p>
                            {cur !== 'EUR' && (
                              <p className="mt-1 text-xs font-bold text-[#E8C068]">
                                {formatMinorCurrency(presMinor, cur, 'en')} ({cur})
                              </p>
                            )}
                          </td>

                          <td className="p-3 align-top space-y-2">
                            <div className="flex flex-wrap items-center gap-1.5">
                              {waDigits ? (
                                <a
                                  href={`https://wa.me/${waDigits}?text=${encodeURIComponent(waCartText)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex h-8 items-center gap-1.5 bg-[#25D366] px-3 text-[11px] font-extrabold uppercase tracking-wider text-[#050505] hover:brightness-105"
                                >
                                  <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                                  Recupera WA
                                </a>
                              ) : (
                                <span className="text-[11px] text-white/40">
                                  In attesa recapito
                                </span>
                              )}
                              {c.customer?.email && (
                                <a
                                  href={`mailto:${c.customer.email}?subject=${encodeURIComponent('La tua prenotazione su Nightlife Milan')}`}
                                  className="inline-flex h-8 items-center gap-1 border border-white/25 bg-white/10 px-2.5 text-[11px] font-bold text-white hover:bg-white/20"
                                >
                                  <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                                  Email
                                </a>
                              )}
                            </div>

                            <form action={deleteCrmCartDraftAction}>
                              <input
                                type="hidden"
                                name="cartSessionId"
                                value={c.cartSessionId}
                              />
                              <input type="hidden" name="locale" value={locale} />
                              <button
                                type="submit"
                                className="inline-flex h-7 items-center gap-1 border border-rose-400/40 bg-rose-950/30 px-2.5 text-[10px] font-bold uppercase tracking-wider text-rose-200 hover:bg-rose-900/50"
                              >
                                <Trash2 className="h-3 w-3" aria-hidden="true" />
                                Elimina Bozza
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
          </>
        ) : (
          /* Existing Contacts Directory Tab (100% preserved) */
          <>
            <section className="border border-white/12 bg-white/[0.02] p-4">
              <form
                method="get"
                className="grid gap-3 md:grid-cols-2 xl:grid-cols-[minmax(260px,1.5fr)_repeat(4,minmax(150px,1fr))_auto_auto]"
              >
                <input type="hidden" name="vista" value="contacts" />
                <label className="text-xs text-white/55">
                  Cerca contatto
                  <input
                    type="search"
                    name="q"
                    defaultValue={query}
                    placeholder="Nome, email, telefono, locale"
                    className="mt-1 h-10 w-full border border-white/15 bg-black/30 px-3 text-sm text-white outline-none focus:border-emerald-300"
                  />
                </label>
                <label className="text-xs text-white/55">
                  Contattabilità
                  <select
                    name="marketing"
                    defaultValue={emailMarketing}
                    className="mt-1 h-10 w-full border border-white/15 bg-[#17191c] px-3 text-sm outline-none focus:border-emerald-300"
                  >
                    <option value="all">Tutti</option>
                    <option value="opted_in">Marketing consentito</option>
                    <option value="not_opted_in">Solo transazionale</option>
                    <option value="opted_out">Disiscritti</option>
                  </select>
                </label>
                <label className="text-xs text-white/55">
                  Locale
                  <select
                    name="cvenue"
                    defaultValue={contactVenue}
                    className="mt-1 h-10 w-full border border-white/15 bg-[#17191c] px-3 text-sm outline-none focus:border-emerald-300"
                  >
                    <option value="all">Tutti i locali</option>
                    {options.venues.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="text-xs text-white/55">
                  Lingua evento
                  <select
                    name="language"
                    defaultValue={eventLocale}
                    className="mt-1 h-10 w-full border border-white/15 bg-[#17191c] px-3 text-sm outline-none focus:border-emerald-300"
                  >
                    <option value="all">Tutte le lingue</option>
                    {options.locales.map((option) => (
                      <option key={option} value={option}>
                        {option.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="text-xs text-white/55">
                  Segmento
                  <select
                    name="segment"
                    defaultValue={segment}
                    className="mt-1 h-10 w-full border border-white/15 bg-[#17191c] px-3 text-sm outline-none focus:border-emerald-300"
                  >
                    <option value="all">Tutti</option>
                    <option value="repeat">Clienti abituali</option>
                    <option value="single">Un solo evento</option>
                    <option value="checked_in">Con check-in</option>
                  </select>
                </label>
                <button
                  type="submit"
                  className="mt-auto inline-flex h-10 items-center justify-center gap-2 border border-emerald-300/50 px-4 text-sm text-emerald-200 hover:bg-emerald-300/10"
                >
                  <Search className="h-4 w-4" aria-hidden="true" />
                  Filtra
                </button>
                <Link
                  href={`${crmPath}?vista=contacts`}
                  className="mt-auto inline-flex h-10 items-center justify-center px-3 text-sm text-white/60 hover:text-white"
                >
                  Azzera
                </Link>
              </form>
            </section>

            <div className="flex flex-col gap-3 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
              <span>
                {contacts.length} contatti (ultima sincronizzazione Eventbrite:{' '}
                {lastSync ? formatDate(lastSync.completedAt) : 'mai'})
              </span>
              <div className="flex flex-wrap items-center gap-4">
                <span>I dati personali non vengono inclusi negli analytics pubblici.</span>
                <a
                  href={contactsExportHref}
                  className="inline-flex h-9 items-center gap-2 border border-white/20 px-3 text-white/80 hover:border-emerald-300/50 hover:text-emerald-200"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Esporta contatti con consenso
                </a>
              </div>
            </div>

            <section className="overflow-x-auto border-y border-white/10">
              <table className="w-full min-w-[1120px] text-left text-sm">
                <thead className="bg-white/[0.03] text-[11px] uppercase text-white/45">
                  <tr>
                    <th className="px-3 py-3 font-medium">Cliente</th>
                    <th className="px-3 py-3 font-medium">Contattabilità</th>
                    <th className="px-3 py-3 font-medium">Ultimo evento</th>
                    <th className="px-3 py-3 text-right font-medium">Eventi</th>
                    <th className="px-3 py-3 text-right font-medium">Biglietti</th>
                    <th className="px-3 py-3 font-medium">Locali</th>
                    <th className="px-3 py-3 font-medium">Lingue</th>
                    <th className="px-3 py-3 text-right font-medium">Azioni</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-3 py-12 text-center text-white/45">
                        Nessun contatto corrisponde ai filtri.
                      </td>
                    </tr>
                  ) : (
                    contacts.map((contact) => {
                      const permission = permissionLabels[contact.emailMarketing.status];
                      return (
                        <tr
                          key={contact.id}
                          className="border-t border-white/[0.06] hover:bg-white/[0.025]"
                        >
                          <td className="px-3 py-3">
                            <div className="font-medium text-white">{contact.name}</div>
                            <div className="mt-0.5 text-xs text-white/50">
                              {contact.email || 'Email non disponibile'}
                            </div>
                            {contact.phone && (
                              <div className="text-xs text-white/40">{contact.phone}</div>
                            )}
                          </td>
                          <td className="px-3 py-3">
                            <span className="inline-flex items-center gap-2 text-xs text-white/75">
                              <span
                                className={`h-2 w-2 ${permission.color}`}
                                aria-hidden="true"
                              />
                              {permission.label}
                            </span>
                          </td>
                          <td className="px-3 py-3 text-white/70">
                            {formatDate(contact.stats.lastEventAt)}
                          </td>
                          <td className="px-3 py-3 text-right tabular-nums">
                            {contact.stats.events}
                          </td>
                          <td className="px-3 py-3 text-right tabular-nums">
                            {contact.stats.tickets}
                          </td>
                          <td className="max-w-[240px] px-3 py-3 text-xs text-white/60">
                            {contact.stats.venues.join(', ') || '-'}
                          </td>
                          <td className="px-3 py-3 text-xs uppercase text-white/60">
                            {contact.stats.locales.join(', ') || '-'}
                          </td>
                          <td className="px-3 py-3">
                            <div className="flex justify-end gap-1">
                              {contact.email && contact.emailMarketing.status === 'opted_in' && (
                                <a
                                  href={`mailto:${contact.email}`}
                                  title="Scrivi una email"
                                  className="grid h-8 w-8 place-items-center border border-white/15 text-white/65 hover:border-emerald-300/50 hover:text-emerald-200"
                                >
                                  <Mail className="h-4 w-4" aria-hidden="true" />
                                </a>
                              )}
                              <Link
                                href={`${crmPath}/contact/${contact.id}`}
                                title="Apri scheda cliente"
                                className="grid h-8 w-8 place-items-center border border-white/15 text-white/65 hover:border-white/35 hover:text-white"
                              >
                                <Eye className="h-4 w-4" aria-hidden="true" />
                              </Link>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </section>
          </>
        )}

        <footer className="flex flex-col gap-2 border-t border-white/10 pt-5 text-xs text-white/45 md:flex-row md:items-center md:justify-between">
          <span className="inline-flex items-center gap-2">
            <UserRoundCheck className="h-4 w-4" aria-hidden="true" />
            E-commerce completo Nightlife Milan (Ordini Pagati, Pagamenti Falliti, Carrelli
            Abbandonati &amp; Contatti).
          </span>
          <span>Archivio cifrato · Vercel Blob privato</span>
        </footer>
      </div>
    </main>
  );
}
