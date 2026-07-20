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

test('multilingual World Cup publisher plan is protected and covers 33 x 5 listings', async () => {
  const previousSecret = process.env.WORLD_CUP_ROLLOUT_SECRET;
  process.env.WORLD_CUP_ROLLOUT_SECRET = 'world-cup-locale-test-secret';
  try {
    const unauthorized = await getWorldCupLocalePlan(new Request('http://localhost/api/events/publish-world-cup-locales'));
    assert.equal(unauthorized.status, 401);

    const authorized = await getWorldCupLocalePlan(new Request('http://localhost/api/events/publish-world-cup-locales', {
      headers: { authorization: 'Bearer world-cup-locale-test-secret' },
    }));
    assert.equal(authorized.status, 200);
    const body = await authorized.json();
    assert.equal(body.ok, true);
    assert.equal(body.localeCount, 33);
    assert.equal(body.listingCount, 165);
    assert.equal(body.plans.length, 33);
    assert.ok(body.plans.every((plan: { count: number; markers: string[] }) => plan.count === 5 && plan.markers.length === 5));
    assert.equal(new Set(body.plans.flatMap((plan: { markers: string[] }) => plan.markers)).size, 165);
  } finally {
    if (previousSecret === undefined) delete process.env.WORLD_CUP_ROLLOUT_SECRET;
    else process.env.WORLD_CUP_ROLLOUT_SECRET = previousSecret;
  }
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

test('multilingual World Cup publisher keeps CDN, lock, retry and live-readback hard gates', async () => {
  const source = await readFile(
    path.join(process.cwd(), 'app', 'api', 'events', 'publish-world-cup-locales', 'route.ts'),
    'utf8',
  );
  assert.match(source, /uploadMedia/);
  assert.match(source, /programmeMedia/);
  assert.match(source, /targetMedia/);
  assert.match(source, /dressMedia/);
  assert.match(source, /afterpartyMedia/);
  assert.match(source, /validateWorldCupEventbriteLocalePayload\(payload, true\)/);
  assert.match(source, /exactWorldCupMarkerMatches\(payload\.marker, existing\)/);
  assert.doesNotMatch(source, /event\.name\?\.text === payload\.title && event\.start\?\.utc === START_UTC/);
  assert.match(source, /deleteStaleDraft/);
  assert.match(source, /response\.headers\.get\('retry-after'\)/);
  assert.match(source, /acquireRolloutLease/);
  assert.match(source, /BlobPreconditionFailedError/);
  assert.match(source, /fromVariant/);
  assert.match(source, /REQUEST_DEADLINE_MS/);
  assert.match(source, /validateSavedDescription: \(savedHtml\) => descriptionGate\(payload, savedHtml\)/);
  assert.match(source, /wrong body image sequence persisted/);
  assert.match(source, /localized body image labels were not persisted/);
  assert.match(source, /refreshLiveEvent/);
  assert.match(source, /ensureLiveSettings/);
  assert.match(source, /inspectLiveEvent/);
  assert.match(source, /confirmationMessageNative/);
  assert.match(source, /instructionsNative/);
  assert.match(source, /ticketExact/);
  assert.match(source, /doorTimeExact/);
  assert.match(source, /if \(index < payloads\.length - 1\) await sleep\(3_000\)/);
});

test('rate-limit probe is protected, single-shot and exposes no Eventbrite body', async () => {
  const route = await readFile(
    path.join(process.cwd(), 'app', 'api', 'events', 'publish-world-cup-locales', 'route.ts'),
    'utf8',
  );
  const wrapper = await readFile(path.join(process.cwd(), 'scripts', 'run-world-cup-rollout.ps1'), 'utf8');
  assert.match(route, /if \(!isAuthorized\(request\)\)/);
  assert.match(route, /searchParams\.get\('rateProbe'\) === '1'/);
  assert.match(route, /'rate-limit probe',[\s\S]*?1,/);
  assert.match(route, /eventbriteStatus: response\.status/);
  assert.match(wrapper, /Wait-ForEventbriteRateLimit/);
  assert.match(wrapper, /Start-Sleep -Seconds 55/);
});
