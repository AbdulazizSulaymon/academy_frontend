// Academy Types & Interfaces
// Auto-generated from Prisma Schema

// ============================================
// ENUMS
// ============================================

export enum Language {
  uz = 'uz',
  ru = 'ru',
  en = 'en',
}

export enum AssignmentStatus {
  Available = 'Available',
  NotSubmitted = 'NotSubmitted',
  Submitted = 'Submitted',
  Graded = 'Graded',
}

export enum AcademyEventStatus {
  Expected = 'Expected',
  OnGoing = 'OnGoing',
  Completed = 'Completed',
  Canceled = 'Canceled',
}

export enum TaskStatus {
  NotStarted = 'NotStarted',
  Checking = 'Checking',
  Completed = 'Completed',
  Rejected = 'Rejected',
}

export enum ProductLevel {
  Level1 = 'Level1',
  Level2 = 'Level2',
  Level3 = 'Level3',
}

export enum OrderStatus {
  Pending = 'Pending',
  Processing = 'Processing',
  Completed = 'Completed',
  Canceled = 'Canceled',
}

export enum CoinTransactionType {
  Earned = 'Earned',
  Spent = 'Spent',
  Bonus = 'Bonus',
  Refund = 'Refund',
}

// ============================================
// COURSE INTERFACES
// ============================================

