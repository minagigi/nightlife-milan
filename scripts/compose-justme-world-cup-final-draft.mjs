import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const outputDir = path.join(root, 'artifacts', 'just-me-world-cup-final-2026-draft');
const generatedDir = path.join(process.env.USERPROFILE, '.codex', 'generated_images', '019f5f7e-6575-7b51-95e6-c541eec8fb89');

const sources = {
  cover: path.join(generatedDir, 'exec-5acd6f77-5ed1-42d4-9774-97613cf4062d.png'),
  square: path.join(generatedDir, 'exec-03ebeacf-4d0c-4782-963e-082036002764.png'),
  aperitivo: path.join(generatedDir, 'exec-e995c086-cbd9-43db-8d2d-f33736c0c078.png'),
  maxischermo: path.join(generatedDir, 'exec-8fce32f3-8fb5-4051-bc53-75bbe7acb1f6.png'),
  vip: path.join(generatedDir, 'exec-6c393cda-1b3d-42ec-8689-55abfee36d06.png'),
  afterparty: path.join(generatedDir, 'exec-2d496160-5d83-4284-aaf8-9a082bd1b86b.png'),
  logoSource: path.join(root, 'public', 'images', 'events', 'generated', 'just-me-university-party-eventbrite-header-2x1-pt.png'),
};

function coverTypography() {
  return Buffer.from(`
    <svg width="2160" height="1080" viewBox="0 0 2160 1080" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="topShade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#050506" stop-opacity="0.96"/>
          <stop offset="0.78" stop-color="#050506" stop-opacity="0.2"/>
          <stop offset="1" stop-color="#050506" stop-opacity="0"/>
        </linearGradient>
        <linearGradient id="bottomShade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#050506" stop-opacity="0"/>
          <stop offset="0.35" stop-color="#050506" stop-opacity="0.72"/>
          <stop offset="1" stop-color="#050506" stop-opacity="0.98"/>
        </linearGradient>
        <filter id="shadow"><feDropShadow dx="0" dy="4" stdDeviation="7" flood-color="#000" flood-opacity="0.8"/></filter>
      </defs>
      <rect width="2160" height="390" fill="url(#topShade)"/>
      <rect y="740" width="2160" height="340" fill="url(#bottomShade)"/>
      <rect x="0" y="0" width="14" height="1080" fill="#77c8f2"/>
      <rect x="2146" y="0" width="14" height="1080" fill="#efb833"/>

      <g transform="translate(76 54)">
        <rect width="390" height="88" rx="44" fill="#101114" fill-opacity="0.88" stroke="#ffffff" stroke-opacity="0.2"/>
        <text x="195" y="36" text-anchor="middle" fill="#fff" font-family="Arial Nova, Arial, sans-serif" font-size="28" font-weight="700">MILAN NIGHTLIFE</text>
        <text x="195" y="66" text-anchor="middle" fill="#d8d9dc" font-family="Arial Nova, Arial, sans-serif" font-size="20">EVENT SERVICE</text>
      </g>
      <g transform="translate(1830 60)">
        <rect width="250" height="76" rx="38" fill="#101114" fill-opacity="0.88" stroke="#ffffff" stroke-opacity="0.2"/>
        <text x="125" y="49" text-anchor="middle" fill="#fff" font-family="Arial Nova, Arial, sans-serif" font-size="31" font-weight="700">21+  ELEGANTE</text>
      </g>

      <g filter="url(#shadow)">
        <text x="1080" y="246" text-anchor="middle" fill="#ffffff" font-family="Arial Nova Cond, Arial Narrow, sans-serif" font-size="76" font-weight="700">FINALE MONDIALE</text>
        <text x="885" y="329" text-anchor="end" fill="#91d7ff" font-family="Arial Nova Cond, Arial Narrow, sans-serif" font-size="88" font-weight="700">ARGENTINA</text>
        <text x="1080" y="326" text-anchor="middle" fill="#ffffff" font-family="Georgia, serif" font-size="52" font-style="italic">vs</text>
        <text x="1275" y="329" text-anchor="start" fill="#f5c84a" font-family="Arial Nova Cond, Arial Narrow, sans-serif" font-size="88" font-weight="700">SPAGNA</text>
      </g>

      <line x1="162" y1="840" x2="1998" y2="840" stroke="#ffffff" stroke-opacity="0.32"/>
      <text x="162" y="909" fill="#ffffff" font-family="Arial Nova Cond, Arial Narrow, sans-serif" font-size="58" font-weight="700">DOMENICA 19 LUGLIO 2026</text>
      <text x="1998" y="909" text-anchor="end" fill="#ffffff" font-family="Arial Nova Cond, Arial Narrow, sans-serif" font-size="58" font-weight="700">APERTURA 18:00  |  KICK-OFF 21:00</text>
      <text x="162" y="970" fill="#dfe1e6" font-family="Arial Nova, Arial, sans-serif" font-size="29" font-weight="700">MAXISCHERMO  |  APERITIVO  |  UPTOWN NIGHTS AFTERPARTY</text>
      <text x="1998" y="970" text-anchor="end" fill="#ffffff" font-family="Arial Nova, Arial, sans-serif" font-size="29" font-weight="700">WHATSAPP +39 351 912 7047</text>
      <text x="1080" y="1030" text-anchor="middle" fill="#c9cbd1" font-family="Arial Nova, Arial, sans-serif" font-size="22">JUST ME MILANO  |  PARCO SEMPIONE - TORRE BRANCA</text>
    </svg>
  `);
}

