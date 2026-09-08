import { Mark } from "@/components/brand/Logo";

/*
 * Screens of the platform, drawn in HTML so they stay crisp, translatable and
 * in the real fonts. They are captured as stills (public/screens) that the
 * 3D devices wear on their displays and the feature tiles show framed.
 *
 * Phone: 590×1278 (6.7" at half resolution). Laptop: 1600×1000. Tablet: 1024×1366.
 * The goods in them are real: photos, names, categories and prices pulled from
 * the live instance of the platform (fetch-group.uz).
 */

export type ScreenId = "home" | "checkout" | "dashboard" | "orders" | "editor";

export const SCREEN_SIZES: Record<ScreenId, { w: number; h: number }> = {
  home: { w: 590, h: 1278 },
  checkout: { w: 590, h: 1278 },
  dashboard: { w: 1600, h: 1000 },
  orders: { w: 1600, h: 1000 },
  editor: { w: 1024, h: 1366 },
};

const SHOP = "Bahor Market";
const DISPLAY = { fontFamily: "var(--font-unbounded), Unbounded, sans-serif" };

/*
 * Real goods, taken from the live instance of the platform (fetch-group.uz):
 * its own product photos, names, categories and prices, pulled from
 * `/api/products`. They used to be CSS gradients with invented names.
 *
 * Watches, speakers and headphones on purpose. That shop also sells phones,
 * laptops and tablets, and those are the very devices these screens are
 * displayed on — a MacBook selling MacBooks is the "Apple reseller" reading the
 * owner rejected on 2026-09-07.
 */
const goods = [
  { name: "Apple Watch Ultra 2 soati", cat: "Aqlli soatlar", price: "10 790 000", img: "/shop/chasi-apple-watch-ultra-2.webp" },
  { name: "JBL Charge 5 kolonkasi", cat: "Akustika", price: "1 972 000", img: "/shop/kolonka-jbl-charge-5.webp" },
  { name: "Apple AirPods Max quloqchini", cat: "Quloqchinlar", price: "6 961 500", img: "/shop/naushniki-apple-airpods-max.webp" },
  { name: "Apple Watch SE 3 soati", cat: "Aqlli soatlar", price: "3 780 000", img: "/shop/chasi-apple-watch-se-3.webp" },
  { name: "SONY WH-1000XM5 quloqchini", cat: "Quloqchinlar", price: "3 520 000", img: "/shop/naushniki-sony-wh-1000xm5.webp" },
  { name: "Yandex Station Lite kolonkasi", cat: "Akustika", price: "840 000", img: "/shop/umnaya-kolonka-yandeks-stantsiya-layt.webp" },
];

/* A plain <img>, not next/image: this route exists only to be photographed by
   Playwright, and a lazy, srcset-driven image is exactly what a capture can
   miss. `loading="eager"` for the same reason. */
const Shot = ({ src, className = "" }: { src: string; className?: string }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src={src} alt="" loading="eager" decoding="sync" className={`rounded-xl bg-white object-contain ${className}`} />
);

