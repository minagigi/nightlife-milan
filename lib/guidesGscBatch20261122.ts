import { localePrefix, type LocaleCode } from './i18n/localeRegistry';
import {
  ALL_35_LOCALES,
  EXISTING_14_GUIDE_SLUGS_35,
  getLocalizedGenreSlug35,
  getLocalizedVenueSlug35,
} from './i18n/localizedSlugs35';
import { getLocalizedDir35 } from './i18n/dirTokens35';
import { GUIDE_100_SLUGS_MAP } from './i18n/guideSlugs100Map';
import { TERME_PILLAR_35 } from './i18n/pillarTerme35';
import { CLUBBING_PILLAR_35 } from './i18n/pillarClubbing35';
import { REGGAETON_35_PACKS } from './i18n/reggaetonSeo35';
import { GSC_BATCH_20261122_LEX } from './i18n/pillarGuides20261122';
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

function sanitizeText(raw: string): string {
  return (raw || '')
    .replace(/\u2014/g, '-')
    .replace(/\u2013/g, '-')
    .replace(/\u2605/g, '*')
    .replace(/!/g, '.')
    .replace(/[şŞ]/g, (m) => (m === 'ş' ? 'ș' : 'Ș'))
    .replace(/[ţŢ]/g, (m) => (m === 'ţ' ? 'ț' : 'Ț'));
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

const BATCH_CACHE = new Map<string, RenderedGuide>();

export function getGsc20261122DisplayHeadline(guideId: string, locale: LocaleCode): string | null {
  const lx = GSC_BATCH_20261122_LEX[locale] || GSC_BATCH_20261122_LEX.en;
  if (guideId === 'g-119') return sanitizeText(lx.reg_short);
  if (guideId === 'g-120') return sanitizeText(lx.bor_short);
  if (guideId === 'g-weekly-calendar') return sanitizeText(lx.cal_short);
  if (guideId === 'g-37') return sanitizeText(lx.loo_short);
  if (guideId === 'g-38') return sanitizeText(lx.bob_short);
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
      `${linkTag(clubUrl('just-me-milan', locale), 'Just Me Milano (ex Just Cavalli)')} · ${linkTag(capodannoEventPath('capodanno-justme-milano-torre-branca', locale), 'NYE 2027')}`,
      'Parco Sempione · Viale Luigi Camoens 2 (Torre Branca)',
      'House, Commercial, Hip-Hop & Reggaeton (7/7)',
      tl.dressSmartChic,
      tl.justMeRates,
      tl.statusConfirmed,
    ],
    [
      `${linkTag(clubUrl('pineta-milano', locale), 'Pineta Milano')} · ${linkTag(capodannoEventPath('capodanno-pineta-milano', locale), 'NYE 2027')}`,
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
      `${linkTag(clubUrl('repvblic-milan', locale), 'REPVBLIC Milano')} · ${linkTag(capodannoEventPath('capodanno-repvblic-milano', locale), 'NYE 2027')}`,
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
      `${linkTag(clubUrl('the-club-milan', locale), 'The Club Milano (Brera)')} · ${linkTag(capodannoEventPath('capodanno-the-club-milano', locale), 'NYE 2027')}`,
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
      `${linkTag(clubUrl('hollywood-milan', locale), 'Hollywood Milano (Rythmoteque)')} · ${linkTag(capodannoEventPath('capodanno-hollywood-milano', locale), 'NYE 2027')}`,
      'Corso Como · Corso Como 15',
      'Fashion House, Hip-Hop & Reggaeton',
      tl.dressSmartChic,
      tl.hollywoodRates,
      tl.statusBenchmark,
    ],
    [
      `${linkTag(clubUrl('11-clubroom-milan', locale), '11 Clubroom Milano')} · ${linkTag(capodannoEventPath('capodanno-11clubroom-milano', locale), 'NYE 2027')}`,
      'Corso Como · Via Alessio di Tocqueville 11',
      'House & Hip-Hop Lounge Boutique',
      tl.dressSmartChic,
      tl.elevenRates,
      tl.statusBenchmark,
    ],
    [
      `${linkTag(clubUrl('tocqueville-13-milan', locale), 'Tocqueville 13 Milano')} · ${linkTag(capodannoEventPath('capodanno-tocqueville-13-milano', locale), 'NYE 2027')}`,
      'Corso Como · Via Alessio di Tocqueville 13',
      'Dinner Show, Hip-Hop, Reggaeton & Commercial',
      tl.dressSmartChic,
      tl.tocquevilleRates,
      tl.statusBenchmark,
    ],
    [
      linkTag(capodannoEventPath('capodanno-tom-milano', locale), 'TOM. The Ordinary Market'),
      'Zona Darsena / Ticinese · Via della Chiusa 15',
      'House, Nu-Disco & Soulful Grooves',
      tl.dressEveningElegance,
      tl.tomRates,
      tl.statusTba,
    ],
    [
      `${linkTag(clubUrl('il-gattopardo-milan', locale), 'Il Gattopardo Milano')} · ${linkTag(capodannoEventPath('capodanno-il-gattopardo-milano', locale), 'NYE 2027')}`,
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

// ─── 1. g-119: SERATE REGGAETON, DEMBOW & PERREO MILANO 2026/2027 ──────────────
function renderReggaetonGuide(locale: LocaleCode): RenderedGuide {
  const ck = `g-119:${locale}`;
  const hit = BATCH_CACHE.get(ck);
  if (hit) return hit;

  const lx = GSC_BATCH_20261122_LEX[locale] || GSC_BATCH_20261122_LEX.en;
  const cp = CLUBBING_PILLAR_35[locale] || CLUBBING_PILLAR_35.en;
  const rp = REGGAETON_35_PACKS[locale] || REGGAETON_35_PACKS.en;
  const tl = cp.tableLabels;

  const gateNye = capodannoEventPath('capodanno-gate-milano', locale);
  const latinNye = capodannoCategoryPath('capodanno-latino-reggaeton-hiphop-milano', locale);
  const pinetaClub = clubUrl('pineta-milano', locale);
  const pinetaNye = capodannoEventPath('capodanno-pineta-milano', locale);
  const theClubUrl = clubUrl('the-club-milan', locale);
  const theClubNye = capodannoEventPath('capodanno-the-club-milano', locale);
  const tocqUrl = clubUrl('tocqueville-13-milan', locale);
  const hollyUrl = clubUrl('hollywood-milan', locale);
  const justMeUrl = clubUrl('just-me-milan', locale);
  const fiftyFiveUrl = clubUrl('55-milano', locale);
  const repUrl = clubUrl('repvblic-milan', locale);
  const regHub = genreUrl('reggaeton', locale);
  const clubGuide = guideUrl('g-118', locale);
  const calGuide = guideUrl('g-weekly-calendar', locale);

  const mainTable = makeTable(
    [tl.thVenue, tl.thDistrict, tl.thMusic, tl.thWeeklyRef, tl.thNye2027, tl.thStatus],
    [
      ['PERREO XL @ Gate Milano', 'Via Valtellina 21 (Isola / Farini)', 'Reggaeton, Dembow, Latin Tech', '20-30 EUR · VIP 300-500 EUR', '20-50 EUR · VIP 500-600 EUR', linkTag(gateNye, tl.statusConfirmed)],
      ['Pineta Milano · Noche de Perreo', 'Via Messina 38 (Cenisio M5)', 'Reggaeton, Urban, Singing Dinner', tl.pinetaRates, '40 / 160 EUR · VIP 300-1.500 EUR', linkTag(pinetaClub, tl.statusConfirmed)],
      ['The Club Milano', 'Corso Garibaldi 97 (Moscova M2)', 'Hip-Hop, Reggaeton, Urban Hits', tl.theClubRates, '50 EUR · VIP 500-1.800 EUR', linkTag(theClubUrl, tl.statusConfirmed)],
      ['Tocqueville 13', 'Via Alessio di Tocqueville 13', 'Latin Urban, Perreo, Commercial', tl.tocquevilleRates, '50-150 EUR · VIP 500-1.500 EUR', linkTag(tocqUrl, tl.statusConfirmed)],
      ['Hollywood Milano', 'Corso Como 15 (Garibaldi)', 'International Urban, Hip-Hop', tl.hollywoodRates, '50 EUR · VIP 400-1.200 EUR', linkTag(hollyUrl, tl.statusConfirmed)],
      ['Just Me Milano (ex Just Cavalli)', 'Viale Luigi Camoens 2 (Sempione)', 'Open-Format, Urban & House 7/7', tl.justMeRates, '80 / 300 EUR · VIP 600-5.000 EUR', linkTag(justMeUrl, tl.statusConfirmed)],
      ['55 Milano', 'Via Piero della Francesca 55', 'Dinner Show, Urban & Commercial', tl.fiftyFiveRates, '30-160 EUR · VIP 200-350 EUR', linkTag(fiftyFiveUrl, tl.statusConfirmed)],
      ['REPVBLIC Milano', 'Piazza della Repubblica 12', 'Boutique Urban & Vocal House', 'VIP 300 / 600 EUR (WhatsApp)', '45 EUR · VIP 600-1.200 EUR', linkTag(repUrl, tl.statusConfirmed)],
    ],
    true,
  );

  const tierTable = makeTable(
    [tl.thFormula, tl.thWeeklyRef, tl.thNye2027, tl.thDressCode],
    cp.gattopardoCitylife.tierRows,
  );

  const winterNote = lx.winter_aria || cp.reggaetonNavigliSanSiro.gateAriaDetail;
  const repNote = lx.winter_rep || cp.gattopardoCitylife.fiftyFiveRepvblicDetail;

  const s1 = `<h3>${escapeHtml( rp.boxTitle )}</h3>
<p>${escapeHtml(cp.reggaetonNavigliSanSiro.gateAriaDetail)} ${escapeHtml(rp.nyeFaqA)}</p>
<p>${escapeHtml(cp.intro[0])} ${escapeHtml(cp.intro[1])}</p>
<h3>${escapeHtml(cp.h3[0])}</h3>
${mainTable}
<h3>${escapeHtml(cp.h3[2])}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.reggaetonNavigliSanSiro.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('\n')}
</ul>
<p>${linkTag(regHub, rp.guideCta)} · ${linkTag(gateNye, rp.nyeCta)} · ${linkTag(latinNye, lx.nye)}.</p>`;

  const s2 = `<h3>${escapeHtml(cp.h3[9])}</h3>
<p>${escapeHtml(cp.sempioneBreraComo.pinetaClubLead)}</p>
<p>${escapeHtml(cp.sempioneBreraComo.corsoComoLead)}</p>
<h3>${escapeHtml(cp.h3[4])}</h3>
<p>${escapeHtml(winterNote)}</p>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.sempioneBreraComo.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('\n')}
</ul>
<h3>${escapeHtml(cp.h3[5])}</h3>
<p>${linkTag(pinetaClub, cp.sempioneBreraComo.ctas.pinetaClub)} · ${linkTag(pinetaNye, 'Pineta ' + lx.nye)} · ${linkTag(theClubUrl, 'The Club')} · ${linkTag(tocqUrl, 'Tocqueville 13')} · ${linkTag(hollyUrl, 'Hollywood')}.</p>`;

  const s3 = `<h3>${escapeHtml(cp.h3[3])}</h3>
<p>${escapeHtml(cp.sempioneBreraComo.justMeLead)}</p>
<h3>${escapeHtml(cp.h3[7])}</h3>
<p>${escapeHtml(repNote)}</p>
<p>${escapeHtml(cp.gattopardoCitylife.voyaDetail)}</p>
<h3>${escapeHtml(cp.h3[8])}</h3>
${tierTable}
<p>${linkTag(justMeUrl, cp.sempioneBreraComo.ctas.justMeClub)} · ${linkTag(fiftyFiveUrl, '55 Milano')} · ${linkTag(repUrl, 'REPVBLIC Milano')}.</p>`;

  const s4 = `<h3>${escapeHtml(cp.h3[10])}</h3>
<p>${escapeHtml(cp.reggaetonNavigliSanSiro.navigliEastDetail)}</p>
<p>${escapeHtml(cp.reggaetonNavigliSanSiro.gardaTomDetail)}</p>
<h3>${escapeHtml(cp.h3[6])}</h3>
<p>${escapeHtml(cp.gattopardoCitylife.gattopardoDetail)}</p>
<h3>${escapeHtml(cp.h3[11])}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.overview.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join('\n')}
</ul>
<p>${linkTag(latinNye, rp.nyeCta)} · ${linkTag(clubGuide, lx.reg_short)} · ${linkTag(calGuide, lx.cal_short)}.</p>`;

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
<p>${escapeHtml(cp.overview.tableLead)} ${escapeHtml(cp.overview.venueSpecsSummary)}</p>
${buildPartner18MatrixHtml(locale)}
<p>${linkTag(regHub, rp.clubCta)} · ${linkTag(capodannoPath(locale), cp.conciergeAndTransit.nyeHubCta)} · <a href="https://wa.me/393519127047" class="underline decoration-current/55 underline-offset-4">${escapeHtml(cp.conciergeAndTransit.whatsappCta)}</a> | <a href="mailto:concierge@nightlifemilan.com" class="underline decoration-current/55 underline-offset-4">concierge@nightlifemilan.com</a>.</p>`;

  const faqs = [
    { question: sanitizeText(rp.nyeFaqQ), answer: sanitizeText(rp.nyeFaqA) },
    ...cp.faqs.slice(0, 5).map(([q, a]) => ({ question: sanitizeText(q), answer: sanitizeText(a) })),
  ];

  const out: RenderedGuide = {
    title: sanitizeText(lx.reg_title),
    excerpt: sanitizeText(lx.reg_exc),
    sections: [
      { heading: sanitizeText(`1. ${rp.boxTitle}`), content: s1 },
      { heading: sanitizeText(cp.h2[3]), content: s2 },
      { heading: sanitizeText(cp.h2[1]), content: s3 },
      { heading: sanitizeText(cp.h2[2]), content: s4 },
      { heading: sanitizeText(cp.h2[4]), content: s5 },
      { heading: sanitizeText(cp.h2[5]), content: s6 },
    ],
    faqs,
  };
  BATCH_CACHE.set(ck, out);
  return out;
}

// ─── 2. g-120: CAPODANNO BORMIO, MONTAGNA, VALTELLINA & TERME ALPINE 2027 ──────
function renderBormioGuide(locale: LocaleCode): RenderedGuide {
  const ck = `g-120:${locale}`;
  const hit = BATCH_CACHE.get(ck);
  if (hit) return hit;

  const lx = GSC_BATCH_20261122_LEX[locale] || GSC_BATCH_20261122_LEX.en;
  const tp = TERME_PILLAR_35[locale] || TERME_PILLAR_35.en;
  const cp = CLUBBING_PILLAR_35[locale] || CLUBBING_PILLAR_35.en;
  const l = tp.labels;

  const qcBoUrl = capodannoEventPath('capodanno-qc-terme-bormio-bagni-nuovi-vecchi', locale);
  const qcSpUrl = capodannoEventPath('capodanno-qc-terme-san-pellegrino', locale);
  const qcMiUrl = capodannoEventPath('capodanno-qc-terme-milano-porta-romana', locale);
  const sirmioneUrl = capodannoEventPath('capodanno-terme-di-sirmione-aquaria-lago-di-garda', locale);
  const justMeGardaUrl = capodannoEventPath('capodanno-justme-garda-lake', locale);
  const terminusUrl = capodannoEventPath('capodanno-albergo-terminus-como', locale);
  const barchettaUrl = capodannoEventPath('capodanno-hotel-barchetta-excelsior-como', locale);
  const voyaUrl = capodannoEventPath('capodanno-voya-rooftop-milano', locale);
  const justMeMiUrl = capodannoEventPath('capodanno-justme-milano-torre-branca', locale);
  const pinetaUrl = capodannoEventPath('capodanno-pineta-milano', locale);
  const termeCatUrl = capodannoCategoryPath('capodanno-terme-spa-baita-montagna', locale);
  const lombardiaCatUrl = capodannoCategoryPath('capodanno-lombardia', locale);
  const termeGuideUrl = guideUrl('g-117', locale);
  const clubGuideUrl = guideUrl('g-118', locale);

  const compTable = makeTable(
    [l.thSpa, l.thProvince, l.thStatus, l.thOfficialRate, l.thIncluded, l.thLink],
    [
      ['QC Terme Bagni Nuovi & Bagni Vecchi', 'Bormio / Valdidentro (SO) · 1.400 m', l.statusTba, l.tbaLabel, l.rowQcBoIncl, linkTag(qcBoUrl, l.waitlistAction)],
      ['Terme di Sirmione · Aquaria Thermal', 'Sirmione (BS) · Lago di Garda', l.statusConfirmed, '198 EUR', l.rowSirmioneIncl, linkTag(sirmioneUrl, l.bookAction)],
      ['QC Terme San Pellegrino', 'Val Brembana (BG) · Viale Vittoria 53', l.statusTba, l.tbaLabel, l.rowQcSpIncl, linkTag(qcSpUrl, l.waitlistAction)],
      ['QC Termemilano Porta Romana', 'Milano (MI) · P.le Medaglie d\'Oro 2', l.statusTba, l.tbaLabel, l.rowQcMiIncl, linkTag(qcMiUrl, l.waitlistAction)],
      ['JustMe Garda Lake (Club & Gala)', 'Lonato del Garda (BS) · Via Lavagnone 13', l.statusPartner, '20 / 70 / 130 EUR', tp.garda.highlights.slice(0, 2).join(' · '), linkTag(justMeGardaUrl, l.bookAction)],
      ['Albergo Terminus Como (Lago)', 'Como (CO) · Lungo Lario Trieste 14', l.statusConfirmed, '240 EUR', l.rowTerminusIncl, linkTag(terminusUrl, l.bookAction)],
      ['Hotel Barchetta Excelsior Como', 'Como (CO) · Piazza Cavour 1', l.statusConfirmed, '175 EUR', l.rowBarchettaIncl, linkTag(barchettaUrl, l.bookAction)],
      ['Voya Rooftop Milano (20° Piano)', 'Milano (MI) · Viale Achille Papa 30', l.statusPartner, '300 EUR', l.rowVoyaIncl, linkTag(voyaUrl, l.bookAction)],
    ],
    true,
  );

  const schedTable = makeTable(
    [l.thTime, l.thActivity, l.thNotes],
    tp.sirmione.scheduleRows,
  );

  const bormioLead = lx.bormio_lead || tp.qcTerme.bormio;
  const ss38Note = lx.ss38_note || tp.logistics.transitComoValtellina;

  const s1 = `<h3>${escapeHtml(tp.h3[4])}</h3>
<p>${escapeHtml(bormioLead)}</p>
<p>${escapeHtml(tp.qcTerme.bormio)} ${escapeHtml(tp.qcTerme.waitlistPolicy)}</p>
<h3>${escapeHtml(tp.h3[5])}</h3>
${compTable}
<h3>${escapeHtml(tp.h3[3])}</h3>
<ol class="list-decimal pl-6 space-y-2 my-4">
${tp.qcTerme.waitlistProtocol.map((st) => `<li>${escapeHtml(st)}</li>`).join('\n')}
</ol>
<p>${linkTag(qcBoUrl, tp.qcTerme.bormioCta)} · ${linkTag(qcSpUrl, tp.qcTerme.sanPellegrinoCta)} · ${linkTag(qcMiUrl, tp.qcTerme.milanoCta)}.</p>`;

  const s2 = `<h3>${escapeHtml(tp.h3[0])}</h3>
<p>${escapeHtml(tp.intro[0])} ${escapeHtml(tp.intro[1])}</p>
<p>${escapeHtml(tp.sirmione.overview)} ${escapeHtml(tp.sirmione.packageDetail)}</p>
<h3>${escapeHtml(tp.h3[1])}</h3>
${schedTable}
<ul class="list-disc pl-6 space-y-2 my-4">
${tp.sirmione.inclusions.map((inc) => `<li>${escapeHtml(inc)}</li>`).join('\n')}
</ul>
<h3>${escapeHtml(tp.h3[2])}</h3>
<p>${escapeHtml(tp.sirmione.ritualsNote)} ${escapeHtml(tp.sirmione.etiquetteNote)}</p>
<p>${linkTag(sirmioneUrl, tp.sirmione.ctaLabel)} · ${linkTag(termeGuideUrl, lx.bor_short)}.</p>`;

  const s3 = `<h3>${escapeHtml(tp.h3[6])}</h3>
<p>${escapeHtml(tp.garda.pairingLogic)}</p>
<h3>${escapeHtml(tp.h3[7])}</h3>
<p>${escapeHtml(tp.garda.justMeDetail)}</p>
<ul class="list-disc pl-6 space-y-2 my-4">
${tp.garda.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join('\n')}
</ul>
<h3>${escapeHtml(tp.h3[8])}</h3>
<p>${escapeHtml(tp.garda.transferNote)}</p>
<p>${linkTag(justMeGardaUrl, tp.garda.ctaLabel)} · ${linkTag(lombardiaCatUrl, lx.nye)}.</p>`;

  const s4 = `<h3>${escapeHtml(tp.h3[9])}</h3>
<p>${escapeHtml(tp.como.overview)} ${escapeHtml(tp.como.terminus)}</p>
<h3>${escapeHtml(tp.h3[10])}</h3>
<p>${escapeHtml(tp.como.barchetta)} ${escapeHtml(tp.como.palaceNote)}</p>
<h3>${escapeHtml(tp.h3[11])}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${tp.como.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join('\n')}
</ul>
<p>${linkTag(terminusUrl, tp.como.terminusCta)} · ${linkTag(barchettaUrl, tp.como.barchettaCta)} · ${linkTag(termeCatUrl, tp.logistics.categoryCta)}.</p>`;

  const s5 = `<h3>${escapeHtml(tp.h3[12])}</h3>
<p>${escapeHtml(tp.milanAlts.overview)} ${escapeHtml(tp.milanAlts.voya)}</p>
<h3>${escapeHtml(tp.h3[13])}</h3>
<p>${escapeHtml(tp.milanAlts.justMePineta)} ${escapeHtml(cp.gattopardoCitylife.gattopardoDetail)}</p>
<h3>${escapeHtml(tp.h3[14])}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${tp.milanAlts.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join('\n')}
</ul>
${buildClosedVenuesHtml(locale)}
<p>${linkTag(voyaUrl, tp.milanAlts.voyaCta)} · ${linkTag(justMeMiUrl, tp.milanAlts.justMeCta)} · ${linkTag(pinetaUrl, tp.milanAlts.pinetaCta)} · ${linkTag(clubGuideUrl, tp.milanAlts.clubGuideCta)}.</p>`;

  const s6 = `<h3>${escapeHtml(tp.h3[15])}</h3>
<p>${escapeHtml(tp.logistics.bookingProtocol)}</p>
<ol class="list-decimal pl-6 space-y-2 my-4">
${tp.logistics.bookingSteps.map((st) => `<li>${escapeHtml(st)}</li>`).join('\n')}
</ol>
<h3>${escapeHtml(tp.h3[16])}</h3>
<p>${escapeHtml(ss38Note)} ${escapeHtml(tp.logistics.transitSirmione)}</p>
<ul class="list-disc pl-6 space-y-2 my-4">
${tp.sirmione.packingList.map((pk) => `<li>${escapeHtml(pk)}</li>`).join('\n')}
</ul>
<h3>${escapeHtml(tp.h3[17])}</h3>
<p>${escapeHtml(tp.logistics.hubLinkNote)} ${escapeHtml(cp.overview.tableLead)}</p>
${buildPartner18MatrixHtml(locale)}
<p>${linkTag(capodannoPath(locale), tp.logistics.categoryCta)} · <a href="https://wa.me/393519127047" class="underline decoration-current/55 underline-offset-4">${escapeHtml(tp.logistics.whatsappCta)}</a> | <a href="mailto:concierge@nightlifemilan.com" class="underline decoration-current/55 underline-offset-4">concierge@nightlifemilan.com</a>.</p>`;

  const out: RenderedGuide = {
    title: sanitizeText(lx.bor_title),
    excerpt: sanitizeText(lx.bor_exc),
    sections: [
      { heading: sanitizeText(tp.h2[1]), content: s1 },
      { heading: sanitizeText(tp.h2[0]), content: s2 },
      { heading: sanitizeText(tp.h2[2]), content: s3 },
      { heading: sanitizeText(tp.h2[3]), content: s4 },
      { heading: sanitizeText(tp.h2[4]), content: s5 },
      { heading: sanitizeText(tp.h2[5]), content: s6 },
    ],
    faqs: tp.faqs.slice(0, 6).map(([q, a]) => ({ question: sanitizeText(q), answer: sanitizeText(a) })),
  };
  BATCH_CACHE.set(ck, out);
  return out;
}

// ─── 3. g-weekly-calendar: CALENDARIO SETTIMANALE LUN-DOM MILANO 2026/2027 ─────
function renderWeeklyCalendarGuide(locale: LocaleCode): RenderedGuide {
  const ck = `g-weekly-calendar:${locale}`;
  const hit = BATCH_CACHE.get(ck);
  if (hit) return hit;

  const lx = GSC_BATCH_20261122_LEX[locale] || GSC_BATCH_20261122_LEX.en;
  const cp = CLUBBING_PILLAR_35[locale] || CLUBBING_PILLAR_35.en;
  const tl = cp.tableLabels;

  const justMeUrl = clubUrl('just-me-milan', locale);
  const pinetaUrl = clubUrl('pineta-milano', locale);
  const voyaUrl = clubUrl('voya-rooftop-milan', locale);
  const repUrl = clubUrl('repvblic-milan', locale);
  const fiftyFiveUrl = clubUrl('55-milano', locale);
  const theClubUrl = clubUrl('the-club-milan', locale);
  const hollyUrl = clubUrl('hollywood-milan', locale);
  const tocqUrl = clubUrl('tocqueville-13-milan', locale);
  const gattoUrl = clubUrl('il-gattopardo-milan', locale);
  const bobinoGuide = guideUrl('g-38', locale);
  const loolaGuide = guideUrl('g-37', locale);
  const regGuide = guideUrl('g-119', locale);
  const clubGuide = guideUrl('g-118', locale);
  const gateNye = capodannoEventPath('capodanno-gate-milano', locale);

  const weekTable = makeTable(
    [lx.mon + ' - ' + lx.sun, tl.thVenue, tl.thDistrict, tl.thWeeklyRef, tl.thStatus],
    [
      [lx.mon, 'Just Me Milano (7/7) · Hollywood', 'Parco Sempione · Corso Como', 'Aperitivo 20 EUR · VIP 320 EUR', linkTag(justMeUrl, tl.statusConfirmed)],
      [lx.tue, 'The Club · Tocqueville 13 · Loolapaloosa · Just Me', 'Brera / Moscova · Corso Como', '15-25 EUR · VIP 250-320 EUR', linkTag(theClubUrl, tl.statusConfirmed)],
      [lx.wed, 'Bobino · The Club · Hollywood · Just Me', 'Navigli M2 · Moscova · Sempione', '18-25 EUR · VIP 180-320 EUR', linkTag(bobinoGuide, tl.statusConfirmed)],
      [lx.thu, '55 Milano · REPVBLIC · Pineta · Just Me', 'Sempione · Repubblica · Cenisio', '20-35 EUR · VIP 250-600 EUR', linkTag(fiftyFiveUrl, tl.statusConfirmed)],
      [lx.fri, 'Pineta · Voya 20F · Il Gattopardo · Just Me · REPVBLIC', 'Garibaldi · CityLife · Sempione', '20-50 EUR · VIP 300-1.500 EUR', linkTag(pinetaUrl, tl.statusConfirmed)],
      [lx.sat, 'Just Me · Pineta · Gate Perreo XL · Voya · 55 · Bobino', 'Tutta Milano (18 Partner)', '20-50 EUR · VIP 300-2.500 EUR', linkTag(gateNye, tl.statusConfirmed)],
      [lx.sun, 'Just Me Sunday · Bobino · 55 Milano · Loolapaloosa', 'Sempione · Navigli · Corso Como', '15-25 EUR · VIP 200-320 EUR', linkTag(loolaGuide, tl.statusConfirmed)],
    ],
    true,
  );

  const tierTable = makeTable(
    [tl.thFormula, tl.thWeeklyRef, tl.thNye2027, tl.thDressCode],
    cp.gattopardoCitylife.tierRows,
  );

  const s1 = `<h3>${escapeHtml(cp.h3[0])}</h3>
<p>${escapeHtml(cp.intro[0])} ${escapeHtml(cp.intro[1])}</p>
<p>${escapeHtml(cp.overview.tableLead)} ${escapeHtml(cp.overview.venueSpecsSummary)}</p>
<h3>${escapeHtml(cp.h3[1])}</h3>
${weekTable}
<h3>${escapeHtml(cp.h3[2])}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.overview.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join('\n')}
</ul>
<p>${linkTag(clubGuide, lx.cal_short)} · ${linkTag(regGuide, lx.reg_short)}.</p>`;

  const s2 = `<h3>${escapeHtml(cp.h3[3])}</h3>
<p>${escapeHtml(cp.sempioneBreraComo.justMeLead)}</p>
<h3>${escapeHtml(cp.h3[4])}</h3>
<p>${escapeHtml(cp.sempioneBreraComo.corsoComoLead)}</p>
<h3>${escapeHtml(cp.h3[5])}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.sempioneBreraComo.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('\n')}
</ul>
<p>${linkTag(justMeUrl, 'Just Me 7/7')} · ${linkTag(theClubUrl, 'The Club')} · ${linkTag(tocqUrl, 'Tocqueville 13')} · ${linkTag(hollyUrl, 'Hollywood')} · ${linkTag(loolaGuide, 'Loolapaloosa')}.</p>`;

  const s3 = `<h3>${escapeHtml(cp.h3[6])}</h3>
<p>${escapeHtml(cp.gattopardoCitylife.gattopardoDetail)}</p>
<h3>${escapeHtml(cp.h3[7])}</h3>
<p>${escapeHtml(cp.gattopardoCitylife.voyaDetail)} ${escapeHtml(lx.winter_rep || cp.gattopardoCitylife.fiftyFiveRepvblicDetail)}</p>
<h3>${escapeHtml(cp.h3[8])}</h3>
${tierTable}
<p>${linkTag(pinetaUrl, 'Pineta Milano')} · ${linkTag(voyaUrl, 'Voya Rooftop')} · ${linkTag(repUrl, 'REPVBLIC')} · ${linkTag(fiftyFiveUrl, '55 Milano')} · ${linkTag(gattoUrl, 'Il Gattopardo')}.</p>`;

  const s4 = `<h3>${escapeHtml(cp.h3[9])}</h3>
<p>${escapeHtml(cp.reggaetonNavigliSanSiro.gateAriaDetail)} ${escapeHtml(lx.winter_aria || '')}</p>
<h3>${escapeHtml(cp.h3[10])}</h3>
<p>${escapeHtml(cp.reggaetonNavigliSanSiro.navigliEastDetail)}</p>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.reggaetonNavigliSanSiro.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('\n')}
</ul>
<h3>${escapeHtml(cp.h3[11])}</h3>
<p>${escapeHtml(cp.reggaetonNavigliSanSiro.gardaTomDetail)}</p>
<p>${linkTag(bobinoGuide, 'Bobino Milano')} · ${linkTag(regGuide, lx.reg_short)}.</p>`;

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
    title: sanitizeText(lx.cal_title),
    excerpt: sanitizeText(lx.cal_exc),
    sections: [
      { heading: sanitizeText(`1. ${lx.mon} - ${lx.sun}: ${lx.city} 2026/2027`), content: s1 },
      { heading: sanitizeText(cp.h2[1]), content: s2 },
      { heading: sanitizeText(cp.h2[2]), content: s3 },
      { heading: sanitizeText(cp.h2[3]), content: s4 },
      { heading: sanitizeText(cp.h2[4]), content: s5 },
      { heading: sanitizeText(cp.h2[5]), content: s6 },
    ],
    faqs: cp.faqs.slice(0, 6).map(([q, a]) => ({ question: sanitizeText(q), answer: sanitizeText(a) })),
  };
  BATCH_CACHE.set(ck, out);
  return out;
}

// ─── 4. g-37: LOOLAPALOOSA MILANO CORSO COMO 15 & CIRCUITO GARIBALDI ───────────
function renderLoolapaloosaGuide(locale: LocaleCode): RenderedGuide {
  const ck = `g-37:${locale}`;
  const hit = BATCH_CACHE.get(ck);
  if (hit) return hit;

  const lx = GSC_BATCH_20261122_LEX[locale] || GSC_BATCH_20261122_LEX.en;
  const cp = CLUBBING_PILLAR_35[locale] || CLUBBING_PILLAR_35.en;
  const tl = cp.tableLabels;

  const hollyUrl = clubUrl('hollywood-milan', locale);
  const tocqUrl = clubUrl('tocqueville-13-milan', locale);
  const theClubUrl = clubUrl('the-club-milan', locale);
  const elevenUrl = clubUrl('11-clubroom-milan', locale);
  const pinetaUrl = clubUrl('pineta-milano', locale);
  const voyaUrl = clubUrl('voya-rooftop-milan', locale);
  const justMeUrl = clubUrl('just-me-milan', locale);
  const calGuide = guideUrl('g-weekly-calendar', locale);
  const clubGuide = guideUrl('g-118', locale);

  const loolaTable = makeTable(
    [tl.thFormula, tl.thDistrict, tl.thWeeklyRef, tl.thDressCode],
    [
      ['Loolapaloosa · Sunset Aperitivo', 'Corso Como 15 (19:00 - 22:30)', '15 - 20 EUR', 'Smart Casual'],
      ['Loolapaloosa · Evening Entry', 'Corso Como 15 (23:00 - 04:30)', '15 - 20 EUR', 'Smart Casual 20+'],
      ['Loolapaloosa · Dancefloor VIP Table', '6 - 8 pax (100% Bottle Credit)', '200 - 250 EUR', 'Collared Shirt / Chic'],
      ['Loolapaloosa · Central Party Privé', '8 - 10 pax (100% Bottle Credit)', '350 - 500 EUR', 'Smart Evening'],
      ['Loolapaloosa · Bar & DJ Console VIP', '10 - 15 pax (100% Bottle Credit)', '600 - 1.000 EUR', 'VIP Fast-Track'],
    ],
  );

  const circuitTable = makeTable(
    [tl.thVenue, tl.thDistrict, tl.thWeeklyRef, tl.thNye2027, tl.thStatus],
    [
      ['Hollywood Milano', 'Corso Como 15 (10 m)', tl.hollywoodRates, '50 EUR · VIP 400-1.200 EUR', linkTag(hollyUrl, tl.statusConfirmed)],
      ['Tocqueville 13', 'Via Tocqueville 13 (120 m)', tl.tocquevilleRates, '50-150 EUR · VIP 500-1.500 EUR', linkTag(tocqUrl, tl.statusConfirmed)],
      ['11 Clubroom Milano', 'Via Tocqueville 11 (110 m)', '20-30 EUR · VIP 300-800 EUR', '50 EUR · VIP 500-1.200 EUR', linkTag(elevenUrl, tl.statusConfirmed)],
      ['The Club Milano', 'Corso Garibaldi 97 (450 m)', tl.theClubRates, '50 EUR · VIP 500-1.800 EUR', linkTag(theClubUrl, tl.statusConfirmed)],
      ['Pineta Milano', 'Via Messina 38 (M5 Cenisio)', tl.pinetaRates, '40 / 160 EUR · VIP 300-1.500 EUR', linkTag(pinetaUrl, tl.statusConfirmed)],
      ['Voya Rooftop 20F', 'Viale Achille Papa 30 (M5)', tl.voyaRates, '300 EUR All-Inclusive', linkTag(voyaUrl, tl.statusConfirmed)],
    ],
    true,
  );

  const loolaLead = lx.loola_lead || cp.sempioneBreraComo.corsoComoLead;

  const s1 = `<h3>Loolapaloosa Milano · Corso Como 15 (${escapeHtml(lx.tue)} - ${escapeHtml(lx.sun)})</h3>
