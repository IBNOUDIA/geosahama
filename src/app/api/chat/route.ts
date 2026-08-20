import { NextRequest, NextResponse } from "next/server";

const SYSTEM_CONTEXT = `Tu es l'assistant virtuel de Sahama Services, une entreprise spécialisée en géolocalisation et suivi écologique.

Voici ce que tu dois savoir sur l'entreprise :
- Sahama Services opère des solutions de géolocalisation et de gestion de flottes en Afrique de l'Ouest (hubs à Dakar, Abidjan, Conakry, Bamako), avec des balises GPS et de la télémétrie en temps réel.
- À Montréal (Québec, Canada), Sahama Services déploie un suivi écologique complet du processus d'épuration des eaux et déchets industriels, de la prévention jusqu'à l'enfouissement.
- Autres services : sécurité et surveillance d'actifs, prévention des risques et analyse prédictive.
- Contact direct : Souleymane.Diallo@sahama-services.com
- Les clients suivent leurs actifs via un portail partenaire Wialon, accessible depuis la page "Espace Client" du site (identifiants transmis par leur gestionnaire de compte).
- Le site présente aussi une page Actualités (actualités, galerie photo, témoignages).

Réponds toujours en français, de façon brève et professionnelle (2-4 phrases maximum). Si une question sort du cadre des services de Sahama Services, réponds poliment que tu es spécialisé sur les services de l'entreprise et invite la personne à contacter Souleymane.Diallo@sahama-services.com pour le reste.`;

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "missing_api_key" },
      { status: 500 }
    );
  }

  let body: { message?: string; history?: Array<{ role: "user" | "model"; text: string }> };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const message = body.message?.trim();
  if (!message) {
    return NextResponse.json({ error: "empty_message" }, { status: 400 });
  }

  const history = (body.history ?? []).slice(-10).map((m) => ({
    role: m.role,
    parts: [{ text: m.text }],
  }));

  try {
    const resp = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_CONTEXT }] },
          contents: [...history, { role: "user", parts: [{ text: message }] }],
          generationConfig: {
            maxOutputTokens: 500,
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
