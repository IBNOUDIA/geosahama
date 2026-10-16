export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

export const SITE_URL = "https://sahama-services.com";
export const CONTACT_EMAIL = "Souleymane.Diallo@sahama-services.com";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
