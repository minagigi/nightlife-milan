// Nightly GSC Batch (2026-11-27): 3 New Pillar Guides + 2 Full In-Place Upgrades across all 35 locales.
// g-132 (NUOVA_GUIDA): Discoteca Milano 2026/2027 (guida-discoteca-milano-2027)
// g-133 (NUOVA_GUIDA): Capodanno Milano 2027 (guida-capodanno-milano-2027)
// g-134 (NUOVA_GUIDA): Club Techno Milano 2026/2027 (guida-club-techno-milano-2027)
// g-45  (POTENZIA):    Festa di Laurea Milano Bicocca (guida-festa-laurea-bicocca)
// g-40  (POTENZIA):    The Grace Club & Super Club Milano (guida-the-grace-club-milano-tavoli-vip-dress-code)
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
import { TERME_PILLAR_35 } from './i18n/pillarTerme35';
import { CLUBBING_PILLAR_35 } from './i18n/pillarClubbing35';
import { GSC_BATCH_20261122_LEX } from './i18n/pillarGuides20261122';
import { GSC_BATCH_20261127_LEX } from './i18n/pillarGuides20261127';
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
    .replace(/Priv[eé] Cavalli/gi, 'VIP Lounge')
    .replace(/diritti di prenotazione/gi, 'Servizio di Conciergerie e Transaction Fees')
    .replace(/diritti d['’]agenzia/gi, 'commissioni');
  if (locale === 'ro') {
    base = base
      .replace(/\u015f/g, 'ș')
      .replace(/\u015e/g, 'Ș')
      .replace(/\u0163/g, 'ț')
      .replace(/\u0162/g, 'Ț');
  }
  if (locale === 'it') {
    base = base
      .replace(/\bPrive\b/g, 'Privé')
      .replace(/\bprive\b/g, 'privé')
      .replace(/\bPrivè\b/g, 'Privé')
      .replace(/\bprivè\b/g, 'privé')
      .replace(/\bCitta\b/g, 'Città')
      .replace(/\bUniversita\b/g, 'Università')
      .replace(/\bEta\b/g, 'Età')
      .replace(/\bpiu\b/g, 'più')
      .replace(/\bgala\b/g, 'galà')
      .replace(/\bgiovedi\b/g, 'giovedì')
      .replace(/\bmercoledi\b/g, 'mercoledì')
      .replace(/\bvenerdi\b/g, 'venerdì');
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

function clubsHubUrl(locale: LocaleCode): string {
  return `${localePrefix(locale)}/${getLocalizedDir35('clubs', locale)}`;
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

const BATCH_20261127_CACHE = new Map<string, RenderedGuide>();

export function getGsc20261127DisplayHeadline(guideId: string, locale: LocaleCode): string | null {
  const lx = GSC_BATCH_20261127_LEX[locale] || GSC_BATCH_20261127_LEX.en;
  if (guideId === 'g-132') return sanitizeText(lx.dis_disp, locale);
  if (guideId === 'g-133') return sanitizeText(lx.cap_disp, locale);
  if (guideId === 'g-134') return sanitizeText(lx.tec_disp, locale);
  if (guideId === 'g-45') return sanitizeText(lx.bic_disp, locale);
  if (guideId === 'g-40') return sanitizeText(lx.gra_disp, locale);
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
  baseFaqs: [string, string][],
  locale: LocaleCode,
): Array<{ question: string; answer: string }> {
  const merged: Array<[string, string]> = [[firstQ, firstA], ...baseFaqs];
  return merged.slice(0, 6).map(([q, a]) => ({
    question: sanitizeText(q, locale),
    answer: sanitizeText(a, locale),
  }));
}

// ─── 1. g-132 (NUOVA_GUIDA): DISCOTECA MILANO 2026/2027 ─────────────────────────
function renderDiscotecaMilanoGuide(locale: LocaleCode): RenderedGuide {
  const ck = `g-132:${locale}`;
  const hit = BATCH_20261127_CACHE.get(ck);
  if (hit) return hit;

  const lx = GSC_BATCH_20261127_LEX[locale] || GSC_BATCH_20261127_LEX.en;
  const lx22 = GSC_BATCH_20261122_LEX[locale] || GSC_BATCH_20261122_LEX.en;
  const cp = CLUBBING_PILLAR_35[locale] || CLUBBING_PILLAR_35.en;
  const tl = cp.tableLabels;

  const dirClubs = clubsHubUrl(locale);
  const jmClub = clubUrl('just-me-milano', locale);
  const pinClub = clubUrl('pineta-club-milano', locale);
  const fifClub = clubUrl('55-milano', locale);
  const voyaClub = clubUrl('voya-rooftop-milan', locale);
  const repClub = clubUrl('repvblic-milano', locale);
  const tcClub = clubUrl('the-club-milano', locale);
  const gattoClub = clubUrl('gattopardo-milano', locale);
  const gateClub = clubUrl('gate-milano', locale);
  const bobClub = clubUrl('bobino-milano', locale);
  const magClub = clubUrl('magazzini-generali-milano', locale);
  const supClub = clubUrl('super-club-milano', locale);
  const bottleGuide = guideUrl('g-vip-bottle-prices', locale);
  const dressGuide = guideUrl('g-dress-code', locale);
  const calGuide = guideUrl('g-weekly-calendar', locale);
  const partnerGuide = guideUrl('g-118', locale);

  const tierComparisonTable = makeTable(
    [tl.thFormula, tl.thDistrict, tl.thWeeklyRef, tl.thDressCode, tl.thStatus],
    [
      ['Just Me Milano (ex Just Cavalli · 7/7)', 'Parco Sempione · Viale Camoens 2 (Torre Branca)', tl.justMeRates, tl.dressSmartChic, linkTag(jmClub, '0% Partner', locale)],
      ['Pineta Milano (Luxury Hall & Show)', 'Porta Garibaldi · Via Messina 38 (M5 Cenisio)', tl.pinetaRates, tl.dressSmartChic, linkTag(pinClub, '0% Partner', locale)],
      ['55 Milano (1.000 sqm Sempione Loft)', 'Sempione · Via Piero della Francesca 55', tl.fiftyFiveRates, tl.dressSmartChic, linkTag(fifClub, 'WhatsApp 0%', locale)],
      ['Voya Rooftop 20F (Panoramic Club)', 'CityLife / Portello · Viale Achille Papa 30', tl.voyaRates, tl.dressBlackTie, linkTag(voyaClub, tl.statusConfirmed, locale)],
      ['REPVBLIC Milano (Boutique Club)', 'Repubblica · Piazza della Repubblica 12 (M3)', tl.repvblicRates, tl.dressEveningElegance, linkTag(repClub, 'WhatsApp 0%', locale)],
      ['The Club Milano (Tue-Sun Arena)', 'Brera / Moscova · Corso Garibaldi 97 (M2)', tl.theClubRates, tl.dressSmartChic, linkTag(tcClub, tl.statusConfirmed, locale)],
      ['Il Gattopardo (Deconsecrated Church)', 'Sempione · Via Piero della Francesca 47', tl.gattopardoRates, tl.dressEveningElegance, linkTag(gattoClub, tl.statusConfirmed, locale)],
      ['Gate · Magazzini · Bobino · Super Club', 'Isola (M5) · Ripamonti · Navigli & Tortona', '15-25 EUR · VIP 250-1.200 EUR', tl.dressUrbanChic, linkTag(supClub, tl.statusConfirmed, locale)],
    ],
    locale,
    true,
  );

  const weeklyScheduleTable = makeTable(
    [tl.thFormula, tl.thVenue, tl.thDistrict, tl.thWeeklyRef],
    [
      ['Mon - Tue (International & University)', 'Just Me · The Club · Hollywood · REPVBLIC', 'Sempione · Brera · Corso Como · Repubblica', '15-25 EUR · VIP 250-500 EUR'],
      ['Wed - Thu (Aperitivo, Singing Dinner & Club)', 'Pineta · 55 Milano · The Grace Club · Volt', 'Cenisio · Sempione · Vetra M4', '20-50 EUR Dinner · VIP 250-600 EUR'],
      ['Friday Peak Night (20:30 Dinner -> 05:00)', 'Just Me · Pineta · Voya 20F · 55 · Gattopardo · Gate', 'M5 Lilla & M2 Garibaldi Corridors', '20-30 EUR · VIP 300-1.500 EUR'],
      ['Saturday Flagship (20:30 Gala -> 05:30)', 'All 18 Partner Venues + Amnesia & Super Club', 'Citywide M1-M5 + Guarded Garages', '20-35 EUR · VIP 350-2.500 EUR'],
      ['Sunday Aperitivo & Late Night', 'Just Me Torre Branca · Bobino · Tocqueville 13', 'Parco Sempione · Navigli · Corso Como', '15-30 EUR · VIP 250-600 EUR'],
    ],
    locale,
  );

  const s1 = `<h3>${escapeHtml(lx.dis_h3, locale)}</h3>
<p>${escapeHtml(lx.dis_lead, locale)}</p>
<p>${escapeHtml(lx.dis_deep, locale)}</p>
<h3>${escapeHtml(cp.h3[0], locale)}</h3>
${tierComparisonTable}
<h3>${escapeHtml(cp.h3[1], locale)}</h3>
<p>${linkTag(dirClubs, lx.dis_disp, locale)} · ${linkTag(partnerGuide, '18 Partner Clubs', locale)} · ${linkTag(bottleGuide, 'VIP Bottle List', locale)} · ${linkTag(dressGuide, 'Dress Code', locale)} · ${linkTag(calGuide, 'Lun-Dom Calendar', locale)} · ${linkTag(gateClub, 'Gate Milano', locale)} · ${linkTag(bobClub, 'Bobino Navigli', locale)} · ${linkTag(magClub, 'Magazzini Generali', locale)}.</p>`;

  const s2 = `<h3>${escapeHtml(cp.h3[2], locale)}</h3>
<p>${escapeHtml(cp.intro[0], locale)} ${escapeHtml(cp.intro[1], locale)}</p>
<h3>${escapeHtml(cp.h3[5], locale)}</h3>
${weeklyScheduleTable}
<h3>${escapeHtml(cp.h3[3], locale)}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.sempioneBreraComo.bullets.map((b) => `<li>${escapeHtml(b, locale)}</li>`).join('\n')}
</ul>`;

  const s3 = `<h3>${escapeHtml(cp.h3[4], locale)}</h3>
<p>${escapeHtml(cp.sempioneBreraComo.justMeLead, locale)} ${escapeHtml(cp.sempioneBreraComo.pinetaClubLead, locale)} ${escapeHtml(cp.sempioneBreraComo.corsoComoLead, locale)}</p>
<h3>${escapeHtml(cp.h3[6], locale)}</h3>
<p>${escapeHtml(cp.gattopardoCitylife.gattopardoDetail, locale)} ${escapeHtml(cp.gattopardoCitylife.voyaDetail, locale)}</p>
<h3>${escapeHtml(cp.h3[7], locale)}</h3>
<p>${escapeHtml(lx22.winter_rep || cp.gattopardoCitylife.fiftyFiveRepvblicDetail, locale)}</p>`;

  const s4 = `<h3>${escapeHtml(cp.h3[9], locale)}</h3>
<p>${escapeHtml(cp.reggaetonNavigliSanSiro.navigliEastDetail, locale)} ${escapeHtml(cp.reggaetonNavigliSanSiro.gateAriaDetail, locale)}</p>
<h3>${escapeHtml(cp.h3[11], locale)}</h3>
<p>${escapeHtml(cp.reggaetonNavigliSanSiro.gardaTomDetail, locale)}</p>
<h3>${escapeHtml(cp.h3[8], locale)}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.reggaetonNavigliSanSiro.bullets.map((b) => `<li>${escapeHtml(b, locale)}</li>`).join('\n')}
</ul>
<p>${linkTag(zoneUrl('parco-sempione', locale), 'Parco Sempione', locale)} · ${linkTag(zoneUrl('corso-como', locale), 'Corso Como & Garibaldi', locale)} · ${linkTag(zoneUrl('brera', locale), 'Brera', locale)} · ${linkTag(zoneUrl('navigli', locale), 'Navigli', locale)} · ${linkTag(genreUrl('house', locale), 'House', locale)} · ${linkTag(genreUrl('commercial', locale), 'Commercial', locale)}.</p>`;

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
<p>${linkTag(dirClubs, lx.dis_disp, locale)} · ${linkTag(capodannoPath(locale), cp.conciergeAndTransit.nyeHubCta, locale)} · <a href="https://wa.me/393519127047" class="underline decoration-current/55 underline-offset-4">${escapeHtml(cp.conciergeAndTransit.whatsappCta, locale)}</a> | <a href="mailto:concierge@nightlifemilan.com" class="underline decoration-current/55 underline-offset-4">concierge@nightlifemilan.com</a>.</p>`;

  const out: RenderedGuide = {
    title: sanitizeText(lx.dis_title, locale),
    excerpt: sanitizeText(lx.dis_exc, locale),
    sections: [
      { heading: sanitizeText(lx.dis_h2, locale), content: s1 },
      { heading: sanitizeText(cp.h2[1], locale), content: s2 },
      { heading: sanitizeText(cp.h2[2], locale), content: s3 },
      { heading: sanitizeText(cp.h2[3], locale), content: s4 },
      { heading: sanitizeText(cp.h2[4], locale), content: s5 },
      { heading: sanitizeText(cp.h2[5], locale), content: s6 },
    ],
    faqs: composeFaqs(lx.dis_faq_q, lx.dis_faq_a, cp.faqs, locale),
  };
  BATCH_20261127_CACHE.set(ck, out);
  return out;
}

// ─── 2. g-133 (NUOVA_GUIDA): CAPODANNO MILANO 2027 ──────────────────────────────
function renderCapodannoMilano2027Guide(locale: LocaleCode): RenderedGuide {
  const ck = `g-133:${locale}`;
  const hit = BATCH_20261127_CACHE.get(ck);
  if (hit) return hit;

  const lx = GSC_BATCH_20261127_LEX[locale] || GSC_BATCH_20261127_LEX.en;
  const lx22 = GSC_BATCH_20261122_LEX[locale] || GSC_BATCH_20261122_LEX.en;
  const cp = CLUBBING_PILLAR_35[locale] || CLUBBING_PILLAR_35.en;
  const tp = TERME_PILLAR_35[locale] || TERME_PILLAR_35.en;
  const tl = cp.tableLabels;

  const masterNye = capodannoCategoryPath('capodanno-2027', locale);
  const discoCat = capodannoCategoryPath('capodanno-discoteche-milano', locale);
  const cenoneCat = capodannoCategoryPath('capodanno-locali-cenone-milano', locale);
  const rooftopCat = capodannoCategoryPath('capodanno-rooftop-milano', locale);
  const famCat = capodannoCategoryPath('capodanno-famiglie-bambini-milano', locale);
  const jmNye = capodannoEventPath('capodanno-justme-milano-torre-branca', locale);
  const pinNye = capodannoEventPath('capodanno-pineta-milano', locale);
  const voyaNye = capodannoEventPath('capodanno-voya-rooftop-milano', locale);
  const repNye = capodannoEventPath('capodanno-repvblic-milano', locale);
  const fifNye = capodannoEventPath('capodanno-55-milano', locale);
  const magNye = capodannoEventPath('capodanno-magazzini-generali-milano', locale);
  const bobNye = capodannoEventPath('capodanno-bobino-milano', locale);
  const tcNye = capodannoEventPath('capodanno-the-club-milano', locale);
  const mibNye = capodannoEventPath('capodanno-mib-milano-piazza-affari', locale);
  const daziNye = capodannoEventPath('capodanno-dazi-milano-arco-della-pace', locale);
  const gardaNye = capodannoEventPath('capodanno-justme-garda-lake', locale);
  const carlGuide = guideUrl('g-125', locale);
  const cenGuide = guideUrl('g-127', locale);
  const termeGuide = guideUrl('g-117', locale);

  const nyePriorityTable = makeTable(
    [tl.thVenue, tl.thDistrict, tl.thNye2027, tl.thDressCode, tl.thStatus],
    [
      ['Just Me Milano (ex Just Cavalli · Torre Branca)', 'Parco Sempione · Viale Camoens 2', '300 EUR Gatsby Gala · 80 EUR Party', tl.dressBlackTie, linkTag(jmNye, '0% Partner', locale)],
      ['Pineta Milano (Moulin Rouge Dinner & Club)', 'Garibaldi · Via Messina 38 (M5 Cenisio)', '160 EUR Gala · 40 EUR Buffet · VIP 300+', tl.dressSmartChic, linkTag(pinNye, '0% Partner', locale)],
      ['Voya Rooftop 20F (6-Course Skyline Gala)', 'CityLife · Viale Achille Papa 30 (M5)', '300 EUR Menu (360 Online) · VIP 500+', tl.dressBlackTie, linkTag(voyaNye, tl.statusConfirmed, locale)],
      ['REPVBLIC Milano (Repubblica VIP Club)', 'Piazza della Repubblica 12 (M3)', 'VIP Tables 300 / 600 EUR (WhatsApp)', tl.dressEveningElegance, linkTag(repNye, 'WhatsApp 0%', locale)],
      ['55 Milano (La Dolce Vita Sempione)', 'Via Piero della Francesca 55 (M5)', '160 EUR Gala · 100 Buffet · 30-50 Party', tl.dressEveningElegance, linkTag(fifNye, 'WhatsApp 0%', locale)],
      ['Magazzini Generali & Bobino Navigli', 'Via Pietrasanta 16 & Stazione Genova 4', '35-120 EUR · VIP 400-750 EUR', tl.dressSmartChic, linkTag(magNye, tl.statusConfirmed, locale)],
      ['The Club Milano & Carlsberg Øl Famiglie', 'Corso Garibaldi 97 & Porta Nuova 9', 'The Club Party · Carlsberg 75 EUR DOCG', tl.dressSmartChic, linkTag(carlGuide, tl.statusConfirmed, locale)],
      ['MIB Piazza Affari · Dazi · JustMe Garda', 'Cordusio · Arco della Pace · Lago di Garda', '20 - 160 EUR · VIP 250-2.000 EUR', tl.dressEveningElegance, linkTag(gardaNye, tl.statusConfirmed, locale)],
    ],
    locale,
    true,
  );

  const budgetTiersTable = makeTable(
    [tl.thFormula, tl.thNye2027, tl.thVenue, tl.thDistrict],
    [
      ['After-Dinner Club Entry (23:00 / 00:30)', '20 - 80 EUR (1 Drink)', 'Gate (20-50) · JustMe Garda (20) · Bobino / MIB / 55 / Grace / Super (30-50) · Just Me (80)', 'M1 - M5 Night Metro & Garda'],
      ['Royal Standing Gala Buffet (20:30)', '40 - 100 EUR', 'Pineta (40) · JustMe Garda / MIB / Apollo / Grace / Super (70) · 55 Milano (100)', 'Garibaldi · Sempione · Navigli'],
      ['Family & Group All-Inclusive Dinner', '75 - 100 EUR', 'Carlsberg Øl Porta Nuova (75 EUR DOCG) · Villa Fenaroli Brescia (100 EUR / 50 Kids)', 'M2 Moscova / Garibaldi & Rezzato'],
      ['Seated Gala Dinner + Midnight Club', '120 - 200 EUR', 'Bobino (120) · Il Marchese (150) · Pineta / 55 / MIB / Dazi (160) · Radio 10F (200)', 'Centro · Sempione · Porta Nuova'],
      ['5-Star Rooftop, Tower & Thermal Spa', '198 - 380 EUR', 'Sirmione Spa (198) · Just Me / Duomo 21 / Voya 20F (300) · MA.RE 2-Michelin (380)', 'Sempione · Duomo · CityLife · Garda'],
    ],
    locale,
  );

  const s1 = `<h3>${escapeHtml(lx.cap_h3, locale)}</h3>
<p>${escapeHtml(lx.cap_lead, locale)}</p>
<p>${escapeHtml(lx.cap_deep, locale)}</p>
<h3>${escapeHtml(cp.h3[0], locale)}</h3>
${nyePriorityTable}
<h3>${escapeHtml(cp.h3[1], locale)}</h3>
${budgetTiersTable}
<p>${linkTag(masterNye, lx.cap_disp, locale)} · ${linkTag(discoCat, 'Discoteche 2027', locale)} · ${linkTag(cenoneCat, 'Cenoni 2027', locale)} · ${linkTag(rooftopCat, 'Rooftop 2027', locale)} · ${linkTag(famCat, 'Famiglie 75 EUR', locale)} · ${linkTag(bobNye, 'Bobino', locale)} · ${linkTag(tcNye, 'The Club', locale)} · ${linkTag(mibNye, 'MIB', locale)} · ${linkTag(daziNye, 'Dazi', locale)}.</p>`;

  const s2 = `<h3>${escapeHtml(cp.h3[3], locale)}</h3>
<p>${escapeHtml(cp.intro[0], locale)} ${escapeHtml(cp.sempioneBreraComo.justMeLead, locale)}</p>
<h3>${escapeHtml(cp.h3[4], locale)}</h3>
<p>${escapeHtml(cp.sempioneBreraComo.pinetaClubLead, locale)} ${escapeHtml(cp.sempioneBreraComo.corsoComoLead, locale)}</p>
<h3>${escapeHtml(cp.h3[5], locale)}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.sempioneBreraComo.bullets.map((b) => `<li>${escapeHtml(b, locale)}</li>`).join('\n')}
</ul>`;

  const s3 = `<h3>${escapeHtml(cp.h3[6], locale)}</h3>
<p>${escapeHtml(cp.gattopardoCitylife.gattopardoDetail, locale)} ${escapeHtml(cp.gattopardoCitylife.voyaDetail, locale)}</p>
<h3>${escapeHtml(cp.h3[7], locale)}</h3>
<p>${escapeHtml(lx22.winter_rep || cp.gattopardoCitylife.fiftyFiveRepvblicDetail, locale)}</p>
<h3>${escapeHtml(tp.h3[1], locale)}</h3>
<p>${escapeHtml(tp.sirmione.overview, locale)} ${escapeHtml(tp.qcTerme.waitlistPolicy, locale)}</p>
<p>${linkTag(cenGuide, 'Cenone Vicino a Me', locale)} · ${linkTag(termeGuide, 'Sirmione 198 EUR & QC Terme', locale)}.</p>`;

  const s4 = `<h3>${escapeHtml(cp.h3[9], locale)}</h3>
<p>${escapeHtml(cp.reggaetonNavigliSanSiro.navigliEastDetail, locale)} ${escapeHtml(cp.reggaetonNavigliSanSiro.gateAriaDetail, locale)}</p>
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
<p>${linkTag(masterNye, cp.conciergeAndTransit.nyeHubCta, locale)} · <a href="https://wa.me/393519127047" class="underline decoration-current/55 underline-offset-4">${escapeHtml(cp.conciergeAndTransit.whatsappCta, locale)}</a> | <a href="mailto:concierge@nightlifemilan.com" class="underline decoration-current/55 underline-offset-4">concierge@nightlifemilan.com</a>.</p>`;

  const out: RenderedGuide = {
    title: sanitizeText(lx.cap_title, locale),
    excerpt: sanitizeText(lx.cap_exc, locale),
    sections: [
      { heading: sanitizeText(lx.cap_h2, locale), content: s1 },
      { heading: sanitizeText(cp.h2[1], locale), content: s2 },
      { heading: sanitizeText(cp.h2[2], locale), content: s3 },
      { heading: sanitizeText(cp.h2[3], locale), content: s4 },
      { heading: sanitizeText(cp.h2[4], locale), content: s5 },
      { heading: sanitizeText(cp.h2[5], locale), content: s6 },
    ],
    faqs: composeFaqs(lx.cap_faq_q, lx.cap_faq_a, cp.faqs, locale),
  };
  BATCH_20261127_CACHE.set(ck, out);
  return out;
}

// ─── 3. g-134 (NUOVA_GUIDA): CLUB TECHNO MILANO 2026/2027 ───────────────────────
function renderClubTechnoMilanoGuide(locale: LocaleCode): RenderedGuide {
  const ck = `g-134:${locale}`;
  const hit = BATCH_20261127_CACHE.get(ck);
  if (hit) return hit;

  const lx = GSC_BATCH_20261127_LEX[locale] || GSC_BATCH_20261127_LEX.en;
  const lx22 = GSC_BATCH_20261122_LEX[locale] || GSC_BATCH_20261122_LEX.en;
  const cp = CLUBBING_PILLAR_35[locale] || CLUBBING_PILLAR_35.en;
  const tl = cp.tableLabels;

  const tecGenre = genreUrl('techno', locale);
  const afroGenre = genreUrl('afro-house', locale);
  const houseGenre = genreUrl('house', locale);
  const voltClub = clubUrl('volt-club-milano', locale);
  const amnClub = clubUrl('amnesia-milano', locale);
  const gateClub = clubUrl('gate-milano', locale);
  const magClub = clubUrl('magazzini-generali-milano', locale);
  const supClub = clubUrl('super-club-milano', locale);
  const apoClub = clubUrl('apollo-club-milano', locale);
  const gateNye = capodannoEventPath('capodanno-gate-milano', locale);
  const amnNye = capodannoEventPath('capodanno-amnesia-milano', locale);
  const tunNye = capodannoEventPath('capodanno-tunnel-club-milano', locale);
  const supNye = capodannoEventPath('capodanno-superclub-milano-tortona', locale);
  const voltNye = capodannoEventPath('capodanno-volt-club-milano', locale);
  const tecNyeCat = capodannoCategoryPath('capodanno-techno-elettronica-milano', locale);
  const voltGuide = guideUrl('g-23', locale);
  const graceSuperGuide = guideUrl('g-40', locale);

  const technoRoomsTable = makeTable(
    [tl.thVenue, tl.thDistrict, tl.thMusic, tl.thWeeklyRef, tl.thStatus],
    [
      ['Volt Club Milano', 'Via Molino delle Armi 16 (M4 Vetra)', 'Melodic Techno, Underground House', '20-30 EUR · VIP 350-2.500 EUR', linkTag(voltClub, tl.statusBenchmark, locale)],
      ['Amnesia Milano', 'Via Alfonso Gatto 14 (M4 Repetti)', 'Peak-Time Techno, Tech-House', '20-35 EUR · VIP 400-1.200 EUR', linkTag(amnClub, tl.statusConfirmed, locale)],
      ['Gate Milano (Scalo Farini)', 'Via Valtellina 21 (M5 Isola / Garibaldi)', 'Electronic, Warehouse & Club Formats', '15-25 EUR · VIP 300-700 EUR', linkTag(gateClub, tl.statusConfirmed, locale)],
      ['Tunnel Club Milano', 'Via Giovanni Battista Sammartini 30 (M2/M3)', 'Raw Techno, Electro, EBM & Underground', '15-25 EUR · VIP 300-800 EUR', linkTag(tunNye, tl.statusConfirmed, locale)],
      ['Super Club Milano (Void Audio)', 'Via Tortona 27 (M2 Porta Genova · 380 sqm)', 'Electronic, Show Lighting & Boutique Sets', 'Event-Based · NYE 40-140 EUR', linkTag(supClub, tl.statusConfirmed, locale)],
      ['Tempio del Futuro Perduto & Masada', 'Via Luigi Nono 9 (M5) & Viale Espinasse 41', 'Industrial Techno, Vinyl & Day-to-Night', '15-25 EUR Cultural / Club Entry', linkTag(tecGenre, tl.statusBenchmark, locale)],
      ['Magazzini Generali & Apollo Navigli', 'Via Pietrasanta 16 & Via Giosue Borsi 9/2', 'Guest DJ Showcases, Afro & Deep House', '15-30 EUR · VIP 250-1.400 EUR', linkTag(magClub, tl.statusConfirmed, locale)],
    ],
    locale,
    true,
  );

  const technoNyeTable = makeTable(
    [tl.thVenue, tl.thNye2027, tl.thDressCode, tl.thStatus],
    [
      ['Amnesia Milano (31/12 Marathon)', '40 EUR Party · 70 Buffet · 140 Gala · VIP 350-1.200 EUR', tl.dressUrbanChic, linkTag(amnNye, tl.statusConfirmed, locale)],
      ['Tunnel Club Centrale (Railway Vaults)', '40 EUR Party · 70 Buffet · 140 Gala · VIP 350-1.200 EUR', tl.dressUrbanChic, linkTag(tunNye, tl.statusConfirmed, locale)],
      ['Super Club Tortona (Void Acoustics)', '40 EUR Party · 70 Buffet · 140 Gala · VIP 350-1.200 EUR', tl.dressUrbanChic, linkTag(supNye, tl.statusConfirmed, locale)],
      ['Gate Milano Isola (NYE Special)', '20 - 50 EUR Release Tiers · VIP 500 / 600 EUR (10 pax)', tl.dressUrbanChic, linkTag(gateNye, tl.statusConfirmed, locale)],
      ['Volt Club Milano (Via Molino delle Armi)', 'Official Free Concierge Waitlist (Program TBA)', tl.dressSmartChic, linkTag(voltNye, tl.statusTba, locale)],
    ],
    locale,
    true,
  );

  const s1 = `<h3>${escapeHtml(lx.tec_h3, locale)}</h3>
<p>${escapeHtml(lx.tec_lead, locale)}</p>
<p>${escapeHtml(lx.tec_deep, locale)}</p>
<h3>${escapeHtml(cp.h3[0], locale)}</h3>
${technoRoomsTable}
<h3>${escapeHtml(cp.h3[1], locale)}</h3>
${technoNyeTable}
<p>${linkTag(tecGenre, lx.tec_disp, locale)} · ${linkTag(tecNyeCat, 'Techno NYE 2027', locale)} · ${linkTag(voltGuide, 'Volt Club Guide', locale)} · ${linkTag(graceSuperGuide, 'Super Club & Grace', locale)} · ${linkTag(apoClub, 'Apollo Navigli', locale)} · ${linkTag(afroGenre, 'Afro-House', locale)} · ${linkTag(houseGenre, 'House', locale)}.</p>`;

  const s2 = `<h3>${escapeHtml(cp.h3[9], locale)}</h3>
<p>${escapeHtml(cp.intro[0], locale)} ${escapeHtml(cp.reggaetonNavigliSanSiro.navigliEastDetail, locale)}</p>
<h3>${escapeHtml(cp.h3[10], locale)}</h3>
<p>${escapeHtml(cp.reggaetonNavigliSanSiro.gateAriaDetail, locale)} ${escapeHtml(cp.reggaetonNavigliSanSiro.gardaTomDetail, locale)}</p>
<h3>${escapeHtml(cp.h3[11], locale)}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.reggaetonNavigliSanSiro.bullets.map((b) => `<li>${escapeHtml(b, locale)}</li>`).join('\n')}
</ul>`;

  const s3 = `<h3>${escapeHtml(cp.h3[3], locale)}</h3>
<p>${escapeHtml(cp.sempioneBreraComo.justMeLead, locale)} ${escapeHtml(cp.sempioneBreraComo.pinetaClubLead, locale)}</p>
<h3>${escapeHtml(cp.h3[6], locale)}</h3>
<p>${escapeHtml(cp.gattopardoCitylife.gattopardoDetail, locale)} ${escapeHtml(cp.gattopardoCitylife.voyaDetail, locale)}</p>
<h3>${escapeHtml(cp.h3[7], locale)}</h3>
<p>${escapeHtml(lx22.winter_rep || cp.gattopardoCitylife.fiftyFiveRepvblicDetail, locale)}</p>`;

  const s4 = `<h3>${escapeHtml(cp.h3[4], locale)}</h3>
<p>${escapeHtml(cp.sempioneBreraComo.corsoComoLead, locale)}</p>
<h3>${escapeHtml(cp.h3[5], locale)}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.sempioneBreraComo.bullets.map((b) => `<li>${escapeHtml(b, locale)}</li>`).join('\n')}
</ul>
<h3>${escapeHtml(cp.h3[8], locale)}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.overview.highlights.map((h) => `<li>${escapeHtml(h, locale)}</li>`).join('\n')}
</ul>
<p>${linkTag(zoneUrl('isola', locale), 'Isola & Scalo Farini', locale)} · ${linkTag(zoneUrl('navigli', locale), 'Navigli & Tortona', locale)} · ${linkTag(zoneUrl('ripamonti', locale), 'Ripamonti & Forlanini', locale)}.</p>`;

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
<p>${linkTag(tecGenre, lx.tec_disp, locale)} · ${linkTag(capodannoPath(locale), cp.conciergeAndTransit.nyeHubCta, locale)} · <a href="https://wa.me/393519127047" class="underline decoration-current/55 underline-offset-4">${escapeHtml(cp.conciergeAndTransit.whatsappCta, locale)}</a> | <a href="mailto:concierge@nightlifemilan.com" class="underline decoration-current/55 underline-offset-4">concierge@nightlifemilan.com</a>.</p>`;

  const out: RenderedGuide = {
    title: sanitizeText(lx.tec_title, locale),
    excerpt: sanitizeText(lx.tec_exc, locale),
    sections: [
      { heading: sanitizeText(lx.tec_h2, locale), content: s1 },
      { heading: sanitizeText(cp.h2[3], locale), content: s2 },
      { heading: sanitizeText(cp.h2[1], locale), content: s3 },
      { heading: sanitizeText(cp.h2[2], locale), content: s4 },
      { heading: sanitizeText(cp.h2[4], locale), content: s5 },
      { heading: sanitizeText(cp.h2[5], locale), content: s6 },
    ],
    faqs: composeFaqs(lx.tec_faq_q, lx.tec_faq_a, cp.faqs, locale),
  };
  BATCH_20261127_CACHE.set(ck, out);
  return out;
}

