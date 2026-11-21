import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { ALL_35_LOCALES } from '../lib/i18n/localizedSlugs35';
import { V01_SITE_COPY_35, getV01SiteCopy } from '../lib/i18n/v01SiteCopy35';
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

test('Static invariants: Checkout UX clarity, Bug A resume guard, and V01 Couture Noir Parity', () => {
  const checkoutView = fs.readFileSync(
    path.join(REPO_ROOT, 'components/single-pass/SinglePassCheckoutView.tsx'),
    'utf8',
  );
  assert.ok(checkoutView.includes('noValidate'));
  assert.ok(checkoutView.includes('role="alert"'));
  assert.ok(checkoutView.includes('aria-invalid'));
  assert.ok(checkoutView.includes('resumeOrderId && !paymentSession'));
  assert.equal(checkoutView.includes("useState('+39 ')"), false);
  assert.equal(checkoutView.includes('useState("+39 ")'), false);

  const siteShell = fs.readFileSync(path.join(REPO_ROOT, 'components/SiteShell.tsx'), 'utf8');
  assert.ok(siteShell.includes('Bodoni_Moda'));
  assert.ok(siteShell.includes('Plus_Jakarta_Sans'));
  assert.ok(siteShell.includes('JetBrains_Mono'));
  assert.equal(siteShell.includes('Big_Shoulders'), false);
  assert.equal(siteShell.includes('Figtree'), false);
  assert.equal(siteShell.includes('CustomCursor'), false);
  assert.equal(siteShell.includes('TasteMotionEngine'), false);

  const globalsCss = fs.readFileSync(path.join(REPO_ROOT, 'app/globals.css'), 'utf8');
  assert.ok(globalsCss.includes('#050505'));
  assert.ok(globalsCss.includes('#F6F1E7'));
  assert.ok(globalsCss.includes('var(--font-bodoni)'));
  assert.equal(globalsCss.includes('Big Shoulders'), false);
  assert.equal(globalsCss.includes('Figtree'), false);
  assert.equal(globalsCss.includes('cursor: none'), false);

  const homePage = fs.readFileSync(path.join(REPO_ROOT, 'app/[locale]/page.tsx'), 'utf8');
  const carousels = fs.readFileSync(path.join(REPO_ROOT, 'components/V01HomeCarousels.tsx'), 'utf8');
  const concierge = fs.readFileSync(path.join(REPO_ROOT, 'components/TableConcierge.tsx'), 'utf8');
  const editorial = fs.readFileSync(path.join(REPO_ROOT, 'components/EditorialPageSections.tsx'), 'utf8');
  const v01CopySrc = fs.readFileSync(path.join(REPO_ROOT, 'lib/i18n/v01SiteCopy35.ts'), 'utf8');
  assert.ok(carousels.includes('id="capodanno"') || carousels.includes('id={id}'));
  assert.ok(carousels.includes('id="stasera"'));
  assert.ok(carousels.includes('id="settimana"'));
  assert.ok(carousels.includes('id="locali-partner"'));

  const cialdiniBundle = `${homePage}\n${carousels}\n${concierge}\n${editorial}\n${v01CopySrc}`;
  for (const principle of [
    'presuasion',
    'commitment',
    'authority',
    'social-proof',
    'scarcity',
    'unity',
    'liking',
    'reciprocity',
  ]) {
    assert.ok(cialdiniBundle.includes(principle), `Missing Cialdini principle marker: ${principle}`);
  }

  assert.equal(Object.keys(V01_SITE_COPY_35).length, 35);
  for (const locale of ALL_35_LOCALES) {
    const v01 = getV01SiteCopy(locale);
    assert.ok(v01.statusLive.trim().length > 0, `Empty statusLive for ${locale}`);
    assert.equal(/[!\u00a1\uff01\u2014]/.test(v01.statusStats), false, `Forbidden punctuation in ${locale}.statusStats`);
    if (locale !== 'en') {
      assert.notEqual(v01.statusStats, V01_SITE_COPY_35.en.statusStats, `English fallback leaked in ${locale}.statusStats`);
    }
  }
});

