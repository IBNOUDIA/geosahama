export default function SatelliteOrbit({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="earthOcean" cx="32%" cy="18%" r="80%">
          <stop offset="0%" stopColor="#1a3f5c" />
          <stop offset="40%" stopColor="#0d2436" />
          <stop offset="100%" stopColor="#04080b" />
        </radialGradient>
        <linearGradient id="earthRim" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFC700" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#6FD4E6" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#1B4A63" stopOpacity="0.1" />
        </linearGradient>
        <radialGradient id="satGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFC700" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#FFC700" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFC700" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#FFC700" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="landFill" x1="15%" y1="0%" x2="85%" y2="100%">
          <stop offset="0%" stopColor="#E7C066" />
          <stop offset="45%" stopColor="#B08A3E" />
          <stop offset="100%" stopColor="#5C4A26" />
        </linearGradient>
        <filter id="blurSoft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <filter id="blurWide" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="20" />
        </filter>
        <filter id="blurLand" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>

      {/* Starfield */}
      <g fill="#EAF2F6">
        <circle cx="120" cy="90" r="1.6" opacity="0.8" />
        <circle cx="230" cy="180" r="1" opacity="0.5" />
        <circle cx="340" cy="60" r="1.4" opacity="0.7" />
        <circle cx="480" cy="140" r="1" opacity="0.4" />
        <circle cx="610" cy="70" r="1.8" opacity="0.9" />
        <circle cx="710" cy="200" r="1" opacity="0.5" />
        <circle cx="90" cy="260" r="1.2" opacity="0.6" />
        <circle cx="980" cy="60" r="1.4" opacity="0.7" />
        <circle cx="1120" cy="200" r="1" opacity="0.5" />
        <circle cx="1240" cy="50" r="1.6" opacity="0.8" />
        <circle cx="1360" cy="270" r="1" opacity="0.4" />
        <circle cx="1500" cy="230" r="1.4" opacity="0.7" />
        <circle cx="1560" cy="320" r="1" opacity="0.5" />
        <circle cx="860" cy="230" r="1.2" opacity="0.55" />
        <circle cx="1440" cy="390" r="1" opacity="0.45" />
        <circle cx="200" cy="380" r="1" opacity="0.4" />
        <circle cx="560" cy="330" r="1.2" opacity="0.5" />
        <circle cx="30" cy="150" r="1" opacity="0.5" />
        <circle cx="1050" cy="150" r="1" opacity="0.4" />
        <circle cx="1250" cy="330" r="1.2" opacity="0.5" />
      </g>

      {/* Orbit path */}
      <ellipse
        cx="980"
        cy="260"
        rx="620"
        ry="160"
        fill="none"
        stroke="#FFC700"
        strokeOpacity="0.28"
        strokeWidth="1.5"
        strokeDasharray="3 9"
        className="orbit-dash"
      />

      {/* Earth */}
      <circle cx="360" cy="1360" r="1080" fill="url(#earthOcean)" />

      {/* Latitude / longitude guide lines (clipped to earth) */}
      <g clipPath="url(#earthClip)" stroke="#5EC8D8" strokeOpacity="0.12" fill="none" strokeWidth="1.5">
        <ellipse cx="360" cy="1360" rx="1080" ry="360" />
        <ellipse cx="360" cy="1360" rx="1080" ry="700" />
        <ellipse cx="360" cy="1360" rx="620" ry="1080" />
      </g>
      <clipPath id="earthClip">
        <circle cx="360" cy="1360" r="1080" />
      </clipPath>

      {/* West Africa landmass silhouette — tucked at the edge of the
          visible globe, left of the headline, so it reads as a continent
          without competing with the text */}
      <g clipPath="url(#earthClip)">
        <g transform="translate(60,380) scale(0.85) translate(-470,-420)">
          {/* soft halo so the landmass pops off the ocean */}
          <path
            d="M300,380 C322,338 380,318 430,330 C466,300 522,308 542,340
               C582,328 624,352 610,392 C642,412 632,452 600,462
               C612,502 570,524 540,507 C522,542 470,548 450,516
               C410,532 368,512 365,482 C328,472 298,440 300,380 Z"
            fill="#E7C066"
            opacity="0.22"
            filter="url(#blurLand)"
          />
          <path
            d="M300,380 C322,338 380,318 430,330 C466,300 522,308 542,340
               C582,328 624,352 610,392 C642,412 632,452 600,462
               C612,502 570,524 540,507 C522,542 470,548 450,516
               C410,532 368,512 365,482 C328,472 298,440 300,380 Z"
            fill="url(#landFill)"
            fillOpacity="0.85"
            stroke="#F3D998"
            strokeOpacity="0.55"
            strokeWidth="2.5"
          />
          {/* hub city-light clusters within the landmass */}
          <circle cx="470" cy="420" r="6" fill="#FFC700" className="hub-pulse" />
          <circle cx="470" cy="420" r="20" fill="url(#hubGlow)" />
          <circle cx="530" cy="380" r="4.5" fill="#FF7A00" opacity="0.95" />
          <circle cx="410" cy="460" r="4" fill="#FFC700" opacity="0.9" />
          <circle cx="560" cy="440" r="4" fill="#FFC700" opacity="0.85" />
          <circle cx="390" cy="400" r="3.5" fill="#FF7A00" opacity="0.85" />
        </g>
      </g>

      {/* Earth atmosphere rim glow */}
      <circle
        cx="360"
        cy="1360"
        r="1080"
        fill="none"
        stroke="url(#earthRim)"
        strokeWidth="5"
        filter="url(#blurSoft)"
      />

      {/* Transatlantic signal link from satellite to a distant hub (Montréal) */}
      <path
        d="M980 100 C 1120 60, 1280 90, 1380 60"
        fill="none"
        stroke="#6FD4E6"
        strokeOpacity="0.4"
        strokeWidth="1.5"
        strokeDasharray="2 7"
      />
      <circle cx="1380" cy="60" r="4" fill="#6FD4E6" opacity="0.9" className="hub-pulse" />
      <circle cx="1380" cy="60" r="12" fill="url(#hubGlow)" opacity="0.6" />

      {/* Signal line from satellite down to the West Africa hub */}
      <path
        d="M980 420 C 650 380, 300 370, 90 385"
        fill="none"
        stroke="#FFC700"
        strokeOpacity="0.3"
        strokeWidth="1.5"
        strokeDasharray="2 7"
      />

      {/* Orbiting satellite */}
      <g className="satellite-orbit">
        <g transform="rotate(24)">
          <circle r="36" fill="url(#satGlow)" filter="url(#blurWide)" />
          <g stroke="#0c2233" strokeWidth="1">
            <rect x="-58" y="-10" width="34" height="20" fill="#12354a" />
            <rect x="-56" y="-8" width="7" height="16" fill="#1B4A63" />
            <rect x="-47" y="-8" width="7" height="16" fill="#1B4A63" />
            <rect x="-38" y="-8" width="7" height="16" fill="#1B4A63" />
            <rect x="24" y="-10" width="34" height="20" fill="#12354a" />
            <rect x="26" y="-8" width="7" height="16" fill="#1B4A63" />
            <rect x="35" y="-8" width="7" height="16" fill="#1B4A63" />
            <rect x="44" y="-8" width="7" height="16" fill="#1B4A63" />
          </g>
          <rect x="-11" y="-11" width="22" height="22" rx="3" fill="#E7ECEF" />
          <rect x="-11" y="-11" width="22" height="22" rx="3" fill="none" stroke="#8b98a3" strokeWidth="1" />
          <line x1="0" y1="-11" x2="0" y2="-26" stroke="#E7ECEF" strokeWidth="1.5" />
          <circle cx="0" cy="-28" r="2.5" fill="#FFC700" />
        </g>
      </g>

      <style>{`
        .hub-pulse {
          animation: hubPulse 2.6s ease-in-out infinite;
          transform-origin: center;
          transform-box: fill-box;
        }
        @keyframes hubPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .orbit-dash {
          animation: dashFlow 3s linear infinite;
        }
        @keyframes dashFlow {
          to { stroke-dashoffset: -24; }
        }
        .satellite-orbit {
          animation: satOrbit 22s linear infinite;
          transform: translate(1600px, 260px);
        }
        @keyframes satOrbit {
          0%   { transform: translate(1600px, 260px); }
          8.33%  { transform: translate(1517px, 340px); }
          16.67% { transform: translate(1290px, 398.6px); }
          25%  { transform: translate(980px, 420px); }
          33.33% { transform: translate(670px, 398.6px); }
          41.67% { transform: translate(443px, 340px); }
          50%  { transform: translate(360px, 260px); }
          58.33% { transform: translate(443px, 180px); }
          66.67% { transform: translate(670px, 121.4px); }
          75%  { transform: translate(980px, 100px); }
          83.33% { transform: translate(1290px, 121.4px); }
          91.67% { transform: translate(1517px, 180px); }
          100% { transform: translate(1600px, 260px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hub-pulse { animation: none; }
          .orbit-dash { animation: none; }
          .satellite-orbit { animation: none; transform: translate(980px, 420px); }
        }
      `}</style>
    </svg>
  );
}
