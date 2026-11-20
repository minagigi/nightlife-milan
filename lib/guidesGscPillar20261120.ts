import { localePrefix, type LocaleCode } from './i18n/localeRegistry';
import {
  ALL_35_LOCALES,
  getLocalizedGenreSlug35,
  getLocalizedVenueSlug35,
} from './i18n/localizedSlugs35';
import { getLocalizedDir35 } from './i18n/dirTokens35';
import { GUIDE_100_SLUGS_MAP } from './i18n/guideSlugs100Map';
import { TERME_PILLAR_35, type TermeLocalePack } from './i18n/pillarTerme35';
import { CLUBBING_PILLAR_35, type ClubbingLocalePack } from './i18n/pillarClubbing35';
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
  return raw
    .replace(/\u2014/g, '-')
    .replace(/!/g, '.');
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function guideUrl(id: 'g-117' | 'g-118', locale: LocaleCode): string {
  const slug = GUIDE_100_SLUGS_MAP[id]?.[locale] || GUIDE_100_SLUGS_MAP[id]?.en || id;
  return `${localePrefix(locale)}/${getLocalizedDir35('guides', locale)}/${slug}`;
}

function clubUrl(canonicalVenueSlug: string, locale: LocaleCode): string {
  return `${localePrefix(locale)}/${getLocalizedDir35('clubs', locale)}/${getLocalizedVenueSlug35(canonicalVenueSlug, locale)}`;
}

function reggaetonUrl(locale: LocaleCode): string {
  return `${localePrefix(locale)}/${getLocalizedDir35('genres', locale)}/${getLocalizedGenreSlug35('reggaeton', locale)}`;
}

function linkTag(href: string, label: string): string {
  return `<a href="${escapeHtml(href)}" class="underline decoration-amber-400/70 underline-offset-4 hover:text-amber-300">${escapeHtml(sanitizeText(label))}</a>`;
}

// ─── PILLAR g-117: TERME CAPODANNO 2027 ───────────────────────────────────────

interface TermeRendered {
  title: string;
  excerpt: string;
  sections: Array<{ heading: string; content: string }>;
  faqs: Array<{ question: string; answer: string }>;
}

const TERME_RENDER_CACHE = new Map<string, TermeRendered>();

