import Link from 'next/link';
import Image from 'next/image';
import { getImagePath } from '@/utils/util';
import clsx from 'clsx';
import { useState } from 'react';

interface BlogCardProps {
  id: string;
  image?: string;
  categories?: { id: string; name: string }[];
  title: string;
  author?: { name?: string };
  desc?: string;
  createdAt: string;
}

export default function BlogCard({ id, image, categories, title, author, desc, createdAt }: BlogCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const months = [
      'Yanvar',
      'Fevral',
      'Mart',
      'Aprel',
      'May',
      'Iyun',
      'Iyul',
      'Avgust',
      'Sentabr',
      'Oktabr',
      'Noyabr',
      'Dekabr',
    ];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  const defaultImage = '/images/blog.jpg';
  const imageUrl = image && !imageError ? getImagePath(image, defaultImage) : defaultImage;

  const href = id.startsWith('/') ? id : `/blog/${id}`;

  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <article
      className={clsx(
        'overflow-hidden rounded-xl border border-gray-200 bg-white shadow transition hover:shadow-xl',
        'dark:border-gray-700 dark:bg-[#1e293b] dark:hover:shadow-xl dark:hover:shadow-gray-900/50',
      )}
    >
      <Link href={href}>
        <div className="group">
          <div className="relative h-48 w-full overflow-hidden">
            {isLoading && !imageError && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-t-transparent border-gray-300 dark:border-gray-600" />
              </div>
            )}
            <Image
              src={imageUrl}
              alt={title}
              fill
              className={clsx(
                'object-cover transition duration-300 group-hover:scale-105',
                isLoading && !imageError ? 'opacity-0' : 'opacity-100',
              )}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={handleImageError}
              onLoad={handleImageLoad}
              onLoadingComplete={handleImageLoad}
            />
          </div>
          <div className="p-4">
            {categories && categories.length > 0 && (
              <div className="mb-2 flex flex-wrap gap-1">
                {categories.slice(0, 2).map((category) => (
                  <span
                    key={category.id}
                    className="rounded-full bg-primary-100 px-2 py-1 text-xs font-medium text-primary-600"
                  >
                    {category.name}
                  </span>
                ))}
                {categories.length > 2 && (
                  <span className="rounded-full px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                    +{categories.length - 2}
                  </span>
                )}
              </div>
            )}
            <h3 className="mb-2 text-lg font-semibold text-gray-800 transition group-hover:text-primary-600 dark:text-gray-100">
              {title}
            </h3>
            {desc && <p className="mb-3 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">{desc}</p>}
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              {/*<div*/}
              {/*  className={clsx(*/}
              {/*    'flex h-6 w-6 items-center justify-center rounded-full',*/}
              {/*    isDarkMode ? 'bg-gray-700' : 'bg-gray-200',*/}
              {/*  )}*/}
              {/*>*/}
              {/*  <span className={clsx('text-xs font-medium', isDarkMode ? 'text-gray-300' : 'text-gray-700')}>*/}
              {/*    {author?.name?.charAt(0)?.toUpperCase() || 'V'}*/}
              {/*  </span>*/}
              {/*</div>*/}
              {/*<span>{author?.name || 'Muallif'}</span>*/}
              {/*<span className="mx-1">•</span>*/}
              <time dateTime={createdAt}>{formatDate(createdAt)}</time>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
