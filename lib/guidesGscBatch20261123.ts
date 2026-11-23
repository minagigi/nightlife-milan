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
import { GSC_BATCH_20261122_LEX } from './i18n/pillarGuides20261122';
import { GSC_BATCH_20261123_LEX } from './i18n/pillarGuides20261123';
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

const BATCH_20261123_CACHE = new Map<string, RenderedGuide>();

export function getGsc20261123DisplayHeadline(guideId: string, locale: LocaleCode): string | null {
  const lx = GSC_BATCH_20261123_LEX[locale] || GSC_BATCH_20261123_LEX.en;
  if (guideId === 'g-30') return sanitizeText(`Gattopardo ${lx.city}`);
  if (guideId === 'g-121') return sanitizeText(lx.piazze_disp);
  if (guideId === 'g-122') return 'Como 2027';
  if (guideId === 'g-123') return 'Varese 2027';
  if (guideId === 'g-124') return 'Mascara 2027';
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

// ─── 1. g-30 (POTENZIA): IL GATTOPARDO MILANO (EX CHIESA SCONSACRATA) ───────────
function renderGattopardoGuide(locale: LocaleCode): RenderedGuide {
  const ck = `g-30:${locale}`;
  const hit = BATCH_20261123_CACHE.get(ck);
  if (hit) return hit;

  const lx = GSC_BATCH_20261123_LEX[locale] || GSC_BATCH_20261123_LEX.en;
  const lx22 = GSC_BATCH_20261122_LEX[locale] || GSC_BATCH_20261122_LEX.en;
  const cp = CLUBBING_PILLAR_35[locale] || CLUBBING_PILLAR_35.en;
  const tl = cp.tableLabels;

  const gattoClub = clubUrl('il-gattopardo-milan', locale);
  const gattoNye = capodannoEventPath('capodanno-il-gattopardo-milano', locale);
  const fiftyFiveUrl = clubUrl('55-milano', locale);
  const fiftyFiveNye = capodannoEventPath('capodanno-55-milano', locale);
  const justMeUrl = clubUrl('just-me-milan', locale);
  const justMeNye = capodannoEventPath('capodanno-justme-milano-torre-branca', locale);
  const voyaUrl = clubUrl('voya-rooftop-milan', locale);
  const voyaNye = capodannoEventPath('capodanno-voya-rooftop-milano', locale);
  const pinetaUrl = clubUrl('pineta-milano', locale);
  const repUrl = clubUrl('repvblic-milan', locale);
  const clubGuide = guideUrl('g-118', locale);
  const calGuide = guideUrl('g-weekly-calendar', locale);

  const gattoFormulasTable = makeTable(
    [tl.thFormula, tl.thDistrict, tl.thWeeklyRef, tl.thDressCode],
    [
      ['Il Gattopardo · Royal Aperitivo Buffet', 'Via Piero della Francesca 47 (20:00 - 22:30)', '20 - 25 EUR', tl.dressSmartChic],
      ['Il Gattopardo · Gala Dinner under Vaults', 'Central Nave & Velvet Salons (20:30 - 23:00)', '45 - 65 EUR', tl.dressEveningElegance],
      ['Il Gattopardo · Accredited Guestlist', 'Tue, Fri & Sat (23:00 - 00:45)', '15 - 20 EUR', '20+ W / 22+ M · Collar Shirt'],
      ['Il Gattopardo · Dancefloor Bottle Table', '6 - 8 pax (100% Bottle Credit)', '200 - 300 EUR', tl.dressSmartChic],
      ['Il Gattopardo · Altar & Balcony Privé', '8 - 10 pax (100% Bottle Credit)', '400 - 650 EUR', tl.dressEveningElegance],
      ['Il Gattopardo · Crystal Chandelier Stage', '10 - 15 pax (DJ Altar Super Privé)', '750 - 1.400 EUR', tl.dressBlackTie],
      ['Il Gattopardo · NYE 2027 VIP Minimum Spend', '31/12/2026 (22:30 - 05:00 · 100% Prepayment)', '600 EUR / pax', tl.dressBlackTie],
      ['Il Gattopardo · NYE 2027 Dome & Center Altar', 'Exclusive Vaults (WhatsApp +39 351 912 7047)', tl.statusConfirmed, tl.dressBlackTie],
    ],
  );

  const sempioneTable = makeTable(
    [tl.thVenue, tl.thDistrict, tl.thWeeklyRef, tl.thNye2027, tl.thStatus],
    [
      ['Il Gattopardo Milano (Ex Chiesa)', 'Via Piero della Francesca 47 (M5)', '20-25 EUR · VIP 200-1.400 EUR', '600 EUR / pax Minimum Spend', linkTag(gattoNye, tl.statusConfirmed)],
      ['55 Milano (1.000 mq Loft)', 'Via Piero della Francesca 55 (80 m)', tl.fiftyFiveRates, '30-160 EUR · VIP 200-350 EUR', linkTag(fiftyFiveNye, tl.statusConfirmed)],
      ['Just Me Milano (ex Just Cavalli)', 'Viale Luigi Camoens 2 (Torre Branca)', tl.justMeRates, '80 / 300 EUR · VIP 600-5.000 EUR', linkTag(justMeNye, tl.statusConfirmed)],
      ['Voya Rooftop Milano (20° Piano)', 'Viale Achille Papa 30 (CityLife)', tl.voyaRates, '300 EUR All-Inclusive', linkTag(voyaNye, tl.statusConfirmed)],
      ['Pineta Milano', 'Via Messina 38 (Cenisio M5)', tl.pinetaRates, '40 / 160 EUR · VIP 300-1.500 EUR', linkTag(pinetaUrl, tl.statusConfirmed)],
      ['REPVBLIC Milano', 'Piazza della Repubblica 12 (WhatsApp)', 'VIP 300 / 600 EUR', '45 EUR · VIP 600-1.200 EUR', linkTag(repUrl, tl.statusConfirmed)],
    ],
    true,
  );

  const s1 = `<h3>Il Gattopardo ${escapeHtml(lx.city)} · Via Piero della Francesca 47 (M5 Gerusalemme)</h3>
<p>${escapeHtml(lx.gat_lead)}</p>
<p>${escapeHtml(cp.gattopardoCitylife.gattopardoDetail)} ${escapeHtml(cp.intro[0])}</p>
<h3>${escapeHtml(cp.h3[6])}</h3>
${gattoFormulasTable}
<h3>${escapeHtml(cp.h3[2])}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.overview.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join('\n')}
</ul>
<p>${linkTag(gattoClub, cp.gattopardoCitylife.ctas.gattopardoClub)} · ${linkTag(gattoNye, cp.gattopardoCitylife.ctas.gattopardoNye)} · ${linkTag(clubGuide, lx22.cal_short)}.</p>`;

  const s2 = `<h3>Corso Sempione, Via Piero della Francesca & CityLife Partner Circuit</h3>
<p>${escapeHtml(cp.gattopardoCitylife.voyaDetail)} ${escapeHtml(lx22.winter_rep || cp.gattopardoCitylife.fiftyFiveRepvblicDetail)}</p>
<h3>${escapeHtml(cp.h3[7])}</h3>
${sempioneTable}
<h3>${escapeHtml(cp.h3[8])}</h3>
<p>${escapeHtml(cp.sempioneBreraComo.justMeLead)}</p>
<p>${linkTag(fiftyFiveUrl, '55 Milano')} · ${linkTag(justMeUrl, 'Just Me Milano')} · ${linkTag(voyaUrl, 'Voya Rooftop')} · ${linkTag(pinetaUrl, 'Pineta Milano')} · ${linkTag(repUrl, 'REPVBLIC Milano')}.</p>`;

  const s3 = `<h3>${escapeHtml(cp.h3[4])}</h3>
<p>${escapeHtml(cp.sempioneBreraComo.pinetaClubLead)} ${escapeHtml(cp.sempioneBreraComo.corsoComoLead)}</p>
<h3>${escapeHtml(cp.h3[5])}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.sempioneBreraComo.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('\n')}
</ul>
<h3>${escapeHtml(cp.h3[3])}</h3>
<p>${escapeHtml(cp.intro[1])}</p>`;

  const s4 = `<h3>${escapeHtml(cp.h3[9])}</h3>
<p>${escapeHtml(cp.reggaetonNavigliSanSiro.gateAriaDetail)} ${escapeHtml(lx22.winter_aria || '')}</p>
<h3>${escapeHtml(cp.h3[10])}</h3>
<p>${escapeHtml(cp.reggaetonNavigliSanSiro.navigliEastDetail)} ${escapeHtml(cp.reggaetonNavigliSanSiro.gardaTomDetail)}</p>
<h3>${escapeHtml(cp.h3[11])}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.reggaetonNavigliSanSiro.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('\n')}
</ul>
<p>${linkTag(calGuide, lx22.cal_short)} · ${linkTag(genreUrl('house', locale), 'House & Vocal Clubbing')}.</p>`;

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
<p>${linkTag(gattoNye, cp.gattopardoCitylife.ctas.gattopardoNye)} · ${linkTag(capodannoPath(locale), cp.conciergeAndTransit.nyeHubCta)} · <a href="https://wa.me/393519127047" class="underline decoration-current/55 underline-offset-4">${escapeHtml(cp.conciergeAndTransit.whatsappCta)}</a> | <a href="mailto:concierge@nightlifemilan.com" class="underline decoration-current/55 underline-offset-4">concierge@nightlifemilan.com</a>.</p>`;

  const out: RenderedGuide = {
    title: sanitizeText(lx.gat_title),
    excerpt: sanitizeText(lx.gat_exc),
    sections: [
      { heading: sanitizeText(`1. Il Gattopardo ${lx.city} · Via Piero della Francesca 47`), content: s1 },
      { heading: sanitizeText(cp.h2[2]), content: s2 },
      { heading: sanitizeText(cp.h2[1]), content: s3 },
      { heading: sanitizeText(cp.h2[3]), content: s4 },
      { heading: sanitizeText(cp.h2[4]), content: s5 },
      { heading: sanitizeText(cp.h2[5]), content: s6 },
    ],
    faqs: cp.faqs.slice(0, 6).map(([q, a]) => ({ question: sanitizeText(q), answer: sanitizeText(a) })),
  };
  BATCH_20261123_CACHE.set(ck, out);
  return out;
}

// ─── 2. g-121: CAPODANNO PIAZZA VARESE, PAVIA & CREMONA 2027 ────────────────────
function renderPiazzaVaresePaviaCremonaGuide(locale: LocaleCode): RenderedGuide {
  const ck = `g-121:${locale}`;
  const hit = BATCH_20261123_CACHE.get(ck);
  if (hit) return hit;

  const lx = GSC_BATCH_20261123_LEX[locale] || GSC_BATCH_20261123_LEX.en;
  const lx22 = GSC_BATCH_20261122_LEX[locale] || GSC_BATCH_20261122_LEX.en;
  const cp = CLUBBING_PILLAR_35[locale] || CLUBBING_PILLAR_35.en;
  const tl = cp.tableLabels;

  const piazzaUrl = capodannoEventPath('capodanno-piazza-varese-pavia-cremona', locale);
  const garlascoUrl = capodannoEventPath('capodanno-pavia-le-rotonde-di-garlasco-oltrepo', locale);
  const cremonaUrl = capodannoEventPath('capodanno-cremona-lodi-juliette-magika-castello-chignolo', locale);
  const vareseClubUrl = capodannoEventPath('capodanno-varese-shed-club-palace-grand-hotel', locale);
  const barchettaUrl = capodannoEventPath('capodanno-hotel-barchetta-excelsior-como', locale);
  const voyaNye = capodannoEventPath('capodanno-voya-rooftop-milano', locale);
  const justMeNye = capodannoEventPath('capodanno-justme-milano-torre-branca', locale);
  const gattoNye = capodannoEventPath('capodanno-il-gattopardo-milano', locale);
  const bischeriNye = capodannoEventPath('capodanno-bischeri-milano', locale);
  const lombardiaHub = capodannoCategoryPath('capodanno-lombardia', locale);
  const piazzaHub = capodannoCategoryPath('capodanno-in-piazza-milano-lombardia', locale);
  const clubGuide = guideUrl('g-118', locale);
  const vareseGuide = guideUrl('g-123', locale);

  const squaresVsClubsTable = makeTable(
    [tl.thVenue, tl.thDistrict, tl.thMusic, tl.thNye2027, tl.thStatus],
    [
      ['Piazze Varese, Pavia & Cremona', 'Centri Storici (21:00 - 02:30)', 'Outdoor Countdown & Live Stage', '0 EUR (Free Public Square)', linkTag(piazzaUrl, tl.statusConfirmed)],
      ['Le Rotonde di Garlasco (Pavia)', 'Via Leonardo da Vinci 48, Garlasco (20:00 - 07:00)', 'Multi-Room Clubbing & Grand Buffet', '15 / 25 / 30 EUR · Hotel 89 EUR', linkTag(garlascoUrl, tl.statusConfirmed)],
      ['Cremona & Lodi · Juliette / Castello', 'Cremona & Lodi District (20:30 - 05:00)', 'Gala Dinner Show, Commercial & House', '40 EUR · Buffet 65-70 · Gala 130-140 EUR', linkTag(cremonaUrl, tl.statusConfirmed)],
      ['Palace Grand Hotel Varese', 'Via Luciano Manara 11, Varese', 'Closed for Restoration until May 2027', '0 EUR (Sold Out / Closed)', linkTag(vareseClubUrl, tl.statusClosed)],
      ['Hotel Barchetta Excelsior Como', 'Piazza Cavour 1, Como (20:00 - 00:30)', '5-Course DOCG Gala + Lake Fireworks', '175 EUR (87.50 EUR 5-12y)', linkTag(barchettaUrl, tl.statusConfirmed)],
      ['Voya Rooftop Milano (20° Piano)', 'Viale Achille Papa 30 (A8 Exit Portello)', 'Panoramic Gala & Open-Bar Clubbing', '300 EUR All-Inclusive', linkTag(voyaNye, tl.statusConfirmed)],
      ['Just Me Milano (ex Just Cavalli)', 'Parco Sempione · Torre Branca', 'Great Gatsby Gala & Clubbing 05:00', '80 / 300 EUR · VIP 600-5.000 EUR', linkTag(justMeNye, tl.statusConfirmed)],
      ['Bischeri Milano (Sud / A7 Corridor)', 'Via Giuseppe Ripamonti, Milano Sud', 'Gala Dinner Show & Dancefloor', tl.bischeriRates, linkTag(bischeriNye, tl.statusConfirmed)],
    ],
    true,
  );

  const corridorTable = makeTable(
    [tl.thDistrict, tl.thVenue, tl.thWeeklyRef, tl.thDressCode],
    [
      ['A8 Varese -> Milano Portello / Sempione', 'Voya Rooftop 20F · Il Gattopardo · Just Me · 55 Milano', '30 - 35 min (Zero ZTL Area C)', tl.dressBlackTie],
      ['A7 Pavia / Garlasco -> Milano Sud / Navigli', 'Le Rotonde Garlasco (until 07:00) · Bobino · Bischeri · Magazzini', '25 - 35 min + M2 Assago/Famagosta', tl.dressSmartChic],
      ['A1 / SS415 Cremona & Lodi -> Milano Est', 'Pelledoca · Magazzini Generali · REPVBLIC · Gate Milano', '40 - 50 min + Rogoredo / San Donato M3', tl.dressEveningElegance],
      ['Trenord S5 / RE Varese - Pavia - Cremona', 'Porta Garibaldi · Cadorna · Rogoredo · Centrale', 'Night Bus NM1 / NM2 / NM3 + Garage 24h', tl.dressSmartChic],
    ],
  );

  const s1 = `<h3>Varese, Pavia & Cremona · ${escapeHtml(lx.nye)} (21:00 - 02:30)</h3>
<p>${escapeHtml(lx.pia_lead)}</p>
<p>${escapeHtml(cp.intro[0])} ${escapeHtml(cp.intro[1])}</p>
<h3>${escapeHtml(cp.h3[0])}</h3>
${squaresVsClubsTable}
<h3>${escapeHtml(cp.h3[1])}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.overview.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join('\n')}
</ul>
<p>${linkTag(piazzaUrl, lx.piazze_disp)} · ${linkTag(garlascoUrl, 'Le Rotonde Garlasco 15-89 EUR')} · ${linkTag(cremonaUrl, 'Cremona & Lodi Gala')} · ${linkTag(piazzaHub, lx.nye)}.</p>`;

  const s2 = `<h3>A8, A7 & A1 Highway Corridors + Trenord Rail Connections</h3>
<p>${escapeHtml(cp.conciergeAndTransit.metroParkingDetail)}</p>
<h3>${escapeHtml(cp.h3[16])}</h3>
${corridorTable}
<h3>${escapeHtml(cp.h3[6])}</h3>
<p>${escapeHtml(cp.gattopardoCitylife.gattopardoDetail)} ${escapeHtml(cp.gattopardoCitylife.voyaDetail)}</p>
<p>${linkTag(vareseGuide, 'Varese & Shed Club 2027')} · ${linkTag(voyaNye, 'Voya Rooftop 20F')} · ${linkTag(gattoNye, 'Il Gattopardo 600 EUR')} · ${linkTag(lombardiaHub, 'Lombardia 2027')}.</p>`;

  const s3 = `<h3>${escapeHtml(cp.h3[3])}</h3>
<p>${escapeHtml(cp.sempioneBreraComo.justMeLead)} ${escapeHtml(cp.sempioneBreraComo.pinetaClubLead)}</p>
<h3>${escapeHtml(cp.h3[4])}</h3>
<p>${escapeHtml(cp.sempioneBreraComo.corsoComoLead)} ${escapeHtml(lx22.winter_rep || cp.gattopardoCitylife.fiftyFiveRepvblicDetail)}</p>
<h3>${escapeHtml(cp.h3[5])}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.sempioneBreraComo.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('\n')}
</ul>`;

  const s4 = `<h3>${escapeHtml(cp.h3[9])}</h3>
