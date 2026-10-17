"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { Adinkra, KenteBand } from "./AfricanPatterns";

export const PRESENTATION_VIDEO = "/video/presentation-sahama.mp4";
export const PRESENTATION_POSTER = "/video/presentation-poster.jpg";

// Presentation film: only the poster loads with the page; the 10 MB video is
// fetched when the visitor presses play.
export default function VideoShowcase({ video }: { video: { kicker: string; title: string; subtitle: string; play: string } }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const start = () => {
    setStarted(true);
    ref.current?.play();
  };

  return (
    <section className="max-w-6xl mx-auto px-4 pt-24">
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-2 text-sahamaOrange font-semibold text-xs uppercase tracking-[0.2em]">
          <Adinkra size={12} /> {video.kicker} <Adinkra size={12} />
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mt-3 text-cream">{video.title}</h2>
        <p className="text-gray-400 mt-3 max-w-2xl mx-auto">{video.subtitle}</p>
      </div>

      <div className="relative rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl shadow-black/50 bg-black">
        <video
          ref={ref}
          src={PRESENTATION_VIDEO}
          poster={PRESENTATION_POSTER}
          preload="none"
          playsInline
          controls={started}
          className="w-full aspect-video block"
        />
        {!started && (
          <button
            onClick={start}
            aria-label={video.play}
            className="group absolute inset-0 flex items-center justify-center bg-gradient-to-t from-darkBg/70 via-transparent to-transparent"
          >
            <span className="relative flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-sahamaOrange text-darkBg shadow-2xl shadow-sahamaOrange/40 group-hover:scale-110 transition-transform">
              <span className="absolute inset-0 rounded-full bg-sahamaOrange/40 animate-ping motion-reduce:animate-none" />
              <Play size={34} fill="currentColor" className="relative ml-1" />
            </span>
            <span className="absolute bottom-5 left-6 text-cream font-semibold text-sm md:text-base">{video.play} · 0:30</span>
          </button>
        )}
        <KenteBand className="h-1.5" />
      </div>
    </section>
  );
}
