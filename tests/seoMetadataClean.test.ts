import assert from 'node:assert/strict';
import test from 'node:test';
import { seoTitle, truncateSeoText, withWhatsApp } from '../lib/seoMetadata';

test('seoTitle never chops words mid-token or leaves dangling modifiers', () => {
  const vipIt = seoTitle('Tavoli VIP Discoteche Milano 2026/2027 | Prezzi Privé e Bottiglie | Nightlife Milan');
  assert.ok(vipIt.length <= 62, `vipIt too long: ${vipIt.length}`);
  assert.doesNotMatch(vipIt, /\bPriv$/i);
  assert.doesNotMatch(vipIt, /[^\p{L}\p{N})!?.]$/u);

  const homeEn = seoTitle('Milan Nightlife Guide 2026 | Luxury Clubs, VIP Tables, Guest Lists | Nightlife Milan');
  assert.ok(homeEn.length <= 62);
  assert.doesNotMatch(homeEn, /,\s*Guest$/i);

  const football = seoTitle('San Siro Football Match Afterparties Milan 2026: Best Clubs After Inter & AC Milan | Nightlife Milan');
  assert.ok(football.length <= 62);
  assert.doesNotMatch(football, /:\s*Best$/i);
  assert.doesNotMatch(football, /\bAC$/i);
});

test('withWhatsApp balances open parentheses, removes em-dash, and keeps clean sentence boundaries', () => {
  const privDesc = withWhatsApp(
    'Organize your graduation party, 18th/30th birthday, bachelorette or corporate event in Milan’s top clubs & rooftops (Just Me, Pineta, Aria, 55 Milano, Voya). Packages from €25/person.',
    'en',
  );
  assert.ok(privDesc.length <= 158, `privDesc len=${privDesc.length}: ${privDesc}`);
  assert.ok(!privDesc.includes('(Just'), `Unclosed parenthesis leaked: ${privDesc}`);
  assert.match(privDesc, /\+39 351 912 7047/);

  const footballDesc = withWhatsApp(
    'Where to go in Milan after Inter & AC Milan matches at San Siro? Walk 150m to Aria Club (M5 Lotto), Just Me (7/7), Voya Rooftop (M5 Portello), 55 Milano & Pineta.',
    'en',
  );
  assert.ok(footballDesc.length <= 158, `footballDesc len=${footballDesc.length}: ${footballDesc}`);
  assert.doesNotMatch(footballDesc, /& AC\./i);

  const concertDesc = withWhatsApp(
    'The ultimate 2026/2027 guide to Milan concert afterparties: walk 150m from San Siro & Ippodromo to 3. Aria Club, party 7/7 after Forum Assago & Fabrique shows.',
    'en',
  );
  assert.ok(concertDesc.length <= 158, `concertDesc len=${concertDesc.length}: ${concertDesc}`);
  assert.doesNotMatch(concertDesc, /to 3\./i);
  assert.doesNotMatch(concertDesc, /\bafter\. Book/i);

  const noEmDash = truncateSeoText('Nightlife Milan \u2014 Brera & Corso Como Luxury Clubs', 62);
  assert.ok(!noEmDash.includes('\u2014'));
});
