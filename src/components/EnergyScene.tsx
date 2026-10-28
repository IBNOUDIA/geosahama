// Vector scene for the Energy page while no field photos exist: a building with
// rooftop solar panels, battery storage, a backup generator and a solar street
// lamp, linked by animated energy flows. Decorative only.
export default function EnergyScene({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
      <style>{`
        .en-flow { stroke-dasharray: 6 8; animation: enFlow 1.6s linear infinite; }
        .en-sun { transform-box: fill-box; transform-origin: center; animation: enSun 24s linear infinite; }
        @keyframes enFlow { to { stroke-dashoffset: -28; } }
        @keyframes enSun { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) { .en-flow, .en-sun { animation: none; } }
      `}</style>
      <defs>
        <linearGradient id="enSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0B1024" />
          <stop offset="55%" stopColor="#1B2550" />
          <stop offset="100%" stopColor="#7A3A22" />
        </linearGradient>
        <radialGradient id="enGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F0B03F" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#F0B03F" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="enPanel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2E5BA8" />
          <stop offset="100%" stopColor="#16285A" />
        </linearGradient>
        <radialGradient id="enLamp" cx="50%" cy="0%" r="100%">
          <stop offset="0%" stopColor="#F6EEE1" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#F6EEE1" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Sky and sun */}
      <rect width="400" height="300" fill="url(#enSky)" />
      <circle cx="318" cy="70" r="70" fill="url(#enGlow)" />
      <g className="en-sun">
        <g stroke="#F0B03F" strokeWidth="3" strokeLinecap="round" opacity="0.8">
          {Array.from({ length: 12 }, (_, i) => {
            const a = (i * Math.PI) / 6;
            return <line key={i} x1={318 + Math.cos(a) * 32} y1={70 + Math.sin(a) * 32} x2={318 + Math.cos(a) * 44} y2={70 + Math.sin(a) * 44} />;
          })}
        </g>
        <circle cx="318" cy="70" r="24" fill="#F0B03F" />
      </g>

      {/* Distant hills and ground */}
      <path d="M0 222 Q70 196 140 214 T280 206 T400 214 V300 H0Z" fill="#141B36" />
      <rect y="236" width="400" height="64" fill="#0B1024" />

      {/* Building with rooftop solar panels */}
      <rect x="58" y="152" width="150" height="84" fill="#222A4A" />
      <polygon points="48,154 133,112 218,154" fill="#161D3A" />
      <g>
        <polygon points="74,146 133,117 192,146 186,150 133,124 80,150" fill="#0B1024" opacity="0.6" />
        <polygon points="86,142 133,119 180,142 133,142" fill="url(#enPanel)" stroke="#9CC3FF" strokeOpacity="0.5" strokeWidth="1" />
        <g stroke="#9CC3FF" strokeOpacity="0.45" strokeWidth="0.8">
          <line x1="109" y1="131" x2="109" y2="142" />
          <line x1="133" y1="119" x2="133" y2="142" />
          <line x1="157" y1="131" x2="157" y2="142" />
          <line x1="98" y1="136" x2="168" y2="136" />
        </g>
      </g>
      <g fill="#F0B03F">
        <rect x="76" y="172" width="22" height="18" rx="2" />
        <rect x="112" y="172" width="22" height="18" rx="2" opacity="0.85" />
        <rect x="168" y="172" width="22" height="18" rx="2" />
      </g>
      <rect x="140" y="196" width="22" height="40" rx="2" fill="#2C3558" />

      {/* Battery storage */}
      <rect x="236" y="176" width="40" height="60" rx="6" fill="#141B36" stroke="#2F8F5B" strokeWidth="2.5" />
      <rect x="248" y="170" width="16" height="7" rx="2" fill="#2F8F5B" />
      <g fill="#2F8F5B">
        <rect x="243" y="216" width="26" height="12" rx="2" />
        <rect x="243" y="201" width="26" height="12" rx="2" />
        <rect x="243" y="186" width="26" height="12" rx="2" opacity="0.45" />
      </g>

      {/* Backup generator */}
      <rect x="292" y="204" width="68" height="32" rx="4" fill="#222A4A" stroke="#FF7A00" strokeWidth="2" />
      <g stroke="#3A4468" strokeWidth="2">
        <line x1="302" y1="212" x2="302" y2="228" />
        <line x1="310" y1="212" x2="310" y2="228" />
        <line x1="318" y1="212" x2="318" y2="228" />
      </g>
      <circle cx="344" cy="220" r="7" fill="#FF7A00" />
      <rect x="352" y="196" width="5" height="9" fill="#3A4468" />

      {/* Solar street lamp */}
      <polygon points="372,236 392,236 384,300 380,300" fill="url(#enLamp)" opacity="0.6" />
      <rect x="380" y="128" width="4" height="108" fill="#3A4468" />
      <polygon points="368,122 396,116 398,124 370,130" fill="url(#enPanel)" stroke="#9CC3FF" strokeOpacity="0.5" />
      <rect x="374" y="140" width="16" height="5" rx="2" fill="#F6EEE1" />

      {/* Energy flows: panels -> battery -> building, generator -> battery */}
      <g fill="none" strokeWidth="2.5" strokeLinecap="round">
        <path d="M180 142 Q232 140 256 170" stroke="#F0B03F" className="en-flow" />
        <path d="M236 214 Q222 214 208 214" stroke="#2F8F5B" className="en-flow" />
        <path d="M292 220 Q284 220 276 220" stroke="#FF7A00" className="en-flow" />
      </g>
    </svg>
  );
}
