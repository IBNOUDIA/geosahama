import { getDictionary } from "@/dictionaries/get-dictionary";
import CtaBand from "@/components/CtaBand";
import { BogolanTexture } from "@/components/AfricanPatterns";
import type { Metadata } from "next";
import type { Locale } from "@/i18n";
import { pageMetadata } from "@/seo";
import SatelliteOrbit from "@/components/SatelliteOrbit";
import WaterTreatmentPanel from "@/components/WaterTreatmentPanel";

const STEP_COLORS = ["text-sahamaOrange", "text-sahamaOrange", "text-sahamaYellow", "text-sahamaYellow"];

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return pageMetadata(lang, "/epuration", dict.nav.epuration, dict.epurationPage.subtitle);
}

export default async function EpurationPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const t = dict.epurationPage;

  return (
    <div>
      <section className="relative overflow-hidden py-16 md:py-20">
        <div className="absolute inset-0 z-0">
          <SatelliteOrbit className="w-full h-full" showSatellite={false} />
          <BogolanTexture opacity={0.045} />
          <div className="absolute inset-0 bg-gradient-to-t from-darkBg via-darkBg/70 to-darkBg/30" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 grid md:grid-cols-[1.3fr,1fr] gap-10 items-center">
          <div className="text-center md:text-left">
            <span className="px-3 py-1 rounded-full bg-sahamaOrange/10 border border-sahamaOrange/30 text-sahamaOrange text-xs font-semibold uppercase tracking-wider">
              {t.badge}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-cream mt-4 mb-4">
              {t.title1}
              <span className="text-sahamaYellow">{t.title2}</span>
            </h1>
            <p className="text-gray-300 max-w-3xl mx-auto md:mx-0">{t.subtitle}</p>
          </div>
          <WaterTreatmentPanel title={t.panelTitle} badge={t.panelBadge} footer={t.panelFooter} />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 pt-4 pb-12">
      {/* Process Flow */}
      <div className="grid md:grid-cols-4 gap-6 mb-16">
        {t.steps.map((step: { num: string; title: string; desc: string }, i: number) => (
          <div key={i} className="bg-cardBg p-6 rounded-xl border border-zinc-800">
            <span className={`font-bold text-2xl ${STEP_COLORS[i]}`}>{step.num}</span>
            <h3 className="text-lg font-bold mt-2 mb-2">{step.title}</h3>
            <p className="text-gray-400 text-xs">{step.desc}</p>
          </div>
        ))}
      </div>
      </div>
      <CtaBand lang={lang} dict={dict} />
    </div>
  );
}
