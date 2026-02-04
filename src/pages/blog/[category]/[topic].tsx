import Head from 'next/head';
import React, { ReactElement, useState } from 'react';
import { useRouter } from 'next/router';
import { GetStaticProps, GetStaticPaths } from 'next';
import { BlogCategory, BlogTopic, getCategoryBySlug, getTopicBySlug, allBlogTopics } from '@/data/blog/blogs';
import { getMDXContent, MDXContent as MDXContentType } from '@/lib/mdx';
import { SITE_URL, projectName } from '@/data/const';
import HeroSection from '@components/hero-section';
import { Container } from '@components/container';
import Footer from '@/widgets/landing/footer';
import Header from '@/widgets/landing/header';
import AntdProvider from '@hocs/antd-provider';
import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import BlogCard from '@/components/BlogCard';
import MDXContent from '@/components/MDXContent';

interface TopicPageProps {
  topic: BlogTopic & { categoryId: string; categoryName: string; categorySlug: string };
  category: BlogCategory;
  relatedTopics: BlogTopic[];
  prevTopic?: { slug: string; title: string } | null;
  nextTopic?: { slug: string; title: string } | null;
  mdxContent?: MDXContentType | null;
}

export default function TopicPage({
  topic,
  category,
  relatedTopics,
  prevTopic,
  nextTopic,
  mdxContent,
}: TopicPageProps) {
  const router = useRouter();
  const hasContent = mdxContent && mdxContent.content;
  const [imageError, setImageError] = useState(false);

  if (!topic || !category) {
    return (
      <>
        <Header />
        <div className="pt-16 py-20 text-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Mavzu topilmadi</h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Qidirilayotgan mavzu mavjud emas.</p>
          <Link
            href="/blog"
            className="mt-6 inline-block rounded-lg px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white transition"
          >
            Blogga qaytish
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const defaultImage = '/images/blog.jpg';
  const metaDescription =
    topic.description || `${topic.title} bo'yicha mutaxassislar tomonidan yozilgan maqola va maslahatlar.`;

  return (
    <>
      <Head>
        <title>
          {topic.title} | {category.name} - {projectName} Blog
        </title>
        <meta name="description" content={metaDescription} />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content={`${topic.title} | ${projectName} Blog`} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${SITE_URL}/blog/${category.slug}/${topic.slug}`} />
        <meta property="og:image" content={defaultImage} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${topic.title} | ${projectName} Blog`} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={defaultImage} />

        {/* Article meta */}
        <meta property="article:section" content={category.name} />

        <link rel="canonical" href={`${SITE_URL}/blog/${category.slug}/${topic.slug}`} />

        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: topic.title,
              description: metaDescription,
              image: defaultImage,
              url: `${SITE_URL}/blog/${category.slug}/${topic.slug}`,
              publisher: {
                '@type': 'Organization',
                name: projectName,
                url: SITE_URL,
                logo: {
                  '@type': 'ImageObject',
                  url: `${SITE_URL}/images/logo.png`,
                },
              },
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': `${SITE_URL}/blog/${category.slug}/${topic.slug}`,
              },
              articleSection: category.name,
            }),
          }}
        />

        {/* Blog Content Styles */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
            .blog-content {
              line-height: 1.8;
            }

            .dark .blog-content {
              color: #e2e8f0;
            }

            /* Lists */
            .blog-content ul {
              list-style: none;
              margin: 24px 0;
              padding-left: 0;
            }

            .blog-content ul li {
              position: relative;
              margin-bottom: 12px;
              padding-left: 32px;
              color: #2d3748;
            }

            .dark .blog-content ul li {
              color: #cbd5e1;
            }

            .blog-content ul li::before {
              content: '•';
              position: absolute;
              left: 0;
              color: #f87607;
              font-size: 20px;
              top: -20%;
            }

            .dark .blog-content ul li::before {
              color: #f5892d;
            }

            .blog-content ol {
              margin: 24px 0;
              padding-left: 0;
              counter-reset: item;
              list-style: none;
            }

            .blog-content ol li {
              position: relative;
              margin-bottom: 12px;
              padding-left: 40px;
              color: #2d3748;
              counter-increment: item;
            }

            .dark .blog-content ol li {
              color: #cbd5e1;
            }

            .blog-content ol li::before {
              content: counter(item);
              position: absolute;
              left: 0;
              top: 0;
              background: #ffd4b8;
              color:rgb(113, 61, 12);
              width: 24px;
              height: 24px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 12px;
              font-weight: 600;
            }

            .dark .blog-content ol li::before {
              background:rgba(246, 111, 15, 0.27);
              color: #fff8e1;
            }

            /* Headings */
            .blog-content h1 {
              font-size: 36px;
              font-weight: 800;
              margin: 40px 0 24px 0;
              line-height: 1.2;
            }

            .blog-content h2 {
              font-size: 28px;
              font-weight: 700;
              color: #1a202c;
              margin: 32px 0 16px 0;
              padding-bottom: 8px;
              border-bottom: 2px solid #F87607;
            }

            .dark .blog-content h2 {
              color: #f1f5f9;
              border-bottom-color: #f5892d;
            }

            .blog-content h3 {
              font-size: 22px;
              font-weight: 600;
              color: #2d3748;
              margin: 24px 0 12px 0;
              padding-left: 20px;
              border-left: 4px solid #F87607;
            }

            .dark .blog-content h3 {
              color: #e2e8f0;
              border-left-color: #f5892d;
            }

            .blog-content p {
              margin: 20px 0;
              color: #2d3748;
            }

            .dark .blog-content p {
              color: #cbd5e1;
            }

            .blog-content strong {
              font-weight: 700;
              color: #1a202c;
              background: rgba(248, 118, 7, 0.1);
              padding: 2px 4px;
              border-radius: 3px;
            }

            .dark .blog-content strong {
              color: #f1f5f9;
              background: rgba(245, 137, 45, 0.2);
            }

            /* Tables */
            .blog-content table {
              width: 100%;
              border-collapse: collapse;
              margin: 32px 0;
              overflow-x: auto;
              display: block;
              border-radius: 8px;
              box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            }

            .blog-content table thead {
              background: #F87607;
              color: white;
            }

            .dark .blog-content table thead {
              background: #f5892d;
            }

            .blog-content table th {
              padding: 16px;
              text-align: left;
              font-weight: 600;
              font-size: 14px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }

            .blog-content table tbody {
              background: white;
            }

            .dark .blog-content table tbody {
              background: #1e293b;
            }

            .blog-content table td {
              padding: 14px 16px;
              border-bottom: 1px solid #e2e8f0;
              color: #2d3748;
            }

            .dark .blog-content table td {
              border-bottom-color: #334155;
              color: #cbd5e1;
            }

            .blog-content table tbody tr:hover {
              background: rgba(248, 118, 7, 0.05);
            }

            .dark .blog-content table tbody tr:hover {
              background: rgba(245, 137, 45, 0.1);
            }

            .blog-content table tbody tr:last-child td {
              border-bottom: none;
            }

            @media (max-width: 768px) {
              .blog-content table {
                font-size: 14px;
              }

              .blog-content table th,
              .blog-content table td {
                padding: 10px 12px;
              }
            }
          `,
          }}
        />
      </Head>

      <Header />

      <div className="min-h-screen relative overflow-hidden bg-white dark:bg-dark">
        {/* Background gradient orbs - yengil elementlar */}
        <div className="fixed inset-0 pointer-events-none z-[5] opacity-25">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full blur-2xl" />
          <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-primary-400/20 to-primary-300/5 rounded-full blur-xl" />
          <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-gradient-to-br from-primary-500/15 to-primary/5 rounded-full blur-2xl" />
          <div className="absolute top-1/2 right-1/4 w-28 h-28 bg-gradient-to-br from-primary-300/20 to-primary-200/5 rounded-full blur-xl" />
        </div>

        <div className="relative z-10">
          <HeroSection
            backgroundImage={`/images/blog/${topic.slug}.jpg`}
            title={topic.title}
            description={topic.description || `${category.name} bo'yicha foydali maqola va maslahatlar.`}
          />

          {/* Top Navigation - Prev/Next */}
          {(prevTopic || nextTopic) && (
            <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-dark py-4">
              <Container>
                <div className="flex items-center justify-between gap-4">
                  {prevTopic ? (
                    <Link
                      href={`/blog/${category.slug}/${prevTopic.slug}`}
                      className="group flex items-center gap-2 rounded-lg px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-white transition-all hover:bg-primary/10"
                    >
                      <svg
                        className="h-5 w-5 transition-transform group-hover:-translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500 dark:text-gray-400">Oldingi mavzu</span>
                        <span className="text-sm font-medium line-clamp-1">{prevTopic.title}</span>
                      </div>
                    </Link>
                  ) : (
                    <div />
                  )}
                  {nextTopic ? (
                    <Link
                      href={`/blog/${category.slug}/${nextTopic.slug}`}
                      className="group ml-auto flex items-center gap-2 rounded-lg px-4 py-2 text-right text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-white transition-all hover:bg-primary/10"
                    >
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500 dark:text-gray-400">Keyingi mavzu</span>
                        <span className="text-sm font-medium line-clamp-1">{nextTopic.title}</span>
                      </div>
                      <svg
                        className="h-5 w-5 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  ) : (
                    <div />
                  )}
                </div>
              </Container>
            </div>
          )}

          <article className="mx-auto max-w-4xl py-10">
            <Container>
              {/* Breadcrumb */}
              <nav className="mb-8 text-sm text-gray-700 dark:text-gray-300">
                <Link href="/" className="hover:underline">
                  Bosh sahifa
                </Link>
                <span className="mx-2 text-gray-500 dark:text-gray-400">/</span>
                <Link href="/blog" className="hover:underline">
                  Blog
                </Link>
                <span className="mx-2 text-gray-500 dark:text-gray-400">/</span>
                <Link href={`/blog/${category.slug}`} className="hover:underline">
                  {category.name}
                </Link>
                <span className="mx-2 text-gray-500 dark:text-gray-400">/</span>
                <span className="text-gray-500 dark:text-gray-400">{topic.title}</span>
              </nav>

              {/* Category Badge */}
              <div className="mb-6">
                <Link href={`/blog/${category.slug}`}>
                  <span className="inline-block rounded-full px-4 py-2 text-sm font-medium transition hover:opacity-80 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-400 border border-primary/30 dark:border-primary/50">
                    {category.name}
                  </span>
                </Link>
              </div>

              {/* Title */}
              <h1 className="mb-6 text-3xl font-bold lg:text-4xl text-gray-900 dark:text-gray-100">{topic.title}</h1>

              {/* Description */}
              {topic.description && (
                <div className="mb-8 rounded-xl border-l-4 p-6 text-lg leading-relaxed border-primary dark:border-primary-400 bg-primary-50 dark:bg-primary-900/20 text-gray-600 dark:text-gray-300">
                  {topic.description}
                </div>
              )}

              {/* Featured Image */}
              {!imageError && (
                <div className="mb-8 overflow-hidden rounded-xl">
                  <Image
                    src={`/images/blog/${topic.slug}.jpg`}
                    alt={topic.title}
                    width={800}
                    height={400}
                    className="h-[400px] w-full object-cover"
                    priority
                    onError={() => setImageError(true)}
                  />
                </div>
              )}

              {/* Content */}
              {hasContent ? (
                <MDXContent content={mdxContent.content} />
              ) : (
                <div className="blog-content">
                  <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1e293b] p-12 text-center">
                    <div className="mb-4 text-6xl">📝</div>
                    <h2 className="mb-4 text-2xl font-bold text-gray-800 dark:text-gray-200">Maqola tayyorlanmoqda</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                      Ushbu mavzu bo'yicha maqola tez orada qo'shiladi. Boshqa mavzular bilan tanishib chiqing!
                    </p>
                  </div>
                </div>
              )}

              {/* Related Topics */}
              {relatedTopics && relatedTopics.length > 0 && (
                <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
                  <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">Tegishli Mavzular</h2>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {relatedTopics.map((relatedTopic) => (
                      <BlogCard
                        key={relatedTopic.slug}
                        id={`${category.slug}/${relatedTopic.slug}`}
                        image={`/images/blog/${relatedTopic.slug}.jpg`}
                        categories={[{ id: category.id, name: category.name }]}
                        title={relatedTopic.title}
                        desc={relatedTopic.description}
                        createdAt={new Date().toISOString()}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom Navigation - Prev/Next */}
              {(prevTopic || nextTopic) && (
                <div className="mt-12 flex items-center justify-between gap-4 border-t border-gray-200 dark:border-gray-700 pt-8">
                  {prevTopic ? (
                    <Link
                      href={`/blog/${category.slug}/${prevTopic.slug}`}
                      className="group flex flex-1 items-center gap-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-100 hover:border-primary dark:hover:border-primary/50 p-4 transition-all hover:bg-primary/5"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500 dark:text-gray-400">Oldingi mavzu</span>
                        <span className="text-sm font-semibold line-clamp-1 text-gray-900 dark:text-white">
                          {prevTopic.title}
                        </span>
                      </div>
                    </Link>
                  ) : (
                    <div className="flex-1" />
                  )}
                  {nextTopic ? (
                    <Link
                      href={`/blog/${category.slug}/${nextTopic.slug}`}
                      className="group ml-auto flex flex-1 flex-row-reverse items-center gap-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-100 hover:border-primary dark:hover:border-primary/50 p-4 text-right transition-all hover:bg-primary/5"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500 dark:text-gray-400">Keyingi mavzu</span>
                        <span className="text-sm font-semibold line-clamp-1 text-gray-900 dark:text-white">
                          {nextTopic.title}
                        </span>
                      </div>
                    </Link>
                  ) : (
                    <div className="flex-1" />
                  )}
                </div>
              )}

              {/* Navigation */}
              <div className="mt-6 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-6">
                <Link
                  href={`/blog/${category.slug}`}
                  className="inline-flex items-center gap-2 font-medium text-gray-700 dark:text-gray-300 hover:underline"
                >
                  ← {category.name} ga qaytish
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 font-medium text-gray-700 dark:text-gray-300 hover:underline"
                >
                  Barcha kategoriyalarga →
                </Link>
              </div>
            </Container>
          </article>
        </div>
        <Footer />
      </div>
    </>
  );
}

