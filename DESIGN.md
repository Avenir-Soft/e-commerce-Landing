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
  under a white flash and breathes, and the ring fills with the download
  next to a serif percentage. The percentage creeps on its own clock and
  never runs backwards, because drei's `useProgress` sits at 0 until the
  meshopt models land and its ratio drops when a new asset joins the queue.
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
9. FAQ (dark) — opens on hover (click and Enter too), numbered in serif; the price question is answered without a number.
10. Final call, footer with payment rails, links and model credits.

## Before launch

- `site.contactUrl` — where "Demo so'rash" should land (form, Telegram, phone). Today it points at avenir.uz.
- `site.demoUrl` — a dedicated demo shop; today it points at the only public instance, the client store on fetch-group.uz.
- Platform facts in `lib/i18n.ts` and `lib/product.ts` — re-check against the E-COMMERCE repo before publishing (especially the AI pipeline and delivery settings).
- OG image — none yet; `generateMetadata` in `app/[lang]/layout.tsx` is ready for it.
