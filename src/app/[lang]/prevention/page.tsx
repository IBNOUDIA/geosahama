import { Activity, AlertTriangle, BarChart3, Bell, ShieldAlert, Wrench } from "lucide-react";
import { getDictionary } from "@/dictionaries/get-dictionary";
import type { Metadata } from "next";
import type { Locale } from "@/i18n";
import { pageMetadata } from "@/seo";
import SatelliteOrbit from "@/components/SatelliteOrbit";
import PredictiveAnalysisPanel from "@/components/PredictiveAnalysisPanel";

const ICONS = [AlertTriangle, Wrench, Bell, BarChart3, Activity, ShieldAlert];

// Each card gets its own clearly-colored background, telling a visual
// story from detection (orange) through to resolved (green).
const COLOR_STYLES = [
  { bg: "bg-orange-900", border: "border-orange-700/60 hover:border-orange-400/80", chip: "bg-black/25 text-orange-300", text: "text-orange-300" },
  { bg: "bg-amber-900", border: "border-amber-700/60 hover:border-amber-400/80", chip: "bg-black/25 text-amber-300", text: "text-amber-300" },
  { bg: "bg-red-900", border: "border-red-700/60 hover:border-red-400/80", chip: "bg-black/25 text-red-300", text: "text-red-300" },
  { bg: "bg-sky-900", border: "border-sky-700/60 hover:border-sky-400/80", chip: "bg-black/25 text-sky-300", text: "text-sky-300" },
  { bg: "bg-teal-900", border: "border-teal-700/60 hover:border-teal-400/80", chip: "bg-black/25 text-teal-300", text: "text-teal-300" },
  { bg: "bg-emerald-900", border: "border-emerald-700/60 hover:border-emerald-400/80", chip: "bg-black/25 text-emerald-300", text: "text-emerald-300" },
];

// Steps follow a shorter arc: detection -> analysis -> alert -> resolved
const STEP_COLOR_INDEXES = [0, 1, 2, 5];

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return pageMetadata(lang, "/prevention", dict.nav.prevention, dict.preventionPage.subtitle);
}

export default async function PreventionPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const t = dict.preventionPage;

  return (
    <div>
      <section className="relative overflow-hidden py-16 md:py-20">
        <div className="absolute inset-0 z-0">
          <SatelliteOrbit className="w-full h-full" showSatellite={false} />
          <div className="absolute inset-0 bg-gradient-to-t from-darkBg via-darkBg/70 to-darkBg/30" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 grid md:grid-cols-[1.3fr,1fr] gap-10 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
              {t.title1}
              <span className="text-sahamaYellow">{t.title2}</span>
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto md:mx-0">{t.subtitle}</p>
          </div>
          <PredictiveAnalysisPanel
            title={t.panelTitle}
            status={t.panelStatus}
            footer={t.panelFooter}
          />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 pt-4 pb-12">
      {/* Prediction Flow */}
      <div className="grid md:grid-cols-4 gap-6 mb-16">
        {t.steps.map((step: { num: string; title: string; desc: string }, i: number) => {
          const c = COLOR_STYLES[STEP_COLOR_INDEXES[i]];
          return (
            <div key={i} className={`${c.bg} p-6 rounded-xl border ${c.border} transition-colors`}>
              <span className={`font-bold text-2xl ${c.text}`}>{step.num}</span>
              <h3 className="text-lg font-bold mt-2 mb-2">{step.title}</h3>
              <p className="text-gray-400 text-xs">{step.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Feature Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {t.features.map((feature: { title: string; desc: string }, i: number) => {
          const Icon = ICONS[i];
          const c = COLOR_STYLES[i];
          return (
            <div
              key={i}
              className={`${c.bg} p-6 rounded-2xl border ${c.border} transition-all`}
            >
              <div className={`p-3 rounded-xl w-fit mb-4 ${c.chip}`}>
                <Icon size={28} />
              </div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </div>
          );
        })}
      </div>
      </div>
    </div>
  );
}
