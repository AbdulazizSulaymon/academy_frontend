import React from 'react';
import { useMyTheme } from '@hooks/use-my-theme';
import clsx from 'clsx';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import Image from 'next/image';

interface MDXContentProps {
  content: string;
}

/**
 * MDX Content Renderer
 * Renders MDX content with proper styling using react-markdown
 */
export default function MDXContent({ content }: MDXContentProps) {
  const { isDarkMode } = useMyTheme();

  return (
    <div className={clsx('blog-content prose prose-lg max-w-none', isDarkMode && 'dark')}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Custom link component
          a: ({ node, children, href, ...props }) => {
            if (href?.startsWith('/')) {
              return (
                <Link href={href} className="text-primary-600 hover:text-primary-700 hover:underline">
                  {children}
                </Link>
              );
            }
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 hover:underline"
                {...props}
              >
                {children}
              </a>
            );
          },
          // Custom image component
          img: ({ node, src, alt, ...props }) => {
            if (!src) return null;

            return (
              <span className="my-8 block overflow-hidden rounded-xl">
                {/*@ts-ignore*/}
                <Image src={src} alt={alt || ''} width={800} height={450} className="w-full object-cover" {...props} />
              </span>
            );
          },
          // Custom code block
          pre: ({ node, children, ...props }) => (
            <pre
              className={clsx(
                // Always dark-style code blocks (even in light mode)
                'rounded-xl p-6 overflow-x-auto bg-gray-900 text-gray-100',
              )}
              {...props}
            >
              {children}
            </pre>
          ),
          // Custom code inline
          code: ({ node, inline, children, ...props }: any) => {
            if (inline) {
              return (
                <code
                  className={clsx(
                    'rounded px-2 py-1 text-sm font-mono',
                    isDarkMode ? 'bg-gray-800 text-red-400' : 'bg-gray-100 text-red-600',
                  )}
                  {...props}
                >
                  {children}
                </code>
              );
            }
            return <code {...props}>{children}</code>;
          },
          // Custom blockquote
          blockquote: ({ node, children, ...props }) => (
            <blockquote
              className={clsx(
                'border-l-4 pl-6 py-4 my-6 rounded-r-lg',
                isDarkMode ? 'border-primary-500 bg-gray-800' : 'border-primary-500 bg-primary-50',
              )}
              {...props}
            >
              {children}
            </blockquote>
          ),
          // Custom table
          table: ({ node, children, ...props }) => (
            <div className="my-8 overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full" {...props}>
                {children}
              </table>
            </div>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
