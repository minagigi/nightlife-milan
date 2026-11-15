import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { NextRequest } from 'next/server';

import * as adminEnrichEvent from '../app/api/admin/enrich-event/route';
import * as adminUpdateEventCopy from '../app/api/admin/update-event-copy/route';
import * as adminUploadEventbriteMedia from '../app/api/admin/upload-eventbrite-media/route';
import * as analyticsEventbrite from '../app/api/analytics/eventbrite/route';
import * as crmEmailDispatch from '../app/api/crm/email-dispatch/route';
import * as crmEmailPreview from '../app/api/crm/email-preview/route';
import * as crmEmailWebhook from '../app/api/crm/email-webhook/route';
import * as crmEventbriteWebhookSource from '../app/api/crm/eventbrite-webhook/[source]/route';
import * as crmSync from '../app/api/crm/sync/route';
import * as eventsCancel from '../app/api/events/cancel/route';
import * as eventsCleanupDuplicates from '../app/api/events/cleanup-duplicates/route';
import * as eventsFixImage from '../app/api/events/fix-image/route';
import * as eventsImport from '../app/api/events/import/route';
import * as eventsImportXceed from '../app/api/events/import-xceed/route';
import * as eventsListLive from '../app/api/events/list-live/route';
import * as eventsOrderConfirmations from '../app/api/events/order-confirmations/route';
import * as eventsPublishBadBunnyAria from '../app/api/events/publish-bad-bunny-aria/route';
import * as eventsPublishCurated from '../app/api/events/publish-curated/route';
import * as eventsPublishGueLocales from '../app/api/events/publish-gue-locales/route';
import * as eventsPublishLocales from '../app/api/events/publish-locales/route';
import * as eventsPublishPrepared from '../app/api/events/publish-prepared/route';
import * as eventsPublishWorldCupEn from '../app/api/events/publish-world-cup-en/route';
import * as eventsPublishWorldCupIt from '../app/api/events/publish-world-cup-it/route';
import * as eventsPublishWorldCupLocales from '../app/api/events/publish-world-cup-locales/route';
import * as eventsRefreshWorldCupAffiliate from '../app/api/events/refresh-world-cup-affiliate/route';
import * as eventsRefreshWorldCupVisuals from '../app/api/events/refresh-world-cup-visuals/route';
import * as eventsSpikeG0 from '../app/api/events/spike-g0/route';
import * as eventsSync from '../app/api/events/sync/route';
import { POST as trackPost } from '../app/api/track/route';

import {
  EVENTBRITE_DISCONNECTED_CODE,
  EVENTBRITE_DISCONNECTED_MESSAGE,
} from '../lib/eventbriteDisconnected';
import { getEventbriteToken } from '../lib/eventbriteToken';
import {
  debugEventbrite,
  fetchEventbriteEvents,
  getEventGoldHtml,
} from '../lib/eventbriteSync';
import {
  publishEvent,
  publishOneLang,
  publishXceedEvent,
  replaceEventImage,
  resolveEventbriteVenueId,
} from '../lib/eventPublisher';
import { scoutThirdPartyEvents } from '../lib/eventScout';
import {
  dispatchForOrderApiUrl,
  ensureAttendeeEmailWebhook,
  listEventbriteWebhooks,
  sweepRecentAttendees,
  validateOrderApiUrl,
} from '../lib/attendeeEmailDispatch';
import { syncEventbriteCrm } from '../lib/eventbriteCrm';
import { getEventDiscoveryItems } from '../lib/eventDiscovery';
import { getEventbriteDiscoveryItems } from '../lib/eventbriteDiscovery';
import { fetchLiveEbEventsForSitemap } from '../lib/sitemapBuilder';

const ROOT = path.resolve(process.cwd());

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
type GoneModule = Record<HttpMethod, () => Response | Promise<Response>>;

