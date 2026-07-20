import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const artifactDir = path.join(root, 'artifacts', 'just-me-world-cup-final-2026-draft');
const publicDir = path.join(root, 'public', 'images', 'events', 'generated');
const generatedDir = path.join(
  process.env.USERPROFILE,
  '.codex',
  'generated_images',
  '019f5f7e-6575-7b51-95e6-c541eec8fb89',
);
const coverSource = path.join(generatedDir, 'exec-5acd6f77-5ed1-42d4-9774-97613cf4062d.png');
const squareSource = path.join(generatedDir, 'exec-03ebeacf-4d0c-4782-963e-082036002764.png');
const logoSource = path.join(publicDir, 'just-me-university-party-eventbrite-header-2x1-pt.png');
const badgeSource = path.join(root, 'public', 'images', 'brand', 'milan-nightlife-badge.png');

const OUTPUT = {
  cover: 'just-me-finale-coppa-mondo-cover-2x1-it-v3.jpg',
  poster: 'just-me-finale-coppa-mondo-poster-1x1-it-v3.jpg',
  maxischermo: 'just-me-finale-coppa-mondo-maxischermo-1x1-it-v3.jpg',
  aperitivo: 'just-me-finale-coppa-mondo-aperitivo-1x1-it-v3.jpg',
  vip: 'just-me-finale-coppa-mondo-tavoli-vip-1x1-it-v3.jpg',
  afterparty: 'just-me-finale-coppa-mondo-afterparty-1x1-it-v3.jpg',
};

async function justMeLogo(width) {
  return sharp(logoSource)
    .extract({ left: 607, top: 0, width: 560, height: 185 })
    .resize({ width })
    .png()
    .toBuffer();
}

async function nightlifeBadge(width) {
  return sharp(badgeSource).resize({ width }).png().toBuffer();
}

function coverOverlay() {
  return Buffer.from(`
    <svg width="2160" height="1080" viewBox="0 0 2160 1080" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="left" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#050506" stop-opacity="1"/>
          <stop offset="0.58" stop-color="#050506" stop-opacity="0.96"/>
          <stop offset="0.82" stop-color="#050506" stop-opacity="0.55"/>
          <stop offset="1" stop-color="#050506" stop-opacity="0"/>
        </linearGradient>
        <linearGradient id="bottom" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#050506" stop-opacity="0"/>
          <stop offset="0.4" stop-color="#050506" stop-opacity="0.86"/>
          <stop offset="1" stop-color="#050506" stop-opacity="0.99"/>
        </linearGradient>
        <filter id="shadow"><feDropShadow dx="0" dy="3" stdDeviation="8" flood-color="#000" flood-opacity="0.72"/></filter>
      </defs>
      <rect width="1220" height="1080" fill="url(#left)"/>
      <rect y="746" width="2160" height="334" fill="url(#bottom)"/>
      <rect x="24" y="24" width="2112" height="1032" fill="none" stroke="#d2ad59" stroke-width="2" stroke-opacity="0.75"/>
      <path d="M24 190 V24 H190" fill="none" stroke="#a8d8ec" stroke-width="8"/>
      <path d="M1970 1056 H2136 V890" fill="none" stroke="#d2ad59" stroke-width="8"/>

      <g filter="url(#shadow)">
        <text x="106" y="250" fill="#d5d6da" font-family="Arial, sans-serif" font-size="22" font-weight="700" letter-spacing="5">FINALE COPPA DEL MONDO 2026</text>
        <line x1="106" y1="278" x2="632" y2="278" stroke="#d2ad59"/>
        <text x="102" y="430" fill="#ffffff" font-family="Georgia, serif" font-size="126" font-style="italic">La Finale</text>
        <text x="106" y="548" fill="#d8b75f" font-family="Arial Narrow, Arial, sans-serif" font-size="91" font-weight="700">SPAGNA</text>
        <text x="106" y="610" fill="#ffffff" font-family="Georgia, serif" font-size="36" font-style="italic">vs</text>
        <text x="106" y="718" fill="#a8d8ec" font-family="Arial Narrow, Arial, sans-serif" font-size="91" font-weight="700">ARGENTINA</text>
      </g>

      <text x="106" y="806" fill="#ffffff" font-family="Arial, sans-serif" font-size="27" font-weight="700" letter-spacing="2">DOMENICA 19 LUGLIO 2026</text>
      <text x="106" y="848" fill="#c7c9ce" font-family="Arial, sans-serif" font-size="19" letter-spacing="2">JUST ME MILANO · PARCO SEMPIONE · TORRE BRANCA</text>
      <line x1="106" y1="882" x2="2054" y2="882" stroke="#ffffff" stroke-opacity="0.26"/>
      <text x="106" y="934" fill="#ffffff" font-family="Arial, sans-serif" font-size="29" font-weight="700">APERTURA 19:30</text>
      <text x="422" y="934" fill="#8d9098" font-family="Georgia, serif" font-size="28">/</text>
      <text x="468" y="934" fill="#ffffff" font-family="Arial, sans-serif" font-size="29" font-weight="700">CALCIO D'INIZIO 21:00</text>
      <text x="106" y="978" fill="#d1d2d6" font-family="Arial, sans-serif" font-size="18" letter-spacing="2">MAXISCHERMO · APERITIVO · TAVOLI VIP · UPTOWN NIGHTS</text>
      <text x="2054" y="930" text-anchor="end" fill="#ffffff" font-family="Arial, sans-serif" font-size="23" font-weight="700">WHATSAPP +39 351 912 7047</text>
      <text x="2054" y="973" text-anchor="end" fill="#d1d2d6" font-family="Arial, sans-serif" font-size="17" letter-spacing="1">PUBBLICO INTERNAZIONALE 21+</text>
      <text x="2054" y="1009" text-anchor="end" fill="#d1d2d6" font-family="Arial, sans-serif" font-size="17" letter-spacing="1">DRESS CODE ELEGANTE · PANTALONI LUNGHI UOMO</text>
      <text x="106" y="1020" fill="#d8b75f" font-family="Arial, sans-serif" font-size="17" font-weight="700" letter-spacing="2">WWW.NIGHTLIFEMILAN.COM</text>
    </svg>
  `);
}

