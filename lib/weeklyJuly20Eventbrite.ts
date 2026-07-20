import { WEEKLY_JULY20_BATCH_EVENTS, type WeeklyJuly20BatchEvent } from './weeklyJuly20Batch';

export type WeeklyJuly20Locale = 'en' | 'it';

export interface WeeklyJuly20EventbritePayload {
  eventKey: string;
  locale: WeeklyJuly20Locale;
  variant: number;
  title: string;
  summary: string;
  marker: string;
  /** The matching Nightlife Milan master page in the listing language. */
  canonicalSiteUrl: string;
  eventbriteLocale: 'en_GB' | 'it_IT';
  descriptionHtml: string;
  ticket: { name: string; description: string };
  confirmation: { heading: string; details: string };
}

const escapeHtml = (value: string) => value
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const anchor = (url: string, label: string) =>
  `<a href="${escapeHtml(url)}" rel="nofollow noopener noreferrer">${escapeHtml(label)}</a>`;

const image = (url: string, title: string, alt: string) =>
  `<h3>${escapeHtml(title)}</h3><p><img src="${escapeHtml(url)}" alt="${escapeHtml(alt)}" title="${escapeHtml(title)}" style="display:block;width:100%;max-width:100%;height:auto" /></p>`;

function getEvent(eventKey: string): WeeklyJuly20BatchEvent {
  const event = WEEKLY_JULY20_BATCH_EVENTS.find((candidate) => candidate.eventKey === eventKey);
  if (!event) throw new Error(`Unknown weekly July 20 batch event: ${eventKey}`);
  return event;
}

const SITE_SLUGS: Record<string, Record<WeeklyJuly20Locale, string>> = {
  'justme-university-2026-07-21': { en: 'just-me-milano-university-party-tuesday-july-21-2026', it: 'just-me-milano-university-party-martedi-21-luglio-2026' },
  'justme-wednesday-2026-07-22': { en: 'just-me-milano-wednesday-night-july-22-2026', it: 'just-me-milano-mercoledi-22-luglio-2026' },
  'justme-thursday-2026-07-23': { en: 'just-me-milano-thursday-night-july-23-2026', it: 'just-me-milano-giovedi-23-luglio-2026' },
  'justme-friday-2026-07-24': { en: 'just-me-milano-friday-night-july-24-2026', it: 'just-me-milano-venerdi-24-luglio-2026' },
  'aria-friday-2026-07-24': { en: 'aria-club-milano-friday-night-july-24-2026', it: 'aria-club-milano-venerdi-24-luglio-2026' },
  'pineta-friday-2026-07-24': { en: 'pineta-club-milano-friday-night-july-24-2026', it: 'pineta-club-milano-venerdi-24-luglio-2026' },
  'aria-saturday-2026-07-25': { en: 'aria-club-milano-saturday-night-july-25-2026', it: 'aria-club-milano-sabato-25-luglio-2026' },
  'pineta-saturday-2026-07-25': { en: 'pineta-club-milano-saturday-night-july-25-2026', it: 'pineta-club-milano-sabato-25-luglio-2026' },
  'justme-sunday-2026-07-26': { en: 'just-me-milano-sunday-night-july-26-2026', it: 'just-me-milano-domenica-26-luglio-2026' },
};

function getCanonicalSiteUrl(eventKey: string, locale: WeeklyJuly20Locale): string {
  const slug = SITE_SLUGS[eventKey]?.[locale];
  if (!slug) throw new Error(`${eventKey}/${locale}: missing matching Nightlife Milan master page`);
  return `https://nightlifemilan.com${locale === 'it' ? '/it' : ''}/events/${slug}`;
}

