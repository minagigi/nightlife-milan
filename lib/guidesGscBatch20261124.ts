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
import { GSC_BATCH_20261124_LEX } from './i18n/pillarGuides20261124';
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
  const base = (raw || '')
    .replace(/\u2014/g, '-')
    .replace(/\u2013/g, '-')
    .replace(/\u2605/g, '*')
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

const BATCH_20261124_CACHE = new Map<string, RenderedGuide>();

export function getGsc20261124DisplayHeadline(guideId: string, locale: LocaleCode): string | null {
  const lx = GSC_BATCH_20261124_LEX[locale] || GSC_BATCH_20261124_LEX.en;
  if (guideId === 'g-24') return sanitizeText(`Alcatraz ${lx.city}`);
  if (guideId === 'g-23') return sanitizeText(`Volt Club ${lx.city}`);
  if (guideId === 'g-102') return sanitizeText(lx.arc_disp);
  if (guideId === 'g-22') return 'Armani Privé';
  if (guideId === 'g-36') return sanitizeText(`Church 81 ${lx.city}`);
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

function buildPartner18MatrixHtml(locale: LocaleCode): string {
  const cp = CLUBBING_PILLAR_35[locale] || CLUBBING_PILLAR_35.en;
  const tl = cp.tableLabels;
  const rows: Array<[string, string, string, string, string, string]> = [
    [
      `${linkTag(clubUrl('just-me-milano', locale), 'Just Me Milano (ex Just Cavalli)')} · ${linkTag(capodannoEventPath('capodanno-justme-milano-torre-branca', locale), 'NYE 2027')}`,
      'Parco Sempione · Viale Luigi Camoens 2 (Torre Branca)',
      'House, Commercial, Hip-Hop & Reggaeton (7/7)',
      tl.dressSmartChic,
      tl.justMeRates,
      tl.statusConfirmed,
    ],
    [
      `${linkTag(clubUrl('pineta-club-milano', locale), 'Pineta Milano')} · ${linkTag(capodannoEventPath('capodanno-pineta-milano', locale), 'NYE 2027')}`,
      'Porta Garibaldi / Cenisio · Via Messina 38',
      'House, Commercial, Dinner Show & Reggaeton',
      tl.dressSmartChic,
      tl.pinetaRates,
      tl.statusConfirmed,
    ],
    [
      `${linkTag(clubUrl('voya-rooftop-milan', locale), 'Voya Rooftop Milano (20° Piano)')} · ${linkTag(capodannoEventPath('capodanno-voya-rooftop-milano', locale), 'NYE 2027')}`,
      'Portello / CityLife · Viale Achille Papa 30',
      'Vocal House, Melodic & Rooftop Skyline',
      tl.dressBlackTie,
      tl.voyaRates,
      tl.statusConfirmed,
    ],
    [
      `${linkTag(clubUrl('repvblic-milano', locale), 'REPVBLIC Milano')} · ${linkTag(capodannoEventPath('capodanno-repvblic-milano', locale), 'NYE 2027')}`,
      'Repubblica · Piazza della Repubblica 12',
      'Commercial Hits, Hip-Hop & Reggaeton',
      tl.dressEveningElegance,
      tl.repvblicRates,
      tl.statusConfirmed,
    ],
    [
      linkTag(capodannoEventPath('capodanno-bischeri-milano', locale), 'Bischeri Milano (NYE 2027)'),
      'Sud / Ripamonti · Via Giuseppe Ripamonti',
      'Gala Dinner Show, Commercial & Disco',
      tl.dressEveningElegance,
      tl.bischeriRates,
      tl.statusConfirmed,
    ],
    [
      linkTag(capodannoEventPath('capodanno-gate-milano', locale), 'Gate Milano (PERREO XL)'),
      'Isola / Scalo Farini · Via Valtellina 21',
      'Reggaeton, Dembow, Latin Urban & Hip-Hop',
      tl.dressUrbanChic,
      tl.gateRates,
      tl.statusConfirmed,
    ],
    [
      linkTag(capodannoEventPath('capodanno-pelledoca-milano', locale), 'Pelledoca Milano'),
      'Est / Forlanini · Viale Enrico Forlanini 121',
      'Gala Dinner, Italian Revival & Dancefloor',
      tl.dressEveningElegance,
      tl.pelledocaRates,
      tl.statusConfirmed,
    ],
    [
      `${linkTag(clubUrl('bobino-milano', locale), 'Bobino Milano')} · ${linkTag(capodannoEventPath('capodanno-bobino-milano', locale), 'NYE 2027')}`,
      'Navigli / Porta Genova · Piazzale Stazione Genova 4',
      'DJ Set 30+, House Revival & Aperitivo Show',
      tl.dressSmartChic,
      tl.bobinoRates,
      tl.statusConfirmed,
    ],
    [
      `${linkTag(clubUrl('magazzini-generali-milano', locale), 'Magazzini Generali Milano')} · ${linkTag(capodannoEventPath('capodanno-magazzini-generali-milano', locale), 'NYE 2027')}`,
      'Ripamonti / IEO · Via Pietrasanta 16',
      'We Love 2000, Club Hits & Electronic',
      tl.dressUrbanChic,
      tl.magazziniRates,
      tl.statusConfirmed,
    ],
    [
      `${linkTag(clubUrl('the-club-milano', locale), 'The Club Milano (Brera)')} · ${linkTag(capodannoEventPath('capodanno-the-club-milano', locale), 'NYE 2027')}`,
      'Brera / Moscova · Corso Garibaldi 97',
      'House, Hip-Hop, Reggaeton & International',
      tl.dressSmartChic,
      tl.theClubRates,
      tl.statusConfirmed,
    ],
    [
      `${linkTag(clubUrl('aria-club-milano', locale), 'Aria Club Milano (San Siro)')} · ${linkTag(capodannoEventPath('capodanno-aria-club-milano', locale), 'NYE 2027')}`,
      'San Siro · Piazzale dello Sport 14 (150 m Stadio)',
      'Commercial, Reggaeton & Hip-Hop',
      tl.dressEveningElegance,
      tl.ariaRates,
      tl.statusBenchmark,
    ],
    [
      `${linkTag(clubUrl('55-milano', locale), '55 Milano (1.000 mq Loft)')} · ${linkTag(capodannoEventPath('capodanno-55-milano', locale), 'NYE 2027')}`,
      'Sempione · Via Piero della Francesca 55',
      'Revival 80/90, Vocal House & Aperitivo',
      tl.dressSmartChic,
      tl.fiftyFiveRates,
      tl.statusBenchmark,
    ],
    [
      `${linkTag(clubUrl('hollywood-club-milano', locale), 'Hollywood Milano (Rythmoteque)')} · ${linkTag(capodannoEventPath('capodanno-hollywood-milano', locale), 'NYE 2027')}`,
      'Corso Como · Corso Como 15',
      'Fashion House, Hip-Hop & Reggaeton',
      tl.dressSmartChic,
      tl.hollywoodRates,
      tl.statusBenchmark,
    ],
    [
      `${linkTag(clubUrl('11-clubroom', locale), '11 Clubroom Milano')} · ${linkTag(capodannoEventPath('capodanno-11clubroom-milano', locale), 'NYE 2027')}`,
      'Corso Como · Via Alessio di Tocqueville 11',
      'House & Hip-Hop Lounge Boutique',
      tl.dressSmartChic,
      tl.elevenRates,
      tl.statusBenchmark,
    ],
    [
      `${linkTag(clubUrl('tocqueville-13-milano', locale), 'Tocqueville 13 Milano')} · ${linkTag(capodannoEventPath('capodanno-tocqueville-13-milano', locale), 'NYE 2027')}`,
      'Corso Como · Via Alessio di Tocqueville 13',
      'Dinner Show, Hip-Hop, Reggaeton & Commercial',
      tl.dressSmartChic,
      tl.tocquevilleRates,
      tl.statusBenchmark,
    ],
    [
      linkTag(capodannoEventPath('capodanno-tom-the-ordinary-market-milano', locale), 'TOM. The Ordinary Market'),
      'Zona Darsena / Ticinese · Via della Chiusa 15',
      'House, Nu-Disco & Soulful Grooves',
      tl.dressEveningElegance,
      tl.tomRates,
      tl.statusTba,
    ],
    [
      `${linkTag(clubUrl('gattopardo-milano', locale), 'Il Gattopardo Milano')} · ${linkTag(capodannoEventPath('capodanno-il-gattopardo-milano', locale), 'NYE 2027')}`,
      'Sempione · Via Piero della Francesca 47 (Ex Chiesa)',
      'House, Vocal & Commercial Deluxe',
      tl.dressBlackTie,
      tl.gattopardoRates,
      tl.statusConfirmed,
    ],
    [
      linkTag(capodannoEventPath('capodanno-justme-garda-lake', locale), 'JustMe Garda Lake (Lonato / Sirmione)'),
      'Lago di Garda · Via Lavagnone 13, Lonato del Garda (BS)',
      'Resort Clubbing, Commercial & House',
      tl.dressSmartChic,
      tl.gardaRates,
      tl.statusConfirmed,
    ],
  ];
  const body = rows
    .map(
      ([venueHtml, district, music, dress, rates, status]) =>
        `<tr><td class="font-semibold">${venueHtml}</td><td>${escapeHtml(district)}</td><td>${escapeHtml(music)}</td><td>${escapeHtml(dress)}</td><td class="whitespace-nowrap">${escapeHtml(rates)}</td><td class="font-semibold whitespace-nowrap">${escapeHtml(status)}</td></tr>`,
    )
    .join('\n');
  return `<div class="taste-table-scroll"><table class="taste-data-table"><thead><tr><th>${escapeHtml(tl.thVenue)}</th><th>${escapeHtml(tl.thDistrict)}</th><th>${escapeHtml(tl.thMusic)}</th><th>${escapeHtml(tl.thDressCode)}</th><th>${escapeHtml(tl.thRates2027)}</th><th>${escapeHtml(tl.thStatus)}</th></tr></thead><tbody>\n${body}\n</tbody></table></div>`;
}

function buildClosedVenuesHtml(locale: LocaleCode): string {
  const cp = CLUBBING_PILLAR_35[locale] || CLUBBING_PILLAR_35.en;
  const tl = cp.tableLabels;
  const links = [
    capodannoEventPath('capodanno-fabrique-milano', locale),
    capodannoEventPath('capodanno-ceresio-7-milano', locale),
    capodannoEventPath('capodanno-hotel-principe-di-savoia-milano', locale),
  ];
  const body = cp.doorPolicyAndClosed.closedRows
    .map(
      ([venue, status, alts], idx) =>
        `<tr><td class="font-semibold">${linkTag(links[idx] || capodannoPath(locale), venue)}</td><td>${escapeHtml(status)}</td><td>${escapeHtml(alts)}</td></tr>`,
    )
    .join('\n');
  return `<div class="taste-table-scroll"><table class="taste-data-table"><thead><tr><th>${escapeHtml(tl.thClosedVenue)}</th><th>${escapeHtml(tl.thClosedStatus)}</th><th>${escapeHtml(tl.thOpenAlt)}</th></tr></thead><tbody>\n${body}\n</tbody></table></div>`;
}

function composeFaqs(firstQ: string, firstA: string, cpFaqs: [string, string][]): Array<{ question: string; answer: string }> {
  const base = cpFaqs.slice(0, 5).map(([q, a]) => ({ question: sanitizeText(q), answer: sanitizeText(a) }));
  return [{ question: sanitizeText(firstQ), answer: sanitizeText(firstA) }, ...base];
}

// ─── 1. g-24 (POTENZIA): ALCATRAZ MILANO (VIA VALTELLINA 25) ───────────────────
function renderAlcatrazGuide(locale: LocaleCode): RenderedGuide {
  const ck = `g-24:${locale}`;
  const hit = BATCH_20261124_CACHE.get(ck);
  if (hit) return hit;

  const lx = GSC_BATCH_20261124_LEX[locale] || GSC_BATCH_20261124_LEX.en;
  const lx22 = GSC_BATCH_20261122_LEX[locale] || GSC_BATCH_20261122_LEX.en;
  const cp = CLUBBING_PILLAR_35[locale] || CLUBBING_PILLAR_35.en;
  const tl = cp.tableLabels;

  const alcClub = clubUrl('alcatraz-milano', locale);
  const alcNye = capodannoEventPath('capodanno-alcatraz-milano', locale);
  const gateNye = capodannoEventPath('capodanno-gate-milano', locale);
  const pinetaClub = clubUrl('pineta-club-milano', locale);
  const pinetaNye = capodannoEventPath('capodanno-pineta-milano', locale);
  const hollyClub = clubUrl('hollywood-club-milano', locale);
  const tocqClub = clubUrl('tocqueville-13-milano', locale);
  const theClub = clubUrl('the-club-milano', locale);
  const magClub = clubUrl('magazzini-generali-milano', locale);
  const isolaZone = zoneUrl('isola', locale);
  const regGuide = guideUrl('g-119', locale);
  const clubGuide = guideUrl('g-118', locale);
  const concertGuide = guideUrl('g-concert-afterparties-milan', locale);

  const alcFormulas = makeTable(
    [tl.thFormula, tl.thDistrict, tl.thWeeklyRef, tl.thDressCode],
    [
      ['Alcatraz · Live Concert Show (20:00 - 23:00)', 'Via Valtellina 25 · Main Hall (3.000 pax)', '18 - 45 EUR Ticket', tl.dressUrbanChic],
      ['Alcatraz · Accredited Club List (Fri & Sat)', 'Pista 1 + Pista 2 + Pista 3 (23:00 - 01:00)', '15 - 20 EUR (1 Drink)', tl.dressUrbanChic],
      ['Alcatraz · Pista 1 Main Stage (Commercial & 2000s)', 'Central Arena · Confetti & LED Mega-Screen', '200 - 250 EUR (6-8 pax)', tl.dressSmartChic],
      ['Alcatraz · Pista 2 Reggaeton, Dembow & Hip-Hop', 'Urban Dancefloor Wing (23:30 - 05:00)', '200 - 280 EUR (6-8 pax)', tl.dressUrbanChic],
      ['Alcatraz · Pista 3 Rock, Pop-Punk & Alternative', 'Dedicated Guitar & Indie Room', 'Included in Pass', tl.dressUrbanChic],
      ['Alcatraz · Panoramic Raised Balcony Privé', '8 - 10 pax (100% Bottle Credit + Hostess)', '350 - 500 EUR', tl.dressSmartChic],
      ['Alcatraz · Main Stage Console Super Privé', '10 - 15 pax (100% Bottle Credit + Security)', '600 - 1.200 EUR', tl.dressEveningElegance],
      [`Alcatraz & Scalo Farini · ${lx.nye}`, 'Via Valtellina 25 & Gate Milano (50 m)', 'WhatsApp +39 351 912 7047', tl.dressSmartChic],
    ],
  );

  const fariniTable = makeTable(
    [tl.thVenue, tl.thDistrict, tl.thWeeklyRef, tl.thNye2027, tl.thStatus],
    [
      ['Alcatraz Milano (3 Rooms)', 'Via Valtellina 25 (M3 Maciachini / M5)', '15-20 EUR · VIP 200-1.200 EUR', 'Multi-Room Arena (WhatsApp)', linkTag(alcNye, tl.statusConfirmed)],
      ['Gate Milano · PERREO XL (50 m)', 'Via Valtellina 21 (Scalo Farini)', tl.gateRates, tl.gateRates, linkTag(gateNye, tl.statusConfirmed)],
      ['Pineta Milano', 'Via Messina 38 (Cenisio M5 · 3 min)', tl.pinetaRates, '40 / 160 EUR · VIP 300-1.500 EUR', linkTag(pinetaNye, tl.statusConfirmed)],
      ['Hollywood Milano (7/7)', 'Corso Como 15 (Garibaldi M2/M5)', tl.hollywoodRates, tl.hollywoodRates, linkTag(hollyClub, tl.statusBenchmark)],
      ['Tocqueville 13 Milano', 'Via Alessio di Tocqueville 13', tl.tocquevilleRates, tl.tocquevilleRates, linkTag(tocqClub, tl.statusBenchmark)],
      ['The Club Milano (Brera)', 'Corso Garibaldi 97 (M2 Moscova)', tl.theClubRates, tl.theClubRates, linkTag(theClub, tl.statusConfirmed)],
      ['Magazzini Generali Milano', 'Via Pietrasanta 16 (Live + Club)', tl.magazziniRates, '35 / 80 EUR · VIP 400-750 EUR', linkTag(magClub, tl.statusConfirmed)],
    ],
    true,
  );

  const s1 = `<h3>Alcatraz ${escapeHtml(lx.city)} · Via Valtellina 25 (Isola & Scalo Farini)</h3>
<p>${escapeHtml(lx.alc_lead)}</p>
<p>${escapeHtml(cp.intro[0])} ${escapeHtml(cp.intro[1])}</p>
<h3>${escapeHtml(cp.h3[0])}</h3>
${alcFormulas}
<h3>${escapeHtml(cp.h3[1])}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.overview.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join('\n')}
</ul>
<p>${linkTag(alcClub, `Alcatraz ${lx.city}`)} · ${linkTag(alcNye, `Alcatraz ${lx.nye}`)} · ${linkTag(isolaZone, 'Isola & Scalo Farini')} · ${linkTag(concertGuide, 'Concert Afterparties')}.</p>`;

  const s2 = `<h3>Via Valtellina, Porta Garibaldi & Corso Como Partner Circuit</h3>
<p>${escapeHtml(cp.reggaetonNavigliSanSiro.gateAriaDetail)} ${escapeHtml(lx22.winter_aria || '')}</p>
<h3>${escapeHtml(cp.h3[9])}</h3>
${fariniTable}
<h3>${escapeHtml(cp.h3[4])}</h3>
<p>${escapeHtml(cp.sempioneBreraComo.pinetaClubLead)} ${escapeHtml(cp.sempioneBreraComo.corsoComoLead)}</p>
<p>${linkTag(gateNye, 'Gate Milano PERREO XL')} · ${linkTag(pinetaClub, 'Pineta Milano')} · ${linkTag(regGuide, lx22.reg_short)} · ${linkTag(clubGuide, lx22.cal_short)}.</p>`;

  const s3 = `<h3>${escapeHtml(cp.h3[3])}</h3>
<p>${escapeHtml(cp.sempioneBreraComo.justMeLead)}</p>
<h3>${escapeHtml(cp.h3[6])}</h3>
<p>${escapeHtml(cp.gattopardoCitylife.gattopardoDetail)} ${escapeHtml(cp.gattopardoCitylife.voyaDetail)}</p>
<h3>${escapeHtml(cp.h3[5])}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.sempioneBreraComo.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('\n')}
</ul>`;

  const s4 = `<h3>${escapeHtml(cp.h3[10])}</h3>
<p>${escapeHtml(cp.reggaetonNavigliSanSiro.navigliEastDetail)} ${escapeHtml(cp.reggaetonNavigliSanSiro.gardaTomDetail)}</p>
<h3>${escapeHtml(cp.h3[7])}</h3>
<p>${escapeHtml(lx22.winter_rep || cp.gattopardoCitylife.fiftyFiveRepvblicDetail)}</p>
<h3>${escapeHtml(cp.h3[11])}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.reggaetonNavigliSanSiro.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('\n')}
</ul>
<p>${linkTag(genreUrl('commercial', locale), 'Commercial & 2000s')} · ${linkTag(genreUrl('reggaeton', locale), 'Reggaeton & Urban')} · ${linkTag(genreUrl('live-music', locale), 'Live Concerts')}.</p>`;

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
<p>${linkTag(alcClub, `Alcatraz ${lx.city}`)} · ${linkTag(capodannoPath(locale), cp.conciergeAndTransit.nyeHubCta)} · <a href="https://wa.me/393519127047" class="underline decoration-current/55 underline-offset-4">${escapeHtml(cp.conciergeAndTransit.whatsappCta)}</a> | <a href="mailto:concierge@nightlifemilan.com" class="underline decoration-current/55 underline-offset-4">concierge@nightlifemilan.com</a>.</p>`;

  const out: RenderedGuide = {
    title: sanitizeText(lx.alc_title),
    excerpt: sanitizeText(lx.alc_exc),
    sections: [
      { heading: sanitizeText(`1. Alcatraz ${lx.city} · Via Valtellina 25 (3 Rooms & Live)`), content: s1 },
      { heading: sanitizeText(cp.h2[3]), content: s2 },
      { heading: sanitizeText(cp.h2[1]), content: s3 },
      { heading: sanitizeText(cp.h2[2]), content: s4 },
      { heading: sanitizeText(cp.h2[4]), content: s5 },
      { heading: sanitizeText(cp.h2[5]), content: s6 },
    ],
    faqs: composeFaqs(lx.alc_faq_q, lx.alc_faq_a, cp.faqs),
  };
  BATCH_20261124_CACHE.set(ck, out);
  return out;
}

// ─── 2. g-23 (POTENZIA): VOLT CLUB MILANO (VIA MOLINO DELLE ARMI 16) ───────────
function renderVoltGuide(locale: LocaleCode): RenderedGuide {
  const ck = `g-23:${locale}`;
  const hit = BATCH_20261124_CACHE.get(ck);
  if (hit) return hit;

  const lx = GSC_BATCH_20261124_LEX[locale] || GSC_BATCH_20261124_LEX.en;
  const lx22 = GSC_BATCH_20261122_LEX[locale] || GSC_BATCH_20261122_LEX.en;
  const cp = CLUBBING_PILLAR_35[locale] || CLUBBING_PILLAR_35.en;
  const tl = cp.tableLabels;

  const voltClub = clubUrl('volt-club-milano', locale);
  const voltNye = capodannoEventPath('capodanno-volt-club-milano', locale);
  const apolloClub = clubUrl('apollo-club-milano', locale);
  const bobinoClub = clubUrl('bobino-milano', locale);
  const bobinoNye = capodannoEventPath('capodanno-bobino-milano', locale);
  const tomNye = capodannoEventPath('capodanno-tom-the-ordinary-market-milano', locale);
  const repClub = clubUrl('repvblic-milano', locale);
  const repNye = capodannoEventPath('capodanno-repvblic-milano', locale);
  const magNye = capodannoEventPath('capodanno-magazzini-generali-milano', locale);
  const technoGuide = guideUrl('g-techno-2026', locale);
  const bobinoGuide = guideUrl('g-38', locale);
  const clubGuide = guideUrl('g-118', locale);

  const voltFormulas = makeTable(
    [tl.thFormula, tl.thDistrict, tl.thWeeklyRef, tl.thDressCode],
    [
      ['Volt Club · Thursday Boutique Session', 'Via Molino delle Armi 16 (23:30 - 04:30)', '20 - 25 EUR Selective List', tl.dressUrbanChic],
      ['Volt Club · Friday & Saturday International Guest', 'M4 Vetra / Colonne San Lorenzo (23:30 - 05:00)', '25 - 30 EUR Selective List', tl.dressSmartChic],
      ['Volt Club · Main Room Dancefloor VIP Table', '6 - 8 pax (100% Bottle Credit + Fast-Track)', '350 - 450 EUR', tl.dressSmartChic],
      ['Volt Club · Elevated Ring Privé Booth', '8 - 10 pax (100% Bottle Credit + Dedicated Hostess)', '700 - 1.000 EUR', tl.dressEveningElegance],
      ['Volt Club · Backstage & DJ Console Booth', '10 - 15 pax (Behind International Resident/Guest DJ)', '1.200 - 2.500 EUR', tl.dressBlackTie],
      ['Volt Club · Fashion & Design Week Showcase', 'Capsule Label Nights (Pre-Authorization Required)', '1.000 - 3.500 EUR', tl.dressBlackTie],
      [`Volt Club · ${lx.nye} Status`, 'Via Molino delle Armi 16 (WhatsApp Concierge)', 'WhatsApp +39 351 912 7047', tl.dressEveningElegance],
    ],
  );

  const electronicCircuit = makeTable(
    [tl.thVenue, tl.thDistrict, tl.thMusic, tl.thNye2027, tl.thStatus],
    [
      ['Volt Club Milano', 'Via Molino delle Armi 16 (M4 Vetra)', 'Melodic Techno, Afro-House & Indie Dance', 'VIP 350 - 2.500 EUR (WA)', linkTag(voltNye, tl.statusConfirmed)],
      ['Apollo Club Milano', 'Via Giosuè Borsi 9 (Navigli / Darsena)', 'House, Nu-Disco & Electronic', '20-25 EUR · VIP 250-900 EUR', linkTag(apolloClub, tl.statusConfirmed)],
      ['TOM. The Ordinary Market', 'Via della Chiusa 15 (300 m from Volt)', 'Soulful House, Nu-Disco & Cocktail', tl.tomRates, linkTag(tomNye, tl.statusTba)],
      ['Bobino Milano (Partner)', 'Piazzale Stazione Genova 4 (M2)', 'House Revival, Aperitivo & Club 30+', tl.bobinoRates, linkTag(bobinoNye, tl.statusConfirmed)],
      ['REPVBLIC Milano (Partner)', 'Piazza della Repubblica 12 (M3)', 'House, Hip-Hop & Luxury Clubbing', '45 EUR · VIP 600-1.200 EUR', linkTag(repNye, tl.statusConfirmed)],
      ['Magazzini Generali (Partner)', 'Via Pietrasanta 16 (Ripamonti)', 'Electronic, Live & We Love 2000', '35 / 80 EUR · VIP 400-750 EUR', linkTag(magNye, tl.statusConfirmed)],
    ],
    true,
  );

  const s1 = `<h3>Volt Club ${escapeHtml(lx.city)} · Via Molino delle Armi 16 (M4 Vetra & Colonne)</h3>
<p>${escapeHtml(lx.vol_lead)}</p>
<p>${escapeHtml(cp.intro[0])} ${escapeHtml(cp.intro[1])}</p>
<h3>${escapeHtml(cp.h3[0])}</h3>
${voltFormulas}
<h3>${escapeHtml(cp.h3[2])}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.overview.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join('\n')}
</ul>
<p>${linkTag(voltClub, `Volt Club ${lx.city}`)} · ${linkTag(voltNye, `Volt ${lx.nye}`)} · ${linkTag(technoGuide, 'Techno & Afro-House 2026/2027')} · ${linkTag(genreUrl('afro-house', locale), 'Afro-House & Melodic')}.</p>`;

  const s2 = `<h3>Centro Storico, Colonne di San Lorenzo, Ticinese & Navigli Circuit</h3>
<p>${escapeHtml(cp.reggaetonNavigliSanSiro.navigliEastDetail)} ${escapeHtml(cp.reggaetonNavigliSanSiro.gardaTomDetail)}</p>
<h3>${escapeHtml(cp.h3[10])}</h3>
${electronicCircuit}
<h3>${escapeHtml(cp.h3[7])}</h3>
<p>${escapeHtml(lx22.winter_rep || cp.gattopardoCitylife.fiftyFiveRepvblicDetail)}</p>
<p>${linkTag(bobinoClub, 'Bobino Milano')} · ${linkTag(bobinoGuide, lx22.bob_short)} · ${linkTag(repClub, 'REPVBLIC Milano')} · ${linkTag(clubGuide, lx22.cal_short)}.</p>`;

  const s3 = `<h3>${escapeHtml(cp.h3[3])}</h3>
<p>${escapeHtml(cp.sempioneBreraComo.justMeLead)} ${escapeHtml(cp.sempioneBreraComo.pinetaClubLead)}</p>
<h3>${escapeHtml(cp.h3[4])}</h3>
<p>${escapeHtml(cp.sempioneBreraComo.corsoComoLead)}</p>
<h3>${escapeHtml(cp.h3[5])}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.sempioneBreraComo.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('\n')}
</ul>`;

  const s4 = `<h3>${escapeHtml(cp.h3[6])}</h3>