function squareOverlay() {
  return Buffer.from(`
    <svg width="1600" height="1600" viewBox="0 0 1600 1600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#050506" stop-opacity="1"/>
          <stop offset="0.76" stop-color="#050506" stop-opacity="0.93"/>
          <stop offset="1" stop-color="#050506" stop-opacity="0"/>
        </linearGradient>
        <linearGradient id="bottom" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#050506" stop-opacity="0"/>
          <stop offset="0.32" stop-color="#050506" stop-opacity="0.90"/>
          <stop offset="1" stop-color="#050506" stop-opacity="1"/>
        </linearGradient>
        <filter id="shadow"><feDropShadow dx="0" dy="3" stdDeviation="8" flood-color="#000" flood-opacity="0.75"/></filter>
      </defs>
      <rect width="1600" height="650" fill="url(#top)"/>
      <rect y="1010" width="1600" height="590" fill="url(#bottom)"/>
      <rect x="22" y="22" width="1556" height="1556" fill="none" stroke="#d2ad59" stroke-width="2" stroke-opacity="0.76"/>
      <path d="M22 180 V22 H180" fill="none" stroke="#a8d8ec" stroke-width="8"/>
      <path d="M1420 1578 H1578 V1420" fill="none" stroke="#d2ad59" stroke-width="8"/>

      <text x="800" y="216" text-anchor="middle" fill="#d4d5d9" font-family="Arial, sans-serif" font-size="18" font-weight="700" letter-spacing="5">FINALE COPPA DEL MONDO 2026</text>
      <line x1="555" y1="244" x2="1045" y2="244" stroke="#d2ad59"/>
      <g filter="url(#shadow)">
        <text x="800" y="370" text-anchor="middle" fill="#ffffff" font-family="Georgia, serif" font-size="118" font-style="italic">La Finale</text>
        <text x="680" y="488" text-anchor="end" fill="#d8b75f" font-family="Arial Narrow, Arial, sans-serif" font-size="78" font-weight="700">SPAGNA</text>
        <text x="800" y="482" text-anchor="middle" fill="#ffffff" font-family="Georgia, serif" font-size="34" font-style="italic">vs</text>
        <text x="920" y="488" text-anchor="start" fill="#a8d8ec" font-family="Arial Narrow, Arial, sans-serif" font-size="78" font-weight="700">ARGENTINA</text>
      </g>
      <text x="800" y="552" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="22" font-weight="700" letter-spacing="2">DOMENICA 19 LUGLIO 2026 · JUST ME MILANO</text>

      <line x1="116" y1="1202" x2="1484" y2="1202" stroke="#ffffff" stroke-opacity="0.27"/>
      <text x="800" y="1266" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="34" font-weight="700">APERTURA 19:30 / CALCIO D'INIZIO 21:00</text>
      <text x="800" y="1320" text-anchor="middle" fill="#c9cbd0" font-family="Arial, sans-serif" font-size="19" letter-spacing="2">MAXISCHERMO · APERITIVO · TAVOLI VIP · UPTOWN NIGHTS</text>
      <text x="800" y="1382" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="25" font-weight="700">WHATSAPP +39 351 912 7047</text>
      <text x="800" y="1432" text-anchor="middle" fill="#b9bbc1" font-family="Arial, sans-serif" font-size="17" letter-spacing="1">PARCO SEMPIONE · TORRE BRANCA · PUBBLICO INTERNAZIONALE 21+</text>
      <text x="800" y="1474" text-anchor="middle" fill="#b9bbc1" font-family="Arial, sans-serif" font-size="17" letter-spacing="1">DRESS CODE ELEGANTE · PANTALONI LUNGHI UOMO</text>
      <text x="800" y="1527" text-anchor="middle" fill="#d8b75f" font-family="Arial, sans-serif" font-size="17" font-weight="700" letter-spacing="2">WWW.NIGHTLIFEMILAN.COM</text>
    </svg>
  `);
}

