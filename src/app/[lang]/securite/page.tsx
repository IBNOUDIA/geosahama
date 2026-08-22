import { ShieldCheck, Eye, Bell, Radio, Lock, Camera } from "lucide-react";
import { getDictionary } from "@/dictionaries/get-dictionary";

const ICONS = [Eye, Bell, Radio, Lock, Camera, ShieldCheck];

const CARD_STYLES = [
  { border: "hover:border-sahamaOrange/50", chip: "bg-sahamaOrange/10 text-sahamaOrange" },
  { border: "hover:border-sahamaYellow/50", chip: "bg-sahamaYellow/10 text-sahamaYellow" },
];

export default async function SecuritePage({ params }: { params: { lang: "fr" | "en" } }) {
  const dict = await getDictionary(params.lang);
  const t = dict.securitePage;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
          {t.title1}
          <span className="text-sahamaOrange">{t.title2}</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">{t.subtitle}</p>
      </div>

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
  );
}
