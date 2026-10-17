import Image from "next/image";
import NewsSection from "@/components/NewsSection";
import CtaBand from "@/components/CtaBand";
import { getDictionary } from "@/dictionaries/get-dictionary";
import { BogolanTexture, KenteBand } from "@/components/AfricanPatterns";
import { Kicker } from "@/components/ServiceSections";
import type { Metadata } from "next";
import type { Locale } from "@/i18n";
import { pageMetadata } from "@/seo";

// Three field photos arranged as an editorial mosaic in the header.
const MOSAIC = [
  { src: "/photos/salon-dakar.webp", className: "row-span-2" },
  { src: "/photos/epuration-eau.webp", className: "" },
  { src: "/photos/balise-gps.webp", className: "" },
];

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return pageMetadata(lang, "/actualites", dict.nav.news, dict.actualitesPage.subtitle);
}

export default async function ActualitesPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const t = dict.actualitesPage;

  return (
    <div>
      <section className="relative overflow-hidden pt-14 pb-16 md:pt-20 md:pb-20">
        <BogolanTexture opacity={0.04} />
        <div className="relative max-w-7xl mx-auto px-4 grid lg:grid-cols-[1fr,1.1fr] gap-12 items-center">
          <div className="text-center lg:text-left">
            <Kicker>{t.kicker}</Kicker>
            <h1 className="text-4xl md:text-[3.25rem] font-bold text-cream mt-5 mb-6 leading-[1.1]">{t.title}</h1>
            <p className="text-gray-300 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">{t.subtitle}</p>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 grid-rows-2 gap-3 h-[320px] md:h-[400px]">
              {MOSAIC.map((tile) => (
                <div key={tile.src} className={`relative rounded-2xl overflow-hidden border border-zinc-800 ${tile.className}`}>
                  <Image src={tile.src} alt="" fill sizes="(min-width: 1024px) 28vw, 50vw" className="object-cover" priority />
                </div>
              ))}
            </div>
            <div className="absolute -bottom-3 left-6 right-6 rounded-full overflow-hidden">
              <KenteBand className="h-1.5" />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 pt-4 pb-16">
        <NewsSection dict={dict} lang={lang} />
        {/* Testimonials stay hidden until real client quotes are available. */}
      </div>

      <CtaBand lang={lang} dict={dict} />
    </div>
  );
}
