import sharp from "sharp";

const sourcePoster = "public/images/events/generated/just-me-university-party-recomposed-1x1-pt.png";
const generatedHeader = process.argv[2];
const output = "public/images/events/generated/just-me-university-party-eventbrite-header-2x1-pt.png";

if (!generatedHeader) {
  throw new Error("Pass the generated 2:1 header image path as the first argument.");
}

// Reuse the verified JUSTME logo from the approved square poster so its spelling is exact.
const logoWidth = 430;
const logoHeight = 145;
const rawLogo = await sharp(sourcePoster)
  .extract({ left: 420, top: 25, width: logoWidth, height: logoHeight })
  .ensureAlpha()
  .raw()
  .toBuffer();

// Retain only the bright logo pixels, making the crop background transparent.
for (let index = 0; index < rawLogo.length; index += 4) {
  const brightness = Math.max(rawLogo[index], rawLogo[index + 1], rawLogo[index + 2]);
  rawLogo[index + 3] = brightness > 175 ? Math.min(255, (brightness - 175) * 4) : 0;
}

const logo = await sharp(rawLogo, { raw: { width: logoWidth, height: logoHeight, channels: 4 } })
  .resize({ width: 505, height: 170, fit: "contain" })
  .png()
  .toBuffer();

const metadata = await sharp(generatedHeader).metadata();
await sharp(generatedHeader)
  .composite([
    {
      input: Buffer.from('<svg width="560" height="185"><rect width="560" height="185" fill="#050507"/></svg>'),
      left: Math.round((metadata.width - 560) / 2),
      top: 0,
    },
    { input: logo, left: Math.round((metadata.width - 505) / 2), top: 8 },
  ])
  .png()
  .toFile(output);

console.log(output);
