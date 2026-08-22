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

  let body: { name?: string; email?: string; message?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

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
        subject: `Nouveau message de ${name} - Site Sahama Services`,
        text: `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      }),
    });

    if (!resp.ok) {
      const errText = await resp.text();
      console.error("Resend API error:", resp.status, errText);
      return NextResponse.json({ error: "upstream_error" }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