// ─── 4. g-45 (POTENZIA): FESTA DI LAUREA MILANO BICOCCA ─────────────────────────
function renderLaureaBicoccaGuide(locale: LocaleCode): RenderedGuide {
  const ck = `g-45:${locale}`;
  const hit = BATCH_20261127_CACHE.get(ck);
  if (hit) return hit;

  const lx = GSC_BATCH_20261127_LEX[locale] || GSC_BATCH_20261127_LEX.en;
  const lx22 = GSC_BATCH_20261122_LEX[locale] || GSC_BATCH_20261122_LEX.en;
  const cp = CLUBBING_PILLAR_35[locale] || CLUBBING_PILLAR_35.en;
  const tl = cp.tableLabels;

  const privGuide = guideUrl('g-private-parties', locale);
  const dinGuide = guideUrl('g-60', locale);
  const carlGuide = guideUrl('g-125', locale);
  const graceGuide = guideUrl('g-40', locale);
  const bocconiGuide = guideUrl('g-41', locale);
  const polimiGuide = guideUrl('g-44', locale);
  const pinClub = clubUrl('pineta-club-milano', locale);
  const voyaClub = clubUrl('voya-rooftop-milan', locale);
  const fifClub = clubUrl('55-milano', locale);
  const gateClub = clubUrl('gate-milano', locale);
  const tocqClub = clubUrl('tocqueville-13-milano', locale);
  const jmClub = clubUrl('just-me-milano', locale);

  const m5BicoccaStopsTable = makeTable(
    [tl.thDistrict, tl.thVenue, tl.thWeeklyRef, tl.thStatus],
    [
      ['M5 Isola (10 min direct from Bicocca)', 'Gate Milano (Via Valtellina 21)', '15-25 EUR · Grad Tables 300-600 EUR', linkTag(gateClub, tl.statusConfirmed, locale)],
      ['M5 Garibaldi FS (12 min direct)', 'Carlsberg Øl · Tocqueville 13 · Hollywood · 11 Clubroom · Radio 10F', '25-75 EUR Dinner · VIP 300-1.200 EUR', linkTag(tocqClub, tl.statusConfirmed, locale)],
      ['M5 Cenisio (14 min direct)', 'Pineta Milano & The Grace Club (Via Messina 38)', '35-60 EUR Singing Dinner · VIP 250-900 EUR', linkTag(pinClub, '0% Partner', locale)],
      ['M5 Gerusalemme / Domodossola (16 min)', '55 Milano (Via P. della Francesca 55) & Il Gattopardo', '25-55 EUR Aperitivo/Dinner · VIP 300-1.500 EUR', linkTag(fifClub, 'WhatsApp 0%', locale)],
      ['M5 Portello (18 min direct)', 'Voya Rooftop 20° Piano (Viale Achille Papa 30)', 'Skyline Aperitivo & VIP Bottle Tables', linkTag(voyaClub, tl.statusConfirmed, locale)],
      ['Parco Sempione (Taxi 5 min from M5)', 'Just Me Milano (Torre Branca · Open 7/7)', tl.justMeRates, linkTag(jmClub, '0% Partner', locale)],
    ],
    locale,
    true,
  );

  const gradPackagesTable = makeTable(
    [tl.thFormula, tl.thDistrict, tl.thWeeklyRef, tl.thDressCode],
    [
      ['1. Aperitivo di Laurea + Reserved Sofa (20:00 - 23:00)', 'Royal Buffet + 1 Drink + Cake Service + Club Stay', '20 - 35 EUR / guest (min. 10-15 pax)', tl.dressSmartChic],
      ['2. Seated Singing Dinner + Midnight Club (20:30 - 04:30)', '3 Courses + 1 Wine Bottle / 4 pax + Same Venue Party', '40 - 75 EUR / guest (Pineta, 55, Carlsberg, Grace)', tl.dressSmartChic],
      ['3. After-Dinner Dancefloor Bottle Table (from 23:30)', 'Skip-the-Line Entry + 100% Spirit/Champagne Credit', '250 - 350 EUR (6-8 guests · ~35-45 EUR/pax)', tl.dressSmartChic],
      ['4. Raised Privé / Super Privé Combination (20-50 pax)', 'Dedicated Hostess, Custom Sparkler Show & Cake Storage', '500 - 1.200 EUR (100% Bottle Credit)', tl.dressEveningElegance],
    ],
    locale,
  );

  const s1 = `<h3>${escapeHtml(lx.bic_h3, locale)}</h3>
<p>${escapeHtml(lx.bic_lead, locale)}</p>
<p>${escapeHtml(lx.bic_deep, locale)}</p>
<h3>${escapeHtml(cp.h3[0], locale)}</h3>
${m5BicoccaStopsTable}
<h3>${escapeHtml(cp.h3[1], locale)}</h3>
${gradPackagesTable}
<p>${linkTag(privGuide, 'Private & Graduation Hub', locale)} · ${linkTag(dinGuide, 'Cena Cantata Milano', locale)} · ${linkTag(carlGuide, 'Carlsberg Øl Porta Nuova', locale)} · ${linkTag(graceGuide, 'The Grace Club Cenisio', locale)} · ${linkTag(bocconiGuide, 'Bocconi Guide', locale)} · ${linkTag(polimiGuide, 'PoliMi Guide', locale)}.</p>`;

  const s2 = `<h3>${escapeHtml(cp.h3[4], locale)}</h3>
<p>${escapeHtml(cp.intro[0], locale)} ${escapeHtml(cp.sempioneBreraComo.pinetaClubLead, locale)} ${escapeHtml(cp.sempioneBreraComo.corsoComoLead, locale)}</p>
<h3>${escapeHtml(cp.h3[3], locale)}</h3>
<p>${escapeHtml(cp.sempioneBreraComo.justMeLead, locale)}</p>
<h3>${escapeHtml(cp.h3[5], locale)}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.sempioneBreraComo.bullets.map((b) => `<li>${escapeHtml(b, locale)}</li>`).join('\n')}
</ul>`;

  const s3 = `<h3>${escapeHtml(cp.h3[6], locale)}</h3>
<p>${escapeHtml(cp.gattopardoCitylife.gattopardoDetail, locale)} ${escapeHtml(cp.gattopardoCitylife.voyaDetail, locale)}</p>
<h3>${escapeHtml(cp.h3[7], locale)}</h3>
<p>${escapeHtml(lx22.winter_rep || cp.gattopardoCitylife.fiftyFiveRepvblicDetail, locale)}</p>
<h3>${escapeHtml(cp.h3[8], locale)}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.overview.highlights.map((h) => `<li>${escapeHtml(h, locale)}</li>`).join('\n')}
</ul>`;

  const s4 = `<h3>${escapeHtml(cp.h3[9], locale)}</h3>
<p>${escapeHtml(cp.reggaetonNavigliSanSiro.navigliEastDetail, locale)} ${escapeHtml(cp.reggaetonNavigliSanSiro.gateAriaDetail, locale)}</p>
<h3>${escapeHtml(cp.h3[11], locale)}</h3>
<p>${escapeHtml(cp.reggaetonNavigliSanSiro.gardaTomDetail, locale)}</p>
<h3>${escapeHtml(cp.h3[2], locale)}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.reggaetonNavigliSanSiro.bullets.map((b) => `<li>${escapeHtml(b, locale)}</li>`).join('\n')}
</ul>
<p>${linkTag(zoneUrl('isola', locale), 'Isola M5', locale)} · ${linkTag(zoneUrl('corso-como', locale), 'Garibaldi & Corso Como', locale)} · ${linkTag(zoneUrl('citylife-portello', locale), 'CityLife & Portello M5', locale)} · ${linkTag(zoneUrl('parco-sempione', locale), 'Sempione', locale)}.</p>`;

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
<p>${linkTag(privGuide, lx.bic_disp, locale)} · ${linkTag(capodannoPath(locale), cp.conciergeAndTransit.nyeHubCta, locale)} · <a href="https://wa.me/393519127047" class="underline decoration-current/55 underline-offset-4">${escapeHtml(cp.conciergeAndTransit.whatsappCta, locale)}</a> | <a href="mailto:concierge@nightlifemilan.com" class="underline decoration-current/55 underline-offset-4">concierge@nightlifemilan.com</a>.</p>`;

  const out: RenderedGuide = {
    title: sanitizeText(lx.bic_title, locale),
    excerpt: sanitizeText(lx.bic_exc, locale),
    sections: [
      { heading: sanitizeText(lx.bic_h2, locale), content: s1 },
      { heading: sanitizeText(cp.h2[1], locale), content: s2 },
      { heading: sanitizeText(cp.h2[2], locale), content: s3 },
      { heading: sanitizeText(cp.h2[3], locale), content: s4 },
      { heading: sanitizeText(cp.h2[4], locale), content: s5 },
      { heading: sanitizeText(cp.h2[5], locale), content: s6 },
    ],
    faqs: composeFaqs(lx.bic_faq_q, lx.bic_faq_a, cp.faqs, locale),
  };
  BATCH_20261127_CACHE.set(ck, out);
  return out;
}

// ─── 5. g-40 (POTENZIA): THE GRACE CLUB & SUPER CLUB MILANO ─────────────────────
function renderGraceAndSuperClubGuide(locale: LocaleCode): RenderedGuide {
  const ck = `g-40:${locale}`;
  const hit = BATCH_20261127_CACHE.get(ck);
  if (hit) return hit;

  const lx = GSC_BATCH_20261127_LEX[locale] || GSC_BATCH_20261127_LEX.en;
  const lx22 = GSC_BATCH_20261122_LEX[locale] || GSC_BATCH_20261122_LEX.en;
  const cp = CLUBBING_PILLAR_35[locale] || CLUBBING_PILLAR_35.en;
  const tl = cp.tableLabels;

  const supClub = clubUrl('super-club-milano', locale);
  const pinClub = clubUrl('pineta-club-milano', locale);
  const fifClub = clubUrl('55-milano', locale);
  const apoClub = clubUrl('apollo-club-milano', locale);
  const bobClub = clubUrl('bobino-milano', locale);
  const graceNye = capodannoEventPath('capodanno-grace-club-milano', locale);
  const supNye = capodannoEventPath('capodanno-superclub-milano-tortona', locale);
  const dinGuide = guideUrl('g-60', locale);
  const tecGuide = guideUrl('g-134', locale);
  const tortonaGuide = guideUrl('g-106', locale);

  const graceVsSuperTable = makeTable(
    [tl.thVenue, tl.thDistrict, tl.thMusic, tl.thWeeklyRef, tl.thStatus],
    [
      ['The Grace Club Milano', 'Via Messina 38 (M5 Cenisio · 180 m walk)', 'Singing Dinner Show, House & Commercial', '35-55 EUR Dinner · VIP 250-700 EUR', linkTag(graceNye, tl.statusConfirmed, locale)],
      ['Super Club Milano (Tortona)', 'Via Tortona 27 (M2 Porta Genova · 380 sqm)', 'Electronic, Void Acoustics & Expect Nothing', 'Event-Based · VIP 350-1.200 EUR', linkTag(supClub, tl.statusConfirmed, locale)],
      ['Pineta Milano (Same Via Messina 38 Hub)', 'Via Messina 38 (Porta Garibaldi / Cenisio)', 'Luxury Dinner Show, Reggaeton & Commercial', tl.pinetaRates, linkTag(pinClub, '0% Partner', locale)],
      ['55 Milano (Sempione Loft)', 'Via Piero della Francesca 55 (M5 Gerusalemme)', 'Aperitivo, Dinner Show & Clubbing', tl.fiftyFiveRates, linkTag(fifClub, 'WhatsApp 0%', locale)],
      ['Apollo Club & Bobino (Navigli / Tortona)', 'Via Giosue Borsi 9/2 & Stazione Genova 4', 'Clubbing, Cocktail Bistrot & Canal Nights', '15-35 EUR · VIP 250-1.400 EUR', linkTag(apoClub, tl.statusConfirmed, locale)],
    ],
    locale,
    true,
  );

  const nyeGraceSuperTable = makeTable(
    [tl.thFormula, tl.thVenue, tl.thNye2027, tl.thDressCode],
    [
      ['After-Dinner Party Entry (from 23:00)', 'The Grace Club & Super Club Tortona', '40 EUR (1 Drink + Midnight Countdown)', tl.dressEveningElegance],
      ['Royal Gala Buffet (from 20:30)', 'The Grace Club & Super Club Tortona', '70 EUR (Hot/Cold Buffet + Drink + Flute)', tl.dressEveningElegance],
      ['Seated New Year Gala Dinner (from 20:00)', 'The Grace Club & Super Club Tortona', '140 EUR (Full Served Menu + Wines + Party)', tl.dressEveningElegance],
      ['VIP Privé & Console Bottle Table', 'The Grace Club (250-1.500) & Super Club (350-1.200)', '350 - 1.200 EUR (100% Bottle Credit)', tl.dressBlackTie],
    ],
    locale,
  );

  const s1 = `<h3>${escapeHtml(lx.gra_h3, locale)}</h3>
<p>${escapeHtml(lx.gra_lead, locale)}</p>
<p>${escapeHtml(lx.gra_deep, locale)}</p>
<h3>${escapeHtml(cp.h3[0], locale)}</h3>
${graceVsSuperTable}
<h3>${escapeHtml(cp.h3[1], locale)}</h3>
${nyeGraceSuperTable}
<p>${linkTag(supClub, 'Super Club Via Tortona 27', locale)} · ${linkTag(graceNye, 'The Grace Club NYE 2027', locale)} · ${linkTag(supNye, 'Super Club NYE 2027', locale)} · ${linkTag(dinGuide, 'Cena Cantata Milano', locale)} · ${linkTag(tecGuide, 'Club Techno Milano', locale)} · ${linkTag(tortonaGuide, 'Zona Tortona & Savona', locale)} · ${linkTag(bobClub, 'Bobino Navigli', locale)}.</p>`;

  const s2 = `<h3>${escapeHtml(cp.h3[4], locale)}</h3>
<p>${escapeHtml(cp.intro[0], locale)} ${escapeHtml(cp.sempioneBreraComo.pinetaClubLead, locale)} ${escapeHtml(cp.sempioneBreraComo.corsoComoLead, locale)}</p>
<h3>${escapeHtml(cp.h3[9], locale)}</h3>
<p>${escapeHtml(cp.reggaetonNavigliSanSiro.navigliEastDetail, locale)}</p>
<h3>${escapeHtml(cp.h3[5], locale)}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.sempioneBreraComo.bullets.map((b) => `<li>${escapeHtml(b, locale)}</li>`).join('\n')}
</ul>`;

  const s3 = `<h3>${escapeHtml(cp.h3[3], locale)}</h3>
