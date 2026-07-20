import {
  getBatchEventTemplateValues,
  interpolateEventBatchTemplate,
} from './eventBatchContent';
import { buildEventbriteConfirmationHtml, getEventbriteConfirmationPlainText } from './eventbriteConfirmation';
import { getEventLocalePack } from './eventLocalePacks';
import { getLocaleDef, type LocaleCode } from './i18n/locales';
import {
  GUE_JUST_ME_AFFILIATE_URL,
  GUE_JUST_ME_ADDRESS,
  GUE_JUST_ME_CANONICAL_SLUG,
  GUE_JUST_ME_EVENTBRITE_NAMES,
  GUE_JUST_ME_EVENT_PROFILE,
  GUE_JUST_ME_LIVE_LABELS,
  GUE_JUST_ME_PHONE,
  GUE_JUST_ME_SEARCH_NAME,
  GUE_JUST_ME_SITE,
  GUE_JUST_ME_WHATSAPP,
  getGueJustMeEventbriteImagePath,
  getGueJustMeSiteUrl,
} from './gueJustMe';
import { getGueJustMeLocalizedContent } from './gueJustMeLocales';

const DESCRIPTION_LIMIT = 16_000;
const IMAGE_STYLE = 'display:block;width:100%;max-width:100%;height:auto';
const KEYWORD_INDEXES = [0, 2, 3, 4, 5, 6, 7, 9, 13, 14] as const;
const ENGLISH_SEARCH_INTENTS = [
  'Guè Pequeno live Milan',
  'Guè Pequeno tickets Milan',
  'Guè live at Just Me Milano',
  'Italian rap concert Milan',
  'hip hop event Milan',
  'Milan nightlife July 25 2026',
  'Just Me Milano event',
  'VIP table Milan',
  'guest list Milan',
  'live music Milan',
] as const;

const ENGLISH_REQUIRED_LEAD = 'Guè, widely searched by fans as Guè Pequeno, performs at Just Me Milano on Saturday, 25 July 2026. Doors open at 19:30 for aperitivo and dinner, club entry starts at 22:30, and the night runs until 05:00. The event is 21+. Guè\'s exact stage time has not been published.';
const ENGLISH_PILOT_SUMMARY = 'Guè Pequeno live at Just Me Milano, 25 July 2026: 21+ aperitivo, club night and VIP tables. Buy official tickets; WhatsApp +39 351 912 7047.';

