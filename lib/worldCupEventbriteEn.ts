import {
  WORLD_CUP_FINAL_AFFILIATE_URL,
  WORLD_CUP_FINAL_PHONE,
} from './worldCupFinalIt';
import {
  WORLD_CUP_FINAL_COVER_EN,
  WORLD_CUP_FINAL_EN_URL,
  WORLD_CUP_FINAL_POSTER_EN,
  WORLD_CUP_KEYWORD_EVENTS_EN,
  WORLD_CUP_ORDER_CONFIRMATION_EN,
  worldCupFinalEn,
} from './worldCupFinalEn';
import {
  getWorldCupFinalGalleryImageCopy,
  getWorldCupFinalGeneratedImagePath,
  WORLD_CUP_FINAL_VISUAL_REVISION,
} from './worldCupFinalVisuals';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function link(url: string, label: string, sponsored = false): string {
  const rel = sponsored ? 'nofollow noopener noreferrer sponsored' : 'nofollow noopener noreferrer';
  return `<a href="${escapeHtml(url)}" rel="${rel}">${escapeHtml(label)}</a>`;
}

export const WORLD_CUP_EVENTBRITE_BODY_IMAGES_EN = [
  WORLD_CUP_FINAL_POSTER_EN,
  ...getWorldCupFinalGalleryImageCopy('en').map((image) => ({
    src: getWorldCupFinalGeneratedImagePath('en', image.kind),
    title: image.title,
    alt: image.alt,
    description: image.description,
    width: image.width,
    height: image.height,
  })),
] as const;

export interface WorldCupEventbriteEnPayload {
  base: string;
  marker: string;
  lang: 'en';
  keyword: string;
  title: string;
  summary: string;
  descriptionHtml: string;
  ticketName: string;
  ticketDescription: string;
  orderConfirmation: string;
  canonicalSiteUrl: string;
  affiliateUrl: string;
  coverPath: string;
  imagePlan: typeof WORLD_CUP_EVENTBRITE_BODY_IMAGES_EN;
  faqCount: number;
  imageCount: number;
}

export function getWorldCupCuratedMarkerEn(key: string): string {
  return `nlm:curated=${key}-en-2026-07-19`;
}

function renderPoster(mediaUrls?: readonly string[]): string {
  const image = WORLD_CUP_FINAL_POSTER_EN;
  const src = mediaUrls?.[0] || `https://nightlifemilan.com${image.src}`;
  return `<h2>${escapeHtml(image.title)}</h2><p><img src="${escapeHtml(src)}" alt="${escapeHtml(image.alt)}" title="${escapeHtml(image.title)}" style="display:block;width:100%;max-width:100%;height:auto"></p>`;
}

function renderEditorialSections(mediaUrls?: readonly string[]): string {
  const imageHtml = WORLD_CUP_EVENTBRITE_BODY_IMAGES_EN.slice(1).map((image, index) => {
    const src = mediaUrls?.[index + 1] || `https://nightlifemilan.com${image.src}`;
    return `<h3>${escapeHtml(image.title)}</h3><p><img src="${escapeHtml(src)}" alt="${escapeHtml(image.alt)}" title="${escapeHtml(image.title)}" style="display:block;width:100%;max-width:100%;height:auto"></p>`;
  });
  const sectionHtml = (index: number) => `<h2>${escapeHtml(worldCupFinalEn.sections[index].title)}</h2><p>${escapeHtml(worldCupFinalEn.sections[index].body)}</p>`;
  return [
    imageHtml[0],
    sectionHtml(1),
    imageHtml[1],
    sectionHtml(0),
    imageHtml[2],
    sectionHtml(2),
    sectionHtml(3),
    imageHtml[3],
  ].join('');
}

