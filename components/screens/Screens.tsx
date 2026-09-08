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
          <span className="text-[30px] font-bold tracking-tight" style={{ fontFamily: "var(--font-unbounded), Unbounded, sans-serif" }}>
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
          <p className="mt-1 text-[28px] font-bold leading-tight" style={{ fontFamily: "var(--font-unbounded), Unbounded, sans-serif" }}>
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
        <p className="text-[34px] font-bold" style={{ fontFamily: "var(--font-unbounded), Unbounded, sans-serif" }}>
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
              style={{ fontFamily: "var(--font-unbounded), Unbounded, sans-serif" }}
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

function LaptopFrame({ children, active }: { children: React.ReactNode; active: string }) {
  const s = SCREEN_SIZES.dashboard;
  const nav = ["Boshqaruv paneli", "Buyurtmalar", "Mahsulotlar", "Kategoriyalar", "Mijozlar", "Sozlamalar"];
  return (
    <div
      style={{ width: s.w, height: s.h, fontFamily: "var(--font-manrope), Manrope, sans-serif" }}
      className="flex overflow-hidden bg-[#f3f5f9] text-[#0b1c33]"
    >
      <aside className="flex w-[300px] shrink-0 flex-col bg-white px-6 py-7">
        <div className="flex items-center gap-3">
          <Mark size={34} className="text-[#0b1c33]" />
          <span className="text-[22px] font-bold" style={{ fontFamily: "var(--font-unbounded), Unbounded, sans-serif" }}>
            {SHOP}
          </span>
        </div>
        <p className="mt-8 text-[13px] uppercase tracking-[0.18em] text-[#6b7c93]">Savdo</p>
        <nav className="mt-3 space-y-1.5 text-[18px] font-medium">
          {nav.map((n) => (
            <div key={n} className={`rounded-xl px-4 py-2.5 ${n === active ? "bg-[#0b1c33] text-white" : "text-[#4d5d73]"}`}>
              {n}
            </div>
          ))}
        </nav>
        <div className="mt-auto rounded-2xl bg-[#eef2ff] p-4 text-[15px] text-[#4d5d73]">
          <p className="font-semibold text-[#0b1c33]">Doʼkon ochiq</p>
          bahor-market.uz · Telegram
        </div>
      </aside>
      <main className="flex-1 overflow-hidden p-9">{children}</main>
    </div>
  );
}

