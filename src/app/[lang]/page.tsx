import Link from "next/link";
import { ShieldCheck, MapPin, Radar, Droplets, ArrowRight, type LucideIcon } from "lucide-react";
import { getDictionary } from "@/dictionaries/get-dictionary";
import type { Locale } from "@/i18n";
import SatelliteOrbit from "@/components/SatelliteOrbit";
import Reveal from "@/components/Reveal";
import { Adinkra, BogolanTexture, KenteBand } from "@/components/AfricanPatterns";
import PresentationReel from "@/components/PresentationReel";
import CtaBand from "@/components/CtaBand";

const SERVICES: Array<{ key: "geoloc" | "security" | "prevention" | "epuration"; path: string; Icon: LucideIcon; accent: string }> = [
  { key: "geoloc", path: "/geolocalisation", Icon: MapPin, accent: "text-sahamaOrange bg-sahamaOrange/10" },
  { key: "security", path: "/securite", Icon: ShieldCheck, accent: "text-sahamaYellow bg-sahamaYellow/10" },
  { key: "prevention", path: "/prevention", Icon: Radar, accent: "text-terracotta bg-terracotta/15" },
  { key: "epuration", path: "/epuration", Icon: Droplets, accent: "text-kola bg-kola/15" },
];

export default async function Home({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const s = dict.services as Record<string, string>;

  return (
    <main className="bg-darkBg text-white relative">
      {/* Hero */}
      <section className="relative min-h-[min(72vh,760px)] flex items-center justify-center overflow-hidden pt-10 pb-20">
        <div className="absolute inset-0 z-0">
          <SatelliteOrbit className="w-full h-full" />
          <BogolanTexture opacity={0.045} />
          <div className="absolute inset-0 bg-gradient-to-t from-darkBg via-darkBg/30 to-darkBg/10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_42%_at_50%_50%,rgba(11,16,36,0.75),transparent_75%)]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 border border-sahamaOrange/30 text-sahamaYellow text-xs md:text-sm mb-7">
            <span className="w-2 h-2 rounded-full bg-sahamaOrange animate-pulse" />
            {dict.hero.badge}
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-[1.1] text-cream">
            {dict.hero.title1}
            <span className="bg-gradient-to-r from-sahamaOrange via-sahamaYellow to-sahamaOrange bg-clip-text text-transparent">
              {dict.hero.title2}
            </span>
          </h1>

          <p className="text-base md:text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            {dict.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${lang}/geolocalisation`}
              className="bg-sahamaOrange hover:bg-[#ff8c24] text-darkBg font-semibold px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-sahamaOrange/25"
            >
              {dict.hero.ctaPrimary} <ArrowRight size={20} />
            </Link>
            <Link
              href={`/${lang}/epuration`}
              className="border border-zinc-600 hover:border-sahamaYellow bg-zinc-900/60 backdrop-blur text-cream font-semibold px-8 py-4 rounded-xl transition-all"
            >
              {dict.hero.ctaSecondary}
            </Link>
          </div>
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map(({ key, path, Icon, accent }, i) => (
            <Reveal key={key} delay={i * 100}>
              <Link
                href={`/${lang}${path}`}
                className="group relative block h-full bg-cardBg p-7 rounded-2xl border border-zinc-800 hover:border-sahamaOrange/60 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-sahamaOrange/10 transition-all overflow-hidden"
              >
                <BogolanTexture opacity={0.035} />
                <div className="relative">
                  <div className={`p-3 rounded-xl w-fit mb-5 ${accent}`}>
                    <Icon size={26} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-cream">{s[`${key}Title`]}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-5">{s[`${key}Desc`]}</p>
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

      <PresentationReel reel={dict.home.reel as Parameters<typeof PresentationReel>[0]["reel"]} />

      <CtaBand lang={lang} dict={dict} />
    </main>
  );
}