export function renderWorldCupEventbriteEnHtml(key: string, mediaUrls?: readonly string[]): string {
  const variant = WORLD_CUP_KEYWORD_EVENTS_EN.find((item) => item.key === key);
  if (!variant) throw new Error(`Unknown English World Cup keyword event: ${key}`);
  if (mediaUrls && mediaUrls.length !== WORLD_CUP_EVENTBRITE_BODY_IMAGES_EN.length) {
    throw new Error(`Expected ${WORLD_CUP_EVENTBRITE_BODY_IMAGES_EN.length} Eventbrite body media URLs`);
  }

  const answerFirst = `<h2>At a glance: ${escapeHtml(variant.keyword)}</h2><p><strong>${escapeHtml(variant.keyword)}</strong>. ${escapeHtml(worldCupFinalEn.answerFirst || variant.summary)}</p>`;
  const contacts = [
    '<h2>Tickets, tables and confirmation</h2>',
    `<p>${link(WORLD_CUP_FINAL_AFFILIATE_URL, 'Buy tickets or book a table on Xceed', true)}</p>`,
    `<p>After payment, send your Xceed confirmation on WhatsApp to ${link(`https://wa.me/${WORLD_CUP_FINAL_PHONE.replace(/\D/g, '')}`, WORLD_CUP_FINAL_PHONE)}.</p>`,
    `<p>${link(WORLD_CUP_FINAL_EN_URL, 'Official event page: World Cup final on a big screen in Milan')}</p>`,
    '<p><strong>Important:</strong> Eventbrite registration is not an admission ticket and does not guarantee entry.</p>',
  ].join('');
  const programme = `<h2>Evening programme</h2><ul>${worldCupFinalEn.programme
    .map((slot) => `<li><strong>${escapeHtml(slot.start)}${slot.end ? `-${escapeHtml(slot.end)}` : ''}</strong>: ${escapeHtml(slot.title)}</li>`)
    .join('')}</ul>`;
  const offers = `<h2>Tickets and VIP tables</h2><ul>${worldCupFinalEn.offers
    .map((offer) => `<li><strong>${escapeHtml(offer.name)} - EUR ${offer.price}</strong>${offer.details ? `: ${escapeHtml(offer.details)}` : ''}</li>`)
    .join('')}</ul>`;
  const variantFaqs = [...variant.faqLeads, ...worldCupFinalEn.faqs.slice(5)];
  const faqs = `<h2>Frequently asked questions: ${escapeHtml(variant.keyword)}</h2>${variantFaqs
    .map((faq) => `<div data-event-faq="true"><h3>${escapeHtml(faq.question)}</h3><p>${escapeHtml(faq.answer)}</p></div>`)
    .join('')}`;
  const marker = getWorldCupCuratedMarkerEn(variant.key);

  return `${answerFirst}${contacts}${renderPoster(mediaUrls)}${programme}${renderEditorialSections(mediaUrls)}${offers}${faqs}<!-- nlm:visuals=${WORLD_CUP_FINAL_VISUAL_REVISION} --><!-- ${marker} -->`;
}

export function buildWorldCupEventbriteEnPayloads(mediaUrls?: readonly string[]): WorldCupEventbriteEnPayload[] {
  return WORLD_CUP_KEYWORD_EVENTS_EN.map((variant) => ({
    base: `nlm-world-cup-final-2026-en-${variant.key}`,
    marker: getWorldCupCuratedMarkerEn(variant.key),
    lang: 'en',
    keyword: variant.keyword,
    title: variant.title,
    summary: variant.summary,
    descriptionHtml: renderWorldCupEventbriteEnHtml(variant.key, mediaUrls),
    ticketName: 'EVENTBRITE REGISTRATION - NOT AN ADMISSION TICKET',
    ticketDescription: `Buy admission through Xceed, then send your confirmation on WhatsApp to ${WORLD_CUP_FINAL_PHONE}.`,
    orderConfirmation: WORLD_CUP_ORDER_CONFIRMATION_EN,
    canonicalSiteUrl: WORLD_CUP_FINAL_EN_URL,
    affiliateUrl: WORLD_CUP_FINAL_AFFILIATE_URL,
    coverPath: WORLD_CUP_FINAL_COVER_EN.src,
    imagePlan: WORLD_CUP_EVENTBRITE_BODY_IMAGES_EN,
    faqCount: worldCupFinalEn.faqs.length,
    imageCount: 1 + WORLD_CUP_EVENTBRITE_BODY_IMAGES_EN.length,
  }));
}

