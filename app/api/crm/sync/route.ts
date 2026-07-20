import { NextResponse } from 'next/server';
import { syncEventbriteCrm } from '@/lib/eventbriteCrm';

export const runtime = 'nodejs';
export const maxDuration = 300;
export const dynamic = 'force-dynamic';

const privateNoStoreHeaders = { 'Cache-Control': 'private, no-store' };

function isAuthorized(request: Request): boolean {
  const url = new URL(request.url);
  const authorization = request.headers.get('authorization');
  const cronAuthorized = Boolean(process.env.CRON_SECRET && authorization === `Bearer ${process.env.CRON_SECRET}`);
  const manualAuthorized = Boolean(process.env.INDEXING_SECRET && url.searchParams.get('secret') === process.env.INDEXING_SECRET);
  const crmAuthorized = Boolean(
    process.env.CRM_SYNC_SECRET
    && request.headers.get('x-crm-sync-secret') === process.env.CRM_SYNC_SECRET,
  );
  return cronAuthorized || manualAuthorized || crmAuthorized;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401, headers: privateNoStoreHeaders },
    );
  }
  try {
    const result = await syncEventbriteCrm();
    return NextResponse.json(
      { ok: true, ...result },
      { headers: privateNoStoreHeaders },
    );
  } catch (error) {
    console.error('[crm-sync]', error instanceof Error ? error.message : 'Unknown CRM sync error');
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'CRM sync failed' },
      { status: 500, headers: privateNoStoreHeaders },
    );
  }
}
