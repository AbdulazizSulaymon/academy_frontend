import { Button } from 'antd';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import React from 'react';

import { Props } from '@src/types';
import clsx from 'clsx';

interface ButtonLinkProps extends Omit<Props, 'href'> {
  href: string;
  target?: boolean;
  children: React.ReactNode;
}

export const ButtonLink: React.FC<ButtonLinkProps> = ({ href, target, children, ...props }) => {
  const isExternal = target === true;
  
  return (
    <NextLink
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      {...props}
    >
      <Button className="w-full flex-1">{children}</Button>
    </NextLink>
  );
};

interface LinkProps extends Omit<NextLinkProps, 'href' | 'target'> {
  href: string;
  target?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Link: React.FC<LinkProps> = ({
  href,
  target,
  className,
  children,
  ...props
}) => {
  const isExternal = target === true;
  
  return (
    <NextLink
      href={href}
      className={clsx(className)}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {children}
    </NextLink>
  );
};
