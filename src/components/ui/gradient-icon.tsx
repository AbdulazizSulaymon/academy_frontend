import React from 'react';
import clsx from 'clsx';
import { LucideIcon } from 'lucide-react';

type IconSize = 'sm' | 'md' | 'lg' | 'xl';

interface GradientIconProps {
  icon: LucideIcon;
  size?: IconSize;
  gradient?: string;
  className?: string;
}

const sizeClasses: Record<IconSize, { container: string; icon: string }> = {
  sm: { container: 'w-10 h-10 rounded-xl', icon: 'w-5 h-5' },
  md: { container: 'w-12 h-12 rounded-xl', icon: 'w-6 h-6' },
  lg: { container: 'w-14 h-14 rounded-2xl', icon: 'w-7 h-7' },
  xl: { container: 'w-16 h-16 rounded-2xl', icon: 'w-8 h-8' },
};

export const GradientIcon: React.FC<GradientIconProps> = ({
  icon: Icon,
  size = 'lg',
  gradient = 'from-primary to-primary-700',
  className,
}) => {
  const { container, icon } = sizeClasses[size];

  return (
    <div
      className={clsx(
        'inline-flex items-center justify-center bg-gradient-to-br shadow-lg',
        container,
        gradient,
        className
      )}
    >
      <Icon className={clsx(icon, 'text-white')} />
    </div>
  );
};

interface GradientIconBadgeProps {
  icon: LucideIcon;
  number?: number;
  gradient?: string;
  className?: string;
}

export const GradientIconBadge: React.FC<GradientIconBadgeProps> = ({
  icon: Icon,
  number,
  gradient = 'from-primary to-primary-700',
  className,
}) => {
  return (
    <div
      className={clsx(
        'relative w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-lg',
        gradient,
        className
      )}
    >
      <Icon className="w-8 h-8 text-white" />
      {number !== undefined && (
        <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white text-primary text-sm font-bold flex items-center justify-center shadow-md">
          {number}
        </span>
      )}
    </div>
  );
};
