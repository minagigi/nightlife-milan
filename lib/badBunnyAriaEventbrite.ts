import { buildEventbriteConfirmationHtml, getEventbriteConfirmationPlainText } from './eventbriteConfirmation';
import {
  getBatchEventTemplateValues,
  interpolateEventBatchTemplate,
} from './eventBatchContent';
import { getEventBatchProfile } from './eventBatchProfiles';
import { getEventLocalePack } from './eventLocalePacks';
import { getLocaleDef, type LocaleCode } from './i18n/locales';
import { getBadBunnyAriaLocalizedContent } from './badBunnyAriaLocales';
import { BAD_BUNNY_ARIA_EDITORIAL_COPY } from './badBunnyAriaEditorialCopy';
import {
  BAD_BUNNY_ARIA_ADDRESS,
  BAD_BUNNY_ARIA_AFFILIATE_URL,
  BAD_BUNNY_ARIA_CANONICAL_SLUG,
  BAD_BUNNY_ARIA_KEYWORDS_IT,
  BAD_BUNNY_ARIA_PHONE,
  BAD_BUNNY_ARIA_WHATSAPP,
  getBadBunnyAriaImagePath,
  getBadBunnyAriaSiteUrl,
} from './badBunnyAria';

const DESCRIPTION_LIMIT = 16_000;
const IMAGE_STYLE = 'display:block;width:100%;max-width:100%;height:auto';
const SITE_ORIGIN = 'https://nightlifemilan.com';
const KEYWORD_INDEXES = [0, 2, 3, 4, 5, 6, 7, 9, 13, 14] as const;

export interface BadBunnyAriaImagePlan { src: string; title: string; alt: string }
export interface BadBunnyAriaEventbritePayload {
  locale: LocaleCode;
  eventbriteLocale: string;
  variant: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  keyword: string;
  title: string;
  summary: string;
  requiredLead: string;
  marker: string;
  canonicalSiteUrl: string;
  affiliateUrl: string;
  ticketName: string;
  ticketDescription: string;
  orderConfirmation: string;
  coverImage: BadBunnyAriaImagePlan;
  imagePlan: readonly [BadBunnyAriaImagePlan, BadBunnyAriaImagePlan, BadBunnyAriaImagePlan, BadBunnyAriaImagePlan, BadBunnyAriaImagePlan];
  descriptionHtml: string;
}

const ITALIAN_TITLES = [
  'Bad Bunny After Party Milano | Aria Club 18 luglio',
  'Bad Bunny Milano After Party | Aria Club',
  'After Party Concerto Bad Bunny | Aria Club Milano',
  'Festa Bad Bunny Milano | After Party Aria Club',
  'Reggaeton Bad Bunny Milano | Aria Club After Party',
  'Aria Club Bad Bunny After Party | Milano 18 luglio',
  'Discoteca Dopo Concerto Bad Bunny | Aria Milano',
  'Latin Party Bad Bunny Milano | Aria Club',
  'Nightlife San Siro Bad Bunny | After Party Aria',
  'Tavoli VIP Bad Bunny After Party | Aria Club Milano',
] as const;

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function visibleHtml(value: string): string {
  return value.replace(/<[^>]+>/g, ' ').replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number(code))).replace(/&#x([0-9a-f]+);/gi, (_, code: string) => String.fromCodePoint(Number.parseInt(code, 16))).replace(/&nbsp;/gi, ' ').replace(/&amp;/gi, '&').replace(/&quot;/gi, '"').replace(/&apos;|&#39;/gi, "'").replace(/&lt;/gi, '<').replace(/&gt;/gi, '>').replace(/\s+/g, ' ').trim();
}

function clamp(value: string, limit: number): string {
  const compact = value.replace(/\s+/gu, ' ').trim();
  return [...compact].length <= limit ? compact : `${[...compact].slice(0, limit - 1).join('').replace(/[\s,;:|.-]+$/u, '')}…`;
}

