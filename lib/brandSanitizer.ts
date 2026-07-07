import { CONTACT } from '@/config/contact';
import { PROMOTER_BLACKLIST } from './promoterBlacklist';

/**
 * Seconda linea di difesa deterministica (regex) sul testo già riscritto da
 * Sonnet — Fase 4A. Il modello può sbagliare; questa funzione pura non dipende
 * dall'AI e garantisce che nessun contatto/brand di terzi sopravviva all'output
 * finale prima della pubblicazione.
 */

const OUR_PHONE_DIGITS = CONTACT.whatsapp.number.replace(/\D/g, ''); // "393519127047"
const PHONE_RE = /(\+?\d[\d .\-()]{7,}\d)/g;
const URL_RE = /https?:\/\/[^\s"'<>)]+/gi;
// Domini bare senza protocollo (es. "www.altrosito.com", "altrositoevents.it") — comuni
// su locandine/testi di terzi. Esclude i TLD generici usati in prosa normale (.it/.com/…
// dentro parole comuni sono rari, ma per sicurezza richiede un separatore di parola prima).
const BARE_DOMAIN_RE = /\b((?:www\.)?[a-z0-9-]+\.(?:com|it|net|org|info|eu|club|shop))\b/gi;
const HANDLE_RE = /(^|[\s(])@[a-z0-9_.]{2,30}/gi;
const HASHTAG_RE = /(^|[\s(])#[a-z0-9_]{2,30}/gi;
const WHATSAPP_PLACEHOLDER_RE = /\{\{\s*WHATSAPP\s*\}\}/g;

function isOurPhone(rawMatch: string): boolean {
  return rawMatch.replace(/\D/g, '').includes(OUR_PHONE_DIGITS.slice(-9)); // ultime 9 cifre, senza prefisso
}

function isOurUrl(url: string): boolean {
  return /nightlifemilan\.com/i.test(url) || /wa\.me\/393519127047/i.test(url);
}

export function sanitize(html: string, knownOrganizers: string[] = []): string {
  let out = html;

  // 1. Placeholder WhatsApp → numero + link reale (SEMPRE dal config, mai hardcodato).
  // Testo semplice, non HTML: Eventbrite html-escapa qualunque tag ricevuto via API
  // (scoperto nello spike G0) — un <a href> finirebbe visibile come testo letterale.
  out = out.replace(
    WHATSAPP_PLACEHOLDER_RE,
    `${CONTACT.whatsapp.number} (${CONTACT.whatsapp.link})`
  );

  // 2. Telefoni di terzi → il nostro
  out = out.replace(PHONE_RE, (match) => (isOurPhone(match) ? match : CONTACT.whatsapp.number));

  // 3. URL non nostri → rimossi (con protocollo esplicito e domini bare tipo "www.xxx.com")
  out = out.replace(URL_RE, (match) => (isOurUrl(match) ? match : ''));
  out = out.replace(BARE_DOMAIN_RE, (match) => (isOurUrl(match) ? match : ''));

  // 4. Handle e hashtag → rimossi
  out = out.replace(HANDLE_RE, (_match, pre) => pre);
  out = out.replace(HASHTAG_RE, (_match, pre) => pre);

  // 5. Blacklist promoter/agenzie → "Nightlife Milan"
  const allBlacklisted = [...new Set([...PROMOTER_BLACKLIST, ...knownOrganizers.map((n) => n.toLowerCase().trim())])].filter(Boolean);
  for (const name of allBlacklisted) {
    if (!name) continue;
    const re = new RegExp(escapeRegex(name), 'gi');
    out = out.replace(re, 'Nightlife Milan');
  }

  return out;
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