<p>${escapeHtml(cp.reggaetonNavigliSanSiro.navigliEastDetail)} ${escapeHtml(cp.reggaetonNavigliSanSiro.gateAriaDetail)} ${escapeHtml(lx22.winter_aria || '')}</p>
<h3>${escapeHtml(cp.h3[10])}</h3>
<p>${escapeHtml(cp.reggaetonNavigliSanSiro.gardaTomDetail)}</p>
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
<h3>${escapeHtml(cp.h3[2])}</h3>
<p>${escapeHtml(cp.conciergeAndTransit.termeCrossLink)}</p>
<h3>${escapeHtml(cp.h3[17])}</h3>
<p>${escapeHtml(cp.overview.tableLead)} ${escapeHtml(cp.overview.venueSpecsSummary)}</p>
${buildPartner18MatrixHtml(locale)}
<p>${linkTag(clubGuide, lx22.cal_short)} · ${linkTag(capodannoPath(locale), cp.conciergeAndTransit.nyeHubCta)} · <a href="https://wa.me/393519127047" class="underline decoration-current/55 underline-offset-4">${escapeHtml(cp.conciergeAndTransit.whatsappCta)}</a> | <a href="mailto:concierge@nightlifemilan.com" class="underline decoration-current/55 underline-offset-4">concierge@nightlifemilan.com</a>.</p>`;

  const out: RenderedGuide = {
    title: sanitizeText(lx.pia_title),
    excerpt: sanitizeText(lx.pia_exc),
    sections: [
      { heading: sanitizeText(`1. Varese, Pavia & Cremona · ${lx.nye}`), content: s1 },
      { heading: sanitizeText(cp.h2[2]), content: s2 },
      { heading: sanitizeText(cp.h2[1]), content: s3 },
      { heading: sanitizeText(cp.h2[3]), content: s4 },
      { heading: sanitizeText(cp.h2[4]), content: s5 },
      { heading: sanitizeText(cp.h2[5]), content: s6 },
    ],
    faqs: cp.faqs.slice(0, 6).map(([q, a]) => ({ question: sanitizeText(q), answer: sanitizeText(a) })),
  };
  BATCH_20261123_CACHE.set(ck, out);
  return out;
}

// ─── 3. g-122: CAPODANNO PIAZZA CAVOUR COMO & FUOCHI SUL LAGO 2027 ──────────────
function renderPiazzaCavourComoGuide(locale: LocaleCode): RenderedGuide {
  const ck = `g-122:${locale}`;
  const hit = BATCH_20261123_CACHE.get(ck);
  if (hit) return hit;

  const lx = GSC_BATCH_20261123_LEX[locale] || GSC_BATCH_20261123_LEX.en;
  const tp = TERME_PILLAR_35[locale] || TERME_PILLAR_35.en;
  const cp = CLUBBING_PILLAR_35[locale] || CLUBBING_PILLAR_35.en;
  const l = tp.labels;

  const cavourUrl = capodannoEventPath('capodanno-piazza-cavour-como-fuochi-lago', locale);
  const barchettaUrl = capodannoEventPath('capodanno-hotel-barchetta-excelsior-como', locale);
  const terminusUrl = capodannoEventPath('capodanno-albergo-terminus-como', locale);
  const palaceComoUrl = capodannoEventPath('capodanno-palace-hotel-como', locale);
  const crocieraUrl = capodannoEventPath('capodanno-crociera-lago-di-como-garda-maggiore', locale);
  const sirmioneUrl = capodannoEventPath('capodanno-terme-di-sirmione-aquaria-lago-di-garda', locale);
  const qcMiUrl = capodannoEventPath('capodanno-qc-terme-milano-porta-romana', locale);
  const qcSpUrl = capodannoEventPath('capodanno-qc-terme-san-pellegrino', locale);
  const qcBoUrl = capodannoEventPath('capodanno-qc-terme-bormio-bagni-nuovi-vecchi', locale);
  const justMeGardaUrl = capodannoEventPath('capodanno-justme-garda-lake', locale);
  const voyaUrl = capodannoEventPath('capodanno-voya-rooftop-milano', locale);
  const justMeMiUrl = capodannoEventPath('capodanno-justme-milano-torre-branca', locale);
  const pinetaUrl = capodannoEventPath('capodanno-pineta-milano', locale);
  const termeGuideUrl = guideUrl('g-117', locale);
  const bormioGuideUrl = guideUrl('g-120', locale);
  const clubGuideUrl = guideUrl('g-118', locale);

  const comoMatrix = makeTable(
    [l.thSpa, l.thProvince, l.thStatus, l.thOfficialRate, l.thIncluded, l.thLink],
    [
      ['Piazza Cavour & Lungo Lario Fireworks', 'Como (CO) · Primo Bacino (21:00 - 02:30)', l.statusConfirmed, '0 EUR', 'Free Waterfront Midnight Fireworks', linkTag(cavourUrl, l.bookAction)],
      ['Hotel Barchetta Excelsior Como', 'Como (CO) · Piazza Cavour 1 (20:00 - 00:30)', l.statusConfirmed, '175 EUR', l.rowBarchettaIncl, linkTag(barchettaUrl, l.bookAction)],
      ['Albergo Terminus · Bar delle Terme', 'Como (CO) · Lungo Lario Trieste 14 (20:00 - 01:30)', l.statusConfirmed, '240 EUR', l.rowTerminusIncl, linkTag(terminusUrl, l.bookAction)],
      ['Palace Hotel Como', 'Como (CO) · Lungo Lario Trieste 16', l.statusSoldOut, l.soldOutLabel, l.rowPalaceIncl, linkTag(palaceComoUrl, l.soldOutLabel)],
      ['Navigazione Laghi (Winter Line)', 'Como / Garda / Maggiore Public Ferry', l.statusConfirmed, '0 EUR Info', 'Public Winter Timetable · Lakefront Galas Open', linkTag(crocieraUrl, l.bookAction)],
      ['Terme di Sirmione · Aquaria Thermal', 'Sirmione (BS) · Lago di Garda (until 03:00)', l.statusConfirmed, '198 EUR', l.rowSirmioneIncl, linkTag(sirmioneUrl, l.bookAction)],
      ['QC Terme (Milano / S. Pellegrino / Bormio)', 'MI · BG · SO Official Waitlist', l.statusTba, l.tbaLabel, l.rowQcMiIncl, linkTag(qcMiUrl, l.waitlistAction)],
      ['Voya Rooftop Milano (20° Piano)', 'Milano (MI) · Viale Achille Papa 30 (A9 Exit)', l.statusPartner, '300 EUR', l.rowVoyaIncl, linkTag(voyaUrl, l.bookAction)],
    ],
    true,
  );

  const schedTable = makeTable(
    [l.thTime, l.thActivity, l.thNotes],
    tp.sirmione.scheduleRows,
  );

  const s1 = `<h3>Piazza Cavour Como & Lungo Lario Trieste · ${escapeHtml(lx.nye)}</h3>
