import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import {
  getBatchEventTemplateValues,
  getBatchLocalizedEventContent,
  interpolateEventBatchTemplate,
} from '../lib/eventBatchContent';
import { renderBatchEventbriteHtml } from '../lib/eventBatchEventbrite';
import { EVENT_BATCH_PROFILES } from '../lib/eventBatchProfiles';
import { EVENT_LOCALE_PACKS_ALL, validateEventLocalePackCoverage } from '../lib/eventLocalePacks';
import { enabledLocaleCodes } from '../lib/i18n/locales';

const OUTPUT = resolve(process.argv[2] || 'artifacts/event-locales-manifest.json');
const TITLE_LIMIT = 75;
const TICKET_NAME_LIMIT = 100;

function truncate(value: string, limit: number): string {
  if (value.length <= limit) return value;
  const prefix = value.slice(0, limit - 3);
  const lastSpace = prefix.lastIndexOf(' ');
  return `${prefix.slice(0, lastSpace > limit * 0.6 ? lastSpace : prefix.length).trimEnd()}...`;
}

validateEventLocalePackCoverage();

const entries = EVENT_BATCH_PROFILES.flatMap((profile) => enabledLocaleCodes.map((locale) => {
  const pack = EVENT_LOCALE_PACKS_ALL[locale];
  const content = getBatchLocalizedEventContent(profile, locale, pack);
  const values = getBatchEventTemplateValues(profile, locale, pack);
  const fill = (template: string) => interpolateEventBatchTemplate(template, values);
  const descriptionHtml = renderBatchEventbriteHtml(profile, locale, pack);
  const mode = locale === 'en' || locale === 'it' ? 'update' : 'create';
  const eventbriteIds = profile.eventbriteIds!;

  return {
    mode,
    base: profile.baseId,
    enEventId: eventbriteIds.en,
    slugEn: profile.canonicalSlug,
    lang: locale,
    existingEventId: mode === 'update'
      ? locale === 'en' ? eventbriteIds.en : eventbriteIds.it
      : undefined,
    title: truncate(content.title, TITLE_LIMIT),
    summary: content.seoSummary,
    descriptionHtml,
    ticketName: truncate(fill(pack.eventbrite.ticketName), TICKET_NAME_LIMIT),
    ticketDescription: fill(pack.eventbrite.ticketDescription),
    faqCount: content.faqs.length,
    imageCount: (descriptionHtml.match(/<img src=/g) || []).length,
  };
}));

const manifest = {
  version: 1,
  generatedAt: new Date().toISOString(),
  source: 'Nightlife Milan shared structured event content',
  events: EVENT_BATCH_PROFILES.length,
  locales: enabledLocaleCodes.length,
  updates: entries.filter((entry) => entry.mode === 'update').length,
  creates: entries.filter((entry) => entry.mode === 'create').length,
  entries,
};

mkdirSync(dirname(OUTPUT), { recursive: true });
writeFileSync(OUTPUT, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({ output: OUTPUT, entries: entries.length, updates: manifest.updates, creates: manifest.creates }));
