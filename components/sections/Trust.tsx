import type { Dictionary } from "@/lib/i18n";

export function Trust({ t }: { t: Dictionary["trust"] }) {
  return (
    <section id="trust" className="scroll-mt-20 bg-night-2/50 py-20 md:py-24" aria-labelledby="trust-title">
      <div className="shell">
        <h2 id="trust-title" className="t-h2 max-w-3xl" data-reveal>
          {t.heading}
        </h2>
        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {t.items.map((item) => (
            <li key={item.title} className="rule-top pt-5" data-reveal>
              <h3 className="t-h3">{item.title}</h3>
              <p className="mt-3 text-ink-2">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