function renderTermeGuide(locale: LocaleCode): TermeRendered {
  const cached = TERME_RENDER_CACHE.get(locale);
  if (cached) return cached;

  const p: TermeLocalePack = TERME_PILLAR_35[locale] || TERME_PILLAR_35.en;
  const sirmioneUrl = capodannoEventPath('capodanno-terme-di-sirmione-aquaria-lago-di-garda', locale);
  const qcMiUrl = capodannoEventPath('capodanno-qc-terme-milano-porta-romana', locale);
  const qcSpUrl = capodannoEventPath('capodanno-qc-terme-san-pellegrino', locale);
  const qcBoUrl = capodannoEventPath('capodanno-qc-terme-bormio-bagni-nuovi-vecchi', locale);
  const justMeGardaUrl = capodannoEventPath('capodanno-justme-garda-lake', locale);
  const terminusUrl = capodannoEventPath('capodanno-albergo-terminus-como', locale);
  const barchettaUrl = capodannoEventPath('capodanno-hotel-barchetta-excelsior-como', locale);
  const palaceComoUrl = capodannoEventPath('capodanno-palace-hotel-como', locale);
  const voyaUrl = capodannoEventPath('capodanno-voya-rooftop-milano', locale);
  const justMeMiUrl = capodannoEventPath('capodanno-justme-milano-torre-branca', locale);
  const pinetaUrl = capodannoEventPath('capodanno-pineta-milano', locale);
  const termeCatUrl = capodannoCategoryPath('capodanno-terme-spa-baita-montagna', locale);
  const nyeHubUrl = capodannoPath(locale);
  const clubGuideUrl = guideUrl('g-118', locale);

  const l = p.labels;

  const comparisonRows: Array<[string, string, string, string, string, string]> = [
    [
      'Terme di Sirmione · SPA & Thermal Garden (Aquaria)',
      'Sirmione (BS) · Piazza Don A. Piatti 1',
      l.statusConfirmed,
      '198 EUR',
      l.rowSirmioneIncl,
      linkTag(sirmioneUrl, l.bookAction),
    ],
    [
      'QC Termemilano (Porta Romana)',
      'Milano (MI) · Piazzale Medaglie d\'Oro 2',
      l.statusTba,
      l.tbaLabel,
      l.rowQcMiIncl,
      linkTag(qcMiUrl, l.waitlistAction),
    ],
    [
      'QC Terme San Pellegrino',
      'San Pellegrino Terme (BG) · Viale della Vittoria 53',
      l.statusTba,
      l.tbaLabel,
      l.rowQcSpIncl,
      linkTag(qcSpUrl, l.waitlistAction),
    ],
    [
      'QC Terme Bagni Nuovi & Bagni Vecchi Bormio',
      'Valdidentro / Bormio (SO) · Via Bagni Nuovi 7',
      l.statusTba,
      l.tbaLabel,
      l.rowQcBoIncl,
      linkTag(qcBoUrl, l.waitlistAction),
    ],
    [
      'Albergo Terminus Como 4* Superior',
      'Como (CO) · Lungo Lario Trieste 14',
      l.statusConfirmed,
      '240 EUR',
      l.rowTerminusIncl,
      linkTag(terminusUrl, l.bookAction),
    ],
    [
      'Hotel Barchetta Excelsior Como 4*',
      'Como (CO) · Piazza Cavour 1',
      l.statusConfirmed,
      '175 EUR',
      l.rowBarchettaIncl,
      linkTag(barchettaUrl, l.bookAction),
    ],
    [
      'Palace Hotel Como (Lago di Como)',
      'Como (CO) · Lungo Lario Trieste 16',
      l.statusSoldOut,
      l.soldOutLabel,
      l.rowPalaceIncl,
      linkTag(palaceComoUrl, p.como.terminusCta),
    ],
    [
      'Voya Rooftop Milano (20° Piano CityLife)',
      'Milano (MI) · Viale Achille Papa 30',
      l.statusConfirmed,
      '300 EUR',
      l.rowVoyaIncl,
      linkTag(voyaUrl, p.milanAlts.voyaCta),
    ],
    [
      'JustMe Milano (Torre Branca)',
      'Milano (MI) · Viale Luigi Camoens 2',
      l.statusPartner,
      '80 / 300 EUR',
      l.rowJustMeMiIncl,
      linkTag(justMeMiUrl, p.milanAlts.justMeCta),
    ],
    [
      'Pineta Milano (Via Messina 38)',
      'Milano (MI) · Via Messina 38',
      l.statusPartner,
      '40 / 160 EUR',
      l.rowPinetaIncl,
      linkTag(pinetaUrl, p.milanAlts.pinetaCta),
    ],
  ];

  const comparisonTable = `<div class="overflow-x-auto my-6"><table class="min-w-full border border-white/15 text-sm">
<thead><tr class="bg-white/10 text-left"><th class="p-3">${escapeHtml(l.thSpa)}</th><th class="p-3">${escapeHtml(l.thProvince)}</th><th class="p-3">${escapeHtml(l.thStatus)}</th><th class="p-3">${escapeHtml(l.thOfficialRate)}</th><th class="p-3">${escapeHtml(l.thIncluded)}</th><th class="p-3">${escapeHtml(l.thLink)}</th></tr></thead>
<tbody>
${comparisonRows
  .map(
    ([spa, prov, status, rate, incl, action]) =>
      `<tr class="border-t border-white/10"><td class="p-3 font-semibold">${escapeHtml(sanitizeText(spa))}</td><td class="p-3">${escapeHtml(sanitizeText(prov))}</td><td class="p-3">${escapeHtml(sanitizeText(status))}</td><td class="p-3 font-semibold">${escapeHtml(sanitizeText(rate))}</td><td class="p-3">${escapeHtml(sanitizeText(incl))}</td><td class="p-3">${action}</td></tr>`,
  )
  .join('\n')}
</tbody></table></div>`;

  const scheduleTable = `<div class="overflow-x-auto my-6"><table class="min-w-full border border-white/15 text-sm">
<thead><tr class="bg-white/10 text-left"><th class="p-3">${escapeHtml(l.thTime)}</th><th class="p-3">${escapeHtml(l.thActivity)}</th><th class="p-3">${escapeHtml(l.thNotes)}</th></tr></thead>
<tbody>
${p.sirmione.scheduleRows
  .map(
    ([time, act, note]) =>
      `<tr class="border-t border-white/10"><td class="p-3 font-semibold">${escapeHtml(sanitizeText(time))}</td><td class="p-3">${escapeHtml(sanitizeText(act))}</td><td class="p-3">${escapeHtml(sanitizeText(note))}</td></tr>`,
  )
  .join('\n')}
</tbody></table></div>`;

  const s1 = `<h3>${escapeHtml(sanitizeText(p.h3[0]))}</h3>
<p>${escapeHtml(sanitizeText(p.intro[0]))}</p>
<p>${escapeHtml(sanitizeText(p.intro[1]))}</p>
<h3>${escapeHtml(sanitizeText(p.h3[1]))}</h3>
${comparisonTable}
<h3>${escapeHtml(sanitizeText(p.h3[2]))}</h3>
<p>${escapeHtml(sanitizeText(p.sirmione.overview))} ${linkTag(sirmioneUrl, p.sirmione.ctaLabel)} · ${linkTag(termeCatUrl, p.logistics.categoryCta)}.</p>`;

  const s2 = `<h3>${escapeHtml(sanitizeText(p.h3[3]))}</h3>
<p>${escapeHtml(sanitizeText(p.sirmione.overview))}</p>
<p>${escapeHtml(sanitizeText(p.sirmione.packageDetail))}</p>
<ul class="list-disc pl-6 space-y-2 my-4">
${p.sirmione.inclusions.map((item) => `<li>${escapeHtml(sanitizeText(item))}</li>`).join('\n')}
</ul>
<h3>${escapeHtml(sanitizeText(p.h3[4]))}</h3>
<p>${escapeHtml(sanitizeText(p.sirmione.ritualsNote))}</p>
${scheduleTable}
<h3>${escapeHtml(sanitizeText(p.h3[5]))}</h3>
<p>${escapeHtml(sanitizeText(p.sirmione.etiquetteNote))}</p>
<ul class="list-disc pl-6 space-y-2 my-4">
${p.sirmione.packingList.map((item) => `<li>${escapeHtml(sanitizeText(item))}</li>`).join('\n')}
</ul>
<p>${linkTag(sirmioneUrl, p.sirmione.ctaLabel)} · ${linkTag(justMeGardaUrl, p.garda.ctaLabel)} · <a href="https://wa.me/393519127047" class="underline decoration-amber-400/70 underline-offset-4">WhatsApp +39 351 912 7047</a>.</p>`;

  const s3 = `<h3>${escapeHtml(sanitizeText(p.h3[6]))}</h3>
<p>${escapeHtml(sanitizeText(p.qcTerme.waitlistPolicy))}</p>
<p>${escapeHtml(sanitizeText(p.qcTerme.milano))} ${linkTag(qcMiUrl, p.qcTerme.milanoCta)}.</p>
<h3>${escapeHtml(sanitizeText(p.h3[7]))}</h3>
<p>${escapeHtml(sanitizeText(p.qcTerme.sanPellegrino))} ${linkTag(qcSpUrl, p.qcTerme.sanPellegrinoCta)}.</p>
<p>${escapeHtml(sanitizeText(p.qcTerme.bormio))} ${linkTag(qcBoUrl, p.qcTerme.bormioCta)}.</p>
<h3>${escapeHtml(sanitizeText(p.h3[8]))}</h3>
<ol class="list-decimal pl-6 space-y-2 my-4">
${p.qcTerme.waitlistProtocol.map((step) => `<li>${escapeHtml(sanitizeText(step))}</li>`).join('\n')}
</ol>
<p>${linkTag(sirmioneUrl, p.sirmione.ctaLabel)} · ${linkTag(terminusUrl, p.como.terminusCta)} · ${linkTag(barchettaUrl, p.como.barchettaCta)}.</p>`;

  const s4 = `<h3>${escapeHtml(sanitizeText(p.h3[9]))}</h3>
<p>${escapeHtml(sanitizeText(p.garda.pairingLogic))}</p>
<h3>${escapeHtml(sanitizeText(p.h3[10]))}</h3>
<p>${escapeHtml(sanitizeText(p.garda.justMeDetail))}</p>
<ul class="list-disc pl-6 space-y-2 my-4">
${p.garda.highlights.map((item) => `<li>${escapeHtml(sanitizeText(item))}</li>`).join('\n')}
</ul>
<h3>${escapeHtml(sanitizeText(p.h3[11]))}</h3>
<p>${escapeHtml(sanitizeText(p.garda.transferNote))}</p>
<p>${linkTag(justMeGardaUrl, p.garda.ctaLabel)} · ${linkTag(sirmioneUrl, p.sirmione.ctaLabel)}.</p>`;

  const s5 = `<h3>${escapeHtml(sanitizeText(p.h3[12]))}</h3>
<p>${escapeHtml(sanitizeText(p.como.overview))}</p>
<p>${escapeHtml(sanitizeText(p.como.terminus))} ${linkTag(terminusUrl, p.como.terminusCta)}.</p>
<p>${escapeHtml(sanitizeText(p.como.barchetta))} ${linkTag(barchettaUrl, p.como.barchettaCta)}.</p>
<h3>${escapeHtml(sanitizeText(p.h3[13]))}</h3>
<p>${escapeHtml(sanitizeText(p.como.palaceNote))} ${linkTag(palaceComoUrl, 'Palace Hotel Como (Sold Out)')}.</p>
<ul class="list-disc pl-6 space-y-2 my-4">
${p.como.highlights.map((item) => `<li>${escapeHtml(sanitizeText(item))}</li>`).join('\n')}
</ul>
<h3>${escapeHtml(sanitizeText(p.h3[14]))}</h3>
<p>${escapeHtml(sanitizeText(p.milanAlts.overview))}</p>
<p>${escapeHtml(sanitizeText(p.milanAlts.voya))} ${linkTag(voyaUrl, p.milanAlts.voyaCta)}.</p>
<p>${escapeHtml(sanitizeText(p.milanAlts.justMePineta))}</p>
<ul class="list-disc pl-6 space-y-2 my-4">
${p.milanAlts.highlights.map((item) => `<li>${escapeHtml(sanitizeText(item))}</li>`).join('\n')}
</ul>
<p>${linkTag(justMeMiUrl, p.milanAlts.justMeCta)} · ${linkTag(pinetaUrl, p.milanAlts.pinetaCta)} · ${linkTag(clubGuideUrl, p.milanAlts.clubGuideCta)}.</p>`;

  const s6 = `<h3>${escapeHtml(sanitizeText(p.h3[15]))}</h3>
<p>${escapeHtml(sanitizeText(p.logistics.bookingProtocol))}</p>
<ol class="list-decimal pl-6 space-y-2 my-4">
${p.logistics.bookingSteps.map((step) => `<li>${escapeHtml(sanitizeText(step))}</li>`).join('\n')}
</ol>
<h3>${escapeHtml(sanitizeText(p.h3[16]))}</h3>
<p>${escapeHtml(sanitizeText(p.logistics.transitSirmione))}</p>
<p>${escapeHtml(sanitizeText(p.logistics.transitComoValtellina))}</p>
<h3>${escapeHtml(sanitizeText(p.h3[17]))}</h3>
<p>${escapeHtml(sanitizeText(p.logistics.hubLinkNote))}</p>
<p>${linkTag(nyeHubUrl, p.logistics.categoryCta)} · ${linkTag(termeCatUrl, p.sirmione.ctaLabel)} · ${linkTag(clubGuideUrl, p.milanAlts.clubGuideCta)} · <a href="https://wa.me/393519127047" class="underline decoration-amber-400/70 underline-offset-4">${escapeHtml(sanitizeText(p.logistics.whatsappCta))}</a> | <a href="mailto:concierge@nightlifemilan.com" class="underline decoration-amber-400/70 underline-offset-4">concierge@nightlifemilan.com</a>.</p>`;

  const rendered: TermeRendered = {
    title: sanitizeText(p.title),
    excerpt: sanitizeText(p.excerpt),
    sections: [
      { heading: sanitizeText(p.h2[0]), content: s1 },
      { heading: sanitizeText(p.h2[1]), content: s2 },
      { heading: sanitizeText(p.h2[2]), content: s3 },
      { heading: sanitizeText(p.h2[3]), content: s4 },
      { heading: sanitizeText(p.h2[4]), content: s5 },
      { heading: sanitizeText(p.h2[5]), content: s6 },
    ],
    faqs: p.faqs.map(([q, a]) => ({
      question: sanitizeText(q),
      answer: sanitizeText(a),
    })),
  };

  TERME_RENDER_CACHE.set(locale, rendered);
  return rendered;
}

