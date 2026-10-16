import type { Metadata } from "next";
import { locales, SITE_URL, type Locale } from "@/i18n";

// Builds per-page metadata: localized title, canonical URL on the official
// domain, and FR/EN alternates so search engines link both language versions.
export function pageMetadata(lang: Locale, path: string, title?: string, description?: string): Metadata {
  const languages = Object.fromEntries(locales.map((l) => [l, `/${l}${path}`]));

  return {
    ...(title && { title }),
    ...(description && { description }),
    alternates: {
      canonical: `/${lang}${path}`,
      languages: { ...languages, "x-default": `/fr${path}` },
    },
    openGraph: {
      ...(title && { title }),
      ...(description && { description }),
      url: `${SITE_URL}/${lang}${path}`,
      locale: lang === "fr" ? "fr_CA" : "en_CA",
    },
  };
}
