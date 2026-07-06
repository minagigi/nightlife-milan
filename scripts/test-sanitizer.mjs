#!/usr/bin/env node
/**
 * Test manuale di lib/brandSanitizer.ts — Fase 4A.
 * Duplica minimamente la logica per verificarla in isolamento (Node ESM puro
 * non risolve gli import extensionless/alias di file .ts sorgente, solo
 * Next.js/webpack lo fa in produzione — vedi nota in scripts/scout-spike.mjs).
 */

const OUR_NUMBER = '+39 351 912 7047';
const OUR_LINK = 'https://wa.me/393519127047';
const OUR_LAST9 = '519127047';
const BLACKLIST = ['cosa fare a milano', 'cosafareamilano'];

const PHONE_RE = /(\+?\d[\d .\-()]{7,}\d)/g;
const URL_RE = /https?:\/\/[^\s"'<>)]+/gi;
const BARE_DOMAIN_RE = /\b((?:www\.)?[a-z0-9-]+\.(?:com|it|net|org|info|eu|club|shop))\b/gi;
const HANDLE_RE = /(^|[\s(])@[a-z0-9_.]{2,30}/gi;
const HASHTAG_RE = /(^|[\s(])#[a-z0-9_]{2,30}/gi;
const WA_PLACEHOLDER_RE = /\{\{\s*WHATSAPP\s*\}\}/g;

function isOurPhone(m) { return m.replace(/\D/g, '').includes(OUR_LAST9); }
function isOurUrl(u) { return /nightlifemilan\.com/i.test(u) || /wa\.me\/393519127047/i.test(u); }
function escapeRegex(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

function sanitize(html) {
  let out = html;
  out = out.replace(WA_PLACEHOLDER_RE, `<a href="${OUR_LINK}">${OUR_NUMBER}</a>`);
  out = out.replace(PHONE_RE, (m) => (isOurPhone(m) ? m : OUR_NUMBER));
  out = out.replace(URL_RE, (m) => (isOurUrl(m) ? m : ''));
  out = out.replace(BARE_DOMAIN_RE, (m) => (isOurUrl(m) ? m : ''));
  out = out.replace(HANDLE_RE, (_m, pre) => pre);
  out = out.replace(HASHTAG_RE, (_m, pre) => pre);
  for (const name of BLACKLIST) {
    out = out.replace(new RegExp(escapeRegex(name), 'gi'), 'Nightlife Milan');
  }
  return out;
}

const cases = [
  { in: 'Chiamaci al +39 02 1234567 per prenotare', expect_no: '+39 02 1234567', expect_has: OUR_NUMBER },
  { in: 'Prenota su www.altrosito.com o su altroevents.it', expect_no: 'altrosito.com', expect_has: '' },
  { in: 'Seguici su @discoteca_milano per novità', expect_no: '@discoteca_milano', expect_has: '' },
  { in: 'Serata top #milanonightlife #party', expect_no: '#milanonightlife', expect_has: '' },
  { in: 'Evento offerto da Cosa Fare a Milano, il portale eventi', expect_no: 'Cosa Fare a Milano', expect_has: 'Nightlife Milan' },
  { in: 'Prenota tavolo: {{WHATSAPP}}', expect_no: '{{WHATSAPP}}', expect_has: OUR_NUMBER },
  { in: `Contattaci: ${OUR_NUMBER}`, expect_no: '__never__', expect_has: OUR_NUMBER }, // il nostro numero non va toccato
  { in: 'Sito ufficiale: nightlifemilan.com', expect_no: '__never__', expect_has: 'nightlifemilan.com' },
];

let pass = 0, fail = 0;
for (const c of cases) {
  const result = sanitize(c.in);
  const okNo = c.expect_no === '__never__' || !result.includes(c.expect_no);
  const okHas = c.expect_has === '' || result.includes(c.expect_has);
  const ok = okNo && okHas;
  console.log(`${ok ? 'PASS' : 'FAIL'} | in: "${c.in}"\n     out: "${result}"`);
  if (ok) pass++; else fail++;
}
console.log(`\n${pass} pass, ${fail} fail`);
process.exit(fail > 0 ? 1 : 0);
