import { Activity, AlertTriangle, BarChart3, Bell, ShieldAlert, Wrench } from "lucide-react";
import { getDictionary } from "@/dictionaries/get-dictionary";
import CtaBand from "@/components/CtaBand";
import { EditorialList, ServiceHero, Timeline } from "@/components/ServiceSections";
import type { Metadata } from "next";
import type { Locale } from "@/i18n";
import { pageMetadata } from "@/seo";
import PredictiveAnalysisPanel from "@/components/PredictiveAnalysisPanel";

const ICONS = [AlertTriangle, Wrench, Bell, BarChart3, Activity, ShieldAlert];

// The four steps read as a journey from detection (orange) to resolution (green).
const STEP_COLORS = ["#FF7A00", "#F0B03F", "#C4532F", "#2F8F5B"];

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
      <ServiceHero
        kicker={t.kicker}
        title1={t.title1}
        title2={t.title2}
        subtitle={t.subtitle}
        photo="/photos/intervention-tech.webp"
        photoPosition="65% center"
        cta={{ href: `/${lang}/contact#devis`, label: dict.home.ctaButton }}
        panel={<PredictiveAnalysisPanel title={t.panelTitle} status={t.panelStatus} footer={t.panelFooter} />}
      />

      <Timeline kicker={t.processKicker} title={t.processTitle} steps={t.steps} colors={STEP_COLORS} />

      <EditorialList
        kicker={t.featuresKicker}
        title={t.featuresTitle}
        intro={t.featuresIntro}
        photo="/photos/test-telemetrie.webp"
        items={t.features}
        icons={ICONS}
      />

      <div className="pt-20">
        <CtaBand lang={lang} dict={dict} />
      </div>
    </div>
  );
}
