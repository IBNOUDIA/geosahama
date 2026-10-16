import { NextRequest, NextResponse } from "next/server";
import { clean, isEmail, isRateLimited } from "@/lib/api-guard";

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

  if (isRateLimited(req, "quote", 5, 10 * 60_000)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  // Bots fill the hidden "website" field: pretend success, send nothing.
  if (clean(body.website, 200)) {
    return NextResponse.json({ success: true });
  }

  const name = clean(body.name, 100);
  const email = clean(body.email, 200);

  if (!name || !email) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  if (!isEmail(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const company = clean(body.company, 150);
  const phone = clean(body.phone, 40);
  const services = Array.isArray(body.services)
    ? body.services.slice(0, 10).map((s) => clean(s, 100)).filter(Boolean)
    : [];
  const fleetSize = clean(body.fleetSize, 50);
  const zone = clean(body.zone, 100);
  const message = clean(body.message, 5000);

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
