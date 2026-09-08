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
    <section id="search" className="section-y" aria-labelledby="search-title">
      <div className="shell grid items-center gap-12 lg:grid-cols-[5fr_6fr] lg:gap-20">
        <div>
          <p className="t-eyebrow" data-reveal="write">
            {t.eyebrow}
          </p>
          <h2 id="search-title" className="t-h2 mt-4" data-split>
            {t.heading}
          </h2>
          <p className="t-lead mt-5" data-reveal>
            {t.lead}
          </p>
          <p className="mt-6 text-ink-3 t-small" data-reveal>
            {t.hint}
          </p>
        </div>

        <div
          className="tile min-w-0 p-3 sm:p-4"
          style={{ "--gx": "70%", "--gy": "0%" } as React.CSSProperties}
          data-reveal="clip"
        >
          <label className="field">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0 text-ink-3">
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
            />
            {!touched && <span className="h-5 w-px shrink-0 animate-pulse bg-mark-2" aria-hidden="true" />}
          </label>

          <div className="flex flex-wrap gap-1.5 pt-3">
            {t.examples.slice(0, 3).map((ex) => (
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

          {/*
            The results area reserves room for MAX_RESULTS rows plus the count,
            and every row is a fixed three lines, so the panel keeps one height
            while the sample query types itself. It used to grow past its
            min-height and push the rest of the page down by ~75px per cycle.
          */}
          <div className="mt-3 min-h-[21rem]">
            <ul className="flex flex-col gap-1.5" aria-live="polite">
              {results.length === 0 && query.trim().length > 2 && (
                <li className="px-3 py-4 text-ink-2 t-small">{t.empty}</li>
              )}
              {results.map((r, i) => (
                <li
                  key={r.id}
                  className="flex items-center justify-between gap-4 rounded-lg bg-surface-2 px-4 py-3 ring-1 ring-line"
                  style={{ animation: `result-in 0.6s var(--ease-out-expo) both`, animationDelay: `${i * 60}ms` }}
                >
                  <div className="min-w-0">
                    <p className="t-label truncate">{r.category}</p>
                    <p className="mt-1 truncate font-semibold text-ink">{r.name}</p>
                    <p className="truncate text-ink-2 t-small">{r.spec}</p>
                  </div>
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-mark/20 text-mark-2" aria-hidden="true">
                    <CheckIcon />
                  </span>
                </li>
              ))}
            </ul>
            <p className="px-1 pt-3 text-ink-3 t-small" aria-hidden={results.length === 0}>
              {results.length > 0 && `${t.found}: ${results.length}`}
            </p>
          </div>
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
