import Link from "next/link";
import { ShieldCheck, MapPin, Activity, ArrowRight } from "lucide-react";
import { getDictionary } from "@/dictionaries/get-dictionary";
import SatelliteOrbit from "@/components/SatelliteOrbit";
import Reveal from "@/components/Reveal";

export default async function Home({ params }: { params: { lang: "fr" | "en" } }) {
  const dict = await getDictionary(params.lang);

  return (
    <main className="bg-darkBg text-white min-h-screen relative">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-16">
        {/* Background Image Satellite */}
        <div className="absolute inset-0 z-0">
          <SatelliteOrbit className="w-full h-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-darkBg via-darkBg/20 to-darkBg/5" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_38%_at_58%_46%,rgba(11,11,11,0.62),transparent_72%)]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 border border-sahamaOrange/30 text-sahamaYellow text-xs md:text-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-sahamaOrange animate-pulse" />
            {dict.hero.badge}
          </div>

          <h1 className="text-3xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            {dict.hero.title1}
            <span className="bg-gradient-to-r from-sahamaOrange to-sahamaYellow bg-clip-text text-transparent">
              {dict.hero.title2}
            </span>
          </h1>

          <p className="text-base md:text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            {dict.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${params.lang}/geolocalisation`}
              className="bg-sahamaOrange hover:bg-sahamaOrange/90 text-black font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-sahamaOrange/20"
            >
              {dict.hero.ctaPrimary} <ArrowRight size={20} />
            </Link>
            <Link
              href={`/${params.lang}/epuration`}
              className="border border-zinc-700 hover:border-sahamaYellow bg-zinc-900/50 text-white font-semibold px-8 py-4 rounded-xl transition-all"
            >
              {dict.hero.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>

      {/* Grid Services */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Reveal delay={0}>
            <div className="bg-cardBg p-6 rounded-2xl border border-zinc-800 hover:border-sahamaOrange/50 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-sahamaOrange/10 transition-all h-full">
              <div className="p-3 bg-sahamaOrange/10 rounded-xl w-fit text-sahamaOrange mb-4">
                <MapPin size={28} />
              </div>
              <h3 className="text-lg font-bold mb-2">{dict.services.geolocTitle}</h3>
              <p className="text-gray-400 text-xs sm:text-sm">{dict.services.geolocDesc}</p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="bg-cardBg p-6 rounded-2xl border border-zinc-800 hover:border-sahamaYellow/50 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-sahamaYellow/10 transition-all h-full">
              <div className="p-3 bg-sahamaYellow/10 rounded-xl w-fit text-sahamaYellow mb-4">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-lg font-bold mb-2">{dict.services.securityTitle}</h3>
              <p className="text-gray-400 text-xs sm:text-sm">{dict.services.securityDesc}</p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="bg-cardBg p-6 rounded-2xl border border-zinc-800 hover:border-sahamaOrange/50 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-sahamaOrange/10 transition-all h-full">
              <div className="p-3 bg-sahamaOrange/10 rounded-xl w-fit text-sahamaOrange mb-4">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-lg font-bold mb-2">{dict.services.preventionTitle}</h3>
              <p className="text-gray-400 text-xs sm:text-sm">{dict.services.preventionDesc}</p>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div className="bg-cardBg p-6 rounded-2xl border border-zinc-800 hover:border-sahamaYellow/50 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-sahamaYellow/10 transition-all h-full">
              <div className="p-3 bg-sahamaYellow/10 rounded-xl w-fit text-sahamaYellow mb-4">
                <Activity size={28} />
              </div>
              <h3 className="text-lg font-bold mb-2">{dict.services.epurationTitle}</h3>
              <p className="text-gray-400 text-xs sm:text-sm">{dict.services.epurationDesc}</p>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
