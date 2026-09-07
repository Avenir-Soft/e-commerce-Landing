# Avenir Store — landing page

Marketing site for Avenir Store, the e-commerce platform by Avenir Soft
(storefront, Telegram Mini App, Click/Payme/Uzcard/Humo payments, delivery,
AI catalog, admin panel). Three languages (`/uz`, `/ru`, `/en`), a pinned 3D
showroom hero where real device models wear the platform's screens (React
Three Fiber), GSAP ScrollTrigger, Lenis smooth scroll. Design rationale, model
licences and the launch checklist are in [DESIGN.md](./DESIGN.md).

## Stack

Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS 4, TypeScript,
`three` + `@react-three/fiber` + `@react-three/drei`, `gsap` + `@gsap/react`,
`lenis`.

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
app/dev/             dev-only routes: /dev/render (model stills), /dev/screens (UI captures)
proxy.ts             redirects / to /uz, /ru or /en by Accept-Language
lib/i18n.ts          dictionaries (server only — never import from a client file)
lib/languages.ts     language list and types (client-safe)
lib/product.ts       what the platform is: hero moments, modules, included list, demo goods
lib/site.ts          demo and contact links, payment rails, 3D model credits
components/hero/     Loader, Hero (pin + choreography), Showroom (R3F), DeviceModel, SpotlightStage, Studio
components/screens/  HTML mocks of the platform screens shown on the devices
components/sections/ Marquee, Features, Spotlight, Included, WhyUs, SearchDemo, Steps, Faq, FinalCta
components/motion/   SmoothScroll (Lenis + ScrollTrigger), Motion (reveals, tilt, magnetic buttons, FAQ)
public/models/       compressed GLB models + CREDITS.txt (CC-BY, attribution required)
public/screens/      captures of the platform screens (textures for the models)
public/renders/      transparent stills of the devices wearing those screens
```

## Content rules

- Copy lives only in `lib/i18n.ts`; components never hardcode text.
- Facts about the product (modules, what's included, demo goods) live in
  `lib/product.ts`; links and payment rails in `lib/site.ts`.
- No prices on the landing. The devices are screens for the platform, never
  products for sale.
- Every primary action links to `links.contact` (demo request), every
  secondary one to `links.demo` (demo shop).
