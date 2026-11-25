// Top-1 SEO Pillar Batch (2026-11-25): 2 Pillar Guides across all 35 locales.
// POTENZIA in-place: g-28 The Club Milano (Corso Garibaldi 97 · Brera / Moscova).
// NUOVA_GUIDA 35L: g-126 Philipp's Milano · The Plein Hotel (Philipp Plein · Via Daniele Manin 21).
import { localePrefix, type LocaleCode } from './i18n/localeRegistry';
import {
  ALL_35_LOCALES,
  EXISTING_14_GUIDE_SLUGS_35,
  getLocalizedGenreSlug35,
  getLocalizedVenueSlug35,
  getLocalizedZoneSlug35,
} from './i18n/localizedSlugs35';
import { getLocalizedDir35 } from './i18n/dirTokens35';
import { GUIDE_100_SLUGS_MAP } from './i18n/guideSlugs100Map';
import { CLUBBING_PILLAR_35 } from './i18n/pillarClubbing35';
import { GSC_BATCH_20261122_LEX } from './i18n/pillarGuides20261122';
import { TOP1_SEO_20261125_LEX } from './i18n/pillarGuidesTop1Seo20261125';
import { buildClosedVenuesHtml, buildPartner18MatrixHtml } from './guidesGscBatch20261124';
import { capodannoCategoryPath, capodannoEventPath, capodannoPath } from './capodanno/routes';
import { MusicGenre, type FAQ, type Guide, type GuideSection, type LocalizedString } from './types';

function createLazyLocalizedString(getter: (locale: LocaleCode) => string): LocalizedString {
  const obj = {} as LocalizedString;
  for (const loc of ALL_35_LOCALES) {
    Object.defineProperty(obj, loc, {
      enumerable: true,
      configurable: true,
      get() {
        return getter(loc);
      },
    });
  }
  return obj;
}

function sanitizeText(raw: string, locale?: LocaleCode): string {
  let base = (raw || '')
    .replace(/\u2014/g, '-')
    .replace(/\u2013/g, '-')
    .replace(/\u2605/g, '*')
    .replace(/[!\u00a1\uff01]/g, '.')
    .replace(/\+20%/g, '20 percent')
    .replace(/\bStripe\b/gi, 'Online Checkout')
    .replace(/Roberto Cavalli/gi, 'Just Cavalli')
    .replace(/Priv[eé] Cavalli/gi, 'VIP Lounge');
  if (locale === 'ro') {
    base = base
      .replace(/[şŞ]/g, (m) => (m === 'ş' ? 'ș' : 'Ș'))
      .replace(/[ţŢ]/g, (m) => (m === 'ţ' ? 'ț' : 'Ț'));
  }
  if (locale === 'it') {
    base = base
      .replace(/\bPrive\b/g, 'Privé')
      .replace(/\bprive\b/g, 'privé')
      .replace(/\bPrivè\b/g, 'Privé')
      .replace(/\bprivè\b/g, 'privé')
      .replace(/\bCitta\b/g, 'Città');
  }
  return base;
}