export function badBunnyAriaConfirmationFieldComplete(html: string, locale: LocaleCode = 'it'): boolean {
  const visible = visibleHtml(html).normalize('NFC').replace(/\s+/gu, ' ').trim().toLocaleLowerCase(getLocaleDef(locale)?.hreflang || locale);
  const expected = getEventbriteConfirmationPlainText(locale, BAD_BUNNY_ARIA_PHONE).notTicket.normalize('NFC').replace(/\s+/gu, ' ').trim().toLocaleLowerCase(getLocaleDef(locale)?.hreflang || locale);
  return html.includes(BAD_BUNNY_ARIA_AFFILIATE_URL) && visible.includes(BAD_BUNNY_ARIA_PHONE) && visible.includes(expected);
}

function imageHtml(image: BadBunnyAriaImagePlan): string {
  return `<p><img src="${escapeHtml(image.src)}" alt="${escapeHtml(image.alt)}" title="${escapeHtml(image.title)}" style="${IMAGE_STYLE}"></p>`;
}

function baseImagePlan(locale: LocaleCode): { cover: BadBunnyAriaImagePlan; body: BadBunnyAriaEventbritePayload['imagePlan'] } {
  const content = getBadBunnyAriaLocalizedContent(locale);
  const pack = getEventLocalePack(locale)!;
  const editorial = BAD_BUNNY_ARIA_EDITORIAL_COPY[locale];
  const make = (kind: 'cover' | 'poster' | 'venue' | 'aperitivo' | 'club' | 'tables', title: string, alt: string) => ({ src: `${SITE_ORIGIN}${getBadBunnyAriaImagePath(locale, kind)}`, title, alt });
  return {
    cover: make('cover', content.title, `${content.title} · Aria Club Milano · 18.07.2026`),
    body: [
      make('poster', content.title, `${content.title} · Aria Club Milano · 18.07.2026`),
      make('venue', editorial.targetLabel, `${editorial.targetLabel} · Aria Club Milano`),
      make('aperitivo', content.programme[0].title, `${content.programme[0].title} · Aria Club Milano`),
      make('club', content.programme.at(-1)?.title || pack.eventbrite.programmeTitle, `${content.programme.at(-1)?.title || pack.eventbrite.programmeTitle} · Aria Club Milano`),
      make('tables', pack.eventbrite.bookTable, `${pack.eventbrite.bookTable} · Aria Club Milano`),
    ],
  };
}

function renderDescription(locale: LocaleCode, variant: BadBunnyAriaEventbritePayload['variant'], keyword: string, images: BadBunnyAriaEventbritePayload['imagePlan']): string {
  const content = getBadBunnyAriaLocalizedContent(locale);
  const pack = getEventLocalePack(locale)!;
  const copy = BAD_BUNNY_ARIA_EDITORIAL_COPY[locale];
  const confirmation = getEventbriteConfirmationPlainText(locale, BAD_BUNNY_ARIA_PHONE);
  const faqs = content.faqs.map((faq, index) => `<h3 data-event-faq="true">${escapeHtml(faq.question)}</h3><p>${escapeHtml(index < 5 ? `${keyword}. ${faq.answer}` : faq.answer)}</p>`).join('');
  const offers = content.offers.map((offer) => `<li>${escapeHtml(offer.name)} — EUR ${offer.price}</li>`).join('');
  const programme = content.programme.map((slot) => `<li><strong>${escapeHtml(`${slot.start}–${slot.end}`)}:</strong> ${escapeHtml(slot.title)}</li>`).join('');
  return [
    `<h2>${escapeHtml(content.title)} · Aria Club Milano</h2>`,
    `<p><strong>${escapeHtml(keyword)}.</strong> ${escapeHtml(content.answerFirst || content.seoSummary)}</p>`,
    `<h2>${escapeHtml(pack.eventbrite.contactsTitle)}</h2>`,
    '<ul data-contact-list="true">',
    `<li><strong>${escapeHtml(pack.eventbrite.buyTickets)}:</strong> <a href="${escapeHtml(BAD_BUNNY_ARIA_AFFILIATE_URL)}">Xceed · Nightlife Milan</a>.</li>`,
    `<li><strong>${escapeHtml(pack.eventbrite.bookTable)}:</strong> <a href="${escapeHtml(BAD_BUNNY_ARIA_AFFILIATE_URL)}">Xceed · Nightlife Milan</a>.</li>`,
    `<li><strong>WhatsApp:</strong> <a href="${BAD_BUNNY_ARIA_WHATSAPP}">${escapeHtml(BAD_BUNNY_ARIA_PHONE)}</a>.</li>`,
    `<li><strong>${escapeHtml(pack.eventbrite.fullGuide)}:</strong> <a href="${escapeHtml(getBadBunnyAriaSiteUrl(locale))}">${escapeHtml(content.title)}</a>.</li>`,
    '</ul>',
    imageHtml(images[0]),
    `<h2>${escapeHtml(pack.eventbrite.programmeTitle)}</h2><ul>${programme}</ul>`,
    imageHtml(images[1]), imageHtml(images[2]), imageHtml(images[3]), imageHtml(images[4]),
    `<h2>${escapeHtml(pack.eventbrite.importantTitle)}</h2><p>${escapeHtml(copy.independentNotice)}</p>`,
    ...content.sections.slice(1).flatMap((section) => [`<h2>${escapeHtml(section.title)}</h2>`, `<p>${escapeHtml(section.body)}</p>`]),
    `<h2>${escapeHtml(pack.eventbrite.offersTitle)}</h2><ul>${offers}</ul>`,
    `<p>${escapeHtml(BAD_BUNNY_ARIA_ADDRESS)} · 18+ · 19:30–05:00.</p>`,
    `<h2>${escapeHtml(pack.eventbrite.importantTitle)} · Eventbrite</h2><p>${escapeHtml(confirmation.notTicket)} ${escapeHtml(confirmation.purchase)} ${escapeHtml(confirmation.afterPurchase)}</p>`,
    `<h2>${escapeHtml(pack.eventbrite.faqTitle)}</h2>`, faqs,
    `<!-- nlm:curated=bad-bunny-aria-v${variant}-${locale}-2026-07-18 -->`,
  ].join('');
}

