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

const articlesData: Article[] = [
  {
    id: 1,
    category: "epuration",
    title: "Lancement du projet de traçabilité écologique du processus d'épuration",
    date: "18 août 2026",
    location: "Montréal, QC",
    excerpt: "Déploiement de nos capteurs intelligents pour le suivi de la prévention jusqu'à l'enfouissement.",
    mediaType: "image",
    photosCount: 8,
  },
  {
    id: 2,
    category: "geolocalisation",
    title: "Acquisition et mise en service de nouveaux équipements GPS",
    date: "02 août 2026",
    location: "Afrique de l'Ouest",
    excerpt: "Extension de notre couverture géographique pour un suivi haute précision des flottes.",
    mediaType: "image",
  },
  {
    id: 3,
    category: "evenement",
    title: "Sahama Services au Salon de la Logistique en Afrique de l'Ouest",
    date: "20 juillet 2026",
    location: "Dakar, Sénégal",
    excerpt: "Rencontre avec nos partenaires et présentation de nos solutions de télémétrie sur le salon régional.",
    mediaType: "image",
  },
];

const galleryPhotos = [
  { id: 1, title: "Installation balise GPS" },
  { id: 2, title: "Capteur de suivi écologique" },
  { id: 3, title: "Intervention équipe technique" },
  { id: 4, title: "Test télémétrie sur site" },
];

const FILTERS: { key: string; label: string; icon: React.ElementType | null }[] = [
  { key: "all", label: "Tout voir", icon: null },
  { key: "geolocalisation", label: "Géolocalisation", icon: MapPin },
  { key: "epuration", label: "Épuration Montréal", icon: Recycle },
  { key: "evenement", label: "Événements", icon: CalendarDays },
  { key: "video", label: "Vidéos", icon: Video },
];

export default function NewsSection() {
  const [filter, setFilter] = useState<string>("all");
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
          <span className="text-sahamaOrange font-semibold text-sm uppercase tracking-widest">Sahama Media & News</span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-2">Nos activités & actualités</h2>
        </div>

        <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
          {FILTERS.map(({ key, label, icon: Icon }) => (
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
          ))}
        </div>
      </div>

      {/* Grille d'articles */}
      {filteredArticles.length === 0 ? (
        <div className="bg-cardBg border border-zinc-800 rounded-2xl p-12 text-center text-gray-500 text-sm">
          Contenu à venir dans cette catégorie.
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
                    <MediaPlaceholder category={article.category} />
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
                    {article.category}
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
                      <Video size={13} /> Reportage
                    </>
                  ) : (
                    <>
                      <Camera size={13} /> {article.photosCount || 1} photo(s)
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
          <Camera size={20} className="text-sahamaYellow" /> Galerie photos de terrain
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryPhotos.map((photo) => (
            <div key={photo.id} className="h-32 rounded-xl overflow-hidden relative group">
              <MediaPlaceholder />
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
              <iframe className="w-full h-full" src={selectedVideo} title="Vidéo" allowFullScreen />
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Photo */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-3xl max-h-[90vh]">
            <button onClick={() => setSelectedImage(null)} className="absolute -top-10 right-0 text-white text-sm font-semibold flex items-center gap-1.5">
              <X size={16} /> Fermer
            </button>
            <img src={selectedImage} alt="Agrandissement" className="max-w-full max-h-[80vh] rounded-lg border border-zinc-700" />
          </div>
        </div>
      )}
    </section>
  );
}
