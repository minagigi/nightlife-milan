// Trasporto email primario via SMTP Purelymail (confirm@nightlifemilan.com) con fallback Resend REST.
// Modalita dry_run quando ne SMTP_USER/SMTP_PASS ne RESEND_API_KEY sono valorizzati.
import nodemailer from 'nodemailer';
import type { EmailMessage, EmailTransportResult } from './attendeeEmailTypes';

const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const REQUEST_TIMEOUT_MS = 15000;
const DEFAULT_FROM = 'Nightlife Milan <confirm@nightlifemilan.com>';
const DEFAULT_REPLY_TO = 'concierge@nightlifemilan.com';
const DEFAULT_SMTP_HOST = 'smtp.purelymail.com';
const DEFAULT_SMTP_PORT = 465;

export type EmailTransportProvider = 'smtp' | 'resend' | 'dry_run';

export function emailTransportProvider(): EmailTransportProvider {
  const smtpUser = (process.env.SMTP_USER || '').trim();
  const smtpPass = (process.env.SMTP_PASS || '').trim();
  if (smtpUser && smtpPass) return 'smtp';
  if ((process.env.RESEND_API_KEY || '').trim()) return 'resend';
  return 'dry_run';
}

export function emailTransportMode(): 'live' | 'dry_run' {
  return emailTransportProvider() !== 'dry_run' ? 'live' : 'dry_run';
}

export function resolveRecipient(to: string): string {
  const override = (process.env.EMAIL_TEST_OVERRIDE || '').trim();
  return override || to;
}

function buildUnsubscribeHeaders(listUnsubscribeUrl?: string): Record<string, string> | undefined {
  if (!listUnsubscribeUrl) return undefined;
  return {
    'List-Unsubscribe': `<${listUnsubscribeUrl}>`,
    'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
  };
}

function formatRfcMessageId(idempotencyKey?: string): string | undefined {
  const clean = (idempotencyKey || '').replace(/[^a-zA-Z0-9._-]/g, '').trim();
  return clean ? `<${clean}@nightlifemilan.com>` : undefined;
}

async function sendViaSmtp(
  message: EmailMessage,
  effectiveTo: string,
  from: string,
  replyTo: string,
): Promise<EmailTransportResult> {
  const smtpHost = (process.env.SMTP_HOST || '').trim() || DEFAULT_SMTP_HOST;
  const parsedPort = Number.parseInt((process.env.SMTP_PORT || '').trim(), 10);
  const smtpPort = Number.isFinite(parsedPort) && parsedPort > 0 ? parsedPort : DEFAULT_SMTP_PORT;
  const smtpUser = (process.env.SMTP_USER || '').trim();
  const smtpPass = (process.env.SMTP_PASS || '').trim();

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: { user: smtpUser, pass: smtpPass },
    connectionTimeout: REQUEST_TIMEOUT_MS,
    greetingTimeout: REQUEST_TIMEOUT_MS,
    socketTimeout: REQUEST_TIMEOUT_MS,
  });

  const messageId = formatRfcMessageId(message.idempotencyKey);
  const headers = buildUnsubscribeHeaders(message.listUnsubscribeUrl);

  try {
    const info = await transporter.sendMail({
      from,
      to: effectiveTo,
      replyTo,
      subject: message.subject,
      html: message.html,
      text: message.text,
      ...(messageId ? { messageId } : {}),
      ...(headers ? { headers } : {}),
    });
    return {
      outcome: 'sent',
      effectiveTo,
      providerMessageId: info.messageId || messageId,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return { outcome: 'failed', effectiveTo, error: errorMessage };
  } finally {
    transporter.close();
  }
}

async function sendViaResend(
  message: EmailMessage,
  effectiveTo: string,
  from: string,
  replyTo: string,
): Promise<EmailTransportResult> {
  const apiKey = (process.env.RESEND_API_KEY || '').trim();
  const headers = buildUnsubscribeHeaders(message.listUnsubscribeUrl);

  const body: Record<string, unknown> = {
    from,
    to: [effectiveTo],
    reply_to: replyTo,
    subject: message.subject,
    html: message.html,
    text: message.text,
    ...(headers ? { headers } : {}),
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'content-type': 'application/json',
        ...(message.idempotencyKey ? { 'Idempotency-Key': message.idempotencyKey } : {}),
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

export async function sendAttendeeEmail(message: EmailMessage): Promise<EmailTransportResult> {
  const effectiveTo = resolveRecipient(message.to);
  const provider = emailTransportProvider();

  if (provider === 'dry_run') {
    return { outcome: 'dry_run', effectiveTo };
  }

  const from = (process.env.EMAIL_FROM || '').trim() || DEFAULT_FROM;
  const replyTo = (process.env.EMAIL_REPLY_TO || '').trim() || DEFAULT_REPLY_TO;

  if (provider === 'smtp') {
    return sendViaSmtp(message, effectiveTo, from, replyTo);
  }
  return sendViaResend(message, effectiveTo, from, replyTo);
}
