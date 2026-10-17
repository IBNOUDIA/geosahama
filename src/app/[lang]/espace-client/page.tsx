import { LogIn, MapPin, ShieldCheck } from "lucide-react";
import { getDictionary } from "@/dictionaries/get-dictionary";
import type { Metadata } from "next";
import type { Locale } from "@/i18n";
import { pageMetadata } from "@/seo";
import Illustration from "@/components/Illustration";
import { BogolanTexture } from "@/components/AfricanPatterns";

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return pageMetadata(lang, "/espace-client", dict.nav.clientSpace);
}

export default async function EspaceClientPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const t = dict.espaceClientPage;
  const wialonUrl = `https://hosting.wialon.eu/?lang=${lang}`;

  return (
    <div className="relative overflow-hidden">
      <BogolanTexture opacity={0.04} />
      <div className="relative max-w-5xl mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 rounded-3xl overflow-hidden border border-zinc-800 bg-cardBg shadow-2xl shadow-black/40">
          <div className="relative min-h-[220px] md:min-h-full">
            <Illustration scene="telemetry" />
          </div>

          <div className="p-8 md:p-10 flex flex-col justify-center">
            <div className="p-3 bg-sahamaOrange/10 rounded-xl w-fit text-sahamaOrange mb-6">
              <ShieldCheck size={28} />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-cream mb-3">{t.title}</h1>
            <p className="text-gray-400 text-sm mb-8">
              {t.subtitleBefore} <span className="text-cream font-semibold">{t.subtitleBrand}</span>.
            </p>

            <div className="flex items-start gap-3 text-sm text-gray-400 mb-6">
              <MapPin size={18} className="text-sahamaYellow shrink-0 mt-0.5" />
              <span>{t.hint}</span>
            </div>
            <a
              href={wialonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-sahamaOrange hover:bg-[#ff8c24] text-darkBg font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-sahamaOrange/25"
            >
              {t.loginButton} <LogIn size={18} />
            </a>

            <p className="text-gray-500 text-xs mt-6">
              {t.noAccess}{" "}
              <a href={`/${lang}/contact`} className="text-sahamaYellow hover:underline">
                {t.contactLink}
              </a>{" "}
              {t.activation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
