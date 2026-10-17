import Image from "next/image";
import Link from "next/link";
import { Activity, AlertTriangle, ArrowRight, BarChart3, Bell, ShieldAlert, Wrench } from "lucide-react";
import { getDictionary } from "@/dictionaries/get-dictionary";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import { Adinkra, BogolanTexture, KenteBand } from "@/components/AfricanPatterns";
import type { Metadata } from "next";
import type { Locale } from "@/i18n";
import { pageMetadata } from "@/seo";
import PredictiveAnalysisPanel from "@/components/PredictiveAnalysisPanel";

const ICONS = [AlertTriangle, Wrench, Bell, BarChart3, Activity, ShieldAlert];

// The four steps read as a journey from detection (orange) to resolution (green);
// colour lives only on the timeline nodes, everything else stays neutral.
const STEP_COLORS = ["#FF7A00", "#F0B03F", "#C4532F", "#2F8F5B"];

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return pageMetadata(lang, "/prevention", dict.nav.prevention, dict.preventionPage.subtitle);
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-sahamaOrange font-semibold text-xs uppercase tracking-[0.2em]">
      <Adinkra size={12} /> {children}
    </span>
  );
}

export default async function PreventionPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const t = dict.preventionPage;

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden pt-14 pb-20 md:pt-20 md:pb-28">
        <BogolanTexture opacity={0.04} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_50%_at_80%_40%,rgba(255,122,0,0.08),transparent_70%)]" />
        <div className="relative max-w-7xl mx-auto px-4 grid lg:grid-cols-[1fr,1.05fr] gap-14 items-center">
          <div className="text-center lg:text-left">
            <Kicker>{t.kicker}</Kicker>
            <h1 className="text-4xl md:text-[3.25rem] font-bold text-cream mt-5 mb-6 leading-[1.1]">
              {t.title1}
              <span className="text-sahamaYellow">{t.title2}</span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 mb-9">{t.subtitle}</p>
            <Link
              href={`/${lang}/contact#devis`}
              className="inline-flex items-center gap-2 bg-sahamaOrange hover:bg-[#ff8c24] text-darkBg font-semibold px-7 py-3.5 rounded-xl transition-all shadow-lg shadow-sahamaOrange/25"
            >
              {dict.home.ctaButton} <ArrowRight size={18} />
            </Link>
          </div>

          <div className="relative pb-24 sm:pb-16 lg:pb-0">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl shadow-black/50">
              <Image
                src="/photos/intervention-tech.webp"
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-[65%_center]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-darkBg/60 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-4 left-4 right-4 sm:right-auto sm:w-[22rem] sm:-left-6 lg:-left-14 lg:-bottom-16">
              <PredictiveAnalysisPanel title={t.panelTitle} status={t.panelStatus} footer={t.panelFooter} />
            </div>
          </div>
        </div>
      </section>

      {/* Method: timeline */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <Kicker>{t.processKicker}</Kicker>
          <h2 className="text-3xl md:text-4xl font-bold text-cream mt-3">{t.processTitle}</h2>
        </div>

        <ol className="relative grid gap-12 md:grid-cols-4 md:gap-8">
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-7 left-[12.5%] right-[12.5%] h-px"
            style={{ background: `linear-gradient(90deg, ${STEP_COLORS.join(", ")})` }}
          />
          {t.steps.map((step: { num: string; title: string; desc: string }, i: number) => (
            <Reveal key={step.num} delay={i * 120}>
              <li className="relative text-center px-2">
                <span
                  className="relative z-10 mx-auto mb-6 flex w-14 h-14 items-center justify-center rounded-full bg-darkBg font-mono text-lg font-semibold"
                  style={{ color: STEP_COLORS[i], boxShadow: `0 0 0 2px ${STEP_COLORS[i]}, 0 0 28px ${STEP_COLORS[i]}40` }}
                >
                  {step.num}
                </span>
                <h3 className="text-lg font-semibold text-cream mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed max-w-[16rem] mx-auto">{step.desc}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Capabilities: editorial list */}
      <section className="relative border-y border-zinc-800 bg-[#0D1330]">
        <BogolanTexture opacity={0.03} />
        <div className="relative max-w-7xl mx-auto px-4 py-20 grid lg:grid-cols-[0.85fr,1.15fr] gap-14">
          <div className="lg:sticky lg:top-28 self-start">
            <Kicker>{t.featuresKicker}</Kicker>
            <h2 className="text-3xl md:text-4xl font-bold text-cream mt-3 mb-5">{t.featuresTitle}</h2>
            <p className="text-gray-400 leading-relaxed mb-8">{t.featuresIntro}</p>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-800">
              <Image src="/photos/capteur-eau.webp" alt="" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              <KenteBand className="absolute bottom-0 h-1.5" />
            </div>
          </div>

          <ul className="divide-y divide-zinc-800">
            {t.features.map((feature: { title: string; desc: string }, i: number) => {
              const Icon = ICONS[i];
              return (
                <li key={feature.title} className="group flex gap-6 py-7 first:pt-0 last:pb-0">
                  <span className="font-mono text-xs text-gray-500 pt-1.5 w-6 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <span className="shrink-0 flex w-11 h-11 items-center justify-center rounded-xl border border-zinc-700 text-sahamaOrange group-hover:border-sahamaOrange/60 group-hover:bg-sahamaOrange/10 transition">
                    <Icon size={20} strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-cream mb-1.5">{feature.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <div className="pt-20">
        <CtaBand lang={lang} dict={dict} />
      </div>
    </div>
  );
}