<p>${escapeHtml(cp.gattopardoCitylife.gattopardoDetail)} ${escapeHtml(cp.gattopardoCitylife.voyaDetail)}</p>
<h3>${escapeHtml(cp.h3[9])}</h3>
<p>${escapeHtml(cp.reggaetonNavigliSanSiro.gateAriaDetail)} ${escapeHtml(lx22.winter_aria || '')}</p>
<h3>${escapeHtml(cp.h3[11])}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.reggaetonNavigliSanSiro.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('\n')}
</ul>`;

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
<p>${linkTag(voltClub, `Volt Club ${lx.city}`)} · ${linkTag(capodannoPath(locale), cp.conciergeAndTransit.nyeHubCta)} · <a href="https://wa.me/393519127047" class="underline decoration-current/55 underline-offset-4">${escapeHtml(cp.conciergeAndTransit.whatsappCta)}</a> | <a href="mailto:concierge@nightlifemilan.com" class="underline decoration-current/55 underline-offset-4">concierge@nightlifemilan.com</a>.</p>`;

  const out: RenderedGuide = {
    title: sanitizeText(lx.vol_title),
    excerpt: sanitizeText(lx.vol_exc),
    sections: [
      { heading: sanitizeText(`1. Volt Club ${lx.city} · Via Molino delle Armi 16`), content: s1 },
      { heading: sanitizeText(cp.h2[3]), content: s2 },
      { heading: sanitizeText(cp.h2[1]), content: s3 },
      { heading: sanitizeText(cp.h2[2]), content: s4 },
      { heading: sanitizeText(cp.h2[4]), content: s5 },
      { heading: sanitizeText(cp.h2[5]), content: s6 },
    ],
    faqs: composeFaqs(lx.vol_faq_q, lx.vol_faq_a, cp.faqs),
  };
  BATCH_20261124_CACHE.set(ck, out);
  return out;
}

