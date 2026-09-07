import type { Lang } from "@/lib/languages";
import type { Dictionary } from "@/lib/i18n";
import { demoItems } from "@/lib/product";
import { SearchDemoClient, type SearchItem } from "./SearchDemoClient";

/** Server wrapper: ships only the current language's strings to the client. */
export function SearchDemo({ lang, t }: { lang: Lang; t: Dictionary["search"] }) {
  const items: SearchItem[] = demoItems.map((d) => ({
    id: d.id,
    name: d.name[lang],
    category: d.category[lang],
    spec: d.spec[lang],
    tags: d.tags[lang],
  }));
  return <SearchDemoClient t={t} items={items} />;
}