<p>${escapeHtml(loolaLead)} ${escapeHtml(cp.sempioneBreraComo.corsoComoLead)}</p>
<p>${escapeHtml(cp.intro[0])} ${escapeHtml(cp.intro[1])}</p>
<h3>${escapeHtml(cp.h3[0])}</h3>
${loolaTable}
<h3>${escapeHtml(cp.h3[2])}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.sempioneBreraComo.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('\n')}
</ul>`;

  const s2 = `<h3>Corso Como & Porta Garibaldi Partner Circuit</h3>
<p>${escapeHtml(cp.sempioneBreraComo.pinetaClubLead)}</p>
<h3>${escapeHtml(cp.h3[1])}</h3>
${circuitTable}
<h3>${escapeHtml(cp.h3[3])}</h3>
<p>${escapeHtml(cp.sempioneBreraComo.justMeLead)}</p>
<p>${linkTag(hollyUrl, 'Hollywood')} · ${linkTag(tocqUrl, 'Tocqueville 13')} · ${linkTag(elevenUrl, '11 Clubroom')} · ${linkTag(theClubUrl, 'The Club')} · ${linkTag(justMeUrl, 'Just Me')}.</p>`;

  const s3 = `<h3>${escapeHtml(cp.h3[6])}</h3>
<p>${escapeHtml(cp.gattopardoCitylife.voyaDetail)} ${escapeHtml(lx.winter_rep || cp.gattopardoCitylife.fiftyFiveRepvblicDetail)}</p>
<h3>${escapeHtml(cp.h3[7])}</h3>
<p>${escapeHtml(cp.gattopardoCitylife.gattopardoDetail)}</p>
<h3>${escapeHtml(cp.h3[8])}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.overview.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join('\n')}
</ul>
<p>${linkTag(pinetaUrl, 'Pineta Milano')} · ${linkTag(voyaUrl, 'Voya Rooftop')} · ${linkTag(calGuide, lx.cal_short)}.</p>`;

  const s4 = `<h3>${escapeHtml(cp.h3[9])}</h3>
