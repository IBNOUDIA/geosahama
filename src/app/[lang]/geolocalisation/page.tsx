import Image from "next/image";
import Link from "next/link";
import { ArrowRight, LocateFixed, LogIn, MapPin, Route, Search } from "lucide-react";
import GoogleMapView from "@/components/GoogleMapView";
import CtaBand from "@/components/CtaBand";
import { KenteBand } from "@/components/AfricanPatterns";
import { SectionHeading, ServiceHero } from "@/components/ServiceSections";
import { getDictionary } from "@/dictionaries/get-dictionary";
import type { Metadata } from "next";
import type { Locale } from "@/i18n";
import { pageMetadata } from "@/seo";

const HIGHLIGHT_ICONS = [Search, LocateFixed, Route];

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return pageMetadata(lang, "/geolocalisation", dict.nav.geoloc, dict.geolocalisationPage.subtitle);
}

export default async function GeolocalisationPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const t = dict.geolocalisationPage;

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const hasKey = Boolean(apiKey) && apiKey !== "YOUR_GOOGLE_MAPS_API_KEY";

  return (
    <div>
      <ServiceHero
        kicker={t.kicker}
        title1={t.title1}
        title2={t.title2}
        accentClass="text-sahamaOrange"
        subtitle={t.subtitle}
        photo="/photos/geolocalisation.webp"
        cta={{ href: `/${lang}/contact#devis`, label: dict.home.ctaButton }}
      />

      {/* Interactive map */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <SectionHeading kicker={t.mapKicker} title={t.mapTitle} intro={t.mapIntro} />

        <div className="rounded-3xl overflow-hidden border border-zinc-800 bg-cardBg shadow-2xl shadow-black/40">
          <div className="w-full h-[460px] md:h-[540px] relative">
            {hasKey ? (
              <GoogleMapView apiKey={apiKey as string} t={t} />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 relative">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#FF7A00_1px,transparent_1px)] [background-size:16px_16px]" />
                <MapPin size={48} className="text-sahamaOrange mb-4 animate-bounce" />
                <h3 className="text-xl font-bold text-cream mb-2">{t.mapFallbackTitle}</h3>
                <p className="text-gray-400 text-sm text-center max-w-md">
                  {t.mapFallbackBefore} <code className="text-sahamaYellow">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code>{" "}
                  {t.mapFallbackMiddle} <code className="text-sahamaYellow">.env.local</code> {t.mapFallbackAfter}
                </p>
              </div>
            )}
          </div>
          <KenteBand className="h-1.5" />
        </div>

        <ul className="grid md:grid-cols-3 gap-8 mt-12">
          {t.highlights.map((h: { title: string; desc: string }, i: number) => {
            const Icon = HIGHLIGHT_ICONS[i];
            return (
              <li key={h.title} className="flex gap-4">
                <span className="shrink-0 flex w-11 h-11 items-center justify-center rounded-xl border border-zinc-700 text-sahamaOrange">
                  <Icon size={20} strokeWidth={1.75} />
                </span>
                <div>
                  <h3 className="font-semibold text-cream mb-1">{h.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{h.desc}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Client portal teaser */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <Link
          href={`/${lang}/espace-client`}
          className="group grid md:grid-cols-[1fr,1.2fr] rounded-3xl overflow-hidden border border-zinc-800 bg-[#0D1330] hover:border-sahamaOrange/50 transition"
        >
          <div className="relative min-h-[220px]">
            <Image src="/photos/balise-gps.webp" alt="" fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover group-hover:scale-105 transition duration-500" />
          </div>
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-bold text-cream mb-3">{t.portalTitle}</h2>
            <p className="text-gray-400 leading-relaxed mb-6">{t.portalText}</p>
            <span className="inline-flex items-center gap-2 text-sahamaOrange font-semibold">
              <LogIn size={18} /> {dict.nav.clientSpace}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </Link>
      </section>

      <CtaBand lang={lang} dict={dict} />
    </div>
  );
}