<p>${escapeHtml(cp.sempioneBreraComo.justMeLead, locale)}</p>
<h3>${escapeHtml(cp.h3[6], locale)}</h3>
<p>${escapeHtml(cp.gattopardoCitylife.gattopardoDetail, locale)} ${escapeHtml(cp.gattopardoCitylife.voyaDetail, locale)}</p>
<h3>${escapeHtml(cp.h3[7], locale)}</h3>
<p>${escapeHtml(lx22.winter_rep || cp.gattopardoCitylife.fiftyFiveRepvblicDetail, locale)}</p>`;

  const s4 = `<h3>${escapeHtml(cp.h3[10], locale)}</h3>
<p>${escapeHtml(cp.reggaetonNavigliSanSiro.gateAriaDetail, locale)} ${escapeHtml(cp.reggaetonNavigliSanSiro.gardaTomDetail, locale)}</p>
<h3>${escapeHtml(cp.h3[11], locale)}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.reggaetonNavigliSanSiro.bullets.map((b) => `<li>${escapeHtml(b, locale)}</li>`).join('\n')}
</ul>
<h3>${escapeHtml(cp.h3[8], locale)}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.overview.highlights.map((h) => `<li>${escapeHtml(h, locale)}</li>`).join('\n')}
</ul>
<p>${linkTag(zoneUrl('corso-como', locale), 'Garibaldi & Cenisio', locale)} · ${linkTag(zoneUrl('navigli', locale), 'Tortona & Navigli', locale)} · ${linkTag(genreUrl('dinner-show', locale), 'Dinner Show', locale)} · ${linkTag(genreUrl('techno', locale), 'Techno & Electronic', locale)}.</p>`;

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
<p>${linkTag(supClub, 'Super Club Milano', locale)} · ${linkTag(capodannoPath(locale), cp.conciergeAndTransit.nyeHubCta, locale)} · <a href="https://wa.me/393519127047" class="underline decoration-current/55 underline-offset-4">${escapeHtml(cp.conciergeAndTransit.whatsappCta, locale)}</a> | <a href="mailto:concierge@nightlifemilan.com" class="underline decoration-current/55 underline-offset-4">concierge@nightlifemilan.com</a>.</p>`;

  const out: RenderedGuide = {
    title: sanitizeText(lx.gra_title, locale),
    excerpt: sanitizeText(lx.gra_exc, locale),
    sections: [
      { heading: sanitizeText(lx.gra_h2, locale), content: s1 },
      { heading: sanitizeText(cp.h2[1], locale), content: s2 },
      { heading: sanitizeText(cp.h2[2], locale), content: s3 },
      { heading: sanitizeText(cp.h2[3], locale), content: s4 },
      { heading: sanitizeText(cp.h2[4], locale), content: s5 },
      { heading: sanitizeText(cp.h2[5], locale), content: s6 },
    ],
    faqs: composeFaqs(lx.gra_faq_q, lx.gra_faq_a, cp.faqs, locale),
  };
  BATCH_20261127_CACHE.set(ck, out);
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
    dateModified: '2026-11-27',
    image: heroImage,
  };
}

