import fs from 'node:fs';
import sharp from 'sharp';

const EVENTBRITE_API = 'https://www.eventbriteapi.com/v3';
const EVENT_ID = process.argv[2];

if (!EVENT_ID) {
  throw new Error('Usage: node scripts/update-eventbrite-body-square-image.mjs <eventbrite-event-id>');
}

function loadEnv() {
  const raw = fs.readFileSync('.env.local', 'utf8');
  const env = {};
  for (const line of raw.split(/\r?\n/)) {
    const clean = line.replace(/^\uFEFF/, '').replace(/^\s*export\s+/, '');
    if (!/^\s*[A-Z0-9_]+\s*=/.test(clean)) continue;
    const index = clean.indexOf('=');
    const key = clean.slice(0, index).trim();
    const value = clean.slice(index + 1).trim().replace(/^['"]|['"]$/g, '');
    env[key] = value;
  }
  return env;
}

async function uploadEventbriteImage(token, buffer, filename) {
  const infoRes = await fetch(
    `${EVENTBRITE_API}/media/upload/?type=image-event-logo&token=${encodeURIComponent(token)}`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  if (!infoRes.ok) throw new Error(`upload info ${infoRes.status}: ${await infoRes.text()}`);

  const info = await infoRes.json();
  const form = new FormData();
  for (const [key, value] of Object.entries(info.upload_data || {})) {
    form.append(key, value ?? '');
  }
  form.append(
    info.file_parameter_name || 'file',
    new Blob([buffer], { type: 'image/jpeg' }),
    filename,
  );

  const uploadRes = await fetch(info.upload_url, { method: 'POST', body: form });
  if (!uploadRes.ok) throw new Error(`upload ${uploadRes.status}: ${await uploadRes.text()}`);

  const finalizeRes = await fetch(`${EVENTBRITE_API}/media/upload/`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'content-type': 'application/json' },
    body: JSON.stringify({ upload_token: info.upload_token }),
  });
  if (!finalizeRes.ok) throw new Error(`finalize ${finalizeRes.status}: ${await finalizeRes.text()}`);

  return finalizeRes.json();
}

const env = loadEnv();
const token = env.EVENTBRITE_TOKEN;
if (!token) throw new Error('EVENTBRITE_TOKEN missing');

const event = await fetch(`${EVENTBRITE_API}/events/${EVENT_ID}/`, {
  headers: { Authorization: `Bearer ${token}` },
}).then((res) => res.json());

const logoUrl = event.logo?.original?.url || event.logo?.url;
if (!logoUrl) throw new Error('Event logo URL missing');

const sourceBuffer = Buffer.from(await (await fetch(logoUrl)).arrayBuffer());
const containedPoster = await sharp(sourceBuffer)
  .resize(960, 960, {
    fit: 'contain',
    background: { r: 10, g: 10, b: 14, alpha: 0 },
  })
  .jpeg({ quality: 92 })
  .toBuffer();

const squarePoster = await sharp(sourceBuffer)
  .resize(1080, 1080, { fit: 'cover' })
  .blur(24)
  .modulate({ brightness: 0.55 })
  .composite([{ input: containedPoster, gravity: 'center' }])
  .jpeg({ quality: 92, mozjpeg: true })
  .toBuffer();

const media = await uploadEventbriteImage(
  token,
  squarePoster,
  `eventbrite-body-${EVENT_ID}-square-1x1.jpg`,
);

const mediaUrl = media.original?.url || media.url;
if (!mediaUrl) throw new Error(`Uploaded media URL missing: ${JSON.stringify(media).slice(0, 500)}`);

const imgTag =
  `<IMG SRC="${mediaUrl}" ALT="Locandina quadrata Just Me Milano University Party 14 julho 2026" ` +
  'WIDTH="460" STYLE="width:100%;max-width:460px;height:auto;display:block;" />';

let html = event.description?.html || '';
if (/<IMG[^>]*>/i.test(html)) {
  html = html.replace(/<IMG[^>]*>/i, imgTag);
} else {
  html = html.replace('<H2>Contactos e reservas</H2>', `<P>${imgTag}</P><H2>Contactos e reservas</H2>`);
}

const patchRes = await fetch(`${EVENTBRITE_API}/events/${EVENT_ID}/`, {
  method: 'POST',
  headers: { Authorization: `Bearer ${token}`, 'content-type': 'application/json' },
  body: JSON.stringify({ event: { description: { html } } }),
});
if (!patchRes.ok) throw new Error(`patch ${patchRes.status}: ${await patchRes.text()}`);

const check = await fetch(`${EVENTBRITE_API}/events/${EVENT_ID}/`, {
  headers: { Authorization: `Bearer ${token}` },
}).then((res) => res.json());

const checkHtml = check.description?.html || '';
const currentImg = checkHtml.match(/<IMG[^>]*>/i)?.[0] || '';

console.log(JSON.stringify({
  ok: true,
  mediaId: media.id,
  mediaUrl,
  descriptionLength: checkHtml.length,
  h3Count: (checkHtml.match(/<H3>/g) || []).length,
  imgTag: currentImg,
  squareBodyImage: /square|1x1|quadrata/i.test(currentImg),
}, null, 2));
