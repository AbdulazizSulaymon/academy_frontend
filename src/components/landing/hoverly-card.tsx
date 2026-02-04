import { css } from '@emotion/react';
import React, { useCallback, useRef, useState } from 'react';
import { throttle } from '@utils/util';
import { useMyTheme } from '@hooks/use-my-theme';
import { Props } from '@src/types';
import clsx from 'clsx';
import { useResponsive } from 'ahooks';

export const HoverlyCard = ({ children, className }: Props & { className?: string }) => {
  const { isDarkMode } = useMyTheme();
  const responsive = useResponsive();
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = useCallback(
    throttle((e: React.MouseEvent<HTMLDivElement>) => {
      if (!divRef.current || isFocused) return;

      const div = divRef.current;
      const rect = div.getBoundingClientRect();

      setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }, 50),
    [setPosition, divRef, isFocused],
  );

  const handleFocus = useCallback(
    throttle(() => {
      setIsFocused(true);
      setOpacity(1);
    }, 50),
    [setIsFocused, setOpacity],
  );

  const handleBlur = useCallback(
    throttle(() => {
      setIsFocused(false);
      setOpacity(0);
    }, 50),
    [setIsFocused, setOpacity],
  );

  const handleMouseEnter = useCallback(
    throttle(() => {
      setOpacity(1);
    }, 50),
    [setOpacity],
  );

  const handleMouseLeave = useCallback(
    throttle(() => {
      setOpacity(0);
    }, 50),
    [setOpacity],
  );

  return (
    <div
      className={clsx('relative cursor-pointer overflow-hidden rounded-md shadow-2xl h-full', className)}
      ref={divRef}
      onMouseMove={responsive.lg ? handleMouseMove : undefined}
      onFocus={responsive.lg ? handleFocus : undefined}
      onBlur={responsive.lg ? handleBlur : undefined}
      onMouseEnter={responsive.lg ? handleMouseEnter : undefined}
      onMouseLeave={responsive.lg ? handleMouseLeave : undefined}
      css={css`
        /* background-color: ${isDarkMode ? 'rgba(3, 0, 42, 0.4)' : 'rgba(3, 0, 42, 1)'}; */
        backdrop-filter: blur(10px);
      `}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${
            isDarkMode ? 'rgba(255,182,255,.1)' : 'rgba(195,182,255,0.3)'
          }, transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
};
