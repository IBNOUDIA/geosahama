import { getDictionary } from "@/dictionaries/get-dictionary";
import CtaBand from "@/components/CtaBand";
import { PhotoStatement, ServiceHero, Timeline } from "@/components/ServiceSections";
import type { Metadata } from "next";
import type { Locale } from "@/i18n";
import { pageMetadata } from "@/seo";
import WaterTreatmentPanel from "@/components/WaterTreatmentPanel";

// From capture (water blue) through treatment and transport to final landfill (green).
const STEP_COLORS = ["#4FA3C7", "#2E8BC0", "#F0B03F", "#2F8F5B"];

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
      <ServiceHero
        kicker={t.kicker}
        title1={t.title1}
        title2={t.title2}
        subtitle={t.subtitle}
        photo="/photos/epuration-eau.webp"
        cta={{ href: `/${lang}/contact#devis`, label: dict.home.ctaButton }}
        panel={<WaterTreatmentPanel title={t.panelTitle} badge={t.panelBadge} footer={t.panelFooter} />}
      />

      <Timeline kicker={t.processKicker} title={t.processTitle} steps={t.steps} colors={STEP_COLORS} />

      <PhotoStatement photo="/photos/enfouissement-eco.webp" title={t.closingTitle} text={t.closingText} />

      <CtaBand lang={lang} dict={dict} />
    </div>
  );
}
