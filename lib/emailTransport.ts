// Trasporto email verso Resend via REST (fetch puro, nessuna dipendenza nuova).
// Modalita dry_run di default: nessuna rete finche RESEND_API_KEY non e valorizzata.
import type { EmailMessage, EmailTransportResult } from './attendeeEmailTypes';

const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const REQUEST_TIMEOUT_MS = 15000;
const DEFAULT_FROM = 'Nightlife Milan <events@nightlifemilan.com>';

export function emailTransportMode(): 'live' | 'dry_run' {
  return (process.env.RESEND_API_KEY || '').trim() ? 'live' : 'dry_run';
}

export function resolveRecipient(to: string): string {
  const override = (process.env.EMAIL_TEST_OVERRIDE || '').trim();
  return override || to;
}

export async function sendAttendeeEmail(message: EmailMessage): Promise<EmailTransportResult> {
  const effectiveTo = resolveRecipient(message.to);

  if (emailTransportMode() === 'dry_run') {
    return { outcome: 'dry_run', effectiveTo };
  }

  const apiKey = (process.env.RESEND_API_KEY || '').trim();
  const from = process.env.EMAIL_FROM || DEFAULT_FROM;
  const replyTo = (process.env.EMAIL_REPLY_TO || '').trim();

  const body: Record<string, unknown> = {
    from,
    to: [effectiveTo],
    subject: message.subject,
    html: message.html,
    text: message.text,
    ...(replyTo ? { reply_to: replyTo } : {}),
    ...(message.listUnsubscribeUrl
      ? {
          headers: {
            'List-Unsubscribe': `<${message.listUnsubscribeUrl}>`,
            'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
          },
        }
      : {}),
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    if (!response.ok) {
      const testo = await response.text();
      return {
        outcome: 'failed',
        effectiveTo,
        error: `HTTP ${response.status}: ${testo.slice(0, 300)}`,
      };
    }

    const json = (await response.json()) as { id?: string };
    return { outcome: 'sent', effectiveTo, providerMessageId: json.id };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return { outcome: 'failed', effectiveTo, error: errorMessage };
  } finally {
    clearTimeout(timeoutId);
  }
}
