// Rendering dell'email post-registrazione Eventbrite (subject/html/text) per un
// singolo destinatario, piu' le utility di formattazione data e unsubscribe firmato.
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

export function formatEventDateForLocale(iso: string | null, locale: LocaleCode): string | null {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;

  const tag = INTL_TAG_OVERRIDES[locale] ?? getLocaleDef(locale)?.hreflang ?? locale;
  return new Intl.DateTimeFormat(tag, {
    timeZone: 'Europe/Rome',
    weekday: 'long',
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

function resolveGreetingName(recipient: AttendeeEmailRecipient): string | null {
  const firstWordOfName = recipient.name ? recipient.name.trim().split(/\s+/)[0] : null;
  return recipient.firstName || firstWordOfName || null;
}

// Numero WhatsApp come link oro, riusato nel blocco CTA e nell'afterPurchase.
function whatsappAnchorHtml(): string {
  const href = safeHttpsHref(CONTACT.whatsapp.link) ?? '';
  return `<a href="${href}" style="color:#C9A86A;">${escapeHtml(CONTACT.whatsapp.number)}</a>`;
}

// conf.afterPurchase arriva gia' con il numero in chiaro (non un placeholder):
// si escapa il testo e si sostituisce la sotto-stringa del numero col link.
function linkWhatsAppNumber(rawText: string): string {
  const escapedPhone = escapeHtml(CONTACT.whatsapp.number);
  return escapeHtml(rawText).replace(escapedPhone, whatsappAnchorHtml());
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
  const name = resolveGreetingName(recipient);
  const formattedDate = formatEventDateForLocale(event.eventStartUtc, event.locale);
  const unsubscribeUrl = buildUnsubscribeUrl(recipient.contactId, event.locale);

  // Il subject e' testo puro, niente escape HTML.
  const subject = copy.subject.replace('{event}', event.eventName);

  // --- testo semplice ---
  const greetingText = name ? copy.greeting.replace('{name}', name) : copy.greetingNoName;
  const introText = copy.intro.replace('{event}', event.eventName);
  const detailsTextLines = [event.eventName, event.venueName, formattedDate].filter(
    (line): line is string => Boolean(line),
  );
  const whatsappCtaText = copy.whatsappCta.replace('{phone}', CONTACT.whatsapp.number);

  const textBlocks: string[] = [greetingText, introText, detailsTextLines.join('\n'), conf.notTicket];
  if (hasAffiliateLinks) {
    textBlocks.push([conf.purchase, ...event.affiliateUrls].join('\n'));
    textBlocks.push(conf.afterPurchase);
  }
  textBlocks.push(whatsappCtaText, copy.whyReceiving, `${copy.unsubscribeLabel}: ${unsubscribeUrl}`);
  const text = textBlocks.join('\n\n');

  // --- html ---
  const greetingHtml = name ? fillEscaped(copy.greeting, '{name}', name) : escapeHtml(copy.greetingNoName);
  const introHtml = fillEscaped(copy.intro, '{event}', event.eventName);

  const detailsRowsHtml = [event.venueName, formattedDate]
    .filter((line): line is string => Boolean(line))
    .map((line) => `<p style="margin:0 0 4px; color:#EDEDF2; text-align:${align};">${escapeHtml(line)}</p>`)
    .join('');

  const detailsHtml = [
    `<p style="margin:0 0 4px; color:#C9A86A; font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:1px; text-align:${align};">${escapeHtml(copy.detailsHeading)}</p>`,
    `<h1 style="margin:0 0 8px; color:#ffffff; font-size:22px; line-height:1.3; text-align:${align};">${escapeHtml(event.eventName)}</h1>`,
    detailsRowsHtml,
  ].join('');

  const buttonsHtml = event.affiliateUrls
    .map((url, index) => {
      const href = safeHttpsHref(url);
      if (!href) return '';
      const label = escapeHtml(pack?.eventbrite.buyTickets ?? '') + (event.affiliateUrls.length > 1 ? ` ${index + 1}` : '');
      return [
        '<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:8px 0;">',
        `<a href="${href}" style="background-color:#C9A86A; color:#0B0B10; padding:14px 28px; border-radius:8px; font-weight:700; display:inline-block; text-decoration:none;">${label}</a>`,
        '</td></tr></table>',
      ].join('');
    })
    .join('');

  // Purchase + bottoni + afterPurchase esistono solo se ci sono link affiliati:
  // altrimenti la frase "acquista tramite uno dei link sottostanti" non avrebbe senso.
  const purchaseHtml = hasAffiliateLinks
    ? [
        `<p style="margin:0 0 16px; color:#EDEDF2; text-align:${align};">${escapeHtml(conf.purchase)}</p>`,
        buttonsHtml,
        `<p style="margin:16px 0 0; color:#EDEDF2; text-align:${align};">${linkWhatsAppNumber(conf.afterPurchase)}</p>`,
      ].join('')
    : '';

  const whatsappBlockHtml = fillEscapedWithHtml(copy.whatsappCta, '{phone}', whatsappAnchorHtml());
  const unsubscribeHref = safeHttpsHref(unsubscribeUrl) ?? '';

  const html = [
    `<div style="display:none; font-size:1px; line-height:1px; max-height:0; max-width:0; opacity:0; overflow:hidden; mso-hide:all;">${introHtml}</div>`,
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0"${dirAttr} style="background-color:#0B0B10; margin:0; padding:0;">`,
    '<tr><td align="center" style="padding:32px 16px;">',
    '<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px; max-width:600px; background-color:#14141C; border:1px solid #2A2A35; border-radius:12px;">',
    `<tr><td style="padding:32px; font-family:-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">`,
    '<p style="margin:0 0 24px; color:#C9A86A; font-size:16px; font-weight:700; letter-spacing:4px; text-align:center;">NIGHTLIFE MILAN</p>',
    `<p style="margin:0 0 12px; color:#EDEDF2; text-align:${align};">${greetingHtml}</p>`,
    `<p style="margin:0 0 24px; color:#EDEDF2; text-align:${align};">${introHtml}</p>`,
    detailsHtml,
    `<p style="margin:24px 0 16px; color:#EDEDF2; text-align:${align};"><strong>${escapeHtml(conf.notTicket)}</strong></p>`,
    purchaseHtml,
    `<p style="margin:16px 0 0; color:#EDEDF2; text-align:${align};">${whatsappBlockHtml}</p>`,
    '<div style="margin-top:32px; padding-top:16px; border-top:1px solid #2A2A35;">',
    `<p style="margin:0 0 8px; color:#9A9AA8; font-size:12px; text-align:${align};">${escapeHtml(copy.whyReceiving)}</p>`,
    `<p style="margin:0 0 8px; color:#9A9AA8; font-size:12px; text-align:${align};"><a href="${unsubscribeHref}" style="color:#9A9AA8; text-decoration:underline;">${escapeHtml(copy.unsubscribeLabel)}</a></p>`,
    `<p style="margin:0; color:#9A9AA8; font-size:12px; text-align:${align};">© Nightlife Milan · nightlifemilan.com</p>`,
    '</div>',
    '</td></tr>',
    '</table>',
    '</td></tr>',
    '</table>',
  ].join('');

  return { subject, html, text, unsubscribeUrl };
}
