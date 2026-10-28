import Image from "next/image";
import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import Reveal from "./Reveal";
import { Adinkra, BogolanTexture, KenteBand } from "./AfricanPatterns";

// Building blocks shared by the service pages (Geolocation, Security,
// Prevention, Purification) so they all follow the same editorial layout.

export function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-sahamaOrange font-semibold text-xs uppercase tracking-[0.2em]">
      <Adinkra size={12} /> {children}
    </span>
  );
}

export function SectionHeading({ kicker, title, intro }: { kicker: string; title: string; intro?: string }) {
  return (
    <div className="text-center mb-14 max-w-3xl mx-auto">
      <Kicker>{kicker}</Kicker>
      <h2 className="text-3xl md:text-4xl font-bold text-cream mt-3">{title}</h2>
      {intro && <p className="text-gray-400 mt-4 leading-relaxed">{intro}</p>}
    </div>
  );
}

// Text on the left, field photo (or an illustration via `media`) on the right,
// with an optional floating panel.
export function ServiceHero({
  kicker,
  title1,
  title2,
  accentClass = "text-sahamaYellow",
  subtitle,
  photo,
  media,
  photoPosition = "center",
  cta,
  panel,
}: {
  kicker: string;
  title1: string;
  title2: string;
  accentClass?: string;
  subtitle: string;
  photo?: string;
  media?: React.ReactNode;
  photoPosition?: string;
  cta: { href: string; label: string };
  panel?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-14 pb-20 md:pt-20 md:pb-28">
      <BogolanTexture opacity={0.04} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_50%_at_80%_40%,rgba(255,122,0,0.08),transparent_70%)]" />
      <div className="relative max-w-7xl mx-auto px-4 grid lg:grid-cols-[1fr,1.05fr] gap-14 items-center">
        <div className="text-center lg:text-left">
          <Kicker>{kicker}</Kicker>
          <h1 className="text-4xl md:text-[3.25rem] font-bold text-cream mt-5 mb-6 leading-[1.1]">
            {title1}
            <span className={accentClass}>{title2}</span>
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 mb-9">{subtitle}</p>
          <Link
            href={cta.href}
            className="inline-flex items-center gap-2 bg-sahamaOrange hover:bg-[#ff8c24] text-darkBg font-semibold px-7 py-3.5 rounded-xl transition-all shadow-lg shadow-sahamaOrange/25"
          >
            {cta.label} <ArrowRight size={18} />
          </Link>
        </div>

        <div className={`relative ${panel ? "pb-24 sm:pb-16 lg:pb-0" : ""}`}>
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl shadow-black/50">
            {photo ? (
              <Image
                src={photo}
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                style={{ objectPosition: photoPosition }}
              />
            ) : (
              media
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-darkBg/60 via-transparent to-transparent" />
          </div>
          {panel && (
            <div className="absolute -bottom-4 left-4 right-4 sm:right-auto sm:w-[22rem] sm:-left-6 lg:-left-14 lg:-bottom-16">
              {panel}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// Numbered steps on a line whose colour shifts from one node to the next.
export function Timeline({
  kicker,
  title,
  steps,
  colors,
}: {
  kicker: string;
  title: string;
  steps: Array<{ num: string; title: string; desc: string }>;
  colors: string[];
}) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <SectionHeading kicker={kicker} title={title} />
      <ol className="relative grid gap-12 md:grid-cols-4 md:gap-8">
        <div
          aria-hidden="true"
          className="hidden md:block absolute top-7 left-[12.5%] right-[12.5%] h-px"
          style={{ background: `linear-gradient(90deg, ${colors.join(", ")})` }}
        />
        {steps.map((step, i) => (
          <Reveal key={step.num} delay={i * 120}>
            <li className="relative text-center px-2">
              <span
                className="relative z-10 mx-auto mb-6 flex w-14 h-14 items-center justify-center rounded-full bg-darkBg font-mono text-lg font-semibold"
                style={{ color: colors[i], boxShadow: `0 0 0 2px ${colors[i]}, 0 0 28px ${colors[i]}40` }}
              >
                {step.num}
              </span>
              <h3 className="text-lg font-semibold text-cream mb-2">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-[16rem] mx-auto">{step.desc}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

// Sticky intro + photo on the left, numbered list with outline icons on the right.
export function EditorialList({
  kicker,
  title,
  intro,
  photo,
  items,
  icons,
}: {
  kicker: string;
  title: string;
  intro: string;
  photo: string;
  items: Array<{ title: string; desc: string }>;
  icons: LucideIcon[];
}) {
  return (
    <section className="relative border-y border-zinc-800 bg-[#0D1330]">
      <BogolanTexture opacity={0.03} />
      <div className="relative max-w-7xl mx-auto px-4 py-20 grid lg:grid-cols-[0.85fr,1.15fr] gap-14">
        <div className="lg:sticky lg:top-28 self-start">
          <Kicker>{kicker}</Kicker>
          <h2 className="text-3xl md:text-4xl font-bold text-cream mt-3 mb-5">{title}</h2>
          <p className="text-gray-400 leading-relaxed mb-8">{intro}</p>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-800">
            <Image src={photo} alt="" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            <KenteBand className="absolute bottom-0 h-1.5" />
          </div>
        </div>

        <ul className="divide-y divide-zinc-800">
          {items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <li key={item.title} className="group flex gap-6 py-7 first:pt-0 last:pb-0">
                <span className="font-mono text-xs text-gray-500 pt-1.5 w-6 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                <span className="shrink-0 flex w-11 h-11 items-center justify-center rounded-xl border border-zinc-700 text-sahamaOrange group-hover:border-sahamaOrange/60 group-hover:bg-sahamaOrange/10 transition">
                  <Icon size={20} strokeWidth={1.75} />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-cream mb-1.5">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

// Full-width photo band with a short statement, used to close a story.
export function PhotoStatement({ photo, title, text }: { photo: string; title: string; text: string }) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <div className="relative overflow-hidden rounded-3xl border border-zinc-800 min-h-[360px] flex items-end">
        <Image src={photo} alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-darkBg/95 via-darkBg/60 to-transparent" />
        <div className="relative p-8 md:p-12 max-w-xl">
          <h2 className="text-3xl md:text-4xl font-bold text-cream mb-4">{title}</h2>
          <p className="text-gray-300 leading-relaxed">{text}</p>
        </div>
        <KenteBand className="absolute bottom-0 left-0 h-1.5" />
      </div>
    </section>
  );
}