/** Build the ten SEO-discovery Eventbrite satellites for one physical event and language. */
export function buildWeeklyJuly20EventbritePayloads(
  eventKey: string,
  locale: WeeklyJuly20Locale,
  mediaUrls: readonly [string, string, string, string, string],
): WeeklyJuly20EventbritePayload[] {
  const event = getEvent(eventKey);
  const copy = event.localized[locale];
  if (copy.titles.length !== 10 || copy.faqs.length !== 25 || copy.keywordPermutations.length !== 10) {
    throw new Error(`${eventKey}/${locale}: expected 10 titles, 25 FAQs and 10 keyword permutations`);
  }
  const isIt = locale === 'it';
  const contactTitle = isIt ? 'Contatti e prenotazioni' : 'Contacts and booking';
  const faqTitle = isIt ? 'Domande frequenti' : 'Frequently asked questions';
  const discoveryTitle = isIt ? 'Ricerche utili per prenotare' : 'Useful booking searches';
  const labels = isIt ? {
    programme: 'Programma e orari', target: 'Target', dress: 'Dress code e ingresso', mood: 'Mood', music: 'Musica', location: 'Location e arrivo', offers: 'Formule e prezzi pubblicati', nonAdmission: 'Importante prima di registrarti',
    posterTitle: `Locandina ${event.name.it}`, posterAlt: `Locandina dell'evento ${event.name.it} al ${event.name.it === 'Friday Night' ? 'locale' : 'locale'} con data e informazioni della serata`,
    moodImages: [
      ['Arrivo alla location', 'Ospiti adulti in abbigliamento elegante all’arrivo alla location della serata.'],
      ['Aperitivo e cocktail', 'Ospiti adulti con cocktail durante l’aperitivo nella location della serata.'],
      ['Lounge e pubblico', 'Pubblico adulto in abbigliamento elegante nella lounge della location.'],
      ['Dancefloor', 'Pubblico adulto in abbigliamento elegante durante la fase club della serata.'],
    ],
  } : {
    programme: 'Programme and times', target: 'Target', dress: 'Dress code and entry', mood: 'Mood', music: 'Music', location: 'Venue and arrival', offers: 'Published offers and prices', nonAdmission: 'Important before registering',
    posterTitle: `${event.name.en} poster`, posterAlt: `Poster for ${event.name.en} with the event date and night information`,
    moodImages: [
      ['Arrival at the venue', 'Adult guests in elegant evening clothes arriving at the venue.'],
      ['Aperitivo and cocktails', 'Adult guests with cocktails during the aperitivo at the venue.'],
      ['Lounge and audience', 'Elegantly dressed adult guests in the venue lounge.'],
      ['Dancefloor', 'Elegantly dressed adult guests during the club part of the night.'],
    ],
  };

  return copy.titles.map((title, index) => {
    const variant = index + 1;
    const marker = `nlm:curated=weekly-2026-07-20-${event.eventKey}-${locale}-${variant}`;
    const canonicalSiteUrl = getCanonicalSiteUrl(event.eventKey, locale);
    const contacts = [
      `<li><strong>${isIt ? 'Biglietti e tavoli:' : 'Tickets and tables:'}</strong> ${anchor(event.affiliateUrl, isIt ? 'Acquista su Xceed' : 'Buy on Xceed')}</li>`,
      `<li><strong>WhatsApp:</strong> ${anchor('https://wa.me/393519127047', '+39 351 912 7047')}</li>`,
      `<li><strong>${isIt ? 'Guida completa:' : 'Full event guide:'}</strong> ${anchor(canonicalSiteUrl, isIt ? 'programma, dress code, location e FAQ su Nightlife Milan' : 'programme, dress code, venue and FAQ on Nightlife Milan')}</li>`,
      `<li>${escapeHtml(isIt ? 'Dopo l’acquisto invia la conferma Xceed su WhatsApp con nome, evento e numero di persone.' : 'After purchase, send the Xceed confirmation on WhatsApp with your name, event and number of guests.')}</li>`,
    ].join('');
    const programme = copy.programme.map((item) => `<li><strong>${escapeHtml(item.start)}</strong> — ${escapeHtml(item.title)}</li>`).join('');
    const offers = event.offers.map((item) => `<li>${escapeHtml(`${item.name} — ${item.currency} ${item.price}`)}</li>`).join('');
    const faqs = copy.faqs.map((faq, faqIndex) => `<div data-event-faq="true"><h3>${faqIndex + 1}. ${escapeHtml(faq.question)}</h3><p>${escapeHtml(faq.answer)}</p></div>`).join('');
    const keywords = copy.keywordPermutations.map((keyword) => `<li>${escapeHtml(keyword)}</li>`).join('');
    const html = [
      `<p><strong>${escapeHtml(copy.summary)}</strong></p>`,
      `<h2>${contactTitle}</h2><ul data-contact-list="true">${contacts}</ul>`,
      image(mediaUrls[0], labels.posterTitle, labels.posterAlt),
      `<h2>${labels.programme}</h2><ul>${programme}</ul>`,
      `<h2>${labels.target}</h2><p>${escapeHtml(copy.sections.target)}</p>`,
      `<h2>${labels.dress}</h2><p>${escapeHtml(copy.sections.dress)}</p>`,
      `<h2>${labels.mood}</h2><p>${escapeHtml(copy.sections.mood)}</p>`,
      `<h2>${labels.music}</h2><p>${escapeHtml(copy.sections.music)}</p>`,
      `<h2>${labels.location}</h2><p>${escapeHtml(copy.sections.location)}</p>`,
      `<h2>${labels.offers}</h2><ul>${offers}</ul>`,
      `<h2>${labels.nonAdmission}</h2><p><strong>${escapeHtml(copy.sections.nonAdmission)}</strong></p>`,
      ...mediaUrls.slice(1).map((url, index) => image(url, labels.moodImages[index][0], labels.moodImages[index][1])),
      `<h2>${faqTitle}</h2>${faqs}`,
      `<section data-seo-keywords="true"><h2 data-seo-closing="true">${discoveryTitle}</h2><p>${escapeHtml(copy.seoClosing)}</p><ol>${keywords}</ol></section>`,
      `<!-- ${marker} -->`,
    ].join('');
    const payload: WeeklyJuly20EventbritePayload = {
      eventKey: event.eventKey, locale, variant, title, summary: copy.summary, marker, canonicalSiteUrl,
      eventbriteLocale: locale === 'it' ? 'it_IT' : 'en_GB', descriptionHtml: html,
      ticket: copy.ticket, confirmation: copy.confirmation,
    };
    validateWeeklyJuly20EventbritePayload(payload, mediaUrls, event.affiliateUrl);
    return payload;
  });
}

