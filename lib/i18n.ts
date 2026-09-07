// Server-only: import from server components and pass the dictionary down as a prop.
// Importing this file from a 'use client' module would ship all three languages to the browser.
import type { Lang } from "./languages";
import { site } from "./site";

export interface Dictionary {
  meta: { title: string; description: string };
  nav: {
    catalog: string;
    delivery: string;
    payment: string;
    faq: string;
    open: string;
    menu: string;
    close: string;
    language: string;
  };
  loader: { loading: string; skip: string };
  hero: {
    tagline: string;
    /** Headline lines, one string per line so every break is controlled. */
    title: string[];
    lead: string;
    primary: string;
    secondary: string;
    scroll: string;
    look: string;
    /** Short line under the carousel label, e.g. "3 of 5". */
    counter: string;
  };
  marquee: { prefix: string };
  lineup: { eyebrow: string; heading: string; lead: string; open: string; all: string; allLead: string };
  spotlight: {
    eyebrow: string;
    heading: string;
    beats: { title: string; text: string; points: string[]; note: string }[];
  };
  arrivals: { eyebrow: string; heading: string; lead: string; open: string; all: string };
  why: {
    eyebrow: string;
    heading: string;
    original: { title: string; text: string };
    delivery: { figure: string; unit: string; title: string; text: string };
    payments: { title: string; text: string };
    returns: { figure: string; unit: string; title: string; text: string };
    support: { title: string; text: string };
  };
  search: {
    eyebrow: string;
    heading: string;
    lead: string;
    placeholder: string;
    examples: string[];
    found: string;
    empty: string;
    hint: string;
  };
  steps: {
    eyebrow: string;
    heading: string;
    lead: string;
    items: { title: string; text: string }[];
    phone: { greeting: string; sub: string; button: string; search: string };
  };
  faq: { eyebrow: string; heading: string; hint: string; items: { q: string; a: string }[] };
  cta: { eyebrow: string; heading: string; lead: string; button: string };
  footer: { tagline: string; offer: string; privacy: string; contacts: string; madeBy: string; credits: string };
}

