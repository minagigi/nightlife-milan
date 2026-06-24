import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import NewsletterHub from '@/components/NewsletterHub';
import { Clock } from 'lucide-react';

export const revalidate = 3600;

const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isIt = locale === 'it';
  const canonical = `${baseUrl}${isIt ? '/it' : ''}/guides`;

  const title = isIt
    ? 'Guide Vita Notturna Milano 2026 | Dress Code, VIP Table & Consigli Insider | Nightlife Milan'
    : 'Milan Nightlife Guides 2026 | Dress Code, VIP Tables & Insider Tips | Nightlife Milan';
  const description = isIt
    ? 'Guide esperte sulla vita notturna milanese: dress code, accesso VIP, zone aperitivo, migliori club techno e consigli insider. Aggiornato luglio 2026.'
    : 'Expert guides to Milan nightlife: door policies, dress codes, VIP table booking, aperitivo zones, best techno clubs and insider tips. Updated 2026.';
  const ogImage = `${baseUrl}/images/guides-hero.webp`;

  return {
    title,
    description,
    keywords: isIt
      ? ['guida vita notturna milano', 'dress code discoteche milano', 'guida tavoli vip milano', 'consigli nightlife milano', 'migliori club techno milano']
      : ['milan nightlife guide', 'milan club dress code', 'vip table milan guide', 'milan nightlife tips', 'best techno milan', 'aperitivo milan guide'],
    robots: { index: true, follow: true },
    alternates: {
      canonical,
      languages: {
        'en': `${baseUrl}/guides`,
        'it': `${baseUrl}/it/guides`,
        'x-default': `${baseUrl}/guides`,
      },
    },
    openGraph: {
      title: isIt ? 'Guide Vita Notturna Milano 2026 — Nightlife Milan' : 'Milan Nightlife Guides 2026 — The Insider Magazine',
      description,
      type: 'website',
      url: canonical,
      siteName: 'Nightlife Milan',
      locale: isIt ? 'it_IT' : 'en_US',
      images: [{ url: ogImage, width: 1200, height: 630, alt: isIt ? 'Guide vita notturna Milano insider' : 'Milan nightlife guides insider tips' }],
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

const featuredArticle = {
  id: 'g-dress-code',
  title: 'The Ultimate Door Policy Guide',
  excerpt: 'Milan is the fashion capital. Don\'t get bounced at the door. Here is exactly what to wear to get into the most exclusive venues.',
  image: '/images/bottle-service-milan-vip-nightclub.webp',
  category: 'Dress Code',
  readTime: '5 min read',
  slug: 'ultimate-dress-code-guide-milan-clubs',
};

const articles = [
  {
    id: 'g-secret-bars',
    title: 'Hidden Speakeasies of Navigli',
    excerpt: 'Discover the hidden entrances and secret cocktail bars of Milan\'s Navigli canal district — from underground jazz cellars to rooftop terraces you won\'t find on Google.',
    image: '/images/aperitivo-milan-navigli-evening.webp',
    category: 'Secret Bars',
    readTime: '4 min read',
    slug: 'hidden-speakeasies-navigli',
  },
  {
    id: 'g-techno-2026',
    title: 'Best Techno Clubs in Milan 2026',
    excerpt: 'The underground scene is shifting. Discover the new warehouses and industrial venues dominating the 2026 Milan techno landscape — Magazzini Generali, Volt, and beyond.',
    image: '/images/magazzini-generali-milano.webp',
    category: 'Music',
    readTime: '6 min read',
    slug: 'where-to-find-best-techno-2026',
  },
  {
    id: 'g-vip-tables',
    title: 'How to Book a VIP Table Like a Local',
    excerpt: 'Navigate the complex world of minimum spends, bottle service, and securing the best table in the club. Everything you need to know from our Milan concierge team.',
    image: '/images/vip-table-milan-nightclub-just-me.webp',
    category: 'VIP Access',
    readTime: '7 min read',
    slug: 'how-to-book-vip-table',
  },
  {
    id: 'g-dj-interview',
    title: 'The Sound of Milan 2026',
    excerpt: 'A deep dive into the resident DJs and international headliners shaping the acoustic landscape of Milan\'s top venues this season.',
    image: '/images/milan-club-crowd-dancefloor-night.webp',
    category: 'Music',
    readTime: '10 min read',
    slug: 'interview-sound-of-milan',
  },
];

export default async function GuidesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const localePrefix = locale === 'it' ? '/it' : '';

  return (
    <main className="flex-grow pt-24 pb-20">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center mb-8">
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-champagne tracking-tighter mb-6">
            The Nightlife Magazine
          </h1>
          <p className="text-xl text-white/40 max-w-2xl mx-auto">
            Expert guides, insider tips, and cultural deep dives into Milan&apos;s exclusive clubbing scene.
          </p>
        </div>
        {/* AI Trafiletto */}
        <div className="max-w-2xl mx-auto p-5 rounded-xl border border-champagne/20 bg-champagne/[0.04]">
          <p className="font-sans text-champagne/60 text-[9px] tracking-[0.3em] uppercase mb-3">Quick Answer</p>
          <p className="font-sans text-white/70 text-sm leading-relaxed">
            Our Milan nightlife guides cover: <strong className="text-white">dress codes</strong> (total black or chic fashion at premium clubs), <strong className="text-white">VIP table booking</strong> (from €200 minimum spend, free concierge service), <strong className="text-white">aperitivo zones</strong> (Corso Como, Navigli, Brera, Isola), and the <strong className="text-white">best techno clubs</strong> (Magazzini Generali, Volt). All guides are updated for June 2026.
          </p>
        </div>
      </section>

      {/* Featured Article */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <Link
          href={`${localePrefix}/guides/${featuredArticle.slug}`}
          className="group relative block w-full h-[500px] md:h-[600px] rounded-xl overflow-hidden border border-white/10 hover:border-champagne/50 transition-colors duration-500"
        >
          <Image
            src={featuredArticle.image}
            alt={featuredArticle.title}
            fill
            sizes="100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
          
          <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end">
            <div className="flex items-center space-x-4 mb-4">
              <span className="bg-champagne text-black px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase">
                Featured
              </span>
              <span className="text-champagne text-sm font-medium tracking-wider uppercase border border-champagne/30 px-4 py-1.5 rounded-full backdrop-blur-sm">
                {featuredArticle.category}
              </span>
              <div className="flex items-center space-x-1 text-white/70 text-sm">
                <Clock className="w-4 h-4" />
                <span>{featuredArticle.readTime}</span>
              </div>
            </div>
            
            <h2 className="font-serif text-4xl md:text-6xl font-bold text-white mb-4 group-hover:text-champagne transition-colors">
              {featuredArticle.title}
            </h2>
            <p className="text-xl text-white/70 max-w-3xl line-clamp-2">
              {featuredArticle.excerpt}
            </p>
          </div>
        </Link>
      </section>

      {/* Category Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-wrap gap-4 border-b border-white/10 pb-4">
          <button className="px-6 py-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors text-sm font-medium tracking-wider uppercase">
            All
          </button>
          <button className="px-6 py-2 rounded-full border border-white/20 text-white/40 hover:border-champagne hover:text-champagne transition-colors text-sm font-medium tracking-wider uppercase">
            Dress Code
          </button>
          <button className="px-6 py-2 rounded-full border border-white/20 text-white/40 hover:border-champagne hover:text-champagne transition-colors text-sm font-medium tracking-wider uppercase">
            Secret Bars
          </button>
          <button className="px-6 py-2 rounded-full border border-white/20 text-white/40 hover:border-champagne hover:text-champagne transition-colors text-sm font-medium tracking-wider uppercase">
            Interviews
          </button>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article) => (
            <Link 
              key={article.id} 
              href={`${localePrefix}/guides/${article.slug}`}
              className="group flex flex-col bg-white/[0.03] rounded-lg overflow-hidden border border-white/5 hover:border-champagne/30 transition-colors duration-500"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md border border-white/10 text-white px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase">
                  {article.category}
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center space-x-2 text-champagne mb-4">
                  <Clock className="w-4 h-4" />
                  <span className="font-mono text-sm">{article.readTime}</span>
                </div>
                
                <h3 className="font-serif text-2xl font-bold text-white mb-3 group-hover:text-champagne transition-colors">
                  {article.title}
                </h3>
                
                <p className="text-white/40 line-clamp-3">
                  {article.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* VIP Tables Internal Link Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="relative rounded-lg overflow-hidden border border-champagne/20 bg-champagne/[0.04] p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute inset-0 bg-gradient-to-r from-champagne/8 via-transparent to-transparent pointer-events-none" />
          <div className="relative">
            <p className="font-sans text-champagne/60 text-[9px] tracking-[0.35em] uppercase mb-3">Ready to go?</p>
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-2">
              Book a VIP Table Tonight
            </h2>
            <p className="font-sans text-white/40 text-sm max-w-md">
              Skip the queue. Get the best table in Milan. WhatsApp concierge — reply in 10 minutes.
            </p>
          </div>
          <div className="relative flex-shrink-0 flex flex-col sm:flex-row gap-4">
            <Link
              href={`${localePrefix}/vip-tables`}
              className="inline-flex items-center gap-3 px-8 py-4 bg-champagne text-black
                font-sans font-bold text-sm tracking-[0.15em] uppercase
                hover:bg-white transition-colors duration-300"
            >
              See VIP Tables
            </Link>
            <Link
              href={`${localePrefix}/concierge`}
              className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white/70
                font-sans text-sm tracking-[0.15em] uppercase
                hover:border-champagne/50 hover:text-champagne transition-colors duration-300"
            >
              Concierge Service
            </Link>
          </div>
        </div>
      </section>

      {/* Essential Milan Nightlife Knowledge — 3rd H2 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 border-t border-white/5 pt-16">
        <h2 className="font-serif text-3xl md:text-4xl text-white mb-8">Essential Milan Nightlife Knowledge</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-7 rounded-lg border border-white/8 bg-white/[0.02]">
            <h3 className="font-serif text-xl text-white mb-3">Dress Code: What Actually Gets You In</h3>
            <p className="font-sans text-white/50 text-sm leading-relaxed">
              Milan enforces real dress codes. At Just Me and Pineta: smart-elegant minimum, fashion-forward preferred — no sneakers, no sportswear, no shorts. At Magazzini Generali and Volt: all-black underground look. At Voya Rooftop: smart casual to cocktail attire. When in doubt, overdress.
            </p>
          </div>
          <div className="p-7 rounded-lg border border-white/8 bg-white/[0.02]">
            <h3 className="font-serif text-xl text-white mb-3">When to Arrive (and When Not to)</h3>
            <p className="font-sans text-white/50 text-sm leading-relaxed">
              Aperitivo starts at 18:00 and peaks at 19:30–20:30. Clubs open at 22:00–23:00 but don&apos;t fill until midnight. The real energy at Just Me, Pineta, and Play Club hits between 1:00–3:00 AM. Arriving before 23:30 at a club means you&apos;ll wait in an empty room.
            </p>
          </div>
          <div className="p-7 rounded-lg border border-white/8 bg-white/[0.02]">
            <h3 className="font-serif text-xl text-white mb-3">Guestlist vs VIP Table: Which to Choose</h3>
            <p className="font-sans text-white/50 text-sm leading-relaxed">
              Guestlist = free or reduced entry, no queue, but standing in the main room. VIP table = reserved table, dedicated service, bottle service, best spot in the club. For groups of 4+, a VIP table at €200–300 total is often better value than individual entry fees plus bottles at the bar.
            </p>
          </div>
          <div className="p-7 rounded-lg border border-white/8 bg-white/[0.02]">
            <h3 className="font-serif text-xl text-white mb-3">Music Zones: Find Your Sound</h3>
            <p className="font-sans text-white/50 text-sm leading-relaxed">
              Techno &amp; Electronic: Magazzini Generali (Porta Romana), Volt (Corso Como). Hip Hop &amp; Afrobeats: Play Club (Corso Como), Apollo (Navigli). Commercial &amp; House: Just Me (Sempione), Pineta (Corso Como). Lounge &amp; Nu-Disco: Voya Rooftop (Isola), Terrazza 21 (Isola). Jazz &amp; Live: Gattopardo (Garibaldi).
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-8">
          {['Dress Code Milan', 'VIP Table Guide', 'Milan Club Tips', 'Aperitivo Guide', 'Techno Milan', 'Hip Hop Milan', 'Guestlist Milan', 'Milan Nightlife 2026'].map((tag) => (
            <span key={tag} className="px-3 py-1.5 rounded-full border border-white/10 text-white/40 text-xs font-sans tracking-wider">
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Newsletter Integration */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <NewsletterHub lang={locale} />
      </section>
    </main>
  );
}
