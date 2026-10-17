import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BogolanTexture, KenteBand } from "./AfricanPatterns";
import type { Locale } from "@/i18n";

// "Request a quote" band closing the home and service pages.
export default function CtaBand({ lang, dict }: { lang: Locale; dict: any }) {
  return (
    <section className="max-w-7xl mx-auto px-4 pb-24">
      <div className="relative overflow-hidden rounded-3xl border border-sahamaOrange/30 bg-gradient-to-br from-[#2a1608] via-cardBg to-cardBg">
        <BogolanTexture opacity={0.06} />
        <div className="relative px-8 py-12 md:px-14 md:py-14 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-bold text-cream mb-3">{dict.home.ctaTitle}</h2>
            <p className="text-gray-300">{dict.home.ctaDesc}</p>
          </div>
          <Link
            href={`/${lang}/contact#devis`}
            className="shrink-0 bg-sahamaOrange hover:bg-[#ff8c24] text-darkBg font-semibold px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-sahamaOrange/25"
          >
            {dict.home.ctaButton} <ArrowRight size={20} />
          </Link>
        </div>
        <KenteBand className="h-2" />
      </div>
    </section>
  );
}
