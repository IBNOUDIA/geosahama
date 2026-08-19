import { ShieldCheck, Eye, Bell, Radio, Lock, Camera } from "lucide-react";

export default function SecuritePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
          Sécurité & <span className="text-sahamaOrange">Surveillance d'Actifs</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Solutions de télémétrie et de sécurisation des installations industrielles, pensées pour protéger vos sites, vos équipes et vos équipements en continu.
        </p>
      </div>

      {/* Status Panel */}
      <div className="w-full bg-cardBg rounded-2xl border border-zinc-800 flex flex-col md:flex-row items-center justify-between p-6 mb-12 gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-sahamaOrange/10 rounded-xl text-sahamaOrange">
            <ShieldCheck size={28} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Surveillance active 24/7</h3>
            <p className="text-gray-400 text-sm">Télémétrie en temps réel sur l'ensemble de vos sites et actifs sensibles.</p>
          </div>
        </div>
        <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Réseau opérationnel
        </span>
      </div>

      {/* Feature Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-cardBg p-6 rounded-2xl border border-zinc-800 hover:border-sahamaOrange/50 transition-all">
          <div className="p-3 bg-sahamaOrange/10 rounded-xl w-fit text-sahamaOrange mb-4">
            <Eye size={28} />
          </div>
          <h3 className="text-lg font-bold mb-2">Surveillance en temps réel</h3>
          <p className="text-gray-400 text-sm">Suivi continu des installations et des zones à risque via capteurs connectés et caméras.</p>
        </div>

        <div className="bg-cardBg p-6 rounded-2xl border border-zinc-800 hover:border-sahamaYellow/50 transition-all">
          <div className="p-3 bg-sahamaYellow/10 rounded-xl w-fit text-sahamaYellow mb-4">
            <Bell size={28} />
          </div>
          <h3 className="text-lg font-bold mb-2">Alertes préventives</h3>
          <p className="text-gray-400 text-sm">Notifications immédiates en cas d'intrusion, d'anomalie ou de dépassement de seuil critique.</p>
        </div>

        <div className="bg-cardBg p-6 rounded-2xl border border-zinc-800 hover:border-sahamaOrange/50 transition-all">
          <div className="p-3 bg-sahamaOrange/10 rounded-xl w-fit text-sahamaOrange mb-4">
            <Radio size={28} />
          </div>
          <h3 className="text-lg font-bold mb-2">Télémétrie industrielle</h3>
          <p className="text-gray-400 text-sm">Collecte et transmission continue des données terrain pour un pilotage centralisé des risques.</p>
        </div>

        <div className="bg-cardBg p-6 rounded-2xl border border-zinc-800 hover:border-sahamaYellow/50 transition-all">
          <div className="p-3 bg-sahamaYellow/10 rounded-xl w-fit text-sahamaYellow mb-4">
            <Lock size={28} />
          </div>
          <h3 className="text-lg font-bold mb-2">Contrôle d'accès</h3>
          <p className="text-gray-400 text-sm">Gestion des accès aux sites sensibles et traçabilité des mouvements de personnel et de matériel.</p>
        </div>

        <div className="bg-cardBg p-6 rounded-2xl border border-zinc-800 hover:border-sahamaOrange/50 transition-all">
          <div className="p-3 bg-sahamaOrange/10 rounded-xl w-fit text-sahamaOrange mb-4">
            <Camera size={28} />
          </div>
          <h3 className="text-lg font-bold mb-2">Vidéosurveillance connectée</h3>
          <p className="text-gray-400 text-sm">Caméras intégrées au réseau de télémétrie pour une vérification visuelle instantanée des alertes.</p>
        </div>

        <div className="bg-cardBg p-6 rounded-2xl border border-zinc-800 hover:border-sahamaYellow/50 transition-all">
          <div className="p-3 bg-sahamaYellow/10 rounded-xl w-fit text-sahamaYellow mb-4">
            <ShieldCheck size={28} />
          </div>
          <h3 className="text-lg font-bold mb-2">Sécurisation des installations</h3>
          <p className="text-gray-400 text-sm">Protocoles adaptés à chaque site industriel pour réduire les risques matériels et humains.</p>
        </div>
      </div>
    </div>
  );
}
