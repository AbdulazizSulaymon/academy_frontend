const fs = require('fs');
const path = require('path');

// Slug yaratish
function createSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// MDX template
function generateMDXTemplate(title, slug, category, description) {
  const date = new Date().toISOString().split('T')[0];
  
  return `---
title: "${title}"
description: "${description}"
author: "Algorismic Jamoasi"
date: "${date}"
category: "${category}"
---

# ${title}

${description}

## Kirish

Bu yerda maqola kirish qismini yozing...

## Asosiy Bo'lim 1

Birinchi asosiy bo'lim matni...

### Kichik Bo'lim

Kichik bo'lim matni...

## Asosiy Bo'lim 2

Ikkinchi asosiy bo'lim matni...

## Xulosa

Maqola xulosasi...

## FAQ

### Savol 1?
Javob 1.

### Savol 2?
Javob 2.

### Savol 3?
Javob 3.
`;
}

// CLI dan ishlatish
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.log(`
📝 Blog Post Generator

Foydalanish:
  node scripts/generate-blog-post.js <title> <category-slug> [description]

Misol:
  node scripts/generate-blog-post.js "Web Development Asoslari" "veb-dasturlash"
  node scripts/generate-blog-post.js "React Hooks" "veb-dasturlash" "React Hooks haqida to'liq qo'llanma"

Bu script:
  1. Title dan slug yaratadi
  2. MDX fayl yaratadi
  3. src/data/blog/content/ folderiga saqlaydi
  4. blogs.ts ga qo'shadi (ixtiyoriy)
    `);
    process.exit(0);
  }

  const title = args[0];
  const categorySlug = args[1];
  const description = args[2] || `${title} haqida batafsil maqola`;

  // Slug yaratish
  const slug = createSlug(title);
  const fileName = `${slug}.mdx`;
  const contentDir = path.join(__dirname, '../src/data/blog/content');
  const filePath = path.join(contentDir, fileName);

  // Folder mavjudligini tekshirish
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
  }

  // Fayl mavjudligini tekshirish
  if (fs.existsSync(filePath)) {
    console.error(`❌ Fayl allaqachon mavjud: ${fileName}`);
    process.exit(1);
  }

  // MDX fayl yaratish
  const content = generateMDXTemplate(title, slug, categorySlug, description);
  fs.writeFileSync(filePath, content, 'utf-8');

  console.log(`\n✅ Blog post yaratildi!`);
  console.log(`📁 Fayl: ${filePath}`);
  console.log(`📝 Slug: ${slug}`);
  console.log(`\nKeyingi qadamlar:`);
  console.log(`1. MDX faylni to'ldiring: ${filePath}`);
  console.log(`2. Rasm qo'shing: public/images/blog/${slug}.jpg`);
  console.log(`3. blogs.ts ga qo'shing (ixtiyoriy)\n`);
}

module.exports = { generateMDXTemplate, createSlug };
