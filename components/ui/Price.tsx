import type { Lang } from "@/lib/languages";
import { formatFrom, formatPrice } from "@/lib/format";
import { site } from "@/lib/site";

/** Renders a price only when the store wants prices on the landing (`site.showPrices`). */
export function Price({
  value,
  lang,
  from = false,
  className = "",
}: {
  value: number;
  lang: Lang;
  from?: boolean;
  className?: string;
}) {
  if (!site.showPrices) return null;
  return <span className={`t-num ${className}`}>{from ? formatFrom(value, lang) : formatPrice(value, lang)}</span>;
}
