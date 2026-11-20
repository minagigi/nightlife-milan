import type { LocaleCode } from './localeRegistry';

export interface ClubbingLocalePack {
  title: string;
  excerpt: string;
  h2: [string, string, string, string, string, string];
  h3: [
    string, string, string,
    string, string, string,
    string, string, string,
    string, string, string,
    string, string, string,
    string, string, string,
  ];
  intro: [string, string];
  overview: {
    tableLead: string;
    venueSpecsSummary: string;
    highlights: string[];
  };
  sempioneBreraComo: {
    justMeLead: string;
    pinetaClubLead: string;
    corsoComoLead: string;
    bullets: [string, string, string, string, string, string];
    ctas: {
      justMeClub: string;
      justMeNye: string;
      pinetaClub: string;
      theClubNye: string;
      hollywoodNye: string;
      tocquevilleNye: string;
    };
  };
  gattopardoCitylife: {
    gattopardoDetail: string;
    voyaDetail: string;
    fiftyFiveRepvblicDetail: string;
    tierRows: [string, string, string, string][];
    ctas: {
      gattopardoClub: string;
      gattopardoNye: string;
      voyaClub: string;
      repvblicNye: string;
      fiftyFiveNye: string;
    };
  };
  reggaetonNavigliSanSiro: {
    gateAriaDetail: string;
    navigliEastDetail: string;
    gardaTomDetail: string;
    bullets: [string, string, string, string, string, string, string, string];
    ctas: {
      reggaetonHub: string;
      gateNye: string;
      ariaClub: string;
      bobinoNye: string;
      magazziniNye: string;
      gardaNye: string;
    };
  };
  doorPolicyAndClosed: {
    dressCodeDetail: string;
    allMaleBottleDetail: string;
    closedAlertDetail: string;
    checklist: string[];
    closedRows: [string, string, string][];
    fabriqueNyeCta: string;
    ceresioNyeCta: string;
  };
  conciergeAndTransit: {
    conciergeDetail: string;
    metroParkingDetail: string;
    termeCrossLink: string;
    steps: string[];
    nyeHubCta: string;
    termeGuideCta: string;
    whatsappCta: string;
  };
  tableLabels: {
    thVenue: string;
    thDistrict: string;
    thMusic: string;
    thDressCode: string;
    thRates2027: string;
    thStatus: string;
    thFormula: string;
    thWeeklyRef: string;
    thNye2027: string;
    thClosedVenue: string;
    thClosedStatus: string;
    thOpenAlt: string;
    statusConfirmed: string;
    statusBenchmark: string;
    statusTba: string;
    statusClosed: string;
    justMeRates: string;
    pinetaRates: string;
    voyaRates: string;
    repvblicRates: string;
    bischeriRates: string;
    gateRates: string;
    pelledocaRates: string;
    bobinoRates: string;
    magazziniRates: string;
    theClubRates: string;
    ariaRates: string;
    fiftyFiveRates: string;
    hollywoodRates: string;
    elevenRates: string;
    tocquevilleRates: string;
    tomRates: string;
    gattopardoRates: string;
    gardaRates: string;
    dressSmartChic: string;
    dressBlackTie: string;
    dressUrbanChic: string;
    dressEveningElegance: string;
  };
  faqs: [string, string][];
}

export type PartialClubbingMap = Partial<Record<LocaleCode, ClubbingLocalePack>>;
