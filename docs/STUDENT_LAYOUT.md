# Student Layout - Chiroyli Dizayn

## ✨ Yaratilgan Fayllar

### 1. Layout Komponenti
**Fayl**: `src/components/student-layout.tsx`

Modern va chiroyli student layout - **Ant Design ishlatilmagan**!

### 2. Birinchi Page
**Fayl**: `src/pages/student/index.tsx`

Student dashboard - landing page

---

## 🎨 Dizayn Xususiyatlari

### Layout Features

#### 1. **Sidebar Navigation** 🎯
- Collapse/expand imkoniyati
- Smooth transitions
- Active state ko'rsatkichlari
- Badge notifications
- Gradient hover effects
- Responsive (mobile drawer)

#### 2. **Header** 📱
- Sticky position
- Backdrop blur effect
- Theme toggle (dark/light)
- Notifications
- Profile dropdown
- Mobile menu button

#### 3. **User Info Card** 👤
- Avatar gradient
- Online status indicator
- Coin balance ko'rsatkichi
- Smooth animations

#### 4. **Menu Items** 📋
8 ta asosiy bo'lim:
- 🏠 Bosh sahifa
- 📚 Mening kurslarim
- 🏆 Topshiriqlar
- 📅 Tadbirlar
- 🔖 Saqlangan
- 📊 Progress
- 💰 Coin
- 🛒 Do'kon

---

## 🎨 Vizual Dizayn

### Ranglar va Gradientlar

#### Menu Item Colors
```css
Bosh sahifa: from-blue-500 to-cyan-500
Kurslar: from-purple-500 to-pink-500
Topshiriqlar: from-orange-500 to-red-500
Tadbirlar: from-green-500 to-emerald-500
Saqlangan: from-yellow-500 to-amber-500
Progress: from-teal-500 to-cyan-500
Coin: from-indigo-500 to-purple-500
Do'kon: from-pink-500 to-rose-500
```

#### Theme Variants

**Light Mode**:
- Sidebar: `from-white via-blue-50 to-purple-50`
- Background: `bg-gray-50`
- Cards: `bg-white` with `border-gray-200`

**Dark Mode**:
- Sidebar: `from-gray-800 via-gray-900 to-black`
- Background: `bg-gray-900`
- Cards: `bg-gray-800` with `border-gray-700`
- Backdrop blur effect

---

## 📊 Dashboard Features

### Stats Cards (4 ta)
1. **Aktiv kurslar** - Ko'k gradient
2. **Topshiriqlar** - Qizil gradient
3. **Progress** - Yashil gradient
4. **Streak** - Sariq gradient

### Aktiv Kurslar
- Kurs rasmi
- Title
- Progress bar
- Completed/Total darslar
- Hover effects

### Yaqin Tadbirlar
- Tadbir nomi
- Sana va vaqt
- Online/Offline ko'rsatkichi

### Yutuqlar
- Icon
- Tavsif
- Vaqt

---

## 💻 Ishlatish

### Layout'ni Ishlatish

```tsx
import StudentLayout from '@src/components/student-layout';

const MyPage = () => {
  return (
    <StudentLayout title="Sahifa nomi">
      {/* Content */}
    </StudentLayout>
  );
};
```

### Yangi Page Yaratish

1. `src/pages/student/` papkasida yangi fayl yarating
2. Layout'ni import qiling
3. Content qo'shing

**Misol - Courses Page**:

```tsx
// src/pages/student/courses.tsx
import StudentLayout from '@src/components/student-layout';

const CoursesPage = () => {
  return (
    <StudentLayout title="Mening Kurslarim">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Kurslarim</h1>
        {/* Courses content */}
      </div>
    </StudentLayout>
  );
};

export default CoursesPage;
```

---

## 🎯 Responsive Behavior

### Breakpoints

- **Mobile** (< 768px): Drawer menu
- **Tablet** (768px - 1024px): Collapsed sidebar
- **Desktop** (> 1024px): Full sidebar

### Mobile Features

- Hamburger menu
- Drawer overlay
- Touch-friendly buttons
- Optimized spacing

---

## 🔧 Sozlamalar

### Sidebar Collapse

Layout automatically:
- Desktop: sidebar open by default
- Mobile/Tablet: sidebar collapsed by default
- Persists user preference

### Theme

- Auto-detects system theme
- Manual toggle
- Persists in localStorage
- Smooth transitions

---

## 🎨 Custom Components

### Menu Item

```tsx
<Link href="/path">
  <div className="group flex items-center gap-3 px-3 py-3 rounded-xl ...">
    <Icon />
    <span>Label</span>
    <Badge count={5} />
  </div>
</Link>
```

### Stat Card

```tsx
<div className="rounded-2xl p-6 ...">
  <div className="p-3 rounded-xl bg-blue-500/10">
    <Icon className="text-2xl" />
  </div>
  <p className="text-sm">Label</p>
  <p className="text-3xl font-bold">Value</p>
</div>
```

---

## 🚀 Keyingi Qadamlar

### 1. Qolgan Sahifalarni Yaratish

