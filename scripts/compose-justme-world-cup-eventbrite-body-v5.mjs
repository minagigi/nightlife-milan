import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const source = path.join(
  root,
  'artifacts',
  'just-me-world-cup-final-2026-draft',
  'faithful-source-cleaned-v4.png',
);
const output = path.join(
  root,
  'public',
  'images',
  'events',
  'generated',
  'just-me-finale-coppa-mondo-poster-5x4-it-v5.jpg',
);
const preview = path.join(
  root,
  'artifacts',
  'just-me-world-cup-final-2026-draft',
  'just-me-finale-coppa-mondo-poster-5x4-it-v5-preview.jpg',
);

const width = 1600;
const height = 1280;

// The full poster artwork fills the complete landscape canvas. It is used as
// atmosphere only; the sharp players and logo below preserve the source art.
const background = await sharp(source)
  .resize(width, height, { fit: 'cover', position: 'centre' })
  .blur(24)
  .modulate({ brightness: 0.46, saturation: 1.16 })
  .toBuffer();

const playerCrop = sharp(source).extract({ left: 0, top: 250, width: 714, height: 630 });
const { data: playerRgb, info: playerInfo } = await playerCrop
  .resize({ width: 1120 })
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const playerMaskSvg = Buffer.from(`
  <svg width="${playerInfo.width}" height="${playerInfo.height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="soft"><feGaussianBlur stdDeviation="24"/></filter>
    </defs>
    <rect x="28" y="20" width="${playerInfo.width - 56}" height="${playerInfo.height - 40}"
      rx="42" fill="white" filter="url(#soft)"/>
  </svg>
`);
const { data: playerAlpha } = await sharp(playerMaskSvg)
  .greyscale()
  .raw()
  .toBuffer({ resolveWithObject: true });
const playerArt = await sharp(playerRgb, {
  raw: { width: playerInfo.width, height: playerInfo.height, channels: 3 },
})
  .joinChannel(playerAlpha, {
    raw: { width: playerInfo.width, height: playerInfo.height, channels: 1 },
  })
  .png()
  .toBuffer();

const logoCrop = sharp(source)
  .extract({ left: 125, top: 65, width: 466, height: 195 })
  .resize({ width: 575 });
const { data: logoLuma, info: logoInfo } = await logoCrop
  .clone()
  .greyscale()
  .raw()
  .toBuffer({ resolveWithObject: true });
const logoAlpha = Buffer.alloc(logoInfo.width * logoInfo.height);
for (let index = 0; index < logoLuma.length; index += 1) {
  logoAlpha[index] = Math.max(0, Math.min(255, (logoLuma[index] - 28) * 4.5));
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
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="top" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#02030b" stop-opacity="0.98"/>
        <stop offset="0.72" stop-color="#02030b" stop-opacity="0.55"/>
        <stop offset="1" stop-color="#02030b" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="bottom" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#02030b" stop-opacity="0"/>
        <stop offset="0.18" stop-color="#02030b" stop-opacity="0.82"/>
        <stop offset="0.48" stop-color="#02030b" stop-opacity="0.96"/>
        <stop offset="1" stop-color="#02030b" stop-opacity="1"/>
      </linearGradient>
      <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000" flood-opacity="0.94"/>
      </filter>
    </defs>

    <rect width="1600" height="360" fill="url(#top)"/>
    <rect y="650" width="1600" height="630" fill="url(#bottom)"/>

    <g filter="url(#shadow)" text-anchor="middle" font-family="Arial, Helvetica, sans-serif">
      <text x="800" y="252" fill="#ffffff" font-size="42" font-weight="700" letter-spacing="3">DOMENICA 19.07.26</text>

      <rect x="280" y="795" width="1040" height="104" rx="24" fill="#050611" fill-opacity="0.94"/>
      <text x="800" y="840" fill="#ffffff" font-size="36" font-weight="700">APERTURA 19:30  ·  DIRETTA 21:00</text>
      <text x="800" y="879" fill="#ffffff" font-size="27" font-weight="700" letter-spacing="2">COCKTAIL E APERITIVO</text>

      <text x="800" y="949" fill="#e4bd70" font-size="29" font-weight="700" letter-spacing="7">FINALE COPPA DEL MONDO 2026</text>

      <g transform="translate(115 977)">
        <rect width="112" height="78" rx="14" fill="#f6c900"/>
        <rect width="112" height="20" rx="14" fill="#c60b1e"/>
        <rect y="58" width="112" height="20" rx="14" fill="#c60b1e"/>
        <circle cx="56" cy="39" r="10" fill="#b88718"/>
      </g>
      <g transform="translate(1373 977)">
        <rect width="112" height="78" rx="14" fill="#ffffff"/>
        <rect width="112" height="26" rx="14" fill="#75aadb"/>
        <rect y="52" width="112" height="26" rx="14" fill="#75aadb"/>
        <circle cx="56" cy="39" r="10" fill="#f6b40e"/>
      </g>
      <text x="800" y="1055" fill="#ffffff" font-family="Arial Narrow, Arial, sans-serif" font-size="106" font-weight="800" letter-spacing="1">SPAGNA  <tspan fill="#e4bd70" font-family="Georgia, serif" font-size="60" font-style="italic">VS</tspan>  ARGENTINA</text>

      <line x1="235" y1="1084" x2="1365" y2="1084" stroke="#7b5d96" stroke-width="2"/>
      <text x="800" y="1135" fill="#ffffff" font-size="29" font-weight="700" letter-spacing="1">PRENOTAZIONI WHATSAPP  +39 351 912 7047</text>
      <text x="800" y="1180" fill="#d5d6dc" font-size="22" font-weight="700" letter-spacing="6">WWW.NIGHTLIFEMILAN.COM</text>
    </g>
  </svg>
`);

await sharp(background)
  .composite([
    { input: playerArt, left: 240, top: 165 },
    { input: overlay, left: 0, top: 0 },
    { input: logo, left: Math.round((width - logoInfo.width) / 2), top: 22 },
  ])
  .sharpen({ sigma: 0.5, m1: 0.55, m2: 1.1 })
  .jpeg({ quality: 94, chromaSubsampling: '4:4:4' })
  .toFile(output);

await sharp(output).resize(1000, 800).jpeg({ quality: 91 }).toFile(preview);

console.log(JSON.stringify({ output, preview, width, height, ratio: width / height }));
