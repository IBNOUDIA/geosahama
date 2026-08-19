import { Activity, AlertTriangle, BarChart3, Bell, ShieldAlert, Wrench } from "lucide-react";

export default function PreventionPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
          Prévention des Risques & <span className="text-sahamaYellow">Analyse Prédictive</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Systèmes d'alerte rapide et prévention des incidents matériels ou environnementaux, pour anticiper avant que l'incident ne survienne.
        </p>
      </div>

      {/* Prediction Flow */}
      <div className="grid md:grid-cols-4 gap-6 mb-16">
        <div className="bg-cardBg p-6 rounded-xl border border-zinc-800">
          <span className="text-sahamaOrange font-bold text-2xl">01</span>
          <h3 className="text-lg font-bold mt-2 mb-2">Détection</h3>
          <p className="text-gray-400 text-xs">Capteurs et données terrain surveillés en continu pour repérer les premiers signaux faibles.</p>
        </div>
        <div className="bg-cardBg p-6 rounded-xl border border-zinc-800">
          <span className="text-sahamaOrange font-bold text-2xl">02</span>
          <h3 className="text-lg font-bold mt-2 mb-2">Analyse prédictive</h3>
          <p className="text-gray-400 text-xs">Croisement des historiques et des tendances pour estimer la probabilité d'une panne ou d'un incident.</p>
        </div>
        <div className="bg-cardBg p-6 rounded-xl border border-zinc-800">
          <span className="text-sahamaYellow font-bold text-2xl">03</span>
          <h3 className="text-lg font-bold mt-2 mb-2">Alerte rapide</h3>
          <p className="text-gray-400 text-xs">Notification immédiate des équipes concernées dès qu'un seuil de risque est franchi.</p>
        </div>
        <div className="bg-cardBg p-6 rounded-xl border border-zinc-800">
          <span className="text-sahamaYellow font-bold text-2xl">04</span>
          <h3 className="text-lg font-bold mt-2 mb-2">Action corrective</h3>
          <p className="text-gray-400 text-xs">Intervention ciblée avant l'incident, avec traçabilité complète des mesures prises.</p>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-cardBg p-6 rounded-2xl border border-zinc-800 hover:border-sahamaOrange/50 transition-all">
          <div className="p-3 bg-sahamaOrange/10 rounded-xl w-fit text-sahamaOrange mb-4">
            <AlertTriangle size={28} />
          </div>
          <h3 className="text-lg font-bold mb-2">Détection d'anomalies</h3>
          <p className="text-gray-400 text-sm">Identification automatique des écarts de comportement sur les équipements et installations.</p>
        </div>

        <div className="bg-cardBg p-6 rounded-2xl border border-zinc-800 hover:border-sahamaYellow/50 transition-all">
          <div className="p-3 bg-sahamaYellow/10 rounded-xl w-fit text-sahamaYellow mb-4">
            <Wrench size={28} />
          </div>
          <h3 className="text-lg font-bold mb-2">Maintenance prédictive</h3>
          <p className="text-gray-400 text-sm">Planification des interventions avant la panne, pour réduire les arrêts non programmés.</p>
        </div>

        <div className="bg-cardBg p-6 rounded-2xl border border-zinc-800 hover:border-sahamaOrange/50 transition-all">
          <div className="p-3 bg-sahamaOrange/10 rounded-xl w-fit text-sahamaOrange mb-4">
            <Bell size={28} />
          </div>
          <h3 className="text-lg font-bold mb-2">Alertes précoces</h3>
          <p className="text-gray-400 text-sm">Notifications envoyées aux équipes concernées dès les premiers signaux de risque.</p>
        </div>

        <div className="bg-cardBg p-6 rounded-2xl border border-zinc-800 hover:border-sahamaYellow/50 transition-all">
          <div className="p-3 bg-sahamaYellow/10 rounded-xl w-fit text-sahamaYellow mb-4">
            <BarChart3 size={28} />
          </div>
          <h3 className="text-lg font-bold mb-2">Rapports de risques</h3>
          <p className="text-gray-400 text-sm">Tableaux de bord consolidés pour suivre l'évolution des risques matériels et environnementaux.</p>
        </div>

        <div className="bg-cardBg p-6 rounded-2xl border border-zinc-800 hover:border-sahamaOrange/50 transition-all">
          <div className="p-3 bg-sahamaOrange/10 rounded-xl w-fit text-sahamaOrange mb-4">
            <Activity size={28} />
          </div>
          <h3 className="text-lg font-bold mb-2">Analyse en continu</h3>
          <p className="text-gray-400 text-sm">Suivi permanent des indicateurs clés pour ajuster les seuils d'alerte en temps réel.</p>
        </div>

        <div className="bg-cardBg p-6 rounded-2xl border border-zinc-800 hover:border-sahamaYellow/50 transition-all">
          <div className="p-3 bg-sahamaYellow/10 rounded-xl w-fit text-sahamaYellow mb-4">
            <ShieldAlert size={28} />
          </div>
          <h3 className="text-lg font-bold mb-2">Prévention des incidents</h3>
          <p className="text-gray-400 text-sm">Réduction des pertes matérielles, humaines et environnementales grâce à l'anticipation.</p>
        </div>
      </div>
    </div>
  );
}
