// Nightly GSC Batch (2026-11-26): 5 New Pillar Guides across all 35 locales.
// g-127: Cenone Capodanno 2027 Vicino a Me (Milano, Quartieri, Hinterland & 12 Province Lombardia)
// g-128: Capodanno in Baita 2027 (Motoslitta, Gatto delle Nevi, Livigno, Bormio, Madesimo, Tonale & Terme)
// g-129: Radio Rooftop Milano 2026/2027 (10° Piano ME Milan Il Duca · Via Marco Polo 18 · NYE 200 EUR)
// g-130: Capodanno a Brescia 2027 (Piazza della Loggia 0 EUR, Villa Fenaroli 100 EUR, JustMe Garda Lake & Sirmione)
// g-131: Capodanno 2027 a Teatro Milano (Manzoni, Carcano, Teatro alla Scala, Zelig, Blue Note & Dopoteatro VIP)
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
import { GSC_BATCH_20261126_LEX } from './i18n/pillarGuides20261126';
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

const BATCH_20261126_CACHE = new Map<string, RenderedGuide>();

export function getGsc20261126DisplayHeadline(guideId: string, locale: LocaleCode): string | null {
  const lx = GSC_BATCH_20261126_LEX[locale] || GSC_BATCH_20261126_LEX.en;
  if (guideId === 'g-127') return sanitizeText(lx.cen_disp, locale);
  if (guideId === 'g-128') return sanitizeText(lx.bai_disp, locale);
  if (guideId === 'g-129') return sanitizeText(lx.rad_disp, locale);
  if (guideId === 'g-130') return sanitizeText(lx.bre_disp, locale);
  if (guideId === 'g-131') return sanitizeText(lx.tea_disp, locale);
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

// ─── 1. g-127: CENONE CAPODANNO 2027 VICINO A ME (MILANO & LOMBARDIA) ──────────
function renderCenoneVicinoAMeGuide(locale: LocaleCode): RenderedGuide {
  const ck = `g-127:${locale}`;
  const hit = BATCH_20261126_CACHE.get(ck);
  if (hit) return hit;

  const lx = GSC_BATCH_20261126_LEX[locale] || GSC_BATCH_20261126_LEX.en;
  const lx22 = GSC_BATCH_20261122_LEX[locale] || GSC_BATCH_20261122_LEX.en;
  const cp = CLUBBING_PILLAR_35[locale] || CLUBBING_PILLAR_35.en;
  const tl = cp.tableLabels;

  const cenoneCat = capodannoCategoryPath('capodanno-locali-cenone-milano', locale);
  const lombardiaCat = capodannoCategoryPath('capodanno-lombardia', locale);
  const jmNye = capodannoEventPath('capodanno-justme-milano-torre-branca', locale);
  const voyaNye = capodannoEventPath('capodanno-voya-rooftop-milano', locale);
  const pinNye = capodannoEventPath('capodanno-pineta-milano', locale);
  const fifNye = capodannoEventPath('capodanno-55-milano', locale);
  const carlGuide = guideUrl('g-125', locale);
  const dinGuide = guideUrl('g-60', locale);
  const phGuide = guideUrl('g-126', locale);
  const duomoNye = capodannoEventPath('capodanno-terrazza-duomo-21', locale);
  const bobNye = capodannoEventPath('capodanno-bobino-milano', locale);
  const gardaNye = capodannoEventPath('capodanno-justme-garda-lake', locale);
  const fenNye = capodannoEventPath('capodanno-in-villa-borromeo-fenaroli-reale', locale);
  const barchNye = capodannoEventPath('capodanno-hotel-barchetta-excelsior-como', locale);
  const daziNye = capodannoEventPath('capodanno-dazi-milano-arco-della-pace', locale);
  const marcNye = capodannoEventPath('capodanno-il-marchese-milano', locale);

  const proximityDinnerTable = makeTable(
    [tl.thVenue, tl.thDistrict, tl.thNye2027, tl.thDressCode, tl.thStatus],
    [
      ['Carlsberg Øl Milano (Cena Cantata)', 'Porta Nuova · Bastioni di Porta Nuova 9 (M2)', '75 EUR All-Inclusive + DJ', tl.dressSmartChic, linkTag(carlGuide, tl.statusConfirmed, locale)],
      ['Villa Fenaroli Palace Hotel', 'Rezzato · Brescia (A4 Est · 19:30 - 04:00)', '100 EUR Adult · 50 EUR 3-10y', tl.dressEveningElegance, linkTag(fenNye, tl.statusConfirmed, locale)],
      ['Bobino Milano (Bobino Legends)', 'Navigli · P.le Stazione Genova 4 (M2)', '120 EUR Gala · 30-50 EUR Party', tl.dressSmartChic, linkTag(bobNye, tl.statusConfirmed, locale)],
      ['JustMe Garda Lake (Official Partner)', 'Lonato / Desenzano (BS · Lago di Garda)', '130 EUR Gala · 70 Buffet · 20 Entry', tl.dressEveningElegance, linkTag(gardaNye, tl.statusConfirmed, locale)],
      ['Il Marchese Milano (Amaro Bar & DJ)', 'Scala / Brera · Via dei Bossi 3 (M1/M3)', '150 EUR Gala · 60 EUR 00:30', tl.dressEveningElegance, linkTag(marcNye, tl.statusConfirmed, locale)],
      ['Pineta Milano (Moulin Rouge Show)', 'Garibaldi · Via Messina 38 (M5 Cenisio)', '160 EUR Gala · 40 EUR Buffet', tl.dressSmartChic, linkTag(pinNye, tl.statusConfirmed, locale)],
      ['55 Milano & Dazi Arco della Pace', 'Sempione · Via P. della Francesca 55 / P.za Sempione', '160 EUR Gala · 100 EUR Buffet', tl.dressEveningElegance, linkTag(fifNye, tl.statusConfirmed, locale)],
      ['Hotel Barchetta Excelsior Como', 'Como · Piazza Cavour 1 (Lake Fireworks)', '175 EUR 5-Course DOCG Gala', tl.dressEveningElegance, linkTag(barchNye, tl.statusConfirmed, locale)],
      ['Just Me Milano (ex Just Cavalli)', 'Parco Sempione · Torre Branca (0% Fee)', '300 EUR Gatsby Gala · 80 Party', tl.dressBlackTie, linkTag(jmNye, tl.statusConfirmed, locale)],
      ['Voya Rooftop 20F & Terrazza Duomo 21', 'CityLife (M5 Portello) & Piazza Duomo 21', '300 EUR (Voya 360 Online · MA.RE 380)', tl.dressBlackTie, linkTag(voyaNye, tl.statusConfirmed, locale)],
    ],
    locale,
    true,
  );

  const quadrantTransitTable = makeTable(
    [tl.thDistrict, tl.thVenue, tl.thWeeklyRef, tl.thNye2027],
    [
      ['M5 Lilla · Sempione / Portello / Cenisio', 'Just Me · Voya 20F · Pineta · 55 Milano · Il Gattopardo · Dazi', '2-5 min walk from M5 stops', '40 - 300 EUR + VIP Booths'],
      ['M2 / M3 · Porta Nuova / Brera / Scala', "Carlsberg Øl · Radio Rooftop · Philipp's · Il Marchese · The Club", 'M2 Moscova / Garibaldi & M3 Turati', '75 - 200 EUR + On Request'],
      ['M1 / M2 / M3 · Duomo / Navigli / Sud-Est', 'Terrazza Duomo 21 · Bobino · Bischeri · Pelledoca', 'Piazza Duomo / Porta Genova / Forlanini', '120 - 380 EUR All-Night'],
      ['A4 / A8 / A9 / SS36 · 12 Provinces', 'JustMe Garda · Villa Fenaroli · Barchetta Como · Mascara Mantova', 'Free Private Parking Outside ZTL', '50 - 240 EUR Confirmed'],
    ],
    locale,
  );

  const s1 = `<h3>${escapeHtml(lx.cen_h3, locale)}</h3>
<p>${escapeHtml(lx.cen_lead, locale)}</p>
<p>${escapeHtml(lx.cen_deep, locale)}</p>
<h3>${escapeHtml(cp.h3[0], locale)}</h3>
${proximityDinnerTable}
<h3>${escapeHtml(cp.h3[1], locale)}</h3>
<p>${linkTag(cenoneCat, lx.cen_disp, locale)} · ${linkTag(lombardiaCat, lx.lombardy, locale)} · ${linkTag(dinGuide, 'Cena Cantata Milano', locale)} · ${linkTag(carlGuide, 'Carlsberg Øl 75 EUR', locale)} · ${linkTag(duomoNye, 'Terrazza Duomo 21', locale)} · ${linkTag(daziNye, 'Dazi Arco della Pace', locale)} · ${linkTag(phGuide, "Philipp's Milano", locale)}.</p>`;

  const s2 = `<h3>${escapeHtml(cp.h3[16], locale)}</h3>
<p>${escapeHtml(cp.intro[0], locale)} ${escapeHtml(cp.intro[1], locale)}</p>
<h3>${escapeHtml(cp.h3[5], locale)}</h3>
${quadrantTransitTable}
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
<h3>${escapeHtml(cp.h3[2], locale)}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.reggaetonNavigliSanSiro.bullets.map((b) => `<li>${escapeHtml(b, locale)}</li>`).join('\n')}
</ul>
<p>${linkTag(zoneUrl('parco-sempione', locale), 'Parco Sempione', locale)} · ${linkTag(zoneUrl('brera', locale), 'Brera & Porta Nuova', locale)} · ${linkTag(zoneUrl('navigli', locale), 'Navigli', locale)} · ${linkTag(genreUrl('dinner-show', locale), 'Dinner Show', locale)}.</p>`;

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
<h3>${escapeHtml(cp.h3[8], locale)}</h3>
<p>${escapeHtml(cp.conciergeAndTransit.metroParkingDetail, locale)}</p>
<h3>${escapeHtml(cp.h3[17], locale)}</h3>
<p>${escapeHtml(cp.conciergeAndTransit.termeCrossLink, locale)} ${escapeHtml(cp.overview.tableLead, locale)}</p>
${sanitizeText(buildPartner18MatrixHtml(locale), locale)}
<p>${linkTag(cenoneCat, lx.cen_disp, locale)} · ${linkTag(capodannoPath(locale), cp.conciergeAndTransit.nyeHubCta, locale)} · <a href="https://wa.me/393519127047" class="underline decoration-current/55 underline-offset-4">${escapeHtml(cp.conciergeAndTransit.whatsappCta, locale)}</a> | <a href="mailto:concierge@nightlifemilan.com" class="underline decoration-current/55 underline-offset-4">concierge@nightlifemilan.com</a>.</p>`;

  const out: RenderedGuide = {
    title: sanitizeText(lx.cen_title, locale),
    excerpt: sanitizeText(lx.cen_exc, locale),
    sections: [
      { heading: sanitizeText(lx.cen_h2, locale), content: s1 },
      { heading: sanitizeText(cp.h2[1], locale), content: s2 },
      { heading: sanitizeText(cp.h2[2], locale), content: s3 },
      { heading: sanitizeText(cp.h2[3], locale), content: s4 },
      { heading: sanitizeText(cp.h2[4], locale), content: s5 },
      { heading: sanitizeText(cp.h2[5], locale), content: s6 },
    ],
    faqs: composeFaqs(lx.cen_faq_q, lx.cen_faq_a, cp.faqs, locale),
  };
  BATCH_20261126_CACHE.set(ck, out);
  return out;
}

// ─── 2. g-128: CAPODANNO IN BAITA 2027 (MOTOSLITTA, LIVIGNO, BORMIO & TONALE) ───
function renderBaita2027Guide(locale: LocaleCode): RenderedGuide {
  const ck = `g-128:${locale}`;
  const hit = BATCH_20261126_CACHE.get(ck);
  if (hit) return hit;

  const lx = GSC_BATCH_20261126_LEX[locale] || GSC_BATCH_20261126_LEX.en;
  const tp = TERME_PILLAR_35[locale] || TERME_PILLAR_35.en;
  const cp = CLUBBING_PILLAR_35[locale] || CLUBBING_PILLAR_35.en;
  const l = tp.labels;

  const baitaUrl = capodannoEventPath('capodanno-in-baita-motoslitta-livigno-bormio-madesimo-tonale', locale);
  const livignoUrl = capodannoEventPath('capodanno-livigno-valtellina-stalet-kosmo-mottolino', locale);
  const baitaCat = capodannoCategoryPath('capodanno-terme-spa-baita-montagna', locale);
  const sirmioneUrl = capodannoEventPath('capodanno-terme-di-sirmione-aquaria-lago-di-garda', locale);
  const qcBoUrl = capodannoEventPath('capodanno-qc-terme-bormio-bagni-nuovi-vecchi', locale);
  const qcSpUrl = capodannoEventPath('capodanno-qc-terme-san-pellegrino', locale);
  const qcMiUrl = capodannoEventPath('capodanno-qc-terme-milano-porta-romana', locale);
  const gardaUrl = capodannoEventPath('capodanno-justme-garda-lake', locale);
  const barchettaUrl = capodannoEventPath('capodanno-hotel-barchetta-excelsior-como', locale);
  const terminusUrl = capodannoEventPath('capodanno-albergo-terminus-como', locale);
  const termeGuide = guideUrl('g-117', locale);
  const bormioGuide = guideUrl('g-120', locale);
  const comoGuide = guideUrl('g-122', locale);

  const baitaMatrix = makeTable(
    [l.thSpa, l.thProvince, l.thStatus, l.thOfficialRate, l.thIncluded, l.thLink],
    [
      ['Baita Alta Quota + Motoslitta / Snowcat', 'Livigno · Bormio · Madesimo · Tonale (SO/BS)', l.statusConfirmed, '160 - 320 EUR', 'Snowmobile/Snowcat + Valtellina Gala + DJ', linkTag(baitaUrl, l.bookAction, locale)],
      ['Kosmo Taste the Mountain (Mottolino)', 'Livigno (SO) · Via Bondi 473 (20:00 - 04:00)', l.statusConfirmed, '230 EUR', 'Alpine Fine Dining + Midnight Mountain Party', linkTag(livignoUrl, l.bookAction, locale)],
      ['Stalet Après-Ski · Carosello 3000', 'Livigno (SO) · Via Saroch (Table 4 pax)', l.statusConfirmed, '280 EUR (0 EUR 22:30)', 'Reserved Table 4 pax (+70 EUR/extra) · Free 22:30', linkTag(livignoUrl, l.bookAction, locale)],
      ['Top New Year 3000m (Summit Chalet)', 'Livigno (SO) · Carosello 3000 Peak', l.statusConfirmed, '350 EUR', '3,000m Panoramic Alpine Gala & Cableway', linkTag(livignoUrl, l.bookAction, locale)],
      ['Terme di Sirmione · Aquaria Thermal', 'Sirmione (BS) · Lago di Garda (until 03:00)', l.statusConfirmed, '198 EUR', l.rowSirmioneIncl, linkTag(sirmioneUrl, l.bookAction, locale)],
      ['QC Terme Bormio / S. Pellegrino / Milano', 'SO · BG · MI Official Free Waitlist', l.statusTba, l.tbaLabel, l.rowQcBoIncl, linkTag(qcBoUrl, l.waitlistAction, locale)],
      ['Hotel Barchetta & Terminus Como', 'Como (CO) · Piazza Cavour & Lungo Lario', l.statusConfirmed, '175 / 240 EUR', l.rowBarchettaIncl, linkTag(barchettaUrl, l.bookAction, locale)],
      ['JustMe Garda Lake (Official Partner)', 'Lonato / Desenzano (BS) · 20:30 - 05:00', l.statusPartner, '20 / 70 / 130 EUR', 'Club Ticket · Buffet · Gala · VIP 440-2.000', linkTag(gardaUrl, l.bookAction, locale)],
    ],
    locale,
    true,
  );

  const schedTable = makeTable([l.thTime, l.thActivity, l.thNotes], tp.sirmione.scheduleRows, locale);

  const s1 = `<h3>${escapeHtml(lx.bai_h3, locale)}</h3>
<p>${escapeHtml(lx.bai_lead, locale)}</p>
<p>${escapeHtml(lx.bai_deep, locale)}</p>
<h3>${escapeHtml(tp.h3[0], locale)}</h3>
${baitaMatrix}
<h3>${escapeHtml(tp.h3[4], locale)}</h3>
<p>${linkTag(baitaUrl, lx.bai_disp, locale)} · ${linkTag(livignoUrl, 'Livigno Kosmo & Stalet 2027', locale)} · ${linkTag(baitaCat, tp.logistics.categoryCta, locale)} · ${linkTag(bormioGuide, 'Bormio 2027', locale)} · ${linkTag(termeGuide, 'Terme & Sirmione 198 EUR', locale)}.</p>`;

  const s2 = `<h3>${escapeHtml(tp.h3[1], locale)}</h3>
<p>${escapeHtml(tp.intro[0], locale)} ${escapeHtml(tp.intro[1], locale)} ${escapeHtml(tp.sirmione.overview, locale)} ${escapeHtml(tp.sirmione.packageDetail, locale)}</p>
<h3>${escapeHtml(tp.h3[2], locale)}</h3>
${schedTable}
<ul class="list-disc pl-6 space-y-2 my-4">
${tp.sirmione.inclusions.map((inc) => `<li>${escapeHtml(inc, locale)}</li>`).join('\n')}
</ul>
<h3>${escapeHtml(tp.h3[5], locale)}</h3>
<p>${escapeHtml(tp.sirmione.ritualsNote, locale)} ${escapeHtml(tp.sirmione.etiquetteNote, locale)}</p>`;

  const s3 = `<h3>${escapeHtml(tp.h3[3], locale)}</h3>
<p>${escapeHtml(tp.qcTerme.waitlistPolicy, locale)} ${escapeHtml(tp.qcTerme.bormio, locale)} ${escapeHtml(tp.qcTerme.sanPellegrino, locale)} ${escapeHtml(tp.qcTerme.milano, locale)}</p>
<h3>${escapeHtml(tp.h3[6], locale)}</h3>
<ol class="list-decimal pl-6 space-y-2 my-4">
${tp.qcTerme.waitlistProtocol.map((st) => `<li>${escapeHtml(st, locale)}</li>`).join('\n')}
</ol>
<h3>${escapeHtml(tp.h3[9], locale)}</h3>
<p>${escapeHtml(tp.como.overview, locale)} ${escapeHtml(tp.como.barchetta, locale)} ${escapeHtml(tp.como.terminus, locale)} ${escapeHtml(tp.como.palaceNote, locale)}</p>
<p>${linkTag(qcBoUrl, tp.qcTerme.bormioCta, locale)} · ${linkTag(qcSpUrl, tp.qcTerme.sanPellegrinoCta, locale)} · ${linkTag(qcMiUrl, tp.qcTerme.milanoCta, locale)} · ${linkTag(terminusUrl, tp.como.terminusCta, locale)} · ${linkTag(comoGuide, 'Como 2027', locale)}.</p>`;

  const s4 = `<h3>${escapeHtml(tp.h3[7], locale)}</h3>
<p>${escapeHtml(tp.garda.pairingLogic, locale)} ${escapeHtml(tp.garda.justMeDetail, locale)} ${escapeHtml(tp.garda.transferNote, locale)}</p>
<h3>${escapeHtml(tp.h3[12], locale)}</h3>
<p>${escapeHtml(tp.milanAlts.overview, locale)} ${escapeHtml(tp.milanAlts.voya, locale)} ${escapeHtml(tp.milanAlts.justMePineta, locale)}</p>
<h3>${escapeHtml(tp.h3[14], locale)}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${tp.milanAlts.highlights.map((h) => `<li>${escapeHtml(h, locale)}</li>`).join('\n')}
</ul>`;

  const s5 = `<h3>${escapeHtml(cp.h3[12], locale)}</h3>
<p>${escapeHtml(cp.doorPolicyAndClosed.dressCodeDetail, locale)}</p>
<h3>${escapeHtml(cp.h3[13], locale)}</h3>
<p>${escapeHtml(cp.doorPolicyAndClosed.allMaleBottleDetail, locale)}</p>
<h3>${escapeHtml(cp.h3[14], locale)}</h3>
<p>${escapeHtml(cp.doorPolicyAndClosed.closedAlertDetail, locale)}</p>
${sanitizeText(buildClosedVenuesHtml(locale), locale)}`;

  const s6 = `<h3>${escapeHtml(tp.h3[15], locale)}</h3>
<p>${escapeHtml(tp.logistics.bookingProtocol, locale)}</p>
<ol class="list-decimal pl-6 space-y-2 my-4">
${tp.logistics.bookingSteps.map((st) => `<li>${escapeHtml(st, locale)}</li>`).join('\n')}
</ol>
<h3>${escapeHtml(tp.h3[16], locale)}</h3>
<p>${escapeHtml(tp.logistics.transitComoValtellina, locale)} ${escapeHtml(tp.logistics.transitSirmione, locale)}</p>
<ul class="list-disc pl-6 space-y-2 my-4">
${tp.sirmione.packingList.map((pk) => `<li>${escapeHtml(pk, locale)}</li>`).join('\n')}
</ul>
<h3>${escapeHtml(tp.h3[17], locale)}</h3>
<p>${escapeHtml(tp.logistics.hubLinkNote, locale)} ${escapeHtml(cp.overview.tableLead, locale)}</p>
${sanitizeText(buildPartner18MatrixHtml(locale), locale)}
<p>${linkTag(capodannoPath(locale), tp.logistics.categoryCta, locale)} · <a href="https://wa.me/393519127047" class="underline decoration-current/55 underline-offset-4">${escapeHtml(tp.logistics.whatsappCta, locale)}</a> | <a href="mailto:concierge@nightlifemilan.com" class="underline decoration-current/55 underline-offset-4">concierge@nightlifemilan.com</a>.</p>`;

  const out: RenderedGuide = {
    title: sanitizeText(lx.bai_title, locale),
    excerpt: sanitizeText(lx.bai_exc, locale),
    sections: [
      { heading: sanitizeText(lx.bai_h2, locale), content: s1 },
      { heading: sanitizeText(tp.h2[1], locale), content: s2 },
      { heading: sanitizeText(tp.h2[2], locale), content: s3 },
      { heading: sanitizeText(tp.h2[3], locale), content: s4 },
      { heading: sanitizeText(cp.h2[4], locale), content: s5 },
      { heading: sanitizeText(tp.h2[5], locale), content: s6 },
    ],
    faqs: composeFaqs(lx.bai_faq_q, lx.bai_faq_a, tp.faqs, locale),
  };
  BATCH_20261126_CACHE.set(ck, out);
  return out;
}

// ─── 3. g-129: RADIO ROOFTOP MILANO · 10° PIANO ME MILAN IL DUCA ───────────────
function renderRadioRooftopGuide(locale: LocaleCode): RenderedGuide {
  const ck = `g-129:${locale}`;
  const hit = BATCH_20261126_CACHE.get(ck);
  if (hit) return hit;

  const lx = GSC_BATCH_20261126_LEX[locale] || GSC_BATCH_20261126_LEX.en;
  const lx22 = GSC_BATCH_20261122_LEX[locale] || GSC_BATCH_20261122_LEX.en;
  const cp = CLUBBING_PILLAR_35[locale] || CLUBBING_PILLAR_35.en;
  const tl = cp.tableLabels;

  const radClub = clubUrl('radio-rooftop-bar-milano', locale);
  const radNye = capodannoEventPath('capodanno-radio-rooftop-milano', locale);
  const rooftopCat = capodannoCategoryPath('capodanno-rooftop-milano', locale);
  const rooftopGuide = guideUrl('g-rooftops-milan', locale);
  const voyaGuide = guideUrl('g-18', locale);
  const duomoGuide = guideUrl('g-32', locale);
  const repGuide = guideUrl('g-20', locale);
  const voyaNye = capodannoEventPath('capodanno-voya-rooftop-milano', locale);
  const duomoNye = capodannoEventPath('capodanno-terrazza-duomo-21', locale);
  const jmNye = capodannoEventPath('capodanno-justme-milano-torre-branca', locale);
  const repNye = capodannoEventPath('capodanno-repvblic-milano', locale);
  const cerNye = capodannoEventPath('capodanno-ceresio-7-milano', locale);

  const radioScheduleTable = makeTable(
    [tl.thFormula, tl.thDistrict, tl.thNye2027, tl.thDressCode],
    [
      ['Radio Rooftop · Sunset Skyline Aperitivo & Tapas', 'Via Marco Polo 18 · 10F ME Milan Il Duca (M3)', 'Signature Cocktails & Tapas Menu', tl.dressSmartChic],
      ['Radio Rooftop · Panoramic Lounge VIP Table', 'Porta Nuova / Bosco Verticale Heated Terrace', 'Reserved Bottle & Champagne Table', tl.dressEveningElegance],
      ['31/12/2026 · NYE Food & Beverage Formula', '20:00 - 03:00 · 10th Floor Skyline Countdown', '200 EUR / pax (130 Menu + 70 Drinks)', tl.dressBlackTie],
      ['31/12/2026 · NYE Beverage-Only Formula', '20:00 - 03:00 · Champagne, Spirits & DJ Set', '200 EUR / pax Minimum Spend', tl.dressBlackTie],
      ['200 m Afterparty · REPVBLIC Milano Partner', 'Piazza della Repubblica 12 (WhatsApp Only)', 'VIP Tables 300 / 600 EUR · NYE 45+ EUR', tl.dressEveningElegance],
    ],
    locale,
  );

  const rooftopComparisonTable = makeTable(
    [tl.thVenue, tl.thDistrict, tl.thWeeklyRef, tl.thNye2027, tl.thStatus],
    [
      ['Radio Rooftop Milano (10° Piano)', 'Via Marco Polo 18 (ME Milan Il Duca)', 'Skyline Tapas & Deep House Lounge', '200 EUR F&B (130+70) / 200 Drinks', linkTag(radNye, tl.statusConfirmed, locale)],
      ['Voya Rooftop Milano (20° Piano · 85m)', 'Viale Achille Papa 30 (CityLife M5)', 'Panoramic Dining & VIP 300-500+ EUR', '300 EUR 6-Course (360 Online)', linkTag(voyaNye, tl.statusConfirmed, locale)],
      ['Terrazza Duomo 21 & Terrazza MA.RE 5F', 'Piazza del Duomo 21 (Cathedral View)', 'Aperitivo, Dinner & Late DJ Set', '70-300 EUR (1F) · 380 EUR (5F 2-Star)', linkTag(duomoNye, tl.statusConfirmed, locale)],
      ['Just Me Milano · Torre Branca Dome', 'Viale Luigi Camoens 2 (Parco Sempione)', 'Open 7/7 · VIP 320-1.000 EUR', '80 EUR Party · 300 EUR Gatsby Gala', linkTag(jmNye, tl.statusConfirmed, locale)],
      ['REPVBLIC Milano (200 m Walk)', 'Piazza della Repubblica 12 (M3)', 'VIP 300 / 600 EUR (WhatsApp 0% Fee)', '45 EUR · VIP 600 / 1.200 EUR', linkTag(repNye, tl.statusConfirmed, locale)],
      ['Ceresio 7 Milano (Holiday Closure)', 'Via Ceresio 7 (Porta Volta)', 'Closed Dec 31 - Jan 3 (Reopens Jan 4)', '0 EUR (Sold Out / Closed)', linkTag(cerNye, tl.statusClosed, locale)],
    ],
    locale,
    true,
  );

  const s1 = `<h3>Radio Rooftop ${escapeHtml(lx.city, locale)} · ME Milan Il Duca (Via Marco Polo 18)</h3>
<p>${escapeHtml(lx.rad_lead, locale)}</p>
<p>${escapeHtml(lx.rad_deep, locale)}</p>
<h3>${escapeHtml(cp.h3[0], locale)}</h3>
${radioScheduleTable}
<h3>${escapeHtml(lx.rad_h3, locale)}</h3>
${rooftopComparisonTable}
<p>${linkTag(radClub, 'Radio Rooftop Milano', locale)} · ${linkTag(radNye, `Radio Rooftop ${lx.nye}`, locale)} · ${linkTag(rooftopCat, 'Rooftop 2027', locale)} · ${linkTag(rooftopGuide, 'Rooftop Bars Milano', locale)} · ${linkTag(voyaGuide, 'Voya Rooftop 20F', locale)} · ${linkTag(duomoGuide, 'Terrazza Duomo 21', locale)} · ${linkTag(repGuide, 'REPVBLIC Milano', locale)}.</p>`;

  const s2 = `<h3>${escapeHtml(cp.h3[4], locale)}</h3>
<p>${escapeHtml(cp.intro[0], locale)} ${escapeHtml(cp.intro[1], locale)} ${escapeHtml(cp.sempioneBreraComo.corsoComoLead, locale)}</p>
<h3>${escapeHtml(cp.h3[7], locale)}</h3>
<p>${escapeHtml(cp.gattopardoCitylife.voyaDetail, locale)} ${escapeHtml(lx22.winter_rep || cp.gattopardoCitylife.fiftyFiveRepvblicDetail, locale)}</p>
<h3>${escapeHtml(cp.h3[5], locale)}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.sempioneBreraComo.bullets.map((b) => `<li>${escapeHtml(b, locale)}</li>`).join('\n')}
</ul>`;

  const s3 = `<h3>${escapeHtml(cp.h3[3], locale)}</h3>
<p>${escapeHtml(cp.sempioneBreraComo.justMeLead, locale)} ${escapeHtml(cp.sempioneBreraComo.pinetaClubLead, locale)}</p>
<h3>${escapeHtml(cp.h3[6], locale)}</h3>
<p>${escapeHtml(cp.gattopardoCitylife.gattopardoDetail, locale)}</p>
<h3>${escapeHtml(cp.h3[8], locale)}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.overview.highlights.map((h) => `<li>${escapeHtml(h, locale)}</li>`).join('\n')}
</ul>`;

  const s4 = `<h3>${escapeHtml(cp.h3[9], locale)}</h3>