function escapeHtml(text: string, locale?: LocaleCode): string {
  return sanitizeText(text, locale)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function guideUrl(id: string, locale: LocaleCode): string {
  const map = GUIDE_100_SLUGS_MAP[id] || EXISTING_14_GUIDE_SLUGS_35[id];
  const slug = map?.[locale] || map?.en || id;
  return `${localePrefix(locale)}/${getLocalizedDir35('guides', locale)}/${slug}`;
}

function clubUrl(canonicalVenueSlug: string, locale: LocaleCode): string {
  return `${localePrefix(locale)}/${getLocalizedDir35('clubs', locale)}/${getLocalizedVenueSlug35(canonicalVenueSlug, locale)}`;
}

function zoneUrl(canonicalZoneSlug: string, locale: LocaleCode): string {
  return `${localePrefix(locale)}/${getLocalizedDir35('zones', locale)}/${getLocalizedZoneSlug35(canonicalZoneSlug, locale)}`;
}

function genreUrl(genreSlug: string, locale: LocaleCode): string {
  return `${localePrefix(locale)}/${getLocalizedDir35('genres', locale)}/${getLocalizedGenreSlug35(genreSlug, locale)}`;
}

function linkTag(href: string, label: string, locale?: LocaleCode): string {
  return `<a href="${escapeHtml(href, locale)}" class="underline decoration-current/55 underline-offset-4 hover:opacity-75 transition-opacity">${escapeHtml(label, locale)}</a>`;
}

interface RenderedGuide {
  title: string;
  excerpt: string;
  sections: Array<{ heading: string; content: string }>;
  faqs: Array<{ question: string; answer: string }>;
}

const TOP1_SEO_CACHE = new Map<string, RenderedGuide>();

export function getTop1Seo20261125DisplayHeadline(guideId: string, locale: LocaleCode): string | null {
  const lx = TOP1_SEO_20261125_LEX[locale] || TOP1_SEO_20261125_LEX.en;
  if (guideId === 'g-28') return sanitizeText(lx.tc_disp, locale);
  if (guideId === 'g-126') return sanitizeText(lx.ph_disp, locale);
  return null;
}

function makeTable(headers: string[], rows: string[][], locale: LocaleCode, rawLastCol = false): string {
  const ths = headers.map((h) => `<th>${escapeHtml(h, locale)}</th>`).join('');
  const trs = rows
    .map((r) => {
      const tds = r
        .map((cell, idx) => {
          if (rawLastCol && idx === r.length - 1) {
            return `<td class="whitespace-nowrap">${cell}</td>`;
          }
          const cls = idx === 0 ? ' class="font-semibold"' : idx === 3 ? ' class="font-semibold whitespace-nowrap"' : '';
          return `<td${cls}>${escapeHtml(cell, locale)}</td>`;
        })
        .join('');
      return `<tr>${tds}</tr>`;
    })
    .join('\n');
  return `<div class="taste-table-scroll"><table class="taste-data-table"><thead><tr>${ths}</tr></thead><tbody>\n${trs}\n</tbody></table></div>`;
}

function composeFaqs(
  firstQ: string,
  firstA: string,
  cpFaqs: [string, string][],
  locale: LocaleCode,
  extraPairs: Array<[string, string]> = [],
): Array<{ question: string; answer: string }> {
  const merged: Array<[string, string]> = [[firstQ, firstA], ...extraPairs, ...cpFaqs];
  return merged.slice(0, 6).map(([q, a]) => ({
    question: sanitizeText(q, locale),
    answer: sanitizeText(a, locale),
  }));
}

// ─── 1. g-28 (POTENZIA): THE CLUB MILANO · CORSO GARIBALDI 97 (BRERA / MOSCOVA) ─
function renderTheClubGuide(locale: LocaleCode): RenderedGuide {
  const ck = `g-28:${locale}`;
  const hit = TOP1_SEO_CACHE.get(ck);
  if (hit) return hit;

  const lx = TOP1_SEO_20261125_LEX[locale] || TOP1_SEO_20261125_LEX.en;
  const lx22 = GSC_BATCH_20261122_LEX[locale] || GSC_BATCH_20261122_LEX.en;
  const cp = CLUBBING_PILLAR_35[locale] || CLUBBING_PILLAR_35.en;
  const tl = cp.tableLabels;

  const tcClub = clubUrl('the-club-milano', locale);
  const tcNye = capodannoEventPath('capodanno-the-club-milano', locale);
  const pinClub = clubUrl('pineta-club-milano', locale);
  const pinNye = capodannoEventPath('capodanno-pineta-milano', locale);
  const mibClub = clubUrl('mib-milano', locale);
  const phClub = clubUrl('philipps-milano', locale);
  const phGuide = guideUrl('g-126', locale);
  const mibGuide = guideUrl('g-31', locale);
  const pinGuide = guideUrl('g-16', locale);
  const holNye = capodannoEventPath('capodanno-hollywood-milano', locale);
  const tocNye = capodannoEventPath('capodanno-tocqueville-13-milano', locale);
  const breraZone = zoneUrl('brera', locale);
  const comoZone = zoneUrl('corso-como', locale);

  const theClubScheduleTable = makeTable(
    [tl.thFormula, tl.thDistrict, tl.thNye2027, tl.thDressCode],
    [
      ['Wednesday · ONE TWO (Hip-Hop, R&B & Urban)', 'Corso Garibaldi 97 · 23:30 - 05:30 (M2 Moscova)', '15 EUR Woman / 25 EUR Man (1 Drink)', tl.dressSmartChic],
      ['Thursday · ATLANTA (US Trap, Hip-Hop & Reggaeton)', 'Corso Garibaldi 97 · 23:30 - 05:30', '15 EUR Woman / 25 EUR Man · VIP 400 EUR', tl.dressSmartChic],
      ['Friday · FIRST CLASS (House & International Hits)', 'Corso Garibaldi 97 · 23:30 - 05:30', '15 EUR Woman / 25 EUR Man · VIP 400-600 EUR', tl.dressEveningElegance],
      ['Saturday · GIRLS REPUBLIC (Flagship International)', 'Corso Garibaldi 97 · 23:30 - 05:30', '15 EUR Woman / 25 EUR Man · VIP 400-600 EUR', tl.dressEveningElegance],
      ['Sunday · SUPERBE (Hip-Hop, R&B & Afrobeats)', 'Corso Garibaldi 97 · 23:30 - 05:30', '15 EUR Woman / 25 EUR Man · VIP 400 EUR', tl.dressSmartChic],
      ['Mon 07/12/2026 · Sant’Ambrogio Special Opening Night', 'Pre-Holiday Gala Party · 23:30 - 05:30', 'Dancefloor 400 · Consolle 440 · VIP 600 EUR', tl.dressEveningElegance],
      [`31/12/2026 · The Club Milano (${lx.nye})`, 'Brera / Moscova Midnight Countdown', tl.theClubRates, tl.dressBlackTie],
    ],
    locale,
  );

  const garibaldiBenchmarkTable = makeTable(
    [tl.thVenue, tl.thDistrict, tl.thWeeklyRef, tl.thNye2027, tl.thStatus],
    [
      ['The Club Milano', 'Corso Garibaldi 97 (M2 Moscova 150 m)', '15-25 EUR · VIP 400 / 440 / 600 EUR', tl.theClubRates, linkTag(tcNye, tl.statusConfirmed, locale)],
      ["Philipp's Milano (The Plein Hotel)", 'Via Daniele Manin 21 (Porta Nuova)', "Chef Roberto Conti + The Philipp's Show", 'Upon Request · Couture VIP', linkTag(phGuide, tl.statusConfirmed, locale)],
      ['Pineta Milano (Moulin Rouge)', 'Via Messina 38 (M5 Cenisio 180 m)', '20-25 EUR · VIP 320-800 EUR', '40 / 40 / 160 EUR · VIP 300-1.500 EUR', linkTag(pinNye, tl.statusConfirmed, locale)],
      ['MIB Milano (Piazza Affari)', 'Via Gaetano Negri 10 (Duomo / Cordusio)', 'Billions & Love Affair 50 EUR · VIP 250+', 'Atlanta 06/12 & OneTwo 07/12 (15 EUR)', linkTag(mibGuide, tl.statusConfirmed, locale)],
      ['Tocqueville 13 Milano', 'Via Alessio di Tocqueville 13', '20-30 EUR · Dinner Show & Club', tl.tocquevilleRates, linkTag(tocNye, tl.statusBenchmark, locale)],
      ['Hollywood Milano', 'Corso Como 15 (Porta Garibaldi)', '20-30 EUR · International Club', tl.hollywoodRates, linkTag(holNye, tl.statusBenchmark, locale)],
    ],
    locale,
    true,
  );

  const s1 = `<h3>The Club ${escapeHtml(lx.city, locale)} · Corso Garibaldi 97 (Brera / Moscova)</h3>
<p>${escapeHtml(lx.tc_lead, locale)}</p>
<p>${escapeHtml(lx.tc_deep, locale)}</p>
<h3>${escapeHtml(cp.h3[0], locale)}</h3>
${theClubScheduleTable}
<h3>${escapeHtml(cp.h3[1], locale)}</h3>
<p>${linkTag(tcClub, `The Club ${lx.city}`, locale)} · ${linkTag(tcNye, `The Club ${lx.nye}`, locale)} · ${linkTag(phClub, "Philipp's Milano", locale)} · ${linkTag(mibClub, 'MIB Milano', locale)} · ${linkTag(pinClub, 'Pineta Milano', locale)} · ${linkTag(breraZone, 'Brera & Moscova', locale)} · ${linkTag(comoZone, 'Corso Como', locale)}.</p>`;

  const s2 = `<h3>Brera, Moscova &amp; Corso Como Nightlife Corridor</h3>
<p>${escapeHtml(cp.intro[0], locale)} ${escapeHtml(cp.intro[1], locale)} ${escapeHtml(cp.sempioneBreraComo.pinetaClubLead, locale)}</p>
<h3>${escapeHtml(cp.h3[4], locale)}</h3>
${garibaldiBenchmarkTable}
<h3>${escapeHtml(cp.h3[5], locale)}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.sempioneBreraComo.bullets.map((b) => `<li>${escapeHtml(b, locale)}</li>`).join('\n')}
</ul>`;

  const s3 = `<h3>${escapeHtml(cp.h3[3], locale)}</h3>
<p>${escapeHtml(cp.sempioneBreraComo.justMeLead, locale)} ${escapeHtml(cp.sempioneBreraComo.corsoComoLead, locale)}</p>
<h3>${escapeHtml(cp.h3[6], locale)}</h3>
<p>${escapeHtml(cp.gattopardoCitylife.gattopardoDetail, locale)} ${escapeHtml(cp.gattopardoCitylife.voyaDetail, locale)}</p>
<h3>${escapeHtml(cp.h3[7], locale)}</h3>
<p>${escapeHtml(lx22.winter_rep || cp.gattopardoCitylife.fiftyFiveRepvblicDetail, locale)}</p>`;

  const s4 = `<h3>${escapeHtml(cp.h3[9], locale)}</h3>
<p>${escapeHtml(cp.reggaetonNavigliSanSiro.gateAriaDetail, locale)} ${escapeHtml(cp.reggaetonNavigliSanSiro.navigliEastDetail, locale)}</p>
<h3>${escapeHtml(cp.h3[11], locale)}</h3>
<p>${escapeHtml(cp.reggaetonNavigliSanSiro.gardaTomDetail, locale)}</p>
<h3>${escapeHtml(cp.h3[2], locale)}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.reggaetonNavigliSanSiro.bullets.map((b) => `<li>${escapeHtml(b, locale)}</li>`).join('\n')}
</ul>
<p>${linkTag(genreUrl('hip-hop', locale), 'Hip-Hop, Trap & R&B', locale)} · ${linkTag(genreUrl('house', locale), 'House & International Hits', locale)} · ${linkTag(genreUrl('reggaeton', locale), 'Reggaeton & Urban', locale)} · ${linkTag(pinGuide, 'Pineta Guide', locale)}.</p>`;

  const s5 = `<h3>${escapeHtml(cp.h3[12], locale)}</h3>
<p>${escapeHtml(cp.doorPolicyAndClosed.dressCodeDetail, locale)}</p>
<h3>${escapeHtml(cp.h3[13], locale)}</h3>
<p>${escapeHtml(cp.doorPolicyAndClosed.allMaleBottleDetail, locale)}</p>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.doorPolicyAndClosed.checklist.map((c) => `<li>${escapeHtml(c, locale)}</li>`).join('\n')}
</ul>
<h3>${escapeHtml(cp.h3[14], locale)}</h3>
<p>${escapeHtml(cp.doorPolicyAndClosed.closedAlertDetail, locale)}</p>
${sanitizeText(buildClosedVenuesHtml(locale), locale)}`;

  const s6 = `<h3>${escapeHtml(cp.h3[15], locale)}</h3>
<p>${escapeHtml(cp.conciergeAndTransit.conciergeDetail, locale)}</p>
<ol class="list-decimal pl-6 space-y-2 my-4">
${cp.conciergeAndTransit.steps.map((st) => `<li>${escapeHtml(st, locale)}</li>`).join('\n')}
</ol>
<h3>${escapeHtml(cp.h3[16], locale)}</h3>
<p>${escapeHtml(cp.conciergeAndTransit.metroParkingDetail, locale)}</p>
<h3>${escapeHtml(cp.h3[17], locale)}</h3>
<p>${escapeHtml(cp.conciergeAndTransit.termeCrossLink, locale)} ${escapeHtml(cp.overview.tableLead, locale)}</p>
${sanitizeText(buildPartner18MatrixHtml(locale), locale)}
<p>${linkTag(tcClub, `The Club ${lx.city}`, locale)} · ${linkTag(capodannoPath(locale), cp.conciergeAndTransit.nyeHubCta, locale)} · <a href="https://wa.me/393519127047" class="underline decoration-current/55 underline-offset-4">${escapeHtml(cp.conciergeAndTransit.whatsappCta, locale)}</a> | <a href="mailto:concierge@nightlifemilan.com" class="underline decoration-current/55 underline-offset-4">concierge@nightlifemilan.com</a>.</p>`;

  const out: RenderedGuide = {
    title: sanitizeText(lx.tc_title, locale),
    excerpt: sanitizeText(lx.tc_exc, locale),
    sections: [
      { heading: sanitizeText(`1. The Club ${lx.city} · Corso Garibaldi 97 (Brera / Moscova)`, locale), content: s1 },
      { heading: sanitizeText(cp.h2[1], locale), content: s2 },
      { heading: sanitizeText(cp.h2[2], locale), content: s3 },
      { heading: sanitizeText(cp.h2[3], locale), content: s4 },
      { heading: sanitizeText(cp.h2[4], locale), content: s5 },
      { heading: sanitizeText(cp.h2[5], locale), content: s6 },
    ],
    faqs: composeFaqs(lx.tc_faq_q, lx.tc_faq_a, cp.faqs, locale),
  };
  TOP1_SEO_CACHE.set(ck, out);
  return out;
}

// ─── 2. g-126 (NUOVA_GUIDA): PHILIPP'S MILANO · THE PLEIN HOTEL (PHILIPP PLEIN) ─
function renderPhilippsGuide(locale: LocaleCode): RenderedGuide {
  const ck = `g-126:${locale}`;
  const hit = TOP1_SEO_CACHE.get(ck);
  if (hit) return hit;

  const lx = TOP1_SEO_20261125_LEX[locale] || TOP1_SEO_20261125_LEX.en;
  const lx22 = GSC_BATCH_20261122_LEX[locale] || GSC_BATCH_20261122_LEX.en;
  const cp = CLUBBING_PILLAR_35[locale] || CLUBBING_PILLAR_35.en;
  const tl = cp.tableLabels;

  const phClub = clubUrl('philipps-milano', locale);
  const phNye = capodannoEventPath('capodanno-philipps-milano', locale);
  const jmClub = clubUrl('just-me-milano', locale);
  const jmNye = capodannoEventPath('capodanno-justme-milano-torre-branca', locale);
  const voyClub = clubUrl('voya-rooftop-milan', locale);
  const voyNye = capodannoEventPath('capodanno-voya-rooftop-milano', locale);
  const terClub = clubUrl('terrazza-21', locale);
  const terNye = capodannoEventPath('capodanno-terrazza-duomo-21', locale);
  const mibClub = clubUrl('mib-milano', locale);
  const tcClub = clubUrl('the-club-milano', locale);
  const dinnerGuide = guideUrl('g-60', locale);
  const tcGuide = guideUrl('g-28', locale);
  const dinnerNyeCat = capodannoCategoryPath('capodanno-locali-cenone-milano', locale);
  const breraZone = zoneUrl('brera', locale);

  const philippsScheduleTable = makeTable(
    [tl.thFormula, tl.thDistrict, tl.thNye2027, tl.thDressCode],
    [
      ["Wed - Sun · The Philipp's Show & Fine Dining", 'Via Daniele Manin 21 · Restaurant 20:00 / Show 21:45', 'Executive Chef Roberto Conti · On Request', tl.dressBlackTie],
      ['Tuesday · Brasilian Dinner Show & From Brasil to Milan', 'The Plein Hotel · Dinner 20:00 / Club 00:00 - 04:30', 'Couture Dinner & VIP Club · On Request', tl.dressEveningElegance],
      ['Wednesday · TUSSY (Couture Midweek Club)', 'Via Daniele Manin 21 · 00:00 - 04:30', 'VIP Salon & Bottle Service · On Request', tl.dressEveningElegance],
      ['Thursday · SAINT (Couture House & Fashion Crowd)', 'Via Daniele Manin 21 · 00:00 - 04:30', 'VIP Salon & Bottle Service · On Request', tl.dressEveningElegance],
      ['Friday · ClubForLife (Flagship Couture Clubbing)', 'Via Daniele Manin 21 · 00:00 - 04:30', 'VIP Salon & Bottle Service · On Request', tl.dressBlackTie],
      ['Saturday · KONEKT (Afro House & Melodic House)', 'Via Daniele Manin 21 · 00:00 - 04:30', 'VIP Salon & Bottle Service · On Request', tl.dressBlackTie],
      ['Sunday · SWEETIE (Couture Hip-Hop, R&B & House)', 'Via Daniele Manin 21 · 00:00 - 04:30', 'VIP Salon & Bottle Service · On Request', tl.dressEveningElegance],
      [`31/12/2026 · Philipp's Milano (${lx.nye})`, 'Palazzo Melzi d’Eril · Gala & Couture Club', 'Availability On Request (Zero Fake Estimates)', tl.dressBlackTie],
    ],
    locale,
  );

  const coutureDiningComparisonTable = makeTable(
    [tl.thVenue, tl.thDistrict, tl.thWeeklyRef, tl.thNye2027, tl.thStatus],
    [
      ["Philipp's Milano · The Plein Hotel", 'Via Daniele Manin 21 (Porta Nuova / Turati)', "Chef Roberto Conti + The Philipp's Show", 'On Request via Concierge WA', linkTag(phNye, tl.statusConfirmed, locale)],
      ['Just Me Milano (ex Just Cavalli)', 'Viale Luigi Camoens 2 (Torre Branca)', '7/7 Aperitivo & Dinner · VIP 320-1.000 EUR', 'Gala 300 EUR · Club 80 EUR · VIP 600-5.000', linkTag(jmNye, tl.statusConfirmed, locale)],
      ['Voya Rooftop Milano (20th Floor)', 'Viale Achille Papa 30 (CityLife / 85m)', 'Panoramic Dining & Skyline Lounge', '300 EUR 6-Course Menu (360 EUR Online)', linkTag(voyNye, tl.statusConfirmed, locale)],
      ['Terrazza Duomo 21 Milano', 'Piazza del Duomo 21 (Cathedral Spires)', 'Skyline Aperitivo, Dinner & DJ Set', 'Chef Valerio Braschi & 2-Star MA.RE', linkTag(terNye, tl.statusConfirmed, locale)],
      ['MIB Milano · Cena Cantata', 'Via Gaetano Negri 10 (Piazza Affari)', 'Billions & Love Affair 50 EUR · VIP 250+', 'Cena Cantata & Club · WA Concierge', linkTag(mibClub, tl.statusConfirmed, locale)],
      ['The Club Milano (Brera)', 'Corso Garibaldi 97 (M2 Moscova)', 'One Two, Atlanta, First Class, Girls Republic', 'VIP 400 / 440 / 600 EUR (2 Bottles)', linkTag(tcGuide, tl.statusConfirmed, locale)],
    ],
    locale,
    true,
  );

  const s1 = `<h3>Philipp's ${escapeHtml(lx.city, locale)} · The Plein Hotel (Via Daniele Manin 21)</h3>
<p>${escapeHtml(lx.ph_lead, locale)}</p>
<p>${escapeHtml(lx.ph_deep, locale)}</p>
<h3>${escapeHtml(cp.h3[0], locale)}</h3>
${philippsScheduleTable}
<h3>${escapeHtml(cp.h3[1], locale)}</h3>
<p>${linkTag(phClub, `Philipp's ${lx.city}`, locale)} · ${linkTag(phNye, `Philipp's ${lx.nye}`, locale)} · ${linkTag(dinnerGuide, 'Cena Cantata & Dinner Show', locale)} · ${linkTag(dinnerNyeCat, lx.nye, locale)} · ${linkTag(jmClub, 'Just Me Milano', locale)} · ${linkTag(voyClub, 'Voya Rooftop', locale)} · ${linkTag(terClub, 'Terrazza Duomo 21', locale)} · ${linkTag(breraZone, 'Porta Nuova & Brera', locale)}.</p>`;

  const s2 = `<h3>Porta Nuova, Quadrilatero &amp; Luxury Dinner Show Benchmark</h3>
<p>${escapeHtml(cp.intro[0], locale)} ${escapeHtml(cp.intro[1], locale)} ${escapeHtml(cp.sempioneBreraComo.corsoComoLead, locale)}</p>
<h3>${escapeHtml(cp.h3[4], locale)}</h3>
${coutureDiningComparisonTable}
<h3>${escapeHtml(cp.h3[5], locale)}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.sempioneBreraComo.bullets.map((b) => `<li>${escapeHtml(b, locale)}</li>`).join('\n')}
</ul>`;

  const s3 = `<h3>${escapeHtml(cp.h3[3], locale)}</h3>
<p>${escapeHtml(cp.sempioneBreraComo.justMeLead, locale)} ${escapeHtml(cp.sempioneBreraComo.pinetaClubLead, locale)}</p>
<h3>${escapeHtml(cp.h3[6], locale)}</h3>
<p>${escapeHtml(cp.gattopardoCitylife.gattopardoDetail, locale)} ${escapeHtml(cp.gattopardoCitylife.voyaDetail, locale)}</p>
<h3>${escapeHtml(cp.h3[7], locale)}</h3>
<p>${escapeHtml(lx22.winter_rep || cp.gattopardoCitylife.fiftyFiveRepvblicDetail, locale)}</p>`;

  const s4 = `<h3>${escapeHtml(cp.h3[9], locale)}</h3>
<p>${escapeHtml(cp.reggaetonNavigliSanSiro.gateAriaDetail, locale)} ${escapeHtml(cp.reggaetonNavigliSanSiro.navigliEastDetail, locale)}</p>
<h3>${escapeHtml(cp.h3[11], locale)}</h3>
<p>${escapeHtml(cp.reggaetonNavigliSanSiro.gardaTomDetail, locale)}</p>
<h3>${escapeHtml(cp.h3[2], locale)}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.reggaetonNavigliSanSiro.bullets.map((b) => `<li>${escapeHtml(b, locale)}</li>`).join('\n')}
</ul>
<p>${linkTag(genreUrl('dinner-show', locale), 'Cena Cantata & Dinner Show', locale)} · ${linkTag(genreUrl('afro-house', locale), 'Afro House & Konekt', locale)} · ${linkTag(genreUrl('house', locale), 'Vocal & Melodic House', locale)} · ${linkTag(tcClub, 'The Club Milano', locale)}.</p>`;

  const s5 = `<h3>${escapeHtml(cp.h3[12], locale)}</h3>
<p>${escapeHtml(cp.doorPolicyAndClosed.dressCodeDetail, locale)}</p>
<h3>${escapeHtml(cp.h3[13], locale)}</h3>
<p>${escapeHtml(cp.doorPolicyAndClosed.allMaleBottleDetail, locale)}</p>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.doorPolicyAndClosed.checklist.map((c) => `<li>${escapeHtml(c, locale)}</li>`).join('\n')}
</ul>
<h3>${escapeHtml(cp.h3[14], locale)}</h3>
<p>${escapeHtml(cp.doorPolicyAndClosed.closedAlertDetail, locale)}</p>
${sanitizeText(buildClosedVenuesHtml(locale), locale)}`;

  const s6 = `<h3>${escapeHtml(cp.h3[15], locale)}</h3>
<p>${escapeHtml(cp.conciergeAndTransit.conciergeDetail, locale)}</p>
<ol class="list-decimal pl-6 space-y-2 my-4">
${cp.conciergeAndTransit.steps.map((st) => `<li>${escapeHtml(st, locale)}</li>`).join('\n')}
</ol>
<h3>${escapeHtml(cp.h3[16], locale)}</h3>
<p>${escapeHtml(cp.conciergeAndTransit.metroParkingDetail, locale)}</p>
<h3>${escapeHtml(cp.h3[17], locale)}</h3>
<p>${escapeHtml(cp.conciergeAndTransit.termeCrossLink, locale)} ${escapeHtml(cp.overview.tableLead, locale)}</p>
${sanitizeText(buildPartner18MatrixHtml(locale), locale)}
<p>${linkTag(phClub, `Philipp's ${lx.city} (The Plein Hotel)`, locale)} · ${linkTag(capodannoPath(locale), cp.conciergeAndTransit.nyeHubCta, locale)} · <a href="https://wa.me/393519127047" class="underline decoration-current/55 underline-offset-4">${escapeHtml(cp.conciergeAndTransit.whatsappCta, locale)}</a> | <a href="mailto:concierge@nightlifemilan.com" class="underline decoration-current/55 underline-offset-4">concierge@nightlifemilan.com</a>.</p>`;

  const out: RenderedGuide = {
    title: sanitizeText(lx.ph_title, locale),
    excerpt: sanitizeText(lx.ph_exc, locale),
    sections: [
      { heading: sanitizeText(`1. Philipp's ${lx.city} · The Plein Hotel (Via Daniele Manin 21)`, locale), content: s1 },
      { heading: sanitizeText(cp.h2[1], locale), content: s2 },
      { heading: sanitizeText(cp.h2[2], locale), content: s3 },
      { heading: sanitizeText(cp.h2[3], locale), content: s4 },
      { heading: sanitizeText(cp.h2[4], locale), content: s5 },
      { heading: sanitizeText(cp.h2[5], locale), content: s6 },
    ],
    faqs: composeFaqs(lx.ph_faq_q, lx.ph_faq_a, cp.faqs, locale),
  };
  TOP1_SEO_CACHE.set(ck, out);
  return out;
}

function buildLazyGuide(
  id: string,
  slugs: Record<LocaleCode, string>,
  renderer: (loc: LocaleCode) => RenderedGuide,
  genres: MusicGenre[],
  heroImage: string,
  datePublished: string,
): Guide {
  const sections: GuideSection[] = [0, 1, 2, 3, 4, 5].map((idx) => ({
    id: `${id}-sec-${idx + 1}`,
    heading: createLazyLocalizedString((loc) => renderer(loc).sections[idx].heading),
    content: createLazyLocalizedString((loc) => renderer(loc).sections[idx].content),
  }));
  const faqs: FAQ[] = [0, 1, 2, 3, 4, 5].map((idx) => ({
    question: createLazyLocalizedString((loc) => renderer(loc).faqs[idx].question),
    answer: createLazyLocalizedString((loc) => renderer(loc).faqs[idx].answer),
  }));
  return {
    id,
    slugs: { ...slugs },
    title: createLazyLocalizedString((loc) => renderer(loc).title),
    excerpt: createLazyLocalizedString((loc) => renderer(loc).excerpt),
    sections,
    faqs,
    relatedGenres: genres,
    author: 'Nightlife Milan Editorial Desk',
    datePublished,
    dateModified: '2026-11-25',
    image: heroImage,
  };
}

export function applyTop1SeoBatch20261125(guidesList: Guide[]): void {
  const idx28 = guidesList.findIndex((g) => g.id === 'g-28');
  if (idx28 !== -1) {
    const existing = guidesList[idx28];
    const fallbackMap = GUIDE_100_SLUGS_MAP['g-28'];
    const mergedSlugs = { ...(fallbackMap || {}), ...(existing.slugs || {}) } as Record<LocaleCode, string>;
    guidesList[idx28] = buildLazyGuide(
      'g-28',
      mergedSlugs,
      renderTheClubGuide,
      [MusicGenre.HIP_HOP, MusicGenre.HOUSE, MusicGenre.COMMERCIAL],
      '/images/guides-editorial/the-club-brera.webp',
      existing.datePublished || '2026-10-01',
    );
  }

  if (!guidesList.some((g) => g.id === 'g-126')) {
    guidesList.push(
      buildLazyGuide(
        'g-126',
        GUIDE_100_SLUGS_MAP['g-126'] as Record<LocaleCode, string>,
        renderPhilippsGuide,
        [MusicGenre.HOUSE, MusicGenre.COMMERCIAL],
        '/images/guides-editorial/philipps-plein-chandeliers.webp',
        '2026-11-25',
      ),
    );
  }
}
