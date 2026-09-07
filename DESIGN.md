# Avenir Store landing — design notes

Marketing page for **Avenir Store**, the Apple electronics shop that runs as a
Telegram Mini App (the storefront itself lives in `Avenir-Soft/E-COMMERCE`).
The page has one job: convince a visitor from an ad, a post or a search result
to open the store in Telegram.

## Brief

- Audience: buyers in Tashkent and the regions, UZ first, RU second, EN for
  metadata and the occasional expat. Mobile-first traffic from Telegram and
  Instagram, but this is the first surface of the brand that people will see
  on a desktop, so it has to hold up at 1440px.
- Facts come from the E-COMMERCE repo: five product lines (iPhone, MacBook,
  iPad, Apple Watch, AirPods), payments Click / Payme / Uzcard / Humo, express
  delivery 1–2 days in Tashkent and 5–7 to the regions, returns within 3
  business days, phone-number sign-in, AI semantic search in the catalog.
- What the repo does **not** contain: a logo, product photography, contact
  details, the bot username, a warranty period. See "Before launch".

## Concept

**A showroom with one device lit at a time.** The signature moment is the hero:
a vertical wheel of five stylised devices (titanium phone, aluminium laptop,
tablet, watch, earbuds) built from rounded boxes and physical materials in
React Three Fiber. The hero is pinned; scrolling turns the wheel and the next
device rolls up from below while the price label in the corner follows. The
wheel also leans with the pointer. Everything after the hero is deliberately
quiet: real prices, plain sentences, thin rules, no scattered scroll effects.

Why a wheel and not a photo carousel: there is no photography, Apple imagery
cannot be reused, and a silhouette rendered with real materials reads as
"premium" without pretending to be a product shot.

## Tokens

| Token | Value | Use |
| --- | --- | --- |
| `night` | `#02101F` | page background (Avenir family navy) |
| `night-2` / `deep` | `#061A31` / `#05233F` | bands, tile bodies |
| `ink` / `ink-2` / `ink-3` | `#F3F6FB` / `#A9B8CC` / `#6B7C93` | text hierarchy |
| `mark` / `mark-2` | `#2563EB` / `#60A5FA` | the single accent: buttons, glow, step numbers |
| `day` / `day-ink` | `#F4F6FA` / `#0B1C33` | the one light room ("Uch qadam") |

Titanium, aluminium and glass tones exist only inside the 3D scene
(`components/hero/devices.tsx`).

Type: **Unbounded** (display, 500–600, tracking −0.028em) and **Manrope**
(body, 1.0625rem / 1.6). Both carry Cyrillic. Prices use tabular numerals and
narrow no-break spaces so they never wrap.

Motion: expo-out easing only. Two orchestrated moments — the page-load sequence
(headline lines rise, then lead, buttons, label; devices materialise with a
stagger) and the scroll-driven wheel. Lenis smooth scroll, synced to GSAP
ScrollTrigger. Everything respects `prefers-reduced-motion` (no pin, no smooth
scroll, static wheel).

## Page order

1. Hero — headline in four controlled lines, lead, two buttons, wheel, live label.
2. Lineup — five tiles, iPhone spans two columns, each lit from a different corner.
3. Featured — six rows with real starting prices (a price list, not a brochure).
4. Trust — four facts hanging from thin rules.
5. Search demo — a working sample of the store's natural-language search.
6. Three steps — light room, numbered because it is a sequence; CSS phone mock.
7. FAQ — native `details`/`summary`.
8. Final CTA — one big block with a QR code for desktop visitors.

## Before launch

Everything below is a placeholder in `lib/site.ts` or `lib/catalog.ts`:

- `site.botUrl` — the real bot link (E-COMMERCE keeps it in admin settings).
- `site.contacts` — phone, Telegram, Instagram, address; hidden while `null`.
- `site.storeUrl` — currently `fetch-group.uz`; update if the domain changes.
- Prices and model names — market snapshot of 2026-09-07 from macbro.uz's
  Shopify feed (the same feed E-COMMERCE seeds from). Swap for the store's own.
- Warranty period and conditions — copy says "kafolat bilan" without a term.
- OG image — none yet; `generateMetadata` in `app/[lang]/layout.tsx` is ready for it.
