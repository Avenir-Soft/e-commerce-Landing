import type { Lang } from "./languages";

// Names and "from" prices reflect the Tashkent market on 2026-09-07 (source: the
// Shopify JSON feed of macbro.uz, the same feed E-COMMERCE/backend/scripts/seed_macbro.py
// imports from). Prices are in UZS. Replace with the store's own catalog before launch.

export type CategoryId = "iphone" | "mac" | "ipad" | "watch" | "airpods";

export interface Category {
  id: CategoryId;
  name: string;
  models: Record<Lang, string>;
  from: number;
  /** Position on the showroom ring and in the lineup section. */
  order: number;
}

export interface Product {
  id: string;
  category: CategoryId;
  name: string;
  spec: Record<Lang, string>;
  price: number;
  featured?: boolean;
  /** Keywords the search demo matches against, per language. */
  tags: Record<Lang, string[]>;
}

export const categories: Category[] = [
  {
    id: "iphone",
    name: "iPhone",
    models: {
      uz: "iPhone 17, Air, 17 Pro, 17 Pro Max va 16-seriya",
      ru: "iPhone 17, Air, 17 Pro, 17 Pro Max и серия 16",
      en: "iPhone 17, Air, 17 Pro, 17 Pro Max and the 16 series",
    },
    from: 10_734_000,
    order: 0,
  },
  {
    id: "mac",
    name: "MacBook",
    models: {
      uz: "Air M5, Pro 14 va 16 (M5, M5 Pro, M5 Max)",
      ru: "Air M5, Pro 14 и 16 (M5, M5 Pro, M5 Max)",
      en: "Air M5, Pro 14 and 16 (M5, M5 Pro, M5 Max)",
    },
    from: 9_792_000,
    order: 1,
  },
  {
    id: "ipad",
    name: "iPad",
    models: {
      uz: "iPad A16, Air M4, Pro M5",
      ru: "iPad A16, Air M4, Pro M5",
      en: "iPad A16, Air M4, Pro M5",
    },
    from: 6_296_000,
    order: 2,
  },
  {
    id: "watch",
    name: "Apple Watch",
    models: {
      uz: "SE 2, Series 11, Ultra 3",
      ru: "SE 2, Series 11, Ultra 3",
      en: "SE 2, Series 11, Ultra 3",
    },
    from: 3_386_000,
    order: 3,
  },
  {
    id: "airpods",
    name: "AirPods",
    models: {
      uz: "AirPods 4, Pro 3, Max 2",
      ru: "AirPods 4, Pro 3, Max 2",
      en: "AirPods 4, Pro 3, Max 2",
    },
    from: 1_785_000,
    order: 4,
  },
];

