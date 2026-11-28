// Nightly GSC Batch (2026-11-28): 1 New Pillar Guide + 4 Full In-Place Upgrades across all 35 locales.
// g-dress-code (POTENZIA):    Milan Club Dress Code 2026/2027 (guida-definitiva-dress-code-club-milano)
// g-75         (POTENZIA):    VIP Terraces & Rooftops Rho Fiera Milan (guida-lineapelle-fiera-milano-rho-eventi-cene-tavoli-vip)
// g-135     (NUOVA_GUIDA):    Magazine Milano Discoteca & Magazzini Generali 2027 (guida-magazine-milano-discoteca-2027)
// g-35         (POTENZIA):    Magazzini Generali Milan Complete Guide (guida-magazzini-generali-milano-tavoli-vip-dress-code)
// g-103        (POTENZIA):    Navigli, Darsena & Porta Genova Nightlife (guida-quartiere-navigli-darsena-porta-genova-locali-club)
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
import { GSC_BATCH_20261128_LEX } from './i18n/pillarGuides20261128';
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

function doorPolicyUrl(locale: LocaleCode): string {
  return `${localePrefix(locale)}/door-policy`;
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

const BATCH_20261128_CACHE = new Map<string, RenderedGuide>();

export function getGsc20261128DisplayHeadline(guideId: string, locale: LocaleCode): string | null {
  const lx = GSC_BATCH_20261128_LEX[locale] || GSC_BATCH_20261128_LEX.en;
  if (guideId === 'g-dress-code') return sanitizeText(lx.drs_disp, locale);
  if (guideId === 'g-75') return sanitizeText(lx.rho_disp, locale);
  if (guideId === 'g-135') return sanitizeText(lx.mgz_disp, locale);
  if (guideId === 'g-35') return sanitizeText(lx.mgg_disp, locale);
  if (guideId === 'g-103') return sanitizeText(lx.nav_disp, locale);
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

// ─── 1. g-dress-code (POTENZIA): MILAN CLUB DRESS CODE 2026/2027 ─────────────────
function renderDressCodeGuide(locale: LocaleCode): RenderedGuide {
  const ck = `g-dress-code:${locale}`;
  const hit = BATCH_20261128_CACHE.get(ck);
  if (hit) return hit;

  const lx = GSC_BATCH_20261128_LEX[locale] || GSC_BATCH_20261128_LEX.en;
  const lx22 = GSC_BATCH_20261122_LEX[locale] || GSC_BATCH_20261122_LEX.en;
  const cp = CLUBBING_PILLAR_35[locale] || CLUBBING_PILLAR_35.en;
  const tl = cp.tableLabels;

  const dpHub = doorPolicyUrl(locale);
  const jmClub = clubUrl('just-me-milano', locale);
  const armClub = clubUrl('armani-prive-milano', locale);
  const pinClub = clubUrl('pineta-club-milano', locale);
  const voyaClub = clubUrl('voya-rooftop-milan', locale);
  const fifClub = clubUrl('55-milano', locale);
  const repClub = clubUrl('repvblic-milano', locale);
  const voltClub = clubUrl('volt-club-milano', locale);
  const gateClub = clubUrl('gate-milano', locale);
  const bottleGuide = guideUrl('g-vip-bottle-prices', locale);
  const tablesGuide = guideUrl('g-vip-tables', locale);
  const clubsGuide = guideUrl('g-132', locale);

  const dressTierTable = makeTable(
    [tl.thVenue, tl.thDistrict, tl.thDressCode, tl.thWeeklyRef, tl.thStatus],
    [
      ['Armani Privé & Philipp’s Milano (21+/23+)', 'Via Gastone Pisoni 1 & Via Daniele Manin 21', tl.dressBlackTie, 'Blazer, Collar Shirt, Loafers · Evening Gown', linkTag(armClub, tl.statusBenchmark, locale)],
      ['Just Me Milano (ex Just Cavalli · 7/7)', 'Parco Sempione · Viale Camoens 2 (Torre Branca)', tl.dressBlackTie, 'Collared Shirt, Tailored Trousers, Leather Shoes', linkTag(jmClub, '0% Partner', locale)],
      ['Voya Rooftop 20F & Terrazza Duomo 21', 'Viale Achille Papa 30 & Piazza del Duomo 21', tl.dressEveningElegance, 'Cocktail Chic, Smart Jacket, Zero Sportswear', linkTag(voyaClub, tl.statusConfirmed, locale)],
      ['Pineta Milano · The Grace Club · 55 Milano', 'Via Messina 38 (M5) & Via P. della Francesca 55', tl.dressSmartChic, 'Shirt + Dark Leather Low-Tops Accepted w/ Blazer', linkTag(pinClub, '0% Partner', locale)],
      ['REPVBLIC · Gattopardo · MIB · Dazi · The Club', 'Repubblica · Sempione · Affari · Brera / Como', tl.dressSmartChic, 'Smart Casual Chic · Balanced M/F or VIP Table', linkTag(repClub, 'WhatsApp 0%', locale)],
      ['Volt · Amnesia · Gate · Tunnel · Magazzini', 'Vetra M4 · Repetti · Isola M5 · Ripamonti', tl.dressUrbanChic, 'Curated Monochrome Black & Street-Luxury (18+/21+)', linkTag(voltClub, tl.statusConfirmed, locale)],
    ],
    locale,
    true,
  );

  const footwearChecklistTable = makeTable(
    [tl.thFormula, tl.thDressCode, tl.thVenue, tl.thWeeklyRef],
    [
      ['Leather Loafers, Derbies, Chelsea Boots & Heels', '100% Approved Across All 3 Tiers', 'Armani Privé, Just Me, Voya 20F, Duomo 21, Pineta, 55', 'Priority Door Pass'],
      ['Minimalist Dark Leather Low-Tops (Zero Neon Logos)', 'Approved Tier 1-2 (Pair w/ Collar Shirt)', 'Pineta, 55 Milano, The Club, Tocqueville, Bobino, MIB', 'Guestlist / Dinner / VIP'],
      ['Monochrome Black Designer / Underground Footwear', 'Approved Tier 1 Electronic & Warehouse', 'Volt Club, Amnesia, Gate Isola, Super Club, Magazzini', 'Selector Door Check'],
      ['Running Trainers, Flip-Flops, Ripped Denim, Caps, Tracksuits', 'Refused at Door (Even With Paid Ticket)', 'Strict Refusal Across Luxury & Smart-Chic Venues', 'Zero Exceptions'],
    ],
    locale,
  );

  const s1 = `<h3>${escapeHtml(lx.drs_h3, locale)}</h3>
<p>${escapeHtml(lx.drs_lead, locale)}</p>
<p>${escapeHtml(lx.drs_deep, locale)}</p>
<h3>${escapeHtml(cp.h3[0], locale)}</h3>
${dressTierTable}
<h3>${escapeHtml(cp.h3[1], locale)}</h3>
${footwearChecklistTable}
<p>${linkTag(dpHub, 'Door Policy Checker', locale)} · ${linkTag(bottleGuide, 'VIP Bottle Prices', locale)} · ${linkTag(tablesGuide, 'VIP Table Protocol', locale)} · ${linkTag(clubsGuide, 'Milan Nightclubs 2027', locale)} · ${linkTag(fifClub, '55 Milano', locale)} · ${linkTag(gateClub, 'Gate Milano', locale)}.</p>`;

  const s2 = `<h3>${escapeHtml(cp.h3[12], locale)}</h3>
<p>${escapeHtml(cp.doorPolicyAndClosed.dressCodeDetail, locale)}</p>
<h3>${escapeHtml(cp.h3[13], locale)}</h3>
<p>${escapeHtml(cp.doorPolicyAndClosed.allMaleBottleDetail, locale)}</p>
<h3>${escapeHtml(cp.h3[5], locale)}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.doorPolicyAndClosed.checklist.map((c) => `<li>${escapeHtml(c, locale)}</li>`).join('\n')}
</ul>`;

  const s3 = `<h3>${escapeHtml(cp.h3[3], locale)}</h3>
<p>${escapeHtml(cp.intro[0], locale)} ${escapeHtml(cp.sempioneBreraComo.justMeLead, locale)}</p>
<h3>${escapeHtml(cp.h3[4], locale)}</h3>
<p>${escapeHtml(cp.sempioneBreraComo.pinetaClubLead, locale)} ${escapeHtml(cp.sempioneBreraComo.corsoComoLead, locale)}</p>
<h3>${escapeHtml(cp.h3[6], locale)}</h3>
<p>${escapeHtml(cp.gattopardoCitylife.gattopardoDetail, locale)} ${escapeHtml(cp.gattopardoCitylife.voyaDetail, locale)}</p>`;

  const s4 = `<h3>${escapeHtml(cp.h3[7], locale)}</h3>
<p>${escapeHtml(lx22.winter_rep || cp.gattopardoCitylife.fiftyFiveRepvblicDetail, locale)}</p>
<h3>${escapeHtml(cp.h3[9], locale)}</h3>
<p>${escapeHtml(cp.reggaetonNavigliSanSiro.navigliEastDetail, locale)} ${escapeHtml(cp.reggaetonNavigliSanSiro.gateAriaDetail, locale)}</p>
<h3>${escapeHtml(cp.h3[11], locale)}</h3>
<p>${escapeHtml(cp.reggaetonNavigliSanSiro.gardaTomDetail, locale)}</p>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.sempioneBreraComo.bullets.map((b) => `<li>${escapeHtml(b, locale)}</li>`).join('\n')}
</ul>`;

  const s5 = `<h3>${escapeHtml(cp.h3[2], locale)}</h3>
<p>${escapeHtml(cp.intro[1], locale)}</p>
<h3>${escapeHtml(cp.h3[8], locale)}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.reggaetonNavigliSanSiro.bullets.map((b) => `<li>${escapeHtml(b, locale)}</li>`).join('\n')}
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
<p>${linkTag(dpHub, lx.drs_disp, locale)} · ${linkTag(capodannoPath(locale), cp.conciergeAndTransit.nyeHubCta, locale)} · <a href="https://wa.me/393519127047" class="underline decoration-current/55 underline-offset-4">${escapeHtml(cp.conciergeAndTransit.whatsappCta, locale)}</a> | <a href="mailto:concierge@nightlifemilan.com" class="underline decoration-current/55 underline-offset-4">concierge@nightlifemilan.com</a>.</p>`;

  const out: RenderedGuide = {
    title: sanitizeText(lx.drs_title, locale),
    excerpt: sanitizeText(lx.drs_exc, locale),
    sections: [
      { heading: sanitizeText(lx.drs_h2, locale), content: s1 },
      { heading: sanitizeText(cp.h2[4], locale), content: s2 },
      { heading: sanitizeText(cp.h2[1], locale), content: s3 },
      { heading: sanitizeText(cp.h2[2], locale), content: s4 },
      { heading: sanitizeText(cp.h2[3], locale), content: s5 },
      { heading: sanitizeText(cp.h2[5], locale), content: s6 },
    ],
    faqs: composeFaqs(lx.drs_faq_q, lx.drs_faq_a, cp.faqs, locale),
  };
  BATCH_20261128_CACHE.set(ck, out);
  return out;
}

// ─── 2. g-75 (POTENZIA): VIP TERRACES & ROOFTOPS RHO FIERA MILAN ─────────────────
function renderRhoFieraTerracesGuide(locale: LocaleCode): RenderedGuide {
  const ck = `g-75:${locale}`;
  const hit = BATCH_20261128_CACHE.get(ck);
  if (hit) return hit;

  const lx = GSC_BATCH_20261128_LEX[locale] || GSC_BATCH_20261128_LEX.en;
  const lx22 = GSC_BATCH_20261122_LEX[locale] || GSC_BATCH_20261122_LEX.en;
  const cp = CLUBBING_PILLAR_35[locale] || CLUBBING_PILLAR_35.en;
  const tl = cp.tableLabels;

  const voyaClub = clubUrl('voya-rooftop-milan', locale);
  const duomoClub = clubUrl('terrazza-duomo-21-milano', locale);
  const fifClub = clubUrl('55-milano', locale);
  const jmClub = clubUrl('just-me-milano', locale);
  const pinClub = clubUrl('pineta-club-milano', locale);
  const mibClub = clubUrl('mib-milano', locale);
  const rooftopGuide = guideUrl('g-rooftops-milan', locale);
  const radioGuide = guideUrl('g-129', locale);
  const mfwGuide = guideUrl('g-mfw-fuorisalone-f1', locale);
  const carlGuide = guideUrl('g-125', locale);
  const rooftopNyeCat = capodannoCategoryPath('capodanno-rooftop-milano', locale);

  const rhoMetroTerracesTable = makeTable(
    [tl.thVenue, tl.thDistrict, tl.thWeeklyRef, tl.thDressCode, tl.thStatus],
    [
      ['Voya Rooftop 20° Piano (85 m Sky Terrace)', 'Viale Achille Papa 30 · M1->M5 Portello (12 min)', tl.voyaRates, tl.dressBlackTie, linkTag(voyaClub, tl.statusBenchmark, locale)],
      ['55 Milano (1.000 sqm Loft + Open Terrace)', 'Via P. della Francesca 55 · M1->M5 Gerusalemme (15 min)', tl.fiftyFiveRates, tl.dressSmartChic, linkTag(fifClub, 'WhatsApp 0%', locale)],
      ['Just Me Milano (Torre Branca Garden & Dome)', 'Parco Sempione · M1 Cadorna / Lotto (16 min · 7/7)', tl.justMeRates, tl.dressBlackTie, linkTag(jmClub, '0% Partner', locale)],
      ['Pineta Milano & The Grace Club (Dinner Show)', 'Via Messina 38 · M1->M5 Cenisio (17 min)', tl.pinetaRates, tl.dressSmartChic, linkTag(pinClub, '0% Partner', locale)],
      ['Radio Rooftop 10F & Carlsberg Øl Porta Nuova', 'Via Marco Polo 18 & Bastioni P.ta Nuova 9 (20 min)', 'Skyline Tapas · 75 EUR Corporate Dinner', tl.dressEveningElegance, linkTag(radioGuide, tl.statusConfirmed, locale)],
      ['Terrazza Duomo 21 & MIB Piazza Affari', 'Direct M1 Red Cadorna / Cordusio / Duomo (22-24 min)', 'Cathedral View Aperitivo, Dinner & VIP Club', tl.dressBlackTie, linkTag(duomoClub, tl.statusConfirmed, locale)],
    ],
    locale,
    true,
  );

  const corporatePackagesTable = makeTable(
    [tl.thFormula, tl.thDistrict, tl.thWeeklyRef, tl.thDressCode],
    [
      ['1. Post-Fair Skyline Aperitivo Terrace (19:00 - 22:30)', 'Reserved Lounge Sofas + Finger Food + Drink Tokens', '30 - 55 EUR / guest (10 - 80 exhibitors/buyers)', tl.dressSmartChic],
      ['2. Corporate Seated Dinner + Club Stay (20:30 - 04:00)', '3-4 Course Menu + DOCG Wines + VAT Invoice Available', '60 - 150 EUR / guest (55 Milano, Pineta, Carlsberg, Voya)', tl.dressEveningElegance],
      ['3. Executive VIP Bottle Terrace / Privé (from 23:00)', 'Dedicated Hostess, Fast-Track Entry & 100% Bottle Credit', '300 - 1.500 EUR per VIP table (6-12 guests)', tl.dressBlackTie],
      ['4. Full / Semi-Private Terrace Buyout (50 - 150 pax)', 'Custom Branding, Private Bar, Microphone & DJ Set', 'Tailored Quote at 0% Partner Fee on WhatsApp', tl.dressEveningElegance],
    ],
    locale,
  );

  const s1 = `<h3>${escapeHtml(lx.rho_h3, locale)}</h3>
<p>${escapeHtml(lx.rho_lead, locale)}</p>
<p>${escapeHtml(lx.rho_deep, locale)}</p>
<h3>${escapeHtml(cp.h3[0], locale)}</h3>
${rhoMetroTerracesTable}
<h3>${escapeHtml(cp.h3[1], locale)}</h3>
${corporatePackagesTable}
<p>${linkTag(rooftopGuide, 'Milan Rooftops Guide', locale)} · ${linkTag(radioGuide, 'Radio Rooftop 10F', locale)} · ${linkTag(mfwGuide, 'MFW & Fuorisalone VIP', locale)} · ${linkTag(carlGuide, 'Carlsberg Øl Group Dinner', locale)} · ${linkTag(mibClub, 'MIB Piazza Affari', locale)} · ${linkTag(rooftopNyeCat, 'Rooftops NYE 2027', locale)}.</p>`;

  const s2 = `<h3>${escapeHtml(cp.h3[6], locale)}</h3>
<p>${escapeHtml(cp.intro[0], locale)} ${escapeHtml(cp.gattopardoCitylife.voyaDetail, locale)} ${escapeHtml(cp.gattopardoCitylife.gattopardoDetail, locale)}</p>
<h3>${escapeHtml(cp.h3[7], locale)}</h3>
<p>${escapeHtml(lx22.winter_rep || cp.gattopardoCitylife.fiftyFiveRepvblicDetail, locale)}</p>
<h3>${escapeHtml(cp.h3[5], locale)}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.sempioneBreraComo.bullets.map((b) => `<li>${escapeHtml(b, locale)}</li>`).join('\n')}
</ul>`;

  const s3 = `<h3>${escapeHtml(cp.h3[3], locale)}</h3>
<p>${escapeHtml(cp.sempioneBreraComo.justMeLead, locale)}</p>
<h3>${escapeHtml(cp.h3[4], locale)}</h3>
<p>${escapeHtml(cp.sempioneBreraComo.pinetaClubLead, locale)} ${escapeHtml(cp.sempioneBreraComo.corsoComoLead, locale)}</p>
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
<p>${linkTag(zoneUrl('citylife-portello', locale), 'CityLife & Portello M5', locale)} · ${linkTag(zoneUrl('parco-sempione', locale), 'Parco Sempione', locale)} · ${linkTag(zoneUrl('duomo', locale), 'Duomo & Centro', locale)} · ${linkTag(zoneUrl('corso-como', locale), 'Porta Nuova & Garibaldi', locale)}.</p>`;

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
<p>${linkTag(rooftopGuide, lx.rho_disp, locale)} · ${linkTag(capodannoPath(locale), cp.conciergeAndTransit.nyeHubCta, locale)} · <a href="https://wa.me/393519127047" class="underline decoration-current/55 underline-offset-4">${escapeHtml(cp.conciergeAndTransit.whatsappCta, locale)}</a> | <a href="mailto:concierge@nightlifemilan.com" class="underline decoration-current/55 underline-offset-4">concierge@nightlifemilan.com</a>.</p>`;

  const out: RenderedGuide = {
    title: sanitizeText(lx.rho_title, locale),
    excerpt: sanitizeText(lx.rho_exc, locale),
    sections: [
      { heading: sanitizeText(lx.rho_h2, locale), content: s1 },
      { heading: sanitizeText(cp.h2[2], locale), content: s2 },
      { heading: sanitizeText(cp.h2[1], locale), content: s3 },
      { heading: sanitizeText(cp.h2[3], locale), content: s4 },
      { heading: sanitizeText(cp.h2[4], locale), content: s5 },
      { heading: sanitizeText(cp.h2[5], locale), content: s6 },
    ],
    faqs: composeFaqs(lx.rho_faq_q, lx.rho_faq_a, cp.faqs, locale),
  };
  BATCH_20261128_CACHE.set(ck, out);
  return out;
}

// ─── 3. g-135 (NUOVA_GUIDA): MAGAZINE MILANO DISCOTECA 2027 ──────────────────────
function renderMagazineMilanoGuide(locale: LocaleCode): RenderedGuide {
  const ck = `g-135:${locale}`;
  const hit = BATCH_20261128_CACHE.get(ck);
  if (hit) return hit;

  const lx = GSC_BATCH_20261128_LEX[locale] || GSC_BATCH_20261128_LEX.en;
  const lx22 = GSC_BATCH_20261122_LEX[locale] || GSC_BATCH_20261122_LEX.en;
  const cp = CLUBBING_PILLAR_35[locale] || CLUBBING_PILLAR_35.en;
  const tl = cp.tableLabels;

  const magClub = clubUrl('magazzini-generali-milano', locale);
  const magNye = capodannoEventPath('capodanno-magazzini-generali-milano', locale);
  const magGuide = guideUrl('g-35', locale);
  const armClub = clubUrl('armani-prive-milano', locale);
  const phiGuide = guideUrl('g-126', locale);
  const jmClub = clubUrl('just-me-milano', locale);
  const voyaClub = clubUrl('voya-rooftop-milan', locale);
  const supClub = clubUrl('super-club-milano', locale);
  const pinClub = clubUrl('pineta-club-milano', locale);
  const mfwGuide = guideUrl('g-mfw-fuorisalone-f1', locale);
  const clubsHub = clubsHubUrl(locale);

  const magazineVsFashionTable = makeTable(
    [tl.thVenue, tl.thDistrict, tl.thMusic, tl.thWeeklyRef, tl.thStatus],
    [
      ['Magazzini Generali ("Magazine" Search Match)', 'Via Pietrasanta 16 · M3 Lodi TIBB / Tram 24', 'Fri International & Reggaeton · Sat Guest DJs', '15-25 EUR · VIP Balcony 250-1.000 EUR', linkTag(magClub, tl.statusConfirmed, locale)],
      ['Armani Privé Milano (Fashion House Club)', 'Via Gastone Pisoni 1 · M3 Montenapoleone', 'Editorial Parties, Vocal House & Hip-Hop Chic', 'VIP Tables 500-2.500 EUR · Strict Door', linkTag(armClub, tl.statusBenchmark, locale)],
      ['Philipp’s Milano (The Plein Hotel Palace)', 'Via Daniele Manin 21 · Porta Nuova / Turati', 'Couture Dinner Show & Luxury Bottle Club', 'Dinner Show & VIP Privé 500-3.000 EUR', linkTag(phiGuide, tl.statusConfirmed, locale)],
      ['Just Me Milano (ex Just Cavalli · Torre Branca)', 'Parco Sempione · Viale Luigi Camoens 2 (7/7)', 'Fashion Aperitivo, Commercial & House', tl.justMeRates, linkTag(jmClub, '0% Partner', locale)],
      ['Voya Rooftop 20F & Pineta Luxury Hall', 'CityLife M5 Portello & Via Messina 38 M5', 'Skyline Showcases, Singing Dinner & Urban', '20-70 EUR · VIP 300-1.500 EUR', linkTag(voyaClub, tl.statusConfirmed, locale)],
      ['Super Club Tortona & Plastic (Via Gargano 15)', 'Via Tortona 27 (M2) & Ripamonti Creative Axis', 'Magazine Launch Parties, Void Audio & Art Pop', 'Event-Based · VIP 350-1.200 EUR', linkTag(supClub, tl.statusConfirmed, locale)],
    ],
    locale,
    true,
  );

  const scheduleAndNyeTable = makeTable(
    [tl.thFormula, tl.thVenue, tl.thWeeklyRef, tl.thDressCode],
    [
      ['Friday International & Erasmus Night (23:30 - 05:00)', 'Magazzini Generali Via Pietrasanta 16', '15-25 EUR (1 Drink) · Balcony VIP 250-400 EUR', tl.dressSmartChic],
      ['Saturday Electronic & Guest DJ Arena (23:30 - 05:00)', 'Magazzini Generali Main Hall + Mezzanine', '20-30 EUR · Stage / Console VIP 500-1.000 EUR', tl.dressUrbanChic],
      ['Fashion Week & Editorial Release Showcases', 'Armani Privé · Philipp’s · Just Me · Super Club', 'Accredited Guestlist / 100% Credit Bottle Table', tl.dressBlackTie],
      ['New Year’s Eve 2027 (Dec 31, 2026 Confirmed)', 'Magazzini Generali NYE & 18 Partner Venues', '35-50 EUR Party · 400-800 EUR VIP Balcony', tl.dressEveningElegance],
    ],
    locale,
  );

  const s1 = `<h3>${escapeHtml(lx.mgz_h3, locale)}</h3>
<p>${escapeHtml(lx.mgz_lead, locale)}</p>
<p>${escapeHtml(lx.mgz_deep, locale)}</p>
<h3>${escapeHtml(cp.h3[0], locale)}</h3>
${magazineVsFashionTable}
<h3>${escapeHtml(cp.h3[1], locale)}</h3>
${scheduleAndNyeTable}
<p>${linkTag(magClub, 'Magazzini Generali Profile', locale)} · ${linkTag(magGuide, 'Magazzini VIP Guide', locale)} · ${linkTag(magNye, 'Magazzini NYE 2027', locale)} · ${linkTag(mfwGuide, 'Fashion Week Parties', locale)} · ${linkTag(pinClub, 'Pineta Milano', locale)} · ${linkTag(clubsHub, 'All Milan Clubs', locale)}.</p>`;

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
<h3>${escapeHtml(cp.h3[4], locale)}</h3>
<p>${escapeHtml(cp.sempioneBreraComo.corsoComoLead, locale)}</p>
<h3>${escapeHtml(cp.h3[5], locale)}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.sempioneBreraComo.bullets.map((b) => `<li>${escapeHtml(b, locale)}</li>`).join('\n')}
</ul>`;

  const s4 = `<h3>${escapeHtml(cp.h3[6], locale)}</h3>
<p>${escapeHtml(cp.gattopardoCitylife.gattopardoDetail, locale)} ${escapeHtml(cp.gattopardoCitylife.voyaDetail, locale)}</p>
<h3>${escapeHtml(cp.h3[7], locale)}</h3>
<p>${escapeHtml(lx22.winter_rep || cp.gattopardoCitylife.fiftyFiveRepvblicDetail, locale)}</p>
<h3>${escapeHtml(cp.h3[8], locale)}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.overview.highlights.map((h) => `<li>${escapeHtml(h, locale)}</li>`).join('\n')}
</ul>
<p>${linkTag(zoneUrl('ripamonti', locale), 'Ripamonti & Porta Romana', locale)} · ${linkTag(zoneUrl('quadrilatero', locale), 'Quadrilatero della Moda', locale)} · ${linkTag(genreUrl('reggaeton', locale), 'Reggaeton', locale)} · ${linkTag(genreUrl('techno', locale), 'Techno & House', locale)}.</p>`;

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
<p>${linkTag(magClub, lx.mgz_disp, locale)} · ${linkTag(capodannoPath(locale), cp.conciergeAndTransit.nyeHubCta, locale)} · <a href="https://wa.me/393519127047" class="underline decoration-current/55 underline-offset-4">${escapeHtml(cp.conciergeAndTransit.whatsappCta, locale)}</a> | <a href="mailto:concierge@nightlifemilan.com" class="underline decoration-current/55 underline-offset-4">concierge@nightlifemilan.com</a>.</p>`;

  const out: RenderedGuide = {
    title: sanitizeText(lx.mgz_title, locale),
    excerpt: sanitizeText(lx.mgz_exc, locale),
    sections: [
      { heading: sanitizeText(lx.mgz_h2, locale), content: s1 },
      { heading: sanitizeText(cp.h2[3], locale), content: s2 },
      { heading: sanitizeText(cp.h2[1], locale), content: s3 },
      { heading: sanitizeText(cp.h2[2], locale), content: s4 },
      { heading: sanitizeText(cp.h2[4], locale), content: s5 },
      { heading: sanitizeText(cp.h2[5], locale), content: s6 },
    ],
    faqs: composeFaqs(lx.mgz_faq_q, lx.mgz_faq_a, cp.faqs, locale),
  };
  BATCH_20261128_CACHE.set(ck, out);
  return out;
}

// ─── 4. g-35 (POTENZIA): MAGAZZINI GENERALI MILANO 2026/2027 ─────────────────────
function renderMagazziniGeneraliGuide(locale: LocaleCode): RenderedGuide {
  const ck = `g-35:${locale}`;
  const hit = BATCH_20261128_CACHE.get(ck);
  if (hit) return hit;

  const lx = GSC_BATCH_20261128_LEX[locale] || GSC_BATCH_20261128_LEX.en;
  const lx22 = GSC_BATCH_20261122_LEX[locale] || GSC_BATCH_20261122_LEX.en;
  const cp = CLUBBING_PILLAR_35[locale] || CLUBBING_PILLAR_35.en;
  const tl = cp.tableLabels;

  const magClub = clubUrl('magazzini-generali-milano', locale);
  const magNye = capodannoEventPath('capodanno-magazzini-generali-milano', locale);
  const fabNye = capodannoEventPath('capodanno-fabrique-milano', locale);
  const gateClub = clubUrl('gate-milano', locale);
  const amnClub = clubUrl('amnesia-milano', locale);
  const bobClub = clubUrl('bobino-milano', locale);
  const apoClub = clubUrl('apollo-club-milano', locale);
  const bocconiGuide = guideUrl('g-41', locale);
  const regGuide = guideUrl('g-119', locale);
  const tecGuide = guideUrl('g-134', locale);
  const mgzGuide = guideUrl('g-135', locale);

  const magazziniZonesTable = makeTable(
    [tl.thFormula, tl.thDistrict, tl.thWeeklyRef, tl.thDressCode, tl.thStatus],
    [
      ['Early Live Concert Slot (20:00 - 22:45)', 'Main Industrial Nave · Via Pietrasanta 16', 'Touring Live Bands, Urban & Indie Showcases', tl.dressUrbanChic, linkTag(magClub, tl.statusConfirmed, locale)],
      ['Friday International & Erasmus Club (23:30 - 05:00)', 'Main Floor + Garden Courtyard (1.200+ pax)', '15-25 EUR w/ Drink · Reggaeton, Hits & Commercial', tl.dressSmartChic, linkTag(regGuide, tl.statusConfirmed, locale)],
      ['Saturday Guest DJ & Electronic Night (23:30 - 05:00)', 'L-Acoustics Arena + Full-Stage LED Wall', '20-30 EUR · International House & Techno Headliners', tl.dressUrbanChic, linkTag(tecGuide, tl.statusBenchmark, locale)],
      ['Elevated Mezzanine Balcony VIP Tables', 'Wrap-Around Upper Gallery Overlooking Stage', '250 - 400 EUR (6-8 guests · 100% Bottle Credit)', tl.dressSmartChic, linkTag(magClub, tl.statusConfirmed, locale)],
      ['Stage & DJ Console Super Privé Booths', 'Backstage / Side-Console Dedicated Security', '500 - 1.000 EUR (8-12 guests · 100% Bottle Credit)', tl.dressEveningElegance, linkTag(magClub, tl.statusConfirmed, locale)],
      ['New Year’s Eve 2027 (Dec 31, 2026 Open)', 'Primary Warehouse Alternative (Fabrique Closed)', '35-50 EUR Party Entry · 400-800 EUR VIP Balcony', tl.dressEveningElegance, linkTag(magNye, tl.statusConfirmed, locale)],
    ],
    locale,
    true,
  );

  const southMilanComparisonTable = makeTable(
    [tl.thVenue, tl.thDistrict, tl.thMusic, tl.thWeeklyRef, tl.thStatus],
    [
      ['Magazzini Generali Milano', 'Via Pietrasanta 16 (M3 Lodi TIBB / Tram 24)', 'Concerts, Reggaeton Fri, House/Techno Sat', tl.magazziniRates, linkTag(magClub, tl.statusBenchmark, locale)],
      ['Gate Milano (Scalo Farini)', 'Via Valtellina 21 (M5 Isola / Garibaldi)', 'Reggaeton, Urban & Electronic Warehouse', tl.gateRates, linkTag(gateClub, tl.statusConfirmed, locale)],
      ['Amnesia Milano (Forlanini)', 'Via Alfonso Gatto 14 (M4 Repetti)', 'Peak-Time Techno & Tech-House Mainstage', '20-35 EUR · VIP 400-1.200 EUR', linkTag(amnClub, tl.statusConfirmed, locale)],
      ['Bobino & Apollo Club (Navigli)', 'Stazione Genova 4 & Via Giosue Borsi 9/2', 'Dinner Buffet, Cocktail Club & House Groove', '15-35 EUR · VIP 250-1.000 EUR', linkTag(bobClub, tl.statusConfirmed, locale)],
      ['Fabrique Milano (Mecenate)', 'Via Fantoli 9 (Closed Dec 31, 2026)', 'Redirects NYE Warehouse Demand to Magazzini', tl.statusClosed, linkTag(fabNye, tl.statusClosed, locale)],
    ],
    locale,
    true,
  );

  const s1 = `<h3>${escapeHtml(lx.mgg_h3, locale)}</h3>
<p>${escapeHtml(lx.mgg_lead, locale)}</p>
<p>${escapeHtml(lx.mgg_deep, locale)}</p>
<h3>${escapeHtml(cp.h3[0], locale)}</h3>
${magazziniZonesTable}
<h3>${escapeHtml(cp.h3[1], locale)}</h3>
${southMilanComparisonTable}
<p>${linkTag(magClub, 'Magazzini Generali Club Page', locale)} · ${linkTag(magNye, 'Capodanno 2027 Magazzini Generali', locale)} · ${linkTag(mgzGuide, 'Magazine Milano Guide', locale)} · ${linkTag(bocconiGuide, 'Bocconi Nightlife Guide', locale)} · ${linkTag(apoClub, 'Apollo Navigli', locale)}.</p>`;

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
<p>${linkTag(zoneUrl('ripamonti', locale), 'Zona Ripamonti & Porta Romana', locale)} · ${linkTag(zoneUrl('navigli', locale), 'Navigli & Bocconi', locale)} · ${linkTag(genreUrl('reggaeton', locale), 'Reggaeton', locale)} · ${linkTag(genreUrl('techno', locale), 'Techno', locale)}.</p>`;

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
<p>${linkTag(magClub, lx.mgg_disp, locale)} · ${linkTag(capodannoPath(locale), cp.conciergeAndTransit.nyeHubCta, locale)} · <a href="https://wa.me/393519127047" class="underline decoration-current/55 underline-offset-4">${escapeHtml(cp.conciergeAndTransit.whatsappCta, locale)}</a> | <a href="mailto:concierge@nightlifemilan.com" class="underline decoration-current/55 underline-offset-4">concierge@nightlifemilan.com</a>.</p>`;

  const out: RenderedGuide = {
    title: sanitizeText(lx.mgg_title, locale),
    excerpt: sanitizeText(lx.mgg_exc, locale),
    sections: [
      { heading: sanitizeText(lx.mgg_h2, locale), content: s1 },
      { heading: sanitizeText(cp.h2[3], locale), content: s2 },
      { heading: sanitizeText(cp.h2[1], locale), content: s3 },
      { heading: sanitizeText(cp.h2[2], locale), content: s4 },
      { heading: sanitizeText(cp.h2[4], locale), content: s5 },
      { heading: sanitizeText(cp.h2[5], locale), content: s6 },
    ],
    faqs: composeFaqs(lx.mgg_faq_q, lx.mgg_faq_a, cp.faqs, locale),
  };
  BATCH_20261128_CACHE.set(ck, out);
  return out;
}

// ─── 5. g-103 (POTENZIA): NAVIGLI, DARSENA & PORTA GENOVA NIGHTLIFE ──────────────
function renderNavigliNightlifeGuide(locale: LocaleCode): RenderedGuide {
  const ck = `g-103:${locale}`;
  const hit = BATCH_20261128_CACHE.get(ck);
  if (hit) return hit;

  const lx = GSC_BATCH_20261128_LEX[locale] || GSC_BATCH_20261128_LEX.en;
  const lx22 = GSC_BATCH_20261122_LEX[locale] || GSC_BATCH_20261122_LEX.en;
  const cp = CLUBBING_PILLAR_35[locale] || CLUBBING_PILLAR_35.en;
  const tl = cp.tableLabels;

  const navZone = zoneUrl('navigli', locale);
  const bobClub = clubUrl('bobino-milano', locale);
  const tomClub = clubUrl('tom-the-ordinary-market-milano', locale);
  const apoClub = clubUrl('apollo-club-milano', locale);
  const supClub = clubUrl('super-club-milano', locale);
  const voltClub = clubUrl('volt-club-milano', locale);
  const magClub = clubUrl('magazzini-generali-milano', locale);
  const bobNye = capodannoEventPath('capodanno-bobino-milano', locale);
  const apoNye = capodannoEventPath('capodanno-apollo-club-milano', locale);
  const supNye = capodannoEventPath('capodanno-superclub-milano-tortona', locale);
  const bobGuide = guideUrl('g-38', locale);
  const apoGuide = guideUrl('g-34', locale);
  const secretGuide = guideUrl('g-secret-bars', locale);
  const tortonaGuide = guideUrl('g-106', locale);

  const navigliClubsTable = makeTable(
    [tl.thVenue, tl.thDistrict, tl.thMusic, tl.thWeeklyRef, tl.thStatus],
    [
      ['Bobino Milano (Cocktail Bistrot & Club)', 'Piazzale Stazione Genova 4 (M2 Porta Genova)', 'Aperitivo Buffet, Commercial & Vocal House', tl.bobinoRates, linkTag(bobClub, tl.statusConfirmed, locale)],
      ['TOM. The Ordinary Market (Darsena)', 'Via Molino delle Armi / Darsena (M2 / M4 Vetra)', 'Singing Dinner, Mixology & Boutique DJ Set', tl.tomRates, linkTag(tomClub, tl.statusConfirmed, locale)],
      ['Apollo Club Milano (Canal Hub)', 'Via Giosuè Borsi 9/2 (Naviglio Pavese / Darsena)', 'House, Afro-Groove, Hip-Hop & Live Clubbing', '15-25 EUR · VIP 250-1.000 EUR', linkTag(apoClub, tl.statusConfirmed, locale)],
      ['Super Club Milano (Void Acoustics)', 'Via Tortona 27 (M2 Porta Genova · 380 sqm)', 'Electronic Showcases & Expect Nothing Light', 'Event-Based · NYE 40 / 70 / 140 EUR', linkTag(supClub, tl.statusConfirmed, locale)],
      ['Volt Club Milano (8 min Walk)', 'Via Molino delle Armi 16 (M4 Vetra)', 'Melodic Techno & International Underground', '20-30 EUR · VIP 350-2.500 EUR', linkTag(voltClub, tl.statusBenchmark, locale)],
      ['Magazzini Generali (10 min Tram 24/9)', 'Via Pietrasanta 16 (Ripamonti / Bocconi Axis)', '1.200-Pax Concerts, Erasmus Fri & DJ Sat', tl.magazziniRates, linkTag(magClub, tl.statusConfirmed, locale)],
    ],
    locale,
    true,
  );

  const canalTimelineTable = makeTable(
    [tl.thFormula, tl.thDistrict, tl.thWeeklyRef, tl.thStatus],
    [
      ['18:30 - 21:30 · Canal Aperitivo & Speakeasies', 'Alzaia Naviglio Grande, Ripa Ticinese & Darsena', '12 - 22 EUR Craft Cocktail + Aperitivo Platter', linkTag(secretGuide, tl.statusConfirmed, locale)],
      ['20:30 - 23:30 · Dinner Show & Royal Buffet', 'Bobino Stazione Genova 4 & TOM Darsena', '25 - 65 EUR Dinner + Guaranteed Club Stay', linkTag(bobGuide, tl.statusConfirmed, locale)],
      ['23:30 - 05:00 · Late-Night Clubbing & VIP Tables', 'Apollo · Super Club Tortona · Volt · Magazzini', '15-30 EUR Entry · 250-1.200 EUR Bottle Table', linkTag(apoGuide, tl.statusConfirmed, locale)],
      ['Dec 31, 2026 · Navigli New Year’s Eve 2027', 'Bobino (35/120) · Apollo (40/70) · Super (40/70/140)', '35 - 140 EUR Confirmed Canal & Tortona NYE', linkTag(bobNye, tl.statusConfirmed, locale)],
    ],
    locale,
    true,
  );

  const s1 = `<h3>${escapeHtml(lx.nav_h3, locale)}</h3>
<p>${escapeHtml(lx.nav_lead, locale)}</p>
<p>${escapeHtml(lx.nav_deep, locale)}</p>
<h3>${escapeHtml(cp.h3[0], locale)}</h3>
${navigliClubsTable}
<h3>${escapeHtml(cp.h3[1], locale)}</h3>
${canalTimelineTable}
<p>${linkTag(navZone, 'Navigli District Hub', locale)} · ${linkTag(secretGuide, '12 Navigli Speakeasies', locale)} · ${linkTag(tortonaGuide, 'Zona Tortona & Savona', locale)} · ${linkTag(bobNye, 'Bobino NYE 2027', locale)} · ${linkTag(apoNye, 'Apollo NYE 2027', locale)} · ${linkTag(supNye, 'Super Club NYE 2027', locale)}.</p>`;

  const s2 = `<h3>${escapeHtml(cp.h3[9], locale)}</h3>
<p>${escapeHtml(cp.intro[0], locale)} ${escapeHtml(cp.reggaetonNavigliSanSiro.navigliEastDetail, locale)}</p>
<h3>${escapeHtml(cp.h3[11], locale)}</h3>
<p>${escapeHtml(cp.reggaetonNavigliSanSiro.gardaTomDetail, locale)} ${escapeHtml(cp.reggaetonNavigliSanSiro.gateAriaDetail, locale)}</p>
<h3>${escapeHtml(cp.h3[10], locale)}</h3>
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
<p>${linkTag(navZone, 'Navigli & Darsena', locale)} · ${linkTag(zoneUrl('parco-sempione', locale), 'Parco Sempione', locale)} · ${linkTag(zoneUrl('corso-como', locale), 'Corso Como', locale)} · ${linkTag(genreUrl('house', locale), 'House', locale)} · ${linkTag(genreUrl('commercial', locale), 'Commercial', locale)}.</p>`;

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
<p>${linkTag(navZone, lx.nav_disp, locale)} · ${linkTag(capodannoPath(locale), cp.conciergeAndTransit.nyeHubCta, locale)} · <a href="https://wa.me/393519127047" class="underline decoration-current/55 underline-offset-4">${escapeHtml(cp.conciergeAndTransit.whatsappCta, locale)}</a> | <a href="mailto:concierge@nightlifemilan.com" class="underline decoration-current/55 underline-offset-4">concierge@nightlifemilan.com</a>.</p>`;

  const out: RenderedGuide = {
    title: sanitizeText(lx.nav_title, locale),
    excerpt: sanitizeText(lx.nav_exc, locale),
    sections: [
      { heading: sanitizeText(lx.nav_h2, locale), content: s1 },
      { heading: sanitizeText(cp.h2[3], locale), content: s2 },
      { heading: sanitizeText(cp.h2[1], locale), content: s3 },
      { heading: sanitizeText(cp.h2[2], locale), content: s4 },
      { heading: sanitizeText(cp.h2[4], locale), content: s5 },
      { heading: sanitizeText(cp.h2[5], locale), content: s6 },
    ],
    faqs: composeFaqs(lx.nav_faq_q, lx.nav_faq_a, cp.faqs, locale),
  };
  BATCH_20261128_CACHE.set(ck, out);
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
    dateModified: '2026-11-28',
    image: heroImage,
  };
}

export function applyGscGuidesBatch20261128(guidesList: Guide[]): void {
  const newSpecs: Array<{
    id: string;
    renderer: (loc: LocaleCode) => RenderedGuide;
    genres: MusicGenre[];
    hero: string;
  }> = [
    {
      id: 'g-135',
      renderer: renderMagazineMilanoGuide,
      genres: [MusicGenre.COMMERCIAL, MusicGenre.REGGAETON, MusicGenre.HOUSE],
      hero: '/images/guides-editorial/philipps-plein-chandeliers.webp',
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
          '2026-11-28',
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
      id: 'g-dress-code',
      renderer: renderDressCodeGuide,
      genres: [MusicGenre.HOUSE, MusicGenre.COMMERCIAL, MusicGenre.HIP_HOP],
      hero: '/images/guides-editorial/just-me-pavilion.webp',
    },
    {
      id: 'g-75',
      renderer: renderRhoFieraTerracesGuide,
      genres: [MusicGenre.HOUSE, MusicGenre.COMMERCIAL, MusicGenre.LIVE_MUSIC],
      hero: '/images/guides-editorial/voya-rooftop-20f.webp',
    },
    {
      id: 'g-35',
      renderer: renderMagazziniGeneraliGuide,
      genres: [MusicGenre.REGGAETON, MusicGenre.TECHNO, MusicGenre.COMMERCIAL],
      hero: '/images/venues/magazzini-generali/magazzini-generali-interior-01.webp',
    },
    {
      id: 'g-103',
      renderer: renderNavigliNightlifeGuide,
      genres: [MusicGenre.HOUSE, MusicGenre.COMMERCIAL, MusicGenre.TECHNO],
      hero: '/images/guides-editorial/apollo-navigli.webp',
    },
  ];

  for (const up of upgrades) {
    const idx = guidesList.findIndex((g) => g.id === up.id);
    if (idx !== -1) {
      const existing = guidesList[idx];
      const fallbackMap = GUIDE_100_SLUGS_MAP[up.id] || EXISTING_14_GUIDE_SLUGS_35[up.id];
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