// ─── 3. g-102 (POTENZIA): PARCO SEMPIONE & ARCO DELLA PACE (APERITIVO & CLUB) ──
function renderArcoSempioneGuide(locale: LocaleCode): RenderedGuide {
  const ck = `g-102:${locale}`;
  const hit = BATCH_20261124_CACHE.get(ck);
  if (hit) return hit;

  const lx = GSC_BATCH_20261124_LEX[locale] || GSC_BATCH_20261124_LEX.en;
  const lx22 = GSC_BATCH_20261122_LEX[locale] || GSC_BATCH_20261122_LEX.en;
  const cp = CLUBBING_PILLAR_35[locale] || CLUBBING_PILLAR_35.en;
  const tl = cp.tableLabels;

  const daziClub = clubUrl('dazi-milano', locale);
  const daziNye = capodannoEventPath('capodanno-dazi-milano-arco-della-pace', locale);
  const justMeClub = clubUrl('just-me-milano', locale);
  const justMeNye = capodannoEventPath('capodanno-justme-milano-torre-branca', locale);
  const ffClub = clubUrl('55-milano', locale);
  const ffNye = capodannoEventPath('capodanno-55-milano', locale);
  const gattoClub = clubUrl('gattopardo-milano', locale);
  const gattoNye = capodannoEventPath('capodanno-il-gattopardo-milano', locale);
  const voyaClub = clubUrl('voya-rooftop-milan', locale);
  const voyaNye = capodannoEventPath('capodanno-voya-rooftop-milano', locale);
  const arcoZone = zoneUrl('arco-della-pace', locale);
  const sempZone = zoneUrl('parco-sempione', locale);
  const gattoGuide = guideUrl('g-30', locale);
  const justMeGuide = guideUrl('g-15', locale);

  const sempioneMatrix = makeTable(
    [tl.thVenue, tl.thDistrict, tl.thWeeklyRef, tl.thNye2027, tl.thStatus],
    [
      ['Dazi Milano (Casello Neoclassico)', 'Piazza Sempione 1 · Arco della Pace', '18-25 EUR Aperitivo · Dinner Show', '160 EUR Gala · 50 Toast · 40 Club · VIP 320 EUR', linkTag(daziNye, tl.statusConfirmed)],
      ['Just Me Milano (ex Just Cavalli)', 'Viale Luigi Camoens 2 · Torre Branca (4 min)', tl.justMeRates, '80 EUR Club · 300 EUR Gala · VIP 600-5.000 EUR', linkTag(justMeNye, tl.statusConfirmed)],
      ['55 Milano (1.000 mq Loft)', 'Via Piero della Francesca 55 (8 min)', tl.fiftyFiveRates, '30 EUR Club · 100 Buffet · 160 Gala · VIP 200-350 EUR', linkTag(ffNye, tl.statusConfirmed)],
      ['Il Gattopardo Milano (Ex Chiesa)', 'Via Piero della Francesca 47 (8 min)', '20-25 EUR · VIP 200-1.400 EUR', '600 EUR / pax Minimum Spend', linkTag(gattoNye, tl.statusConfirmed)],
      ['Voya Rooftop Milano (20° Piano)', 'Viale Achille Papa 30 (M5 Portello · 5 min)', tl.voyaRates, '300 EUR Base (360 EUR Booking Fees Incl.)', linkTag(voyaNye, tl.statusConfirmed)],
      ['Arco della Pace & Castello Square', 'Piazza Sempione / Castello Sforzesco', 'Outdoor Pedestrian Promenade', '0 EUR Public Toast (21:00 - 02:00)', linkTag(capodannoEventPath('capodanno-arco-della-pace-piazza-gae-aulenti-milano', locale), tl.statusConfirmed)],
    ],
    true,
  );

  const aperitivoWalkTable = makeTable(
    [tl.thFormula, tl.thDistrict, tl.thWeeklyRef, tl.thDressCode],
    [
      ['19:00 - 21:30 · Sunset Cocktail & Tagliere', 'Piazza Sempione & Via Cagnola Terraces', '15 - 22 EUR (1 Signature Drink + Platter)', tl.dressSmartChic],
      ['19:30 - 22:30 · Royal Aperitivo + Tower Lift', 'Just Me Milano · Parco Sempione (7/7)', '20 - 30 EUR Reserved Table', tl.dressSmartChic],
      ['20:00 - 23:00 · 1.000 mq Loft Buffet & Dinner', '55 Milano · Via Piero della Francesca 55', '20 - 25 EUR Buffet / 50 - 70 EUR Dinner', tl.dressSmartChic],
      ['20:30 - 23:00 · Vaulted Church Gala Dinner', 'Il Gattopardo · Via Piero della Francesca 47', '45 - 65 EUR Seated / 20 - 25 EUR Aperitivo', tl.dressEveningElegance],
      ['23:30 - 05:00 · VIP Bottle Table (100% Credit)', 'Just Me · Gattopardo · 55 Milano · Dazi', '200 - 1.500 EUR (6 - 10 pax Skip-Line)', tl.dressEveningElegance],
    ],
  );

  const s1 = `<h3>${escapeHtml(lx.arc_disp)} & Parco Sempione · Piazza Sempione 1 -> Via Piero della Francesca</h3>
<p>${escapeHtml(lx.arc_lead)}</p>
<p>${escapeHtml(cp.sempioneBreraComo.justMeLead)} ${escapeHtml(cp.gattopardoCitylife.gattopardoDetail)}</p>
<h3>${escapeHtml(cp.h3[3])}</h3>
${sempioneMatrix}
<h3>${escapeHtml(cp.h3[6])}</h3>
${aperitivoWalkTable}
<p>${linkTag(daziClub, 'Dazi Milano')} · ${linkTag(justMeClub, 'Just Me Milano')} · ${linkTag(ffClub, '55 Milano')} · ${linkTag(gattoClub, 'Il Gattopardo')} · ${linkTag(arcoZone, 'Zona Arco della Pace')} · ${linkTag(sempZone, 'Parco Sempione')}.</p>`;

  const s2 = `<h3>CityLife, Portello M5 & Corso Como Connections from Sempione</h3>
<p>${escapeHtml(cp.gattopardoCitylife.voyaDetail)} ${escapeHtml(lx22.winter_rep || cp.gattopardoCitylife.fiftyFiveRepvblicDetail)}</p>
<h3>${escapeHtml(cp.h3[7])}</h3>
<p>${escapeHtml(cp.sempioneBreraComo.pinetaClubLead)} ${escapeHtml(cp.sempioneBreraComo.corsoComoLead)}</p>
<h3>${escapeHtml(cp.h3[5])}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.sempioneBreraComo.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('\n')}
</ul>
<p>${linkTag(voyaClub, 'Voya Rooftop 20F')} · ${linkTag(gattoGuide, `Il Gattopardo ${lx.city}`)} · ${linkTag(justMeGuide, 'Just Me Guide')}.</p>`;

  const s3 = `<h3>${escapeHtml(cp.h3[0])}</h3>
<p>${escapeHtml(cp.intro[0])} ${escapeHtml(cp.intro[1])}</p>
<h3>${escapeHtml(cp.h3[1])}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.overview.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join('\n')}
</ul>
<h3>${escapeHtml(cp.h3[2])}</h3>
<p>${escapeHtml(cp.overview.venueSpecsSummary)}</p>`;

  const s4 = `<h3>${escapeHtml(cp.h3[9])}</h3>
<p>${escapeHtml(cp.reggaetonNavigliSanSiro.gateAriaDetail)} ${escapeHtml(lx22.winter_aria || '')}</p>
<h3>${escapeHtml(cp.h3[10])}</h3>
<p>${escapeHtml(cp.reggaetonNavigliSanSiro.navigliEastDetail)} ${escapeHtml(cp.reggaetonNavigliSanSiro.gardaTomDetail)}</p>
<h3>${escapeHtml(cp.h3[11])}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.reggaetonNavigliSanSiro.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('\n')}
</ul>`;

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
<p>${linkTag(daziNye, `Dazi ${lx.nye}`)} · ${linkTag(justMeNye, `Just Me ${lx.nye}`)} · ${linkTag(capodannoPath(locale), cp.conciergeAndTransit.nyeHubCta)} · <a href="https://wa.me/393519127047" class="underline decoration-current/55 underline-offset-4">${escapeHtml(cp.conciergeAndTransit.whatsappCta)}</a> | <a href="mailto:concierge@nightlifemilan.com" class="underline decoration-current/55 underline-offset-4">concierge@nightlifemilan.com</a>.</p>`;

  const out: RenderedGuide = {
    title: sanitizeText(lx.arc_title),
    excerpt: sanitizeText(lx.arc_exc),
    sections: [
      { heading: sanitizeText(`1. ${lx.arc_disp} & Parco Sempione · Aperitivo & VIP Clubs`), content: s1 },
      { heading: sanitizeText(cp.h2[2]), content: s2 },
      { heading: sanitizeText(cp.h2[0]), content: s3 },
      { heading: sanitizeText(cp.h2[3]), content: s4 },
      { heading: sanitizeText(cp.h2[4]), content: s5 },
      { heading: sanitizeText(cp.h2[5]), content: s6 },
    ],
    faqs: composeFaqs(lx.arc_faq_q, lx.arc_faq_a, cp.faqs),
  };
  BATCH_20261124_CACHE.set(ck, out);
  return out;
}

// ─── 4. g-22 (POTENZIA): ARMANI/PRIVE MILANO (VIA GASTONE PISONI 1) ─────────────
function renderArmaniPriveGuide(locale: LocaleCode): RenderedGuide {
  const ck = `g-22:${locale}`;
  const hit = BATCH_20261124_CACHE.get(ck);
  if (hit) return hit;

  const lx = GSC_BATCH_20261124_LEX[locale] || GSC_BATCH_20261124_LEX.en;
  const lx22 = GSC_BATCH_20261122_LEX[locale] || GSC_BATCH_20261122_LEX.en;
  const cp = CLUBBING_PILLAR_35[locale] || CLUBBING_PILLAR_35.en;
  const tl = cp.tableLabels;

  const armClub = clubUrl('armani-prive-milano', locale);
  const armNye = capodannoEventPath('capodanno-armani-prive-milano', locale);
  const repClub = clubUrl('repvblic-milano', locale);
  const repNye = capodannoEventPath('capodanno-repvblic-milano', locale);
  const theClub = clubUrl('the-club-milano', locale);
  const theClubNye = capodannoEventPath('capodanno-the-club-milano', locale);
  const voyaClub = clubUrl('voya-rooftop-milan', locale);
  const voyaNye = capodannoEventPath('capodanno-voya-rooftop-milano', locale);
  const justMeNye = capodannoEventPath('capodanno-justme-milano-torre-branca', locale);
  const gattoNye = capodannoEventPath('capodanno-il-gattopardo-milano', locale);
  const breraZone = zoneUrl('brera', locale);
  const mfwGuide = guideUrl('g-mfw-fuorisalone-f1', locale);
  const dressGuide = guideUrl('g-dress-code', locale);

  const armaniFormulas = makeTable(
    [tl.thFormula, tl.thDistrict, tl.thWeeklyRef, tl.thDressCode],
    [
      ['Armani Bamboo Bar (7th Floor Pre-Club)', 'Via Alessandro Manzoni 31 (19:00 - 23:30)', '28 - 45 EUR Skyline Cocktail', tl.dressEveningElegance],
      ['Armani Nobu Milano (Pre-Club Dining)', 'Via Gastone Pisoni 1 (20:00 - 23:15)', '90 - 150 EUR Tasting / A la Carte', tl.dressEveningElegance],
      ['Armani Privé · Selective Door Entry', 'Fri & Sat (23:30 - 01:15 · 23+ W / 25+ M)', '25 - 35 EUR (1 Drink)', tl.dressBlackTie],
      ['Armani Privé · Main Floor VIP Table', '6 - 8 pax (100% Bottle Credit + Hostess)', '500 - 700 EUR', tl.dressEveningElegance],
      ['Armani Privé · Raised Haute-Couture Privé', '8 - 10 pax (100% Bottle Credit + Security)', '1.000 - 1.800 EUR', tl.dressBlackTie],
      ['Armani Privé · Ultra-VIP DJ Console Booth', '10 - 15 pax (Fashion Week & International Guest)', '2.000 - 5.000 EUR', tl.dressBlackTie],
      [`Armani Privé · ${lx.nye} Status`, 'Via Gastone Pisoni 1 (Official Programme Pending)', 'TBA (WhatsApp Waitlist)', tl.dressBlackTie],
    ],
  );

  const luxuryCircuit = makeTable(
    [tl.thVenue, tl.thDistrict, tl.thWeeklyRef, tl.thNye2027, tl.thStatus],
    [
      ['Armani Privé Milano', 'Via Gastone Pisoni 1 (M3 Montenapoleone)', '25-35 EUR · VIP 500-5.000 EUR', 'TBA (Official Release Pending)', linkTag(armNye, tl.statusTba)],
      ['REPVBLIC Milano (Partner)', 'Piazza della Repubblica 12 (M3 · 3 min)', 'VIP 300 / 600 EUR', '45 EUR · VIP 600 / 1.200 EUR', linkTag(repNye, tl.statusConfirmed)],
      ['The Club Milano (Partner)', 'Corso Garibaldi 97 (Brera / Moscova)', tl.theClubRates, tl.theClubRates, linkTag(theClubNye, tl.statusConfirmed)],
      ['Voya Rooftop Milano (20° Piano)', 'Viale Achille Papa 30 (Panoramic Gala)', tl.voyaRates, '300 EUR Base (360 EUR Fees Incl.)', linkTag(voyaNye, tl.statusConfirmed)],
      ['Just Me Milano (ex Just Cavalli)', 'Parco Sempione · Torre Branca', tl.justMeRates, '80 / 300 EUR · VIP 600-5.000 EUR', linkTag(justMeNye, tl.statusConfirmed)],
      ['Il Gattopardo Milano (Ex Chiesa)', 'Via Piero della Francesca 47', '20-25 EUR · VIP 200-1.400 EUR', '600 EUR / pax Minimum Spend', linkTag(gattoNye, tl.statusConfirmed)],
    ],
    true,
  );

  const s1 = `<h3>Armani Privé ${escapeHtml(lx.city)} · Via Gastone Pisoni 1 (Quadrilatero & Montenapoleone)</h3>
<p>${escapeHtml(lx.arm_lead)}</p>
<p>${escapeHtml(cp.intro[0])} ${escapeHtml(cp.intro[1])}</p>
<h3>${escapeHtml(cp.h3[0])}</h3>
${armaniFormulas}
<h3>${escapeHtml(cp.h3[1])}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.overview.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join('\n')}
</ul>
<p>${linkTag(armClub, 'Armani Privé Milano')} · ${linkTag(armNye, `Armani Privé ${lx.nye}`)} · ${linkTag(breraZone, 'Brera & Montenapoleone')} · ${linkTag(mfwGuide, 'Fashion Week & Fuorisalone')}.</p>`;

  const s2 = `<h3>Quadrilatero, Repubblica, Brera & 20th-Floor Luxury Partner Alternatives</h3>
