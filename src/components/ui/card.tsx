import React from 'react';
import clsx from 'clsx';
import { LucideIcon } from 'lucide-react';

interface BaseCardProps {
  children: React.ReactNode;
  className?: string;
}

interface FeatureCardProps extends BaseCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient?: string;
}

interface BenefitCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient?: string;
  className?: string;
}

export const GlassCard: React.FC<BaseCardProps> = ({ children, className }) => {
  return (
    <div
      className={clsx(
        'shadow-md p-2 md:p-3 xl:px-5 py-0 rounded-2xl bg-gray-50/80 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/50',
        className,
      )}
    >
      {children}
    </div>
  );
};

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  gradient = 'from-primary to-primary-700',
  className,
}) => {
  return (
    <div
      className={clsx(
        'group relative p-8 rounded-3xl bg-white dark:bg-dark-100 border border-gray-100 dark:border-dark-200 hover:border-primary/20 dark:hover:border-primary/20 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1',
        className,
      )}
    >
      <div
        className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon className="w-7 h-7 text-white" />
      </div>

      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>

      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/0 to-primary-600/0 group-hover:from-primary/[0.02] group-hover:to-primary-600/[0.02] transition-all duration-500" />
    </div>
  );
};

export const BenefitCard: React.FC<BenefitCardProps> = ({
  icon: Icon,
  title,
  description,
  gradient = 'from-primary to-primary-700',
  className,
}) => {
  return (
    <div
      className={clsx(
        'shadow-xl group relative p-6 rounded-2xl bg-white dark:bg-dark-100 border border-gray-100 dark:border-dark-200 hover:border-primary/20 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 h-full',
        className,
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};

export const PricingCard: React.FC<
  BaseCardProps & {
    popular?: boolean;
  }
> = ({ children, popular = false, className }) => {
  return (
    <div
      className={clsx(
        'relative flex flex-col h-full rounded-3xl p-8 transition-all duration-500',
        popular
          ? 'bg-gradient-to-b from-primary to-primary-600 text-white shadow-2xl shadow-primary/30 scale-105 z-10'
          : 'bg-white dark:bg-dark-100 border border-gray-100 dark:border-dark-200 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1',
        className,
      )}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white text-primary text-sm font-semibold shadow-lg">
          Mashhur
        </div>
      )}
      {children}
    </div>
  );
};

export const TestimonialCard: React.FC<{
  quote: string;
  author: string;
  company: string;
  initials: string;
  rating?: number;
  className?: string;
}> = ({ quote, author, company, initials, rating = 5, className }) => {
  return (
    <div
      className={clsx(
        'relative p-8 rounded-3xl bg-white dark:bg-dark-100 border border-gray-100 dark:border-dark-200 h-full flex flex-col transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1',
        className,
      )}
    >
      <div className="absolute -top-4 -left-2">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-700 flex items-center justify-center shadow-lg">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </div>
      </div>

      <div className="flex items-center gap-1 mb-4 pt-2">
        {[...Array(rating)].map((_, i) => (
          <svg key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>

      <blockquote className="flex-1 text-gray-600 dark:text-gray-300 leading-relaxed mb-6 text-sm">
        "{quote}"
      </blockquote>

      <div className="flex items-center gap-4 pt-4 border-t border-gray-100 dark:border-dark-200">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary-600/20 flex items-center justify-center">
          <span className="text-primary font-bold">{initials}</span>
        </div>
        <div>
          <p className="font-semibold text-gray-900 dark:text-white mb-0">{author}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-0">{company}</p>
        </div>
      </div>
    </div>
  );
};
