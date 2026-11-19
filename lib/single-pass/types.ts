import type { LocaleCode } from '@/lib/i18n/locales';

export type SinglePassVenueId =
  | 'gate'
  | 'pineta'
  | 'repvblic'
  | 'justme'
  | 'bischeri'
  | 'bobino'
  | 'voya'
  | 'justme-garda'
  | 'voya-christmas'
  | 'justme-orthodox'
  | 'justme-thanksgiving'
  | 'justme-partenopea'
  | 'terrazza-duomo-21'
  | 'stk-milan'
  | 'radio-rooftop'
  | 'barchetta-como'
  | 'terminus-como'
  | 'atmosfera-tram'
  | 'alcatraz'
  | 'black-hole'
  | 'blue-note'
  | 'magazzini-generali'
  | 'mib-milano'
  | 'pelledoca'
  | 'the-club'
  | 'the-dome'
  | 'tempio-futuro-perduto'
  | 'teatro-scala'
  | 'teatri-milano'
  | 'teatro-manzoni'
  | 'teatro-lirico'
  | 'teatro-nazionale'
  | 'terme-sirmione'
  | 'le-rotonde'
  | 'mascara-mantova'
  | 'bobadilla'
  | 'coco-beach'
  | 'livigno-kosmo-stalet'
  | 'orsa-maggiore'
  | 'villa-fenaroli'
  | 'sheraton-san-siro'
  | 'club-event';

export type SinglePassPackageCategory =
  | 'all-night-combo'
  | 'vip-table-share'
  | 'gala-dinner'
  | 'royal-buffet'
  | 'club-entry'
  | 'vip-table-full'
  | 'holiday-special';

export type PriceBreakdown = {
  unitBaseCents: number;
  unitFeeCents: number;
  unitTotalCents: number;
  lineBaseCents: number;
  lineFeeCents: number;
  lineTotalCents: number;
};

export type SinglePassVenueSpec = {
  id: SinglePassVenueId;
  eventSlug: string;
  partner: boolean;
  name: string;
  taglineIt: string;
  taglineEn: string;
  district: string;
  address: string;
  hours: string;
  ageBandLabelIt: string;
  ageBandLabelEn: string;
  recommendedMinAge: number;
  recommendedMaxAge: number;
  strictMaxAge: number | null;
  musicIt: string;
  musicEn: string;
  dressCodeIt: string;
  dressCodeEn: string;
  posterSrc: string;
};

export type SinglePassSku = {
  id: string;
  venueId: SinglePassVenueId;
  category: SinglePassPackageCategory;
  featured?: boolean;
  titleIt: string;
  titleEn: string;
  descriptionIt: string;
  descriptionEn: string;
  arrivalTime: string;
  basePriceCents: number;
  feeRate?: number;
  guestsPerUnit: number;
  genderPolicy: 'equal';
  requiresDietary?: boolean;
  dietaryPreset?: string;
  floorGroup?: 'f1' | 'f5';
  tableAddon?: {
    floorGroup: 'f1' | 'f5';
    maxGuestsPerTable: number;
  };
  maxQuantityPerOrder?: number;
  eventSlugOverride?: string;
  eventDateLabel?: string;
  venueNameOverride?: string;
  confirmed?: true;
};

export type SinglePassCartItemInput = {
  skuId: string;
  quantity: number;
  channel?: 'single-pass' | 'venue';
  dietaryChoice?: string;
  addedFromPath?: string;
  addedFromTitle?: string;
};

export type SinglePassOrderItem = {
  skuId: string;
  venueId: SinglePassVenueId;
  venueName: string;
  eventSlug: string;
  channel?: 'single-pass' | 'venue';
  category: SinglePassPackageCategory;
  title: string;
  arrivalTime: string;
  dietaryChoice?: string;
  guestsPerUnit: number;
  totalGuests: number;
  addedFromPath?: string;
  addedFromTitle?: string;
  unitBaseCents: number;
  unitFeeCents: number;
  unitTotalCents: number;
  feeRate?: number;
  quantity: number;
  lineBaseCents: number;
  lineFeeCents: number;
  lineTotalCents: number;
};

export type SinglePassOrderStatus =
  | 'awaiting_payment'
  | 'paid'
  | 'cancelled'
  | 'expired';

export type WhatsappMiniGroupStatus =
  | 'scheduled_dec_20'
  | 'invited'
  | 'active';