const uz: Dictionary = {
  meta: {
    title: "Avenir Store — Toshkentdagi Apple do'koni",
    description:
      "iPhone, MacBook, iPad, Apple Watch va AirPods. Tanlang, Click yoki Payme bilan to'lang, Toshkent bo'ylab 1–2 kunda yetkazib beramiz.",
  },
  nav: {
    catalog: "Katalog",
    delivery: "Yetkazib berish",
    payment: "To'lov",
    faq: "Savollar",
    open: "Do'konga o'tish",
    menu: "Menyu",
    close: "Yopish",
    language: "Til",
  },
  loader: { loading: "Yuklanmoqda", skip: "O'tkazib yuborish" },
  hero: {
    tagline: "Toshkentdagi Apple do'koni",
    title: ["iPhone'dan MacBook'gacha.", "Hammasi bitta do'konda."],
    lead: `Tanlang, Click yoki Payme bilan to'lang, ${site.delivery.expressDays} kunda qo'lingizda. Original texnika, kafolat bilan.`,
    primary: "Do'konga o'tish",
    secondary: "Katalogni ko'rish",
    scroll: "Aylantiring",
    look: "Ko'rish",
    counter: "{n} / {total}",
  },
  marquee: { prefix: "Hozir sotuvda" },
  lineup: {
    eyebrow: "Katalog",
    heading: "Butun Apple qatori.",
    lead: "Do'kondagi beshta bo'lim. Har birida yangi modellar, ranglar va xotira variantlari.",
    open: "Ko'rish",
    all: "Butun katalog",
    allLead: "Do'konda barcha modellar, ranglar va to'plamlar.",
  },
  spotlight: {
    eyebrow: "Vitrina",
    heading: "Yaqindan qarang.",
    beats: [
      {
        title: "iPhone 17 Pro",
        text: "Eng kuchli iPhone. Uchta 48 MP kamera, A19 Pro chip va kun bo'yi yetadigan batareya.",
        points: ["A19 Pro chip", "48 MP kameralar", "Kun bo'yi batareya"],
        note: "Titan va alyuminiy ranglarida",
      },
      {
        title: "MacBook Air M5",
        text: "Yupqa, jim va tez. Bir zaryadda butun ish kuni, sumkada sezilmaydigan og'irlik.",
        points: ["M5 chip", "18 soatgacha batareya", "Fansiz, jim"],
        note: "13 va 15 dyuym",
      },
      {
        title: "Apple Watch Ultra 3",
        text: "Tog', suv va shahar uchun bitta soat. Titan korpus, eng yorug' ekran va ikki kunlik batareya.",
        points: ["Titan korpus", "42 soatgacha batareya", "100 m suvga chidamli"],
        note: "49 mm",
      },
    ],
  },
  arrivals: {
    eyebrow: "Yangi kelganlar",
    heading: "Hozir ko'p so'raladiganlar.",
    lead: "Bu haftaning eng ommabop qurilmalari. Narx va to'liq tavsif do'konda.",
    open: "Ko'rish",
    all: "Butun katalogni ochish",
  },
  why: {
    eyebrow: "Nega Avenir Store",
    heading: "Do'kon qanday ishlaydi.",
    original: {
      title: "Faqat original Apple",
      text: "Har bir qurilma seriya raqami bilan keladi, uni Apple saytida tekshirishingiz mumkin. Kafolat bilan sotamiz.",
    },
    delivery: {
      figure: site.delivery.expressDays,
      unit: "kun",
      title: `${site.city} bo'ylab yetkazamiz`,
      text: `Ekspress ${site.delivery.expressDays} kun, viloyatlarga ${site.delivery.standardDays} kun. Kuryer eshikkacha olib keladi.`,
    },
    payments: {
      title: "To'lov — o'zingizga qulay usulda",
      text: "Do'konda onlayn to'laysiz. Karta ma'lumotlari bizda saqlanmaydi.",
    },
    returns: {
      figure: String(site.returnDays),
      unit: "ish kuni",
      title: "Qaytarish uchun vaqt",
      text: "Qurilma ishlatilmagan va to'plam to'liq bo'lsa, pulni qaytaramiz.",
    },
    support: {
      title: "Yordam do'kon ichida",
      text: "Buyurtma, kafolat yoki almashtirish bo'yicha savollarga do'konda javob beramiz.",
    },
  },
  search: {
    eyebrow: "Qidiruv",
    heading: "Qidiruv gapingizni tushunadi.",
    lead: "Model nomini bilish shart emas. «Yaxshi kamerali iPhone» yoki «talaba uchun yengil noutbuk» deb yozing — do'kon o'zi mos qurilmalarni topadi.",
    placeholder: "Nima kerak? Oddiy so'z bilan yozing",
    examples: [
      "yaxshi kamerali iphone",
      "talaba uchun yengil noutbuk",
      "shovqinni o'chiradigan quloqchin",
      "chizish uchun planshet",
      "sport uchun soat",
      "eng arzon iphone",
    ],
    found: "Topildi",
    empty: "Hozircha topilmadi — boshqacha yozib ko'ring, masalan «arzon planshet».",
    hint: "Bu shu qidiruvning kichik namunasi. Do'konda u butun katalog bo'ylab ishlaydi.",
  },
  steps: {
    eyebrow: "Qanday ishlaydi",
    heading: "Uch qadam.",
    lead: "Ro'yxatdan o'tish uzun anketasiz, ilova o'rnatmasdan. Do'kon brauzerda ochiladi.",
    items: [
      {
        title: "Do'konni oching",
        text: "Telefon raqamingiz bilan kiring — parol o'ylab topish shart emas.",
      },
      {
        title: "Tanlang va to'lang",
        text: "Rang, xotira, to'plam. Click, Payme, Uzcard yoki Humo bilan onlayn to'lang.",
      },
      {
        title: "Qabul qiling",
        text: `Kuryer ${site.city} bo'ylab ${site.delivery.expressDays} kunda, viloyatlarga ${site.delivery.standardDays} kunda yetkazadi.`,
      },
    ],
    phone: {
      greeting: "Avenir Store'ga xush kelibsiz",
      sub: "Premium elektronika",
      button: "Katalogni ko'rish",
      search: "yaxshi kamerali iphone",
    },
  },
  faq: {
    eyebrow: "Savollar",
    heading: "Ko'p so'raladigan savollar.",
    hint: "Savol ustiga olib boring",
    items: [
      {
        q: "Texnika original va yangi ekaniga qanday ishonaman?",
        a: "Har bir qurilma seriya raqami bilan keladi — uni Apple saytida tekshirishingiz mumkin. Ishlatilgan (B/U) qurilmalar katalogda alohida belgilanadi va yangi sifatida sotilmaydi.",
      },
      {
        q: "Qaysi to'lov usullari bor?",
        a: "Click, Payme, Uzcard va Humo. To'lov do'konda onlayn, buyurtma tasdiqlangandan keyin amalga oshiriladi.",
      },
      {
        q: "Yetkazib berish qancha vaqt oladi va qancha turadi?",
        a: `${site.city} bo'ylab ekspress ${site.delivery.expressDays} ish kuni, standart ${site.delivery.standardDays} ish kuni. Narx buyurtma rasmiylashtirilayotganda, manzilga qarab ko'rsatiladi.`,
      },
      {
        q: "Qaytarish mumkinmi?",
        a: `Ha, ${site.returnDays} ish kuni ichida — agar qurilma ishlatilmagan, plyonkasi olinmagan va to'plam to'liq bo'lsa.`,
      },
      {
        q: "Buyurtma qanday beriladi?",
        a: "Do'konga telefon raqamingiz bilan kirasiz, mahsulotni savatga qo'shasiz, manzil va to'lov usulini tanlaysiz. Tasdiqlashdan keyin kuryer siz bilan bog'lanadi.",
      },
      {
        q: "Kafolat qanday?",
        a: "Kafolat muddati va shartlari har bir mahsulot sahifasida ko'rsatiladi. Kafolat holatlari bo'yicha do'kon orqali murojaat qilasiz.",
      },
    ],
  },
  cta: {
    eyebrow: "Xush kelibsiz",
    heading: "Do'kon ochiq.",
    lead: "Katalog, ranglar va to'lov — hammasi bir joyda. Kiring, tanlang, qolganini biz qilamiz.",
    button: "Do'konga o'tish",
  },
  footer: {
    tagline: "Apple texnikasi do'koni.",
    offer: "Ommaviy oferta",
    privacy: "Maxfiylik siyosati",
    contacts: "Aloqa",
    madeBy: "Avenir Soft loyihasi",
    credits: "3D modellar",
  },
};

