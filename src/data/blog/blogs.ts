export interface BlogTopic {
  title: string;
  slug: string;
  description?: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  topics: BlogTopic[];
}

export const blogCategories: BlogCategory[] = [];

// Barcha mavzularni bitta massivga yig'ish (qidiruv va filterlar uchun)
export const allBlogTopics: (BlogTopic & { categoryId: string; categoryName: string; categorySlug: string })[] =
  blogCategories.flatMap((category) =>
    category.topics.map((topic) => ({
      ...topic,
      categoryId: category.id,
      categoryName: category.name,
      categorySlug: category.slug,
    })),
  );

// Slug bo'yicha kategoriya topish
export const getCategoryBySlug = (slug: string): BlogCategory | undefined => {
  return blogCategories.find((category) => category.slug === slug);
};

// Slug bo'yicha mavzu topish
export const getTopicBySlug = (
  slug: string,
): (BlogTopic & { categoryId: string; categoryName: string; categorySlug: string }) | undefined => {
  return allBlogTopics.find((topic) => topic.slug === slug);
};

// Kategoriya ID bo'yicha mavzular
export const getTopicsByCategoryId = (categoryId: string): BlogTopic[] => {
  const category = blogCategories.find((cat) => cat.id === categoryId);
  return category ? category.topics : [];
};
