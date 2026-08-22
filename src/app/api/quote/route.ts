import { NextRequest, NextResponse } from "next/server";

// TODO: revert to "Souleymane.Diallo@sahama-services.com" once the
// sahama-services.com domain is verified on Resend (resend.com/domains) —
// until then, Resend's unverified-domain mode only allows sending to the
// account's own address.
const CONTACT_EMAIL = "diaamar757@gmail.com";

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "missing_api_key" }, { status: 500 });
  }

  let body: {
    name?: string;
    company?: string;
    email?: string;
    phone?: string;
    services?: string[];
    fleetSize?: string;
    zone?: string;
    message?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();

  if (!name || !email) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  const company = body.company?.trim();
  const phone = body.phone?.trim();
  const services = Array.isArray(body.services) ? body.services.filter(Boolean) : [];
  const fleetSize = body.fleetSize?.trim();
  const zone = body.zone?.trim();
  const message = body.message?.trim();

  const lines = [
    `Nom: ${name}`,
    company && `Entreprise: ${company}`,
    `Email: ${email}`,
    phone && `Téléphone: ${phone}`,
    services.length > 0 && `Services demandés: ${services.join(", ")}`,
    fleetSize && `Taille approximative (véhicules/actifs): ${fleetSize}`,
    zone && `Zone géographique: ${zone}`,
    message && `\nDétails supplémentaires:\n${message}`,
  ].filter(Boolean);

  try {
    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Site Sahama Services <onboarding@resend.dev>",
        to: [CONTACT_EMAIL],
        reply_to: email,
        subject: `Nouvelle demande de devis de ${name} - Site Sahama Services`,
        text: lines.join("\n"),
      }),
    });

    if (!resp.ok) {
      const errText = await resp.text();
      console.error("Resend API error:", resp.status, errText);
      return NextResponse.json({ error: "upstream_error" }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Quote route error:", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
