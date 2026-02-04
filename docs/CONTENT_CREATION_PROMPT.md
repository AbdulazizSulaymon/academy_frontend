# Blog Content Creation Prompt

Bu promptlarni ChatGPT, Claude yoki boshqa AI modellariga berib, blog maqolalar yozdirishingiz mumkin.

---

## VARIANT 1: QISQA PROMPT (ChatGPT uchun)

```
Men O'zbekistonda onlayn savdo platformasi uchun blog maqolalari yozishim kerak. 

Mavzu: [MAVZU NOMI VA SLUG]

Talablar:
1. O'zbek tilida yozish
2. MDX format (Markdown + Frontmatter)
3. Minimum 1500-2000 so'z
4. SEO-optimallashtirilgan
5. Praktik misollar va statistika

Frontmatter formatı:
---
title: "Sarlavha (50-60 belgi)"
description: "Qisqa tavsif (150-160 belgi)"
author: "OsonSotuv Jamoasi"
date: "2025-01-16"
category: "kategoriya-slug"
---

Kontent strukturasi:
- # Asosiy sarlavha
- ## 5-10 ta bo'lim
- ### Kichik bo'limlar
- Ro'yxatlar, jadvallar, misollar
- FAQ (3-5 savol)
- Xulosa va keyingi qadamlar

Stil:
- Professional, lekin tushunarli
- Real misollar va O'zbekiston konteksti
- Raqamlar va statistika
- Amaliy maslahatlar
```

---

## VARIANT 2: TO'LIQ CONTEXT PROMPT (Har qanday AI uchun)

```markdown
# VAZIFA: Blog Maqola Yozish

Men O'zbekistonda onlayn savdo platformasi (OsonSotuv) uchun blog tizimini qurganman. Endi har bir mavzu uchun maqola yozish kerak.

## LOYIHA STRUKTURASI

```
src/data/blog/
├── blogs.ts              # Kategoriyalar va mavzular ro'yxati
└── content/              # MDX maqola fayllari
    ├── mavzu-1.mdx
    ├── mavzu-2.mdx
    └── ...
```

## MAVJUD KATEGORIYALAR

1. **nima-uchun-onlaynga-otish-kerak** (13 mavzu)
   - Onlayn do'konning afzalliklari
   - Offlayn vs Onlayn savdo
   - ROI hisoblash
   - va boshqalar...

2. **onlayn-savdo-asoslari** (12 mavzu)
   - Platformalarni tanlash
   - Do'kon dizayni
   - Mahsulot katalogi
   - va boshqalar...

3. **seo-va-marketing** (10 mavzu)
   - SEO strategiyalari
   - Google Ads
   - Social media marketing
   - va boshqalar...

4. **tolov-va-yetkazib-berish** (8 mavzu)
   - To'lov tizimlari
   - Yetkazib berish
   - Xavfsizlik
   - va boshqalar...

5. **mijozlar-bilan-ishlash** (8 mavzu)
   - CRM tizimlari
   - Mijozlar xizmati
   - Sharhlar
   - va boshqalar...

6. **texnik-sozlamalar** (6 mavzu)
   - Hosting
   - SSL
   - Backup
   - va boshqalar...

[Va boshqa kategoriyalar...]

## YOZISH KERAK BO'LGAN MAVZU

**Kategoriya:** [KATEGORIYA_SLUG]
**Mavzu:** [MAVZU_NOMI]
**Slug:** [mavzu-slug]

## MDX FORMAT

Har bir maqola quyidagi formatda bo'lishi kerak:

```mdx
---
title: "Maqola Sarlavhasi (50-60 belgi)"
description: "Qisqa tavsif SEO uchun (150-160 belgi)"
author: "OsonSotuv Jamoasi"
date: "2025-01-16"
category: "kategoriya-slug"
---

# Asosiy Sarlavha

