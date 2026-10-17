import { Building2, Landmark, Map, Navigation, Radio, Satellite, Wrench, Cpu } from "lucide-react";
import { getDictionary } from "@/dictionaries/get-dictionary";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import Testimonials from "@/components/Testimonials";
import { EditorialList, SectionHeading, ServiceHero } from "@/components/ServiceSections";
import type { Metadata } from "next";
import type { Locale } from "@/i18n";
import { pageMetadata } from "@/seo";

const TECH_ICONS = [Navigation, Map, Satellite, Radio];
const TYPE_ICONS = [Building2, Wrench, Landmark, Cpu];

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return pageMetadata(lang, "/partenaires", dict.nav.partners, dict.partenairesPage.subtitle);
}

export default async function PartenairesPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const t = dict.partenairesPage;

  return (
    <div>
      <ServiceHero
        kicker={t.kicker}
        title1={t.title1}
        title2={t.title2}
        accentClass="text-sahamaOrange"
        subtitle={t.subtitle}
        photo="/photos/salon-dakar.webp"
        cta={{ href: `/${lang}/contact`, label: t.cta }}
      />

      <section className="max-w-7xl mx-auto px-4 pt-4 pb-20">
        <SectionHeading kicker={t.techKicker} title={t.techTitle} intro={t.techIntro} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {t.tech.map((item: { name: string; role: string; desc: string }, i: number) => {
            const Icon = TECH_ICONS[i % TECH_ICONS.length];
            return (
              <Reveal key={item.name} delay={i * 100} className="h-full">
                <div className="group h-full rounded-2xl border border-zinc-800 bg-cardBg p-6 hover:border-sahamaOrange/40 transition">
                  <span className="flex w-11 h-11 items-center justify-center rounded-xl border border-zinc-700 text-sahamaOrange group-hover:bg-sahamaOrange/10 transition mb-5">
                    <Icon size={20} strokeWidth={1.75} />
                  </span>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-sahamaYellow mb-1.5">{item.role}</p>
                  <h3 className="text-lg font-semibold text-cream mb-2">{item.name}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <EditorialList
        kicker={t.typesKicker}
        title={t.typesTitle}
        intro={t.typesIntro}
        photo="/photos/intervention-tech.webp"
        items={t.types}
        icons={TYPE_ICONS}
      />

      <Testimonials
        lang={lang}
        dict={dict}
        items={t.testimonials}
        empty={{ title: t.emptyTitle, text: t.emptyText, button: t.emptyButton }}
      />

      <CtaBand lang={lang} dict={dict} />
    </div>
  );
}
