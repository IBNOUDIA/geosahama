import Link from "next/link";
import { Mail, MapPin, Radio, FileText } from "lucide-react";
import { getDictionary } from "@/dictionaries/get-dictionary";
import { BogolanTexture } from "@/components/AfricanPatterns";
import type { Metadata } from "next";
import { CONTACT_EMAIL, type Locale } from "@/i18n";
import { pageMetadata } from "@/seo";
import ContactForm from "@/components/ContactForm";
import QuoteForm from "@/components/QuoteForm";
import SatelliteOrbit from "@/components/SatelliteOrbit";

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

  return (
    <div>
      {/* Bridge Hero */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 z-0">
          <SatelliteOrbit className="w-full h-full" />
          <BogolanTexture opacity={0.045} />
          <div className="absolute inset-0 bg-gradient-to-t from-darkBg via-darkBg/50 to-darkBg/20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 border border-sahamaOrange/30 text-sahamaYellow text-xs mb-6">
              <span className="w-2 h-2 rounded-full bg-sahamaOrange animate-pulse" />
              {b.badge}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-cream mb-6 leading-tight">
              {b.title1}
              <span className="bg-gradient-to-r from-sahamaOrange to-sahamaYellow bg-clip-text text-transparent">
                {b.title2}
              </span>
            </h1>
            <p className="text-gray-300 mb-8 max-w-lg">{b.subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/${lang}/espace-client`}
                className="bg-sahamaOrange hover:bg-sahamaOrange/90 text-black font-bold px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
              >
                <MapPin size={18} /> {b.cta1}
              </Link>
              <a
                href="#formulaire"
                className="border border-zinc-700 hover:border-sahamaYellow bg-zinc-900/50 text-white font-semibold px-6 py-3 rounded-xl text-center transition-all"
              >
                {b.cta2}
              </a>
            </div>
          </div>

          {/* Network status panel */}
          <div className="bg-darkBg/80 backdrop-blur border border-zinc-800 rounded-2xl p-5 shadow-2xl shadow-black/40">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-800">
              <span className="flex items-center gap-2 text-white font-bold text-sm tracking-wide">
                <Radio size={16} className="text-sahamaOrange" /> {b.panelTitle}
              </span>
              <span className="flex items-center gap-1.5 text-green-400 text-xs font-semibold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> {b.panelStatus}
              </span>
            </div>
            <div className="space-y-2.5">
              {HUBS.map((hub) => (
                <div key={hub} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-gray-300">
                    <MapPin size={13} className="text-sahamaOrange" /> {hub}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-800 text-xs text-gray-500">{b.panelFooter}</div>
          </div>
        </div>
      </section>

      {/* Quote Request */}
      <div id="devis" className="max-w-3xl mx-auto px-4 pt-4 pb-16">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sahamaOrange/10 border border-sahamaOrange/30 text-sahamaOrange text-xs font-semibold uppercase tracking-wider mb-4">
            <FileText size={12} /> {dict.contact.quote.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-cream mb-4">{dict.contact.quote.title}</h2>
          <p className="text-gray-400">{dict.contact.quote.subtitle}</p>
        </div>
        <QuoteForm dict={dict} />
      </div>

      <div id="formulaire" className="max-w-6xl mx-auto px-4 pt-4 pb-28">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-cream mb-4">{dict.contact.title}</h2>
        <p className="text-gray-400">{dict.contact.subtitle}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div className="bg-cardBg p-8 rounded-2xl border border-zinc-800 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold mb-6 text-sahamaYellow">{info.title}</h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-sahamaOrange/10 rounded-lg text-sahamaOrange">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-400">{info.emailLabel}</p>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-white font-semibold hover:text-sahamaOrange transition break-all">
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-sahamaYellow/10 rounded-lg text-sahamaYellow">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-400">{info.officesLabel}</p>
                  <p className="text-white font-semibold">{info.officesValue}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-zinc-900/80 rounded-xl border border-zinc-800 text-xs text-gray-400">
            {info.domainLabel} <span className="text-sahamaYellow font-mono">sahama-services.com</span>
          </div>
        </div>

        {/* Contact Form */}
        <ContactForm dict={dict} />
      </div>
      </div>
    </div>
  );
}
