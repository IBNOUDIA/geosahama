"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Send, CheckCircle2, Loader2 } from "lucide-react";

import { CONTACT_EMAIL } from "@/i18n";

type Status = "idle" | "loading" | "success" | "error";

const SERVICE_KEYS = ["geolocTitle", "securityTitle", "energyTitle"] as const;

export default function QuoteForm({ dict }: { dict: any }) {
  const q = dict.contact.quote;

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [services, setServices] = useState<string[]>([]);
  const [fleetSize, setFleetSize] = useState("");
  const [zone, setZone] = useState("");
  const [message, setMessage] = useState("");
  // Honeypot: hidden from people, filled in by bots; the API drops those submissions.
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const lang = usePathname()?.startsWith("/en") ? "en" : "fr";

  const toggleService = (label: string) => {
    setServices((prev) => (prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label]));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, company, email, phone, services, fleetSize, zone, message, website, lang: document.documentElement.lang }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setName("");
        setCompany("");
        setEmail("");
        setPhone("");
        setServices([]);
        setFleetSize("");
        setZone("");
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
        <h3 className="text-lg font-bold text-white">{q.successTitle}</h3>
        <p className="text-gray-400 text-sm">{q.successDesc}</p>
        <button
          onClick={() => setStatus("idle")}
          className="text-sahamaYellow text-sm font-semibold hover:underline mt-2"
        >
          {q.resetButton}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-cardBg p-8 rounded-2xl border border-zinc-800 space-y-5">
      <div>
        <label className="block text-xs font-semibold text-gray-300 mb-2">{q.servicesLabel}</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {SERVICE_KEYS.map((key) => {
            const label = dict.services[key];
            const checked = services.includes(label);
            return (
              <label
                key={key}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs cursor-pointer transition ${
                  checked
                    ? "bg-sahamaOrange/10 border-sahamaOrange text-white"
                    : "bg-darkBg border-zinc-700 text-gray-300 hover:border-zinc-600"
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleService(label)}
                  className="accent-sahamaOrange"
                />
                {label}
              </label>
            );
          })}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="quote-name" className="block text-xs font-semibold text-gray-300 mb-1">
            {q.nameLabel}
          </label>
          <input
            id="quote-name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-darkBg border border-zinc-700 rounded-lg p-3 text-sm text-cream focus:border-sahamaOrange focus:ring-2 focus:ring-sahamaOrange/20 focus:outline-none transition"
          />
        </div>
        <div>
          <label htmlFor="quote-company" className="block text-xs font-semibold text-gray-300 mb-1">
            {q.companyLabel}
          </label>
          <input
            id="quote-company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full bg-darkBg border border-zinc-700 rounded-lg p-3 text-sm text-cream focus:border-sahamaOrange focus:ring-2 focus:ring-sahamaOrange/20 focus:outline-none transition"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="quote-email" className="block text-xs font-semibold text-gray-300 mb-1">
            {q.emailLabel}
          </label>
          <input
            id="quote-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-darkBg border border-zinc-700 rounded-lg p-3 text-sm text-cream focus:border-sahamaOrange focus:ring-2 focus:ring-sahamaOrange/20 focus:outline-none transition"
          />
        </div>
        <div>
          <label htmlFor="quote-phone" className="block text-xs font-semibold text-gray-300 mb-1">
            {q.phoneLabel}
          </label>
          <input
            id="quote-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-darkBg border border-zinc-700 rounded-lg p-3 text-sm text-cream focus:border-sahamaOrange focus:ring-2 focus:ring-sahamaOrange/20 focus:outline-none transition"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="quote-fleet" className="block text-xs font-semibold text-gray-300 mb-1">
            {q.fleetSizeLabel}
          </label>
          <input
            id="quote-fleet"
            value={fleetSize}
            onChange={(e) => setFleetSize(e.target.value)}
            className="w-full bg-darkBg border border-zinc-700 rounded-lg p-3 text-sm text-cream focus:border-sahamaOrange focus:ring-2 focus:ring-sahamaOrange/20 focus:outline-none transition"
          />
        </div>
        <div>
          <label htmlFor="quote-zone" className="block text-xs font-semibold text-gray-300 mb-1">
            {q.zoneLabel}
          </label>
          <select
            id="quote-zone"
            value={zone}
            onChange={(e) => setZone(e.target.value)}
            className="w-full bg-darkBg border border-zinc-700 rounded-lg p-3 text-sm text-cream focus:border-sahamaOrange focus:ring-2 focus:ring-sahamaOrange/20 focus:outline-none transition"
          >
            <option value="">—</option>
            {Object.values(q.zoneOptions as Record<string, string>).map((zone) => (
              <option key={zone} value={zone}>
                {zone}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="quote-message" className="block text-xs font-semibold text-gray-300 mb-1">
          {q.messageLabel}
        </label>
        <textarea
          id="quote-message"
          rows={3}
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
          {q.errorMessage} {CONTACT_EMAIL}.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-sahamaOrange hover:bg-sahamaOrange/90 text-black font-bold py-3 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {status === "loading" ? (
          <>
            {q.sendingLabel} <Loader2 size={18} className="animate-spin" />
          </>
        ) : (
          <>
            {q.submitButton} <Send size={18} />
          </>
        )}
      </button>

      <p className="text-[11px] text-gray-500 text-center">
        {dict.footer.formNotice}{" "}
        <Link href={`/${lang}/confidentialite`} className="text-sahamaYellow underline underline-offset-2">
          {dict.footer.privacy.toLowerCase()}
        </Link>
        .
      </p>
    </form>
  );
}
