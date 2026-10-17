"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Send, CheckCircle2, Loader2 } from "lucide-react";

import { CONTACT_EMAIL } from "@/i18n";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm({ dict }: { dict: any }) {
  const f = dict.contact.form;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  // Honeypot: hidden from people, filled in by bots; the API drops those submissions.
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const lang = usePathname()?.startsWith("/en") ? "en" : "fr";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, website, lang: document.documentElement.lang }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-cardBg p-8 rounded-2xl border border-zinc-800 flex flex-col items-center justify-center text-center gap-3 min-h-[320px]">
        <CheckCircle2 size={40} className="text-green-400" />
        <h3 className="text-lg font-bold text-white">{f.successTitle}</h3>
        <p className="text-gray-400 text-sm">{f.successDesc}</p>
        <button
          onClick={() => setStatus("idle")}
          className="text-sahamaYellow text-sm font-semibold hover:underline mt-2"
        >
          {f.resetButton}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-cardBg p-8 rounded-2xl border border-zinc-800 space-y-4">
      <div>
        <label htmlFor="contact-name" className="block text-xs font-semibold text-gray-300 mb-1">
          {dict.contact.formName}
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-darkBg border border-zinc-700 rounded-lg p-3 text-sm text-cream focus:border-sahamaOrange focus:ring-2 focus:ring-sahamaOrange/20 focus:outline-none transition"
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="block text-xs font-semibold text-gray-300 mb-1">
          {dict.contact.formEmail}
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-darkBg border border-zinc-700 rounded-lg p-3 text-sm text-cream focus:border-sahamaOrange focus:ring-2 focus:ring-sahamaOrange/20 focus:outline-none transition"
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-xs font-semibold text-gray-300 mb-1">
          {dict.contact.formMessage}
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full bg-darkBg border border-zinc-700 rounded-lg p-3 text-sm text-cream focus:border-sahamaOrange focus:ring-2 focus:ring-sahamaOrange/20 focus:outline-none transition"
        />
      </div>

      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="hidden"
      />

      {status === "error" && (
        <p className="text-red-400 text-xs">
          {f.errorMessage} {CONTACT_EMAIL}.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-sahamaOrange hover:bg-sahamaOrange/90 text-black font-bold py-3 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {status === "loading" ? (
          <>
            {f.sending} <Loader2 size={18} className="animate-spin" />
          </>
        ) : (
          <>
            {dict.contact.formSend} <Send size={18} />
          </>
        )}
      </button>

      <p className="text-[11px] text-gray-500 text-center">
        {dict.footer.formNotice}{" "}
        <Link href={`/${lang}/confidentialite`} className="text-sahamaYellow hover:underline">
          {dict.footer.privacy.toLowerCase()}
        </Link>
        .
      </p>
    </form>
  );
}
