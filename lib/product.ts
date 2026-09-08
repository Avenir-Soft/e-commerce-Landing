import type { Lang } from "./languages";

/*
 * What the landing sells: Avenir Store, the e-commerce platform. The facts
 * below come from the E-COMMERCE repository (storefront, admin panel, AI
 * pipeline, payment and delivery settings, Telegram Mini App).
 */

/** One "moment" of the platform shown in the hero showroom, in carousel order. Ids match MODELS. */
export interface Moment {
  id: string;
  title: Record<Lang, string>;
  note: Record<Lang, string>;
  /** Transparent still of the device wearing this screen (public/renders). */
  render: string;
  /** Flat capture of the screen itself (public/screens). */
  screen: string;
}

export const moments: Moment[] = [
  {
    id: "phone-home",
    title: { uz: "Vitrina", ru: "Витрина", en: "Storefront" },
    note: { uz: "Mijoz ko'radigan do'kon", ru: "Магазин глазами покупателя", en: "The shop your customer sees" },
    render: "/renders/phone-home.webp",
    screen: "/screens/home.webp",
  },
  {
    id: "laptop-dashboard",
    title: { uz: "Boshqaruv paneli", ru: "Панель управления", en: "Admin panel" },
    note: { uz: "Egasi uchun", ru: "Для владельца", en: "For the owner" },
    render: "/renders/laptop-dashboard.webp",
    screen: "/screens/dashboard.webp",
  },
  {
    id: "tablet-editor",
    title: { uz: "AI bilan katalog", ru: "Каталог с ИИ", en: "Catalog with AI" },
    note: { uz: "Tarjima, SEO, atributlar", ru: "Перевод, SEO, атрибуты", en: "Translation, SEO, attributes" },
    render: "/renders/tablet-editor.webp",
    screen: "/screens/editor.webp",
  },
  {
    id: "phone-checkout",
    title: { uz: "Savat va to'lov", ru: "Корзина и оплата", en: "Cart and checkout" },
    note: { uz: "Click, Payme, Uzcard, Humo", ru: "Click, Payme, Uzcard, Humo", en: "Click, Payme, Uzcard, Humo" },
    render: "/renders/phone-checkout.webp",
    screen: "/screens/checkout.webp",
  },
  {
    id: "laptop-orders",
    title: { uz: "Buyurtmalar", ru: "Заказы", en: "Orders" },
    note: { uz: "Holatlar va kuryerlar", ru: "Статусы и курьеры", en: "Statuses and couriers" },
    render: "/renders/laptop-orders.webp",
    screen: "/screens/orders.webp",
  },
];

/** Modules of the platform, for the features bento. */
export interface Module {
  id: string;
  title: Record<Lang, string>;
  text: Record<Lang, string>;
  /** Still to show in the tile; null for text-only tiles. */
  render: string | null;
  /** Grid placement hint. */
  size: "wide" | "tall" | "small";
}

export const modules: Module[] = [
  {
    id: "storefront",
    title: { uz: "Mijoz uchun do'kon", ru: "Магазин для покупателя", en: "A shop for the customer" },
    text: {
      uz: "Kategoriyalar, qidiruv, mahsulot sahifasi, savat va checkout. Telefonda ham, kompyuterda ham tez.",
      ru: "Категории, поиск, страница товара, корзина и оформление. Быстро на телефоне и на компьютере.",
      en: "Categories, search, product page, cart and checkout. Fast on the phone and on the desktop.",
    },
    render: "/renders/phone-home.webp",
    size: "tall",
  },
  {
    id: "admin",
    title: { uz: "Egasi uchun panel", ru: "Панель для владельца", en: "A panel for the owner" },
    text: {
      uz: "Mahsulotlar, variantlar, buyurtmalar, mijozlar va sozlamalar — dasturchisiz boshqariladi.",
      ru: "Товары, варианты, заказы, клиенты и настройки — без программиста.",
      en: "Products, variants, orders, customers and settings, managed without a developer.",
    },
    render: "/renders/laptop-dashboard.webp",
    size: "wide",
  },
  {
    id: "payments",
    title: { uz: "O'zbekiston to'lovlari", ru: "Платежи Узбекистана", en: "Uzbekistan payments" },
    text: {
      uz: "Click, Payme, Uzcard va Humo ulangan. Qaysi usul ishlashini admin-paneldan yoqasiz.",
      ru: "Click, Payme, Uzcard и Humo подключены. Какие включить — решаете в панели.",
      en: "Click, Payme, Uzcard and Humo are wired in. You switch them on from the panel.",
    },
    render: "/renders/phone-checkout.webp",
    size: "small",
  },
  {
    id: "delivery",
    title: { uz: "Yetkazish zonalari", ru: "Зоны доставки", en: "Delivery zones" },
    text: {
      uz: "Ekspress va standart tariflar, zonalar bo'yicha narx, bepul yetkazish chegarasi, qaytarish muddati.",
      ru: "Экспресс и стандарт, цена по зонам, порог бесплатной доставки, срок возврата.",
      en: "Express and standard rates, zone pricing, a free-delivery threshold, a return window.",
    },
    render: null,
    size: "small",
  },
  {
    id: "ai",
    title: { uz: "AI bilan katalog", ru: "Каталог с ИИ", en: "Catalog with AI" },
    text: {
      uz: "Ruscha tavsif kiriting — o'zbekchasi, SEO matn va atributlar tayyor. Qidiruv ma'noni tushunadi.",
      ru: "Введите описание на русском — узбекский, SEO-текст и атрибуты готовы. Поиск понимает смысл.",
      en: "Enter a Russian description; the Uzbek one, the SEO text and the attributes are generated. Search understands meaning.",
    },
    render: "/renders/tablet-editor.webp",
    size: "wide",
  },
  {
    id: "telegram",
    title: { uz: "Telegram Mini App", ru: "Telegram Mini App", en: "Telegram Mini App" },
    text: {
      uz: "O'sha do'kon Telegram ichida ham ochiladi. Kirish telefon raqami bilan, parolsiz.",
      ru: "Тот же магазин открывается внутри Telegram. Вход по номеру телефона, без пароля.",
      en: "The same shop opens inside Telegram. Sign-in by phone number, no password.",
    },
    render: null,
    size: "small",
  },
];

