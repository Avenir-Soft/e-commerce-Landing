import type { Dictionary } from "@/lib/i18n";

/** A slow ticker of what the platform ships with, between the hero and the features. Two copies make the loop seamless. */
export function Marquee({ t }: { t: Dictionary["marquee"] }) {
  const track = (
    <>
      {t.items.map((item) => (
        <span key={item} className="marquee__item">
          <span className="font-display font-medium">{item}</span>
          <svg className="marquee__mark" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 4 Q12 12 20 12 Q12 12 12 20 Q12 12 4 12 Q12 12 12 4 Z" fill="currentColor" />
          </svg>
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
