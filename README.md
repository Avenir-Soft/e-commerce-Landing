# Avenir Store — landing page

Marketing site for Avenir Store, the Apple electronics shop. Three languages
(`/uz`, `/ru`, `/en`), a pinned 3D showroom hero with real product models
(React Three Fiber), GSAP ScrollTrigger, Lenis smooth scroll. Design rationale,
model licences and the launch checklist are in [DESIGN.md](./DESIGN.md).

## Stack

Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS 4, TypeScript,
`three` + `@react-three/fiber` + `@react-three/drei` + `@react-three/postprocessing`,
`gsap` + `@gsap/react`, `lenis`.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

`npx tsc --noEmit` and `npx eslint .` must both pass before a push.

## Layout

```
app/[lang]/          layout (fonts, metadata, header/footer) and the single page
proxy.ts             redirects / to /uz, /ru or /en by Accept-Language
lib/i18n.ts          dictionaries (server only — never import from a client file)
lib/languages.ts     language list and types (client-safe)
lib/catalog.ts       product lines, featured products, search tags, prices (UZS)
lib/site.ts          store URL, contacts, delivery facts, 3D model credits
components/hero/     Intro curtain, Hero (pin + choreography), Showroom (R3F), DeviceModel
components/sections/ Marquee, Lineup, Featured, Trust, SearchDemo, Steps, Faq, FinalCta
components/motion/   SmoothScroll (Lenis + ScrollTrigger), Motion (reveals, tilt, cursor)
public/models/       compressed GLB models + CREDITS.txt (CC-BY, attribution required)
```

## Content rules

- Copy lives only in `lib/i18n.ts`; components never hardcode text.
- Facts shared across sections (delivery days, payments, city) live in
  `lib/site.ts` and are interpolated into the dictionaries.
- Prices are integers in UZS in `lib/catalog.ts`; `lib/format.ts` renders them.
- Every "open the store" action links to `site.storeUrl`.
