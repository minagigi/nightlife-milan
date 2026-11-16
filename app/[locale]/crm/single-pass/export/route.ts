import { listAllOrderSummaries } from '@/lib/single-pass/store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function csvCell(val: string | number | null | undefined): string {
  const raw = String(val ?? '');
  const sanitized = /^[=+\-@\t\r]/.test(raw) ? `'${raw}` : raw;
  return `"${sanitized.replace(/"/g, '""')}"`;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const venueFilter = (url.searchParams.get('venue') || 'all').trim();
  const statusFilter = (url.searchParams.get('status') || 'all').trim();

  const summaries = await listAllOrderSummaries();
  const filtered = summaries.filter((s) => {
    if (venueFilter !== 'all' && !s.venueIds.includes(venueFilter as (typeof s.venueIds)[number])) {
      return false;
    }
    if (statusFilter !== 'all' && s.status !== statusFilter) {
      return false;
    }
    return true;
  });

  const headers = [
    'Order ID',
    'Status',
    'Full Name',
    'Age',
    'WhatsApp',
    'Email',
    'Spoken Languages',
    'Venues',
    'Packages',
    'Base EUR',
    'Fee +15% EUR',
    'Total EUR',
    'WhatsApp Group Status',
    'Created At',
    'Paid At',
  ];

  const rows = [
    headers.map(csvCell).join(','),
    ...filtered.map((s) =>
      [
        s.id,
        s.status,
        s.fullName,
        s.age,
        s.whatsapp,
        s.email,
        s.spokenLanguages.join('; '),
        s.venueIds.join('; '),
        s.itemSummary,
        (s.subtotalBaseCents / 100).toFixed(2),
        (s.feeCents / 100).toFixed(2),
        (s.totalCents / 100).toFixed(2),
        s.whatsappGroupStatus,
        s.createdAt,
        s.paidAt || '',
      ]
        .map(csvCell)
        .join(','),
    ),
  ];

  const filename = `nightlife-milan-single-pass-${new Date().toISOString().slice(0, 10)}.csv`;
  return new Response(rows.join('\n'), {
    headers: {
      'Cache-Control': 'private, no-store',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Type': 'text/csv; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
