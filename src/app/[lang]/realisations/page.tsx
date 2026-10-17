import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Info, MapPin } from "lucide-react";
import { getDictionary } from "@/dictionaries/get-dictionary";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import { KenteBand } from "@/components/AfricanPatterns";
import { SectionHeading, ServiceHero, Timeline } from "@/components/ServiceSections";
import type { Metadata } from "next";
import type { Locale } from "@/i18n";
import { pageMetadata } from "@/seo";

const STEP_COLORS = ["#FF7A00", "#F0B03F", "#2E8BC0", "#2F8F5B"];

// Service keys used in the case texts, mapped to their page and menu label.
const SERVICE_LINKS: Record<string, { href: string; navKey: "geoloc" | "security" | "prevention" | "epuration" }> = {
  geoloc: { href: "/geolocalisation", navKey: "geoloc" },
  security: { href: "/securite", navKey: "security" },
  prevention: { href: "/prevention", navKey: "prevention" },
  epuration: { href: "/epuration", navKey: "epuration" },
};

type Case = {
  example: boolean;
  sector: string;
  place: string;
  title: string;
  photo: string;
  challenge: string;
  solution: string[];
  tracked: string[];
  services: string[];
};

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return pageMetadata(lang, "/realisations", dict.nav.cases, dict.realisationsPage.subtitle);
}

export default async function RealisationsPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const t = dict.realisationsPage;
  const cases: Case[] = t.cases;
  const hasExamples = cases.some((c) => c.example);

  return (
    <div>
      <ServiceHero
        kicker={t.kicker}
        title1={t.title1}
        title2={t.title2}
        accentClass="text-sahamaYellow"
        subtitle={t.subtitle}
        photo="/photos/intervention-tech.webp"
        photoPosition="40% center"
        cta={{ href: `/${lang}/contact#devis`, label: dict.home.ctaButton }}
      />

      <section className="max-w-7xl mx-auto px-4 pt-4 pb-20">
        <SectionHeading kicker={t.casesKicker} title={t.casesTitle} />

        {/* Shown while the page still holds typical scenarios rather than named client cases. */}
        {hasExamples && (
          <div className="max-w-3xl mx-auto -mt-6 mb-14 flex gap-3 rounded-2xl border border-sahamaYellow/25 bg-sahamaYellow/5 p-5 text-sm">
            <Info size={18} className="text-sahamaYellow shrink-0 mt-0.5" />
            <p className="text-gray-300 leading-relaxed">
              <span className="font-semibold text-cream">{t.noticeTitle}. </span>
              {t.noticeText}
            </p>
          </div>
        )}

        <div className="space-y-12 md:space-y-16">
          {cases.map((item, i) => (
            <Reveal key={item.title}>
              <article className="grid lg:grid-cols-2 rounded-3xl overflow-hidden border border-zinc-800 bg-cardBg">
                <div className={`relative min-h-[260px] lg:min-h-full ${i % 2 ? "lg:order-2" : ""}`}>
                  <Image src={item.photo} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-darkBg/70 via-transparent to-transparent" />
                  <div className="absolute left-5 bottom-5 right-5 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-darkBg/80 backdrop-blur px-3 py-1 text-xs font-semibold text-cream">{item.sector}</span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-darkBg/80 backdrop-blur px-3 py-1 text-xs text-gray-300">
                      <MapPin size={12} className="text-sahamaOrange" /> {item.place}
                    </span>
                  </div>
                  <KenteBand className="absolute bottom-0 h-1.5" />
                </div>

                <div className="p-7 md:p-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-sm text-sahamaOrange">{String(i + 1).padStart(2, "0")}</span>
                    {item.example && (
                      <span className="rounded-md border border-zinc-700 px-2 py-0.5 text-[11px] uppercase tracking-wider text-gray-400">
                        {t.exampleBadge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl md:text-[1.7rem] font-bold text-cream leading-snug mb-5">{item.title}</h3>

                  <p className="text-xs uppercase tracking-[0.18em] text-gray-500 mb-2">{t.challengeLabel}</p>
                  <p className="text-gray-300 leading-relaxed mb-7">{item.challenge}</p>

                  <p className="text-xs uppercase tracking-[0.18em] text-gray-500 mb-3">{t.solutionLabel}</p>
                  <ul className="space-y-2.5 mb-7">
                    {item.solution.map((line) => (
                      <li key={line} className="flex gap-3 text-sm text-gray-300">
                        <Check size={16} className="text-sahamaOrange shrink-0 mt-0.5" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="text-xs uppercase tracking-[0.18em] text-gray-500 mb-3">{t.trackedLabel}</p>
                  <ul className="flex flex-wrap gap-2 mb-7">
                    {item.tracked.map((line) => (
                      <li key={line} className="rounded-lg border border-sahamaYellow/20 bg-sahamaYellow/5 px-3 py-1.5 text-xs text-sahamaYellow">
                        {line}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-5 border-t border-zinc-800 text-sm">
                    <span className="text-xs uppercase tracking-[0.18em] text-gray-500">{t.servicesLabel}</span>
                    {item.services.map((key) => {
                      const service = SERVICE_LINKS[key];
                      return (
                        <Link
                          key={key}
                          href={`/${lang}${service.href}`}
                          className="inline-flex items-center gap-1 font-semibold text-cream hover:text-sahamaYellow transition"
                        >
                          {dict.nav[service.navKey]} <ArrowRight size={14} />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="border-t border-zinc-800">
        <Timeline kicker={t.methodKicker} title={t.methodTitle} steps={t.method} colors={STEP_COLORS} />
      </div>

      <section className="max-w-3xl mx-auto px-4 pb-20 text-center">
        <h2 className="text-2xl font-bold text-cream mb-3">{t.shareTitle}</h2>
        <p className="text-gray-400 leading-relaxed mb-6">{t.shareText}</p>
        <Link
          href={`/${lang}/contact`}
          className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 px-6 py-3 font-semibold text-cream hover:border-sahamaOrange/60 hover:bg-sahamaOrange/10 transition"
        >
          {t.shareButton} <ArrowRight size={18} />
        </Link>
      </section>

      <CtaBand lang={lang} dict={dict} />
    </div>
  );
}
