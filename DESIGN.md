# Avenir Store landing — design notes

Marketing page for **Avenir Store**, the e-commerce platform Avenir Soft sells
to merchants: the storefront, the Telegram Mini App, Click / Payme / Uzcard /
Humo payments, delivery zones, the AI catalog pipeline and the admin panel of
the `Avenir-Soft/E-COMMERCE` repository. The page has one job: get a business
owner to ask for a demo.

## Brief

- Audience: owners and managers of shops in Uzbekistan who want to sell
  online. UZ first, RU second, EN for metadata and partners. Mobile traffic
  first, but the page has to hold up at 1440px because partners see it on a
  desk.
- **Avenir Store is not a shop.** The landing never sells devices or goods.
  Phones, laptops and tablets appear only as screens that show the platform's
  own UI, and the same device never carries the same screen twice (owner
  correction, 2026-09-07: "biz tayyor product sotmaymiz, shunday product
  sotadigan product sotamiz").
- Facts come from the E-COMMERCE repo: catalog with categories, variants and
  attributes; cart and checkout; Click, Payme, Uzcard, Humo; express and
  standard delivery with zones, a free-delivery threshold and a return
  window; orders with statuses; a customer base; AI translation RU→UZ, SEO
  copy and attribute extraction running in a queue; semantic search; a
  Telegram Mini App with phone-number sign-in; UZ/RU interface; offer and
  privacy pages; brand settings (logo, name, colours).
- Calls to action: **"Demo so'rash"** goes to `links.contact`, **"Namuna
  do'kon"** to `links.demo` (`lib/site.ts`). Both are placeholders until
  Avenir Soft names a demo-request page and a dedicated demo shop.
- **No prices anywhere** (owner decision). The FAQ answers "Narxi qancha?"
  without a number. The prices visible inside the platform screens belong to
  the fictional demo shop "Bahor Market" and are part of the UI mock.
- No Telegram bot for buying, no custom cursor, dropdown language menu, a
  loading screen that waits for the models (all owner decisions).

## Concept

**A showroom of the platform, one screen under the light at a time.** The
hero is pinned and five devices stand in a row above a pool of light, each
wearing one moment of the platform: the storefront on a phone, the admin
panel on a laptop, the AI product editor on a tablet, the checkout on a
phone, the orders table on a laptop. Scrolling slides the row sideways so the
next moment glides into the spotlight while the label in the corner names it;
the pointer turns the lit device and a drag spins it.

The page then alternates rooms: a light features bento (one tile per module,
the device stills carrying the platform screens, a dark door to the demo), a
dark showcase where a real model turns on a turntable while three chapters
(storefront, admin panel, AI catalog) scroll past, a light checklist of
everything a merchant gets, a dark bento of the five reasons (your brand,
four payment rails, your own domain, two languages, support after launch), a
working search sample over a deliberately mixed catalog (a watch, an espresso
machine, sneakers, a dress…), the light three-steps room with the storefront
still on a phone, hover-opened FAQ, and the final call.

Motion: every heading rises line by line out of a mask (GSAP SplitText), every
block reveals once on scroll, tiles tilt and glow under the pointer, buttons
are magnetic, the feature ticker scrolls, a shine runs around the key cards
and a beam around the payments card, the aurora and orb drift. All of it is
switched off by `prefers-reduced-motion`.

Realism layer: a warm light orbits both 3D stages so highlights travel across
glass and metal; every device has a blurred contact shadow and a slow float;
dust drifts in the air; the hero camera breathes and parallaxes against the
pointer; a horizontal drag spins the lit device with momentum (vertical drags
still scroll). The showcase puts a real model on a turntable that sweeps ±63°
while its chapter scrolls by and crossfades to the next by scale. Feature
stills drift against the pointer and a highlight sweeps across the device
silhouette on hover; the primary button gets a light pass; the header slips
away while reading down and returns on the first scroll up; dark rooms cast a
soft shadow into the light ones. Both stages hold 60 fps in the test browser.

## Screens on the devices

- `components/screens/Screens.tsx` holds HTML mocks of five platform screens
  for the demo shop "Bahor Market": `home`, `checkout` (phone, 590×1278),
  `dashboard`, `orders` (laptop, 1600×1000), `editor` (tablet, 1024×1366).
  They use the landing's own fonts and palette so they read as one product.
- `public/screens/*.webp` are captures of those mocks, made with
  `C:\Users\mamut\tools\pw\screens.mjs` against the dev route `/dev/screens`
  (blocked in production). Regenerate them after editing the mocks.
- `DeviceModel` clones each model's display material per instance and puts
  the capture on `map` and `emissiveMap` (`ScreenSpec` in
  `components/hero/DeviceModel.tsx`). Display material names: iPhone
  `screen.001`, iPad `screen`, MacBook `VNZklasZKSWjWUk` (emissive). All three
  need `flipY: true`.
- `MODELS` in `components/hero/Showroom.tsx` is the hero order and doubles as
  the render list; `STAGE_IDS` in `SpotlightStage.tsx` picks the three for
  the showcase; `moments` in `lib/product.ts` carries their labels.

## Assets

- `public/models/*.glb` — CC-BY-4.0 models from Sketchfab (iPhone 16 Pro Max,
  MacBook Air 15, iPad Pro 12.9), compressed with gltf-transform (meshopt +
  WebP). **Attribution is required**; the footer prints it from
  `modelCredits`.
- `public/renders/*.webp` — transparent stills of the devices wearing their
  screens, one per `MODELS` id, rendered by
  `C:\Users\mamut\tools\pw\render.mjs` against `/dev/render?model=<id>`
  (blocked in production). Phones: `yaw ±0.35, pitch 0.12, dist 4.1`; tablet:
  `0.3 / 0.12 / 4.5`; laptops: `±0.3 / 0.18 / 5.6`. Regenerate when a screen
  or a model changes.

## Tokens

| Token | Value | Use |
| --- | --- | --- |
| `night` | `#02101F` | page background (Avenir family navy) |
| `night-2` / `deep` | `#061A31` / `#05233F` | bands, tile bodies |
| `ink` / `ink-2` / `ink-3` | `#F3F6FB` / `#A9B8CC` / `#6B7C93` | text hierarchy |
| `mark` / `mark-2` | `#2563EB` / `#60A5FA` | the accent: buttons, glow, light-room eyebrows |
| `sand` / `sand-2` | `#E8D5B0` / `#C9A96E` | serif accents: eyebrows, figures, open FAQ title |
| `day` / `day-ink` | `#F4F6FA` / `#0B1C33` | light rooms (features, included, steps) |

Type: **Unbounded** (display, 500–600, tracking −0.028em), **Manrope** (body,
1.0625rem / 1.6) and **Cormorant Garamond italic** (eyebrows, big figures,
FAQ numbers). All three carry Cyrillic.

Performance budget for the 3D: one render pass, no post-processing, no
reflections, no transmission materials, DPR capped at 1.25 and lowered by
`PerformanceMonitor` when frames drop, rendering paused while the hero is off
screen, off-screen carousel items hidden, shaders compiled behind the loading
screen (`ReadySignal` → `markModelsReady`).

## Page order

1. Loading screen (only while the models download), then the hero with the
   showroom, tagline, headline, lead, two buttons, live label.
2. Ticker of what the platform ships with.
3. Features (light) — bento of six modules with device stills, a dark door to the demo.
4. Showcase (dark) — turntable, three chapters: storefront, admin panel, AI catalog.
5. What's included (light) — fourteen-item checklist in two columns.
6. Why Avenir Store (dark bento) — your brand, 4 payment rails, your domain, 2 languages, support.
7. Search sample (dark) — mixed demo goods, plain-word queries.
8. Three steps (light) — demo and agreement, catalog load, start selling; the storefront on a phone.
9. FAQ (dark) — opens on hover, numbered in serif; the price question is answered without a number.
10. Final call, footer with payment rails, links and model credits.

## Before launch

- `site.contactUrl` — where "Demo so'rash" should land (form, Telegram, phone). Today it points at avenir.uz.
- `site.demoUrl` — a dedicated demo shop; today it points at the only public instance, the client store on fetch-group.uz.
- Platform facts in `lib/i18n.ts` and `lib/product.ts` — re-check against the E-COMMERCE repo before publishing (especially the AI pipeline and delivery settings).
- OG image — none yet; `generateMetadata` in `app/[lang]/layout.tsx` is ready for it.