export function applyGscGuidesBatch20261127(guidesList: Guide[]): void {
  const newSpecs: Array<{
    id: string;
    renderer: (loc: LocaleCode) => RenderedGuide;
    genres: MusicGenre[];
    hero: string;
  }> = [
    {
      id: 'g-132',
      renderer: renderDiscotecaMilanoGuide,
      genres: [MusicGenre.COMMERCIAL, MusicGenre.HOUSE, MusicGenre.REGGAETON],
      hero: '/images/guides-editorial/just-me-dancefloor.webp',
    },
    {
      id: 'g-133',
      renderer: renderCapodannoMilano2027Guide,
      genres: [MusicGenre.COMMERCIAL, MusicGenre.HOUSE, MusicGenre.LIVE_MUSIC],
      hero: '/images/guides-editorial/voya-rooftop-20f.webp',
    },
    {
      id: 'g-134',
      renderer: renderClubTechnoMilanoGuide,
      genres: [MusicGenre.TECHNO, MusicGenre.HOUSE],
      hero: '/images/guides-editorial/gate-neon.webp',
    },
  ];

  for (const sp of newSpecs) {
    if (!guidesList.some((g) => g.id === sp.id)) {
      guidesList.push(
        buildLazyGuide(
          sp.id,
          GUIDE_100_SLUGS_MAP[sp.id] as Record<LocaleCode, string>,
          sp.renderer,
          sp.genres,
          sp.hero,
          '2026-11-27',
        ),
      );
    }
  }

  const upgrades: Array<{
    id: string;
    renderer: (loc: LocaleCode) => RenderedGuide;
    genres: MusicGenre[];
    hero: string;
  }> = [
    {
      id: 'g-45',
      renderer: renderLaureaBicoccaGuide,
      genres: [MusicGenre.COMMERCIAL, MusicGenre.HOUSE, MusicGenre.REGGAETON],
      hero: '/images/guides-editorial/pineta-vip.webp',
    },
    {
      id: 'g-40',
      renderer: renderGraceAndSuperClubGuide,
      genres: [MusicGenre.LIVE_MUSIC, MusicGenre.HOUSE, MusicGenre.TECHNO],
      hero: '/images/seo-events/master/super-club-milano.webp',
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
}
