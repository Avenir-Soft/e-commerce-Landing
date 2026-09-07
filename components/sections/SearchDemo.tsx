import type { Lang } from "@/lib/languages";
import type { Dictionary } from "@/lib/i18n";
import { categories, products } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { site } from "@/lib/site";
import { SearchDemoClient, type SearchItem } from "./SearchDemoClient";

/** Server wrapper: ships only the current language's strings to the client. */
export function SearchDemo({ lang, t }: { lang: Lang; t: Dictionary["search"] }) {
  const items: SearchItem[] = products.map((p) => ({
    id: p.id,
    name: p.name,
    category: p.category,
    categoryName: categories.find((c) => c.id === p.category)!.storeName[lang],
    spec: p.spec[lang],
    price: site.showPrices ? formatPrice(p.price, lang) : null,
    tags: p.tags[lang],
  }));
  return <SearchDemoClient t={t} items={items} />;
}
