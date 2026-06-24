// usage: node scripts/save-image.mjs <url> <relativePathWithoutExtension>
import { writeFileSync } from 'node:fs';
const [,, url, out] = process.argv;
const res = await fetch(url);
const buf = Buffer.from(await res.arrayBuffer());
writeFileSync(out + '.jpg', buf);
console.log('SAVED', out + '.jpg');
