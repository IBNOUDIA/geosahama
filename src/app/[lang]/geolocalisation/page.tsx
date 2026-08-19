import { MapPin, Navigation, Radio } from "lucide-react";

export default function GeolocalisationPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
          Géolocalisation & <span className="text-sahamaOrange">Gestion de Flottes</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Nos solutions de traçabilité en Afrique de l'Ouest permettent un suivi temps réel connecté aux API Google Maps & Earth.
        </p>
      </div>

      {/* Map Placeholder Container */}
      <div className="w-full h-96 bg-cardBg rounded-2xl border border-zinc-800 flex flex-col items-center justify-center p-6 mb-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#FF7A00_1px,transparent_1px)] [background-size:16px_16px]" />
        <MapPin size={48} className="text-sahamaOrange mb-4 animate-bounce" />
        <h3 className="text-xl font-bold text-white mb-2">Google Earth & Maps API Connected</h3>
        <p className="text-gray-400 text-sm text-center max-w-md">
          Insérez votre clé <code className="text-sahamaYellow">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> dans le fichier <code className="text-sahamaYellow">.env.local</code> pour charger la carte interactive.
        </p>
      </div>
    </div>
  );
}