// ─── PILLAR g-118: CLUBBING, DISCOTECHE & 18 PARTNER AXEL 2026/2027 ────────────

interface ClubbingRendered {
  title: string;
  excerpt: string;
  sections: Array<{ heading: string; content: string }>;
  faqs: Array<{ question: string; answer: string }>;
}

const CLUBBING_RENDER_CACHE = new Map<string, ClubbingRendered>();

function renderClubbingGuide(locale: LocaleCode): ClubbingRendered {
  const cached = CLUBBING_RENDER_CACHE.get(locale);
  if (cached) return cached;

  const p: ClubbingLocalePack = CLUBBING_PILLAR_35[locale] || CLUBBING_PILLAR_35.en;
  const tl = p.tableLabels;

  // NYE 2027 URLs (18 partner venues + 3 closed venues)
  const justMeNyeUrl = capodannoEventPath('capodanno-justme-milano-torre-branca', locale);
  const pinetaNyeUrl = capodannoEventPath('capodanno-pineta-milano', locale);
  const voyaNyeUrl = capodannoEventPath('capodanno-voya-rooftop-milano', locale);
  const repvblicNyeUrl = capodannoEventPath('capodanno-repvblic-milano', locale);
  const bischeriNyeUrl = capodannoEventPath('capodanno-bischeri-milano', locale);
  const gateNyeUrl = capodannoEventPath('capodanno-gate-milano', locale);
  const pelledocaNyeUrl = capodannoEventPath('capodanno-pelledoca-milano', locale);
  const bobinoNyeUrl = capodannoEventPath('capodanno-bobino-milano', locale);
  const magazziniNyeUrl = capodannoEventPath('capodanno-magazzini-generali-milano', locale);
  const theClubNyeUrl = capodannoEventPath('capodanno-the-club-milano', locale);
  const ariaNyeUrl = capodannoEventPath('capodanno-aria-club-milano', locale);
  const fiftyFiveNyeUrl = capodannoEventPath('capodanno-55-milano', locale);
  const hollywoodNyeUrl = capodannoEventPath('capodanno-hollywood-milano', locale);
  const elevenNyeUrl = capodannoEventPath('capodanno-11clubroom-milano', locale);
  const tocquevilleNyeUrl = capodannoEventPath('capodanno-tocqueville-13-milano', locale);
  const tomNyeUrl = capodannoEventPath('capodanno-tom-the-ordinary-market-milano', locale);
  const gattopardoNyeUrl = capodannoEventPath('capodanno-il-gattopardo-milano', locale);
  const gardaNyeUrl = capodannoEventPath('capodanno-justme-garda-lake', locale);

  const fabriqueNyeUrl = capodannoEventPath('capodanno-fabrique-milano', locale);
  const ceresioNyeUrl = capodannoEventPath('capodanno-ceresio-7-milano', locale);
  const principeNyeUrl = capodannoEventPath('capodanno-hotel-principe-di-savoia-milano', locale);

  // Canonical /clubs/ pages
  const justMeClubUrl = clubUrl('just-me-milano', locale);
  const pinetaClubUrl = clubUrl('pineta-club-milano', locale);
  const ariaClubUrl = clubUrl('aria-club-milano', locale);
  const voyaClubUrl = clubUrl('voya-rooftop-milan', locale);
  const fiftyFiveClubUrl = clubUrl('55-milano', locale);
  const repvblicClubUrl = clubUrl('repvblic-milano', locale);
  const tocquevilleClubUrl = clubUrl('tocqueville-13-milano', locale);
  const hollywoodClubUrl = clubUrl('hollywood-club-milano', locale);
  const theClubClubUrl = clubUrl('the-club-milano', locale);
  const elevenClubUrl = clubUrl('11-clubroom', locale);
  const gattopardoClubUrl = clubUrl('gattopardo-milano', locale);
  const magazziniClubUrl = clubUrl('magazzini-generali-milano', locale);
  const bobinoClubUrl = clubUrl('bobino-milano', locale);

  const reggaetonHubUrl = reggaetonUrl(locale);
  const nyeHubUrl = capodannoPath(locale);
  const termeGuideUrl = guideUrl('g-117', locale);

  const partnerRows: Array<[string, string, string, string, string, string]> = [
    [
      `${linkTag(justMeClubUrl, 'Just Me Milano (ex Just Cavalli)')} · ${linkTag(justMeNyeUrl, 'NYE 2027')}`,
      'Parco Sempione · Viale Luigi Camoens 2 (Torre Branca)',
      'House, Commercial, Hip-Hop & Reggaeton (7/7)',
      tl.dressSmartChic,
      tl.justMeRates,
      tl.statusConfirmed,
    ],
    [
      `${linkTag(pinetaClubUrl, 'Pineta Milano')} · ${linkTag(pinetaNyeUrl, 'NYE 2027')}`,
      'Porta Garibaldi / Cenisio · Via Messina 38',
      'House, Commercial, Dinner Show & Reggaeton',
      tl.dressSmartChic,
      tl.pinetaRates,
      tl.statusConfirmed,
    ],
    [
      `${linkTag(voyaClubUrl, 'Voya Rooftop Milano (20° Piano)')} · ${linkTag(voyaNyeUrl, 'NYE 2027')}`,
      'Portello / CityLife · Viale Achille Papa 30',
      'Vocal House, Melodic & Rooftop Skyline',
      tl.dressBlackTie,
      tl.voyaRates,
      tl.statusConfirmed,
    ],
    [
      `${linkTag(repvblicClubUrl, 'REPVBLIC Milano')} · ${linkTag(repvblicNyeUrl, 'NYE 2027')}`,
      'Repubblica · Piazza della Repubblica 12',
      'Commercial Hits, Hip-Hop & Reggaeton',
      tl.dressEveningElegance,
      tl.repvblicRates,
      tl.statusConfirmed,
    ],
    [
      `${linkTag(bischeriNyeUrl, 'Bischeri Milano (NYE 2027)')}`,
      'Sud / Ripamonti · Via Giuseppe Ripamonti',
      'Gala Dinner Show, Commercial & Disco',
      tl.dressEveningElegance,
      tl.bischeriRates,
      tl.statusConfirmed,
    ],
    [
      `${linkTag(gateNyeUrl, 'Gate Milano (PERREO XL)')}`,
      'Isola / Scalo Farini · Via Valtellina 21',
      'Reggaeton, Dembow, Latin Urban & Hip-Hop',
      tl.dressUrbanChic,
      tl.gateRates,
      tl.statusConfirmed,
    ],
    [
      `${linkTag(pelledocaNyeUrl, 'Pelledoca Milano')}`,
      'Est / Forlanini · Viale Enrico Forlanini 121',
      'Gala Dinner, Italian Revival & Dancefloor',
      tl.dressEveningElegance,
      tl.pelledocaRates,
      tl.statusConfirmed,
    ],
    [
      `${linkTag(bobinoClubUrl, 'Bobino Milano')} · ${linkTag(bobinoNyeUrl, 'NYE 2027')}`,
      'Navigli / Porta Genova · Piazzale Stazione Genova 4',
      'DJ Set 30+, House Revival & Aperitivo Show',
      tl.dressSmartChic,
      tl.bobinoRates,
      tl.statusConfirmed,
    ],
    [
      `${linkTag(magazziniClubUrl, 'Magazzini Generali Milano')} · ${linkTag(magazziniNyeUrl, 'NYE 2027')}`,
      'Ripamonti / IEO · Via Pietrasanta 16',
      'We Love 2000, Club Hits & Electronic',
      tl.dressUrbanChic,
      tl.magazziniRates,
      tl.statusConfirmed,
    ],
    [
      `${linkTag(theClubClubUrl, 'The Club Milano (Brera)')} · ${linkTag(theClubNyeUrl, 'NYE 2027')}`,
      'Brera / Moscova · Corso Garibaldi 97',
      'House, Hip-Hop, Reggaeton & International',
      tl.dressSmartChic,
      tl.theClubRates,
      tl.statusConfirmed,
    ],
    [
      `${linkTag(ariaClubUrl, 'Aria Club Milano (San Siro)')} · ${linkTag(ariaNyeUrl, 'NYE 2027')}`,
      'San Siro · Piazzale dello Sport 14 (150 m Stadio)',
      'Commercial, Reggaeton & Hip-Hop',
      tl.dressEveningElegance,
      tl.ariaRates,
      tl.statusBenchmark,
    ],
    [
      `${linkTag(fiftyFiveClubUrl, '55 Milano (1.000 mq Loft)')} · ${linkTag(fiftyFiveNyeUrl, 'NYE 2027')}`,
      'Sempione · Via Piero della Francesca 55',
      'Revival 80/90, Vocal House & Aperitivo',
      tl.dressSmartChic,
      tl.fiftyFiveRates,
      tl.statusBenchmark,
    ],
    [
      `${linkTag(hollywoodClubUrl, 'Hollywood Milano (Rythmoteque)')} · ${linkTag(hollywoodNyeUrl, 'NYE 2027')}`,
      'Corso Como · Corso Como 15',
      'Fashion House, Hip-Hop & Reggaeton',
      tl.dressSmartChic,
      tl.hollywoodRates,
      tl.statusBenchmark,
    ],
    [
      `${linkTag(elevenClubUrl, '11 Clubroom Milano')} · ${linkTag(elevenNyeUrl, 'NYE 2027')}`,
      'Corso Como · Via Alessio di Tocqueville 11',
      'House & Hip-Hop Lounge Boutique',
      tl.dressSmartChic,
      tl.elevenRates,
      tl.statusBenchmark,
    ],
    [
      `${linkTag(tocquevilleClubUrl, 'Tocqueville 13 Milano')} · ${linkTag(tocquevilleNyeUrl, 'NYE 2027')}`,
      'Corso Como · Via Alessio di Tocqueville 13',
      'Dinner Show, Hip-Hop, Reggaeton & Commercial',
      tl.dressSmartChic,
      tl.tocquevilleRates,
      tl.statusBenchmark,
    ],
    [
      `${linkTag(tomNyeUrl, 'TOM. The Ordinary Market')}`,
      'Zona Darsena / Ticinese · Via della Chiusa 15',
      'House, Nu-Disco & Soulful Grooves',
      tl.dressEveningElegance,
      tl.tomRates,
      tl.statusTba,
    ],
    [
      `${linkTag(gattopardoClubUrl, 'Il Gattopardo Milano')} · ${linkTag(gattopardoNyeUrl, 'NYE 2027')}`,
      'Sempione · Via Piero della Francesca 47 (Ex Chiesa)',
      'House, Vocal & Commercial Deluxe',
      tl.dressBlackTie,
      tl.gattopardoRates,
      tl.statusConfirmed,
    ],
    [
      `${linkTag(gardaNyeUrl, 'JustMe Garda Lake (Lonato / Sirmione)')}`,
      'Lago di Garda · Via Lavagnone 13, Lonato del Garda (BS)',
      'Resort Clubbing, Commercial & House',
      tl.dressSmartChic,
      tl.gardaRates,
      tl.statusConfirmed,
    ],
  ];

  const partnerMatrixTable = `<div class="overflow-x-auto my-6"><table class="min-w-full border border-white/15 text-sm">
<thead><tr class="bg-white/10 text-left"><th class="p-3">${escapeHtml(tl.thVenue)}</th><th class="p-3">${escapeHtml(tl.thDistrict)}</th><th class="p-3">${escapeHtml(tl.thMusic)}</th><th class="p-3">${escapeHtml(tl.thDressCode)}</th><th class="p-3">${escapeHtml(tl.thRates2027)}</th><th class="p-3">${escapeHtml(tl.thStatus)}</th></tr></thead>
<tbody>
${partnerRows
  .map(
    ([venueHtml, district, music, dress, rates, status]) =>
      `<tr class="border-t border-white/10"><td class="p-3 font-semibold">${venueHtml}</td><td class="p-3">${escapeHtml(sanitizeText(district))}</td><td class="p-3">${escapeHtml(sanitizeText(music))}</td><td class="p-3">${escapeHtml(sanitizeText(dress))}</td><td class="p-3">${escapeHtml(sanitizeText(rates))}</td><td class="p-3 font-semibold">${escapeHtml(sanitizeText(status))}</td></tr>`,
  )
  .join('\n')}
</tbody></table></div>`;

  const tierTable = `<div class="overflow-x-auto my-6"><table class="min-w-full border border-white/15 text-sm">
<thead><tr class="bg-white/10 text-left"><th class="p-3">${escapeHtml(tl.thFormula)}</th><th class="p-3">${escapeHtml(tl.thWeeklyRef)}</th><th class="p-3">${escapeHtml(tl.thNye2027)}</th><th class="p-3">${escapeHtml(tl.thRates2027)}</th></tr></thead>
<tbody>
${p.gattopardoCitylife.tierRows
  .map(
    ([club, style, weekly, nye]) =>
      `<tr class="border-t border-white/10"><td class="p-3 font-semibold">${escapeHtml(sanitizeText(club))}</td><td class="p-3">${escapeHtml(sanitizeText(style))}</td><td class="p-3">${escapeHtml(sanitizeText(weekly))}</td><td class="p-3">${escapeHtml(sanitizeText(nye))}</td></tr>`,
  )
  .join('\n')}
</tbody></table></div>`;

  const closedLinks = [
    fabriqueNyeUrl,
    ceresioNyeUrl,
    principeNyeUrl,
  ];

  const closedTable = `<div class="overflow-x-auto my-6"><table class="min-w-full border border-white/15 text-sm">
<thead><tr class="bg-white/10 text-left"><th class="p-3">${escapeHtml(tl.thClosedVenue)}</th><th class="p-3">${escapeHtml(tl.thClosedStatus)}</th><th class="p-3">${escapeHtml(tl.thOpenAlt)}</th></tr></thead>
<tbody>
${p.doorPolicyAndClosed.closedRows
  .map(
    ([venue, status, alts], idx) =>
      `<tr class="border-t border-white/10"><td class="p-3 font-semibold">${linkTag(closedLinks[idx] || nyeHubUrl, venue)}</td><td class="p-3">${escapeHtml(sanitizeText(status))}</td><td class="p-3">${escapeHtml(sanitizeText(alts))}</td></tr>`,
  )
  .join('\n')}
</tbody></table></div>`;

  const s1 = `<h3>${escapeHtml(sanitizeText(p.h3[0]))}</h3>
<p>${escapeHtml(sanitizeText(p.intro[0]))}</p>
<p>${escapeHtml(sanitizeText(p.intro[1]))}</p>
<p>${escapeHtml(sanitizeText(p.overview.tableLead))}</p>
${partnerMatrixTable}
<h3>${escapeHtml(sanitizeText(p.h3[1]))}</h3>
<p>${escapeHtml(sanitizeText(p.overview.venueSpecsSummary))}</p>
<h3>${escapeHtml(sanitizeText(p.h3[2]))}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${p.overview.highlights.map((item) => `<li>${escapeHtml(sanitizeText(item))}</li>`).join('\n')}
</ul>`;

  const s2 = `<h3>${escapeHtml(sanitizeText(p.h3[3]))}</h3>
<p>${escapeHtml(sanitizeText(p.sempioneBreraComo.justMeLead))}</p>
<p>${linkTag(justMeClubUrl, p.sempioneBreraComo.ctas.justMeClub)} · ${linkTag(justMeNyeUrl, p.sempioneBreraComo.ctas.justMeNye)}.</p>
<h3>${escapeHtml(sanitizeText(p.h3[4]))}</h3>
<p>${escapeHtml(sanitizeText(p.sempioneBreraComo.pinetaClubLead))}</p>
<p>${escapeHtml(sanitizeText(p.sempioneBreraComo.corsoComoLead))}</p>
<h3>${escapeHtml(sanitizeText(p.h3[5]))}</h3>
<ul class="list-disc pl-6 space-y-2 my-4">
${p.sempioneBreraComo.bullets.map((b) => `<li>${escapeHtml(sanitizeText(b))}</li>`).join('\n')}
</ul>
<p>${linkTag(pinetaClubUrl, p.sempioneBreraComo.ctas.pinetaClub)} · ${linkTag(theClubNyeUrl, p.sempioneBreraComo.ctas.theClubNye)} · ${linkTag(hollywoodNyeUrl, p.sempioneBreraComo.ctas.hollywoodNye)} · ${linkTag(tocquevilleNyeUrl, p.sempioneBreraComo.ctas.tocquevilleNye)} · ${linkTag(elevenClubUrl, '11 Clubroom Milano')}.</p>`;

  const s3 = `<h3>${escapeHtml(sanitizeText(p.h3[6]))}</h3>
<p>${escapeHtml(sanitizeText(p.gattopardoCitylife.gattopardoDetail))}</p>
<p>${linkTag(gattopardoClubUrl, p.gattopardoCitylife.ctas.gattopardoClub)} · ${linkTag(gattopardoNyeUrl, p.gattopardoCitylife.ctas.gattopardoNye)}.</p>
<h3>${escapeHtml(sanitizeText(p.h3[7]))}</h3>
<p>${escapeHtml(sanitizeText(p.gattopardoCitylife.voyaDetail))}</p>
<p>${escapeHtml(sanitizeText(p.gattopardoCitylife.fiftyFiveRepvblicDetail))}</p>
<h3>${escapeHtml(sanitizeText(p.h3[8]))}</h3>
${tierTable}
<p>${linkTag(voyaClubUrl, p.gattopardoCitylife.ctas.voyaClub)} · ${linkTag(repvblicNyeUrl, p.gattopardoCitylife.ctas.repvblicNye)} · ${linkTag(fiftyFiveNyeUrl, p.gattopardoCitylife.ctas.fiftyFiveNye)}.</p>`;

  const s4 = `<h3>${escapeHtml(sanitizeText(p.h3[9]))}</h3>
<p>${escapeHtml(sanitizeText(p.reggaetonNavigliSanSiro.gateAriaDetail))}</p>
<p>${linkTag(reggaetonHubUrl, p.reggaetonNavigliSanSiro.ctas.reggaetonHub)} · ${linkTag(gateNyeUrl, p.reggaetonNavigliSanSiro.ctas.gateNye)} · ${linkTag(ariaClubUrl, p.reggaetonNavigliSanSiro.ctas.ariaClub)}.</p>
<h3>${escapeHtml(sanitizeText(p.h3[10]))}</h3>
<p>${escapeHtml(sanitizeText(p.reggaetonNavigliSanSiro.navigliEastDetail))}</p>
<ul class="list-disc pl-6 space-y-2 my-4">
${p.reggaetonNavigliSanSiro.bullets.map((b) => `<li>${escapeHtml(sanitizeText(b))}</li>`).join('\n')}
</ul>
<h3>${escapeHtml(sanitizeText(p.h3[11]))}</h3>
<p>${escapeHtml(sanitizeText(p.reggaetonNavigliSanSiro.gardaTomDetail))}</p>
<p>${linkTag(bobinoNyeUrl, p.reggaetonNavigliSanSiro.ctas.bobinoNye)} · ${linkTag(magazziniNyeUrl, p.reggaetonNavigliSanSiro.ctas.magazziniNye)} · ${linkTag(tomNyeUrl, 'TOM. The Ordinary Market (TBA)')} · ${linkTag(gardaNyeUrl, p.reggaetonNavigliSanSiro.ctas.gardaNye)}.</p>`;

  const s5 = `<h3>${escapeHtml(sanitizeText(p.h3[12]))}</h3>
<p>${escapeHtml(sanitizeText(p.doorPolicyAndClosed.dressCodeDetail))}</p>
<h3>${escapeHtml(sanitizeText(p.h3[13]))}</h3>
<p>${escapeHtml(sanitizeText(p.doorPolicyAndClosed.allMaleBottleDetail))}</p>
<ul class="list-disc pl-6 space-y-2 my-4">
${p.doorPolicyAndClosed.checklist.map((c) => `<li>${escapeHtml(sanitizeText(c))}</li>`).join('\n')}
</ul>
<h3>${escapeHtml(sanitizeText(p.h3[14]))}</h3>
<p>${escapeHtml(sanitizeText(p.doorPolicyAndClosed.closedAlertDetail))}</p>
${closedTable}
<p>${linkTag(fabriqueNyeUrl, p.doorPolicyAndClosed.fabriqueNyeCta)} · ${linkTag(ceresioNyeUrl, p.doorPolicyAndClosed.ceresioNyeCta)}.</p>`;

  const s6 = `<h3>${escapeHtml(sanitizeText(p.h3[15]))}</h3>
<p>${escapeHtml(sanitizeText(p.conciergeAndTransit.conciergeDetail))}</p>
<ol class="list-decimal pl-6 space-y-2 my-4">
${p.conciergeAndTransit.steps.map((step) => `<li>${escapeHtml(sanitizeText(step))}</li>`).join('\n')}
</ol>
<h3>${escapeHtml(sanitizeText(p.h3[16]))}</h3>
<p>${escapeHtml(sanitizeText(p.conciergeAndTransit.metroParkingDetail))}</p>
<h3>${escapeHtml(sanitizeText(p.h3[17]))}</h3>
<p>${escapeHtml(sanitizeText(p.conciergeAndTransit.termeCrossLink))}</p>
<p>${linkTag(nyeHubUrl, p.conciergeAndTransit.nyeHubCta)} · ${linkTag(termeGuideUrl, p.conciergeAndTransit.termeGuideCta)} · <a href="https://wa.me/393519127047" class="underline decoration-amber-400/70 underline-offset-4">${escapeHtml(sanitizeText(p.conciergeAndTransit.whatsappCta))}</a> | <a href="mailto:concierge@nightlifemilan.com" class="underline decoration-amber-400/70 underline-offset-4">concierge@nightlifemilan.com</a>.</p>`;

  const rendered: ClubbingRendered = {
    title: sanitizeText(p.title),
    excerpt: sanitizeText(p.excerpt),
    sections: [
      { heading: sanitizeText(p.h2[0]), content: s1 },
      { heading: sanitizeText(p.h2[1]), content: s2 },
      { heading: sanitizeText(p.h2[2]), content: s3 },
      { heading: sanitizeText(p.h2[3]), content: s4 },
      { heading: sanitizeText(p.h2[4]), content: s5 },
      { heading: sanitizeText(p.h2[5]), content: s6 },
    ],
    faqs: p.faqs.map(([q, a]) => ({
      question: sanitizeText(q),
      answer: sanitizeText(a),
    })),
  };

  CLUBBING_RENDER_CACHE.set(locale, rendered);
  return rendered;
}

