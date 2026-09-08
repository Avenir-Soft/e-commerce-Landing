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
  const [active, setActive] = useState<string | null>(null);

  // the bar stays put; it only gains a backdrop once the page has scrolled
  // (owner correction, 2026-09-08: the previous hide-on-scroll made it "disappear")
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Which chapter the reader is in, so the nav can say so. Measured against a
  // line 40% down the viewport rather than with an observer: the page has
  // sections between the linked ones (why, search), and an observer would keep
  // reporting the last linked section it happened to see inside them.
  useEffect(() => {
    const read = () => {
      const line = window.scrollY + window.innerHeight * 0.4;
      let current: string | null = null;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top + window.scrollY <= line) current = s.id;
      }
      setActive(current);
    };
    read();
    window.addEventListener("scroll", read, { passive: true });
    window.addEventListener("resize", read);
    return () => {
      window.removeEventListener("scroll", read);
      window.removeEventListener("resize", read);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 h-(--header-h) transition-[background-color,box-shadow,backdrop-filter] duration-300 ease-[var(--ease-out-quart)] ${
          scrolled || open
            ? "bg-night/80 shadow-[0_1px_0_0_var(--color-line)] backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="shell flex h-full items-center justify-between gap-6">
          <Link
            href={`/${lang}`}
            aria-label={site.name}
            className="shrink-0 rounded-md transition-opacity duration-200 hover:opacity-80"
          >
            <Logo />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Sections">
            {sections.map((s, i) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                aria-current={active === s.id ? "true" : undefined}
                className="nav-link header-nav-item"
                style={{ animationDelay: `${0.5 + i * 0.06}s` }}
              >
                {nav[s.key]}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <LangMenu lang={lang} label={nav.language} />
            </div>
            <a
              href={links.contact}
              target="_blank"
              rel="noopener"
              className="btn btn-solid btn-sm hidden md:inline-flex"
            >
              {nav.open}
              <ArrowIcon />
            </a>
            <button
              type="button"
              className="nav-toggle lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? nav.close : nav.menu}
              onClick={() => setOpen((v) => !v)}
            >
              <span className={`nav-toggle__bars ${open ? "is-open" : ""}`} aria-hidden="true">
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>

        <style jsx>{`
          .header-nav-item {
            opacity: 0;
            transform: translateY(-6px);
            animation: nav-in 0.7s var(--ease-out-expo) forwards;
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

      {/*
        The sheet is a sibling of the bar, not a child: the bar carries a
        backdrop-filter, and that makes it the containing block for any fixed
        descendant — inside it this panel collapsed to the bar's own height.
      */}
      <div
        id="mobile-menu"
        hidden={!open}
        data-lenis-prevent
        className="fixed inset-x-0 bottom-0 top-(--header-h) z-40 overflow-y-auto overscroll-contain border-t border-line bg-night/95 backdrop-blur-xl lg:hidden"
      >
        <nav className="shell flex flex-col py-2" aria-label="Sections">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              aria-current={active === s.id ? "true" : undefined}
              onClick={() => setOpen(false)}
              className="nav-sheet-link"
            >
              {nav[s.key]}
            </a>
          ))}
          <a
            href={links.demo}
            target="_blank"
            rel="noopener"
            onClick={() => setOpen(false)}
            className="nav-sheet-link"
          >
            {nav.demo}
            <ArrowIcon className="text-ink-3" />
          </a>
        </nav>

        <div className="shell mt-6 flex flex-col gap-4 pb-10">
          <a href={links.contact} target="_blank" rel="noopener" className="btn btn-solid w-full">
            {nav.open}
            <ArrowIcon />
          </a>
          <div className="flex items-center justify-between gap-4">
            <span className="t-label">{nav.language}</span>
            <LangMenu lang={lang} label={nav.language} />
          </div>
        </div>
      </div>
    </>
  );
}