const DISCONNECTED_ROUTES: Array<{ route: string; mod: GoneModule }> = [
  { route: '/api/admin/enrich-event', mod: adminEnrichEvent },
  { route: '/api/admin/update-event-copy', mod: adminUpdateEventCopy },
  { route: '/api/admin/upload-eventbrite-media', mod: adminUploadEventbriteMedia },
  { route: '/api/analytics/eventbrite', mod: analyticsEventbrite },
  { route: '/api/crm/email-dispatch', mod: crmEmailDispatch },
  { route: '/api/crm/email-preview', mod: crmEmailPreview },
  { route: '/api/crm/email-webhook', mod: crmEmailWebhook },
  { route: '/api/crm/eventbrite-webhook/[source]', mod: crmEventbriteWebhookSource },
  { route: '/api/crm/sync', mod: crmSync },
  { route: '/api/events/cancel', mod: eventsCancel },
  { route: '/api/events/cleanup-duplicates', mod: eventsCleanupDuplicates },
  { route: '/api/events/fix-image', mod: eventsFixImage },
  { route: '/api/events/import', mod: eventsImport },
  { route: '/api/events/import-xceed', mod: eventsImportXceed },
  { route: '/api/events/list-live', mod: eventsListLive },
  { route: '/api/events/order-confirmations', mod: eventsOrderConfirmations },
  { route: '/api/events/publish-bad-bunny-aria', mod: eventsPublishBadBunnyAria },
  { route: '/api/events/publish-curated', mod: eventsPublishCurated },
  { route: '/api/events/publish-gue-locales', mod: eventsPublishGueLocales },
  { route: '/api/events/publish-locales', mod: eventsPublishLocales },
  { route: '/api/events/publish-prepared', mod: eventsPublishPrepared },
  { route: '/api/events/publish-world-cup-en', mod: eventsPublishWorldCupEn },
  { route: '/api/events/publish-world-cup-it', mod: eventsPublishWorldCupIt },
  { route: '/api/events/publish-world-cup-locales', mod: eventsPublishWorldCupLocales },
  { route: '/api/events/refresh-world-cup-affiliate', mod: eventsRefreshWorldCupAffiliate },
  { route: '/api/events/refresh-world-cup-visuals', mod: eventsRefreshWorldCupVisuals },
  { route: '/api/events/spike-g0', mod: eventsSpikeG0 },
  { route: '/api/events/sync', mod: eventsSync },
];

const METHODS: HttpMethod[] = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

test('all 28 disconnected Eventbrite API routes return 410 Gone across every HTTP verb', async () => {
  assert.equal(DISCONNECTED_ROUTES.length, 28);

  for (const { route, mod } of DISCONNECTED_ROUTES) {
    for (const method of METHODS) {
      const handler = mod[method];
      assert.equal(typeof handler, 'function', `${route} must export ${method}`);
      const res = await handler();
      assert.equal(res.status, 410, `${method} ${route} must return HTTP 410`);
      assert.equal(res.headers.get('cache-control'), 'no-store');
      assert.equal(res.headers.get('x-robots-tag'), 'noindex, nofollow, nosnippet');
      const body = await res.json();
      assert.deepEqual(body, {
        ok: false,
        disconnected: true,
        code: EVENTBRITE_DISCONNECTED_CODE,
        status: 'EVENTBRITE_PERMANENTLY_DISCONNECTED',
        route,
        error: EVENTBRITE_DISCONNECTED_MESSAGE,
      });
    }
  }
});

test('POST /api/track rejects eventbrite_click with 400 while preserving normal pageview tracking', async () => {
  const ebReq = new NextRequest('https://nightlifemilan.com/api/track', {
    method: 'POST',
    headers: { 'user-agent': 'Mozilla/5.0' },
    body: JSON.stringify({ name: 'eventbrite_click', path: '/' }),
  });
  const ebRes = await trackPost(ebReq);
  assert.equal(ebRes.status, 400);
  const ebBody = await ebRes.json();
  assert.deepEqual(ebBody, {
    ok: false,
    disconnected: true,
    code: EVENTBRITE_DISCONNECTED_CODE,
  });

  const okReq = new NextRequest('https://nightlifemilan.com/api/track', {
    method: 'POST',
    headers: { 'user-agent': 'Mozilla/5.0' },
    body: JSON.stringify({ name: 'pageview', path: '/it' }),
  });
  const okRes = await trackPost(okReq);
  assert.equal(okRes.status, 204);
});

