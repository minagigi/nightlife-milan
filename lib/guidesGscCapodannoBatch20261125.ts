// GSC Capodanno 2027 Partner Priority Batch (2026-11-25): 5 guides across all 35 locales.
// POTENZIA in-place: g-15 Just Me (ex Just Cavalli), g-16 Pineta, g-18 Voya Rooftop, g-20 REPVBLIC Milano.
// NUOVA_GUIDA 35L: g-125 Carlsberg Øl Milano (75 EUR All-Inclusive Cena Cantata & DJ Set).
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
import { GSC_CAPODANNO_20261125_LEX } from './i18n/pillarGuides20261125Capodanno';
import { buildClosedVenuesHtml, buildPartner18MatrixHtml } from './guidesGscBatch20261124';
import { capodannoCategoryPath, capodannoEventPath, capodannoPath } from './capodanno/routes';
import { getWhatsappVenueNyeContent } from './capodanno/whatsappVenues35';
import { getPinetaNyeContent } from './capodanno/pineta35';
import { getVoyaNyeContent, renderVoyaNyeMenuEditorialHtml } from './capodanno/voya35';
import { getCarlsbergOlNyeContent } from './capodanno/carlsbergOl35';
import { REPVBLIC_NYE_CONTENT_35, type CapodannoLocalizedEventContent } from './capodanno/repvblic35';
import { orthodoxNyeJustMePath } from './orthodox-nye/justme35';
import { christmasVoyaPath } from './christmas/voya35';
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

const CAPODANNO_BATCH_CACHE = new Map<string, RenderedGuide>();

