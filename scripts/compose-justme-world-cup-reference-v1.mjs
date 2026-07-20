import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const outputDir = path.join(root, 'artifacts', 'just-me-world-cup-final-2026-draft');
const source = path.join(
  root,
  '..',
  '..',
  '.codex-remote-attachments',
  '019f5f7e-6575-7b51-95e6-c541eec8fb89',
  'cac4afae-422b-4d98-8bb7-0d6c6c03ddc1',
  '1-Photo-1.jpg',
);
const logoSource = path.join(
  root,
  'public',
  'images',
  'events',
  'generated',
  'just-me-university-party-eventbrite-header-2x1-pt.png',
);

await fs.mkdir(outputDir, { recursive: true });

const logoRaster = sharp(logoSource)
  .extract({ left: 607, top: 0, width: 560, height: 185 })
  .resize({ width: 500 });
const { data: logoLuma, info: logoInfo } = await logoRaster
  .clone()
  .greyscale()
  .raw()
  .toBuffer({ resolveWithObject: true });
const logoAlpha = Buffer.alloc(logoInfo.width * logoInfo.height);
for (let index = 0; index < logoLuma.length; index += 1) {
  logoAlpha[index] = Math.max(0, Math.min(255, (logoLuma[index] - 24) * 4));
}
const logo = await sharp({
  create: {
    width: logoInfo.width,
    height: logoInfo.height,
    channels: 3,
    background: { r: 255, g: 255, b: 255 },
  },
})
  .joinChannel(logoAlpha, {
    raw: { width: logoInfo.width, height: logoInfo.height, channels: 1 },
  })
  .png()
  .toBuffer();

const artwork = Buffer.from(`
  <svg width="1080" height="1920" viewBox="0 0 1080 1920" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="topCover" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#020207" stop-opacity="1"/>
        <stop offset="0.84" stop-color="#020207" stop-opacity="1"/>
        <stop offset="1" stop-color="#020207" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="lowerCover" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#020207" stop-opacity="0"/>
        <stop offset="0.13" stop-color="#020207" stop-opacity="1"/>
        <stop offset="1" stop-color="#020207" stop-opacity="1"/>
      </linearGradient>
      <linearGradient id="teamLine" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#d8a838"/>
        <stop offset="0.26" stop-color="#c9163c"/>
        <stop offset="0.5" stop-color="#ffffff"/>
        <stop offset="0.74" stop-color="#b9e8ff"/>
        <stop offset="1" stop-color="#67b9e7"/>
      </linearGradient>
      <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="4" stdDeviation="7" flood-color="#000000" flood-opacity="0.95"/>
      </filter>
      <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="8" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>

    <rect width="1080" height="540" fill="url(#topCover)"/>
    <rect y="1010" width="1080" height="910" fill="url(#lowerCover)"/>
    <rect x="28" y="28" width="1024" height="1864" fill="none" stroke="#ffffff" stroke-opacity="0.15"/>
    <rect x="28" y="28" width="5" height="1864" fill="#c9163c" opacity="0.7"/>
    <rect x="1047" y="28" width="5" height="1864" fill="#72c8ee" opacity="0.7"/>

    <g filter="url(#shadow)">
      <text x="540" y="352" text-anchor="middle" fill="#ffffff"
        font-family="Arial Nova, Arial, sans-serif" font-size="34" font-weight="700"
        letter-spacing="7">DOMENICA 19.07.26</text>
      <text x="540" y="404" text-anchor="middle" fill="#bcbec8"
        font-family="Arial Nova, Arial, sans-serif" font-size="18" font-weight="700"
        letter-spacing="6">JUST ME MILANO  /  TORRE BRANCA</text>
    </g>

    <rect x="155" y="1130" width="770" height="3" fill="url(#teamLine)"/>
    <text x="540" y="1198" text-anchor="middle" fill="#ffffff"
      font-family="Arial Nova, Arial, sans-serif" font-size="27" font-weight="700"
      letter-spacing="2">APERITIVO DALLE 18:00  /  MAXISCHERMO 21:00</text>

    <g filter="url(#shadow)">
      <text x="540" y="1365" text-anchor="middle" fill="#f0c45e"
        font-family="Arial Nova Cond, Arial Narrow, sans-serif" font-size="154" font-weight="700"
        letter-spacing="3">SPAGNA</text>
      <text x="540" y="1458" text-anchor="middle" fill="#ffffff"
        font-family="Brush Script MT, Segoe Script, cursive" font-size="103" font-style="italic">vs</text>
      <text x="540" y="1585" text-anchor="middle" fill="#b8e8ff"
        font-family="Arial Nova Cond, Arial Narrow, sans-serif" font-size="140" font-weight="700"
        letter-spacing="2">ARGENTINA</text>
    </g>

    <text x="540" y="1652" text-anchor="middle" fill="#ffffff"
      font-family="Arial Nova, Arial, sans-serif" font-size="25" font-weight="700"
      letter-spacing="7">FINALE MONDIALE 2026</text>
    <rect x="155" y="1694" width="770" height="3" fill="url(#teamLine)"/>

    <g filter="url(#glow)">
      <text x="540" y="1782" text-anchor="middle" fill="#ffffff"
        font-family="Arial Nova, Arial, sans-serif" font-size="35" font-weight="700"
        letter-spacing="1">WHATSAPP  +39 351 912 7047</text>
    </g>
    <text x="540" y="1841" text-anchor="middle" fill="#bcbec8"
      font-family="Arial Nova, Arial, sans-serif" font-size="18" font-weight="700"
      letter-spacing="5">21+  /  DRESS CODE ELEGANTE</text>
    <text x="540" y="1884" text-anchor="middle" fill="#747785"
      font-family="Arial Nova, Arial, sans-serif" font-size="16" font-weight="700"
      letter-spacing="5">NIGHTLIFEMILAN.COM</text>
  </svg>
`);

const output = path.join(
  outputDir,
  'just-me-spagna-argentina-finale-mondiale-poster-9x16-it-reference-v2.jpg',
);

await sharp(source)
  .resize(1080, 1920, { fit: 'cover' })
  .modulate({ brightness: 0.9, saturation: 1.08 })
  .sharpen({ sigma: 0.7, m1: 0.65, m2: 1.25 })
  .composite([
    { input: artwork, top: 0, left: 0 },
    { input: logo, top: 80, left: 290 },
  ])
  .jpeg({ quality: 96, chromaSubsampling: '4:4:4' })
  .toFile(output);

await Promise.all([
  sharp(output)
    .resize(540, 960)
    .png()
    .toFile(path.join(outputDir, 'reference-v2-preview-540x960.png')),
  sharp(output)
    .resize(390, 693)
    .png()
    .toFile(path.join(outputDir, 'reference-v2-mobile-390x693.png')),
]);

console.log(output);
