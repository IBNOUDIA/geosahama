// Decorative West African motifs, drawn as SVG patterns so they stay sharp
// and weigh almost nothing. Pattern ids are fixed: identical definitions
// repeated in the page are harmless (the first one is used).

// Kente-inspired woven band: alternating colour blocks, stripes and zigzags.
export function KenteBand({ className = "h-2" }: { className?: string }) {
  return (
    <svg className={`w-full block ${className}`} preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <pattern id="kenteTile" width="96" height="12" patternUnits="userSpaceOnUse">
          <rect width="96" height="12" fill="#0B1024" />
          <rect x="0" width="22" height="12" fill="#FF7A00" />
          <rect x="22" width="4" height="12" fill="#0B1024" />
          <rect x="26" width="18" height="12" fill="#F0B03F" />
          <path d="M26 12 L31 4 L35 12 L39 4 L44 12" fill="none" stroke="#0B1024" strokeWidth="1.6" />
          <rect x="44" width="4" height="12" fill="#2F8F5B" />
          <rect x="48" width="22" height="12" fill="#C4532F" />
          <rect x="52" y="5" width="14" height="2" fill="#F6EEE1" opacity="0.7" />
          <rect x="70" width="4" height="12" fill="#0B1024" />
          <rect x="74" width="18" height="12" fill="#F0B03F" />
          <rect x="79" y="3" width="8" height="6" fill="#0B1024" />
          <rect x="92" width="4" height="12" fill="#2F8F5B" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#kenteTile)" />
    </svg>
  );
}

// Bogolan (Malian mud cloth) motifs: dots, crosses, zigzags and rings,
// meant as a faint texture over hero sections and cards.
export function BogolanTexture({
  className = "absolute inset-0 w-full h-full",
  opacity = 0.07,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <svg className={className} aria-hidden="true" style={{ opacity }}>
      <defs>
        <pattern id="bogolanTile" width="120" height="120" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="#F6EEE1" strokeWidth="2" strokeLinecap="round">
            <path d="M8 20 L20 8 L32 20 L44 8 L56 20" />
            <path d="M74 14 h20 M84 4 v20" />
            <circle cx="30" cy="62" r="10" />
            <circle cx="30" cy="62" r="3" fill="#F6EEE1" />
            <path d="M64 50 h44 M64 74 h44" />
            <path d="M8 104 L20 92 L32 104 L44 92 L56 104" />
            <path d="M80 96 l8 8 m0 -8 l-8 8" />
          </g>
          <g fill="#F6EEE1">
            <circle cx="70" cy="62" r="2" />
            <circle cx="86" cy="62" r="2" />
            <circle cx="102" cy="62" r="2" />
            <circle cx="104" cy="100" r="2" />
            <circle cx="112" cy="100" r="2" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bogolanTile)" />
    </svg>
  );
}

// Small diamond ornament used before section kickers.
export function Adinkra({ size = 14, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" className={className} aria-hidden="true">
      <path d="M10 1 L19 10 L10 19 L1 10 Z" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M10 6 L14 10 L10 14 L6 10 Z" fill="currentColor" />
    </svg>
  );
}
