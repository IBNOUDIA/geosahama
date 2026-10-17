import { Camera, Eye } from "lucide-react";

const WATCHED_SITES = ["Dakar", "Abidjan", "Conakry", "Bamako"];

// Decorative surveillance card (illustrative, see the legal notice): a sweeping
// radar next to the list of monitored hubs.
export default function SecurityRadarPanel({ title, status, footer }: { title: string; status: string; footer: string }) {
  return (
    <div className="bg-darkBg/80 backdrop-blur border border-zinc-800 rounded-2xl p-5 shadow-2xl shadow-black/40">
      <style>{`
        .radar-sweep { background: conic-gradient(from 0deg, rgba(255,122,0,0.45), transparent 35%); animation: radarSpin 4s linear infinite; }
        @keyframes radarSpin { to { transform: rotate(360deg); } }
        .radar-blip { animation: radarBlip 2.4s ease-in-out infinite; }
        @keyframes radarBlip { 0%, 100% { opacity: 0.25; } 50% { opacity: 1; } }
        @media (prefers-reduced-motion: reduce) { .radar-sweep, .radar-blip { animation: none; } }
      `}</style>

      <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-800">
        <span className="flex items-center gap-2 text-cream font-semibold text-sm">
          <Eye size={16} className="text-sahamaOrange" /> {title}
        </span>
        <span className="flex items-center gap-1.5 text-kola text-xs font-semibold uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-kola animate-pulse" /> {status}
        </span>
      </div>

      <div className="flex items-center gap-5">
        <div className="relative w-24 h-24 shrink-0 rounded-full border border-sahamaOrange/25 overflow-hidden">
          <div className="absolute inset-3 rounded-full border border-sahamaOrange/15" />
          <div className="absolute inset-6 rounded-full border border-sahamaOrange/10" />
          <div className="radar-sweep absolute inset-0 rounded-full" />
          <span className="absolute w-1.5 h-1.5 rounded-full bg-sahamaYellow radar-blip" style={{ top: "30%", left: "62%" }} />
          <span className="absolute w-1.5 h-1.5 rounded-full bg-sahamaYellow radar-blip" style={{ top: "64%", left: "34%", animationDelay: "1s" }} />
        </div>
        <ul className="flex-1 space-y-1.5">
          {WATCHED_SITES.map((site) => (
            <li key={site} className="flex items-center justify-between text-xs text-gray-300">
              <span className="flex items-center gap-2">
                <Camera size={12} className="text-sahamaOrange" /> {site}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-kola" />
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 pt-3 border-t border-zinc-800 text-xs text-gray-500">{footer}</div>
    </div>
  );
}
