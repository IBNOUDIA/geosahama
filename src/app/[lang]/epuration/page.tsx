import { getDictionary } from "@/dictionaries/get-dictionary";

const STEP_COLORS = ["text-sahamaOrange", "text-sahamaOrange", "text-sahamaYellow", "text-sahamaYellow"];

export default async function EpurationPage({ params }: { params: { lang: "fr" | "en" } }) {
  const dict = await getDictionary(params.lang);
  const t = dict.epurationPage;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <span className="px-3 py-1 rounded-full bg-sahamaOrange/10 border border-sahamaOrange/30 text-sahamaOrange text-xs font-semibold uppercase tracking-wider">
          {t.badge}
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold mt-4 mb-4">
          {t.title1}
          <span className="text-sahamaYellow">{t.title2}</span>
        </h1>
        <p className="text-gray-400 max-w-3xl mx-auto">{t.subtitle}</p>
      </div>

      {/* Process Flow */}
      <div className="grid md:grid-cols-4 gap-6 mb-16">
        {t.steps.map((step: { num: string; title: string; desc: string }, i: number) => (
          <div key={i} className="bg-cardBg p-6 rounded-xl border border-zinc-800">
            <span className={`font-bold text-2xl ${STEP_COLORS[i]}`}>{step.num}</span>
            <h3 className="text-lg font-bold mt-2 mb-2">{step.title}</h3>
            <p className="text-gray-400 text-xs">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
