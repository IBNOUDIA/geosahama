import "server-only";

const dictionaries = {
  fr: () => import("./fr.json").then((module) => module.default),
  en: () => import("./en.json").then((module) => module.default),
};

export const getDictionary = async (locale: "fr" | "en") => {
  return dictionaries[locale] ? dictionaries[locale]() : dictionaries.fr();
};