function PhoneFrame({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  const s = SCREEN_SIZES.home;
  return (
    <div
      style={{ width: s.w, height: s.h, fontFamily: "var(--font-manrope), Manrope, sans-serif" }}
      className={`relative flex flex-col overflow-hidden ${dark ? "bg-[#0b1220] text-white" : "bg-[#f6f7fb] text-[#0b1c33]"}`}
    >
      <div className="flex items-center justify-between px-8 pt-6 text-[22px] font-semibold">
        <span>9:41</span>
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-current" />
          <span className="h-3 w-3 rounded-full bg-current" />
          <span className="h-3 w-3 rounded-full bg-current opacity-40" />
        </span>
      </div>
      {children}
    </div>
  );
}

function Home() {
  return (
    <PhoneFrame>
      <div className="flex items-center justify-between px-8 pt-8">
        <div className="flex items-center gap-3">
          <Mark size={40} className="text-[#0b1c33]" />
          <span className="text-[30px] font-bold tracking-tight" style={DISPLAY}>
            {SHOP}
          </span>
        </div>
        <div className="relative h-12 w-12 rounded-full bg-white shadow">
          <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-[#2563eb] text-[13px] font-bold text-white">2</span>
        </div>
      </div>
      <div className="mx-8 mt-7 flex items-center gap-3 rounded-2xl bg-white px-5 py-4 text-[21px] text-[#6b7c93] shadow-sm">
        <span className="h-5 w-5 rounded-full border-[3px] border-[#6b7c93]" />
        qidiruv: «sovgʼa uchun»
      </div>
      <div className="mx-8 mt-6 flex shrink-0 items-center justify-between gap-4 overflow-hidden rounded-3xl bg-[#0b1c33] p-6 text-white">
        <div>
          <p className="text-[16px] uppercase tracking-[0.18em] text-white/60">Bahor chegirmalari</p>
          <p className="mt-1 text-[28px] font-bold leading-tight" style={DISPLAY}>
            −20% katalogga
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-white px-5 py-2.5 text-[17px] font-semibold text-[#0b1c33]">Koʼrish</span>
      </div>
      <div className="mt-6 flex shrink-0 gap-3 overflow-hidden px-8">
        {["Hammasi", "Aqlli soatlar", "Akustika", "Quloqchinlar", "Planshetlar"].map((c, i) => (
          <span
            key={c}
            className={`shrink-0 rounded-full px-5 py-2.5 text-[18px] font-semibold ${i === 0 ? "bg-[#0b1c33] text-white" : "bg-white text-[#0b1c33]"}`}
          >
            {c}
          </span>
        ))}
      </div>
      <div className="mx-8 mt-6 grid min-h-0 flex-1 grid-cols-2 gap-4 overflow-hidden">
        {goods.slice(0, 4).map((g) => (
          <div key={g.name} className="rounded-2xl bg-white p-3 shadow-sm">
            <Shot src={g.img} className="aspect-[5/4] w-full" />
            <p className="mt-3 text-[16px] text-[#6b7c93]">{g.cat}</p>
            <p className="text-[20px] font-semibold leading-tight">{g.name}</p>
            <p className="mt-1 text-[19px] font-bold">{g.price} soʼm</p>
          </div>
        ))}
      </div>
      <div className="mt-auto flex items-center justify-around border-t border-black/5 bg-white px-6 py-5 text-[17px] font-semibold text-[#6b7c93]">
        {["Bosh sahifa", "Katalog", "Savat", "Profil"].map((n, i) => (
          <span key={n} className={i === 0 ? "text-[#2563eb]" : ""}>
            {n}
          </span>
        ))}
      </div>
    </PhoneFrame>
  );
}

function Checkout() {
  return (
    <PhoneFrame>
      <div className="px-8 pt-8">
        <p className="text-[19px] text-[#6b7c93]">Buyurtma</p>
        <p className="text-[34px] font-bold" style={DISPLAY}>
          Rasmiylashtirish
        </p>
      </div>
      <div className="mx-8 mt-6 space-y-3">
        {goods.slice(0, 2).map((g) => (
          <div key={g.name} className="flex items-center gap-4 rounded-2xl bg-white p-3 shadow-sm">
            <Shot src={g.img} className="h-20 w-20 shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[20px] font-semibold">{g.name}</p>
              <p className="text-[17px] text-[#6b7c93]">1 dona</p>
            </div>
            <p className="text-[19px] font-bold">{g.price}</p>
          </div>
        ))}
      </div>
      <div className="mx-8 mt-7">
        <p className="text-[19px] font-semibold">Yetkazib berish</p>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border-2 border-[#2563eb] bg-white p-4">
            <p className="text-[19px] font-semibold">Ekspress</p>
            <p className="text-[16px] text-[#6b7c93]">1–2 kun · 25 000</p>
          </div>
          <div className="rounded-2xl border border-black/10 bg-white p-4">
            <p className="text-[19px] font-semibold">Standart</p>
            <p className="text-[16px] text-[#6b7c93]">5–7 kun · 10 000</p>
          </div>
        </div>
      </div>
      <div className="mx-8 mt-7">
        <p className="text-[19px] font-semibold">Toʼlov usuli</p>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {["Click", "Payme", "Uzcard", "Humo"].map((p, i) => (
            <div
              key={p}
              className={`rounded-2xl bg-white p-4 text-center text-[21px] font-bold ${i === 1 ? "border-2 border-[#2563eb]" : "border border-black/10"}`}
              style={DISPLAY}
            >
              {p}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-auto border-t border-black/5 bg-white px-8 py-6">
        <div className="flex items-center justify-between text-[20px]">
          <span className="text-[#6b7c93]">Jami</span>
          <span className="text-[26px] font-bold">4 204 000 soʼm</span>
        </div>
        <div className="mt-4 rounded-2xl bg-[#2563eb] py-5 text-center text-[22px] font-semibold text-white">Payme orqali toʼlash</div>
      </div>
    </PhoneFrame>
  );
}

/*
 * Type and density on the two laptop screens and on the tablet are set for the
 * size the device is actually SEEN at, not for the size of the mock. In the
 * hero the focused laptop lands at roughly 500×330 css px, so a 1600×1000 mock
 * is shown at about a third: the old 17px body text arrived as 5px of grey
 * mush and only the page title survived. Everything below is roughly doubled
 * — body 28–30px, headings 52–60 — and the element count halved to pay for it:
 * six sidebar items to four, four KPI cards to three, a six-column order table
 * to three fat columns, a thin sparkline to seven solid bars. Read these mocks
 * at ~33% zoom before changing anything; at 100% they look big on purpose.
 */
function LaptopFrame({ children, active }: { children: React.ReactNode; active: string }) {
  const s = SCREEN_SIZES.dashboard;
  const nav = ["Boshqaruv paneli", "Buyurtmalar", "Mahsulotlar", "Mijozlar"];
  return (
    <div
      style={{ width: s.w, height: s.h, fontFamily: "var(--font-manrope), Manrope, sans-serif" }}
      className="flex overflow-hidden bg-[#f3f5f9] text-[#0b1c33]"
    >
      <aside className="flex w-[400px] shrink-0 flex-col bg-white px-7 py-10">
        {/* 34px wrapped "Bahor Market" onto two lines inside a 336px rail;
            Unbounded runs ~0.81em per character, so the name gets 28. */}
        <div className="flex items-center gap-3">
          <Mark size={48} className="shrink-0 text-[#0b1c33]" />
          <span className="whitespace-nowrap text-[28px] font-bold" style={DISPLAY}>
            {SHOP}
          </span>
        </div>
        <p className="mt-10 text-[22px] font-semibold uppercase tracking-[0.16em] text-[#6b7c93]">Savdo</p>
        <nav className="mt-5 space-y-3 text-[30px] font-semibold">
          {nav.map((n) => (
            <div key={n} className={`rounded-2xl px-6 py-4 ${n === active ? "bg-[#0b1c33] text-white" : "text-[#4d5d73]"}`}>
              {n}
            </div>
          ))}
        </nav>
        <div className="mt-auto rounded-3xl bg-[#eef2ff] p-7 text-[26px] leading-snug text-[#4d5d73]">
          <p className="text-[28px] font-bold text-[#0b1c33]">Doʼkon ochiq</p>
          bahor-market.uz
        </div>
      </aside>
      <main className="flex h-full flex-col overflow-hidden p-12" style={{ width: s.w - 400 }}>
        {children}
      </main>
    </div>
  );
}

function Dashboard() {
  const kpis = [
    ["Bugungi buyurtmalar", "24", "+18%"],
    ["Bugungi savdo", "18,4 mln", "+9%"],
    ["Yangi mijozlar", "41", "+12%"],
  ];
  /* Seven solid bars instead of a twelve-point sparkline: a 5px stroke
     downscales to 1.5px and vanishes, a 60px bar downscales to 20 and reads. */
  const week = [
    { d: "Du", v: 52 },
    { d: "Se", v: 64 },
    { d: "Cho", v: 57 },
    { d: "Pay", v: 79 },
    { d: "Ju", v: 70 },
    { d: "Sha", v: 96 },
    { d: "Yak", v: 83 },
  ];
  const orders = [
    ["Apple Watch Ultra 2", "10 790 000", "Yigʼilmoqda", "#fef3c7", "#b45309"],
    ["JBL Charge 5", "1 972 000", "Kuryerda", "#dbeafe", "#1d4ed8"],
    ["SONY WH-1000XM5", "3 520 000", "Yetkazildi", "#dcfce7", "#15803d"],
  ];
  return (
    <LaptopFrame active="Boshqaruv paneli">
      <div className="flex shrink-0 items-end justify-between">
        <div>
          <p className="text-[26px] text-[#6b7c93]">Xush kelibsiz, Dilnoza</p>
          <p className="mt-1 text-[56px] font-bold leading-none" style={DISPLAY}>
            Boshqaruv paneli
          </p>
        </div>
        <div className="rounded-full bg-[#2563eb] px-8 py-4 text-[26px] font-semibold text-white">+ Mahsulot</div>
      </div>
      <div className="mt-8 grid shrink-0 grid-cols-3 gap-6">
        {kpis.map(([l, v, d]) => (
          <div key={l} className="rounded-3xl bg-white p-8 shadow-sm">
            <p className="text-[24px] text-[#6b7c93]">{l}</p>
            <p className="mt-2 text-[60px] font-bold leading-none tracking-tight">{v}</p>
            <p className="mt-3 text-[24px] font-bold text-[#16a34a]">{d} bu hafta</p>
          </div>
        ))}
      </div>
      <div className="mt-7 grid min-h-0 flex-1 grid-cols-[1fr_470px] gap-7">
        <div className="flex flex-col rounded-3xl bg-white p-8 shadow-sm">
          <div className="flex shrink-0 items-baseline justify-between">
            <p className="text-[30px] font-bold">Haftalik savdo</p>
            <p className="text-[26px] font-bold text-[#16a34a]">+9%</p>
          </div>
          {/* bar heights are a percentage of whatever the card is left with,
              not fixed px: with fixed px the tallest bar and its weekday label
              ran past the bottom of the 1000px screen */}
          <div className="mt-7 flex min-h-0 flex-1 gap-5">
            {week.map(({ d, v }) => (
              <div key={d} className="flex min-w-0 flex-1 flex-col">
                <div className="flex min-h-0 flex-1 items-end">
                  <div className="w-full rounded-t-xl bg-[#2563eb]" style={{ height: `${v}%` }} />
                </div>
                <span className="mt-4 shrink-0 text-center text-[24px] font-semibold text-[#6b7c93]">{d}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col rounded-3xl bg-white p-8 shadow-sm">
          <p className="shrink-0 text-[30px] font-bold">Soʼnggi buyurtmalar</p>
          <div className="mt-6 flex min-h-0 flex-1 flex-col gap-5">
            {orders.map(([p, sum, st, bg, fg]) => (
              <div key={p} className="flex flex-1 flex-col justify-center rounded-2xl bg-[#f3f5f9] px-6 py-4">
                <p className="text-[28px] font-bold leading-tight">{p}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[26px] text-[#6b7c93]">{sum}</span>
                  <span className="rounded-full px-4 py-1.5 text-[22px] font-bold" style={{ background: bg, color: fg }}>
                    {st}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </LaptopFrame>
  );
}

function Orders() {
  const rows = [
    ["Apple Watch Ultra 2 soati", "#1041 · Jasur T. · Click", "10 790 000", "Yigʼilmoqda", "#fef3c7", "#b45309"],
    ["JBL Charge 5 kolonkasi", "#1042 · Madina R. · Payme", "1 972 000", "Kuryerda", "#dbeafe", "#1d4ed8"],
    ["SONY WH-1000XM5 quloqchini", "#1040 · Nilufar A. · Uzcard", "3 520 000", "Yetkazildi", "#dcfce7", "#15803d"],
    ["Apple Watch SE 3 soati", "#1039 · Sardor K. · Humo", "3 780 000", "Yangi", "#ede9fe", "#6d28d9"],
    ["Yandex Station Lite", "#1038 · Kamola Y. · Payme", "840 000", "Yetkazildi", "#dcfce7", "#15803d"],
  ];
  const cols = "grid-cols-[1fr_280px_240px]";
  return (
    <LaptopFrame active="Buyurtmalar">
      <div className="flex shrink-0 items-end justify-between">
        <p className="text-[56px] font-bold leading-none" style={DISPLAY}>
          Buyurtmalar
        </p>
        <div className="flex gap-3 text-[26px] font-semibold">
          {["Hammasi", "Yangi", "Kuryerda"].map((f, i) => (
            <span key={f} className={`rounded-full px-6 py-3 ${i === 0 ? "bg-[#0b1c33] text-white" : "bg-white text-[#4d5d73]"}`}>
              {f}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-8 min-h-0 flex-1 overflow-hidden rounded-3xl bg-white shadow-sm">
        <div className={`grid ${cols} gap-7 border-b border-black/5 px-8 py-5 text-[22px] font-semibold uppercase tracking-[0.12em] text-[#6b7c93]`}>
          <span>Mahsulot</span>
          <span>Summa</span>
          <span>Holat</span>
        </div>
        {rows.map(([p, meta, sum, st, bg, fg]) => (
          <div key={meta} className={`grid ${cols} items-center gap-7 border-b border-black/5 px-8 py-8`}>
            <div className="min-w-0">
              <p className="truncate text-[30px] font-bold leading-tight">{p}</p>
              <p className="mt-1 text-[24px] text-[#6b7c93]">{meta}</p>
            </div>
            <span className="text-[30px] font-bold">{sum}</span>
            <span className="justify-self-start rounded-full px-5 py-2 text-[24px] font-bold" style={{ background: bg, color: fg }}>
              {st}
            </span>
          </div>
        ))}
      </div>
    </LaptopFrame>
  );
}

/*
 * The tablet is seen at roughly 350×470 css px in the hero — a 1024×1366 mock
 * at ~34%. Same rule as the laptop: body 28–32px, one big photo instead of a
 * thumbnail grid, and the variants table dropped so that what is left can
 * actually be read rather than five stacked cards of grey lines.
 */
function Editor() {
  const s = SCREEN_SIZES.editor;
  const stats = [
    ["Narx", "1 972 000", "#0b1c33"],
    ["Omborda", "12 dona", "#0b1c33"],
    ["Holat", "Sotuvda", "#15803d"],
  ];
  return (
    <div
      style={{ width: s.w, height: s.h, fontFamily: "var(--font-manrope), Manrope, sans-serif" }}
      className="flex flex-col gap-6 overflow-hidden bg-[#f3f5f9] p-10 text-[#0b1c33]"
    >
      <div className="flex shrink-0 items-end justify-between">
        <div>
          <p className="text-[26px] text-[#6b7c93]">Mahsulotlar · tahrirlash</p>
          <p className="mt-1 text-[52px] font-bold leading-none" style={DISPLAY}>
            JBL Charge 5
          </p>
        </div>
        <div className="rounded-full bg-[#2563eb] px-8 py-4 text-[28px] font-semibold text-white">Saqlash</div>
      </div>

      <div className="grid shrink-0 grid-cols-[360px_1fr] gap-7 rounded-3xl bg-white p-8 shadow-sm">
        {/* one real shot: the shop ships a single photo per product, and
            inventing a second angle would be inventing data */}
        <Shot src="/shop/kolonka-jbl-charge-5.webp" className="aspect-square w-full ring-1 ring-black/5" />
        <div className="flex flex-col justify-center">
          <p className="text-[24px] font-semibold text-[#6b7c93]">Nomi (RU)</p>
          <p className="mt-3 rounded-2xl bg-[#f3f5f9] px-6 py-4 text-[32px]">Колонка JBL Charge 5</p>
          <div className="mt-7 flex items-center justify-between">
            <p className="text-[24px] font-semibold text-[#6b7c93]">Nomi (UZ)</p>
            <span className="rounded-full bg-[#ede9fe] px-4 py-1.5 text-[22px] font-bold text-[#6d28d9]">AI tarjima</span>
          </div>
          <p className="mt-3 rounded-2xl bg-[#f3f5f9] px-6 py-4 text-[32px]">JBL Charge 5 kolonkasi</p>
        </div>
      </div>

      <div className="grid shrink-0 grid-cols-3 gap-6">
        {stats.map(([l, v, c]) => (
          <div key={l} className="rounded-3xl bg-white p-7 shadow-sm">
            <p className="text-[24px] text-[#6b7c93]">{l}</p>
            <p className="mt-2 text-[44px] font-bold leading-none tracking-tight" style={{ color: c }}>
              {v}
            </p>
          </div>
        ))}
      </div>

      <div className="flex min-h-0 flex-1 flex-col rounded-3xl bg-white p-8 shadow-sm">
        <div className="flex shrink-0 items-center justify-between">
          <p className="text-[28px] font-bold">Tavsif va SEO</p>
          <span className="rounded-full bg-[#ede9fe] px-4 py-1.5 text-[22px] font-bold text-[#6d28d9]">SEO yaratish</span>
        </div>
        <p className="mt-4 text-[30px] leading-relaxed text-[#4d5d73]">
          40 W quvvat, 20 soatgacha ishlash, IP67 suv va changdan himoya. Kafolat 12 oy, yetkazib berish butun Oʼzbekiston boʼylab.
        </p>
        <div className="mt-auto border-t border-black/5 pt-6">
          <p className="text-[24px] font-semibold text-[#6b7c93]">SEO sarlavha</p>
          <p className="mt-2 text-[28px] font-semibold">JBL Charge 5 kolonkasi — narxi va yetkazib berish</p>
        </div>
      </div>

      <div className="shrink-0 rounded-3xl bg-white p-8 shadow-sm">
        <p className="text-[28px] font-bold">Atributlar</p>
        <div className="mt-4 flex flex-wrap gap-3 text-[28px] font-semibold">
          {["40 W", "20 soat", "IP67", "Bluetooth 5.1"].map((a) => (
            <span key={a} className="rounded-full bg-[#f3f5f9] px-6 py-3">
              {a}
            </span>
          ))}
          <span className="rounded-full border-2 border-dashed border-black/20 px-6 py-3 text-[#6b7c93]">+ AI aniqlash</span>
        </div>
      </div>
    </div>
  );
}

export function Screen({ id }: { id: ScreenId }) {
  switch (id) {
    case "checkout":
      return <Checkout />;
    case "dashboard":
      return <Dashboard />;
    case "orders":
      return <Orders />;
    case "editor":
      return <Editor />;
    default:
      return <Home />;
  }
}
