# PROMPT YOZISH QO'LLANMASI

## 📖 Qanday Ishlatish?

### 1-QADAM: Mavzu Tanlang

`QOLGAN_MAVZULAR.md` faylini ochib, qaysi mavzu uchun maqola yozish kerakligini tanlang.

**Masalan:**
```
Mavzu: E-commerce Platformalarni Tanlash: Qaysi Biri Sizga Mos?
Slug: ecommerce-platformalarni-tanlash
Kategoriya: onlayn-savdo-asoslari
```

---

### 2-QADAM: Prompt Tayyorlash

`COPY_PASTE_PROMPT.txt` faylini oching va quyidagilarni o'zgartiring:

**OLDIN:**
```
MAVZU: [Bu yerga mavzu nomini yozing]
SLUG: [Bu yerga slugni yozing]
KATEGORIYA: [Bu yerga kategoriya slugini yozing]
```

**KEYIN (Masalan):**
```
MAVZU: E-commerce Platformalarni Tanlash: Qaysi Biri Sizga Mos?
SLUG: ecommerce-platformalarni-tanlash
KATEGORIYA: onlayn-savdo-asoslari
```

---

### 3-QADAM: ChatGPT/Claude ga Yuborish

To'liq promptni copy qilib, ChatGPT yoki Claudega yuboring:

1. **ChatGPT:** https://chat.openai.com
2. **Claude:** https://claude.ai
3. **Boshqa AI:** Sizning tanlagan AI service

---

### 4-QADAM: Maqolani Tekshirish va Saqlash

ChatGPT javobini oling va tekshiring:

- ✅ Frontmatter to'liqmi?
- ✅ 2000+ so'z bormi?
- ✅ O'zbek tilida yozilganmi?
- ✅ Real misollar bormi?

Keyin faylga saqlang:
```
/src/data/blog/content/ecommerce-platformalarni-tanlash.mdx
```

---

### 5-QADAM: Build va Test

```bash
npm run build
npm run dev
```

Browserda tekshiring:
```
http://localhost:3010/blog/onlayn-savdo-asoslari/ecommerce-platformalarni-tanlash
```

---

## 📝 MISOL PROMPT

Quyida to'liq misol prompt:

```
Sen professional content writer san. O'zbekistonda onlayn savdo platformasi (OsonSotuv) uchun blog maqolalari yozasan.

═══════════════════════════════════════════
VAZIFA
═══════════════════════════════════════════

Quyidagi mavzu bo'yicha to'liq, SEO-optimallashtirilgan maqola yoz:

MAVZU: E-commerce Platformalarni Tanlash: Qaysi Biri Sizga Mos?
SLUG: ecommerce-platformalarni-tanlash
KATEGORIYA: onlayn-savdo-asoslari

[... COPY_PASTE_PROMPT.txt dagi qolgan hamma narsa ...]
```

---

## ✅ CHECKLIST (Har bir maqola uchun)

Yozgandan so'ng tekshiring:

- [ ] Frontmatter to'liq va to'g'ri
- [ ] Title 50-60 belgi
- [ ] Description 150-160 belgi
- [ ] 2000+ so'z
- [ ] 7-10 asosiy bo'lim
- [ ] H2/H3 sarlavhalar
- [ ] Real O'zbekiston misollari
- [ ] Statistika va raqamlar
- [ ] Jadvallar yoki taqqoslashlar
- [ ] Ro'yxatlar (bullets)
- [ ] FAQ bo'limi (5 savol)
- [ ] Xulosa bo'limi
- [ ] Keyingi qadamlar
- [ ] Internal links (3-5 ta)
- [ ] Professional uslub
- [ ] Amaliy maslahatlar
- [ ] So'mda narxlar
- [ ] O'zbek tilida
- [ ] Tushunarli va oddiy

---

## 🎯 PRO TIPLAR

### 1. Bir vaqtda bir nechta maqola

Agar bir nechta mavzu bo'lsa, har biri uchun alohida chat oching:
- Chat 1: "E-commerce Platformalarni Tanlash"
- Chat 2: "Onlayn Do'kon Dizayni"
- Chat 3: "SEO Asoslari"

### 2. Kontekstni saqlab qolish

Agar maqola ketma-ketlikni talab qilsa (masalan, "Boshlang'ich Qo'llanma" keyin "Platformalarni Tanlash"), avval boshlang'ich maqolani yozing.

### 3. Quality Control

Har bir maqolani yozgandan so'ng:
1. O'qib ko'ring
2. O'zbek tilida yozilganligini tekshiring
3. Real misollar va statistika bormi?
4. 2000+ so'z bormi?

### 4. Build vaqti

Har 5-10 maqola yozgandan so'ng `npm run build` qilib, xatolarni tekshiring.

---

## 📚 QO'SHIMCHA RESURSLAR

- **COPY_PASTE_PROMPT.txt** - Asosiy prompt
- **QOLGAN_MAVZULAR.md** - Barcha mavzular ro'yxati
- **MAVZULAR_ROYXATI.md** - To'liq kategoriyalar
- **src/data/blog/content/onlayn-dokonning-10-ta-asosiy-afzalligi.mdx** - Misol maqola

---

## 🆘 MUAMMOLAR VA YECHIMLAR

### Muammo 1: Maqola qisqa (< 2000 so'z)

**Yechim:** ChatGPT ga qayta yuboring:
```
Bu maqola juda qisqa. Minimum 2000 so'z bo'lishi kerak. Qo'shimcha bo'limlar qo'shing:
- Amaliy misollar
- Statistika
- Jadvallar
- FAQ bo'limini kengaytiring
```

### Muammo 2: Ingliz tilida yozildi

**Yechim:** Promptning boshiga qo'shing:
```
MUHIM: Faqat O'zbek tilida (lotin alifbosi) yozing. Ingliz tilida YOZMA!
```

### Muammo 3: Narxlar dollar/euroda

**Yechim:** Promptga qo'shing:
```
Narxlarni faqat O'zbek so'mida yozing. Masalan: 1 million so'm, 5 million so'm.
Dollar yoki euro ishlatmang!
```

### Muammo 4: Real misollar yo'q

**Yechim:** Promptga qo'shing:
```
Har bir bo'limda real O'zbekiston misollari qo'shing:
- Toshkentdagi kompaniyalar
- Mahalliy brendlar (Click, Payme, Uzum)
- O'zbekiston statistikasi
```

---

## 🎉 MUVaffaqiyat!

Agar barcha maqolalar tayyor bo'lsa:
- 80+ SEO-friendly maqola
- To'liq indeksatsiya
- Yuqori organic trafik
- Professional kontent

**Omad!** 🚀
