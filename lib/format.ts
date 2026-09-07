import type { Lang } from "./languages";
import { numberLocale } from "./languages";

const currency: Record<Lang, string> = { uz: "so'm", ru: "сум", en: "UZS" };

/** 16350000 -> "16 350 000 so'm" (narrow no-break spaces so a price never wraps). */
export function formatPrice(value: number, lang: Lang): string {
  const grouped = new Intl.NumberFormat(numberLocale[lang], { maximumFractionDigits: 0 })
    .format(value)
    .replace(/ |\s/g, " ");
  return `${grouped} ${currency[lang]}`;
}

/** "from 16 350 000 UZS" in each language's word order. */
export function formatFrom(value: number, lang: Lang): string {
  const price = formatPrice(value, lang);
  if (lang === "uz") return `${price}dan`;
  if (lang === "ru") return `от ${price}`;
  return `from ${price}`;
}
