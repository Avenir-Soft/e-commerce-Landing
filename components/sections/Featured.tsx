import type { Lang } from "@/lib/languages";
import type { Dictionary } from "@/lib/i18n";
import { featuredProducts } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { site } from "@/lib/site";
import { SectionHead } from "@/components/ui/SectionHead";

export function Featured({ lang, t }: { lang: Lang; t: Dictionary["featured"] }) {
  return (
    <section className="pb-24 md:pb-32" aria-labelledby="featured-title">
      <div className="shell">
        <SectionHead id="featured-title" heading={t.heading} lead={t.lead} />
        <ul className="mt-10 grid gap-x-14 md:grid-cols-2">
          {featuredProducts.map((p) => (
            <li key={p.id} className="rule-top flex min-w-0 items-baseline justify-between gap-6 py-5">
              <div className="min-w-0">
                <span className="t-h3 block truncate">{p.name}</span>
                <span className="mt-1 block text-ink-2 t-small">{p.spec[lang]}</span>
              </div>
              <div className="shrink-0 text-right">
                <span className="t-num block font-semibold">{formatPrice(p.price, lang)}</span>
                <a
                  href={site.botUrl}
                  target="_blank"
                  rel="noopener"
                  className="mt-1 inline-block text-mark-2 t-small transition-colors hover:text-ink"
                >
                  {t.open}
                </a>
              </div>
            </li>
          ))}
        </ul>
        <a href={site.botUrl} target="_blank" rel="noopener" className="btn btn-quiet mt-10">
          {t.all}
        </a>
      </div>
    </section>
  );
}