const ru: Dictionary = {
  meta: {
    title: "Avenir Store — магазин Apple в Ташкенте",
    description:
      "iPhone, MacBook, iPad, Apple Watch и AirPods. Выбирайте, платите через Click или Payme, доставка по Ташкенту за 1–2 дня.",
  },
  nav: {
    catalog: "Каталог",
    delivery: "Доставка",
    payment: "Оплата",
    faq: "Вопросы",
    open: "В магазин",
    menu: "Меню",
    close: "Закрыть",
    language: "Язык",
  },
  loader: { loading: "Загрузка", skip: "Пропустить" },
  hero: {
    tagline: "Магазин Apple в Ташкенте",
    title: ["От iPhone до MacBook.", "Всё в одном магазине."],
    lead: `Выбирайте, платите через Click или Payme, получайте за ${site.delivery.expressDays} дня. Оригинальная техника, с гарантией.`,
    primary: "Перейти в магазин",
    secondary: "Смотреть каталог",
    scroll: "Листайте",
    look: "Смотреть",
    counter: "{n} / {total}",
  },
  marquee: { prefix: "Сейчас в продаже" },
  lineup: {
    eyebrow: "Каталог",
    heading: "Вся линейка Apple.",
    lead: "Пять разделов магазина. В каждом — новые модели, цвета и варианты памяти.",
    open: "Смотреть",
    all: "Весь каталог",
    allLead: "Все модели, цвета и комплекты — в магазине.",
  },
  spotlight: {
    eyebrow: "Витрина",
    heading: "Рассмотрите поближе.",
    beats: [
      {
        title: "iPhone 17 Pro",
        text: "Самый мощный iPhone. Три камеры по 48 МП, чип A19 Pro и батарея на весь день.",
        points: ["Чип A19 Pro", "Камеры 48 МП", "Батарея на весь день"],
        note: "В титановых и алюминиевых цветах",
      },
      {
        title: "MacBook Air M5",
        text: "Тонкий, тихий и быстрый. Полный рабочий день на одном заряде и вес, который не замечаешь в сумке.",
        points: ["Чип M5", "До 18 часов батареи", "Без вентилятора"],
        note: "13 и 15 дюймов",
      },
      {
        title: "Apple Watch Ultra 3",
        text: "Одни часы для гор, воды и города. Титановый корпус, самый яркий экран и батарея на два дня.",
        points: ["Титановый корпус", "До 42 часов батареи", "Водостойкость 100 м"],
        note: "49 мм",
      },
    ],
  },
  arrivals: {
    eyebrow: "Новинки",
    heading: "Чаще всего спрашивают.",
    lead: "Самые популярные устройства этой недели. Цена и полное описание — в магазине.",
    open: "Смотреть",
    all: "Открыть весь каталог",
  },
  why: {
    eyebrow: "Почему Avenir Store",
    heading: "Как работает магазин.",
    original: {
      title: "Только оригинальный Apple",
      text: "Каждое устройство приходит с серийным номером, его можно проверить на сайте Apple. Продаём с гарантией.",
    },
    delivery: {
      figure: site.delivery.expressDays,
      unit: "дня",
      title: "Доставка по Ташкенту",
      text: `Экспресс ${site.delivery.expressDays} дня, в регионы ${site.delivery.standardDays} дней. Курьер привозит до двери.`,
    },
    payments: {
      title: "Оплата — как вам удобно",
      text: "Платите онлайн в магазине. Данные карты у нас не хранятся.",
    },
    returns: {
      figure: String(site.returnDays),
      unit: "рабочих дня",
      title: "Время на возврат",
      text: "Если устройство не использовалось и комплект полный — вернём деньги.",
    },
    support: {
      title: "Поддержка внутри магазина",
      text: "На вопросы о заказе, гарантии или обмене отвечаем в магазине.",
    },
  },
  search: {
    eyebrow: "Поиск",
    heading: "Поиск понимает обычные слова.",
    lead: "Не нужно знать название модели. Напишите «iPhone с хорошей камерой» или «лёгкий ноутбук для студента» — магазин сам подберёт устройства.",
    placeholder: "Что нужно? Напишите простыми словами",
    examples: [
      "айфон с хорошей камерой",
      "лёгкий ноутбук для студента",
      "наушники с шумоподавлением",
      "планшет для рисования",
      "часы для спорта",
      "самый дешёвый айфон",
    ],
    found: "Найдено",
    empty: "Пока ничего — попробуйте иначе, например «недорогой планшет».",
    hint: "Это маленький образец того же поиска. В магазине он работает по всему каталогу.",
  },
  steps: {
    eyebrow: "Как это работает",
    heading: "Три шага.",
    lead: "Без длинных анкет и установки приложений. Магазин открывается в браузере.",
    items: [
      {
        title: "Откройте магазин",
        text: "Войдите по номеру телефона — придумывать пароль не нужно.",
      },
      {
        title: "Выберите и оплатите",
        text: "Цвет, память, комплект. Оплатите онлайн через Click, Payme, Uzcard или Humo.",
      },
      {
        title: "Получите",
        text: `Курьер привезёт по Ташкенту за ${site.delivery.expressDays} дня, в регионы — за ${site.delivery.standardDays} дней.`,
      },
    ],
    phone: {
      greeting: "Добро пожаловать в Avenir Store",
      sub: "Премиум электроника",
      button: "Смотреть каталог",
      search: "айфон с хорошей камерой",
    },
  },
  faq: {
    eyebrow: "Вопросы",
    heading: "Частые вопросы.",
    hint: "Наведите на вопрос",
    items: [
      {
        q: "Как убедиться, что техника оригинальная и новая?",
        a: "Каждое устройство приходит с серийным номером — его можно проверить на сайте Apple. Б/У устройства помечены в каталоге отдельно и не продаются как новые.",
      },
      {
        q: "Какие способы оплаты есть?",
        a: "Click, Payme, Uzcard и Humo. Оплата проходит онлайн в магазине после подтверждения заказа.",
      },
      {
        q: "Сколько занимает и стоит доставка?",
        a: `По Ташкенту экспресс ${site.delivery.expressDays} рабочих дня, стандарт ${site.delivery.standardDays} рабочих дней. Стоимость показывается при оформлении, в зависимости от адреса.`,
      },
      {
        q: "Можно вернуть?",
        a: `Да, в течение ${site.returnDays} рабочих дней — если устройство не использовалось, плёнки на месте и комплект полный.`,
      },
      {
        q: "Как оформить заказ?",
        a: "Войдите в магазин по номеру телефона, добавьте товар в корзину, укажите адрес и способ оплаты. После подтверждения с вами свяжется курьер.",
      },
      {
        q: "Какая гарантия?",
        a: "Срок и условия гарантии указаны на странице каждого товара. По гарантийным случаям обращайтесь через магазин.",
      },
    ],
  },
  cta: {
    eyebrow: "Добро пожаловать",
    heading: "Магазин открыт.",
    lead: "Каталог, цвета и оплата — в одном месте. Заходите, выбирайте, остальное сделаем мы.",
    button: "Перейти в магазин",
  },
  footer: {
    tagline: "Магазин техники Apple.",
    offer: "Публичная оферта",
    privacy: "Политика конфиденциальности",
    contacts: "Контакты",
    madeBy: "Проект Avenir Soft",
    credits: "3D-модели",
  },
};

