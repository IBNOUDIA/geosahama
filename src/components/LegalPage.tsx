import { Scale } from "lucide-react";
import { BogolanTexture } from "./AfricanPatterns";
import { LEGAL_UPDATED, type LegalDoc } from "@/legal";
import type { Locale } from "@/i18n";

export default function LegalPage({ doc, lang }: { doc: LegalDoc; lang: Locale }) {
  const updated = new Date(`${LEGAL_UPDATED}T12:00:00`).toLocaleDateString(lang === "fr" ? "fr-CA" : "en-CA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="relative overflow-hidden">
      <BogolanTexture opacity={0.035} />
      <article className="relative max-w-3xl mx-auto px-4 py-16 md:py-20">
        <div className="p-3 bg-sahamaOrange/10 rounded-xl w-fit text-sahamaOrange mb-6">
          <Scale size={26} />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-cream mb-4">{doc.title}</h1>
        <p className="text-gray-300 leading-relaxed mb-12">{doc.intro}</p>

        <div className="space-y-10">
          {doc.sections.map((section) => (
            <section key={section.title} className="border-l-2 border-sahamaOrange/40 pl-5">
              <h2 className="text-lg font-semibold text-cream mb-3">{section.title}</h2>
              <div className="space-y-2.5 text-gray-400 text-sm leading-relaxed">
                {section.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-14 text-xs text-gray-500">
          {lang === "fr" ? "Dernière mise à jour :" : "Last updated:"} {updated}
        </p>
      </article>
    </div>
  );
}