<p>${escapeHtml(cp.reggaetonNavigliSanSiro.gateAriaDetail, locale)} ${escapeHtml(cp.reggaetonNavigliSanSiro.navigliEastDetail, locale)}</p>
<h3>${escapeHtml(cp.h3[11], locale)}</h3>
<p>${escapeHtml(cp.reggaetonNavigliSanSiro.gardaTomDetail, locale)}</p>
<h3>${escapeHtml(cp.h3[2], locale)}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.reggaetonNavigliSanSiro.bullets.map((b) => `<li>${escapeHtml(b, locale)}</li>`).join('\n')}
</ul>
<p>${linkTag(zoneUrl('corso-como', locale), 'Porta Nuova & Corso Como', locale)} · ${linkTag(zoneUrl('duomo-san-babila', locale), 'Duomo & Centro', locale)} · ${linkTag(genreUrl('house', locale), 'Deep & Vocal House', locale)}.</p>`;

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
<p>${linkTag(radClub, 'Radio Rooftop Milano', locale)} · ${linkTag(capodannoPath(locale), cp.conciergeAndTransit.nyeHubCta, locale)} · <a href="https://wa.me/393519127047" class="underline decoration-current/55 underline-offset-4">${escapeHtml(cp.conciergeAndTransit.whatsappCta, locale)}</a> | <a href="mailto:concierge@nightlifemilan.com" class="underline decoration-current/55 underline-offset-4">concierge@nightlifemilan.com</a>.</p>`;

  const out: RenderedGuide = {
    title: sanitizeText(lx.rad_title, locale),
    excerpt: sanitizeText(lx.rad_exc, locale),
    sections: [
      { heading: sanitizeText(lx.rad_h2, locale), content: s1 },
      { heading: sanitizeText(cp.h2[1], locale), content: s2 },
      { heading: sanitizeText(cp.h2[2], locale), content: s3 },
      { heading: sanitizeText(cp.h2[3], locale), content: s4 },
      { heading: sanitizeText(cp.h2[4], locale), content: s5 },
      { heading: sanitizeText(cp.h2[5], locale), content: s6 },
    ],
    faqs: composeFaqs(lx.rad_faq_q, lx.rad_faq_a, cp.faqs, locale),
  };
  BATCH_20261126_CACHE.set(ck, out);
  return out;
}

