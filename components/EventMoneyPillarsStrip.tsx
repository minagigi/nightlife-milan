import Link from '@/components/LocalizedLink';
import { localePrefix, type LocaleCode } from '@/lib/i18n/locales';
import { CAPODANNO_NAVIGATION } from '@/lib/capodanno/routes';
import { SLUG_TOKENS_35 } from '@/lib/i18n/localizedSlugs35';
import { getVenueUi35 } from '@/lib/venueDossiers35';

interface Props {
  locale: string;
}

const SAN_SIRO_HUB_TITLES_35: Record<LocaleCode, { title: string; desc: string }> = {
  en: { title: 'San Siro Football Afterparties in Milan', desc: 'Aria Club 150m from the stadium, Just Me 7/7, Voya M5, and late clubs after Serie A & Champions.' },
  it: { title: 'Dopo-Partita Calcio San Siro a Milano', desc: 'Aria Club a 150m dallo stadio, Just Me 7/7, Voya M5 e club aperti dopo Serie A e Champions.' },
  es: { title: 'Fiestas Post-Partido San Siro en Milán', desc: 'Aria Club a 150m del estadio, Just Me 7/7, Voya M5 y discotecas tras Serie A y Champions.' },
  fr: { title: 'Afterparties Football San Siro à Milan', desc: 'Aria Club à 150m du stade, Just Me 7j/7, Voya M5 et clubs ouverts après Serie A et Champions.' },
  de: { title: 'San Siro Fußball-Afterpartys in Mailand', desc: 'Aria Club 150m vom Stadion, Just Me 7/7, Voya M5 und Clubs nach Serie A & Champions League.' },
  pt: { title: 'Afterparties Futebol San Siro em Milão', desc: 'Aria Club a 150m do estádio, Just Me 7/7, Voya M5 e discotecas após Serie A e Champions.' },
  nl: { title: 'San Siro Voetbal Afterparty in Milaan', desc: 'Aria Club op 150m van het stadion, Just Me 7/7, Voya M5 en clubs na Serie A & Champions League.' },
  ru: { title: 'Афтепати после матчей Сан-Сиро в Милане', desc: 'Aria Club в 150 м от стадиона, Just Me 7/7, Voya M5 и клубы после матчей Серии А и ЛЧ.' },
  tr: { title: 'San Siro Maç Sonrası Partiler Milano', desc: 'Stadyuma 150m Aria Club, Just Me 7/7, Voya M5 ve Serie A / Şampiyonlar Ligi sonrası kulüpler.' },
  zh: { title: '圣西罗球赛赛后派对 米兰', desc: '距球场150米Aria Club、Just Me每周7天营业、Voya M5及意甲欧冠赛后夜店指南。' },
  ar: { title: 'حفلات ما بعد مباريات سان سيرو ميلانو', desc: 'نادي Aria على بعد 150م من الملعب، Just Me طوال الأسبوع 7/7، وVoya M5 بعد مباريات الدوري والأبطال.' },
  bg: { title: 'Афтърпарти след мач на Сан Сиро Милано', desc: 'Aria Club на 150 м от стадиона, Just Me 7/7 и Voya M5 след Серия А и Шампионска лига.' },
  hr: { title: 'San Siro Afterparty nakon utakmica Milano', desc: 'Aria Club 150m od stadiona, Just Me 7/7 i Voya M5 nakon utakmica Serie A i Lige prvaka.' },
  cs: { title: 'Afterparty po fotbale San Siro Milán', desc: 'Aria Club 150 m od stadionu, Just Me 7/7 a Voya M5 po zápasech Serie A a Ligy mistrů.' },
  da: { title: 'San Siro Fodbold Afterparty i Milano', desc: 'Aria Club 150 m fra stadion, Just Me 7/7 og Voya M5 efter Serie A og Champions League.' },
  et: { title: 'San Siro jalgpalli järelpeod Milanos', desc: 'Aria Club 150 m staadionist, Just Me 7/7 ja Voya M5 pärast Serie A ja Meistrite liiga mänge.' },
  fi: { title: 'San Siro jalkapallon jatkobileet Milanossa', desc: 'Aria Club 150 m stadionilta, Just Me 7/7 ja Voya M5 Serie A- ja Mestarien liiga -otteluiden jälkeen.' },
  el: { title: 'Afterparty Αγώνων Σαν Σίρο στο Μιλάνο', desc: 'Aria Club 150μ από το γήπεδο, Just Me 7/7 και Voya M5 μετά από αγώνες Serie A & Champions League.' },
  hu: { title: 'San Siro meccs utáni afterparty Milánó', desc: 'Aria Club 150 m-re a stadiontól, Just Me 7/7 és Voya M5 a Serie A és BL-mérkőzések után.' },
  ga: { title: 'Cóisirí Tar Éis Cluichí San Siro Milano', desc: 'Aria Club 150m ón staidiam, Just Me 7/7 agus Voya M5 i ndiaidh cluichí Serie A & Champions League.' },
  lv: { title: 'San Siro futbola afterparty Milānā', desc: 'Aria Club 150 m no stadiona, Just Me 7/7 un Voya M5 pēc Serie A un Čempionu līgas spēlēm.' },
  lt: { title: 'San Siro futbolo vakarėliai Milane', desc: 'Aria Club 150 m nuo stadiono, Just Me 7/7 ir Voya M5 po Serie A bei Čempionų lygos rungtynių.' },
  mt: { title: 'Afterparties tal-Futbol San Siro Milan', desc: 'Aria Club 150m mill-istadium, Just Me 7/7 u Voya M5 wara logħbiet tas-Serie A u Champions League.' },
  pl: { title: 'Afterparty po meczach na San Siro Mediolan', desc: 'Aria Club 150 m od stadionu, Just Me 7/7 oraz Voya M5 po meczach Serie A i Ligi Mistrzów.' },
  ro: { title: 'Petreceri După Meci San Siro în Milano', desc: 'Aria Club la 150m de stadion, Just Me 7/7 și Voya M5 după meciurile din Serie A și Champions League.' },
  sk: { title: 'Afterparty po futbale San Siro Miláno', desc: 'Aria Club 150 m od štadióna, Just Me 7/7 a Voya M5 po zápasoch Serie A a Ligy majstrov.' },
  sl: { title: 'Zabave po tekmah San Siro v Milanu', desc: 'Aria Club 150 m od stadiona, Just Me 7/7 in Voya M5 po tekmah Serie A in Lige prvakov.' },
  sv: { title: 'San Siro Fotboll Afterparty i Milano', desc: 'Aria Club 150 m från arenan, Just Me 7/7 och Voya M5 efter Serie A och Champions League.' },
  no: { title: 'San Siro Fotball Afterparty i Milano', desc: 'Aria Club 150 m fra stadion, Just Me 7/7 og Voya M5 etter Serie A og Champions League.' },
  is: { title: 'San Siro Fótbolta Eftirpartý í Mílanó', desc: 'Aria Club 150 m frá leikvanginum, Just Me 7/7 og Voya M5 eftir Serie A og Meistaradeildina.' },
  uk: { title: 'Афтепаті після матчів Сан-Сіро в Мілані', desc: 'Aria Club за 150 м від стадіону, Just Me 7/7 та Voya M5 після матчів Серії А та Ліги чемпіонів.' },
  sq: { title: 'Festa Pas Ndeshjeve San Siro në Milano', desc: 'Aria Club 150m nga stadiumi, Just Me 7/7 dhe Voya M5 pas ndeshjeve të Serie A dhe Champions.' },
  sr: { title: 'San Siro Afterparty posle utakmica Milano', desc: 'Aria Club 150m od stadiona, Just Me 7/7 i Voya M5 posle mečeva Serie A i Lige šampiona.' },
  bs: { title: 'San Siro Afterparty poslije utakmica Milano', desc: 'Aria Club 150m od stadiona, Just Me 7/7 i Voya M5 nakon utakmica Serie A i Lige prvaka.' },
  mk: { title: 'Афтерпарти по натпревари на Сан Сиро Милано', desc: 'Aria Club на 150 м од стадионот, Just Me 7/7 и Voya M5 по натпревари од Серија А и ЛШ.' },
};

