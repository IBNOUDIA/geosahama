"use client";

import { useEffect, useState } from "react";

// Stylized, animated map of the West African coast with the Sahama branch and
// the branches to come.
// Coordinates come from a simple equirectangular
// projection: x = (lon + 20) * 40, y = (22 - lat) * 40.
const HUBS = [
  { name: "Conakry", x: 252, y: 500, upcoming: false, labelDx: -116, labelDy: 6 },
  { name: "Banjul", x: 137, y: 342, upcoming: true, labelDx: 18, labelDy: 10 },
  { name: "Dakar", x: 102, y: 292, upcoming: true, labelDx: 18, labelDy: -10 },
  { name: "Nouakchott", x: 161, y: 157, upcoming: true, labelDx: 18, labelDy: 6 },
];

const ROUTES = [
  "M252 500 Q180 440 137 342",
  "M137 342 Q130 310 102 292",
  "M102 292 Q90 220 161 157",
];

const COAST =
  "M120 40 L140 100 L160 160 L140 220 L100 292 L128 340 L132 388 L180 420 L212 452 L252 500 L272 540 L320 584 L360 608 L420 656 L496 704 L560 688 L640 672 L720 684 L800 656 L860 632 L920 624 L980 640 L1040 650 L1040 0 L100 0 Z";

// Animations repaint the SVG every frame; starting them only once the page has
// loaded and settled keeps the phone free while the page becomes interactive.
const ANIMATION_DELAY_MS = 3000;

export default function WestAfricaMap({ className, legend }: { className?: string; legend: { active: string; upcoming: string } }) {
  const [live, setLive] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: ReturnType<typeof setTimeout>;
    const start = () => (timer = setTimeout(() => setLive(true), ANIMATION_DELAY_MS));
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", start);
    };
  }, []);

  return (
    <svg viewBox="0 0 1040 760" className={`${className ?? ""} ${live ? "wa-live" : ""}`} role="img" aria-label={`${legend.active} · ${legend.upcoming} : Dakar · Banjul · Nouakchott`}>
      <style>{`
        .wa-route { stroke-dasharray: 10 12; }
        .wa-pulse { opacity: 0; transform-box: fill-box; transform-origin: center; }
        .wa-live .wa-route { animation: waFlow 2.4s linear infinite; }
        .wa-live .wa-pulse { animation: waPulse 2.6s ease-out infinite; }
        @keyframes waFlow { to { stroke-dashoffset: -44; } }
        @keyframes waPulse { 0% { transform: scale(0.6); opacity: 0.9; } 100% { transform: scale(2.6); opacity: 0; } }
        @media (prefers-reduced-motion: reduce) {
          .wa-route, .wa-pulse { animation: none; }
          .wa-moving { display: none; }
        }
      `}</style>
      <defs>
        <linearGradient id="waLand" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F0B03F" stopOpacity="0.22" />
          <stop offset="60%" stopColor="#C4532F" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#C4532F" stopOpacity="0.05" />
        </linearGradient>
        <radialGradient id="waGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF7A00" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#FF7A00" stopOpacity="0" />
        </radialGradient>
        <pattern id="waDots" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="8" cy="8" r="1.6" fill="#F6EEE1" opacity="0.18" />
        </pattern>
        <radialGradient id="waFadeGrad" cx="38%" cy="55%" r="62%">
          <stop offset="55%" stopColor="#fff" />
          <stop offset="100%" stopColor="#000" />
        </radialGradient>
        <mask id="waFade">
          <rect width="1040" height="760" fill="url(#waFadeGrad)" />
        </mask>
        <clipPath id="waLandClip">
          <path d={COAST} />
        </clipPath>
      </defs>

      {/* Graticule */}
      <g stroke="#F6EEE1" strokeOpacity="0.06" strokeWidth="1">
        {[120, 280, 440, 600].map((y) => (
          <line key={`h${y}`} x1="0" y1={y} x2="1040" y2={y} />
        ))}
        {[200, 400, 600, 800].map((x) => (
          <line key={`v${x}`} x1={x} y1="0" x2={x} y2="760" />
        ))}
      </g>

      {/* Land, fading out towards the open edges of the map */}
      <g mask="url(#waFade)">
        <path d={COAST} fill="url(#waLand)" />
        <rect width="1040" height="760" fill="url(#waDots)" clipPath="url(#waLandClip)" />
        <path d="M120 40 L140 100 L160 160 L140 220 L100 292 L128 340 L132 388 L180 420 L212 452 L252 500 L272 540 L320 584 L360 608 L420 656 L496 704 L560 688 L640 672 L720 684 L800 656 L860 632 L920 624 L980 640 L1040 650" fill="none" stroke="#F0B03F" strokeOpacity="0.6" strokeWidth="2.5" strokeLinejoin="round" />
      </g>

      {/* Routes between branches */}
      {ROUTES.map((d) => (
        <path key={d} d={d} fill="none" stroke="#FF7A00" strokeOpacity="0.85" strokeWidth="3" strokeLinecap="round" className="wa-route" />
      ))}

      {/* Tracked vehicle travelling up the coast from Conakry */}
      {live && (
      <g className="wa-moving">
        <circle r="16" fill="url(#waGlow)">
          <animateMotion dur="9s" repeatCount="indefinite" path="M252 500 Q180 440 137 342 Q130 310 102 292 Q90 220 161 157" />
        </circle>
        <circle r="6" fill="#F6EEE1" stroke="#FF7A00" strokeWidth="3">
          <animateMotion dur="9s" repeatCount="indefinite" path="M252 500 Q180 440 137 342 Q130 310 102 292 Q90 220 161 157" />
        </circle>
      </g>
      )}

      {/* Hubs */}
      {HUBS.map((hub) => (
        <g key={hub.name} transform={`translate(${hub.x} ${hub.y})`}>
          {!hub.upcoming && <circle r="12" fill="#FF7A00" opacity="0.5" className="wa-pulse" />}
          <circle
            r={hub.upcoming ? 7 : 10}
            fill={hub.upcoming ? "#0B1024" : "#F0B03F"}
            stroke={hub.upcoming ? "#F0B03F" : "#0B1024"}
            strokeWidth="3"
          />
          <text
            x={hub.labelDx}
            y={hub.labelDy}
            fill="#F6EEE1"
            fillOpacity={hub.upcoming ? 0.7 : 1}
            fontSize="22"
            fontWeight="600"
            fontFamily="var(--font-sora), sans-serif"
          >
            {hub.name}
          </text>
        </g>
      ))}

      {/* Legend */}
      <g fontSize="20" fontFamily="var(--font-sora), sans-serif" fill="#F6EEE1">
        <circle cx="640" cy="60" r="8" fill="#F0B03F" stroke="#0B1024" strokeWidth="3" />
        <text x="660" y="67" fontWeight="600">{legend.active}</text>
        <circle cx="640" cy="100" r="7" fill="#0B1024" stroke="#F0B03F" strokeWidth="3" />
        <text x="660" y="107" fillOpacity="0.7">{legend.upcoming}</text>
      </g>
    </svg>
  );
}
