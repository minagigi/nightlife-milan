import { getEventbriteConfirmationPlainText, buildEventbriteConfirmationHtml } from './eventbriteConfirmation';
import { EVENT_BATCH_LOCALE_FALLBACKS } from './eventBatchLocaleFallbacks';
import { getEventLocalePack } from './eventLocalePacks';
import { getLocaleDef, localePrefix, type LocaleCode } from './i18n/locales';
import { getWorldCupFinalLocaleCopy } from './worldCupFinalLocaleCopies';
import { getWorldCupFinalLocalizedContent } from './worldCupFinalLocales';
import {
  getWorldCupFinalGalleryImageCopy,
  getWorldCupFinalGeneratedImagePath,
  WORLD_CUP_FINAL_VISUAL_REVISION,
} from './worldCupFinalVisuals';
import {
  WORLD_CUP_FINAL_AFFILIATE_URL,
  WORLD_CUP_FINAL_PHONE,
} from './worldCupFinalIt';

const SITE = 'https://nightlifemilan.com';
const WHATSAPP = 'https://wa.me/393519127047';
const DESCRIPTION_LIMIT = 16_000;
const IMAGE_STYLE = 'display:block;width:100%;max-width:100%;height:auto';

export interface WorldCupEventbriteImagePlan {
  src: string;
  title: string;
  alt: string;
}

