"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Lang } from "@/lib/languages";
import type { Dictionary } from "@/lib/i18n";
import { links, site } from "@/lib/site";
import { Logo } from "@/components/brand/Logo";
import { ArrowIcon } from "@/components/ui/Icons";
import { LangMenu } from "./LangMenu";

const sections = [
  { id: "features", key: "features" },
  { id: "showcase", key: "showcase" },
  { id: "steps", key: "steps" },
  { id: "faq", key: "faq" },
] as const;

export function Header({ lang, nav }: { lang: Lang; nav: Dictionary["nav"] }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // the bar stays put; it only gains a backdrop once the page has scrolled
  // (owner correction, 2026-09-08: the previous hide-on-scroll made it "disappear")
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-(--header-h) transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-[var(--ease-out-expo)] ${
        scrolled || open
          ? "bg-night/75 shadow-[0_1px_0_0_var(--color-line)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="shell flex h-full items-center justify-between gap-6">
        <Link href={`/${lang}`} aria-label={site.name} className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Sections">
          {sections.map((s, i) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="header-nav-item text-[0.95rem] font-medium text-ink-2 transition-colors duration-300 hover:text-ink"
              style={{ animationDelay: `${0.55 + i * 0.07}s` }}
            >
              {nav[s.key]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <LangMenu lang={lang} label={nav.language} />
          </div>
          <a href={links.contact} target="_blank" rel="noopener" className="btn btn-solid btn-sm hidden md:inline-flex">
            {nav.open}
            <ArrowIcon />
          </a>
          <button
            type="button"
            className="btn btn-quiet btn-sm lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? nav.close : nav.menu}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="absolute inset-x-0 top-full border-t border-line bg-night/95 backdrop-blur-md lg:hidden"
      >
        <div className="shell flex flex-col gap-2 py-6">
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} onClick={() => setOpen(false)} className="t-h3 py-3 text-ink">
              {nav[s.key]}
            </a>
          ))}
          <a href={links.demo} target="_blank" rel="noopener" className="t-h3 py-3 text-ink-2">
            {nav.demo}
          </a>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <a href={links.contact} target="_blank" rel="noopener" className="btn btn-solid">
              {nav.open}
              <ArrowIcon />
            </a>
            <LangMenu lang={lang} label={nav.language} />
          </div>
        </div>
      </div>

      <style jsx>{`
        .header-nav-item {
          opacity: 0;
          transform: translateY(-8px);
          animation: nav-in 0.8s var(--ease-out-expo) forwards;
        }
        @keyframes nav-in {
          to {
            opacity: 1;
            transform: none;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .header-nav-item {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </header>
  );
}