test('vercel.json retains only non-Eventbrite crons and next.config.ts drops evbuc.com while preserving image qualities', () => {
  const vercelCfg = JSON.parse(fs.readFileSync(path.join(ROOT, 'vercel.json'), 'utf8')) as {
    crons?: Array<{ path: string; schedule: string }>;
  };
  assert.equal(vercelCfg.crons?.length, 2);
  assert.deepEqual(
    vercelCfg.crons?.map((c) => c.path),
    ['/api/analytics/aggregate', '/api/indexing/sitemap-watch'],
  );

  const nextConfigText = fs.readFileSync(path.join(ROOT, 'next.config.ts'), 'utf8');
  assert.doesNotMatch(nextConfigText, /evbuc\.com/i);
  assert.match(nextConfigText, /qualities:\s*\[40,\s*45,\s*50,\s*65,\s*75,\s*80,\s*85,\s*92,\s*95\]/);
});

test('disconnected Eventbrite lib modules operate offline without Eventbrite URLs or API calls', async () => {
  assert.equal(getEventbriteToken(), undefined);

  assert.deepEqual(await fetchEventbriteEvents(), []);
  assert.equal(await getEventGoldHtml('any-slug', 'it'), null);
  assert.deepEqual(await debugEventbrite(), {
    disconnected: true,
    hasToken: false,
    error: EVENTBRITE_DISCONNECTED_MESSAGE,
  });

  assert.deepEqual(await scoutThirdPartyEvents(), []);

  assert.equal(await resolveEventbriteVenueId('', 'justme', true), null);
  assert.deepEqual(await replaceEventImage('1', {} as never), {
    ok: false,
    reason: EVENTBRITE_DISCONNECTED_CODE,
  });
  assert.deepEqual(await publishOneLang({} as never), {
    ok: false,
    reason: EVENTBRITE_DISCONNECTED_CODE,
  });
  assert.deepEqual(
    await publishEvent({} as never, {} as never, '', '', {} as never, true),
    {
      en: { ok: false, reason: EVENTBRITE_DISCONNECTED_CODE },
      it: { ok: false, reason: EVENTBRITE_DISCONNECTED_CODE },
    },
  );
  assert.deepEqual(
    await publishXceedEvent({} as never, {} as never, '', '', {} as never, true),
    {
      en: { ok: false, reason: EVENTBRITE_DISCONNECTED_CODE },
      it: { ok: false, reason: EVENTBRITE_DISCONNECTED_CODE },
    },
  );

  assert.equal(validateOrderApiUrl('https://www.eventbriteapi.com/v3/orders/123456/'), null);
  await assert.rejects(
    () => dispatchForOrderApiUrl('https://www.eventbriteapi.com/v3/orders/1/', { mode: 'manual', dryRun: true }),
    /Eventbrite/i,
  );
  await assert.rejects(() => sweepRecentAttendees({ mode: 'sweep', dryRun: true }), /Eventbrite/i);
  await assert.rejects(() => listEventbriteWebhooks(), /Eventbrite/i);
  await assert.rejects(
    () => ensureAttendeeEmailWebhook('https://nightlifemilan.com/api/crm/email-webhook'),
    /Eventbrite/i,
  );
  await assert.rejects(() => syncEventbriteCrm(), /Eventbrite/i);

  const discoveryItems = getEventDiscoveryItems([], 'en', () => true);
  const compatItems = getEventbriteDiscoveryItems([], 'en', () => true);
  assert.ok(discoveryItems.length > 0);
  assert.deepEqual(compatItems, discoveryItems);
  assert.doesNotMatch(JSON.stringify(discoveryItems), /eventbrite\./i);

  assert.deepEqual(await fetchLiveEbEventsForSitemap(), []);
});
