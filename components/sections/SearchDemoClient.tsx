"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Dictionary } from "@/lib/i18n";
import { CheckIcon } from "@/components/ui/Icons";

export interface SearchItem {
  id: string;
  name: string;
  category: string;
  spec: string;
  tags: string[];
}

const TYPE_MS = 48;
const DELETE_MS = 22;
const HOLD_MS = 2600;
const MAX_RESULTS = 3;

/**
 * A small stand-in for the platform's semantic search: plain words from the
 * shopper are matched against each item's tags, name and category. Enough to
 * show that "a watch as a gift" finds the watch without a model number.
 */
function score(item: SearchItem, query: string): number {
  const q = query.toLowerCase().trim();
  if (q.length < 2) return 0;
  const tokens = q.split(/\s+/).filter((w) => w.length > 2);
  let s = 0;
  for (const tag of item.tags) {
    const tg = tag.toLowerCase();
    if (q.includes(tg)) s += 3;
    else if (tokens.some((w) => tg.includes(w) || w.includes(tg))) s += 1;
  }
  const name = item.name.toLowerCase();
  if (tokens.some((w) => name.includes(w))) s += 2;
  const category = item.category.toLowerCase();
  if (tokens.some((w) => category.includes(w))) s += 1;
  return s;
}

export function SearchDemoClient({ t, items }: { t: Dictionary["search"]; items: SearchItem[] }) {
  const [query, setQuery] = useState("");
  const [touched, setTouched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Typewriter cycling through example queries until the visitor types.
  useEffect(() => {
    if (touched) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      const id = window.setTimeout(() => setQuery(t.examples[0]), 0);
      return () => window.clearTimeout(id);
    }
    let cancelled = false;
    let timer = 0;
    const run = async () => {
      let i = 0;
      while (!cancelled) {
        const text = t.examples[i % t.examples.length];
        for (let n = 1; n <= text.length && !cancelled; n++) {
          setQuery(text.slice(0, n));
          await new Promise((r) => (timer = window.setTimeout(r, TYPE_MS)));
        }
        await new Promise((r) => (timer = window.setTimeout(r, HOLD_MS)));
        for (let n = text.length - 1; n >= 0 && !cancelled; n--) {
          setQuery(text.slice(0, n));
          await new Promise((r) => (timer = window.setTimeout(r, DELETE_MS)));
        }
        i++;
      }
    };
    run();
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [touched, t.examples]);

  const results = useMemo(() => {
    return items
      .map((item) => ({ item, s: score(item, query) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, MAX_RESULTS)
      .map((r) => r.item);
  }, [items, query]);

  return (
    <section id="search" className="py-24 md:py-32" aria-labelledby="search-title">
      <div className="shell grid items-center gap-12 lg:grid-cols-[5fr_6fr] lg:gap-20">
        <div>
          <p className="t-eyebrow" data-reveal>
            {t.eyebrow}
          </p>
          <h2 id="search-title" className="t-h2 mt-3" data-split>
            {t.heading}
          </h2>
          <p className="t-lead mt-5" data-reveal>
            {t.lead}
          </p>
          <p className="mt-6 text-ink-3 t-small" data-reveal>
            {t.hint}
          </p>
        </div>

        <div className="tile beam min-w-0 p-3 sm:p-4" style={{ "--gx": "80%", "--gy": "0%" } as React.CSSProperties} data-reveal>
          <label className="flex items-center gap-3 rounded-2xl bg-night/70 px-4 py-3.5 ring-1 ring-line focus-within:ring-mark-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0 text-ink-3">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => {
                setTouched(true);
                setQuery(e.target.value);
              }}
              onFocus={() => setTouched(true)}
              placeholder={t.placeholder}
              aria-label={t.placeholder}
              autoComplete="off"
              spellCheck={false}
              className="w-full bg-transparent text-[1.05rem] text-ink placeholder:text-ink-3 focus:outline-none"
            />
            {!touched && <span className="h-5 w-px animate-pulse bg-mark-2" aria-hidden="true" />}
          </label>

          <div className="flex flex-wrap gap-2 px-1 pt-3">
            {t.examples.slice(0, 4).map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => {
                  setTouched(true);
                  setQuery(ex);
                  inputRef.current?.focus();
                }}
                className="chip chip--button"
              >
                {ex}
              </button>
            ))}
          </div>

          <ul className="mt-3 flex min-h-[13.5rem] flex-col gap-1.5" aria-live="polite">
            {results.length === 0 && query.trim().length > 2 && (
              <li className="px-3 py-4 text-ink-2">{t.empty}</li>
            )}
            {results.map((r, i) => (
              <li
                key={r.id}
                className="flex items-center justify-between gap-4 rounded-xl bg-white/[0.04] px-4 py-3"
                style={{ animation: `result-in 0.6s var(--ease-out-expo) both`, animationDelay: `${i * 60}ms` }}
              >
                <div className="min-w-0">
                  <p className="text-ink-3 t-small">{r.category}</p>
                  <p className="truncate font-semibold">{r.name}</p>
                  <p className="text-ink-2 t-small">{r.spec}</p>
                </div>
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-mark/20 text-mark-2" aria-hidden="true">
                  <CheckIcon />
                </span>
              </li>
            ))}
          </ul>
          <p className="px-1 pb-1 text-ink-3 t-small">
            {results.length > 0 && `${t.found}: ${results.length}`}
          </p>
        </div>
      </div>
      <style jsx>{`
        @keyframes result-in {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}
