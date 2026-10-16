import { LogIn, MapPin, ShieldCheck } from "lucide-react";
import { getDictionary } from "@/dictionaries/get-dictionary";
import type { Metadata } from "next";
import type { Locale } from "@/i18n";
import { pageMetadata } from "@/seo";

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
    <div className="max-w-md mx-auto px-4 py-16 text-center">
      <div className="p-3 bg-sahamaOrange/10 rounded-xl w-fit mx-auto text-sahamaOrange mb-6">
        <ShieldCheck size={32} />
      </div>
      <h1 className="text-2xl font-bold mb-3">{t.title}</h1>
      <p className="text-gray-400 text-sm mb-8">
        {t.subtitleBefore} <span className="text-white font-semibold">{t.subtitleBrand}</span>.
      </p>

      <div className="bg-cardBg p-6 rounded-2xl border border-zinc-800 space-y-4">
        <div className="flex items-center gap-3 text-left text-sm text-gray-400">
          <MapPin size={18} className="text-sahamaYellow shrink-0" />
          <span>{t.hint}</span>
        </div>
        <a
          href={wialonUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-sahamaOrange hover:bg-sahamaOrange/90 text-black font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all"
        >
          {t.loginButton} <LogIn size={18} />
        </a>
      </div>

      <p className="text-gray-500 text-xs mt-6">
        {t.noAccess}{" "}
        <a href={`/${lang}/contact`} className="text-sahamaYellow hover:underline">
          {t.contactLink}
        </a>{" "}
        {t.activation}
      </p>
    </div>
  );
}
