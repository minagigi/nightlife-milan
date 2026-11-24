import { cookies } from 'next/headers';
import { verifyActiveNodeCrmSession } from '@/lib/crmAuthVault';
import { CRM_SESSION_COOKIE } from '@/lib/crmSession';
import { resolveOrderChannels } from '@/lib/single-pass/catalog';
import { formatMinorCurrency } from '@/lib/single-pass/currency';
import { listAllCartDrafts, listAllOrders } from '@/lib/single-pass/store';
import type { AbandonedCartRecord, SinglePassOrder } from '@/lib/single-pass/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function csvCell(val: string | number | null | undefined): string {
  const raw = String(val ?? '');
  const sanitized = /^[=+\-@\t\r]/.test(raw) ? `'${raw}` : raw;
  return `"${sanitized.replace(/"/g, '""')}"`;
}

type EcommerceBucket = 'paid' | 'failed' | 'abandoned_checkout' | 'abandoned_cart';

function classifyOrderBucket(order: SinglePassOrder): EcommerceBucket {
  if (order.status === 'paid') return 'paid';
  if (order.status === 'payment_failed') return 'failed';
  return 'abandoned_checkout';
}

function matchesBucketFilter(
  bucket: EcommerceBucket,
  vista: string,
  sub: string,
): boolean {
  if (vista === 'paid') return bucket === 'paid';
  if (vista === 'failed') return bucket === 'failed';
  if (vista === 'abandoned') {
    if (sub === 'abandoned_checkout') return bucket === 'abandoned_checkout';
    if (sub === 'abandoned_cart') return bucket === 'abandoned_cart';
    return bucket === 'abandoned_checkout' || bucket === 'abandoned_cart';
  }
  if (sub === 'paid') return bucket === 'paid';
  if (sub === 'failed') return bucket === 'failed';
  if (sub === 'abandoned_all') return bucket === 'abandoned_checkout' || bucket === 'abandoned_cart';
  if (sub === 'abandoned_checkout') return bucket === 'abandoned_checkout';
  if (sub === 'abandoned_cart') return bucket === 'abandoned_cart';
  return true;
}

function extractCrmCookieFromRequest(request: Request): string | undefined {
  const header = request.headers.get('cookie') || '';
  const m = header.match(new RegExp(`(?:^|;\\s*)${CRM_SESSION_COOKIE}=([^;]+)`));
  return m ? decodeURIComponent(m[1]) : undefined;
}