function buildTermeGuide(): Guide {
  const sections: GuideSection[] = [0, 1, 2, 3, 4, 5].map((idx) => ({
    id: `g-117-sec-${idx + 1}`,
    heading: createLazyLocalizedString((loc) => renderTermeGuide(loc).sections[idx].heading),
    content: createLazyLocalizedString((loc) => renderTermeGuide(loc).sections[idx].content),
  }));

  const faqs: FAQ[] = [0, 1, 2, 3, 4, 5].map((idx) => ({
    question: createLazyLocalizedString((loc) => renderTermeGuide(loc).faqs[idx].question),
    answer: createLazyLocalizedString((loc) => renderTermeGuide(loc).faqs[idx].answer),
  }));

  return {
    id: 'g-117',
    slugs: { ...(GUIDE_100_SLUGS_MAP['g-117'] as Record<LocaleCode, string>) },
    title: createLazyLocalizedString((loc) => renderTermeGuide(loc).title),
    excerpt: createLazyLocalizedString((loc) => renderTermeGuide(loc).excerpt),
    sections,
    faqs,
    relatedGenres: [MusicGenre.COMMERCIAL, MusicGenre.HOUSE],
    author: 'Nightlife Milan Editorial Desk',
    datePublished: '2026-11-20',
    dateModified: '2026-11-20',
    image: '/images/seo-events/master/capodanno-terme-milano-flow-01.webp',
  };
}

