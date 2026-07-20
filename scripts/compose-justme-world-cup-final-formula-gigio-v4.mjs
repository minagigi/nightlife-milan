import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const outputDir = path.join(root, 'artifacts', 'just-me-world-cup-final-2026-draft');
const generatedDir = path.join(
  process.env.USERPROFILE,
  '.codex',
  'generated_images',
  '019f5f7e-6575-7b51-95e6-c541eec8fb89',
);

const source = path.join(generatedDir, 'exec-8b4510b0-5330-4b30-8a8c-698f6c7c61c9.png');
const logoSource = path.join(
  root,
  'public',
  'images',
  'events',
  'generated',
  'just-me-university-party-eventbrite-header-2x1-pt.png',
);

const baseOutput = path.join(
  outputDir,
  'just-me-finale-mondiale-argentina-spagna-key-visual-1x1-v4.png',
);
const posterOutput = path.join(
  outputDir,
  'just-me-finale-mondiale-argentina-spagna-poster-1x1-it-formula-gigio-v6.jpg',
);

await fs.mkdir(outputDir, { recursive: true });
await fs.copyFile(source, baseOutput);

const logoRaster = sharp(logoSource)
  .extract({ left: 607, top: 0, width: 560, height: 185 })
  .resize({ width: 470 });
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

const overlay = Buffer.from(`
  <svg width="1600" height="1600" viewBox="0 0 1600 1600" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="topShade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#010103" stop-opacity="0.99"/>
        <stop offset="0.62" stop-color="#010103" stop-opacity="0.62"/>
        <stop offset="1" stop-color="#010103" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="bottomShade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#010103" stop-opacity="0"/>
        <stop offset="0.2" stop-color="#010103" stop-opacity="0.62"/>
        <stop offset="0.47" stop-color="#010103" stop-opacity="0.9"/>
        <stop offset="1" stop-color="#010103" stop-opacity="1"/>
      </linearGradient>
      <linearGradient id="duelLine" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#9edcff"/>
        <stop offset="0.44" stop-color="#f7fbff"/>
        <stop offset="0.56" stop-color="#ffd68a"/>
        <stop offset="1" stop-color="#c70d35"/>
      </linearGradient>
      <filter id="hardShadow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="5" stdDeviation="7" flood-color="#000000" flood-opacity="0.96"/>
      </filter>
      <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="10" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>

    <rect width="1600" height="430" fill="url(#topShade)"/>
    <rect y="865" width="1600" height="735" fill="url(#bottomShade)"/>

    <g filter="url(#hardShadow)">
      <text x="800" y="243" text-anchor="middle" fill="#d8d8de"
        font-family="Arial Nova, Arial, sans-serif" font-size="25" font-weight="700"
        letter-spacing="6">DOMENICA 19 LUGLIO  /  MILANO 2026</text>
      <line x1="592" y1="269" x2="1008" y2="269" stroke="url(#duelLine)" stroke-width="3"/>

      <text x="695" y="345" text-anchor="end" fill="#b9e8ff"
        font-family="Arial Nova Cond, Arial Narrow, sans-serif" font-size="69" font-weight="700">ARGENTINA</text>
      <text x="800" y="337" text-anchor="middle" fill="#ffffff"
        font-family="Georgia Pro, Georgia, serif" font-size="31" font-style="italic">vs</text>
      <text x="905" y="345" text-anchor="start" fill="#f3ca70"
        font-family="Arial Nova Cond, Arial Narrow, sans-serif" font-size="69" font-weight="700">SPAGNA</text>
    </g>

    <g filter="url(#hardShadow)">
      <text x="800" y="1110" text-anchor="middle" fill="#ffffff"
        font-family="Arial Nova Cond, Arial Narrow, sans-serif" font-size="214" font-weight="700"
        letter-spacing="5">FINALE</text>
      <text x="800" y="1192" text-anchor="middle" fill="#ffffff"
        font-family="Brush Script MT, Segoe Script, cursive" font-size="120" font-style="italic">Mondiale</text>
    </g>

    <text x="800" y="1255" text-anchor="middle" fill="#d6d7dc"
      font-family="Arial Nova, Arial, sans-serif" font-size="19" font-weight="700"
      letter-spacing="6">LIVE SU MAXISCHERMO  /  JUST ME MILANO</text>
    <rect x="244" y="1292" width="1112" height="3" rx="1.5" fill="url(#duelLine)" opacity="0.88"/>

    <text x="800" y="1362" text-anchor="middle" fill="#ffffff"
      font-family="Arial Nova, Arial, sans-serif" font-size="39" font-weight="700">APERTURA 18:00  /  CALCIO D&apos;INIZIO 21:00</text>
    <text x="800" y="1416" text-anchor="middle" fill="#c8c9d0"
      font-family="Arial Nova, Arial, sans-serif" font-size="20" font-weight="700"
      letter-spacing="4">APERITIVO  /  FINALE  /  UPTOWN NIGHTS</text>

    <g filter="url(#softGlow)">
      <text x="800" y="1490" text-anchor="middle" fill="#ffffff"
        font-family="Arial Nova, Arial, sans-serif" font-size="38" font-weight="700"
        letter-spacing="1">WHATSAPP  +39 351 912 7047</text>
    </g>
    <text x="800" y="1540" text-anchor="middle" fill="#9fa1aa"
      font-family="Arial Nova, Arial, sans-serif" font-size="17" font-weight="700"
      letter-spacing="4">TORRE BRANCA  /  21+  /  DRESS CODE ELEGANTE</text>
    <text x="800" y="1578" text-anchor="middle" fill="#666a75"
      font-family="Arial Nova, Arial, sans-serif" font-size="13" font-weight="700"
      letter-spacing="4">NIGHTLIFEMILAN.COM</text>
  </svg>
`);

await sharp(source)
  .resize(1600, 1600, { fit: 'cover' })
  .modulate({ brightness: 0.86, saturation: 0.93 })
  .composite([
    { input: overlay, top: 0, left: 0 },
    { input: logo, top: 36, left: 565 },
  ])
  .sharpen({ sigma: 0.55, m1: 0.7, m2: 1.5 })
  .jpeg({ quality: 96, chromaSubsampling: '4:4:4' })
  .toFile(posterOutput);

await Promise.all([
  sharp(posterOutput)
    .resize(900, 900)
    .png()
    .toFile(path.join(outputDir, 'formula-gigio-v6-preview-900.png')),
  sharp(posterOutput)
    .resize(390, 390)
    .png()
    .toFile(path.join(outputDir, 'formula-gigio-v6-mobile-390.png')),
]);

console.log(posterOutput);
