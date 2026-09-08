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
- **No prices anywhere** (owner decision) — for the *platform*. The FAQ answers
  "Narxi qancha?" without a number. The prices visible inside the platform
  screens are goods prices, and since 2026-09-08 they are the real ones from
  `fetch-group.uz` (see "Screens on the devices").
- No Telegram bot for buying, dropdown language menu, a
  loading screen that waits for the models (all owner decisions).
- Owner corrections, 2026-09-08: the header never hides (the old
  hide-on-scroll-down read as "the navbar disappears"); the logo is the
  company lockup from avenir.uz (reticle + AVENIR, no "STORE" line); the
  lit device sits closer to the camera with a brighter, straighter screen so
  the platform UI on it is readable; the row and the copy arrive only once
  the loader lifts (before, the entrance played under the loading screen);
  the "why" tile says **3 languages** (UZ / RU / EN). Note: the E-COMMERCE
  frontend's `lib/i18n.ts` lists `supportedLngs: ['ru', 'uz']` today, so EN
  is a promise the platform still has to keep.
- Navbar logo, later the same day: the owner wanted it static and closer to
  the company logo. `Logo.tsx` is now measured against the raster
  `Avenir-logo.png` (star radius 0.57 of the half-axis, right tip at 2.58,
  cap height 0.33, baseline 0.29 above the axis, "AVENIR" in Unbounded 600
  tracked 0.1em) and has no hover rotation or colour change; the diamonds
  are filled with the room's ground colour so they read as cut-outs.
- Second round the same day: the favicon set is the avenir.uz one
  (`app/icon.png`, `apple-icon.png`, `favicon.ico`); every section reveals
  with its own verb (`components/motion/reveals.ts`: write / clip / tick /
  rise-3d / slide / float-in, counters, parallax) instead of one fade-up;
  and the two accents are tied together: blue is the action colour, the sand
  gold is the editorial voice in BOTH rooms (`--color-sand-3` for eyebrows
  and figures on the light ground, a warm counter-glow in every tile, the
  aurora, the day rooms and the showcase, gold marks in the ticker).
