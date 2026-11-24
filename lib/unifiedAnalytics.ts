import 'server-only';
import { createSign } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { unstable_cache } from 'next/cache';
import { readDailyStats, romeDay } from './analyticsStore';
import { readIndexedCartDraftsOnly, readIndexedOrderSummariesOnly } from './single-pass/store';

export type UnifiedPeriod = 'all' | '30d' | '7d' | 'today';

export interface UnifiedSiteRow {
  slug: string;
  domain: string;
  label: string;
  group: 'nightlife' | 'axel';
  activeDns: boolean;
  sessions: number;
  users: number;
  pageViews: number;
  gscClicks: number;
  gscImpressions: number;
  whatsappClicks: number;
  xceedClicks: number;
  addToCart?: number;
  beginCheckout?: number;
  abandonedCarts?: number;
  purchases?: number;
  revenueEur?: number;
  activeUsersNow: number;
}

export interface OrderFunnelEntry {
  id: string;
  createdAt: string;
  paidAt: string | null;
  status: string;
  kind: 'order' | 'cart_draft';
  itemSummary: string;
  totalEur: number;
  headcount: number;
}

export interface UnifiedAnalyticsData {
  period: UnifiedPeriod;
  nlmStartDate: string;
  axelStartDate: string;
  endDate: string;
  generatedAtIso: string;
  globalTotals: {
    sessions: number;
    users: number;
    pageViews: number;
    gscClicks: number;
    gscImpressions: number;
    whatsappClicks: number;
    xceedClicks: number;
    purchases: number;
    revenueEur: number;
    activeUsersNow: number;
  };
  nlmFunnel: {
    sessions: number;
    users: number;
    pageViews: number;
    gscClicks: number;
    gscImpressions: number;
    whatsappClicks: number;
    xceedClicks: number;
    bookingForms: number;
    addToCart: number;
    viewCart: number;
    beginCheckout: number;
    addPaymentInfo: number;
    abandonedCarts: number;
    abandonedPreCheckoutCount: number;
    abandonedOrdersCount: number;
    abandonedValueEur: number;
    purchases: number;
    revenueEur: number;
    activeUsersNow: number;
    recentOrders: OrderFunnelEntry[];
  };
  axelTotals: {
    sessions: number;
    users: number;
    pageViews: number;
    gscClicks: number;
    gscImpressions: number;
    whatsappClicks: number;
    xceedClicks: number;
    activeUsersNow: number;
  };
  sites: UnifiedSiteRow[];
  warnings: string[];
}

const NLM_HISTORY_START = '2025-08-01';
const AXEL_CREATION_START = '2026-11-16';
const AXEL_CUTOVER_COMPACT = '20261124';
const NLM_GA4_PROPERTY_ID = '543047740';
const NLM_GSC_SITE_URL = 'sc-domain:nightlifemilan.com';

const AXEL_PROPERTIES: ReadonlyArray<{
  slug: string;
  domain: string;
  label: string;
  propertyId: string;
  hasGscLink: boolean;
  activeDns: boolean;
}> = [
  { slug: 'capodanno', domain: 'capodannodimilano.com', label: 'Capodanno di Milano', propertyId: '564467671', hasGscLink: true, activeDns: true },
  { slug: 'serate', domain: 'seratemilano.com', label: 'Serate Milano', propertyId: '564481558', hasGscLink: true, activeDns: true },
  { slug: 'discoteche', domain: 'discotecheamilano.com', label: 'Discoteche a Milano', propertyId: '564523895', hasGscLink: true, activeDns: true },
  { slug: 'locali', domain: 'localinotturnimilano.it', label: 'Locali Notturni Milano', propertyId: '564503701', hasGscLink: true, activeDns: true },
  { slug: 'aperitivi', domain: 'milanoaperitivi.com', label: 'Milano Aperitivi', propertyId: '564381238', hasGscLink: true, activeDns: true },
  { slug: 'rooftop', domain: 'milanorooftop.it', label: 'Milano Rooftop', propertyId: '564523693', hasGscLink: true, activeDns: true },
  { slug: 'cena-spettacolo', domain: 'cenaespettacolo.it', label: 'Cena e Spettacolo', propertyId: '564479857', hasGscLink: true, activeDns: true },
  { slug: 'dinner-show', domain: 'dinnershowmilano.it', label: 'Dinner Show Milano', propertyId: '564510781', hasGscLink: true, activeDns: true },
  { slug: 'cena-cantata', domain: 'cenecantatemilano.it', label: 'Cene Cantate Milano', propertyId: '564418761', hasGscLink: true, activeDns: true },
  { slug: 'musica-live', domain: 'musicamilano.com', label: 'Musica Milano', propertyId: '564499788', hasGscLink: true, activeDns: true },
  { slug: 'addio-nubilato', domain: 'addioalnubilatomilano.it', label: 'Addio al Nubilato Milano', propertyId: '564529409', hasGscLink: true, activeDns: true },
  { slug: 'eventi-aziendali', domain: 'locationeventimilano.com', label: 'Location Eventi Milano', propertyId: '564414980', hasGscLink: true, activeDns: true },
  { slug: 'cene-aziendali', domain: 'ceneaziendali.net', label: 'Cene Aziendali', propertyId: '564526850', hasGscLink: true, activeDns: true },
  { slug: 'fiere', domain: 'hospitalitymilano.com', label: 'Hospitality Milano', propertyId: '564486168', hasGscLink: true, activeDns: true },
  { slug: 'concierge', domain: 'conciergeitalia.it', label: 'Concierge Italia', propertyId: '564499787', hasGscLink: true, activeDns: true },
  { slug: 'top-player-eventi', domain: 'topplayereventi.it', label: 'Top Player Eventi', propertyId: '564467478', hasGscLink: false, activeDns: false },
];