```bash
src/pages/student/
├── index.tsx ✅
├── courses.tsx ⏳
├── assignments.tsx ⏳
├── events.tsx ⏳
├── bookmarks.tsx ⏳
├── progress.tsx ⏳
├── coins.tsx ⏳
├── shop.tsx ⏳
├── settings.tsx ⏳
└── profile.tsx ⏳
```

### 2. Backend Integration

- API endpoints bilan bog'lash
- Real data ko'rsatish
- Loading states
- Error handling

### 3. Qo'shimcha Features

- Search functionality
- Filters
- Sorting
- Pagination
- Real-time updates
- Notifications system

---

## 🎨 Design Principles

### 1. **Minimalizm**
- Clean interface
- Faqat kerakli elementlar
- White space usage

### 2. **Gradient Magic**
- Har bir element o'ziga xos gradient
- Smooth color transitions
- Eye-catching but not overwhelming

### 3. **Micro-interactions**
- Hover effects
- Scale animations
- Color transitions
- Loading states

### 4. **Accessibility**
- Keyboard navigation
- Screen reader friendly
- High contrast
- Focus indicators

---

## 🖼️ Screenshot Layout

```
┌─────────────────────────────────────────────────────────────┐
│                         HEADER                               │
│  [Menu] Dashboard              [Theme] [🔔] [Profile]       │
├───────┬─────────────────────────────────────────────────────┤
│       │                                                      │
│ SIDE  │                   CONTENT                           │
│ BAR   │                                                      │
│       │  ┌──────────────────────────────────────────┐       │
│ 🏠    │  │    Welcome Card (Gradient)               │       │
│ 📚    │  └──────────────────────────────────────────┘       │
│ 🏆    │                                                      │
│ 📅    │  ┌────┐  ┌────┐  ┌────┐  ┌────┐                   │
│ 🔖    │  │Stat│  │Stat│  │Stat│  │Stat│                   │
│ 📊    │  └────┘  └────┘  └────┘  └────┘                   │
│ 💰    │                                                      │
│ 🛒    │  ┌──────────────────┐  ┌──────────┐               │
│       │  │ Active Courses   │  │ Events   │               │
│ ⚙️    │  │                  │  │          │               │
│ 🚪    │  └──────────────────┘  └──────────┘               │
│       │                                                      │
└───────┴─────────────────────────────────────────────────────┘
```

---

## 🎯 Props va Customization

### StudentLayout Props

```typescript
interface StudentLayoutProps {
  children: React.ReactNode;
  title?: string; // Header title
}
```

### Qo'shimcha Customization

Layout komponentida o'zgartirish mumkin:
- Menu items
- Colors
- Sidebar width
- Header height
- Spacing
- Animations

---

## 🌟 Best Practices

1. **Har bir page uchun title bering**:
```tsx
<StudentLayout title="Mening kurslarim">
```

2. **Consistent spacing ishlatmoq**:
```tsx
<div className="space-y-6"> {/* Container */}
  <div className="p-6"> {/* Card */}
```

3. **Dark mode support**:
```tsx
className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
```

4. **Loading states qo'shish**:
```tsx
{loading ? <Skeleton /> : <Content />}
```

5. **Error boundaries**:
```tsx
<ErrorBoundary fallback={<ErrorPage />}>
  <StudentLayout>...</StudentLayout>
</ErrorBoundary>
```

---

## 🎨 Ant Design vs Custom

### Nega Ant Design ishlatmadik?

**Custom Layout Advantages**:
- ✅ 100% customizable
- ✅ Lighter weight
- ✅ Unique design
- ✅ No vendor lock-in
- ✅ Better performance
- ✅ Full control

**What we used instead**:
- Tailwind CSS
- React Icons
- Custom components
- CSS gradients
- Smooth animations

---

## 📱 Mobile Experience

### Features

- **Touch-friendly**: Large tap targets
- **Swipe gestures**: Close drawer
- **Responsive images**: Optimized loading
- **Fast animations**: 60fps
- **Minimal loading**: Critical CSS first

### Testing

Test qilish uchun:
```bash
npm run dev
# Browser DevTools > Toggle Device Toolbar
# Test: iPhone, iPad, Android
```

---

## 🔥 Performance

### Optimizations

1. **Lazy Loading**: Pages on demand
2. **Memoization**: React.memo for layout
3. **Observer Pattern**: MobX for state
4. **CSS Optimization**: Purged unused styles
5. **Image Optimization**: Next.js Image

### Metrics Target

- **FCP**: < 1s
- **LCP**: < 2s
- **TTI**: < 3s
- **CLS**: < 0.1

---

## 🎉 Summary

**Yaratildi**:
- ✅ Chiroyli student layout (Ant Design'siz)
- ✅ Responsive sidebar
- ✅ Modern header
- ✅ Dark/Light theme
- ✅ Dashboard page
- ✅ Full documentation

**Next Steps**:
1. Backend bilan integratsiya
2. Qolgan pagelarni yaratish
3. Realtime features qo'shish

**Foydalanish**:
```bash
cd academy_frontend
npm run dev
# Open: http://localhost:3000/student
```

---

**Created**: 2026-02-04
**Version**: 1.0.0
**Status**: ✅ Ready for Development
