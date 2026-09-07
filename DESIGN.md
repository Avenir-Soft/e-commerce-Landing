# Avenir Store landing — design notes

Marketing page for **Avenir Store**, the Apple electronics shop whose storefront
is the `Avenir-Soft/E-COMMERCE` web app. The page has one job: get a visitor
from an ad, a post or a search result into the store.

## Brief

- Audience: buyers in Tashkent and the regions, UZ first, RU second, EN for
  metadata and the occasional expat. Mobile-first traffic, but the page also
  has to hold up at 1440px, because it is the first thing a partner sees.
- Facts come from the E-COMMERCE repo: five store categories (phones, laptops,
  tablets, watches, accessories — the landing shows them with their Apple
  lines), payments Click / Payme / Uzcard / Humo, express delivery 1–2 days in
  Tashkent and 5–7 to the regions, returns within 3 business days,
  phone-number sign-in, natural-language search in the catalog.
- Every call to action goes to the store itself. The store filters its
  `/products` page by database category ids, so deep links use its own search
  (`/products?search=iPhone`), which understands the product-line names
  (`storeLinks` in `lib/site.ts`).
- **No prices on the landing** (owner decision, 2026-09-07). `site.showPrices`
  gates every price through `components/ui/Price.tsx`; flip it and they return.
- No Telegram bot, no intro curtain, no custom cursor (all owner decisions).

## Concept

**A showroom, one product under the light at a time.** The hero is pinned and
the five real product models stand in a row above a pool of light. Scrolling
slides the row sideways so the next device glides into the spotlight while the
label in the corner follows; the pointer turns the lit device.

The page then alternates rooms like a store: a light catalog room (white tiles
on the storefront's off-white, with stills of the same models), a dark
showcase where one product is pinned while its feature beats scroll past, a
light "new arrivals" grid, a dark bento of the five store promises with serif
numerals and the four payment rails, the working search sample, the light
three-steps room with a phone mock, hover-opened FAQ, and the final call.

Motion: every heading rises line by line out of a mask (GSAP SplitText), every
block reveals once on scroll, tiles tilt and glow under the pointer, buttons
are magnetic, the price ticker scrolls, a shine runs around the key cards and a
beam around the payment card, the aurora and orb drift. All of it is switched
off by `prefers-reduced-motion`.

## Assets

- `public/models/*.glb` — CC-BY-4.0 models from Sketchfab, compressed with
  gltf-transform (meshopt + WebP). **Attribution is required**; the footer
  prints it from `modelCredits`.
- `public/renders/*.webp` — transparent stills of those models, rendered by
  `C:\Users\mamut\tools\pw\render.mjs` against the dev route `/dev/render`
  (blocked in production). Regenerate them when a model changes.
- The models are the closest free ones, not the exact current generation
  (iPhone 16 Pro Max for iPhone 17 Pro, MacBook Air 15 2023 for Air M5, iPad
  Pro 2020 for Pro M5, Watch Ultra 2 for Ultra 3, AirPods Pro 2 for Pro 3).

## Tokens

| Token | Value | Use |
| --- | --- | --- |
| `night` | `#02101F` | page background (Avenir family navy) |
| `night-2` / `deep` | `#061A31` / `#05233F` | bands, tile bodies |
| `ink` / `ink-2` / `ink-3` | `#F3F6FB` / `#A9B8CC` / `#6B7C93` | text hierarchy |
| `mark` / `mark-2` | `#2563EB` / `#60A5FA` | the accent: buttons, glow, light-room eyebrows |
| `sand` / `sand-2` | `#E8D5B0` / `#C9A96E` | serif accents: eyebrows, figures, open FAQ title |
| `day` / `day-ink` | `#F4F6FA` / `#0B1C33` | light rooms (catalog, arrivals, steps) |

Type: **Unbounded** (display, 500–600, tracking −0.028em), **Manrope** (body,
1.0625rem / 1.6) and **Cormorant Garamond italic** (eyebrows, big figures,
FAQ numbers). All three carry Cyrillic.

Performance budget for the 3D: one render pass, no post-processing, no
reflections, no transmission materials, DPR capped at 1.25 and lowered by
`PerformanceMonitor` when frames drop, rendering paused while the hero is off
screen, off-screen carousel items hidden.

## Page order

1. Hero with the showroom, tagline, headline, lead, two buttons, live label.
2. Ticker of what is in stock.
3. Catalog (light) — bento with stills, iPhone tall, a dark door to the full catalog.
4. Showcase (dark) — sticky still, three feature beats (iPhone 17 Pro, MacBook Air M5, Watch Ultra 3).
5. New arrivals (light) — six cards with thumbnails and specs.
6. Why Avenir Store (dark bento) — original, delivery, payment rails, returns, support.
7. Search sample (dark).
8. Three steps (light) — numbered, with the phone mock.
9. FAQ (dark) — opens on hover, numbered in serif.
10. Final call, footer with model credits.

## Before launch

- `site.storeUrl` — still `fetch-group.uz`; switch to the Avenir Store domain.
- `site.contacts` — phone, Telegram, Instagram, address; hidden while `null`.
- Showcase specs (`spotlight.beats` in `lib/i18n.ts`) — verify against the
  models actually sold before publishing.
- Model names in `lib/catalog.ts` — market snapshot of 2026-09-07; swap for the store's own.
- Warranty period and conditions — copy says "kafolat bilan" without a term.
- OG image — none yet; `generateMetadata` in `app/[lang]/layout.tsx` is ready for it.
