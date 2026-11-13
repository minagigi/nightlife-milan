import { Metadata } from 'next';
import EditorialPageSections from '@/components/EditorialPageSections';
import type { LocaleCode } from '@/lib/i18n/locales';
import { tr } from '@/lib/i18n/t';
import { getLocaleDef, hreflangAlternates, canonicalPageUrl, localePrefix } from '@/lib/i18n/locales';
import Image from 'next/image';
import { MessageCircle, Star, Clock, Shield, Zap, MapPin, Calendar, CheckCircle } from 'lucide-react';
import { CONTACT } from '@/config/contact';
import { seoRobots, seoTitle, withWhatsApp } from '@/lib/seoMetadata';
import { getHubSeoMeta35 } from '@/lib/i18n/hubSeoMeta35';
import { getConciergeBookingUrl } from '@/lib/conciergeBooking';
import {
  VipQuoteCalculator,
  PrioritySixShowcase,
  DressCodeInstantChecker,
  NeighborhoodCommutePlanner,
} from '@/components/NightlifeExpansionModules';

export const revalidate = 3600;

const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isIt = locale === 'it';
  const canonical = canonicalPageUrl(baseUrl, locale, '/concierge');

  const meta35 = getHubSeoMeta35('concierge', locale);
  const title = seoTitle(meta35.title);
  const description = withWhatsApp(meta35.description, locale);
  const ogImage = `${baseUrl}/images/pillars/concierge-hero.webp`;

  return {
    title,
    description,
    keywords: isIt
      ? ['concierge vita notturna milano', 'prenotazione tavolo milano', 'guestlist milano', 'vip concierge milano', 'assistente nightlife milano']
      : ['milan nightlife concierge', 'milan club booking service', 'vip concierge milan', 'nightlife assistant milan', 'guestlist milan'],
    robots: seoRobots(locale),
    alternates: {
      canonical,
      languages: hreflangAlternates(baseUrl, '/concierge'),
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: canonical,
      siteName: 'Nightlife Milan',
      locale: getLocaleDef(locale)?.ogLocale || 'en_US',
      images: [{ url: ogImage, width: 1200, height: 630, alt: tr(locale, 'Milan nightlife concierge VIP table service', 'Concierge nightlife Milano tavolo VIP') }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      site: '@nightlifemilan',
    },
  };
}

