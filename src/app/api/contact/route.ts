import { NextRequest, NextResponse } from "next/server";
import { clean, isEmail, isRateLimited } from "@/lib/api-guard";
import { recipients, sendAcknowledgement, sendEmail } from "@/lib/mail";

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "missing_api_key" }, { status: 500 });
  }

  if (isRateLimited(req, "contact", 5, 10 * 60_000)) {
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
  const message = clean(body.message, 5000);

  if (!name || !email || !message) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  if (!isEmail(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  try {
    const sent = await sendEmail(apiKey, {
      to: recipients(),
      replyTo: email,
      subject: `Nouveau message de ${name} - Site Sahama Services`,
      text: `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    if (!sent) {
      return NextResponse.json({ error: "upstream_error" }, { status: 502 });
    }

    await sendAcknowledgement(apiKey, email, name, clean(body.lang, 2), "contact");
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
