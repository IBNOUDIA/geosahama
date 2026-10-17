"use client";

import { useState } from "react";
import { MapPin, Recycle, Video, CalendarDays, Camera, X, Play } from "lucide-react";
import Image from "next/image";
import Illustration from "./Illustration";
import { PRESENTATION_POSTER, PRESENTATION_VIDEO } from "./VideoShowcase";

// Field photos, in the same order as the gallery captions in the dictionary.
const GALLERY_PHOTOS = [
  "/photos/balise-gps.webp",
  "/photos/capteur-eau.webp",
  "/photos/intervention-tech.webp",
  "/photos/test-telemetrie.webp",
];

interface Article {
  id: number;
  category: "geolocalisation" | "epuration" | "video" | "evenement";
  title: string;
  date: string;
  location: string;
  excerpt: string;
  image?: string;
  mediaType: "image" | "video";
  videoUrl?: string;
  photosCount?: number;
}

// Static, non-translated metadata for each article — merged with the
// translated title/location/excerpt from the dictionary at render time.
const ARTICLE_META = [
  { id: 1, category: "epuration" as const, date: "2026-08-18", mediaType: "image" as const, image: "/photos/epuration-eau.webp" },
  { id: 2, category: "geolocalisation" as const, date: "2026-08-02", mediaType: "image" as const, image: "/photos/geolocalisation.webp" },
  { id: 3, category: "evenement" as const, date: "2026-07-20", mediaType: "image" as const, image: "/photos/salon-dakar.webp" },
  {
    id: 4,
    category: "video" as const,
    date: "2026-10-16",
    mediaType: "video" as const,
    image: PRESENTATION_POSTER,
    videoUrl: PRESENTATION_VIDEO,
  },
];

const FILTER_ICONS: Record<string, React.ElementType | null> = {
  all: null,
  geolocalisation: MapPin,
  epuration: Recycle,
  evenement: CalendarDays,
  video: Video,
};

// ISO dates in ARTICLE_META, shown in the visitor's language ("18 août 2026" / "August 18, 2026").
function formatDate(iso: string, lang: "fr" | "en") {
  return new Date(`${iso}T12:00:00`).toLocaleDateString(lang === "fr" ? "fr-CA" : "en-CA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const FILTER_ORDER = ["all", "geolocalisation", "epuration", "evenement", "video"];

export default function NewsSection({ dict, lang }: { dict: any; lang: "fr" | "en" }) {
  const t = dict.actualitesPage;
  const [filter, setFilter] = useState<string>("all");
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const articlesData: Article[] = ARTICLE_META.map((meta, i) => ({
    ...meta,
    title: t.articles[i].title,
    location: t.articles[i].location,
    excerpt: t.articles[i].excerpt,
  })).sort((a, b) => b.date.localeCompare(a.date)); // newest first

  const galleryPhotos = t.gallery.map((g: { title: string }, i: number) => ({ id: i + 1, title: g.title, src: GALLERY_PHOTOS[i] }));

  const filteredArticles = filter === "all" ? articlesData : articlesData.filter((item) => item.category === filter);

  const openMedia = (article: Article) => {
    if (article.mediaType === "video" && article.videoUrl) {
      setSelectedVideo(article.videoUrl);
    } else if (article.image) {
      setSelectedImage(article.image);
    }
  };

  return (
    <section className="py-8">
      {/* Filtres */}
      <div className="flex flex-col md:flex-row justify-end items-start md:items-end mb-12 border-b border-zinc-800 pb-6">
        <div className="flex flex-wrap gap-2">
          {FILTER_ORDER.map((key) => {
            const Icon = FILTER_ICONS[key];
            const label = t.filters[key];
            return (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full transition ${
                  filter === key
                    ? "bg-sahamaOrange text-black"
                    : "bg-cardBg text-gray-300 hover:border-sahamaOrange/50 border border-zinc-800"
                }`}
              >
                {Icon && <Icon size={13} />}
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grille d'articles */}
      {filteredArticles.length === 0 ? (
        <div className="bg-cardBg border border-zinc-800 rounded-2xl p-12 text-center text-gray-500 text-sm">
          {t.emptyState}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="bg-cardBg border border-zinc-800 rounded-2xl overflow-hidden hover:border-sahamaOrange/50 transition duration-300 flex flex-col justify-between"
            >
              <div>
                <div
                  className="relative h-48 overflow-hidden cursor-pointer group"
                  onClick={() => openMedia(article)}
                >
                  {article.image ? (
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover group-hover:scale-105 transition duration-500"
                    />
                  ) : (
                    <Illustration scene={article.category === "video" ? "telemetry" : article.category} label={t.illustrationLabel} />
                  )}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition" />

                  {article.mediaType === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-sahamaOrange rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                        <Play size={22} className="text-darkBg ml-0.5" fill="currentColor" />
                      </div>
                    </div>
                  )}

                  <span className="absolute top-3 left-3 bg-sahamaOrange text-black text-xs font-bold px-3 py-1 rounded-full uppercase">
                    {t.filters[article.category]}
                  </span>
                </div>

                <div className="p-6">
                  <div className="text-xs text-gray-400 mb-2">
                    {formatDate(article.date, lang)} • {article.location}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{article.title}</h3>
                  <p className="text-gray-400 text-sm">{article.excerpt}</p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-0 flex justify-between items-center text-xs border-t border-zinc-800/50 mt-auto pt-4">
                <span className="text-gray-400 flex items-center gap-1.5">
                  {article.mediaType === "video" ? (
                    <>
                      <Video size={13} /> {t.reportage}
                    </>
                  ) : (
                    <>
                      <Camera size={13} /> {article.photosCount || 1} {t.photoSuffix}
                    </>
                  )}
                </span>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Galerie Photos */}
      <div className="mt-16 bg-cardBg p-8 rounded-2xl border border-zinc-800">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Camera size={20} className="text-sahamaYellow" /> {t.galleryTitle}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryPhotos.map((photo: { id: number; title: string; src: string }) => (
            <button
              key={photo.id}
              onClick={() => setSelectedImage(photo.src)}
              aria-label={photo.title}
              className="h-32 md:h-40 rounded-xl overflow-hidden relative group"
            >
              <Image src={photo.src} alt={photo.title} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover group-hover:scale-105 transition duration-500" />
              <span className="absolute bottom-1.5 left-1.5 right-1.5 text-[10px] text-gray-300 bg-black/60 rounded px-1.5 py-0.5 truncate">
                {photo.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Vidéo */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setSelectedVideo(null)}>
          <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 text-white bg-zinc-800 p-2 rounded-full hover:bg-sahamaOrange hover:text-black transition z-10"
            >
              <X size={16} />
            </button>
            <div className="aspect-video w-full">
              <video className="w-full h-full" src={selectedVideo} controls autoPlay playsInline title={t.videoLabel} />
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Photo */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-3xl max-h-[90vh]">
            <button onClick={() => setSelectedImage(null)} className="absolute -top-10 right-0 text-white text-sm font-semibold flex items-center gap-1.5">
              <X size={16} /> {t.closeLabel}
            </button>
            <Image
              src={selectedImage}
              alt={t.enlargeAlt}
              width={1600}
              height={1195}
              sizes="(min-width: 768px) 768px, 100vw"
              className="w-auto h-auto max-w-full max-h-[80vh] rounded-lg border border-zinc-700"
            />
          </div>
        </div>
      )}
    </section>
  );
}
