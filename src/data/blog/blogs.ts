export interface BlogTopic {
  title: string;
  slug: string;
  description?: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  topics: BlogTopic[];
}

export const blogCategories: BlogCategory[] = [
  {
    id: 'why-go-online',
    name: 'Nima Uchun Onlaynga O\'tish Kerak?',
    slug: 'nima-uchun-onlaynga-otish-kerak',
    description: "Onlayn do'konning afzalliklari va nima uchun onlayn savdo ochish kerak",
    topics: [
      {
        title: "Onlayn Do'konning 10 Ta Asosiy Afzalligi",
        slug: 'onlayn-dokonning-10-ta-asosiy-afzalligi',
        description: "Nima uchun onlayn do'kon ochish sizning biznesingiz uchun eng yaxshi qaror",
      },
      {
        title: 'Offlayn Do\'kondan Onlaynga O\'tish: Qanday Qilish Kerak?',
        slug: 'offlayn-dokondan-onlaynga-otish',
        description: "An'anaviy do'konni raqamli dunyoga ko'chirish bo'yicha qo'llanma",
      },
      {
        title: '24/7 Sotish: Onlayn Do\'konning Eng Katta Imkoniyati',
        slug: '24-7-sotish',
        description: 'Kun bo\'yi va tunda doimiy daromad olish sirlari',
      },
      {
        title: 'Geografik Cheklovlarsiz Sotish: Butun O\'zbekiston va Dunyo',
        slug: 'geografik-cheklovlarsiz-sotish',
        description: 'Har bir burchakdagi mijozlarga yetishish imkoniyati',
      },
      {
        title: 'Xarajatlarni Kamaytirish: Ofis va Omborsiz Sotish',
        slug: 'xarajatlarni-kamaytirish',
        description: 'Jismoniy do\'kon xarajatlarisiz biznes yuritish',
      },
      {
        title: 'Mahsulot Katalogini Cheksiz Kengaytirish',
        slug: 'mahsulot-katalogini-kengaytirish',
        description: "Jismoniy ombor cheklovlarisiz ko'plab mahsulotlarni taklif qilish",
      },
      {
        title: 'An\'anaviy Savdoga Qaraganda Ko\'proq Daromad',
        slug: 'an-anaviy-savdoga-qaraganda-ko-proq-daromad',
        description: 'Onlayn savdoning moliyaviy afzalliklari va daromad potensiali',
      },
      {
        title: 'Mijozlar Ma\'lumotlarini To\'g\'ri Tahlil Qilish',
        slug: 'mijozlar-malumotlarini-tahlil',
        description: "Har bir mijoz haqida to'liq ma'lumotga ega bo'lish",
      },
      {
        title: 'Avtomatlashtirilgan Jarayonlar: Vaqt va Mehnat Tejalishi',
        slug: 'avtomatlashtirilgan-jarayonlar',
        description: "Texnologiya yordamida biznes jarayonlarini soddalashtirish",
      },
      {
        title: 'Raqobat: Onlayn Do\'kon An\'anaviy Rivojlanayotgan Biznes',
        slug: 'raqobat-onlayn-dokon',
        description: "Kelajak sizni kutmoqda: bugun o'tish kerak bo'lgan sabablar",
      },
      {
        title: 'COVID-19 va Keyingi Pandemiyalar: Onlayn Savdo Xavfsizligi',
        slug: 'covid-19-onlayn-savdo',
        description: 'Har qanday vaziyatda biznesni yuritish imkoniyati',
      },
      {
        title: 'Startup Bizneslar Uchun Eng Tez va Arzon Yo\'l',
        slug: 'startup-bizneslar-uchun',
        description: "Kam byudjet bilan o'z biznesingizni boshlash",
      },
    ],
  },
  {
    id: 'ecommerce-basics',
    name: 'Onlayn Savdo Asoslari',
    slug: 'onlayn-savdo-asoslari',
    description: "Onlayn do'kon ochish va boshqarishning asosiy qoidalari",
    topics: [
      {
        title: "Onlayn Do'kon Ochish: Boshlang'ich Qo'llanma",
        slug: 'onlayn-dokon-ochish-boshlangich-qollanma',
        description: "Bosqichma-bosqich onlayn do'kon ochish bo'yicha to'liq qo'llanma",
      },
      {
        title: 'E-commerce Platformalarni Tanlash: Qaysi Biri Sizga Mos?',
        slug: 'ecommerce-platformalarni-tanlash',
        description: "Turli platformalarni solishtirish va tanlash bo'yicha qo'llanma",
      },
      {
        title: "Onlayn Do'kon Dizayni: Mijozlarni Jalb Qilish Sirlari",
        slug: 'onlayn-dokon-dizayni',
        description: "Professional va a'zo bo'lgan do'kon dizayni yaratish",
      },
      {
        title: "Mahsulot Kataloglarini To'g'ri Tuzish",
        slug: 'mahsulot-kataloglarini-tuzish',
        description: 'Mahsulotlarni professional tarzda joylashtirish va tuzish',
      },
      {
        title: 'Narxlarni Strategik Belgilash',
        slug: 'narxlarni-belgilash',
        description: 'Raqobatbardosh va foydali narx strategiyalari',
      },
    ],
  },
  {
    id: 'seo-marketing',
    name: 'SEO va Marketing',
    slug: 'seo-va-marketing',
    description: "Do'konni qidiruv tizimlarida yuqoriga ko'tarish va mijozlarni jalb qilish",
    topics: [
      {
        title: 'E-commerce SEO: 2025-yil Eng Yaxshi Amaliyotlar',
        slug: 'ecommerce-seo-2025',
        description: "Onlayn do'konlar uchun SEO optimizatsiyasi bo'yicha qo'llanma",
      },
      {
        title: 'Mahsulot Sahifalarini SEO uchun Optimallashtirish',
        slug: 'mahsulot-sahifalari-seo',
        description: 'Mahsulot tavsiflarini qidiruv tizimlari uchun optimallashtirish',
      },
      {
        title: "Google Merchant Center: Boshlang'ich Qo'llanma",
        slug: 'google-merchant-center',
        description: 'Google Shopping reklamalarini sozlash va boshqarish',
      },
      {
        title: 'Organic Trafikni Oshirish: 10 Ta Samarali Strategiya',
        slug: 'organic-trafikni-oshirish',
        description: 'Qidiruv tizimlaridan bepul mijozlar olish',
      },
      {
        title: 'Kontent Marketing: Blog Yozishdan Sotuvga',
        slug: 'kontent-marketing',
        description: 'Blog orqali mijozlarni jalb qilish va sotishni oshirish',
      },
      {
        title: 'SMM Strategiyasi: Instagram va Telegram Orqali Sotish',
        slug: 'smm-strategiyasi',
        description: 'Ijtimoiy tarmoqlarda samarali marketing',
      },
      {
        title: "Email Marketing: Murakkab Bo'lmagan Strategiya",
        slug: 'email-marketing',
        description: 'Email orqali mijozlarni qayta jalb qilish',
      },
    ],
  },
  {
    id: 'conversion-optimization',
    name: 'Konversiya Optimizatsiyasi',
    slug: 'konversiya-optimizatsiyasi',
    description: 'Kelingan mijozlarni sotuvga aylantirish usullari',
    topics: [
      {
        title: 'Savatchani Tark Etish Masalasi: Qanday Yechiladi?',
        slug: 'savatchani-tark-etish',
        description: "Mijozlarni to'liq xarid qilishga undash strategiyalari",
      },
      {
        title: "To'lov Jarayonini Optimallashtirish",
        slug: 'tolov-jarayoni-optimallash',
        description: "Oddiy va qulay to'lov jarayoni yaratish",
      },
      {
        title: 'CTA (Call-to-Action) Tugmalar: Qanday Ishlaydi?',
        slug: 'cta-tugmalar',
        description: 'Mijozlarni harakat qilishga undaydigan tugmalar',
      },
      {
        title: "Mahsulot Ko'rinishlari va Fotolar: A/B Testing",
        slug: 'mahsulot-ko-rinishlari',
        description: "Qaysi ko'rinish ko'proq sotishga olib keladi?",
      },
      {
        title: 'Xaridorlar Ishonchi: Sharhlar va Reytinglar',
        slug: 'xaridorlar-ishonchi',
        description: 'Ijobiy sharhlarni qanday olish va boshqarish',
      },
    ],
  },
  {
    id: 'logistics-fulfillment',
    name: 'Logistika va Yetkazib Berish',
    slug: 'logistika-va-yetkazib-berish',
    description: "Buyurtmalarni to'g'ri boshqarish va mijozlarga yetkazish",
    topics: [
      {
        title: "O'zbekistonda Yetkazib Berish Xizmatlari: Taqqoslash",
        slug: 'ozbekistonda-yetkazib-berish',
        description: 'Eng yaxshi yetkazib berish kompaniyalarini tanlash',
      },
      {
        title: "Ombor Boshqaruvi: Boshlang'ichlar uchun Qo'llanma",
        slug: 'ombor-boshqaruvi',
        description: "Mahsulot zaxiralarini to'g'ri boshqarish",
      },
      {
        title: 'Yetkazib Berish Narxlari: Qanday Hisoblash?',
        slug: 'yetkazib-berish-narxlari',
        description: 'Raqobatbardosh yetkazib berish narxlari belgilash',
      },
      {
        title: 'Xalqaro Yetkazib Berish: Import/Export Asoslari',
        slug: 'xalqaro-yetkazib-berish',
        description: 'Mamlakatlararo savdo uchun logistika',
      },
      {
        title: "Buyurtma Tracking: Mijozlarga Qanday Ko'rsatish?",
        slug: 'buyurtma-tracking',
        description: 'Buyurtmalarni kuzatish tizimini yaratish',
      },
    ],
  },
  {
    id: 'customer-service',
    name: "Mijozlarga Xizmat Ko'rsatish",
    slug: 'mijozlarga-xizmat',
    description: 'Mijozlarni qanoatlantirish va ularni doimiy mijozga aylantirish',
    topics: [
      {
        title: "Mijozlar Xizmati: 24/7 Qo'llab-quvvatlash",
        slug: 'mijozlar-xizmati-24-7',
        description: 'Doimiy mijozlar xizmatini tashkil etish',
      },
      {
        title: "Qaytarib Berish Siyosati: To'g'ri Tuzish",
        slug: 'qaytarib-berish-siyosati',
        description: 'Himoyalangan va mijozlarga qulay qaytarib berish qoidalari',
      },
      {
        title: 'Chatbot Integratsiyasi: Avtomatlashtirilgan Javoblar',
        slug: 'chatbot-integratsiyasi',
        description: "Sun'iy intellekt orqali mijozlarga yordam berish",
      },
      {
        title: 'Mijozlar Mulokati: Qanday Boshqarish?',
        slug: 'mijozlar-mulokati',
        description: 'Shikoyatlarni tez va samarali hal qilish',
      },
      {
        title: 'Sotuvdan Keyin Xizmat: Mijozlar Sadoqatini Oshirish',
        slug: 'sotuvdan-keyin-xizmat',
        description: "Xaridlardan keyin mijozlar bilan aloqada bo'lish",
      },
    ],
  },
  {
    id: 'analytics-data',
    name: "Analitika va Ma'lumotlar",
    slug: 'analitika-va-malumotlar',
    description: "Do'kon ko'rsatkichlarini tahlil qilish va ma'lumotlar asosida qarorlar qabul qilish",
    topics: [
      {
        title: 'Google Analytics 4: E-commerce Tracking',
        slug: 'google-analytics-4-ecommerce',
        description: "Do'kon ko'rsatkichlarini to'liq kuzatish",
      },
      {
        title: "KPI (Asosiy Ko'rsatkichlar): Nimalarni Kuzatish Kerak?",
        slug: 'kpi-ko-rsatkichlar',
        description: "Muvaffaqiyatni o'lchash uchun asosiy metrikalar",
      },
      {
        title: "Sotuv Tahlili: Qaysi Mahsulotlar Ko'proq Sotiladi?",
        slug: 'sotuv-tahlili',
        description: "Ma'lumotlar asosida mahsulot strategiyasini yaratish",
      },
      {
        title: 'Mijozlar Xatti-Harakatlarini Tahlil Qilish',
        slug: 'mijozlar-xatti-harakatlari',
        description: 'Hotjar va boshqa vositalar bilan tahlil',
      },
      {
        title: 'A/B Testing: Qanday Optimizatsiya Qilish?',
        slug: 'ab-testing',
        description: "Tajribalar o'tkazish va natijalarni solishtirish",
      },
    ],
  },
  {
    id: 'payment-systems',
    name: "To'lov Tizimlari",
    slug: 'tolov-tizimlari',
    description: "Turli to'lov usullarini integratsiya qilish va xavfsizlik",
    topics: [
      {
        title: "O'zbekistonda To'lov Tizimlari: Payme, Click, Uzumbank",
        slug: 'ozbekistonda-tolov-tizimlari',
        description: "Mahalliy to'lov tizimlarini integratsiya qilish",
      },
      {
        title: "Xalqaro To'lovlar: PayPal, Stripe Integratsiyasi",
        slug: 'xalqaro-tolovlar',
        description: "Chegara tashqaridan to'lov qabul qilish",
      },
      {
        title: 'Kartalar Xavfsizligi: PCI DSS Standartlari',
        slug: 'kartalar-xavfsizligi',
        description: "Mijozlar to'lov ma'lumotlarini himoya qilish",
      },
      {
        title: "To'lov Dilerlari: Tanlash va Solishtirish",
        slug: 'tolov-dilerlari',
        description: 'Eng yaxshi shartnomalarni olish',
      },
      {
        title: "To'lov Muvaffaqiyatsizliklari: Qanday Kamaytirish?",
        slug: 'tolov-muvaffaqiyatsizliklari',
        description: "To'lovlarni muvaffaqiyatli amalga oshirish strategiyalari",
      },
    ],
  },
  {
    id: 'mobile-commerce',
    name: 'Mobil Savdo',
    slug: 'mobil-savdo',
    description: 'Mobil qurilmalardan sotish va optimallashtirish',
    topics: [
      {
        title: "Mobil Do'kon Optimizatsiyasi: PWA texnologiyasi",
        slug: 'mobil-dokon-optimizatsiyasi',
        description: "Mobil ilovalarga o'xshash do'kon yaratish",
      },
      {
        title: 'Mobile-First Dizayn: Nima Bu?',
        slug: 'mobile-first-dizayn',
        description: 'Avval mobil, keyin desktop dizayn yondashuvi',
      },
      {
        title: "Mobil To'lovlar: Tezkor va Qulay",
        slug: 'mobil-tolovlar',
        description: "Mobil qurilmalarda to'lov jarayonini soddalashtirish",
      },
      {
        title: 'Push Notificationlar: Mijozlarni Qaytarib Olish',
        slug: 'push-notificationlar',
        description: 'Mobil xabarnomalar orqali reklama qilish',
      },
      {
        title: 'App Store va Google Play: Ilovalarni Joylashtirish',
        slug: 'app-store-google-play',
        description: "Mobil ilovalarni do'konlarda taqdim etish",
      },
    ],
  },
  {
    id: 'legal-compliance',
    name: 'Huquqiy Masalalar',
    slug: 'huquqiy-masalalar',
    description: "Onlayn savdo bilan bog'liq qonuniy talablar va majburiyatlar",
    topics: [
      {
        title: "Onlayn Do'kon Ochish: Qanday Ro'yxatdan O'tish?",
        slug: 'onlayn-dokon-ro-yxatdan-otish',
        description: 'Huquqiy formaliklar va hujjatlar',
      },
      {
        title: "Shaxsiy Ma'lumotlarni Himoya Qilish: O'QTM",
        slug: 'shaxsiy-malumotlarni-himoya',
        description: 'Qonuniy talablarga rioya qilish',
      },
      {
        title: 'Foydalanuvchi Shartnomasi va Konfidensiallik Siyosati',
        slug: 'foydalanuvchi-shartnomasi',
        description: "To'g'ri shartnomalar yozish",
      },
      {
        title: "Soliq Masalalari: E-commerce Bo'yicha",
        slug: 'soliq-masalalari',
        description: "Onlayn savdo bo'yicha soliq majburiyatlari",
      },
      {
        title: 'Intellektual Huquqlar: Brend va Logotiplar',
        slug: 'intellektual-huquqlar',
        description: 'Mualliflik huquqlarini himoya qilish',
      },
    ],
  },
  {
    id: 'growth-strategies',
    name: "O'sish Strategiyalari",
    slug: 'osish-strategiyalari',
    description: "Do'konni kengaytirish va daromadni oshirish",
    topics: [
      {
        title: "Franchayzing: Onlayn Do'konlarni Kengaytirish",
        slug: 'franchayzing',
        description: "Do'kon modelini kengaytirish strategiyalari",
      },
      {
        title: 'Marketplace Integratsiyasi: Yandex Market, Ozon',
        slug: 'marketplace-integratsiyasi',
        description: "Yirik marketplace'larda mahsulotlarni sotish",
      },
      {
        title: 'Afiliat Marketing: Hamkorlar Orqali Sotish',
        slug: 'afiliat-marketing',
        description: "Hamkorlar tarmog'i yaratish",
      },
      {
        title: "Cross-sell va Upsell: Qo'shimcha Sotish",
        slug: 'cross-sell-upsell',
        description: "Har bir xaridga qo'shimcha mahsulotlar taklif qilish",
      },
      {
        title: 'Loyalty Programmalar: Doimiy Mijozlar Yaratish',
        slug: 'loyalty-programmalar',
        description: "Mijozlar sadoqatini rag'batlantirish dasturlari",
      },
      {
        title: 'Sezoniy Sotish: Black Friday va Boshqa Aksiyalar',
        slug: 'sezoniy-sotish',
        description: 'Maksimal daromad olish uchun aksiyalar',
      },
    ],
  },
  {
    id: 'case-studies',
    name: 'Amaliy Misollar',
    slug: 'amaliy-misollar',
    description: "Muvaffaqiyatli onlayn do'konlar tajribasi va ularning sirlari",
    topics: [
      {
        title: "Muvaffaqiyatli O'zbek Do'konlar: Tahlil va Sabablar",
        slug: 'muvaffaqiyatli-ozbek-dokonlar',
        description: "Mahalliy muvaffaqiyatli loyihalarni o'rganish",
      },
      {
        title: 'Startupdan Million Dollar Gacha: Hikoyalar',
        slug: 'startupdan-million-dollar',
        description: 'Xalqaro muvaffaqiyat hikoyalari',
      },
      {
        title: 'Qayerda Xato Qildim: Darslar va Natijalar',
        slug: 'qayerda-xato-qildim',
        description: "Xatolardan o'rganish va ularni qayta takrorlamaslik",
      },
      {
        title: 'Bir Oy Ichida 1000+ Xaridor: Qanday Erisildi?',
        slug: 'bir-oy-ichida-1000-xaridor',
        description: "Tezkor o'sish strategiyalari",
      },
      {
        title: 'Brand Story: Brend Hikoyasi Yaratish',
        slug: 'brand-story',
        description: "Mijozlarga ta'sir qiladigan brend hikoyalari",
      },
    ],
  },
  {
    id: 'tools-resources',
    name: 'Vositalar va Resurslar',
    slug: 'vositalar-va-resurslar',
    description: 'E-commerce uchun foydali vositalar, platformalar va resurslar',
    topics: [
      {
        title: "Onlayn Do'kon Platformalari: To'liq Taqqoslash",
        slug: 'onlayn-dokon-platformalari',
        description: 'Shopify, WooCommerce, Magento va boshqalar',
      },
      {
        title: 'Bepul Marketing Vositalari: Startuplar uchun',
        slug: 'bepul-marketing-vositalari',
        description: 'Kam byudjet bilan marketing qilish',
      },
      {
        title: 'Dizayn Resurslari: Bepul Shablonlar va Rasmlar',
        slug: 'dizayn-resurslari',
        description: 'Professional dizayn uchun resurslar',
      },
      {
        title: 'E-commerce Pluginlari va Kengaytmalar',
        slug: 'ecommerce-pluginlari',
        description: "Do'kon funksiyalarini kengaytirish",
      },
      {
        title: 'CRM Tizimlari: Mijozlar Boshqaruvi',
        slug: 'crm-tizimlari',
        description: 'Mijozlar bilan ishlash uchun tizimlar',
      },
    ],
  },
];

// Barcha mavzularni bitta massivga yig'ish (qidiruv va filterlar uchun)
export const allBlogTopics: (BlogTopic & { categoryId: string; categoryName: string; categorySlug: string })[] = blogCategories.flatMap((category) =>
  category.topics.map((topic) => ({
    ...topic,
    categoryId: category.id,
    categoryName: category.name,
    categorySlug: category.slug,
  })),
);

// Slug bo'yicha kategoriya topish
export const getCategoryBySlug = (slug: string): BlogCategory | undefined => {
  return blogCategories.find((category) => category.slug === slug);
};

// Slug bo'yicha mavzu topish
export const getTopicBySlug = (
  slug: string,
): (BlogTopic & { categoryId: string; categoryName: string; categorySlug: string }) | undefined => {
  return allBlogTopics.find((topic) => topic.slug === slug);
};

// Kategoriya ID bo'yicha mavzular
export const getTopicsByCategoryId = (categoryId: string): BlogTopic[] => {
  const category = blogCategories.find((cat) => cat.id === categoryId);
  return category ? category.topics : [];
};