const ENGLISH_SEO_FAQS = [
  ['What is the Guè Pequeno live event in Milan?', 'It is a 21+ Just Me Milano night on 25 July 2026 with aperitivo, optional dinner, a Guè live performance and a club programme until 05:00.'],
  ['When is Guè Pequeno performing at Just Me Milano?', 'The event is on Saturday, 25 July 2026. Doors open at 19:30 and the night ends at 05:00.'],
  ['What time do doors open for the Guè event?', 'Doors open at 19:30 for aperitivo and dinner. Club admission starts at 22:30.'],
  ['What time will Guè Pequeno perform?', 'Guè performs during the club programme, but his exact stage time has not been published. Check this listing before travelling.'],
  ['Where is the Guè live event in Milan?', `The venue is Just Me Milano, ${GUE_JUST_ME_ADDRESS}, beneath Torre Branca in Parco Sempione.`],
  ['How do I buy Guè Pequeno tickets for Milan?', `Buy the valid admission product through the exact Xceed link in this listing, then send the purchase confirmation to WhatsApp ${GUE_JUST_ME_PHONE}.`],
  ['Is the Eventbrite registration an admission ticket?', 'No. The free Eventbrite registration is an information request and does not grant entry. Valid admission must be purchased on Xceed.'],
  ['Can I book a VIP table for Guè at Just Me Milano?', 'Yes. Dance-floor, VIP and Super VIP table options are listed on Xceed, subject to live availability.'],
  ['How much is entry to the Guè Pequeno event?', 'The verified offers shown are EUR 15 for aperitivo with one drink and EUR 20 for club entry with one drink, subject to Xceed availability.'],
  ['How much are VIP tables at Just Me Milano?', 'Verified table tiers are EUR 320, EUR 640, EUR 1,280, EUR 3,200 and EUR 5,000, with different capacities and inclusions.'],
  ['What is the minimum age for this Milan nightlife event?', 'The event is 21+. Bring a valid original identity document because admission remains subject to the venue checks.'],
  ['What is the dress code for Guè at Just Me Milano?', 'The dress code is elegant. Long trousers are required for men, according to the current Xceed event information.'],
  ['Are long trousers required for men?', 'Yes. The current official event information states that long trousers are required for men.'],
  ['Is aperitivo available before the live performance?', 'Yes. Aperitivo entry begins at 19:30 and includes access to the buffet and party under the selected Xceed offer.'],
  ['Can I book dinner at Just Me Milano?', 'Yes. A served dinner can be requested separately; confirm the dinner option and availability before arrival.'],
  ['What time does the club programme begin?', 'Club admission begins at 22:30. The Guè live performance takes place during the club programme at an unpublished time.'],
  ['What time does the Just Me Milano event finish?', 'The published end time is 05:00 on Sunday, 26 July 2026.'],
  ['What music will be played at the event?', 'The official music categories are house, hip-hop and hits, with Guè adding an Italian rap live performance.'],
  ['Who is this Guè Pequeno Milan event for?', 'It is designed for a 21+ audience, including Guè and Italian rap fans, international visitors, groups and guests seeking VIP tables.'],
  ['Will guests be close to Guè during the performance?', 'This is a club-format appearance, but viewing position and distance from the stage are not guaranteed and depend on the selected admission area.'],
  ['Do I need identification to enter Just Me Milano?', 'Yes. Bring a valid original identity document. Entry remains subject to age, dress code, ticket and venue checks.'],
  ['Is the event suitable for groups?', `Yes. Groups can buy admission or request a table. Send the group size and purchase confirmation to WhatsApp ${GUE_JUST_ME_PHONE}.`],
  ['What should I send on WhatsApp after buying?', `Send your name, the event date, group size and Xceed purchase confirmation to ${GUE_JUST_ME_PHONE}.`],
  ['Where can I check current ticket and table availability?', 'Use the exact Xceed link in this listing. Xceed availability and inclusions at the time of purchase take precedence.'],
  ['Where can I find the full Guè Pequeno event guide?', 'Use the Nightlife Milan guide linked in the contacts section for the programme, venue details, dress code, FAQs and updates.'],
] as const;

export interface GueEventbriteImagePlan {
  src: string;
  title: string;
  alt: string;
}