<p>${escapeHtml(lx22.winter_rep || cp.gattopardoCitylife.fiftyFiveRepvblicDetail)} ${escapeHtml(cp.gattopardoCitylife.voyaDetail)}</p>
<h3>${escapeHtml(cp.h3[7])}</h3>
${luxuryCircuit}
<h3>${escapeHtml(cp.h3[4])}</h3>
<p>${escapeHtml(cp.sempioneBreraComo.pinetaClubLead)} ${escapeHtml(cp.sempioneBreraComo.corsoComoLead)}</p>
<p>${linkTag(repClub, 'REPVBLIC Milano')} · ${linkTag(theClub, 'The Club Brera')} · ${linkTag(voyaClub, 'Voya Rooftop 20F')} · ${linkTag(dressGuide, 'Milan Club Dress Code')}.</p>`;

  const s3 = `<h3>${escapeHtml(cp.h3[3])}</h3>
<p>${escapeHtml(cp.sempioneBreraComo.justMeLead)} ${escapeHtml(cp.gattopardoCitylife.gattopardoDetail)}</p>
<h3>${escapeHtml(cp.h3[5])}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.sempioneBreraComo.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('\n')}
</ul>
<h3>${escapeHtml(cp.h3[8])}</h3>
<p>${escapeHtml(cp.overview.venueSpecsSummary)}</p>`;

  const s4 = `<h3>${escapeHtml(cp.h3[9])}</h3>
