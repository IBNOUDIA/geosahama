"use client";

import { useState } from "react";
import { Send } from "lucide-react";

const CONTACT_EMAIL = "Souleymane.Diallo@sahama-services.com";

export default function ContactForm({ dict }: { dict: any }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = `Nouveau message de ${name} - Site Sahama Services`;
    const body = `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;
  };

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
      <button
        type="submit"
        className="w-full bg-sahamaOrange hover:bg-sahamaOrange/90 text-black font-bold py-3 rounded-lg transition flex items-center justify-center gap-2"
      >
        {dict.contact.formSend} <Send size={18} />
      </button>
      <p className="text-gray-500 text-xs text-center">
        Ouvre votre application de messagerie avec le message pré-rempli à destination de {CONTACT_EMAIL}.
      </p>
    </form>
  );
}