<p>${escapeHtml(lx.com_lead)}</p>
<p>${escapeHtml(tp.como.overview)} ${escapeHtml(tp.como.barchetta)} ${escapeHtml(tp.como.terminus)}</p>
<h3>${escapeHtml(tp.h3[9])}</h3>
${comoMatrix}
<h3>${escapeHtml(tp.h3[10])}</h3>
<p>${escapeHtml(tp.como.palaceNote)}</p>
<ul class="list-disc pl-6 space-y-2 my-4">
${tp.como.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join('\n')}
</ul>
<p>${linkTag(cavourUrl, 'Piazza Cavour Como 2027')} · ${linkTag(barchettaUrl, tp.como.barchettaCta)} · ${linkTag(terminusUrl, tp.como.terminusCta)}.</p>`;

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
<p>${linkTag(sirmioneUrl, tp.sirmione.ctaLabel)} · ${linkTag(termeGuideUrl, 'Terme & Sirmione 198 EUR')} · ${linkTag(bormioGuideUrl, 'Bormio 2027')}.</p>`;

  const s3 = `<h3>${escapeHtml(tp.h3[3])}</h3>
<p>${escapeHtml(tp.qcTerme.waitlistPolicy)} ${escapeHtml(tp.qcTerme.milano)} ${escapeHtml(tp.qcTerme.sanPellegrino)}</p>
<h3>${escapeHtml(tp.h3[4])}</h3>
<p>${escapeHtml(tp.qcTerme.bormio)}</p>
<ol class="list-decimal pl-6 space-y-2 my-4">
${tp.qcTerme.waitlistProtocol.map((st) => `<li>${escapeHtml(st)}</li>`).join('\n')}
</ol>
<h3>${escapeHtml(tp.h3[6])}</h3>
<p>${escapeHtml(tp.garda.pairingLogic)} ${escapeHtml(tp.garda.justMeDetail)}</p>
<p>${linkTag(qcMiUrl, tp.qcTerme.milanoCta)} · ${linkTag(qcSpUrl, tp.qcTerme.sanPellegrinoCta)} · ${linkTag(qcBoUrl, tp.qcTerme.bormioCta)} · ${linkTag(justMeGardaUrl, tp.garda.ctaLabel)}.</p>`;

  const s4 = `<h3>${escapeHtml(tp.h3[12])}</h3>
<p>${escapeHtml(tp.milanAlts.overview)} ${escapeHtml(tp.milanAlts.voya)}</p>
<h3>${escapeHtml(tp.h3[13])}</h3>
<p>${escapeHtml(tp.milanAlts.justMePineta)} ${escapeHtml(cp.gattopardoCitylife.gattopardoDetail)}</p>
<h3>${escapeHtml(tp.h3[14])}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${tp.milanAlts.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join('\n')}
</ul>
<p>${linkTag(voyaUrl, tp.milanAlts.voyaCta)} · ${linkTag(justMeMiUrl, tp.milanAlts.justMeCta)} · ${linkTag(pinetaUrl, tp.milanAlts.pinetaCta)} · ${linkTag(clubGuideUrl, tp.milanAlts.clubGuideCta)}.</p>`;

  const s5 = `<h3>${escapeHtml(cp.h3[12])}</h3>
<p>${escapeHtml(cp.doorPolicyAndClosed.dressCodeDetail)}</p>
<h3>${escapeHtml(cp.h3[13])}</h3>
<p>${escapeHtml(cp.doorPolicyAndClosed.allMaleBottleDetail)}</p>
<h3>${escapeHtml(cp.h3[14])}</h3>
<p>${escapeHtml(cp.doorPolicyAndClosed.closedAlertDetail)}</p>
${buildClosedVenuesHtml(locale)}`;

  const s6 = `<h3>${escapeHtml(tp.h3[15])}</h3>
<p>${escapeHtml(tp.logistics.bookingProtocol)}</p>
<ol class="list-decimal pl-6 space-y-2 my-4">
${tp.logistics.bookingSteps.map((st) => `<li>${escapeHtml(st)}</li>`).join('\n')}
</ol>
<h3>${escapeHtml(tp.h3[16])}</h3>
<p>${escapeHtml(tp.logistics.transitComoValtellina)} ${escapeHtml(tp.logistics.transitSirmione)}</p>
<ul class="list-disc pl-6 space-y-2 my-4">
${tp.sirmione.packingList.map((pk) => `<li>${escapeHtml(pk)}</li>`).join('\n')}
</ul>
<h3>${escapeHtml(tp.h3[17])}</h3>
<p>${escapeHtml(tp.logistics.hubLinkNote)} ${escapeHtml(cp.overview.tableLead)}</p>
${buildPartner18MatrixHtml(locale)}
<p>${linkTag(capodannoPath(locale), tp.logistics.categoryCta)} · <a href="https://wa.me/393519127047" class="underline decoration-current/55 underline-offset-4">${escapeHtml(tp.logistics.whatsappCta)}</a> | <a href="mailto:concierge@nightlifemilan.com" class="underline decoration-current/55 underline-offset-4">concierge@nightlifemilan.com</a>.</p>`;

  const out: RenderedGuide = {
    title: sanitizeText(lx.com_title),
    excerpt: sanitizeText(lx.com_exc),
    sections: [
      { heading: sanitizeText(tp.h2[3]), content: s1 },
      { heading: sanitizeText(tp.h2[0]), content: s2 },
      { heading: sanitizeText(tp.h2[1]), content: s3 },
      { heading: sanitizeText(tp.h2[4]), content: s4 },
      { heading: sanitizeText(cp.h2[4]), content: s5 },
      { heading: sanitizeText(tp.h2[5]), content: s6 },
    ],
    faqs: tp.faqs.slice(0, 6).map(([q, a]) => ({ question: sanitizeText(q), answer: sanitizeText(a) })),
  };
  BATCH_20261123_CACHE.set(ck, out);
  return out;
}