export function validateWeeklyJuly20EventbritePayload(
  payload: WeeklyJuly20EventbritePayload,
  mediaUrls: readonly string[],
  affiliateUrl?: string,
): void {
  if ([...payload.title].length > 75) throw new Error(`${payload.marker}: title exceeds 75 characters`);
  if ([...payload.summary].length > 140) throw new Error(`${payload.marker}: summary exceeds 140 characters`);
  if ((payload.descriptionHtml.match(/data-event-faq(?:=|\s)/gi) || []).length !== 25) throw new Error(`${payload.marker}: expected 25 FAQ`);
  if ((payload.descriptionHtml.match(/<img\b/gi) || []).length !== 5) throw new Error(`${payload.marker}: expected five body images`);
  if ((payload.descriptionHtml.match(/display:\s*block;\s*width:\s*100%;\s*max-width:\s*100%;\s*height:\s*auto/gi) || []).length !== 5) throw new Error(`${payload.marker}: responsive styles missing`);
  const html = payload.descriptionHtml.replace(/&amp;/g, '&');
  if (mediaUrls.some((url) => !html.includes(url.replace(/&amp;/g, '&')))) throw new Error(`${payload.marker}: missing media URL`);
  if ((payload.descriptionHtml.match(new RegExp(payload.marker, 'g')) || []).length !== 1) throw new Error(`${payload.marker}: marker must be unique`);
  if (!html.includes(affiliateUrl || '') || !html.includes('+39 351 912 7047')) throw new Error(`${payload.marker}: booking data missing`);
  if (!payload.canonicalSiteUrl || !html.includes(payload.canonicalSiteUrl)) throw new Error(`${payload.marker}: same-language site master missing`);
  const contactsPosition = payload.descriptionHtml.search(new RegExp(payload.locale === 'it' ? 'Contatti e prenotazioni' : 'Contacts and booking', 'i'));
  const posterOffset = contactsPosition < 0 ? -1 : payload.descriptionHtml.slice(contactsPosition).search(/<img\b/i);
  const posterPosition = posterOffset < 0 ? -1 : contactsPosition + posterOffset;
  if (contactsPosition < 0 || posterPosition < contactsPosition) throw new Error(`${payload.marker}: poster must follow the contact bullets`);
  if (/<br\s*\/?\s*>/i.test(payload.descriptionHtml)) throw new Error(`${payload.marker}: br tags are forbidden`);
  if (/[🌀-🫿]/u.test(payload.descriptionHtml)) throw new Error(`${payload.marker}: emoji are forbidden`);
  const faqPosition = payload.descriptionHtml.indexOf(payload.locale === 'it' ? 'Domande frequenti' : 'Frequently asked questions');
  const seoPosition = payload.descriptionHtml.indexOf(payload.locale === 'it' ? 'Ricerche utili per prenotare' : 'Useful booking searches');
  if (faqPosition < 0 || seoPosition <= faqPosition) throw new Error(`${payload.marker}: SEO block must follow FAQ`);
  const seoBlock = payload.descriptionHtml.match(/<section data-seo-keywords="true">([\s\S]*?)<\/section>/i);
  if (!seoBlock) throw new Error(`${payload.marker}: SEO keyword block missing`);
  if ((seoBlock[1].match(/<li>/gi) || []).length !== 10) throw new Error(`${payload.marker}: expected exactly 10 keyword permutations`);
  const markerPosition = payload.descriptionHtml.lastIndexOf(`<!-- ${payload.marker} -->`);
  const normalizedMarkup = payload.descriptionHtml.replace(/<[^>]+>/g, (tag) => tag.toLowerCase());
  const seoEndPosition = normalizedMarkup.indexOf('</section>', seoPosition) + '</section>'.length;
  if (markerPosition <= seoPosition || seoEndPosition <= seoPosition) {
    throw new Error(`${payload.marker}: technical marker must follow the SEO block`);
  }
  if (payload.descriptionHtml.slice(seoEndPosition, markerPosition).trim()) {
    throw new Error(`${payload.marker}: no content may follow the final SEO block before the technical marker`);
  }
}

export { WEEKLY_JULY20_BATCH_EVENTS };
