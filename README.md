# Avenir Store — landing page

Marketing site for Avenir Store, the Apple electronics shop that runs as a
Telegram Mini App. Three languages (`/uz`, `/ru`, `/en`), a 3D hero built with
React Three Fiber, GSAP ScrollTrigger and Lenis. Design rationale and the
launch checklist are in [DESIGN.md](./DESIGN.md).

## Stack

Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS 4, TypeScript,
`three` + `@react-three/fiber` + `@react-three/drei`, `gsap` + `@gsap/react`,
`lenis`, `qrcode`.

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
lib/site.ts          bot link, store URL, contacts, delivery facts
components/hero/     Hero (pin + choreography), Showroom (R3F canvas), devices
components/sections/ Lineup, Featured, Trust, SearchDemo, Steps, Faq, FinalCta
components/motion/   SmoothScroll (Lenis + ScrollTrigger sync)
```

## Content rules

- Copy lives only in `lib/i18n.ts`; components never hardcode text.
- Facts shared across sections (delivery days, payments, city) live in
  `lib/site.ts` and are interpolated into the dictionaries.
- Prices are integers in UZS in `lib/catalog.ts`; `lib/format.ts` renders them.
