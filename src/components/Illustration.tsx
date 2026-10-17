import { BogolanTexture } from "./AfricanPatterns";

// Flat, West-African-styled vector scenes used where real photos are not
// available yet. They are deliberately illustrations (badge "Illustration"),
// never presented as photos of actual operations.
export type Scene =
  | "geolocalisation"
  | "epuration"
  | "evenement"
  | "gps-install"
  | "sensor"
  | "technician"
  | "telemetry";

const C = {
  night: "#0B1024",
  indigo: "#1B2550",
  indigo2: "#2B3A7A",
  orange: "#FF7A00",
  ochre: "#F0B03F",
  terracotta: "#C4532F",
  kola: "#2F8F5B",
  cream: "#F6EEE1",
  water: "#2E6F9E",
  water2: "#4FA3C7",
};

function Sky({ sun = true }: { sun?: boolean }) {
  return (
    <>
      <defs>
        <linearGradient id="illSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.night} />
          <stop offset="100%" stopColor={C.indigo} />
        </linearGradient>
      </defs>
      <rect width="400" height="240" fill="url(#illSky)" />
      {sun && (
        <>
          <circle cx="320" cy="70" r="34" fill={C.ochre} opacity="0.9" />
          <circle cx="320" cy="70" r="48" fill={C.ochre} opacity="0.12" />
        </>
      )}
    </>
  );
}

function SignalArcs({ x, y, color = C.ochre }: { x: number; y: number; color?: string }) {
  return (
    <g fill="none" stroke={color} strokeWidth="3" strokeLinecap="round">
      <path d={`M${x - 10} ${y - 8} a14 14 0 0 1 20 0`} />
      <path d={`M${x - 17} ${y - 15} a24 24 0 0 1 34 0`} opacity="0.7" />
      <path d={`M${x - 24} ${y - 22} a34 34 0 0 1 48 0`} opacity="0.4" />
    </g>
  );
}

function Pin({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 -30 c-11 0 -20 8.6 -20 19.4 C-20 4 0 26 0 26 S20 4 20 -10.6 C20 -21.4 11 -30 0 -30z" fill={C.orange} />
      <circle cx="0" cy="-11" r="7" fill={C.night} />
    </g>
  );
}

function Truck({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="0" y="0" width="86" height="40" rx="4" fill={C.cream} />
      <rect x="0" y="14" width="86" height="6" fill={C.terracotta} />
      <path d="M86 12 h22 l14 16 v12 h-36z" fill={C.orange} />
      <rect x="92" y="16" width="14" height="10" rx="2" fill={C.night} opacity="0.8" />
      <circle cx="20" cy="42" r="9" fill={C.night} stroke={C.cream} strokeWidth="3" />
      <circle cx="98" cy="42" r="9" fill={C.night} stroke={C.cream} strokeWidth="3" />
    </g>
  );
}

function Baobab({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill="#0E1530">
      <path d="M-10 0 C-8 -30 -12 -50 -6 -64 L6 -64 C12 -50 8 -30 10 0 Z" />
      <path d="M-6 -60 C-30 -70 -40 -80 -44 -92 M6 -60 C28 -72 40 -82 46 -94 M0 -64 C-2 -80 2 -90 0 -100" stroke="#0E1530" strokeWidth="6" fill="none" strokeLinecap="round" />
      <ellipse cx="-44" cy="-96" rx="16" ry="8" />
      <ellipse cx="46" cy="-98" rx="18" ry="9" />
      <ellipse cx="0" cy="-104" rx="20" ry="9" />
    </g>
  );
}

function Person({ x, y, body, head = "#6B4226", hat }: { x: number; y: number; body: string; head?: string; hat?: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M-18 60 C-18 30 -12 18 0 18 C12 18 18 30 18 60 Z" fill={body} />
      <circle cx="0" cy="6" r="11" fill={head} />
      {hat && <path d="M-13 2 a13 11 0 0 1 26 0 h3 v3 h-32 v-3z" fill={hat} />}
    </g>
  );
}

