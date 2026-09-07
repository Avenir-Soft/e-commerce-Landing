"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Lang } from "@/lib/languages";
import type { Dictionary } from "@/lib/i18n";
import { site } from "@/lib/site";
import { Logo } from "@/components/brand/Logo";
import { LangSwitch } from "./LangSwitch";

const links = [
  { id: "catalog", key: "catalog" },
  { id: "trust", key: "delivery" },
  { id: "steps", key: "payment" },
  { id: "faq", key: "faq" },
] as const;

export function Header({ lang, nav }: { lang: Lang; nav: Dictionary["nav"] }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
      className={`fixed inset-x-0 top-0 z-50 h-(--header-h) transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
        scrolled || open
          ? "bg-night/75 shadow-[0_1px_0_0_var(--color-line)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="shell flex h-full items-center justify-between gap-6">
        <Link href={`/${lang}`} aria-label={site.name} className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Sections">
          {links.map((l, i) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="header-nav-item text-[0.95rem] font-medium text-ink-2 transition-colors duration-300 hover:text-ink"
              style={{ animationDelay: `${0.55 + i * 0.07}s` }}
            >
              {nav[l.key]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <LangSwitch lang={lang} label={nav.language} />
          </div>
          <a
            href={site.botUrl}
            target="_blank"
            rel="noopener"
            className="btn btn-solid btn-sm hidden md:inline-flex"
          >
            <TelegramIcon />
            {nav.open}
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
        className="absolute inset-x-0 top-full border-t border-line bg-night/95 backdrop-blur-xl lg:hidden"
      >
        <div className="shell flex flex-col gap-2 py-6">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={() => setOpen(false)}
              className="t-h3 py-3 text-ink"
            >
              {nav[l.key]}
            </a>
          ))}
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <a href={site.botUrl} target="_blank" rel="noopener" className="btn btn-solid">
              <TelegramIcon />
              {nav.open}
            </a>
            <LangSwitch lang={lang} label={nav.language} />
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

export function TelegramIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M21.7 3.3a1.4 1.4 0 0 0-1.5-.2L2.9 10.3c-1.2.5-1.1 1.3-.2 1.6l4.4 1.4 1.7 5.3c.2.6.4.8.8.8.5 0 .7-.2 1-.5l2.5-2.4 4.6 3.4c.8.5 1.4.2 1.6-.8l3-14.2c.3-1.2-.3-1.7-.6-1.6zM9.4 13.8l7.9-5c.4-.2.7-.1.4.2l-6.5 5.9-.3 2.9-1.5-4z" />
    </svg>
  );
}
