import { MapPin } from "lucide-react";
import GoogleMapView from "@/components/GoogleMapView";
import SatelliteOrbit from "@/components/SatelliteOrbit";
import { getDictionary } from "@/dictionaries/get-dictionary";
import CtaBand from "@/components/CtaBand";
import { BogolanTexture } from "@/components/AfricanPatterns";
import type { Metadata } from "next";
import type { Locale } from "@/i18n";
import { pageMetadata } from "@/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return pageMetadata(lang, "/geolocalisation", dict.nav.geoloc, dict.geolocalisationPage.subtitle);
}

export default async function GeolocalisationPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const t = dict.geolocalisationPage;

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const hasKey = Boolean(apiKey) && apiKey !== "YOUR_GOOGLE_MAPS_API_KEY";

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden py-16">
        <div className="absolute inset-0 z-0">
          <SatelliteOrbit className="w-full h-full" />
          <BogolanTexture opacity={0.045} />
          <div className="absolute inset-0 bg-gradient-to-t from-darkBg via-darkBg/20 to-darkBg/5" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_38%_at_58%_46%,rgba(11,11,11,0.62),transparent_72%)]" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-cream mb-4">
            {t.title1}
            <span className="text-sahamaOrange">{t.title2}</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">{t.subtitle}</p>
        </div>
      </section>

      {/* Map */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="w-full h-96 bg-cardBg rounded-2xl border border-zinc-800 relative overflow-hidden">
          {hasKey ? (
            <GoogleMapView apiKey={apiKey as string} t={t} />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 relative">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#FF7A00_1px,transparent_1px)] [background-size:16px_16px]" />
              <MapPin size={48} className="text-sahamaOrange mb-4 animate-bounce" />
              <h3 className="text-xl font-bold text-white mb-2">{t.mapFallbackTitle}</h3>
              <p className="text-gray-400 text-sm text-center max-w-md">
                {t.mapFallbackBefore} <code className="text-sahamaYellow">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code>{" "}
                {t.mapFallbackMiddle} <code className="text-sahamaYellow">.env.local</code> {t.mapFallbackAfter}
              </p>
            </div>
          )}
        </div>
      </div>
      <CtaBand lang={lang} dict={dict} />
    </div>
  );
}