TopicPage.getLayout = function getLayout(page: ReactElement) {
  return <AntdProvider>{page}</AntdProvider>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Generate paths for all topics
  const paths = allBlogTopics.map((topic) => ({
    params: {
      category: topic.categorySlug,
      topic: topic.slug,
    },
  }));

  return {
    paths,
    fallback: false, // 404 if topic doesn't exist
  };
};

export const getStaticProps: GetStaticProps<TopicPageProps> = async (context) => {
  const { category: categorySlug, topic: topicSlug } = context.params!;

  const category = getCategoryBySlug(categorySlug as string);
  const topic = getTopicBySlug(topicSlug as string);

  if (!category || !topic || topic.categorySlug !== categorySlug) {
    return {
      notFound: true,
    };
  }

  // Get related topics from the same category (excluding current topic)
  const relatedTopics = category.topics.filter((t) => t.slug !== topicSlug).slice(0, 6); // Show up to 6 related topics

  // Find prev and next topics in the same category
  const currentIndex = category.topics.findIndex((t) => t.slug === topicSlug);
  const prevTopic =
    currentIndex > 0
      ? {
          slug: category.topics[currentIndex - 1].slug,
          title: category.topics[currentIndex - 1].title,
        }
      : null;
  const nextTopic =
    currentIndex < category.topics.length - 1
      ? {
          slug: category.topics[currentIndex + 1].slug,
          title: category.topics[currentIndex + 1].title,
        }
      : null;

  // Try to get MDX content
  const mdxContent = await getMDXContent(topicSlug as string);

  return {
    props: {
      topic,
      category,
      relatedTopics,
      prevTopic,
      nextTopic,
      mdxContent,
    },
  };
};
