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
  | 'jazz-cafe'
  | 'magazzini-generali'
  | 'mib-milano'
  | 'pelledoca'
  | 'the-club'
  | 'the-dome'
  | 'tempio-futuro-perduto'
  | 'teatro-scala'
  | 'teatri-milano'
  | 'teatro-manzoni'
  | 'terme-sirmione'
  | 'le-rotonde'
  | 'mascara-mantova'
  | 'bobadilla'
  | 'coco-beach'
  | 'livigno-kosmo-stalet'
  | 'orsa-maggiore'
  | 'villa-fenaroli'
  | 'sheraton-san-siro'
  | 'mood-live-garden'
  | 'carro-social-club'
  | 'terrazza-gallia'
  | 'the-beach'
  | 'zelig-cabaret'
  | 'dazi-milano'
  | 'aprica-world-winter-week'
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
  | 'payment_failed'
  | 'paid'
  | 'cancelled'
  | 'expired';

export type PaymentFailureRecord = {
  at: string;
  code?: string;
  declineCode?: string;
  type?: string;
  message: string;
  paymentIntentId?: string | null;
  source: 'client_confirm' | 'checkout_init' | 'webhook' | 'gateway_sync';
};

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
  failedAt?: string | null;
  paymentAttempts?: number;
  lastPaymentError?: PaymentFailureRecord | null;
  paymentFailures?: PaymentFailureRecord[];
  cartSessionId?: string | null;
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
  channels?: Array<'single-pass' | 'venue'>;
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
  failedAt?: string | null;
  paymentAttempts?: number;
  lastPaymentError?: PaymentFailureRecord | null;
  cartSessionId?: string | null;
};

export type CartDraftCustomer = {
  fullName?: string;
  email?: string;
  whatsapp?: string;
  age?: number;
  country?: string;
};

export type AbandonedCartRecord = {
  cartSessionId: string;
  stage: 'cart' | 'checkout_form';
  createdAt: string;
  updatedAt: string;
  convertedOrderId: string | null;
  clearedAt: string | null;
  locale: LocaleCode;
  items: SinglePassOrderItem[];
  venueIds: SinglePassVenueId[];
  channels: Array<'single-pass' | 'venue'>;
  itemSummary: string;
  totalHeadcount: number;
  subtotalBaseCents: number;
  feeCents: number;
  totalCents: number;
  presentmentCurrency: string;
  presentmentTotalMinor: number;
  customer?: CartDraftCustomer;
  lastValidationError?: string | null;
  attribution?: Partial<OrderAttribution>;
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

export type CheckoutFieldKey =
  | 'fullName'
  | 'email'
  | 'whatsapp'
  | 'age'
  | 'country'
  | 'password'
  | 'acceptedTerms'
  | 'cart';

export type SinglePassApiErrorCode =
  | 'ORIGIN_FORBIDDEN'
  | 'INVALID_JSON'
  | 'EMPTY_CART'
  | 'INVALID_SKU'
  | 'VENUE_BOOKING_EXTERNAL_ONLY'
  | 'VENUE_DIRECT_CHECKOUT_DISABLED'
  | 'INVALID_CUSTOMER_DATA'
  | 'INVALID_FULL_NAME'
  | 'INVALID_EMAIL'
  | 'INVALID_WHATSAPP'
  | 'INVALID_COUNTRY'
  | 'UNDER_18'
  | 'UNDER_21_JUSTME'
  | 'PINETA_STRICT_UNDER_30'
  | 'TABLE_REQUIRES_FORMULA'
  | 'TABLE_MAX_GUESTS_EXCEEDED'
  | 'APRICA_HALF_BOARD_REQUIRES_HOTEL'
  | 'APRICA_HALF_BOARD_MAX_EXCEEDED'
  | 'APRICA_BUS_REQUIRES_PACKAGE'
  | 'APRICA_BUS_MAX_EXCEEDED'
  | 'DIETARY_NOTES_REQUIRED'
  | 'TERMS_REQUIRED'
  | 'INVALID_PASSWORD'
  | 'INVALID_CREDENTIALS'
  | 'ORDER_NOT_FOUND'
  | 'UNAUTHORIZED'
  | 'PAYMENT_SESSION_ERROR'
  | 'PAYMENT_NOT_CONFIRMED'
  | 'INVALID_CART_SESSION'
  | 'PAYLOAD_TOO_LARGE'
  | 'INTERNAL_ERROR';
