import type { Dictionary } from "@/lib/i18n";

/** A slow ticker of what the platform ships with, between the hero and the features. Two copies make the loop seamless. */
export function Marquee({ t }: { t: Dictionary["marquee"] }) {
  const track = (
    <>
      {t.items.map((item) => (
        <span key={item} className="marquee__item">
          {item}
          <span className="marquee__mark" aria-hidden="true" />
        </span>
      ))}
    </>
  );
  return (
    <div className="marquee" aria-label={`${t.prefix}: ${t.items.join(", ")}`}>
      <div className="marquee__track">
        <div className="marquee__row">{track}</div>
        <div className="marquee__row" aria-hidden="true">
          {track}
        </div>
      </div>
    </div>
  );
}
