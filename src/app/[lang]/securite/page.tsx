import { Activity, AlertTriangle, BarChart3, Bell, ShieldAlert, Wrench } from "lucide-react";
import { getDictionary } from "@/dictionaries/get-dictionary";
import CtaBand from "@/components/CtaBand";
import { EditorialList, ServiceHero, Timeline } from "@/components/ServiceSections";
import { AudienceGrid, CatalogSection, SectionNav, type CatalogGroup } from "@/components/ServiceCatalog";
import SecurityRadarPanel from "@/components/SecurityRadarPanel";
import type { Metadata } from "next";
import type { Locale } from "@/i18n";
import { pageMetadata } from "@/seo";

const PREVENTION_ICONS = [AlertTriangle, Wrench, Bell, BarChart3, Activity, ShieldAlert];

// The four prevention steps read as a journey from detection (orange) to resolution (green).
const STEP_COLORS = ["#FF7A00", "#F0B03F", "#C4532F", "#2F8F5B"];

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return pageMetadata(lang, "/securite", dict.nav.security, dict.securitePage.subtitle);
}

export default async function SecuritePage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const t = dict.securitePage;
  const groups: CatalogGroup[] = t.groups;
  const p = t.prevention;

  return (
    <div>
      <ServiceHero
        kicker={t.kicker}
        title1={t.title1}
        title2={t.title2}
        accentClass="text-sahamaOrange"
        subtitle={t.subtitle}
        photo="/photos/gardiennage.webp"
        photoPosition="35% center"
        cta={{ href: `/${lang}/contact#devis`, label: dict.home.ctaButton }}
        panel={<SecurityRadarPanel title={t.panelTitle} status={t.panelStatus} footer={t.panelFooter} />}
      />

      <div className="pt-8 pb-4">
        <SectionNav
          label={t.navLabel}
          links={[
            ...groups.map((g) => ({ id: g.id, label: g.kicker })),
            { id: "prevention", label: p.kicker },
            { id: "pour-qui", label: t.audiencesKicker },
          ]}
        />
      </div>

      {groups.map((group, i) => (
        <CatalogSection key={group.id} group={group} index={i} tinted={i % 2 === 0} />
      ))}

      <section id="prevention" className="scroll-mt-24 border-t border-zinc-800">
        <Timeline kicker={p.kicker} title={p.processTitle} steps={p.steps} colors={STEP_COLORS} />
        <EditorialList
          kicker={p.featuresKicker}
          title={p.featuresTitle}
          intro={p.featuresIntro}
          photo="/photos/test-telemetrie.webp"
          items={p.features}
          icons={PREVENTION_ICONS}
        />
      </section>

      <AudienceGrid id="pour-qui" kicker={t.audiencesKicker} title={t.audiencesTitle} items={t.audiences} />

      <CtaBand lang={lang} dict={dict} />
    </div>
  );
}
