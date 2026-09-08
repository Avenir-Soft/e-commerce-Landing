// Server-only: import from server components and pass the dictionary down as a prop.
// Importing this file from a 'use client' module would ship all three languages to the browser.
import type { Lang } from "./languages";

export interface Dictionary {
  meta: { title: string; description: string };
  nav: {
    features: string;
    showcase: string;
    steps: string;
    faq: string;
    demo: string;
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
  marquee: { prefix: string; items: string[] };
  features: { eyebrow: string; heading: string; lead: string; ctaTitle: string; ctaLead: string; cta: string };
  spotlight: {
    eyebrow: string;
    heading: string;
    look: string;
    beats: { title: string; text: string; points: string[]; note: string }[];
  };
  included: { eyebrow: string; heading: string; lead: string; more: string };
  why: {
    eyebrow: string;
    heading: string;
    brand: { title: string; text: string };
    payments: { figure: string; unit: string; title: string; text: string };
    hosting: { rails: string[]; domain: string; title: string; text: string };
    languages: { figure: string; unit: string; title: string; text: string };
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
    button: string;
  };
  faq: { eyebrow: string; heading: string; hint: string; items: { q: string; a: string }[] };
  cta: { eyebrow: string; heading: string; lead: string; button: string; secondary: string };
  footer: { tagline: string; demo: string; developer: string; madeBy: string; credits: string };
}

const uz: Dictionary = {
  meta: {
    title: "Avenir Store — internet-do'kon platformasi",
    description:
      "Sayt va Telegram Mini App, Click/Payme/Uzcard/Humo to'lovlari, yetkazib berish, AI bilan katalog va boshqaruv paneli. Do'koningizni bir necha kunda ishga tushiramiz.",
  },
  nav: {
    features: "Imkoniyatlar",
    showcase: "Vitrina",
    steps: "Qanday ishlaydi",
    faq: "Savollar",
    demo: "Namuna do'kon",
    open: "Demo so'rash",
    menu: "Menyu",
    close: "Yopish",
    language: "Til",
  },
  loader: { loading: "Yuklanmoqda", skip: "O'tkazib yuborish" },
  hero: {
    tagline: "Avenir Soft platformasi",
    title: ["Do'koningiz onlayn bo'lsin.", "Qolganini platforma qiladi."],
    lead: "Avenir Store — tayyor internet-do'kon: katalog, savat, Click va Payme to'lovlari, yetkazib berish, AI bilan qidiruv, boshqaruv paneli va Telegram Mini App. Sizning brendingiz ostida, bir necha kunda.",
    primary: "Demo so'rash",
    secondary: "Namuna do'kon",
    scroll: "Aylantiring",
    look: "Ko'rish",
    counter: "{n} / {total}",
  },
  marquee: {
    prefix: "Platformada bor",
    items: [
      "Click",
      "Payme",
      "Uzcard",
      "Humo",
      "Telegram Mini App",
      "AI tarjima",
      "SEO matnlar",
      "Semantik qidiruv",
      "Yetkazish zonalari",
      "Variantlar va atributlar",
      "UZ / RU / EN",
      "Boshqaruv paneli",
    ],
  },
  features: {
    eyebrow: "Imkoniyatlar",
    heading: "Bitta platforma. Butun do'kon.",
    lead: "Mijoz ko'radigan vitrinadan egasi boshqaradigan panelgacha — hammasi bir tizimda, sizning brendingiz ostida.",
    ctaTitle: "Jonli ko'ring",
    ctaLead: "30 daqiqalik demo: platformani ishlayotgan holda ko'rasiz, savollaringizga javob olasiz.",
    cta: "Demo so'rash",
  },
  spotlight: {
    eyebrow: "Vitrina",
    heading: "Yaqindan qarang.",
    look: "Namuna do'konda ko'rish",
    beats: [
      {
        title: "Mijoz ko'radigan do'kon",
        text: "Tez ochiladi, telefonga mo'ljallangan, uch tilda. Kategoriyalar, qidiruv, mahsulot sahifasi, savat va checkout.",
        points: ["UZ / RU / EN", "Telefon-birinchi", "Semantik qidiruv"],
        note: "Sayt va Telegram Mini App",
      },
      {
        title: "Boshqaruv paneli",
        text: "Mahsulot qo'shish, buyurtmani kuzatish, mijozlar bazasi va sozlamalar — dasturchisiz, brauzerda.",
        points: ["Buyurtmalar va holatlar", "Mahsulotlar va variantlar", "Mijozlar"],
        note: "Egasi va menejerlar uchun",
      },
      {
        title: "AI bilan katalog",
        text: "Ruscha tavsif kiriting — o'zbekchasi, SEO sarlavha va tavsif tayyor. Atributlar avtomatik ajratiladi, qidiruv ma'noni tushunadi.",
        points: ["RU → UZ tarjima", "SEO sarlavha va tavsif", "Atributlar"],
        note: "Navbatda, fonda ishlaydi",
      },
    ],
  },
  included: {
    eyebrow: "Nimalar kiradi",
    heading: "Do'kon uchun kerak bo'lgan hamma narsa.",
    lead: "Modullar alohida sotilmaydi. Do'kon ishga tushganda quyidagilarning hammasi ishlab turadi.",
    more: "Yana nima kerak bo'lsa — qo'shamiz.",
  },
  why: {
    eyebrow: "Nega Avenir Store",
    heading: "Bizning platforma, sizning do'koningiz.",
    brand: {
      title: "Sizning brendingiz ostida",
      text: "Do'kon nomi, logotip, ranglar va domen — sizniki. Mijoz Avenir'ni emas, sizni ko'radi.",
    },
    payments: {
      figure: "4",
      unit: "to'lov tizimi",
      title: "O'zbekiston to'lovlari tayyor",
      text: "Click, Payme, Uzcard va Humo. Merchant ma'lumotlarini kiritasiz — ishlaydi.",
    },
    hosting: {
      rails: ["Sayt", "Telegram", "Panel", "AI"],
      domain: "dokoningiz.uz",
      title: "O'z domeningizda ishlaydi",
      text: "Docker bilan o'rnatiladi, ma'lumotlar sizda qoladi. Xohlasangiz, hostingni biz olib boramiz.",
    },
    languages: {
      figure: "3",
      unit: "til",
      title: "O'zbek, rus va ingliz tili",
      text: "Interfeys va katalog uch tilda. Tarjimani AI qiladi, siz tekshirasiz.",
    },
    support: {
      title: "Ishga tushgandan keyin ham yonimizdamiz",
      text: "Yangi funksiya, integratsiya yoki hisobot kerak bo'lsa — platformani biz rivojlantiramiz.",
    },
  },
  search: {
    eyebrow: "Qidiruv",
    heading: "Qidiruv gapingizni tushunadi.",
    lead: "Mijoz model nomini bilmaydi. «Sovg'a uchun soat» yoki «uy uchun kofe mashinasi» deb yozadi — platforma mos mahsulotni topadi.",
    placeholder: "Nima kerak? Oddiy so'z bilan yozing",
    examples: [
      "sovg'a uchun soat",
      "uy uchun kofe mashinasi",
      "sport uchun poyabzal",
      "yozgi ko'ylak",
      "arzon quloqchin",
      "bola uchun planshet",
    ],
    found: "Topildi",
    empty: "Hozircha topilmadi — boshqacha yozib ko'ring, masalan «uy uchun robot».",
    hint: "Bu kichik namuna. Sizning do'koningizda u butun katalog bo'ylab ishlaydi.",
  },
  steps: {
    eyebrow: "Qanday ishlaydi",
    heading: "Uch qadam.",
    lead: "Demo'dan ishga tushirishgacha — bir necha kun.",
    items: [
      {
        title: "Demo va kelishuv",
        text: "Platformani jonli ko'rasiz. Brend, to'lov va yetkazish ma'lumotlarini kelishamiz.",
      },
      {
        title: "Katalogni yuklaymiz",
        text: "Mahsulotlaringizni kiritamiz, AI tarjima va SEO matnlarni tayyorlaydi, to'lov va zonalarni sozlaymiz.",
      },
      {
        title: "Sotuvni boshlaysiz",
        text: "Sayt va Telegram ochiq. Buyurtmalar panelga tushadi, siz ularni holatlar bo'yicha yuritasiz.",
      },
    ],
    button: "Demo so'rash",
  },
  faq: {
    eyebrow: "Savollar",
    heading: "Ko'p so'raladigan savollar.",
    hint: "Savol ustiga olib boring",
    items: [
      {
        q: "Bu tayyor xizmatmi yoki bizga o'rnatiladimi?",
        a: "O'z domeningizda, sizning serveringizda ishga tushiriladi — ma'lumotlar sizda qoladi. Xohlasangiz, hostingni va yangilanishlarni biz olib boramiz.",
      },
      {
        q: "To'lovlar qanday ulanadi?",
        a: "Click, Payme, Uzcard va Humo qo'llab-quvvatlanadi. Merchant ma'lumotlaringizni boshqaruv paneliga kiritasiz va qaysi usullar yoqilishini o'zingiz tanlaysiz.",
      },
      {
        q: "Telegram shartmi?",
        a: "Yo'q. Sayt o'zi ishlaydi. Telegram Mini App — qo'shimcha kanal: o'sha katalog, o'sha buyurtmalar, kirish telefon raqami bilan.",
      },
      {
        q: "Katalogni kim yuklaydi?",
        a: "Boshlang'ich yuklashni biz qilamiz. Keyin panelda o'zingiz qo'shasiz — AI tarjima, tavsif va atributlarda yordam beradi.",
      },
      {
        q: "Narxi qancha?",
        a: "Loyihaga qarab: modullar, integratsiyalar va hosting. Demo'da ehtiyojingizni tushunib, aniq taklif beramiz.",
      },
      {
        q: "Yangi funksiya kerak bo'lsa?",
        a: "Platforma bizniki, kodni biz rivojlantiramiz. Integratsiya, hisobot yoki maxsus modul — kelishib qo'shamiz.",
      },
    ],
  },
  cta: {
    eyebrow: "Boshlaymizmi",
    heading: "Do'koningizni ko'rsatamiz.",
    lead: "30 daqiqalik demo: platformani jonli ko'rasiz, savollarga javob olasiz, muddat va taklif bilan qaytamiz.",
    button: "Demo so'rash",
    secondary: "Namuna do'kon",
  },
  footer: {
    tagline: "Avenir Soft'ning internet-do'kon platformasi.",
    demo: "Namuna do'kon",
    developer: "avenir.uz",
    madeBy: "Avenir Soft mahsuloti",
    credits: "3D modellar",
  },
};

const ru: Dictionary = {
  meta: {
    title: "Avenir Store — платформа интернет-магазина",
    description:
      "Сайт и Telegram Mini App, платежи Click/Payme/Uzcard/Humo, доставка, каталог с ИИ и панель управления. Запускаем ваш магазин за несколько дней.",
  },
  nav: {
    features: "Возможности",
    showcase: "Витрина",
    steps: "Как это работает",
    faq: "Вопросы",
    demo: "Демо-магазин",
    open: "Запросить демо",
    menu: "Меню",
    close: "Закрыть",
    language: "Язык",
  },
  loader: { loading: "Загрузка", skip: "Пропустить" },
  hero: {
    tagline: "Платформа Avenir Soft",
    title: ["Ваш магазин — онлайн.", "Остальное делает платформа."],
    lead: "Avenir Store — готовый интернет-магазин: каталог, корзина, оплата через Click и Payme, доставка, поиск с ИИ, панель управления и Telegram Mini App. Под вашим брендом, за несколько дней.",
    primary: "Запросить демо",
    secondary: "Демо-магазин",
    scroll: "Листайте",
    look: "Смотреть",
    counter: "{n} / {total}",
  },
  marquee: {
    prefix: "В платформе есть",
    items: [
      "Click",
      "Payme",
      "Uzcard",
      "Humo",
      "Telegram Mini App",
      "ИИ-перевод",
      "SEO-тексты",
      "Семантический поиск",
      "Зоны доставки",
      "Варианты и атрибуты",
      "UZ / RU / EN",
      "Панель управления",
    ],
  },
  features: {
    eyebrow: "Возможности",
    heading: "Одна платформа. Весь магазин.",
    lead: "От витрины, которую видит покупатель, до панели, которой управляет владелец — всё в одной системе, под вашим брендом.",
    ctaTitle: "Посмотрите вживую",
    ctaLead: "30-минутное демо: увидите платформу в работе и получите ответы на вопросы.",
    cta: "Запросить демо",
  },
  spotlight: {
    eyebrow: "Витрина",
    heading: "Рассмотрите поближе.",
    look: "Открыть в демо-магазине",
    beats: [
      {
        title: "Магазин глазами покупателя",
        text: "Быстро открывается, сделан под телефон, на трёх языках. Категории, поиск, страница товара, корзина и оформление.",
        points: ["UZ / RU / EN", "Сначала телефон", "Семантический поиск"],
        note: "Сайт и Telegram Mini App",
      },
      {
        title: "Панель управления",
        text: "Добавить товар, отследить заказ, база клиентов и настройки — без программиста, в браузере.",
        points: ["Заказы и статусы", "Товары и варианты", "Клиенты"],
        note: "Для владельца и менеджеров",
      },
      {
        title: "Каталог с ИИ",
        text: "Введите описание на русском — узбекский вариант, SEO-заголовок и описание готовы. Атрибуты выделяются автоматически, поиск понимает смысл.",
        points: ["Перевод RU → UZ", "SEO-заголовок и описание", "Атрибуты"],
        note: "Работает в очереди, в фоне",
      },
    ],
  },
  included: {
    eyebrow: "Что входит",
    heading: "Всё, что нужно магазину.",
    lead: "Модули не продаются по отдельности. Когда магазин запущен, работает всё перечисленное.",
    more: "Нужно что-то ещё — добавим.",
  },
  why: {
    eyebrow: "Почему Avenir Store",
    heading: "Наша платформа, ваш магазин.",
    brand: {
      title: "Под вашим брендом",
      text: "Название, логотип, цвета и домен — ваши. Покупатель видит вас, а не Avenir.",
    },
    payments: {
      figure: "4",
      unit: "платёжные системы",
      title: "Платежи Узбекистана готовы",
      text: "Click, Payme, Uzcard и Humo. Вводите данные мерчанта — и работает.",
    },
    hosting: {
      rails: ["Сайт", "Telegram", "Панель", "ИИ"],
      domain: "vash-magazin.uz",
      title: "Работает на вашем домене",
      text: "Разворачивается через Docker, данные остаются у вас. Хостинг можем взять на себя.",
    },
    languages: {
      figure: "3",
      unit: "языка",
      title: "Узбекский, русский и английский",
      text: "Интерфейс и каталог на трёх языках. Переводит ИИ, вы проверяете.",
    },
    support: {
      title: "Рядом и после запуска",
      text: "Новая функция, интеграция или отчёт — платформу развиваем мы.",
    },
  },
  search: {
    eyebrow: "Поиск",
    heading: "Поиск понимает обычные слова.",
    lead: "Покупатель не знает названия модели. Он пишет «часы в подарок» или «кофемашина для дома» — платформа находит подходящий товар.",
    placeholder: "Что нужно? Напишите простыми словами",
    examples: [
      "часы в подарок",
      "кофемашина для дома",
      "обувь для спорта",
      "летнее платье",
      "недорогие наушники",
      "планшет для ребёнка",
    ],
    found: "Найдено",
    empty: "Пока ничего — попробуйте иначе, например «робот для дома».",
    hint: "Это маленький образец. В вашем магазине он работает по всему каталогу.",
  },
  steps: {
    eyebrow: "Как это работает",
    heading: "Три шага.",
    lead: "От демо до запуска — несколько дней.",
    items: [
      {
        title: "Демо и договорённость",
        text: "Вы видите платформу вживую. Согласуем бренд, платежи и доставку.",
      },
      {
        title: "Загружаем каталог",
        text: "Заводим ваши товары, ИИ готовит переводы и SEO-тексты, настраиваем оплату и зоны.",
      },
      {
        title: "Вы начинаете продавать",
        text: "Сайт и Telegram открыты. Заказы попадают в панель, вы ведёте их по статусам.",
      },
    ],
    button: "Запросить демо",
  },
  faq: {
    eyebrow: "Вопросы",
    heading: "Частые вопросы.",
    hint: "Наведите на вопрос",
    items: [
      {
        q: "Это готовый сервис или устанавливается у нас?",
        a: "Запускается на вашем домене и вашем сервере — данные остаются у вас. При желании хостинг и обновления берём на себя.",
      },
      {
        q: "Как подключаются платежи?",
        a: "Поддерживаются Click, Payme, Uzcard и Humo. Данные мерчанта вводятся в панели управления, какие способы включить — решаете сами.",
      },
      {
        q: "Telegram обязателен?",
        a: "Нет. Сайт работает сам по себе. Telegram Mini App — дополнительный канал: тот же каталог, те же заказы, вход по номеру телефона.",
      },
      {
        q: "Кто загружает каталог?",
        a: "Первичную загрузку делаем мы. Дальше добавляете сами в панели — ИИ помогает с переводом, описанием и атрибутами.",
      },
      {
        q: "Сколько это стоит?",
        a: "Зависит от проекта: модули, интеграции и хостинг. На демо разберём вашу задачу и дадим точное предложение.",
      },
      {
        q: "Если понадобится новая функция?",
        a: "Платформа наша, код развиваем мы. Интеграцию, отчёт или отдельный модуль добавим по договорённости.",
      },
    ],
  },
  cta: {
    eyebrow: "Начнём",
    heading: "Покажем ваш магазин.",
    lead: "30-минутное демо: увидите платформу вживую, получите ответы, а мы вернёмся со сроками и предложением.",
    button: "Запросить демо",
    secondary: "Демо-магазин",
  },
  footer: {
    tagline: "Платформа интернет-магазина от Avenir Soft.",
    demo: "Демо-магазин",
    developer: "avenir.uz",
    madeBy: "Продукт Avenir Soft",
    credits: "3D-модели",
  },
};

const en: Dictionary = {
  meta: {
    title: "Avenir Store — the online store platform",
    description:
      "Website and Telegram Mini App, Click/Payme/Uzcard/Humo payments, delivery, an AI-assisted catalog and an admin panel. Your shop goes live in days.",
  },
  nav: {
    features: "Features",
    showcase: "Showcase",
    steps: "How it works",
    faq: "Questions",
    demo: "Demo store",
    open: "Request a demo",
    menu: "Menu",
    close: "Close",
    language: "Language",
  },
  loader: { loading: "Loading", skip: "Skip" },
  hero: {
    tagline: "A platform by Avenir Soft",
    title: ["Take your shop online.", "The platform does the rest."],
    lead: "Avenir Store is a ready online store: catalog, cart, Click and Payme payments, delivery, AI search, an admin panel and a Telegram Mini App. Under your brand, in days.",
    primary: "Request a demo",
    secondary: "Demo store",
    scroll: "Scroll",
    look: "View",
    counter: "{n} of {total}",
  },
  marquee: {
    prefix: "Built in",
    items: [
      "Click",
      "Payme",
      "Uzcard",
      "Humo",
      "Telegram Mini App",
      "AI translation",
      "SEO copy",
      "Semantic search",
      "Delivery zones",
      "Variants and attributes",
      "UZ / RU / EN",
      "Admin panel",
    ],
  },
  features: {
    eyebrow: "Features",
    heading: "One platform. The whole shop.",
    lead: "From the storefront your customer sees to the panel the owner runs, everything lives in one system, under your brand.",
    ctaTitle: "See it live",
    ctaLead: "A 30-minute demo: watch the platform work and get your questions answered.",
    cta: "Request a demo",
  },
  spotlight: {
    eyebrow: "Showcase",
    heading: "Take a closer look.",
    look: "Open in the demo store",
    beats: [
      {
        title: "The shop your customer sees",
        text: "Opens fast, built for the phone, in three languages. Categories, search, product page, cart and checkout.",
        points: ["UZ / RU / EN", "Phone first", "Semantic search"],
        note: "Website and Telegram Mini App",
      },
      {
        title: "Admin panel",
        text: "Add a product, follow an order, the customer base and settings, all in the browser, no developer needed.",
        points: ["Orders and statuses", "Products and variants", "Customers"],
        note: "For the owner and managers",
      },
      {
        title: "Catalog with AI",
        text: "Enter a Russian description; the Uzbek one, the SEO title and description are generated. Attributes are extracted, and search understands meaning.",
        points: ["RU → UZ translation", "SEO title and description", "Attributes"],
        note: "Queued, runs in the background",
      },
    ],
  },
  included: {
    eyebrow: "What is included",
    heading: "Everything a shop needs.",
    lead: "Modules are not sold separately. When the shop goes live, all of this is running.",
    more: "Need something else? We add it.",
  },
  why: {
    eyebrow: "Why Avenir Store",
    heading: "Our platform, your shop.",
    brand: {
      title: "Under your brand",
      text: "Shop name, logo, colours and domain are yours. Customers see you, not Avenir.",
    },
    payments: {
      figure: "4",
      unit: "payment rails",
      title: "Uzbekistan payments, ready",
      text: "Click, Payme, Uzcard and Humo. Enter your merchant details and it works.",
    },
    hosting: {
      rails: ["Website", "Telegram", "Panel", "AI"],
      domain: "yourshop.uz",
      title: "Runs on your own domain",
      text: "Deployed with Docker, the data stays with you. We can run the hosting if you prefer.",
    },
    languages: {
      figure: "3",
      unit: "languages",
      title: "Uzbek, Russian and English",
      text: "Interface and catalog in all three. AI translates, you approve.",
    },
    support: {
      title: "Still here after launch",
      text: "A new feature, an integration or a report: we develop the platform.",
    },
  },
  search: {
    eyebrow: "Search",
    heading: "Search understands plain words.",
    lead: "Customers do not know model names. They type “a watch as a gift” or “a coffee machine for home”, and the platform finds the right product.",
    placeholder: "What do you need? Say it in plain words",
    examples: [
      "watch as a gift",
      "coffee machine for home",
      "shoes for sport",
      "summer dress",
      "cheap earbuds",
      "tablet for a kid",
    ],
    found: "Found",
    empty: "Nothing yet. Try another wording, for example “robot for home”.",
    hint: "A small sample. In your shop it runs over the whole catalog.",
  },
  steps: {
    eyebrow: "How it works",
    heading: "Three steps.",
    lead: "From the demo to launch in days.",
    items: [
      {
        title: "Demo and agreement",
        text: "You see the platform live. We agree on brand, payments and delivery.",
      },
      {
        title: "We load the catalog",
        text: "We enter your products, AI prepares translations and SEO copy, we set up payments and zones.",
      },
      {
        title: "You start selling",
        text: "Website and Telegram are open. Orders land in the panel and you move them through statuses.",
      },
    ],
    button: "Request a demo",
  },
  faq: {
    eyebrow: "Questions",
    heading: "Frequently asked.",
    hint: "Hover over a question",
    items: [
      {
        q: "Is it a hosted service or installed for us?",
        a: "It runs on your domain and your server, so the data stays with you. If you prefer, we run the hosting and updates.",
      },
      {
        q: "How are payments connected?",
        a: "Click, Payme, Uzcard and Humo are supported. You enter your merchant details in the admin panel and choose which methods to enable.",
      },
      {
        q: "Is Telegram required?",
        a: "No. The website works on its own. The Telegram Mini App is an extra channel: the same catalog, the same orders, sign-in by phone number.",
      },
      {
        q: "Who loads the catalog?",
        a: "We do the initial load. After that you add products in the panel, with AI helping on translation, descriptions and attributes.",
      },
      {
        q: "What does it cost?",
        a: "It depends on the project: modules, integrations and hosting. At the demo we learn what you need and give an exact offer.",
      },
      {
        q: "What if we need a new feature?",
        a: "The platform is ours and we develop the code. An integration, a report or a custom module can be added by agreement.",
      },
    ],
  },
  cta: {
    eyebrow: "Shall we start",
    heading: "We will show you your shop.",
    lead: "A 30-minute demo: see the platform live, get your questions answered, and we come back with a timeline and an offer.",
    button: "Request a demo",
    secondary: "Demo store",
  },
  footer: {
    tagline: "The online store platform by Avenir Soft.",
    demo: "Demo store",
    developer: "avenir.uz",
    madeBy: "A product of Avenir Soft",
    credits: "3D models",
  },
};

const dictionaries: Record<Lang, Dictionary> = { uz, ru, en };

export function getDictionary(lang: Lang): Dictionary {
  return dictionaries[lang];
}
