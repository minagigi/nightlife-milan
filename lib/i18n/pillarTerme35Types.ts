import type { LocaleCode } from './localeRegistry';

export interface TermeLocalePack {
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
  sirmione: {
    overview: string;
    packageDetail: string;
    ritualsNote: string;
    etiquetteNote: string;
    inclusions: string[];
    packingList: string[];
    ctaLabel: string;
    scheduleRows: [string, string, string][];
  };
  qcTerme: {
    waitlistPolicy: string;
    milano: string;
    sanPellegrino: string;
    bormio: string;
    waitlistProtocol: string[];
    milanoCta: string;
    sanPellegrinoCta: string;
    bormioCta: string;
  };
  garda: {
    pairingLogic: string;
    justMeDetail: string;
    transferNote: string;
    highlights: string[];
    ctaLabel: string;
  };
  como: {
    overview: string;
    terminus: string;
    barchetta: string;
    palaceNote: string;
    highlights: string[];
    terminusCta: string;
    barchettaCta: string;
  };
  milanAlts: {
    overview: string;
    voya: string;
    justMePineta: string;
    highlights: string[];
    voyaCta: string;
    justMeCta: string;
    pinetaCta: string;
    clubGuideCta: string;
  };
  logistics: {
    bookingProtocol: string;
    bookingSteps: string[];
    transitSirmione: string;
    transitComoValtellina: string;
    hubLinkNote: string;
    categoryCta: string;
    whatsappCta: string;
  };
  labels: {
    thSpa: string;
    thProvince: string;
    thStatus: string;
    thOfficialRate: string;
    thIncluded: string;
    thLink: string;
    thTime: string;
    thActivity: string;
    thNotes: string;
    statusConfirmed: string;
    statusTba: string;
    statusSoldOut: string;
    statusPartner: string;
    rowSirmioneIncl: string;
    rowQcMiIncl: string;
    rowQcSpIncl: string;
    rowQcBoIncl: string;
    rowTerminusIncl: string;
    rowBarchettaIncl: string;
    rowPalaceIncl: string;
    rowVoyaIncl: string;
    rowJustMeMiIncl: string;
    rowPinetaIncl: string;
    tbaLabel: string;
    soldOutLabel: string;
    waitlistAction: string;
    bookAction: string;
  };
  faqs: [string, string][];
}

export type PartialTermeMap = Partial<Record<LocaleCode, TermeLocalePack>>;
