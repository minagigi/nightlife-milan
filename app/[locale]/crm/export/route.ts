import { crmContactsCsv } from '@/lib/crmExport';
import { filterCrmContacts, type CrmContactFilters } from '@/lib/crmModel';
import { readCrmDatabase } from '@/lib/crmStore';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function value(url: URL, name: string, fallback = 'all'): string {
  return url.searchParams.get(name)?.trim() || fallback;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const segment = value(url, 'segment') as CrmContactFilters['segment'];
  const database = await readCrmDatabase();
  const contacts = filterCrmContacts(database, {
    query: value(url, 'q', ''),
    emailMarketing: 'opted_in',
    venue: value(url, 'venue'),
    locale: value(url, 'language'),
    segment: ['all', 'repeat', 'single', 'checked_in'].includes(segment || '') ? segment : 'all',
  });
  const filename = `nightlife-milan-crm-${new Date().toISOString().slice(0, 10)}.csv`;

  return new Response(crmContactsCsv(contacts), {
    headers: {
      'Cache-Control': 'private, no-store',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Type': 'text/csv; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
