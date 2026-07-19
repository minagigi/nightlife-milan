import assert from 'node:assert/strict';
import test from 'node:test';
import { CONTACT } from '../config/contact';
import {
  buildUnsubscribeUrl,
  formatEventDateForLocale,
  renderAttendeeEmail,
  unsubscribeSignature,
} from '../lib/attendeeEmail';
import type { AttendeeEmailEventInfo, AttendeeEmailRecipient } from '../lib/attendeeEmailTypes';
import { getEventbriteConfirmationPlainText } from '../lib/eventbriteConfirmation';

// Esegue fn con CRON_SECRET impostato, ripristinando il valore precedente
// nel finally (unsubscribeSignature/buildUnsubscribeUrl/renderAttendeeEmail
// richiedono un secret in process.env).
function withCronSecret<T>(fn: () => T): T {
  const previous = process.env.CRON_SECRET;
  process.env.CRON_SECRET = 'test-cron-secret';
  try {
    return fn();
  } finally {
    if (previous === undefined) delete process.env.CRON_SECRET;
    else process.env.CRON_SECRET = previous;
  }
}

const baseEvent: Omit<AttendeeEmailEventInfo, 'locale' | 'affiliateUrls'> = {
  eventbriteEventId: '237143',
  eventName: 'Aria Club Saturday Night',
  eventStartUtc: '2026-07-25T22:00:00.000Z',
  venueName: 'Aria Club',
};

const baseRecipient: AttendeeEmailRecipient = {
  attendeeId: 'attendee-1',
  orderId: 'order-1',
  contactId: 'contact-abc123',
  email: 'mario.rossi@example.com',
  firstName: 'Mario',
  lastName: 'Rossi',
  name: 'Mario Rossi',
  ticketClassName: 'Guest List',
  guests: 3,
  registeredAtUtc: '2026-07-18T14:30:00.000Z',
};

test('renderAttendeeEmail: it with 2 affiliate URLs resolves placeholders and includes CTAs', () => {
  const event: AttendeeEmailEventInfo = {
    ...baseEvent,
    locale: 'it',
    affiliateUrls: [
      'https://xceed.me/it/milano/event/aria-saturday/111111/channel/nightlifemilan-1',
      'https://xceed.me/it/milano/event/aria-saturday-vip/222222/channel/nightlifemilan-1',
    ],
  };

  const rendered = withCronSecret(() => renderAttendeeEmail(event, baseRecipient));

  assert.ok(rendered.html.includes(event.affiliateUrls[0]));
  assert.ok(rendered.html.includes(event.affiliateUrls[1]));
  assert.ok(rendered.html.includes(CONTACT.whatsapp.number));
  assert.ok(rendered.html.includes('t='), 'unsubscribe link should carry the signature param');
  assert.ok(rendered.unsubscribeUrl.includes('t='));
  assert.ok(rendered.subject.includes(event.eventName));

  for (const placeholder of ['{event}', '{name}', '{phone}']) {
    assert.ok(!rendered.html.includes(placeholder), `html still contains literal ${placeholder}`);
    assert.ok(!rendered.text.includes(placeholder), `text still contains literal ${placeholder}`);
  }
});

test('renderAttendeeEmail: transactional summary carries full name and per-user data', () => {
  const event: AttendeeEmailEventInfo = {
    ...baseEvent,
    locale: 'it',
    affiliateUrls: ['https://xceed.me/it/milano/event/aria-saturday/111111/channel/nightlifemilan-1'],
  };

  const rendered = withCronSecret(() => renderAttendeeEmail(event, baseRecipient));

  assert.ok(rendered.html.includes('Mario Rossi'), 'greeting must contain first AND last name');
  assert.ok(rendered.html.includes('#order-1'), 'order number row');
  assert.ok(rendered.html.includes('Guest List'), 'ticket class row');
  assert.ok(rendered.html.includes('Ordine'), 'localized order label (it)');
  assert.ok(rendered.html.includes('Registrato il'), 'localized registered-on label (it)');
  assert.ok(rendered.html.includes('background-color:#ffffff'), 'transactional white background');
  assert.ok(!rendered.html.includes('#C9A86A'), 'no decorative gold in transactional layout');
  for (const line of ['Mario Rossi', '#order-1', 'Guest List']) {
    assert.ok(rendered.text.includes(line), `text version misses ${line}`);
  }
});

test('renderAttendeeEmail: greeting falls back to profile name, then to greetingNoName', () => {
  const event: AttendeeEmailEventInfo = { ...baseEvent, locale: 'en', affiliateUrls: [] };

  const withProfileName = withCronSecret(() => renderAttendeeEmail(event, {
    ...baseRecipient,
    firstName: null,
    lastName: null,
    name: 'Ludwig Van',
  }));
  assert.ok(withProfileName.html.includes('Ludwig Van'));

  const anonymous = withCronSecret(() => renderAttendeeEmail(event, {
    ...baseRecipient,
    firstName: null,
    lastName: null,
    name: null,
  }));
  assert.ok(!anonymous.html.includes('{name}'));
});

test('renderAttendeeEmail: en without affiliate URLs drops the purchase CTA and gold button but keeps WhatsApp', () => {
  const event: AttendeeEmailEventInfo = { ...baseEvent, locale: 'en', affiliateUrls: [] };
  const conf = getEventbriteConfirmationPlainText('en');

  const rendered = withCronSecret(() => renderAttendeeEmail(event, baseRecipient));

  assert.ok(!rendered.html.includes(conf.purchase));
  assert.ok(!rendered.html.includes('background-color:#C9A86A'), 'no gold button without affiliate links');
  assert.ok(rendered.html.includes(CONTACT.whatsapp.number), 'WhatsApp block stays present');
  assert.ok(!rendered.html.includes('{phone}'));
});

test('renderAttendeeEmail: ar sets dir="rtl" on the main container', () => {
  const event: AttendeeEmailEventInfo = { ...baseEvent, locale: 'ar', affiliateUrls: [] };

  const rendered = withCronSecret(() => renderAttendeeEmail(event, baseRecipient));

  assert.ok(rendered.html.includes('dir="rtl"'));
});

test('formatEventDateForLocale: localizes month/digits per locale, null on missing or invalid input', () => {
  const iso = '2026-07-25T22:00:00.000Z';

  const it = formatEventDateForLocale(iso, 'it');
  assert.ok(it);
  assert.ok(it!.includes('2026'));
  assert.ok(!it!.includes('July'));

  const ar = formatEventDateForLocale(iso, 'ar');
  assert.ok(ar);
  assert.ok(!/[٠-٩]/.test(ar!), 'arabic-indic digits should not appear (nu-latn override)');

  assert.equal(formatEventDateForLocale(null, 'en'), null);
  assert.equal(formatEventDateForLocale('not-a-date', 'en'), null);
});

test('unsubscribeSignature is deterministic per contactId; buildUnsubscribeUrl carries c/l/t', () => {
  withCronSecret(() => {
    const sigA1 = unsubscribeSignature('contact-a');
    const sigA2 = unsubscribeSignature('contact-a');
    const sigB = unsubscribeSignature('contact-b');
    assert.equal(sigA1, sigA2);
    assert.notEqual(sigA1, sigB);

    const url = buildUnsubscribeUrl('contact-a', 'it');
    assert.ok(url.includes('c=contact-a'));
    assert.ok(url.includes('l=it'));
    assert.ok(url.includes('t='));
  });
});
