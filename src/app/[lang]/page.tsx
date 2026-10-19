import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, MapPin, Radar, ArrowRight, type LucideIcon } from "lucide-react";
import { getDictionary } from "@/dictionaries/get-dictionary";
import type { Locale } from "@/i18n";
import Reveal from "@/components/Reveal";
import { Adinkra, BogolanTexture, KenteBand } from "@/components/AfricanPatterns";
import PresentationReel from "@/components/PresentationReel";
import VideoShowcase from "@/components/VideoShowcase";
import CtaBand from "@/components/CtaBand";

const SERVICES: Array<{
  key: "geoloc" | "security" | "prevention";
  path: string;
  Icon: LucideIcon;
  accent: string;
  photo: string;
}> = [
  { key: "geoloc", path: "/geolocalisation", Icon: MapPin, accent: "text-sahamaOrange", photo: "/photos/balise-gps.webp" },
  { key: "security", path: "/securite", Icon: ShieldCheck, accent: "text-sahamaYellow", photo: "/photos/test-telemetrie.webp" },
  { key: "prevention", path: "/prevention", Icon: Radar, accent: "text-terracotta", photo: "/photos/intervention-tech.webp" },
];

type CaseSummary = { example: boolean; sector: string; place: string; title: string; photo: string };

export default async function Home({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const s = dict.services as Record<string, string>;
  const cases = dict.realisationsPage;

  return (
    <main className="bg-darkBg text-white relative">
      {/* Hero: full-width field photo with the three services as quick links */}
      <section className="relative min-h-[min(92vh,860px)] flex flex-col justify-end overflow-hidden">
        <Image
          src="/photos/geolocalisation.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "62% center" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-darkBg/90 via-darkBg/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-darkBg via-darkBg/10 to-darkBg/30" />

        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 pt-20 pb-28 md:pb-32">
          <div className="max-w-2xl text-center lg:text-left mx-auto lg:mx-0">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-darkBg/70 backdrop-blur border border-sahamaOrange/30 text-sahamaYellow text-xs md:text-sm mb-7">
              <span className="w-2 h-2 rounded-full bg-sahamaOrange animate-pulse motion-reduce:animate-none" />
              {dict.hero.badge}
            </div>

            <h1 className="text-4xl md:text-[3.6rem] font-bold mb-6 leading-[1.08] text-cream">
              {dict.hero.title1}
              <span className="text-sahamaOrange">{dict.hero.title2}</span>
            </h1>

            <p className="text-base md:text-lg text-gray-200 mb-10 leading-relaxed">{dict.hero.subtitle}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href={`/${lang}/geolocalisation`}
                className="bg-sahamaOrange hover:bg-[#ff8c24] text-darkBg font-semibold px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-sahamaOrange/25"
              >
                {dict.hero.ctaPrimary} <ArrowRight size={20} />
              </Link>
              <Link
                href={`/${lang}/realisations`}
                className="border border-cream/30 hover:border-sahamaYellow bg-darkBg/50 backdrop-blur text-cream font-semibold px-8 py-4 rounded-xl text-center transition-all"
              >
                {dict.hero.ctaSecondary}
              </Link>
            </div>
          </div>

          <nav aria-label={dict.home.servicesKicker} className="mt-14 grid sm:grid-cols-3 gap-3 max-w-4xl mx-auto lg:mx-0">
            {SERVICES.map(({ key, path, Icon, accent }) => (
              <Link
                key={key}
                href={`/${lang}${path}`}
                className="group flex items-center gap-3 rounded-2xl border border-cream/15 bg-darkBg/60 backdrop-blur-md px-4 py-3.5 hover:border-sahamaOrange/60 hover:bg-darkBg/80 transition"
              >
                <span className={`shrink-0 flex w-10 h-10 items-center justify-center rounded-xl bg-cardBg ring-1 ring-zinc-700 ${accent}`}>
                  <Icon size={19} />
                </span>
                <span className="flex-1 text-sm font-semibold text-cream">{s[`${key}Title`]}</span>
                <ArrowRight size={16} className="text-sahamaOrange group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
          </nav>
        </div>
      </section>

      {/* Key figures */}
      <section className="relative z-10 -mt-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-cardBg/90 backdrop-blur border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
            <KenteBand className="h-1.5" />
            <dl className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-zinc-800">
              {dict.home.stats.map((stat: { value: string; label: string }) => (
                <div key={stat.label} className="px-6 py-6 text-center">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-mono text-3xl md:text-4xl font-semibold text-sahamaYellow">{stat.value}</dd>
                  <dd className="text-gray-400 text-xs md:text-sm mt-1.5">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="max-w-7xl mx-auto px-4 pt-24 pb-20">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-sahamaOrange font-semibold text-xs uppercase tracking-[0.2em]">
            <Adinkra size={12} /> {dict.home.servicesKicker} <Adinkra size={12} />
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 text-cream max-w-3xl mx-auto">{dict.home.servicesTitle}</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {SERVICES.map(({ key, path, Icon, accent, photo }, i) => (
            <Reveal key={key} delay={i * 100}>
              <Link
                href={`/${lang}${path}`}
                className="group relative flex flex-col h-full bg-cardBg rounded-2xl border border-zinc-800 hover:border-sahamaOrange/60 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-sahamaOrange/10 transition-all overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={photo}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cardBg via-cardBg/20 to-transparent" />
                </div>
                <BogolanTexture opacity={0.035} />
                <div className="relative px-7 pb-7 -mt-7 flex-1 flex flex-col">
                  <div className={`p-3 rounded-xl w-fit mb-4 backdrop-blur bg-cardBg/80 ring-1 ring-zinc-700 ${accent}`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-cream">{s[`${key}Title`]}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-1">{s[`${key}Desc`]}</p>
                  <span className="inline-flex items-center gap-1.5 text-sahamaOrange text-sm font-semibold">
                    {dict.home.learnMore}
                    <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Case studies teaser */}
      <section className="relative border-y border-zinc-800 bg-[#0D1330]">
        <BogolanTexture opacity={0.03} />
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 text-sahamaOrange font-semibold text-xs uppercase tracking-[0.2em]">
                <Adinkra size={12} /> {cases.kicker}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-3 text-cream">{cases.casesTitle}</h2>
            </div>
            <Link
              href={`/${lang}/realisations`}
              className="shrink-0 inline-flex items-center gap-2 text-sahamaOrange font-semibold hover:text-sahamaYellow transition"
            >
              {dict.hero.ctaSecondary} <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {(cases.cases as CaseSummary[]).map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <Link
                  href={`/${lang}/realisations`}
                  className="group relative block h-full min-h-[320px] rounded-2xl overflow-hidden border border-zinc-800 hover:border-sahamaOrange/60 transition"
                >
                  <Image
                    src={item.photo}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-darkBg via-darkBg/70 to-darkBg/10" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="flex flex-wrap items-center gap-2 mb-3 text-xs">
                      <span className="rounded-full bg-darkBg/80 px-3 py-1 font-semibold text-cream">{item.sector}</span>
                      <span className="inline-flex items-center gap-1 text-gray-300">
                        <MapPin size={12} className="text-sahamaOrange" /> {item.place}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-cream leading-snug">{item.title}</h3>
                    {item.example && (
                      <p className="mt-3 text-[11px] uppercase tracking-wider text-gray-400">{cases.exampleBadge}</p>
                    )}
                  </div>
                  <KenteBand className="absolute bottom-0 h-1" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="pb-16">
        <VideoShowcase video={dict.home.video} />
      </div>

      <PresentationReel reel={dict.home.reel as Parameters<typeof PresentationReel>[0]["reel"]} />

      <CtaBand lang={lang} dict={dict} />
    </main>
  );
}
