import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const source = path.join(
  root,
  'artifacts',
  'just-me-world-cup-final-2026-draft',
  'faithful-source-cleaned-v4.png',
);
const outputDir = path.join(root, 'public', 'images', 'events', 'generated');
const coverOutput = path.join(outputDir, 'just-me-world-cup-final-cover-2x1-en-v1.jpg');
const posterOutput = path.join(outputDir, 'just-me-world-cup-final-poster-5x4-en-v1.jpg');

function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

const phone = escapeXml('+39 351 912 7047');

async function makeLogo(width) {
  const crop = sharp(source)
    .extract({ left: 125, top: 65, width: 466, height: 195 })
    .resize({ width });
  const { data: luma, info } = await crop.clone().greyscale().raw().toBuffer({ resolveWithObject: true });
  const alpha = Buffer.alloc(info.width * info.height);
  for (let index = 0; index < luma.length; index += 1) {
    alpha[index] = Math.max(0, Math.min(255, (luma[index] - 28) * 4.5));
  }
  const image = await sharp({
    create: {
      width: info.width,
      height: info.height,
      channels: 3,
      background: { r: 255, g: 255, b: 255 },
    },
  })
    .joinChannel(alpha, { raw: { width: info.width, height: info.height, channels: 1 } })
    .png()
    .toBuffer();
  return { image, width: info.width, height: info.height };
}