Kirish paragraf (150-200 so'z). Mavzuni tanishtirish va nima haqida ekanligini tushuntirish.

## 1. Birinchi Bo'lim

Bu yerda birinchi asosiy masalani ko'rib chiqing...

### Kichik Bo'lim

Batafsil tushuntirish...

**Misollar:**
- Misol 1
- Misol 2

### Statistika

Raqamlar va faktlar bilan mustahkamlang.

## 2. Ikkinchi Bo'lim

...

## 3-10 Bo'limlar davom etadi...

## Xulosa

Asosiy fikrlarni jamlash:
- ✅ Asosiy nuqta 1
- ✅ Asosiy nuqta 2
- ✅ Asosiy nuqta 3

### Keyingi Qadamlar

1. Birinchi qadam
2. Ikkinchi qadam
3. Uchinchi qadam

### Qo'shimcha Resurslar

- [Tegishli maqola 1](/blog/kategoriya/mavzu-1)
- [Tegishli maqola 2](/blog/kategoriya/mavzu-2)

---

## Savol-javoblar (FAQ)

**Q: Birinchi savol?**
A: Javob...

**Q: Ikkinchi savol?**
A: Javob...

**Q: Uchinchi savol?**
A: Javob...

---

**Muallif haqida:**
OsonSotuv jamoasi O'zbekistonda onlayn savdoni rivojlantirishga yordam beradi.

**Bog'lanish:**
- Email: info@osonsotuv.uz
- Telegram: @osonsotuv
- Website: osonsotuv.uz
```

## YOZISH USLUBI

### Ton va Stil
- **Professional**: Mutaxassis darajasida
- **Tushunarli**: Boshlang'ich foydalanuvchilar uchun ham
- **Amaliy**: Konkret maslahatlar va qadamlar
- **O'zbek konteksti**: O'zbekiston misollari va realiyalari

### Kontent Talablari
1. **Hajm**: 1500-2500 so'z
2. **Bo'limlar**: 5-10 ta asosiy bo'lim
3. **Misollar**: Har bir bo'limda real misollar
4. **Statistika**: Raqamlar va faktlar
5. **Vizual**: Jadvallar, ro'yxatlar, taqqoslashlar
6. **Praktik**: Konkret qadamlar va maslahatlar

### SEO Optimizatsiya
- Title: 50-60 belgi
- Description: 150-160 belgi
- Keywords: Tabiiy ishlatish
- H2/H3 sarlavhalar: Strukturali
- Internal links: Boshqa maqolalarga
- FAQ: 3-5 savol-javob

### O'zbek Tili
- Lotin alifbosida
- Rasmiy-ommabop stil
- Tushunarli terminlar
- Kerak bo'lsa, inglizcha so'zlarni tushuntirish

## MISOL MAQOLA

Siz uchun misol sifatida "Onlayn Do'konning 10 Ta Asosiy Afzalligi" maqolasi yozilgan:

**Fayl:** `onlayn-dokonning-10-ta-asosiy-afzalligi.mdx`

Bu maqolada:
- ✅ To'liq 2000+ so'z
- ✅ 10 ta batafsil bo'lim
- ✅ Narxlar taqqoslash jadvali
- ✅ Real statistika
- ✅ O'zbekiston misollari
- ✅ FAQ bo'limi
- ✅ Keyingi qadamlar
- ✅ SEO optimallashtirilgan

## SIZNING VAZIFANGIZ

Yuqoridagi format va uslubda quyidagi mavzu uchun maqola yozing:

**Mavzu:** [MAVZU_NOMI]
**Slug:** [mavzu-slug]
**Kategoriya:** [kategoriya-slug]

Maqolada qamrab olinishi kerak:
1. [Asosiy nuqta 1]
2. [Asosiy nuqta 2]
3. [Asosiy nuqta 3]
4. [va hokazo...]

**MUHIM:** 
- O'zbek tilida yozing
- Real O'zbekiston misollari
- 2025-yil konteksti
- So'mda narxlar (agar kerak bo'lsa)
- Mahalliy kompaniyalar va xizmatlar
```

---

## VARIANT 3: COPY-PASTE READY PROMPT

Quyidagi promptni to'g'ridan-to'g'ri ChatGPT ga bering:

```
Sen professional content writer san. O'zbekistonda onlayn savdo platformasi uchun blog maqolalari yozasan.

VAZIFA: Quyidagi mavzu bo'yicha to'liq maqola yoz

MAVZU: [Mavzu nomi va slugi]
KATEGORIYA: [Kategoriya slug]

FORMAT:
```mdx
---
title: "Sarlavha"
description: "Tavsif"
author: "OsonSotuv Jamoasi"
date: "2025-01-16"
category: "kategoriya-slug"
---

# Asosiy Sarlavha

[2000+ so'zlik kontent]
```

TALABLAR:
1. O'zbek tilida (lotin)
2. 2000+ so'z
3. 7-10 bo'lim
4. Real misollar va statistika
5. O'zbekiston konteksti
6. Jadvallar va ro'yxatlar
7. FAQ (5 savol)
8. SEO optimallashtirilgan

MISOL STRUKTURA:
- Kirish (200 so'z)
- 7-10 asosiy bo'lim (har biri 200-300 so'z)
  - Kichik bo'limlar
  - Misollar
  - Statistika
  - Taqqoslashlar
- Xulosa
- Keyingi qadamlar
- FAQ
- Qo'shimcha resurslar

USLUB:
- Professional lekin tushunarli
- Amaliy maslahatlar
- Real misollar
- Raqamlar va faktlar
- O'zbekiston realiylari

BOSHLA!
```

---

## MISOLLAR UCHUN

### Kategoriya: nima-uchun-onlaynga-otish-kerak

**Mavzu 1:** Offlayn Do'kondan Onlaynga O'tish Rejasi
```
Slug: offlayn-dokondan-onlaynga-otish
Qamrab olish kerak:
- Tayyorlanish bosqichlari
- Texnik talablar
- Inventarizatsiya
- Xodimlarni o'qitish
- Marketing strategiyasi
- Launch rejasi
```

**Mavzu 2:** ROI Hisoblash: Onlayn Savdo Qancha Foyda Keltiradi
```
Slug: roi-hisoblash-onlayn-savdo
Qamrab olish kerak:
- ROI nima?
- Xarajatlar hisoblash
- Daromadlar prognozi
- Payback period
- Real misollar
- Kalkulyator
```

### Kategoriya: onlayn-savdo-asoslari

**Mavzu:** E-commerce Platformalarni Tanlash
```
Slug: ecommerce-platformalarni-tanlash
Qamrab olish kerak:
- Shopify vs WooCommerce vs Custom
- Narxlar taqqoslash
- Xususiyatlar
- Afzalliklari va kamchiliklari
- O'zbekiston uchun tavsiyalar
```

---

## FAYLNI QAYERGA SAQLASH

Tayyor maqolani quyidagi joyga saqlang:
```
/src/data/blog/content/[mavzu-slug].mdx
```

Masalan:
```
/src/data/blog/content/offlayn-dokondan-onlaynga-otish.mdx
/src/data/blog/content/roi-hisoblash-onlayn-savdo.mdx
/src/data/blog/content/ecommerce-platformalarni-tanlash.mdx
```

---

## KONTENT CHECKLIST

Har bir maqola uchun tekshiring:

- [ ] Frontmatter to'liq va to'g'ri
- [ ] Title 50-60 belgi
- [ ] Description 150-160 belgi
- [ ] 2000+ so'z
- [ ] 7-10 asosiy bo'lim
- [ ] H2/H3 sarlavhalar
- [ ] Real misollar
- [ ] Statistika va raqamlar
- [ ] O'zbekiston konteksti
- [ ] Jadvallar/ro'yxatlar
- [ ] FAQ bo'limi (3-5 savol)
- [ ] Xulosa
- [ ] Keyingi qadamlar
- [ ] Internal links
- [ ] Professional uslub
- [ ] Amaliy maslahatlar

---

## YORDAM

Agar maqola yozishda yordam kerak bo'lsa:
1. Yuqoridagi misol maqolani o'qing
2. README.md ni ko'rib chiqing
3. blogs.ts dan mavzular ro'yxatini oling
4. Bir mavzuga e'tibor bering

**Omad!** 🚀
