import { Leaf, PlugZap, Radio, Wallet } from "lucide-react";
import { getDictionary } from "@/dictionaries/get-dictionary";
import CtaBand from "@/components/CtaBand";
import EnergyScene from "@/components/EnergyScene";
import Reveal from "@/components/Reveal";
import { KenteBand } from "@/components/AfricanPatterns";
import { ServiceHero, Timeline } from "@/components/ServiceSections";
import { AudienceGrid, CatalogSection, SectionNav, type CatalogGroup } from "@/components/ServiceCatalog";
import type { Metadata } from "next";
import type { Locale } from "@/i18n";
import { pageMetadata } from "@/seo";

const BENEFIT_ICONS = [PlugZap, Wallet, Leaf, Radio];

// From the site survey (sun yellow) to running and monitored (green).
const STEP_COLORS = ["#F0B03F", "#FF7A00", "#2E8BC0", "#2F8F5B"];

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return pageMetadata(lang, "/energie", dict.nav.energy, dict.energiePage.subtitle);
}

export default async function EnergiePage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const t = dict.energiePage;
  const groups: CatalogGroup[] = t.groups;

  return (
    <div>
      <ServiceHero
        kicker={t.kicker}
        title1={t.title1}
        title2={t.title2}
        accentClass="text-sahamaYellow"
        subtitle={t.subtitle}
        media={<EnergyScene className="absolute inset-0 w-full h-full" />}
        cta={{ href: `/${lang}/contact#devis`, label: dict.home.ctaButton }}
      />

      {/* Key benefits */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="rounded-2xl border border-zinc-800 bg-cardBg overflow-hidden">
          <KenteBand className="h-1.5" />
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-x divide-zinc-800">
            {t.benefits.map((b: { title: string; desc: string }, i: number) => {
              const Icon = BENEFIT_ICONS[i % BENEFIT_ICONS.length];
              return (
                <li key={b.title} className="flex gap-4 p-6">
                  <Icon size={22} className="text-sahamaYellow shrink-0 mt-0.5" />
                  <div>
                    <h2 className="font-semibold text-cream mb-1">{b.title}</h2>
                    <p className="text-gray-400 text-sm leading-relaxed">{b.desc}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <div className="pb-4">
        <SectionNav
          label={t.navLabel}
          links={[
            ...groups.map((g) => ({ id: g.id, label: g.kicker })),
            { id: "demarche", label: t.processKicker },
            { id: "pour-qui", label: t.audiencesKicker },
          ]}
        />
      </div>

      {groups.map((group, i) => (
        <CatalogSection key={group.id} group={group} index={i} tinted={i % 2 === 0} />
      ))}

      {/* Same telemetry platform as fleets and sites */}
      <section className="max-w-7xl mx-auto px-4 pt-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-sahamaYellow/25 bg-gradient-to-br from-[#2a2208] via-cardBg to-cardBg p-8 md:p-12">
            <div className="max-w-3xl">
              <h2 className="text-2xl md:text-3xl font-bold text-cream mb-4">{t.synergyTitle}</h2>
              <p className="text-gray-300 leading-relaxed">{t.synergyText}</p>
            </div>
          </div>
        </Reveal>
      </section>

      <div id="demarche" className="scroll-mt-24">
        <Timeline kicker={t.processKicker} title={t.processTitle} steps={t.steps} colors={STEP_COLORS} />
      </div>

      <div className="border-t border-zinc-800">
        <AudienceGrid id="pour-qui" kicker={t.audiencesKicker} title={t.audiencesTitle} items={t.audiences} />
      </div>

      <CtaBand lang={lang} dict={dict} />
    </div>
  );
}
