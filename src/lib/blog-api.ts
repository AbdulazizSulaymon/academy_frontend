import { join } from '@fireflysemantics/join';
import { baseBackendUrl } from '@data/const';

export interface BlogPost {
  id: string;
  title: string;
  desc?: string;
  content?: string;
  image?: string;
  published: boolean;
  authorId: string;
  point: number;
  createdAt: string;
  updatedAt: string;
  author?: {
    id: string;
    name?: string;
  };
  categories?: {
    id: string;
    name: string;
  }[];
}

export interface BlogCategory {
  id: string;
  name: string;
}

export interface BlogApiResponse<T> {
  totalCount: number;
  data: T[];
}

interface BlogQueryParams {
  where?: {
    published?: boolean;
    categories?: {
      some: {
        id: string;
      };
    };
    OR?: Array<{
      title?: { contains: string; mode: string };
      desc?: { contains: string; mode: string };
    }>;
  };
  include?: {
    author?: boolean;
    categories?: boolean;
  };
  orderBy?: {
    createdAt?: 'desc' | 'asc';
    name?: 'desc' | 'asc';
  };
  skip?: number;
  take?: number;
}

class BlogApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'BlogApiError';
  }
}

export async function fetchPosts(params: BlogQueryParams = {}): Promise<BlogApiResponse<BlogPost>> {
  try {
    const response = await fetch(join(baseBackendUrl, 'api/posts/find-many'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new BlogApiError(`Failed to fetch posts: ${response.statusText}`, response.status);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof BlogApiError) {
      throw error;
    }
    throw new BlogApiError('Network error while fetching posts');
  }
}

export async function fetchPostById(id: string): Promise<BlogPost | null> {
  try {
    const response = await fetch(join(baseBackendUrl, 'api/posts/find-first'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        where: { id },
        include: {
          author: true,
          categories: true,
        },
      }),
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new BlogApiError(`Failed to fetch post: ${response.statusText}`, response.status);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof BlogApiError) {
      throw error;
    }
    throw new BlogApiError('Network error while fetching post');
  }
}

export async function fetchCategories(): Promise<BlogApiResponse<BlogCategory>> {
  try {
    const response = await fetch(join(baseBackendUrl, 'api/postCategory/find-many'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderBy: { name: 'asc' },
      }),
    });

    if (!response.ok) {
      throw new BlogApiError(`Failed to fetch categories: ${response.statusText}`, response.status);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof BlogApiError) {
      throw error;
    }
    throw new BlogApiError('Network error while fetching categories');
  }
}

export async function fetchPublishedPostIds(): Promise<string[]> {
  try {
    const response = await fetch(join(baseBackendUrl, 'api/posts/find-many'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        where: { published: true },
        // Don't use select, just get the data and extract IDs
      }),
    });

    if (!response.ok) {
      throw new BlogApiError(`Failed to fetch post IDs: ${response.statusText}`, response.status);
    }

    const data = await response.json();
    return data.data.map((post: BlogPost) => post.id);
  } catch (error) {
    if (error instanceof BlogApiError) {
      throw error;
    }
    throw new BlogApiError('Network error while fetching post IDs');
  }
}

export async function fetchRelatedPosts(
  currentPostId: string,
  categoryIds: string[] = [],
  limit: number = 4,
): Promise<BlogPost[]> {
  try {
    let relatedPosts: BlogPost[] = [];

    // First, try to get posts from the same categories
    if (categoryIds.length > 0) {
      const categoryResponse = await fetch(join(baseBackendUrl, 'api/posts/find-many'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          where: {
            published: true,
            AND: [
              { NOT: { id: currentPostId } }, // Exclude current post
              {
                categories: {
                  some: {
                    id: { in: categoryIds },
                  },
                },
              },
            ],
          },
          include: {
            author: true,
            categories: true,
          },
          orderBy: { createdAt: 'desc' },
          take: limit,
        }),
      });

      if (categoryResponse.ok) {
        const categoryData = await categoryResponse.json();
        relatedPosts = categoryData.data || [];
      }
    }

    // If we don't have enough posts, get more recent posts
    if (relatedPosts.length < limit) {
      const recentResponse = await fetch(join(baseBackendUrl, 'api/posts/find-many'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          where: {
            published: true,
            NOT: { id: currentPostId }, // Exclude current post
          },
          include: {
            author: true,
            categories: true,
          },
          orderBy: { createdAt: 'desc' },
          take: limit,
        }),
      });

      if (recentResponse.ok) {
        const recentData = await recentResponse.json();
        const recentPosts = recentData.data || [];

        // Merge posts, avoiding duplicates
        const existingIds = new Set(relatedPosts.map((post) => post.id));
        const additionalPosts = recentPosts.filter((post: BlogPost) => !existingIds.has(post.id));

        relatedPosts = [...relatedPosts, ...additionalPosts].slice(0, limit);
      }
    }

    return relatedPosts;
  } catch (error) {
    console.error('Error fetching related posts:', error);
    // Return empty array on error to avoid breaking the page
    return [];
  }
}
