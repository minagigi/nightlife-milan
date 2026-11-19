import type { Metadata } from 'next';
import EventVenueMap from '@/components/EventVenueMap';
import SeoAuthorityHub from '@/components/SeoAuthorityHub';
import SinglePassStorefront from '@/components/single-pass/SinglePassStorefront';
import { SITE_CONTACT } from '@/config/contact';
import { getEventVenueCopy } from '@/lib/i18n/eventVenueCopy';
import {
  DEFAULT_LOCALE,
  canonicalPageUrl,
  enabledLocaleCodes,
  getLocaleDef,
  hreflangAlternatesForLocales,
  type LocaleCode,
} from '@/lib/i18n/locales';
import { seoTitle } from '@/lib/seoMetadata';
import {
  SINGLE_PASS_SKUS,
  STOREFRONT_VENUES,
  computeSinglePassPrice,
} from '@/lib/single-pass/catalog';
import { getSinglePassCopy } from '@/lib/single-pass/i18n35';

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
      images: [{ url: ogImageUrl, width: 1376, height: 768, alt: copy.heroH1 }],
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
  const venueMapCopy = getEventVenueCopy(loc);
  const isIt = loc === 'it';
  const canonical = canonicalPageUrl(SITE_URL, loc, '/single-pass');

  const faqs = isIt
    ? [
        {
          q: 'Come funziona il Single Pass Capodanno Milano 2027 per chi viene da solo?',
          a: 'Scegli uno o più pacchetti tra i locali ufficiali confermati per fascia d’età, li aggiungi al carrello e completi il pagamento sicuro con carta direttamente su questo sito. Ricevi subito l’accesso alla tua Area Riservata e dal 20 dicembre 2026 entri nel mini-gruppo WhatsApp dedicato.',
        },
        {
          q: 'Posso pagare direttamente sul sito nella mia valuta?',
          a: 'Sì. I prezzi finali in Euro vengono convertiti automaticamente in tempo reale nella tua valuta locale al checkout. Il pagamento avviene direttamente all’interno delle nostre pagine protette con carta, Apple Pay o Google Pay.',
        },
        {
          q: 'Cosa include l’acquisto del Single Pass Nightlife Milan?',
          a: 'Ogni pacchetto include l’accesso ufficiale al locale scelto, l’abbinamento per fascia d’età e lingua, il mini-gruppo WhatsApp attivo dal 20 dicembre e il coordinamento all’ingresso in Lista o Tavolo NIGHTLIFE MILAN.',
        },
        {
          q: 'Esiste uno sconto o incentivo donna sui pacchetti Single Pass?',
          a: 'No. Tutti i pacchetti hanno esattamente la stessa quota per uomini e donne per mantenere tavoli equilibrati, trasparenti e senza distinzioni di genere.',
        },
        {
          q: 'Chi ha più di 30 anni può acquistare il Single Pass al Pineta Milano?',
          a: 'No. Pineta Milano applica una selezione rigorosamente Under 30 (18–29 anni). Il carrello e il checkout bloccano gli acquisti 30+ su Pineta proponendo Just Me (30–49), REPVBLIC (22–40), Voya Rooftop o Bischeri Over 50.',
        },
      ]
    : [
        {
          q: 'How does the Milan NYE 2027 Single Pass work for solo guests?',
          a: 'Choose your club by age bracket among our confirmed-price venues, add any package to the cart, and check out with secure card payment directly inside nightlifemilan.com. You gain immediate Reserved Area access and join the venue WhatsApp mini-group from December 20, 2026.',
        },
        {
          q: 'Can I pay directly on nightlifemilan.com in my local currency?',
          a: 'Yes. Final Euro prices convert live at checkout into your preferred currency using official reference rates. Card, Apple Pay, and Google Pay payments are completed right inside our checkout without external redirects.',
        },
        {
          q: 'What is included with every Nightlife Milan Single Pass?',
          a: 'Every package includes official entry to your selected venue, age and language table matching, December 20 WhatsApp mini-group access, and dedicated arrival coordination under Lista / Tavolo NIGHTLIFE MILAN.',
        },
        {
          q: 'Is there any discounted rate or incentive for women?',
          a: 'No. Every Single Pass package is priced identically for men and women across every dinner, VIP table share, buffet, and club admission tier.',
        },
        {
          q: 'Can guests aged 30+ book Pineta Milano Moulin Rouge NYE?',
          a: 'No. Pineta enforces a strict Under 30 (18–29) door policy. Ages 30+ are automatically guided during checkout toward Just Me Torre Branca (30–49), REPVBLIC (22–40), Voya Rooftop, or Bischeri Over 50.',
        },
      ];

  const schemaGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        name: copy.seoTitle,
        description: copy.seoDescription,
        url: canonical,
      },
      {
        '@type': 'ItemList',
        name: copy.heroH1,
        itemListElement: SINGLE_PASS_SKUS.map((sku, idx) => {
          const p = computeSinglePassPrice(sku.basePriceCents, 1);
          return {
            '@type': 'ListItem',
            position: idx + 1,
            item: {
              '@type': 'Product',
              name: isIt ? sku.titleIt : sku.titleEn,
              description: isIt ? sku.descriptionIt : sku.descriptionEn,
              offers: {
                '@type': 'Offer',
                price: (p.unitTotalCents / 100).toFixed(2),
                priceCurrency: 'EUR',
                availability: 'https://schema.org/InStock',
              },
            },
          };
        }),
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      <SinglePassStorefront locale={loc} />

      {/* Milan Age Map & Venue Matrix (#F6F1E7 Paper Surface) */}
      <section className="border-b border-[#050505]/15 bg-[#F6F1E7] px-4 py-12 text-[#050505] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-6">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#3D3830]">
              MILANO · CONFIRMED VENUES BY AGE GROUP
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-[#050505]">
              {isIt
                ? 'Tabella comparativa dei locali confermati di Capodanno 2027'
                : 'Confirmed-Price NYE 2027 Venues Age Matrix & Map'}
            </h2>
          </div>

          <div className="overflow-x-auto border border-[#050505]/20 bg-[#EFE9DC]">
            <table className="w-full min-w-[780px] text-left text-xs sm:text-sm">
              <thead className="bg-[#050505] text-[#F6F1E7]">
                <tr>
                  <th className="p-3.5 font-serif">Locale</th>
                  <th className="p-3.5 font-serif">{isIt ? 'Fascia Età' : 'Age Target'}</th>
                  <th className="p-3.5 font-serif">Format &amp; Musica</th>
                  <th className="p-3.5 font-serif">Zona</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#050505]/15">
                {STOREFRONT_VENUES.map((v) => (
                  <tr key={v.id}>
                    <td className="p-3.5 font-bold">{v.name}</td>
                    <td className="p-3.5 font-mono text-xs">{isIt ? v.ageBandLabelIt : v.ageBandLabelEn}</td>
                    <td className="p-3.5">{isIt ? v.musicIt : v.musicEn}</td>
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
              mapTitle: 'Nightlife Milan Single Pass Capodanno 2027 Map',
              privacyLoadNotice: venueMapCopy.privacyLoadNotice,
            }}
          />
        </div>
      </section>

      {/* FAQs & Detailed Guide (#050505 Dark Surface) */}
      <section id="faq-single-pass" className="border-b border-[#F6F1E7]/14 bg-[#050505] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-6">
          <h2 className="font-serif text-3xl font-bold text-[#F6F1E7]">
            {isIt ? 'Domande frequenti Single Pass & Condizioni Ufficiali' : 'Single Pass FAQs & Official Policy'}
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {faqs.map((faq) => (
              <div key={faq.q} className="border border-[#F6F1E7]/16 bg-[#0B0A09] p-5">
                <h3 className="font-serif text-lg font-bold text-[#F6F1E7]">{faq.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#C2B9AA]">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="border border-[#F6F1E7]/16 bg-[#0B0A09] p-6 text-sm leading-relaxed text-[#C2B9AA]">
            <h3 className="font-serif text-xl font-bold text-[#F6F1E7]">
              {isIt
                ? 'Nightlife Milan · E-Commerce Ufficiale Prezzi Confermati'
                : 'Nightlife Milan · Official Confirmed-Price E-Commerce'}
            </h3>
            <p className="mt-2">
              {isIt
                ? `Festeggiare San Silvestro o una serata speciale a Milano quando si è da soli oppure in due amici significa poter accedere solo a formule ufficiali confermate. Su nightlifemilan.com trovi i prezzi finali a persona in Euro, convertibili al checkout nella tua valuta con pagamento sicuro con carta. Assistenza 24/7: ${SITE_CONTACT.whatsapp.number} · concierge@nightlifemilan.com.`
                : `Celebrating New Year’s Eve or flagship Milan nightlife dates on nightlifemilan.com guarantees verified official packages only. Every eligible ticket displays the final per-person Euro price converted live at checkout with secure card payment, backed by 24/7 WhatsApp concierge support on ${SITE_CONTACT.whatsapp.number} and concierge@nightlifemilan.com.`}
            </p>
          </div>
        </div>
      </section>

      <SeoAuthorityHub lang={loc} />
    </main>
  );
}