export function validateWorldCupEventbriteEnPayload(payload: WorldCupEventbriteEnPayload): void {
  if (payload.title.length > 75) throw new Error(`${payload.base} title is ${payload.title.length}/75`);
  if (payload.summary.length > 140) throw new Error(`${payload.base} summary is ${payload.summary.length}/140`);
  if (!payload.summary.includes(WORLD_CUP_FINAL_PHONE)) throw new Error(`${payload.base} summary is missing WhatsApp`);
  if (payload.faqCount !== 25) throw new Error(`${payload.base} must contain 25 FAQs`);
  if (payload.imageCount !== 6) throw new Error(`${payload.base} must contain one cover and five body images`);
  if (!payload.descriptionHtml.includes(WORLD_CUP_FINAL_AFFILIATE_URL)) throw new Error(`${payload.base} is missing the affiliate URL`);
  if ((payload.descriptionHtml.match(new RegExp(WORLD_CUP_FINAL_EN_URL.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length !== 1) {
    throw new Error(`${payload.base} must contain one visible canonical link`);
  }
  if (!payload.descriptionHtml.includes(`<!-- ${payload.marker} -->`)) throw new Error(`${payload.base} is missing the exact Eventbrite-only marker`);
  if (!payload.descriptionHtml.includes(`<!-- nlm:visuals=${WORLD_CUP_FINAL_VISUAL_REVISION} -->`)) throw new Error(`${payload.base} is missing the full-bleed visual revision`);
  if ((payload.descriptionHtml.match(/data-event-faq="true"/g) || []).length !== 25) throw new Error(`${payload.base} HTML must contain 25 FAQs`);
  if ((payload.descriptionHtml.match(/<img /g) || []).length !== 5) throw new Error(`${payload.base} HTML must contain five body images`);
  if ((payload.descriptionHtml.match(/alt="[^"]+"/g) || []).length !== 5) throw new Error(`${payload.base} body images need five English alt attributes`);
  if ((payload.descriptionHtml.match(/title="[^"]+"/g) || []).length !== 5) throw new Error(`${payload.base} body images need five English title attributes`);
  const responsiveImages = payload.descriptionHtml.match(/<img\b[^>]*style="[^"]*width:100%[^"]*max-width:100%[^"]*height:auto[^"]*"[^>]*>/gi) || [];
  if (responsiveImages.length !== 5) throw new Error(`${payload.base} body images must persist responsive sizing`);
  if (/<br\s*\/?\s*>/i.test(payload.descriptionHtml)) throw new Error(`${payload.base} contains an unsupported br tag`);
  if (/\p{Extended_Pictographic}/u.test(payload.descriptionHtml)) throw new Error(`${payload.base} contains an unsupported emoji`);
  if (/6:00\s*PM/i.test(payload.descriptionHtml)) throw new Error(`${payload.base} contains the wrong opening time`);
  if (!payload.descriptionHtml.includes('7:30 PM') || !payload.descriptionHtml.includes('9 PM')) throw new Error(`${payload.base} is missing verified times`);
  if (!/21\+/.test(payload.descriptionHtml) || !/long trousers/i.test(payload.descriptionHtml)) throw new Error(`${payload.base} is missing target or dress code`);
  for (const heading of ['Dress code', 'Target audience', 'Mood:', 'Music after the final']) {
    if (!payload.descriptionHtml.includes(`<h2>${heading}`)) throw new Error(`${payload.base} is missing the ${heading} section`);
  }
  const contacts = payload.descriptionHtml.indexOf('<h2>Tickets, tables and confirmation</h2>');
  const programme = payload.descriptionHtml.indexOf('<h2>Evening programme</h2>');
  const programmeEnd = payload.descriptionHtml.indexOf('</ul>', programme);
  const imagePositions = [...payload.descriptionHtml.matchAll(/<img /g)].map((match) => match.index);
  if (contacts < 0 || imagePositions[0] <= contacts || imagePositions[0] >= programme) {
    throw new Error(`${payload.base} poster must appear immediately after contacts and before the programme`);
  }
  if (imagePositions.slice(1).some((position) => position <= programmeEnd)) {
    throw new Error(`${payload.base} mood images must appear after the programme`);
  }
  const keywordCount = payload.descriptionHtml.toLocaleLowerCase('en').split(payload.keyword.toLocaleLowerCase('en')).length - 1;
  if (keywordCount < 3) throw new Error(`${payload.base} primary keyword is not supported by lead and FAQs`);
  if (payload.descriptionHtml.length > 16_000) throw new Error(`${payload.base} exceeds the 16000-character Eventbrite safety budget`);
  if (payload.imagePlan.some((image) => image.width / image.height !== 1 && image.width / image.height !== 1.25)) {
    throw new Error(`${payload.base} body media must be 1:1 or 5:4`);
  }
  if (!payload.orderConfirmation.includes('not an admission ticket')
    || !payload.orderConfirmation.includes(WORLD_CUP_FINAL_AFFILIATE_URL)
    || !payload.orderConfirmation.includes(WORLD_CUP_FINAL_PHONE)) {
    throw new Error(`${payload.base} needs complete English order-confirmation instructions`);
  }
}
