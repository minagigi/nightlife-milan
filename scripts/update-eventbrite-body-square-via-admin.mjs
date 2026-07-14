import fs from 'node:fs';
import sharp from 'sharp';

const EVENT_ID = process.argv[2];
const BASE_URL = 'https://nightlifemilan.com';

if (!EVENT_ID) {
  throw new Error('Usage: node scripts/update-eventbrite-body-square-via-admin.mjs <eventbrite-event-id>');
}

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

const logoUrl = current.event.body.logo?.original?.url || current.event.body.logo?.url;
if (!logoUrl) throw new Error('Current Eventbrite logo URL missing');

const sourceBuffer = Buffer.from(await (await fetch(logoUrl)).arrayBuffer());
const containedPoster = await sharp(sourceBuffer)
  .resize(980, 980, {
    fit: 'contain',
    background: { r: 8, g: 8, b: 12, alpha: 0 },
  })
  .jpeg({ quality: 94 })
  .toBuffer();

const squarePoster = await sharp(sourceBuffer)
  .resize(1080, 1080, { fit: 'cover' })
  .blur(28)
  .modulate({ brightness: 0.45, saturation: 0.85 })
  .composite([{ input: containedPoster, gravity: 'center' }])
  .jpeg({ quality: 93, mozjpeg: true })
  .toBuffer();

const media = await jsonFetch(`${BASE_URL}/api/admin/upload-eventbrite-media`, {
  method: 'POST',
  headers: { ...authHeaders, 'content-type': 'application/json' },
  body: JSON.stringify({
    imageBase64: squarePoster.toString('base64'),
    contentType: 'image/jpeg',
    filename: `just-me-university-party-${EVENT_ID}-square-1x1.jpg`,
  }),
});

const mediaUrl = media.originalUrl || media.url;
if (!mediaUrl) throw new Error(`Uploaded media URL missing: ${JSON.stringify(media).slice(0, 500)}`);

const imgTag =
  `<IMG SRC="${mediaUrl}" ALT="Locandina quadrata 1:1 Just Me Milano University Party 14 julho 2026" ` +
  'WIDTH="460" STYLE="width:100%;max-width:460px;height:auto;display:block;" />';

let html = current.event.body.description.html;
if (/<IMG[^>]*>/i.test(html)) {
  html = html.replace(/<IMG[^>]*>/i, imgTag);
} else {
  html = html.replace('<H2>Contactos e reservas</H2>', `<P>${imgTag}</P><H2>Contactos e reservas</H2>`);
}

await jsonFetch(`${BASE_URL}/api/admin/update-event-copy`, {
  method: 'POST',
  headers: { ...authHeaders, 'content-type': 'application/json' },
  body: JSON.stringify({ eventId: EVENT_ID, descriptionHtml: html }),
});

const verify = await jsonFetch(`${BASE_URL}/api/events/spike-g0?eventId=${EVENT_ID}`, {
  headers: authHeaders,
});
const verifyHtml = verify.event.body.description.html;
const verifyImg = verifyHtml.match(/<IMG[^>]*>/i)?.[0] || '';

console.log(JSON.stringify({
  ok: true,
  mediaId: media.id,
  mediaUrl,
  descriptionLength: verifyHtml.length,
  h3Count: (verifyHtml.match(/<H3>/g) || []).length,
  imgCount: (verifyHtml.match(/<IMG/gi) || []).length,
  imgTag: verifyImg,
  hasSquareAlt: verifyImg.includes('quadrata 1:1'),
  hasWidth: verifyImg.includes('WIDTH="460"'),
  hasStyle: verifyImg.includes('max-width:460px'),
}, null, 2));