<p>${escapeHtml(cp.reggaetonNavigliSanSiro.gateAriaDetail)} ${escapeHtml(lx22.winter_aria || '')}</p>
<h3>${escapeHtml(cp.h3[10])}</h3>
<p>${escapeHtml(cp.reggaetonNavigliSanSiro.navigliEastDetail)} ${escapeHtml(cp.reggaetonNavigliSanSiro.gardaTomDetail)}</p>
<h3>${escapeHtml(cp.h3[11])}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.reggaetonNavigliSanSiro.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('\n')}
</ul>`;

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
<p>${linkTag(armClub, 'Armani Privé Milano')} · ${linkTag(capodannoPath(locale), cp.conciergeAndTransit.nyeHubCta)} · <a href="https://wa.me/393519127047" class="underline decoration-current/55 underline-offset-4">${escapeHtml(cp.conciergeAndTransit.whatsappCta)}</a> | <a href="mailto:concierge@nightlifemilan.com" class="underline decoration-current/55 underline-offset-4">concierge@nightlifemilan.com</a>.</p>`;

  const out: RenderedGuide = {
    title: sanitizeText(lx.arm_title),
    excerpt: sanitizeText(lx.arm_exc),
    sections: [
      { heading: sanitizeText(`1. Armani Privé ${lx.city} · Via Gastone Pisoni 1`), content: s1 },
      { heading: sanitizeText(cp.h2[1]), content: s2 },
      { heading: sanitizeText(cp.h2[2]), content: s3 },
      { heading: sanitizeText(cp.h2[3]), content: s4 },
      { heading: sanitizeText(cp.h2[4]), content: s5 },
      { heading: sanitizeText(cp.h2[5]), content: s6 },
    ],
    faqs: composeFaqs(lx.arm_faq_q, lx.arm_faq_a, cp.faqs),
  };
  BATCH_20261124_CACHE.set(ck, out);
  return out;
}

