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

test('Guè publisher route is disconnected fail-closed while runner gates remain documented', async () => {
  const route = await readFile(path.join(process.cwd(), 'app/api/events/publish-gue-locales/route.ts'), 'utf8');
  const runner = await readFile(path.join(process.cwd(), 'scripts/publish-gue-locales.ps1'), 'utf8');
  const mediaIngress = await readFile(path.join(process.cwd(), 'app/api/admin/upload-eventbrite-media/route.ts'), 'utf8');
  assert.match(route, /eventbriteGoneResponse\('\/api\/events\/publish-gue-locales'\)/);
  assert.match(route, /export const GET = gone;/);
  assert.match(route, /export const POST = gone;/);
  assert.match(mediaIngress, /eventbriteGoneResponse\('\/api\/admin\/upload-eventbrite-media'\)/);
  assert.match(mediaIngress, /export const POST = gone;/);
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

test('Guè ingress route is disconnected fail closed (HTTP 410)', async () => {
  const route = await readFile(path.join(process.cwd(), 'app/api/events/publish-gue-locales/route.ts'), 'utf8');
  const ingress = await readFile(path.join(process.cwd(), 'app/api/admin/upload-eventbrite-media/route.ts'), 'utf8');
  assert.match(route, /eventbriteGoneResponse\('\/api\/events\/publish-gue-locales'\)/);
  assert.match(route, /export const GET = gone;/);
  assert.match(route, /export const POST = gone;/);
  assert.match(ingress, /eventbriteGoneResponse\('\/api\/admin\/upload-eventbrite-media'\)/);
  assert.match(ingress, /export const POST = gone;/);
});

test('Guè cover and body assets use exact 2:1 and 5:4 canvases without tiny files', async () => {
  for (const locale of enabledLocaleCodes) {
    for (const kind of KINDS) {
      const relative = getGueJustMeGeneratedImagePath(locale, kind).replace(/^\//, '');
      const file = path.join(process.cwd(), 'public', ...relative.split('/'));
      const [metadata, info] = await Promise.all([sharp(file).metadata(), stat(file)]);
      const expected = [1376, 768];
      assert.deepEqual([metadata.width, metadata.height], expected, `${locale} ${kind}`);
      assert.ok(info.size > 100_000, `${locale} ${kind} is unexpectedly small`);
    }
  }
});