// ─── 4. g-130: CAPODANNO A BRESCIA, FRANCIACORTA & LAGO DI GARDA 2027 ──────────
function renderBrescia2027Guide(locale: LocaleCode): RenderedGuide {
  const ck = `g-130:${locale}`;
  const hit = BATCH_20261126_CACHE.get(ck);
  if (hit) return hit;

  const lx = GSC_BATCH_20261126_LEX[locale] || GSC_BATCH_20261126_LEX.en;
  const lx22 = GSC_BATCH_20261122_LEX[locale] || GSC_BATCH_20261122_LEX.en;
  const cp = CLUBBING_PILLAR_35[locale] || CLUBBING_PILLAR_35.en;
  const tl = cp.tableLabels;

  const loggiaUrl = capodannoEventPath('capodanno-piazza-della-loggia-brescia', locale);
  const gardaUrl = capodannoEventPath('capodanno-justme-garda-lake', locale);
  const fenUrl = capodannoEventPath('capodanno-in-villa-borromeo-fenaroli-reale', locale);
  const francUrl = capodannoEventPath('capodanno-franciacorta-number-one-villa-fenaroli', locale);
  const cocoUrl = capodannoEventPath('capodanno-lago-di-garda-sesto-senso-coco-beach', locale);
  const sirmUrl = capodannoEventPath('capodanno-terme-di-sirmione-aquaria-lago-di-garda', locale);
  const closedBsUrl = capodannoEventPath('capodanno-brescia-art-club-desenzano-circus-beatclub', locale);
  const lombCat = capodannoCategoryPath('capodanno-lombardia', locale);
  const piazzaCat = capodannoCategoryPath('capodanno-in-piazza', locale);
  const a35Guide = guideUrl('g-113', locale);
  const mantovaGuide = guideUrl('g-124', locale);
  const termeGuide = guideUrl('g-117', locale);

  const bresciaGardaTable = makeTable(
    [tl.thVenue, tl.thDistrict, tl.thMusic, tl.thNye2027, tl.thStatus],
    [
      ['JustMe Garda Lake · Just Me in Rouge', 'Via Lavagnone 13, Lonato / Desenzano (BS)', 'Singing Gala Dinner, Rouge Show & House', '20 Entry · 70 Buffet · 130 Gala · VIP 440-2.000', linkTag(gardaUrl, tl.statusConfirmed, locale)],
      ['Villa Fenaroli Palace Hotel', 'Via Mazzini 14, Rezzato (BS · 19:30 - 04:00)', '18th-Century Villa Gala Dinner & DJ Set', '100 EUR Adult · 50 EUR 3-10y · 0-2y Free', linkTag(fenUrl, tl.statusConfirmed, locale)],
      ['Piazza della Loggia Brescia', 'Centro Storico Brescia (Metro Vittoria)', 'Municipal Live Concert & Midnight Toast', '0 EUR (Free Public Square)', linkTag(loggiaUrl, tl.statusConfirmed, locale)],
      ['Coco Beach Club Lago di Garda', 'Via Catullo 5, Lonato del Garda (BS)', 'Dinner Show, Wintergarden & Mainroom', '15 / 20-25 EUR · Gala 120-150 · VIP 640', linkTag(cocoUrl, tl.statusConfirmed, locale)],
      ['Terme di Sirmione · Aquaria Thermal', 'Sirmione (BS) · Garda Peninsula (until 03:00)', 'Thermal Pools, Saunas, Aufguss & DJ Set', '198 EUR Confirmed Online', linkTag(sirmUrl, tl.statusConfirmed, locale)],
      ['Circus Beatclub & Art Club Desenzano', 'Via Dalmazia 127 Brescia · Desenzano (BS)', 'Closed on December 31, 2026 (No NYE Event)', '0 EUR (Sold Out / Closed)', linkTag(closedBsUrl, tl.statusClosed, locale)],
    ],
    locale,
    true,
  );

  const a4BrebemiTable = makeTable(
    [tl.thDistrict, tl.thVenue, tl.thWeeklyRef, tl.thDressCode],
    [
      ['Brescia Centro -> Rezzato / Lago di Garda', 'Piazza della Loggia · Villa Fenaroli · JustMe Garda · Sirmione', '12 min Rezzato · 25 min Desenzano/Lonato (A4)', tl.dressEveningElegance],
      ['A35 BreBeMi / A4 -> Milano Est & Repubblica', 'Pelledoca · Magazzini Generali · REPVBLIC · Philipp’s Milano', '45 min Direct Highway + 24h Guarded Parking', tl.dressEveningElegance],
      ['A4 Milano Certosa / Portello -> Sempione', 'Voya Rooftop 20F · Just Me Torre Branca · Pineta · 55 Milano', '50 min Direct Exit Outside ZTL Area C', tl.dressBlackTie],
      ['Frecciarossa / Trenord Brescia - Milano', 'Brescia FS · Desenzano FS · Milano Centrale & Garibaldi', '36 min High-Speed Rail + ATM Night Metro', tl.dressSmartChic],
    ],
    locale,
  );

  const s1 = `<h3>${escapeHtml(lx.bre_h3, locale)}</h3>
<p>${escapeHtml(lx.bre_lead, locale)}</p>
<p>${escapeHtml(lx.bre_deep, locale)}</p>
<h3>${escapeHtml(cp.h3[0], locale)}</h3>
${bresciaGardaTable}
<h3>${escapeHtml(cp.h3[1], locale)}</h3>
<p>${linkTag(loggiaUrl, 'Piazza della Loggia Brescia', locale)} · ${linkTag(gardaUrl, 'JustMe Garda Lake', locale)} · ${linkTag(fenUrl, 'Villa Fenaroli 100 EUR', locale)} · ${linkTag(francUrl, 'Franciacorta 2027', locale)} · ${linkTag(cocoUrl, 'Coco Beach Garda', locale)} · ${linkTag(sirmUrl, 'Terme di Sirmione 198 EUR', locale)} · ${linkTag(piazzaCat, 'Piazze 0 EUR', locale)}.</p>`;

  const s2 = `<h3>${escapeHtml(cp.h3[16], locale)}</h3>
<p>${escapeHtml(cp.conciergeAndTransit.metroParkingDetail, locale)} ${escapeHtml(cp.reggaetonNavigliSanSiro.gardaTomDetail, locale)}</p>
<h3>${escapeHtml(cp.h3[11], locale)}</h3>
${a4BrebemiTable}
<h3>${escapeHtml(cp.h3[2], locale)}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.overview.highlights.map((h) => `<li>${escapeHtml(h, locale)}</li>`).join('\n')}
</ul>
<p>${linkTag(a35Guide, 'Brescia & Franciacorta -> Milano A35', locale)} · ${linkTag(mantovaGuide, 'Mantova Mascara 2027', locale)} · ${linkTag(termeGuide, 'Terme Lombardia 2027', locale)} · ${linkTag(lombCat, lx.lombardy, locale)}.</p>`;

  const s3 = `<h3>${escapeHtml(cp.h3[3], locale)}</h3>
<p>${escapeHtml(cp.sempioneBreraComo.justMeLead, locale)} ${escapeHtml(cp.sempioneBreraComo.pinetaClubLead, locale)}</p>
<h3>${escapeHtml(cp.h3[6], locale)}</h3>
<p>${escapeHtml(cp.gattopardoCitylife.voyaDetail, locale)} ${escapeHtml(cp.gattopardoCitylife.gattopardoDetail, locale)}</p>
<h3>${escapeHtml(cp.h3[7], locale)}</h3>
<p>${escapeHtml(lx22.winter_rep || cp.gattopardoCitylife.fiftyFiveRepvblicDetail, locale)}</p>`;

  const s4 = `<h3>${escapeHtml(cp.h3[9], locale)}</h3>
<p>${escapeHtml(cp.reggaetonNavigliSanSiro.navigliEastDetail, locale)} ${escapeHtml(cp.reggaetonNavigliSanSiro.gateAriaDetail, locale)}</p>
<h3>${escapeHtml(cp.h3[4], locale)}</h3>
<p>${escapeHtml(cp.sempioneBreraComo.corsoComoLead, locale)}</p>
<h3>${escapeHtml(cp.h3[5], locale)}</h3>
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
<h3>${escapeHtml(cp.h3[8], locale)}</h3>
<p>${escapeHtml(cp.intro[0], locale)} ${escapeHtml(cp.intro[1], locale)}</p>
<h3>${escapeHtml(cp.h3[17], locale)}</h3>
<p>${escapeHtml(cp.conciergeAndTransit.termeCrossLink, locale)} ${escapeHtml(cp.overview.tableLead, locale)}</p>
${sanitizeText(buildPartner18MatrixHtml(locale), locale)}
<p>${linkTag(gardaUrl, 'JustMe Garda Lake NYE 2027', locale)} · ${linkTag(capodannoPath(locale), cp.conciergeAndTransit.nyeHubCta, locale)} · <a href="https://wa.me/393519127047" class="underline decoration-current/55 underline-offset-4">${escapeHtml(cp.conciergeAndTransit.whatsappCta, locale)}</a> | <a href="mailto:concierge@nightlifemilan.com" class="underline decoration-current/55 underline-offset-4">concierge@nightlifemilan.com</a>.</p>`;

  const out: RenderedGuide = {
    title: sanitizeText(lx.bre_title, locale),
    excerpt: sanitizeText(lx.bre_exc, locale),
    sections: [
      { heading: sanitizeText(lx.bre_h2, locale), content: s1 },
      { heading: sanitizeText(cp.h2[1], locale), content: s2 },
      { heading: sanitizeText(cp.h2[2], locale), content: s3 },
      { heading: sanitizeText(cp.h2[3], locale), content: s4 },
      { heading: sanitizeText(cp.h2[4], locale), content: s5 },
      { heading: sanitizeText(cp.h2[5], locale), content: s6 },
    ],
    faqs: composeFaqs(lx.bre_faq_q, lx.bre_faq_a, cp.faqs, locale),
  };
  BATCH_20261126_CACHE.set(ck, out);
  return out;
}