export function buildBadBunnyAriaEventbritePayloads(locale: LocaleCode = 'it', eventbriteCdnUrls?: readonly [string, string, string, string, string, string]): BadBunnyAriaEventbritePayload[] {
  const localeDef = getLocaleDef(locale);
  const pack = getEventLocalePack(locale);
  if (!localeDef || !pack) throw new Error(`Bad Bunny Eventbrite locale is unavailable: ${locale}`);
  const content = getBadBunnyAriaLocalizedContent(locale);
  const copy = BAD_BUNNY_ARIA_EDITORIAL_COPY[locale];
  const confirmation = getEventbriteConfirmationPlainText(locale, BAD_BUNNY_ARIA_PHONE);
  const profile = getEventBatchProfile(BAD_BUNNY_ARIA_CANONICAL_SLUG);
  if (!profile) throw new Error('Bad Bunny event batch profile is unavailable');
  const values = getBatchEventTemplateValues(profile, locale, pack);
  const fill = (value: string) => interpolateEventBatchTemplate(value, values);
  const keywords = locale === 'it' ? [...BAD_BUNNY_ARIA_KEYWORDS_IT] : KEYWORD_INDEXES.map((index) => fill(pack.seoKeywords[index]));
  const base = baseImagePlan(locale);
  const coverImage = eventbriteCdnUrls ? { ...base.cover, src: eventbriteCdnUrls[0] } : base.cover;
  const imagePlan = (eventbriteCdnUrls ? base.body.map((image, index) => ({ ...image, src: eventbriteCdnUrls[index + 1] })) : base.body) as BadBunnyAriaEventbritePayload['imagePlan'];
  return keywords.map((keyword, index) => {
    const variant = (index + 1) as BadBunnyAriaEventbritePayload['variant'];
    const title = locale === 'it' ? ITALIAN_TITLES[index] : clamp(`Bad Bunny · ${keyword} | Aria Club Milano`, 75);
    const marker = `nlm:curated=bad-bunny-aria-v${variant}-${locale}-2026-07-18`;
    const payload: BadBunnyAriaEventbritePayload = {
      locale, eventbriteLocale: localeDef.ebLocale, variant, keyword, title,
      summary: content.seoSummary,
      requiredLead: content.answerFirst || content.seoSummary,
      marker,
      canonicalSiteUrl: getBadBunnyAriaSiteUrl(locale),
      affiliateUrl: BAD_BUNNY_ARIA_AFFILIATE_URL,
      ticketName: clamp(`${pack.eventbrite.importantTitle} · Eventbrite · INFO`, 50),
      ticketDescription: confirmation.notTicket,
      orderConfirmation: buildEventbriteConfirmationHtml(locale, [BAD_BUNNY_ARIA_AFFILIATE_URL], { heading: title, details: `18.07.2026 · 19:30–05:00 · 18+. ${copy.independentNotice}` }),
      coverImage, imagePlan,
      descriptionHtml: renderDescription(locale, variant, keyword, imagePlan),
    };
    validateBadBunnyAriaEventbritePayload(payload, Boolean(eventbriteCdnUrls));
    return payload;
  });
}

