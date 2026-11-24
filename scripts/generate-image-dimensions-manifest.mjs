#!/usr/bin/env node
/**
 * Generates lib/imageDimensionsManifest.json mapping "/images/..." -> [width, height]
 * from binary headers (WebP VP8/VP8L/VP8X, PNG IHDR, JPEG SOF) with zero external deps.
 * Serverless/Edge-safe: eliminates runtime fs access in Vercel ISR Lambdas.
 */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const pubDir = path.join(root, 'public');
const imagesDir = path.join(pubDir, 'images');
const outPath = path.join(root, 'lib', 'imageDimensionsManifest.json');

function readDimensions(filePath) {
  const fd = fs.openSync(filePath, 'r');
  try {
    const buf = Buffer.alloc(65536);
    const bytesRead = fs.readSync(fd, buf, 0, buf.length, 0);
    if (bytesRead < 24) return null;

    // WebP: RIFF....WEBP
    if (buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') {
      const chunk = buf.toString('ascii', 12, 16);
      if (chunk === 'VP8X' && bytesRead >= 30) {
        const w = 1 + buf.readUIntLE(24, 3);
        const h = 1 + buf.readUIntLE(27, 3);
        return [w, h];
      }
      if (chunk === 'VP8 ' && bytesRead >= 30) {
        const w = buf.readUInt16LE(26) & 0x3fff;
        const h = buf.readUInt16LE(28) & 0x3fff;
        return [w, h];
      }
      if (chunk === 'VP8L' && bytesRead >= 25) {
        const b0 = buf[21], b1 = buf[22], b2 = buf[23], b3 = buf[24];
        const w = 1 + (((b1 & 0x3f) << 8) | b0);
        const h = 1 + (((b3 & 0x0f) << 10) | (b2 << 2) | ((b1 & 0xc0) >> 6));
        return [w, h];
      }
    }

    // PNG: 89 50 4E 47 0D 0A 1A 0A
    if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) {
      return [buf.readUInt32BE(16), buf.readUInt32BE(20)];
    }

    // JPEG: FF D8
    if (buf[0] === 0xff && buf[1] === 0xd8) {
      let offset = 2;
      while (offset + 9 < bytesRead) {
        if (buf[offset] !== 0xff) {
          offset++;
          continue;
        }
        const marker = buf[offset + 1];
        if (marker === 0xff) {
          offset++;
          continue;
        }
        if (
          (marker >= 0xc0 && marker <= 0xc3) ||
          (marker >= 0xc5 && marker <= 0xc7) ||
          (marker >= 0xc9 && marker <= 0xcb) ||
          (marker >= 0xcd && marker <= 0xcf)
        ) {
          const h = buf.readUInt16BE(offset + 5);
          const w = buf.readUInt16BE(offset + 7);
          return [w, h];
        }
        const segLen = buf.readUInt16BE(offset + 2);
        if (segLen < 2) break;
        offset += 2 + segLen;
      }
    }
  } finally {
    fs.closeSync(fd);
  }
  return null;
}

function walk(dir, acc) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      // Skip localized copies under seo-events/<locale> except master (handled via rewrite rule in helper)
      const relParts = path.relative(imagesDir, full).split(path.sep);
      if (relParts[0] === 'seo-events' && relParts.length >= 2 && relParts[1] !== 'master') {
        continue;
      }
      walk(full, acc);
    } else if (/\.(webp|png|jpe?g)$/i.test(ent.name)) {
      const dims = readDimensions(full);
      if (dims && dims[0] > 0 && dims[1] > 0) {
        const webKey = '/' + path.relative(pubDir, full).split(path.sep).join('/');
        acc[webKey] = dims;
      }
    }
  }
}

const raw = {};
walk(imagesDir, raw);
const sorted = Object.fromEntries(Object.keys(raw).sort().map((k) => [k, raw[k]]));
fs.writeFileSync(outPath, JSON.stringify(sorted) + '\n', 'utf8');
console.log(`OK imageDimensionsManifest.json: ${Object.keys(sorted).length} immagini indicizzate.`);