export default function EventMoneyPillarsStrip({ locale }: Props) {
  const loc = (SAN_SIRO_HUB_TITLES_35[locale as LocaleCode] ? locale : 'en') as LocaleCode;
  const prefix = localePrefix(loc);
  const tk = SLUG_TOKENS_35[loc] || SLUG_TOKENS_35.en;
  const nyeNav = CAPODANNO_NAVIGATION[loc] || CAPODANNO_NAVIGATION.en;
  const ui35 = getVenueUi35(loc);
  const sanSiro = SAN_SIRO_HUB_TITLES_35[loc];

  const cards = [
    {
      href: `${prefix}/vip-tables`,
      eyebrow: tk.vipTables.replace(/-/g, ' ').toUpperCase(),
      title: ui35.labelPrices,
      desc: `${ui35.bookWhatsApp} · +39 351 912 7047`,
    },
    {
      href: `${prefix}/new-years-eve`,
      eyebrow: `${nyeNav.menuLabel.toUpperCase()} 2027`,
      title: nyeNav.h1,
      desc: `31/12/2026 · ${ui35.bookWhatsApp} +39 351 912 7047`,
    },
    {
      href: `${prefix}/football-afterparties`,
      eyebrow: 'SAN SIRO · INTER & AC MILAN',
      title: sanSiro.title,
      desc: sanSiro.desc,
    },
  ];

  return (
    <section
      aria-label={ui35.servicesTitle}
      data-event-money-pillars
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 border-t border-[#F6F1E7]/14"
    >
      <h2 className="font-serif text-2xl font-bold text-[#F6F1E7] mb-6">{ui35.servicesTitle}</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group block border border-[#F6F1E7]/18 bg-[#0B0A09] p-6 transition hover:border-[#F6F1E7]/50"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#C2B9AA]">
              {card.eyebrow}
            </p>
            <h3 className="mt-2 font-serif text-lg font-semibold text-[#F6F1E7] group-hover:underline">
              {card.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#C2B9AA]">{card.desc}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