<p>${escapeHtml(cp.reggaetonNavigliSanSiro.gateAriaDetail)}</p>
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
<p>${escapeHtml(cp.overview.tableLead)} ${escapeHtml(cp.overview.venueSpecsSummary)}</p>
${buildPartner18MatrixHtml(locale)}
<p>${linkTag(clubGuide, lx.loo_short)} · ${linkTag(capodannoPath(locale), cp.conciergeAndTransit.nyeHubCta)} · <a href="https://wa.me/393519127047" class="underline decoration-current/55 underline-offset-4">${escapeHtml(cp.conciergeAndTransit.whatsappCta)}</a> | <a href="mailto:concierge@nightlifemilan.com" class="underline decoration-current/55 underline-offset-4">concierge@nightlifemilan.com</a>.</p>`;

  const out: RenderedGuide = {
    title: sanitizeText(lx.loo_title),
    excerpt: sanitizeText(lx.loo_exc),
    sections: [
      { heading: sanitizeText(`1. Loolapaloosa Corso Como 15 · ${lx.city}`), content: s1 },
      { heading: sanitizeText(cp.h2[1]), content: s2 },
      { heading: sanitizeText(cp.h2[2]), content: s3 },
      { heading: sanitizeText(cp.h2[3]), content: s4 },
      { heading: sanitizeText(cp.h2[4]), content: s5 },
      { heading: sanitizeText(cp.h2[5]), content: s6 },
    ],
    faqs: cp.faqs.slice(0, 6).map(([q, a]) => ({ question: sanitizeText(q), answer: sanitizeText(a) })),
  };
  BATCH_CACHE.set(ck, out);
  return out;
}

// ─── 5. g-38: BOBINO MILANO NAVIGLI (PIAZZALE STAZIONE GENOVA 4) ───────────────
function renderBobinoGuide(locale: LocaleCode): RenderedGuide {
  const ck = `g-38:${locale}`;
  const hit = BATCH_CACHE.get(ck);
  if (hit) return hit;

  const lx = GSC_BATCH_20261122_LEX[locale] || GSC_BATCH_20261122_LEX.en;
  const cp = CLUBBING_PILLAR_35[locale] || CLUBBING_PILLAR_35.en;
  const tl = cp.tableLabels;

  const bobinoNye = capodannoEventPath('capodanno-bobino-milano', locale);
  const bischeriNye = capodannoEventPath('capodanno-bischeri-milano', locale);
  const magazziniNye = capodannoEventPath('capodanno-magazzini-generali-milano', locale);
  const fiftyFiveUrl = clubUrl('55-milano', locale);
  const justMeUrl = clubUrl('just-me-milan', locale);
  const pinetaUrl = clubUrl('pineta-milano', locale);
  const voyaUrl = clubUrl('voya-rooftop-milan', locale);
  const calGuide = guideUrl('g-weekly-calendar', locale);
  const clubGuide = guideUrl('g-118', locale);

  const bobinoTable = makeTable(
    [tl.thFormula, tl.thDistrict, tl.thWeeklyRef, tl.thDressCode],
    [
      ['Bobino · Gourmet Aperitivo Buffet', 'P.le Stazione Genova 4 (19:00 - 22:30)', '18 - 25 EUR', 'Smart Casual 22+'],
      ['Bobino · Evening Club Entry', 'Indoor Salon & Garden (22:30 - 03:30)', '15 - 20 EUR', 'Smart Casual 22+'],
      ['Bobino · Dancefloor Bottle Table', '6 - 8 pax (100% Bottle Credit)', '180 - 250 EUR', 'Collared Shirt / Chic'],
      ['Bobino · Indoor / Winter Garden Privé', '8 - 12 pax (100% Bottle Credit)', '300 - 500 EUR', 'Adult Evening 25+'],
      ['Bobino · Exclusive Terrace VIP Zone', '12 - 20 pax (100% Bottle Credit)', '600 - 1.000 EUR', 'VIP Fast-Track'],
    ],
  );

  const southWestTable = makeTable(
    [tl.thVenue, tl.thDistrict, tl.thWeeklyRef, tl.thNye2027, tl.thStatus],
    [
      ['Bobino Milano (Partner #9)', 'P.le Stazione Genova 4 (M2)', '18-25 EUR · VIP 180-500 EUR', 'NYE Gala & Party Partner', linkTag(bobinoNye, tl.statusConfirmed)],
      ['Bischeri Milano (Partner #6)', 'Navigli / Conchetta', 'Dinner Show & Wine Gala', 'NYE Dinner Show Partner', linkTag(bischeriNye, tl.statusConfirmed)],
      ['Magazzini Generali (Partner #8)', 'Via Pietrasanta 16 (Porta Romana)', '20-35 EUR · VIP 300-800 EUR', 'NYE Arena Clubbing', linkTag(magazziniNye, tl.statusConfirmed)],
      ['55 Milano (Partner #13)', 'Via Piero della Francesca 55', tl.fiftyFiveRates, '30-160 EUR · VIP 200-350 EUR', linkTag(fiftyFiveUrl, tl.statusConfirmed)],
      ['Just Me Milano (Partner #1)', 'Viale Luigi Camoens 2 (Sempione)', tl.justMeRates, '80 / 300 EUR · VIP 600-5.000 EUR', linkTag(justMeUrl, tl.statusConfirmed)],
      ['Voya Rooftop 20F (Partner #3)', 'Viale Achille Papa 30 (CityLife)', tl.voyaRates, '300 EUR All-Inclusive', linkTag(voyaUrl, tl.statusConfirmed)],
    ],
    true,
  );

  const bobLead = lx.bobino_lead || cp.reggaetonNavigliSanSiro.navigliEastDetail;

  const s1 = `<h3>Bobino Milano · Piazzale Stazione Genova 4 (${escapeHtml(lx.wed)} - ${escapeHtml(lx.sun)})</h3>
