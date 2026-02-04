import Head from 'next/head';
import React, { useState, useEffect, useCallback, ReactElement } from 'react';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import { blogCategories, BlogCategory, allBlogTopics } from '@/data/blog/blogs';
import { SITE_URL, projectName } from '@/data/const';
import HeroSection from '@components/hero-section';
import { Container } from '@components/container';
import Footer from '@/widgets/landing/footer';
import Header from '@/widgets/landing/header';
import AntdProvider from '@hocs/antd-provider';
import { Button } from 'antd';
import clsx from 'clsx';
import BlogCard from '@/components/BlogCard';

interface BlogPageProps {
  categories: BlogCategory[];
  selectedCategory?: string;
}

export default function Blog({ categories, selectedCategory: initialSelectedCategory }: BlogPageProps) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(initialSelectedCategory || 'all');
  const [searchQuery, setSearchQuery] = useState('');

  // Handle URL query parameters
  useEffect(() => {
    if (router.isReady) {
      const { category, search } = router.query;
      if (category && typeof category === 'string') {
        setSelectedCategory(category);
      }
      if (search && typeof search === 'string') {
        setSearchQuery(search);
      }
    }
  }, [router.isReady, router.query]);

  // Filter categories based on search
  const filteredCategories = categories.filter((category) => {
    if (!searchQuery) return true;
    const searchLower = searchQuery.toLowerCase();
    return (
      category.name.toLowerCase().includes(searchLower) || category.description?.toLowerCase().includes(searchLower)
    );
  });

  // Filter topics based on search
  const filteredTopics = searchQuery
    ? allBlogTopics.filter((topic) => {
        const searchLower = searchQuery.toLowerCase();
        return (
          topic.title.toLowerCase().includes(searchLower) ||
          topic.description?.toLowerCase().includes(searchLower) ||
          topic.categoryName.toLowerCase().includes(searchLower)
        );
      })
    : [];

  // Get selected category data
  const selectedCategoryData =
    selectedCategory && selectedCategory !== 'all'
      ? categories.find((cat) => cat.slug === selectedCategory || cat.id === selectedCategory)
      : null;

  // Handle category change
  const handleCategoryChange = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
    router.push(`/blog${categorySlug !== 'all' ? `/${categorySlug}` : ''}`, undefined, { shallow: true });
  };

  // Handle search change
  const handleSearchChange = useCallback((searchValue: string) => {
    setSearchQuery(searchValue);
  }, []);
  return (
    <>
      <Head>
        <title>
          {selectedCategoryData
            ? `${selectedCategoryData.name} | Blog`
            : 'Blog | Onlayn Savdo va E-commerce Maqolalari'}
        </title>
        <meta
          name="description"
          content={
            selectedCategoryData
              ? `${selectedCategoryData.name} bo'yicha mutaxassislar tomonidan yozilgan maqolalar va maslahatlar. ${
                  selectedCategoryData.description || ''
                }`
              : "Onlayn savdo, e-commerce va biznes sohasidagi eng so'nggi maqolalar, maslahatlar va yangiliklar. Mutaxassislar tomonidan yozilgan qo'llanmalar va foydali ma'lumotlar."
          }
        />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:title"
          content={
            selectedCategoryData
              ? `${selectedCategoryData.name} | Blog`
              : 'Blog | Onlayn Savdo va E-commerce Maqolalari'
          }
        />
        <meta
          property="og:description"
          content={
            selectedCategoryData
              ? `${
                  selectedCategoryData.description || ''
                } bo'yicha mutaxassislar tomonidan yozilgan maqolalar va maslahatlar.`
              : "Onlayn savdo va e-commerce sohasidagi eng so'nggi maqolalar, maslahatlar va yangiliklar."
          }
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${SITE_URL}/blog${selectedCategoryData ? `/${selectedCategoryData.slug}` : ''}`}
        />
        <link rel="canonical" href={`${SITE_URL}/blog${selectedCategoryData ? `/${selectedCategoryData.slug}` : ''}`} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              name: 'Blog',
              description: 'Onlayn savdo, e-commerce va biznes sohasidagi maqolalar va maslahatlar',
              url: `${SITE_URL}/blog`,
              publisher: {
                '@type': 'Organization',
                name: projectName,
                url: SITE_URL,
              },
            }),
          }}
        />

        {/* Simplified Blog Page Styles */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
            /* Clean Blog Container */
            .blog-container {
              background: transparent;
              min-height: 100vh;
            }

            .dark .blog-container {
              background: transparent;
            }

            /* Simple Search Input */
            .modern-search {
              background: white;
              border: 2px solid #e5e7eb;
              border-radius: 12px;
              padding: 16px 20px;
              font-size: 16px;
              transition: all 0.3s ease;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              color: #1f2937;
            }

            .dark .modern-search {
              background: #1e293b;
              border-color: #334155;
              color: #e2e8f0;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            }

            .modern-search:focus {
              outline: none;
              border-color: #2563eb;
              box-shadow: 0 4px 12px rgba(37, 99, 235, 0.15);
            }

            .dark .modern-search:focus {
              border-color: #3b82f6;
              box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
            }

            .modern-search::placeholder {
              color: #9ca3af;
            }

            .dark .modern-search::placeholder {
              color: #64748b;
            }

            /* Simple Category Buttons */
            .category-btn {
              background: white;
              border: 2px solid #e5e7eb;
              border-radius: 25px;
              padding: 10px 20px;
              font-weight: 600;
              color: #374151;
              transition: all 0.3s ease;
            }

            .dark .category-btn {
              background: #1e293b;
              border-color: #334155;
              color: #e2e8f0;
            }

            .category-btn:hover {
              border-color: #2563eb;
              color: #2563eb;
              transform: translateY(-1px);
              box-shadow: 0 4px 12px rgba(37, 99, 235, 0.15);
            }

            .dark .category-btn:hover {
              border-color: #3b82f6;
              color: #3b82f6;
              box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
            }

            .category-btn.active {
              background: #2563eb;
              color: white;
              border-color: #2563eb;
            }

            .dark .category-btn.active {
              background: #3b82f6;
              color: white;
              border-color: #3b82f6;
            }

            /* Simple Grid Animation */
            .blog-grid {
              display: grid;
              gap: 24px;
              animation: fadeInUp 0.6s ease-out;
            }

            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            /* Simple Pagination */
            .pagination-btn {
              background: white;
              border: 2px solid #e5e7eb;
              border-radius: 8px;
              padding: 10px 16px;
              font-weight: 600;
              color: #374151;
              transition: all 0.3s ease;
            }

            .dark .pagination-btn {
              background: #1e293b;
              border-color: #334155;
              color: #e2e8f0;
            }

            .pagination-btn:hover:not(:disabled) {
              border-color: #2563eb;
              color: #2563eb;
            }

            .dark .pagination-btn:hover:not(:disabled) {
              border-color: #3b82f6;
              color: #3b82f6;
            }

            .pagination-btn.active {
              background: #2563eb;
              color: white;
              border-color: #2563eb;
            }

            .dark .pagination-btn.active {
              background: #3b82f6;
              color: white;
              border-color: #3b82f6;
            }

            .pagination-btn:disabled {
              opacity: 0.5;
              cursor: not-allowed;
            }

            .dark .pagination-btn:disabled {
              opacity: 0.4;
            }

            .pagination-btn:disabled:hover {
              border-color: #e5e7eb;
              color: #374151;
            }

            .dark .pagination-btn:disabled:hover {
              border-color: #334155;
              color: #64748b;
            }

            /* Simple No Posts Styling */
            .no-posts {
              background: white;
              border-radius: 12px;
              padding: 48px 32px;
              text-align: center;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              border-top: 4px solid #2563eb;
            }

            .dark .no-posts {
              background: #1e293b;
              border-top-color: #3b82f6;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
            }

            /* Simple Section Headers */
            .section-header {
              margin-bottom: 32px;
            }

            .section-title {
              font-size: 28px;
              font-weight: 700;
              color: #1f2937;
              text-align: center;
              margin-bottom: 12px;
            }

            .dark .section-title {
              color: #f1f5f9;
            }

            .section-subtitle {
              text-align: center;
              color: #6b7280;
              font-size: 16px;
              max-width: 600px;
              margin: 0 auto;
            }

            .dark .section-subtitle {
              color: #94a3b8;
            }

            /* Pagination dots */
            .dark .pagination-dots {
              color: #64748b;
            }
          `,
          }}
        />
      </Head>

      <div className="min-h-screen bg-white dark:bg-dark relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none z-[5] opacity-25">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full blur-2xl" />
          <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-primary-400/20 to-primary-300/5 rounded-full blur-xl" />
          <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-gradient-to-br from-primary-500/15 to-primary/5 rounded-full blur-2xl" />
          <div className="absolute top-1/2 right-1/4 w-28 h-28 bg-gradient-to-br from-primary-300/20 to-primary-200/5 rounded-full blur-xl" />
        </div>

        <Header />

        <div className="relative z-10">
          <HeroSection
            backgroundImage={'/images/blog.jpg'}
            title="Blog & Maqolalar"
            description="Onlayn savdo, e-commerce va biznes sohasidagi eng so'nggi maqolalar, maslahatlar va yangiliklar. Mutaxassislar tomonidan yozilgan qo'llanmalar va foydali ma'lumotlar."
          />

          {/* Statistics Section */}
          <div className="border-b border-gray-200 dark:border-gray-700 bg-transparent py-6">
            <Container>
              <div className="flex flex-wrap items-center justify-center gap-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20">
                    <svg
                      className="h-6 w-6 text-primary dark:text-primary-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {categories.length}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Kategoriya</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20">
                    <svg
                      className="h-6 w-6 text-primary dark:text-primary-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {allBlogTopics.length}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Maqola</div>
                  </div>
                </div>
              </div>
            </Container>
          </div>

          <div className="blog-container py-12">
            <Container>
              {/* Section Header */}
              <div className="section-header">
                <h2 className="section-title">
                  {selectedCategoryData ? selectedCategoryData.name : 'Barcha Kategoriyalar'}
                </h2>
                <p className="section-subtitle">
                  {selectedCategoryData
                    ? selectedCategoryData.description || ''
                    : "Onlayn savdo va e-commerce sohasidagi maqolalar, maslahatlar va qo'llanmalar bilan tanishib chiqing."}
                </p>
              </div>

              {/* Search */}
              <div className="mb-8">
                <div className="relative mx-auto max-w-2xl">
                  <input
                    type="text"
                    placeholder="Kategoriyalar va mavzularni qidirish..."
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="modern-search w-full"
                  />
                </div>
              </div>

              {/* Categories Filter */}
              <div className="mb-12">
                <div className="flex flex-wrap justify-center gap-4">
                  <Button
                    onClick={() => handleCategoryChange('all')}
                    type={selectedCategory === 'all' ? 'primary' : 'default'}
                    className="rounded-full px-4 py-2"
                  >
                    Barchasi
                  </Button>
                  {categories.map((cat) => (
                    <Button
                      key={cat.id}
                      onClick={() => handleCategoryChange(cat.slug)}
                      type={selectedCategory === cat.slug ? 'primary' : 'default'}
                      className="rounded-full px-4 py-2"
                    >
                      {cat.name}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Search Results: Show topics if searching, otherwise show categories */}
              {searchQuery && filteredTopics.length > 0 ? (
                // Show filtered topics when searching
                <div>
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                      Topilgan mavzular ({filteredTopics.length})
                    </h3>
                  </div>
                  <div className="blog-grid mx-auto grid max-w-7xl grid-cols-1 gap-8 py-10 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredTopics.map((topic, index) => (
                      <div
                        key={`${topic.categorySlug}-${topic.slug}`}
                        style={{
                          animationDelay: `${index * 0.1}s`,
                          animation: 'fadeInUp 0.6s ease-out both',
                        }}
                      >
                        <BlogCard
                          id={`${topic.categorySlug}/${topic.slug}`}
                          image={`/images/blog/${topic.slug}.jpg`}
                          categories={[{ id: topic.categoryId, name: topic.categoryName }]}
                          title={topic.title}
                          desc={topic.description}
                          createdAt={new Date().toISOString()}
                        />
                      </div>
                    ))}
                  </div>
                  {filteredCategories.length > 0 && (
                    <div className="mt-12">
                      <div className="mb-6">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                          Topilgan kategoriyalar ({filteredCategories.length})
                        </h3>
                      </div>
                      <div className="blog-grid mx-auto grid max-w-7xl grid-cols-1 gap-8 py-10 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredCategories.map((category, index) => (
                          <div
                            key={category.id}
                            style={{
                              animationDelay: `${index * 0.1}s`,
                              animation: 'fadeInUp 0.6s ease-out both',
                            }}
                          >
                            <BlogCard
                              id={category.slug}
                              image={`/images/blog/${category.slug}.jpg`}
                              categories={[]}
                              title={category.name}
                              desc={category.description || `${category.topics.length} ta mavzu mavjud`}
                              createdAt={new Date().toISOString()}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : selectedCategoryData ? (
                // Show topics for selected category
                <div className="blog-grid mx-auto grid max-w-7xl grid-cols-1 gap-8 py-10 sm:grid-cols-2 lg:grid-cols-3">
                  {selectedCategoryData.topics.map((topic, index) => (
                    <div
                      key={topic.slug}
                      style={{
                        animationDelay: `${index * 0.1}s`,
                        animation: 'fadeInUp 0.6s ease-out both',
                      }}
                    >
                      <BlogCard
                        id={`${selectedCategoryData.slug}/${topic.slug}`}
                        image={`/images/blog/${topic.slug}.jpg`}
                        categories={[{ id: selectedCategoryData.id, name: selectedCategoryData.name }]}
                        title={topic.title}
                        desc={topic.description}
                        createdAt={new Date().toISOString()}
                      />
                    </div>
                  ))}
                </div>
              ) : filteredCategories.length > 0 ? (
                // Show all categories
                <div className="blog-grid mx-auto grid max-w-7xl grid-cols-1 gap-8 py-10 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredCategories.map((category, index) => (
                    <div
                      key={category.id}
                      style={{
                        animationDelay: `${index * 0.1}s`,
                        animation: 'fadeInUp 0.6s ease-out both',
                      }}
                    >
                      <BlogCard
                        id={category.slug}
                        image={`/images/blog/${category.slug}.jpg`}
                        categories={[]}
                        title={category.name}
                        desc={category.description || `${category.topics.length} ta mavzu mavjud`}
                        createdAt={new Date().toISOString()}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-posts">
                  <div className="mb-6 text-6xl">🔍</div>
                  <h3 className="mb-4 text-2xl font-bold text-gray-800 dark:text-gray-200">
                    Hech narsa topilmadi
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    {searchQuery
                      ? `"${searchQuery}" so'rovi bo'yicha hech qanday kategoriya yoki mavzu topilmadi. Boshqa kalit so'zlar bilan qidiring.`
                      : 'Hozircha kategoriyalar mavjud emas.'}
                  </p>
                  {searchQuery && (
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('all');
                      }}
                      className="category-btn mt-6"
                    >
                      Qidiruvni tozalash va barchasini ko'rish
                    </button>
                  )}
                </div>
              )}
            </Container>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

Blog.getLayout = function getLayout(page: ReactElement) {
  return <AntdProvider>{page}</AntdProvider>;
};

export const getStaticProps: GetStaticProps<BlogPageProps> = async () => {
  return {
    props: {
      categories: blogCategories,
    },
  };
};
