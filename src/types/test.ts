// ============================================================
// TEST SYSTEM TYPES
// ============================================================

export enum LessonType {
  VIDEO = 'VIDEO',
  TEST = 'TEST',
  TEXT = 'TEXT',
  MIXED = 'MIXED',
}

export enum QuestionType {
  SINGLE_CHOICE = 'SINGLE_CHOICE', // Radio button - bitta javob
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE', // Checkbox - bir nechta javob
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

// ============================================================
// INTERFACES
// ============================================================

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

export interface Lesson {
  id: string;
  titleUz: string;
  titleRu?: string;
  titleEn?: string;
  descriptionUz?: string;
  descriptionRu?: string;
  descriptionEn?: string;
  lessonType: LessonType;
  videoUrl?: string;
  videoThumbnail?: string;
  videoDuration?: number;
  content?: string; // MDX content
  moduleId: string;
  module?: Module;
  testId?: string;
  test?: Test;
  order: number;
  isPublished: boolean;
  isFree: boolean;
  bookmarks?: Bookmark[];
  lessonProgress?: LessonProgress[];
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================
// HELPER TYPES FOR TEST TAKING
// ============================================================

export interface TestSession {
  test: Test;
  result: UserTestResult;
  currentQuestionIndex: number;
  answers: Map<string, UserAnswer>;
  timeRemaining: number; // in seconds
  isSubmitted: boolean;
}

export interface UserAnswerInput {
  questionId: string;
  selectedOptions?: string[]; // Array of option IDs
  textAnswer?: string;
  timeSpent?: number;
}

// ============================================================
// HELPER FUNCTIONS
// ============================================================

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

// Format time duration
export const formatTestDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// Calculate test score
export const calculateTestScore = (totalPoints: number, earnedPoints: number): number => {
  if (totalPoints === 0) return 0;
  return Math.round((earnedPoints / totalPoints) * 100);
};

// Check if user passed the test
export const isTestPassed = (score: number, passingScore: number): boolean => {
  return score >= passingScore;
};

// Get status badge color
export const getTestStatusColor = (status: TestStatus): string => {
  const colors: Record<TestStatus, string> = {
    [TestStatus.IN_PROGRESS]: '#3B82F6', // blue
    [TestStatus.COMPLETED]: '#8B5CF6', // purple
    [TestStatus.PASSED]: '#10B981', // green
    [TestStatus.FAILED]: '#EF4444', // red
    [TestStatus.EXPIRED]: '#6B7280', // gray
  };

  return colors[status] || '#6B7280';
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