// ─── 4. g-123: CAPODANNO VARESE SHED CLUB & PALACE GRAND HOTEL 2027 ─────────────
function renderVareseShedPalaceGuide(locale: LocaleCode): RenderedGuide {
  const ck = `g-123:${locale}`;
  const hit = BATCH_20261123_CACHE.get(ck);
  if (hit) return hit;

  const lx = GSC_BATCH_20261123_LEX[locale] || GSC_BATCH_20261123_LEX.en;
  const lx22 = GSC_BATCH_20261122_LEX[locale] || GSC_BATCH_20261122_LEX.en;
  const cp = CLUBBING_PILLAR_35[locale] || CLUBBING_PILLAR_35.en;
  const tp = TERME_PILLAR_35[locale] || TERME_PILLAR_35.en;
  const tl = cp.tableLabels;

  const vareseStatusUrl = capodannoEventPath('capodanno-varese-shed-club-palace-grand-hotel', locale);
  const palaceVareseUrl = capodannoEventPath('capodanno-palace-grand-hotel-varese', locale);
  const piazzaVareseUrl = capodannoEventPath('capodanno-piazza-varese-pavia-cremona', locale);
  const barchettaUrl = capodannoEventPath('capodanno-hotel-barchetta-excelsior-como', locale);
  const terminusUrl = capodannoEventPath('capodanno-albergo-terminus-como', locale);
  const voyaNye = capodannoEventPath('capodanno-voya-rooftop-milano', locale);
  const gattoNye = capodannoEventPath('capodanno-il-gattopardo-milano', locale);
  const justMeNye = capodannoEventPath('capodanno-justme-milano-torre-branca', locale);
  const fiftyFiveNye = capodannoEventPath('capodanno-55-milano', locale);
  const pinetaNye = capodannoEventPath('capodanno-pineta-milano', locale);
  const gateNye = capodannoEventPath('capodanno-gate-milano', locale);
  const piazzaGuide = guideUrl('g-121', locale);
  const comoGuide = guideUrl('g-122', locale);
  const gattoGuide = guideUrl('g-30', locale);

  const vareseStatusTable = makeTable(
    [tl.thVenue, tl.thDistrict, tl.thMusic, tl.thNye2027, tl.thStatus],
    [
      ['Palace Grand Hotel Varese', 'Via Luciano Manara 11, Varese (Colle Campigli)', 'Closed for Major Restoration until May 2027', '0 EUR (Sold Out / Closed)', linkTag(palaceVareseUrl, tl.statusClosed)],
      ['Shed Club Busto Arsizio', 'Busto Arsizio (VA) · A8 Castellanza / Busto', 'Dinner Show & Clubbing Program Pending', 'TBA (WhatsApp Waitlist)', linkTag(vareseStatusUrl, tl.statusTba)],
      ['Piazza Varese Countdown', 'Centro Storico Varese (21:00 - 02:30)', 'Free Public Outdoor Midnight Countdown', '0 EUR (Free Entry)', linkTag(piazzaVareseUrl, tl.statusConfirmed)],
      ['Hotel Barchetta Excelsior Como', 'Piazza Cavour 1, Como (30 min A8/A9)', '5-Course DOCG Gala + Lake Fireworks', '175 EUR Confirmed', linkTag(barchettaUrl, tl.statusConfirmed)],
      ['Albergo Terminus Como', 'Lungo Lario Trieste 14, Como', 'Liberty Palace Tasting Gala + Terrace', '240 EUR Confirmed', linkTag(terminusUrl, tl.statusConfirmed)],
      ['Voya Rooftop Milano (20° Piano)', 'Viale Achille Papa 30 (First A8 Exit Portello)', 'Skyline Gala & Open-Bar Clubbing', '300 EUR Partner', linkTag(voyaNye, tl.statusConfirmed)],
      ['Il Gattopardo Milano', 'Via Piero della Francesca 47 (Sempione)', 'Deconsecrated Church VIP Bottle Tables', '600 EUR / pax Partner', linkTag(gattoNye, tl.statusConfirmed)],
      ['Just Me Milano (ex Just Cavalli)', 'Parco Sempione · Torre Branca', 'Great Gatsby Gala & VIP Clubbing', '80 / 300 EUR · VIP 600-5.000 EUR', linkTag(justMeNye, tl.statusConfirmed)],
      ['55 Milano (Sempione Loft)', 'Via Piero della Francesca 55', 'Royal Buffet, Dinner & Revival Club', '30 - 160 EUR · VIP 200-350 EUR', linkTag(fiftyFiveNye, tl.statusConfirmed)],
    ],
    true,
  );

  const tierTable = makeTable(
    [tl.thFormula, tl.thWeeklyRef, tl.thNye2027, tl.thDressCode],
    cp.gattopardoCitylife.tierRows,
  );

  const s1 = `<h3>Varese & Busto Arsizio · Palace Grand Hotel & Shed Club 2027</h3>
<p>${escapeHtml(lx.var_lead)}</p>
<p>${escapeHtml(cp.intro[0])} ${escapeHtml(cp.intro[1])}</p>
<h3>${escapeHtml(cp.h3[0])}</h3>
${vareseStatusTable}
<h3>${escapeHtml(cp.h3[1])}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.overview.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join('\n')}
</ul>
<p>${linkTag(vareseStatusUrl, 'Varese & Shed Club Status')} · ${linkTag(palaceVareseUrl, 'Palace Grand Hotel Notice')} · ${linkTag(piazzaGuide, lx.piazze_disp)}.</p>`;

  const s2 = `<h3>Lake Como Liberty & Waterfront Galas (30 Min from Varese via A9)</h3>
<p>${escapeHtml(tp.como.overview)} ${escapeHtml(tp.como.barchetta)} ${escapeHtml(tp.como.terminus)}</p>
<h3>${escapeHtml(tp.h3[10])}</h3>
<p>${escapeHtml(tp.como.palaceNote)}</p>
<h3>${escapeHtml(tp.h3[11])}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${tp.como.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join('\n')}
</ul>
<p>${linkTag(comoGuide, 'Como Piazza Cavour 2027')} · ${linkTag(barchettaUrl, tp.como.barchettaCta)} · ${linkTag(terminusUrl, tp.como.terminusCta)}.</p>`;

  const s3 = `<h3>Direct A8 Autostrada dei Laghi Arrival: Portello, CityLife & Sempione</h3>
<p>${escapeHtml(cp.gattopardoCitylife.voyaDetail)} ${escapeHtml(cp.gattopardoCitylife.gattopardoDetail)}</p>
<h3>${escapeHtml(cp.h3[7])}</h3>
<p>${escapeHtml(cp.sempioneBreraComo.justMeLead)} ${escapeHtml(lx22.winter_rep || cp.gattopardoCitylife.fiftyFiveRepvblicDetail)}</p>
<h3>${escapeHtml(cp.h3[8])}</h3>
${tierTable}
<p>${linkTag(voyaNye, 'Voya Rooftop 300 EUR')} · ${linkTag(gattoGuide, 'Il Gattopardo Milano')} · ${linkTag(justMeNye, 'Just Me NYE 2027')} · ${linkTag(fiftyFiveNye, '55 Milano')} · ${linkTag(pinetaNye, 'Pineta Milano')}.</p>`;

  const s4 = `<h3>${escapeHtml(cp.h3[4])}</h3>
<p>${escapeHtml(cp.sempioneBreraComo.corsoComoLead)} ${escapeHtml(cp.reggaetonNavigliSanSiro.gateAriaDetail)} ${escapeHtml(lx22.winter_aria || '')}</p>
<h3>${escapeHtml(cp.h3[10])}</h3>
<p>${escapeHtml(cp.reggaetonNavigliSanSiro.navigliEastDetail)} ${escapeHtml(cp.reggaetonNavigliSanSiro.gardaTomDetail)}</p>
<h3>${escapeHtml(cp.h3[5])}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.sempioneBreraComo.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('\n')}
</ul>
<p>${linkTag(gateNye, 'Gate Milano PERREO XL')} · ${linkTag(guideUrl('g-119', locale), lx22.reg_short)}.</p>`;

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
    title: sanitizeText(lx.var_title),
    excerpt: sanitizeText(lx.var_exc),
    sections: [
      { heading: sanitizeText(`1. Varese & Busto Arsizio · Shed Club & Palace 2027`), content: s1 },
      { heading: sanitizeText(tp.h2[3]), content: s2 },
      { heading: sanitizeText(cp.h2[2]), content: s3 },
      { heading: sanitizeText(cp.h2[1]), content: s4 },
      { heading: sanitizeText(cp.h2[4]), content: s5 },
      { heading: sanitizeText(cp.h2[5]), content: s6 },
    ],
    faqs: cp.faqs.slice(0, 6).map(([q, a]) => ({ question: sanitizeText(q), answer: sanitizeText(a) })),
  };
  BATCH_20261123_CACHE.set(ck, out);
  return out;
}