<p>${escapeHtml(bobLead)} ${escapeHtml(cp.reggaetonNavigliSanSiro.navigliEastDetail)}</p>
<p>${escapeHtml(cp.intro[0])} ${escapeHtml(cp.intro[1])}</p>
<h3>${escapeHtml(cp.h3[0])}</h3>
${bobinoTable}
<h3>${escapeHtml(cp.h3[10])}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.reggaetonNavigliSanSiro.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('\n')}
</ul>
<p>${linkTag(bobinoNye, 'Bobino ' + lx.nye)} · ${linkTag(clubGuide, lx.bob_short)}.</p>`;

  const s2 = `<h3>Navigli, Tortona & Porta Genova Partner Network</h3>
<p>${escapeHtml(cp.reggaetonNavigliSanSiro.gardaTomDetail)}</p>
<h3>${escapeHtml(cp.h3[1])}</h3>
${southWestTable}
<h3>${escapeHtml(cp.h3[11])}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.overview.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join('\n')}
</ul>
<p>${linkTag(bischeriNye, 'Bischeri')} · ${linkTag(magazziniNye, 'Magazzini Generali')} · ${linkTag(fiftyFiveUrl, '55 Milano')} · ${linkTag(calGuide, lx.cal_short)}.</p>`;

  const s3 = `<h3>${escapeHtml(cp.h3[3])}</h3>
