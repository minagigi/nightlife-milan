import { NextResponse } from 'next/server';
import { editWithNanoBanana } from '@/lib/posterPipeline';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

/**
 * Diagnostica one-off (come le spike route): edit generico di UN'immagine
 * via Gemini, riusando GEMINI_API_KEY server-side — serve per pulire foto
 * venue con branding di terzi (es. Cavalli/Ginarte) senza portare la chiave
 * in locale, dove GEMINI_API_KEY è solo un placeholder vuoto.
 *
 * Auth: Authorization: Bearer CRON_SECRET
 * Body JSON: { imageBase64, contentType, prompt }
 */
export async function POST(request: Request) {
  const authHeader = request.headers.get('authorization');
  const okCron = process.env.CRON_SECRET && authHeader === `Bearer ${process.env.CRON_SECRET}`;
  if (!okCron) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let body: { imageBase64?: string; contentType?: string; prompt?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body' }, { status: 400 });
  }

  const { imageBase64, contentType, prompt } = body;
  if (!imageBase64 || !contentType || !prompt) {
    return NextResponse.json({ ok: false, error: 'imageBase64, contentType and prompt are required' }, { status: 400 });
  }

  const edited = await editWithNanoBanana(imageBase64, contentType, prompt);
  if (!edited) {
    return NextResponse.json({ ok: false, error: 'Gemini edit failed or GEMINI_API_KEY missing' }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    imageBase64: edited.buffer.toString('base64'),
    contentType: edited.mediaType,
  });
}
