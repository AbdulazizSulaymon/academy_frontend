import Head from 'next/head';
import React, { ReactElement } from 'react';
import { useRouter } from 'next/router';
import { GetStaticProps, GetStaticPaths } from 'next';
import { blogCategories, BlogCategory, getCategoryBySlug } from '@/data/blog/blogs';
import { SITE_URL, projectName } from '@/data/const';
import HeroSection from '@components/hero-section';
import { Container } from '@components/container';
import Footer from '@/widgets/landing/footer';
import Header from '@/widgets/landing/header';
import AntdProvider from '@hocs/antd-provider';
import { useMyTheme } from '@hooks/use-my-theme';
import clsx from 'clsx';
import Link from 'next/link';
import { Button } from 'antd';
import BlogCard from '@/components/BlogCard';

interface CategoryPageProps {
  category: BlogCategory;
  allCategories: BlogCategory[];
}

export default function CategoryPage({ category, allCategories }: CategoryPageProps) {
  const router = useRouter();
  const { isDarkMode } = useMyTheme();

  if (!category) {
    return (
      <>
        <div className="min-h-screen bg-white dark:bg-dark relative overflow-hidden">
          <div className="fixed inset-0 pointer-events-none z-[5]">
            <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full blur-2xl" />
            <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-primary-400/20 to-primary-300/5 rounded-full blur-xl" />
            <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-gradient-to-br from-primary-500/15 to-primary/5 rounded-full blur-2xl" />
            <div className="absolute top-1/2 right-1/4 w-28 h-28 bg-gradient-to-br from-primary-300/20 to-primary-200/5 rounded-full blur-xl" />
          </div>
          <Header />
          <div className={clsx('pt-16 py-20 text-center relative z-10', isDarkMode && 'dark')}>
            <h1 className={clsx('text-3xl font-bold', isDarkMode ? 'text-gray-200' : 'text-gray-800')}>
              Kategoriya topilmadi
            </h1>
            <p className={clsx('mt-4', isDarkMode ? 'text-gray-400' : 'text-gray-600')}>
              Qidirilayotgan kategoriya mavjud emas.
            </p>
            <Link
              href="/blog"
              className={clsx(
                'mt-6 inline-block rounded-lg px-6 py-3 text-white transition',
                isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700',
              )}
            >
              Blogga qaytish
            </Link>
          </div>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>
          {category.name} | Blog - {projectName}
        </title>
        <meta
          name="description"
          content={`${category.name} bo'yicha mutaxassislar tomonidan yozilgan maqolalar va maslahatlar. ${
            category.description || ''
          }`}
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={`${category.name} | Blog - ${projectName}`} />
        <meta
          property="og:description"
          content={`${category.description || ''} bo'yicha mutaxassislar tomonidan yozilgan maqolalar va maslahatlar.`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/blog/${category.slug}`} />
        <link rel="canonical" href={`${SITE_URL}/blog/${category.slug}`} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              name: category.name,
              description: category.description || '',
              url: `${SITE_URL}/blog/${category.slug}`,
              publisher: {
                '@type': 'Organization',
                name: projectName,
                url: SITE_URL,
              },
            }),
          }}
        />
      </Head>

      <div className="min-h-screen bg-white dark:bg-dark relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none z-[5]">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full blur-2xl" />
          <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-primary-400/20 to-primary-300/5 rounded-full blur-xl" />
          <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-gradient-to-br from-primary-500/15 to-primary/5 rounded-full blur-2xl" />
          <div className="absolute top-1/2 right-1/4 w-28 h-28 bg-gradient-to-br from-primary-300/20 to-primary-200/5 rounded-full blur-xl" />
        </div>
        <Header />

        <div className="relative z-10">
          <HeroSection
            backgroundImage={`/images/blog/${category.slug}.jpg`}
            title={category.name}
            description={
              category.description ||
              `Onlayn savdo va e-commerce sohasidagi ${category.name.toLowerCase()} bo'yicha maqolalar va maslahatlar.`
            }
          />

          <div className={clsx('blog-container py-12', isDarkMode && 'dark')}>
            <Container>
              {/* Breadcrumb */}
              <nav className={clsx('mb-8 text-sm text-gray-700 dark:text-gray-300')}>
                <Link href="/" className="hover:underline">
                  Bosh sahifa
                </Link>
                <span className={clsx('mx-2 text-gray-500 dark:text-gray-400')}>/</span>
                <Link href="/blog" className="hover:underline">
                  Blog
                </Link>
                <span className={clsx('mx-2 text-gray-500 dark:text-gray-400')}>/</span>
                <span className={'text-gray-500 dark:text-gray-400'}>{category.name}</span>
              </nav>

              {/* Section Header */}
              <div className="mb-8">
                <h1 className={clsx('mb-4 text-3xl font-bold text-gray-900 dark:text-gray-100')}>{category.name}</h1>
                {category.description && (
                  <p className={clsx('text-lg text-gray-600 dark:text-gray-300')}>{category.description}</p>
                )}
                <p className={clsx('mt-4 text-sm text-gray-500 dark:text-gray-400')}>
                  {category.topics.length} ta mavzu mavjud
                </p>
              </div>

              {/* Other Categories Navigation */}
              <div className="mb-8">
                <p className={clsx('mb-4 text-sm font-medium text-gray-700 dark:text-gray-300')}>
                  Boshqa kategoriyalar:
                </p>
                <div className="flex flex-wrap gap-2">
                  {allCategories
                    .filter((cat) => cat.id !== category.id)
                    .map((cat) => (
                      <Link key={cat.id} href={`/blog/${cat.slug}`}>
                        <Button type="default" className="rounded-full px-4 py-2">
                          {cat.name}
                        </Button>
                      </Link>
                    ))}
                </div>
              </div>

              {/* Topics Grid */}
              {category.topics.length > 0 ? (
                <div className="blog-grid mx-auto grid max-w-7xl grid-cols-1 gap-8 py-10 sm:grid-cols-2 lg:grid-cols-3">
                  {category.topics.map((topic, index) => (
                    <div
                      key={topic.slug}
                      style={{
                        animationDelay: `${index * 0.1}s`,
                        animation: 'fadeInUp 0.6s ease-out both',
                      }}
                    >
                      <BlogCard
                        id={`${category.slug}/${topic.slug}`}
                        image={`/images/blog/${topic.slug}.jpg`}
                        categories={[{ id: category.id, name: category.name }]}
                        title={topic.title}
                        desc={topic.description}
                        createdAt={new Date().toISOString()}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className={clsx(
                    'no-posts rounded-xl border p-12 text-center',
                    isDarkMode ? 'border-gray-700 bg-[#1e293b]' : 'border-gray-200 bg-white',
                  )}
                >
                  <div className="mb-6 text-6xl">📝</div>
                  <h3 className={clsx('mb-4 text-2xl font-bold', isDarkMode ? 'text-gray-200' : 'text-gray-800')}>
                    Mavzular hozircha mavjud emas
                  </h3>
                  <p className={clsx('text-lg', isDarkMode ? 'text-gray-300' : 'text-gray-600')}>
                    Bu kategoriyada hozircha mavzular qo'shilmagan. Tez orada yangi mavzular qo'shiladi!
                  </p>
                </div>
              )}

              {/* Back to blog */}
              <div className={clsx('mt-12 border-t pt-8', isDarkMode ? 'border-gray-700' : 'border-gray-200')}>
                <Link
                  href="/blog"
                  className={clsx(
                    'inline-flex items-center gap-2 font-medium hover:underline',
                    isDarkMode ? 'text-gray-300' : 'text-gray-700',
                  )}
                >
                  ← Barcha kategoriyalarga qaytish
                </Link>
              </div>
            </Container>
          </div>

          {/* Styles */}
          <style
            dangerouslySetInnerHTML={{
              __html: `
            .blog-container {
              background: transparent;
              min-height: 100vh;
            }

            .dark .blog-container {
              background: transparent;
            }

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
          `,
            }}
          />
        </div>
        <Footer />
      </div>
    </>
  );
}

CategoryPage.getLayout = function getLayout(page: ReactElement) {
  return <AntdProvider>{page}</AntdProvider>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = blogCategories.map((category) => ({
    params: { category: category.slug },
  }));

  return {
    paths,
    fallback: false, // 404 if category doesn't exist
  };
};

export const getStaticProps: GetStaticProps<CategoryPageProps> = async (context) => {
  const { category: categorySlug } = context.params!;
  const category = getCategoryBySlug(categorySlug as string);

  if (!category) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      category,
      allCategories: blogCategories,
    },
  };
};