function SceneContent({ scene }: { scene: Scene }) {
  switch (scene) {
    case "geolocalisation":
      return (
        <>
          <Sky />
          <path d="M0 170 Q100 150 200 165 T400 160 V240 H0Z" fill={C.terracotta} opacity="0.85" />
          <path d="M0 196 Q120 176 230 192 T400 186 V240 H0Z" fill="#8A3A20" />
          <path d="M40 240 C120 200 200 200 400 205" stroke={C.ochre} strokeWidth="3" strokeDasharray="10 9" fill="none" opacity="0.8" />
          <Baobab x={70} y={176} s={0.9} />
          <Truck x={180} y={150} s={0.95} />
          <Pin x={236} y={98} s={0.9} />
          <SignalArcs x={236} y={60} />
        </>
      );
    case "epuration":
      return (
        <>
          <Sky />
          <g fill="#0E1530">
            <rect x="20" y="112" width="26" height="58" />
            <rect x="50" y="94" width="22" height="76" />
            <rect x="76" y="120" width="30" height="50" />
            <rect x="110" y="104" width="18" height="66" />
            <path d="M150 170 L190 112 L232 170Z" />
            <rect x="250" y="126" width="34" height="44" />
          </g>
          <rect x="0" y="168" width="400" height="72" fill={C.water} />
          <g fill="none" stroke={C.water2} strokeWidth="3" strokeLinecap="round" opacity="0.8">
            <path d="M20 190 q15 -8 30 0 t30 0 t30 0" />
            <path d="M200 206 q15 -8 30 0 t30 0 t30 0" />
            <path d="M90 222 q15 -8 30 0 t30 0" />
          </g>
          <path d="M318 118 C318 118 284 156 284 178 a34 34 0 0 0 68 0 C352 156 318 118 318 118Z" fill={C.water2} stroke={C.cream} strokeWidth="3" />
          <path d="M306 186 C306 166 322 158 336 156 C334 172 326 186 306 186Z M306 186 L326 166" fill={C.kola} stroke={C.kola} strokeWidth="2" />
        </>
      );
    case "evenement":
      return (
        <>
          <Sky sun={false} />
          <rect x="40" y="30" width="320" height="96" rx="8" fill={C.indigo2} />
          <rect x="40" y="30" width="320" height="12" rx="4" fill={C.orange} />
          <rect x="40" y="42" width="320" height="6" fill={C.ochre} />
          <Pin x={200} y={98} s={0.9} />
          <path d="M120 96 C150 70 170 74 200 78 C230 82 250 70 280 92" stroke={C.ochre} strokeWidth="3" strokeDasharray="6 6" fill="none" />
          <rect x="0" y="200" width="400" height="40" fill="#0E1530" />
          <Person x={70} y={150} body={C.terracotta} />
          <Person x={140} y={146} body={C.ochre} head="#4A2E1A" />
          <Person x={210} y={150} body={C.kola} />
          <Person x={280} y={146} body={C.orange} head="#4A2E1A" />
          <Person x={345} y={152} body={C.cream} />
        </>
      );
    case "gps-install":
      return (
        <>
          <Sky sun={false} />
          <rect x="30" y="60" width="250" height="150" rx="10" fill={C.cream} />
          <rect x="30" y="120" width="250" height="14" fill={C.terracotta} />
          <rect x="280" y="90" width="90" height="120" rx="10" fill={C.orange} />
          <rect x="296" y="104" width="56" height="40" rx="6" fill={C.night} opacity="0.8" />
          <rect x="190" y="150" width="70" height="44" rx="8" fill={C.night} />
          <circle cx="210" cy="172" r="6" fill={C.kola} />
          <rect x="224" y="166" width="26" height="4" rx="2" fill={C.ochre} />
          <rect x="224" y="176" width="18" height="4" rx="2" fill={C.ochre} opacity="0.6" />
          <rect x="246" y="118" width="4" height="34" fill={C.night} />
          <SignalArcs x={248} y={112} />
        </>
      );
    case "sensor":
      return (
        <>
          <Sky />
          <rect x="0" y="160" width="400" height="80" fill={C.water} />
          <g fill="none" stroke={C.water2} strokeWidth="3" strokeLinecap="round" opacity="0.8">
            <path d="M10 186 q15 -8 30 0 t30 0 t30 0" />
            <path d="M250 200 q15 -8 30 0 t30 0 t30 0" />
          </g>
          <rect x="146" y="80" width="10" height="130" fill={C.cream} />
          <rect x="126" y="70" width="50" height="34" rx="6" fill={C.orange} />
          <circle cx="140" cy="87" r="5" fill={C.night} />
          <rect x="150" y="83" width="18" height="4" rx="2" fill={C.night} />
          <SignalArcs x={151} y={62} />
          <rect x="220" y="40" width="150" height="90" rx="8" fill={C.indigo2} />
          <path d="M232 110 L262 92 L290 100 L318 70 L356 78" stroke={C.ochre} strokeWidth="3" fill="none" />
          <circle cx="318" cy="70" r="4" fill={C.ochre} />
        </>
      );
    case "technician":
      return (
        <>
          <Sky />
          <path d="M0 190 Q120 172 240 186 T400 180 V240 H0Z" fill={C.terracotta} opacity="0.85" />
          <Baobab x={330} y={190} s={0.8} />
          <g transform="translate(150 70) scale(1.7)">
            <path d="M-22 80 C-22 40 -14 26 0 26 C14 26 22 40 22 80 Z" fill={C.orange} />
            <rect x="-22" y="44" width="44" height="5" fill={C.ochre} />
            <circle cx="0" cy="10" r="13" fill="#5A3820" />
            <path d="M-16 6 a16 14 0 0 1 32 0 h4 v4 h-40 v-4z" fill={C.ochre} />
          </g>
          <rect x="200" y="140" width="64" height="46" rx="6" fill={C.night} stroke={C.cream} strokeWidth="3" />
          <Pin x={232} y={172} s={0.55} />
        </>
      );
    case "telemetry":
      return (
        <>
          <Sky sun={false} />
          <g stroke={C.cream} strokeWidth="4" fill="none" strokeLinecap="round">
            <path d="M80 210 L100 90 L120 210 M88 160 h24 M84 185 h32" />
          </g>
          <circle cx="100" cy="86" r="6" fill={C.ochre} />
          <SignalArcs x={100} y={78} />
          <rect x="170" y="50" width="200" height="140" rx="10" fill={C.indigo2} />
          <rect x="170" y="50" width="200" height="10" rx="4" fill={C.orange} />
          <path d="M186 160 L216 132 L242 144 L270 104 L300 118 L330 84 L354 96" stroke={C.ochre} strokeWidth="3" fill="none" />
          <g fill={C.kola}>
            <rect x="190" y="170" width="18" height="8" rx="2" />
            <rect x="214" y="170" width="18" height="8" rx="2" opacity="0.7" />
            <rect x="238" y="170" width="18" height="8" rx="2" opacity="0.5" />
          </g>
          <rect x="0" y="210" width="400" height="30" fill="#0E1530" />
        </>
      );
  }
}

export default function Illustration({ scene, label, className }: { scene: Scene; label?: string; className?: string }) {
  return (
    <div className={`relative w-full h-full overflow-hidden ${className ?? ""}`}>
      <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" className="w-full h-full block" role="img" aria-label={label}>
        <SceneContent scene={scene} />
      </svg>
      <BogolanTexture opacity={0.05} />
      {label && (
        <span className="absolute top-2 right-2 text-[9px] uppercase tracking-wider font-semibold text-cream/80 bg-darkBg/70 backdrop-blur px-1.5 py-0.5 rounded">
          {label}
        </span>
      )}
    </div>
  );
}
