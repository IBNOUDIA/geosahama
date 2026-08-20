export default function Logo({ size = 36, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="sahamaLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF7A00" />
          <stop offset="100%" stopColor="#FFC700" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="10" fill="url(#sahamaLogoGrad)" />
      <path
        d="M20 8c-4.42 0-8 3.5-8 7.9 0 5.9 8 15.1 8 15.1s8-9.2 8-15.1c0-4.4-3.58-7.9-8-7.9z"
        fill="#0B0B0B"
      />
      <circle cx="20" cy="15.8" r="3.1" fill="url(#sahamaLogoGrad)" />
    </svg>
  );
}
