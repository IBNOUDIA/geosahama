import { MapPin, Recycle, Video, CalendarDays, ImageIcon, type LucideIcon } from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  geolocalisation: MapPin,
  epuration: Recycle,
  video: Video,
  evenement: CalendarDays,
};

export default function MediaPlaceholder({
  category,
  label = "Photo à venir",
  className,
}: {
  category?: string;
  label?: string;
  className?: string;
}) {
  const Icon = (category && ICONS[category]) || ImageIcon;

  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-zinc-900 to-black relative overflow-hidden ${className ?? ""}`}
    >
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FF7A00_1px,transparent_1px)] [background-size:14px_14px]" />
      <Icon size={30} className="text-sahamaOrange relative z-10" />
      <span className="text-[10px] uppercase tracking-wider text-gray-500 relative z-10">{label}</span>
    </div>
  );
}