export type SinglePassCustomerInfo = {
  fullName: string;
  email: string;
  whatsapp: string;
  age: number;
  country?: string;
  spokenLanguages: string[];
  dietaryNotes?: string;
};

export type OrderAttribution = {
  firstLandingPath: string;
  firstLandingAt: string;
  initialReferrer: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  clickId?: string;
  addedFromPaths: string[];
  checkoutPath: string;
  journeyPaths: string[];
  ipCountry?: string;
  ipCity?: string;
  userAgent?: string;
  deviceType?: 'mobile' | 'desktop';
  browserLanguage?: string;
};

export type SinglePassOrder = {
  id: string;
  accessPin: string;
  memberId: string;
  status: SinglePassOrderStatus;
  createdAt: string;
  updatedAt: string;
  paidAt: string | null;
  locale: LocaleCode;
  customer: SinglePassCustomerInfo;
  items: SinglePassOrderItem[];
  totalHeadcount: number;
  subtotalBaseCents: number;
  feeRate: number;
  feeCents: number;
  totalCents: number;
  currency: 'eur';
  presentmentCurrency: string;
  presentmentSubtotalMinor: number;
  presentmentFeeMinor: number;
  presentmentTotalMinor: number;
  fxRate: number;
  fxTimestamp: string;
  stripeSessionId: string | null;
  stripePaymentIntentId: string | null;
  stripeCheckoutUrl: string | null;
  whatsappGroupStatus: WhatsappMiniGroupStatus;
  whatsappGroupInviteUrl: string | null;
  attribution?: OrderAttribution;
  confirmationEmailSentAt: string | null;
  emailDeliveryError: string | null;
  staffEmailSentAt?: string | null;
  staffEmailError?: string | null;
};

export type SinglePassMember = {
  id: string;
  email: string;
  fullName: string;
  whatsapp: string;
  age: number;
  country?: string;
  spokenLanguages: string[];
  dietaryNotes?: string;
  passwordSalt?: string;
  passwordHash?: string;
  orderIds: string[];
  createdAt: string;
  updatedAt: string;
};

export type SinglePassOrderSummary = {
  id: string;
  email: string;
  fullName: string;
  whatsapp: string;
  age: number;
  country?: string;
  spokenLanguages: string[];
  venueIds: SinglePassVenueId[];
  itemSummary: string;
  totalHeadcount?: number;
  subtotalBaseCents: number;
  feeCents: number;
  totalCents: number;
  presentmentCurrency?: string;
  presentmentTotalMinor?: number;
  fxRate?: number;
  firstLandingPath?: string;
  addedFromPaths?: string[];
  initialReferrer?: string;
  utmSource?: string;
  utmCampaign?: string;
  status: SinglePassOrderStatus;
  whatsappGroupStatus: WhatsappMiniGroupStatus;
  whatsappGroupInviteUrl: string | null;
  createdAt: string;
  paidAt: string | null;
};

export type StripeVaultConfig = {
  secretKey: string;
  webhookSecret: string;
  accountId: string;
  livemode: boolean;
  webhookEndpointId?: string;
  updatedAt: string;
};

export type StripeCredentialStatus = {
  configured: boolean;
  source: 'env' | 'vault' | 'none';
  accountId: string | null;
  livemode: boolean | null;
  maskedKey: string | null;
  webhookConfigured: boolean;
};

export type SinglePassApiErrorCode =
  | 'ORIGIN_FORBIDDEN'
  | 'INVALID_JSON'
  | 'EMPTY_CART'
  | 'INVALID_SKU'
  | 'INVALID_CUSTOMER_DATA'
  | 'UNDER_18'
  | 'UNDER_21_JUSTME'
  | 'PINETA_STRICT_UNDER_30'
  | 'TABLE_REQUIRES_FORMULA'
  | 'TABLE_MAX_GUESTS_EXCEEDED'
  | 'DIETARY_NOTES_REQUIRED'
  | 'TERMS_REQUIRED'
  | 'INVALID_PASSWORD'
  | 'INVALID_CREDENTIALS'
  | 'ORDER_NOT_FOUND'
  | 'UNAUTHORIZED'
  | 'PAYMENT_SESSION_ERROR'
  | 'PAYMENT_NOT_CONFIRMED'
  | 'INTERNAL_ERROR';