async function makePlayerArt(width) {
  const crop = sharp(source).extract({ left: 0, top: 250, width: 714, height: 630 });
  const { data: rgb, info } = await crop.resize({ width }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const maskSvg = Buffer.from(`
    <svg width="${info.width}" height="${info.height}" xmlns="http://www.w3.org/2000/svg">
      <defs><filter id="soft"><feGaussianBlur stdDeviation="24"/></filter></defs>
      <rect x="28" y="20" width="${info.width - 56}" height="${info.height - 40}"
        rx="42" fill="white" filter="url(#soft)"/>
    </svg>
  `);
  const { data: alpha } = await sharp(maskSvg).greyscale().raw().toBuffer({ resolveWithObject: true });
  const image = await sharp(rgb, { raw: { width: info.width, height: info.height, channels: 3 } })
    .joinChannel(alpha, { raw: { width: info.width, height: info.height, channels: 1 } })
    .png()
    .toBuffer();
  return { image, width: info.width, height: info.height };
}

async function composePoster() {
  const width = 1600;
  const height = 1280;
  const background = await sharp(source)
    .resize(width, height, { fit: 'cover', position: 'centre' })
    .blur(24)
    .modulate({ brightness: 0.46, saturation: 1.16 })
    .toBuffer();
  const players = await makePlayerArt(1120);
  const logo = await makeLogo(575);
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
        <text x="800" y="252" fill="#ffffff" font-size="42" font-weight="700" letter-spacing="3">SUNDAY 19.07.26</text>
        <rect x="280" y="795" width="1040" height="104" rx="24" fill="#050611" fill-opacity="0.94"/>
        <text x="800" y="840" fill="#ffffff" font-size="36" font-weight="700">DOORS 19:30  ·  LIVE 21:00</text>
        <text x="800" y="879" fill="#ffffff" font-size="27" font-weight="700" letter-spacing="2">COCKTAILS &amp; APERITIVO</text>
        <text x="800" y="949" fill="#e4bd70" font-size="29" font-weight="700" letter-spacing="7">WORLD CUP FINAL 2026</text>
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
        <text x="800" y="1055" fill="#ffffff" font-family="Arial Narrow, Arial, sans-serif" font-size="106" font-weight="800">SPAIN  <tspan fill="#e4bd70" font-family="Georgia, serif" font-size="60" font-style="italic">VS</tspan>  ARGENTINA</text>
        <line x1="235" y1="1084" x2="1365" y2="1084" stroke="#7b5d96" stroke-width="2"/>
        <text x="800" y="1135" fill="#ffffff" font-size="29" font-weight="700">WHATSAPP BOOKINGS  ${phone}</text>
        <text x="800" y="1180" fill="#d5d6dc" font-size="22" font-weight="700" letter-spacing="6">WWW.NIGHTLIFEMILAN.COM</text>
      </g>
    </svg>
  `);
  await sharp(background)
    .composite([
      { input: players.image, left: 240, top: 165 },
      { input: overlay, left: 0, top: 0 },
      { input: logo.image, left: Math.round((width - logo.width) / 2), top: 22 },
    ])
    .sharpen({ sigma: 0.5, m1: 0.55, m2: 1.1 })
    .jpeg({ quality: 94, chromaSubsampling: '4:4:4' })
    .toFile(posterOutput);
}

async function composeCover() {
  const width = 2000;
  const height = 1000;
  const background = await sharp(source)
    .resize(width, height, { fit: 'cover', position: 'centre' })
    .blur(30)
    .modulate({ brightness: 0.34, saturation: 1.08 })
    .toBuffer();
  const portrait = await sharp(source)
    .resize({ height: 1000 })
    .modulate({ brightness: 0.92, saturation: 1.02 })
    .toBuffer();
  const portraitMeta = await sharp(portrait).metadata();
  const portraitLeft = Math.round((width - (portraitMeta.width || 595)) / 2);
  const overlay = Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="left" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#02030b" stop-opacity="0.98"/>
          <stop offset="0.78" stop-color="#02030b" stop-opacity="0.88"/>
          <stop offset="1" stop-color="#02030b" stop-opacity="0"/>
        </linearGradient>
        <linearGradient id="right" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0" stop-color="#02030b" stop-opacity="0.98"/>
          <stop offset="0.78" stop-color="#02030b" stop-opacity="0.88"/>
          <stop offset="1" stop-color="#02030b" stop-opacity="0"/>
        </linearGradient>
        <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="4" stdDeviation="7" flood-color="#000" flood-opacity="0.98"/>
        </filter>
      </defs>
      <rect x="0" y="0" width="790" height="1000" fill="url(#left)"/>
      <rect x="1210" y="0" width="790" height="1000" fill="url(#right)"/>
      <g filter="url(#shadow)" font-family="Arial, Helvetica, sans-serif">
        <text x="165" y="165" fill="#e4bd70" font-size="34" font-weight="700" letter-spacing="5">WORLD CUP FINAL 2026</text>
        <text x="165" y="265" fill="#ffffff" font-family="Georgia, serif" font-size="78" font-style="italic" font-weight="700">FINAL</text>
        <text x="165" y="355" fill="#ffffff" font-size="50" font-weight="800">SPAIN VS ARGENTINA</text>
        <text x="165" y="455" fill="#ffffff" font-size="34" font-weight="700">SUNDAY 19.07.26</text>
        <text x="165" y="535" fill="#ffffff" font-size="34" font-weight="700">DOORS 19:30</text>
        <text x="165" y="595" fill="#ffffff" font-size="34" font-weight="700">LIVE 21:00</text>

        <text x="1430" y="300" fill="#ffffff" font-size="39" font-weight="700">COCKTAILS &amp; APERITIVO</text>
        <text x="1430" y="455" fill="#ffffff" font-size="30" font-weight="700">WHATSAPP BOOKINGS</text>
        <text x="1430" y="505" fill="#ffffff" font-size="34" font-weight="700">${phone}</text>
        <text x="1430" y="595" fill="#e4bd70" font-size="25" font-weight="700" letter-spacing="2">WWW.NIGHTLIFEMILAN.COM</text>
      </g>
    </svg>
  `);
  await sharp(background)
    .composite([
      { input: portrait, left: portraitLeft, top: 0 },
      { input: overlay, left: 0, top: 0 },
    ])
    .sharpen({ sigma: 0.45, m1: 0.5, m2: 1.05 })
    .jpeg({ quality: 94, chromaSubsampling: '4:4:4' })
    .toFile(coverOutput);
}

await Promise.all([composeCover(), composePoster()]);

const [cover, poster] = await Promise.all([
  sharp(coverOutput).metadata(),
  sharp(posterOutput).metadata(),
]);

console.log(JSON.stringify({
  cover: { path: coverOutput, width: cover.width, height: cover.height },
  poster: { path: posterOutput, width: poster.width, height: poster.height },
}));
