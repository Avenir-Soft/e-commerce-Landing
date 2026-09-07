# Avenir Store landing — design notes

Marketing page for **Avenir Store**, the Apple electronics shop whose storefront
is the `Avenir-Soft/E-COMMERCE` web app. The page has one job: get a visitor
from an ad, a post or a search result into the store.

## Brief

- Audience: buyers in Tashkent and the regions, UZ first, RU second, EN for
  metadata and the occasional expat. Mobile-first traffic, but the page also
  has to hold up at 1440px, because it is the first thing a partner sees.
- Facts come from the E-COMMERCE repo: five product lines (iPhone, MacBook,
  iPad, Apple Watch, AirPods), payments Click / Payme / Uzcard / Humo, express
  delivery 1–2 days in Tashkent and 5–7 to the regions, returns within 3
  business days, phone-number sign-in, natural-language search in the catalog.
- Every call to action goes to the store itself (`site.storeUrl`). There is no
  Telegram bot on this page, by decision of the owner.

## Concept

**A showroom, one product under the light at a time.** The hero is pinned and
the five real product models stand in a row on a reflective floor. Scrolling
slides the row sideways so the next device glides into the spotlight while the
price label in the corner follows; the pointer turns the lit device. A brand
curtain (the reticle drawing itself) covers the first paint while the models
download, then lifts into the headline choreography.

The page keeps moving after the hero: a slow price ticker, mask reveals on every
section, tiles that tilt and glow under the pointer, magnetic buttons, animated
FAQ panels, a drifting aurora behind the hero and an orb behind the final call
to action, and a reticle cursor on fine pointers. All of it is switched off by
`prefers-reduced-motion`.

## 3D models

`public/models/*.glb`, all CC-BY-4.0 from Sketchfab, compressed with
gltf-transform (meshopt + WebP, 1024px textures) from 50 MB down to ~5 MB
total. **The licence requires attribution**, which the footer prints from
`modelCredits` in `lib/site.ts`; keep it if the models stay. The models are the
closest free ones available, not the exact current generation (iPhone 16 Pro
Max stands in for iPhone 17 Pro, MacBook Air 15 2023 for Air M5, iPad Pro 2020
for Pro M5, Watch Ultra 2 for Ultra 3, AirPods Pro 2 for Pro 3). Replace them
with the store's own models when it has them; `components/hero/Showroom.tsx`
lists the URL, size and orientation fix per model.

## Tokens

| Token | Value | Use |
| --- | --- | --- |
| `night` | `#02101F` | page background (Avenir family navy) |
| `night-2` / `deep` | `#061A31` / `#05233F` | bands, tile bodies |
| `ink` / `ink-2` / `ink-3` | `#F3F6FB` / `#A9B8CC` / `#6B7C93` | text hierarchy |
| `mark` / `mark-2` | `#2563EB` / `#60A5FA` | the single accent: buttons, glow, step numbers |
| `day` / `day-ink` | `#F4F6FA` / `#0B1C33` | the one light room ("Uch qadam") |

Type: **Unbounded** (display, 500–600, tracking −0.028em) and **Manrope**
(body, 1.0625rem / 1.6). Both carry Cyrillic. Prices use tabular numerals and
narrow no-break spaces so they never wrap.

Motion: expo-out easing everywhere, `linear` only on the ticker. Lenis smooth
scroll synced with GSAP ScrollTrigger.

## Page order

1. Intro curtain → hero with the showroom, headline, lead, two buttons, live label.
2. Price ticker.
3. Lineup — five tiles, iPhone spans two columns, each lit from a different corner.
4. Featured — six rows with real starting prices.
5. Trust — four facts hanging from thin rules.
6. Search demo — a working sample of the store's natural-language search.
7. Three steps — light room, numbered because it is a sequence; CSS phone mock.
8. FAQ — native `details`/`summary`, animated.
9. Final call to action.

## Before launch

- `site.storeUrl` — still `fetch-group.uz`; switch to the Avenir Store domain.
- `site.contacts` — phone, Telegram, Instagram, address; hidden while `null`.
- Prices and model names — market snapshot of 2026-09-07 from macbro.uz's
  Shopify feed (the same feed E-COMMERCE seeds from). Swap for the store's own.
- Warranty period and conditions — copy says "kafolat bilan" without a term.
- OG image — none yet; `generateMetadata` in `app/[lang]/layout.tsx` is ready for it.
- The reticle cursor replaces the native cursor on desktop; remove the cursor
  block in `components/motion/Motion.tsx` if the owner prefers the default.
