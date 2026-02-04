import React from 'react';
import clsx from 'clsx';

interface SectionHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  centered?: boolean;
  light?: boolean;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  description,
  centered = true,
  light = false,
  className,
}) => {
  return (
    <div className={clsx(centered && 'text-center', 'mb-16', className)}>
      {badge && (
        <span
          className={clsx(
            'inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4',
            light
              ? 'bg-white/20 text-white'
              : 'bg-primary/10 text-primary'
          )}
        >
          {badge}
        </span>
      )}
      <h2
        className={clsx(
          'text-3xl md:text-4xl font-bold mb-4',
          light ? 'text-white' : 'text-gray-900 dark:text-white'
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={clsx(
            'text-lg max-w-2xl',
            centered && 'mx-auto',
            light ? 'text-white/80' : 'text-gray-600 dark:text-gray-400'
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
};