let tokenCache: { token: string; expiresAtMs: number } | null = null;

function b64url(input: string | Buffer): string {
  return Buffer.from(input)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

function loadSaCredentials(): { clientEmail: string; privateKey: string } {
  const email = (process.env.NLM_GA_SA_EMAIL || process.env.AXEL_GA_SA_EMAIL || '').trim();
  const key = (process.env.NLM_GA_SA_PRIVATE_KEY || process.env.AXEL_GA_SA_PRIVATE_KEY || '')
    .replace(/\\n/g, '\n')
    .trim();
  if (email && key) {
    return { clientEmail: email, privateKey: key };
  }
  const localPath = 'C:/Users/minag/.config/claude-seo/service_account.json';
  if (existsSync(localPath)) {
    const parsed = JSON.parse(readFileSync(localPath, 'utf-8')) as {
      client_email?: string;
      private_key?: string;
    };
    if (parsed.client_email && parsed.private_key) {
      return { clientEmail: parsed.client_email, privateKey: parsed.private_key };
    }
  }
  throw new Error('Credenziali account di servizio Google mancanti (NLM_GA_SA_EMAIL / NLM_GA_SA_PRIVATE_KEY).');
}

async function getAccessToken(): Promise<string> {
  const now = Date.now();
  if (tokenCache && tokenCache.expiresAtMs - now > 180_000) {
    return tokenCache.token;
  }
  const { clientEmail, privateKey } = loadSaCredentials();
  const iat = Math.floor(now / 1000);
  const exp = iat + 3600;
  const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claims = b64url(
    JSON.stringify({
      iss: clientEmail,
      scope: 'https://www.googleapis.com/auth/analytics.readonly https://www.googleapis.com/auth/webmasters.readonly',
      aud: 'https://oauth2.googleapis.com/token',
      iat,
      exp,
    }),
  );
  const unsigned = `${header}.${claims}`;
  const signer = createSign('RSA-SHA256');
  signer.update(unsigned);
  signer.end();
  const sig = b64url(signer.sign(privateKey));
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${unsigned}.${sig}`,
    }),
    cache: 'no-store',
    signal: AbortSignal.timeout(7000),
  });
  if (!res.ok) {
    throw new Error(`OAuth2 Google HTTP ${res.status}`);
  }
  const j = (await res.json()) as { access_token: string; expires_in?: number };
  tokenCache = {
    token: j.access_token,
    expiresAtMs: now + (j.expires_in ?? 3600) * 1000,
  };
  return j.access_token;
}

function resolveRanges(period: UnifiedPeriod): {
  nlmStart: string;
  axelStart: string;
  endDate: string;
  blobDays: number;
} {
  const now = new Date();
  const endDate = romeDay(now);
  if (period === 'today') {
    const start = romeDay(new Date(now.getTime() - 86400_000));
    return {
      nlmStart: start,
      axelStart: start < AXEL_CREATION_START ? AXEL_CREATION_START : start,
      endDate,
      blobDays: 2,
    };
  }
  if (period === '7d') {
    const start = romeDay(new Date(now.getTime() - 6 * 86400_000));
    return {
      nlmStart: start,
      axelStart: start < AXEL_CREATION_START ? AXEL_CREATION_START : start,
      endDate,
      blobDays: 7,
    };
  }
  if (period === '30d') {
    const start = romeDay(new Date(now.getTime() - 29 * 86400_000));
    return {
      nlmStart: start,
      axelStart: start < AXEL_CREATION_START ? AXEL_CREATION_START : start,
      endDate,
      blobDays: 30,
    };
  }
  return {
    nlmStart: NLM_HISTORY_START,
    axelStart: AXEL_CREATION_START,
    endDate,
    blobDays: 120,
  };
}

async function mapWithConcurrency<T, R>(
  items: readonly T[],
  limit: number,
  worker: (item: T) => Promise<R>,
): Promise<R[]> {
  const results = new Array<R>(items.length);
  let idx = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (idx < items.length) {
      const current = idx++;
      results[current] = await worker(items[current]!);
    }
  });
  await Promise.all(runners);
  return results;
}

interface Ga4Row {
  dimensionValues?: Array<{ value?: string }>;
  metricValues?: Array<{ value?: string }>;
}
interface Ga4Report {
  rows?: Ga4Row[];
  totals?: Ga4Row[];
}

async function fetchNlmMetrics(token: string, startDate: string, endDate: string) {
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
  const batchUrl = `https://analyticsdata.googleapis.com/v1beta/properties/${NLM_GA4_PROPERTY_ID}:batchRunReports`;
  const rtUrl = `https://analyticsdata.googleapis.com/v1beta/properties/${NLM_GA4_PROPERTY_ID}:runRealtimeReport`;
  const gscUrl = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(NLM_GSC_SITE_URL)}/searchAnalytics/query`;

  const [batchRes, rtRes, gscRes] = await Promise.all([
    fetch(batchUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        requests: [
          {
            dateRanges: [{ startDate, endDate }],
            metrics: [
              { name: 'sessions' },
              { name: 'totalUsers' },
              { name: 'screenPageViews' },
              { name: 'purchaseRevenue' },
            ],
          },
          {
            dateRanges: [{ startDate, endDate }],
            dimensions: [{ name: 'eventName' }],
            metrics: [{ name: 'eventCount' }],
            dimensionFilter: {
              filter: {
                fieldName: 'eventName',
                inListFilter: {
                  values: [
                    'whatsapp_click',
                    'xceed_click',
                    'booking_form_submit',
                    'add_to_cart',
                    'view_cart',
                    'begin_checkout',
                    'add_payment_info',
                    'cart_abandoned',
                    'purchase',
                  ],
                },
              },
            },
          },
        ],
      }),
      cache: 'no-store',
      signal: AbortSignal.timeout(8000),
    }),
    fetch(rtUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({ metrics: [{ name: 'activeUsers' }] }),
      cache: 'no-store',
      signal: AbortSignal.timeout(4500),
    }).catch(() => null),
    fetch(gscUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({ startDate, endDate }),
      cache: 'no-store',
      signal: AbortSignal.timeout(7000),
    }).catch(() => null),
  ]);

  let activeUsersNow = 0;
  if (rtRes && rtRes.ok) {
    const rtJ = (await rtRes.json()) as Ga4Report;
    activeUsersNow = Number(rtJ.rows?.[0]?.metricValues?.[0]?.value ?? 0) || 0;
  }

  let gscClicks = 0;
  let gscImpressions = 0;
  if (gscRes && gscRes.ok) {
    const gscJ = (await gscRes.json()) as { rows?: Array<{ clicks?: number; impressions?: number }> };
    gscClicks = Number(gscJ.rows?.[0]?.clicks ?? 0) || 0;
    gscImpressions = Number(gscJ.rows?.[0]?.impressions ?? 0) || 0;
  }

  if (!batchRes.ok) {
    throw new Error(`GA4 Nightlife HTTP ${batchRes.status}`);
  }
  const batchJ = (await batchRes.json()) as { reports?: Ga4Report[] };
  const [repBase, repEv] = batchJ.reports ?? [];
  const baseVals = repBase?.rows?.[0]?.metricValues ?? [];
  const sessions = Number(baseVals[0]?.value ?? 0) || 0;
  const users = Number(baseVals[1]?.value ?? 0) || 0;
  const pageViews = Number(baseVals[2]?.value ?? 0) || 0;
  const ga4RevenueEur = Number(baseVals[3]?.value ?? 0) || 0;

  const evCounts: Record<string, number> = {};
  for (const row of repEv?.rows ?? []) {
    const k = row.dimensionValues?.[0]?.value ?? '';
    const v = Number(row.metricValues?.[0]?.value ?? 0) || 0;
    if (k) evCounts[k] = (evCounts[k] || 0) + v;
  }

  return {
    sessions,
    users,
    pageViews,
    ga4RevenueEur,
    gscClicks,
    gscImpressions,
    activeUsersNow,
    evCounts,
  };
}

async function fetchAxelSiteMetrics(
  site: (typeof AXEL_PROPERTIES)[number],
  token: string,
  startDate: string,
  endDate: string,
): Promise<{ row: UnifiedSiteRow; err?: string }> {
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
  const batchUrl = `https://analyticsdata.googleapis.com/v1beta/properties/${site.propertyId}:batchRunReports`;
  const rtUrl = `https://analyticsdata.googleapis.com/v1beta/properties/${site.propertyId}:runRealtimeReport`;

  const requests: unknown[] = [
    {
      dateRanges: [{ startDate, endDate }],
      metrics: [{ name: 'sessions' }, { name: 'totalUsers' }, { name: 'screenPageViews' }],
    },
    {
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: 'date' }, { name: 'eventName' }, { name: 'linkDomain' }],
      metrics: [{ name: 'eventCount' }],
      dimensionFilter: {
        filter: {
          fieldName: 'eventName',
          inListFilter: { values: ['xceed_clicked', 'whatsapp_clicked', 'click'] },
        },
      },
      limit: 5000,
    },
  ];

  if (site.hasGscLink) {
    requests.push({
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: 'landingPagePlusQueryString' }],
      metrics: [{ name: 'organicGoogleSearchClicks' }, { name: 'organicGoogleSearchImpressions' }],
      metricAggregations: ['TOTAL'],
      limit: 1,
    });
  }

  const [batchRes, rtRes] = await Promise.all([
    fetch(batchUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({ requests }),
      cache: 'no-store',
      signal: AbortSignal.timeout(6500),
    }).catch(() => null),
    fetch(rtUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({ metrics: [{ name: 'activeUsers' }] }),
      cache: 'no-store',
      signal: AbortSignal.timeout(4000),
    }).catch(() => null),
  ]);

  let activeUsersNow = 0;
  if (rtRes && rtRes.ok) {
    const rtJ = (await rtRes.json()) as Ga4Report;
    activeUsersNow = Number(rtJ.rows?.[0]?.metricValues?.[0]?.value ?? 0) || 0;
  }

  if (!batchRes || !batchRes.ok) {
    return {
      err: `${site.domain}: HTTP ${batchRes ? batchRes.status : 'timeout'}`,
      row: {
        slug: site.slug,
        domain: site.domain,
        label: site.label,
        group: 'axel',
        activeDns: site.activeDns,
        sessions: 0,
        users: 0,
        pageViews: 0,
        gscClicks: 0,
        gscImpressions: 0,
        whatsappClicks: 0,
        xceedClicks: 0,
        activeUsersNow,
      },
    };
  }

  const j = (await batchRes.json()) as { reports?: Ga4Report[] };
  const [repBase, repEv, repGsc] = j.reports ?? [];
  const bv = repBase?.rows?.[0]?.metricValues ?? [];
  const sessions = Number(bv[0]?.value ?? 0) || 0;
  const users = Number(bv[1]?.value ?? 0) || 0;
  const pageViews = Number(bv[2]?.value ?? 0) || 0;

  const gv = repGsc?.totals?.[0]?.metricValues ?? repGsc?.rows?.[0]?.metricValues ?? [];
  const gscClicks = Number(gv[0]?.value ?? 0) || 0;
  const gscImpressions = Number(gv[1]?.value ?? 0) || 0;

  const byDay = new Map<string, { cXc: number; oXc: number; cWa: number; oWa: number }>();
  for (const r of repEv?.rows ?? []) {
    const d = r.dimensionValues?.[0]?.value ?? '';
    const ev = r.dimensionValues?.[1]?.value ?? '';
    const ld = (r.dimensionValues?.[2]?.value ?? '').toLowerCase();
    const cnt = Number(r.metricValues?.[0]?.value ?? 0) || 0;
    if (!d || cnt <= 0) continue;
    const cur = byDay.get(d) ?? { cXc: 0, oXc: 0, cWa: 0, oWa: 0 };
    if (ev === 'xceed_clicked') cur.cXc += cnt;
    else if (ev === 'whatsapp_clicked') cur.cWa += cnt;
    else if (ev === 'click') {
      if (ld.includes('xceed.me')) cur.oXc += cnt;
      else if (ld.includes('wa.me') || ld.includes('whatsapp.com')) cur.oWa += cnt;
    }
    byDay.set(d, cur);
  }

  let xceedClicks = 0;
  let whatsappClicks = 0;
  for (const [d, c] of byDay.entries()) {
    xceedClicks += d < AXEL_CUTOVER_COMPACT ? c.oXc : Math.max(c.cXc, c.oXc);
    whatsappClicks += d < AXEL_CUTOVER_COMPACT ? c.oWa : Math.max(c.cWa, c.oWa);
  }

  return {
    row: {
      slug: site.slug,
      domain: site.domain,
      label: site.label,
      group: 'axel',
      activeDns: site.activeDns,
      sessions,
      users,
      pageViews,
      gscClicks,
      gscImpressions,
      whatsappClicks,
      xceedClicks,
      activeUsersNow,
    },
  };
}

