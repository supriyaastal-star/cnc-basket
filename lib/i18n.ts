import en from "@/locales/en.json";

type Lang = "en";

const translations = { en};

export function t(key: keyof typeof en, lang: Lang = "en") {
  return translations[lang][key];
}
