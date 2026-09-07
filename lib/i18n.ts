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
  intro: { loading: string; skip: string };
  hero: {
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
  lineup: { heading: string; lead: string; open: string };
  featured: { heading: string; lead: string; open: string; all: string };
  trust: { heading: string; items: { title: string; text: string }[] };
  search: {
    heading: string;
    lead: string;
    placeholder: string;
    examples: string[];
    found: string;
    empty: string;
    hint: string;
  };
  steps: {
    heading: string;
    lead: string;
    items: { title: string; text: string }[];
    phone: { greeting: string; sub: string; button: string; search: string };
  };
  faq: { heading: string; items: { q: string; a: string }[] };
  cta: { heading: string; lead: string; button: string };
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
  intro: { loading: "Vitrina tayyorlanmoqda", skip: "O'tkazib yuborish" },
  hero: {
    title: ["iPhone'dan MacBook'gacha.", "Hammasi bitta do'konda."],
    lead: `Avenir Store — ${site.city}dagi Apple do'koni. Tanlang, Click yoki Payme bilan to'lang, ${site.delivery.expressDays} kunda qo'lingizda.`,
    primary: "Do'konga o'tish",
    secondary: "Narxlarni ko'rish",
    scroll: "Aylantiring",
    look: "Ko'rish",
    counter: "{n} / {total}",
  },
  marquee: { prefix: "Hozir sotuvda" },
  lineup: {
    heading: "Butun Apple qatori.",
    lead: "Beshta yo'nalish, har birida yangi modellar va ularning narxi. Aniq narx va rang tanlovi do'konda.",
    open: "Do'konda ochish",
  },
  featured: {
    heading: "Hozir ko'p so'raladiganlar.",
    lead: "Bu haftaning eng ommabop oltita qurilmasi. Narxlar boshlang'ich konfiguratsiya uchun.",
    open: "Ko'rish",
    all: "Butun katalogni ochish",
  },
  trust: {
    heading: "Do'kon qanday ishlaydi.",
    items: [
      { title: "Faqat original Apple", text: "Har bir qurilma seriya raqami bilan, kafolat bilan sotiladi." },
      {
        title: `${site.city} bo'ylab ${site.delivery.expressDays} kun`,
        text: `Ekspress ${site.delivery.expressDays} kun, viloyatlarga ${site.delivery.standardDays} kun. Kuryer eshikkacha olib keladi.`,
      },
      { title: "Click, Payme, Uzcard, Humo", text: "To'lov do'konda onlayn, karta ma'lumotlari bizda saqlanmaydi." },
      { title: `${site.returnDays} ish kuni ichida qaytarish`, text: "Qurilma ishlatilmagan va to'plam to'liq bo'lsa, pulni qaytaramiz." },
    ],
  },
  search: {
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
    heading: "Savollar.",
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
    heading: "Do'kon ochiq.",
    lead: "Katalog, narxlar va to'lov — hammasi bir joyda. Kiring, tanlang, qolganini biz qilamiz.",
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
  intro: { loading: "Готовим витрину", skip: "Пропустить" },
  hero: {
    title: ["От iPhone до MacBook.", "Всё в одном магазине."],
    lead: `Avenir Store — магазин Apple в Ташкенте. Выбирайте, платите через Click или Payme, получайте за ${site.delivery.expressDays} дня.`,
    primary: "Перейти в магазин",
    secondary: "Смотреть цены",
    scroll: "Листайте",
    look: "Смотреть",
    counter: "{n} / {total}",
  },
  marquee: { prefix: "Сейчас в продаже" },
  lineup: {
    heading: "Вся линейка Apple.",
    lead: "Пять направлений, в каждом — новые модели и цена входа. Точная цена и выбор цвета — в магазине.",
    open: "Открыть в магазине",
  },
  featured: {
    heading: "Чаще всего спрашивают.",
    lead: "Шесть самых популярных устройств этой недели. Цены указаны за стартовую конфигурацию.",
    open: "Смотреть",
    all: "Открыть весь каталог",
  },
  trust: {
    heading: "Как работает магазин.",
    items: [
      { title: "Только оригинальный Apple", text: "Каждое устройство продаётся с серийным номером и гарантией." },
      {
        title: `По Ташкенту за ${site.delivery.expressDays} дня`,
        text: `Экспресс ${site.delivery.expressDays} дня, в регионы ${site.delivery.standardDays} дней. Курьер привозит до двери.`,
      },
      { title: "Click, Payme, Uzcard, Humo", text: "Оплата онлайн в магазине, данные карты у нас не хранятся." },
      { title: `Возврат в течение ${site.returnDays} рабочих дней`, text: "Если устройство не использовалось и комплект полный — вернём деньги." },
    ],
  },
  search: {
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
    heading: "Вопросы.",
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
    heading: "Магазин открыт.",
    lead: "Каталог, цены и оплата — в одном месте. Заходите, выбирайте, остальное сделаем мы.",
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
  intro: { loading: "Setting up the showroom", skip: "Skip" },
  hero: {
    title: ["From iPhone to MacBook.", "All in one store."],
    lead: `Avenir Store is an Apple store in Tashkent. Choose, pay with Click or Payme, and have it in ${site.delivery.expressDays} days.`,
    primary: "Go to the store",
    secondary: "See prices",
    scroll: "Scroll",
    look: "View",
    counter: "{n} of {total}",
  },
  marquee: { prefix: "In stock now" },
  lineup: {
    heading: "The whole Apple lineup.",
    lead: "Five lines, each with the new models and its starting price. Exact prices and colours are in the store.",
    open: "Open in the store",
  },
  featured: {
    heading: "Most asked for right now.",
    lead: "The six most popular devices this week. Prices are for the base configuration.",
    open: "View",
    all: "Open the full catalog",
  },
  trust: {
    heading: "How the store works.",
    items: [
      { title: "Only genuine Apple", text: "Every device is sold with its serial number and a warranty." },
      {
        title: `Across Tashkent in ${site.delivery.expressDays} days`,
        text: `Express in ${site.delivery.expressDays} days, regions in ${site.delivery.standardDays}. The courier brings it to your door.`,
      },
      { title: "Click, Payme, Uzcard, Humo", text: "You pay online in the store; we never store card details." },
      { title: `Returns within ${site.returnDays} business days`, text: "If the device is unused and the box is complete, you get a refund." },
    ],
  },
  search: {
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
    heading: "Questions.",
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
    heading: "The store is open.",
    lead: "Catalog, prices and payment in one place. Come in, choose, and we handle the rest.",
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
