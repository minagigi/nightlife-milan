import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { GET as getWorldCupLocalePlan } from '../app/api/events/publish-world-cup-locales/route';
import { buildWorldCupEventbriteLocalePayloads } from '../lib/worldCupEventbriteLocales';
import {
  exactWorldCupMarkerMatches,
  type WorldCupExistingEvent,
} from '../lib/worldCupEventbriteRollout';

test('multilingual World Cup publisher route returns HTTP 410 after Eventbrite disconnection', async () => {
  const response = await getWorldCupLocalePlan();
  assert.equal(response.status, 410);
  const body = await response.json();
  assert.equal(body.ok, false);
  assert.equal(body.disconnected, true);
  assert.equal(body.code, 'EVENTBRITE_DISCONNECTED');
});

test('dedupe uses only the exact curated marker even when translated titles collide', () => {
  const hr = buildWorldCupEventbriteLocalePayloads('hr')[0];
  const bs = buildWorldCupEventbriteLocalePayloads('bs')[0];
  assert.equal(hr.title, bs.title, 'regression fixture must preserve the real Croatian/Bosnian title collision');

  const events: WorldCupExistingEvent[] = [
    {
      id: 'hr-live',
      status: 'live',
      name: { text: hr.title },
      start: { utc: '2026-07-19T17:30:00Z' },
      description: { html: `<p>HR</p><!-- ${hr.marker} -->` },
    },
    {
      id: 'bs-draft',
      status: 'draft',
      name: { text: bs.title },
      start: { utc: '2026-07-19T17:30:00Z' },
      description: { html: `<p>BS</p><!-- ${bs.marker} -->` },
    },
  ];

  assert.deepEqual(exactWorldCupMarkerMatches(hr.marker, events).map((event) => event.id), ['hr-live']);
  assert.deepEqual(exactWorldCupMarkerMatches(bs.marker, events).map((event) => event.id), ['bs-draft']);
});

test('all title collisions across the 165 payloads remain isolated by unique markers', () => {
  const locales = ['es', 'fr', 'de', 'pt', 'nl', 'ru', 'tr', 'zh', 'ar', 'bg', 'hr', 'cs', 'da', 'et', 'fi', 'el', 'hu', 'ga', 'lv', 'lt', 'mt', 'pl', 'ro', 'sk', 'sl', 'sv', 'no', 'is', 'uk', 'sq', 'sr', 'bs', 'mk'] as const;
  const payloads = locales.flatMap((locale) => buildWorldCupEventbriteLocalePayloads(locale));
  const titleCounts = new Map<string, number>();
  payloads.forEach((payload) => titleCounts.set(payload.title, (titleCounts.get(payload.title) || 0) + 1));
  assert.equal([...titleCounts.values()].filter((count) => count > 1).length, 5);
  assert.equal(new Set(payloads.map((payload) => payload.marker)).size, 165);
});

test('Chinese variants use publish-safe bilingual titles while retaining Chinese body copy', () => {
  const payloads = buildWorldCupEventbriteLocalePayloads('zh');
  assert.equal(payloads[0].title, 'Spain vs Argentina World Cup Final Milan | 米兰西班牙对阿根廷世界杯决赛');
  assert.equal(payloads.length, 5);
  payloads.forEach((payload, index) => {
    assert.match(payload.title, /[A-Za-z].*[\u3400-\u9fff]/u);
    assert.match(payload.descriptionHtml, /米兰/);
    assert.equal(payload.marker, `nlm:curated=wc26-final-v${index + 1}-zh-2026-07-19`);
  });
});

test('multilingual World Cup publisher route is disconnected fail-closed (HTTP 410)', async () => {
  const source = await readFile(
    path.join(process.cwd(), 'app', 'api', 'events', 'publish-world-cup-locales', 'route.ts'),
    'utf8',
  );
  const wrapper = await readFile(path.join(process.cwd(), 'scripts', 'run-world-cup-rollout.ps1'), 'utf8');
  assert.match(source, /eventbriteGoneResponse\('\/api\/events\/publish-world-cup-locales'\)/);
  assert.match(source, /export const GET = gone;/);
  assert.match(source, /export const POST = gone;/);
  assert.match(source, /export const DELETE = gone;/);
  assert.match(wrapper, /Wait-ForEventbriteRateLimit/);
  assert.match(wrapper, /Start-Sleep -Seconds 55/);
});
