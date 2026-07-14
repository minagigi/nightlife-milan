import fs from 'node:fs';
import path from 'node:path';

const EVENT_ID = '1993899840096';
const BASE_URL = 'https://nightlifemilan.com';

function loadEnv() {
  const env = {};
  const raw = fs.readFileSync('.env.local', 'utf8');
  for (const line of raw.split(/\r?\n/)) {
    const clean = line.replace(/^\uFEFF/, '').replace(/^\s*export\s+/, '');
    if (!/^\s*[A-Z0-9_]+\s*=/.test(clean)) continue;
    const index = clean.indexOf('=');
    env[clean.slice(0, index).trim()] = clean.slice(index + 1).trim().replace(/^['"]|['"]$/g, '');
  }
  return env;
}

function escapeAttr(text) {
  return text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

async function jsonFetch(url, init) {
  const res = await fetch(url, init);
  const text = await res.text();
  if (!res.ok) throw new Error(`${url} failed HTTP ${res.status}: ${text.slice(0, 800)}`);
  return JSON.parse(text);
}

const { CRON_SECRET } = loadEnv();
if (!CRON_SECRET) throw new Error('CRON_SECRET missing');
const authHeaders = { Authorization: `Bearer ${CRON_SECRET}` };

const current = await jsonFetch(`${BASE_URL}/api/events/spike-g0?eventId=${EVENT_ID}`, {
  headers: authHeaders,
});

const currentHtml = current.event.body.description.html;
const posterTag = currentHtml.match(/<IMG[^>]*Locandina portuguesa[^>]*>|<IMG[^>]*Festa Universitaria[^>]*>|<IMG[^>]*Festa Universit/i)?.[0]
  || currentHtml.match(/<IMG[^>]*>/i)?.[0];
if (!posterTag) throw new Error('Current poster IMG tag not found');
const posterUrl = posterTag.match(/SRC="([^"]+)"/i)?.[1];
if (!posterUrl) throw new Error('Current poster SRC not found');

const images = [
  {
    file: 'public/images/events/generated/just-me-university-party-pt-aperitivo-1x1.png',
    title: 'Aperitivo Just Me Milano 14 julho 2026 - vida noturna em Milao',
    alt: 'Aperitivo Just Me Milano para University Party em Milao com estudantes internacionais e reservas WhatsApp',
    description: 'Aperitivo no Just Me Milano antes da University Party: buffet, cocktails, estudantes internacionais, dress code elegante e reservas WhatsApp para a vida noturna em Milao.',
  },
  {
    file: 'public/images/events/generated/just-me-university-party-pt-dancefloor-1x1.png',
    title: 'Dancefloor University Party Just Me Milano - festa universitaria Milao',
    alt: 'Dancefloor da University Party no Just Me Milano com Erasmus, reggaeton, hip hop e EDM em Sempione',
    description: 'Dancefloor da University Party no Just Me Milano: festa universitaria em Milao com Erasmus, hip hop, reggaeton, EDM, guest list e energia internacional.',
  },
  {
    file: 'public/images/events/generated/just-me-university-party-pt-vip-tables-1x1.png',
    title: 'Mesa VIP Just Me Milano - bottle service e guest list Milao',
    alt: 'Mesa VIP Just Me Milano com bottle service, guest list e grupos universitarios em Sempione nightlife',
    description: 'Mesas VIP no Just Me Milano para grupos universitarios: bottle service, guest list, cocktails e reserva WhatsApp para Sempione nightlife.',
  },
  {
    file: 'public/images/events/generated/just-me-university-party-pt-torre-branca-arrival-1x1.png',
    title: 'Torre Branca e Just Me Milano - onde sair em Milao terca-feira',
    alt: 'Chegada ao Just Me Milano perto da Torre Branca para festa universitaria e vida noturna em Milao',
    description: 'Chegada ao Just Me Milano junto a Torre Branca: onde sair em Milao numa terca-feira, com estudantes internacionais, aperitivo e clubbing ate tarde.',
  },
];

for (const image of images) {
  const imageBase64 = fs.readFileSync(path.resolve(image.file)).toString('base64');
  const media = await jsonFetch(`${BASE_URL}/api/admin/upload-eventbrite-media`, {
    method: 'POST',
    headers: { ...authHeaders, 'content-type': 'application/json' },
    body: JSON.stringify({
      imageBase64,
      contentType: 'image/png',
      filename: path.basename(image.file),
    }),
  });
  image.url = media.originalUrl || media.url;
  image.mediaId = media.id;
}

const summary = current.event.body.summary;
const firstParagraph = `<P>${summary}</P>`;

const posterTitle = 'Locandina Just Me Milano Festa Universitaria 14 julho 2026 - reservas WhatsApp';
const posterDescription = 'Locandina em portugues da University Party no Just Me Milano: festa universitaria, vida noturna em Milao, mesa VIP, guest list e reservas WhatsApp +39 351 912 7047.';
const posterBlock =
  `<P><IMG SRC="${escapeAttr(posterUrl)}" ALT="${escapeAttr(posterTitle)}" TITLE="${escapeAttr(posterTitle)}" WIDTH="460" STYLE="width:100%;max-width:460px;height:auto;display:block;"></P>\n` +
  `<H2>${posterTitle}</H2>\n` +
  `<P>${posterDescription}</P>`;

const galleryBlock = images.map((image) =>
  `<H2>${image.title}</H2>\n` +
  `<P>${image.description}</P>\n` +
  `<P><IMG SRC="${escapeAttr(image.url)}" ALT="${escapeAttr(image.alt)}" TITLE="${escapeAttr(image.title)}" WIDTH="460" STYLE="width:100%;max-width:460px;height:auto;display:block;"></P>`
).join('\n');

let rest = currentHtml.replace(/^\s*<P>.*?<\/P>/is, '');
rest = rest.replace(/<P>\s*<IMG[^>]*>\s*<\/P>\s*/gi, '');
rest = rest.replace(/<IMG[^>]*>\s*/gi, '');

const nextHtml = `${firstParagraph}\n${posterBlock}\n${galleryBlock}\n${rest.trim()}`;

await jsonFetch(`${BASE_URL}/api/admin/update-event-copy`, {
  method: 'POST',
  headers: { ...authHeaders, 'content-type': 'application/json' },
  body: JSON.stringify({ eventId: EVENT_ID, descriptionHtml: nextHtml }),
});

const verify = await jsonFetch(`${BASE_URL}/api/events/spike-g0?eventId=${EVENT_ID}`, {
  headers: authHeaders,
});
const verifyHtml = verify.event.body.description.html;

console.log(JSON.stringify({
  ok: true,
  summary: verify.event.body.summary,
  descriptionLength: verifyHtml.length,
  h2Count: (verifyHtml.match(/<H2>/g) || []).length,
  h3Count: (verifyHtml.match(/<H3>/g) || []).length,
  imgCount: (verifyHtml.match(/<IMG/gi) || []).length,
  titleAttrCount: (verifyHtml.match(/TITLE=/gi) || []).length,
  altPhone: verifyHtml.includes('+39 351 912 7047'),
  media: images.map(({ title, mediaId, url }) => ({ title, mediaId, url })),
}, null, 2));
