import { NextResponse } from 'next/server';
import { getEventbriteToken } from '@/lib/eventbriteToken';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const EVENTBRITE_API = 'https://www.eventbriteapi.com/v3';

export async function POST(request: Request) {
  const authHeader = request.headers.get('authorization');
  const okCron = process.env.CRON_SECRET && authHeader === `Bearer ${process.env.CRON_SECRET}`;
  if (!okCron) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

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
    new Blob([Buffer.from(imageBase64, 'base64')], { type: contentType }),
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
