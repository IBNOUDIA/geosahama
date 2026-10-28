import {
  Activity,
  BatteryCharging,
  Building2,
  Cctv,
  Check,
  CreditCard,
  DoorOpen,
  Droplets,
  Factory,
  Fingerprint,
  FireExtinguisher,
  Flame,
  Fuel,
  Gauge,
  Hotel,
  House,
  Lightbulb,
  Radar,
  Siren,
  Smartphone,
  SolarPanel,
  Speaker,
  Store,
  Tractor,
  UtilityPole,
  Video,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import Reveal from "./Reveal";
import { Kicker } from "./ServiceSections";
import { BogolanTexture } from "./AfricanPatterns";

// Icons the dictionaries may name for catalog items and audiences.
const ICONS: Record<string, LucideIcon> = {
  Activity,
  BatteryCharging,
  Building2,
  Cctv,
  CreditCard,
  DoorOpen,
  Droplets,
  Factory,
  Fingerprint,
  FireExtinguisher,
  Flame,
  Fuel,
  Gauge,
  Hotel,
  House,
  Lightbulb,
  Radar,
  Siren,
  Smartphone,
  SolarPanel,
  Speaker,
  Store,
  Tractor,
  UtilityPole,
  Video,
  Wrench,
  Zap,
};

export type CatalogItem = { icon: string; title: string; desc: string; points: string[] };
export type CatalogGroup = { id: string; kicker: string; title: string; intro: string; items: CatalogItem[] };
export type Audience = { icon: string; title: string; desc: string };

function Icon({ name, size = 22 }: { name: string; size?: number }) {
  const Component = ICONS[name] ?? Zap;
  return <Component size={size} strokeWidth={1.75} />;
}

// Row of anchor chips jumping to each section of a long service page.
export function SectionNav({ label, links }: { label: string; links: Array<{ id: string; label: string }> }) {
  return (
    <nav aria-label={label} className="max-w-7xl mx-auto px-4">
      <ul className="flex flex-wrap justify-center gap-2.5">
        {links.map((link) => (
          <li key={link.id}>
            <a
              href={`#${link.id}`}
              className="inline-block rounded-full border border-zinc-700 bg-cardBg px-4 py-2 text-sm font-semibold text-gray-300 hover:border-sahamaOrange/60 hover:text-cream transition"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// One family of services: heading on the left, detailed cards on the right.
// `tinted` alternates the background so consecutive families read as bands.
export function CatalogSection({ group, index, tinted }: { group: CatalogGroup; index: number; tinted?: boolean }) {
  return (
    <section id={group.id} className={`relative scroll-mt-24 ${tinted ? "border-y border-zinc-800 bg-[#0D1330]" : ""}`}>
      {tinted && <BogolanTexture opacity={0.03} />}
      <div className="relative max-w-7xl mx-auto px-4 py-20 grid lg:grid-cols-[0.75fr,1.25fr] gap-10 lg:gap-14">
        <div className="lg:sticky lg:top-28 self-start">
          <span className="font-mono text-sm text-sahamaOrange">{String(index + 1).padStart(2, "0")}</span>
          <div className="mt-2">
            <Kicker>{group.kicker}</Kicker>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-cream mt-3 mb-4">{group.title}</h2>
          <p className="text-gray-400 leading-relaxed">{group.intro}</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {group.items.map((item, i) => (
            <Reveal key={item.title} delay={(i % 2) * 100} className="h-full">
              <article className="group h-full rounded-2xl border border-zinc-800 bg-cardBg p-6 hover:border-sahamaOrange/40 transition">
                <span className="flex w-12 h-12 items-center justify-center rounded-xl border border-zinc-700 text-sahamaOrange group-hover:bg-sahamaOrange/10 group-hover:border-sahamaOrange/50 transition mb-5">
                  <Icon name={item.icon} />
                </span>
                <h3 className="text-lg font-semibold text-cream mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{item.desc}</p>
                <ul className="space-y-2">
                  {item.points.map((point) => (
                    <li key={point} className="flex gap-2.5 text-sm text-gray-300">
                      <Check size={15} className="text-sahamaYellow shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// "Who it's for": one card per type of client or site.
export function AudienceGrid({ id, kicker, title, items }: { id?: string; kicker: string; title: string; items: Audience[] }) {
  return (
    <section id={id} className="scroll-mt-24 max-w-7xl mx-auto px-4 py-20">
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <Kicker>{kicker}</Kicker>
        <h2 className="text-3xl md:text-4xl font-bold text-cream mt-3">{title}</h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {items.map((item, i) => (
          <Reveal key={item.title} delay={i * 100} className="h-full">
            <div className="h-full rounded-2xl border border-zinc-800 bg-gradient-to-b from-cardBg to-darkBg p-6 text-center">
              <span className="mx-auto flex w-14 h-14 items-center justify-center rounded-full bg-sahamaOrange/10 text-sahamaOrange ring-1 ring-sahamaOrange/30 mb-5">
                <Icon name={item.icon} size={24} />
              </span>
              <h3 className="text-lg font-semibold text-cream mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