// ─── 5. g-131: CAPODANNO 2027 A TEATRO MILANO (MANZONI, CARCANO, SCALA & VIP) ──
function renderTeatroMilano2027Guide(locale: LocaleCode): RenderedGuide {
  const ck = `g-131:${locale}`;
  const hit = BATCH_20261126_CACHE.get(ck);
  if (hit) return hit;

  const lx = GSC_BATCH_20261126_LEX[locale] || GSC_BATCH_20261126_LEX.en;
  const lx22 = GSC_BATCH_20261122_LEX[locale] || GSC_BATCH_20261122_LEX.en;
  const cp = CLUBBING_PILLAR_35[locale] || CLUBBING_PILLAR_35.en;
  const tl = cp.tableLabels;

  const manzUrl = capodannoEventPath('capodanno-teatro-manzoni-milano', locale);
  const carcUrl = capodannoEventPath('capodanno-teatro-manzoni-carcano-milano', locale);
  const scalaUrl = capodannoEventPath('capodanno-teatro-alla-scala-milano', locale);
  const zeligUrl = capodannoEventPath('capodanno-zelig-cabaret-milano', locale);
  const specCat = capodannoCategoryPath('capodanno-speciale', locale);
  const famCat = capodannoCategoryPath('capodanno-famiglie-bambini-milano', locale);
  const marcNye = capodannoEventPath('capodanno-il-marchese-milano', locale);
  const duomoNye = capodannoEventPath('capodanno-terrazza-duomo-21', locale);
  const jmNye = capodannoEventPath('capodanno-justme-milano-torre-branca', locale);
  const tcGuide = guideUrl('g-28', locale);
  const phGuide = guideUrl('g-126', locale);
  const repGuide = guideUrl('g-20', locale);

  const theatresPlaybillTable = makeTable(
    [tl.thVenue, tl.thDistrict, tl.thMusic, tl.thNye2027, tl.thStatus],
    [
      ['Teatro Manzoni Milano · Vincenzo Salemme', 'Via Alessandro Manzoni 42 (M3 Montenapoleone)', 'Comedy "...E fuori nevica" (17:00 & 21:30)', '40-67 EUR (17:00) · 70-130 EUR (21:30)', linkTag(manzUrl, tl.statusConfirmed, locale)],
      ['Bistrot Fioraio Bianchi @ Teatro Manzoni', 'Via Manzoni 42 Foyer (20:00 Pre-Show Dinner)', 'Seated New Year Dinner in Historic Foyer', '100 EUR / pax (Dinner Only)', linkTag(manzUrl, tl.statusConfirmed, locale)],
      ['Teatro Carcano Milano · Gioele Dix', 'Corso di Porta Romana 63 (M3 Crocetta)', 'New Year Special Stage Show + Midnight Toast', '84 EUR Confirmed', linkTag(carcUrl, tl.statusConfirmed, locale)],
      ['Teatro alla Scala · Lo Schiaccianoci', 'Piazza della Scala / Via Filodrammatici 2 (17:00)', 'Rudolf Nureyev Ballet (17:00 - 19:10)', '60 - 250 EUR (Zone 1: 300 EUR)', linkTag(scalaUrl, tl.statusConfirmed, locale)],
      ['Area Zelig Cabaret Milano', 'Viale Monza 140 (M1 Turro · 22:15 - 02:00)', 'Two-Act Live Comedy Gala + Cast Toast', '107 EUR Tribuna · 135 EUR Platea', linkTag(zeligUrl, tl.statusConfirmed, locale)],
      ['Il Marchese · Pre/Post Scala & Manzoni', 'Via dei Bossi 3 (100 m from Teatro alla Scala)', 'Noble Gala Dinner, Amaro Bar & DJ Set', '150 EUR Gala · 60 EUR (00:30 + 2 Drinks)', linkTag(marcNye, tl.statusConfirmed, locale)],
    ],
    locale,
    true,
  );

  const afterTheatreComboTable = makeTable(
    [tl.thFormula, tl.thDistrict, tl.thVenue, tl.thDressCode],
    [
      ['19:10 Post-Scala Gala Dinner Walk', 'Piazza della Scala / Duomo / Via Manin', "Il Marchese (150 EUR) · Terrazza Duomo 21 (300 EUR) · Philipp's Milano", tl.dressBlackTie],
      ['00:30 Post-Manzoni Quadrilatero & Brera', 'M3 Montenapoleone / Turati / M2 Moscova', "Philipp's Milano (Via Manin 21) · The Club Brera · REPVBLIC (VIP 300/600)", tl.dressEveningElegance],
      ['00:30 Post-Carcano Porta Romana & Centro', 'Corso di Porta Romana / Piazza Duomo', 'Terrazza Duomo 21 Toast (70-90 EUR) · Bischeri · TOM. Darsena', tl.dressEveningElegance],
      ['01:00 Guaranteed VIP Table Hold (Until 01:30)', 'Parco Sempione / CityLife / Garibaldi', 'Just Me Torre Branca (80 Party / VIP 600+) · Pineta · Voya 20F', tl.dressBlackTie],
    ],
    locale,
  );

  const s1 = `<h3>${escapeHtml(lx.tea_h3, locale)}</h3>
<p>${escapeHtml(lx.tea_lead, locale)}</p>
<p>${escapeHtml(lx.tea_deep, locale)}</p>
<h3>${escapeHtml(cp.h3[0], locale)}</h3>
${theatresPlaybillTable}
<h3>${escapeHtml(cp.h3[1], locale)}</h3>
${afterTheatreComboTable}
<p>${linkTag(manzUrl, 'Teatro Manzoni 2027', locale)} · ${linkTag(carcUrl, 'Teatro Carcano 84 EUR', locale)} · ${linkTag(scalaUrl, 'Teatro alla Scala 17:00', locale)} · ${linkTag(zeligUrl, 'Area Zelig 107-135 EUR', locale)} · ${linkTag(specCat, 'Speciale 2027', locale)} · ${linkTag(famCat, 'Family & Teatro', locale)}.</p>`;

  const s2 = `<h3>${escapeHtml(cp.h3[4], locale)}</h3>
<p>${escapeHtml(cp.intro[0], locale)} ${escapeHtml(cp.intro[1], locale)} ${escapeHtml(cp.sempioneBreraComo.corsoComoLead, locale)}</p>
<h3>${escapeHtml(cp.h3[3], locale)}</h3>
<p>${escapeHtml(cp.sempioneBreraComo.justMeLead, locale)} ${escapeHtml(cp.sempioneBreraComo.pinetaClubLead, locale)}</p>
<h3>${escapeHtml(cp.h3[5], locale)}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${cp.sempioneBreraComo.bullets.map((b) => `<li>${escapeHtml(b, locale)}</li>`).join('\n')}
</ul>
<p>${linkTag(marcNye, 'Il Marchese Scala', locale)} · ${linkTag(duomoNye, 'Terrazza Duomo 21', locale)} · ${linkTag(phGuide, "Philipp's Milano", locale)} · ${linkTag(tcGuide, 'The Club Brera', locale)} · ${linkTag(repGuide, 'REPVBLIC Milano', locale)} · ${linkTag(jmNye, 'Just Me Torre Branca', locale)}.</p>`;

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
<p>${linkTag(zoneUrl('duomo-san-babila', locale), 'Duomo, Scala & Montenapoleone', locale)} · ${linkTag(zoneUrl('porta-romana', locale), 'Porta Romana', locale)} · ${linkTag(genreUrl('live-music', locale), 'Live & Stage', locale)}.</p>`;

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
<p>${linkTag(manzUrl, 'Teatro Manzoni Milano', locale)} · ${linkTag(capodannoPath(locale), cp.conciergeAndTransit.nyeHubCta, locale)} · <a href="https://wa.me/393519127047" class="underline decoration-current/55 underline-offset-4">${escapeHtml(cp.conciergeAndTransit.whatsappCta, locale)}</a> | <a href="mailto:concierge@nightlifemilan.com" class="underline decoration-current/55 underline-offset-4">concierge@nightlifemilan.com</a>.</p>`;

  const out: RenderedGuide = {
    title: sanitizeText(lx.tea_title, locale),
    excerpt: sanitizeText(lx.tea_exc, locale),
    sections: [
      { heading: sanitizeText(lx.tea_h2, locale), content: s1 },
      { heading: sanitizeText(cp.h2[1], locale), content: s2 },
      { heading: sanitizeText(cp.h2[2], locale), content: s3 },
      { heading: sanitizeText(cp.h2[3], locale), content: s4 },
      { heading: sanitizeText(cp.h2[4], locale), content: s5 },
      { heading: sanitizeText(cp.h2[5], locale), content: s6 },
    ],
    faqs: composeFaqs(lx.tea_faq_q, lx.tea_faq_a, cp.faqs, locale),
  };
  BATCH_20261126_CACHE.set(ck, out);
  return out;
}

