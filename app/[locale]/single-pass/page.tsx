import type { Metadata } from 'next';
import EventVenueMap from '@/components/EventVenueMap';
import Link from '@/components/LocalizedLink';
import SeoAuthorityHub from '@/components/SeoAuthorityHub';
import SinglePassStorefront from '@/components/single-pass/SinglePassStorefront';
import { getEventVenueCopy } from '@/lib/i18n/eventVenueCopy';
import {
  DEFAULT_LOCALE,
  canonicalPageUrl,
  enabledLocaleCodes,
  getLocaleDef,
  hreflangAlternatesForLocales,
  localePrefix,
  type LocaleCode,
} from '@/lib/i18n/locales';
import { generatePageBreadcrumbSchema, jsonLdString } from '@/lib/seo';
import { seoTitle } from '@/lib/seoMetadata';
import {
  SINGLE_PASS_SKUS,
  STOREFRONT_VENUES,
} from '@/lib/single-pass/catalog';
import { getSinglePassCopy, localizeSinglePassSku } from '@/lib/single-pass/i18n35';
import {
  getSinglePassPageExtras35,
  localizeVenueAgeRange35,
  localizeVenueMusic35,
} from '@/lib/single-pass/pageCopy35';
import { getVoyaNyeContent } from '@/lib/capodanno/voya35';

export const revalidate = 600;

const SITE_URL = 'https://nightlifemilan.com';
const HERO_POSTER_PATH = STOREFRONT_VENUES[0].posterSrc;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = (getLocaleDef(locale)?.code || DEFAULT_LOCALE) as LocaleCode;
  const copy = getSinglePassCopy(loc);
  const title = seoTitle(copy.seoTitle, 62);
  const description = copy.seoDescription;
  const canonical = canonicalPageUrl(SITE_URL, loc, '/single-pass');
  const languages = hreflangAlternatesForLocales(SITE_URL, '/single-pass', enabledLocaleCodes);
  const ogImageUrl = `${SITE_URL}${HERO_POSTER_PATH}`;

  return {
    title,
    description,
    alternates: { canonical, languages },
    robots: getLocaleDef(loc)?.indexed !== false ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
      images: [{ url: ogImageUrl, width: 1080, height: 1350, alt: copy.heroH1 }],
      type: 'website',
      siteName: 'Nightlife Milan',
      locale: getLocaleDef(loc)?.ogLocale || 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
      site: '@nightlifemilan',
    },
  };
}

