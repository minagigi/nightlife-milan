import { NextResponse } from 'next/server';
import { renderAttendeeEmail } from '@/lib/attendeeEmail';
import { resolveEventInfo, secureCompare, type RawAttendee } from '@/lib/attendeeEmailDispatch';
import type { AttendeeEmailEventInfo, AttendeeEmailRecipient } from '@/lib/attendeeEmailTypes';
import { getEventbriteToken } from '@/lib/eventbriteToken';
import { isEnabledLocale, type LocaleCode } from '@/lib/i18n/locales';

export const runtime = 'nodejs';
export const maxDuration = 60;
export const dynamic = 'force-dynamic';

const EVENTBRITE_API = 'https://www.eventbriteapi.com/v3';

/** Stessa auth di /api/crm/email-dispatch. */
function isAuthorized(request: Request, searchParams: URLSearchParams): boolean {
  const authHeader = request.headers.get('authorization');
  const okCron = process.env.CRON_SECRET && authHeader === `Bearer ${process.env.CRON_SECRET}`;
  const okSecret = process.env.INDEXING_SECRET && searchParams.get('secret') === process.env.INDEXING_SECRET;
  const kParam = searchParams.get('k');
  const kSecret = process.env.EMAIL_WEBHOOK_SECRET || process.env.CRON_SECRET || '';
  const okK = Boolean(kParam && kSecret && secureCompare(kParam, kSecret));
  return Boolean(okCron || okSecret || okK);
}

function sampleEventInfo(locale: LocaleCode, withXceed: boolean): AttendeeEmailEventInfo {
  return {
    eventbriteEventId: '900000001',
    eventName: 'Saturday Night — Just Me Milano',
    eventStartUtc: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    venueName: 'Just Me Milano',
    locale,
    affiliateUrls: withXceed ? ['https://xceed.me/en/milano/event/sample-party--900001/channel/nightlifemilan-1'] : [],
  };
}

const SAMPLE_RECIPIENT: AttendeeEmailRecipient = {
  attendeeId: 'preview',
  orderId: '1234567890',
  contactId: 'preview-contact',
  email: 'preview@example.com',
  firstName: 'Alex',
  lastName: 'Bianchi',
  name: 'Alex Bianchi',
  ticketClassName: 'Guest List',
  guests: 2,
  registeredAtUtc: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
};

/**
 * Replica in loco le due GET di dispatchForOrderApiUrl (senza inviare, senza
 * ledger, senza toccare il CRM): contactId sempre sintetico 'preview-contact'
 * per evitare che un link di anteprima produca un link di unsubscribe valido
 * per un contatto reale.
 */
async function loadOrderPreview(orderParam: string, indexParam: string | null): Promise<
  { ok: true; event: AttendeeEmailEventInfo | null; recipient: AttendeeEmailRecipient }
  | { ok: false; status: number; error: string }
> {
  const token = getEventbriteToken();
  if (!token) return { ok: false, status: 500, error: 'EVENTBRITE_TOKEN not set' };

  const orderRes = await fetch(`${EVENTBRITE_API}/orders/${orderParam}/?expand=attendees`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!orderRes.ok) return { ok: false, status: 502, error: `Eventbrite order fetch failed: HTTP ${orderRes.status}` };
  const order = await orderRes.json();

  const attendees: RawAttendee[] = order.attendees || [];
  const index = indexParam && /^\d+$/.test(indexParam) ? parseInt(indexParam, 10) : null;
  const chosen = index !== null ? attendees[index] : attendees.find((a) => a.profile?.email);
  if (!chosen) return { ok: false, status: 404, error: 'No matching attendee found' };

  const eventId: string | undefined = order.event_id;
  if (!eventId) return { ok: false, status: 502, error: 'Eventbrite order response is missing event_id' };

  const eventRes = await fetch(`${EVENTBRITE_API}/events/${eventId}/?expand=venue`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!eventRes.ok) return { ok: false, status: 502, error: `Eventbrite event fetch failed: HTTP ${eventRes.status}` };
  const rawEvent = await eventRes.json();

  const event = resolveEventInfo(rawEvent, null);
  const sameEmail = chosen.profile?.email
    ? attendees.filter((a) => a.profile?.email?.trim().toLowerCase() === chosen.profile?.email?.trim().toLowerCase()).length
    : 1;
  const recipient: AttendeeEmailRecipient = {
    attendeeId: chosen.id,
    orderId: chosen.order_id || orderParam,
    contactId: 'preview-contact',
    email: chosen.profile?.email?.trim() || 'preview@example.com',
    firstName: chosen.profile?.first_name?.trim() || null,
    lastName: chosen.profile?.last_name?.trim() || null,
    name: chosen.profile?.name?.trim() || null,
    ticketClassName: chosen.ticket_class_name?.trim() || null,
    guests: Math.max(1, sameEmail, Number(chosen.quantity) || 1),
    registeredAtUtc: chosen.created || null,
  };

  return { ok: true, event, recipient };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  if (!isAuthorized(request, searchParams)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const orderParam = searchParams.get('order');
    let event: AttendeeEmailEventInfo | null;
    let recipient: AttendeeEmailRecipient;

    if (orderParam && /^\d+$/.test(orderParam)) {
      const result = await loadOrderPreview(orderParam, searchParams.get('index'));
      if (!result.ok) return NextResponse.json({ ok: false, error: result.error }, { status: result.status });
      event = result.event;
      recipient = result.recipient;
    } else {
      const localeParam = searchParams.get('locale') || '';
      const locale: LocaleCode = isEnabledLocale(localeParam) ? localeParam : 'en';
      const withXceed = searchParams.get('noxceed') !== '1';
      event = sampleEventInfo(locale, withXceed);
      recipient = SAMPLE_RECIPIENT;
    }

    if (!event) return NextResponse.json({ ok: false, error: 'Event data not resolvable' }, { status: 404 });

    const rendered = renderAttendeeEmail(event, recipient);

    if (searchParams.get('format') === 'json') {
      return NextResponse.json(
        { subject: rendered.subject, text: rendered.text, html: rendered.html, unsubscribeUrl: rendered.unsubscribeUrl },
        { headers: { 'Cache-Control': 'private, no-store' } },
      );
    }

    return new Response(rendered.html, {
      status: 200,
      headers: { 'content-type': 'text/html; charset=utf-8', 'Cache-Control': 'private, no-store' },
    });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}
