import fs from 'node:fs';

const EVENT_ID = '1993899840096';
const BASE_URL = 'https://nightlifemilan.com';
const posterTitle = 'Locandina Just Me Milano Festa Universitaria 14 julho 2026 - reservas WhatsApp';
const galleryTitles = [
  'Aperitivo Just Me Milano 14 julho 2026 - vida noturna em Milao',
  'Dancefloor University Party Just Me Milano - festa universitaria Milao',
  'Mesa VIP Just Me Milano - bottle service e guest list Milao',
  'Torre Branca e Just Me Milano - onde sair em Milao terca-feira',
];

function loadEnv() {
  const env = {};
  for (const line of fs.readFileSync('.env.local', 'utf8').split(/\r?\n/)) {
    const clean = line.replace(/^\uFEFF/, '').replace(/^\s*export\s+/, '');
    if (!/^\s*[A-Z0-9_]+\s*=/.test(clean)) continue;
    const index = clean.indexOf('=');
    env[clean.slice(0, index).trim()] = clean.slice(index + 1).trim().replace(/^['"]|['"]$/g, '');
  }
  return env;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function jsonFetch(url, init) {
  const response = await fetch(url, init);
  const text = await response.text();
  if (!response.ok) throw new Error(`${url} failed HTTP ${response.status}: ${text.slice(0, 500)}`);
  return JSON.parse(text);
}

const { CRON_SECRET } = loadEnv();
if (!CRON_SECRET) throw new Error('CRON_SECRET missing');
const headers = { Authorization: `Bearer ${CRON_SECRET}` };
const current = await jsonFetch(`${BASE_URL}/api/events/spike-g0?eventId=${EVENT_ID}`, { headers });
const html = current.event.body.description.html;
const imageTags = [...html.matchAll(/<IMG\b[^>]*>/gi)].map((match) => match[0]);

if (imageTags.length !== 5) {
  throw new Error(`Expected exactly 5 event images, found ${imageTags.length}`);
}

let rest = html.replace(/^\s*<P>.*?<\/P>\s*/is, '');
rest = rest.replace(/<P>\s*<IMG\b[^>]*>\s*<\/P>\s*/gi, '');

for (const title of [posterTitle, ...galleryTitles]) {
  const titlePattern = escapeRegExp(title);
  rest = rest.replace(new RegExp(`<H2>${titlePattern}</H2>\\s*<P>.*?</P>\\s*`, 'is'), '');
  rest = rest.replace(new RegExp(`<H3>${titlePattern}</H3>\\s*`, 'is'), '');
}

const imageBlock = (title, tag) => `<H3>${title}</H3>\n<P>${tag}</P>`;
const posterBlock = imageBlock(posterTitle, imageTags[0]);
const galleryBlock = galleryTitles.map((title, index) => imageBlock(title, imageTags[index + 1])).join('\n');

const agendaBoundary = /(<H2>Agenda detalhada da noite<\/H2>[\s\S]*?)(?=<H2>Programa do evento<\/H2>)/i;
if (!agendaBoundary.test(rest)) throw new Error('Agenda section boundary not found');
rest = rest.replace(agendaBoundary, `$1\n${galleryBlock}\n`);

const nextHtml = `<P>${current.event.body.summary}</P>\n${posterBlock}\n${rest.trim()}`;
await jsonFetch(`${BASE_URL}/api/admin/update-event-copy`, {
  method: 'POST',
  headers: { ...headers, 'content-type': 'application/json' },
  body: JSON.stringify({ eventId: EVENT_ID, descriptionHtml: nextHtml }),
});

const verified = await jsonFetch(`${BASE_URL}/api/events/spike-g0?eventId=${EVENT_ID}`, { headers });
const verifiedHtml = verified.event.body.description.html;
console.log(JSON.stringify({
  ok: true,
  imgCount: (verifiedHtml.match(/<IMG\b/gi) || []).length,
  imageDescriptionsRemoved: !verifiedHtml.includes('Locandina em portugues') && !verifiedHtml.includes('Aperitivo no Just Me Milano antes'),
  galleryAfterAgenda: verifiedHtml.indexOf(galleryTitles[0]) > verifiedHtml.indexOf('Agenda detalhada da noite'),
  galleryBeforeProgram: verifiedHtml.indexOf(galleryTitles[0]) < verifiedHtml.indexOf('Programa do evento'),
  posterAfterSummary: verifiedHtml.indexOf(posterTitle) > verifiedHtml.indexOf(verified.event.body.summary),
}, null, 2));
