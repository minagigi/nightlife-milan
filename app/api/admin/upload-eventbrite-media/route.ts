import { NextResponse } from 'next/server';
import { createHash } from 'node:crypto';
import sharp from 'sharp';
import { getEventbriteToken } from '@/lib/eventbriteToken';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const EVENTBRITE_API = 'https://www.eventbriteapi.com/v3';
const GUE_PILOT_FILES = {
  'gue-just-me-2026-07-25-cover-2x1-en-v2.jpg': {
    width: 2000,
    height: 1000,
    sha256: 'fe70708a1d75ad23bc480ac249d9a2a01a54fcc951a298836c4bfbe973c52117',
  },
  'gue-just-me-2026-07-25-dress-5x4-en-v2.jpg': { width: 1600, height: 1280, sha256: 'd0b621c51b7807051d3a5a7f961cea9a0e58cba3630bcfe9977f25466b83b7b1' },
  'gue-just-me-2026-07-25-performance-5x4-en-v2.jpg': { width: 1600, height: 1280, sha256: '45fa3375210387acf4d705b453e25515cf5a35a92ac1a02cc7143641fd477347' },
  'gue-just-me-2026-07-25-poster-5x4-en-v2.jpg': { width: 1600, height: 1280, sha256: 'ab323b84eea01523ff30091b70ae08dd4b34de3014a1d2443bed6015a90e3266' },
  'gue-just-me-2026-07-25-programme-5x4-en-v2.jpg': { width: 1600, height: 1280, sha256: '5ed4ecff6756717f9b1ae796b82d66f0b57a146fabb246f3116a59e1573d01dd' },
  'gue-just-me-2026-07-25-target-5x4-en-v2.jpg': { width: 1600, height: 1280, sha256: 'e1548545f219fab02e391b5cfdc14c2a9ada9f8f485fe1c3acf31fa06e2c3a88' },
} as const;

function isJpeg(bytes: Buffer): boolean {
  return bytes.length >= 4 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
}

async function validateGuePilotMedia(
  image: Buffer,
  contentType: string | undefined,
  filename: string | undefined,
): Promise<string | null> {
  if (contentType !== 'image/jpeg' || !filename || !(filename in GUE_PILOT_FILES)) {
    return 'Guè pilot uploads accept only the six approved en-v2 JPEG filenames';
  }
  if (image.length < 100_000 || image.length > 5_000_000 || !isJpeg(image)) {
    return 'Guè pilot JPEG bytes are invalid or outside the approved size range';
  }
  const expected = GUE_PILOT_FILES[filename as keyof typeof GUE_PILOT_FILES];
  const digest = createHash('sha256').update(image).digest('hex');
  if (digest !== expected.sha256) return 'Guè pilot JPEG hash does not match the approved asset';
  try {
    const metadata = await sharp(image, { failOn: 'error' }).metadata();
    if (metadata.format !== 'jpeg' || metadata.width !== expected.width || metadata.height !== expected.height) {
      return 'Guè pilot JPEG dimensions do not match the approved canvas';
    }
  } catch {
    return 'Guè pilot JPEG cannot be decoded';
  }
  return null;
}

export async function POST(request: Request) {
  const authHeader = request.headers.get('authorization');
  const okCron = process.env.CRON_SECRET && authHeader === `Bearer ${process.env.CRON_SECRET}`;
  // The Guè pilot has a one-off publisher secret so its six approved assets can
  // be uploaded without exposing the long-lived cron credential. This endpoint
  // remains otherwise unchanged and still requires a bearer secret.
  const okGuePilot = process.env.GUE_PUBLISH_SECRET && authHeader === `Bearer ${process.env.GUE_PUBLISH_SECRET}`;
  if (!okCron && !okGuePilot) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const token = getEventbriteToken();
  if (!token) return NextResponse.json({ ok: false, error: 'EVENTBRITE_TOKEN not set' }, { status: 500 });

  let body: { imageBase64?: string; contentType?: string; filename?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body' }, { status: 400 });
  }

  const { imageBase64, contentType, filename } = body;
  if (!imageBase64 || !contentType) {
    return NextResponse.json({ ok: false, error: 'imageBase64 and contentType are required' }, { status: 400 });
  }
  const image = Buffer.from(imageBase64, 'base64');
  if (okGuePilot && !okCron) {
    const validationError = await validateGuePilotMedia(image, contentType, filename);
    if (validationError) return NextResponse.json({ ok: false, error: validationError }, { status: 400 });
  }

  const uploadInfoRes = await fetch(
    `${EVENTBRITE_API}/media/upload/?type=image-event-logo&token=${encodeURIComponent(token)}`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  if (!uploadInfoRes.ok) {
    return NextResponse.json(
      { ok: false, error: `Upload info failed: HTTP ${uploadInfoRes.status}`, body: (await uploadInfoRes.text()).slice(0, 500) },
      { status: 502 },
    );
  }

  const uploadInfo = await uploadInfoRes.json();
  const form = new FormData();
  for (const [key, value] of Object.entries(uploadInfo.upload_data || {})) {
    form.append(key, (value as string) ?? '');
  }
  form.append(
    uploadInfo.file_parameter_name || 'file',
    new Blob([image], { type: contentType }),
    filename || 'eventbrite-body-image.jpg',
  );

  const uploadRes = await fetch(uploadInfo.upload_url, { method: 'POST', body: form });
  if (!uploadRes.ok) {
    return NextResponse.json(
      { ok: false, error: `Upload failed: HTTP ${uploadRes.status}`, body: (await uploadRes.text()).slice(0, 500) },
      { status: 502 },
    );
  }

  const finalizeRes = await fetch(`${EVENTBRITE_API}/media/upload/`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'content-type': 'application/json' },
    body: JSON.stringify({ upload_token: uploadInfo.upload_token }),
  });
  if (!finalizeRes.ok) {
    return NextResponse.json(
      { ok: false, error: `Finalize failed: HTTP ${finalizeRes.status}`, body: (await finalizeRes.text()).slice(0, 500) },
      { status: 502 },
    );
  }

  const media = await finalizeRes.json();
  return NextResponse.json({
    ok: true,
    id: media.id,
    url: media.url,
    originalUrl: media.original?.url,
    aspectRatio: media.aspect_ratio,
  });
}
