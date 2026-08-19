import { LogIn, MapPin, ShieldCheck } from "lucide-react";

export default function EspaceClientPage({ params }: { params: { lang: "fr" | "en" } }) {
  const wialonUrl = `https://hosting.wialon.eu/?lang=${params.lang}`;

  return (
    <div className="max-w-md mx-auto px-4 py-16 text-center">
      <div className="p-3 bg-sahamaOrange/10 rounded-xl w-fit mx-auto text-sahamaOrange mb-6">
        <ShieldCheck size={32} />
      </div>
      <h1 className="text-2xl font-bold mb-3">Portail Client Sécurisé</h1>
      <p className="text-gray-400 text-sm mb-8">
        Suivez vos véhicules et actifs en temps réel sur notre plateforme partenaire{" "}
        <span className="text-white font-semibold">Wialon</span>.
      </p>

      <div className="bg-cardBg p-6 rounded-2xl border border-zinc-800 space-y-4">
        <div className="flex items-center gap-3 text-left text-sm text-gray-400">
          <MapPin size={18} className="text-sahamaYellow shrink-0" />
          <span>Vos identifiants Wialon vous ont été transmis par votre gestionnaire de compte Sahama Services.</span>
        </div>
        <a
          href={wialonUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-sahamaOrange hover:bg-sahamaOrange/90 text-black font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all"
        >
          Se connecter à mon espace <LogIn size={18} />
        </a>
      </div>

      <p className="text-gray-500 text-xs mt-6">
        Pas encore d'accès ?{" "}
        <a href={`/${params.lang}/contact`} className="text-sahamaYellow hover:underline">
          Contactez-nous
        </a>{" "}
        pour l'activation de votre compte.
      </p>
    </div>
  );
}