async function computeUnifiedAnalyticsUncached(period: UnifiedPeriod): Promise<UnifiedAnalyticsData> {
  const { nlmStart, axelStart, endDate, blobDays } = resolveRanges(period);
  const warnings: string[] = [];

  const [ordersAll, cartDraftsAll, blobDaily] = await Promise.all([
    readIndexedOrderSummariesOnly().catch(() => []),
    readIndexedCartDraftsOnly().catch(() => []),
    readDailyStats(blobDays).catch(() => []),
  ]);

  const blobWa = blobDaily.reduce((s, d) => s + (d.counts['wa'] || 0), 0);
  const blobXc = blobDaily.reduce((s, d) => s + (d.counts['xc'] || 0), 0);
  const blobBf = blobDaily.reduce((s, d) => s + (d.counts['bf'] || 0), 0);

  const nowMs = Date.now();
  const inRange = (iso: string | null | undefined) => {
    if (!iso) return false;
    const day = romeDay(new Date(iso));
    return day >= nlmStart && day <= endDate;
  };

  const paidOrders = ordersAll.filter((o) => o.status === 'paid' && inRange(o.paidAt || o.createdAt));
  const abandonedOrders = ordersAll.filter((o) => {
    if (!inRange(o.createdAt)) return false;
    if (o.status === 'expired' || o.status === 'payment_failed') return true;
    if (o.status === 'awaiting_payment') {
      const ageMs = nowMs - new Date(o.createdAt).getTime();
      return ageMs >= 20 * 60 * 1000;
    }
    return false;
  });

  const activeCartDraftsInRange = cartDraftsAll.filter((c) => inRange(c.updatedAt || c.createdAt));
  const abandonedPreCheckoutCarts = activeCartDraftsInRange.filter((c) => {
    const ageMs = nowMs - (Date.parse(c.updatedAt || c.createdAt) || 0);
    return ageMs >= 15 * 60 * 1000 || c.stage === 'checkout_form';
  });
  const preCheckoutFormDrafts = activeCartDraftsInRange.filter((c) => c.stage === 'checkout_form');

  const paidOrdersRevenueEur = Number(
    (paidOrders.reduce((s, o) => s + (o.totalCents || 0), 0) / 100).toFixed(2),
  );
  const abandonedOrdersValueEur = Number(
    (abandonedOrders.reduce((s, o) => s + (o.totalCents || 0), 0) / 100).toFixed(2),
  );
  const abandonedDraftsValueEur = Number(
    (abandonedPreCheckoutCarts.reduce((s, c) => s + (c.totalCents || 0), 0) / 100).toFixed(2),
  );
  const totalAbandonedValueEur = Number((abandonedOrdersValueEur + abandonedDraftsValueEur).toFixed(2));

  const recentEntries: OrderFunnelEntry[] = [
    ...ordersAll
      .filter((o) => inRange(o.paidAt || o.createdAt))
      .map((o) => ({
        id: o.id,
        createdAt: o.createdAt,
        paidAt: o.paidAt,
        status: o.status,
        kind: 'order' as const,
        itemSummary: o.itemSummary,
        totalEur: Number(((o.totalCents || 0) / 100).toFixed(2)),
        headcount: o.totalHeadcount || 1,
      })),
    ...abandonedPreCheckoutCarts.map((c) => ({
      id: `CARRELLO-${c.cartSessionId.slice(0, 6).toUpperCase()}`,
      createdAt: c.updatedAt || c.createdAt,
      paidAt: null,
      status: c.stage === 'checkout_form' ? 'abandoned_checkout' : 'abandoned_cart',
      kind: 'cart_draft' as const,
      itemSummary: c.itemSummary,
      totalEur: Number(((c.totalCents || 0) / 100).toFixed(2)),
      headcount: c.totalHeadcount || 1,
    })),
  ]
    .sort((a, b) => (b.paidAt || b.createdAt).localeCompare(a.paidAt || a.createdAt))
    .slice(0, 15);

  let token = '';
  try {
    token = await getAccessToken();
  } catch (e) {
    warnings.push(e instanceof Error ? e.message : 'Errore autenticazione Google API');
  }

  let nlmGa4 = {
    sessions: 0,
    users: 0,
    pageViews: 0,
    ga4RevenueEur: 0,
    gscClicks: 0,
    gscImpressions: 0,
    activeUsersNow: 0,
    evCounts: {} as Record<string, number>,
  };

  let axelRows: UnifiedSiteRow[] = [];

  if (token) {
    const [nlmRes, axelResults] = await Promise.all([
      fetchNlmMetrics(token, nlmStart, endDate).catch((e) => {
        warnings.push(e instanceof Error ? e.message : 'Errore lettura Nightlife GA4');
        return nlmGa4;
      }),
      mapWithConcurrency(AXEL_PROPERTIES, 6, (site) =>
        fetchAxelSiteMetrics(site, token, axelStart, endDate),
      ),
    ]);
    nlmGa4 = nlmRes;
    for (const r of axelResults) {
      if (r.err) warnings.push(r.err);
      axelRows.push(r.row);
    }
  } else {
    axelRows = AXEL_PROPERTIES.map((s) => ({
      slug: s.slug,
      domain: s.domain,
      label: s.label,
      group: 'axel',
      activeDns: s.activeDns,
      sessions: 0,
      users: 0,
      pageViews: 0,
      gscClicks: 0,
      gscImpressions: 0,
      whatsappClicks: 0,
      xceedClicks: 0,
      activeUsersNow: 0,
    }));
  }

  const ev = nlmGa4.evCounts;
  const nlmWa = Math.max(ev['whatsapp_click'] || 0, blobWa);
  const nlmXc = Math.max(ev['xceed_click'] || 0, blobXc);
  const nlmBf = Math.max(ev['booking_form_submit'] || 0, blobBf);
  const nlmPurchases = Math.max(ev['purchase'] || 0, paidOrders.length);
  const nlmRevenueEur = Math.max(Number(nlmGa4.ga4RevenueEur.toFixed(2)), paidOrdersRevenueEur);

  const serverInitiatedCheckouts =
    paidOrders.length + abandonedOrders.length + preCheckoutFormDrafts.length;
  const nlmBeginCheckout = Math.max(ev['begin_checkout'] || 0, serverInitiatedCheckouts);

  const serverCartCount =
    paidOrders.length + abandonedOrders.length + activeCartDraftsInRange.length;
  const nlmAddToCart = Math.max(ev['add_to_cart'] || 0, nlmBeginCheckout, serverCartCount);
  const nlmViewCart = ev['view_cart'] || 0;
  const nlmAddPaymentInfo = Math.max(
    ev['add_payment_info'] || 0,
    paidOrders.length + abandonedOrders.length,
  );
  const serverAbandonedTotal = abandonedOrders.length + abandonedPreCheckoutCarts.length;
  const funnelUnpurchasedCarts = Math.max(0, nlmAddToCart - nlmPurchases);
  const nlmAbandonedCarts = Math.max(
    ev['cart_abandoned'] || 0,
    serverAbandonedTotal,
    abandonedOrders.length > 0 || abandonedPreCheckoutCarts.length > 0 ? serverAbandonedTotal : funnelUnpurchasedCarts,
  );

  const nlmRow: UnifiedSiteRow = {
    slug: 'nightlifemilan',
    domain: 'nightlifemilan.com',
    label: 'Nightlife Milan (Portale Principale)',
    group: 'nightlife',
    activeDns: true,
    sessions: nlmGa4.sessions,
    users: nlmGa4.users,
    pageViews: nlmGa4.pageViews,
    gscClicks: nlmGa4.gscClicks,
    gscImpressions: nlmGa4.gscImpressions,
    whatsappClicks: nlmWa,
    xceedClicks: nlmXc,
    addToCart: nlmAddToCart,
    beginCheckout: nlmBeginCheckout,
    abandonedCarts: nlmAbandonedCarts,
    purchases: nlmPurchases,
    revenueEur: nlmRevenueEur,
    activeUsersNow: nlmGa4.activeUsersNow,
  };

  axelRows.sort((a, b) => {
    const act = b.whatsappClicks + b.xceedClicks - (a.whatsappClicks + a.xceedClicks);
    if (act !== 0) return act;
    if (b.gscClicks !== a.gscClicks) return b.gscClicks - a.gscClicks;
    return b.sessions - a.sessions;
  });

  const axelTotals = axelRows.reduce(
    (acc, r) => ({
      sessions: acc.sessions + r.sessions,
      users: acc.users + r.users,
      pageViews: acc.pageViews + r.pageViews,
      gscClicks: acc.gscClicks + r.gscClicks,
      gscImpressions: acc.gscImpressions + r.gscImpressions,
      whatsappClicks: acc.whatsappClicks + r.whatsappClicks,
      xceedClicks: acc.xceedClicks + r.xceedClicks,
      activeUsersNow: acc.activeUsersNow + r.activeUsersNow,
    }),
    {
      sessions: 0,
      users: 0,
      pageViews: 0,
      gscClicks: 0,
      gscImpressions: 0,
      whatsappClicks: 0,
      xceedClicks: 0,
      activeUsersNow: 0,
    },
  );

  return {
    period,
    nlmStartDate: nlmStart,
    axelStartDate: axelStart,
    endDate,
    generatedAtIso: new Date().toISOString(),
    globalTotals: {
      sessions: nlmRow.sessions + axelTotals.sessions,
      users: nlmRow.users + axelTotals.users,
      pageViews: nlmRow.pageViews + axelTotals.pageViews,
      gscClicks: nlmRow.gscClicks + axelTotals.gscClicks,
      gscImpressions: nlmRow.gscImpressions + axelTotals.gscImpressions,
      whatsappClicks: nlmRow.whatsappClicks + axelTotals.whatsappClicks,
      xceedClicks: nlmRow.xceedClicks + axelTotals.xceedClicks,
      purchases: nlmPurchases,
      revenueEur: nlmRevenueEur,
      activeUsersNow: nlmRow.activeUsersNow + axelTotals.activeUsersNow,
    },
    nlmFunnel: {
      sessions: nlmRow.sessions,
      users: nlmRow.users,
      pageViews: nlmRow.pageViews,
      gscClicks: nlmRow.gscClicks,
      gscImpressions: nlmRow.gscImpressions,
      whatsappClicks: nlmRow.whatsappClicks,
      xceedClicks: nlmRow.xceedClicks,
      bookingForms: nlmBf,
      addToCart: nlmAddToCart,
      viewCart: nlmViewCart,
      beginCheckout: nlmBeginCheckout,
      addPaymentInfo: nlmAddPaymentInfo,
      abandonedCarts: nlmAbandonedCarts,
      abandonedPreCheckoutCount: abandonedPreCheckoutCarts.length,
      abandonedOrdersCount: abandonedOrders.length,
      abandonedValueEur: totalAbandonedValueEur,
      purchases: nlmPurchases,
      revenueEur: nlmRevenueEur,
      activeUsersNow: nlmRow.activeUsersNow,
      recentOrders: recentEntries,
    },
    axelTotals,
    sites: [nlmRow, ...axelRows],
    warnings,
  };
}

export const getUnifiedAnalyticsData = unstable_cache(
  async (period: UnifiedPeriod) => computeUnifiedAnalyticsUncached(period),
  ['nlm-unified-analytics-v3'],
  { revalidate: 900, tags: ['nlm-unified-analytics'] },
);
