// GSC batch 2026-11-25: upgrade of 5 real Search Console opportunities across all 35 locales.
// g-34 Apollo Club · g-60 Cena Cantata / Dinner Show · g-31 MIB Milano · g-19 55 Milano · g-32 Terrazza Duomo 21
// All rates come from GUIDE_100_SEEDS venue specs and the official CAPODANNO_EVENTS cards (WhatsApp-verified Nov 2026).
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
import { GSC_BATCH_20261125_LEX } from './i18n/pillarGuides20261125';
import { buildClosedVenuesHtml, buildPartner18MatrixHtml } from './guidesGscBatch20261124';
import { capodannoEventPath, capodannoPath } from './capodanno/routes';
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
  const base = (raw || '')
    .replace(/—/g, '-')
    .replace(/–/g, '-')
    .replace(/★/g, '*')
    .replace(/!/g, '.');
  if (locale === 'ro') {
    return base
      .replace(/[şŞ]/g, (m) => (m === 'ş' ? 'ș' : 'Ș'))
      .replace(/[ţŢ]/g, (m) => (m === 'ţ' ? 'ț' : 'Ț'));
  }
  return base;
}

function escapeHtml(text: string): string {
  return sanitizeText(text)
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

function linkTag(href: string, label: string): string {
  return `<a href="${escapeHtml(href)}" class="underline decoration-current/55 underline-offset-4 hover:opacity-75 transition-opacity">${escapeHtml(label)}</a>`;
}

interface RenderedGuide {
  title: string;
  excerpt: string;
  sections: Array<{ heading: string; content: string }>;
  faqs: Array<{ question: string; answer: string }>;
}

const BATCH_20261125_CACHE = new Map<string, RenderedGuide>();

export function getGsc20261125DisplayHeadline(guideId: string, locale: LocaleCode): string | null {
  const lx = GSC_BATCH_20261125_LEX[locale] || GSC_BATCH_20261125_LEX.en;
  if (guideId === 'g-34') return 'Apollo Club';
  if (guideId === 'g-60') return sanitizeText(lx.cen_disp);
  if (guideId === 'g-31') return sanitizeText(`MIB ${lx.city}`);
  if (guideId === 'g-19') return sanitizeText(`55 ${lx.city}`);
  if (guideId === 'g-32') return sanitizeText(lx.ter_disp);
  return null;
}

function makeTable(headers: string[], rows: string[][], rawLastCol = false): string {
  const ths = headers.map((h) => `<th>${escapeHtml(h)}</th>`).join('');
  const trs = rows
    .map((r) => {
      const tds = r
        .map((cell, idx) => {
          if (rawLastCol && idx === r.length - 1) {
            return `<td class="whitespace-nowrap">${cell}</td>`;
          }
          const cls = idx === 0 ? ' class="font-semibold"' : idx === 3 ? ' class="font-semibold whitespace-nowrap"' : '';
          return `<td${cls}>${escapeHtml(cell)}</td>`;
        })
        .join('');
      return `<tr>${tds}</tr>`;
    })
    .join('\n');
  return `<div class="taste-table-scroll"><table class="taste-data-table"><thead><tr>${ths}</tr></thead><tbody>\n${trs}\n</tbody></table></div>`;
}

function composeFaqs(firstQ: string, firstA: string, cpFaqs: [string, string][]): Array<{ question: string; answer: string }> {
  const base = cpFaqs.slice(0, 5).map(([q, a]) => ({ question: sanitizeText(q), answer: sanitizeText(a) }));
  return [{ question: sanitizeText(firstQ), answer: sanitizeText(firstA) }, ...base];
}

// ─── 1. g-34 (POTENZIA): APOLLO CLUB MILANO (VIA GIOSUE BORSI 9/2, NAVIGLI) ────
function renderApolloGuide(locale: LocaleCode): RenderedGuide {
  const ck = `g-34:${locale}`;
  const hit = BATCH_20261125_CACHE.get(ck);
  if (hit) return hit;

  const lx = GSC_BATCH_20261125_LEX[locale] || GSC_BATCH_20261125_LEX.en;
  const lx22 = GSC_BATCH_20261122_LEX[locale] || GSC_BATCH_20261122_LEX.en;
  const cp = CLUBBING_PILLAR_35[locale] || CLUBBING_PILLAR_35.en;
  const tl = cp.tableLabels;

  const apoClub = clubUrl('apollo-club-milan', locale);
  const apoNye = capodannoEventPath('capodanno-apollo-club-milano', locale);
  const voltClub = clubUrl('volt-club-milan', locale);
  const bobinoClub = clubUrl('bobino-milan', locale);
  const bobinoNye = capodannoEventPath('capodanno-bobino-milano', locale);
  const magClub = clubUrl('magazzini-generali-milan', locale);
  const magNye = capodannoEventPath('capodanno-magazzini-generali-milano', locale);
  const fabClub = clubUrl('fabrique-milan', locale);
  const amnesiaClub = clubUrl('amnesia-milan', locale);
  const navigliZone = zoneUrl('navigli', locale);
  const clubGuide = guideUrl('g-118', locale);
  const regGuide = guideUrl('g-119', locale);

  const apoFormulas = makeTable(
    [tl.thFormula, tl.thDistrict, tl.thWeeklyRef, tl.thDressCode],
    [
      ['Apollo Club · Cocktail & Bistrot Dinner (19:30 - 23:00)', 'Via Giosue Borsi 9/2 · Navigli & Darsena', '20 - 35 EUR', tl.dressUrbanChic],
      ['Apollo Club · Accredited Guestlist (23:00 - 01:00)', 'Main Club Room (Thu, Fri, Sat, Sun)', '15 - 25 EUR Ticket', tl.dressUrbanChic],
      ['Apollo Club · Dancefloor Bottle Table (6 - 8 pax)', 'Central Club Room · 100% Bottle Credit', '250 - 300 EUR', tl.dressUrbanChic],
      ['Apollo Club · Club Room Privé (8 - 10 pax)', 'Raised Side Lounge · Hostess Service', '400 - 650 EUR', tl.dressSmartChic],
      ['Apollo Club · Stage & DJ Booth Super Privé (10 - 12 pax)', 'Front-Stage Console Area · Security', '750 - 1.400 EUR', tl.dressSmartChic],
      [`Apollo Club · ${lx.nye} After-Dinner (from 23:00)`, 'Via Giosue Borsi 9/2 · 1 Drink Included', '40 EUR', tl.dressEveningElegance],
      [`Apollo Club · ${lx.nye} Royal Gala Buffet (from 20:30)`, 'Buffet, Drink & Midnight Toast', '70 EUR', tl.dressEveningElegance],
      [`Apollo Club · ${lx.nye} Seated Gala Dinner (from 20:00)`, 'Full Menu with Wines + Party', '140 EUR · VIP 350 - 1.200 EUR', tl.dressEveningElegance],
    ],
  );

  const navigliTable = makeTable(
    [tl.thVenue, tl.thDistrict, tl.thWeeklyRef, tl.thNye2027, tl.thStatus],
    [
      ['Apollo Club Milano', 'Via Giosue Borsi 9/2 (M2 Porta Genova 450 m)', '15-25 EUR · VIP 250-1.400 EUR', '40 / 70 / 140 EUR · VIP 350-1.200 EUR', linkTag(apoNye, tl.statusConfirmed)],
      ['Volt Club Milano', 'Via Molino delle Armi 16 (M4 Vetra)', '20-30 EUR · VIP 350-2.500 EUR', 'Electronic Night (WhatsApp)', linkTag(voltClub, tl.statusBenchmark)],
      ['Bobino Milano', 'Piazzale Cantore 14 (Darsena)', tl.bobinoRates, tl.bobinoRates, linkTag(bobinoNye, tl.statusConfirmed)],
      ['Magazzini Generali Milano', 'Via Pietrasanta 16 (Live + Club)', tl.magazziniRates, '35 / 80 EUR · VIP 400-750 EUR', linkTag(magNye, tl.statusConfirmed)],
      ['Fabrique Milano', 'Via Fantoli 9 (Mecenate)', tl.statusClosed, tl.statusClosed, linkTag(fabClub, tl.statusClosed)],
      ['Amnesia Milano', 'Via Gatto 14 (Techno Benchmark)', '20-30 EUR · VIP 400-900 EUR', 'Techno Marathon (WhatsApp)', linkTag(amnesiaClub, tl.statusBenchmark)],
    ],
    true,
  );

  const s1 = `<h3>Apollo Club ${escapeHtml(lx.city)} · Via Giosue Borsi 9/2 (Navigli &amp; Darsena)</h3>
<p>${escapeHtml(lx.apo_lead)}</p>
<p>${escapeHtml(cp.intro[0])} ${escapeHtml(cp.intro[1])}</p>
<h3>${escapeHtml(cp.h3[0])}</h3>
${apoFormulas}
<h3>${escapeHtml(cp.h3[1])}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.overview.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join('\n')}
</ul>
<p>${linkTag(apoClub, `Apollo Club ${lx.city}`)} · ${linkTag(apoNye, `Apollo Club ${lx.nye}`)} · ${linkTag(navigliZone, 'Navigli & Darsena')}.</p>`;

  const s2 = `<h3>Navigli, Darsena &amp; Porta Genova Partner Circuit</h3>
<p>${escapeHtml(cp.reggaetonNavigliSanSiro.navigliEastDetail)} ${escapeHtml(lx22.winter_aria || '')}</p>
<h3>${escapeHtml(cp.h3[9])}</h3>
${navigliTable}
<h3>${escapeHtml(cp.h3[4])}</h3>
<p>${escapeHtml(cp.sempioneBreraComo.pinetaClubLead)} ${escapeHtml(cp.sempioneBreraComo.corsoComoLead)}</p>
<p>${linkTag(bobinoClub, 'Bobino Milano')} · ${linkTag(magClub, 'Magazzini Generali')} · ${linkTag(clubGuide, lx22.cal_short)} · ${linkTag(regGuide, lx22.reg_short)}.</p>`;

  const s3 = `<h3>${escapeHtml(cp.h3[3])}</h3>
<p>${escapeHtml(cp.sempioneBreraComo.justMeLead)}</p>
<h3>${escapeHtml(cp.h3[6])}</h3>
<p>${escapeHtml(cp.gattopardoCitylife.gattopardoDetail)} ${escapeHtml(cp.gattopardoCitylife.voyaDetail)}</p>
<h3>${escapeHtml(cp.h3[5])}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.sempioneBreraComo.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('\n')}
</ul>`;

  const s4 = `<h3>${escapeHtml(cp.h3[10])}</h3>
<p>${escapeHtml(cp.reggaetonNavigliSanSiro.gateAriaDetail)} ${escapeHtml(cp.reggaetonNavigliSanSiro.gardaTomDetail)}</p>
<h3>${escapeHtml(cp.h3[7])}</h3>
<p>${escapeHtml(lx22.winter_rep || cp.gattopardoCitylife.fiftyFiveRepvblicDetail)}</p>
<h3>${escapeHtml(cp.h3[11])}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.reggaetonNavigliSanSiro.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('\n')}
</ul>
<p>${linkTag(genreUrl('house', locale), 'House & Afro-House')} · ${linkTag(genreUrl('commercial', locale), 'Commercial & 2000s')} · ${linkTag(genreUrl('indie', locale), 'Indie & Alternative')}.</p>`;

  const s5 = `<h3>${escapeHtml(cp.h3[12])}</h3>
<p>${escapeHtml(cp.doorPolicyAndClosed.dressCodeDetail)}</p>
<h3>${escapeHtml(cp.h3[13])}</h3>
<p>${escapeHtml(cp.doorPolicyAndClosed.allMaleBottleDetail)}</p>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.doorPolicyAndClosed.checklist.map((c) => `<li>${escapeHtml(c)}</li>`).join('\n')}
</ul>
<h3>${escapeHtml(cp.h3[14])}</h3>
<p>${escapeHtml(cp.doorPolicyAndClosed.closedAlertDetail)}</p>
${buildClosedVenuesHtml(locale)}`;

  const s6 = `<h3>${escapeHtml(cp.h3[15])}</h3>
<p>${escapeHtml(cp.conciergeAndTransit.conciergeDetail)}</p>
<ol class="list-decimal pl-6 space-y-2 my-4">
${cp.conciergeAndTransit.steps.map((st) => `<li>${escapeHtml(st)}</li>`).join('\n')}
</ol>
<h3>${escapeHtml(cp.h3[16])}</h3>
<p>${escapeHtml(cp.conciergeAndTransit.metroParkingDetail)}</p>
<h3>${escapeHtml(cp.h3[17])}</h3>
<p>${escapeHtml(cp.conciergeAndTransit.termeCrossLink)} ${escapeHtml(cp.overview.tableLead)}</p>
${buildPartner18MatrixHtml(locale)}
<p>${linkTag(apoClub, `Apollo Club ${lx.city}`)} · ${linkTag(capodannoPath(locale), cp.conciergeAndTransit.nyeHubCta)} · <a href="https://wa.me/393519127047" class="underline decoration-current/55 underline-offset-4">${escapeHtml(cp.conciergeAndTransit.whatsappCta)}</a> | <a href="mailto:concierge@nightlifemilan.com" class="underline decoration-current/55 underline-offset-4">concierge@nightlifemilan.com</a>.</p>`;

  const out: RenderedGuide = {
    title: sanitizeText(lx.apo_title),
    excerpt: sanitizeText(lx.apo_exc),
    sections: [
      { heading: sanitizeText(`1. Apollo Club ${lx.city} · Via Giosue Borsi 9/2 (Navigli)`), content: s1 },
      { heading: sanitizeText(cp.h2[3]), content: s2 },
      { heading: sanitizeText(cp.h2[1]), content: s3 },
      { heading: sanitizeText(cp.h2[2]), content: s4 },
      { heading: sanitizeText(cp.h2[4]), content: s5 },
      { heading: sanitizeText(cp.h2[5]), content: s6 },
    ],
    faqs: composeFaqs(lx.apo_faq_q, lx.apo_faq_a, cp.faqs),
  };
  BATCH_20261125_CACHE.set(ck, out);
  return out;
}

// ─── 2. g-60 (POTENZIA): CENA CANTATA & DINNER SHOW (10 VENUE CIRCUIT) ─────────
function renderCenaCantataGuide(locale: LocaleCode): RenderedGuide {
  const ck = `g-60:${locale}`;
  const hit = BATCH_20261125_CACHE.get(ck);
  if (hit) return hit;

  const lx = GSC_BATCH_20261125_LEX[locale] || GSC_BATCH_20261125_LEX.en;
  const lx22 = GSC_BATCH_20261122_LEX[locale] || GSC_BATCH_20261122_LEX.en;
  const cp = CLUBBING_PILLAR_35[locale] || CLUBBING_PILLAR_35.en;
  const tl = cp.tableLabels;

  const pinetaClub = clubUrl('pineta-club-milano', locale);
  const pinetaNye = capodannoEventPath('capodanno-pineta-milano', locale);
  const tocqClub = clubUrl('tocqueville-13-milano', locale);
  const tocqNye = capodannoEventPath('capodanno-tocqueville-13-milano', locale);
  const justMeClub = clubUrl('just-me-milano', locale);
  const justMeNye = capodannoEventPath('capodanno-justme-milano-torre-branca', locale);
  const graceClub = clubUrl('the-grace-club-milan', locale);
  const graceNye = capodannoEventPath('capodanno-grace-club-milano', locale);
  const gattoClub = clubUrl('il-gattopardo-milan', locale);
  const gattoNye = capodannoEventPath('capodanno-il-gattopardo-milano', locale);
  const mibNye = capodannoEventPath('capodanno-mib-milano-piazza-affari', locale);
  const fifNye = capodannoEventPath('capodanno-55-milano', locale);
  const churchNye = capodannoEventPath('capodanno-church-81-milano', locale);
  const mibGuide = guideUrl('g-31', locale);
  const fifGuide = guideUrl('g-19', locale);
  const clubGuide = guideUrl('g-118', locale);

  const formulaTable = makeTable(
    [tl.thFormula, tl.thDistrict, tl.thWeeklyRef, tl.thDressCode],
    [
      ['Seated 3-Course Singing Dinner (from 20:30)', 'Wine Included (1 Bottle per 4 Guests)', '40 - 80 EUR per person', tl.dressSmartChic],
      ['Club Entry for Every Dinner Guest (from 23:30)', 'Same Address · No Venue Change', 'Included in Dinner', tl.dressSmartChic],
      ['After-Dinner Dancefloor VIP Upgrade', 'Bottle Service from 23:30', '300 - 400 EUR', tl.dressSmartChic],
      ['Keep Your Table All Night (8 - 12 pax)', 'Birthday, Hen, Stag & Graduation Groups', '550 - 900 EUR', tl.dressSmartChic],
      ['Front-Stage Dinner Table + Champagne Show', 'Super Privé · Corporate & Celebration', '1.000 - 2.200 EUR', tl.dressEveningElegance],
      [`MIB ${lx.city} · ${lx.nye} Seated Gala`, 'Via Gaetano Negri 10 (Piazza Affari)', '160 EUR · Buffet 70 EUR', tl.dressEveningElegance],
      [`55 ${lx.city} · ${lx.nye} La Dolce Vita Gala`, 'Via Piero della Francesca 55 (Sempione)', '160 EUR · Buffet 100 EUR', tl.dressEveningElegance],
      [`Church 81 · ${lx.nye} Eyes Wide Shut Dinner`, 'Via della Chiesa Rossa 81 (Navigli)', '90 EUR Fixed Rate', tl.dressEveningElegance],
    ],
  );

  const venueTable = makeTable(
    [tl.thVenue, tl.thDistrict, tl.thWeeklyRef, tl.thNye2027, tl.thStatus],
    [
      ['Pineta Milano (Dinner Show)', 'Via Messina 38 (M5 Cenisio)', tl.pinetaRates, '40 / 160 EUR · VIP 300-1.500 EUR', linkTag(pinetaNye, tl.statusConfirmed)],
      ['Tocqueville 13 Milano', 'Via Alessio di Tocqueville 13 (Garibaldi)', tl.tocquevilleRates, tl.tocquevilleRates, linkTag(tocqNye, tl.statusConfirmed)],
      ['Just Me Milano (ex Just Cavalli)', 'Viale Luigi Camoens 2 (Torre Branca)', tl.justMeRates, '80 / 300 EUR', linkTag(justMeNye, tl.statusConfirmed)],
      ['The Grace Club Milano', 'Via Benedetto Marcello 32 (Loreto)', '45-70 EUR Dinner Show', 'Gala Dinner (WhatsApp)', linkTag(graceNye, tl.statusConfirmed)],
      ['Il Gattopardo Milano (Deconsecrated Church)', 'Via Piero della Francesca 47 (Sempione)', tl.gattopardoRates, '600 EUR', linkTag(gattoNye, tl.statusConfirmed)],
      ['MIB Milano (Piazza Affari)', 'Via Gaetano Negri 10 (M1 Cordusio 200 m)', '45-70 EUR · VIP 250-1.500 EUR', '160 / 70 / 50 / 40 EUR', linkTag(mibNye, tl.statusConfirmed)],
      ['55 Milano (FiftyFive Sempione)', 'Via Piero della Francesca 55 (1.000 sqm Loft)', tl.fiftyFiveRates, '160 / 100 / 30-50 EUR', linkTag(fifNye, tl.statusConfirmed)],
      ['Church 81 Milano', 'Via della Chiesa Rossa 81 (Free Parking)', '40-60 EUR Singing Dinner', '90 EUR Eyes Wide Shut', linkTag(churchNye, tl.statusConfirmed)],
    ],
    true,
  );

  const s1 = `<h3>${escapeHtml(lx.cen_disp)} ${escapeHtml(lx.city)} · 20:30 Dinner, 23:30 Nightclub</h3>
<p>${escapeHtml(lx.cen_lead)}</p>
<p>${escapeHtml(cp.intro[0])} ${escapeHtml(cp.intro[1])}</p>
<h3>${escapeHtml(cp.h3[0])}</h3>
${formulaTable}
<h3>${escapeHtml(cp.h3[1])}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.overview.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join('\n')}
</ul>
<p>${linkTag(pinetaClub, 'Pineta Milano')} · ${linkTag(tocqClub, 'Tocqueville 13')} · ${linkTag(graceClub, 'The Grace Club')} · ${linkTag(clubGuide, lx22.cal_short)}.</p>`;

  const s2 = `<h3>The 10 Verified Singing Dinner &amp; Dinner Show Addresses</h3>
<p>${escapeHtml(cp.overview.venueSpecsSummary)}</p>
<h3>${escapeHtml(cp.h3[9])}</h3>
${venueTable}
<h3>${escapeHtml(cp.h3[4])}</h3>
<p>${escapeHtml(cp.sempioneBreraComo.pinetaClubLead)} ${escapeHtml(cp.sempioneBreraComo.corsoComoLead)}</p>
<p>${linkTag(mibGuide, `MIB ${lx.city}`)} · ${linkTag(fifGuide, `55 ${lx.city}`)} · ${linkTag(gattoClub, 'Il Gattopardo')}.</p>`;

  const s3 = `<h3>${escapeHtml(cp.h3[3])}</h3>
<p>${escapeHtml(cp.sempioneBreraComo.justMeLead)}</p>
<h3>${escapeHtml(cp.h3[6])}</h3>
<p>${escapeHtml(cp.gattopardoCitylife.gattopardoDetail)} ${escapeHtml(cp.gattopardoCitylife.voyaDetail)}</p>
<h3>${escapeHtml(cp.h3[5])}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.sempioneBreraComo.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('\n')}
</ul>
<p>${linkTag(justMeClub, 'Just Me Milano (ex Just Cavalli)')} · ${linkTag(justMeNye, `Just Me ${lx.nye}`)} · ${linkTag(gattoNye, `Il Gattopardo ${lx.nye}`)}.</p>`;

  const s4 = `<h3>${escapeHtml(cp.h3[10])}</h3>
<p>${escapeHtml(cp.reggaetonNavigliSanSiro.navigliEastDetail)} ${escapeHtml(cp.reggaetonNavigliSanSiro.gardaTomDetail)}</p>
<h3>${escapeHtml(cp.h3[7])}</h3>
<p>${escapeHtml(lx22.winter_rep || cp.gattopardoCitylife.fiftyFiveRepvblicDetail)}</p>
<h3>${escapeHtml(cp.h3[11])}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.reggaetonNavigliSanSiro.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('\n')}
</ul>
<p>${linkTag(genreUrl('live-music', locale), 'Live Music & Singing Dinner')} · ${linkTag(genreUrl('commercial', locale), 'Commercial & 2000s')} · ${linkTag(tocqNye, `Tocqueville 13 ${lx.nye}`)}.</p>`;

  const s5 = `<h3>${escapeHtml(cp.h3[12])}</h3>
<p>${escapeHtml(cp.doorPolicyAndClosed.dressCodeDetail)}</p>
<h3>${escapeHtml(cp.h3[13])}</h3>
<p>${escapeHtml(cp.doorPolicyAndClosed.allMaleBottleDetail)}</p>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.doorPolicyAndClosed.checklist.map((c) => `<li>${escapeHtml(c)}</li>`).join('\n')}
</ul>
<h3>${escapeHtml(cp.h3[14])}</h3>
<p>${escapeHtml(cp.doorPolicyAndClosed.closedAlertDetail)}</p>
${buildClosedVenuesHtml(locale)}`;

  const s6 = `<h3>${escapeHtml(cp.h3[15])}</h3>
<p>${escapeHtml(cp.conciergeAndTransit.conciergeDetail)}</p>
<ol class="list-decimal pl-6 space-y-2 my-4">
${cp.conciergeAndTransit.steps.map((st) => `<li>${escapeHtml(st)}</li>`).join('\n')}
</ol>
<h3>${escapeHtml(cp.h3[16])}</h3>
<p>${escapeHtml(cp.conciergeAndTransit.metroParkingDetail)}</p>
<h3>${escapeHtml(cp.h3[17])}</h3>
<p>${escapeHtml(cp.conciergeAndTransit.termeCrossLink)} ${escapeHtml(cp.overview.tableLead)}</p>
${buildPartner18MatrixHtml(locale)}
<p>${linkTag(capodannoPath(locale), cp.conciergeAndTransit.nyeHubCta)} · <a href="https://wa.me/393519127047" class="underline decoration-current/55 underline-offset-4">${escapeHtml(cp.conciergeAndTransit.whatsappCta)}</a> | <a href="mailto:concierge@nightlifemilan.com" class="underline decoration-current/55 underline-offset-4">concierge@nightlifemilan.com</a>.</p>`;

  const out: RenderedGuide = {
    title: sanitizeText(lx.cen_title),
    excerpt: sanitizeText(lx.cen_exc),
    sections: [
      { heading: sanitizeText(`1. ${lx.cen_disp} ${lx.city} · 20:30 - 05:00`), content: s1 },
      { heading: sanitizeText(cp.h2[3]), content: s2 },
      { heading: sanitizeText(cp.h2[1]), content: s3 },
      { heading: sanitizeText(cp.h2[2]), content: s4 },
      { heading: sanitizeText(cp.h2[4]), content: s5 },
      { heading: sanitizeText(cp.h2[5]), content: s6 },
    ],
    faqs: composeFaqs(lx.cen_faq_q, lx.cen_faq_a, cp.faqs),
  };
  BATCH_20261125_CACHE.set(ck, out);
  return out;
}

// ─── 3. g-31 (POTENZIA): MIB MILANO (VIA GAETANO NEGRI 10, PIAZZA AFFARI) ──────
function renderMibGuide(locale: LocaleCode): RenderedGuide {
  const ck = `g-31:${locale}`;
  const hit = BATCH_20261125_CACHE.get(ck);
  if (hit) return hit;

  const lx = GSC_BATCH_20261125_LEX[locale] || GSC_BATCH_20261125_LEX.en;
  const lx22 = GSC_BATCH_20261122_LEX[locale] || GSC_BATCH_20261122_LEX.en;
  const cp = CLUBBING_PILLAR_35[locale] || CLUBBING_PILLAR_35.en;
  const tl = cp.tableLabels;

  const mibClub = clubUrl('mib-milan', locale);
  const mibNye = capodannoEventPath('capodanno-mib-milano-piazza-affari', locale);
  const terClub = clubUrl('terrazza-duomo-21-milan', locale);
  const terNye = capodannoEventPath('capodanno-terrazza-duomo-21', locale);
  const armaniClub = clubUrl('armani-prive-milan', locale);
  const justMeClub = clubUrl('just-me-milano', locale);
  const justMeNye = capodannoEventPath('capodanno-justme-milano-torre-branca', locale);
  const voyaClub = clubUrl('voya-rooftop-milan', locale);
  const voyaNye = capodannoEventPath('capodanno-voya-rooftop-milano', locale);
  const duomoZone = zoneUrl('duomo', locale);
  const cenaGuide = guideUrl('g-60', locale);
  const fifGuide = guideUrl('g-19', locale);

  const mibFormulas = makeTable(
    [tl.thFormula, tl.thDistrict, tl.thWeeklyRef, tl.thDressCode],
    [
      ['MIB · Aperitivo (19:30 - 21:30)', 'Via Gaetano Negri 10 · Piazza Affari', '20 - 25 EUR', tl.dressSmartChic],
      ['MIB · Singing Dinner Show (20:30 - 23:00)', 'Financial District Dining Room', '45 - 70 EUR', tl.dressSmartChic],
      ['MIB · Accredited Guestlist (23:00 - 00:45)', 'Wed, Thu, Fri, Sat & Corporate Dates', '15 - 25 EUR', tl.dressSmartChic],
      ['MIB · Dancefloor Bottle Table (6 - 8 pax)', 'Central Floor · 100% Bottle Credit', '250 - 320 EUR', tl.dressSmartChic],
      ['MIB · Financial District Privé (8 - 10 pax)', 'Raised Privé · Hostess Service', '450 - 700 EUR', tl.dressEveningElegance],
      ['MIB · Stage & Console Table (10 - 12 pax)', 'Front-Stage Super Privé · Security', '800 - 1.500 EUR', tl.dressEveningElegance],
      [`MIB · ${lx.nye} Seated Gala Dinner (from 20:00)`, 'Welcome Drink, Coat Check, 1 Wine per 2', '160 EUR', tl.dressEveningElegance],
      [`MIB · ${lx.nye} Buffet / Toast / After-Midnight`, 'Kent Funk Live Piano Bar · 18+ · until 05:30', '70 / 50 / 40 EUR', tl.dressEveningElegance],
    ],
  );

  const affariTable = makeTable(
    [tl.thVenue, tl.thDistrict, tl.thWeeklyRef, tl.thNye2027, tl.thStatus],
    [
      ['MIB Milano (Music In Business)', 'Via Gaetano Negri 10 (M1 Cordusio 200 m)', '15-25 EUR · VIP 250-1.500 EUR', '160 / 70 / 50 / 40 EUR · Tables 250-1.200 EUR', linkTag(mibNye, tl.statusConfirmed)],
      ['Terrazza Duomo 21 & MA.RE', 'Piazza del Duomo 21 (Via Silvio Pellico 2)', '20-25 EUR · VIP 300-2.000 EUR', '70 / 90 / 200 / 300 / 380 EUR', linkTag(terNye, tl.statusConfirmed)],
      ['Armani Privé Milano', 'Via Gastone Pisoni 1 (M3 Montenapoleone)', '25-40 EUR · VIP 500-5.000 EUR', tl.statusTba, linkTag(armaniClub, tl.statusTba)],
      ['Just Me Milano (ex Just Cavalli)', 'Viale Luigi Camoens 2 (Torre Branca)', tl.justMeRates, '80 / 300 EUR', linkTag(justMeNye, tl.statusConfirmed)],
      ['55 Milano (FiftyFive Sempione)', 'Via Piero della Francesca 55', tl.fiftyFiveRates, '160 / 100 / 30-50 EUR', linkTag(fifGuide, tl.statusConfirmed)],
      ['Voya Rooftop Milano (20th Floor)', 'Viale Achille Papa 30 (Portello)', tl.voyaRates, tl.voyaRates, linkTag(voyaNye, tl.statusConfirmed)],
    ],
    true,
  );

  const s1 = `<h3>MIB ${escapeHtml(lx.city)} · Via Gaetano Negri 10 (Piazza Affari)</h3>
<p>${escapeHtml(lx.mib_lead)}</p>
<p>${escapeHtml(cp.intro[0])} ${escapeHtml(cp.intro[1])}</p>
<h3>${escapeHtml(cp.h3[0])}</h3>
${mibFormulas}
<h3>${escapeHtml(cp.h3[1])}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.overview.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join('\n')}
</ul>
<p>${linkTag(mibClub, `MIB ${lx.city}`)} · ${linkTag(mibNye, `MIB ${lx.nye}`)} · ${linkTag(duomoZone, `Duomo & Piazza Affari`)} · ${linkTag(cenaGuide, lx.cen_disp)}.</p>`;

  const s2 = `<h3>Piazza Affari, Cordusio &amp; Duomo Partner Circuit</h3>
<p>${escapeHtml(cp.gattopardoCitylife.fiftyFiveRepvblicDetail)} ${escapeHtml(lx22.winter_aria || '')}</p>
<h3>${escapeHtml(cp.h3[9])}</h3>
${affariTable}
<h3>${escapeHtml(cp.h3[4])}</h3>
<p>${escapeHtml(cp.sempioneBreraComo.corsoComoLead)} ${escapeHtml(cp.sempioneBreraComo.pinetaClubLead)}</p>
<p>${linkTag(terClub, 'Terrazza Duomo 21')} · ${linkTag(armaniClub, 'Armani Privé')} · ${linkTag(voyaClub, 'Voya Rooftop')}.</p>`;

  const s3 = `<h3>${escapeHtml(cp.h3[3])}</h3>
<p>${escapeHtml(cp.sempioneBreraComo.justMeLead)}</p>
<h3>${escapeHtml(cp.h3[6])}</h3>
<p>${escapeHtml(cp.gattopardoCitylife.gattopardoDetail)} ${escapeHtml(cp.gattopardoCitylife.voyaDetail)}</p>
<h3>${escapeHtml(cp.h3[5])}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.sempioneBreraComo.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('\n')}
</ul>
<p>${linkTag(justMeClub, 'Just Me Milano (ex Just Cavalli)')} · ${linkTag(voyaNye, `Voya Rooftop ${lx.nye}`)}.</p>`;

  const s4 = `<h3>${escapeHtml(cp.h3[10])}</h3>
<p>${escapeHtml(cp.reggaetonNavigliSanSiro.gateAriaDetail)} ${escapeHtml(cp.reggaetonNavigliSanSiro.navigliEastDetail)}</p>
<h3>${escapeHtml(cp.h3[7])}</h3>
<p>${escapeHtml(lx22.winter_rep || cp.gattopardoCitylife.fiftyFiveRepvblicDetail)}</p>
<h3>${escapeHtml(cp.h3[11])}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.reggaetonNavigliSanSiro.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('\n')}
</ul>
<p>${linkTag(genreUrl('house', locale), 'House & Vocal House')} · ${linkTag(genreUrl('hip-hop', locale), 'Hip-Hop & Urban')} · ${linkTag(genreUrl('live-music', locale), 'Live Piano Bar')}.</p>`;

  const s5 = `<h3>${escapeHtml(cp.h3[12])}</h3>
<p>${escapeHtml(cp.doorPolicyAndClosed.dressCodeDetail)}</p>
<h3>${escapeHtml(cp.h3[13])}</h3>
<p>${escapeHtml(cp.doorPolicyAndClosed.allMaleBottleDetail)}</p>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.doorPolicyAndClosed.checklist.map((c) => `<li>${escapeHtml(c)}</li>`).join('\n')}
</ul>
<h3>${escapeHtml(cp.h3[14])}</h3>
<p>${escapeHtml(cp.doorPolicyAndClosed.closedAlertDetail)}</p>
${buildClosedVenuesHtml(locale)}`;

  const s6 = `<h3>${escapeHtml(cp.h3[15])}</h3>
<p>${escapeHtml(cp.conciergeAndTransit.conciergeDetail)}</p>
<ol class="list-decimal pl-6 space-y-2 my-4">
${cp.conciergeAndTransit.steps.map((st) => `<li>${escapeHtml(st)}</li>`).join('\n')}
</ol>
<h3>${escapeHtml(cp.h3[16])}</h3>
<p>${escapeHtml(cp.conciergeAndTransit.metroParkingDetail)}</p>
<h3>${escapeHtml(cp.h3[17])}</h3>
<p>${escapeHtml(cp.conciergeAndTransit.termeCrossLink)} ${escapeHtml(cp.overview.tableLead)}</p>
${buildPartner18MatrixHtml(locale)}
<p>${linkTag(mibClub, `MIB ${lx.city}`)} · ${linkTag(capodannoPath(locale), cp.conciergeAndTransit.nyeHubCta)} · <a href="https://wa.me/393519127047" class="underline decoration-current/55 underline-offset-4">${escapeHtml(cp.conciergeAndTransit.whatsappCta)}</a> | <a href="mailto:concierge@nightlifemilan.com" class="underline decoration-current/55 underline-offset-4">concierge@nightlifemilan.com</a>.</p>`;

  const out: RenderedGuide = {
    title: sanitizeText(lx.mib_title),
    excerpt: sanitizeText(lx.mib_exc),
    sections: [
      { heading: sanitizeText(`1. MIB ${lx.city} · Via Gaetano Negri 10 (Piazza Affari)`), content: s1 },
      { heading: sanitizeText(cp.h2[3]), content: s2 },
      { heading: sanitizeText(cp.h2[1]), content: s3 },
      { heading: sanitizeText(cp.h2[2]), content: s4 },
      { heading: sanitizeText(cp.h2[4]), content: s5 },
      { heading: sanitizeText(cp.h2[5]), content: s6 },
    ],
    faqs: composeFaqs(lx.mib_faq_q, lx.mib_faq_a, cp.faqs),
  };
  BATCH_20261125_CACHE.set(ck, out);
  return out;
}

// ─── 4. g-19 (POTENZIA): 55 MILANO (VIA PIERO DELLA FRANCESCA 55, SEMPIONE) ────
function renderFiftyFiveGuide(locale: LocaleCode): RenderedGuide {
  const ck = `g-19:${locale}`;
  const hit = BATCH_20261125_CACHE.get(ck);
  if (hit) return hit;

  const lx = GSC_BATCH_20261125_LEX[locale] || GSC_BATCH_20261125_LEX.en;
  const lx22 = GSC_BATCH_20261122_LEX[locale] || GSC_BATCH_20261122_LEX.en;
  const cp = CLUBBING_PILLAR_35[locale] || CLUBBING_PILLAR_35.en;
  const tl = cp.tableLabels;

  const fifClub = clubUrl('55-milano', locale);
  const fifNye = capodannoEventPath('capodanno-55-milano', locale);
  const gattoClub = clubUrl('il-gattopardo-milan', locale);
  const gattoNye = capodannoEventPath('capodanno-il-gattopardo-milano', locale);
  const justMeClub = clubUrl('just-me-milano', locale);
  const justMeNye = capodannoEventPath('capodanno-justme-milano-torre-branca', locale);
  const daziNye = capodannoEventPath('capodanno-dazi-milano-arco-della-pace', locale);
  const oldFashionClub = clubUrl('old-fashion-milan', locale);
  const pinetaClub = clubUrl('pineta-club-milano', locale);
  const sempioneZone = zoneUrl('arco-della-pace', locale);
  const arcGuide = guideUrl('g-102', locale);
  const cenaGuide = guideUrl('g-60', locale);

  const fifFormulas = makeTable(
    [tl.thFormula, tl.thDistrict, tl.thWeeklyRef, tl.thDressCode],
    [
      ['55 Milano · Royal Buffet Aperitivo Table (19:30 - 21:30)', 'Via Piero della Francesca 55 · 1.000 sqm Loft', '20 - 25 EUR', tl.dressSmartChic],
      ['55 Milano · Accredited Entry (until 00:30)', 'Tue - Sun · 21+ Women / 23+ Men', '15 - 20 EUR', tl.dressSmartChic],
      ['55 Milano · Dancefloor Bottle Table (6 - 8 pax)', 'Central Loft Floor · 100% Bottle Credit', '200 - 300 EUR', tl.dressSmartChic],
      ['55 Milano · Private Birthday & Graduation Area (8 - 12 pax)', 'Dedicated Privé Zone · Hostess', '350 - 600 EUR', tl.dressSmartChic],
      ['55 Milano · Exclusive Terrace & Loft Zone (12 - 20 pax)', 'Panoramic Terrace Privé · Security', '700 - 1.200 EUR', tl.dressEveningElegance],
      [`55 Milano · ${lx.nye} La Dolce Vita Seated Gala (20:30)`, 'Pozzi Riserva Risotto, Filet Mignon or Sea Bass', '160 EUR', tl.dressEveningElegance],
      [`55 Milano · ${lx.nye} Buffet with Laid Table (20:30)`, 'Guaranteed Seated Place · 1 Drink', '100 EUR', tl.dressEveningElegance],
      [`55 Milano · ${lx.nye} After-Dinner (from 00:10)`, 'Release 1 / 2 / 3 · Live Shows until 05:00', '30 / 40 / 50 EUR · Table 350 EUR', tl.dressEveningElegance],
    ],
  );

  const sempioneTable = makeTable(
    [tl.thVenue, tl.thDistrict, tl.thWeeklyRef, tl.thNye2027, tl.thStatus],
    [
      ['55 Milano (FiftyFive Sempione)', 'Via Piero della Francesca 55 (M5 Gerusalemme 250 m)', tl.fiftyFiveRates, '160 / 100 / 30-50 EUR · Table 350 EUR', linkTag(fifNye, tl.statusConfirmed)],
      ['Il Gattopardo Milano (Deconsecrated Church)', 'Via Piero della Francesca 47 (8 min on foot)', tl.gattopardoRates, '600 EUR', linkTag(gattoNye, tl.statusConfirmed)],
      ['Just Me Milano (ex Just Cavalli)', 'Viale Luigi Camoens 2 (Torre Branca, 7/7)', tl.justMeRates, '80 / 300 EUR', linkTag(justMeNye, tl.statusConfirmed)],
      ['Dazi Milano (Arco della Pace)', 'Piazza Sempione 1 (Neoclassical Tollhouses)', '20-25 EUR Aperitivo', '160 / 50 / 40 EUR', linkTag(daziNye, tl.statusConfirmed)],
      ['Pineta Milano', 'Via Messina 38 (M5 Cenisio, 3 min)', tl.pinetaRates, '40 / 160 EUR · VIP 300-1.500 EUR', linkTag(pinetaClub, tl.statusConfirmed)],
      ['Old Fashion Milano', 'Viale Emilio Alemagna 6 (Parco Sempione)', '20-30 EUR · VIP 300-800 EUR', 'Club Night (WhatsApp)', linkTag(oldFashionClub, tl.statusBenchmark)],
    ],
    true,
  );

  const s1 = `<h3>55 ${escapeHtml(lx.city)} · Via Piero della Francesca 55 (1.000 sqm Loft &amp; Terrace)</h3>
<p>${escapeHtml(lx.fif_lead)}</p>
<p>${escapeHtml(cp.intro[0])} ${escapeHtml(cp.intro[1])}</p>
<h3>${escapeHtml(cp.h3[0])}</h3>
${fifFormulas}
<h3>${escapeHtml(cp.h3[1])}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.overview.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join('\n')}
</ul>
<p>${linkTag(fifClub, `55 ${lx.city}`)} · ${linkTag(fifNye, `55 ${lx.city} ${lx.nye}`)} · ${linkTag(sempioneZone, 'Arco della Pace & Parco Sempione')} · ${linkTag(arcGuide, 'Arco della Pace')}.</p>`;

  const s2 = `<h3>Corso Sempione, Arco della Pace &amp; Parco Sempione Partner Circuit</h3>
<p>${escapeHtml(cp.gattopardoCitylife.fiftyFiveRepvblicDetail)} ${escapeHtml(lx22.winter_aria || '')}</p>
<h3>${escapeHtml(cp.h3[9])}</h3>
${sempioneTable}
<h3>${escapeHtml(cp.h3[4])}</h3>
<p>${escapeHtml(cp.sempioneBreraComo.pinetaClubLead)} ${escapeHtml(cp.sempioneBreraComo.corsoComoLead)}</p>
<p>${linkTag(gattoClub, 'Il Gattopardo')} · ${linkTag(daziNye, `Dazi ${lx.nye}`)} · ${linkTag(cenaGuide, lx.cen_disp)}.</p>`;

  const s3 = `<h3>${escapeHtml(cp.h3[3])}</h3>
<p>${escapeHtml(cp.sempioneBreraComo.justMeLead)}</p>
<h3>${escapeHtml(cp.h3[6])}</h3>
<p>${escapeHtml(cp.gattopardoCitylife.gattopardoDetail)} ${escapeHtml(cp.gattopardoCitylife.voyaDetail)}</p>
<h3>${escapeHtml(cp.h3[5])}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.sempioneBreraComo.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('\n')}
</ul>
<p>${linkTag(justMeClub, 'Just Me Milano (ex Just Cavalli)')} · ${linkTag(gattoNye, `Il Gattopardo ${lx.nye}`)}.</p>`;

  const s4 = `<h3>${escapeHtml(cp.h3[10])}</h3>
<p>${escapeHtml(cp.reggaetonNavigliSanSiro.navigliEastDetail)} ${escapeHtml(cp.reggaetonNavigliSanSiro.gardaTomDetail)}</p>
<h3>${escapeHtml(cp.h3[7])}</h3>
<p>${escapeHtml(lx22.winter_rep || cp.gattopardoCitylife.fiftyFiveRepvblicDetail)}</p>
<h3>${escapeHtml(cp.h3[11])}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.reggaetonNavigliSanSiro.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('\n')}
</ul>
<p>${linkTag(genreUrl('commercial', locale), 'Commercial & Dinner Show')} · ${linkTag(genreUrl('house', locale), 'House & Vocal House')} · ${linkTag(genreUrl('reggaeton', locale), 'Reggaeton & Urban')}.</p>`;

  const s5 = `<h3>${escapeHtml(cp.h3[12])}</h3>
<p>${escapeHtml(cp.doorPolicyAndClosed.dressCodeDetail)}</p>
<h3>${escapeHtml(cp.h3[13])}</h3>
<p>${escapeHtml(cp.doorPolicyAndClosed.allMaleBottleDetail)}</p>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.doorPolicyAndClosed.checklist.map((c) => `<li>${escapeHtml(c)}</li>`).join('\n')}
</ul>
<h3>${escapeHtml(cp.h3[14])}</h3>
<p>${escapeHtml(cp.doorPolicyAndClosed.closedAlertDetail)}</p>
${buildClosedVenuesHtml(locale)}`;

  const s6 = `<h3>${escapeHtml(cp.h3[15])}</h3>
<p>${escapeHtml(cp.conciergeAndTransit.conciergeDetail)}</p>
<ol class="list-decimal pl-6 space-y-2 my-4">
${cp.conciergeAndTransit.steps.map((st) => `<li>${escapeHtml(st)}</li>`).join('\n')}
</ol>
<h3>${escapeHtml(cp.h3[16])}</h3>
<p>${escapeHtml(cp.conciergeAndTransit.metroParkingDetail)}</p>
<h3>${escapeHtml(cp.h3[17])}</h3>
<p>${escapeHtml(cp.conciergeAndTransit.termeCrossLink)} ${escapeHtml(cp.overview.tableLead)}</p>
${buildPartner18MatrixHtml(locale)}
<p>${linkTag(fifClub, `55 ${lx.city}`)} · ${linkTag(capodannoPath(locale), cp.conciergeAndTransit.nyeHubCta)} · <a href="https://wa.me/393519127047" class="underline decoration-current/55 underline-offset-4">${escapeHtml(cp.conciergeAndTransit.whatsappCta)}</a> | <a href="mailto:concierge@nightlifemilan.com" class="underline decoration-current/55 underline-offset-4">concierge@nightlifemilan.com</a>.</p>`;

  const out: RenderedGuide = {
    title: sanitizeText(lx.fif_title),
    excerpt: sanitizeText(lx.fif_exc),
    sections: [
      { heading: sanitizeText(`1. 55 ${lx.city} · Via Piero della Francesca 55 (Sempione)`), content: s1 },
      { heading: sanitizeText(cp.h2[3]), content: s2 },
      { heading: sanitizeText(cp.h2[1]), content: s3 },
      { heading: sanitizeText(cp.h2[2]), content: s4 },
      { heading: sanitizeText(cp.h2[4]), content: s5 },
      { heading: sanitizeText(cp.h2[5]), content: s6 },
    ],
    faqs: composeFaqs(lx.fif_faq_q, lx.fif_faq_a, cp.faqs),
  };
  BATCH_20261125_CACHE.set(ck, out);
  return out;
}

// ─── 5. g-32 (POTENZIA): TERRAZZA DUOMO 21 (PIAZZA DEL DUOMO 21) ───────────────
function renderTerrazzaDuomo21Guide(locale: LocaleCode): RenderedGuide {
  const ck = `g-32:${locale}`;
  const hit = BATCH_20261125_CACHE.get(ck);
  if (hit) return hit;

  const lx = GSC_BATCH_20261125_LEX[locale] || GSC_BATCH_20261125_LEX.en;
  const lx22 = GSC_BATCH_20261122_LEX[locale] || GSC_BATCH_20261122_LEX.en;
  const cp = CLUBBING_PILLAR_35[locale] || CLUBBING_PILLAR_35.en;
  const tl = cp.tableLabels;

  const terClub = clubUrl('terrazza-duomo-21-milan', locale);
  const terNye = capodannoEventPath('capodanno-terrazza-duomo-21', locale);
  const voyaClub = clubUrl('voya-rooftop-milan', locale);
  const voyaNye = capodannoEventPath('capodanno-voya-rooftop-milano', locale);
  const ceresioClub = clubUrl('ceresio-7-milan', locale);
  const ceresioNye = capodannoEventPath('capodanno-ceresio-7-milano', locale);
  const mibClub = clubUrl('mib-milan', locale);
  const mibNye = capodannoEventPath('capodanno-mib-milano-piazza-affari', locale);
  const armaniClub = clubUrl('armani-prive-milan', locale);
  const justMeClub = clubUrl('just-me-milano', locale);
  const duomoZone = zoneUrl('duomo', locale);
  const rooftopGuide = guideUrl('g-rooftops-milan', locale);
  const mibGuide = guideUrl('g-31', locale);

  const terFormulas = makeTable(
    [tl.thFormula, tl.thDistrict, tl.thWeeklyRef, tl.thDressCode],
    [
      ['Terrazza Duomo 21 · Cathedral View Aperitivo (18:00 - 20:00)', 'Piazza del Duomo 21 · M1/M3 Duomo exit', '25 - 40 EUR', tl.dressSmartChic],
      ['Terrazza Duomo 21 · Dinner with Duomo View (20:00 - 22:30)', 'Indoor Dining Rooms & Terrace', '70 - 110 EUR', tl.dressEveningElegance],
      ['Terrazza Duomo 21 · Accredited Lounge Entry', 'Daily until 02:30 · 21+ Women / 23+ Men', '20 - 25 EUR', tl.dressEveningElegance],
      ['Terrazza Duomo 21 · Indoor Lounge Table (6 - 8 pax)', 'Weekend DJ Set · 100% Bottle Credit', '300 - 400 EUR', tl.dressEveningElegance],
      ['Terrazza Duomo 21 · Duomo View Terrace Table (8 - 10 pax)', 'Open-Air Terrace Privé · Hostess', '500 - 900 EUR', tl.dressBlackTie],
      ['Terrazza Duomo 21 · Front-Row Cathedral Privé (10 - 15 pax)', 'First Row onto the Spires · Security', '1.000 - 2.000 EUR', tl.dressBlackTie],
      [`Terrazza Duomo 21 · ${lx.nye} 1st Floor (Chef Valerio Braschi)`, 'Seated Gala 20:30 / Buffet 21:00 / Toast 23:00', '300 / 200 / 90 / 70 EUR', tl.dressBlackTie],
      [`Terrazza MA.RE · ${lx.nye} 5th Floor (2 Michelin Stars)`, 'Chefs Mario & Remo Capitaneo Tasting Menu', '380 EUR · Terrace Table 600 EUR', tl.dressBlackTie],
    ],
  );

  const duomoTable = makeTable(
    [tl.thVenue, tl.thDistrict, tl.thWeeklyRef, tl.thNye2027, tl.thStatus],
    [
      ['Terrazza Duomo 21 & Terrazza MA.RE', 'Piazza del Duomo 21 (Via Silvio Pellico 2)', '20-25 EUR · VIP 300-2.000 EUR', '70 / 90 / 200 / 300 / 380 EUR · Tables 600-1.200 EUR', linkTag(terNye, tl.statusConfirmed)],
      ['Voya Rooftop Milano (20th Floor)', 'Viale Achille Papa 30 (Portello / CityLife)', tl.voyaRates, tl.voyaRates, linkTag(voyaNye, tl.statusConfirmed)],
      ['Ceresio 7 Milano', 'Via Ceresio 7 (Monumentale)', tl.statusClosed, tl.statusClosed, linkTag(ceresioNye, tl.statusClosed)],
      ['MIB Milano (Piazza Affari)', 'Via Gaetano Negri 10 (M1 Cordusio)', '15-25 EUR · VIP 250-1.500 EUR', '160 / 70 / 50 / 40 EUR', linkTag(mibNye, tl.statusConfirmed)],
      ['Armani Privé Milano', 'Via Gastone Pisoni 1 (Quadrilatero)', '25-40 EUR · VIP 500-5.000 EUR', tl.statusTba, linkTag(armaniClub, tl.statusTba)],
      ['Just Me Milano (ex Just Cavalli)', 'Viale Luigi Camoens 2 (Torre Branca)', tl.justMeRates, '80 / 300 EUR', linkTag(justMeClub, tl.statusConfirmed)],
    ],
    true,
  );

  const s1 = `<h3>Terrazza Duomo 21 ${escapeHtml(lx.city)} · Piazza del Duomo 21</h3>
<p>${escapeHtml(lx.ter_lead)}</p>
<p>${escapeHtml(cp.intro[0])} ${escapeHtml(cp.intro[1])}</p>
<h3>${escapeHtml(cp.h3[0])}</h3>
${terFormulas}
<h3>${escapeHtml(cp.h3[1])}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.overview.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join('\n')}
</ul>
<p>${linkTag(terClub, 'Terrazza Duomo 21')} · ${linkTag(terNye, `Terrazza Duomo 21 ${lx.nye}`)} · ${linkTag(duomoZone, 'Duomo & Galleria')} · ${linkTag(rooftopGuide, 'Rooftop Guide')}.</p>`;

  const s2 = `<h3>Piazza Duomo, Galleria Vittorio Emanuele II &amp; Rooftop Partner Circuit</h3>
<p>${escapeHtml(cp.gattopardoCitylife.voyaDetail)} ${escapeHtml(lx22.winter_aria || '')}</p>
<h3>${escapeHtml(cp.h3[9])}</h3>
${duomoTable}
<h3>${escapeHtml(cp.h3[4])}</h3>
<p>${escapeHtml(cp.sempioneBreraComo.corsoComoLead)} ${escapeHtml(cp.sempioneBreraComo.pinetaClubLead)}</p>
<p>${linkTag(voyaClub, 'Voya Rooftop Milano')} · ${linkTag(mibClub, `MIB ${lx.city}`)} · ${linkTag(mibGuide, `MIB ${lx.city}`)} · ${linkTag(ceresioClub, 'Ceresio 7')}.</p>`;

  const s3 = `<h3>${escapeHtml(cp.h3[3])}</h3>
<p>${escapeHtml(cp.sempioneBreraComo.justMeLead)}</p>
<h3>${escapeHtml(cp.h3[6])}</h3>
<p>${escapeHtml(cp.gattopardoCitylife.gattopardoDetail)} ${escapeHtml(cp.gattopardoCitylife.voyaDetail)}</p>
<h3>${escapeHtml(cp.h3[5])}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.sempioneBreraComo.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('\n')}
</ul>
<p>${linkTag(justMeClub, 'Just Me Milano (ex Just Cavalli)')} · ${linkTag(voyaNye, `Voya Rooftop ${lx.nye}`)}.</p>`;

  const s4 = `<h3>${escapeHtml(cp.h3[10])}</h3>
<p>${escapeHtml(cp.reggaetonNavigliSanSiro.gateAriaDetail)} ${escapeHtml(cp.reggaetonNavigliSanSiro.navigliEastDetail)}</p>
<h3>${escapeHtml(cp.h3[7])}</h3>
<p>${escapeHtml(lx22.winter_rep || cp.gattopardoCitylife.fiftyFiveRepvblicDetail)}</p>
<h3>${escapeHtml(cp.h3[11])}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.reggaetonNavigliSanSiro.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('\n')}
</ul>
<p>${linkTag(genreUrl('house', locale), 'Vocal House & Melodic')} · ${linkTag(genreUrl('commercial', locale), 'Commercial & Lounge')} · ${linkTag(genreUrl('live-music', locale), 'Live & Skyline Sets')}.</p>`;

  const s5 = `<h3>${escapeHtml(cp.h3[12])}</h3>
<p>${escapeHtml(cp.doorPolicyAndClosed.dressCodeDetail)}</p>
<h3>${escapeHtml(cp.h3[13])}</h3>
<p>${escapeHtml(cp.doorPolicyAndClosed.allMaleBottleDetail)}</p>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.doorPolicyAndClosed.checklist.map((c) => `<li>${escapeHtml(c)}</li>`).join('\n')}
</ul>
<h3>${escapeHtml(cp.h3[14])}</h3>
<p>${escapeHtml(cp.doorPolicyAndClosed.closedAlertDetail)}</p>
${buildClosedVenuesHtml(locale)}`;

  const s6 = `<h3>${escapeHtml(cp.h3[15])}</h3>
<p>${escapeHtml(cp.conciergeAndTransit.conciergeDetail)}</p>
<ol class="list-decimal pl-6 space-y-2 my-4">
${cp.conciergeAndTransit.steps.map((st) => `<li>${escapeHtml(st)}</li>`).join('\n')}
</ol>
<h3>${escapeHtml(cp.h3[16])}</h3>
<p>${escapeHtml(cp.conciergeAndTransit.metroParkingDetail)}</p>
<h3>${escapeHtml(cp.h3[17])}</h3>
<p>${escapeHtml(cp.conciergeAndTransit.termeCrossLink)} ${escapeHtml(cp.overview.tableLead)}</p>
${buildPartner18MatrixHtml(locale)}
<p>${linkTag(terClub, 'Terrazza Duomo 21')} · ${linkTag(capodannoPath(locale), cp.conciergeAndTransit.nyeHubCta)} · <a href="https://wa.me/393519127047" class="underline decoration-current/55 underline-offset-4">${escapeHtml(cp.conciergeAndTransit.whatsappCta)}</a> | <a href="mailto:concierge@nightlifemilan.com" class="underline decoration-current/55 underline-offset-4">concierge@nightlifemilan.com</a>.</p>`;

  const out: RenderedGuide = {
    title: sanitizeText(lx.ter_title),
    excerpt: sanitizeText(lx.ter_exc),
    sections: [
      { heading: sanitizeText(`1. Terrazza Duomo 21 · Piazza del Duomo 21`), content: s1 },
      { heading: sanitizeText(cp.h2[3]), content: s2 },
      { heading: sanitizeText(cp.h2[1]), content: s3 },
      { heading: sanitizeText(cp.h2[2]), content: s4 },
      { heading: sanitizeText(cp.h2[4]), content: s5 },
      { heading: sanitizeText(cp.h2[5]), content: s6 },
    ],
    faqs: composeFaqs(lx.ter_faq_q, lx.ter_faq_a, cp.faqs),
  };
  BATCH_20261125_CACHE.set(ck, out);
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

export function applyGscGuidesBatch20261125(guidesList: Guide[]): void {
  const upgrades: Array<{
    id: string;
    renderer: (loc: LocaleCode) => RenderedGuide;
    genres: MusicGenre[];
    hero: string;
  }> = [
    {
      id: 'g-34',
      renderer: renderApolloGuide,
      genres: [MusicGenre.HOUSE, MusicGenre.COMMERCIAL, MusicGenre.INDIE],
      hero: '/images/guides-editorial/apollo-navigli.webp',
    },
    {
      id: 'g-60',
      renderer: renderCenaCantataGuide,
      genres: [MusicGenre.LIVE_MUSIC, MusicGenre.COMMERCIAL, MusicGenre.HOUSE],
      hero: '/images/guides-editorial/bischeri-dinner.webp',
    },
    {
      id: 'g-31',
      renderer: renderMibGuide,
      genres: [MusicGenre.HOUSE, MusicGenre.HIP_HOP, MusicGenre.LIVE_MUSIC],
      hero: '/images/venues/mib-milano/mib-milano-interior-01.webp',
    },
    {
      id: 'g-19',
      renderer: renderFiftyFiveGuide,
      genres: [MusicGenre.COMMERCIAL, MusicGenre.HOUSE, MusicGenre.REGGAETON],
      hero: '/images/guides-editorial/fiftyfive-loft.webp',
    },
    {
      id: 'g-32',
      renderer: renderTerrazzaDuomo21Guide,
      genres: [MusicGenre.HOUSE, MusicGenre.COMMERCIAL, MusicGenre.LIVE_MUSIC],
      hero: '/images/guides-editorial/terrazza-duomo-skyline.webp',
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
