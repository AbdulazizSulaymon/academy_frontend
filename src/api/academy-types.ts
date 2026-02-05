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
// TEST SYSTEM ENUMS
// ============================================

export enum LessonType {
  VIDEO = 'VIDEO',
  TEST = 'TEST',
  TEXT = 'TEXT',
  MIXED = 'MIXED',
}

export enum QuestionType {
  SINGLE_CHOICE = 'SINGLE_CHOICE',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  TRUE_FALSE = 'TRUE_FALSE',
  SHORT_ANSWER = 'SHORT_ANSWER',
  ESSAY = 'ESSAY',
}

export enum TestStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  PASSED = 'PASSED',
  FAILED = 'FAILED',
  EXPIRED = 'EXPIRED',
}

// ============================================
// MENTOR INTERFACE
// ============================================

export interface Mentor {
  id: string;
  userId?: string;
  firstName: string;
  lastName: string;
  bio?: string;
  bioUz?: string;
  bioRu?: string;
  bioEn?: string;
  photo?: string;
  specialization?: string;
  experience?: number;
  rating?: number;
  totalStudents: number;
  totalCourses: number;
  email?: string;
  phone?: string;
  socialLinks?: any; // JSON
  isActive: boolean;
  courses?: Course[];
  createdAt: Date;
  updatedAt: Date;
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
  mentorId?: string;
  mentor?: Mentor;
  modules?: Module[];
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

export interface Module {
  id: string;
  titleUz: string;
  titleRu: string;
  titleEn: string;
  description?: string;
  order: number;
  isPublished: boolean;
  courseId: string;
  course?: Course;
  lessons?: Lesson[];
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
  moduleId?: string;
  module?: Module;
  order: number;
  duration?: number;
  isPublished: boolean;
  isFree: boolean;
  videoUrl?: string;
  videoThumbnail?: string;
  videoDuration?: number;
  // New fields for test system
  lessonType: LessonType;
  content?: string; // MDX content for TEXT and MIXED lessons
  testId?: string;
  test?: Test;
  bookmarks?: Bookmark[];
  lessonProgress?: LessonProgress[];
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

// ============================================
// TEST SYSTEM INTERFACES
// ============================================

export interface Test {
  id: string;
  titleUz: string;
  titleRu?: string;
  titleEn?: string;
  descriptionUz?: string;
  descriptionRu?: string;
  descriptionEn?: string;
  duration?: number; // in minutes
  passingScore: number; // percentage
  maxAttempts: number;
  shuffleQuestions: boolean;
  shuffleOptions: boolean;
  showCorrectAnswers: boolean;
  isActive: boolean;
  lesson?: Lesson;
  questions?: Question[];
  userTestResults?: UserTestResult[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Question {
  id: string;
  testId: string;
  test?: Test;
  contentUz: string;
  contentRu?: string;
  contentEn?: string;
  image?: string;
  questionType: QuestionType;
  order: number;
  points: number;
  explanationUz?: string;
  explanationRu?: string;
  explanationEn?: string;
  options?: QuestionOption[];
  userAnswers?: UserAnswer[];
  createdAt: Date;
  updatedAt: Date;
}

export interface QuestionOption {
  id: string;
  questionId: string;
  question?: Question;
  contentUz: string;
  contentRu?: string;
  contentEn?: string;
  image?: string;
  isCorrect: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserTestResult {
  id: string;
  userId: string;
  testId: string;
  test?: Test;
  startedAt: Date;
  completedAt?: Date;
  timeSpent?: number; // in seconds
  score: number; // percentage
  correctAnswers: number;
  totalQuestions: number;
  points: number;
  status: TestStatus;
  passed: boolean;
  attemptNumber: number;
  answers?: UserAnswer[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserAnswer {
  id: string;
  userTestResultId: string;
  userTestResult?: UserTestResult;
  questionId: string;
  question?: Question;
  selectedOptions?: string; // JSON array of option IDs
  textAnswer?: string;
  isCorrect?: boolean;
  pointsEarned: number;
  timeSpent?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface LessonProgress {
  id: string;
  userId: string;
  lessonId: string;
  lesson?: Lesson;
  isCompleted: boolean;
  completedAt?: Date;
  watchTime?: number;
  testPassed?: boolean;
  testScore?: number;
  lastAccessedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// TEST SYSTEM HELPER FUNCTIONS
// ============================================

// Get question type label
export const getQuestionTypeLabel = (type: QuestionType, lang: 'uz' | 'ru' | 'en' = 'uz'): string => {
  const labels: Record<QuestionType, Record<'uz' | 'ru' | 'en', string>> = {
    [QuestionType.SINGLE_CHOICE]: {
      uz: 'Bitta javob',
      ru: 'Один ответ',
      en: 'Single Choice',
    },
    [QuestionType.MULTIPLE_CHOICE]: {
      uz: 'Bir nechta javob',
      ru: 'Несколько ответов',
      en: 'Multiple Choice',
    },
    [QuestionType.TRUE_FALSE]: {
      uz: 'Ha/Yo\'q',
      ru: 'Да/Нет',
      en: 'True/False',
    },
    [QuestionType.SHORT_ANSWER]: {
      uz: 'Qisqa javob',
      ru: 'Краткий ответ',
      en: 'Short Answer',
    },
    [QuestionType.ESSAY]: {
      uz: 'Insho',
      ru: 'Эссе',
      en: 'Essay',
    },
  };

  return labels[type][lang];
};

// Get lesson type label
export const getLessonTypeLabel = (type: LessonType, lang: 'uz' | 'ru' | 'en' = 'uz'): string => {
  const labels: Record<LessonType, Record<'uz' | 'ru' | 'en', string>> = {
    [LessonType.VIDEO]: {
      uz: 'Video dars',
      ru: 'Видео урок',
      en: 'Video Lesson',
    },
    [LessonType.TEST]: {
      uz: 'Test',
      ru: 'Тест',
      en: 'Test',
    },
    [LessonType.TEXT]: {
      uz: 'Matn dars',
      ru: 'Текстовый урок',
      en: 'Text Lesson',
    },
    [LessonType.MIXED]: {
      uz: 'Aralash',
      ru: 'Смешанный',
      en: 'Mixed',
    },
  };

  return labels[type][lang];
};

// Get lesson type icon
export const getLessonTypeIcon = (type: LessonType): string => {
  const icons: Record<LessonType, string> = {
    [LessonType.VIDEO]: '🎬',
    [LessonType.TEST]: '📝',
    [LessonType.TEXT]: '📖',
    [LessonType.MIXED]: '🔄',
  };

  return icons[type];
};

// Get test status color
export const getTestStatusColor = (status: TestStatus): string => {
  const colors: Record<TestStatus, string> = {
    [TestStatus.IN_PROGRESS]: '#3B82F6',
    [TestStatus.COMPLETED]: '#8B5CF6',
    [TestStatus.PASSED]: '#10B981',
    [TestStatus.FAILED]: '#EF4444',
    [TestStatus.EXPIRED]: '#6B7280',
  };

  return colors[status] || '#6B7280';
};