// ─── 5. g-36 (POTENZIA): CHURCH 81 MILANO (VIA DELLA CHIESA ROSSA 81) ───────────
function renderChurch81Guide(locale: LocaleCode): RenderedGuide {
  const ck = `g-36:${locale}`;
  const hit = BATCH_20261124_CACHE.get(ck);
  if (hit) return hit;

  const lx = GSC_BATCH_20261124_LEX[locale] || GSC_BATCH_20261124_LEX.en;
  const lx22 = GSC_BATCH_20261122_LEX[locale] || GSC_BATCH_20261122_LEX.en;
  const cp = CLUBBING_PILLAR_35[locale] || CLUBBING_PILLAR_35.en;
  const tl = cp.tableLabels;

  const chuClub = clubUrl('church-81', locale);
  const chuNye = capodannoEventPath('capodanno-church-81-milano', locale);
  const bischeriNye = capodannoEventPath('capodanno-bischeri-milano', locale);
  const bobinoClub = clubUrl('bobino-milano', locale);
  const bobinoNye = capodannoEventPath('capodanno-bobino-milano', locale);
  const magClub = clubUrl('magazzini-generali-milano', locale);
  const magNye = capodannoEventPath('capodanno-magazzini-generali-milano', locale);
  const gattoClub = clubUrl('gattopardo-milano', locale);
  const gattoNye = capodannoEventPath('capodanno-il-gattopardo-milano', locale);
  const dinnerHub = capodannoCategoryPath('capodanno-locali-cenone-milano', locale);
  const gattoGuide = guideUrl('g-30', locale);
  const privateGuide = guideUrl('g-private-parties', locale);

  const churchFormulas = makeTable(
    [tl.thFormula, tl.thDistrict, tl.thWeeklyRef, tl.thDressCode],
    [
      ['Church 81 · Royal Aperitivo under Red-Brick Vaults', 'Via della Chiesa Rossa 81 (Thu-Sat 20:00-22:30)', '20 - 25 EUR Reserved Table', tl.dressSmartChic],
      ['Church 81 · Seated Singing Dinner Show', 'Deconsecrated Church Nave (20:30 - 23:30)', '40 - 60 EUR (Wine Included)', tl.dressEveningElegance],
      ['Church 81 · Accredited Club Entry', 'Thu, Fri & Sat (23:00 - 00:45 · Free Parking)', '15 - 20 EUR (1 Drink)', tl.dressSmartChic],
      ['Church 81 · Dancefloor Bottle Table', '6 - 8 pax (100% Bottle Credit + Skip-Line)', '200 - 280 EUR', tl.dressSmartChic],
      ['Church 81 · Vaulted Arch Privé Booth', '8 - 10 pax (100% Bottle Credit + Sparklers)', '350 - 550 EUR', tl.dressEveningElegance],
      ['Church 81 · Celebration & Console Area', '10 - 15 pax (Graduations, Birthdays & VIP)', '600 - 1.100 EUR', tl.dressEveningElegance],
      ['Eyes Wide Shut NYE 2027 · Fish Gala Menu', '31/12/2026 (20:30 - 04:00 · QR + Secret Password)', '90 EUR Fixed (Free Swap <= 28/12)', tl.dressBlackTie],
      ['Eyes Wide Shut NYE 2027 · Meat Gala Menu', '31/12/2026 (Prosecco + 4 Courses + Lentils + DJ)', '90 EUR Fixed (Free Parking)', tl.dressBlackTie],
    ],
  );

  const southVaultsCircuit = makeTable(
    [tl.thVenue, tl.thDistrict, tl.thMusic, tl.thNye2027, tl.thStatus],
    [
      ['Church 81 Milano (Ex Chiesa Rossa)', 'Via della Chiesa Rossa 81 (Navigli Sud)', 'Eyes Wide Shut Gala, Commercial & House', '90 EUR Fixed (Fish or Meat + DJ)', linkTag(chuNye, tl.statusConfirmed)],
      ['Bischeri Milano (Partner)', 'Via Giuseppe Ripamonti (Milano Sud)', 'Gala Dinner Show, Commercial & Disco', tl.bischeriRates, linkTag(bischeriNye, tl.statusConfirmed)],
      ['Bobino Milano (Partner)', 'Piazzale Stazione Genova 4 (M2 Navigli)', 'Aperitivo Show, Revival & Club 30+', tl.bobinoRates, linkTag(bobinoNye, tl.statusConfirmed)],
      ['Magazzini Generali (Partner)', 'Via Pietrasanta 16 (Ripamonti)', 'We Love 2000, Club Hits & Electronic', '35 / 80 EUR · VIP 400-750 EUR', linkTag(magNye, tl.statusConfirmed)],
      ['Il Gattopardo Milano (Ex Chiesa)', 'Via Piero della Francesca 47 (Sempione)', 'Monumental Chandelier & VIP Vaults', '600 EUR / pax Minimum Spend', linkTag(gattoNye, tl.statusConfirmed)],
    ],
    true,
  );

  const s1 = `<h3>Church 81 ${escapeHtml(lx.city)} · Via della Chiesa Rossa 81 (Navigli Sud & Free Parking)</h3>
<p>${escapeHtml(lx.chu_lead)}</p>
<p>${escapeHtml(cp.intro[0])} ${escapeHtml(cp.intro[1])}</p>
<h3>${escapeHtml(cp.h3[0])}</h3>
${churchFormulas}
<h3>${escapeHtml(cp.h3[1])}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.overview.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join('\n')}
</ul>
<p>${linkTag(chuClub, `Church 81 ${lx.city}`)} · ${linkTag(chuNye, 'Eyes Wide Shut 90 EUR')} · ${linkTag(dinnerHub, lx.nye)} · ${linkTag(privateGuide, 'Private Parties & Graduations')}.</p>`;

  const s2 = `<h3>Navigli Sud, Ripamonti & Architectural Ex-Church Venues in ${escapeHtml(lx.city)}</h3>
<p>${escapeHtml(cp.reggaetonNavigliSanSiro.navigliEastDetail)} ${escapeHtml(cp.gattopardoCitylife.gattopardoDetail)}</p>
<h3>${escapeHtml(cp.h3[10])}</h3>
${southVaultsCircuit}
<h3>${escapeHtml(cp.h3[6])}</h3>
<p>${escapeHtml(cp.gattopardoCitylife.voyaDetail)} ${escapeHtml(lx22.winter_rep || cp.gattopardoCitylife.fiftyFiveRepvblicDetail)}</p>
<p>${linkTag(bischeriNye, 'Bischeri Milano')} · ${linkTag(bobinoClub, 'Bobino Milano')} · ${linkTag(magClub, 'Magazzini Generali')} · ${linkTag(gattoClub, 'Il Gattopardo')} · ${linkTag(gattoGuide, 'Guida Gattopardo')}.</p>`;

  const s3 = `<h3>${escapeHtml(cp.h3[3])}</h3>
<p>${escapeHtml(cp.sempioneBreraComo.justMeLead)} ${escapeHtml(cp.sempioneBreraComo.pinetaClubLead)}</p>
<h3>${escapeHtml(cp.h3[4])}</h3>
<p>${escapeHtml(cp.sempioneBreraComo.corsoComoLead)}</p>
<h3>${escapeHtml(cp.h3[5])}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.sempioneBreraComo.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('\n')}
</ul>`;

  const s4 = `<h3>${escapeHtml(cp.h3[9])}</h3>
<p>${escapeHtml(cp.reggaetonNavigliSanSiro.gateAriaDetail)} ${escapeHtml(lx22.winter_aria || '')} ${escapeHtml(cp.reggaetonNavigliSanSiro.gardaTomDetail)}</p>
<h3>${escapeHtml(cp.h3[11])}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.reggaetonNavigliSanSiro.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('\n')}
</ul>
<h3>${escapeHtml(cp.h3[2])}</h3>
<p>${escapeHtml(cp.overview.venueSpecsSummary)}</p>`;

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
<p>${linkTag(chuNye, 'Church 81 Eyes Wide Shut 90 EUR')} · ${linkTag(capodannoPath(locale), cp.conciergeAndTransit.nyeHubCta)} · <a href="https://wa.me/393519127047" class="underline decoration-current/55 underline-offset-4">${escapeHtml(cp.conciergeAndTransit.whatsappCta)}</a> | <a href="mailto:concierge@nightlifemilan.com" class="underline decoration-current/55 underline-offset-4">concierge@nightlifemilan.com</a>.</p>`;

  const out: RenderedGuide = {
    title: sanitizeText(lx.chu_title),
    excerpt: sanitizeText(lx.chu_exc),
    sections: [
      { heading: sanitizeText(`1. Church 81 ${lx.city} · Via della Chiesa Rossa 81 & NYE 90 EUR`), content: s1 },
      { heading: sanitizeText(cp.h2[3]), content: s2 },
      { heading: sanitizeText(cp.h2[1]), content: s3 },
      { heading: sanitizeText(cp.h2[2]), content: s4 },
      { heading: sanitizeText(cp.h2[4]), content: s5 },
      { heading: sanitizeText(cp.h2[5]), content: s6 },
    ],
    faqs: composeFaqs(lx.chu_faq_q, lx.chu_faq_a, cp.faqs),
  };
  BATCH_20261124_CACHE.set(ck, out);
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
    dateModified: '2026-11-24',
    image: heroImage,
  };
}

export function applyGscGuidesBatch20261124(guidesList: Guide[]): void {
  const upgrades: Array<{
    id: string;
    renderer: (loc: LocaleCode) => RenderedGuide;
    genres: MusicGenre[];
    hero: string;
  }> = [
    {
      id: 'g-24',
      renderer: renderAlcatrazGuide,
      genres: [MusicGenre.COMMERCIAL, MusicGenre.REGGAETON, MusicGenre.LIVE_MUSIC],
      hero: '/images/guides-editorial/aria-dancefloor.webp',
    },
    {
      id: 'g-23',
      renderer: renderVoltGuide,
      genres: [MusicGenre.TECHNO, MusicGenre.HOUSE, MusicGenre.INDIE],
      hero: '/images/guides-editorial/gate-neon.webp',
    },
    {
      id: 'g-102',
      renderer: renderArcoSempioneGuide,
      genres: [MusicGenre.HOUSE, MusicGenre.COMMERCIAL, MusicGenre.REGGAETON],
      hero: '/images/guides-editorial/just-me-exterior.webp',
    },
    {
      id: 'g-22',
      renderer: renderArmaniPriveGuide,
      genres: [MusicGenre.HOUSE, MusicGenre.HIP_HOP, MusicGenre.COMMERCIAL],
      hero: '/images/guides-editorial/armani-prive-lounge.webp',
    },
    {
      id: 'g-36',
      renderer: renderChurch81Guide,
      genres: [MusicGenre.COMMERCIAL, MusicGenre.HOUSE, MusicGenre.REGGAETON],
      hero: '/images/guides-editorial/bischeri-gala.webp',
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
