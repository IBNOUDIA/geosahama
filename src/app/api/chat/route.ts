import { NextRequest, NextResponse } from "next/server";
import { clean, isRateLimited } from "@/lib/api-guard";

const SYSTEM_CONTEXT = `Tu es l'assistant virtuel de Sahama Services, une entreprise spécialisée en géolocalisation, télémétrie et suivi écologique, active en Afrique de l'Ouest et à Montréal.

Connaissances sur l'entreprise :
- Géolocalisation & gestion de flottes : suivi GPS en temps réel des véhicules et actifs industriels, avec des hubs opérationnels à Dakar, Abidjan, Conakry et Bamako. La page "Géolocalisation" du site propose une carte interactive avec recherche d'adresse, clic sur la carte pour obtenir des coordonnées GPS, géolocalisation de l'utilisateur avec distance au hub le plus proche, et calcul d'itinéraire routier (avec étapes détaillées).
- Sécurité & surveillance : télémétrie industrielle, alertes préventives, contrôle d'accès, vidéosurveillance connectée, pour protéger sites et équipements 24/7.
- Prévention & analyse prédictive : détection d'anomalies, maintenance prédictive, alertes précoces et rapports de risques pour anticiper pannes et incidents avant qu'ils ne surviennent.
- Suivi écologique d'épuration (Montréal, QC, Canada) : traçabilité complète du traitement des eaux et déchets industriels, de la prévention jusqu'à l'enfouissement contrôlé, avec conformité environnementale.
- Portail client : les clients suivent leurs actifs en temps réel via la plateforme partenaire Wialon, accessible depuis "Espace Client" (identifiants transmis par leur gestionnaire de compte).
- Devis : un visiteur peut demander un devis personnalisé directement sur la page "Contact", section "Demander un devis" (services souhaités, taille de flotte, zone géographique) — l'équipe répond sous 48h avec un prix réel.
- Actualités : la page "Actualités" présente les activités récentes, une galerie photo et des témoignages clients.
- Contact direct : Souleymane.Diallo@sahama-services.com

Consignes :
- Réponds dans la langue de la question posée (français ou anglais).
- Sois précis, professionnel et concis (2-5 phrases, plus si la question l'exige clairement).
- Oriente activement la personne vers la bonne page ou action du site quand c'est pertinent (ex. "Espace Client" pour se connecter, section devis de "Contact" pour un prix, page "Géolocalisation" pour tester la carte).
- Ne donne jamais de prix ou de tarif précis, même approximatif : invite toujours à utiliser le formulaire de devis sur la page Contact, ou à écrire à Souleymane.Diallo@sahama-services.com.
- Si une question sort du cadre des services de Sahama Services, réponds poliment que tu es spécialisé sur les services de l'entreprise et invite la personne à contacter Souleymane.Diallo@sahama-services.com pour le reste.`;

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

  let body: { message?: unknown; history?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

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
          system_instruction: { parts: [{ text: SYSTEM_CONTEXT }] },
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
