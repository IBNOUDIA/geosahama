import { Facebook, Instagram } from "lucide-react";

// TODO: remplacer par les vraies coordonnées quand elles seront disponibles.
const FACEBOOK_URL = "#";
const INSTAGRAM_URL = "#";
const WHATSAPP_URL = "#"; // format attendu une fois le numéro connu : https://wa.me/<numéro sans le +>

function WhatsAppIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 21l1.65-4.95A8.5 8.5 0 1 1 8.9 19.4L3 21z" />
      <path d="M9 10.3c0 2.9 2.4 5.3 5.3 5.3.4 0 .8-.4.8-.9v-.6a.5.5 0 0 0-.35-.48l-1.4-.47a.5.5 0 0 0-.55.16l-.28.35a4.4 4.4 0 0 1-1.9-1.9l.35-.28a.5.5 0 0 0 .16-.55l-.47-1.4A.5.5 0 0 0 10.15 9h-.6c-.5 0-.55.4-.55 1.3Z" />
    </svg>
  );
}

const socials = [
  { label: "Facebook", href: FACEBOOK_URL, Icon: Facebook },
  { label: "Instagram", href: INSTAGRAM_URL, Icon: Instagram },
  { label: "WhatsApp", href: WHATSAPP_URL, Icon: WhatsAppIcon },
].filter((s) => s.href !== "#"); // hide networks whose link is not configured yet

export default function SocialLinks({ className }: { className?: string }) {
  if (socials.length === 0) return null;

  return (
    <div className={`flex items-center justify-center gap-3 ${className ?? ""}`}>
      {socials.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="w-9 h-9 flex items-center justify-center rounded-full border border-zinc-800 text-gray-400 hover:text-sahamaOrange hover:border-sahamaOrange/50 transition"
        >
          <Icon size={16} />
        </a>
      ))}
    </div>
  );
}
