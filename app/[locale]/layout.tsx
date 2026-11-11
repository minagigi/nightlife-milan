import '@/app/globals.css';
import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import {
  ENABLED_LOCALES,
  getLocaleDef,
  hreflangAlternates,
  localePrefix,
  DEFAULT_LOCALE,
  enabledLocaleCodes,
  isEnabledLocale,
  type LocaleCode,
} from '@/lib/i18n/locales';
import { seoTitle, withWhatsApp } from '@/lib/seoMetadata';
import { readEditorialFields } from '@/lib/editorialContent';

import SiteShell from '@/components/SiteShell';

export const viewport: Viewport = {
  themeColor: '#050505',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

const LAYOUT_META_35: Record<LocaleCode, { title: string; desc: string; ogAlt: string; keywords: string[] }> = {
  en: {
    title: 'Nightlife Milan | Best Clubs, VIP Tables & Aperitivo Guide',
    desc: 'The official guide to Milan nightlife: top clubs, VIP tables, aperitivo and live events. Check availability on WhatsApp.',
    ogAlt: 'Nightlife Milan: Exclusive Clubs & VIP Tables',
    keywords: ['nightlife milan', 'best clubs milan', 'vip table milan', 'bottle service milan', 'aperitivo milan', 'milan nightclub guide', 'exclusive clubs milan'],
  },
  it: {
    title: 'Nightlife Milan | Migliori Club, Tavoli VIP e Aperitivo Milano',
    desc: 'La guida ufficiale alla vita notturna di Milano: club esclusivi, tavoli VIP, aperitivo ed eventi della settimana. Disponibilità su WhatsApp.',
    ogAlt: 'Nightlife Milan: Club Esclusivi e Tavoli VIP a Milano',
    keywords: ['vita notturna milano', 'club milano', 'tavoli vip milano', 'aperitivo milano', 'discoteche milano', 'locali milano', 'dove uscire a milano'],
  },
  es: {
    title: 'Nightlife Milan | Mejores Clubes, Mesas VIP y Aperitivo en Milán',
    desc: 'La guía oficial de la vida nocturna de Milán: clubes exclusivos, mesas VIP, aperitivo y eventos actuales. Disponibilidad por WhatsApp.',
    ogAlt: 'Nightlife Milan: Clubes Exclusivos y Mesas VIP en Milán',
    keywords: ['vida nocturna milán', 'clubes milán', 'mesas vip milán', 'aperitivo milán', 'discotecas milán'],
  },
  fr: {
    title: 'Nightlife Milan | Meilleurs Clubs, Tables VIP et Aperitivo à Milan',
    desc: 'Le guide officiel de la vie nocturne à Milan : clubs exclusifs, tables VIP, aperitivo et soirées en cours. Disponibilité sur WhatsApp.',
    ogAlt: 'Nightlife Milan : Clubs Exclusifs et Tables VIP à Milan',
    keywords: ['vie nocturne milan', 'clubs milan', 'tables vip milan', 'aperitivo milan', 'boîtes de nuit milan'],
  },
  de: {
    title: 'Nightlife Milan | Beste Clubs, VIP-Tische & Aperitivo in Mailand',
    desc: 'Der offizielle Guide für Mailands Nachtleben: exklusive Clubs, VIP-Tische, Aperitivo und aktuelle Events. Verfügbarkeit per WhatsApp.',
    ogAlt: 'Nightlife Milan: Exklusive Clubs & VIP-Tische in Mailand',
    keywords: ['nachtleben mailand', 'clubs mailand', 'vip tisch mailand', 'aperitivo mailand', 'nachtclubs mailand'],
  },
  pt: {
    title: 'Nightlife Milan | Melhores Clubes, Mesas VIP e Aperitivo em Milão',
    desc: 'O guia oficial da vida noturna de Milão: clubes exclusivos, mesas VIP, aperitivo e eventos da semana. Disponibilidade no WhatsApp.',
    ogAlt: 'Nightlife Milan: Clubes Exclusivos e Mesas VIP em Milão',
    keywords: ['vida noturna milão', 'clubes milão', 'mesas vip milão', 'aperitivo milão', 'baladas milão'],
  },
  nl: {
    title: 'Nightlife Milan | Beste Clubs, VIP-Tafels & Aperitivo in Milaan',
    desc: 'De officiële gids voor het nachtleven van Milaan: exclusieve clubs, VIP-tafels, aperitivo en actuele evenementen via WhatsApp.',
    ogAlt: 'Nightlife Milan: Exclusieve Clubs & VIP-Tafels in Milaan',
    keywords: ['nachtleven milaan', 'clubs milaan', 'vip tafel milaan', 'aperitivo milaan'],
  },
  ru: {
    title: 'Nightlife Milan | Лучшие клубы, VIP-столы и аперитиво в Милане',
    desc: 'Официальный гид по ночной жизни Милана: эксклюзивные клубы, VIP-столы, аперитиво и актуальные вечеринки. Бронирование в WhatsApp.',
    ogAlt: 'Nightlife Milan: Эксклюзивные клубы и VIP-столы в Милане',
    keywords: ['ночная жизнь милан', 'клубы милана', 'vip столы милан', 'аперитиво милан'],
  },
  tr: {
    title: 'Nightlife Milan | En İyi Kulüpler, VIP Masalar ve Aperitivo Milano',
    desc: 'Milano gece hayatı resmi rehberi: seçkin kulüpler, VIP masalar, aperitivo ve güncel etkinlikler. WhatsApp üzerinden rezervasyon.',
    ogAlt: 'Nightlife Milan: Seçkin Kulüpler ve VIP Masalar',
    keywords: ['milano gece hayatı', 'milano kulüpler', 'vip masa milano', 'aperitivo milano'],
  },
  zh: {
    title: 'Nightlife Milan | 米兰顶级夜店、VIP卡座与开胃酒官方指南',
    desc: '米兰夜生活官方指南：精选夜店、VIP卡座预订、意式开胃酒与本周活动。通过WhatsApp查询实时余位。',
    ogAlt: 'Nightlife Milan：米兰尊享夜店与VIP卡座',
    keywords: ['米兰夜生活', '米兰夜店', '米兰VIP卡座', '米兰酒吧指南'],
  },
  ar: {
    title: 'Nightlife Milan | أفضل النوادي وطاولات VIP والأبيريتيفو في ميلانو',
    desc: 'الدليل الرسمي للحياة الليلية في ميلانو: أرقى النوادي، حجز طاولات VIP، الأبيريتيفو وأهم الفعاليات عبر WhatsApp.',
    ogAlt: 'Nightlife Milan: نوادي حصرية وطاولات VIP في ميلانو',
    keywords: ['الحياة الليلية ميلانو', 'نوادي ميلانو', 'طاولات VIP ميلانو', 'أبيريتيفو ميلانو'],
  },
  bg: {
    title: 'Nightlife Milan | Най-добрите клубове, VIP маси и аперитиво в Милано',
    desc: 'Официалният гид за нощния живот в Милано: ексклузивни клубове, VIP маси, аперитиво и актуални събития в WhatsApp.',
    ogAlt: 'Nightlife Milan: Ексклузивни клубове и VIP маси в Милано',
    keywords: ['нощен живот милано', 'клубове милано', 'vip маси милано', 'аперитиво милано'],
  },
  hr: {
    title: 'Nightlife Milan | Najbolji klubovi, VIP stolovi i aperitivo u Milanu',
    desc: 'Službeni vodič za noćni život Milana: ekskluzivni klubovi, VIP stolovi, aperitivo i aktualna događanja putem WhatsAppa.',
    ogAlt: 'Nightlife Milan: Ekskluzivni klubovi i VIP stolovi u Milanu',
    keywords: ['noćni život milano', 'klubovi milano', 'vip stolovi milano', 'aperitivo milano'],
  },
  cs: {
    title: 'Nightlife Milan | Nejlepší kluby, VIP stoly a aperitivo v Miláně',
    desc: 'Oficiální průvodce nočním životem v Miláně: exkluzivní kluby, VIP stoly, aperitivo a aktuální akce přes WhatsApp.',
    ogAlt: 'Nightlife Milan: Exkluzivní kluby a VIP stoly v Miláně',
    keywords: ['noční život milán', 'kluby milán', 'vip stoly milán', 'aperitivo milán'],
  },
  da: {
    title: 'Nightlife Milan | Bedste klubber, VIP-borde og aperitivo i Milano',
    desc: 'Den officielle guide til Milanos natteliv: eksklusive klubber, VIP-borde, aperitivo og aktuelle events via WhatsApp.',
    ogAlt: 'Nightlife Milan: Eksklusive klubber og VIP-borde i Milano',
    keywords: ['natteliv milano', 'klubber milano', 'vip bord milano', 'aperitivo milano'],
  },
  et: {
    title: 'Nightlife Milan | Parimad klubid, VIP-lauad ja aperitivo Milanos',
    desc: 'Milano ööelu ametlik teejuht: eksklusiivsed klubid, VIP-lauad, aperitivo ja nädala sündmused WhatsAppis.',
    ogAlt: 'Nightlife Milan: Eksklusiivsed klubid ja VIP-lauad Milanos',
    keywords: ['ööelu milano', 'klubid milano', 'vip laud milano', 'aperitivo milano'],
  },
  fi: {
    title: 'Nightlife Milan | Parhaat klubit, VIP-pöydät ja aperitivo Milanossa',
    desc: 'Virallinen opas Milanon yöelämään: eksklusiiviset klubit, VIP-pöydät, aperitivo ja ajankohtaiset tapahtumat WhatsAppissa.',
    ogAlt: 'Nightlife Milan: Eksklusiiviset klubit ja VIP-pöydät Milanossa',
    keywords: ['yöelämä milano', 'klubit milano', 'vip pöytä milano', 'aperitivo milano'],
  },
  el: {
    title: 'Nightlife Milan | Κορυφαία Κλαμπ, Τραπέζια VIP & Aperitivo στο Μιλάνο',
    desc: 'Ο επίσημος οδηγός για τη νυχτερινή ζωή του Μιλάνου: εκλεκτά κλαμπ, τραπέζια VIP, aperitivo και εκδηλώσεις μέσω WhatsApp.',
    ogAlt: 'Nightlife Milan: Αποκλειστικά Κλαμπ & Τραπέζια VIP στο Μιλάνο',
    keywords: ['νυχτερινή ζωή μιλάνο', 'κλαμπ μιλάνο', 'τραπέζια vip μιλάνο', 'aperitivo μιλάνο'],
  },
  hu: {
    title: 'Nightlife Milan | Legjobb klubok, VIP asztalok és aperitivo Milánóban',
    desc: 'Milánó éjszakai életének hivatalos kalauza: exkluzív klubok, VIP asztalok, aperitivo és aktuális események WhatsAppon.',
    ogAlt: 'Nightlife Milan: Exkluzív klubok és VIP asztalok Milánóban',
    keywords: ['éjszakai élet milánó', 'klubok milánó', 'vip asztal milánó', 'aperitivo milánó'],
  },
  ga: {
    title: 'Nightlife Milan | Na Clubanna Is Fearr, Táblaí VIP & Aperitivo i Milán',
    desc: 'An treoir oifigiúil do shaol oíche Mhilán: clubanna eisiacha, táblaí VIP, aperitivo agus imeachtaí beo ar WhatsApp.',
    ogAlt: 'Nightlife Milan: Clubanna Eisiacha & Táblaí VIP i Milán',
    keywords: ['saol oíche milán', 'clubanna milán', 'táblaí vip milán', 'aperitivo milán'],
  },
  lv: {
    title: 'Nightlife Milan | Labākie klubi, VIP galdiņi un aperitivo Milānā',
    desc: 'Oficiālais Milānas naktsdzīves ceļvedis: ekskluzīvi klubi, VIP galdiņi, aperitivo un aktuālie pasākumi WhatsApp.',
    ogAlt: 'Nightlife Milan: Ekskluzīvi klubi un VIP galdiņi Milānā',
    keywords: ['naktsdzīve milāna', 'klubi milāna', 'vip galdiņi milāna', 'aperitivo milāna'],
  },
  lt: {
    title: 'Nightlife Milan | Geriausi klubai, VIP staliukai ir aperitivo Milane',
    desc: 'Oficialus Milano naktinio gyvenimo gidas: išskirtiniai klubai, VIP staliukai, aperitivo ir renginiai per WhatsApp.',
    ogAlt: 'Nightlife Milan: Išskirtiniai klubai ir VIP staliukai Milane',
    keywords: ['naktinis gyvenimas milanas', 'klubai milanas', 'vip staliukai milanas', 'aperitivo milanas'],
  },
  mt: {
    title: "Nightlife Milan | L-Aħjar Clubs, Mejdiet VIP u Aperitivo f'Milan",
    desc: "Il-gwida uffiċjali għall-ħajja ta' bil-lejl f'Milan: clubs esklussivi, mejdiet VIP, aperitivo u avvenimenti fuq WhatsApp.",
    ogAlt: "Nightlife Milan: Clubs Esklussivi u Mejdiet VIP f'Milan",
    keywords: ['nightlife milan', 'clubs milan', 'mejdiet vip milan', 'aperitivo milan'],
  },
  pl: {
    title: 'Nightlife Milan | Najlepsze kluby, stoliki VIP i aperitivo w Mediolanie',
    desc: 'Oficjalny przewodnik po życiu nocnym Mediolanu: ekskluzywne kluby, stoliki VIP, aperitivo i aktualne wydarzenia na WhatsApp.',
    ogAlt: 'Nightlife Milan: Ekskluzywne kluby i stoliki VIP w Mediolanie',
    keywords: ['życie nocne mediolan', 'kluby mediolan', 'stoliki vip mediolan', 'aperitivo mediolan'],
  },
  ro: {
    title: 'Nightlife Milan | Cele mai bune cluburi, mese VIP și aperitivo în Milano',
    desc: 'Ghidul oficial al vieții de noapte din Milano: cluburi exclusiviste, mese VIP, aperitivo și evenimente actuale pe WhatsApp.',
    ogAlt: 'Nightlife Milan: Cluburi exclusiviste și mese VIP în Milano',
    keywords: ['viața de noapte milano', 'cluburi milano', 'mese vip milano', 'aperitivo milano'],
  },
  sk: {
    title: 'Nightlife Milan | Najlepšie kluby, VIP stoly a aperitivo v Miláne',
    desc: 'Oficiálny sprievodca nočným životom v Miláne: exkluzívne kluby, VIP stoly, aperitivo a aktuálne podujatia cez WhatsApp.',
    ogAlt: 'Nightlife Milan: Exkluzívne kluby a VIP stoly v Miláne',
    keywords: ['nočný život miláno', 'kluby miláno', 'vip stoly miláno', 'aperitivo miláno'],
  },
  sl: {
    title: 'Nightlife Milan | Najboljši klubi, VIP mize in aperitivo v Milanu',
    desc: 'Uradni vodnik po nočnem življenju v Milanu: ekskluzivni klubi, VIP mize, aperitivo in aktualni dogodki prek WhatsAppa.',
    ogAlt: 'Nightlife Milan: Ekskluzivni klubi in VIP mize v Milanu',
    keywords: ['nočno življenje milano', 'klubi milano', 'vip mize milano', 'aperitivo milano'],
  },
  sv: {
    title: 'Nightlife Milan | Bästa klubbarna, VIP-bord och aperitivo i Milano',
    desc: 'Den officiella guiden till Milanos nattliv: exklusiva klubbar, VIP-bord, aperitivo och aktuella evenemang via WhatsApp.',
    ogAlt: 'Nightlife Milan: Exklusiva klubbar och VIP-bord i Milano',
    keywords: ['nattliv milano', 'klubbar milano', 'vip bord milano', 'aperitivo milano'],
  },
  no: {
    title: 'Nightlife Milan | Beste klubber, VIP-bord og aperitivo i Milano',
    desc: 'Den offisielle guiden til Milanos uteliv: eksklusive klubber, VIP-bord, aperitivo og aktuelle arrangementer på WhatsApp.',
    ogAlt: 'Nightlife Milan: Eksklusive klubber og VIP-bord i Milano',
    keywords: ['uteliv milano', 'klubber milano', 'vip bord milano', 'aperitivo milano'],
  },
  is: {
    title: 'Nightlife Milan | Bestu klúbbarnir, VIP-borð og aperitivo í Mílanó',
    desc: 'Opinber leiðarvísir um næturlífið í Mílanó: glæsilegir klúbbar, VIP-borð, aperitivo og viðburðir á WhatsApp.',
    ogAlt: 'Nightlife Milan: Glæsilegir klúbbar og VIP-borð í Mílanó',
    keywords: ['næturlíf mílanó', 'klúbbar mílanó', 'vip borð mílanó', 'aperitivo mílanó'],
  },
  uk: {
    title: 'Nightlife Milan | Найкращі клуби, VIP-столики та аперитиво в Мілані',
    desc: 'Офіційний гід нічним життям Мілана: ексклюзивні клуби, VIP-столики, аперитиво та актуальні події через WhatsApp.',
    ogAlt: 'Nightlife Milan: Ексклюзивні клуби та VIP-столики в Мілані',
    keywords: ['нічне життя мілан', 'клуби мілан', 'vip столики мілан', 'аперитиво мілан'],
  },
  sq: {
    title: 'Nightlife Milan | Klubet më të mira, tavolina VIP dhe aperitivo në Milano',
    desc: 'Udhëzuesi zyrtar i jetës së natës në Milano: klube ekskluzive, tavolina VIP, aperitivo dhe evente aktuale në WhatsApp.',
    ogAlt: 'Nightlife Milan: Klube ekskluzive dhe tavolina VIP në Milano',
    keywords: ['jeta e natës milano', 'klube milano', 'tavolina vip milano', 'aperitivo milano'],
  },
  sr: {
    title: 'Nightlife Milan | Najbolji klubovi, VIP stolovi i aperitivo u Milanu',
    desc: 'Zvanični vodič za noćni život Milana: ekskluzivni klubovi, VIP stolovi, aperitivo i aktuelni događaji putem WhatsAppa.',
    ogAlt: 'Nightlife Milan: Ekskluzivni klubovi i VIP stolovi u Milanu',
    keywords: ['noćni život milano', 'klubovi milano', 'vip stolovi milano', 'aperitivo milano'],
  },
  bs: {
    title: 'Nightlife Milan | Najbolji klubovi, VIP stolovi i aperitivo u Milanu',
    desc: 'Zvanični vodič za noćni život Milana: ekskluzivni klubovi, VIP stolovi, aperitivo i aktuelni događaji putem WhatsAppa.',
    ogAlt: 'Nightlife Milan: Ekskluzivni klubovi i VIP stolovi u Milanu',
    keywords: ['noćni život milano', 'klubovi milano', 'vip stolovi milano', 'aperitivo milano'],
  },
  mk: {
    title: 'Nightlife Milan | Најдобрите клубови, VIP маси и аперитиво во Милано',
    desc: 'Официјален водич за ноќниот живот во Милано: ексклузивни клубови, VIP маси, аперитиво и тековни настани преку WhatsApp.',
    ogAlt: 'Nightlife Milan: Ексклузивни клубови и VIP маси во Милано',
    keywords: ['ноќен живот милано', 'клубови милано', 'vip маси милано', 'аперитиво милано'],
  },
};

export function generateStaticParams() {
  return enabledLocaleCodes.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const code = (isEnabledLocale(locale) ? locale : DEFAULT_LOCALE) as LocaleCode;
  const meta = LAYOUT_META_35[code] || LAYOUT_META_35.en;

  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
  const path = localePrefix(code);
  const canonical = `${baseUrl}${path}` || baseUrl;
  const ogImage = `${baseUrl}/images/table-concierge/justme-night.webp`;
  const localeDef = getLocaleDef(code) || getLocaleDef(DEFAULT_LOCALE)!;

  const title = seoTitle(meta.title);
  const description = withWhatsApp(meta.desc, code);

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: title,
      template: '%s',
    },
    description,
    keywords: meta.keywords,
    alternates: {
      canonical,
      languages: hreflangAlternates(baseUrl, ''),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'Nightlife Milan',
      locale: localeDef.ogLocale,
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 900, alt: meta.ogAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    robots: localeDef.indexed
      ? {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
        }
      : { index: false, follow: true },
    other: {
      'og:locale:alternate': ENABLED_LOCALES.filter((item) => item.code !== localeDef.code)
        .slice(0, 8)
        .map((item) => item.ogLocale),
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isEnabledLocale(locale)) notFound();
  const sharedEditorialFields = await readEditorialFields('shared', locale);
  return <SiteShell locale={locale} editorialFields={sharedEditorialFields}>{children}</SiteShell>;
}