export interface WorldCupEventbriteLocalePayload {
  locale: LocaleCode;
  eventbriteLocale: string;
  variant: 1 | 2 | 3 | 4 | 5;
  keyword: string;
  title: string;
  summary: string;
  marker: string;
  canonicalSiteUrl: string;
  affiliateUrl: string;
  ticketName: string;
  ticketDescription: string;
  orderConfirmation: string;
  /** Localized 2:1 artwork uploaded as the Eventbrite main cover. */
  coverImage: WorldCupEventbriteImagePlan;
  /** 5:4 body poster followed by four localized GPT editorial visuals. */
  imagePlan: readonly [
    WorldCupEventbriteImagePlan,
    WorldCupEventbriteImagePlan,
    WorldCupEventbriteImagePlan,
    WorldCupEventbriteImagePlan,
    WorldCupEventbriteImagePlan,
  ];
  descriptionHtml: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function truncate(value: string, limit: number): string {
  const normalized = value.replace(/\s+/g, ' ').trim();
  if ([...normalized].length <= limit) return normalized;
  return `${[...normalized].slice(0, limit - 1).join('').replace(/[\s,;:.-]+$/u, '')}…`;
}

function summaryWithPhone(keyword: string, bookingLabel: string): string {
  const suffix = ` WhatsApp ${WORLD_CUP_FINAL_PHONE}.`;
  const prefixLimit = 140 - [...suffix].length;
  return `${truncate(`${keyword}. ${bookingLabel}.`, prefixLimit)}${suffix}`;
}

function eventbriteTitle(locale: LocaleCode, variant: 1 | 2 | 3 | 4 | 5, keyword: string): string {
  if (locale === 'zh') {
    const bilingualTitles = [
      'Spain vs Argentina World Cup Final Milan | 米兰西班牙对阿根廷世界杯决赛',
      '2026 World Cup Final Big Screen Milan | 2026世界杯决赛米兰大屏直播',
      'Spain vs Argentina Live at Just Me Milan | Just Me Milan西班牙对阿根廷直播',
      'Watch the World Cup Final in Milan | 米兰观看世界杯决赛',
      'Big Screen Football Night Just Me Milan | Just Me Milan大屏足球之夜',
    ] as const;
    return bilingualTitles[variant - 1];
  }
  return truncate(keyword, 75);
}

function canonicalUrl(locale: LocaleCode): string {
  const copy = getWorldCupFinalLocaleCopy(locale);
  return `${SITE}${localePrefix(locale)}/events/${copy.slug}`;
}

function localImages(locale: LocaleCode): WorldCupEventbriteLocalePayload['imagePlan'] {
  const copy = getWorldCupFinalLocaleCopy(locale);
  const supporting = getWorldCupFinalGalleryImageCopy(locale).map((image) => ({
    src: `${SITE}${getWorldCupFinalGeneratedImagePath(locale, image.kind)}`,
    title: image.title,
    alt: image.alt,
  }));
  return [
    {
      src: locale === 'it'
        ? `${SITE}/images/events/generated/just-me-finale-coppa-mondo-poster-5x4-it-v5.jpg`
        : `${SITE}/images/events/generated/just-me-world-cup-final-poster-5x4-${locale}-v1.jpg`,
      title: copy.gallery.posterTitle,
      alt: copy.gallery.posterAlt,
    },
    supporting[0], supporting[1], supporting[2], supporting[3],
  ];
}

function localCover(locale: LocaleCode): WorldCupEventbriteImagePlan {
  const copy = getWorldCupFinalLocaleCopy(locale);
  return {
    src: locale === 'it'
      ? `${SITE}/images/events/generated/just-me-finale-coppa-mondo-cover-2x1-it-v4.jpg`
      : `${SITE}/images/events/generated/just-me-world-cup-final-cover-2x1-${locale}-v1.jpg`,
    title: copy.gallery.posterTitle,
    alt: copy.gallery.posterAlt,
  };
}

function imageHtml(image: WorldCupEventbriteImagePlan): string {
  return `<p><img src="${escapeHtml(image.src)}" alt="${escapeHtml(image.alt)}" title="${escapeHtml(image.title)}" style="${IMAGE_STYLE}"></p>`;
}

function renderDescription(
  locale: LocaleCode,
  variant: 1 | 2 | 3 | 4 | 5,
  imagePlan: WorldCupEventbriteLocalePayload['imagePlan'],
): string {
  const copy = getWorldCupFinalLocaleCopy(locale);
  const content = getWorldCupFinalLocalizedContent(locale);
  const pack = getEventLocalePack(locale);
  if (!pack) throw new Error(`Missing Eventbrite locale pack for ${locale}`);
  const keyword = copy.keywordIntents[variant - 1];
  const url = canonicalUrl(locale);
  const programme = content.programme.map((slot) => `<li><strong>${escapeHtml(slot.start)}${slot.end ? `–${escapeHtml(slot.end)}` : ''}</strong> — ${escapeHtml(slot.title)}</li>`).join('');
  const sectionHtml = (index: number) => `<h2>${escapeHtml(content.sections[index].title)}</h2><p>${escapeHtml(content.sections[index].body)}</p>`;
  const editorialSequence = [
    imageHtml(imagePlan[1]),
    sectionHtml(1),
    imageHtml(imagePlan[2]),
    sectionHtml(0),
    imageHtml(imagePlan[3]),
    sectionHtml(2),
    sectionHtml(3),
    imageHtml(imagePlan[4]),
  ].join('');
  const offers = content.offers.map((offer) => `<li>${escapeHtml(offer.name)} — EUR ${offer.price}</li>`).join('');
  const faqs = content.faqs.map((faq) => `<h3 data-event-faq="true">${escapeHtml(faq.question)}</h3><p>${escapeHtml(faq.answer)}</p>`).join('');

  return [
    `<h2>${escapeHtml(keyword)}</h2>`,
    `<p><strong>${escapeHtml(keyword)}</strong>. ${escapeHtml(content.answerFirst || content.seoSummary)}</p>`,
    `<h2>${escapeHtml(pack.eventbrite.contactsTitle)}</h2>`,
    `<p><a href="${escapeHtml(WORLD_CUP_FINAL_AFFILIATE_URL)}">${escapeHtml(pack.eventbrite.buyTickets)}</a> · <a href="${escapeHtml(WORLD_CUP_FINAL_AFFILIATE_URL)}">${escapeHtml(pack.eventbrite.bookTable)}</a> · <a href="${WHATSAPP}">WhatsApp ${escapeHtml(WORLD_CUP_FINAL_PHONE)}</a> · <a href="${escapeHtml(url)}">${escapeHtml(pack.eventbrite.fullGuide)}</a></p>`,
    imageHtml(imagePlan[0]),
    `<h2>${escapeHtml(pack.eventbrite.programmeTitle)}</h2><ul>${programme}</ul>`,
    editorialSequence,
    `<h2>${escapeHtml(pack.eventbrite.offersTitle)}</h2><ul>${offers}</ul>`,
    `<h2>${escapeHtml(pack.eventbrite.faqTitle)}</h2>${faqs}`,
    `<!-- nlm:visuals=${WORLD_CUP_FINAL_VISUAL_REVISION} -->`,
    `<!-- nlm:curated=wc26-final-v${variant}-${locale}-2026-07-19 -->`,
  ].join('');
}

export function buildWorldCupEventbriteLocalePayloads(
  locale: LocaleCode,
  eventbriteCdnUrls?: readonly [string, string, string, string, string, string],
): WorldCupEventbriteLocalePayload[] {
  const copy = getWorldCupFinalLocaleCopy(locale);
  const content = getWorldCupFinalLocalizedContent(locale);
  const pack = getEventLocalePack(locale);
  const localeDef = getLocaleDef(locale);
  if (!pack || !localeDef) throw new Error(`Unsupported World Cup Eventbrite locale: ${locale}`);
  const confirmation = getEventbriteConfirmationPlainText(locale);
  const baseCover = localCover(locale);
  const baseImagePlan = localImages(locale);
  const coverImage = eventbriteCdnUrls
    ? { ...baseCover, src: eventbriteCdnUrls[0] }
    : baseCover;
  const imagePlan = (eventbriteCdnUrls
    ? baseImagePlan.map((image, index) => ({ ...image, src: eventbriteCdnUrls[index + 1] }))
    : baseImagePlan) as WorldCupEventbriteLocalePayload['imagePlan'];
  const url = canonicalUrl(locale);

  return copy.keywordIntents.map((keyword, index) => {
    const variant = (index + 1) as 1 | 2 | 3 | 4 | 5;
    const title = eventbriteTitle(locale, variant, keyword);
    const payload: WorldCupEventbriteLocalePayload = {
      locale,
      eventbriteLocale: localeDef.ebLocale,
      variant,
      keyword,
      title,
      summary: summaryWithPhone(keyword, pack.eventbrite.bookTable),
      marker: `nlm:curated=wc26-final-v${variant}-${locale}-2026-07-19`,
      canonicalSiteUrl: url,
      affiliateUrl: WORLD_CUP_FINAL_AFFILIATE_URL,
      ticketName: truncate(`${pack.eventbrite.seoLabel}: ${copy.eventName}`, 75),
      ticketDescription: confirmation.notTicket,
      orderConfirmation: buildEventbriteConfirmationHtml(locale, [WORLD_CUP_FINAL_AFFILIATE_URL], {
        heading: copy.eventName,
        details: content.answerFirst || content.seoSummary,
      }),
      coverImage,
      imagePlan,
      descriptionHtml: renderDescription(locale, variant, imagePlan),
    };
    validateWorldCupEventbriteLocalePayload(payload, Boolean(eventbriteCdnUrls));
    return payload;
  });
}

export function validateWorldCupEventbriteLocalePayload(
  payload: WorldCupEventbriteLocalePayload,
  requireEventbriteCdn = false,
): void {
  if ([...payload.title].length > 75) throw new Error(`${payload.marker}: title exceeds 75 characters`);
  if ([...payload.summary].length > 140 || !payload.summary.includes(WORLD_CUP_FINAL_PHONE)) throw new Error(`${payload.marker}: invalid summary`);
  if (!payload.descriptionHtml.includes(`<!-- ${payload.marker} -->`)) throw new Error(`${payload.marker}: marker missing`);
  if (!payload.descriptionHtml.includes(`<!-- nlm:visuals=${WORLD_CUP_FINAL_VISUAL_REVISION} -->`)) throw new Error(`${payload.marker}: full-bleed visual revision missing`);
  if (!payload.descriptionHtml.includes(payload.canonicalSiteUrl)) throw new Error(`${payload.marker}: same-language canonical missing`);
  if (!payload.descriptionHtml.includes(WORLD_CUP_FINAL_AFFILIATE_URL) || !payload.descriptionHtml.includes(WORLD_CUP_FINAL_PHONE)) throw new Error(`${payload.marker}: contacts missing`);
  if ((payload.descriptionHtml.match(/<img\b/gi) || []).length !== 5) throw new Error(`${payload.marker}: five images required`);
  if ((payload.descriptionHtml.match(new RegExp(`style="${IMAGE_STYLE}"`, 'g')) || []).length !== 5) throw new Error(`${payload.marker}: responsive images required`);
  if ((payload.descriptionHtml.match(/data-event-faq="true"/g) || []).length !== 25) throw new Error(`${payload.marker}: 25 FAQs required`);
  const keywordCount = payload.descriptionHtml.toLocaleLowerCase(payload.locale).split(escapeHtml(payload.keyword).toLocaleLowerCase(payload.locale)).length - 1;
  if (keywordCount < 3) throw new Error(`${payload.marker}: primary intent is not supported in lead and FAQs`);
  const pack = getEventLocalePack(payload.locale)!;
  const contacts = payload.descriptionHtml.indexOf(`<h2>${escapeHtml(pack.eventbrite.contactsTitle)}</h2>`);
  const posterHtml = imageHtml(payload.imagePlan[0]);
  const poster = payload.descriptionHtml.indexOf(posterHtml, contacts);
  const programme = payload.descriptionHtml.indexOf(`<h2>${escapeHtml(pack.eventbrite.programmeTitle)}</h2>`);
  if (contacts < 0 || poster < contacts || poster > programme) throw new Error(`${payload.marker}: poster must follow contacts before programme`);
  const contactsBlock = payload.descriptionHtml.slice(contacts, poster);
  if ((contactsBlock.match(/<p>/g) || []).length !== 1 || !contactsBlock.endsWith('</p>')) {
    throw new Error(`${payload.marker}: poster must be immediately after the single contacts paragraph`);
  }

  const content = getWorldCupFinalLocalizedContent(payload.locale);
  const dressRule = EVENT_BATCH_LOCALE_FALLBACKS[payload.locale].elegantDressLongTrousers;
  const expectedPrices = [15, 15, 320, 640, 1280, 3200, 5000];
  const expectedOpening = payload.locale === 'en' ? '7:30 PM' : '19:30';
  const expectedKickoff = payload.locale === 'en' ? '9:00 PM' : '21:00';
  if (!content.programme.some((slot) => slot.start === expectedOpening)
    || !content.programme.some((slot) => slot.start === expectedKickoff)) {
    throw new Error(`${payload.marker}: verified opening or kick-off time missing`);
  }
  if (!content.sections[0]?.body.includes(dressRule) || !payload.descriptionHtml.includes(escapeHtml(dressRule))) {
    throw new Error(`${payload.marker}: native elegant dress and long-trousers rule missing`);
  }
  if (!payload.descriptionHtml.includes('21+')
    || !payload.descriptionHtml.includes('Viale Luigi Camoens 2, 20121')) {
    throw new Error(`${payload.marker}: age or venue address missing`);
  }
  if (content.offers.length !== expectedPrices.length
    || content.offers.some((offer, index) => offer.price !== expectedPrices[index])
    || content.offers.some((offer) => !payload.descriptionHtml.includes(`EUR ${offer.price}`))) {
    throw new Error(`${payload.marker}: verified ticket or table offers missing`);
  }
  if (payload.descriptionHtml.length > DESCRIPTION_LIMIT) throw new Error(`${payload.marker}: description exceeds ${DESCRIPTION_LIMIT}`);
  if (/<br\s*\/?\s*>/i.test(payload.descriptionHtml) || /\p{Extended_Pictographic}/u.test(payload.descriptionHtml)) throw new Error(`${payload.marker}: forbidden Eventbrite HTML content`);
  if (!payload.orderConfirmation.includes(WORLD_CUP_FINAL_AFFILIATE_URL) || !payload.orderConfirmation.includes(WORLD_CUP_FINAL_PHONE)) throw new Error(`${payload.marker}: confirmation incomplete`);
  if (!payload.orderConfirmation.includes(expectedKickoff)) throw new Error(`${payload.marker}: kick-off missing from confirmation`);
  const confirmation = getEventbriteConfirmationPlainText(payload.locale, WORLD_CUP_FINAL_PHONE);
  const [confirmationBeforePhone, confirmationAfterPhone = ''] = confirmation.afterPurchase.split(WORLD_CUP_FINAL_PHONE);
  if (!payload.orderConfirmation.includes(escapeHtml(confirmation.notTicket))
    || !payload.orderConfirmation.includes(escapeHtml(confirmationBeforePhone))
    || !payload.orderConfirmation.includes(escapeHtml(confirmationAfterPhone))) {
    throw new Error(`${payload.marker}: native confirmation instructions missing`);
  }
  if (payload.coverImage.src !== localCover(payload.locale).src && !/^https:\/\/(?:img|cdn)\.evbuc\.com\//i.test(payload.coverImage.src)) {
    throw new Error(`${payload.marker}: localized 2:1 cover missing`);
  }
  if (requireEventbriteCdn && [payload.coverImage, ...payload.imagePlan].some((image) => !/^https:\/\/(?:img|cdn)\.evbuc\.com\//i.test(image.src))) {
    throw new Error(`${payload.marker}: Eventbrite CDN images required for publication`);
  }
}
