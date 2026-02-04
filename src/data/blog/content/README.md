# Blog MDX Content

Bu papkada blog mavzulari uchun MDX fayllar saqlanadi. Har bir fayl bitta mavzuga mos keladi.

## Struktura

```
content/
├── onlayn-dokonning-10-ta-asosiy-afzalligi.mdx
├── offlayn-dokondan-onlaynga-otish.mdx
├── ecommerce-seo-2025.mdx
└── ... (boshqa mavzular)
```

## MDX Fayl Formati

Har bir MDX fayl quyidagi strukturaga ega bo'lishi kerak:

```mdx
---
title: "Mavzu nomi"
description: "Qisqa tavsif"
author: "Muallif ismi"
date: "YYYY-MM-DD"
category: "kategoriya-slug"
---

# Sarlavha

Maqola kontenti shu yerda...

## Kichik sarlavha

Matn, rasmlar, ro'yxatlar va boshqalar...
```

## Frontmatter Maydonlari

- **title** (majburiy): Mavzu sarlavhasi
- **description** (majburiy): Qisqa tavsif (SEO uchun)
- **author** (ixtiyoriy): Muallif ismi
- **date** (ixtiyoriy): Nashr sanasi
- **category** (ixtiyoriy): Kategoriya slug

## Markdown Xususiyatlari

MDX quyidagi Markdown elementlarini qo'llab-quvvatlaydi:

### Sarlavhalar
```markdown
# H1 Sarlavha
## H2 Sarlavha
### H3 Sarlavha
```

### Matn formatlash
```markdown
**Qalin matn**
*Kursiv matn*
***Qalin va kursiv***
```

### Ro'yxatlar
```markdown
- Birinchi element
- Ikkinchi element
- Uchinchi element

1. Raqamlangan birinchi
2. Raqamlangan ikkinchi
```

### Havolalar
```markdown
[Havola matni](https://example.com)
[Ichki sahifa](/blog/kategoriya/mavzu)
```

### Rasmlar
```markdown
![Rasm tavsifi](/images/blog/rasm.jpg)
```

### Kod
```markdown
Inline kod: `const x = 10;`

Kod bloki:
\`\`\`javascript
function hello() {
  console.log("Hello!");
}
\`\`\`
```

### Horizontal line
```markdown
---
```

### Jadval
```markdown
| Sarlavha 1 | Sarlavha 2 |
|-----------|-----------|
| Qator 1   | Ma'lumot  |
| Qator 2   | Ma'lumot  |
```

## Yangi Maqola Qo'shish

1. Mavzu slugini aniqlang (`blogs.ts` dan)
2. Yangi `.mdx` fayl yarating shu slug nomi bilan
3. Frontmatter va kontent yozing
4. Faylni `content/` papkasiga saqlang
5. Build qiling: `npm run build`

## Misol

Fayl nomi: `onlayn-dokonning-10-ta-asosiy-afzalligi.mdx`

```mdx
---
title: "Onlayn Do'konning 10 Ta Asosiy Afzalligi"
description: "Nima uchun onlayn do'kon ochish sizning biznesingiz uchun eng yaxshi qaror"
author: "OsonSotuv Jamoasi"
date: "2025-01-16"
---

# Onlayn Do'konning 10 Ta Asosiy Afzalligi

Zamonaviy biznes dunyosida onlayn savdo...

## 1. 24/7 Ishlash

Onlayn do'kon hech qachon yopilmaydi...
```

## SEO Optimizatsiya

Har bir maqola uchun:
- ✅ To'liq meta tags (title, description)
- ✅ Structured data (Schema.org)
- ✅ Canonical URL
- ✅ Open Graph tags
- ✅ Static HTML generation

## Build va Deploy

```bash
# Development
npm run dev

# Production build
npm run build

# Deploy
npm run deploy
```

## Xususiyatlar

- ✅ Static Site Generation (SSG)
- ✅ SEO-friendly
- ✅ Fast page loads
- ✅ Search engine indexing
- ✅ Markdown support
- ✅ Code highlighting
- ✅ Responsive design

## Maslahatlar

1. **Slug nomlari:** Faqat kichik harflar, raqamlar va `-` ishlatish
2. **Rasmlar:** `/public/images/blog/` da saqlash
3. **Ichki havolalar:** To'liq yo'l bilan `/blog/category/topic`
4. **SEO:** Title va description ni to'liq va qiziqarli yozish
5. **Kontent:** Kamida 1000+ so'z yozish (SEO uchun yaxshi)

## Yordam

Savol yoki muammo bo'lsa:
- Email: dev@osonsotuv.uz
- Telegram: @osonsotuv_dev
