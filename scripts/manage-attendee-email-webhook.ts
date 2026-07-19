#!/usr/bin/env npx tsx
/**
 * CLI di gestione dei webhook Eventbrite per il dispatch email post-registrazione
 * (app/api/crm/email-webhook/route.ts). Unico punto del contratto email in cui
 * e' ammesso codice di rete eseguibile: va lanciato SOLO a mano.
 *
 * Uso:
 *   npx tsx scripts/manage-attendee-email-webhook.ts list
 *   npx tsx scripts/manage-attendee-email-webhook.ts create --endpoint <url> [--event <id>]
 *   npx tsx scripts/manage-attendee-email-webhook.ts delete --id <id>
 *
 * Non stampa mai il token Eventbrite ne l'endpoint_url non mascherato: il
 * secret ?k= presente nell'endpoint del webhook viene sempre oscurato.
 */
import { getEventbriteToken } from '../lib/eventbriteToken';

const EVENTBRITE_API = 'https://www.eventbriteapi.com/v3';
const ORG = '2988002072164';

function argValue(name: string): string | undefined {
  const idx = process.argv.indexOf(`--${name}`);
  return idx !== -1 ? process.argv[idx + 1] : undefined;
}

function maskEndpoint(url: string): string {
  return url.replace(/([?&]k=)[^&\s]+/g, '$1***');
}

interface EventbriteWebhook {
  id: string;
  actions?: string;
  endpoint_url?: string;
}

async function reportError(res: Response): Promise<void> {
  const text = await res.text();
  console.error(`HTTP ${res.status}: ${text.slice(0, 300)}`);
  process.exitCode = 1;
}

async function listWebhooks(token: string): Promise<void> {
  const res = await fetch(`${EVENTBRITE_API}/organizations/${ORG}/webhooks/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    await reportError(res);
    return;
  }

  const body = await res.json();
  const webhooks: EventbriteWebhook[] = body.webhooks || [];

  if (webhooks.length === 0) {
    console.log('No webhooks configured.');
    return;
  }

  for (const hook of webhooks) {
    console.log(`${hook.id}  actions=${hook.actions || ''}  endpoint=${maskEndpoint(hook.endpoint_url || '')}`);
  }
}

async function createWebhook(token: string): Promise<void> {
  const endpoint = argValue('endpoint');
  if (!endpoint) {
    console.error('Missing --endpoint <url>');
    process.exitCode = 1;
    return;
  }
  const eventId = argValue('event');

  const res = await fetch(`${EVENTBRITE_API}/organizations/${ORG}/webhooks/`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      endpoint_url: endpoint,
      actions: 'order.placed',
      ...(eventId ? { event_id: eventId } : {}),
    }),
  });
  if (!res.ok) {
    await reportError(res);
    return;
  }

  const body = await res.json();
  console.log(`Created webhook ${body.id}  endpoint=${maskEndpoint(endpoint)}`);
}

async function deleteWebhook(token: string): Promise<void> {
  const id = argValue('id');
  if (!id) {
    console.error('Missing --id <id>');
    process.exitCode = 1;
    return;
  }

  const res = await fetch(`${EVENTBRITE_API}/webhooks/${id}/`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    await reportError(res);
    return;
  }

  console.log(`Deleted webhook ${id}`);
}

async function main() {
  const token = getEventbriteToken();
  if (!token) {
    console.error('EVENTBRITE_TOKEN not set');
    process.exitCode = 1;
    return;
  }

  const command = process.argv[2];
  switch (command) {
    case 'list':
      await listWebhooks(token);
      break;
    case 'create':
      await createWebhook(token);
      break;
    case 'delete':
      await deleteWebhook(token);
      break;
    default:
      console.error('Usage: manage-attendee-email-webhook.ts <list|create|delete> [options]');
      process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(`[manage-attendee-email-webhook] Failed: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
});
