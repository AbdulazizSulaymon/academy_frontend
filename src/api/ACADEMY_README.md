# Academy API Documentation

Bu papkada onlayn akademiya uchun barcha kerakli type, interface va API funksiyalari mavjud.

## 📁 Fayllar

### 1. `models.ts`
Barcha modellarning ro'yxati (singular va plural shakllar).

**Qo'shilgan modellar:**
- CourseCategory, Course, CourseEnrollment
- Lesson, Video
- Assignment, UserAssignment
- Task, UserTask
- Bookmark, Event
- ShopCategory, Product, FavoriteProduct
- Order, OrderItem
- CoinHistory

### 2. `academy-types.ts`
TypeScript interface va type'lar.

**Nimalar bor:**
- ✅ Barcha enum'lar (AssignmentStatus, TaskStatus, ProductLevel, va boshqalar)
- ✅ Barcha model interface'lari
- ✅ Helper funksiyalar:
  - `getMultiLangText()` - Til bo'yicha matnni olish
  - `hasEnoughCoins()` - Coin yetarliligini tekshirish
  - `getProductLevelCoins()` - Level uchun coin talabini olish
  - `formatCoins()` - Coin'ni formatlash
  - `getStatusColor()` - Status uchun rang olish
  - `calculateProgress()` - Progress foizni hisoblash

### 3. `academy-api.ts`
Backend bilan ishlash uchun API funksiyalari.

**API kategoriyalari:**
- 📚 `courseApi` - Kurslar va kategoriyalar
- 📖 `lessonApi` - Darslar va videolar
- 📝 `assignmentApi` - Topshiriqlar
- ✅ `taskApi` - Vazifalar
- 🔖 `bookmarkApi` - Saqlangan darslar
- 📅 `eventApi` - Tadbirlar
- 🛒 `shopApi` - Do'kon va buyurtmalar
- 💰 `coinApi` - Coin tarixi va balans

### 4. `academy-index.ts`
Barcha export'larni yig'adigan asosiy fayl.

## 🚀 Ishlatish

### Import qilish

```typescript
// Barcha narsalarni import qilish
import * as Academy from '@/api/academy-index';

// Yoki faqat kerakli narsalarni
import { 
  Course, 
  CourseCategory, 
  Language,
  academyApi 
} from '@/api/academy-index';

// Yoki to'g'ridan-to'g'ri fayldan
import { courseApi } from '@/api/academy-api';
import { AssignmentStatus, getMultiLangText } from '@/api/academy-types';
```

### Misollar

#### 1. Kurslarni olish

```typescript
import { courseApi, Course } from '@/api/academy-index';

// Barcha kurslarni olish
const courses: Course[] = await courseApi.getCourses({
  isPublished: true,
  page: 1,
  limit: 10
});

// Kategoriya bo'yicha kurslar
const coursesInCategory = await courseApi.getCourses({
  categoryId: 'category-id-here',
  isPublished: true
});

// Kursga yozilish (token kerak)
const enrollment = await courseApi.enrollCourse('course-id', token);
```

#### 2. Multi-language matn

```typescript
import { getMultiLangText, Language } from '@/api/academy-types';

const course = {
  titleUz: 'JavaScript asoslari',
  titleRu: 'Основы JavaScript',
  titleEn: 'JavaScript Fundamentals'
};

// Til bo'yicha matn olish
const title = getMultiLangText(course, 'title', Language.uz);
// Result: "JavaScript asoslari"
```

#### 3. Coin bilan ishlash

```typescript
import { hasEnoughCoins, formatCoins, coinApi } from '@/api/academy-index';

// Coin yetarliligini tekshirish
const canBuy = hasEnoughCoins(userCoins, productPrice);

// Coin'ni formatlash
const formatted = formatCoins(1500); // "1,500"

// Coin balansini olish
const balance = await coinApi.getBalance(token);

// Coin tarixini olish
const history = await coinApi.getHistory(token, { page: 1, limit: 20 });
```

#### 4. Topshiriq yuborish

```typescript
import { assignmentApi, AssignmentStatus } from '@/api/academy-index';

// O'z topshiriqlarimni olish
const myAssignments = await assignmentApi.getMyAssignments(token);

// Topshiriqni yuborish
const result = await assignmentApi.submitAssignment(
  'assignment-id',
  'https://github.com/username/repo', // submission URL
  token
);
```

#### 5. Do'kondan xarid qilish

```typescript
import { shopApi, ProductLevel, hasEnoughCoins } from '@/api/academy-index';

// Mahsulotlarni olish
const products = await shopApi.getProducts({
  level: ProductLevel.Level1,
  isAvailable: true
});

// Sevimli mahsulotlarni olish
const favorites = await shopApi.getMyFavorites(token);

// Buyurtma qilish
const order = await shopApi.createOrder(
  {
    items: [
      { productId: 'product-1', quantity: 2 },
      { productId: 'product-2', quantity: 1 }
    ],
    deliveryAddress: 'Toshkent, Chilonzor',
    deliveryPhone: '+998901234567'
  },
  token
);
```

