// Email sending through Resend, configured from Vercel environment variables:
//   CONTACT_FROM  sender, e.g. "Sahama Services <contact@sahama-services.com>".
//                 Only set it once the domain is verified on resend.com/domains;
//                 until then Resend's test sender is used, which can only
//                 deliver to the Resend account's own address.
//   CONTACT_TO    comma-separated recipients of form submissions.
const TEST_SENDER = "Site Sahama Services <onboarding@resend.dev>";
const DEFAULT_RECIPIENTS = ["diaamar757@gmail.com"];

export const verifiedSender = process.env.CONTACT_FROM?.trim() || null;

export function recipients() {
  const list = (process.env.CONTACT_TO ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return list.length > 0 ? list : DEFAULT_RECIPIENTS;
}

export async function sendEmail(
  apiKey: string,
  mail: { to: string[]; subject: string; text: string; replyTo?: string }
) {
  const resp = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: verifiedSender ?? TEST_SENDER,
      to: mail.to,
      ...(mail.replyTo && { reply_to: mail.replyTo }),
      subject: mail.subject,
      text: mail.text,
    }),
  });

  if (!resp.ok) {
    console.error("Resend API error:", resp.status, await resp.text());
  }
  return resp.ok;
}

// Acknowledgement sent to the visitor. Skipped while no verified sender is
// configured, since the test sender cannot reach outside addresses.
export async function sendAcknowledgement(apiKey: string, to: string, name: string, lang: string, kind: "contact" | "quote") {
  if (!verifiedSender) return;

  const fr = lang !== "en";
  const what = kind === "quote" ? (fr ? "votre demande de devis" : "your quote request") : fr ? "votre message" : "your message";
  const delay = kind === "quote" ? (fr ? "sous 48 heures" : "within 48 hours") : fr ? "dans les plus brefs délais" : "as soon as possible";

  const text = fr
    ? `Bonjour ${name},\n\nNous avons bien reçu ${what} et vous répondrons ${delay}.\n\nCordialement,\nL'équipe Sahama Services\nhttps://sahama-services.com`
    : `Hello ${name},\n\nWe have received ${what} and will get back to you ${delay}.\n\nBest regards,\nThe Sahama Services team\nhttps://sahama-services.com`;

  await sendEmail(apiKey, {
    to: [to],
    replyTo: recipients()[0],
    subject: fr ? `Nous avons bien reçu ${what} - Sahama Services` : `We received ${what} - Sahama Services`,
    text,
  });
}
