import { Rss, Camera, Video, Tag } from "lucide-react";

export default function MediaStatsPanel({
  title,
  status,
  reportagesLabel,
  photosLabel,
  categoriesLabel,
  reportages,
  photos,
  categories,
}: {
  title: string;
  status: string;
  reportagesLabel: string;
  photosLabel: string;
  categoriesLabel: string;
  reportages: number;
  photos: number;
  categories: number;
}) {
  return (
    <div className="bg-darkBg/80 backdrop-blur border border-zinc-800 rounded-2xl p-5 shadow-2xl shadow-black/40">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-800">
        <span className="flex items-center gap-2 text-white font-bold text-sm tracking-wide">
          <Rss size={16} className="text-sahamaOrange" /> {title}
        </span>
        <span className="flex items-center gap-1.5 text-green-400 text-xs font-semibold uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> {status}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="bg-zinc-900/80 rounded-xl p-3 text-center">
          <Video size={16} className="text-sahamaOrange mx-auto mb-1.5" />
          <div className="font-mono text-xl font-semibold text-sahamaYellow">{reportages}</div>
          <div className="text-[10px] text-gray-400 uppercase tracking-wide">{reportagesLabel}</div>
        </div>
        <div className="bg-zinc-900/80 rounded-xl p-3 text-center">
          <Camera size={16} className="text-sahamaYellow mx-auto mb-1.5" />
          <div className="font-mono text-xl font-semibold text-sahamaYellow">{photos}</div>
          <div className="text-[10px] text-gray-400 uppercase tracking-wide">{photosLabel}</div>
        </div>
        <div className="bg-zinc-900/80 rounded-xl p-3 text-center">
          <Tag size={16} className="text-sahamaOrange mx-auto mb-1.5" />
          <div className="font-mono text-xl font-semibold text-sahamaYellow">{categories}</div>
          <div className="text-[10px] text-gray-400 uppercase tracking-wide">{categoriesLabel}</div>
        </div>
      </div>
    </div>
  );
}