export function getGscCapodanno20261125DisplayHeadline(guideId: string, locale: LocaleCode): string | null {
  const lx = GSC_CAPODANNO_20261125_LEX[locale] || GSC_CAPODANNO_20261125_LEX.en;
  if (guideId === 'g-15') return sanitizeText(`Just Me ${lx.city}`, locale);
  if (guideId === 'g-16') return sanitizeText(`Pineta ${lx.city}`, locale);
  if (guideId === 'g-18') return sanitizeText(`Voya Rooftop`, locale);
  if (guideId === 'g-20') return sanitizeText(`REPVBLIC ${lx.city}`, locale);
  if (guideId === 'g-125') return sanitizeText(lx.carl_disp, locale);
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

function renderEventMenuTable(ev: CapodannoLocalizedEventContent, locale: LocaleCode, colCourse = 'Portata / Step', colDetail = 'Menu & Formula 2027'): string {
  const rows: string[][] = [];
  for (const t of ev.tiers || []) {
    rows.push([t.label, `${t.price} · ${t.details}`]);
  }
  for (const m of ev.menus || []) {
    for (const c of m.courses || []) {
      rows.push([`${m.title} · ${c.course}`, c.dish]);
    }
    if (m.beverages) {
      rows.push([`${m.title} · Beverage`, m.beverages]);
    }
  }
  for (const st of ev.schedule || []) {
    rows.push([`31/12 · ${st.time}`, st.label]);
  }
  return makeTable([colCourse, colDetail], rows, locale);
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

// ─── 1. g-15 (POTENZIA): JUST ME MILANO (EX JUST CAVALLI) · TORRE BRANCA ───────
function renderJustMeGuide(locale: LocaleCode): RenderedGuide {
  const ck = `g-15:${locale}`;
  const hit = CAPODANNO_BATCH_CACHE.get(ck);
  if (hit) return hit;

  const lx = GSC_CAPODANNO_20261125_LEX[locale] || GSC_CAPODANNO_20261125_LEX.en;
  const lx22 = GSC_BATCH_20261122_LEX[locale] || GSC_BATCH_20261122_LEX.en;
  const cp = CLUBBING_PILLAR_35[locale] || CLUBBING_PILLAR_35.en;
  const tl = cp.tableLabels;
  const ev = getWhatsappVenueNyeContent('capodanno-justme-milano-torre-branca', locale)!;

  const jmClub = clubUrl('just-me-milano', locale);
  const jmNye = capodannoEventPath('capodanno-justme-milano-torre-branca', locale);
  const jmOrthodox = orthodoxNyeJustMePath(locale);
  const jmGarda = capodannoEventPath('capodanno-justme-garda-lake', locale);
  const gatNye = capodannoEventPath('capodanno-il-gattopardo-milano', locale);
  const fifNye = capodannoEventPath('capodanno-55-milano', locale);
  const daziNye = capodannoEventPath('capodanno-dazi-milano-arco-della-pace', locale);
  const sempZone = zoneUrl('parco-sempione', locale);
  const arcoGuide = guideUrl('g-102', locale);
  const clubGuide = guideUrl('g-118', locale);

  const jmMatrix = makeTable(
    [tl.thFormula, tl.thDistrict, tl.thNye2027, tl.thDressCode],
    [
      ['Just Me · Red Carpet & Gala Dinner The Great Gatsby (20:00)', 'Viale Luigi Camoens 2 · Torre Branca', '300 EUR / pax (600 EUR x2)', tl.dressBlackTie],
      ['Just Me · NYE Club Party + 1 Drink (from 23:30)', 'Italo Rota Crystal Dome (23:30 - 05:30)', '80 EUR Confirmed', tl.dressEveningElegance],
      ['Just Me · NYE VIP Tables Bronze / Silver', 'Reserved Club Floor & Raised Ring', '600 EUR / 800 EUR', tl.dressEveningElegance],
      ['Just Me · NYE Super Privé Gold / Platinum', 'Console & Front Stage Crystal Dome', '3.000 EUR / 5.000 EUR', tl.dressBlackTie],
      ['Just Me · Combo Gala Dinner x2 + VIP Table', '2x Gala + Bronze (1.000 EUR) / Silver (1.200 EUR)', '1.000 EUR / 1.200 EUR', tl.dressBlackTie],
      ['Just Me · Orthodox New Year 13 Jan 2027', 'Silver Buffet 60 EUR · Gold Seated Dinner 80 EUR', '60 EUR / 80 EUR', tl.dressEveningElegance],
      ['Just Me · Weekly Season (Open 7/7 Mon - Sun)', 'Royal Aperitivo 20-25 EUR · Guestlist 20-30 EUR', 'VIP 320 - 1.000 EUR', tl.dressSmartChic],
    ],
    locale,
  );

  const sempioneTable = makeTable(
    [tl.thVenue, tl.thDistrict, tl.thWeeklyRef, tl.thNye2027, tl.thStatus],
    [
      ['Just Me Milano (ex Just Cavalli)', 'Viale Luigi Camoens 2 (Torre Branca)', '20-30 EUR · VIP 320-1.000 EUR', '80 / 300 EUR · VIP 600-5.000 EUR', linkTag(jmNye, tl.statusConfirmed, locale)],
      ['JustMe Garda Lake (Official Partner)', 'Via Lavagnone 13, Lonato del Garda (BS)', 'Lake Resort Clubbing', tl.gardaRates, linkTag(jmGarda, tl.statusConfirmed, locale)],
      ['Il Gattopardo Milano', 'Via Piero della Francesca 47 (Ex Chiesa)', '20+ EUR · VIP 300-1.200 EUR', tl.gattopardoRates, linkTag(gatNye, tl.statusConfirmed, locale)],
      ['55 Milano (1.000 sqm Loft)', 'Via Piero della Francesca 55 (Sempione)', '20-25 EUR · VIP 200-1.200 EUR', '30-50 / 100 / 160 EUR', linkTag(fifNye, tl.statusConfirmed, locale)],
      ['Dazi Milano (Arco della Pace)', 'Piazza Sempione 1 (Casello Neoclassico)', '20-30 EUR · Cocktail & Club', '160 EUR Gala + Party', linkTag(daziNye, tl.statusConfirmed, locale)],
    ],
    locale,
    true,
  );

  const s1 = `<h3>Just Me ${escapeHtml(lx.city, locale)} (ex Just Cavalli) · ${escapeHtml(lx.nye, locale)} The Great Gatsby</h3>
<p>${escapeHtml(lx.jm_lead, locale)}</p>
<p>${escapeHtml(ev.description, locale)} ${escapeHtml(ev.sourceBasis, locale)}</p>
<h3>${escapeHtml(cp.h3[0], locale)}</h3>
${jmMatrix}
<h3>${escapeHtml(ev.menusHeading || cp.h3[1], locale)}</h3>
${renderEventMenuTable(ev, locale, tl.thFormula, tl.thNye2027)}
<p>${linkTag(jmNye, `Just Me ${lx.nye}`, locale)} · ${linkTag(jmOrthodox, 'Orthodox NYE 13/01/2027 (60/80 EUR)', locale)} · ${linkTag(jmClub, `Just Me ${lx.city}`, locale)} · ${linkTag(jmGarda, 'JustMe Garda Lake', locale)}.</p>`;

  const s2 = `<h3>Parco Sempione, Torre Branca &amp; Arco della Pace Circuit</h3>
<p>${escapeHtml(cp.intro[0], locale)} ${escapeHtml(cp.intro[1], locale)} ${escapeHtml(cp.sempioneBreraComo.justMeLead, locale)}</p>
<h3>${escapeHtml(cp.h3[3], locale)}</h3>
${sempioneTable}
<h3>${escapeHtml(cp.h3[5], locale)}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.sempioneBreraComo.bullets.map((b) => `<li>${escapeHtml(b, locale)}</li>`).join('\n')}
</ul>
<p>${linkTag(sempZone, 'Parco Sempione', locale)} · ${linkTag(arcoGuide, 'Arco della Pace & Sempione', locale)} · ${linkTag(clubGuide, lx22.cal_short, locale)}.</p>`;

  const s3 = `<h3>${escapeHtml(cp.h3[4], locale)}</h3>
<p>${escapeHtml(cp.sempioneBreraComo.pinetaClubLead, locale)} ${escapeHtml(cp.sempioneBreraComo.corsoComoLead, locale)}</p>
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
<p>${linkTag(genreUrl('house', locale), 'House & Vocal House', locale)} · ${linkTag(genreUrl('commercial', locale), 'Commercial & Gala', locale)} · ${linkTag(genreUrl('reggaeton', locale), 'Reggaeton & Urban', locale)}.</p>`;

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
<p>${linkTag(jmClub, 'Just Me Milano (ex Just Cavalli)', locale)} · ${linkTag(capodannoPath(locale), cp.conciergeAndTransit.nyeHubCta, locale)} · <a href="https://wa.me/393519127047" class="underline decoration-current/55 underline-offset-4">${escapeHtml(cp.conciergeAndTransit.whatsappCta, locale)}</a> | <a href="mailto:concierge@nightlifemilan.com" class="underline decoration-current/55 underline-offset-4">concierge@nightlifemilan.com</a>.</p>`;

  const out: RenderedGuide = {
    title: sanitizeText(lx.jm_title, locale),
    excerpt: sanitizeText(lx.jm_exc, locale),
    sections: [
      { heading: sanitizeText(`1. Just Me ${lx.city} (ex Just Cavalli) · ${lx.nye}`, locale), content: s1 },
      { heading: sanitizeText(cp.h2[1], locale), content: s2 },
      { heading: sanitizeText(cp.h2[2], locale), content: s3 },
      { heading: sanitizeText(cp.h2[3], locale), content: s4 },
      { heading: sanitizeText(cp.h2[4], locale), content: s5 },
      { heading: sanitizeText(cp.h2[5], locale), content: s6 },
    ],
    faqs: composeFaqs(lx.jm_faq_q, lx.jm_faq_a, cp.faqs, locale),
  };
  CAPODANNO_BATCH_CACHE.set(ck, out);
  return out;
}

// ─── 2. g-16 (POTENZIA): PINETA MILANO · VIA MESSINA 38 (MOULIN ROUGE 2027) ────
function renderPinetaGuide(locale: LocaleCode): RenderedGuide {
  const ck = `g-16:${locale}`;
  const hit = CAPODANNO_BATCH_CACHE.get(ck);
  if (hit) return hit;

  const lx = GSC_CAPODANNO_20261125_LEX[locale] || GSC_CAPODANNO_20261125_LEX.en;
  const lx22 = GSC_BATCH_20261122_LEX[locale] || GSC_BATCH_20261122_LEX.en;
  const cp = CLUBBING_PILLAR_35[locale] || CLUBBING_PILLAR_35.en;
  const tl = cp.tableLabels;
  const ev = getPinetaNyeContent(locale);

  const pinClub = clubUrl('pineta-club-milano', locale);
  const pinNye = capodannoEventPath('capodanno-pineta-milano', locale);
  const theClubNye = capodannoEventPath('capodanno-the-club-milano', locale);
  const holNye = capodannoEventPath('capodanno-hollywood-milano', locale);
  const tocNye = capodannoEventPath('capodanno-tocqueville-13-milano', locale);
  const carlGuide = guideUrl('g-125', locale);
  const dinnerGuide = guideUrl('g-60', locale);
  const comoZone = zoneUrl('corso-como', locale);

  const pinMatrix = makeTable(
    [tl.thFormula, tl.thDistrict, tl.thNye2027, tl.thDressCode],
    [
      ['Pineta · Royal Buffet Moulin Rouge + 2 Burlesque (20:30)', 'Via Messina 38 · Welcome Flûte + 1 Drink + Toast', '40 EUR Confirmed', tl.dressEveningElegance],
      ['Pineta · Seated Gala Dinner Moulin Rouge (21:00)', '5 Courses + 1 Wine / 3 Pax + 2 Burlesque + Club', '160 EUR Confirmed', tl.dressBlackTie],
      ['Pineta · Club Entry Only Main & Urban Room (23:00)', '1 Drink + Midnight Toast (23:00 - 05:00)', '40 EUR Confirmed', tl.dressSmartChic],
      ['Pineta · Side Floor Outdoor / Dance Floor Table', '5 Guests (300 EUR) · 10 Guests Main Room (600 EUR)', '300 EUR / 600 EUR', tl.dressEveningElegance],
      ['Pineta · Privé Balcony / Dom Pérignon Area', '10 Guests Raised Stage View / Premium Area', '900 EUR / 1.000 EUR', tl.dressBlackTie],
      ['Pineta · Terrace / VIP Privé Indoor Console', '10 Guests Exclusive VIP Console Area', '1.200 EUR / 1.500 EUR', tl.dressBlackTie],
      ['Pineta · Weekly Luxury Hall (Wed, Fri, Sat)', 'Dinner Show 35-60 EUR · Guestlist 20-25 EUR', 'VIP 320 - 800 EUR', tl.dressSmartChic],
    ],
    locale,
  );

  const garibaldiTable = makeTable(
    [tl.thVenue, tl.thDistrict, tl.thWeeklyRef, tl.thNye2027, tl.thStatus],
    [
      ['Pineta Milano (Moulin Rouge)', 'Via Messina 38 (M5 Cenisio 180 m)', '20-25 EUR · VIP 320-800 EUR', '40 / 40 / 160 EUR · VIP 300-1.500 EUR', linkTag(pinNye, tl.statusConfirmed, locale)],
      ['Carlsberg Øl Milano', 'Bastioni di Porta Nuova 9 (Corso Como)', 'Craft Brasserie & Live Dinner', '75 EUR All-In Cena Cantata + DJ', linkTag(carlGuide, tl.statusConfirmed, locale)],
      ['The Club Milano (Brera)', 'Corso Garibaldi 97 (M2 Moscova)', '20-25 EUR · VIP 300-1.200 EUR', tl.theClubRates, linkTag(theClubNye, tl.statusConfirmed, locale)],
      ['Tocqueville 13 Milano', 'Via Alessio di Tocqueville 13', '20-30 EUR · Dinner Show', tl.tocquevilleRates, linkTag(tocNye, tl.statusBenchmark, locale)],
      ['Hollywood Milano', 'Corso Como 15 (Porta Garibaldi)', '20-30 EUR · Fashion Club', tl.hollywoodRates, linkTag(holNye, tl.statusBenchmark, locale)],
    ],
    locale,
    true,
  );

  const s1 = `<h3>Pineta ${escapeHtml(lx.city, locale)} · ${escapeHtml(lx.nye, locale)} Moulin Rouge (Via Messina 38)</h3>
<p>${escapeHtml(lx.pin_lead, locale)}</p>
<p>${escapeHtml(ev.description, locale)} ${escapeHtml(ev.sourceBasis, locale)}</p>
<h3>${escapeHtml(cp.h3[0], locale)}</h3>
${pinMatrix}
<h3>${escapeHtml(ev.menusHeading || cp.h3[1], locale)}</h3>
${renderEventMenuTable(ev, locale, tl.thFormula, tl.thNye2027)}
<p>${linkTag(pinNye, `Pineta ${lx.nye}`, locale)} · ${linkTag(pinClub, `Pineta ${lx.city}`, locale)} · ${linkTag(dinnerGuide, 'Cena Cantata & Dinner Show', locale)} · ${linkTag(comoZone, 'Corso Como & Garibaldi', locale)}.</p>`;

  const s2 = `<h3>Porta Garibaldi, Cenisio &amp; Corso Como Partner Corridor</h3>
<p>${escapeHtml(cp.intro[0], locale)} ${escapeHtml(cp.intro[1], locale)} ${escapeHtml(cp.sempioneBreraComo.pinetaClubLead, locale)}</p>
<h3>${escapeHtml(cp.h3[4], locale)}</h3>
${garibaldiTable}
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
<p>${linkTag(genreUrl('house', locale), 'House & Commercial', locale)} · ${linkTag(genreUrl('hip-hop', locale), 'Hip-Hop & Urban Room', locale)} · ${linkTag(genreUrl('reggaeton', locale), 'Reggaeton & Latin', locale)}.</p>`;

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
<p>${linkTag(pinClub, `Pineta ${lx.city}`, locale)} · ${linkTag(capodannoPath(locale), cp.conciergeAndTransit.nyeHubCta, locale)} · <a href="https://wa.me/393519127047" class="underline decoration-current/55 underline-offset-4">${escapeHtml(cp.conciergeAndTransit.whatsappCta, locale)}</a> | <a href="mailto:concierge@nightlifemilan.com" class="underline decoration-current/55 underline-offset-4">concierge@nightlifemilan.com</a>.</p>`;

  const out: RenderedGuide = {
    title: sanitizeText(lx.pin_title, locale),
    excerpt: sanitizeText(lx.pin_exc, locale),
    sections: [
      { heading: sanitizeText(`1. Pineta ${lx.city} · Moulin Rouge ${lx.nye} (Via Messina 38)`, locale), content: s1 },
      { heading: sanitizeText(cp.h2[1], locale), content: s2 },
      { heading: sanitizeText(cp.h2[2], locale), content: s3 },
      { heading: sanitizeText(cp.h2[3], locale), content: s4 },
      { heading: sanitizeText(cp.h2[4], locale), content: s5 },
      { heading: sanitizeText(cp.h2[5], locale), content: s6 },
    ],
    faqs: composeFaqs(lx.pin_faq_q, lx.pin_faq_a, cp.faqs, locale),
  };
  CAPODANNO_BATCH_CACHE.set(ck, out);
  return out;
}

// ─── 3. g-18 (POTENZIA): VOYA ROOFTOP MILAN (20TH FLOOR, 85M · 300 EUR MENU) ───
function renderVoyaGuide(locale: LocaleCode): RenderedGuide {
  const ck = `g-18:${locale}`;
  const hit = CAPODANNO_BATCH_CACHE.get(ck);
  if (hit) return hit;

  const lx = GSC_CAPODANNO_20261125_LEX[locale] || GSC_CAPODANNO_20261125_LEX.en;
  const lx22 = GSC_BATCH_20261122_LEX[locale] || GSC_BATCH_20261122_LEX.en;
  const cp = CLUBBING_PILLAR_35[locale] || CLUBBING_PILLAR_35.en;
  const tl = cp.tableLabels;
  const ev = getVoyaNyeContent(locale);

  const voyClub = clubUrl('voya-rooftop-milan', locale);
  const voyNye = capodannoEventPath('capodanno-voya-rooftop-milano', locale);
  const voyXmas = christmasVoyaPath(locale);
  const rooftopNyeCat = capodannoCategoryPath('capodanno-rooftop-milano', locale);
  const terNye = capodannoEventPath('capodanno-terrazza-duomo-21', locale);
  const radNye = capodannoEventPath('capodanno-radio-rooftop-milano', locale);
  const cerClosed = capodannoEventPath('capodanno-ceresio-7-milano', locale);
  const rooftopGuide = guideUrl('g-rooftops-milan', locale);
  const terGuide = guideUrl('g-32', locale);

  // Official 6-course NYE 2027 menu + localized 4:5 menu card (voya-nye-2027-menu-<locale>.webp)
  // Inherit Taste V2 editorial surface & ink so .taste-guide-prose p maintains 12.1:1 WCAG AAA contrast.
  const voyaEditorialCard = sanitizeText(
    renderVoyaNyeMenuEditorialHtml(locale)
      .replace(/\bbg-\[#0B0A09\]\s*/g, '')
      .replace(/\bbg-\[#050505\]\s*/g, '')
      .replace(/\btext-\[#F6F1E7\]\s*/g, '')
      .replace(/\btext-\[#C2B9AA\]\s*/g, '')
      .replace(/\btext-\[#EAE3D5\]\s*/g, '')
      .replace(/bg-\[#EAE3D5\]\s+px-3\s+py-1\s+text-xs\s+font-bold\s+uppercase\s+text-\[#050505\]/g, 'border border-current/30 px-3 py-1 text-xs font-bold uppercase')
      .replace(/border-white\/15/g, 'border-current/20'),
    locale,
  );

  const voyMatrix = makeTable(
    [tl.thFormula, tl.thDistrict, tl.thNye2027, tl.thDressCode],
    [
      ['Voya Rooftop · NYE 2027 Official 6-Course Menu + DJ Set', 'Viale Achille Papa 30 · 20th Floor (85m)', '300 EUR Menu (360 EUR Online)', tl.dressBlackTie],
      ['Voya Rooftop · Beverage Pairing & Midnight Lentils', '1 Wine Bottle / 4 Guests + Midnight Toast + Water', 'Included in 300 EUR Rate', tl.dressBlackTie],
      ['Voya Rooftop · Christmas Day Lunch 25 December 2026', '5-Course Panoramic Menu + Wine & Coffee', '100 EUR Menu (120 EUR Online)', tl.dressEveningElegance],
      ['Voya Rooftop · Weekly Sunset Aperitivo & Dinner', '20th Floor Sky Lounge (Thu - Sun, 19:30 - 04:30)', '25-35 EUR · Dinner 60-90 EUR', tl.dressSmartChic],
      ['Voya Rooftop · Weekly Skyline VIP Bottle Tables', 'Dancefloor 300-350 EUR · Glass Privé 500-800 EUR', '100% Bottle Credit', tl.dressEveningElegance],
    ],
    locale,
  );

  const skylineTable = makeTable(
    [tl.thVenue, tl.thDistrict, tl.thWeeklyRef, tl.thNye2027, tl.thStatus],
    [
      ['Voya Rooftop Milano (#1 Sky Club)', 'Viale Achille Papa 30 · 20° Piano (85m)', '25-35 EUR · VIP 300-800 EUR', '300 EUR Menu (360 EUR Online)', linkTag(voyNye, tl.statusConfirmed, locale)],
      ['Terrazza Duomo 21 & Terrazza MA.RE', 'Piazza del Duomo 21 (1F & 5F)', '25-40 EUR · VIP 300-2.000 EUR', '70 / 90 / 200 / 300 / 380 EUR', linkTag(terNye, tl.statusConfirmed, locale)],
      ['Radio Rooftop Milan (10th Floor)', 'Via Marco Polo 18 (Repubblica)', '25-35 EUR · Skyline Lounge', 'Confirmed Rooftop Gala', linkTag(radNye, tl.statusConfirmed, locale)],
      ['Ceresio 7 Milano', 'Via Ceresio 7 (Monumentale)', 'Closed Dec 31 - Jan 3', tl.statusClosed, linkTag(cerClosed, tl.statusClosed, locale)],
    ],
    locale,
    true,
  );

  const s1 = `<h3>Voya Rooftop ${escapeHtml(lx.city, locale)} (20° Piano, 85m) · ${escapeHtml(lx.nye, locale)}</h3>
<p>${escapeHtml(lx.voy_lead, locale)}</p>
<p>${escapeHtml(ev.description, locale)} ${escapeHtml(ev.sourceBasis, locale)}</p>
<h3>${escapeHtml(ev.menusHeading || cp.h3[0], locale)}</h3>
${voyaEditorialCard}
${renderEventMenuTable(ev, locale, tl.thFormula, tl.thNye2027)}
<h3>${escapeHtml(cp.h3[1], locale)}</h3>
${voyMatrix}
<p>${linkTag(voyNye, `Voya Rooftop ${lx.nye}`, locale)} · ${linkTag(voyXmas, 'Voya Christmas 25/12 (100 EUR)', locale)} · ${linkTag(voyClub, `Voya Rooftop ${lx.city}`, locale)} · ${linkTag(rooftopNyeCat, 'Rooftop NYE 2027 Hub', locale)}.</p>`;

  const s2 = `<h3>CityLife, Portello &amp; Milan Panoramic Rooftop Comparison</h3>
<p>${escapeHtml(cp.intro[0], locale)} ${escapeHtml(cp.intro[1], locale)} ${escapeHtml(cp.gattopardoCitylife.voyaDetail, locale)}</p>
<h3>${escapeHtml(cp.h3[7], locale)}</h3>
${skylineTable}
<h3>${escapeHtml(cp.h3[8], locale)}</h3>
<p>${escapeHtml(cp.gattopardoCitylife.gattopardoDetail, locale)} ${escapeHtml(lx22.winter_rep || cp.gattopardoCitylife.fiftyFiveRepvblicDetail, locale)}</p>
<p>${linkTag(rooftopGuide, 'Best Rooftops Milan', locale)} · ${linkTag(terGuide, 'Terrazza Duomo 21', locale)}.</p>`;

  const s3 = `<h3>${escapeHtml(cp.h3[3], locale)}</h3>
<p>${escapeHtml(cp.sempioneBreraComo.justMeLead, locale)} ${escapeHtml(cp.sempioneBreraComo.pinetaClubLead, locale)}</p>
<h3>${escapeHtml(cp.h3[4], locale)}</h3>
<p>${escapeHtml(cp.sempioneBreraComo.corsoComoLead, locale)}</p>
<h3>${escapeHtml(cp.h3[5], locale)}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.sempioneBreraComo.bullets.map((b) => `<li>${escapeHtml(b, locale)}</li>`).join('\n')}
</ul>`;

  const s4 = `<h3>${escapeHtml(cp.h3[9], locale)}</h3>
<p>${escapeHtml(cp.reggaetonNavigliSanSiro.gateAriaDetail, locale)} ${escapeHtml(cp.reggaetonNavigliSanSiro.navigliEastDetail, locale)}</p>
<h3>${escapeHtml(cp.h3[11], locale)}</h3>
<p>${escapeHtml(cp.reggaetonNavigliSanSiro.gardaTomDetail, locale)}</p>
<h3>${escapeHtml(cp.h3[2], locale)}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.overview.highlights.map((h) => `<li>${escapeHtml(h, locale)}</li>`).join('\n')}
</ul>`;

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
<p>${linkTag(voyClub, `Voya Rooftop ${lx.city}`, locale)} · ${linkTag(capodannoPath(locale), cp.conciergeAndTransit.nyeHubCta, locale)} · <a href="https://wa.me/393519127047" class="underline decoration-current/55 underline-offset-4">${escapeHtml(cp.conciergeAndTransit.whatsappCta, locale)}</a> | <a href="mailto:concierge@nightlifemilan.com" class="underline decoration-current/55 underline-offset-4">concierge@nightlifemilan.com</a>.</p>`;

  const out: RenderedGuide = {
    title: sanitizeText(lx.voy_title, locale),
    excerpt: sanitizeText(lx.voy_exc, locale),
    sections: [
      { heading: sanitizeText(`1. Voya Rooftop ${lx.city} (20° Piano, 85m) · ${lx.nye}`, locale), content: s1 },
      { heading: sanitizeText(cp.h2[2], locale), content: s2 },
      { heading: sanitizeText(cp.h2[1], locale), content: s3 },
      { heading: sanitizeText(cp.h2[3], locale), content: s4 },
      { heading: sanitizeText(cp.h2[4], locale), content: s5 },
      { heading: sanitizeText(cp.h2[5], locale), content: s6 },
    ],
    faqs: composeFaqs(lx.voy_faq_q, lx.voy_faq_a, cp.faqs, locale),
  };
  CAPODANNO_BATCH_CACHE.set(ck, out);
  return out;
}

// ─── 4. g-125 (NUOVA_GUIDA): CARLSBERG ØL MILANO · CAPODANNO 2027 (75 EUR) ────
function renderCarlsbergGuide(locale: LocaleCode): RenderedGuide {
  const ck = `g-125:${locale}`;
  const hit = CAPODANNO_BATCH_CACHE.get(ck);
  if (hit) return hit;

  const lx = GSC_CAPODANNO_20261125_LEX[locale] || GSC_CAPODANNO_20261125_LEX.en;
  const lx22 = GSC_BATCH_20261122_LEX[locale] || GSC_BATCH_20261122_LEX.en;
  const cp = CLUBBING_PILLAR_35[locale] || CLUBBING_PILLAR_35.en;
  const tl = cp.tableLabels;
  const ev = getCarlsbergOlNyeContent(locale);

  const carlNye = capodannoEventPath('capodanno-carlsberg-ol-milano', locale);
  const cenoneCat = capodannoCategoryPath('capodanno-locali-cenone-milano', locale);
  const lowCostCat = capodannoCategoryPath('capodanno-economico-low-cost-milano', locale);
  const pinNye = capodannoEventPath('capodanno-pineta-milano', locale);
  const bisNye = capodannoEventPath('capodanno-bischeri-milano', locale);
  const chuNye = capodannoEventPath('capodanno-church-81-milano', locale);
  const pelNye = capodannoEventPath('capodanno-pelledoca-milano', locale);
  const dinnerGuide = guideUrl('g-60', locale);
  const pinGuide = guideUrl('g-16', locale);
  const repGuide = guideUrl('g-20', locale);

  const carlMenuImg = '/images/events/capodanno-2027-menus/carlsberg-ol-nye-2027-menu-cenone-75.webp';
  const carlFigure = `<figure class="my-6 flex flex-col items-center"><img src="${carlMenuImg}" alt="${escapeHtml(`${ev.menus?.[0]?.title || 'Carlsberg Øl Milano'} · 75 EUR`, locale)}" title="${escapeHtml(`${lx.carl_title}`, locale)}" width="1080" height="1350" loading="lazy" decoding="async" class="aspect-[4/5] w-full max-w-[400px] object-cover border border-current/20" /><figcaption class="mt-2 text-xs opacity-80 text-center">${escapeHtml(ev.menus?.[0]?.beverages || ev.priceSummary, locale)}</figcaption></figure>`;

  const carlDinnerComparison = makeTable(
    [tl.thVenue, tl.thDistrict, tl.thMusic, tl.thNye2027, tl.thStatus],
    [
      ['Carlsberg Øl Milano', 'Bastioni di Porta Nuova 9 (Corso Como)', 'Cena Cantata Live + DJ Set (20:30 - 03:00)', '75 EUR All-In (Wine 1/4 Included)', linkTag(carlNye, tl.statusConfirmed, locale)],
      ['Pineta Milano (Moulin Rouge)', 'Via Messina 38 (Garibaldi)', '2x Burlesque + Main & Urban Room', '40 EUR Buffet · 160 EUR Gala', linkTag(pinNye, tl.statusConfirmed, locale)],
      ['Church 81 Milano', 'Via della Chiesa Rossa 81 (Navigli Sud)', 'Singing Dinner Show & Clubbing', '90 EUR Meat / Seafood Menu + Wine', linkTag(chuNye, tl.statusConfirmed, locale)],
      ['Pelledoca Milano', 'Viale Enrico Forlanini 121 (Linate)', 'Gran Cenone + Club from 00:30', '120 EUR Full Menu + DOCG Wines', linkTag(pelNye, tl.statusConfirmed, locale)],
      ['Bischeri Milano', 'Viale Gorizia 8 (Darsena / Navigli)', 'Gala Dinner Show + Disco', '140 EUR Gala · 40 EUR Club (2 Drinks)', linkTag(bisNye, tl.statusConfirmed, locale)],
    ],
    locale,
    true,
  );

  const s1 = `<h3>Carlsberg Øl ${escapeHtml(lx.city, locale)} · Bastioni di Porta Nuova 9 (${escapeHtml(lx.nye, locale)} · 75 EUR)</h3>
<p>${escapeHtml(lx.carl_lead, locale)}</p>
<p>${escapeHtml(ev.description, locale)} ${escapeHtml(ev.sourceBasis, locale)}</p>
<h3>${escapeHtml(ev.menusHeading || cp.h3[0], locale)}</h3>
${carlFigure}
${renderEventMenuTable(ev, locale, tl.thFormula, tl.thNye2027)}
<h3>${escapeHtml(ev.conditionsHeading || cp.h3[1], locale)}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${ev.highlights.map((h) => `<li>${escapeHtml(h, locale)}</li>`).join('\n')}
</ul>
<p>${linkTag(carlNye, `Carlsberg Øl ${lx.nye} (75 EUR)`, locale)} · ${linkTag(cenoneCat, 'Gala & Singing Dinners 2027', locale)} · ${linkTag(lowCostCat, 'Best-Value NYE 2027', locale)} · ${linkTag(dinnerGuide, 'Cena Cantata Guide', locale)}.</p>`;

  const s2 = `<h3>Porta Nuova, Piazza XXV Aprile &amp; Singing Dinner Comparison</h3>
<p>${escapeHtml(cp.intro[0], locale)} ${escapeHtml(cp.intro[1], locale)}</p>
<h3>${escapeHtml(cp.h3[5], locale)}</h3>
${carlDinnerComparison}
<h3>${escapeHtml(cp.h3[4], locale)}</h3>
<p>${escapeHtml(cp.sempioneBreraComo.pinetaClubLead, locale)} ${escapeHtml(cp.sempioneBreraComo.corsoComoLead, locale)}</p>
<p>${linkTag(pinGuide, `Pineta ${lx.city}`, locale)} · ${linkTag(repGuide, `REPVBLIC ${lx.city}`, locale)}.</p>`;

  const s3 = `<h3>${escapeHtml(cp.h3[3], locale)}</h3>
<p>${escapeHtml(cp.sempioneBreraComo.justMeLead, locale)}</p>
<h3>${escapeHtml(cp.h3[6], locale)}</h3>
<p>${escapeHtml(cp.gattopardoCitylife.gattopardoDetail, locale)} ${escapeHtml(cp.gattopardoCitylife.voyaDetail, locale)}</p>
<h3>${escapeHtml(cp.h3[7], locale)}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.sempioneBreraComo.bullets.map((b) => `<li>${escapeHtml(b, locale)}</li>`).join('\n')}
</ul>`;

  const s4 = `<h3>${escapeHtml(cp.h3[9], locale)}</h3>
<p>${escapeHtml(cp.reggaetonNavigliSanSiro.gateAriaDetail, locale)} ${escapeHtml(cp.reggaetonNavigliSanSiro.navigliEastDetail, locale)}</p>
<h3>${escapeHtml(cp.h3[11], locale)}</h3>
<p>${escapeHtml(cp.reggaetonNavigliSanSiro.gardaTomDetail, locale)}</p>
<h3>${escapeHtml(cp.h3[2], locale)}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.reggaetonNavigliSanSiro.bullets.map((b) => `<li>${escapeHtml(b, locale)}</li>`).join('\n')}
</ul>`;

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
<p>${linkTag(carlNye, `Carlsberg Øl ${lx.nye}`, locale)} · ${linkTag(capodannoPath(locale), cp.conciergeAndTransit.nyeHubCta, locale)} · <a href="https://wa.me/393519127047" class="underline decoration-current/55 underline-offset-4">${escapeHtml(cp.conciergeAndTransit.whatsappCta, locale)}</a> | <a href="mailto:concierge@nightlifemilan.com" class="underline decoration-current/55 underline-offset-4">concierge@nightlifemilan.com</a>.</p>`;

  const carlExtraFaqs: Array<[string, string]> = (ev.customFaqs || []).map((f) => [f.q, f.a]);
  const out: RenderedGuide = {
    title: sanitizeText(lx.carl_title, locale),
    excerpt: sanitizeText(lx.carl_exc, locale),
    sections: [
      { heading: sanitizeText(`1. Carlsberg Øl ${lx.city} · Bastioni di Porta Nuova 9 (75 EUR)`, locale), content: s1 },
      { heading: sanitizeText(cp.h2[1], locale), content: s2 },
      { heading: sanitizeText(cp.h2[2], locale), content: s3 },
      { heading: sanitizeText(cp.h2[3], locale), content: s4 },
      { heading: sanitizeText(cp.h2[4], locale), content: s5 },
      { heading: sanitizeText(cp.h2[5], locale), content: s6 },
    ],
    faqs: composeFaqs(lx.carl_faq_q, lx.carl_faq_a, cp.faqs, locale, carlExtraFaqs.slice(0, 2)),
  };
  CAPODANNO_BATCH_CACHE.set(ck, out);
  return out;
}

// ─── 5. g-20 (POTENZIA): REPVBLIC MILANO · PIAZZA DELLA REPUBBLICA 12 ─────────
function stripExternalTicketingForRepvblic(html: string): string {
  return html
    .replace(/Xceed/gi, 'WhatsApp Concierge')
    .replace(/ClubbingApp/gi, 'WhatsApp Concierge');
}

function renderRepvblicGuide(locale: LocaleCode): RenderedGuide {
  const ck = `g-20:${locale}`;
  const hit = CAPODANNO_BATCH_CACHE.get(ck);
  if (hit) return hit;

  const lx = GSC_CAPODANNO_20261125_LEX[locale] || GSC_CAPODANNO_20261125_LEX.en;
  const lx22 = GSC_BATCH_20261122_LEX[locale] || GSC_BATCH_20261122_LEX.en;
  const cp = CLUBBING_PILLAR_35[locale] || CLUBBING_PILLAR_35.en;
  const tl = cp.tableLabels;
  const ev = REPVBLIC_NYE_CONTENT_35[locale] || REPVBLIC_NYE_CONTENT_35.en;

  const repClub = clubUrl('repvblic-milano', locale);
  const repNye = capodannoEventPath('capodanno-repvblic-milano', locale);
  const gateNye = capodannoEventPath('capodanno-gate-milano', locale);
  const theClubNye = capodannoEventPath('capodanno-the-club-milano', locale);
  const carlGuide = guideUrl('g-125', locale);
  const regGuide = guideUrl('g-119', locale);
  const clubGuide = guideUrl('g-118', locale);

  const repScheduleAndNye = makeTable(
    [tl.thFormula, tl.thDistrict, tl.thNye2027, tl.thDressCode],
    [
      ['REPVBLIC · NYE 2027 Early Bird Admission (from 23:00)', 'Piazza della Repubblica 12 · Flûte + 1 Drink', '45 EUR (WhatsApp Only)', tl.dressEveningElegance],
      ['REPVBLIC · NYE 2027 Dancefloor VIP Table', 'Central Main Floor · Up to 6 Guests', '600 EUR (6 Guests)', tl.dressEveningElegance],
      ['REPVBLIC · NYE 2027 Exclusive Privé VIP Table', 'Elevated VIP Privé Area · Up to 10 Guests', '1.200 EUR (10 Guests)', tl.dressBlackTie],
      ['REPVBLIC · Tuesday HOME x CLUB APÉRO', 'Tech House International Night (ex Monday Slot)', 'Tables 300 EUR (5) / 600 EUR (10-12)', tl.dressSmartChic],
      ['REPVBLIC · Thursday BURAKA x MOVIDA', 'Hip-Hop, Reggaeton & Latin Urban', 'Tables 300 EUR (5) / 600 EUR (10-12)', tl.dressSmartChic],
      ['REPVBLIC · Friday & Saturday Boutique Club', 'Tech House & International Club Hits (23:00 - 05:00)', 'Tables 300 EUR (5) / 600 EUR (10-12)', tl.dressEveningElegance],
      ['REPVBLIC · Sunday DEMON TIME', 'Hip-Hop, Trap & R&B International Crowd', 'Tables 300 EUR (5) / 600 EUR (10-12)', tl.dressSmartChic],
    ],
    locale,
  );

  const repubblicaTable = makeTable(
    [tl.thVenue, tl.thDistrict, tl.thWeeklyRef, tl.thNye2027, tl.thStatus],
    [
      ['REPVBLIC Milano', 'Piazza della Repubblica 12 (M3 Repubblica 50 m)', 'Tables 300 EUR (5) / 600 EUR (10-12)', '45 EUR · VIP 600 / 1.200 EUR', linkTag(repNye, tl.statusConfirmed, locale)],
      ['Carlsberg Øl Milano', 'Bastioni di Porta Nuova 9 (350 m Walk)', 'Historic Vaults Dinner & Bar', '75 EUR All-In Cena Cantata + DJ', linkTag(carlGuide, tl.statusConfirmed, locale)],
      ['Gate Milano (PERREO XL)', 'Via Valtellina 21 (Isola / Scalo Farini)', '15-25 EUR · Urban Arena', tl.gateRates, linkTag(gateNye, tl.statusConfirmed, locale)],
      ['The Club Milano', 'Corso Garibaldi 97 (Brera / Moscova)', '20-25 EUR · VIP 300-1.200 EUR', tl.theClubRates, linkTag(theClubNye, tl.statusConfirmed, locale)],
    ],
    locale,
    true,
  );

  const s1Raw = `<h3>REPVBLIC ${escapeHtml(lx.city, locale)} · Piazza della Repubblica 12 (${escapeHtml(lx.nye, locale)})</h3>
<p>${escapeHtml(lx.rep_lead, locale)}</p>
<p>${escapeHtml(ev.description, locale)} ${escapeHtml(ev.sourceBasis, locale)}</p>
<h3>${escapeHtml(cp.h3[0], locale)}</h3>
${repScheduleAndNye}
<h3>${escapeHtml(cp.h3[2], locale)}</h3>
<p>${escapeHtml(lx.rep_concierge_step, locale)}</p>
<ul class="list-disc pl-6 space-y-2 my-4">
${ev.highlights.map((h) => `<li>${escapeHtml(h, locale)}</li>`).join('\n')}
</ul>
<p>${linkTag(repNye, `REPVBLIC ${lx.nye}`, locale)} · ${linkTag(repClub, `REPVBLIC ${lx.city}`, locale)} · <a href="https://wa.me/393519127047" class="underline decoration-current/55 underline-offset-4">WhatsApp +39 351 912 7047</a>.</p>`;

  const s2Raw = `<h3>Piazza della Repubblica, Porta Nuova &amp; International District</h3>
<p>${escapeHtml(cp.intro[0], locale)} ${escapeHtml(cp.intro[1], locale)} ${escapeHtml(lx22.winter_rep || cp.gattopardoCitylife.fiftyFiveRepvblicDetail, locale)}</p>
<h3>${escapeHtml(cp.h3[7], locale)}</h3>
${repubblicaTable}
<h3>${escapeHtml(cp.h3[8], locale)}</h3>
<p>${escapeHtml(cp.gattopardoCitylife.gattopardoDetail, locale)} ${escapeHtml(cp.gattopardoCitylife.voyaDetail, locale)}</p>
<p>${linkTag(carlGuide, 'Carlsberg Øl 75 EUR', locale)} · ${linkTag(regGuide, lx22.reg_short, locale)} · ${linkTag(clubGuide, lx22.cal_short, locale)}.</p>`;

  const s3Raw = `<h3>${escapeHtml(cp.h3[3], locale)}</h3>
<p>${escapeHtml(cp.sempioneBreraComo.justMeLead, locale)} ${escapeHtml(cp.sempioneBreraComo.pinetaClubLead, locale)}</p>
<h3>${escapeHtml(cp.h3[4], locale)}</h3>
<p>${escapeHtml(cp.sempioneBreraComo.corsoComoLead, locale)}</p>
<h3>${escapeHtml(cp.h3[5], locale)}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.sempioneBreraComo.bullets.map((b) => `<li>${escapeHtml(b, locale)}</li>`).join('\n')}
</ul>`;

  const s4Raw = `<h3>${escapeHtml(cp.h3[9], locale)}</h3>
<p>${escapeHtml(cp.reggaetonNavigliSanSiro.gateAriaDetail, locale)} ${escapeHtml(cp.reggaetonNavigliSanSiro.navigliEastDetail, locale)}</p>
<h3>${escapeHtml(cp.h3[11], locale)}</h3>
<p>${escapeHtml(cp.reggaetonNavigliSanSiro.gardaTomDetail, locale)}</p>
<h3>${escapeHtml(cp.h3[10], locale)}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.reggaetonNavigliSanSiro.bullets.map((b) => `<li>${escapeHtml(b, locale)}</li>`).join('\n')}
</ul>
<p>${linkTag(genreUrl('house', locale), 'Tech House & House', locale)} · ${linkTag(genreUrl('hip-hop', locale), 'Hip-Hop & Trap', locale)} · ${linkTag(genreUrl('reggaeton', locale), 'Reggaeton & Movida', locale)}.</p>`;

  const s5Raw = `<h3>${escapeHtml(cp.h3[12], locale)}</h3>
<p>${escapeHtml(cp.doorPolicyAndClosed.dressCodeDetail, locale)}</p>
<h3>${escapeHtml(cp.h3[13], locale)}</h3>
<p>${escapeHtml(cp.doorPolicyAndClosed.allMaleBottleDetail, locale)}</p>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.doorPolicyAndClosed.checklist.map((c) => `<li>${escapeHtml(c, locale)}</li>`).join('\n')}
</ul>
<h3>${escapeHtml(cp.h3[14], locale)}</h3>
<p>${escapeHtml(cp.doorPolicyAndClosed.closedAlertDetail, locale)}</p>
${sanitizeText(buildClosedVenuesHtml(locale), locale)}`;

  const s6Raw = `<h3>${escapeHtml(cp.h3[15], locale)}</h3>
<p>${escapeHtml(lx.rep_concierge_step, locale)} ${escapeHtml(cp.conciergeAndTransit.conciergeDetail, locale)}</p>
<ol class="list-decimal pl-6 space-y-2 my-4">
${cp.conciergeAndTransit.steps.map((st) => `<li>${escapeHtml(st, locale)}</li>`).join('\n')}
</ol>
<h3>${escapeHtml(cp.h3[16], locale)}</h3>
<p>${escapeHtml(cp.conciergeAndTransit.metroParkingDetail, locale)}</p>
<h3>${escapeHtml(cp.h3[17], locale)}</h3>
<p>${escapeHtml(cp.conciergeAndTransit.termeCrossLink, locale)} ${escapeHtml(cp.overview.tableLead, locale)}</p>
${sanitizeText(buildPartner18MatrixHtml(locale), locale)}
<p>${linkTag(repClub, `REPVBLIC ${lx.city}`, locale)} · ${linkTag(capodannoPath(locale), cp.conciergeAndTransit.nyeHubCta, locale)} · <a href="https://wa.me/393519127047" class="underline decoration-current/55 underline-offset-4">${escapeHtml(cp.conciergeAndTransit.whatsappCta, locale)}</a> | <a href="mailto:concierge@nightlifemilan.com" class="underline decoration-current/55 underline-offset-4">concierge@nightlifemilan.com</a>.</p>`;

  const out: RenderedGuide = {
    title: stripExternalTicketingForRepvblic(sanitizeText(lx.rep_title, locale)),
    excerpt: stripExternalTicketingForRepvblic(sanitizeText(lx.rep_exc, locale)),
    sections: [
      { heading: sanitizeText(`1. REPVBLIC ${lx.city} · Piazza della Repubblica 12 (${lx.nye})`, locale), content: stripExternalTicketingForRepvblic(s1Raw) },
      { heading: sanitizeText(cp.h2[2], locale), content: stripExternalTicketingForRepvblic(s2Raw) },
      { heading: sanitizeText(cp.h2[1], locale), content: stripExternalTicketingForRepvblic(s3Raw) },
      { heading: sanitizeText(cp.h2[3], locale), content: stripExternalTicketingForRepvblic(s4Raw) },
      { heading: sanitizeText(cp.h2[4], locale), content: stripExternalTicketingForRepvblic(s5Raw) },
      { heading: sanitizeText(cp.h2[5], locale), content: stripExternalTicketingForRepvblic(s6Raw) },
    ],
    faqs: composeFaqs(lx.rep_faq_q, lx.rep_faq_a, cp.faqs, locale).map((f) => ({
      question: stripExternalTicketingForRepvblic(f.question),
      answer: stripExternalTicketingForRepvblic(f.answer),
    })),
  };
  CAPODANNO_BATCH_CACHE.set(ck, out);
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

export function applyGscCapodannoBatch20261125(guidesList: Guide[]): void {
  const upgrades: Array<{
    id: string;
    renderer: (loc: LocaleCode) => RenderedGuide;
    genres: MusicGenre[];
    hero: string;
  }> = [
    {
      id: 'g-15',
      renderer: renderJustMeGuide,
      genres: [MusicGenre.HOUSE, MusicGenre.COMMERCIAL, MusicGenre.REGGAETON],
      hero: '/images/guides-editorial/just-me-pavilion.webp',
    },
    {
      id: 'g-16',
      renderer: renderPinetaGuide,
      genres: [MusicGenre.HOUSE, MusicGenre.COMMERCIAL, MusicGenre.HIP_HOP],
      hero: '/images/guides-editorial/pineta-lounge.webp',
    },
    {
      id: 'g-18',
      renderer: renderVoyaGuide,
      genres: [MusicGenre.HOUSE, MusicGenre.COMMERCIAL],
      hero: '/images/guides-editorial/voya-rooftop-20f.webp',
    },
    {
      id: 'g-20',
      renderer: renderRepvblicGuide,
      genres: [MusicGenre.HOUSE, MusicGenre.HIP_HOP, MusicGenre.REGGAETON],
      hero: '/images/guides-editorial/repvblic-club.webp',
    },
  ];

  for (const up of upgrades) {
    const idx = guidesList.findIndex((g) => g.id === up.id);
    if (idx !== -1) {
      const existing = guidesList[idx];
      const fallbackMap = GUIDE_100_SLUGS_MAP[up.id];
      const mergedSlugs = { ...(fallbackMap || {}), ...(existing.slugs || {}) } as Record<LocaleCode, string>;
      guidesList[idx] = buildLazyGuide(
        up.id,
        mergedSlugs,
        up.renderer,
        up.genres,
        up.hero,
        existing.datePublished || '2026-10-01',
      );
    }
  }

  if (!guidesList.some((g) => g.id === 'g-125')) {
    guidesList.push(
      buildLazyGuide(
        'g-125',
        GUIDE_100_SLUGS_MAP['g-125'] as Record<LocaleCode, string>,
        renderCarlsbergGuide,
        [MusicGenre.LIVE_MUSIC, MusicGenre.COMMERCIAL, MusicGenre.HOUSE],
        '/images/seo-events/master/carlsberg-ol-01.webp',
        '2026-11-25',
      ),
    );
  }
}