/** Everything a merchant gets, for the checklist section. */
export const included: Record<Lang, string[]> = {
  uz: [
    "Katalog va kategoriyalar",
    "Variantlar: rang, o'lcham, xotira",
    "Atributlar va filtrlar",
    "Savat va checkout",
    "Click, Payme, Uzcard, Humo",
    "Yetkazish zonalari va tariflar",
    "Buyurtmalar va holatlar",
    "Mijozlar bazasi",
    "AI tarjima va SEO",
    "Semantik qidiruv",
    "Telegram Mini App",
    "O'zbek, rus va ingliz tili",
    "Oferta va maxfiylik sahifalari",
    "Brend: logotip, nom, ranglar",
  ],
  ru: [
    "Каталог и категории",
    "Варианты: цвет, размер, память",
    "Атрибуты и фильтры",
    "Корзина и оформление",
    "Click, Payme, Uzcard, Humo",
    "Зоны и тарифы доставки",
    "Заказы и статусы",
    "База клиентов",
    "ИИ-перевод и SEO",
    "Семантический поиск",
    "Telegram Mini App",
    "Узбекский, русский и английский",
    "Оферта и политика конфиденциальности",
    "Бренд: логотип, название, цвета",
  ],
  en: [
    "Catalog and categories",
    "Variants: colour, size, storage",
    "Attributes and filters",
    "Cart and checkout",
    "Click, Payme, Uzcard, Humo",
    "Delivery zones and rates",
    "Orders and statuses",
    "Customer base",
    "AI translation and SEO",
    "Semantic search",
    "Telegram Mini App",
    "Uzbek, Russian and English",
    "Offer and privacy pages",
    "Brand: logo, name, colours",
  ],
};

/** Demo goods for the search sample: a deliberately mixed shop. */
export interface DemoItem {
  id: string;
  name: Record<Lang, string>;
  category: Record<Lang, string>;
  spec: Record<Lang, string>;
  tags: Record<Lang, string[]>;
}

