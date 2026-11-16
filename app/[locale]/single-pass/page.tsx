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
  SINGLE_PASS_VENUES,
  computeSinglePassPrice,
} from '@/lib/single-pass/catalog';
import { getSinglePassCopy } from '@/lib/single-pass/i18n35';

export const revalidate = 600;

const SITE_URL = 'https://nightlifemilan.com';
const HERO_POSTER_PATH = SINGLE_PASS_VENUES[0].posterSrc;

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
          q: 'Come funziona esattamente il Single Pass Capodanno Milano 2027 per chi viene da solo?',
          a: 'Scegli uno o più pacchetti tra i 6 locali selezionati per fascia d’età, li aggiungi al carrello e completi il pagamento 100% su Stripe (+15% Booking, Concierge Service & Entry Fee). Subito dopo ricevi l’accesso alla tua Area Riservata e dal 20 dicembre 2026 in poi entri nel mini-gruppo WhatsApp ufficiale del tuo locale e della tua età.',
        },
        {
          q: 'Perché viene applicato il +15% di Booking, Concierge Service & Entry Fee su Stripe?',
          a: 'Il supplemento fisso del +15% su Stripe copre gestione prenotazione, selezione manuale per fascia d’età e lingua, apertura e moderazione del mini-gruppo WhatsApp dal 20 dicembre, e accoglienza dedicata al locale in Lista o Tavolo NIGHTLIFE MILAN.',
        },
        {
          q: 'Esiste uno sconto o incentivo donna sui pacchetti Single Pass?',
          a: 'No. Tutti i pacchetti Single Pass hanno lo stesso identico prezzo per uomini e donne su tutte le formule (All-Night, Quote Tavolo VIP Condiviso, Cenone Social, Royal Buffet e Ingresso Club) per garantire tavoli equilibrati e chiari.',
        },
        {
          q: 'Quando apre il mini-gruppo WhatsApp ufficiale?',
          a: 'Tutti i mini-gruppi WhatsApp dei tavoli e delle liste Single Pass aprono a partire dal 20 dicembre 2026 in poi sui numeri WhatsApp verificati durante il checkout Stripe.',
        },
        {
          q: 'Chi ha più di 30 anni può acquistare il Single Pass al Pineta Milano?',
          a: 'No. Pineta Milano applica una selezione rigorosamente Under 30 (18–29 anni). Il carrello e il checkout bloccano gli acquisti 30+ su Pineta proponendo subito Just Me (30–49), 55 Milano (30–50), REPVBLIC (22–40) o Bischeri Over 50.',
        },
      ]
    : [
        {
          q: 'How does the Milan NYE 2027 Single Pass work for solo guests?',
          a: 'Choose your club by age bracket among our 6 official venues, add any package to the cart and pay 100% via Stripe (+15% Booking, Concierge Service & Entry Fee). You gain immediate access to your Reserved Area pass and join the official venue WhatsApp mini-group from December 20, 2026 onwards.',
        },
        {
          q: 'What does the +15% Booking, Concierge Service & Entry Fee include?',
          a: 'The transparent 15% Stripe service fee covers reservation handling, age-bracket and language table curation, December 20 WhatsApp mini-group onboarding, and dedicated Lista / Tavolo NIGHTLIFE MILAN entrance hosting.',
        },
        {
          q: 'Are there female discounts or free guest-list incentives on Single Passes?',
          a: 'No. Every Single Pass package has identical pricing for men and women across shared VIP tables, served gala dinners, buffets and club admission.',
        },
        {
          q: 'When do the official WhatsApp mini-groups launch?',
          a: 'All official WhatsApp mini-groups open from December 20, 2026 onwards using the verified WhatsApp phone number saved in your Stripe order and Reserved Area.',
        },
        {
          q: 'Which club should guests aged 50+ or 30+ choose instead of Pineta?',
          a: 'Pineta Milano strictly enforces an Under 30 (18–29) door policy. Guests 30–49 match Just Me, 55 Milano or REPVBLIC (22–40), while Bischeri Milano features a dedicated Over 50 social table and DJ Gigi Zeus party.',
        },
      ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: copy.navShopLabel, item: canonical },
        ],
      },
      {
        '@type': 'ItemList',
        name: copy.heroH1,
        description: copy.seoDescription,
        numberOfItems: SINGLE_PASS_SKUS.length,
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
                url: canonical,
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <SinglePassStorefront locale={loc} />

      {/* Editorial Comparison & Milan Club Map (Alternating Surface #F6F1E7 -> #050505) */}
      <section
        id="mappa-milano-single-pass"
        data-surface="ivory"
        className="border-b border-[#050505]/15 bg-[#F6F1E7] px-4 py-12 text-[#050505] sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-6xl space-y-6">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#3D3830]">
              GUIDA COMPLETA PER FASCIA D’ETÀ · MILANO 31/12/2026
            </p>
            <h2 className="mt-1 font-serif text-3xl font-bold text-[#050505]">
              {isIt
                ? 'Confronto dei 6 locali e mappa dei quartieri di Capodanno 2027'
                : '6-Venue Age Guide & Milan NYE 2027 Locations Map'}
            </h2>
          </div>

          <div className="overflow-x-auto border border-[#050505]/20 bg-[#EFE9DC]">
            <table className="w-full min-w-[780px] text-left text-xs sm:text-sm">
              <thead className="bg-[#050505] text-[#F6F1E7]">
                <tr>
                  <th className="p-3.5 font-serif">Locale</th>
                  <th className="p-3.5 font-serif">{isIt ? 'Fascia Età' : 'Age Target'}</th>
                  <th className="p-3.5 font-serif">Format & Musica</th>
                  <th className="p-3.5 font-serif">Zona</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#050505]/15">
                {SINGLE_PASS_VENUES.map((v) => (
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
            {isIt ? 'Domande frequenti Single Pass & Regolamento Stripe' : 'Single Pass FAQs & Stripe Policy'}
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
                ? 'Perché scegliere il Single Pass Ufficiale Nightlife Milan rispetto ai biglietti casuali'
                : 'Why book the Official Nightlife Milan Single Pass instead of random tickets'}
            </h3>
            <p className="mt-2">
              {isIt
                ? `Festeggiare San Silvestro a Milano quando si è da soli oppure in due amici che non raggiungono la quota di un tavolo privato non significa doversi accontentare dell’ingresso anonimo o finire in un locale fuori età. Attraverso lo shop e-commerce di Nightlife Milan hai a disposizione sei esperienze complete e curate dall’apericena al Gran Cenone servito, dalle quote nei tavoli VIP Privé condivisi fino all’ingresso club guidato. Ogni pagamento è gestito tramite Stripe con la maggiorazione fissa trasparente del +15% per Booking, Concierge Service e Entry Fee, senza alcuna differenza tra quota uomo e quota donna. Dal 20 dicembre 2026 attiviamo i mini-gruppi WhatsApp ufficiali per ciascun locale così nessuno arriva da solo alle porte del Gate Milano, del Pineta Under 30, del REPVBLIC internazionale, del Just Me Torre Branca, del 55 Milano o della tavolata Over 50 da Bischeri Milano.`
                : `Spending New Year’s Eve in Milan solo or as a duo who do not fill an entire private bottle booth should never mean entering an age-mismatched room alone. Through Nightlife Milan’s official Single Pass e-commerce platform, you can reserve shared VIP table shares, served five-course social dinners, royal buffets or group club entries across six curated clubs segmented strictly by age band and music vibe. All transactions process exclusively via Stripe with an explicit +15% Booking, Concierge Service & Entry Fee and equal male/female pricing. Starting December 20, 2026 onwards, our team activates dedicated WhatsApp mini-groups per venue and language so guests connect ahead of December 31 and walk in together under Lista / Tavolo NIGHTLIFE MILAN. Concierge 24/7: ${SITE_CONTACT.whatsapp.number} · concierge@nightlifemilan.com.`}
            </p>
          </div>
        </div>
      </section>

      <SeoAuthorityHub lang={loc} />
    </main>
  );
}
