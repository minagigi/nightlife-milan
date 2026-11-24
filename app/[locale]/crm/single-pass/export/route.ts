import { cookies } from 'next/headers';
import { verifyActiveNodeCrmSession } from '@/lib/crmAuthVault';
import { CRM_SESSION_COOKIE } from '@/lib/crmSession';
import { formatMinorCurrency } from '@/lib/single-pass/currency';
import { listAllOrders } from '@/lib/single-pass/store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function csvCell(val: string | number | null | undefined): string {
  const raw = String(val ?? '');
  const sanitized = /^[=+\-@\t\r]/.test(raw) ? `'${raw}` : raw;
  return `"${sanitized.replace(/"/g, '""')}"`;
}

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const session = await verifyActiveNodeCrmSession(cookieStore.get(CRM_SESSION_COOKIE)?.value);
  if (!session) {
    return new Response('CRM authentication required', {
      status: 401,
      headers: { 'Cache-Control': 'private, no-store' },
    });
  }
  const url = new URL(request.url);
  const venueFilter = (url.searchParams.get('venue') || 'all').trim();
  const statusFilter = (url.searchParams.get('status') || 'all').trim();

  const orders = await listAllOrders(500);
  const filtered = orders.filter((o) => {
    if (venueFilter !== 'all' && !o.items.some((i) => i.venueId === venueFilter)) {
      return false;
    }
    if (statusFilter !== 'all' && o.status !== statusFilter) {
      return false;
    }
    return true;
  });

  const headers = [
    'Order ID',
    'Status',
    'Full Name',
    'Age',
    'Country',
    'Phone / WhatsApp',
    'Email',
    'Spoken Languages',
    'Headcount',
    'Venues',
    'Packages',
    'Base EUR',
    'Booking Fee Rate',
    'Booking Fee EUR',
    'Total EUR',
    'Dietary / Allergies',
    'Presentment Currency',
    'Presentment Total',
    'FX Rate',
    'First Landing Page',
    'Added From Pages',
    'Journey Trail',
    'Initial Referrer',
    'UTM Source',
    'UTM Campaign',
    'WhatsApp Group Status',
    'Created At',
    'Paid At',
  ];

  const rows = [
    headers.map(csvCell).join(','),
    ...filtered.map((o) => {
      const venues = Array.from(new Set(o.items.map((i) => i.venueName))).join('; ');
      const pkgs = o.items
        .map(
          (i) =>
            `${i.quantity}x ${i.venueName} - ${i.title}${i.dietaryChoice ? ` [${i.dietaryChoice}]` : ''}`,
        )
        .join(' | ');
      const headcount =
        typeof o.totalHeadcount === 'number' && o.totalHeadcount > 0
          ? o.totalHeadcount
          : o.items.reduce(
              (s, i) => s + (typeof i.totalGuests === 'number' ? i.totalGuests : i.quantity),
              0,
            );
      const cur = (o.presentmentCurrency || 'EUR').toUpperCase();
      const presStr = formatMinorCurrency(o.presentmentTotalMinor ?? o.totalCents, cur, 'en');

      return [
        o.id,
        o.status,
        o.customer.fullName,
        o.customer.age,
        o.customer.country || o.attribution?.ipCountry || '',
        o.customer.whatsapp,
        o.customer.email,
        o.customer.spokenLanguages.join('; '),
        headcount,
        venues,
        pkgs,
        (o.subtotalBaseCents / 100).toFixed(2),
        `${Math.round((o.feeRate ?? 0.20) * 100)}%`,
        (o.feeCents / 100).toFixed(2),
        (o.totalCents / 100).toFixed(2),
        o.customer.dietaryNotes || '',
        cur,
        presStr,
        o.fxRate ?? 1,
        o.attribution?.firstLandingPath || '',
        (o.attribution?.addedFromPaths || []).join('; '),
        (o.attribution?.journeyPaths || []).join(' -> '),
        o.attribution?.initialReferrer || '',
        o.attribution?.utmSource || '',
        o.attribution?.utmCampaign || '',
        o.whatsappGroupStatus,
        o.createdAt,
        o.paidAt || '',
      ]
        .map(csvCell)
        .join(',');
    }),
  ];

  const filename = `nightlife-milan-ecommerce-${new Date().toISOString().slice(0, 10)}.csv`;
  return new Response(rows.join('\n'), {
    headers: {
      'Cache-Control': 'private, no-store',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Type': 'text/csv; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