async function writeBoth(buffer, filename) {
  await Promise.all([
    fs.writeFile(path.join(artifactDir, filename), buffer),
    fs.writeFile(path.join(publicDir, filename), buffer),
  ]);
}

await Promise.all([
  fs.mkdir(artifactDir, { recursive: true }),
  fs.mkdir(publicDir, { recursive: true }),
]);

const [coverLogo, squareLogo, coverBadge, squareBadge] = await Promise.all([
  justMeLogo(390),
  justMeLogo(330),
  nightlifeBadge(124),
  nightlifeBadge(112),
]);

const coverBuffer = await sharp(coverSource)
  .resize(2160, 1080, { fit: 'cover' })
  .modulate({ brightness: 0.82, saturation: 0.82 })
  .composite([
    { input: coverOverlay(), top: 0, left: 0 },
    { input: coverLogo, top: 62, left: 98 },
    { input: coverBadge, top: 58, left: 1912 },
  ])
  .jpeg({ quality: 94, chromaSubsampling: '4:4:4' })
  .toBuffer();

const posterBuffer = await sharp(squareSource)
  .resize(1600, 1600, { fit: 'cover' })
  .modulate({ brightness: 0.78, saturation: 0.82 })
  .composite([
    { input: squareOverlay(), top: 0, left: 0 },
    { input: squareLogo, top: 46, left: 635 },
    { input: squareBadge, top: 42, left: 1430 },
  ])
  .jpeg({ quality: 94, chromaSubsampling: '4:4:4' })
  .toBuffer();

await Promise.all([
  writeBoth(coverBuffer, OUTPUT.cover),
  writeBoth(posterBuffer, OUTPUT.poster),
  fs.copyFile(path.join(artifactDir, 'just-me-finale-mondiale-maxischermo-1x1.jpg'), path.join(publicDir, OUTPUT.maxischermo)),
  fs.copyFile(path.join(artifactDir, 'just-me-finale-mondiale-aperitivo-1x1.jpg'), path.join(publicDir, OUTPUT.aperitivo)),
  fs.copyFile(path.join(artifactDir, 'just-me-finale-mondiale-tavoli-vip-1x1.jpg'), path.join(publicDir, OUTPUT.vip)),
  fs.copyFile(path.join(artifactDir, 'just-me-finale-mondiale-afterparty-1x1.jpg'), path.join(publicDir, OUTPUT.afterparty)),
]);

process.stdout.write(`${JSON.stringify(OUTPUT)}\n`);
