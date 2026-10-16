import "server-only";
import type { Locale } from "@/i18n";

const dictionaries = {
  fr: () => import("./fr.json").then((module) => module.default),
  en: () => import("./en.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale] ? dictionaries[locale]() : dictionaries.fr();
};
