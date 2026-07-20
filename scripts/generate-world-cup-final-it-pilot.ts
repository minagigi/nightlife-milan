import fs from 'node:fs/promises';
import path from 'node:path';
import {
  buildWorldCupEventbriteItPayloads,
  validateWorldCupEventbriteItPayload,
  WORLD_CUP_EVENTBRITE_IT_LIVE_LISTINGS,
} from '../lib/worldCupEventbriteIt';
import { WORLD_CUP_FINAL_COVER_IT, WORLD_CUP_FINAL_IT_URL, worldCupFinalIt } from '../lib/worldCupFinalIt';

interface LiveMediaSnapshot {
  verifiedAt: string;
  coverUrl: string;
  bodyMediaUrls: string[];
  eventIds: string[];
}

async function main(): Promise<void> {
  const outputDir = path.join(process.cwd(), 'artifacts', 'just-me-world-cup-final-2026-draft');
  const liveMediaArg = process.argv.find((arg) => arg.startsWith('--live-media='));
  const liveMedia = liveMediaArg
    ? JSON.parse(await fs.readFile(path.resolve(liveMediaArg.slice('--live-media='.length)), 'utf8')) as LiveMediaSnapshot
    : null;
  const payloads = buildWorldCupEventbriteItPayloads(liveMedia?.bodyMediaUrls);
  payloads.forEach(validateWorldCupEventbriteItPayload);
  if (liveMedia && liveMedia.eventIds.length !== payloads.length) throw new Error('Live snapshot must contain five verified event IDs');
  const status = liveMedia ? 'published-and-live-verified' : 'prepared-for-live-refresh';

  await fs.mkdir(outputDir, { recursive: true });
  await fs.writeFile(
  path.join(outputDir, 'eventbrite-it-keyword-pilot-manifest.json'),
  `${JSON.stringify({
    status,
    verifiedAt: liveMedia?.verifiedAt,
    canonicalSiteEvent: WORLD_CUP_FINAL_IT_URL,
    siteContent: worldCupFinalIt,
    eventbriteEvents: payloads.map((payload) => ({
      ...payload,
      publication: WORLD_CUP_EVENTBRITE_IT_LIVE_LISTINGS.find((listing) => payload.marker.includes(listing.key)),
      media: payload.imagePlan.map((image, index) => ({
        sourceAssetUrl: `https://nightlifemilan.com${image.src}`,
        liveCdnUrl: liveMedia?.bodyMediaUrls[index] || null,
      })),
    })),
    cover: {
      sourceAssetUrl: `https://nightlifemilan.com${WORLD_CUP_FINAL_COVER_IT.src}`,
      liveCdnUrl: liveMedia?.coverUrl || null,
    },
  }, null, 2)}\n`,
  'utf8',
);

  const cards = payloads.map((payload, index) => {
    const publication = WORLD_CUP_EVENTBRITE_IT_LIVE_LISTINGS.find((listing) => payload.marker.includes(listing.key));
    return `
  <article>
    <div class="number">${index + 1}</div>
    <p class="keyword">${payload.keyword}</p>
    <h2>${payload.title}</h2>
    <p class="summary">${payload.summary}</p>
    <p><a href="${publication?.url}">Apri il listing Eventbrite pubblicato</a></p>
    <details><summary>Mostra corpo Eventbrite completo</summary><div class="eventbrite-body">${payload.descriptionHtml}</div></details>
  </article>
`;
  }).join('');

  const html = `<!doctype html>
<html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Pilot italiano - Finale Coppa del Mondo</title>
<style>
body{margin:0;background:#0b0b0d;color:#f5f3ee;font:16px/1.55 Arial,sans-serif}main{width:min(1060px,calc(100% - 32px));margin:auto;padding:40px 0 80px}header{border-bottom:1px solid #343238;padding-bottom:28px;margin-bottom:28px}.cover{width:100%;height:auto;border:1px solid #4e432d;margin:20px 0}h1,h2,h3{line-height:1.15}h1{font-size:clamp(30px,5vw,58px);margin:.2em 0}.eyebrow,.keyword{color:#d8b56b;text-transform:uppercase;letter-spacing:.12em;font-size:12px;font-weight:700}.canonical{color:#b8dff4;overflow-wrap:anywhere}article{position:relative;padding:28px 28px 28px 76px;border-bottom:1px solid #343238;background:#111115}article+article{margin-top:16px}.number{position:absolute;left:24px;top:28px;color:#d8b56b;font:700 28px Georgia,serif}.summary{font-size:18px;color:#cfccd2}details{margin-top:20px}summary{cursor:pointer;color:#d8b56b;font-weight:700}.eventbrite-body{margin-top:20px;padding-top:20px;border-top:1px solid #343238}.eventbrite-body a{color:#9fd6ee}.eventbrite-body li{margin:.45em 0}.eventbrite-body img{display:block;width:min(100%,720px);height:auto;margin:28px auto 10px;border:1px solid #343238}@media(max-width:560px){article{padding:22px}.number{position:static;margin-bottom:8px}}
</style></head><body><main>
<header><p class="eyebrow">${liveMedia ? 'Pacchetto italiano pubblicato e verificato live' : 'Pacchetto italiano pronto per il refresh live'}</p><h1>${worldCupFinalIt.title}</h1><img class="cover" src="${liveMedia?.coverUrl || `https://nightlifemilan.com${WORLD_CUP_FINAL_COVER_IT.src}`}" alt="${WORLD_CUP_FINAL_COVER_IT.alt}" title="${WORLD_CUP_FINAL_COVER_IT.title}"><p>${worldCupFinalIt.seoSummary}</p><p class="canonical">${WORLD_CUP_FINAL_IT_URL}</p></header>
<section>${cards}</section>
</main></body></html>`;

  await fs.writeFile(path.join(outputDir, 'eventbrite-it-keyword-pilot-preview.html'), html, 'utf8');
  console.log(JSON.stringify({ ok: true, status, events: payloads.length, canonicalSiteEvent: WORLD_CUP_FINAL_IT_URL }));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
