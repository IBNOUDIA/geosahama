"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin } from "lucide-react";

// not-found pages receive no params, so the language comes from the URL.
export default function NotFound() {
  const lang = usePathname()?.startsWith("/en") ? "en" : "fr";
  const fr = lang === "fr";

  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center">
      <div className="p-3 bg-sahamaOrange/10 rounded-xl w-fit mx-auto text-sahamaOrange mb-6">
        <MapPin size={32} />
      </div>
      <p className="text-sahamaOrange font-mono text-sm mb-2">404</p>
      <h1 className="text-3xl font-extrabold mb-4">{fr ? "Page introuvable" : "Page not found"}</h1>
      <p className="text-gray-400 mb-8">
        {fr
          ? "Cette page n'existe pas ou a été déplacée."
          : "This page doesn't exist or has been moved."}
      </p>
      <Link
        href={`/${lang}`}
        className="inline-block bg-sahamaOrange hover:bg-sahamaOrange/90 text-black font-bold px-6 py-3 rounded-xl transition-all"
      >
        {fr ? "Retour à l'accueil" : "Back to home"}
      </Link>
    </div>
  );
}
