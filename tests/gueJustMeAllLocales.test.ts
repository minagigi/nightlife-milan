import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import sharp from 'sharp';
import { SITE_ONLY_EVENT_PROFILES } from '../lib/eventBatchProfiles';
import { buildGueEventbriteLocalePayloads } from '../lib/gueEventbriteLocales';
import { normalizedTextIncludes } from '../lib/eventTextVerification';
import {
  buildBookingSubtitle,
  buildMoreVenueEventsHeading,
  buildThisWeekAtHeading,
  eventText,
  getThisWeekInMilanHeading,
} from '../lib/eventPageLocale';
import {
  GUE_JUST_ME_AFFILIATE_URL,
  GUE_JUST_ME_ADDRESS,
  GUE_JUST_ME_BASE_ID,
  GUE_JUST_ME_CANONICAL_SLUG,
  getGueJustMeGeneratedImagePath,
} from '../lib/gueJustMe';
import { getGueJustMeLocalizedContent } from '../lib/gueJustMeLocales';
import { GUE_JUST_ME_EDITORIAL_COPY, GUE_JUST_ME_MUSIC_COPY } from '../lib/gueJustMeEditorialCopy';
import { getEventVisualGallery } from '../lib/eventVisualGallery';
import { enabledLocaleCodes } from '../lib/i18n/locales';

function decodedVisibleText(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim()
    .normalize('NFC');
}

function normalizedVisiblePrefix(html: string, codepoints: number): string {
  return [...decodedVisibleText(html)].slice(0, codepoints).join('');
}

