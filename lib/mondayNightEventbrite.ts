import { getMondayNightLocalizedContent, MONDAY_NIGHT_AFFILIATE_URL, MONDAY_NIGHT_EVENTBRITE_TITLES, MONDAY_NIGHT_PHONE } from './weeklyJuly20Pilot';

export type MondayNightLocale = 'en' | 'it';

export interface MondayNightEventbritePayload {
  locale: MondayNightLocale;
  variant: number;
  title: string;
  summary: string;
  marker: string;
  descriptionHtml: string;
  eventbriteLocale: 'en_GB' | 'it_IT';
  ticket: { name: string; description: string };
  confirmation: { heading: string; details: string };
}

const escapeHtml = (value: string) => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

function anchor(url: string, label: string): string {
  return `<a href="${escapeHtml(url)}" rel="nofollow noopener noreferrer">${escapeHtml(label)}</a>`;
}

function image(url: string, title: string, alt: string): string {
  return `<h3>${escapeHtml(title)}</h3><p><img src="${escapeHtml(url)}" alt="${escapeHtml(alt)}" title="${escapeHtml(title)}" style="display:block;width:100%;max-width:100%;height:auto" /></p>`;
}

export function buildMondayNightEventbritePayloads(
  locale: MondayNightLocale,
  mediaUrls: readonly [string, string, string, string, string],
): MondayNightEventbritePayload[] {
  const content = getMondayNightLocalizedContent(locale);
  const isIt = locale === 'it';
  const siteUrl = isIt
    ? 'https://nightlifemilan.com/it/events/just-me-milano-lunedi-20-luglio-2026'
    : 'https://nightlifemilan.com/events/just-me-milano-monday-night-july-20-2026';
  const searches = isIt ? [
    'Just Me Milano lunedì 20 luglio 2026 biglietti',
    'discoteca Milano lunedì sera',
    'aperitivo Just Me Milano lunedì',
    'tavoli VIP Just Me Milano',
    'Monday Night Just Me Milano prenotazioni',
    'nightlife Milano lunedì',
    'club Milano lunedì sera 21+',
    'aperitivo e discoteca Milano lunedì',
    'dove uscire a Milano lunedì sera',
    'biglietti e tavoli Just Me Milano',
  ] : [
    'Just Me Milano Monday Night tickets',
    'Milan nightlife Monday night',
    'Monday nightclub Milan',
    'aperitivo Milan Monday',
    'VIP tables Milan Monday',
    'Milan club Monday night 21+',
    'things to do in Milan Monday night',
    'where to party in Milan Monday',
    'Milan nightlife tickets',
    'Just Me Milan reservations',
  ];
  const mood = isIt ? [
    ['Arrivo alla Torre Branca', 'Quattro ospiti adulti in abbigliamento elegante arrivano alla Torre Branca illuminata di rosa.'],
    ['Aperitivo sulla terrazza', 'Tavolo con sushi e cocktail sulla terrazza del Just Me Milano con Torre Branca e ospiti sullo sfondo.'],
    ['Pubblico e lounge', 'Pubblico adulto in abbigliamento elegante nella lounge esterna illuminata del Just Me Milano.'],
    ['Buffet aperitivo', 'Buffet del Just Me Milano con staff in camicia bianca e ospiti adulti eleganti che scelgono il cibo.'],
  ] : [
    ['Arrival by Torre Branca', 'Four adult guests in elegant evening clothes walking toward the pink-lit Torre Branca.'],
    ['Aperitivo on the terrace', 'Sushi and cocktails on the Just Me Milano terrace with Torre Branca and adult guests behind.'],
    ['Audience and lounge', 'Elegantly dressed adults socializing in the illuminated outdoor lounge at Just Me Milano.'],
    ['Buffet aperitivo', 'Just Me Milano buffet with white-shirted staff and elegantly dressed adult guests selecting food.'],
  ];

  return MONDAY_NIGHT_EVENTBRITE_TITLES[locale].map((title, index) => {
    const variant = index + 1;
    const marker = `nlm:curated=justme-monday-2026-07-20-${locale}-${variant}`;
    const summary = isIt
      ? `Just Me Milano, 20 luglio: aperitivo 19:30, club fino alle 05:00, 21+. WhatsApp ${MONDAY_NIGHT_PHONE}.`
      : `Just Me Milano, July 20: aperitivo 19:30, club until 05:00, 21+. WhatsApp ${MONDAY_NIGHT_PHONE}.`;
    const contacts = isIt
      ? [
          `<li><strong>Biglietti e tavoli:</strong> ${anchor(MONDAY_NIGHT_AFFILIATE_URL, 'Acquista su Xceed')}</li>`,
          `<li><strong>WhatsApp:</strong> ${anchor('https://wa.me/393519127047', MONDAY_NIGHT_PHONE)}</li>`,
          `<li><strong>Guida completa:</strong> ${anchor(siteUrl, 'Monday Night al Just Me Milano')}</li>`,
        ]
      : [
          `<li><strong>Tickets and tables:</strong> ${anchor(MONDAY_NIGHT_AFFILIATE_URL, 'Buy on Xceed')}</li>`,
          `<li><strong>WhatsApp:</strong> ${anchor('https://wa.me/393519127047', MONDAY_NIGHT_PHONE)}</li>`,
          `<li><strong>Full guide:</strong> ${anchor(siteUrl, 'Monday Night at Just Me Milano')}</li>`,
        ];
    const offers = content.offers.map((offer) => `<li>${escapeHtml(offer.name)} — EUR ${offer.price}</li>`).join('');
    const programme = content.programme.map((slot) => `<li><strong>${escapeHtml(slot.start)}</strong> — ${escapeHtml(slot.title)}</li>`).join('');
    const faqs = content.faqs.map((faq, faqIndex) => `<div data-event-faq="true"><h3>${faqIndex + 1}. ${escapeHtml(faq.question)}</h3><p>${escapeHtml(faq.answer)}</p></div>`).join('');
    const discovery = searches.map((term) => `<li>${escapeHtml(term)}</li>`).join('');
    const descriptionHtml = [
      `<p><strong>${escapeHtml(content.answerFirst || content.seoSummary)}</strong></p>`,
      `<h2>${isIt ? 'Contatti e prenotazioni' : 'Contacts and booking'}</h2><ul>${contacts.join('')}</ul>`,
      image(mediaUrls[0], isIt ? 'Locandina Monday Night — Just Me Milano' : 'Monday Night poster — Just Me Milano', isIt ? 'Locandina viola Monday Night con modella in abito elegante e informazioni del 20 luglio 2026' : 'Purple Monday Night poster with a woman in an elegant dress and July 20 2026 event details'),
      `<h2>${isIt ? 'Programma e orari' : 'Programme and times'}</h2><ul>${programme}</ul>`,
      `<h2>${isIt ? 'Target e atmosfera' : 'Target and atmosphere'}</h2><p>${escapeHtml(content.sections[0].body)}</p>`,
      `<h2>${isIt ? 'Dress code e ingresso' : 'Dress code and entry'}</h2><p>${escapeHtml(content.sections[1].body)}</p>`,
      `<h2>${isIt ? 'Mood e musica' : 'Mood and music'}</h2><p>${escapeHtml(content.sections[2].body)}</p>`,
      `<h2>${isIt ? 'Location e arrivo' : 'Location and arrival'}</h2><p>${escapeHtml(content.venueDescription || content.sections[3].body)}</p>`,
      `<h2>${isIt ? 'Formule e prezzi pubblicati' : 'Published offers and prices'}</h2><ul>${offers}</ul>`,
      `<h2>${isIt ? 'Importante prima di registrarti' : 'Important before registering'}</h2><p><strong>${isIt ? 'La registrazione Eventbrite non è un biglietto d’ingresso.' : 'Eventbrite registration is not an admission ticket.'}</strong> ${escapeHtml(isIt ? `Per partecipare acquista su Xceed e invia la conferma su WhatsApp al ${MONDAY_NIGHT_PHONE}.` : `To attend, buy on Xceed and send the confirmation on WhatsApp to ${MONDAY_NIGHT_PHONE}.`)}</p>`,
      ...mediaUrls.slice(1).map((url, moodIndex) => image(url, mood[moodIndex][0], mood[moodIndex][1])),
      `<h2>${isIt ? 'Domande frequenti' : 'Frequently asked questions'}</h2>${faqs}`,
      `<h2>${isIt ? 'Ricerche utili per prenotare' : 'Useful booking searches'}</h2><p>${isIt ? 'Queste formule riassumono le ricerche commerciali più pertinenti per trovare biglietti, tavoli e informazioni sulla serata.' : 'These phrases summarize the most relevant commercial searches for tickets, tables and event information.'}</p><ol>${discovery}</ol>`,
      `<p><strong>${isIt ? 'Prenota ora:' : 'Book now:'}</strong> ${anchor(MONDAY_NIGHT_AFFILIATE_URL, isIt ? 'biglietti e tavoli ufficiali su Xceed' : 'official tickets and tables on Xceed')} — ${anchor('https://wa.me/393519127047', `WhatsApp ${MONDAY_NIGHT_PHONE}`)}.</p>`,
      `<!-- ${marker} -->`,
    ].join('');

    const payload: MondayNightEventbritePayload = {
      locale,
      variant,
      title,
      summary,
      marker,
      descriptionHtml,
      eventbriteLocale: isIt ? 'it_IT' : 'en_GB',
      ticket: isIt ? {
        name: 'RICHIESTA INFORMAZIONI — NON È UN BIGLIETTO',
        description: `Non è un biglietto. Acquista su ${MONDAY_NIGHT_AFFILIATE_URL} e invia la conferma WhatsApp al ${MONDAY_NIGHT_PHONE}.`,
      } : {
        name: 'INFORMATION REQUEST — NOT AN ADMISSION TICKET',
        description: `Not an admission ticket. Buy at ${MONDAY_NIGHT_AFFILIATE_URL} and send the confirmation on WhatsApp to ${MONDAY_NIGHT_PHONE}.`,
      },
      confirmation: isIt ? {
        heading: 'Monday Night — Just Me Milano — 20 luglio 2026',
        details: `Apertura 19:30, chiusura 05:00, ingresso 21+, dress code elegante. Acquista su Xceed e invia la conferma al ${MONDAY_NIGHT_PHONE}.`,
      } : {
        heading: 'Monday Night — Just Me Milano — July 20, 2026',
        details: `Doors 19:30, close 05:00, entry 21+, elegant dress code. Buy on Xceed and send confirmation to ${MONDAY_NIGHT_PHONE}.`,
      },
    };
    validateMondayNightEventbritePayload(payload, mediaUrls);
    return payload;
  });
}