function buildClubbingGuide(): Guide {
  const sections: GuideSection[] = [0, 1, 2, 3, 4, 5].map((idx) => ({
    id: `g-118-sec-${idx + 1}`,
    heading: createLazyLocalizedString((loc) => renderClubbingGuide(loc).sections[idx].heading),
    content: createLazyLocalizedString((loc) => renderClubbingGuide(loc).sections[idx].content),
  }));

  const faqs: FAQ[] = [0, 1, 2, 3, 4, 5].map((idx) => ({
    question: createLazyLocalizedString((loc) => renderClubbingGuide(loc).faqs[idx].question),
    answer: createLazyLocalizedString((loc) => renderClubbingGuide(loc).faqs[idx].answer),
  }));

  return {
    id: 'g-118',
    slugs: { ...(GUIDE_100_SLUGS_MAP['g-118'] as Record<LocaleCode, string>) },
    title: createLazyLocalizedString((loc) => renderClubbingGuide(loc).title),
    excerpt: createLazyLocalizedString((loc) => renderClubbingGuide(loc).excerpt),
    sections,
    faqs,
    relatedGenres: [
      MusicGenre.HOUSE,
      MusicGenre.COMMERCIAL,
      MusicGenre.REGGAETON,
      MusicGenre.HIP_HOP,
    ],
    author: 'Nightlife Milan Editorial Desk',
    datePublished: '2026-11-20',
    dateModified: '2026-11-20',
    image: '/images/seo-events/master/capodanno-justme-milano-torre-branca.webp',
  };
}

export const GSC_PILLAR_GUIDES_20261120: Guide[] = [
  buildTermeGuide(),
  buildClubbingGuide(),
];
