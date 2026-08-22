import { Quote } from "lucide-react";

const SLOTS = [1, 2, 3];

export default function Testimonials({ dict }: { dict: any }) {
  const t = dict.testimonialsSection;

  return (
    <section className="py-8 border-t border-zinc-800">
      <div className="mb-10">
        <span className="text-sahamaYellow font-semibold text-sm uppercase tracking-widest">{t.kicker}</span>
        <h2 className="text-3xl md:text-4xl font-extrabold mt-2">{t.title}</h2>
        <p className="text-gray-400 mt-3 max-w-2xl">{t.subtitle}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {SLOTS.map((slot) => (
          <div
            key={slot}
            className="bg-cardBg border border-dashed border-zinc-700 rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-2 min-h-[160px]"
          >
            <Quote size={22} className="text-sahamaOrange/40 mb-1" />
            <p className="text-gray-400 font-semibold">{t.placeholderLabel}</p>
            <p className="text-gray-600 text-sm">{t.placeholderSub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