export function validateBadBunnyAriaEventbritePayload(payload: BadBunnyAriaEventbritePayload, requireEventbriteCdn = false): void {
  if (!payload.title.includes('Bad Bunny') || [...payload.title].length > 75) throw new Error(`${payload.marker}: invalid title`);
  if (/\{[a-zA-Z][^}]*\}/u.test(`${payload.keyword} ${payload.title} ${payload.descriptionHtml}`)) throw new Error(`${payload.marker}: unresolved template token`);
  if ([...payload.summary].length > 140 || !payload.summary.includes(BAD_BUNNY_ARIA_PHONE)) throw new Error(`${payload.marker}: invalid summary`);
  if (!payload.descriptionHtml.includes(`<!-- ${payload.marker} -->`) || !payload.descriptionHtml.includes(payload.requiredLead.replaceAll("'", '&#39;'))) throw new Error(`${payload.marker}: marker or lead missing`);
  if (!payload.descriptionHtml.includes(payload.canonicalSiteUrl) || !payload.descriptionHtml.includes(BAD_BUNNY_ARIA_AFFILIATE_URL)) throw new Error(`${payload.marker}: canonical or affiliate link missing`);
  if (!payload.descriptionHtml.includes(escapeHtml(BAD_BUNNY_ARIA_EDITORIAL_COPY[payload.locale].independentNotice))) throw new Error(`${payload.marker}: independent-event disclaimer missing`);
  if (!payload.descriptionHtml.includes(BAD_BUNNY_ARIA_ADDRESS) || !payload.descriptionHtml.includes('18+')) throw new Error(`${payload.marker}: venue or age facts missing`);
  for (const price of [15, 20, 200, 500, 600]) if (!payload.descriptionHtml.includes(`EUR ${price}`)) throw new Error(`${payload.marker}: EUR ${price} missing`);
  if ((payload.descriptionHtml.match(/<img\b/gi) || []).length !== 5) throw new Error(`${payload.marker}: five images required`);
  if ((payload.descriptionHtml.match(new RegExp(`style="${IMAGE_STYLE}"`, 'g')) || []).length !== 5) throw new Error(`${payload.marker}: responsive image style missing`);
  if ((payload.descriptionHtml.match(/data-event-faq="true"/g) || []).length !== 25) throw new Error(`${payload.marker}: 25 FAQs required`);
  if (payload.descriptionHtml.indexOf('data-contact-list="true"') > payload.descriptionHtml.indexOf(imageHtml(payload.imagePlan[0]))) throw new Error(`${payload.marker}: poster must follow contacts`);
  if (payload.descriptionHtml.length > DESCRIPTION_LIMIT) throw new Error(`${payload.marker}: description exceeds ${DESCRIPTION_LIMIT}`);
  if (/<br\s*\/?\s*>/i.test(payload.descriptionHtml) || /\p{Extended_Pictographic}/u.test(payload.descriptionHtml)) throw new Error(`${payload.marker}: forbidden Eventbrite content`);
  if (!payload.orderConfirmation.includes(BAD_BUNNY_ARIA_AFFILIATE_URL) || !payload.orderConfirmation.includes(BAD_BUNNY_ARIA_PHONE) || !payload.orderConfirmation.includes(escapeHtml(payload.ticketDescription))) throw new Error(`${payload.marker}: incomplete order confirmation`);
  if (requireEventbriteCdn && [payload.coverImage, ...payload.imagePlan].some((image) => !/^https:\/\/(?:img|cdn)\.evbuc\.com\//i.test(image.src))) throw new Error(`${payload.marker}: Eventbrite CDN images required`);
}
