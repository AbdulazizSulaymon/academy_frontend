// Academy API Endpoints
// Helper functions for API calls

import { Language } from './academy-types';

// Base URL - update this according to your backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3007';

// ============================================
// COURSE API
// ============================================

export const courseApi = {
  // Get all course categories
  getCategories: async (lang?: Language) => {
    const response = await fetch(`${API_BASE_URL}/api/course-categories`);
    return response.json();
  },

  // Get category by ID
  getCategoryById: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/api/course-categories/${id}`);
    return response.json();
  },

  // Get all courses
  getCourses: async (params?: {
    categoryId?: string;
    isPublished?: boolean;
    page?: number;
    limit?: number;
  }) => {
    const queryParams = new URLSearchParams(params as any).toString();
    const response = await fetch(`${API_BASE_URL}/api/courses?${queryParams}`);
    return response.json();
  },

  // Get course by ID with lessons
  getCourseById: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/api/courses/${id}`);
    return response.json();
  },

  // Enroll in a course
  enrollCourse: async (courseId: string, token: string) => {
    const response = await fetch(`${API_BASE_URL}/api/course-enrollments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ courseId }),
    });
    return response.json();
  },

  // Get user enrollments
  getMyEnrollments: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/api/course-enrollments/my`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },

  // Update enrollment progress
  updateProgress: async (enrollmentId: string, progress: number, token: string) => {
    const response = await fetch(`${API_BASE_URL}/api/course-enrollments/${enrollmentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ progress }),
    });
    return response.json();
  },
};

// ============================================
// LESSON API
// ============================================

export const lessonApi = {
  // Get lessons by course
  getLessonsByCourse: async (courseId: string) => {
    const response = await fetch(`${API_BASE_URL}/api/lessons?courseId=${courseId}`);
    return response.json();
  },

  // Get lesson by ID with videos
  getLessonById: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/api/lessons/${id}`);
    return response.json();
  },

  // Get videos by lesson
  getVideosByLesson: async (lessonId: string) => {
    const response = await fetch(`${API_BASE_URL}/api/videos?lessonId=${lessonId}`);
    return response.json();
  },
};

// ============================================
// ASSIGNMENT API
// ============================================

export const assignmentApi = {
  // Get assignments by course
  getAssignmentsByCourse: async (courseId: string) => {
    const response = await fetch(`${API_BASE_URL}/api/assignments?courseId=${courseId}`);
    return response.json();
  },

  // Get user assignments
  getMyAssignments: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/api/user-assignments/my`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },

  // Submit assignment
  submitAssignment: async (assignmentId: string, submission: string, token: string) => {
    const response = await fetch(`${API_BASE_URL}/api/user-assignments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ assignmentId, submission, status: 'Submitted' }),
    });
    return response.json();
  },
};

// ============================================
// TASK API
// ============================================

export const taskApi = {
  // Get all active tasks
  getTasks: async () => {
    const response = await fetch(`${API_BASE_URL}/api/tasks?isActive=true`);
    return response.json();
  },

  // Get user tasks
  getMyTasks: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/api/user-tasks/my`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },

  // Submit task
  submitTask: async (taskId: string, submission: string, token: string) => {
    const response = await fetch(`${API_BASE_URL}/api/user-tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ taskId, submission, status: 'Checking' }),
    });
    return response.json();
  },
};

// ============================================
// BOOKMARK API
// ============================================

export const bookmarkApi = {
  // Get user bookmarks
  getMyBookmarks: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/api/bookmarks/my`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },

  // Add bookmark
  addBookmark: async (lessonId: string, note: string | undefined, token: string) => {
    const response = await fetch(`${API_BASE_URL}/api/bookmarks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ lessonId, note }),
    });
    return response.json();
  },

  // Remove bookmark
  removeBookmark: async (id: string, token: string) => {
    const response = await fetch(`${API_BASE_URL}/api/bookmarks/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },
};

// ============================================
// EVENT API
// ============================================

export const eventApi = {
  // Get all events
  getEvents: async (params?: { status?: string; limit?: number }) => {
    const queryParams = new URLSearchParams(params as any).toString();
    const response = await fetch(`${API_BASE_URL}/api/events?${queryParams}`);
    return response.json();
  },

  // Get my events
  getMyEvents: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/api/events/my`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },

  // Create event
  createEvent: async (eventData: any, token: string) => {
    const response = await fetch(`${API_BASE_URL}/api/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(eventData),
    });
    return response.json();
  },
};

// ============================================
// SHOP API
// ============================================

export const shopApi = {
  // Get shop categories
  getCategories: async () => {
    const response = await fetch(`${API_BASE_URL}/api/shop-categories`);
    return response.json();
  },

  // Get products
  getProducts: async (params?: {
    categoryId?: string;
    level?: string;
    isAvailable?: boolean;
    page?: number;
    limit?: number;
  }) => {
    const queryParams = new URLSearchParams(params as any).toString();
    const response = await fetch(`${API_BASE_URL}/api/products?${queryParams}`);
    return response.json();
  },

  // Get product by ID
  getProductById: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/api/products/${id}`);
    return response.json();
  },

  // Get user favorites
  getMyFavorites: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/api/favorite-products/my`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },

  // Add to favorites
  addToFavorites: async (productId: string, token: string) => {
    const response = await fetch(`${API_BASE_URL}/api/favorite-products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId }),
    });
    return response.json();
  },

  // Remove from favorites
  removeFromFavorites: async (id: string, token: string) => {
    const response = await fetch(`${API_BASE_URL}/api/favorite-products/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },

  // Create order
  createOrder: async (
    orderData: {
      items: Array<{ productId: string; quantity: number }>;
      deliveryAddress?: string;
      deliveryPhone?: string;
      deliveryNote?: string;
    },
    token: string
  ) => {
    const response = await fetch(`${API_BASE_URL}/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });
    return response.json();
  },

  // Get user orders
  getMyOrders: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/api/orders/my`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },

  // Get order by ID
  getOrderById: async (id: string, token: string) => {
    const response = await fetch(`${API_BASE_URL}/api/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },
};

// ============================================
// COIN API
// ============================================

export const coinApi = {
  // Get user coin balance
  getBalance: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/api/user/coins`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },

  // Get coin history
  getHistory: async (token: string, params?: { page?: number; limit?: number }) => {
    const queryParams = new URLSearchParams(params as any).toString();
    const response = await fetch(`${API_BASE_URL}/api/coin-history/my?${queryParams}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },
};

// ============================================
// EXPORT ALL
// ============================================

export const academyApi = {
  course: courseApi,
  lesson: lessonApi,
  assignment: assignmentApi,
  task: taskApi,
  bookmark: bookmarkApi,
  event: eventApi,
  shop: shopApi,
  coin: coinApi,
};

export default academyApi;
