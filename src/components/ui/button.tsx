import { Button as AntButton, ButtonProps as AntButtonProps } from 'antd';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import clsx from 'clsx';

interface BaseButtonProps extends Omit<AntButtonProps, 'type'> {
  children: React.ReactNode;
  withArrow?: boolean;
  href?: string;
}

export const PrimaryButton: React.FC<BaseButtonProps> = ({
  children,
  withArrow = false,
  href,
  className,
  ...props
}) => {
  const button = (
    <AntButton
      type="primary"
      className={clsx(
        'h-12 px-6 rounded-xl font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2',
        className,
      )}
      {...props}
    >
      {children}
      {withArrow && <ArrowRight className="w-5 h-5" />}
    </AntButton>
  );

  if (href) {
    return <Link href={href}>{button}</Link>;
  }

  return button;
};

export const SecondaryButton: React.FC<BaseButtonProps> = ({
  children,
  withArrow = false,
  href,
  className,
  ...props
}) => {
  const button = (
    <AntButton
      className={clsx(
        'h-12 px-6 rounded-xl font-semibold border-2 border-gray-200 dark:border-dark-200 hover:border-primary hover:text-primary transition-all duration-300 flex items-center justify-center gap-2',
        className,
      )}
      {...props}
    >
      {children}
      {withArrow && <ArrowRight className="w-5 h-5" />}
    </AntButton>
  );

  if (href) {
    return <Link href={href}>{button}</Link>;
  }

  return button;
};

export const GhostButton: React.FC<BaseButtonProps> = ({
  children,
  withArrow = false,
  href,
  className,
  ...props
}) => {
  const button = (
    <AntButton
      type="text"
      className={clsx(
        'h-10 px-4 rounded-xl font-medium hover:bg-primary/5 hover:text-primary transition-all duration-300 flex items-center justify-center gap-2',
        className,
      )}
      {...props}
    >
      {children}
      {withArrow && <ArrowRight className="w-4 h-4" />}
    </AntButton>
  );

  if (href) {
    return <Link href={href}>{button}</Link>;
  }

  return button;
};

export const OutlineButton: React.FC<BaseButtonProps> = ({
  children,
  withArrow = false,
  href,
  className,
  ...props
}) => {
  const button = (
    <AntButton
      className={clsx(
        'h-12 px-6 rounded-xl font-semibold border-2 border-primary text-primary hover:bg-primary/5 transition-all duration-300 flex items-center justify-center gap-2',
        className,
      )}
      {...props}
    >
      {children}
      {withArrow && <ArrowRight className="w-5 h-5" />}
    </AntButton>
  );

  if (href) {
    return <Link href={href}>{button}</Link>;
  }

  return button;
};

export const WhiteButton: React.FC<BaseButtonProps> = ({
  children,
  withArrow = false,
  href,
  className,
  ...props
}) => {
  const button = (
    <AntButton
      className={clsx(
        'h-12 px-6 rounded-xl font-semibold bg-white text-primary hover:bg-gray-100 border-none shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2',
        className,
      )}
      {...props}
    >
      {children}
      {withArrow && <ArrowRight className="w-5 h-5" />}
    </AntButton>
  );

  if (href) {
    return <Link href={href}>{button}</Link>;
  }

  return button;
};