export interface CourseCategory {
  id: string;
  nameUz: string;
  nameRu: string;
  nameEn: string;
  descriptionUz?: string;
  descriptionRu?: string;
  descriptionEn?: string;
  image?: string;
  order: number;
  isActive: boolean;
  courses?: Course[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Course {
  id: string;
  titleUz: string;
  titleRu: string;
  titleEn: string;
  descriptionUz?: string;
  descriptionRu?: string;
  descriptionEn?: string;
  coverImage?: string;
  duration?: number;
  level?: string;
  price: number;
  isPublished: boolean;
  categoryId: string;
  category?: CourseCategory;
  lessons?: Lesson[];
  enrollments?: CourseEnrollment[];
  assignments?: Assignment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseEnrollment {
  id: string;
  userId: string;
  courseId: string;
  progress: number;
  isCompleted: boolean;
  completedAt?: Date;
  enrolledAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Lesson {
  id: string;
  titleUz: string;
  titleRu: string;
  titleEn: string;
  descriptionUz?: string;
  descriptionRu?: string;
  descriptionEn?: string;
  courseId: string;
  course?: Course;
  order: number;
  duration?: number;
  isPublished: boolean;
  isFree: boolean;
  videos?: Video[];
  bookmarks?: Bookmark[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Video {
  id: string;
  titleUz: string;
  titleRu: string;
  titleEn: string;
  url: string;
  thumbnail?: string;
  duration?: number;
  order: number;
  lessonId: string;
  lesson?: Lesson;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// ASSIGNMENT & TASK INTERFACES
// ============================================

export interface Assignment {
  id: string;
  titleUz: string;
  titleRu: string;
  titleEn: string;
  descriptionUz?: string;
  descriptionRu?: string;
  descriptionEn?: string;
  courseId: string;
  course?: Course;
  dueDate?: Date;
  maxScore: number;
  coinReward: number;
  order: number;
  isPublished: boolean;
  userAssignments?: UserAssignment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserAssignment {
  id: string;
  userId: string;
  assignmentId: string;
  assignment?: Assignment;
  status: AssignmentStatus;
  submission?: string;
  submittedAt?: Date;
  score?: number;
  feedback?: string;
  gradedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: string;
  titleUz: string;
  titleRu: string;
  titleEn: string;
  descriptionUz?: string;
  descriptionRu?: string;
  descriptionEn?: string;
  coinReward: number;
  order: number;
  isActive: boolean;
  userTasks?: UserTask[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserTask {
  id: string;
  userId: string;
  taskId: string;
  task?: Task;
  status: TaskStatus;
  submission?: string;
  submittedAt?: Date;
  completedAt?: Date;
  feedback?: string;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// OTHER INTERFACES
// ============================================

export interface Bookmark {
  id: string;
  userId: string;
  lessonId: string;
  lesson?: Lesson;
  note?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Event {
  id: string;
  titleUz: string;
  titleRu: string;
  titleEn: string;
  descriptionUz?: string;
  descriptionRu?: string;
  descriptionEn?: string;
  coverImage?: string;
  startDate: Date;
  endDate?: Date;
  location?: string;
  isOnline: boolean;
  meetingLink?: string;
  status: AcademyEventStatus;
  maxParticipants?: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// SHOP INTERFACES
// ============================================

export interface ShopCategory {
  id: string;
  nameUz: string;
  nameRu: string;
  nameEn: string;
  descriptionUz?: string;
  descriptionRu?: string;
  descriptionEn?: string;
  image?: string;
  order: number;
  isActive: boolean;
  products?: Product[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  nameUz: string;
  nameRu: string;
  nameEn: string;
  descriptionUz?: string;
  descriptionRu?: string;
  descriptionEn?: string;
  image?: string;
  images: string[];
  price: number;
  level: ProductLevel;
  minCoinsRequired: number;
  stock: number;
  isAvailable: boolean;
  categoryId: string;
  category?: ShopCategory;
  favorites?: FavoriteProduct[];
  orderItems?: OrderItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface FavoriteProduct {
  id: string;
  userId: string;
  productId: string;
  product?: Product;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: string;
  userId: string;
  orderNumber: string;
  totalCoins: number;
  status: OrderStatus;
  deliveryAddress?: string;
  deliveryPhone?: string;
  deliveryNote?: string;
  items?: OrderItem[];
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  orderId: string;
  order?: Order;
  productId: string;
  product?: Product;
  quantity: number;
  priceCoins: number;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// COIN SYSTEM
// ============================================

export interface CoinHistory {
  id: string;
  userId: string;
  amount: number;
  type: CoinTransactionType;
  description?: string;
  relatedId?: string;
  relatedType?: string;
  balanceBefore: number;
  balanceAfter: number;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// UTILITY TYPES
// ============================================

export interface MultiLanguageText {
  uz: string;
  ru: string;
  en: string;
}

// Helper function to get text by language
export const getMultiLangText = (
  obj: any,
  field: string,
  lang: Language = Language.uz
): string => {
  const fieldName = `${field}${lang.charAt(0).toUpperCase() + lang.slice(1)}`;
  return obj[fieldName] || obj[`${field}Uz`] || '';
};

// Helper function to check if user has enough coins
export const hasEnoughCoins = (userCoins: number, requiredCoins: number): boolean => {
  return userCoins >= requiredCoins;
};

// Helper function to get product level requirements
export const getProductLevelCoins = (level: ProductLevel): number => {
  switch (level) {
    case ProductLevel.Level1:
      return 0;
    case ProductLevel.Level2:
      return 500;
    case ProductLevel.Level3:
      return 1000;
    default:
      return 0;
  }
};

// Helper function to format coin amount
export const formatCoins = (amount: number): string => {
  return new Intl.NumberFormat('en-US').format(amount);
};

// Helper function to get status color
export const getStatusColor = (status: string): string => {
  const statusColors: Record<string, string> = {
    // Assignment statuses
    Available: '#10B981',
    NotSubmitted: '#F59E0B',
    Submitted: '#3B82F6',
    Graded: '#8B5CF6',
    // Event statuses
    Expected: '#6B7280',
    OnGoing: '#10B981',
    Completed: '#8B5CF6',
    Canceled: '#EF4444',
    // Task statuses
    NotStarted: '#6B7280',
    Checking: '#F59E0B',
    Rejected: '#EF4444',
    // Order statuses
    Pending: '#F59E0B',
    Processing: '#3B82F6',
  };
  return statusColors[status] || '#6B7280';
};

// Helper function to calculate progress percentage
export const calculateProgress = (completed: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
};