function orderedUrls(html: string, attributes: readonly ('href' | 'src')[]): string[] {
  const wanted = new Set(attributes);
  return [...html.matchAll(/\b(href|src)\s*=\s*(["'])(.*?)\2/gi)]
    .filter((match) => wanted.has(match[1].toLowerCase() as 'href' | 'src'))
    .map((match) => match[3].replace(/&amp;/gi, '&'));
}

interface RollbackFixture {
  event: { nameText: string; summary: string; logoId: string; venueId: string; descriptionHtml: string };
  ticket: { id: string; name: string; description: string };
  settings: { confirmationMessageHtml: string; instructionsHtml: string };
  music: { ageRestriction: string | null; doorTime: string | null };
}

function rollbackSemantics(snapshot: RollbackFixture) {
  return {
    event: { ...snapshot.event, descriptionHtml: undefined, description: { visible: decodedVisibleText(snapshot.event.descriptionHtml), urls: orderedUrls(snapshot.event.descriptionHtml, ['href', 'src']) } },
    ticket: snapshot.ticket,
    settings: {
      confirmation: { visible: decodedVisibleText(snapshot.settings.confirmationMessageHtml), links: orderedUrls(snapshot.settings.confirmationMessageHtml, ['href']) },
      instructions: { visible: decodedVisibleText(snapshot.settings.instructionsHtml), links: orderedUrls(snapshot.settings.instructionsHtml, ['href']) },
    },
    music: snapshot.music,
  };
}

const KINDS = ['cover', 'poster', 'performance', 'target', 'dress', 'programme'] as const;

const BANNED_PROXIMITY_PHRASES = [
  'close range', 'pochi metri', 'de cerca', 'de près', 'nächster nähe', 'de perto',
  'van dichtbij', 'вблизи', 'yakından', '近距离', 'عن قرب', 'отблизо', 'izbliza',
  'zblízka', 'tæt på', 'lähedalt', 'läheltä', 'από κοντά', 'közelről',
  'in aice láimhe', 'tuvplānā', 'iš arti', 'mill-qrib', 'z bliska', 'de aproape',
  'od blizu', 'på nära håll', 'på nært hold', 'í návígi', 'зблизька', 'nga afër',
  'одблизу',
] as const;

test('Eventbrite readback accepts the verified Just Me address with saved punctuation', () => {
  const saved = '21+ · Just Me, Viale Luigi Camoens, 2, 20121 Milano';
  assert.equal(normalizedTextIncludes(saved, '21+'), true);
  assert.equal(normalizedTextIncludes(saved, 'Viale Luigi Camoens 2, 20121'), true);
  assert.equal(normalizedTextIncludes(saved, 'Viale Luigi Camoens 9, 20121'), false);
});

test('English Eventbrite readback accepts a stripped contact data attribute but keeps poster ordering strict', () => {
  const base = buildGueEventbriteLocalePayloads('en').find((payload) => payload.variant === 1);
  assert.ok(base);
  const EventbriteNormalizedHtml = base.descriptionHtml.replace(' data-contact-list="true"', '');
  const contacts = EventbriteNormalizedHtml.indexOf('Tickets, tables and contacts');
  const agenda = EventbriteNormalizedHtml.indexOf('Agenda and entry times');
  const firstPoster = EventbriteNormalizedHtml.match(/<img\b[^>]*>/i)?.[0];
  const poster = EventbriteNormalizedHtml.indexOf(firstPoster || '');
  assert.ok(contacts >= 0 && agenda > contacts && poster > contacts && poster < agenda);

  assert.ok(firstPoster);
  const posterBeforeContacts = EventbriteNormalizedHtml
    .replace(firstPoster, '')
    .replace('Tickets, tables and contacts', `${firstPoster}Tickets, tables and contacts`);
  assert.ok(posterBeforeContacts.indexOf(firstPoster) < posterBeforeContacts.indexOf('Tickets, tables and contacts'));

  const seoAttributeStripped = EventbriteNormalizedHtml.replace(' data-seo-closing="true"', '');
  assert.match(seoAttributeStripped, /Guè Pequeno live in Milan: tickets, nightlife and VIP tables/u);
  assert.match(decodedVisibleText(seoAttributeStripped), /Guè Pequeno/u);
});

test('English Guè Eventbrite pilot begins with the exact approved 140-codepoint summary', () => {
  const payload = buildGueEventbriteLocalePayloads('en').find((candidate) => candidate.variant === 1);
  assert.ok(payload);
  const expected = 'Guè Pequeno live at Just Me Milano, 25 July 2026: 21+ aperitivo, club night and VIP tables. Buy official tickets; WhatsApp +39 351 912 7047.';
  assert.equal([...payload.summary].length, 140);
  assert.equal(payload.summary, expected);
  assert.match(payload.descriptionHtml, /^<p>/u);
  assert.equal(normalizedVisiblePrefix(payload.descriptionHtml, 140), expected);

  const h2BeforeSummary = `<h2>Guè Pequeno live at Just Me Milano</h2>${payload.descriptionHtml}`;
  const changedSummaryCharacter = payload.descriptionHtml.replace('club night', 'club light');
  assert.notEqual(normalizedVisiblePrefix(h2BeforeSummary, 140), expected);
  assert.notEqual(normalizedVisiblePrefix(changedSummaryCharacter, 140), expected);
});

test('Eventbrite summary equality allows only decoded NFC whitespace normalization', () => {
  const expected = 'Guè Pequeno live at Just Me Milano on 25 July 2026';
  const harmlesslyNormalized = 'Guè  Pequeno live at Just Me Milano on 25 July 2026';
  const changed = 'Guè Pequeno live at another venue on 25 July 2026';
  assert.equal(decodedVisibleText(harmlesslyNormalized), decodedVisibleText(expected));
  assert.notEqual(decodedVisibleText(changed), decodedVisibleText(expected));
});

test('rollback semantic comparator tolerates harmless Eventbrite HTML normalization only', () => {
  const snapshot: RollbackFixture = {
    event: {
      nameText: 'Original event', summary: 'Original summary', logoId: '1', venueId: '2',
      descriptionHtml: '<section data-contact-list="true"><p>Hello &amp; welcome</p><a href="https://xceed.me/a">Buy</a><img src="https://img.evbuc.com/a.jpg"></section>',
    },
    ticket: { id: '3', name: 'Guest list', description: 'Original ticket' },
    settings: {
      confirmationMessageHtml: '<p>Confirm <a href="https://xceed.me/a">here</a></p>',
      instructionsHtml: '<p>Confirm <a href="https://xceed.me/a">here</a></p>',
    },
    music: { ageRestriction: '21+', doorTime: '2026-07-25T17:30:00Z' },
  };
  const normalized: RollbackFixture = {
    ...snapshot,
    event: {
      ...snapshot.event,
      descriptionHtml: '<section><p>Hello &amp; welcome</p><a class="cta" href="https://xceed.me/a">Buy</a><img width="1600" src="https://img.evbuc.com/a.jpg"></section>',
    },
  };
  assert.deepEqual(rollbackSemantics(snapshot), rollbackSemantics(normalized));

  const visibleCopyChanged = { ...normalized, event: { ...normalized.event, descriptionHtml: normalized.event.descriptionHtml.replace('welcome', 'changed') } };
  const linkChanged = { ...normalized, settings: { ...normalized.settings, instructionsHtml: '<p>Confirm <a href="https://xceed.me/other">here</a></p>' } };
  const imageChanged = { ...normalized, event: { ...normalized.event, descriptionHtml: normalized.event.descriptionHtml.replace('a.jpg', 'other.jpg') } };
  const metadataChanged = { ...normalized, event: { ...normalized.event, summary: 'Changed summary' } };
  const ticketChanged = { ...normalized, ticket: { ...normalized.ticket, description: 'Changed ticket' } };
  const musicChanged = { ...normalized, music: { ...normalized.music, ageRestriction: '18+' } };
  assert.notDeepEqual(rollbackSemantics(snapshot), rollbackSemantics(visibleCopyChanged));
  assert.notDeepEqual(rollbackSemantics(snapshot), rollbackSemantics(linkChanged));
  assert.notDeepEqual(rollbackSemantics(snapshot), rollbackSemantics(imageChanged));
  assert.notDeepEqual(rollbackSemantics(snapshot), rollbackSemantics(metadataChanged));
  assert.notDeepEqual(rollbackSemantics(snapshot), rollbackSemantics(ticketChanged));
  assert.notDeepEqual(rollbackSemantics(snapshot), rollbackSemantics(musicChanged));
});

test('Guè site content is native-ready in all 35 enabled locales', () => {
  assert.equal(enabledLocaleCodes.length, 35);
  for (const locale of enabledLocaleCodes) {
    const content = getGueJustMeLocalizedContent(locale);
    const editorial = GUE_JUST_ME_EDITORIAL_COPY[locale];
    assert.equal(content.locale, locale);
    assert.equal(content.faqs.length, 25);
    assert.equal(content.sections.length, 4);
    assert.deepEqual(
      content.sections.map((section) => section.title),
      [editorial.headings.dressCode, editorial.headings.target, editorial.headings.mood, editorial.headings.music],
    );
    assert.ok(content.sections.every((section) => !section.title.endsWith('?')));
    assert.equal(content.sections[3].body, GUE_JUST_ME_MUSIC_COPY[locale]);
    assert.equal(content.programme[1].title, editorial.stageNotice);
    if (locale === 'en' || locale === 'it') {
      assert.ok(content.faqs[11].answer.includes(editorial.stageNotice));
      assert.notEqual(content.faqs[11].answer, content.sections[0].body);
    }
    if (locale !== 'en') {
      assert.doesNotMatch(JSON.stringify(content), /Guè live performance, Italian rap/u);
    }
    assert.match(content.answerFirst || '', new RegExp(editorial.stageNotice.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'u'));
    assert.doesNotMatch(content.answerFirst || '', /45[,. ]?000/u);
    assert.doesNotMatch(JSON.stringify(content), /\{[a-zA-Z][a-zA-Z0-9]*\}/u);
    assert.doesNotMatch(JSON.stringify(content), /80[,. ]?000/u);
    assert.equal(content.affiliateUrl, GUE_JUST_ME_AFFILIATE_URL);
    assert.ok((content.metaTitle || '').length <= 62);
    assert.ok((content.metaDescription || '').length <= 158);
    const gallery = getEventVisualGallery(GUE_JUST_ME_CANONICAL_SLUG, locale);
    assert.equal(gallery?.images.length, 5);
    assert.match(gallery?.hero?.src || '', new RegExp(`-${locale}-v2\\.jpg$`));
    const galleryText = JSON.stringify(gallery);
    assert.doesNotMatch(galleryText, /\{[a-zA-Z][a-zA-Z0-9]*\}/u);
    assert.equal(new Set(gallery?.images.map((image) => image.title)).size, 5);
    assert.equal(new Set(gallery?.images.map((image) => image.alt)).size, 5);
  }
});

test('Guè event-page navigation and booking chrome is native in every locale', () => {
  for (const locale of enabledLocaleCodes) {
    const values = [
      buildBookingSubtitle(locale, 'Just Me'),
      buildMoreVenueEventsHeading(locale, 'Just Me'),
      buildThisWeekAtHeading(locale, 'Just Me'),
      getThisWeekInMilanHeading(locale),
      eventText(locale, 'Book via WhatsApp', 'Prenota via WhatsApp', 'Reservar pelo WhatsApp'),
    ];
    assert.ok(values.every((value) => value.trim().length > 0), `${locale} has an empty event-page label`);
    if (locale !== 'en') {
      assert.doesNotMatch(values.join(' | '), /Guestlist or table|More events at|This Week at|This Week in Milan|Book via WhatsApp/u, `${locale} retains English event-page chrome`);
    }
  }
});

test('Guè factual copy names only the verified guest and makes no proximity promise', () => {
  const profile = SITE_ONLY_EVENT_PROFILES.find(({ baseId }) => baseId === GUE_JUST_ME_BASE_ID);
  assert.ok(profile);
  assert.deepEqual(profile.specialGuests, { en: ['Guè'], it: ['Guè'] });

  for (const locale of enabledLocaleCodes) {
    const targetBody = GUE_JUST_ME_EDITORIAL_COPY[locale].targetBody.toLocaleLowerCase(locale);
    assert.match(targetBody, /21/u, `${locale} target must retain the 21+ audience`);
    assert.match(targetBody, /guè/u, `${locale} target must retain Guè`);
    for (const phrase of BANNED_PROXIMITY_PHRASES) {
      assert.equal(targetBody.includes(phrase), false, `${locale} target contains proximity phrase: ${phrase}`);
    }
  }
});

test('Guè Eventbrite package contains 350 validated keyword listings', () => {
  const payloads = enabledLocaleCodes.flatMap((locale) => buildGueEventbriteLocalePayloads(locale));
  assert.equal(payloads.length, 350);
  assert.equal(new Set(payloads.map((payload) => payload.marker)).size, 350);
  for (const payload of payloads) {
    assert.equal([...payload.summary].length, 140, `${payload.marker} summary length`);
    assert.equal(normalizedVisiblePrefix(payload.descriptionHtml, 140), payload.summary, `${payload.marker} lead equals summary`);
    assert.match(payload.descriptionHtml, /<ul data-contact-list="true">/u, `${payload.marker} contact list`);
    assert.match(payload.descriptionHtml, /data-seo-closing="true"/u, `${payload.marker} SEO closing`);
    assert.equal((payload.descriptionHtml.match(/data-event-faq="true"/g) || []).length, 25);
    assert.equal((payload.descriptionHtml.match(/<img\b/g) || []).length, 5);
    assert.doesNotMatch(payload.descriptionHtml, /DJ Dero/i);
    assert.ok(payload.descriptionHtml.includes(payload.requiredLead.replaceAll("'", '&#39;')));
    assert.ok(payload.descriptionHtml.includes(GUE_JUST_ME_AFFILIATE_URL));
    assert.ok(payload.descriptionHtml.includes(GUE_JUST_ME_ADDRESS));
    assert.ok(payload.orderConfirmation.includes(GUE_JUST_ME_AFFILIATE_URL));
    assert.doesNotMatch(payload.descriptionHtml, /<br\s*\/?\s*>/i);
    assert.doesNotMatch(payload.descriptionHtml, /80[,. ]?000/u);
  }
});

test('Guè publisher hydrates organizer-list stubs and retires only zero-attendee exact duplicates', async () => {
  const route = await readFile(path.join(process.cwd(), 'app/api/events/publish-gue-locales/route.ts'), 'utf8');
  const runner = await readFile(path.join(process.cwd(), 'scripts/publish-gue-locales.ps1'), 'utf8');
  assert.match(route, /hydrateExistingEvents/);
  assert.match(route, /gueCandidateStubs\(localPayloads, stubs\)/);
  assert.match(route, /venues\/\$\{JUST_ME_EVENTBRITE_VENUE_ID\}\/events\/\?status=live,draft,started&time_filter=current_future/);
  assert.doesNotMatch(route, /pageEvents\.at\(-1\)[\s\S]+return events/);
  assert.match(route, /Marker is the sole publication identity/);
  assert.match(route, /event\.end\?\.utc === END_UTC/);
  assert.match(route, /marker collision requires manual review/);
  assert.match(route, /cleanupNewlyPublishedZeroAttendeeEvent/);
  assert.match(route, /newly published zero-attendee event \$\{result\.ebEventId\} was canceled/);
  assert.doesNotMatch(route, /resolveLiveDuplicate/);
  assert.doesNotMatch(route, /retireSupersededLive/);
  assert.match(route, /auditLocales = requestedLocale/);
  assert.match(route, /newly published cleanup \$\{eventId\} did not persist a canceled status/);
  assert.match(route, /function buildFullAuditCandidateSet[\s\S]+event\.start\?\.utc === START_UTC/);
  assert.match(route, /FULL_AUDIT_MAX_CHUNK = 20/);
  assert.match(route, /FULL_DEEP_AUDIT_MAX_CHUNK = 5/);
  assert.match(route, /requestUrl\.searchParams\.get\('deep'\) === '1'/);
  assert.match(route, /settingsItems\.split\(','\)/);
  assert.match(route, /ticket_buyer_settings\/`/);
  assert.match(route, /music_properties\/`/);
  assert.match(route, /interface LiveRefreshSnapshot/);
  assert.match(route, /captureLiveRefreshSnapshot/);
  assert.match(route, /restoreLiveRefreshSnapshot/);
  assert.match(route, /verifyLiveRefreshSnapshot/);
  assert.match(route, /automatic rollback restored and verified the prior live state/);
  assert.match(route, /html\.indexOf\('Tickets, tables and contacts'\)/);
  assert.match(route, /html\.includes\('Guè Pequeno live in Milan: tickets, nightlife and VIP tables'\)/);
  assert.match(route, /poster is not immediately after contacts/);
  assert.match(route, /function semanticallyEqualLiveRefreshSnapshot/);
  assert.match(route, /rollbackHtmlSemantics\(expected\.event\.descriptionHtml, \['href', 'src'\]\)/);
  assert.match(route, /rollbackHtmlSemantics\(expected\.settings\.confirmationMessageHtml, \['href'\]\)/);
  assert.doesNotMatch(route, /const current = JSON\.stringify\(saved\);[\s\S]{0,200}const expected = JSON\.stringify\(snapshot\)/);
  const refreshBlock = route.slice(route.indexOf('async function refreshLiveEvent'), route.indexOf('async function inspectLiveEvent'));
  const restoreBlock = route.slice(route.indexOf('async function restoreLiveRefreshSnapshot'), route.indexOf('async function verifyLiveRefreshSnapshot'));
  for (const eventPostBlock of [refreshBlock, restoreBlock]) {
    assert.doesNotMatch(
      eventPostBlock,
      /event:\s*\{[\s\S]{0,350}\bsummary\s*:[\s\S]{0,350}\bdescription\s*:/u,
      'Eventbrite event POST must never combine summary and description',
    );
  }
  assert.match(route, /live metadata refresh/);
  assert.match(route, /live description refresh/);
  const metadataRefreshIndex = refreshBlock.indexOf('live metadata refresh');
  const descriptionRefreshIndex = refreshBlock.indexOf('live description refresh');
  assert.ok(descriptionRefreshIndex >= 0 && metadataRefreshIndex >= 0 && metadataRefreshIndex < descriptionRefreshIndex,
    'forward refresh must persist metadata/summary before description');
  const metadataResponseIndex = refreshBlock.indexOf('const metadataResponse');
  assert.ok(metadataResponseIndex > 0, 'forward refresh must have a distinct metadata response');
  const metadataRefreshBlock = refreshBlock.slice(0, refreshBlock.indexOf('const descriptionResponse'));
  const descriptionRefreshBlock = refreshBlock.slice(refreshBlock.indexOf('const descriptionResponse'));
  assert.match(metadataRefreshBlock, /\bsummary:\s*payload\.summary/u);
  assert.doesNotMatch(metadataRefreshBlock, /\bdescription\s*:/u);
  assert.match(descriptionRefreshBlock, /event:\s*\{\s*description:\s*\{\s*html:\s*payload\.descriptionHtml/u);
  assert.doesNotMatch(descriptionRefreshBlock, /event:\s*\{[\s\S]{0,200}\bsummary\s*:/u);
  assert.match(route, /rollback event metadata restore/);
  assert.match(route, /rollback event description restore/);
  assert.match(route, /refreshExistingLiveEventWithRollback\([\s\S]+duplicate\.id/);
  assert.match(route, /function parseSuppliedMediaManifestForTest/);
  assert.match(route, /value\.entries\.length !== 6/);
  assert.match(route, /locale !== 'en' \|\| fromVariant !== 1 \|\| max !== 1/);
  assert.match(route, /if \(suppliedMediaManifest && partialResults\.length === 1\)[\s\S]+await writeMediaManifest\(locale, mediaManifest\)/);
  assert.match(route, /GUE_ENGLISH_PILOT_EVENT_ID = '1994392210790'/);
  assert.match(route, /assertEnglishPilotIdentityForTest\(pilot, payload\)/);
  assert.match(route, /English pilot safety gate failed: expected one exact live ID and zero draft, duplicate or unknown marker rows/);
  const pilotSection = route.slice(route.indexOf('if (suppliedMediaManifest) {\n      // Fail closed'));
  assert.doesNotMatch(pilotSection.slice(0, pilotSection.indexOf('} else {')), /resolveLiveDuplicate|deleteNewlyCreatedDraft|retireSupersededLive|publishOneLang/);
  const mediaIngress = await readFile(path.join(process.cwd(), 'app/api/admin/upload-eventbrite-media/route.ts'), 'utf8');
  assert.match(mediaIngress, /process\.env\.GUE_PUBLISH_SECRET/);
  assert.match(mediaIngress, /if \(!okCron && !okGuePilot\)/);
  assert.match(mediaIngress, /createHash\('sha256'\)/);
  assert.match(mediaIngress, /sharp\(image, \{ failOn: 'error' \}\)/);
  assert.match(mediaIngress, /GUE_PILOT_FILES/);
  assert.match(route, /inspectLiveEvent\([\s\S]+coverIdByLocale\.get\(payload\.locale\)/);
  assert.match(route, /unsupported 80,000 attendance claim persisted/);
  assert.match(route, /summaryExact:\s*normalizedVisibleExact\(String\(event\.summary \|\| ''\)\) === normalizedVisibleExact\(payload\.summary\)/);
  assert.match(route, /actualSummary\(length=\$\{String\(event\.summary \|\| ''\)\.length\}\)=\$\{JSON\.stringify\(String\(event\.summary \|\| ''\)\)\}/);
  assert.match(route, /ticketDescription\(ticket\) === payload\.ticketDescription/);
  assert.match(route, /localized phone, dress code, target, mood or music section missing/);
  assert.match(route, /candidateSet\.candidates\.slice\(offset, offset \+ limit\)/);
  assert.match(route, /candidateFingerprint: candidateSet\.fingerprint/);
  assert.match(route, /expectedMarkerFingerprint/);
  assert.match(route, /matchAll\(\/<!-- \(nlm:curated=gue-/);
  assert.match(route, /liveIds: live\.map/);
  assert.match(route, /uniqueLiveIds !== rows\.length/);
  assert.match(route, /retryable = \/HTTP 429\|rate limit\|HIT_RATE_LIMIT/);
  assert.match(route, /checkpoint: partialResults\.map\(\(result\) => \(\{ marker: result\.marker, eventId: result\.id \}\)\)/);
  assert.match(route, /English v2 media manifest is required before shared body media can be reused/);
  assert.match(route, /locale === 'en'[\s\S]+localPayloads\[0\]\.imagePlan\[0\]/);
  assert.match(route, /englishManifest\.urls\.slice\(2\)/);
  assert.match(route, /caps the rollout at 74 assets/);
  assert.match(route, /unsupported DJ Dero claim persisted/);
  assert.match(route, /contentCurrent/);
  assert.match(runner, /audit=1&full=1&offset=\$Offset&limit=\$Limit/);
  assert.match(runner, /Full audit candidate set changed at offset/);
  assert.match(runner, /unexpectedMarkerRows/);
  assert.match(runner, /identityCollisions/);
  assert.match(runner, /\$WaveSize = 3/);
  assert.match(runner, /liveExact -ne \$ExpectedMarkerCount/);
  assert.match(runner, /uniqueLiveIds -ne \$ExpectedMarkerCount/);
  assert.match(runner, /Wait-EventbriteRateWindow/);
  assert.match(runner, /EVENTBRITE_RATE_WAIT/);
  assert.match(runner, /-not \$Row\.contentCurrent/);
  assert.match(runner, /@\(429, 500, 502, 503, 504\)/);
  assert.match(runner, /rows = \$rows\.ToArray\(\)/);
  assert.match(runner, /unexpectedMarkerRows = \$unexpectedMarkerRows\.ToArray\(\)/);
  assert.match(runner, /candidateEvents = \$candidateEvents\.ToArray\(\)/);
  assert.match(runner, /chunks = \$chunks\.ToArray\(\)/);
  assert.match(runner, /\?audit=1&full=1&deep=1&offset=\$Offset&limit=\$Limit/);
  assert.match(runner, /DEEP_AUDIT_COMPLETE/);
  assert.match(runner, /rows = \$deepRows\.ToArray\(\)/);
  assert.match(runner, /SETTINGS_AUDIT_PROGRESS/);
  assert.match(runner, /eventbrite-public-readback\.json/);
});

test('summary exact comparison rejects a truncated generated summary', () => {
  const normalizeSummary = (value: string) => decodedVisibleText(value).normalize('NFC').replace(/\s+/g, ' ').trim();
  const expected = 'Guè Pequeno live at Just Me Milano: an intimate hip-hop performance and Milan nightlife experience.';
  const generatedTruncation = `${expected.slice(0, 68)}…`;
  assert.notEqual(normalizeSummary(generatedTruncation), normalizeSummary(expected));
});

test('Guè ingress and pilot control flow are fail closed', async () => {
  const route = await readFile(path.join(process.cwd(), 'app/api/events/publish-gue-locales/route.ts'), 'utf8');
  const ingress = await readFile(path.join(process.cwd(), 'app/api/admin/upload-eventbrite-media/route.ts'), 'utf8');
  assert.match(route, /value\.entries\.length !== 6/);
  assert.match(route, /new Set\(entries\.map\(\(entry\) => entry!\.url\)\)\.size !== 6/);
  assert.match(route, /safeEntries\[0\]\.id !== String\(value\.coverId\)/);
  assert.match(route, /event\.status !== 'live'/);
  assert.match(route, /String\(event\.id\) !== GUE_ENGLISH_PILOT_EVENT_ID/);
  assert.match(route, /event\.end\?\.utc !== END_UTC/);
  assert.match(route, /creation, deletion and duplicate resolution are forbidden/);
  assert.match(ingress, /contentType !== 'image\/jpeg'/);
  assert.match(ingress, /image\.length < 100_000 \|\| image\.length > 5_000_000 \|\| !isJpeg\(image\)/);
  assert.match(ingress, /digest !== expected\.sha256/);
  assert.match(ingress, /metadata\.width !== expected\.width \|\| metadata\.height !== expected\.height/);
});

test('Guè cover and body assets use exact 2:1 and 5:4 canvases without tiny files', async () => {
  for (const locale of enabledLocaleCodes) {
    for (const kind of KINDS) {
      const relative = getGueJustMeGeneratedImagePath(locale, kind).replace(/^\//, '');
      const file = path.join(process.cwd(), 'public', ...relative.split('/'));
      const [metadata, info] = await Promise.all([sharp(file).metadata(), stat(file)]);
      const expected = kind === 'cover' ? [2000, 1000] : [1600, 1280];
      assert.deepEqual([metadata.width, metadata.height], expected, `${locale} ${kind}`);
      assert.ok(info.size > 100_000, `${locale} ${kind} is unexpectedly small`);
    }
  }
});
