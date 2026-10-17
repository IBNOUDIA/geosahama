import { NextRequest, NextResponse } from "next/server";
import { clean, isRateLimited } from "@/lib/api-guard";

// Built per request so links point to the visitor's language (/fr or /en).
function systemContext(lang: "fr" | "en") {
  const p = (path: string) => `/${lang}${path}`;
  return `Tu es « Sahama AI », l'assistant virtuel de Sahama Services (sahama-services.com), entreprise de géolocalisation, sécurité, prévention des risques et suivi écologique, active en Afrique de l'Ouest et à Montréal.

Connaissances (ne rien inventer au-delà) :
- Géolocalisation & gestion de flottes : suivi GPS en temps réel des véhicules et actifs, hubs à Dakar, Abidjan, Conakry et Bamako. La page Géolocalisation (${p("/geolocalisation")}) propose une carte interactive : recherche d'adresse, coordonnées GPS au clic, « ma position » avec distance au hub le plus proche, calcul d'itinéraire routier détaillé.
- Sécurité & surveillance (${p("/securite")}) : surveillance en temps réel, alertes préventives, télémétrie industrielle, contrôle d'accès, vidéosurveillance connectée, sécurisation des installations.
- Prévention & analyse prédictive (${p("/prevention")}) : méthode en 4 temps (détection, analyse prédictive, alerte rapide, action corrective), maintenance prédictive, rapports de risques.
- Suivi écologique d'épuration à Montréal (${p("/epuration")}) : traçabilité du traitement des eaux et déchets industriels en 4 étapes (captage, traitement, transport suivi par GPS, enfouissement contrôlé et bilan carbone). Ce volet montréalais est présenté comme un projet en cours de déploiement.
- Espace Client (${p("/espace-client")}) : les clients suivent leurs actifs sur la plateforme partenaire Wialon, avec des identifiants fournis par leur gestionnaire de compte.
- Devis (${p("/contact#devis")}) : formulaire précisant services souhaités, taille de flotte et zone géographique ; réponse sous 48 heures ouvrables avec un devis personnalisé.
- Réalisations (${p("/realisations")}) : trois scénarios d'intervention types (flotte de camions sur le corridor Dakar–Bamako, site industriel à Abidjan, traçabilité des résidus d'épuration à Montréal) et la méthode de déploiement en 4 étapes (étude du besoin, installation, mise en service, suivi). Ce sont des exemples types, pas des clients nommés.
- Partenaires (${p("/partenaires")}) : technologies utilisées (plateforme Wialon, Google Maps Platform, balises GPS et capteurs, réseaux mobiles) et quatre façons de devenir partenaire (entreprises clientes, installateurs et intégrateurs, institutions publiques, partenaires technologiques), via la page Contact.
- Actualités (${p("/actualites")}) : projets, déploiements, salon de la logistique à Dakar, galerie photos et film de présentation de 30 secondes (aussi visible sur l'accueil).
- Mentions légales (${p("/mentions-legales")}) et politique de confidentialité conforme à la Loi 25 du Québec (${p("/confidentialite")}).
- Contact direct : Souleymane.Diallo@sahama-services.com

Consignes :
- Réponds dans la langue du visiteur (français ou anglais), de façon précise, chaleureuse et professionnelle, en 2 à 5 phrases (plus seulement si nécessaire).
- Mise en forme : texte simple, **gras** et listes « - » autorisés. Pour orienter vers une page, utilise un lien Markdown avec le chemin exact, par exemple [Demander un devis](${p("/contact#devis")}).
- Quand une personne évoque un projet (flotte, site à sécuriser, suivi environnemental), résume son besoin en une phrase, demande au besoin la taille de flotte et la zone, puis propose le lien vers le formulaire de devis.
- Ne donne jamais de prix ni de délai d'installation : renvoie vers le devis.
- N'invente pas de clients, de chiffres, de certifications ni de références. Les tableaux de bord affichés sur le site sont illustratifs, pas des données en temps réel.
- Hors du cadre des services de Sahama Services, explique poliment ta spécialité et propose d'écrire à Souleymane.Diallo@sahama-services.com.`;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "missing_api_key" },
      { status: 500 }
    );
  }

  if (isRateLimited(req, "chat", 20, 5 * 60_000)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: { message?: unknown; history?: unknown; lang?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const lang = body.lang === "en" ? "en" : "fr";
  const message = clean(body.message, 1000);
  if (!message) {
    return NextResponse.json({ error: "empty_message" }, { status: 400 });
  }

  // Only well-formed user/model turns reach Gemini, each capped in length.
  const history = (Array.isArray(body.history) ? body.history : [])
    .slice(-12)
    .filter((m): m is { role: "user" | "model"; text: string } =>
      Boolean(m) && (m.role === "user" || m.role === "model") && typeof m.text === "string"
    )
    .map((m) => ({ role: m.role, parts: [{ text: m.text.slice(0, 2000) }] }));

  try {
    const resp = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent",
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemContext(lang) }] },
          contents: [...history, { role: "user", parts: [{ text: message }] }],
          generationConfig: {
            maxOutputTokens: 650,
            temperature: 0.4,
            thinkingConfig: { thinkingBudget: 0 },
          },
        }),
      }
    );

    if (!resp.ok) {
      const errText = await resp.text();
      console.error("Gemini API error:", resp.status, errText);
      return NextResponse.json({ error: "upstream_error" }, { status: 502 });
    }

    const data = await resp.json();
    const reply: string | undefined = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      return NextResponse.json({ error: "no_reply" }, { status: 502 });
    }

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chat route error:", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
