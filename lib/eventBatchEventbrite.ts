import type { EventLocalePack } from './eventBatchLocaleTypes';
import { EVENT_LOCALE_PACKS_ALL } from './eventLocalePacks';
import { getEventBatchProfile, type EventBatchProfile } from './eventBatchProfiles';
import {
  EVENT_BATCH_PHONE,
  getBatchEventTemplateValues,
  getBatchLocalizedEventContent,
  interpolateEventBatchTemplate,
  type EventBatchLocale,
} from './eventBatchContent';

const SITE_ORIGIN = 'https://nightlifemilan.com';
const PLACEHOLDER_RE = /\{[a-zA-Z][a-zA-Z0-9]*\}/;

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function profileFor(profileOrSlug: EventBatchProfile | string): EventBatchProfile {
  const profile = typeof profileOrSlug === 'string' ? getEventBatchProfile(profileOrSlug) : profileOrSlug;
  if (!profile) {
    throw new Error(`Unknown event batch profile: ${profileOrSlug}`);
  }
  return profile;
}

function siteImageUrl(path: string): string {
  if (!path.startsWith('/')) {
    throw new Error(`Venue image must be a public site path: ${path}`);
  }
  return `${SITE_ORIGIN}${path}`;
}

export function localizedSquarePosterUrl(profile: EventBatchProfile, locale: EventBatchLocale): string {
  return `${SITE_ORIGIN}/api/event-poster/${profile.baseId}/${locale}`;
}

function link(url: string, label: string): string {
  return `<a href="${escapeHtml(url)}" rel="nofollow noopener noreferrer">${escapeHtml(label)}</a>`;
}

export function renderBatchEventbriteHtml(
  profileOrSlug: EventBatchProfile | string,
  locale: EventBatchLocale,
  pack?: EventLocalePack,
): string {
  const profile = profileFor(profileOrSlug);
  const resolvedPack = pack ?? EVENT_LOCALE_PACKS_ALL[locale];
  const content = getBatchLocalizedEventContent(profile, locale, resolvedPack);
  const values = getBatchEventTemplateValues(profile, locale, resolvedPack);
  const fill = (template: string) => interpolateEventBatchTemplate(template, values);
  const eventUrl = String(values.siteUrl);
  const squarePoster = localizedSquarePosterUrl(profile, locale);
  const poster = `<h3>${escapeHtml(fill(resolvedPack.gallery.posterTitle))}</h3><p><img src="${escapeHtml(squarePoster)}" alt="${escapeHtml(fill(resolvedPack.gallery.posterAlt))}" width="460" style="width:100%;max-width:460px;height:auto;display:block" /></p>`;
  const sections = content.sections.map((section) => `<h2>${escapeHtml(section.title)}</h2><p>${escapeHtml(section.body)}</p>`).join('');
  const contacts = `<h2>${escapeHtml(resolvedPack.eventbrite.contactsTitle)}</h2><p>WhatsApp: ${link(`https://wa.me/${EVENT_BATCH_PHONE.replace(/\D/g, '')}`, EVENT_BATCH_PHONE)}</p><p>${link(content.affiliateUrl, resolvedPack.eventbrite.buyTickets)}</p><p>${link(content.affiliateUrl, resolvedPack.eventbrite.bookTable)}</p><p>${link(eventUrl, resolvedPack.eventbrite.fullGuide)}</p><h2>${escapeHtml(resolvedPack.eventbrite.importantTitle)}</h2><p>${escapeHtml(fill(resolvedPack.eventbrite.importantBody))}</p>`;
  const programme = `<h2>${escapeHtml(resolvedPack.eventbrite.programmeTitle)}</h2><ul>${content.programme.map((slot) => `<li>${escapeHtml(`${slot.start}-${slot.end}: ${slot.title}`)}</li>`).join('')}</ul>`;
  const gallery = profile.venueImages.map((path, index) => `<h3>${escapeHtml(fill(resolvedPack.gallery.moodTitles[index]))}</h3><p><img src="${escapeHtml(siteImageUrl(path))}" alt="${escapeHtml(fill(resolvedPack.gallery.moodAlts[index]))}" width="460" style="width:100%;max-width:460px;height:auto;display:block" /></p>`).join('');
  const offers = `<h2>${escapeHtml(resolvedPack.eventbrite.offersTitle)}</h2><ul>${content.offers.map((offer) => `<li>${escapeHtml(`${offer.name} - EUR ${offer.price}`)}</li>`).join('')}</ul>`;
  const faqs = `<h2>${escapeHtml(resolvedPack.eventbrite.faqTitle)}</h2>${content.faqs.map((faq) => `<div data-event-faq="true"><h3>${escapeHtml(faq.question)}</h3><p>${escapeHtml(faq.answer)}</p></div>`).join('')}`;
  const keywords = resolvedPack.seoKeywords.map(fill).join(', ');
  const marker = `<!-- nlm:src=${profile.baseId}-${locale};slug-en=${profile.canonicalSlug} -->`;
  const html = `<p>${escapeHtml(content.seoSummary)}</p>${poster}${sections}${contacts}${programme}${gallery}${offers}${faqs}<p><strong>${escapeHtml(resolvedPack.eventbrite.seoLabel)}:</strong> ${escapeHtml(keywords)}</p>${marker}`;
  validateBatchEventbriteHtml(html, profile, locale, resolvedPack);
  return html;
}

export function validateBatchEventbriteHtml(
  html: string,
  profile: EventBatchProfile,
  locale: EventBatchLocale,
  pack: EventLocalePack = EVENT_LOCALE_PACKS_ALL[locale],
): void {
  if (PLACEHOLDER_RE.test(html)) {
    throw new Error(`${profile.canonicalSlug} Eventbrite HTML contains an unresolved template placeholder`);
  }
  if (!html.includes(EVENT_BATCH_PHONE)) {
    throw new Error(`${profile.canonicalSlug} Eventbrite HTML is missing ${EVENT_BATCH_PHONE}`);
  }
  const imageSources = [...html.matchAll(/<img src="([^"]+)"/g)].map((match) => match[1]);
  const expectedSources = [localizedSquarePosterUrl(profile, locale), ...profile.venueImages.map(siteImageUrl)].map(escapeHtml);
  if (imageSources.length !== expectedSources.length || imageSources.some((src, index) => src !== expectedSources[index])) {
    throw new Error(`${profile.canonicalSlug} Eventbrite image order is invalid`);
  }
  const posterHeading = `<h3>${escapeHtml(interpolateEventBatchTemplate(pack.gallery.posterTitle, getBatchEventTemplateValues(profile, locale, pack)))}</h3>`;
  if (!html.includes(posterHeading)) {
    throw new Error(`${profile.canonicalSlug} Eventbrite poster is missing its localized title`);
  }
  if (locale !== 'en' && html.includes('SEO keywords')) {
    throw new Error(`${profile.canonicalSlug} Eventbrite HTML leaks the English SEO label`);
  }
  if ((html.match(/data-event-faq="true"/g) || []).length !== 25) {
    throw new Error(`${profile.canonicalSlug} Eventbrite HTML must contain exactly 25 FAQs`);
  }
  if (!html.includes(`nlm:src=${profile.baseId}-${locale};slug-en=${profile.canonicalSlug}`)) {
    throw new Error(`${profile.canonicalSlug} Eventbrite HTML is missing its grouping marker`);
  }
}
