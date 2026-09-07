import Link from "next/link";
import { languageNames, languages, type Lang } from "@/lib/languages";

export function LangSwitch({
  lang,
  label,
  tone = "dark",
}: {
  lang: Lang;
  label: string;
  tone?: "dark" | "light";
}) {
  const active = tone === "dark" ? "bg-ink text-night" : "bg-day-ink text-white";
  const idle = tone === "dark" ? "text-ink-2 hover:text-ink" : "text-day-ink-2 hover:text-day-ink";
  return (
    <nav aria-label={label} className="flex items-center gap-0.5 rounded-full bg-white/[0.06] p-0.5">
      {languages.map((l) => (
        <Link
          key={l}
          href={`/${l}`}
          hrefLang={l}
          lang={l}
          aria-current={l === lang ? "page" : undefined}
          aria-label={languageNames[l]}
          className={`rounded-full px-2.5 py-1 text-[0.8rem] font-semibold uppercase tracking-[0.04em] transition-colors duration-300 ${
            l === lang ? active : idle
          }`}
        >
          {l}
        </Link>
      ))}
    </nav>
  );
}