export interface GueEventbriteLocalePayload {
  locale: LocaleCode;
  eventbriteLocale: string;
  variant: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  keyword: string;
  title: string;
  legacyTitle: string;
  summary: string;
  requiredLead: string;
  marker: string;
  canonicalSiteUrl: string;
  affiliateUrl: string;
  ticketName: string;
  ticketDescription: string;
  orderConfirmation: string;
  coverImage: GueEventbriteImagePlan;
  imagePlan: readonly [
    GueEventbriteImagePlan,
    GueEventbriteImagePlan,
    GueEventbriteImagePlan,
    GueEventbriteImagePlan,
    GueEventbriteImagePlan,
  ];
  descriptionHtml: string;
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function truncate(value: string, limit: number): string {
  const normalized = value.replace(/\s+/g, ' ').trim();
  if ([...normalized].length <= limit) return normalized;
  return `${[...normalized].slice(0, limit - 1).join('').replace(/[\s,;:.-]+$/u, '')}…`;
}

function summaryWithPhone(keyword: string, eventName: string): string {
  const suffix = ` WhatsApp ${GUE_JUST_ME_PHONE}.`;
  const prefixLimit = 140 - [...suffix].length;
  const source = `${keyword}. ${eventName}. 25.07.2026, 19:30–05:00, 21+. Tickets and VIP tables.`.replace(/\s+/g, ' ').trim();
  const points = [...source];
  const prefix = points.length > prefixLimit
    ? `${points.slice(0, Math.max(0, prefixLimit - 1)).join('').replace(/[\s,;:.-]+$/u, '')}…`
    : source;
  // The Eventbrite preview is derived from visible body text.  Fill any spare
  // characters with factual age information, then cut only the optional tail.
  const exactPrefix = [...`${prefix} 21+`.trimEnd().padEnd(prefixLimit, ' ')].slice(0, prefixLimit).join('').replace(/\s+$/u, '');
  const remaining = prefixLimit - [...exactPrefix].length;
  return `${exactPrefix}${remaining > 0 ? '·'.repeat(remaining) : ''}${suffix}`;
}

export function getGueEventbriteRequiredLead(locale: LocaleCode): string {
  if (locale === 'en') return ENGLISH_REQUIRED_LEAD;
  const content = getGueJustMeLocalizedContent(locale);
  return content.answerFirst || content.seoSummary;
}

function summaryForLocale(locale: LocaleCode, keyword: string): string {
  if (locale === 'en') {
    return ENGLISH_PILOT_SUMMARY;
  }
  return summaryWithPhone(keyword, GUE_JUST_ME_EVENTBRITE_NAMES[locale]);
}

function images(locale: LocaleCode): { cover: GueEventbriteImagePlan; body: GueEventbriteLocalePayload['imagePlan'] } {
  const content = getGueJustMeLocalizedContent(locale);
  const pack = getEventLocalePack(locale)!;
  const eventName = GUE_JUST_ME_EVENTBRITE_NAMES[locale];
  const posterAlt = locale === 'en'
    ? 'Guè beside Torre Branca with the GUÈ and Just Me Milano logos, date, entry times, 21+ rule and elegant dress code'
    : `${content.title}, Just Me Milano, 25.07.2026, Guè e Torre Branca`;
  const body = [
    { src: `${GUE_JUST_ME_SITE}${getGueJustMeEventbriteImagePath(locale, 'poster')}`, title: locale === 'en' ? 'Guè Pequeno live at Just Me Milano — event poster' : eventName, alt: posterAlt },
    { src: `${GUE_JUST_ME_SITE}${getGueJustMeEventbriteImagePath(locale, 'performance')}`, title: locale === 'en' ? 'Guè live performance at Just Me Milano' : GUE_JUST_ME_LIVE_LABELS[locale], alt: locale === 'en' ? 'Guè holding a microphone in front of guests and the illuminated Torre Branca structure' : `${content.title}, ${GUE_JUST_ME_LIVE_LABELS[locale]}, Just Me Milano` },
    { src: `${GUE_JUST_ME_SITE}${getGueJustMeEventbriteImagePath(locale, 'target')}`, title: locale === 'en' ? 'International 21+ guests at Just Me Milano' : '21+', alt: locale === 'en' ? 'International guests seated with drinks in the Just Me Milano lounge under magenta lighting' : `${content.title}, 21+, Just Me Milano lounge` },
    { src: `${GUE_JUST_ME_SITE}${getGueJustMeEventbriteImagePath(locale, 'dress')}`, title: locale === 'en' ? 'Elegant dress code at Just Me Milano' : content.sections[0].title, alt: locale === 'en' ? 'Guests in elegant black evening outfits arriving beside Torre Branca and Just Me Milano' : `${content.title}, ${content.sections[0].body}, Just Me Milano` },
    { src: `${GUE_JUST_ME_SITE}${getGueJustMeEventbriteImagePath(locale, 'programme')}`, title: locale === 'en' ? 'Aperitivo and club programme at Just Me Milano' : pack.eventbrite.programmeTitle, alt: locale === 'en' ? 'Guests at aperitivo tables beneath the illuminated Torre Branca before the club programme' : `${content.title}, 19:30–05:00, Just Me Milano aperitivo` },
  ] as const;
  return {
    cover: { src: `${GUE_JUST_ME_SITE}${getGueJustMeEventbriteImagePath(locale, 'cover')}`, title: locale === 'en' ? 'Guè Pequeno live at Just Me Milano — Eventbrite cover' : eventName, alt: posterAlt },
    body,
  };
}

function imageHtml(image: GueEventbriteImagePlan): string {
  return `<p><img src="${escapeHtml(image.src)}" alt="${escapeHtml(image.alt)}" title="${escapeHtml(image.title)}" style="${IMAGE_STYLE}"></p>`;
}

function renderEnglishDescription(
  variant: GueEventbriteLocalePayload['variant'],
  keyword: string,
  imagePlan: GueEventbriteLocalePayload['imagePlan'],
): string {
  const content = getGueJustMeLocalizedContent('en');
  const url = getGueJustMeSiteUrl('en');
  const offerDetails = ['1 person', '1 person', '5 people, 1 bottle', '10 people, 2 bottles', '10 people, 2 bottles', '15 people, bottle spend by menu', '15 people, bottle spend by menu'];
  const offers = content.offers.map((offer, index) => `<li><strong>${escapeHtml(offer.name)}:</strong> EUR ${offer.price}; ${offerDetails[index]}</li>`).join('');
  const faqs = ENGLISH_SEO_FAQS.map(([question, answer]) => `<h3 data-event-faq="true">${escapeHtml(question)}</h3><p>${escapeHtml(answer)}</p>`).join('');

  return [
    `<p>${escapeHtml(ENGLISH_PILOT_SUMMARY)} ${escapeHtml(ENGLISH_REQUIRED_LEAD)} Guests searching for ${escapeHtml(keyword)} can use the official details below.</p>`,
    '<h2>Tickets, tables and contacts</h2>',
    '<ul data-contact-list="true">',
    `<li><strong>Official tickets:</strong> <a href="${escapeHtml(GUE_JUST_ME_AFFILIATE_URL)}">buy the valid admission product on Xceed</a>.</li>`,
    `<li><strong>VIP tables and bottle service:</strong> <a href="${escapeHtml(GUE_JUST_ME_AFFILIATE_URL)}">check the live Xceed table options</a>.</li>`,
    `<li><strong>WhatsApp concierge:</strong> <a href="${GUE_JUST_ME_WHATSAPP}">${escapeHtml(GUE_JUST_ME_PHONE)}</a>.</li>`,
    `<li><strong>After purchase:</strong> send your name, date, group size and Xceed purchase confirmation to WhatsApp ${escapeHtml(GUE_JUST_ME_PHONE)}.</li>`,
    `<li><strong>Full event guide:</strong> <a href="${escapeHtml(url)}">programme, venue details, dress code and updates</a>.</li>`,
    '</ul>',
    imageHtml(imagePlan[0]),
    '<h2>Event overview</h2>',
    '<p>This is a rare club-format appearance by Guè Pequeno at the landmark Just Me venue beneath Torre Branca. After Club Dogo\'s ten sold-out Forum dates and San Siro show, the format moves from arena scale to a Milan nightlife setting built around aperitivo, optional dinner, a live guest performance and late-night club music. Viewing position is not guaranteed, and the exact stage schedule remains unpublished.</p>',
    '<h2>Agenda and entry times</h2>',
    '<ul>',
    '<li><strong>19:30:</strong> doors open, check-in, aperitivo and dinner arrivals.</li>',
    '<li><strong>19:30–22:30:</strong> buffet aperitivo and optional served dinner.</li>',
    '<li><strong>22:30:</strong> club admission and the late-night programme begin.</li>',
    '<li><strong>During the club programme:</strong> Guè Pequeno live performance; exact stage time not yet published.</li>',
    '<li><strong>After the live performance–05:00:</strong> house, hip-hop and hits continue.</li>',
    '</ul>',
    '<h2>Complete programme</h2>',
    '<ul>',
    '<li><strong>Aperitivo and dinner:</strong> arrivals from 19:30, buffet access under the selected aperitivo offer, and optional served dinner by reservation.</li>',
    '<li><strong>Club opening:</strong> club-entry products become valid from 22:30 and the late-night programme starts.</li>',
    '<li><strong>Guè Pequeno live:</strong> the performance is scheduled within the club phase; the exact stage time has not been published.</li>',
    '<li><strong>Late-night music:</strong> house, hip-hop and hits continue after the performance until the published 05:00 closing time.</li>',
    '</ul>',
    '<p>The Xceed offer selected at checkout defines the admission time, drinks, table capacity and inclusions.</p>',
    imageHtml(imagePlan[1]),
    '<h2>Target audience</h2>',
    '<p>A 21+ crowd of Guè and Italian rap fans, international visitors, couples, groups and guests looking for a premium Milan club night or a bookable VIP table.</p>',
    imageHtml(imagePlan[2]),
    '<h2>Dress code</h2>',
    '<p>Elegant evening wear is required. Long trousers are required for men under the current official event information. Admission remains subject to the venue check.</p>',
    imageHtml(imagePlan[3]),
    '<h2>Mood and setting</h2>',
    '<p>The night moves from a relaxed aperitivo beneath Torre Branca to a high-energy club atmosphere. The venue combines outdoor lounge areas, dinner service, dance-floor access and premium table sections.</p>',
    '<h2>Music</h2>',
    '<p>Guè brings the Italian rap live moment. The published club music categories are house, hip-hop and hits.</p>',
    '<h2>Venue and access</h2>',
    `<p><strong>Just Me Milano</strong> — ${escapeHtml(GUE_JUST_ME_ADDRESS)}. Bring a valid original identity document. The event is 21+, and admission is subject to the selected Xceed product, age, dress code and venue controls.</p>`,
    imageHtml(imagePlan[4]),
    '<h2>Tickets and VIP table offers</h2>',
    `<ul>${offers}</ul>`,
    '<p>Prices, capacity, inclusions and availability shown on Xceed at checkout take precedence over this information.</p>',
    '<h2>Important booking information</h2>',
    `<p>The free Eventbrite registration is an information request and is not an admission ticket. Buy only through the exact Xceed link above, then send the purchase confirmation to WhatsApp ${escapeHtml(GUE_JUST_ME_PHONE)}. Guè's exact performance time has not been published.</p>`,
    '<h2>Frequently asked questions</h2>',
    faqs,
    '<h2 data-seo-closing="true">Guè Pequeno live in Milan: tickets, nightlife and VIP tables</h2>',
    '<p>For guests planning a Milan nightlife night around Guè Pequeno live, this Just Me Milano event combines an Italian rap performance with aperitivo, a 21+ hip-hop club programme and bookable VIP tables. Use the official Xceed route for Guè Pequeno tickets in Milan, then confirm the purchase with the Nightlife Milan concierge on WhatsApp.</p>',
    `<!-- nlm:curated=gue-v${variant}-en-2026-07-25 -->`,
  ].join('');
}

function renderDescription(locale: LocaleCode, variant: GueEventbriteLocalePayload['variant'], keyword: string, imagePlan: GueEventbriteLocalePayload['imagePlan']): string {
  if (locale === 'en') return renderEnglishDescription(variant, keyword, imagePlan);
  const content = getGueJustMeLocalizedContent(locale);
  const pack = getEventLocalePack(locale)!;
  const url = getGueJustMeSiteUrl(locale);
  const summary = summaryForLocale(locale, keyword);
  const programme = content.programme.map((slot) => `<li><strong>${escapeHtml(slot.start)}${slot.end ? `–${escapeHtml(slot.end)}` : ''}</strong> — ${escapeHtml(slot.title)}</li>`).join('');
  const sections = content.sections.map((section) => `<h2>${escapeHtml(section.title)}</h2><p>${escapeHtml(section.body)}</p>`).join('');
  const moodImages = imagePlan.slice(1).map(imageHtml).join('');
  const offerDetails = ['1 pax', '1 pax', '5 pax · 1 bottle', '10 pax · 2 bottles', '10 pax · 2 bottles', '15 pax · menu', '15 pax · menu'];
  const offers = content.offers.map((offer, index) => `<li>${escapeHtml(offer.name)} — EUR ${offer.price} · ${offerDetails[index]}</li>`).join('');
  const faqs = content.faqs.map((faq, index) => {
    const question = index < 5 ? `${keyword} — ${faq.question}` : faq.question;
    const answer = index < 5 ? `${keyword}. ${faq.answer}` : faq.answer;
    return `<h3 data-event-faq="true">${escapeHtml(question)}</h3><p>${escapeHtml(answer)}</p>`;
  }).join('');

  return [
    `<p>${escapeHtml(summary)} ${escapeHtml(content.answerFirst || content.seoSummary)}</p>`,
    `<h2>${escapeHtml(pack.eventbrite.contactsTitle)}</h2>`,
    '<ul data-contact-list="true">',
    `<li><strong>${escapeHtml(pack.eventbrite.buyTickets)}:</strong> <a href="${escapeHtml(GUE_JUST_ME_AFFILIATE_URL)}">${escapeHtml(GUE_JUST_ME_AFFILIATE_URL)}</a></li>`,
    `<li><strong>${escapeHtml(pack.eventbrite.bookTable)}:</strong> <a href="${escapeHtml(GUE_JUST_ME_AFFILIATE_URL)}">${escapeHtml(GUE_JUST_ME_AFFILIATE_URL)}</a></li>`,
    `<li><strong>WhatsApp:</strong> <a href="${GUE_JUST_ME_WHATSAPP}">${escapeHtml(GUE_JUST_ME_PHONE)}</a></li>`,
    `<li><strong>${escapeHtml(pack.eventbrite.fullGuide)}:</strong> <a href="${escapeHtml(url)}">${escapeHtml(url)}</a></li>`,
    '</ul><!-- legacy inline contacts retained in source for backwards diff only',
    `<p><a href="${escapeHtml(GUE_JUST_ME_AFFILIATE_URL)}">${escapeHtml(pack.eventbrite.buyTickets)}</a> · <a href="${escapeHtml(GUE_JUST_ME_AFFILIATE_URL)}">${escapeHtml(pack.eventbrite.bookTable)}</a> · <a href="${GUE_JUST_ME_WHATSAPP}">WhatsApp ${escapeHtml(GUE_JUST_ME_PHONE)}</a> · <a href="${escapeHtml(url)}">${escapeHtml(pack.eventbrite.fullGuide)}</a></p>`,
    '-->',
    imageHtml(imagePlan[0]),
    `<h2>${escapeHtml(keyword)}</h2>`,
    `<h2>${escapeHtml(pack.eventbrite.programmeTitle)}</h2><ul>${programme}</ul>`,
    sections,
    `<h2>${escapeHtml(pack.sectionTitles.access)}</h2><p><strong>Just Me Milano</strong> — ${escapeHtml(GUE_JUST_ME_ADDRESS)}. ${escapeHtml(content.venueDescription || '')}</p>`,
    moodImages,
    `<h2>${escapeHtml(pack.eventbrite.offersTitle)}</h2><ul>${offers}</ul>`,
    `<h2>${escapeHtml(pack.eventbrite.importantTitle)}</h2><p>${escapeHtml(pack.eventbrite.importantBody)}</p>`,
    `<h2>${escapeHtml(pack.eventbrite.faqTitle)}</h2>${faqs}`,
    `<h2 data-seo-closing="true">${escapeHtml(keyword)}</h2><p>${escapeHtml(keyword)}. ${escapeHtml(content.title)}. Just Me Milano, 25.07.2026, 21+, 19:30–05:00. ${escapeHtml(pack.eventbrite.buyTickets)}: WhatsApp ${GUE_JUST_ME_PHONE}.</p>`,
    `<!-- nlm:curated=gue-v${variant}-${locale}-2026-07-25 -->`,
  ].join('');
}

export function buildGueEventbriteLocalePayloads(
  locale: LocaleCode,
  eventbriteCdnUrls?: readonly [string, string, string, string, string, string],
): GueEventbriteLocalePayload[] {
  const profile = {
    ...GUE_JUST_ME_EVENT_PROFILE,
    eventName: {
      ...GUE_JUST_ME_EVENT_PROFILE.eventName,
      en: GUE_JUST_ME_EVENTBRITE_NAMES[locale],
      it: GUE_JUST_ME_EVENTBRITE_NAMES[locale],
    },
  };
  const pack = getEventLocalePack(locale);
  const localeDef = getLocaleDef(locale);
  if (!pack || !localeDef) throw new Error(`Unsupported Guè Eventbrite locale: ${locale}`);
  const values = getBatchEventTemplateValues(profile, locale, pack);
  const fill = (value: string) => interpolateEventBatchTemplate(value, values);
  const legacyKeywordIntents = KEYWORD_INDEXES.map((index) => fill(pack.seoKeywords[index]));
  const keywordIntents = locale === 'en' ? [...ENGLISH_SEARCH_INTENTS] : legacyKeywordIntents;
  const content = getGueJustMeLocalizedContent(locale);
  const baseImages = images(locale);
  const coverImage = eventbriteCdnUrls ? { ...baseImages.cover, src: eventbriteCdnUrls[0] } : baseImages.cover;
  const imagePlan = (eventbriteCdnUrls
    ? baseImages.body.map((image, index) => ({ ...image, src: eventbriteCdnUrls[index + 1] }))
    : baseImages.body) as GueEventbriteLocalePayload['imagePlan'];

  return keywordIntents.map((keyword, index) => {
    const variant = (index + 1) as GueEventbriteLocalePayload['variant'];
    const title = locale === 'en'
      ? truncate(`${keyword} | Just Me Milano · 25 July 2026`, 75)
      : truncate(`${keyword} | ${GUE_JUST_ME_SEARCH_NAME} · Just Me Milano`, 75);
    const legacyTitle = truncate(`${legacyKeywordIntents[index]} | Guè · Just Me Milano`, 75);
    const confirmation = getEventbriteConfirmationPlainText(locale, GUE_JUST_ME_PHONE);
    const payload: GueEventbriteLocalePayload = {
      locale,
      eventbriteLocale: localeDef.ebLocale,
      variant,
      keyword,
      title,
      legacyTitle,
      summary: summaryForLocale(locale, keyword),
      requiredLead: getGueEventbriteRequiredLead(locale),
      marker: `nlm:curated=gue-v${variant}-${locale}-2026-07-25`,
      canonicalSiteUrl: getGueJustMeSiteUrl(locale),
      affiliateUrl: GUE_JUST_ME_AFFILIATE_URL,
      ticketName: truncate(`${pack.eventbrite.seoLabel}: ${GUE_JUST_ME_EVENTBRITE_NAMES[locale]}`, 75),
      ticketDescription: confirmation.notTicket,
      orderConfirmation: buildEventbriteConfirmationHtml(locale, [GUE_JUST_ME_AFFILIATE_URL], {
        heading: GUE_JUST_ME_EVENTBRITE_NAMES[locale],
        details: getGueEventbriteRequiredLead(locale),
      }),
      coverImage,
      imagePlan,
      descriptionHtml: renderDescription(locale, variant, keyword, imagePlan),
    };
    validateGueEventbriteLocalePayload(payload, Boolean(eventbriteCdnUrls));
    return payload;
  });
}

export function validateGueEventbriteLocalePayload(payload: GueEventbriteLocalePayload, requireEventbriteCdn = false): void {
  if ([...payload.title].length > 75) throw new Error(`${payload.marker}: title exceeds 75 characters`);
  if ([...payload.summary].length !== 140 || !payload.summary.includes(GUE_JUST_ME_PHONE)) throw new Error(`${payload.marker}: invalid summary`);
  if (payload.locale === 'en' && ([...payload.summary].length !== 140 || payload.summary !== ENGLISH_PILOT_SUMMARY)) {
    throw new Error(`${payload.marker}: English pilot summary must be the exact 140-codepoint approved copy`);
  }
  if (!payload.descriptionHtml.includes(`<!-- ${payload.marker} -->`)) throw new Error(`${payload.marker}: marker missing`);
  if (!payload.descriptionHtml.includes(payload.canonicalSiteUrl)) throw new Error(`${payload.marker}: same-language canonical missing`);
  if (!payload.descriptionHtml.includes(GUE_JUST_ME_AFFILIATE_URL) || !payload.descriptionHtml.includes(GUE_JUST_ME_PHONE)) throw new Error(`${payload.marker}: contacts missing`);
  if ((payload.descriptionHtml.match(/<img\b/gi) || []).length !== 5) throw new Error(`${payload.marker}: five images required`);
  if ((payload.descriptionHtml.match(new RegExp(`style="${IMAGE_STYLE}"`, 'g')) || []).length !== 5) throw new Error(`${payload.marker}: responsive images required`);
  if ((payload.descriptionHtml.match(/data-event-faq="true"/g) || []).length !== 25) throw new Error(`${payload.marker}: 25 FAQs required`);
  const visible = payload.descriptionHtml
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim()
    .normalize('NFC');
  if ([...visible].slice(0, 140).join('') !== payload.summary) {
    throw new Error(`${payload.marker}: body must begin with the exact 140-codepoint summary`);
  }
  const keywordCount = payload.descriptionHtml.toLocaleLowerCase(payload.locale).split(escapeHtml(payload.keyword).toLocaleLowerCase(payload.locale)).length - 1;
  if (keywordCount < 1) throw new Error(`${payload.marker}: primary intent is not supported by the lead`);
  const pack = getEventLocalePack(payload.locale)!;
  const contacts = payload.descriptionHtml.indexOf('data-contact-list="true"');
  const poster = payload.descriptionHtml.indexOf(imageHtml(payload.imagePlan[0]), contacts);
  const programme = payload.locale === 'en'
    ? payload.descriptionHtml.indexOf('<h2>Agenda and entry times</h2>')
    : payload.descriptionHtml.indexOf(`<h2>${escapeHtml(pack.eventbrite.programmeTitle)}</h2>`);
  if (contacts < 0 || poster < contacts || poster > programme) throw new Error(`${payload.marker}: poster must immediately follow contacts`);
  if (!payload.descriptionHtml.includes('<ul data-contact-list="true">')) throw new Error(`${payload.marker}: bullet contact list missing`);
  if (!payload.descriptionHtml.includes('data-seo-closing="true"')) throw new Error(`${payload.marker}: natural SEO closing paragraph missing`);
  if (payload.locale === 'en') {
    if (!payload.descriptionHtml.includes(GUE_JUST_ME_SEARCH_NAME)) throw new Error(`${payload.marker}: Guè Pequeno search name missing`);
    if (!payload.descriptionHtml.includes(escapeHtml(payload.requiredLead))) throw new Error(`${payload.marker}: verified English lead missing`);
    if (!payload.descriptionHtml.includes('exact stage time has not been published')) throw new Error(`${payload.marker}: unpublished stage-time notice missing`);
  }
  if (!payload.descriptionHtml.includes('21+') || !payload.descriptionHtml.includes('19:30') || !payload.descriptionHtml.includes('05:00')) throw new Error(`${payload.marker}: age or programme facts missing`);
  if (!payload.descriptionHtml.includes(GUE_JUST_ME_ADDRESS)) throw new Error(`${payload.marker}: verified venue address missing`);
  for (const price of [15, 20, 320, 640, 1280, 3200, 5000]) {
    if (!payload.descriptionHtml.includes(`EUR ${price}`)) throw new Error(`${payload.marker}: verified offer EUR ${price} missing`);
  }
  if (payload.descriptionHtml.length > DESCRIPTION_LIMIT) throw new Error(`${payload.marker}: description exceeds ${DESCRIPTION_LIMIT}`);
  if (/<br\s*\/?\s*>/i.test(payload.descriptionHtml) || /\p{Extended_Pictographic}/u.test(payload.descriptionHtml)) throw new Error(`${payload.marker}: forbidden Eventbrite HTML content`);
  const confirmation = getEventbriteConfirmationPlainText(payload.locale, GUE_JUST_ME_PHONE);
  if (!payload.orderConfirmation.includes(GUE_JUST_ME_AFFILIATE_URL)
    || !payload.orderConfirmation.includes(GUE_JUST_ME_PHONE)
    || !payload.orderConfirmation.includes(escapeHtml(confirmation.notTicket))) {
    throw new Error(`${payload.marker}: native confirmation incomplete`);
  }
  if (requireEventbriteCdn && [payload.coverImage, ...payload.imagePlan].some((image) => !/^https:\/\/(?:img|cdn)\.evbuc\.com\//i.test(image.src))) {
    throw new Error(`${payload.marker}: Eventbrite CDN images required for publication`);
  }
}