- Loading screen, third round: the mark "locks focus" (`Loader.tsx`): a faint
  ring and a gold dashed orbit appear, the four diamond tips fly in from
  outside and snap onto the axes, the axes draw inward, the star ignites
  under a white flash and breathes, and the ring fills with the download.
  The serif percentage and the "loading" line that sat under the mark were
  removed later the same day (owner: "loadingdagi foizni olib tashla loading
  yozuvni ham"), so the ring is the only progress the screen shows and the mark
  sits centred; `loader.loading` went out of all three dictionaries with them.
  The value behind the ring still creeps on its own clock and never runs
  backwards, because drei's `useProgress` sits at 0 until the meshopt models
  land and its ratio drops when a new asset joins the queue.
  Exit: the star bursts (×9), rings open, copy lifts, then the curtain wipes
  up; `EXIT_MS` is 1100 so the element hides only after the curtain. Exit
  states are keyframe animations, not transitions, because a transition
  cannot start from a value an entry animation was holding.
- "The loader stutters" (owner, same day) had three causes, all fixed:
  `gl.compile` froze the main thread for 4.4 s on ANGLE/Direct3D (now
  `compileAsync`, KHR_parallel_shader_compile, ~0.3–0.7 s blocking); the
  showcase stage compiled a second context at the same time (now mounts only
  after the loader leaves); and the hero canvas drew frames behind the
  curtain (`frameloop` is "never" until the intro). The mark is also built
  from stacked `<svg>` layers so its breathing, orbit and burst animate
  whole elements on the compositor. Measured with a longtask observer: main
  thread blocked 9.2 s → 3.0 s cold, 1.4 s warm; loader leaves at ~3.5–5 s
  instead of 13–16 s.

## The 2026-09-08 redesign (branch `redesign-premium`)

The showroom, the copy, the 3D models, the screens and every link were kept;
what changed is the visual system underneath them.

- **Type.** Unbounded ran every heading at up to 4.3rem, which read as a
  display-font template and inverted the hierarchy — a Spotlight chapter title
  was larger than the H2 above it. Headings are now **Inter Tight**, body copy
  **Inter**, both a step or two smaller, on one ≈1.25 ramp. Unbounded is kept
  for the wordmark, so the brand mark is still the brand mark and the interface
  around it is neutral. The italic serif stayed, but as a small eyebrow behind a
  rule instead of a 1.5rem line competing with the heading.
- **Surfaces.** Cards were 24px-radius rectangles carrying two radial washes, a
  gradient border and an animated `shine` / `beam` edge. They are now flat
  surfaces at 14px with a hairline (`--color-line`, brightening on hover) and a
  single faint pool of light that follows the pointer. The `shine` and `beam`
  effects were removed outright.
- **Buttons: unchanged from before the redesign.** They were briefly reworked to
  44px at a 10px radius with no glow; the owner asked for them back
  ("knopkalarni oz holiga qaytar"), so `.btn` is again the 52px pill with the
  blue glow, the light pass across `.btn-solid` on hover, `.btn-sm` at 40px, the
  2.75rem hero override below 40rem, and the magnetic pull in `Motion.tsx`.
- **Hover must not move anything the pointer is not on** (owner, same day:
  "elementlar hover bo'lgan boshqa elementlarga ta'sir qilib ular qimilab
  ketyabti"). The one effect that had to go is the 3D tilt on `[data-tilt]`: it
  dragged everything inside a tilted card with it. `[data-tilt]` keeps the
  pointer-following glow, which moves nothing. The magnetic pull went with it at
  the time and has since been restored — it moves the button and its own icon,
  nothing else (measured: 3 elements, all inside the button).
  The rule is about *reach*, not about motion as such — two hovers still move
  something, and both are contained:
  - the feature tiles' device still leans in (`scale(1.045)`, restored after it
    was removed with the rest; owner: "nega featuresda hover bo'lganda
    devicelarni yaqinlashishini olib tashlading"). The tile is
    `overflow: hidden`, so the still grows inside its own card; the `.sheen`
    carries the same transform or the highlight slides off the silhouette it is
    masked to. Measured: 2 elements move, both inside the hovered tile, 0
    outside;
  - the FAQ still opens on hover, into reserved space (next bullet).
  Everything else measures 0 with `tools/pw/avenir-hover2.mjs`; the only other
  movement is the 2px arrow nudge inside the hovered button.
- **The FAQ keeps hover, and no longer moves the page.** Hover-opening is an
  owner decision ("questionsdan hoverni olib tashlama"), so the jumpiness was
  fixed rather than the behaviour. Three things do it, all in `Motion.tsx`:
  1. the list reserves room for the tallest answer — measured once fonts are
     ready by opening and closing every panel inside one task, so no frame is
     ever painted with them open — and `min-height` goes on `[data-faq-list]`,
     re-measured on resize;
  2. only one panel is open at a time, so that reserve always covers it;
  3. the open is scheduled from `pointermove` after 140ms, **not** from
     `pointerenter`. That is the one that matters: when a panel opens the rows
     resettle under a stationary cursor, and `pointerenter` fires again on
     whatever slid beneath it, which is what made the list oscillate. Closing is
     a property of the list, not a row, so crossing the gap between two
     questions does not close and reopen.
  Click and Enter still toggle, for touch and for the keyboard. Verified frame
  by frame (~225 frames per run) over sweeps and jumps across all six rows, in
  uz and ru at 1440 and 1024: the footer drifts 0px and the list height never
  changes.
- **The favicon was a white square.** `app/icon.png` and `apple-icon.png` were
  100% opaque and 90% white pixels — a white tile with a navy mark and a drop
  shadow. The set is now the **AvenirOS ERP mark**
  (`Avnir_OS/apps/web/app/icon.png`, owner: "faviconni avenir os dagi kabi qilib
  qo'y"): navy star `#042147`, near-black axes and hollow diamonds `#1e1e1e`, no
  background. `tools/pw/avenir-mkicon2.mjs` redraws that file into `icon.png`
  (512, 92.8% transparent), `apple-icon.png` (180 on white with a 12% margin —
  iOS composites transparency onto black and this mark is dark, so it needs a
  light ground) and `favicon.ico` (16/32/48, PNG-in-ICO assembled by hand).
  `icon.svg` was deleted: browsers prefer an SVG over every PNG, so a
  differently-coloured one would have overridden the whole set.
  Known trade-off, same as in the ERP itself: a navy mark on a transparent
  ground is crisp on a light tab strip and faint on a dark one. Fixing that
  means an `icon.svg` that swaps to a light mark under
  `prefers-color-scheme: dark`, which would no longer match AvenirOS.
- **The search panel had no display type** (owner: "search qismida
  boshqalardagiday kattaroq shriftda yozuv yo'q"). Every other chapter carries a
  large element next to its H2 — a 30px tile title in the bentos, the 72px gold
  figures in "why", the numerals in "steps" — while the search panel topped out
  at 16px, so the room read thin. The query is what that chapter is about, so it
  is now the display element: `.field--lead` sets the input in Inter Tight at
  `clamp(1.125rem, 0.9rem + 0.9vw, 1.5rem)` (24px at 1440, 18px on a phone, no
  overflow at any width), and result names stepped up to `.t-h3`.
- **The search panel reserved too little room.** Its results list had
  `min-h-[13.5rem]` but three rows are ~18rem, so every cycle of the sample
  query resized the panel and pushed everything below it up and down by ~75px
  — no hover needed. The results area now reserves 21rem and every row is a
  fixed three lines (`truncate` on all of them). Verified over 15s of typing:
  `#steps` drifts 0px, was ±75px.
- **Rhythm.** Every chapter now uses `.section-y` and every section head
  `.after-head`, replacing ad-hoc `py-24 md:py-32` / `mt-12`.
- **Navigation.** The bar had no active state at all; it now marks the chapter
  being read (measured against a line 40% down the viewport, because `#why` and
  `#search` sit between the linked sections and an observer keeps reporting the
  last one it saw). The mobile menu became a full-height sheet with a proper
  icon toggle. Note that the sheet is a **sibling** of `<header>`: the bar
  carries a `backdrop-filter`, which makes it the containing block for any
  `position: fixed` descendant — inside it the sheet collapsed to 64px.
- **Decoration.** Two of the hero's three aurora washes, the Spotlight's second
  glow and most of the CTA orb's opacity are gone; the light rooms lost their
  two gradient washes entirely.
- **Fixed on the way.** The Steps phone overflowed the viewport at 390px in its
  pre-reveal state (`float-in` offset x64 + 5° rotation on a 280px element in a
  350px column); the bentos dropped to three and six columns at `md`, which is
  ~235px per column at 768px, so both now switch at `lg` and pair up at `sm`;
  the decorative mark in the "your brand" tile sat under its own heading on
  phones.
- **Left alone deliberately.** `public/screens/*.webp` and `public/renders/*.webp`
  are captures made when the mocks were set in Manrope/Unbounded, so the demo
  shop's UI inside the devices still uses those faces. Regenerating them means
  re-running `screens.mjs` and then `render.mjs`; the mismatch is only visible
  if you zoom into a device.

## The pointer (2026-09-08, same branch)

The custom cursor was a "no" early on; the owner reversed it — "kursorni
avenir.uz dagi kabi qilib qo'y" — so avenir.uz's dot is carried over as-is:
a 10px light that trails the pointer at 0.24 per frame and swells to 2.8× over
anything you can act on (`components/motion/Cursor.tsx`, `.cur` in
`globals.css`). The hero canvas counts as a target, because it can be dragged.

Two things differ from the source, both because this page is not avenir.uz:

- **The light rooms.** avenir.uz is dark throughout, so its dot is always white.
  Here a white dot vanishes over the features, included and steps rooms, so
  `mouseover` also toggles `is-day` when the target is inside `.day` and the dot
  becomes the day ink.
- The gate is written as `64rem` rather than `1024px`, to match this project's
  `lg`.

Carried over unchanged, deliberately: **one media query, shared by the CSS and
the JS, and the JS subscribes to it.** On avenir.uz they disagreed once (JS
`innerWidth > 900`, CSS `min-width: 1024px`) and a window opened narrow then
widened past 1024 had no pointer at all — the real one hidden, the fake one
never started.

Verified: dot at the pointer on the night rooms, `is-big` and blue over a
button, `is-day` and dark over a light room, and the real cursor restored below
64rem, on touch, and under reduced motion. No console errors.

## The phone pass (2026-09-08, same branch)

Owner: "mobilka uchun logikani ishlatib hamma narsa chatelno tekshirib ko'rib chiq
va to'g'irla, keraksiz narsani mobilka uchun faqat olib tashla." Everything below
is behind `max-width: 40rem` or a `max-md:`/`sm:` variant. Proof that desktop was
not touched: `tools/pw/avenir-baseline.mjs` snapshots the page height and the box
of fifteen elements at 768, 1024 and 1440 — all three are **identical** before and
after.

- **The feature tiles' devices sat on their own headings.** The stills were
  absolute at every width, and on a phone the laptop and the phone landed exactly
  where the copy starts. Below md the art is now **in the flow** above the copy at
  a fixed height (`band`), so nothing can slide under it in any language; from md
  it goes back to bleeding off the card (`box`). Band heights come from the
  measured fill of each still (`tools/pw/avenir-bbox.mjs`: phones 96% of the
  square tall, the laptop 62%, the tablet 91%), so the devices land at comparable
  sizes. The icon tiles do the same with their icon. Cards below md carry no
  minimum height — with the art in the flow a minimum only opens a gap above it.
- **Tile minimums are keyed by tile id, not by size.** `place.small` and the
  telegram override both emitted `md:min-h-*`; same specificity, so the winner was
  whichever Tailwind wrote last, and moving the sm minimums to md silently made
  that tile 64px taller at 768. One map, one entry per tile, no element with two.
- **The showroom was cut in half by its own caption.** The 3D row sat at
  `y = -0.7` on phones and the caption card covered the bottom of the device.
  `-0.25` clears the card and still passes under the copy (`Showroom.tsx`).
- **Taken off phones:** the CTA orb and the hero's light sweep (decoration that
  costs a full-width paint and reads as a smudge at 390px), and the FAQ's reserved
  space — that exists so a hovering cursor cannot shove the page, and there is no
  cursor here, so it was 150px of blank card on a screen that has none to spare.
  It is gated on `pointer: fine` now.
- **Thumb targets:** chips 32→44px, footer links 25→44px, the payment rails 38→40,
  the logo 34→50. What is left under 40px is the search `<input>` (its 66px label
  is the target) and four links inline in a sentence, which WCAG exempts.
- **Rhythm:** `--section-y` 4.5→3.75rem and `--head-gap` 2.5→2rem, the lead at
  16px/1.55, the figure cards' inner gap 32→20px, the final card's padding
  56→40px.
- Checked at 390, 360 and 430 in uz and ru: no horizontal overflow, nothing
  clipped out of its card, no text under 12px, no console errors.

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
still on a phone, the hover-opened FAQ, and the final call.

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

- **`public/screens/*.webp` are photographs of the real platform** (owner,
  2026-09-08: run the e-commerce locally, put demo data in it, re-shoot the
  screens). The `AvenirSoftt/E-COMMERCE` stack runs locally under Docker —
  postgres+pgvector, redis, meilisearch, minio, the FastAPI backend and the
  Next frontend — seeded with the demo shop the landing advertises, and
  `C:\Users\mamut\tools\pw\ecom-shots.mjs` shoots the five pages. See
  **Shooting the real platform** below.
- `components/screens/Screens.tsx` and the `/dev/screens` route are the HTML
  mocks those photographs replaced. They are kept as the fallback for when the
  platform cannot be run, and as the reference for what each screen is meant to
  say; **they no longer ship**. Do not edit them expecting the site to change.
  They cover the same five screens for the demo shop: `home`,
  `checkout` (phone, 590×1278), `dashboard`, `orders` (laptop, 1600×1000),
  `editor` (tablet, 1024×1366), in the landing's own fonts and palette.
- **The goods in them are real** (owner, 2026-09-08: "devicelardagi rasmlarni
  hammasi haqiqiy rasm bo'lishi kerak, saytdan olib qo'y"). Photos, names,
  categories and prices come from the live instance of the platform,
  `fetch-group.uz`, via its public `/api/products`; the six photos live in
  `public/shop/`, redrawn to 560px squares on white by
  `tools/pw/fg-download.mjs`. They were CSS gradients with invented names.
  **Watches, speakers and headphones on purpose:** that shop also sells phones,
  laptops and tablets, and those are the very devices these screens are shown
  on — a MacBook selling MacBooks is the "Apple reseller" reading the owner
  rejected on 2026-09-07. The order lists in `dashboard`/`orders` and the
  product in `editor` (JBL Charge 5, with its real specs) were changed with them.
  **Still open:** `demoItems` in `lib/product.ts` — the search sample — is still
  the mixed catalogue (sneakers, espresso machine, scarf), which is what carried
  the "any goods can be sold" message. The devices now say "electronics shop"
  and the search says "anything". One of the two should move.
- **They are typeset for the size the device is seen at, not the size of the
  mock** (owner, 2026-09-08: "bosh sahifada noutbukda planshetda yozuvlar
  yaxshi ko'rinib turishi kerak, faqat yozuv emas boshqa element"). In the hero
  the focused laptop lands at about 500×330 css px, so a 1600×1000 mock is
  shown at roughly a third and the old 17px body text arrived as 5px of grey
  mush: only the page title survived. Body is 28–30px now and headings 52–60,
  and the element count was halved to pay for it — six sidebar items to four,
  four KPI cards to three, a six-column order table to three fat columns
  (product name with `#id · customer · payment` beneath it), a twelve-point
  sparkline to seven solid bars, and the tablet's variants table dropped for
  one large photo plus three stat boxes. **Read these mocks at ~33% zoom**;
  at 100% they look oversized on purpose.
  Two traps found while doing it: bar heights must be a percentage of the
  card, not fixed px, or the tallest bar runs off a screen whose height is
  fixed at 1000; and the shop name at 34px wrapped onto two lines in the
  400px sidebar — Unbounded runs about 0.81em per character.
- `public/screens/*.webp` are captures of those mocks, made with
  `C:\Users\mamut\tools\pw\screens.mjs` against the dev route `/dev/screens`
  (blocked in production), at `deviceScaleFactor: 2` and WebP 0.95. Regenerate
  them after editing the mocks — **and then `render.mjs` too**, because
  `public/renders/*.webp` are photographs of the models already wearing them.

### Shooting the real platform

`C:\Users\mamut\tools\pw\ecom-shots.mjs <outDir> <jwt>` photographs the running
platform at `localhost:3010`. Bring it up from `D:\AvenirOS\E-COMMERCE`:

- `docker network create dokploy-network` once — the committed compose file
  expects it to exist and publishes no ports of its own (Dokploy puts a reverse
  proxy in front), so a local `docker-compose.override.yml` maps frontend 3010,
  API 8000, postgres 5433, MinIO 9000/9001, Meilisearch 7700. **3000 is the ERP
  and 3002 is this landing.** Both that file and the root `.env` are local only.
- `NEXT_PUBLIC_API_URL` must stay `/api`. Pointing it at `http://localhost:8000`
  makes the browser call the API cross-origin and the backend answers
  "Disallowed CORS origin"; the frontend has its own rewrite proxy for `/api`.
  It is a build arg, so changing it means rebuilding the frontend image.
- The demo shop is seeded by `scratchpad/seed_bahor.py`, copied into the
  container. The repo's own `seed_database.py` fills the catalogue with
  iPhones, MacBooks and iPads — the "Apple reseller" reading the owner
  rejected on 2026-09-07 — so this one seeds the same watches, speakers and
  headphones the landing already shows, priced in UZS, with the photos from
  `public/shop/`. It also writes a PAID `PaymentTransaction` per order:
  `_visible_orders_filter` hides an online-payment order until one exists, so
  without them the admin list and the dashboard read zero. The store name is
  set to "Avenir Store" through `PUT /api/admin/settings` (owner, 2026-09-08:
  the demo shop carries the platform's own name, not an invented merchant's;
  its `delivery.zones`
  are plain strings, not objects).
- Admin pages need a session. The frontend keeps its JWT in
  `localStorage.token` and falls back to `POST /api/auth/refresh` when there is
  no Telegram initdata, so the harness mints an HS256 token
  (`{sub: "<user id>"}`) with the local `JWT_SECRET_KEY` instead of going
  through the Telegram login.
- **The viewports are smaller than the textures they produce** and some shots
  are scrolled, for the same reason the mocks were typeset large: the admin is
  a monochrome layout with generous whitespace, and shooting it at 1600px to
  show it at 500 turns 14px text into grey mush. Only the aspect ratio matters
  to the 3D material — phone 0.4617, laptop 1.600, tablet 0.750. The admin
  shell scrolls an inner div, so `window.scrollTo` is a no-op there; the
  harness finds the tallest scrollable element instead.
- **Known limit:** even framed this way, the analytics page and the product
  editor read weakly at hero size — they are low-contrast and low-density. The
  storefront and the order list survive well. Raised with the owner
  2026-09-08; the fix that helps both the landing and real users is more
  density and colour in the admin itself.
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
| `night-2` | `#061A31` | bands, the dark door in a light room |
| `surface` / `surface-2` | `#071B31` / `#0A2440` | raised surfaces on the night rooms: cards, panels, result rows |
| `ink` / `ink-2` / `ink-3` | `#F3F6FB` / `#A9B8CC` / `#7F90A8` | text hierarchy (ink-3 is 5.4:1 on night) |
| `line` / `line-2` | white 9% / 16% | hairlines at rest and on hover — how surfaces separate |
| `mark` / `mark-2` | `#2563EB` / `#60A5FA` | the accent: buttons, focus ring, active nav |
| `sand` / `sand-2` | `#E8D5B0` / `#C9A96E` | serif accents: eyebrows, figures, FAQ numbers |
| `day` / `day-ink` | `#F6F7F9` / `#0B1C33` | light rooms (features, included, steps) |
| `day-line` / `day-line-2` | ink 9% / 16% | the same hairlines in the light rooms |

Radii: `--radius-tile` 14px, `--radius-btn` / `--radius-field` 10px, pills only
for chips and payment rails. Rhythm: `--section-y`
`clamp(4.5rem, 2.5rem + 6vw, 7.5rem)` on every chapter, `--head-gap`
`clamp(2.5rem, 1.6rem + 3vw, 4rem)` under every section head, `--shell` 74rem,
`--header-h` 4rem.

Type: **Inter Tight** (display: h1 up to 3.5rem, h2 2.5rem, h3-lg 1.875rem,
h3 1.1875rem — weight 600, tracking −0.014 to −0.032em), **Inter** (body,
1rem / 1.65, plus a 0.75rem uppercase `t-label`), **Cormorant Garamond italic**
(eyebrows at 1.0625rem behind a short rule, and the big figures) and
**Unbounded** for the wordmark in `Logo.tsx` and nowhere else. All carry
Cyrillic except the Unbounded cut, which only ever sets "AVENIR".

Performance budget for the 3D: one render pass, no post-processing, no
reflections, no transmission materials, DPR capped at **2 on desktop and 1.25 on
phones** and lowered by `PerformanceMonitor` when frames drop, rendering paused
while the hero is off screen, off-screen carousel items hidden, shaders compiled
behind the loading screen (`ReadySignal` → `markModelsReady`).

**Why the screens looked dull and soft** (owner, 2026-09-08: "rasmlar hira …
judayam tiniq koʼrinishi shart"), and the three things that were actually wrong:

- **Tone mapping.** The canvas ran ACES Filmic, a film curve that desaturates
  and greys down everything bright — on a device whose whole job is to show a
  white UI full of product photos, that is the dullness. Both the hero canvas
  and `/dev/render` now use **Khronos PBR Neutral** (`THREE.NeutralToneMapping`,
  exposure 1.15), which keeps whites white. Measured on the stills: saturation
  0.097 → 0.185 on the laptop, 0.054 → 0.104 on the tablet, and peak luminance
  reached 255 instead of stopping at 246.
- **The DPR cap was the real softness.** At a flat 1.25, a 2× display drew the
  scene at 1800×1125 and stretched it over 2880×1800 — everything soft, textures
  included. Desktop now draws 1:1. Measured after: 60.2 fps with no frame over
  17ms at 1440@2x, and the phone is untouched at 487×1055 and 60.1 fps.
- **The captures were 1×.** `screens.mjs` now captures at `deviceScaleFactor: 2`
  and WebP 0.95, so `home.webp` is 1180×2556 rather than 590×1278. `public/screens`
  grew from ~270KB to ~820KB; that is the price of the sharpness.

The display material also lost some of the room: `emissiveIntensity` 1.25/1.05 →
1.5/1.3, `roughness` 0.4 → 0.3, `envMapIntensity` 0.12 → 0.06 — reflection and
diffuse only add the studio's grey to a surface that should be showing its own
picture.

**The showcase stage was a separate case** (owner, same day: "laptop bilan ipad
katta ekranlarda yaxshi ko'rinmayapti"). `SpotlightStage.tsx` is its own canvas
and had been left behind on all of the above, plus two problems of its own:

- It still ran **ACES and DPR 1.25** while the hero had moved on — which is
  exactly why its laptop read grey next to the hero's. Both now match.
- **The turntable swept ±63°** (`Math.PI * 0.7`; the comment above it claimed
  ±80°, so it had drifted from its own documentation). A phone survives that
  angle. A tablet does not: at 63° a flat screen is nearly edge-on, and this is
  the one chapter whose whole job is to let you read the platform's UI. It is
  ±29° now, and dragging still spins the model right round.
- **One size fitted all three.** `1.9 / spec.size` normalises each model's
  LARGEST dimension, which is the laptop's width but the phone's and the
  tablet's height — so the laptop filled the stage sideways while the two
  portrait devices sat at half height, small and lost on a wide screen. Sized
  per device now (`STAGE_SIZE`), measured at 1920 and 1440 over three runs:
  they fill 90–97% of the stage width and 73–90% of its height, up from ~50%,
  with no clipping at either width.
  **That first pass overshot the two portrait devices** (owner, same day:
  "telefon va planshetni razmerini kichikroq qil, katta bo'lib qolgan"). A
  phone standing taller than the laptop is wide reads as a prop, not a
  product. On a 1920 stage (560×904) the phone went 2.7 → 2.25, from 72% of
  the stage's height to 60%, and the tablet 2.6 → 2.3, from 49% to 43%; the
  laptop was never the offender and stayed at 1.95. Note the tablet reads
  smaller than its number suggests, because the iPad GLB normalises on a
  bounding box larger than its own screen — **compare these on screen, not in
  world units.**
- The crossfade was symmetrical, so mid-swap a whole phone sat on the laptop's
  screen — harmless at the old sizes, obvious at these. The outgoing model now
  collapses at rate 11 against the incoming 5.

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
9. FAQ (dark) — opens on hover (click and Enter too), numbered in serif; the price question is answered without a number.
10. Final call, footer with payment rails, links and model credits.

## What a phone actually waits for

Audited on the live site 2026-09-09 at **1.6 Mbps / 150 ms RTT / 4x CPU** — an
ordinary phone on an ordinary Uzbek connection. Harnesses:
`tools/pw/avenir-audit-full.mjs` (overflow, tap targets, headings, metadata),
`avenir-perf.mjs` (LCP, CLS, long tasks, transfer), `avenir-lcp.mjs` (which
element LCP actually is), `avenir-firstpaint.mjs` (when the curtain lifts).

| | before | after (median of 3) |
| --- | --- | --- |
| Loading screen up | 17.3 s | **1.5 s** |
| LCP | 19.8 s | **7.7 s** |
| TTFB | 1.76 s | 0.56 s |
| CLS | 0.0009 | 0.0009 |

Three separate causes, each one hiding the next:

1. **The loader's safety timeout was counted from mount**, and mount means
   hydration. Hydration alone took ~10 s, so a timer meant to bound the wait
   at 7 s had not started yet. It is a budget for the visit now, measured from
   navigation, and shorter on a phone (2.5 s) than on a desktop (7 s).
2. **CSS held the hero copy until JavaScript arrived.**
   `.hero[data-pending] [data-load] { opacity: 0 }` exists so the intro
   timeline can set its own start state, but "until JS arrives" is not a
   bound — LCP was the lead paragraph at 15.2 s, text that had been in the
   HTML since the first byte. The hold has a 2.4 s deadline now.
3. **Only React could lift the curtain**, so it waited on 1.6 MB of bundle —
   most of the wait it was there to hide. An inline script in the layout lifts
   it on the same budget, and React agrees when it lands.

**Still open, and it is the whole remaining cost.** The page transfers ~6 MB:
1.64 MB of script and 1.7 MB of GLB models, for a 3D scene. A phone pays all
of it. `public/renders/*.webp` are the same devices already photographed at
39–64 KB each. Serving those to phones instead of the canvas would take the
remaining seconds off, at the price of a hero that no longer turns on a phone
— an owner's call, raised 2026-09-09.

Also found and fixed: no `og:image` at all (the link had no card anywhere it
was pasted, and in this market it is pasted into Telegram — `public/og.jpg` is
a shot of the hero itself, so it cannot drift from the page); no structured
data; `metadataBase` missing, so absolute URLs fell back to localhost;
`.btn-sm` at 40px against the 44px a finger needs; the hero label truncated to
"MIJOZ KO'RADIGAN DO..." at 390px.

Clean in the same audit, at 390 / 768 / 1440 / 1920: no horizontal overflow,
no console errors, alt text on every image, one `h1`, no heading-level jumps,
canonical and hreflang on all three languages.

**Not measured, because the page cannot answer it:** there is no analytics of
any kind (no GA, Metrica, Pixel or Clarity) and no form — all five CTAs leave
for `avenir.uz/#aloqa` or `fetch-group.uz`. Conversion cannot be reported on
until one of those changes.

## Before launch

- `site.contactUrl` — where "Demo so'rash" should land (form, Telegram, phone). Today it points at avenir.uz.
- `site.demoUrl` — a dedicated demo shop; today it points at the only public instance, the client store on fetch-group.uz.
- Platform facts in `lib/i18n.ts` and `lib/product.ts` — re-check against the E-COMMERCE repo before publishing (especially the AI pipeline and delivery settings).
- OG image — none yet; `generateMetadata` in `app/[lang]/layout.tsx` is ready for it.
