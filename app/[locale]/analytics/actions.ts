'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { cookies, headers } from 'next/headers';
import { upsertXceedEntry, deleteXceedEntry } from '@/lib/analyticsStore';
import {
  ANALYTICS_MASTER_COOKIE,
  verifyAnalyticsMasterCookie,
  verifyBasicAuthHeader,
} from '@/lib/analyticsMasterAuth';

async function assertAnalyticsAuthorized(): Promise<boolean> {
  const [ck, hd] = await Promise.all([cookies(), headers()]);
  if (await verifyAnalyticsMasterCookie(ck.get(ANALYTICS_MASTER_COOKIE)?.value)) {
    return true;
  }
  return verifyBasicAuthHeader(hd.get('authorization'));
}

function numOrNull(formData: FormData, key: string): number | null {
  const v = String(formData.get(key) ?? '').trim();
  if (v === '') return null;
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 ? n : null;
}

export async function refreshUnifiedAnalyticsAction(): Promise<void> {
  if (!(await assertAnalyticsAuthorized())) return;
  revalidateTag('nlm-unified-analytics');
  revalidatePath('/it/analytics');
  revalidatePath('/analytics');
}

export async function saveXceedEntry(formData: FormData): Promise<void> {
  if (!(await assertAnalyticsAuthorized())) return;
  const eventName = String(formData.get('eventName') ?? '').trim().slice(0, 120);
  const eventDate = String(formData.get('eventDate') ?? '').trim();
  if (!eventName || !/^\d{4}-\d{2}-\d{2}$/.test(eventDate)) return;

  await upsertXceedEntry({
    eventName,
    eventDate,
    views: numOrNull(formData, 'views'),
    sales: numOrNull(formData, 'sales'),
    revenue: numOrNull(formData, 'revenue'),
  });
  revalidatePath('/', 'layout');
}

export async function removeXceedEntry(formData: FormData): Promise<void> {
  if (!(await assertAnalyticsAuthorized())) return;
  const key = String(formData.get('key') ?? '');
  if (!key) return;
  await deleteXceedEntry(key);
  revalidatePath('/', 'layout');
}
