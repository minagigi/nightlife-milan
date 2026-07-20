#!/usr/bin/env npx tsx
import { WEEKLY_JULY20_BATCH_EVENTS, buildWeeklyJuly20EventbritePayloads } from '../lib/weeklyJuly20Eventbrite';
import { writeFile } from 'node:fs/promises';

const token = process.env.EVENTBRITE_TOKEN;
if (!token) throw new Error('EVENTBRITE_TOKEN is not configured');

const API = 'https://www.eventbriteapi.com/v3';
const ORG_ID = '2988002072164';

const expected = new Map<string, { eventKey: string; locale: 'it' | 'en'; variant: number }>();
for (const event of WEEKLY_JULY20_BATCH_EVENTS) {
  for (const locale of ['it', 'en'] as const) {
    for (const payload of buildWeeklyJuly20EventbritePayloads(event.eventKey, locale, [
      'https://img.evbuc.com/a',
      'https://img.evbuc.com/b',
      'https://img.evbuc.com/c',
      'https://img.evbuc.com/d',
      'https://img.evbuc.com/e',
    ])) {
      expected.set(payload.marker, { eventKey: event.eventKey, locale, variant: payload.variant });
    }
  }
}

async function main(): Promise<void> {
  const live = new Map<string, { id: string; url: string; title: string; status: string }>();
  let continuation = '';
  for (let pageNo = 0; pageNo < 30; pageNo += 1) {
    const url = `${API}/organizations/${ORG_ID}/events/?status=live&order_by=start_asc&expand=venue${continuation ? `&continuation=${encodeURIComponent(continuation)}` : ''}`;
    const response = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    if (!response.ok) throw new Error(`Eventbrite list failed: ${response.status} ${(await response.text()).slice(0, 300)}`);
    const page = await response.json() as any;
    for (const event of page.events || []) {
      const html = String(event.description?.html || '');
      const marker = html.match(/nlm:curated=weekly-2026-07-20-[^<\s]+/i)?.[0];
      if (marker && expected.has(marker)) {
        live.set(marker, {
          id: String(event.id),
          url: String(event.url),
          title: String(event.name?.text || event.name?.html || ''),
          status: String(event.status),
        });
      }
    }
    if (!page.pagination?.has_more_items) break;
    continuation = page.pagination.continuation;
  }

  const missing = [...expected.keys()]
    .filter((marker) => !live.has(marker))
    .map((marker) => ({ marker, ...expected.get(marker)! }));

  const byEvent: Record<string, { it: number; en: number; total: number }> = {};
  for (const [marker] of live) {
    const meta = expected.get(marker)!;
    byEvent[meta.eventKey] ??= { it: 0, en: 0, total: 0 };
    byEvent[meta.eventKey][meta.locale] += 1;
    byEvent[meta.eventKey].total += 1;
  }

  const links = [...live.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([marker, item]) => ({ marker, ...expected.get(marker)!, ...item }));

  const result = {
    expected: expected.size,
    live: live.size,
    missingCount: missing.length,
    byEvent,
    missing,
    links,
  };
  await writeFile('artifacts/weekly-2026-07-20/eventbrite-live-audit-post-refresh.json', `${JSON.stringify({ checkedAt: new Date().toISOString(), ...result }, null, 2)}\n`, 'utf8');
  console.log(JSON.stringify({ expected: result.expected, live: result.live, missingCount: result.missingCount, byEvent: result.byEvent }, null, 2));
}

main().catch((error) => {
  console.error(error instanceof Error ? error.stack || error.message : String(error));
  process.exitCode = 1;
});
