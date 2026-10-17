import { Droplets, MapPin } from "lucide-react";

export default function WaterTreatmentPanel({
  title,
  badge,
  footer,
}: {
  title: string;
  badge: string;
  footer: string;
}) {
  return (
    <div className="bg-darkBg/80 backdrop-blur border border-zinc-800 rounded-2xl p-5 shadow-2xl shadow-black/40">
      <style>{`
        @keyframes waveDrift1 { from { transform: translateX(0); } to { transform: translateX(-150px); } }
        @keyframes waveDrift2 { from { transform: translateX(-150px); } to { transform: translateX(0); } }
        .wave1 { animation: waveDrift1 7s ease-in-out infinite alternate; }
        .wave2 { animation: waveDrift2 9s ease-in-out infinite alternate; }
        @keyframes bubbleRise {
          0% { transform: translateY(0); opacity: 0; }
          15% { opacity: 0.9; }
          100% { transform: translateY(-70px); opacity: 0; }
        }
        .bubble { animation: bubbleRise 4s ease-in infinite; }
        @media (prefers-reduced-motion: reduce) {
          .wave1, .wave2, .bubble { animation: none; }
        }
      `}</style>

      <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-800">
        <span className="flex items-center gap-2 text-white font-bold text-sm tracking-wide">
          <Droplets size={16} className="text-teal-400" /> {title}
        </span>
        <span className="flex items-center gap-1.5 text-teal-300 text-xs font-semibold uppercase tracking-wider">
          <MapPin size={11} /> {badge}
        </span>
      </div>

      <div className="relative w-full h-28 rounded-xl overflow-hidden bg-gradient-to-b from-cardBg to-[#04202a]">
        <svg viewBox="0 0 300 100" className="absolute inset-0 w-[150%] h-full wave1" preserveAspectRatio="none">
          <path
            d="M0,55 C50,35 100,75 150,55 C200,35 250,75 300,55 C350,35 400,75 450,55 L450,100 L0,100 Z"
            fill="#0e7490"
            fillOpacity="0.55"
          />
        </svg>
        <svg viewBox="0 0 300 100" className="absolute inset-0 w-[150%] h-full wave2" preserveAspectRatio="none">
          <path
            d="M0,65 C50,50 100,80 150,65 C200,50 250,80 300,65 C350,50 400,80 450,65 L450,100 L0,100 Z"
            fill="#155e75"
            fillOpacity="0.7"
          />
        </svg>
        <span className="bubble absolute w-1.5 h-1.5 rounded-full bg-teal-200/80" style={{ left: "20%", bottom: "20%", animationDelay: "0s" }} />
        <span className="bubble absolute w-1 h-1 rounded-full bg-teal-200/70" style={{ left: "45%", bottom: "15%", animationDelay: "1.3s" }} />
        <span className="bubble absolute w-1.5 h-1.5 rounded-full bg-teal-200/80" style={{ left: "68%", bottom: "25%", animationDelay: "2.4s" }} />
        <span className="bubble absolute w-1 h-1 rounded-full bg-teal-200/70" style={{ left: "85%", bottom: "10%", animationDelay: "0.7s" }} />
      </div>

      <div className="mt-4 pt-3 border-t border-zinc-800 text-xs text-gray-500">{footer}</div>
    </div>
  );
}
