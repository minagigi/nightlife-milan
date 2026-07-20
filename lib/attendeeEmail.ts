// Rendering dell'email post-registrazione Eventbrite (subject/html/text) per un
// singolo destinatario, piu' le utility di formattazione data e unsubscribe firmato.
// Stile TRANSAZIONALE (ricevuta): fondo bianco, riepilogo label/valore, link
// semplici, nessun elemento decorativo. Personalizzazione per utente: nome e
// cognome, ordine, tipo registrazione, persone, data registrazione.
// Contratto: lib/attendeeEmailTypes.ts. Copy testi: lib/attendeeEmailCopy.ts.
import { createHmac } from 'node:crypto';
import { CONTACT } from '@/config/contact';
import { getAttendeeEmailCopy } from './attendeeEmailCopy';
import type { AttendeeEmailEventInfo, AttendeeEmailRecipient, RenderedAttendeeEmail } from './attendeeEmailTypes';
import { getEventbriteConfirmationPlainText } from './eventbriteConfirmation';
import { getEventLocalePack } from './eventLocalePacks';
import { getLocaleDef, type LocaleCode } from './i18n/locales';

// Eccezioni al tag Intl derivato da hreflang: serbo in latino (come il copy),
// norvegese bokmal, arabo con calendario gregoriano e cifre latine (non arabo-indiane).
const INTL_TAG_OVERRIDES: Partial<Record<LocaleCode, string>> = {
  sr: 'sr-Latn',
  no: 'nb',
  ar: 'ar-u-ca-gregory-nu-latn',
};

function intlTag(locale: LocaleCode): string {
  return INTL_TAG_OVERRIDES[locale] ?? getLocaleDef(locale)?.hreflang ?? locale;
}