function buildLazyGuide(
  id: string,
  slugs: Record<LocaleCode, string>,
  renderer: (loc: LocaleCode) => RenderedGuide,
  genres: MusicGenre[],
  heroImage: string,
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
    datePublished: '2026-11-26',
    dateModified: '2026-11-26',
    image: heroImage,
  };
}

export function applyGscGuidesBatch20261126(guidesList: Guide[]): void {
  const specs: Array<{
    id: string;
    renderer: (loc: LocaleCode) => RenderedGuide;
    genres: MusicGenre[];
    hero: string;
  }> = [
    {
      id: 'g-127',
      renderer: renderCenoneVicinoAMeGuide,
      genres: [MusicGenre.COMMERCIAL, MusicGenre.HOUSE],
      hero: '/images/guides-editorial/bischeri-dinner.webp',
    },
    {
      id: 'g-128',
      renderer: renderBaita2027Guide,
      genres: [MusicGenre.COMMERCIAL, MusicGenre.HOUSE],
      hero: '/images/guides-editorial/terme-alpine-snow.webp',
    },
    {
      id: 'g-129',
      renderer: renderRadioRooftopGuide,
      genres: [MusicGenre.HOUSE, MusicGenre.COMMERCIAL],
      hero: '/images/guides-editorial/radio-skyline-dusk.webp',
    },
    {
      id: 'g-130',
      renderer: renderBrescia2027Guide,
      genres: [MusicGenre.COMMERCIAL, MusicGenre.HOUSE],
      hero: '/images/seo-events/master/capodanno-villa-castello-flow-01.webp',
    },
    {
      id: 'g-131',
      renderer: renderTeatroMilano2027Guide,
      genres: [MusicGenre.COMMERCIAL, MusicGenre.HOUSE],
      hero: '/images/guides-editorial/philipps-plein-dinnershow.webp',
    },
  ];

  for (const sp of specs) {
    if (!guidesList.some((g) => g.id === sp.id)) {
      guidesList.push(
        buildLazyGuide(
          sp.id,
          GUIDE_100_SLUGS_MAP[sp.id] as Record<LocaleCode, string>,
          sp.renderer,
          sp.genres,
          sp.hero,
        ),
      );
    }
  }
}
