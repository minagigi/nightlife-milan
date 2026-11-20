import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { ALL_35_LOCALES } from '../lib/i18n/localizedSlugs35';
import { CHECKOUT_UX_COPY_35, getCheckoutUxCopy } from '../lib/single-pass/checkoutUx35';
import { clearMemoryStoreForTests, getOrderById } from '../lib/single-pass/store';
import { POST as checkoutPost } from '../app/api/single-pass/checkout/route';

const REPO_ROOT = path.resolve(__dirname, '..');

test('POST /api/single-pass/checkout collects all failing fields in DOM order without flagging optional dietaryNotes', async () => {
  const prevToken = process.env.BLOB_READ_WRITE_TOKEN;
  const prevStripeKey = process.env.STRIPE_SECRET_KEY;
  delete process.env.BLOB_READ_WRITE_TOKEN;
  process.env.STRIPE_SECRET_KEY = 'sk_test_unit_checkout_ux_000000';
  clearMemoryStoreForTests();

  try {
    const req = new Request('https://nightlifemilan.com/api/single-pass/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        origin: 'https://nightlifemilan.com',
      },
      body: JSON.stringify({
        locale: 'it',
        currency: 'EUR',
        items: [{ skuId: 'terrazza21-f1-brindisi', quantity: 1 }],
        fullName: 'A',
        email: 'bad',
        whatsapp: '123',
        age: 16,
        country: '',
        dietaryNotes: '',
        acceptedTerms: false,
      }),
    });

    const res = await checkoutPost(req);
    assert.equal(res.status, 400);
    const json = (await res.json()) as {
      ok?: boolean;
      code?: string;
      details?: {
        field?: string;
        fieldErrors?: Record<string, string>;
      };
    };

    assert.equal(json.ok, false);
    assert.equal(json.details?.field, 'fullName');
    assert.equal(json.details?.fieldErrors?.fullName, 'INVALID_FULL_NAME');
    assert.equal(json.details?.fieldErrors?.age, 'UNDER_18');
    assert.equal(json.details?.fieldErrors?.country, 'INVALID_COUNTRY');
    assert.equal(json.details?.fieldErrors?.whatsapp, 'INVALID_WHATSAPP');
    assert.equal(json.details?.fieldErrors?.email, 'INVALID_EMAIL');
    assert.equal(json.details?.fieldErrors?.acceptedTerms, 'TERMS_REQUIRED');
    assert.equal(Object.prototype.hasOwnProperty.call(json.details?.fieldErrors || {}, 'dietaryNotes'), false);
  } finally {
    clearMemoryStoreForTests();
    if (prevToken !== undefined) process.env.BLOB_READ_WRITE_TOKEN = prevToken;
    else delete process.env.BLOB_READ_WRITE_TOKEN;
    if (prevStripeKey !== undefined) process.env.STRIPE_SECRET_KEY = prevStripeKey;
    else delete process.env.STRIPE_SECRET_KEY;
  }
});