export const products: Product[] = [
  {
    id: "iphone-17-pro-max",
    category: "iphone",
    name: "iPhone 17 Pro Max",
    spec: { uz: "256 GB, titan", ru: "256 ГБ, титан", en: "256 GB, titanium" },
    price: 17_690_000,
    featured: true,
    tags: {
      uz: ["kamera", "yaxshi kamera", "flagman", "eng kuchli", "katta ekran", "batareya", "video"],
      ru: ["камера", "хорошая камера", "флагман", "самый мощный", "большой экран", "батарея", "видео"],
      en: ["camera", "best camera", "flagship", "most powerful", "big screen", "battery", "video"],
    },
  },
  {
    id: "iphone-17-pro",
    category: "iphone",
    name: "iPhone 17 Pro",
    spec: { uz: "256 GB, titan", ru: "256 ГБ, титан", en: "256 GB, titanium" },
    price: 16_350_000,
    featured: true,
    tags: {
      uz: ["kamera", "yaxshi kamera", "flagman", "video", "pro"],
      ru: ["камера", "хорошая камера", "флагман", "видео", "про"],
      en: ["camera", "best camera", "flagship", "video", "pro"],
    },
  },
  {
    id: "iphone-air",
    category: "iphone",
    name: "iPhone Air",
    spec: { uz: "256 GB, eng yupqa", ru: "256 ГБ, самый тонкий", en: "256 GB, thinnest ever" },
    price: 12_990_000,
    featured: true,
    tags: {
      uz: ["yupqa", "yengil", "chiroyli", "dizayn"],
      ru: ["тонкий", "лёгкий", "красивый", "дизайн"],
      en: ["thin", "light", "beautiful", "design"],
    },
  },
  {
    id: "iphone-17",
    category: "iphone",
    name: "iPhone 17",
    spec: { uz: "256 GB", ru: "256 ГБ", en: "256 GB" },
    price: 11_990_000,
    tags: {
      uz: ["arzon", "hamyonbop", "oddiy", "yangi"],
      ru: ["недорогой", "доступный", "простой", "новый"],
      en: ["affordable", "budget", "simple", "new"],
    },
  },
  {
    id: "iphone-17e",
    category: "iphone",
    name: "iPhone 17e",
    spec: { uz: "128 GB", ru: "128 ГБ", en: "128 GB" },
    price: 10_734_000,
    tags: {
      uz: ["arzon", "eng arzon", "hamyonbop", "talaba"],
      ru: ["недорогой", "самый дешёвый", "доступный", "студент"],
      en: ["cheap", "cheapest", "budget", "student"],
    },
  },
  {
    id: "macbook-air-13-m5",
    category: "mac",
    name: "MacBook Air 13 M5",
    spec: { uz: "16 GB, 256 GB SSD", ru: "16 ГБ, 256 ГБ SSD", en: "16 GB, 256 GB SSD" },
    price: 19_200_000,
    featured: true,
    tags: {
      uz: ["noutbuk", "yengil", "talaba", "o'qish", "ish", "batareya", "ofis"],
      ru: ["ноутбук", "лёгкий", "студент", "учёба", "работа", "батарея", "офис"],
      en: ["laptop", "light", "student", "study", "work", "battery", "office"],
    },
  },
  {
    id: "macbook-air-13-m1",
    category: "mac",
    name: "MacBook Air 13 M1",
    spec: { uz: "8 GB, 256 GB SSD", ru: "8 ГБ, 256 ГБ SSD", en: "8 GB, 256 GB SSD" },
    price: 9_792_000,
    tags: {
      uz: ["noutbuk", "arzon", "talaba", "o'qish", "hamyonbop"],
      ru: ["ноутбук", "недорогой", "студент", "учёба", "доступный"],
      en: ["laptop", "cheap", "student", "study", "budget"],
    },
  },
  {
    id: "macbook-pro-14-m5",
    category: "mac",
    name: "MacBook Pro 14 M5",
    spec: { uz: "16 GB, 512 GB SSD", ru: "16 ГБ, 512 ГБ SSD", en: "16 GB, 512 GB SSD" },
    price: 24_550_000,
    tags: {
      uz: ["noutbuk", "montaj", "dizayner", "dasturchi", "kuchli", "video"],
      ru: ["ноутбук", "монтаж", "дизайнер", "программист", "мощный", "видео"],
      en: ["laptop", "editing", "designer", "developer", "powerful", "video"],
    },
  },
  {
    id: "ipad-pro-11-m5",
    category: "ipad",
    name: "iPad Pro 11 M5",
    spec: { uz: "256 GB, Wi-Fi", ru: "256 ГБ, Wi-Fi", en: "256 GB, Wi-Fi" },
    price: 14_860_000,
    featured: true,
    tags: {
      uz: ["planshet", "chizish", "dizayner", "rassom", "pencil", "kuchli"],
      ru: ["планшет", "рисование", "дизайнер", "художник", "pencil", "мощный"],
      en: ["tablet", "drawing", "designer", "artist", "pencil", "powerful"],
    },
  },
  {
    id: "ipad-air-11-m4",
    category: "ipad",
    name: "iPad Air 11 M4",
    spec: { uz: "128 GB, Wi-Fi", ru: "128 ГБ, Wi-Fi", en: "128 GB, Wi-Fi" },
    price: 8_585_000,
    tags: {
      uz: ["planshet", "chizish", "o'qish", "talaba", "kino"],
      ru: ["планшет", "рисование", "учёба", "студент", "кино"],
      en: ["tablet", "drawing", "study", "student", "movies"],
    },
  },
  {
    id: "ipad-a16",
    category: "ipad",
    name: "iPad A16",
    spec: { uz: "128 GB, Wi-Fi", ru: "128 ГБ, Wi-Fi", en: "128 GB, Wi-Fi" },
    price: 6_296_000,
    tags: {
      uz: ["planshet", "arzon", "bola", "maktab", "kino", "hamyonbop"],
      ru: ["планшет", "недорогой", "ребёнок", "школа", "кино", "доступный"],
      en: ["tablet", "cheap", "kid", "school", "movies", "budget"],
    },
  },
  {
    id: "watch-ultra-3",
    category: "watch",
    name: "Apple Watch Ultra 3",
    spec: { uz: "49 mm, titan", ru: "49 мм, титан", en: "49 mm, titanium" },
    price: 13_520_000,
    featured: true,
    tags: {
      uz: ["soat", "sport", "tog'", "suzish", "batareya", "mustahkam"],
      ru: ["часы", "спорт", "горы", "плавание", "батарея", "прочные"],
      en: ["watch", "sport", "hiking", "swimming", "battery", "rugged"],
    },
  },
  {
    id: "watch-series-11",
    category: "watch",
    name: "Apple Watch Series 11",
    spec: { uz: "42 mm, alyuminiy", ru: "42 мм, алюминий", en: "42 mm, aluminium" },
    price: 4_990_000,
    tags: {
      uz: ["soat", "sport", "salomatlik", "yurak", "uyqu", "sovg'a"],
      ru: ["часы", "спорт", "здоровье", "пульс", "сон", "подарок"],
      en: ["watch", "sport", "health", "heart", "sleep", "gift"],
    },
  },
  {
    id: "watch-se-2",
    category: "watch",
    name: "Apple Watch SE 2",
    spec: { uz: "40 mm, alyuminiy", ru: "40 мм, алюминий", en: "40 mm, aluminium" },
    price: 3_386_000,
    tags: {
      uz: ["soat", "arzon", "sovg'a", "bola", "hamyonbop"],
      ru: ["часы", "недорогие", "подарок", "ребёнок", "доступные"],
      en: ["watch", "cheap", "gift", "kid", "budget"],
    },
  },
  {
    id: "airpods-pro-3",
    category: "airpods",
    name: "AirPods Pro 3",
    spec: { uz: "shovqin bekor qilish", ru: "шумоподавление", en: "noise cancelling" },
    price: 3_250_000,
    featured: true,
    tags: {
      uz: ["quloqchin", "shovqin", "shovqinni o'chiradigan", "metro", "sport", "musiqa"],
      ru: ["наушники", "шум", "шумоподавление", "метро", "спорт", "музыка"],
      en: ["earbuds", "noise", "noise cancelling", "commute", "sport", "music"],
    },
  },
  {
    id: "airpods-4",
    category: "airpods",
    name: "AirPods 4",
    spec: { uz: "ochiq dizayn", ru: "открытый дизайн", en: "open design" },
    price: 1_785_000,
    tags: {
      uz: ["quloqchin", "arzon", "musiqa", "qo'ng'iroq", "hamyonbop", "sovg'a"],
      ru: ["наушники", "недорогие", "музыка", "звонки", "доступные", "подарок"],
      en: ["earbuds", "cheap", "music", "calls", "budget", "gift"],
    },
  },
  {
    id: "airpods-max-2",
    category: "airpods",
    name: "AirPods Max 2",
    spec: { uz: "katta, ustidan", ru: "полноразмерные", en: "over-ear" },
    price: 6_751_000,
    tags: {
      uz: ["quloqchin", "katta", "studiya", "musiqa", "shovqin"],
      ru: ["наушники", "большие", "студия", "музыка", "шум"],
      en: ["headphones", "over-ear", "studio", "music", "noise"],
    },
  },
];

export const featuredProducts = products.filter((p) => p.featured);

/** One representative per category for the showroom ring, in ring order. */
export const showroomItems: { category: CategoryId; product: Product }[] = [
  "iphone-17-pro",
  "macbook-air-13-m5",
  "ipad-pro-11-m5",
  "watch-ultra-3",
  "airpods-pro-3",
].map((id) => {
  const product = products.find((p) => p.id === id)!;
  return { category: product.category, product };
});
