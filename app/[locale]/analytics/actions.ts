'use server';

import { revalidatePath } from 'next/cache';
import { upsertXceedEntry, deleteXceedEntry } from '@/lib/analyticsStore';

/**
 * Server action della dashboard /analytics. Sicurezza: le action vengono
 * POSTate all'URL della pagina stessa (/analytics), quindi passano dalla
 * Basic Auth del middleware — è il motivo per cui NON sono una route /api.
 */

function numOrNull(formData: FormData, key: string): number | null {
  const v = String(formData.get(key) ?? '').trim();
  if (v === '') return null;
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 ? n : null;
}

export async function saveXceedEntry(formData: FormData): Promise<void> {
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
  const key = String(formData.get('key') ?? '');
  if (!key) return;
  await deleteXceedEntry(key);
  revalidatePath('/', 'layout');
}