test('POST /api/single-pass/checkout accepts Terrazza Duomo 21 with empty optional dietaryNotes', async () => {
  const prevToken = process.env.BLOB_READ_WRITE_TOKEN;
  const prevStripeKey = process.env.STRIPE_SECRET_KEY;
  const origFetch = globalThis.fetch;
  delete process.env.BLOB_READ_WRITE_TOKEN;
  process.env.STRIPE_SECRET_KEY = 'sk_test_unit_checkout_ux_terrazza_000000';
  clearMemoryStoreForTests();

  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const url = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;
    if (url.includes('/v1/payment_intents')) {
      return new Response(
        JSON.stringify({
          id: 'pi_test_ux_optional_notes_1',
          client_secret: 'pi_test_ux_optional_notes_1_secret_ok',
          status: 'requires_payment_method',
          amount: 115200,
          currency: 'eur',
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      );
    }
    return new Response(JSON.stringify({ rates: { EUR: 1 } }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }) as typeof fetch;

  try {
    const req = new Request('https://nightlifemilan.com/api/single-pass/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        origin: 'https://nightlifemilan.com',
      },
      body: JSON.stringify({
        locale: 'it',
        currency: 'EUR',
        items: [
          { skuId: 'terrazza21-f1-terrace-table', quantity: 1 },
          { skuId: 'terrazza21-f1-brindisi', quantity: 4 },
        ],
        fullName: 'Marco Rossi',
        email: 'marco.optional.notes@example.com',
        whatsapp: '+39 340 1112233',
        age: 32,
        country: 'Italia',
        dietaryNotes: '',
        acceptedTerms: true,
      }),
    });

    const res = await checkoutPost(req);
    assert.equal(res.status, 200);
    const json = (await res.json()) as { ok?: boolean; orderId?: string };
    assert.equal(json.ok, true);
    assert.ok(json.orderId);
    const saved = await getOrderById(json.orderId);
    assert.ok(saved);
    assert.equal(saved.customer.dietaryNotes, undefined);
  } finally {
    globalThis.fetch = origFetch;
    clearMemoryStoreForTests();
    if (prevToken !== undefined) process.env.BLOB_READ_WRITE_TOKEN = prevToken;
    else delete process.env.BLOB_READ_WRITE_TOKEN;
    if (prevStripeKey !== undefined) process.env.STRIPE_SECRET_KEY = prevStripeKey;
    else delete process.env.STRIPE_SECRET_KEY;
  }
});

test('CHECKOUT_UX_COPY_35 covers all 35 locales with zero forbidden strings or AI slop', () => {
  assert.equal(Object.keys(CHECKOUT_UX_COPY_35).length, 35);

  const checkString = (loc: string, key: string, value: string) => {
    assert.ok(value.trim().length > 0, `${loc}.${key} is empty`);
    assert.equal(/[!\u00a1\uff01\u2014]/.test(value), false, `${loc}.${key} contains ! or em-dash: ${value}`);
    assert.equal(
      /\bstripe\b|wyoming|cheyenne|fbra|magister|447\s*broadway|luigi\s*minaudo/i.test(value),
      false,
      `${loc}.${key} contains forbidden token: ${value}`,
    );
  };

  for (const locale of ALL_35_LOCALES) {
    const copy = getCheckoutUxCopy(locale);
    assert.ok(copy, `Missing CHECKOUT_UX_COPY_35 for ${locale}`);
    for (const [k, v] of Object.entries(copy)) {
      if (Array.isArray(v)) {
        assert.equal(v.length, 3, `${locale}.${k} must have 3 allergy chips`);
        v.forEach((chip, idx) => checkString(locale, `${k}[${idx}]`, chip));
      } else {
        checkString(locale, k, v);
      }
    }
  }
});

test('Static invariants: Checkout UX clarity & Axel S17 Design Parity tokens', () => {
  const checkoutView = fs.readFileSync(
    path.join(REPO_ROOT, 'components/single-pass/SinglePassCheckoutView.tsx'),
    'utf8',
  );
  assert.ok(checkoutView.includes('noValidate'));
  assert.ok(checkoutView.includes('role="alert"'));
  assert.ok(checkoutView.includes('aria-invalid'));
  assert.equal(checkoutView.includes("useState('+39 ')"), false);
  assert.equal(checkoutView.includes('useState("+39 ")'), false);

  const siteShell = fs.readFileSync(path.join(REPO_ROOT, 'components/SiteShell.tsx'), 'utf8');
  assert.ok(siteShell.includes('Big_Shoulders'));
  assert.ok(siteShell.includes('Figtree'));
  assert.ok(siteShell.includes('--font-big-shoulders'));

  const globalsCss = fs.readFileSync(path.join(REPO_ROOT, 'app/globals.css'), 'utf8');
  assert.match(globalsCss, /--color-white:\s*#FFFFFF;/);
  assert.ok(globalsCss.includes('var(--font-big-shoulders)'));
});
