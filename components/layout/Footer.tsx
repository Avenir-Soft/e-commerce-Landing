import Link from "next/link";
import type { Lang } from "@/lib/languages";
import type { Dictionary } from "@/lib/i18n";
import { modelCredits, site } from "@/lib/site";
import { Logo } from "@/components/brand/Logo";

export function Footer({ lang, t }: { lang: Lang; t: Dictionary["footer"] }) {
  const contacts = [
    site.contacts.phone && { label: site.contacts.phone, href: `tel:${site.contacts.phone.replace(/\s/g, "")}` },
    site.contacts.telegram && { label: site.contacts.telegram, href: `https://t.me/${site.contacts.telegram.replace("@", "")}` },
    site.contacts.instagram && { label: site.contacts.instagram, href: `https://instagram.com/${site.contacts.instagram.replace("@", "")}` },
    site.contacts.email && { label: site.contacts.email, href: `mailto:${site.contacts.email}` },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <footer className="border-t border-line py-14">
      <div className="shell grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link href={`/${lang}`} aria-label={site.name}>
            <Logo />
          </Link>
          <p className="mt-4 max-w-xs text-ink-2">{t.tagline}</p>
        </div>

        <div className="flex flex-col gap-2 text-ink-2">
          <a href={site.storeUrl} target="_blank" rel="noopener" className="transition-colors hover:text-ink">
            {site.storeUrl.replace(/^https?:\/\//, "")}
          </a>
          <a href={`${site.storeUrl}/offer`} className="transition-colors hover:text-ink">
            {t.offer}
          </a>
          <a href={`${site.storeUrl}/privacy`} className="transition-colors hover:text-ink">
            {t.privacy}
          </a>
          {contacts.length > 0 && (
            <div className="mt-4">
              <p className="text-ink-3 t-small">{t.contacts}</p>
              {contacts.map((c) => (
                <a key={c.href} href={c.href} className="block transition-colors hover:text-ink">
                  {c.label}
                </a>
              ))}
              {site.contacts.address && <p className="mt-1">{site.contacts.address}</p>}
            </div>
          )}
        </div>

        <p className="text-ink-3 t-small md:text-right">
          © {new Date().getFullYear()} {site.name}
          <br />
          <a href={site.developer.url} className="transition-colors hover:text-ink">
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
