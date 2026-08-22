"use client";

import { useState } from "react";
import { MapPin, Recycle, Video, CalendarDays, Camera, X, PlayCircle } from "lucide-react";
import MediaPlaceholder from "./MediaPlaceholder";

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
  { id: 1, category: "epuration" as const, date: "18 août 2026", mediaType: "image" as const, photosCount: 8 },
  { id: 2, category: "geolocalisation" as const, date: "02 août 2026", mediaType: "image" as const },
  { id: 3, category: "evenement" as const, date: "20 juillet 2026", mediaType: "image" as const },
];

const FILTER_ICONS: Record<string, React.ElementType | null> = {
  all: null,
  geolocalisation: MapPin,
  epuration: Recycle,
  evenement: CalendarDays,
  video: Video,
};

const FILTER_ORDER = ["all", "geolocalisation", "epuration", "evenement", "video"];

export default function NewsSection({ dict }: { dict: any }) {
  const t = dict.actualitesPage;
  const [filter, setFilter] = useState<string>("all");
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const articlesData: Article[] = ARTICLE_META.map((meta, i) => ({
    ...meta,
    title: t.articles[i].title,
    location: t.articles[i].location,
    excerpt: t.articles[i].excerpt,
  }));

  const galleryPhotos = t.gallery.map((g: { title: string }, i: number) => ({ id: i + 1, title: g.title }));

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
      {/* En-tête + filtres */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-zinc-800 pb-6">
        <div>
          <span className="text-sahamaOrange font-semibold text-sm uppercase tracking-widest">{t.kicker}</span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-2">{t.title}</h2>
        </div>

        <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
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
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  ) : (
                    <MediaPlaceholder category={article.category} label={t.photoPending} />
                  )}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition" />

                  {article.mediaType === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-sahamaOrange rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                        <PlayCircle size={22} className="text-black" fill="black" />
                      </div>
                    </div>
                  )}

                  <span className="absolute top-3 left-3 bg-sahamaOrange text-black text-xs font-bold px-3 py-1 rounded-full uppercase">
                    {t.filters[article.category]}
                  </span>
                </div>

                <div className="p-6">
                  <div className="text-xs text-gray-400 mb-2">
                    {article.date} • {article.location}
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
          {galleryPhotos.map((photo: { id: number; title: string }) => (
            <div key={photo.id} className="h-32 rounded-xl overflow-hidden relative group">
              <MediaPlaceholder label={t.photoPending} />
              <span className="absolute bottom-1.5 left-1.5 right-1.5 text-[10px] text-gray-300 bg-black/60 rounded px-1.5 py-0.5 truncate">
                {photo.title}
              </span>
            </div>
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
              <iframe className="w-full h-full" src={selectedVideo} title={t.videoLabel} allowFullScreen />
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
            <img src={selectedImage} alt={t.enlargeAlt} className="max-w-full max-h-[80vh] rounded-lg border border-zinc-700" />
          </div>
        </div>
      )}
    </section>
  );
}
