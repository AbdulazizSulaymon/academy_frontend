import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/lib/blog-api';
import { getImagePath } from '@/utils/util';

interface RelatedPostsProps {
  posts: BlogPost[];
  currentPostId: string;
}

export default function RelatedPosts({ posts, currentPostId }: RelatedPostsProps) {
  // Filter out current post and limit to 3 posts
  const filteredPosts = posts.filter((post) => post.id !== currentPostId).slice(0, 3);

  if (filteredPosts.length === 0) {
    return null;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const defaultImage = '/images/blog.jpg';

  return (
    <section className="mt-16 border-t border-gray-200 pt-12">
      <div className="mb-8">
        <h2 className="mb-2 text-2xl font-bold text-gray-800">Related Articles</h2>
        <p className="text-gray-600">Continue reading with these related posts</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => {
          const imageUrl = post.image ? getImagePath(post.image, defaultImage) : defaultImage;

          return (
            <article
              key={post.id}
              className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <Link href={`/blog/${post.id}`}>
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = defaultImage;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                <div className="p-5">
                  {/* Categories */}
                  {post.categories && post.categories.length > 0 && (
                    <div className="mb-3 flex flex-wrap gap-2">
                      {post.categories.slice(0, 2).map((category) => (
                        <span
                          key={category.id}
                          className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 ring-1 ring-blue-200"
                        >
                          {category.name}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-gray-800 transition-colors group-hover:text-blue-600">
                    {post.title}
                  </h3>

                  {/* Description */}
                  {post.desc && (
                    <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-gray-600">
                      {post.desc}
                    </p>
                  )}

                  {/* Meta */}
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                        <span className="text-xs font-medium">
                          {post.author?.name?.charAt(0)?.toUpperCase() || 'V'}
                        </span>
                      </div>
                      <span className="font-medium">{post.author?.name || 'Yorka Auto Transport Team'}</span>
                    </div>
                    <span className="text-gray-300">•</span>
                    <time dateTime={post.createdAt} className="font-medium">
                      {formatDate(post.createdAt)}
                    </time>
                  </div>
                </div>
              </Link>
            </article>
          );
        })}
      </div>

      {/* Call to action */}
      <div className="mt-8 text-center">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-medium text-white transition-all hover:from-blue-700 hover:to-purple-700 hover:shadow-lg"
        >
          <span>View All Articles</span>
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
}
