import Link from "next/link";
import type { Lang } from "@/lib/languages";
import type { Dictionary } from "@/lib/i18n";
import { links, modelCredits, site } from "@/lib/site";
import { Logo } from "@/components/brand/Logo";

export function Footer({ lang, t, ask }: { lang: Lang; t: Dictionary["footer"]; ask: string }) {
  return (
    <footer className="border-t border-line py-14">
      <div className="shell grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link href={`/${lang}`} aria-label={site.name}>
            <Logo />
          </Link>
          <p className="mt-4 max-w-xs text-ink-2">{t.tagline}</p>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Payments">
            {site.payments.map((p) => (
              <li key={p} className="pay">
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-2 text-ink-2">
          <a href={links.contact} target="_blank" rel="noopener" className="transition-colors hover:text-ink">
            {ask}
          </a>
          <a href={links.demo} target="_blank" rel="noopener" className="transition-colors hover:text-ink">
            {t.demo}
          </a>
          <a href={links.developer} target="_blank" rel="noopener" className="transition-colors hover:text-ink">
            {t.developer}
          </a>
        </div>

        <p className="text-ink-3 t-small md:text-right">
          © {new Date().getFullYear()} {site.name}
          <br />
          <a href={links.developer} className="transition-colors hover:text-ink">
            {t.madeBy}
          </a>
        </p>
      </div>

      <p className="shell mt-10 text-[0.75rem] leading-relaxed text-ink-3/80">
        {t.credits}:{" "}
        {modelCredits.map((m, i) => (
          <span key={m.url}>
            <a href={m.url} rel="noopener" className="underline-offset-2 hover:underline">
              {m.title}
            </a>{" "}
            ({m.author}, CC BY 4.0){i < modelCredits.length - 1 ? ", " : "."}
          </span>
        ))}
      </p>
    </footer>
  );
}