export function formatEventDateForLocale(iso: string | null, locale: LocaleCode): string | null {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;

  return new Intl.DateTimeFormat(intlTag(locale), {
    timeZone: 'Europe/Rome',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

// Variante compatta (senza giorno della settimana) per timestamp secondari,
// es. la data di registrazione nel riepilogo.
export function formatShortDateForLocale(iso: string | null, locale: LocaleCode): string | null {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;

  return new Intl.DateTimeFormat(intlTag(locale), {
    timeZone: 'Europe/Rome',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

function resolveUnsubscribeSecret(): string {
  const secret = process.env.EMAIL_LINK_SECRET || process.env.CRM_SYNC_SECRET || process.env.CRON_SECRET;
  if (!secret) throw new Error('Missing unsubscribe secret');
  return secret;
}

export function unsubscribeSignature(contactId: string): string {
  const secret = resolveUnsubscribeSecret();
  return createHmac('sha256', secret).update(contactId).digest('hex').slice(0, 32);
}

export function buildUnsubscribeUrl(contactId: string, locale: LocaleCode, baseUrl?: string): string {
  const base = (baseUrl || process.env.APP_URL || 'https://nightlifemilan.com').replace(/\/+$/, '');
  const signature = unsubscribeSignature(contactId);
  return `${base}/api/crm/email-unsubscribe?c=${encodeURIComponent(contactId)}&l=${locale}&t=${signature}`;
}

// Identica alla escapeHtml di lib/eventbriteConfirmation.ts (non esportata li').
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Escapa il template e il valore dinamico, poi sostituisce il placeholder (i
// caratteri { } non vengono toccati da escapeHtml quindi il token sopravvive).
function fillEscaped(template: string, token: string, rawValue: string): string {
  return escapeHtml(template).replace(token, escapeHtml(rawValue));
}

// Come fillEscaped ma il rimpiazzo e' gia' HTML fidato (es. un link costruito da noi).
function fillEscapedWithHtml(template: string, token: string, rawHtml: string): string {
  return escapeHtml(template).replace(token, rawHtml);
}

// Valida che l'URL sia https prima di escaparlo per un attributo href.
function safeHttpsHref(url: string): string | null {
  return url.startsWith('https://') ? escapeHtml(url) : null;
}

// Nome e cognome completi per il saluto transazionale; fallback sul nome
// intero del profilo, altrimenti saluto senza nome.
function resolveFullName(recipient: AttendeeEmailRecipient): string | null {
  const composed = [recipient.firstName, recipient.lastName]
    .map((part) => part?.trim() || '')
    .filter(Boolean)
    .join(' ');
  return composed || recipient.name?.trim() || null;
}

const LINK_COLOR = '#1a56db';
const TEXT_COLOR = '#111111';
const MUTED_COLOR = '#555555';
const FOOTER_COLOR = '#777777';
const BORDER_COLOR = '#e5e5e5';

// Numero WhatsApp come link, riusato nel blocco CTA e nell'afterPurchase.
function whatsappAnchorHtml(): string {
  const href = safeHttpsHref(CONTACT.whatsapp.link) ?? '';
  return `<a href="${href}" style="color:${LINK_COLOR};">${escapeHtml(CONTACT.whatsapp.number)}</a>`;
}

// conf.afterPurchase arriva gia' con il numero in chiaro (non un placeholder):
// si escapa il testo e si sostituisce la sotto-stringa del numero col link.
function linkWhatsAppNumber(rawText: string): string {
  const escapedPhone = escapeHtml(CONTACT.whatsapp.number);
  return escapeHtml(rawText).replace(escapedPhone, whatsappAnchorHtml());
}

interface SummaryRow {
  label: string;
  value: string;
}

export function renderAttendeeEmail(
  event: AttendeeEmailEventInfo,
  recipient: AttendeeEmailRecipient,
): RenderedAttendeeEmail {
  const copy = getAttendeeEmailCopy(event.locale);
  const conf = getEventbriteConfirmationPlainText(event.locale);
  const pack = getEventLocalePack(event.locale);
  const def = getLocaleDef(event.locale);
  const rtl = def?.dir === 'rtl';
  const align = rtl ? 'right' : 'left';
  const dirAttr = rtl ? ' dir="rtl"' : '';

  const hasAffiliateLinks = event.affiliateUrls.length > 0;
  const fullName = resolveFullName(recipient);
  const formattedEventDate = formatEventDateForLocale(event.eventStartUtc, event.locale);
  const formattedRegisteredAt = formatShortDateForLocale(recipient.registeredAtUtc, event.locale);
  const unsubscribeUrl = buildUnsubscribeUrl(recipient.contactId, event.locale);

  // Il subject e' testo puro, niente escape HTML.
  const subject = copy.subject.replace('{event}', event.eventName);

  // Righe personalizzate del riepilogo (label: valore), solo dati presenti.
  const summaryRows: SummaryRow[] = [];
  if (recipient.orderId) summaryRows.push({ label: copy.orderLabel, value: `#${recipient.orderId}` });
  if (recipient.ticketClassName) summaryRows.push({ label: copy.ticketTypeLabel, value: recipient.ticketClassName });
  if (recipient.guests >= 1) summaryRows.push({ label: copy.guestsLabel, value: String(recipient.guests) });
  if (formattedRegisteredAt) summaryRows.push({ label: copy.registeredOnLabel, value: formattedRegisteredAt });

  // --- testo semplice ---
  const greetingText = fullName ? copy.greeting.replace('{name}', fullName) : copy.greetingNoName;
  const introText = copy.intro.replace('{event}', event.eventName);
  const summaryTextLines = [
    event.eventName,
    event.venueName,
    formattedEventDate,
    ...summaryRows.map((row) => `${row.label}: ${row.value}`),
  ].filter((line): line is string => Boolean(line));
  const whatsappCtaText = copy.whatsappCta.replace('{phone}', CONTACT.whatsapp.number);

  const textBlocks: string[] = [greetingText, introText, summaryTextLines.join('\n'), conf.notTicket];
  if (hasAffiliateLinks) {
    textBlocks.push([conf.purchase, ...event.affiliateUrls].join('\n'));
    textBlocks.push(conf.afterPurchase);
  }
  textBlocks.push(whatsappCtaText, copy.whyReceiving, `${copy.unsubscribeLabel}: ${unsubscribeUrl}`);
  const text = textBlocks.join('\n\n');

  // --- html ---
  const greetingHtml = fullName ? fillEscaped(copy.greeting, '{name}', fullName) : escapeHtml(copy.greetingNoName);
  const introHtml = fillEscaped(copy.intro, '{event}', event.eventName);

  const eventRowsHtml = [event.venueName, formattedEventDate]
    .filter((line): line is string => Boolean(line))
    .map((line) => `<p style="margin:0 0 2px; color:${TEXT_COLOR}; text-align:${align};">${escapeHtml(line)}</p>`)
    .join('');

  const summaryRowsHtml = summaryRows
    .map((row) => [
      `<tr><td style="padding:6px 0; color:${MUTED_COLOR}; font-size:13px; white-space:nowrap; vertical-align:top; text-align:${align};">${escapeHtml(row.label)}</td>`,
      `<td style="padding:6px 0 6px 16px; color:${TEXT_COLOR}; font-size:13px; text-align:${align};">${escapeHtml(row.value)}</td></tr>`,
    ].join(''))
    .join('');

  const summaryHtml = [
    `<p style="margin:0 0 6px; color:${MUTED_COLOR}; font-size:12px; text-transform:uppercase; letter-spacing:0.5px; text-align:${align};">${escapeHtml(copy.detailsHeading)}</p>`,
    `<p style="margin:0 0 2px; color:${TEXT_COLOR}; font-size:16px; font-weight:700; text-align:${align};">${escapeHtml(event.eventName)}</p>`,
    eventRowsHtml,
    summaryRowsHtml
      ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:10px; border-top:1px solid ${BORDER_COLOR};"${dirAttr}>${summaryRowsHtml}</table>`
      : '',
  ].join('');

  const affiliateLinksHtml = event.affiliateUrls
    .map((url, index) => {
      const href = safeHttpsHref(url);
      if (!href) return '';
      const label = escapeHtml(pack?.eventbrite.buyTickets ?? '') + (event.affiliateUrls.length > 1 ? ` ${index + 1}` : '');
      return `<p style="margin:0 0 6px; text-align:${align};"><a href="${href}" style="color:${LINK_COLOR};">${label}</a></p>`;
    })
    .join('');

  // Purchase + link + afterPurchase esistono solo se ci sono link affiliati:
  // altrimenti la frase "acquista tramite uno dei link sottostanti" non avrebbe senso.
  const purchaseHtml = hasAffiliateLinks
    ? [
        `<p style="margin:0 0 8px; color:${TEXT_COLOR}; text-align:${align};">${escapeHtml(conf.purchase)}</p>`,
        affiliateLinksHtml,
        `<p style="margin:10px 0 0; color:${TEXT_COLOR}; text-align:${align};">${linkWhatsAppNumber(conf.afterPurchase)}</p>`,
      ].join('')
    : '';

  const whatsappBlockHtml = fillEscapedWithHtml(copy.whatsappCta, '{phone}', whatsappAnchorHtml());
  const unsubscribeHref = safeHttpsHref(unsubscribeUrl) ?? '';

  const html = [
    `<div style="display:none; font-size:1px; line-height:1px; max-height:0; max-width:0; opacity:0; overflow:hidden; mso-hide:all;">${introHtml}</div>`,
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0"${dirAttr} style="background-color:#ffffff; margin:0; padding:0;">`,
    '<tr><td align="center" style="padding:24px 16px;">',
    '<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="width:560px; max-width:560px;">',
    `<tr><td style="font-family:-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:14px; line-height:1.55;">`,
    `<p style="margin:0 0 4px; color:${TEXT_COLOR}; font-size:15px; font-weight:700; text-align:${align};">Nightlife Milan</p>`,
    `<div style="border-top:1px solid ${BORDER_COLOR}; margin:0 0 16px;"></div>`,
    `<p style="margin:0 0 10px; color:${TEXT_COLOR}; text-align:${align};">${greetingHtml}</p>`,
    `<p style="margin:0 0 16px; color:${TEXT_COLOR}; text-align:${align};">${introHtml}</p>`,
    summaryHtml,
    `<p style="margin:18px 0 12px; color:${TEXT_COLOR}; text-align:${align};"><strong>${escapeHtml(conf.notTicket)}</strong></p>`,
    purchaseHtml,
    `<p style="margin:12px 0 0; color:${TEXT_COLOR}; text-align:${align};">${whatsappBlockHtml}</p>`,
    `<div style="margin-top:24px; padding-top:12px; border-top:1px solid ${BORDER_COLOR};">`,
    `<p style="margin:0 0 6px; color:${FOOTER_COLOR}; font-size:12px; text-align:${align};">${escapeHtml(copy.whyReceiving)}</p>`,
    `<p style="margin:0 0 6px; color:${FOOTER_COLOR}; font-size:12px; text-align:${align};"><a href="${unsubscribeHref}" style="color:${FOOTER_COLOR}; text-decoration:underline;">${escapeHtml(copy.unsubscribeLabel)}</a></p>`,
    `<p style="margin:0; color:${FOOTER_COLOR}; font-size:12px; text-align:${align};">Nightlife Milan · nightlifemilan.com</p>`,
    '</div>',
    '</td></tr>',
    '</table>',
    '</td></tr>',
    '</table>',
  ].join('');

  return { subject, html, text, unsubscribeUrl };
}
