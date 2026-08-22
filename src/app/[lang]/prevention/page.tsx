import { Activity, AlertTriangle, BarChart3, Bell, ShieldAlert, Wrench } from "lucide-react";
import { getDictionary } from "@/dictionaries/get-dictionary";

const STEP_COLORS = ["text-sahamaOrange", "text-sahamaOrange", "text-sahamaYellow", "text-sahamaYellow"];

const ICONS = [AlertTriangle, Wrench, Bell, BarChart3, Activity, ShieldAlert];
const CARD_STYLES = [
  { border: "hover:border-sahamaOrange/50", chip: "bg-sahamaOrange/10 text-sahamaOrange" },
  { border: "hover:border-sahamaYellow/50", chip: "bg-sahamaYellow/10 text-sahamaYellow" },
];

export default async function PreventionPage({ params }: { params: { lang: "fr" | "en" } }) {
  const dict = await getDictionary(params.lang);
  const t = dict.preventionPage;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
          {t.title1}
          <span className="text-sahamaYellow">{t.title2}</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">{t.subtitle}</p>
      </div>

      {/* Prediction Flow */}
      <div className="grid md:grid-cols-4 gap-6 mb-16">
        {t.steps.map((step: { num: string; title: string; desc: string }, i: number) => (
          <div key={i} className="bg-cardBg p-6 rounded-xl border border-zinc-800">
            <span className={`font-bold text-2xl ${STEP_COLORS[i]}`}>{step.num}</span>
            <h3 className="text-lg font-bold mt-2 mb-2">{step.title}</h3>
            <p className="text-gray-400 text-xs">{step.desc}</p>
          </div>
        ))}
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
