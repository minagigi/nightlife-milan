import {
  WORLD_CUP_FINAL_AFFILIATE_URL,
  WORLD_CUP_FINAL_COVER_IT,
  WORLD_CUP_FINAL_IT_URL,
  WORLD_CUP_FINAL_PHONE,
  WORLD_CUP_FINAL_POSTER_IT,
  WORLD_CUP_KEYWORD_EVENTS_IT,
  WORLD_CUP_ORDER_CONFIRMATION_IT,
  worldCupFinalIt,
} from './worldCupFinalIt';
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

export const WORLD_CUP_EVENTBRITE_BODY_IMAGES_IT = [
  WORLD_CUP_FINAL_POSTER_IT,
  ...getWorldCupFinalGalleryImageCopy('it').map((image) => ({
    src: getWorldCupFinalGeneratedImagePath('it', image.kind),
    title: image.title,
    alt: image.alt,
    description: image.description,
    width: image.width,
    height: image.height,
  })),
] as const;

export interface WorldCupEventbriteItPayload {
  base: string;
  marker: string;
  lang: 'it';
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
  imagePlan: typeof WORLD_CUP_EVENTBRITE_BODY_IMAGES_IT;
  faqCount: number;
  imageCount: number;
}

export interface WorldCupEventbriteLiveListingIt {
  key: string;
  eventId: string;
  url: string;
  status: 'live';
}

/** Live publication registry for the five Italian keyword satellites. */
export const WORLD_CUP_EVENTBRITE_IT_LIVE_LISTINGS = [
  {
    key: 'finale-coppa-mondo-maxischermo-milano',
    eventId: '1994228700727',
    url: 'https://www.eventbrite.it/e/biglietti-finale-mondiale-su-maxischermo-milano-just-me-1994228700727',
    status: 'live',
  },
  {
    key: 'dove-vedere-spagna-argentina-milano',
    eventId: '1994228704739',
    url: 'https://www.eventbrite.it/e/biglietti-dove-vedere-spagna-argentina-a-milano-just-me-1994228704739',
    status: 'live',
  },
  {
    key: 'finale-mondiali-2026-milano',
    eventId: '1994228708751',
    url: 'https://www.eventbrite.it/e/biglietti-finale-mondiali-2026-milano-just-me-19-luglio-1994228708751',
    status: 'live',
  },
  {
    key: 'partita-maxischermo-milano',
    eventId: '1994228714769',
    url: 'https://www.eventbrite.it/e/biglietti-partita-su-maxischermo-milano-spagna-argentina-1994228714769',
    status: 'live',
  },
  {
    key: 'just-me-finale-mondiale',
    eventId: '1994228720787',
    url: 'https://www.eventbrite.it/e/biglietti-just-me-milano-finale-mondiale-spagna-argentina-1994228720787',
    status: 'live',
  },
] as const satisfies readonly WorldCupEventbriteLiveListingIt[];

/** Superseded pilot IDs, retired after the final 18:00-free copy was published. */
export const WORLD_CUP_EVENTBRITE_IT_SUPERSEDED_IDS = [
  '1994203805264',
  '1994203811282',
  '1994203819306',
  '1994203829336',
  '1994203847390',
] as const;

export function getWorldCupCuratedMarker(key: string): string {
  return `nlm:curated=${key}-it-2026-07-19`;
}

function renderPoster(mediaUrls?: readonly string[]): string {
  const image = WORLD_CUP_FINAL_POSTER_IT;
  const src = mediaUrls?.[0] || `https://nightlifemilan.com${image.src}`;
  return `<h2>${escapeHtml(image.title)}</h2><p><img src="${escapeHtml(src)}" alt="${escapeHtml(image.alt)}" title="${escapeHtml(image.title)}" style="display:block;width:100%;max-width:100%;height:auto"></p>`;
}

