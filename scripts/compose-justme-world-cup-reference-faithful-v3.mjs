import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const outputDir = path.join(root, 'artifacts', 'just-me-world-cup-final-2026-draft');
const source = path.join(
  outputDir,
  'faithful-source-cleaned-v4.png',
);

const overlay = Buffer.from(`
  <svg width="1432" height="2560" viewBox="0 0 1432 2560" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="datePatch" cx="50%" cy="50%" r="52%">
        <stop offset="0" stop-color="#070719" stop-opacity="1"/>
        <stop offset="0.76" stop-color="#070719" stop-opacity="0.99"/>
        <stop offset="1" stop-color="#070719" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="infoPatch" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#04040f" stop-opacity="0"/>
        <stop offset="0.19" stop-color="#04040f" stop-opacity="0.98"/>
        <stop offset="0.82" stop-color="#04040f" stop-opacity="0.98"/>
        <stop offset="1" stop-color="#04040f" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="footerPatch" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#03040e" stop-opacity="0"/>
        <stop offset="0.25" stop-color="#03040e" stop-opacity="0.98"/>
        <stop offset="1" stop-color="#03040e" stop-opacity="1"/>
      </linearGradient>
      <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#000000" flood-opacity="0.95"/>
      </filter>
    </defs>

    <!-- Replace only the incorrect date while preserving the original header. -->
    <rect x="290" y="470" width="852" height="145" fill="url(#datePatch)"/>
    <text x="716" y="565" text-anchor="middle" fill="#ffffff"
      font-family="Arial Nova, Arial, sans-serif" font-size="61" font-weight="700"
      letter-spacing="1" filter="url(#shadow)">SUNDAY 19.07.26</text>

    <!-- Retain the original three-line programme and change only its times. -->
    <rect x="370" y="1480" width="692" height="230" fill="url(#infoPatch)"/>
    <g fill="#ffffff" font-family="Arial Nova, Arial, sans-serif" font-size="48"
      font-weight="700" text-anchor="middle" filter="url(#shadow)">
      <text x="716" y="1560">FROM 7:30PM</text>
      <text x="716" y="1620">LIVE MATCH 9PM</text>
      <text x="716" y="1680">COCKTAIL AND BITES</text>
    </g>

    <!-- Replace only the original venue contacts. -->
    <rect x="0" y="2380" width="1432" height="180" fill="url(#footerPatch)"/>
    <text x="716" y="2470" text-anchor="middle" fill="#ffffff"
      font-family="Arial Nova, Arial, sans-serif" font-size="24" font-weight="700"
      letter-spacing="7" filter="url(#shadow)">RESERVATIONS +39 351 912 7047</text>
    <text x="716" y="2520" text-anchor="middle" fill="#ffffff"
      font-family="Arial Nova, Arial, sans-serif" font-size="22" font-weight="700"
      letter-spacing="11" filter="url(#shadow)">WWW.NIGHTLIFEMILAN.COM</text>
  </svg>
`);

const output = path.join(
  outputDir,
  'just-me-spain-argentina-world-cup-final-faithful-portrait-v4.jpg',
);

await sharp(source)
  .resize(1432, 2560, { fit: 'fill' })
  .modulate({ brightness: 1, saturation: 1.025 })
  .sharpen({ sigma: 0.42, m1: 0.45, m2: 0.85 })
  .composite([{ input: overlay, top: 0, left: 0 }])
  .jpeg({ quality: 96, chromaSubsampling: '4:4:4' })
  .toFile(output);

await Promise.all([
  sharp(output)
    .resize(716, 1280)
    .png()
    .toFile(path.join(outputDir, 'faithful-v4-preview-716x1280.png')),
  sharp(output)
    .resize(390, 697)
    .png()
    .toFile(path.join(outputDir, 'faithful-v4-mobile-390x697.png')),
]);

console.log(output);