export function validateMondayNightEventbritePayload(
  payload: MondayNightEventbritePayload,
  mediaUrls: readonly string[],
): void {
  if (payload.title.length > 75) throw new Error(`${payload.marker}: title exceeds 75 characters`);
  if (payload.summary.length > 140) throw new Error(`${payload.marker}: summary exceeds 140 characters`);
  if ((payload.descriptionHtml.match(/data-event-faq(?:=|\s)/gi) || []).length !== 25) {
    throw new Error(`${payload.marker}: expected 25 FAQ`);
  }
  if ((payload.descriptionHtml.match(/<img\b/gi) || []).length !== 5) throw new Error(`${payload.marker}: expected five body images`);
  const normalizedHtml = payload.descriptionHtml.replace(/&amp;/g, '&');
  if (mediaUrls.some((url) => !normalizedHtml.includes(url.replace(/&amp;/g, '&')))) throw new Error(`${payload.marker}: missing media URL`);
  if ((payload.descriptionHtml.match(new RegExp(payload.marker, 'g')) || []).length !== 1) throw new Error(`${payload.marker}: marker must be unique`);
  if (!payload.descriptionHtml.includes(MONDAY_NIGHT_AFFILIATE_URL) || !payload.descriptionHtml.includes(MONDAY_NIGHT_PHONE)) throw new Error(`${payload.marker}: booking links missing`);
  if (!payload.descriptionHtml.includes('display:block;width:100%;max-width:100%;height:auto')) throw new Error(`${payload.marker}: responsive image style missing`);
  const faqPosition = payload.descriptionHtml.indexOf(payload.locale === 'it' ? 'Domande frequenti' : 'Frequently asked questions');
  const discoveryPosition = payload.descriptionHtml.indexOf(payload.locale === 'it' ? 'Ricerche utili per prenotare' : 'Useful booking searches');
  if (faqPosition < 0 || discoveryPosition <= faqPosition) throw new Error(`${payload.marker}: discovery block must follow FAQ`);
  if (/<br\s*\/?\s*>/i.test(payload.descriptionHtml)) throw new Error(`${payload.marker}: br tags are forbidden`);
}
