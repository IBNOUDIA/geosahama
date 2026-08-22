import { Activity } from "lucide-react";

export default function PredictiveAnalysisPanel({
  title,
  status,
  footer,
}: {
  title: string;
  status: string;
  footer: string;
}) {
  return (
    <div className="bg-black/70 backdrop-blur border border-zinc-800 rounded-2xl p-5">
      <style>{`
        @keyframes scanSweep {
          0% { transform: translateX(0); opacity: 0; }
          5% { opacity: 0.7; }
          95% { opacity: 0.7; }
          100% { transform: translateX(300px); opacity: 0; }
        }
        .scan-line { animation: scanSweep 3.4s linear infinite; }
        @keyframes spikePulse {
          0%, 100% { opacity: 0.4; r: 3.5; }
          50% { opacity: 1; r: 5; }
        }
        .spike-dot { animation: spikePulse 2s ease-in-out infinite; transform-origin: center; }
        @media (prefers-reduced-motion: reduce) {
          .scan-line { animation: none; opacity: 0; }
          .spike-dot { animation: none; }
        }
      `}</style>

      <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-800">
        <span className="flex items-center gap-2 text-white font-bold text-sm tracking-wide">
          <Activity size={16} className="text-sahamaYellow" /> {title}
        </span>
        <span className="flex items-center gap-1.5 text-green-400 text-xs font-semibold uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> {status}
        </span>
      </div>

      <svg viewBox="0 0 300 120" className="w-full h-28 overflow-visible">
        <line x1="0" y1="35" x2="300" y2="35" stroke="#ef4444" strokeOpacity="0.4" strokeDasharray="4 4" strokeWidth="1.5" />
        <path
          d="M0,90 L30,85 L60,88 L90,70 L120,80 L150,40 L180,75 L210,60 L240,30 L270,65 L300,50"
          fill="none"
          stroke="#FFC700"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="240" cy="30" r="4" fill="#FFC700" className="spike-dot" />
        <rect className="scan-line" x="0" y="0" width="2" height="120" fill="#FF7A00" />
      </svg>

      <div className="mt-4 pt-3 border-t border-zinc-800 text-xs text-gray-500">{footer}</div>
    </div>
  );
}
