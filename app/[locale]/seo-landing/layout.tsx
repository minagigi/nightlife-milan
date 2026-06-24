import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/globals.css';

// Font ottimizzato con preload e subset specifico
const inter = Inter({ 
  subsets: ['latin'], 
  display: 'swap',
  variable: '--font-inter'
});

// Meta tag dinamici e configurazione SEO di base
export const metadata: Metadata = {
  title: {
    template: '%s | Nightlife Milan',
    default: 'Nightlife Milan | I Migliori Locali ed Eventi',
  },
  description: 'Scopri la migliore vita notturna a Milano. Esplora club esclusivi, bar nascosti ed eventi imperdibili nella capitale della moda.',
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: 'https://nightlifemilan.com',
    siteName: 'Nightlife Milan',
    images: [
      {
        url: 'https://nightlifemilan.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Nightlife Milan - I migliori eventi',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://nightlifemilan.com',
    languages: {
      'it-IT': 'https://nightlifemilan.com/it',
      'en-US': 'https://nightlifemilan.com/en',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" className={`${inter.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-[#131009] text-white min-h-screen flex flex-col">
        {/* Skip to main content per accessibilità (A11y) */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-champagne text-black px-4 py-2 z-50 rounded-md font-bold"
        >
          Salta al contenuto principale
        </a>
        
        <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#131009]/80 border-b border-white/10">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <span className="text-xl font-bold text-champagne">Nightlife Milan</span>
            <nav aria-label="Navigazione principale">
              <ul className="flex gap-6">
                <li><a href="#eventi" className="hover:text-champagne transition-colors">Eventi</a></li>
                <li><a href="#club" className="hover:text-champagne transition-colors">Club</a></li>
                <li><a href="#contatti" className="hover:text-champagne transition-colors">Contatti</a></li>
              </ul>
            </nav>
          </div>
        </header>

        {children}

        <footer className="mt-auto border-t border-white/10 bg-white/[0.03] py-8">
          <div className="container mx-auto px-4 text-center text-white/40 text-sm">
            <p>&copy; {new Date().getFullYear()} Nightlife Milan. Tutti i diritti riservati.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