function squareTypography() {
  return Buffer.from(`
    <svg width="1600" height="1600" viewBox="0 0 1600 1600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="topShade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#050506" stop-opacity="0.98"/>
          <stop offset="0.82" stop-color="#050506" stop-opacity="0.16"/>
          <stop offset="1" stop-color="#050506" stop-opacity="0"/>
        </linearGradient>
        <linearGradient id="bottomShade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#050506" stop-opacity="0"/>
          <stop offset="0.4" stop-color="#050506" stop-opacity="0.82"/>
          <stop offset="1" stop-color="#050506" stop-opacity="0.99"/>
        </linearGradient>
        <filter id="shadow"><feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#000" flood-opacity="0.85"/></filter>
      </defs>
      <rect width="1600" height="520" fill="url(#topShade)"/>
      <rect y="1160" width="1600" height="440" fill="url(#bottomShade)"/>
      <rect x="0" width="12" height="1600" fill="#77c8f2"/>
      <rect x="1588" width="12" height="1600" fill="#efb833"/>

      <g filter="url(#shadow)">
        <text x="800" y="260" text-anchor="middle" fill="#ffffff" font-family="Arial Nova Cond, Arial Narrow, sans-serif" font-size="88" font-weight="700">FINALE MONDIALE</text>
        <text x="695" y="365" text-anchor="end" fill="#91d7ff" font-family="Arial Nova Cond, Arial Narrow, sans-serif" font-size="104" font-weight="700">ARGENTINA</text>
        <text x="800" y="361" text-anchor="middle" fill="#ffffff" font-family="Georgia, serif" font-size="54" font-style="italic">vs</text>
        <text x="905" y="365" text-anchor="start" fill="#f5c84a" font-family="Arial Nova Cond, Arial Narrow, sans-serif" font-size="104" font-weight="700">SPAGNA</text>
      </g>

      <line x1="110" y1="1280" x2="1490" y2="1280" stroke="#ffffff" stroke-opacity="0.34"/>
      <text x="800" y="1350" text-anchor="middle" fill="#ffffff" font-family="Arial Nova Cond, Arial Narrow, sans-serif" font-size="59" font-weight="700">DOMENICA 19 LUGLIO 2026</text>
      <text x="800" y="1415" text-anchor="middle" fill="#ffffff" font-family="Arial Nova, Arial, sans-serif" font-size="40" font-weight="700">APERTURA 18:00  |  KICK-OFF 21:00</text>
      <text x="800" y="1472" text-anchor="middle" fill="#d9dbe0" font-family="Arial Nova, Arial, sans-serif" font-size="29">MAXISCHERMO  |  APERITIVO  |  UPTOWN NIGHTS</text>
      <text x="800" y="1530" text-anchor="middle" fill="#ffffff" font-family="Arial Nova, Arial, sans-serif" font-size="31" font-weight="700">PRENOTAZIONI WHATSAPP +39 351 912 7047</text>
      <text x="800" y="1570" text-anchor="middle" fill="#c9cbd1" font-family="Arial Nova, Arial, sans-serif" font-size="20">JUST ME MILANO  |  PARCO SEMPIONE - TORRE BRANCA  |  21+</text>
    </svg>
  `);
}

async function makeLogo(width) {
  const crop = await sharp(sources.logoSource)
    .extract({ left: 607, top: 0, width: 560, height: 185 })
    .resize({ width })
    .png()
    .toBuffer();
  return crop;
}

await fs.mkdir(outputDir, { recursive: true });

const coverLogo = await makeLogo(520);
await sharp(sources.cover)
  .resize(2160, 1080, { fit: 'cover' })
  .composite([
    { input: coverTypography(), top: 0, left: 0 },
    { input: coverLogo, top: 34, left: 820 },
  ])
  .jpeg({ quality: 94, chromaSubsampling: '4:4:4' })
  .toFile(path.join(outputDir, 'just-me-finale-mondiale-argentina-spagna-cover-2x1-it.jpg'));

const squareLogo = await makeLogo(430);
await sharp(sources.square)
  .resize(1600, 1600, { fit: 'cover' })
  .composite([
    { input: squareTypography(), top: 0, left: 0 },
    { input: squareLogo, top: 28, left: 585 },
  ])
  .jpeg({ quality: 94, chromaSubsampling: '4:4:4' })
  .toFile(path.join(outputDir, 'just-me-finale-mondiale-argentina-spagna-poster-1x1-it.jpg'));

for (const [name, source] of Object.entries({
  aperitivo: sources.aperitivo,
  maxischermo: sources.maxischermo,
  'tavoli-vip': sources.vip,
  afterparty: sources.afterparty,
})) {
  await sharp(source)
    .resize(1600, 1600, { fit: 'cover' })
    .jpeg({ quality: 92, chromaSubsampling: '4:4:4' })
    .toFile(path.join(outputDir, `just-me-finale-mondiale-${name}-1x1.jpg`));
}

console.log(outputDir);