<p>${escapeHtml(cp.sempioneBreraComo.justMeLead)} ${escapeHtml(cp.sempioneBreraComo.pinetaClubLead)}</p>
<h3>${escapeHtml(cp.h3[6])}</h3>
<p>${escapeHtml(cp.gattopardoCitylife.gattopardoDetail)}</p>
<h3>${escapeHtml(cp.h3[7])}</h3>
<p>${escapeHtml(cp.gattopardoCitylife.voyaDetail)} ${escapeHtml(lx.winter_rep || cp.gattopardoCitylife.fiftyFiveRepvblicDetail)}</p>
<p>${linkTag(justMeUrl, 'Just Me')} · ${linkTag(pinetaUrl, 'Pineta')} · ${linkTag(voyaUrl, 'Voya Rooftop')}.</p>`;

  const s4 = `<h3>${escapeHtml(cp.h3[4])}</h3>
<p>${escapeHtml(cp.sempioneBreraComo.corsoComoLead)} ${escapeHtml(cp.reggaetonNavigliSanSiro.gateAriaDetail)}</p>
<h3>${escapeHtml(cp.h3[5])}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.sempioneBreraComo.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('\n')}
</ul>
<h3>${escapeHtml(cp.h3[9])}</h3>
<p>${escapeHtml(lx.winter_aria || cp.overview.tableLead)}</p>`;

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
<p>${linkTag(bobinoNye, cp.reggaetonNavigliSanSiro.ctas.bobinoNye)} · ${linkTag(capodannoPath(locale), cp.conciergeAndTransit.nyeHubCta)} · <a href="https://wa.me/393519127047" class="underline decoration-current/55 underline-offset-4">${escapeHtml(cp.conciergeAndTransit.whatsappCta)}</a> | <a href="mailto:concierge@nightlifemilan.com" class="underline decoration-current/55 underline-offset-4">concierge@nightlifemilan.com</a>.</p>`;

  const out: RenderedGuide = {
    title: sanitizeText(lx.bob_title),
    excerpt: sanitizeText(lx.bob_exc),
    sections: [
      { heading: sanitizeText(`1. Bobino Milano Navigli · Porta Genova M2`), content: s1 },
      { heading: sanitizeText(cp.h2[3]), content: s2 },
      { heading: sanitizeText(cp.h2[2]), content: s3 },
      { heading: sanitizeText(cp.h2[1]), content: s4 },
      { heading: sanitizeText(cp.h2[4]), content: s5 },
      { heading: sanitizeText(cp.h2[5]), content: s6 },
    ],
    faqs: cp.faqs.slice(0, 6).map(([q, a]) => ({ question: sanitizeText(q), answer: sanitizeText(a) })),
  };
  BATCH_CACHE.set(ck, out);
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
    dateModified: '2026-11-22',
    image: heroImage,
  };
}

