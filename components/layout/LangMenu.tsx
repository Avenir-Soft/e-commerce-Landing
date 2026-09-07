"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { languageNames, languages, type Lang } from "@/lib/languages";

/** One button showing the current language; click opens a list of the three. */
export function LangMenu({ lang, label }: { lang: Lang; label: string }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={root} className="relative">
      <button
        type="button"
        className="btn btn-quiet btn-sm gap-2"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpen((v) => !v)}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
          <path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" stroke="currentColor" strokeWidth="1.8" />
        </svg>
        <span className="text-[0.85rem] uppercase tracking-[0.06em]">{lang}</span>
        <svg
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          aria-hidden="true"
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        >
          <path d="M1 1.5 6 6.5l5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={label}
          className="lang-menu absolute right-0 top-[calc(100%+0.5rem)] z-50 min-w-[11.5rem] rounded-2xl border border-line bg-night-2/95 p-1.5 shadow-[0_24px_60px_-20px_rgb(0_0_0/0.6)] backdrop-blur-md"
        >
          {languages.map((l) => (
            <li key={l} role="option" aria-selected={l === lang}>
              <Link
                href={`/${l}`}
                hrefLang={l}
                lang={l}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between gap-4 rounded-xl px-3 py-2 text-[0.95rem] transition-colors duration-200 ${
                  l === lang ? "bg-white/[0.08] text-ink" : "text-ink-2 hover:bg-white/[0.06] hover:text-ink"
                }`}
              >
                {languageNames[l]}
                <span className="text-[0.75rem] uppercase tracking-[0.06em] text-ink-3">{l}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
