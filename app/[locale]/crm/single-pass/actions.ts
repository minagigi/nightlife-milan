'use server';

import { revalidatePath } from 'next/cache';
import { getOrderById, saveOrder } from '@/lib/single-pass/store';
import { validateAndSaveStripeKey } from '@/lib/single-pass/stripe';
import type { WhatsappMiniGroupStatus } from '@/lib/single-pass/types';

export async function saveStripeVaultAction(formData: FormData): Promise<void> {
  const secretKey = String(formData.get('secretKey') || '').trim();
  const siteOrigin = String(formData.get('siteOrigin') || 'https://nightlifemilan.com').trim();
  const locale = String(formData.get('locale') || 'it').trim();
  if (!secretKey) return;

  await validateAndSaveStripeKey(secretKey, siteOrigin);
  revalidatePath(`/${locale}/crm/single-pass`);
  revalidatePath('/crm/single-pass');
}

export async function updateOrderWhatsappGroupAction(formData: FormData): Promise<void> {
  const orderId = String(formData.get('orderId') || '').trim();
  const locale = String(formData.get('locale') || 'it').trim();
  const statusRaw = String(formData.get('whatsappGroupStatus') || 'scheduled_dec_20').trim();
  const inviteUrlRaw = String(formData.get('whatsappGroupInviteUrl') || '').trim();

  if (!orderId) return;
  const order = await getOrderById(orderId);
  if (!order) return;

  const validStatuses: ReadonlySet<WhatsappMiniGroupStatus> = new Set([
    'scheduled_dec_20',
    'invited',
    'active',
  ]);
  const whatsappGroupStatus: WhatsappMiniGroupStatus = validStatuses.has(
    statusRaw as WhatsappMiniGroupStatus,
  )
    ? (statusRaw as WhatsappMiniGroupStatus)
    : 'scheduled_dec_20';

  const safeInviteUrl =
    inviteUrlRaw && /^https:\/\/(chat\.whatsapp\.com|wa\.me)\//i.test(inviteUrlRaw)
      ? inviteUrlRaw.slice(0, 300)
      : null;

  await saveOrder({
    ...order,
    whatsappGroupStatus,
    whatsappGroupInviteUrl: safeInviteUrl,
    updatedAt: new Date().toISOString(),
  });

  revalidatePath(`/${locale}/crm/single-pass`);
  revalidatePath('/crm/single-pass');
}
