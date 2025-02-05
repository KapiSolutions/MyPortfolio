import pl from "./pl.json";
import en from "./en.json";

export type Locale = "pl" | "en";
export type Tkey = keyof typeof pl;

const translations: { [key: string]: { [key: string]: string } } = {
  pl,
  en,
};

export function getTranslation(locale: Locale, key: Tkey) {
  return translations[locale][key] || translations["en"][key];
}
