import type { MetadataRoute } from "next";
import { locales, SITE_URL } from "@/i18n";

const PATHS = ["", "/geolocalisation", "/securite", "/prevention", "/epuration", "/realisations", "/partenaires", "/actualites", "/contact", "/espace-client", "/mentions-legales", "/confidentialite"];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.flatMap((path) =>
    locales.map((lang) => ({
      url: `${SITE_URL}/${lang}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}${path}`])),
      },
    }))
  );
}