export default async function SinglePassPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = (getLocaleDef(locale)?.code || DEFAULT_LOCALE) as LocaleCode;
  const copy = getSinglePassCopy(loc);
  const extras = getSinglePassPageExtras35(loc);
  const venueMapCopy = getEventVenueCopy(loc);
  const canonical = canonicalPageUrl(SITE_URL, loc, '/single-pass');
  const lp = localePrefix(loc);
  const homeHref = lp || '/';

  const rawBreadcrumb = generatePageBreadcrumbSchema(loc, [
    { name: extras.homeBreadcrumbLabel, path: '' },
    { name: copy.navShopLabel, path: '/single-pass' },
  ]) as Record<string, unknown>;
  const { '@context': _breadcrumbContext, ...breadcrumbNode } = rawBreadcrumb;

  const productNodes = SINGLE_PASS_SKUS.filter(
    (sku) =>
      sku.category !== 'vip-table-full' &&
      STOREFRONT_VENUES.some((venue) => venue.id === sku.venueId),
  ).map((sku) => {
    const venue = STOREFRONT_VENUES.find((v) => v.id === sku.venueId);
    const skuUrl = `${canonical}#${sku.id}`;
    const locSku = localizeSinglePassSku(sku, loc, copy, venue?.name);

    return {
      '@type': 'Product',
      '@id': `${canonical}#product-${sku.id}`,
      name: locSku.title,
      description: locSku.description,
      sku: sku.id,
      mpn: sku.id,
      category: copy.categoryLabels[sku.category],
      url: skuUrl,
      image: [`${SITE_URL}${venue?.posterSrc || HERO_POSTER_PATH}`],
      brand: {
        '@type': 'Brand',
        name: 'Nightlife Milan',
      },
      offers: {
        '@type': 'Offer',
        url: skuUrl,
        price: (sku.basePriceCents / 100).toFixed(2),
        priceCurrency: 'EUR',
        priceValidUntil: '2026-12-31',
        itemCondition: 'https://schema.org/NewCondition',
        availability: 'https://schema.org/InStock',
        validFrom: '2026-10-01T00:00:00+02:00',
        seller: {
          '@type': 'Organization',
          name: 'Nightlife Milan',
          url: SITE_URL,
        },
        hasMerchantReturnPolicy: {
          '@type': 'MerchantReturnPolicy',
          applicableCountry: 'IT',
          returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted',
          merchantReturnLink: canonicalPageUrl(SITE_URL, loc, '/refund-policy'),
        },
        shippingDetails: {
          '@type': 'OfferShippingDetails',
          shippingRate: {
            '@type': 'MonetaryAmount',
            value: '0',
            currency: 'EUR',
          },
          shippingDestination: {
            '@type': 'DefinedRegion',
            addressCountry: 'IT',
          },
          deliveryTime: {
            '@type': 'ShippingDeliveryTime',
            handlingTime: {
              '@type': 'QuantitativeValue',
              minValue: 0,
              maxValue: 0,
              unitCode: 'DAY',
            },
            transitTime: {
              '@type': 'QuantitativeValue',
              minValue: 0,
              maxValue: 0,
              unitCode: 'DAY',
            },
          },
        },
      },
    };
  });

  const schemaGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${canonical}#webpage`,
        name: copy.seoTitle,
        description: copy.seoDescription,
        url: canonical,
        inLanguage: loc,
      },
      breadcrumbNode,
      ...productNodes,
      {
        '@type': 'FAQPage',
        '@id': `${canonical}#faq`,
        mainEntity: extras.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#050505] text-[#F6F1E7]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(schemaGraph) }}
      />

      <nav
        aria-label="Breadcrumb"
        className="border-b border-[#F6F1E7]/12 bg-[#050505] px-4 py-3 text-[13px] text-[#C2B9AA] sm:px-6 lg:px-8"
      >
        <ol className="mx-auto flex max-w-6xl flex-wrap items-center gap-2">
          <li>
            <Link href={homeHref} locale={loc} className="text-[#EAE3D5] hover:underline">
              {extras.homeBreadcrumbLabel}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="font-semibold text-[#F6F1E7]">
            {copy.navShopLabel}
          </li>
        </ol>
      </nav>

      <SinglePassStorefront locale={loc} />

      {/* Milan Age Map & Venue Matrix (#F6F1E7 Paper Surface) */}
      <section className="border-b border-[#050505]/15 bg-[#F6F1E7] px-4 py-12 text-[#050505] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-6">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#3D3830]">
              {extras.matrixEyebrow}
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-[#050505]">
              {extras.matrixHeading}
            </h2>
          </div>

          <div className="overflow-x-auto border border-[#050505]/20 bg-[#EFE9DC]">
            <table className="w-full min-w-[780px] text-left text-xs sm:text-sm">
              <thead className="bg-[#050505] text-[#F6F1E7]">
                <tr>
                  <th className="p-3.5 font-serif">{extras.colVenue}</th>
                  <th className="p-3.5 font-serif">{extras.colAge}</th>
                  <th className="p-3.5 font-serif">{extras.colMusic}</th>
                  <th className="p-3.5 font-serif">{extras.colZone}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#050505]/15">
                {STOREFRONT_VENUES.map((v) => (
                  <tr key={v.id}>
                    <td className="p-3.5 font-bold">{v.name}</td>
                    <td className="p-3.5 font-mono text-xs">{localizeVenueAgeRange35(v, loc)}</td>
                    <td className="p-3.5">{localizeVenueMusic35(v, loc)}</td>
                    <td className="p-3.5">{v.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <EventVenueMap
            id="single-pass-milan-map"
            mapUrl="https://www.google.com/maps?q=Milano+Centrale+Parco+Sempione+Navigli&output=embed"
            labels={{
              loadMap: venueMapCopy.loadMap,
              mapTitle: extras.mapTitle,
              privacyLoadNotice: venueMapCopy.privacyLoadNotice,
            }}
          />

          {(() => {
            const voyaContent = getVoyaNyeContent(loc);
            const voyaMenu = voyaContent.menus?.[0];
            if (!voyaMenu) return null;
            return (
              <div
                id="menu-voya-single-pass"
                data-official-menus
                data-lightbox-group="single-pass-voya-menu"
                className="border border-[#050505]/20 bg-[#0B0A09] p-6 text-[#F6F1E7]"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/15 pb-3">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#F6F1E7]">
                      {voyaContent.menusHeading || voyaMenu.title}
                    </h3>
                    <p className="mt-1 text-xs text-[#C2B9AA]">{voyaMenu.subtitle}</p>
                  </div>
                  <span className="bg-[#EAE3D5] px-3 py-1 font-mono text-xs font-bold uppercase text-[#050505]">
                    {voyaMenu.price}
                  </span>
                </div>
                <div className="mt-5 grid gap-6 lg:grid-cols-2 lg:items-start">
                  <div>
                    <dl className="space-y-2.5 text-sm">
                      {voyaMenu.courses.map((c) => (
                        <div key={`sp-voya-${c.course}`} className="border-b border-white/10 pb-2 last:border-0">
                          <dt className="text-xs font-bold uppercase tracking-wider text-[#EAE3D5]">{c.course}</dt>
                          <dd className="mt-0.5 text-sm leading-relaxed text-[#F6F1E7]">{c.dish}</dd>
                        </div>
                      ))}
                    </dl>
                    <p className="mt-3 border border-white/15 bg-[#050505] p-3 text-xs font-medium text-[#C2B9AA]">
                      {voyaMenu.beverages}
                    </p>
                  </div>
                  {voyaMenu.imageSrc && (
                    <div className="flex justify-center">
                      <img
                        src={voyaMenu.imageSrc}
                        alt={voyaMenu.imageAlt}
                        title={voyaMenu.title}
                        width={1080}
                        height={1350}
                        loading="lazy"
                        decoding="async"
                        className="aspect-[4/5] w-full max-w-[400px] object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* FAQs & Detailed Guide (#050505 Dark Surface) */}
      <section id="faq-single-pass" className="border-b border-[#F6F1E7]/14 bg-[#050505] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-6">
          <h2 className="font-serif text-3xl font-bold text-[#F6F1E7]">
            {extras.faqHeading}
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {extras.faqs.map((faq) => (
              <div key={faq.q} className="border border-[#F6F1E7]/16 bg-[#0B0A09] p-5">
                <h3 className="font-serif text-lg font-bold text-[#F6F1E7]">{faq.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#C2B9AA]">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="border border-[#F6F1E7]/16 bg-[#0B0A09] p-6 text-sm leading-relaxed text-[#C2B9AA]">
            <h3 className="font-serif text-xl font-bold text-[#F6F1E7]">
              {extras.officialShopHeading}
            </h3>
            <p className="mt-2">
              {extras.officialShopBody}
            </p>
          </div>
        </div>
      </section>

      <SeoAuthorityHub lang={loc} pageKey="/single-pass" />
    </main>
  );
}