export const demoItems: DemoItem[] = [
  {
    id: "watch",
    name: { uz: "Smart soat S9", ru: "Смарт-часы S9", en: "Smart watch S9" },
    category: { uz: "Elektronika", ru: "Электроника", en: "Electronics" },
    spec: { uz: "42 mm, GPS", ru: "42 мм, GPS", en: "42 mm, GPS" },
    tags: {
      uz: ["soat", "smart", "sovg'a", "sport", "salomatlik", "yurak"],
      ru: ["часы", "смарт", "подарок", "спорт", "здоровье", "пульс"],
      en: ["watch", "smart", "gift", "sport", "health", "heart"],
    },
  },
  {
    id: "espresso",
    name: { uz: "Espresso mashinasi", ru: "Кофемашина эспрессо", en: "Espresso machine" },
    category: { uz: "Uy texnikasi", ru: "Техника для дома", en: "Home appliances" },
    spec: { uz: "19 bar, 1,5 l", ru: "19 бар, 1,5 л", en: "19 bar, 1.5 l" },
    tags: {
      uz: ["kofe", "kofe mashinasi", "uy", "ofis", "espresso", "sovg'a"],
      ru: ["кофе", "кофемашина", "дом", "офис", "эспрессо", "подарок"],
      en: ["coffee", "coffee machine", "home", "office", "espresso", "gift"],
    },
  },
  {
    id: "sneakers",
    name: { uz: "Sneakers Air Flow", ru: "Кроссовки Air Flow", en: "Air Flow sneakers" },
    category: { uz: "Poyabzal", ru: "Обувь", en: "Footwear" },
    spec: { uz: "36–45, oq", ru: "36–45, белые", en: "36–45, white" },
    tags: {
      uz: ["poyabzal", "krossovka", "sport", "yugurish", "yengil", "oq"],
      ru: ["обувь", "кроссовки", "спорт", "бег", "лёгкие", "белые"],
      en: ["shoes", "sneakers", "sport", "running", "light", "white"],
    },
  },
  {
    id: "dress",
    name: { uz: "Yozgi ko'ylak", ru: "Летнее платье", en: "Summer dress" },
    category: { uz: "Kiyim", ru: "Одежда", en: "Clothing" },
    spec: { uz: "S–XL, zig'ir", ru: "S–XL, лён", en: "S–XL, linen" },
    tags: {
      uz: ["ko'ylak", "yozgi", "kiyim", "ayollar", "zig'ir", "yengil"],
      ru: ["платье", "летнее", "одежда", "женское", "лён", "лёгкое"],
      en: ["dress", "summer", "clothing", "women", "linen", "light"],
    },
  },
  {
    id: "earbuds",
    name: { uz: "Simsiz quloqchin", ru: "Беспроводные наушники", en: "Wireless earbuds" },
    category: { uz: "Elektronika", ru: "Электроника", en: "Electronics" },
    spec: { uz: "Shovqin bekor qilish", ru: "Шумоподавление", en: "Noise cancelling" },
    tags: {
      uz: ["quloqchin", "arzon", "musiqa", "shovqin", "sport", "metro"],
      ru: ["наушники", "недорогие", "музыка", "шум", "спорт", "метро"],
      en: ["earbuds", "cheap", "music", "noise", "sport", "commute"],
    },
  },
  {
    id: "kids-tablet",
    name: { uz: "Bolalar planshet", ru: "Детский планшет", en: "Kids tablet" },
    category: { uz: "Elektronika", ru: "Электроника", en: "Electronics" },
    spec: { uz: "10\", himoya g'ilofi bilan", ru: "10\", с защитным чехлом", en: "10\", with a rugged case" },
    tags: {
      uz: ["planshet", "bola", "bolalar", "maktab", "o'yin", "multfilm"],
      ru: ["планшет", "ребёнок", "детский", "школа", "игры", "мультики"],
      en: ["tablet", "kid", "kids", "school", "games", "cartoons"],
    },
  },
  {
    id: "perfume",
    name: { uz: "Parfyum Oud 50 ml", ru: "Парфюм Oud 50 мл", en: "Oud perfume 50 ml" },
    category: { uz: "Go'zallik", ru: "Красота", en: "Beauty" },
    spec: { uz: "Eau de parfum", ru: "Eau de parfum", en: "Eau de parfum" },
    tags: {
      uz: ["parfyum", "atir", "sovg'a", "go'zallik", "erkaklar", "ayollar"],
      ru: ["парфюм", "духи", "подарок", "красота", "мужской", "женский"],
      en: ["perfume", "fragrance", "gift", "beauty", "men", "women"],
    },
  },
  {
    id: "yoga",
    name: { uz: "Yoga to'plami", ru: "Набор для йоги", en: "Yoga set" },
    category: { uz: "Sport", ru: "Спорт", en: "Sport" },
    spec: { uz: "Gilam, blok, tasma", ru: "Коврик, блок, ремень", en: "Mat, block, strap" },
    tags: {
      uz: ["yoga", "sport", "gilam", "uy", "mashq", "fitnes"],
      ru: ["йога", "спорт", "коврик", "дом", "тренировка", "фитнес"],
      en: ["yoga", "sport", "mat", "home", "workout", "fitness"],
    },
  },
  {
    id: "scarf",
    name: { uz: "Silk sharf", ru: "Шёлковый шарф", en: "Silk scarf" },
    category: { uz: "Aksessuarlar", ru: "Аксессуары", en: "Accessories" },
    spec: { uz: "90×90, ipak", ru: "90×90, шёлк", en: "90×90, silk" },
    tags: {
      uz: ["sharf", "ipak", "sovg'a", "ayollar", "aksessuar", "bahor"],
      ru: ["шарф", "шёлк", "подарок", "женский", "аксессуар", "весна"],
      en: ["scarf", "silk", "gift", "women", "accessory", "spring"],
    },
  },
  {
    id: "vacuum",
    name: { uz: "Robot-changyutgich", ru: "Робот-пылесос", en: "Robot vacuum" },
    category: { uz: "Uy texnikasi", ru: "Техника для дома", en: "Home appliances" },
    spec: { uz: "Nam tozalash bilan", ru: "С влажной уборкой", en: "With mopping" },
    tags: {
      uz: ["changyutgich", "robot", "uy", "tozalash", "sovg'a", "avtomat"],
      ru: ["пылесос", "робот", "дом", "уборка", "подарок", "автомат"],
      en: ["vacuum", "robot", "home", "cleaning", "gift", "automatic"],
    },
  },
];
