import NewsSection from "@/components/NewsSection";
import Testimonials from "@/components/Testimonials";
import { getDictionary } from "@/dictionaries/get-dictionary";
import SatelliteOrbit from "@/components/SatelliteOrbit";

export default async function ActualitesPage({ params }: { params: { lang: "fr" | "en" } }) {
  const dict = await getDictionary(params.lang);
  const t = dict.actualitesPage;

  return (
    <div>
      <section className="relative overflow-hidden py-16 md:py-20">
        <div className="absolute inset-0 z-0">
          <SatelliteOrbit className="w-full h-full" showSatellite={false} />
          <div className="absolute inset-0 bg-gradient-to-t from-darkBg via-darkBg/70 to-darkBg/30" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <span className="text-sahamaOrange font-semibold text-sm uppercase tracking-widest">{t.kicker}</span>
          <h1 className="text-3xl md:text-5xl font-extrabold mt-2">{t.title}</h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 pt-4 pb-12">
        <NewsSection dict={dict} />
        <Testimonials dict={dict} />
      </div>
    </div>
  );
}
