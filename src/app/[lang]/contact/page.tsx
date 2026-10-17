import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Globe, LogIn, Mail, MapPin } from "lucide-react";
import { getDictionary } from "@/dictionaries/get-dictionary";
import { BogolanTexture, KenteBand } from "@/components/AfricanPatterns";
import { Kicker } from "@/components/ServiceSections";
import WestAfricaMap from "@/components/WestAfricaMap";
import type { Metadata } from "next";
import { CONTACT_EMAIL, type Locale } from "@/i18n";
import { pageMetadata } from "@/seo";
import ContactForm from "@/components/ContactForm";
import QuoteForm from "@/components/QuoteForm";

const HUBS = ["Dakar", "Abidjan", "Conakry", "Bamako", "Montréal"];

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return pageMetadata(lang, "/contact", dict.nav.contact, dict.contact.subtitle);
}

export default async function ContactPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const b = dict.contact.bridge;
  const info = dict.contact.info;
  const q = dict.contact.quote;

  return (
    <div>
      {/* Hero: the Canada <-> West Africa bridge */}
      <section className="relative overflow-hidden pt-14 pb-16 md:pt-20 md:pb-20">
        <BogolanTexture opacity={0.04} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_55%_at_75%_50%,rgba(255,122,0,0.08),transparent_70%)]" />
        <div className="relative max-w-7xl mx-auto px-4 grid lg:grid-cols-[1.05fr,1fr] gap-10 items-center">
          <div className="text-center lg:text-left">
            <Kicker>{b.badge}</Kicker>
            <h1 className="text-4xl md:text-[3.25rem] font-bold text-cream mt-5 mb-6 leading-[1.1]">
              {b.title1}
              <span className="bg-gradient-to-r from-sahamaOrange to-sahamaYellow bg-clip-text text-transparent">{b.title2}</span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 mb-9">{b.subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#devis"
                className="inline-flex items-center justify-center gap-2 bg-sahamaOrange hover:bg-[#ff8c24] text-darkBg font-semibold px-7 py-3.5 rounded-xl transition-all shadow-lg shadow-sahamaOrange/25"
              >
                {dict.home.ctaButton} <ArrowRight size={18} />
              </a>
              <a
                href="#formulaire"
                className="inline-flex items-center justify-center border border-zinc-600 hover:border-sahamaYellow bg-zinc-900/60 text-cream font-semibold px-7 py-3.5 rounded-xl transition-all"
              >
                {b.cta2}
              </a>
            </div>
          </div>
          <WestAfricaMap montrealLabel={lang === "fr" ? "Montréal, QC" : "Montreal, QC"} className="w-full h-auto drop-shadow-2xl" />
        </div>
      </section>

      {/* Quote request */}
      <section id="devis" className="scroll-mt-24 max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <Kicker>{q.badge}</Kicker>
          <h2 className="text-3xl md:text-4xl font-bold text-cream mt-3 mb-4">{q.title}</h2>
          <p className="text-gray-400">{q.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-[0.8fr,1.2fr] gap-8 items-start">
          <aside className="lg:sticky lg:top-28 rounded-3xl overflow-hidden border border-zinc-800 bg-[#0D1330]">
            <div className="relative h-44">
              <Image src="/photos/salon-dakar.webp" alt="" fill sizes="(min-width: 1024px) 35vw, 100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1330] to-transparent" />
            </div>
            <KenteBand className="h-1.5" />
            <div className="p-7 space-y-6">
              <h3 className="text-xl font-semibold text-cream">{info.title}</h3>

              <InfoRow icon={<Mail size={18} />} label={info.emailLabel}>
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-cream font-semibold hover:text-sahamaOrange transition break-all">
                  {CONTACT_EMAIL}
                </a>
              </InfoRow>

              <InfoRow icon={<Clock size={18} />} label={info.responseLabel}>
                <span className="text-cream font-semibold">{info.responseValue}</span>
              </InfoRow>

              <InfoRow icon={<MapPin size={18} />} label={info.hubsLabel}>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {HUBS.map((hub) => (
                    <span key={hub} className="px-2.5 py-1 rounded-full border border-zinc-700 text-xs text-gray-300">
                      {hub === "Montréal" && lang === "en" ? "Montreal" : hub}
                    </span>
                  ))}
                </div>
              </InfoRow>

              <InfoRow icon={<Globe size={18} />} label={info.domainLabel}>
                <span className="text-sahamaYellow font-mono text-sm">sahama-services.com</span>
              </InfoRow>

              <Link
                href={`/${lang}/espace-client`}
                className="flex items-center justify-center gap-2 w-full border border-zinc-700 hover:border-sahamaOrange/60 text-cream text-sm font-semibold py-3 rounded-xl transition"
              >
                <LogIn size={16} /> {b.cta1}
              </Link>
            </div>
          </aside>

          <QuoteForm dict={dict} />
        </div>
      </section>

      {/* General question */}
      <section id="formulaire" className="scroll-mt-24 relative border-t border-zinc-800 bg-[#0D1330]">
        <BogolanTexture opacity={0.03} />
        <div className="relative max-w-6xl mx-auto px-4 py-20 grid md:grid-cols-[0.9fr,1.1fr] gap-12 items-center">
          <div>
            <Kicker>{info.questionKicker}</Kicker>
            <h2 className="text-3xl md:text-4xl font-bold text-cream mt-3 mb-4">{dict.contact.title}</h2>
            <p className="text-gray-400 leading-relaxed mb-6">{dict.contact.subtitle}</p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex items-center gap-2 text-sahamaOrange font-semibold hover:text-sahamaYellow transition break-all">
              <Mail size={18} /> {CONTACT_EMAIL}
            </a>
          </div>
          <ContactForm dict={dict} />
        </div>
      </section>
    </div>
  );
}

function InfoRow({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4">
      <span className="shrink-0 flex w-10 h-10 items-center justify-center rounded-xl border border-zinc-700 text-sahamaOrange">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs text-gray-500 mb-0.5">{label}</p>
        {children}
      </div>
    </div>
  );
}
