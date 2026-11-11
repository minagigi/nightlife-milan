import { Metadata } from 'next';
import Link from '@/components/LocalizedLink';
import { tr } from '@/lib/i18n/t';
import { getLocaleDef, hreflangAlternates, localePrefix } from '@/lib/i18n/locales';
import { seoRobots, seoTitle, withWhatsApp } from '@/lib/seoMetadata';
import { Sparkles, CheckCircle2, MessageCircle, Clock, ShieldCheck } from 'lucide-react';
import { EntryFormulaMatrix, VipQuoteCalculator, PrioritySixShowcase } from '@/components/NightlifeExpansionModules';
import Image from 'next/image';
import EditorialPageSections from '@/components/EditorialPageSections';
import type { LocaleCode } from '@/lib/i18n/locales';

export const revalidate = 3600;

const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const canonical = `${baseUrl}${localePrefix(locale)}/guest-lists`;

  const title = seoTitle(
    tr(
      locale,
      'Milan Nightclub Guest Lists 2026/2027 | Nominal Accreditation, Entry Prices & Cut-off Times | Nightlife Milan',
      'Liste Discoteche Milano 2026/2027 | Accredito Nominale, Prezzi Ingresso Ridotto e Orari | Nightlife Milan'
    )
  );
  const description = withWhatsApp(
    tr(
      locale,
      'How to get on the official Guest List (Lista NIGHTLIFE MILAN) for Just Me, Pineta, Aria, 55 Milano, Voya Rooftop & Repvblic. Free accreditation via WhatsApp +39 351 912 7047.',
      'Come accreditarsi in Lista Ufficiale (Lista NIGHTLIFE MILAN) per Just Me, Pineta, Aria, 55 Milano, Voya Rooftop e Repvblic. Accredito gratuito via WhatsApp +39 351 912 7047.'
    ),
    locale
  );

  return {
    title,
    description,
    robots: seoRobots(locale),
    alternates: {
      canonical,
      languages: hreflangAlternates(baseUrl, '/guest-lists'),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
      siteName: 'Nightlife Milan',
      locale: getLocaleDef(locale)?.ogLocale || 'en_US',
      images: [
        {
          url: `${baseUrl}/images/pillars/guest-lists-hero.webp`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/images/pillars/guest-lists-hero.webp`],
    },
  };
}

const VENUE_LIST_RULES = [
  {
    name: '1. Just Me Milano (Torre Branca)',
    aperitivoEn: '19:30 - 22:15 (€20-€25 w/ 1 drink & Royal Buffet)',
    aperitivoIt: '19:30 - 22:15 (20-25 € con 1 drink e Royal Buffet)',
    clubEn: '23:30 - 00:45 (€20-€35 w/ 1 drink)',
    clubIt: '23:30 - 00:45 (20-35 € con 1 drink)',
    dressCodeEn: 'High Fashion & Smart Glamour (Strict door selection)',
    dressCodeIt: 'Alta Moda & Smart Glamour (Selezione rigorosa alla porta)',
  },
  {
    name: '2. Pineta Milano (Porta Garibaldi)',
    aperitivoEn: '19:30 - 22:00 (€15-€20 Singing Aperitivo + Buffet)',
    aperitivoIt: '19:30 - 22:00 (15-20 € Aperitivo Cantato + Buffet)',
    clubEn: '23:30 - 01:00 (Ladies Free/€15 · Men €20-€25 w/ drink)',
    clubIt: '23:30 - 01:00 (Donna Omaggio/15 € · Uomo 20-25 € con drink)',
    dressCodeEn: 'Glamour & Trendy Chic (Collared shirt for men)',
    dressCodeIt: 'Glamour & Trendy Chic (Camicia richiesta per gli uomini)',
  },
  {
    name: '3. Aria Club Milano (San Siro)',
    aperitivoEn: 'Open-Air / Indoor Main Room from 23:30',
    aperitivoIt: 'Giardino / Main Room dalle 23:30',
    clubEn: '23:30 - 01:00 (Ladies €15-€20 · Men €20-€25 w/ drink)',
    clubIt: '23:30 - 01:00 (Donna 15-20 € · Uomo 20-25 € con drink)',
    dressCodeEn: 'Smart Glamour & Contemporary Fashion',
    dressCodeIt: 'Smart Glamour & Moda Contemporanea',
  },
  {
    name: '4. 55 Milano (Arco della Pace)',
    aperitivoEn: '19:30 - 22:30 (€20 w/ 1 drink & Grand Royal Buffet)',
    aperitivoIt: '19:30 - 22:30 (20 € con 1 drink e Grand Royal Buffet)',
    clubEn: '23:00 - 01:00 (€20 w/ 1 drink)',
    clubIt: '23:00 - 01:00 (20 € con 1 drink)',
    dressCodeEn: 'Smart Elegant & Chic',
    dressCodeIt: 'Smart Elegant & Chic',
  },
  {
    name: '5. Voya Rooftop (20th Floor · Portello)',
    aperitivoEn: '19:00 - 22:00 (€20-€25 Sunset Skyline Aperitivo)',
    aperitivoIt: '19:00 - 22:00 (20-25 € Aperitivo Skyline al Tramonto)',
    clubEn: '22:30 - 01:00 (€20 w/ cocktail · Panoramic DJ Set)',
    clubIt: '22:30 - 01:00 (20 € con cocktail · DJ Set Panoramico)',
    dressCodeEn: 'Panoramic Cocktail Attire',
    dressCodeIt: 'Cocktail Chic Panoramico',
  },
  {
    name: '6. Repvblic Milano (Piazza della Repubblica)',
    aperitivoEn: 'Club Doors Open at 23:00 (Mon, Fri, Sat)',
    aperitivoIt: 'Apertura Club alle 23:00 (Lun, Ven, Sab)',
    clubEn: '23:00 - 01:00 (€15-€20 w/ 1 drink)',
    clubIt: '23:00 - 01:00 (15-20 € con 1 drink)',
    dressCodeEn: 'Fashion Forward / Rock Chic on Dirty Mondays',
    dressCodeIt: 'Fashion Forward / Rock Chic il Lunedì (Dirty Monday)',
  },
];

export default async function GuestListsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isIt = locale === 'it';

  const faqs = [
    {
      q: tr(
        locale,
        'How does the NIGHTLIFE MILAN Guest List accreditation work?',
        'Come funziona l’accredito in Lista NIGHTLIFE MILAN?'
      ),
      a: tr(
        locale,
        'Send a WhatsApp message to +39 351 912 7047 with: chosen venue, date, your Full Name + number of women and men (e.g., "List NIGHTLIFE MILAN · Pineta Saturday · Alex Smith + 4 women + 3 men"). Accreditation is free and you pay directly at the club cashier.',
        'Invia un messaggio WhatsApp al +39 351 912 7047 indicando: locale scelto, data, tuo Nome e Cognome + numero di donne e uomini (es. "Lista NIGHTLIFE MILAN · Pineta Sabato · Marco Rossi + 4 donne + 3 uomini"). L’accredito è gratuito e si paga direttamente alla cassa del locale.'
      ),
    },
    {
      q: tr(
        locale,
        'Does being on the guest list guarantee entry for an all-male group?',
        'Essere in lista garantisce l’ingresso se siamo un gruppo di soli uomini?'
      ),
      a: tr(
        locale,
        'No: in Milan, a guest list grants access to the priority line and reduced entry rate, but door selection requires a balanced male/female ratio and proper dress code. For all-male groups (4+ guests), booking a VIP Table is strongly recommended to guarantee entry.',
        'No: a Milano la lista nominale dà diritto alla fila agevolata e alla tariffa ridotta, ma la selezione alla porta richiede gruppi misti uomo/donna e dress code curato. Per gruppi di soli uomini (4+ persone) è sempre raccomandata la prenotazione di un Tavolo VIP per avere l’ingresso garantito.'
      ),
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };

  return (
    <main className="flex-grow pt-24 pb-20 bg-[#050505] text-[#F6F1E7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10"><div className="relative h-64 md:h-80 w-full rounded-2xl overflow-hidden border border-champagne/25"><Image quality={92} src="/images/pillars/guest-lists-hero.webp" alt="Milan Nightclub Guest Lists 2026" title="Milan Nightclub Guest Lists 2026" fill priority sizes="100vw" className="object-cover" /></div></div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-champagne/30 bg-champagne/10 mb-5">
          <Sparkles className="w-3.5 h-3.5 text-champagne" />
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-champagne">
            {isIt ? 'Accredito Ufficiale · Lista NIGHTLIFE MILAN' : 'Official Accreditation · List NIGHTLIFE MILAN'}
          </span>
        </div>

        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-champagne tracking-tighter mb-6">
          {isIt
            ? 'Liste Discoteche Milano 2026/2027: Accredito Nominale, Prezzi e Orari'
            : 'Milan Club Guest Lists 2026/2027: Nominal Accreditation, Prices & Cut-off Times'}
        </h1>
        <p className="text-xl text-white/65 max-w-3xl mb-8">
          {isIt
            ? 'Accreditati gratuitamente nella Lista Ufficiale NIGHTLIFE MILAN per il Royal Aperitivo (19:30–22:15) o per l’ingresso serata (23:30–01:00) nei migliori club e rooftop di Milano.'
            : 'Get free official accreditation on the NIGHTLIFE MILAN Guest List for Royal Aperitivo (19:30–22:15) or Club Night entry (23:30–01:00) at Milan’s premier clubs and rooftops.'}
        </p>

        {/* AI Quick Answer */}
        <div className="max-w-3xl p-6 rounded-2xl border border-champagne/25 bg-champagne/[0.04]">
          <p className="font-mono text-champagne text-[10px] tracking-[0.3em] uppercase mb-2">
            {isIt ? 'Risposta Rapida · Come Funziona la Lista a Milano' : 'Quick Answer · How Milan Guest Lists Work'}
          </p>
          <p className="text-sm text-white/75 leading-relaxed">
            {isIt
              ? 'L’accredito in Lista NIGHTLIFE MILAN è 100% gratuito via WhatsApp (+39 351 912 7047) e consente di accedere alla corsia dedicata pagando la tariffa ridotta direttamente alla cassa del locale (€15–€25 per il Royal Aperitivo 19:30–22:15; €15–€35 per l’ingresso club 23:30–01:00, con omaggio o riduzione donna nei club aderenti). Per gruppi di soli uomini o 5+ persone è consigliato il Tavolo VIP.'
              : 'Accreditation on the NIGHTLIFE MILAN Guest List is 100% free via WhatsApp (+39 351 912 7047) and grants access to the guest-list lane at the reduced door rate (€15–€25 for Royal Aperitivo 19:30–22:15; €15–€35 for Club Entry 23:30–01:00, with complimentary or discounted Ladies entry on select nights). For all-male groups or 5+ guests, a VIP Table is recommended.'}
          </p>
        </div>
      </section>

      {/* Priority 6 Guest List Windows & Prices */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <h2 className="font-serif text-3xl text-white mb-6">
          {isIt
            ? 'Orari Chiusura Liste e Prezzi nei 6 Locali Prioritari'
            : 'Guest List Cut-Off Times & Prices at the Top 6 Priority Venues'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VENUE_LIST_RULES.map((v) => (
            <div
              key={v.name}
              className="p-6 rounded-2xl border border-white/15 bg-white/[0.025] flex flex-col justify-between"
            >
              <div>
                <h3 className="font-serif text-xl text-champagne mb-4">{v.name}</h3>
                <div className="space-y-3 text-xs text-white/75 mb-5">
                  <div className="p-3 rounded-lg bg-black/40 border border-white/10">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-champagne mb-1 flex items-center gap-1.5">
                      <Clock className="w-3 h-3" />
                      {tr(locale, 'Aperitivo Guestlist Window', 'Fascia Aperitivo in Lista')}
                    </div>
                    <div>{tr(locale, v.aperitivoEn, v.aperitivoIt)}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-black/40 border border-white/10">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-champagne mb-1 flex items-center gap-1.5">
                      <Clock className="w-3 h-3" />
                      {tr(locale, 'Nightclub Guestlist Window', 'Fascia Club Dopocena')}
                    </div>
                    <div>{tr(locale, v.clubEn, v.clubIt)}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-black/40 border border-white/10">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-emerald-400 mb-1 flex items-center gap-1.5">
                      <ShieldCheck className="w-3 h-3" />
                      Dress Code
                    </div>
                    <div>{tr(locale, v.dressCodeEn, v.dressCodeIt)}</div>
                  </div>
                </div>
              </div>

              <a
                href={`https://wa.me/393519127047?text=${encodeURIComponent(
                  isIt
                    ? `Ciao Nightlife Milan! Vorrei accreditarmi in Lista NIGHTLIFE MILAN per ${v.name}.`
                    : `Hi Nightlife Milan! I'd like to get on the NIGHTLIFE MILAN Guest List for ${v.name}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-champagne text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{isIt ? 'Mettiti in Lista su WhatsApp' : 'Join Guestlist on WhatsApp'}</span>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Entry Formula Matrix */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <EntryFormulaMatrix locale={locale} />
      </section>

      {/* VIP Quote Calculator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <VipQuoteCalculator locale={locale} />
      </section>

      {/* Priority 6 Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <PrioritySixShowcase locale={locale} />
      </section>

      {/* FAQs */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl text-champagne mb-6">
          {isIt ? 'Domande Frequenti sulle Liste Discoteche' : 'Milan Guest Lists FAQ'}
        </h2>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div key={i} className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
              <h3 className="font-serif text-lg text-white mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-champagne shrink-0" />
                {f.q}
              </h3>
              <p className="text-sm text-white/65 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>
            <EditorialPageSections locale={locale as LocaleCode} path={`${localePrefix(locale)}/guest-lists`} />
      </main>
  );
}