function walkTsxFiles(dir: string, acc: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkTsxFiles(full, acc);
    } else if (entry.name.endsWith('.tsx')) {
      acc.push(full);
    }
  }
  return acc;
}

test('Static invariants: Zero tel: call buttons/links across all app & components', () => {
  const tsxFiles = [
    ...walkTsxFiles(path.join(REPO_ROOT, 'app')),
    ...walkTsxFiles(path.join(REPO_ROOT, 'components')),
  ];
  const violations: string[] = [];
  for (const file of tsxFiles) {
    const rel = path.relative(REPO_ROOT, file);
    const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
    lines.forEach((line, idx) => {
      if (/href\s*=\s*(?:"tel:|'tel:|\{\s*['"`]tel:)/i.test(line)) {
        violations.push(`${rel}:${idx + 1}: ${line.trim()}`);
      }
    });
  }
  assert.deepEqual(violations, [], `Found forbidden tel: call links:\n${violations.join('\n')}`);
});

test('Static invariants: Zero invisible or broken-contrast button/link classes', () => {
  const tsxFiles = [
    ...walkTsxFiles(path.join(REPO_ROOT, 'app')),
    ...walkTsxFiles(path.join(REPO_ROOT, 'components')),
  ];
  const darkBgRe = /(?:^|\s)bg-(?:\[#(?:0[0-9a-fA-F]{5}|1[0-9a-fA-F]{5})\]|black)(?=$|\s)/;
  const darkTxtRe = /(?:^|\s)text-(?:\[#(?:0[0-9a-fA-F]{5}|1[0-9a-fA-F]{5})\]|black)(?=$|\s)/;
  const anyBgRe = /(?:^|\s)bg-/;
  const lightBorderRe = /(?:^|\s)border-(?:\[#EAE3D5\]|white|champagne)(?:\/\d+)?(?=$|\s)/;
  const hoverDarkBgRe = /(?:^|\s)hover:bg-(?:\[#(?:0[0-9a-fA-F]{5}|1[0-9a-fA-F]{5})\]|black)(?=$|\s)/;
  const hoverDarkTxtRe = /(?:^|\s)hover:text-(?:\[#(?:0[0-9a-fA-F]{5}|1[0-9a-fA-F]{5})\]|black)(?=$|\s)/;
  const waGreenSolidRe = /(?:^|\s)(?:hover:)?bg-\[#25D366\](?=$|\s)/;
  const lightTxtRe = /(?:^|\s)(?:hover:)?text-(?:white|\[#[fF]{6}\])(?=$|\s)/;

  const violations: string[] = [];
  for (const file of tsxFiles) {
    const rel = path.relative(REPO_ROOT, file);
    const src = fs.readFileSync(file, 'utf8');
    const re = /className="([^"]+)"/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(src)) !== null) {
      const cls = m[1];
      const lineNo = src.slice(0, m.index).split('\n').length;
      if (darkBgRe.test(cls) && darkTxtRe.test(cls)) {
        violations.push(`${rel}:${lineNo}: dark-on-dark (${cls})`);
      }
      if (hoverDarkBgRe.test(cls) && hoverDarkTxtRe.test(cls)) {
        violations.push(`${rel}:${lineNo}: hover dark-on-dark (${cls})`);
      }
      if (waGreenSolidRe.test(cls) && lightTxtRe.test(cls)) {
        violations.push(`${rel}:${lineNo}: white text on #25D366 (${cls})`);
      }
      if (darkTxtRe.test(cls) && !anyBgRe.test(cls) && lightBorderRe.test(cls)) {
        violations.push(`${rel}:${lineNo}: dark text on light-bordered dark button without bg (${cls})`);
      }
    }
  }
  assert.deepEqual(violations, [], `Found contrast defects:\n${violations.join('\n')}`);
});