// ─── 5. g-124: CAPODANNO MANTOVA MASCARA ALL MUSIC, SALA VANITA & MILANO 2027 ──
function renderMantovaMascaraVanitaGuide(locale: LocaleCode): RenderedGuide {
  const ck = `g-124:${locale}`;
  const hit = BATCH_20261123_CACHE.get(ck);
  if (hit) return hit;

  const lx = GSC_BATCH_20261123_LEX[locale] || GSC_BATCH_20261123_LEX.en;
  const lx22 = GSC_BATCH_20261122_LEX[locale] || GSC_BATCH_20261122_LEX.en;
  const cp = CLUBBING_PILLAR_35[locale] || CLUBBING_PILLAR_35.en;
  const tp = TERME_PILLAR_35[locale] || TERME_PILLAR_35.en;
  const tl = cp.tableLabels;

  const mascaraUrl = capodannoEventPath('capodanno-mantova-mascara-all-music-vanita', locale);
  const sordelloUrl = capodannoEventPath('capodanno-piazza-sordello-mantova-fuochi-laghi', locale);
  const sirmioneUrl = capodannoEventPath('capodanno-terme-di-sirmione-aquaria-lago-di-garda', locale);
  const justMeGardaUrl = capodannoEventPath('capodanno-justme-garda-lake', locale);
  const cocoGardaUrl = capodannoEventPath('capodanno-lago-di-garda-sesto-senso-coco-beach', locale);
  const fenaroliUrl = capodannoEventPath('capodanno-in-villa-borromeo-fenaroli-reale', locale);
  const bresciaClosedUrl = capodannoEventPath('capodanno-brescia-art-club-desenzano-circus-beatclub', locale);
  const gateNye = capodannoEventPath('capodanno-gate-milano', locale);
  const pinetaNye = capodannoEventPath('capodanno-pineta-milano', locale);
  const justMeNye = capodannoEventPath('capodanno-justme-milano-torre-branca', locale);
  const pelledocaNye = capodannoEventPath('capodanno-pelledoca-milano', locale);
  const regGuide = guideUrl('g-119', locale);
  const termeGuide = guideUrl('g-117', locale);
  const clubGuide = guideUrl('g-118', locale);

  const mascaraTable = makeTable(
    [tl.thFormula, tl.thDistrict, tl.thNye2027, tl.thDressCode],
    [
      ['Mascara · Gran Cenone + Live Show Sara Alice', 'Viale della Favorita 17, Mantova (Reserved Table)', '95 EUR (1 Drink + Coat Check)', tl.dressEveningElegance],
      ['Mascara · Pizza Menu + Live Show Sara Alice', 'Reserved Table in Chosen Room (20:00 - 05:00)', '75 EUR (1 Drink + Coat Check)', tl.dressSmartChic],
      ['Mascara · Gran Buffet + Reserved Table', 'Buffet + Bubbly + Panettone + 1 Drink + Coat Check', '50 EUR Confirmed', tl.dressSmartChic],
      ['Mascara · Walk-In Entry (Before 23:00)', 'Buffet + Midnight Sparkling Toast', '35 EUR Walk-In', tl.dressSmartChic],
      ['Mascara · Walk-In Entry (After 23:00 / After 00:00)', 'Panettone + Bubbly (25 EUR) / 1 Drink (20 EUR)', '25 EUR / 20 EUR', tl.dressSmartChic],
      ['4 Open Music Rooms · Sala Vanità (Besame)', 'Sala Live (I Rodigini) · Sala Diva (70-2000) · Sala Lemon (Latin)', '20:00 - 05:00 Multi-Room', tl.dressSmartChic],
      ['Piazza Sordello Mantova & Lakeside Fireworks', 'Centro Storico Mantova (21:00 - 02:30)', '0 EUR (Free Public Square)', tl.dressSmartChic],
    ],
  );

  const gardaMilanBridgeTable = makeTable(
    [tl.thVenue, tl.thDistrict, tl.thMusic, tl.thNye2027, tl.thStatus],
    [
      ['Mascara All Music (4 Rooms + Sala Vanità)', 'Mantova (MN) · Viale della Favorita 17', 'Live, Revival, Besame Urban & Latin', '20-35 / 50 / 75 / 95 EUR', linkTag(mascaraUrl, tl.statusConfirmed)],
      ['Terme di Sirmione · Aquaria Thermal', 'Sirmione (BS) · 40 min from Mantova', 'Thermal Pools until 03:00 + DJ Set', '198 EUR Confirmed', linkTag(sirmioneUrl, tl.statusConfirmed)],
      ['JustMe Garda Lake (Official Partner)', 'Lonato del Garda (BS) · Via Lavagnone 13', 'Resort Gala Dinner & Clubbing', tl.gardaRates, linkTag(justMeGardaUrl, tl.statusConfirmed)],
      ['Coco Beach Club Lago di Garda', 'Lonato del Garda (BS)', 'Dinner Show & Mainroom Party', '15 - 25 EUR · Dinner 120-150 EUR', linkTag(cocoGardaUrl, tl.statusConfirmed)],
      ['Villa Fenaroli Palace Hotel', 'Rezzato (BS) · Franciacorta Corridor', 'Period Villa Gala Dinner + DJ Set', '100 EUR (50 EUR Kids 3-10y)', linkTag(fenaroliUrl, tl.statusConfirmed)],
      ['Circus Beatclub Brescia', 'Brescia (BS) · Official Status', 'Closed on December 31, 2026', '0 EUR (Closed)', linkTag(bresciaClosedUrl, tl.statusClosed)],
      ['Gate Milano · PERREO XL', 'Isola / Scalo Farini, Milano', 'Reggaeton, Dembow & Urban Arena', tl.gateRates, linkTag(gateNye, tl.statusConfirmed)],
      ['Pineta Milano & Pelledoca Milano', 'Garibaldi & Forlanini, Milano', 'Singing Dinner Show & Multi-Genre', '40 - 160 EUR · VIP 300-1.500 EUR', linkTag(pinetaNye, tl.statusConfirmed)],
    ],
    true,
  );

  const s1 = `<h3>Mascara All Music Mantova · 4 Rooms & Sala Vanità (${escapeHtml(lx.nye)})</h3>
<p>${escapeHtml(lx.man_lead)}</p>
<p>${escapeHtml(cp.intro[0])} ${escapeHtml(cp.intro[1])}</p>
<h3>${escapeHtml(cp.h3[0])}</h3>
${mascaraTable}
<h3>${escapeHtml(cp.h3[1])}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.reggaetonNavigliSanSiro.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('\n')}
</ul>
<p>${linkTag(mascaraUrl, 'Mascara All Music Mantova 2027')} · ${linkTag(sordelloUrl, 'Piazza Sordello Mantova 0 EUR')} · ${linkTag(regGuide, lx22.reg_short)}.</p>`;

  const s2 = `<h3>Mantova, Lake Garda & Brescia Corridor (35-45 Min via A22 / A4)</h3>
<p>${escapeHtml(tp.sirmione.overview)} ${escapeHtml(tp.garda.pairingLogic)} ${escapeHtml(tp.garda.justMeDetail)}</p>
<h3>${escapeHtml(tp.h3[7])}</h3>
${gardaMilanBridgeTable}
<h3>${escapeHtml(tp.h3[8])}</h3>
<p>${escapeHtml(tp.garda.transferNote)}</p>
<p>${linkTag(sirmioneUrl, tp.sirmione.ctaLabel)} · ${linkTag(justMeGardaUrl, tp.garda.ctaLabel)} · ${linkTag(termeGuide, 'Terme & Lago di Garda 2027')}.</p>`;

  const s3 = `<h3>${escapeHtml(cp.h3[3])}</h3>
<p>${escapeHtml(cp.sempioneBreraComo.justMeLead)} ${escapeHtml(cp.sempioneBreraComo.pinetaClubLead)}</p>
<h3>${escapeHtml(cp.h3[4])}</h3>
<p>${escapeHtml(cp.sempioneBreraComo.corsoComoLead)} ${escapeHtml(lx22.winter_rep || cp.gattopardoCitylife.fiftyFiveRepvblicDetail)}</p>
<h3>${escapeHtml(cp.h3[5])}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.sempioneBreraComo.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('\n')}
</ul>
<p>${linkTag(justMeNye, 'Just Me Milano')} · ${linkTag(pinetaNye, 'Pineta Milano')} · ${linkTag(pelledocaNye, 'Pelledoca Milano')} · ${linkTag(gateNye, 'Gate Milano')}.</p>`;

  const s4 = `<h3>${escapeHtml(cp.h3[6])}</h3>
<p>${escapeHtml(cp.gattopardoCitylife.gattopardoDetail)} ${escapeHtml(cp.gattopardoCitylife.voyaDetail)}</p>
<h3>${escapeHtml(cp.h3[9])}</h3>
<p>${escapeHtml(cp.reggaetonNavigliSanSiro.navigliEastDetail)} ${escapeHtml(lx22.winter_aria || cp.reggaetonNavigliSanSiro.gateAriaDetail)}</p>
<h3>${escapeHtml(cp.h3[11])}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.overview.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join('\n')}
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
<p>${linkTag(clubGuide, lx22.cal_short)} · ${linkTag(capodannoPath(locale), cp.conciergeAndTransit.nyeHubCta)} · <a href="https://wa.me/393519127047" class="underline decoration-current/55 underline-offset-4">${escapeHtml(cp.conciergeAndTransit.whatsappCta)}</a> | <a href="mailto:concierge@nightlifemilan.com" class="underline decoration-current/55 underline-offset-4">concierge@nightlifemilan.com</a>.</p>`;

  const out: RenderedGuide = {
    title: sanitizeText(lx.man_title),
    excerpt: sanitizeText(lx.man_exc),
    sections: [
      { heading: sanitizeText(`1. Mascara All Music Mantova · 4 Rooms & Sala Vanità`), content: s1 },
      { heading: sanitizeText(tp.h2[2]), content: s2 },
      { heading: sanitizeText(cp.h2[1]), content: s3 },
      { heading: sanitizeText(cp.h2[2]), content: s4 },
      { heading: sanitizeText(cp.h2[4]), content: s5 },
      { heading: sanitizeText(cp.h2[5]), content: s6 },
    ],
    faqs: cp.faqs.slice(0, 6).map(([q, a]) => ({ question: sanitizeText(q), answer: sanitizeText(a) })),
  };
  BATCH_20261123_CACHE.set(ck, out);
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
    dateModified: '2026-11-23',
    image: heroImage,
  };
}

