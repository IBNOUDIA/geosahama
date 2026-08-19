import { Activity, Recycle, ShieldAlert, CheckCircle2 } from "lucide-react";

export default function EpurationPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <span className="px-3 py-1 rounded-full bg-sahamaOrange/10 border border-sahamaOrange/30 text-sahamaOrange text-xs font-semibold uppercase tracking-wider">
          Projet Écologique Montréal
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold mt-4 mb-4">
          Suivi Écologique du <span className="text-sahamaYellow">Processus d'Épuration</span>
        </h1>
        <p className="text-gray-400 max-w-3xl mx-auto">
          Une plateforme complète pour surveiller chaque étape du traitement des eaux et des déchets industriels à Montréal, assurant une conformité environnementale irréprochable.
        </p>
      </div>

      {/* Process Flow */}
      <div className="grid md:grid-cols-4 gap-6 mb-16">
        <div className="bg-cardBg p-6 rounded-xl border border-zinc-800">
          <span className="text-sahamaOrange font-bold text-2xl">01</span>
          <h3 className="text-lg font-bold mt-2 mb-2">Prévention & Captage</h3>
          <p className="text-gray-400 text-xs">Détection à la source des polluants et surveillance des effluents.</p>
        </div>
        <div className="bg-cardBg p-6 rounded-xl border border-zinc-800">
          <span className="text-sahamaOrange font-bold text-2xl">02</span>
          <h3 className="text-lg font-bold mt-2 mb-2">Traitement d'Épuration</h3>
          <p className="text-gray-400 text-xs">Monitoring en temps réel des bassins et filtres de clarification.</p>
        </div>
        <div className="bg-cardBg p-6 rounded-xl border border-zinc-800">
          <span className="text-sahamaYellow font-bold text-2xl">03</span>
          <h3 className="text-lg font-bold mt-2 mb-2">Transport Sécurisé</h3>
          <p className="text-gray-400 text-xs">Suivi par géolocalisation GPS des résidus et boues d'épuration.</p>
        </div>
        <div className="bg-cardBg p-6 rounded-xl border border-zinc-800">
          <span className="text-sahamaYellow font-bold text-2xl">04</span>
          <h3 className="text-lg font-bold mt-2 mb-2">Enfouissement & Valorisation</h3>
          <p className="text-gray-400 text-xs">Traçabilité finale sur le site de dépôt et bilan carbone.</p>
        </div>
      </div>
    </div>
  );
}