export function applyGscGuidesBatch20261122(guidesList: Guide[]): void {
  // 1. Potenzia in-place g-weekly-calendar, g-37 e g-38 preservando i loro 35 slug canonici
  const upgrades: Array<{
    id: string;
    renderer: (loc: LocaleCode) => RenderedGuide;
    genres: MusicGenre[];
    hero: string;
  }> = [
    {
      id: 'g-weekly-calendar',
      renderer: renderWeeklyCalendarGuide,
      genres: [MusicGenre.HOUSE, MusicGenre.COMMERCIAL, MusicGenre.REGGAETON, MusicGenre.HIP_HOP],
      hero: '/images/guides-editorial/just-me-dancefloor.webp',
    },
    {
      id: 'g-37',
      renderer: renderLoolapaloosaGuide,
      genres: [MusicGenre.COMMERCIAL, MusicGenre.HOUSE, MusicGenre.REGGAETON],
      hero: '/images/guides-editorial/hollywood-corso-como.webp',
    },
    {
      id: 'g-38',
      renderer: renderBobinoGuide,
      genres: [MusicGenre.COMMERCIAL, MusicGenre.HOUSE],
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

  // 2. Aggiungi le 2 nuove guide Pillar g-119 e g-120 se non gia presenti
  if (!guidesList.some((g) => g.id === 'g-119')) {
    guidesList.push(
      buildLazyGuide(
        'g-119',
        GUIDE_100_SLUGS_MAP['g-119'] as Record<LocaleCode, string>,
        renderReggaetonGuide,
        [MusicGenre.REGGAETON, MusicGenre.HIP_HOP, MusicGenre.COMMERCIAL],
        '/images/guides-editorial/gate-neon.webp',
        '2026-11-22',
      ),
    );
  }
  if (!guidesList.some((g) => g.id === 'g-120')) {
    guidesList.push(
      buildLazyGuide(
        'g-120',
        GUIDE_100_SLUGS_MAP['g-120'] as Record<LocaleCode, string>,
        renderBormioGuide,
        [MusicGenre.COMMERCIAL, MusicGenre.HOUSE],
        '/images/guides-editorial/terme-alpine-snow.webp',
        '2026-11-22',
      ),
    );
  }
}