#### 6. Progress tracking

```typescript
import { calculateProgress } from '@/api/academy-types';

const completedLessons = 5;
const totalLessons = 10;

const progress = calculateProgress(completedLessons, totalLessons);
console.log(`${progress}%`); // "50%"

// Progress'ni yangilash
await courseApi.updateProgress(enrollmentId, progress, token);
```

#### 7. Status rang olish

```typescript
import { getStatusColor } from '@/api/academy-types';

const color = getStatusColor('Completed'); // "#8B5CF6"
const color2 = getStatusColor('Pending'); // "#F59E0B"

// React komponentda
<div style={{ backgroundColor: getStatusColor(status) }}>
  {status}
</div>
```

## 🔐 Autentifikatsiya

Ko'pchilik API funksiyalar `token` parametrini talab qiladi. Token'ni olish:

```typescript
// Login qilgandan keyin
const { token } = await fetch('/api/auth/login', {
  method: 'POST',
  body: JSON.stringify({ username, password })
}).then(res => res.json());

// LocalStorage'ga saqlash
localStorage.setItem('token', token);

// Ishlatish
const myEnrollments = await courseApi.getMyEnrollments(token);
```

## 📋 Enum'lar

### AssignmentStatus
- `Available` - Mavjud
- `NotSubmitted` - Topshirilmagan
- `Submitted` - Topshirilgan
- `Graded` - Baholangan

### TaskStatus
- `NotStarted` - Boshlanmagan
- `Checking` - Tekshirilmoqda
- `Completed` - Tugatilgan
- `Rejected` - Rad etilgan

### AcademyEventStatus
- `Expected` - Kutilmoqda
- `OnGoing` - Davom etmoqda
- `Completed` - Tugallangan
- `Canceled` - Bekor qilingan

### ProductLevel
- `Level1` - 1-daraja (0+ coins)
- `Level2` - 2-daraja (500+ coins)
- `Level3` - 3-daraja (1000+ coins)

### OrderStatus
- `Pending` - Kutilmoqda
- `Processing` - Qayta ishlanmoqda
- `Completed` - Tugallangan
- `Canceled` - Bekor qilingan

### CoinTransactionType
- `Earned` - Topilgan (topshiriqlardan)
- `Spent` - Sarflangan (xaridda)
- `Bonus` - Bonus
- `Refund` - Qaytarilgan

## 🌐 Multi-Language Support

Barcha content 3 ta tilda:
- **uz** - O'zbek tili
- **ru** - Rus tili
- **en** - Ingliz tili

Har bir model uchun:
```typescript
interface Example {
  nameUz: string;
  nameRu: string;
  nameEn: string;
  // yoki
  titleUz: string;
  titleRu: string;
  titleEn: string;
}
```

## 🎯 Best Practices

1. **Har doim type'larni ishlating:**
```typescript
// ✅ Yaxshi
const course: Course = await courseApi.getCourseById(id);

// ❌ Yomon
const course = await courseApi.getCourseById(id);
```

2. **Error handling qo'shing:**
```typescript
try {
  const courses = await courseApi.getCourses();
} catch (error) {
  console.error('Kurslarni yuklashda xatolik:', error);
  // Error handling
}
```

3. **Loading state ishlating:**
```typescript
const [loading, setLoading] = useState(false);
const [courses, setCourses] = useState<Course[]>([]);

useEffect(() => {
  setLoading(true);
  courseApi.getCourses()
    .then(setCourses)
    .finally(() => setLoading(false));
}, []);
```

4. **Token'ni xavfsiz saqlang:**
```typescript
// LocalStorage o'rniga httpOnly cookie ishlatish yaxshiroq
// yoki NextAuth kabi library ishlatish
```

## 📝 Backend bilan integratsiya

Backend'da ushbu modellar uchun avtomatik endpoint'lar yaratilgan:

```
GET    /api/courses
GET    /api/courses/:id
POST   /api/courses
PUT    /api/courses/:id
DELETE /api/courses/:id

// va hokazo barcha modellar uchun
```

Backend'da `pnpm generate-dev` buyrug'ini ishga tushirgandan keyin barcha CRUD endpoint'lar tayyor bo'ladi.

## 🔄 Yangilanishlar

Agar Prisma schema yangilansa:
1. Backend'da: `pnpm generate-dev`
2. Frontend'da: Bu fayllarni yangilash kerak (yoki avtomatik generator yozish mumkin)

---

**Savollar yoki takliflar bo'lsa, team lead bilan bog'laning!** 🚀
