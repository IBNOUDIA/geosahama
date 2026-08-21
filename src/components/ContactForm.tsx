"use client";

import { useState } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";

const CONTACT_EMAIL = "Souleymane.Diallo@sahama-services.com";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm({ dict }: { dict: any }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `Nouveau message de ${name} - Site Sahama Services`,
          from_name: name,
          name,
          email,
          message,
          botcheck: "",
        }),
      });

      const data = await res.json();

      if (data.success) {
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
        <h3 className="text-lg font-bold text-white">Message envoyé !</h3>
        <p className="text-gray-400 text-sm">Merci, nous vous répondrons dans les plus brefs délais.</p>
        <button
          onClick={() => setStatus("idle")}
          className="text-sahamaYellow text-sm font-semibold hover:underline mt-2"
        >
          Envoyer un autre message
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
          className="w-full bg-black border border-zinc-800 rounded-lg p-3 text-sm text-white focus:border-sahamaOrange focus:outline-none"
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
          className="w-full bg-black border border-zinc-800 rounded-lg p-3 text-sm text-white focus:border-sahamaOrange focus:outline-none"
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
          className="w-full bg-black border border-zinc-800 rounded-lg p-3 text-sm text-white focus:border-sahamaOrange focus:outline-none"
        />
      </div>

      {status === "error" && (
        <p className="text-red-400 text-xs">
          Une erreur est survenue lors de l'envoi. Réessayez, ou écrivez-nous directement à {CONTACT_EMAIL}.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-sahamaOrange hover:bg-sahamaOrange/90 text-black font-bold py-3 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {status === "loading" ? (
          <>
            Envoi en cours <Loader2 size={18} className="animate-spin" />
          </>
        ) : (
          <>
            {dict.contact.formSend} <Send size={18} />
          </>
        )}
      </button>
    </form>
  );
}