function renderEditorialSections(mediaUrls?: readonly string[]): string {
  const imageHtml = WORLD_CUP_EVENTBRITE_BODY_IMAGES_IT.slice(1).map((image, index) => {
    const src = mediaUrls?.[index + 1] || `https://nightlifemilan.com${image.src}`;
    return `<h3>${escapeHtml(image.title)}</h3><p><img src="${escapeHtml(src)}" alt="${escapeHtml(image.alt)}" title="${escapeHtml(image.title)}" style="display:block;width:100%;max-width:100%;height:auto"></p>`;
  });
  const sectionHtml = (index: number) => `<h2>${escapeHtml(worldCupFinalIt.sections[index].title)}</h2><p>${escapeHtml(worldCupFinalIt.sections[index].body)}</p>`;
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

export function renderWorldCupEventbriteItHtml(key: string, mediaUrls?: readonly string[]): string {
  const variant = WORLD_CUP_KEYWORD_EVENTS_IT.find((item) => item.key === key);
  if (!variant) throw new Error(`Unknown Italian World Cup keyword event: ${key}`);
  if (mediaUrls && mediaUrls.length !== WORLD_CUP_EVENTBRITE_BODY_IMAGES_IT.length) {
    throw new Error(`Expected ${WORLD_CUP_EVENTBRITE_BODY_IMAGES_IT.length} Eventbrite body media URLs`);
  }

  const answerFirst = `<h2>In breve: ${escapeHtml(variant.keyword)}</h2><p><strong>${escapeHtml(variant.keyword)}</strong>. ${escapeHtml(worldCupFinalIt.answerFirst || variant.summary)}</p>`;
  const programme = `<h2>Programma della serata</h2><ul>${worldCupFinalIt.programme
    .map((slot) => `<li><strong>${escapeHtml(slot.start)}${slot.end ? `-${escapeHtml(slot.end)}` : ''}</strong>: ${escapeHtml(slot.title)}</li>`)
    .join('')}</ul>`;
  const offers = `<h2>Biglietti e tavoli VIP</h2><ul>${worldCupFinalIt.offers
    .map((offer) => `<li><strong>${escapeHtml(offer.name)} - EUR ${offer.price}</strong>${offer.details ? `: ${escapeHtml(offer.details)}` : ''}</li>`)
    .join('')}</ul>`;
  const variantFaqs = [...variant.faqLeads, ...worldCupFinalIt.faqs.slice(5)];
  const faqs = `<h2>Domande frequenti: ${escapeHtml(variant.keyword)}</h2>${variantFaqs
    .map((faq) => `<div data-event-faq="true"><h3>${escapeHtml(faq.question)}</h3><p>${escapeHtml(faq.answer)}</p></div>`)
    .join('')}`;
  const contacts = [
    '<h2>Prenotazioni e ingresso</h2>',
    `<p>${link(WORLD_CUP_FINAL_AFFILIATE_URL, 'Acquista biglietti o prenota un tavolo su Xceed', true)}</p>`,
    `<p>Dopo il pagamento invia la conferma su WhatsApp al ${link(`https://wa.me/${WORLD_CUP_FINAL_PHONE.replace(/\D/g, '')}`, WORLD_CUP_FINAL_PHONE)}.</p>`,
    `<p>${link(WORLD_CUP_FINAL_IT_URL, 'Pagina italiana ufficiale: finale Coppa del Mondo su maxischermo a Milano')}</p>`,
    '<p><strong>Importante:</strong> la registrazione Eventbrite non è un biglietto e non garantisce l&#39;ingresso.</p>',
  ].join('');
  const marker = getWorldCupCuratedMarker(variant.key);

  return `${answerFirst}${contacts}${renderPoster(mediaUrls)}${programme}${renderEditorialSections(mediaUrls)}${offers}${faqs}<!-- nlm:visuals=${WORLD_CUP_FINAL_VISUAL_REVISION} --><!-- ${marker} -->`;
}

export function buildWorldCupEventbriteItPayloads(mediaUrls?: readonly string[]): WorldCupEventbriteItPayload[] {
  return WORLD_CUP_KEYWORD_EVENTS_IT.map((variant) => ({
    base: `nlm-world-cup-final-2026-it-${variant.key}`,
    marker: getWorldCupCuratedMarker(variant.key),
    lang: 'it',
    keyword: variant.keyword,
    title: variant.title,
    summary: variant.summary,
    descriptionHtml: renderWorldCupEventbriteItHtml(variant.key, mediaUrls),
    ticketName: 'REGISTRAZIONE EVENTBRITE - NON È UN BIGLIETTO',
    ticketDescription: `Per entrare acquista tramite Xceed e invia la conferma su WhatsApp al ${WORLD_CUP_FINAL_PHONE}.`,
    orderConfirmation: WORLD_CUP_ORDER_CONFIRMATION_IT,
    canonicalSiteUrl: WORLD_CUP_FINAL_IT_URL,
    affiliateUrl: WORLD_CUP_FINAL_AFFILIATE_URL,
    coverPath: WORLD_CUP_FINAL_COVER_IT.src,
    imagePlan: WORLD_CUP_EVENTBRITE_BODY_IMAGES_IT,
    faqCount: worldCupFinalIt.faqs.length,
    imageCount: 1 + WORLD_CUP_EVENTBRITE_BODY_IMAGES_IT.length,
  }));
}

export function validateWorldCupEventbriteItPayload(payload: WorldCupEventbriteItPayload): void {
  if (payload.title.length > 62) throw new Error(`${payload.base} title is ${payload.title.length}/62`);
  if (payload.summary.length > 140) throw new Error(`${payload.base} summary is ${payload.summary.length}/140`);
  if (!payload.summary.includes(WORLD_CUP_FINAL_PHONE)) throw new Error(`${payload.base} summary is missing WhatsApp`);
  if (payload.faqCount !== 25) throw new Error(`${payload.base} must contain 25 FAQs`);
  if (payload.imageCount !== 6) throw new Error(`${payload.base} must contain one cover and five body images`);
  if (!payload.descriptionHtml.includes(WORLD_CUP_FINAL_AFFILIATE_URL)) throw new Error(`${payload.base} is missing the affiliate URL`);
  if ((payload.descriptionHtml.match(new RegExp(WORLD_CUP_FINAL_IT_URL.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length !== 1) {
    throw new Error(`${payload.base} must contain one visible canonical link`);
  }
  if (!payload.descriptionHtml.includes(`<!-- ${payload.marker} -->`)) throw new Error(`${payload.base} is missing the exact Eventbrite-only marker`);
  if (!payload.descriptionHtml.includes(`<!-- nlm:visuals=${WORLD_CUP_FINAL_VISUAL_REVISION} -->`)) throw new Error(`${payload.base} is missing the full-bleed visual revision`);
  if ((payload.descriptionHtml.match(/data-event-faq="true"/g) || []).length !== 25) throw new Error(`${payload.base} HTML must contain 25 FAQs`);
  if ((payload.descriptionHtml.match(/<img /g) || []).length !== 5) throw new Error(`${payload.base} HTML must contain five body images`);
  if ((payload.descriptionHtml.match(/alt="[^"]+"/g) || []).length !== 5) throw new Error(`${payload.base} body images need five native alt attributes`);
  if ((payload.descriptionHtml.match(/title="[^"]+"/g) || []).length !== 5) throw new Error(`${payload.base} body images need five native title attributes`);
  const responsiveImages = payload.descriptionHtml.match(/<img\b[^>]*style="[^"]*width:100%[^"]*max-width:100%[^"]*height:auto[^"]*"[^>]*>/gi) || [];
  if (responsiveImages.length !== 5) throw new Error(`${payload.base} body images must persist responsive sizing`);
  if (/<br\s*\/?\s*>/i.test(payload.descriptionHtml)) throw new Error(`${payload.base} contains an unsupported br tag`);
  if (/\p{Extended_Pictographic}/u.test(payload.descriptionHtml)) throw new Error(`${payload.base} contains an unsupported emoji`);
  if (/18:00/.test(payload.descriptionHtml)) throw new Error(`${payload.base} contains the wrong opening time`);
  if (!payload.descriptionHtml.includes('19:30') || !payload.descriptionHtml.includes('21:00')) throw new Error(`${payload.base} is missing verified times`);
  if (!/21\+/.test(payload.descriptionHtml) || !/pantaloni lunghi/i.test(payload.descriptionHtml)) throw new Error(`${payload.base} is missing target or dress code`);
  for (const heading of ['Dress code', 'Target della serata', 'Mood e atmosfera', 'Musica dopo la finale']) {
    if (!payload.descriptionHtml.includes(`<h2>${heading}`)) throw new Error(`${payload.base} is missing the ${heading} section`);
  }
  const contacts = payload.descriptionHtml.indexOf('<h2>Prenotazioni e ingresso</h2>');
  const programme = payload.descriptionHtml.indexOf('<h2>Programma della serata</h2>');
  const programmeEnd = payload.descriptionHtml.indexOf('</ul>', programme);
  const imagePositions = [...payload.descriptionHtml.matchAll(/<img /g)].map((match) => match.index);
  if (contacts < 0 || imagePositions[0] <= contacts || imagePositions[0] >= programme) {
    throw new Error(`${payload.base} poster must appear immediately after contacts and before the programme`);
  }
  if (imagePositions.slice(1).some((position) => position <= programmeEnd)) {
    throw new Error(`${payload.base} mood images must appear after the programme`);
  }
  const keywordCount = payload.descriptionHtml.toLocaleLowerCase('it').split(payload.keyword.toLocaleLowerCase('it')).length - 1;
  if (keywordCount < 3) throw new Error(`${payload.base} primary keyword is not supported by lead and FAQs`);
  if (payload.descriptionHtml.length > 16_000) throw new Error(`${payload.base} exceeds the 16000-character Eventbrite safety budget`);
  if (payload.imagePlan.some((image) => image.width / image.height !== 1 && image.width / image.height !== 1.25)) {
    throw new Error(`${payload.base} body media must be 1:1 or 5:4`);
  }
}