export default async function ConciergePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const waLink = getConciergeBookingUrl(locale, undefined, canonicalPageUrl(baseUrl, locale, '/concierge'));

  const services = [
    {
      icon: Star,
      title: tr(locale, 'VIP Table Booking', 'Prenotazione Tavoli VIP'),
      desc: tr(
        locale,
        'Reserved Dancefloor, Privé, and DJ Console tables with 100% bottle credit and priority VIP Host entry.',
        'Tavoli riservati in Pista, Privé e Console DJ con 100% credito bottiglie e ingresso prioritario VIP Host.'
      ),
    },
    {
      icon: CheckCircle,
      title: tr(locale, 'Guestlist Access', 'Accredito in Lista Ufficiale'),
      desc: tr(
        locale,
        'Nominal accreditation on Lista NIGHTLIFE MILAN for Royal Aperitivo (19:30-22:15) and Club Night entry.',
        'Accredito nominale nella Lista NIGHTLIFE MILAN per il Royal Aperitivo (19:30-22:15) e l’ingresso dopocena.'
      ),
    },
    {
      icon: Zap,
      title: tr(locale, 'Bottle Service & Menus', 'Listini Bottiglie Ufficiali'),
      desc: tr(
        locale,
        'Verified champagne, vodka, and tequila bottle menus sent on WhatsApp before you confirm your table.',
        'Carte ufficiali di champagne, vodka e tequila inviate su WhatsApp prima della conferma del tavolo.'
      ),
    },
    {
      icon: MapPin,
      title: tr(locale, 'Venue Matching', 'Scelta del Club Ideale'),
      desc: tr(
        locale,
        'Share your group age, music taste, and budget: we match you with the right club for that exact night.',
        'Indicaci età media, genere musicale e budget: ti abbiniamo al club perfetto per quella serata.'
      ),
    },
    {
      icon: Calendar,
      title: tr(locale, 'Live Weekly Lineup', 'Programmazione Settimanale'),
      desc: tr(
        locale,
        'Updated 7/7 schedule covering guest DJs, Fashion Week, Fuorisalone, San Siro afterparties, and NYE.',
        'Calendario aggiornato 7/7 tra special guest DJ, Fashion Week, Fuorisalone, dopo-partita San Siro e Capodanno.'
      ),
    },
    {
      icon: Shield,
      title: tr(locale, 'Dress Code Briefing', 'Consulenza Dress Code & Porta'),
      desc: tr(
        locale,
        'Clear guidance on attire, arrival cut-off times, and male/female group balance for smooth door entry.',
        'Indicazioni chiare su abbigliamento, orario limite e bilanciamento del gruppo per superare la selezione.'
      ),
    },
  ];

  const testimonials = [
    {
      text: tr(
        locale,
        'We were 8 guests visiting for Fashion Week. They secured a raised Privé table at Just Me in under 20 minutes.',
        'Eravamo in 8 durante la Fashion Week. Ci hanno riservato un tavolo Privé rialzato al Just Me in meno di 20 minuti.'
      ),
      name: 'James K.',
      city: 'London',
      night: 'Just Me · Fashion Week',
    },
    {
      text: tr(
        locale,
        'Shared our budget on WhatsApp and received 3 clear options with bottle lists. Pineta singing dinner was unforgettable.',
        'Abbiamo scritto il budget su WhatsApp ricevendo subito 3 opzioni chiare coi listini. Cena cantata al Pineta impeccabile.'
      ),
      name: 'Sofia R.',
      city: 'Madrid',
      night: 'Pineta Milano',
    },
    {
      text: tr(
        locale,
        'Organized a birthday for 12 guests at Voya Rooftop: panoramic skyline table, bottles, and zero stress at the door.',
        'Organizzato un compleanno per 12 persone al Voya Rooftop: tavolo vista skyline al 20° piano, bottiglie e zero coda.'
      ),
      name: 'Marco & Anna',
      city: 'Zurich',
      night: 'Voya Rooftop',
    },
  ];

  const faqs = [
    {
      q: tr(locale, 'Is the Milan nightlife concierge service free?', 'Il servizio Concierge Nightlife Milan è davvero gratuito?'),
      a: tr(
        locale,
        'Yes. Our concierge assistance is 100% free for guests with zero agency markup: you pay the official minimum spend or guest-list entry directly at the club cashier.',
        'Sì. L’assistenza concierge è 100% gratuita e senza alcun sovrapprezzo di agenzia: paghi il minimum spend ufficiale o l’ingresso ridotto direttamente alla cassa del locale.'
      ),
    },
    {
      q: tr(locale, 'How quickly do you reply on WhatsApp?', 'In quanto tempo rispondete su WhatsApp?'),
      a: tr(
        locale,
        'We reply within 10 minutes daily from 14:00 to 04:00 CET on +39 351 912 7047. For same-night weekend tables, message us before 22:00.',
        'Rispondiamo entro 10 minuti tutti i giorni dalle 14:00 alle 04:00 al +39 351 912 7047. Per tavoli nella stessa sera del weekend consigliamo di scrivere entro le 22:00.'
      ),
    },
    {
      q: tr(locale, 'Can you assist groups of 8+ guests or all-male groups?', 'Potete assistere gruppi numerosi o di soli uomini?'),
      a: tr(
        locale,
        'Yes. Large groups and all-male groups (4+ men) are guided toward dedicated VIP Tables at Just Me, Pineta, Aria Club, 55 Milano, Voya Rooftop, and Repvblic for priority VIP Host entry.',
        'Sì. Per gruppi numerosi o gruppi di soli uomini (4+ persone) coordiniamo Tavoli VIP dedicati da Just Me, Pineta, Aria Club, 55 Milano, Voya Rooftop e Repvblic con ingresso VIP Host.'
      ),
    },
    {
      q: tr(locale, 'What is the minimum spend for a VIP table in Milan?', 'Qual è il minimum spend per un tavolo VIP a Milano?'),
      a: tr(
        locale,
        'Dancefloor VIP tables start at €250-€400 (5-6 passes), Privé tables run €500-€1,000 (8-10 passes), and DJ Console tables start at €1,200-€5,000+ in 100% bottle credit.',
        'I tavoli VIP Pista partono da 250-400 € (5-6 pass), i tavoli Privé da 500-1.000 € (8-10 pass) e i tavoli Console DJ da 1.200-5.000+ € interamente in credito bottiglie.'
      ),
    },
  ];

  const conciergeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: tr(locale, 'Milan Nightlife Concierge Service', 'Servizio Concierge Vita Notturna Milano'),
    description: tr(
      locale,
      'Official WhatsApp concierge desk for VIP table reservations, nominal guest lists, bottle service menus, and nightlife planning in Milan. Free service for guests.',
      'Desk WhatsApp ufficiale per prenotazione tavoli VIP, liste nominali, listini bottiglie e organizzazione serate a Milano. Servizio gratuito per gli ospiti.'
    ),
    provider: {
      '@type': 'Organization',
      name: 'Nightlife Milan',
      url: 'https://nightlifemilan.com',
      telephone: '+39-351-912-7047',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+39-351-912-7047',
        contactType: 'customer service',
        availableLanguage: ['English', 'Italian', 'Spanish', 'French', 'German', 'Portuguese'],
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '14:00',
          closes: '04:00',
        },
      },
    },
    areaServed: {
      '@type': 'City',
      name: 'Milan',
      addressCountry: 'IT',
    },
    serviceType: 'Nightlife Concierge',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
      description: 'Free concierge service with zero agency booking fees',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(conciergeSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="min-h-screen bg-[#050505] text-[#F6F1E7]">
        {/* 1st Body Image == og:image */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden border-b border-[#F6F1E7]/14">
          <Image
            quality={92}
            src="/images/pillars/concierge-hero.webp"
            alt={tr(locale, 'Milan nightlife concierge VIP table service', 'Concierge nightlife Milano tavolo VIP')}
            fill
            priority
            className="object-cover opacity-65"
            sizes="100vw"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/35 to-transparent" />
        </div>

        {/* Hero */}
        <section className="relative pt-16 pb-20 px-6 text-center border-b border-[#F6F1E7]/14">
          <div className="relative max-w-3xl mx-auto">
            <p className="font-mono text-[#EAE3D5] text-[11px] tracking-[0.28em] uppercase mb-5">
              {tr(locale, 'OFFICIAL CONCIERGE DESK · 7/7 WHATSAPP · ZERO FEES', 'DESK CONCIERGE UFFICIALE · WHATSAPP 7/7 · ZERO COMMISSIONI')}
            </p>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-normal text-[#F6F1E7] leading-[0.96] mb-6">
              {tr(locale, 'Milan Nightlife VIP Concierge', 'Concierge Ufficiale Vita Notturna Milano')}
            </h1>
            <p className="font-sans text-[#C2B9AA] text-lg leading-relaxed max-w-2xl mx-auto mb-8">
              {tr(
                locale,
                'Planning a night out in Milan? We coordinate club matching, VIP table reservations, official bottle lists, and nominal guest-list access via WhatsApp at zero extra cost.',
                'Organizzi una serata a Milano? Coordiniamo scelta del club, prenotazione Tavoli VIP, listini bottiglie ufficiali e accredito in lista nominale su WhatsApp a costo zero.'
              )}
            </p>

            {/* Quick Answer */}
            <div className="max-w-2xl mx-auto mb-10 p-6 border border-[#EAE3D5]/35 bg-[#0B0A09] text-left">
              <p className="font-mono text-[#EAE3D5] text-[10px] tracking-[0.28em] uppercase mb-2.5">
                {tr(locale, 'DIRECT ANSWER · CONCIERGE DESK', 'RISPOSTA IMMEDIATA · COME OPERIAMO')}
              </p>
              <p className="font-sans text-[#E4DDD0] text-sm leading-relaxed">
                {tr(
                  locale,
                  'Nightlife Milan Concierge handles VIP table bookings (€250-€5,000+ 100% bottle credit), nominal guest lists, and dress code briefings across Just Me, Pineta, Aria Club, 55 Milano, Voya Rooftop, Repvblic, and 14 partner venues via WhatsApp +39 351 912 7047 (reply in under 10 minutes, 14:00-04:00 daily).',
                  'Il Concierge Nightlife Milan gestisce Tavoli VIP (250-5.000+ € in 100% credito bottiglie), liste nominali e briefing dress code per Just Me, Pineta, Aria Club, 55 Milano, Voya Rooftop, Repvblic e altri 14 club partner su WhatsApp +39 351 912 7047 (risposta entro 10 minuti, 14:00-04:00 7/7).'
                )}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center gap-3 px-8 py-4 bg-[#25D366] text-[#050505] font-mono font-bold text-xs tracking-[0.18em] uppercase hover:bg-[#20bd5a] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                {tr(locale, 'Message WhatsApp Concierge', 'Scrivi al Concierge su WhatsApp')}
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#C2B9AA]">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#EAE3D5]" />
                <span className="font-mono text-[11px] uppercase tracking-wider">{tr(locale, 'Reply < 10 min', 'Risposta < 10 min')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-[#EAE3D5]" />
                <span className="font-mono text-[11px] uppercase tracking-wider">{tr(locale, 'Zero Agency Markup', 'Zero Sovrapprezzo')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-[#EAE3D5]" />
                <span className="font-mono text-[11px] uppercase tracking-wider">{tr(locale, 'Active 7/7', 'Attivo 7 Giorni su 7')}</span>
              </div>
            </div>
          </div>
        </section>

        {/* How it works (Warm Ivory Chapter #F6F1E7) */}
        <section className="px-6 py-20 bg-[#F6F1E7] text-[#050505] border-b border-[#050505]/15">
          <div className="max-w-5xl mx-auto">
            <p className="font-mono text-[#3D372E] text-xs font-semibold tracking-[0.28em] uppercase mb-10 text-center">
              {tr(locale, 'N° 01 · HOW IT WORKS IN 3 STEPS', 'N° 01 · COME FUNZIONA IN 3 PASSI')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-[#050505]/15">
              {[
                {
                  step: '01',
                  title: tr(locale, 'Send date & group size', 'Invia data e numero ospiti'),
                  desc: tr(
                    locale,
                    'Share your date, male/female count, preferred music vibe, and budget directly on WhatsApp.',
                    'Scrivici data, numero di uomini e donne, musica preferita e fascia di budget su WhatsApp.'
                  ),
                },
                {
                  step: '02',
                  title: tr(locale, 'Compare verified options', 'Confronta le opzioni reali'),
                  desc: tr(
                    locale,
                    'Receive live table positions, official bottle menus, and guest-list cut-off times in under 10 minutes.',
                    'Ricevi in meno di 10 minuti posizioni tavolo reali, listini bottiglie ufficiali e orari lista.'
                  ),
                },
                {
                  step: '03',
                  title: tr(locale, 'Arrive at the VIP Host desk', 'Accedi dal desk VIP Host'),
                  desc: tr(
                    locale,
                    'Your reservation name is registered at the door: skip the general queue and pay directly at the club.',
                    'Il tuo nome è registrato alla porta VIP: entri dalla corsia dedicata e paghi direttamente al club.'
                  ),
                },
              ].map((item) => (
                <div key={item.step} className="border-r border-b border-[#050505]/15 p-9 text-left bg-[#F6F1E7]">
                  <span className="font-serif italic text-5xl text-[#050505] block mb-4">{item.step}</span>
                  <h2 className="font-serif text-2xl text-[#050505] mb-2.5">{item.title}</h2>
                  <p className="font-sans text-[#2C2823] text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="px-6 py-20 border-b border-[#F6F1E7]/14">
          <div className="max-w-5xl mx-auto">
            <p className="font-mono text-[#EAE3D5] text-xs tracking-[0.28em] uppercase mb-3">
              {tr(locale, 'N° 02 · CONCIERGE SERVICES', 'N° 02 · SERVIZI CONCIERGE')}
            </p>
            <h2 className="font-serif text-4xl text-[#F6F1E7] mb-12">
              {tr(locale, 'Everything Coordinated Before You Step Out', 'Tutto Coordinato Prima di Uscire')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="p-7 border border-[#F6F1E7]/14 bg-[#0B0A09] hover:border-[#EAE3D5]/45 transition-colors"
                >
                  <div className="w-10 h-10 border border-[#EAE3D5]/35 bg-[#050505] flex items-center justify-center mb-5">
                    <service.icon className="w-4 h-4 text-[#EAE3D5]" />
                  </div>
                  <h3 className="font-serif text-xl text-[#F6F1E7] mb-2">{service.title}</h3>
                  <p className="font-sans text-[#C2B9AA] text-sm leading-relaxed">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="px-6 py-20 border-b border-[#F6F1E7]/14">
          <div className="max-w-5xl mx-auto">
            <p className="font-mono text-[#EAE3D5] text-xs tracking-[0.28em] uppercase mb-10 text-center">
              {tr(locale, 'N° 03 · INTERNATIONAL GUEST FEEDBACK', 'N° 03 · FEEDBACK OSPITI INTERNAZIONALI')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {testimonials.map((t, i) => (
                <div key={i} className="p-7 border border-[#F6F1E7]/14 bg-[#0B0A09]">
                  <div className="flex gap-1 mb-5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 text-[#EAE3D5] fill-[#EAE3D5]" />
                    ))}
                  </div>
                  <p className="font-sans text-[#E4DDD0] text-sm leading-relaxed italic mb-6">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="border-t border-[#F6F1E7]/12 pt-4">
                    <p className="font-sans text-[#F6F1E7] text-sm font-medium">{t.name}</p>
                    <p className="font-mono text-[#847C6F] text-[11px] uppercase tracking-wider">{t.city} · {t.night}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-6 py-20 border-b border-[#F6F1E7]/14">
          <div className="max-w-3xl mx-auto">
            <p className="font-mono text-[#EAE3D5] text-xs tracking-[0.28em] uppercase mb-10 text-center">
              FAQ
            </p>
            <div className="space-y-6">
              {faqs.map((item, i) => (
                <div key={i} className="border-b border-[#F6F1E7]/14 pb-6">
                  <h3 className="font-serif text-xl text-[#F6F1E7] mb-2.5">{item.q}</h3>
                  <p className="font-sans text-[#C2B9AA] text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Venues we cover */}
        <section className="px-6 py-20 border-b border-[#F6F1E7]/14">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-serif text-4xl text-[#F6F1E7] mb-3">
              {tr(locale, '20 Verified Milan Clubs Covered', 'I 20 Club di Milano Coperti dal Servizio')}
            </h2>
            <p className="font-sans text-[#C2B9AA] text-sm mb-8 max-w-xl">
              {tr(
                locale,
                'Direct desk coordination with Milan’s six priority clubs and 14 partner venues.',
                'Coordinamento diretto con i 6 club prioritari di Milano e 14 locali partner selezionati.'
              )}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
              {[
                { src: '/images/pillars/concierge-01.webp', alt: 'Just Me Milano Torre Branca VIP Table', label: 'Just Me' },
                { src: '/images/pillars/concierge-02.webp', alt: 'Pineta Milano Singing Dinner & Club', label: 'Pineta Club' },
                { src: '/images/pillars/concierge-03.webp', alt: 'Voya Rooftop Milan 20th Floor Skyline', label: 'Voya Rooftop' },
                { src: '/images/pillars/concierge-04.webp', alt: 'Aria Club Milano San Siro Luxury Nightclub', label: 'Aria Club' },
                { src: '/images/pillars/concierge-05.webp', alt: 'Magazzini Generali Milano Electronic Arena', label: 'Magazzini' },
              ].map((img) => (
                <div key={img.label} className="relative group">
                  <div className="relative h-36 overflow-hidden border border-[#F6F1E7]/14">
                    <Image src={img.src} alt={img.alt} fill quality={92} className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 50vw, 25vw" />
                  </div>
                  <p className="font-mono text-[#C2B9AA] text-[11px] text-center mt-2 tracking-widest uppercase">{img.label}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {['Just Me', 'Pineta Club', 'Aria Club', '55 Milano', 'Voya Rooftop', 'Repvblic', 'Armani Privé', 'Volt Club', 'Magazzini Generali', 'Hollywood', 'Gattopardo', 'Tocqueville 13', 'Alcatraz', 'Fabrique', 'Ceresio 7', 'Terrazza Duomo 21'].map((v) => (
                <span key={v} className="px-3.5 py-1.5 border border-[#F6F1E7]/14 bg-[#0B0A09] text-[#E4DDD0] text-xs font-mono tracking-wider">
                  {v}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Modules */}
        <section className="px-6 py-20 max-w-7xl mx-auto space-y-16">
          <DressCodeInstantChecker locale={locale} />
          <NeighborhoodCommutePlanner locale={locale} />
          <VipQuoteCalculator locale={locale} />
          <PrioritySixShowcase locale={locale} />
        </section>

        {/* Final CTA */}
        <section className="px-6 pb-24">
          <div className="max-w-3xl mx-auto">
            <div className="p-10 sm:p-12 border border-[#EAE3D5]/35 bg-[#0B0A09] text-center">
              <h2 className="font-serif text-3xl sm:text-4xl text-[#F6F1E7] mb-4">
                {tr(locale, 'Ready to Plan Your Night in Milan?', 'Pronto a Organizzare la Tua Serata a Milano?')}
              </h2>
              <p className="font-sans text-[#C2B9AA] text-sm mb-8 max-w-xl mx-auto">
                {tr(
                  locale,
                  'Send us your date and group size on WhatsApp: receive verified VIP table quotes and guest-list access in under 10 minutes.',
                  'Scrivici data e numero di persone su WhatsApp: ricevi disponibilità tavoli VIP e accredito lista in meno di 10 minuti.'
                )}
              </p>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center gap-3 px-10 py-4 bg-[#25D366] text-[#050505] font-mono font-bold text-xs tracking-[0.2em] uppercase hover:bg-[#20bd5a] transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp {CONTACT.whatsapp.number}
              </a>
            </div>
          </div>
        </section>

        <EditorialPageSections locale={locale as LocaleCode} path={`${localePrefix(locale)}/concierge`} />
      </main>
    </>
  );
}