const en: Dictionary = {
  meta: {
    title: "Avenir Store — Apple store in Tashkent",
    description:
      "iPhone, MacBook, iPad, Apple Watch and AirPods. Choose, pay with Click or Payme, delivered across Tashkent in 1–2 days.",
  },
  nav: {
    catalog: "Catalog",
    delivery: "Delivery",
    payment: "Payment",
    faq: "Questions",
    open: "Go to the store",
    menu: "Menu",
    close: "Close",
    language: "Language",
  },
  loader: { loading: "Loading", skip: "Skip" },
  hero: {
    tagline: "The Apple store in Tashkent",
    title: ["From iPhone to MacBook.", "All in one store."],
    lead: `Choose, pay with Click or Payme, and have it in ${site.delivery.expressDays} days. Genuine devices, with a warranty.`,
    primary: "Go to the store",
    secondary: "Browse the catalog",
    scroll: "Scroll",
    look: "View",
    counter: "{n} of {total}",
  },
  marquee: { prefix: "In stock now" },
  lineup: {
    eyebrow: "Catalog",
    heading: "The whole Apple lineup.",
    lead: "The store's five sections. Each with the new models, colours and storage options.",
    open: "View",
    all: "Full catalog",
    allLead: "Every model, colour and bundle is in the store.",
  },
  spotlight: {
    eyebrow: "Showcase",
    heading: "Take a closer look.",
    beats: [
      {
        title: "iPhone 17 Pro",
        text: "The most capable iPhone. Three 48 MP cameras, the A19 Pro chip and a battery that lasts the day.",
        points: ["A19 Pro chip", "48 MP cameras", "All-day battery"],
        note: "In titanium and aluminium colours",
      },
      {
        title: "MacBook Air M5",
        text: "Thin, silent and fast. A full working day on one charge and a weight you forget in the bag.",
        points: ["M5 chip", "Up to 18 hours of battery", "Fanless, silent"],
        note: "13 and 15 inch",
      },
      {
        title: "Apple Watch Ultra 3",
        text: "One watch for mountains, water and the city. Titanium case, the brightest display and a two-day battery.",
        points: ["Titanium case", "Up to 42 hours of battery", "Water resistant to 100 m"],
        note: "49 mm",
      },
    ],
  },
  arrivals: {
    eyebrow: "New arrivals",
    heading: "Most asked for right now.",
    lead: "The most popular devices this week. Prices and full details are in the store.",
    open: "View",
    all: "Open the full catalog",
  },
  why: {
    eyebrow: "Why Avenir Store",
    heading: "How the store works.",
    original: {
      title: "Only genuine Apple",
      text: "Every device comes with its serial number, which you can check on Apple's site. Sold with a warranty.",
    },
    delivery: {
      figure: site.delivery.expressDays,
      unit: "days",
      title: "Delivery across Tashkent",
      text: `Express in ${site.delivery.expressDays} days, regions in ${site.delivery.standardDays}. The courier brings it to your door.`,
    },
    payments: {
      title: "Pay the way you like",
      text: "You pay online in the store. We never store card details.",
    },
    returns: {
      figure: String(site.returnDays),
      unit: "business days",
      title: "Time to return",
      text: "If the device is unused and the box is complete, you get a refund.",
    },
    support: {
      title: "Help inside the store",
      text: "Questions about an order, the warranty or an exchange are answered in the store.",
    },
  },
  search: {
    eyebrow: "Search",
    heading: "Search understands plain words.",
    lead: "No need to know the model name. Type “iPhone with a great camera” or “light laptop for a student” and the store finds the matching devices.",
    placeholder: "What do you need? Say it in plain words",
    examples: [
      "iphone with a great camera",
      "light laptop for a student",
      "noise cancelling earbuds",
      "tablet for drawing",
      "watch for sport",
      "cheapest iphone",
    ],
    found: "Found",
    empty: "Nothing yet. Try another wording, for example “budget tablet”.",
    hint: "This is a small sample of the same search. In the store it runs over the whole catalog.",
  },
  steps: {
    eyebrow: "How it works",
    heading: "Three steps.",
    lead: "No long sign-up forms, no app to install. The store opens in your browser.",
    items: [
      {
        title: "Open the store",
        text: "Sign in with your phone number. No password to invent.",
      },
      {
        title: "Choose and pay",
        text: "Colour, storage, bundle. Pay online with Click, Payme, Uzcard or Humo.",
      },
      {
        title: "Receive it",
        text: `The courier delivers across Tashkent in ${site.delivery.expressDays} days and to the regions in ${site.delivery.standardDays}.`,
      },
    ],
    phone: {
      greeting: "Welcome to Avenir Store",
      sub: "Premium electronics",
      button: "Browse the catalog",
      search: "iphone with a great camera",
    },
  },
  faq: {
    eyebrow: "Questions",
    heading: "Frequently asked.",
    hint: "Hover over a question",
    items: [
      {
        q: "How do I know the device is genuine and new?",
        a: "Every device comes with its serial number, which you can check on Apple's site. Pre-owned devices are marked separately in the catalog and never sold as new.",
      },
      {
        q: "Which payment methods are available?",
        a: "Click, Payme, Uzcard and Humo. You pay online in the store once the order is confirmed.",
      },
      {
        q: "How long does delivery take and what does it cost?",
        a: `Express across Tashkent in ${site.delivery.expressDays} business days, standard in ${site.delivery.standardDays}. The cost is shown at checkout, depending on the address.`,
      },
      {
        q: "Can I return a device?",
        a: `Yes, within ${site.returnDays} business days, as long as the device is unused, the films are intact and the box is complete.`,
      },
      {
        q: "How do I place an order?",
        a: "Sign in to the store with your phone number, add the product to the cart, choose the address and payment method. After confirmation the courier gets in touch.",
      },
      {
        q: "What about the warranty?",
        a: "The warranty period and terms are listed on each product page. For warranty cases, contact us through the store.",
      },
    ],
  },
  cta: {
    eyebrow: "Welcome",
    heading: "The store is open.",
    lead: "Catalog, colours and payment in one place. Come in, choose, and we handle the rest.",
    button: "Go to the store",
  },
  footer: {
    tagline: "An Apple electronics store.",
    offer: "Public offer",
    privacy: "Privacy policy",
    contacts: "Contact",
    madeBy: "An Avenir Soft project",
    credits: "3D models",
  },
};

const dictionaries: Record<Lang, Dictionary> = { uz, ru, en };

export function getDictionary(lang: Lang): Dictionary {
  return dictionaries[lang];
}
