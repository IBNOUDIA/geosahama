import { ShieldCheck, Eye, Bell, Radio, Lock, Camera } from "lucide-react";
import { getDictionary } from "@/dictionaries/get-dictionary";
import CtaBand from "@/components/CtaBand";
import { EditorialList, ServiceHero } from "@/components/ServiceSections";
import SecurityRadarPanel from "@/components/SecurityRadarPanel";
import type { Metadata } from "next";
import type { Locale } from "@/i18n";
import { pageMetadata } from "@/seo";

const ICONS = [Eye, Bell, Radio, Lock, Camera, ShieldCheck];

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return pageMetadata(lang, "/securite", dict.nav.security, dict.securitePage.subtitle);
}

export default async function SecuritePage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const t = dict.securitePage;

  return (
    <div>
      <ServiceHero
        kicker={t.kicker}
        title1={t.title1}
        title2={t.title2}
        accentClass="text-sahamaOrange"
        subtitle={t.subtitle}
        photo="/photos/balise-gps.webp"
        photoPosition="70% center"
        cta={{ href: `/${lang}/contact#devis`, label: dict.home.ctaButton }}
        panel={<SecurityRadarPanel title={t.panelTitle} status={t.panelStatus} footer={t.panelFooter} />}
      />

      <div className="pt-8">
        <EditorialList
          kicker={t.featuresKicker}
          title={t.featuresTitle}
          intro={t.featuresIntro}
          photo="/photos/test-telemetrie.webp"
          items={t.features}
          icons={ICONS}
        />
      </div>

      <div className="pt-20">
        <CtaBand lang={lang} dict={dict} />
      </div>
    </div>
  );
}
