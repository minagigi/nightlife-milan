import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const outputDir = path.join(root, 'artifacts', 'just-me-world-cup-final-2026-draft');
const generatedDir = path.join(process.env.USERPROFILE, '.codex', 'generated_images', '019f5f7e-6575-7b51-95e6-c541eec8fb89');
const source = path.join(generatedDir, 'exec-fd62ec93-5572-466a-be9b-c11b4323f403.png');
const logoSource = path.join(root, 'public', 'images', 'events', 'generated', 'just-me-university-party-eventbrite-header-2x1-pt.png');

const logo = await sharp(logoSource)
  .extract({ left: 607, top: 0, width: 560, height: 185 })
  .resize({ width: 430 })
  .png()
  .toBuffer();

const typography = Buffer.from(`
  <svg width="1600" height="1600" viewBox="0 0 1600 1600" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="top" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#020204" stop-opacity="0.98"/>
        <stop offset="0.72" stop-color="#020204" stop-opacity="0.42"/>
        <stop offset="1" stop-color="#020204" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="bottom" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#020204" stop-opacity="0"/>
        <stop offset="0.34" stop-color="#020204" stop-opacity="0.82"/>
        <stop offset="1" stop-color="#020204" stop-opacity="1"/>
      </linearGradient>
      <filter id="shadow"><feDropShadow dx="0" dy="5" stdDeviation="9" flood-color="#000" flood-opacity="0.88"/></filter>
    </defs>

    <rect width="1600" height="390" fill="url(#top)"/>
    <rect y="850" width="1600" height="750" fill="url(#bottom)"/>

    <g filter="url(#shadow)">
      <text x="800" y="242" text-anchor="middle" fill="#d7d7dc" font-family="Arial Nova, Arial, sans-serif" font-size="20" font-weight="700" letter-spacing="7">DOMENICA 19 LUGLIO  /  MILANO 2026</text>
      <line x1="610" y1="270" x2="990" y2="270" stroke="#ffffff" stroke-opacity="0.52"/>

      <text x="690" y="352" text-anchor="end" fill="#a7dbf2" font-family="Arial Nova Cond, Arial Narrow, sans-serif" font-size="78" font-weight="700">ARGENTINA</text>
      <text x="800" y="344" text-anchor="middle" fill="#ffffff" font-family="Georgia Pro, Georgia, serif" font-size="34" font-style="italic">vs</text>
      <text x="910" y="352" text-anchor="start" fill="#deb955" font-family="Arial Nova Cond, Arial Narrow, sans-serif" font-size="78" font-weight="700">SPAGNA</text>

      <text x="800" y="1015" text-anchor="middle" fill="#ffffff" font-family="Arial Nova Cond, Arial Narrow, sans-serif" font-size="230" font-weight="700" letter-spacing="2">FINALE</text>
      <text x="800" y="1112" text-anchor="middle" fill="#ffffff" font-family="Segoe Script, Georgia Pro, Georgia, serif" font-size="106" font-weight="700" font-style="italic">Mondiale</text>
    </g>

    <text x="800" y="1194" text-anchor="middle" fill="#d7d7dc" font-family="Arial Nova, Arial, sans-serif" font-size="20" font-weight="700" letter-spacing="6">LIVE SU MAXISCHERMO  /  JUST ME MILANO</text>
    <line x1="180" y1="1245" x2="1420" y2="1245" stroke="#ffffff" stroke-opacity="0.3"/>

    <text x="800" y="1315" text-anchor="middle" fill="#ffffff" font-family="Arial Nova, Arial, sans-serif" font-size="38" font-weight="700">APERTURA 18:00  /  CALCIO D'INIZIO 21:00</text>
    <text x="800" y="1376" text-anchor="middle" fill="#cbccd1" font-family="Arial Nova, Arial, sans-serif" font-size="22" letter-spacing="4">APERITIVO  ·  FINALE  ·  UPTOWN NIGHTS</text>
    <text x="800" y="1456" text-anchor="middle" fill="#ffffff" font-family="Arial Nova, Arial, sans-serif" font-size="27" font-weight="700" letter-spacing="2">PRENOTAZIONI  +39 351 912 7047</text>
    <text x="800" y="1505" text-anchor="middle" fill="#a8aab2" font-family="Arial Nova, Arial, sans-serif" font-size="17" letter-spacing="4">TORRE BRANCA  /  21+  /  DRESS CODE ELEGANTE</text>
    <text x="800" y="1550" text-anchor="middle" fill="#737680" font-family="Arial Nova, Arial, sans-serif" font-size="14" letter-spacing="3">NIGHTLIFEMILAN.COM</text>
  </svg>
`);

await fs.mkdir(outputDir, { recursive: true });
const output = path.join(outputDir, 'just-me-finale-mondiale-argentina-spagna-poster-1x1-it-agency-v3.jpg');
await sharp(source)
  .resize(1600, 1600, { fit: 'cover' })
  .modulate({ brightness: 0.88, saturation: 0.9 })
  .composite([
    { input: typography, top: 0, left: 0 },
    { input: logo, top: 38, left: 585 },
  ])
  .jpeg({ quality: 95, chromaSubsampling: '4:4:4' })
  .toFile(output);

await sharp(output)
  .resize(900, 900)
  .png()
  .toFile(path.join(outputDir, 'agency-v3-preview.png'));

console.log(output);
