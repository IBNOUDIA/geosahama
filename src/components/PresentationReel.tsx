"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Pause, Play } from "lucide-react";
import Illustration, { type Scene } from "./Illustration";
import { Adinkra, KenteBand } from "./AfricanPatterns";

const SLIDE_MS = 6000;

type Slide = { scene: Scene; title: string; text: string };

const reducedMotionQuery = () => window.matchMedia("(prefers-reduced-motion: reduce)");
const subscribeReducedMotion = (onChange: () => void) => {
  const query = reducedMotionQuery();
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

// Lightweight animated "video" presenting the Sahama process: slides advance
// on their own, can be paused, and stay still for visitors who prefer reduced motion.
export default function PresentationReel({ reel }: { reel: { kicker: string; title: string; pause: string; play: string; slides: Slide[] } }) {
  const [index, setIndex] = useState(0);
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, () => reducedMotionQuery().matches, () => false);
  // null = follow the visitor's motion preference until they press play/pause.
  const [userPlaying, setUserPlaying] = useState<boolean | null>(null);
  const playing = userPlaying ?? !reducedMotion;
  const setPlaying = (update: (p: boolean) => boolean) => setUserPlaying(update(playing));

  useEffect(() => {
    if (!playing) return;
    const timer = setTimeout(() => setIndex((i) => (i + 1) % reel.slides.length), SLIDE_MS);
    return () => clearTimeout(timer);
  }, [playing, index, reel.slides.length]);

  const slide = reel.slides[index];

  return (
    <section className="max-w-7xl mx-auto px-4 pb-20">
      <style>{`
        @keyframes reelProgress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes reelIn { from { opacity: 0; transform: scale(1.04); } to { opacity: 1; transform: scale(1); } }
        .reel-progress { animation: reelProgress ${SLIDE_MS}ms linear forwards; transform-origin: left; }
        .reel-in { animation: reelIn 700ms ease-out; }
        @media (prefers-reduced-motion: reduce) { .reel-progress, .reel-in { animation: none; } }
      `}</style>

      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-2 text-sahamaOrange font-semibold text-xs uppercase tracking-[0.2em]">
          <Adinkra size={12} /> {reel.kicker} <Adinkra size={12} />
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mt-3 text-cream">{reel.title}</h2>
      </div>

      <div className="rounded-3xl overflow-hidden border border-zinc-800 bg-cardBg shadow-2xl shadow-black/40">
        <div className="grid lg:grid-cols-[1.5fr,1fr]">
          <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[380px] overflow-hidden">
            <div key={index} className="reel-in absolute inset-0">
              <Illustration scene={slide.scene} />
            </div>
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-darkBg/80 to-transparent" />
            <button
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? reel.pause : reel.play}
              className="absolute bottom-4 left-4 w-11 h-11 rounded-full bg-sahamaOrange text-darkBg flex items-center justify-center shadow-lg hover:scale-105 transition"
            >
              {playing ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
            </button>
          </div>

          <div className="p-8 md:p-10 flex flex-col justify-center">
            <p className="font-mono text-sahamaYellow text-sm mb-3">
              {String(index + 1).padStart(2, "0")} / {String(reel.slides.length).padStart(2, "0")}
            </p>
            <h3 key={`t${index}`} className="reel-in text-3xl font-bold text-cream mb-4">{slide.title}</h3>
            <p key={`p${index}`} className="reel-in text-gray-300 leading-relaxed mb-8">{slide.text}</p>

            <div className="grid grid-cols-4 gap-2" role="tablist">
              {reel.slides.map((s, i) => (
                <button
                  key={s.title}
                  role="tab"
                  aria-selected={i === index}
                  aria-label={s.title}
                  onClick={() => setIndex(i)}
                  className="group text-left"
                >
                  <span className="block h-1 rounded-full bg-zinc-700 overflow-hidden">
                    {i < index && <span className="block h-full bg-sahamaOrange" />}
                    {i === index && (
                      <span
                        key={`${index}-${playing}`}
                        className={`block h-full bg-sahamaOrange ${playing ? "reel-progress" : ""}`}
                      />
                    )}
                  </span>
                  <span className={`block mt-2 text-xs font-semibold transition ${i === index ? "text-cream" : "text-gray-500 group-hover:text-gray-300"}`}>
                    {s.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
        <KenteBand className="h-1.5" />
      </div>
    </section>
  );
}
