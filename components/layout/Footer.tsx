import Link from "next/link";
import type { Lang } from "@/lib/languages";
import type { Dictionary } from "@/lib/i18n";
import { links, modelCredits, site } from "@/lib/site";
import { Logo } from "@/components/brand/Logo";

export function Footer({ lang, t, ask }: { lang: Lang; t: Dictionary["footer"]; ask: string }) {
  return (
    <footer className="border-t border-line">
      <div className="shell grid gap-12 py-14 md:grid-cols-[1.5fr_1fr_1fr] md:gap-10 md:py-16">
        <div className="max-w-xs">
          <Link href={`/${lang}`} aria-label={site.name} className="inline-block rounded-md py-2 sm:py-0">
            <Logo />
          </Link>
          <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-2">{t.tagline}</p>
        </div>

        <nav className="flex flex-col items-start gap-3" aria-label={site.name}>
          <p className="t-label">{site.name}</p>
          <a href={links.contact} target="_blank" rel="noopener" className="footer-link">
            {ask}
          </a>
          <a href={links.demo} target="_blank" rel="noopener" className="footer-link">
            {t.demo}
          </a>
          <a href={links.developer} target="_blank" rel="noopener" className="footer-link">
            {t.developer}
          </a>
        </nav>

        <div className="flex flex-col items-start gap-3">
          <p className="t-label">Payments</p>
          <ul className="flex flex-wrap gap-1.5" aria-label="Payments">
            {site.payments.map((p) => (
              <li key={p} className="pay">
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="shell flex flex-col gap-4 py-6 text-[0.75rem] leading-relaxed text-ink-3 md:flex-row md:items-start md:justify-between md:gap-10">
          <p>
            © {new Date().getFullYear()} {site.name} ·{" "}
            <a href={links.developer} className="transition-colors hover:text-ink-2">
              {t.madeBy}
            </a>
          </p>
          <p className="md:max-w-xl md:text-right">
            {t.credits}:{" "}
            {modelCredits.map((m, i) => (
              <span key={m.url}>
                <a href={m.url} rel="noopener" className="underline-offset-2 transition-colors hover:text-ink-2 hover:underline">
                  {m.title}
                </a>{" "}
                ({m.author}, CC BY 4.0){i < modelCredits.length - 1 ? ", " : "."}
              </span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}
