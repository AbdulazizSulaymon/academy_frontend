# MDX Blog Implementation - Texnik Hujjat

## Umumiy Ko'rinish

Blog tizimi MDX (Markdown + JSX) asosida qurilgan. Bu yondashuv SEO-friendly, scalable va maintainable.

## Arxitektura

```
src/
├── data/blog/
│   ├── blogs.ts              # Blog kategoriyalar va topiclar
│   └── content/              # MDX fayllar
│       ├── README.md
│       └── onlayn-dokonning-10-ta-asosiy-afzalligi.mdx
├── lib/
│   └── mdx.ts                # MDX utility funksiyalar
├── components/
│   ├── BlogCard.tsx          # Blog kartochka komponenti
│   └── MDXContent.tsx        # MDX content renderer
└── pages/
    └── blog/
        ├── index.tsx         # Blog listing
        ├── [category].tsx    # Kategoriya sahifasi
        └── [category]/
            └── [topic].tsx   # Topic sahifasi (MDX render)
```

## Asosiy Komponentlar

### 1. MDX Utility (`src/lib/mdx.ts`)

MDX fayllarni o'qish va parse qilish uchun:

```typescript
// MDX content olish
const mdxContent = await getMDXContent('topic-slug');

// MDX mavjudligini tekshirish
const exists = mdxContentExists('topic-slug');

// Barcha MDX sluglarni olish
const slugs = getAllMDXSlugs();
```

### 2. MDXContent Component (`src/components/MDXContent.tsx`)

MDX contentni render qiladi:

```tsx
<MDXContent content={mdxContent.content} />
```

### 3. Topic Page (`src/pages/blog/[category]/[topic].tsx`)

Dynamic route + Static Site Generation:

```typescript
// Build vaqtida barcha topiclar uchun static HTML yaratiladi
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = allBlogTopics.map((topic) => ({
    params: { category: topic.categorySlug, topic: topic.slug }
  }));
  return { paths, fallback: false };
};

// Har bir sahifa uchun MDX content olinadi
export const getStaticProps: GetStaticProps = async (context) => {
  const mdxContent = await getMDXContent(topicSlug);
  return { props: { topic, category, mdxContent } };
};
```

## SEO Optimizatsiya

Har bir sahifa to'liq SEO-optimallashtirilgan:

### 1. Meta Tags
```tsx
<Head>
  <title>{topic.title} | {category.name} - {projectName}</title>
  <meta name="description" content={metaDescription} />
  <meta name="robots" content="index, follow" />
</Head>
```

### 2. Open Graph
```tsx
<meta property="og:title" content={topic.title} />
<meta property="og:description" content={metaDescription} />
<meta property="og:url" content={`${SITE_URL}/blog/${category.slug}/${topic.slug}`} />
<meta property="og:image" content={`/images/blog/${topic.slug}.jpg`} />
```

### 3. Structured Data
```tsx
<script type="application/ld+json">
{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: topic.title,
  description: metaDescription,
  url: `${SITE_URL}/blog/${category.slug}/${topic.slug}`
})}
</script>
```

### 4. Canonical URL
```tsx
<link rel="canonical" href={`${SITE_URL}/blog/${category.slug}/${topic.slug}`} />
```

## Yangi Maqola Qo'shish

### Bosqichma-bosqich:

1. **Slug aniqlash**
   - `src/data/blog/blogs.ts` da mavjud topiclar ro'yxatini ko'ring
   - Mavzu uchun slug ni aniqlang (masalan: `onlayn-dokon-dizayni`)

2. **MDX fayl yaratish**
   ```bash
   touch src/data/blog/content/onlayn-dokon-dizayni.mdx
   ```

3. **Frontmatter yozish**
   ```mdx
   ---
   title: "Onlayn Do'kon Dizayni: Mijozlarni Jalb Qilish Sirlari"
   description: "Professional va a'zo bo'lgan do'kon dizayni yaratish bo'yicha qo'llanma"
   author: "OsonSotuv Jamoasi"
   date: "2025-01-16"
   category: "onlayn-savdo-asoslari"
   ---
   ```

4. **Kontent yozish**
   - Markdown formatda yozing
   - Minimum 1000+ so'z (SEO uchun)
   - Sarlavhalar, ro'yxatlar, havolalar qo'shing

5. **Rasm qo'shish** (ixtiyoriy)
   ```bash
   # Rasm nomi slug bilan bir xil
   public/images/blog/onlayn-dokon-dizayni.jpg
   ```

6. **Build va test**
   ```bash
   npm run build
   npm run dev
   # Browser: http://localhost:3010/blog/onlayn-savdo-asoslari/onlayn-dokon-dizayni
   ```

## Build va Deploy

### Development
```bash
npm run dev
# Port: 3010
```

### Production Build
```bash
npm run build
# Barcha sahifalar static HTML ga aylanadi
```

### Deploy
```bash
npm run deploy
# 'out' papkasiga static fayllar yaratiladi
```

## Performance

### Build Time:
- 80+ sahifa: ~2-3 daqiqa
- Har bir sahifa static HTML

### Runtime:
- Static HTML serve qilinadi
- No JavaScript required for content
- Fast page loads (<1s)

### SEO:
- ✅ Google, Yandex to'liq indeksatsiya qiladi
- ✅ Barcha content HTML da
- ✅ No client-side rendering

## Xatoliklarni Tuzatish

### MDX fayl topilmasa:
1. Slug to'g'ri yozilganligini tekshiring
2. Fayl `content/` papkasida ekanligini tekshiring
3. Build qaytadan qiling

### Build xatolari:
```bash
# Cache tozalash
rm -rf .next
npm run build
```

### Linter xatolari:
```bash
npm run lint:fix
```

## Best Practices

### 1. Slug Nomlash
- ✅ `onlayn-dokon-dizayni`
- ❌ `Onlayn_Dokon_Dizayni`
- ❌ `onlayn dokon dizayni`

### 2. Frontmatter
- Title: 50-60 belgi
- Description: 150-160 belgi
- Author: To'liq ism

### 3. Kontent
- Minimum: 1000 so'z
- Sarlavhalar: H2, H3 ishlatish
- Ichki havolalar: Boshqa maqolalarga
- Rasmlar: Optimallashtirilgan (WebP)

### 4. SEO
- Keywords tabiiy ishlatish
- Meta description qiziqarli yozish
- Alt text rasmlar uchun

## Kelajakda Qo'shish Mumkin

1. **MDX Components**
   - Custom React componentlar MDX ichida
   - Interaktiv elementlar

2. **Search**
   - Full-text search
   - Algolia integratsiyasi

3. **Comments**
   - Disqus yoki boshqa comment sistеma

4. **Analytics**
   - Google Analytics
   - Reading time
   - View count

5. **RSS Feed**
   - Avtomatik RSS generation

## Yordam

Savol yoki muammo bo'lsa:
- **Email:** dev@osonsotuv.uz
- **Telegram:** @osonsotuv_dev
- **GitHub:** github.com/osonsotuv

## Texnologiyalar

- **Next.js 15** - Framework
- **MDX** - Markdown + React
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Static Site Generation** - SEO

---

**Yaratilgan:** 2025-01-16
**Versiya:** 1.0.0
**Muallif:** OsonSotuv Development Team