export function applyGscGuidesBatch20261123(guidesList: Guide[]): void {
  // 1. Potenzia in-place g-30 (Il Gattopardo Milano) preservando tutti i suoi 35 slug canonici
  const idx30 = guidesList.findIndex((g) => g.id === 'g-30');
  if (idx30 !== -1) {
    const existing = guidesList[idx30];
    const fallbackMap = GUIDE_100_SLUGS_MAP['g-30'];
    const mergedSlugs = { ...(fallbackMap || {}), ...(existing.slugs || {}) } as Record<LocaleCode, string>;
    guidesList[idx30] = buildLazyGuide(
      'g-30',
      mergedSlugs,
      renderGattopardoGuide,
      [MusicGenre.HOUSE, MusicGenre.COMMERCIAL],
      '/images/guides-editorial/gattopardo-nave.webp',
      existing.datePublished || '2026-10-01',
    );
  }

  // 2. Aggiungi le 4 nuove guide Pillar g-121, g-122, g-123, g-124 se non gia presenti
  const newGuides: Array<{
    id: string;
    renderer: (loc: LocaleCode) => RenderedGuide;
    genres: MusicGenre[];
    hero: string;
  }> = [
    {
      id: 'g-121',
      renderer: renderPiazzaVaresePaviaCremonaGuide,
      genres: [MusicGenre.COMMERCIAL, MusicGenre.HOUSE],
      hero: '/images/guides-editorial/bischeri-gala.webp',
    },
    {
      id: 'g-122',
      renderer: renderPiazzaCavourComoGuide,
      genres: [MusicGenre.COMMERCIAL, MusicGenre.HOUSE],
      hero: '/images/guides-editorial/palace-como-fireworks.webp',
    },
    {
      id: 'g-123',
      renderer: renderVareseShedPalaceGuide,
      genres: [MusicGenre.HOUSE, MusicGenre.COMMERCIAL],
      hero: '/images/guides-editorial/terme-villa-gala.webp',
    },
    {
      id: 'g-124',
      renderer: renderMantovaMascaraVanitaGuide,
      genres: [MusicGenre.COMMERCIAL, MusicGenre.REGGAETON, MusicGenre.HOUSE],
      hero: '/images/guides-editorial/aria-dancefloor.webp',
    },
  ];

  for (const ng of newGuides) {
    if (!guidesList.some((g) => g.id === ng.id)) {
      guidesList.push(
        buildLazyGuide(
          ng.id,
          GUIDE_100_SLUGS_MAP[ng.id] as Record<LocaleCode, string>,
          ng.renderer,
          ng.genres,
          ng.hero,
          '2026-11-23',
        ),
      );
    }
  }
}
