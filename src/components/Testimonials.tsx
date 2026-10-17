import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import { SectionHeading } from "./ServiceSections";
import type { Locale } from "@/i18n";

export type Testimonial = { quote: string; name: string; role: string; company: string };

// Client quotes from the dictionary; until real ones are added, an invitation
// to share feedback is shown instead of placeholder cards.
export default function Testimonials({
  lang,
  dict,
  items,
  empty,
}: {
  lang: Locale;
  dict: any;
  items: Testimonial[];
  empty: { title: string; text: string; button: string };
}) {
  const t = dict.testimonialsSection;

  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <SectionHeading kicker={t.kicker} title={t.title} intro={t.subtitle} />

      {items.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item) => (
            <figure key={item.name} className="flex flex-col rounded-2xl border border-zinc-800 bg-cardBg p-7">
              <Quote size={24} className="text-sahamaOrange mb-4" />
              <blockquote className="text-gray-300 leading-relaxed flex-1">{item.quote}</blockquote>
              <figcaption className="mt-6 pt-5 border-t border-zinc-800 text-sm">
                <span className="block font-semibold text-cream">{item.name}</span>
                <span className="text-gray-500">
                  {item.role}, {item.company}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      ) : (
        <div className="max-w-2xl mx-auto rounded-3xl border border-dashed border-zinc-700 bg-cardBg/60 px-8 py-12 text-center">
          <Quote size={28} className="text-sahamaOrange/70 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-cream mb-3">{empty.title}</h3>
          <p className="text-gray-400 leading-relaxed mb-7">{empty.text}</p>
          <Link
            href={`/${lang}/contact`}
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 px-6 py-3 font-semibold text-cream hover:border-sahamaOrange/60 hover:bg-sahamaOrange/10 transition"
          >
            {empty.button} <ArrowRight size={18} />
          </Link>
        </div>
      )}
    </section>
  );
}