function Dashboard() {
  const kpis = [
    ["Bugungi buyurtmalar", "24", "+18%"],
    ["Bugungi savdo", "18,4 mln", "+9%"],
    ["Konversiya", "3,2%", "+0,4"],
    ["Yangi mijozlar", "41", "+12%"],
  ];
  const pts = [30, 42, 38, 55, 48, 66, 60, 74, 70, 86, 80, 92];
  const path = pts.map((v, i) => `${i === 0 ? "M" : "L"} ${i * 90} ${200 - v * 1.8}`).join(" ");
  return (
    <LaptopFrame active="Boshqaruv paneli">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[17px] text-[#6b7c93]">Xush kelibsiz, Dilnoza</p>
          <p className="text-[34px] font-bold" style={{ fontFamily: "var(--font-unbounded), Unbounded, sans-serif" }}>
            Boshqaruv paneli
          </p>
        </div>
        <div className="rounded-full bg-[#2563eb] px-6 py-3 text-[17px] font-semibold text-white">+ Mahsulot qoʼshish</div>
      </div>
      <div className="mt-7 grid grid-cols-4 gap-5">
        {kpis.map(([l, v, d]) => (
          <div key={l} className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-[15px] text-[#6b7c93]">{l}</p>
            <p className="mt-2 text-[34px] font-bold tracking-tight">{v}</p>
            <p className="mt-1 text-[15px] font-semibold text-[#16a34a]">{d}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-[1.6fr_1fr] gap-5">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-[18px] font-semibold">Savdo, oxirgi 12 kun</p>
            <p className="text-[15px] text-[#6b7c93]">soʼm</p>
          </div>
          <svg viewBox="0 0 990 220" className="mt-4 h-[260px] w-full">
            <defs>
              <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#2563eb" stopOpacity="0.35" />
                <stop offset="1" stopColor="#2563eb" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={`${path} L 990 220 L 0 220 Z`} fill="url(#g)" />
            <path d={path} fill="none" stroke="#2563eb" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
          </svg>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-[18px] font-semibold">Soʼnggi buyurtmalar</p>
          <div className="mt-4 space-y-3 text-[16px]">
            {[
              ["#1042", "JBL Charge 5 kolonkasi", "Kuryerda"],
              ["#1041", "Apple Watch Ultra 2 soati", "Yigʼilmoqda"],
              ["#1040", "SONY WH-1000XM5 quloqchini", "Yetkazildi"],
              ["#1039", "Apple Watch SE 3 soati", "Yangi"],
            ].map(([n, p, s]) => (
              <div key={n} className="flex items-center justify-between rounded-xl bg-[#f3f5f9] px-4 py-3">
                <span className="text-[#6b7c93]">{n}</span>
                <span className="font-semibold">{p}</span>
                <span className="rounded-full bg-[#dbeafe] px-3 py-1 text-[13px] font-semibold text-[#1d4ed8]">{s}</span>
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
    ["#1042", "Madina R.", "JBL Charge 5 kolonkasi", "Payme", "1 972 000", "Kuryerda", "#dbeafe", "#1d4ed8"],
    ["#1041", "Jasur T.", "Apple Watch Ultra 2 soati", "Click", "10 790 000", "Yig'ilmoqda", "#fef3c7", "#b45309"],
    ["#1040", "Nilufar A.", "SONY WH-1000XM5 quloqchini", "Uzcard", "3 520 000", "Yetkazildi", "#dcfce7", "#15803d"],
    ["#1039", "Sardor K.", "Apple Watch SE 3 soati", "Humo", "3 780 000", "Yangi", "#ede9fe", "#6d28d9"],
    ["#1038", "Kamola Y.", "Yandex Station Lite kolonkasi", "Payme", "840 000", "Yetkazildi", "#dcfce7", "#15803d"],
    ["#1037", "Bekzod M.", "Apple AirPods Max quloqchini", "Click", "6 961 500", "Kuryerda", "#dbeafe", "#1d4ed8"],
  ];
  return (
    <LaptopFrame active="Buyurtmalar">
      <div className="flex items-end justify-between">
        <p className="text-[34px] font-bold" style={{ fontFamily: "var(--font-unbounded), Unbounded, sans-serif" }}>
          Buyurtmalar
        </p>
        <div className="flex gap-2 text-[16px] font-semibold">
          {["Hammasi", "Yangi", "Kuryerda", "Yetkazildi"].map((f, i) => (
            <span key={f} className={`rounded-full px-4 py-2 ${i === 0 ? "bg-[#0b1c33] text-white" : "bg-white text-[#4d5d73]"}`}>
              {f}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-7 overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="grid grid-cols-[100px_1.1fr_1.6fr_110px_150px_140px] gap-4 border-b border-black/5 px-6 py-4 text-[14px] uppercase tracking-[0.12em] text-[#6b7c93]">
          <span>Raqam</span><span>Mijoz</span><span>Mahsulot</span><span>Toʼlov</span><span>Summa</span><span>Holat</span>
        </div>
        {rows.map(([n, c, p, pay, sum, st, bg, fg]) => (
          <div key={n} className="grid grid-cols-[100px_1.1fr_1.6fr_110px_150px_140px] items-center gap-4 border-b border-black/5 px-6 py-5 text-[17px]">
            <span className="text-[#6b7c93]">{n}</span>
            <span className="font-semibold">{c}</span>
            <span>{p}</span>
            <span className="font-semibold">{pay}</span>
            <span className="font-semibold">{sum}</span>
            <span className="justify-self-start rounded-full px-3 py-1 text-[14px] font-semibold" style={{ background: bg, color: fg }}>
              {st}
            </span>
          </div>
        ))}
      </div>
    </LaptopFrame>
  );
}

function Editor() {
  const s = SCREEN_SIZES.editor;
  return (
    <div
      style={{ width: s.w, height: s.h, fontFamily: "var(--font-manrope), Manrope, sans-serif" }}
      className="flex flex-col overflow-hidden bg-[#f3f5f9] p-10 text-[#0b1c33]"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[17px] text-[#6b7c93]">Mahsulotlar · tahrirlash</p>
          <p className="text-[34px] font-bold" style={{ fontFamily: "var(--font-unbounded), Unbounded, sans-serif" }}>
            JBL Charge 5 kolonkasi
          </p>
        </div>
        <div className="rounded-full bg-[#2563eb] px-6 py-3 text-[17px] font-semibold text-white">Saqlash</div>
      </div>
      <div className="mt-7 grid grid-cols-[1fr_1fr] gap-5">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-[16px] font-semibold text-[#6b7c93]">Nomi (RU)</p>
          </div>
          <p className="mt-2 rounded-xl bg-[#f3f5f9] px-4 py-3 text-[19px]">Колонка JBL Charge 5</p>
          <div className="mt-5 flex items-center justify-between">
            <p className="text-[16px] font-semibold text-[#6b7c93]">Nomi (UZ)</p>
            <span className="rounded-full bg-[#ede9fe] px-3 py-1 text-[14px] font-semibold text-[#6d28d9]">AI tarjima</span>
          </div>
          <p className="mt-2 rounded-xl bg-[#f3f5f9] px-4 py-3 text-[19px]">JBL Charge 5 kolonkasi</p>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-[16px] font-semibold text-[#6b7c93]">Rasmlar</p>
          {/* one real shot and an empty slot: the shop ships one photo per
              product, and inventing a second angle would be inventing data */}
          <div className="mt-3 grid grid-cols-3 gap-3">
            <Shot src="/shop/kolonka-jbl-charge-5.webp" className="aspect-square w-full ring-1 ring-black/5" />
            <div className="grid aspect-square place-items-center rounded-xl border-2 border-dashed border-black/15 text-[30px] text-[#6b7c93]">+</div>
          </div>
        </div>
      </div>
      <div className="mt-5 rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-[16px] font-semibold text-[#6b7c93]">Tavsif va SEO</p>
          <span className="rounded-full bg-[#ede9fe] px-3 py-1 text-[14px] font-semibold text-[#6d28d9]">SEO yaratish</span>
        </div>
        <p className="mt-3 text-[18px] leading-relaxed text-[#4d5d73]">
          40 W quvvat, 20 soatgacha ishlash, IP67 suv va changdan himoya, powerbank rejimi. Kafolat 12 oy, yetkazib berish butun Oʼzbekiston boʼylab.
        </p>
      </div>
      <div className="mt-5 rounded-2xl bg-white p-6 shadow-sm">
        <p className="text-[16px] font-semibold text-[#6b7c93]">Atributlar</p>
        <div className="mt-3 flex flex-wrap gap-2 text-[17px]">
          {["Quvvat: 40 W", "Ishlash: 20 soat", "Himoya: IP67", "Bluetooth: 5.1", "Rang: Qora"].map((a) => (
            <span key={a} className="rounded-full bg-[#f3f5f9] px-4 py-2">
              {a}
            </span>
          ))}
          <span className="rounded-full border border-dashed border-black/20 px-4 py-2 text-[#6b7c93]">+ AI aniqlash</span>
        </div>
      </div>
      <div className="mt-5 flex-1 rounded-2xl bg-white p-6 shadow-sm">
        <p className="text-[16px] font-semibold text-[#6b7c93]">Variantlar</p>
        <div className="mt-3 grid grid-cols-[1.4fr_1fr_1fr_1fr] gap-4 text-[16px] uppercase tracking-[0.1em] text-[#6b7c93]">
          <span>Variant</span><span>Narx</span><span>Ombor</span><span>Holat</span>
        </div>
        {[
          ["Kumush · 1,5 l", "3 490 000", "12", "Sotuvda"],
          ["Qora · 1,5 l", "3 490 000", "4", "Sotuvda"],
          ["Kumush · 2 l", "3 890 000", "0", "Tugagan"],
        ].map(([v, p, q, st]) => (
          <div key={v} className="mt-3 grid grid-cols-[1.4fr_1fr_1fr_1fr] gap-4 rounded-xl bg-[#f3f5f9] px-4 py-3 text-[18px]">
            <span className="font-semibold">{v}</span><span>{p}</span><span>{q}</span><span className={st === "Tugagan" ? "text-[#b91c1c]" : "text-[#15803d]"}>{st}</span>
          </div>
        ))}
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
