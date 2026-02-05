import { Select as AntSelect, SelectProps as AntSelectProps } from 'antd';
import React from 'react';
import clsx from 'clsx';

interface StyledSelectProps extends Omit<AntSelectProps, 'size'> {
  size?: 'small' | 'medium' | 'large';
}

export const StyledSelect: React.FC<StyledSelectProps> = ({
  size = 'medium',
  className,
  ...props
}) => {
  const sizeClasses = {
    small: 'h-9 text-sm',
    medium: 'h-12 text-base',
    large: 'h-14 text-lg',
  };

  return (
    <AntSelect
      className={clsx(
        'rounded-xl border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm',
        'focus:border-primary focus:ring-4 focus:ring-primary/20 hover:border-gray-300 dark:hover:border-gray-600',
        'transition-all duration-300 shadow-sm hover:shadow-md',
        '[&_.ant-select-selector]:!border-none [&_.ant-select-selector]:!bg-transparent',
        '[&_.ant-select-focused_.ant-select-selector]:!border-none [&_.ant-select-focused_.ant-select-selector]:!bg-transparent',
        '[&_.ant-select-selector]:!rounded-xl [&_.ant-select-selector]:!shadow-none',
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  );
};

export const Select = StyledSelect;

export default AntSelect;
