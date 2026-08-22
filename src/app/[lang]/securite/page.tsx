import { ShieldCheck, Eye, Bell, Radio, Lock, Camera } from "lucide-react";
import { getDictionary } from "@/dictionaries/get-dictionary";
import SatelliteOrbit from "@/components/SatelliteOrbit";

const ICONS = [Eye, Bell, Radio, Lock, Camera, ShieldCheck];

const CARD_STYLES = [
  { border: "hover:border-sahamaOrange/50", chip: "bg-sahamaOrange/10 text-sahamaOrange" },
  { border: "hover:border-sahamaYellow/50", chip: "bg-sahamaYellow/10 text-sahamaYellow" },
];

const WATCHED_SITES = ["Dakar", "Abidjan", "Conakry", "Bamako"];

export default async function SecuritePage({ params }: { params: { lang: "fr" | "en" } }) {
  const dict = await getDictionary(params.lang);
  const t = dict.securitePage;

  return (
    <div>
      <section className="relative overflow-hidden py-16 md:py-20">
        <div className="absolute inset-0 z-0">
          <SatelliteOrbit className="w-full h-full" showSatellite={false} />
          <div className="absolute inset-0 bg-gradient-to-t from-darkBg via-darkBg/70 to-darkBg/30" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 grid md:grid-cols-[1.3fr,1fr] gap-10 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
              {t.title1}
              <span className="text-sahamaOrange">{t.title2}</span>
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto md:mx-0">{t.subtitle}</p>
          </div>

          {/* Decorative radar / surveillance panel */}
          <div className="bg-black/70 backdrop-blur border border-zinc-800 rounded-2xl p-5">
            <style>{`
              .radar-sweep {
                background: conic-gradient(from 0deg, rgba(255,122,0,0.4), transparent 35%);
                animation: radarSpin 4s linear infinite;
              }
              @keyframes radarSpin { to { transform: rotate(360deg); } }
              .radar-blip { animation: radarBlip 2.4s ease-in-out infinite; }
              @keyframes radarBlip { 0%, 100% { opacity: 0.25; } 50% { opacity: 1; } }
              @media (prefers-reduced-motion: reduce) {
                .radar-sweep { animation: none; }
                .radar-blip { animation: none; }
              }
            `}</style>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-800">
              <span className="flex items-center gap-2 text-white font-bold text-sm tracking-wide">
                <Eye size={16} className="text-sahamaOrange" /> {t.panelTitle}
              </span>
              <span className="flex items-center gap-1.5 text-green-400 text-xs font-semibold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> {t.panelStatus}
              </span>
            </div>

            <div className="relative w-full max-w-[200px] aspect-square mx-auto mb-4 rounded-full border border-sahamaOrange/25 overflow-hidden">
              <div className="absolute inset-4 rounded-full border border-sahamaOrange/15" />
              <div className="absolute inset-8 rounded-full border border-sahamaOrange/10" />
              <div className="radar-sweep absolute inset-0 rounded-full" />
              <span className="absolute w-1.5 h-1.5 rounded-full bg-sahamaYellow radar-blip" style={{ top: "32%", left: "62%" }} />
              <span className="absolute w-1.5 h-1.5 rounded-full bg-sahamaYellow radar-blip" style={{ top: "64%", left: "34%", animationDelay: "1s" }} />
              <span className="absolute w-1.5 h-1.5 rounded-full bg-sahamaYellow radar-blip" style={{ top: "45%", left: "48%", animationDelay: "1.7s" }} />
            </div>

            <div className="space-y-2">
              {WATCHED_SITES.map((site) => (
                <div key={site} className="flex items-center justify-between text-xs text-gray-300">
                  <span className="flex items-center gap-2">
                    <Camera size={12} className="text-sahamaOrange" /> {site}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-800 text-xs text-gray-500">{t.panelFooter}</div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 pt-4 pb-12">
      {/* Status Panel */}
      <div className="w-full bg-cardBg rounded-2xl border border-zinc-800 flex flex-col md:flex-row items-center justify-between p-6 mb-12 gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-sahamaOrange/10 rounded-xl text-sahamaOrange">
            <ShieldCheck size={28} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{t.statusTitle}</h3>
            <p className="text-gray-400 text-sm">{t.statusDesc}</p>
          </div>
        </div>
        <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          {t.statusBadge}
        </span>
      </div>

      {/* Feature Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {t.features.map((feature: { title: string; desc: string }, i: number) => {
          const Icon = ICONS[i];
          const style = CARD_STYLES[i % 2];
          return (
            <div
              key={i}
              className={`bg-cardBg p-6 rounded-2xl border border-zinc-800 transition-all ${style.border}`}
            >
              <div className={`p-3 rounded-xl w-fit mb-4 ${style.chip}`}>
                <Icon size={28} />
              </div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </div>
          );
        })}
      </div>
      </div>
    </div>
  );
}
