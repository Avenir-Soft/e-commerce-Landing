import type { Lang } from "@/lib/languages";
import type { Dictionary } from "@/lib/i18n";
import { featuredProducts, products } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";

/** A slow ticker of live prices between the hero and the catalog. Two copies make the loop seamless. */
export function Marquee({ lang, t }: { lang: Lang; t: Dictionary["marquee"] }) {
  const extra = products.filter((p) => !p.featured).slice(0, 4);
  const items = [...featuredProducts, ...extra];
  const track = (
    <>
      {items.map((p) => (
        <span key={p.id} className="marquee__item">
          <span className="font-display font-medium">{p.name}</span>
          <span className="t-num text-ink-2">{formatPrice(p.price, lang)}</span>
          <svg className="marquee__mark" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 4 Q12 12 20 12 Q12 12 12 20 Q12 12 4 12 Q12 12 12 4 Z" fill="currentColor" />
          </svg>
        </span>
      ))}
    </>
  );
  return (
    <div className="marquee" aria-label={t.prefix}>
      <div className="marquee__track">
        <div className="marquee__row">{track}</div>
        <div className="marquee__row" aria-hidden="true">
          {track}
        </div>
      </div>
    </div>
  );
}