export async function GET(request: Request) {
  let rawToken: string | undefined;
  try {
    const cookieStore = await cookies();
    rawToken = cookieStore.get(CRM_SESSION_COOKIE)?.value;
  } catch {
    rawToken = extractCrmCookieFromRequest(request);
  }
  if (!rawToken) {
    rawToken = extractCrmCookieFromRequest(request);
  }
  const session = await verifyActiveNodeCrmSession(rawToken);
  if (!session) {
    return new Response('CRM authentication required', {
      status: 401,
      headers: { 'Cache-Control': 'private, no-store' },
    });
  }

  const url = new URL(request.url);
  const vista = (url.searchParams.get('vista') || 'ecommerce').trim();
  const sub = (url.searchParams.get('sub') || 'all').trim();
  const channelFilter = (url.searchParams.get('channel') || 'all').trim();
  const venueFilter = (url.searchParams.get('venue') || 'all').trim();
  const q = (url.searchParams.get('q') || '').trim().toLowerCase();

  const [orders, carts] = await Promise.all([listAllOrders(500), listAllCartDrafts(500)]);

  const headers = [
    'Record Type',
    'ID',
    'Status',
    'Stage',
    'Channels',
    'Full Name',
    'Age',
    'Country',
    'Phone / WhatsApp',
    'Email',
    'Headcount',
    'Venues',
    'Packages',
    'Base EUR',
    'Fee EUR',
    'Total EUR',
    'Presentment Currency',
    'Presentment Total',
    'Payment Attempts',
    'Last Error Code',
    'Last Decline Code',
    'Last Error / Validation Blocker',
    'Email Confirmation',
    'WhatsApp Group Status',
    'First Landing',
    'Added From',
    'UTM / Referrer',
    'Created At',
    'Updated / Paid / Failed At',
  ];

  const csvRows: string[] = [headers.map(csvCell).join(',')];

  for (const o of orders) {
    const bucket = classifyOrderBucket(o);
    if (!matchesBucketFilter(bucket, vista, sub)) continue;
    const channels = resolveOrderChannels(o.items);
    if (channelFilter !== 'all' && !channels.includes(channelFilter as 'single-pass' | 'venue')) {
      continue;
    }
    if (venueFilter !== 'all' && !o.items.some((i) => i.venueId === venueFilter)) {
      continue;
    }
    const venues = Array.from(new Set(o.items.map((i) => i.venueName))).join('; ');
    const pkgs = o.items
      .map(
        (i) =>
          `${i.quantity}x ${i.venueName} - ${i.title}${i.dietaryChoice ? ` [${i.dietaryChoice}]` : ''}`,
      )
      .join(' | ');
    if (q) {
      const hay = [
        o.id,
        o.customer.fullName,
        o.customer.email,
        o.customer.whatsapp,
        venues,
        pkgs,
        o.lastPaymentError?.code || '',
        o.lastPaymentError?.declineCode || '',
        o.lastPaymentError?.message || '',
      ]
        .join(' ')
        .toLowerCase();
      if (!hay.includes(q)) continue;
    }

    const headcount =
      typeof o.totalHeadcount === 'number' && o.totalHeadcount > 0
        ? o.totalHeadcount
        : o.items.reduce(
            (s, i) => s + (typeof i.totalGuests === 'number' ? i.totalGuests : i.quantity),
            0,
          );
    const cur = (o.presentmentCurrency || 'EUR').toUpperCase();
    const presStr = formatMinorCurrency(o.presentmentTotalMinor ?? o.totalCents, cur, 'en');
    const emailState = o.confirmationEmailSentAt
      ? `Sent (${o.confirmationEmailSentAt})`
      : o.emailDeliveryError
        ? `Error: ${o.emailDeliveryError}`
        : o.status === 'paid'
          ? 'Pending'
          : '-';
    const refLabel = o.attribution?.utmSource
      ? `UTM: ${o.attribution.utmSource}${o.attribution.utmCampaign ? ` / ${o.attribution.utmCampaign}` : ''}`
      : o.attribution?.initialReferrer || 'direct';

    csvRows.push(
      [
        bucket === 'paid'
          ? 'PAID_ORDER'
          : bucket === 'failed'
            ? 'FAILED_PAYMENT'
            : 'ABANDONED_CHECKOUT',
        o.id,
        o.status,
        'order_submitted',
        channels.join('+'),
        o.customer.fullName,
        o.customer.age,
        o.customer.country || o.attribution?.ipCountry || '',
        o.customer.whatsapp,
        o.customer.email,
        headcount,
        venues,
        pkgs,
        (o.subtotalBaseCents / 100).toFixed(2),
        (o.feeCents / 100).toFixed(2),
        (o.totalCents / 100).toFixed(2),
        cur,
        presStr,
        o.paymentAttempts || 0,
        o.lastPaymentError?.code || '',
        o.lastPaymentError?.declineCode || '',
        o.lastPaymentError?.message || '',
        emailState,
        o.whatsappGroupStatus,
        o.attribution?.firstLandingPath || '',
        (o.attribution?.addedFromPaths || []).join('; '),
        refLabel,
        o.createdAt,
        o.paidAt || o.failedAt || o.updatedAt,
      ]
        .map(csvCell)
        .join(','),
    );
  }

  for (const c of carts as AbandonedCartRecord[]) {
    const bucket: EcommerceBucket = 'abandoned_cart';
    if (!matchesBucketFilter(bucket, vista, sub)) continue;
    const channels = c.channels?.length ? c.channels : resolveOrderChannels(c.items);
    if (channelFilter !== 'all' && !channels.includes(channelFilter as 'single-pass' | 'venue')) {
      continue;
    }
    if (venueFilter !== 'all' && !c.items.some((i) => i.venueId === venueFilter)) {
      continue;
    }
    const venues = Array.from(new Set(c.items.map((i) => i.venueName))).join('; ');
    const pkgs = c.items
      .map(
        (i) =>
          `${i.quantity}x ${i.venueName} - ${i.title}${i.dietaryChoice ? ` [${i.dietaryChoice}]` : ''}`,
      )
      .join(' | ');
    if (q) {
      const hay = [
        c.cartSessionId,
        c.customer?.fullName || '',
        c.customer?.email || '',
        c.customer?.whatsapp || '',
        venues,
        pkgs,
        c.lastValidationError || '',
      ]
        .join(' ')
        .toLowerCase();
      if (!hay.includes(q)) continue;
    }
    const cur = (c.presentmentCurrency || 'EUR').toUpperCase();
    const presStr = formatMinorCurrency(c.presentmentTotalMinor ?? c.totalCents, cur, 'en');
    const refLabel = c.attribution?.utmSource
      ? `UTM: ${c.attribution.utmSource}${c.attribution.utmCampaign ? ` / ${c.attribution.utmCampaign}` : ''}`
      : c.attribution?.initialReferrer || 'direct';

    csvRows.push(
      [
        'ABANDONED_PRE_CHECKOUT_CART',
        `CART-${c.cartSessionId.slice(0, 10).toUpperCase()}`,
        'abandoned_cart',
        c.stage,
        channels.join('+'),
        c.customer?.fullName || 'Visitatore pre-checkout',
        c.customer?.age || '',
        c.customer?.country || c.attribution?.ipCountry || '',
        c.customer?.whatsapp || '',
        c.customer?.email || '',
        c.totalHeadcount,
        venues,
        pkgs,
        (c.subtotalBaseCents / 100).toFixed(2),
        (c.feeCents / 100).toFixed(2),
        (c.totalCents / 100).toFixed(2),
        cur,
        presStr,
        0,
        '',
        '',
        c.lastValidationError || '',
        '-',
        '-',
        c.attribution?.firstLandingPath || '',
        (c.attribution?.addedFromPaths || []).join('; '),
        refLabel,
        c.createdAt,
        c.updatedAt,
      ]
        .map(csvCell)
        .join(','),
    );
  }

  const filename = `nightlife-milan-crm-ecommerce-${new Date().toISOString().slice(0, 10)}.csv`;
  return new Response(csvRows.join('\n'), {
    headers: {
      'Cache-Control': 'private, no-store',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Type': 'text/csv; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
