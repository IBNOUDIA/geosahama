import Image from "next/image";

// Brand mark (interlaced "S" with GPS pin) on a cream tile: the navy part of
// the logo would disappear directly on the indigo background.
export default function Logo({ size = 36, className }: { size?: number; className?: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-[28%] bg-cream shrink-0 ${className ?? ""}`}
      style={{ width: size, height: size }}
    >
      <Image src="/logo-mark.png" alt="" width={Math.round(size * 0.78)} height={Math.round(size * 0.78)} priority />
    </span>
  );
}

// Stacked wordmark matching the official logo: "Sahama" / "Services".
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={`flex flex-col font-display font-bold leading-[0.95] tracking-tight ${className ?? ""}`}>
      <span className="text-cream">Sahama</span>
      <span className="text-sahamaOrange">Services</span>
    </span>
  );
}
