import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

/**
 * On-demand ISR purge. Necessario perché la cache ISR di Vercel persiste
 * TRA i deploy (non si invalida da sola su un nuovo push) — una pagina già
 * visitata prima di un fix continua a servire il bundle/HTML vecchio fino
 * alla naturale scadenza di `revalidate` (fino a 1h per le pagine evento).
 * Usato per forzare l'aggiornamento immediato dopo un fix client-side
 * (es. LanguageSwitcher) o dopo un publish (invece di aspettare il poll).
 *
 * Auth: Authorization: Bearer CRON_SECRET
 * Query: ?path=/events/slug (ripetibile) oppure ?path=/events/slug&path=/it/events/slug
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const authHeader = request.headers.get('authorization');
  const ok = process.env.CRON_SECRET && authHeader === `Bearer ${process.env.CRON_SECRET}`;
  if (!ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const paths = searchParams.getAll('path');
  if (paths.length === 0) return NextResponse.json({ ok: false, error: 'Missing ?path=' }, { status: 400 });

  const results: { path: string; ok: boolean; error?: string }[] = [];
  for (const path of paths) {
    try {
      revalidatePath(path);
      results.push({ path, ok: true });
    } catch (e) {
      results.push({ path, ok: false, error: (e as Error).message });
    }
  }

  return NextResponse.json({ ok: true, results });
}
