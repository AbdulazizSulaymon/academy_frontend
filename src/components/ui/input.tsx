import { Input as AntInput, InputProps as AntInputProps } from 'antd';
import { Search } from 'lucide-react';
import React, { useState } from 'react';
import clsx from 'clsx';

interface StyledInputProps extends Omit<AntInputProps, 'size'> {
  size?: 'small' | 'medium' | 'large';
}

export const StyledInput: React.FC<StyledInputProps> = ({
  size = 'medium',
  className,
  ...props
}) => {
  const sizeClasses = {
    small: 'h-9 px-3 text-sm',
    medium: 'h-12 px-4 text-base',
    large: 'h-14 px-5 text-lg',
  };

  return (
    <AntInput
      className={clsx(
        'rounded-xl border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm',
        'focus:border-primary focus:ring-4 focus:ring-primary/20 hover:border-gray-300 dark:hover:border-gray-600',
        'transition-all duration-300 shadow-sm hover:shadow-md',
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  );
};

export const Input = StyledInput;

interface StyledPasswordProps extends Omit<AntInputProps, 'size'> {
  size?: 'small' | 'medium' | 'large';
}

export const StyledPassword: React.FC<StyledPasswordProps> = ({
  size = 'medium',
  className,
  ...props
}) => {
  const sizeClasses = {
    small: 'h-9 px-3 text-sm',
    medium: 'h-12 px-4 text-base',
    large: 'h-14 px-5 text-lg',
  };

  return (
    <AntInput.Password
      className={clsx(
        'rounded-xl border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm',
        'focus:border-primary focus:ring-4 focus:ring-primary/20 hover:border-gray-300 dark:hover:border-gray-600',
        'transition-all duration-300 shadow-sm hover:shadow-md',
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  );
};

export const Password = StyledPassword;

interface StyledTextAreaProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
  [key: string]: any;
}

export const StyledTextArea: React.FC<StyledTextAreaProps> = ({
  size = 'medium',
  className,
  ...props
}) => {
  const sizeClasses = {
    small: 'px-3 py-2 text-sm',
    medium: 'px-4 py-3 text-base',
    large: 'px-5 py-4 text-lg',
  };

  return (
    <AntInput.TextArea
      className={clsx(
        'rounded-xl border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm',
        'focus:border-primary focus:ring-4 focus:ring-primary/20 hover:border-gray-300 dark:hover:border-gray-600',
        'transition-all duration-300 shadow-sm hover:shadow-md resize-y',
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  );
};

export const TextArea = StyledTextArea;

interface SearchInputProps extends Omit<AntInputProps, 'size' | 'prefix' | 'onSearch'> {
  size?: 'small' | 'medium' | 'large';
  onSearchClick?: (value: string) => void;
}

export const StyledSearchInput: React.FC<SearchInputProps> = ({
  size = 'medium',
  className,
  onSearchClick,
  onPressEnter,
  ...props
}) => {
  const [value, setValue] = useState(props.value || '');

  const sizeClasses = {
    small: 'h-9 pl-10 pr-4 text-sm',
    medium: 'h-12 pl-12 pr-4 text-base',
    large: 'h-14 pl-14 pr-5 text-lg',
  };

  const iconSize = {
    small: 'w-4 h-4',
    medium: 'w-5 h-5',
    large: 'w-6 h-6',
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearchClick?.(value as string);
    }
    onPressEnter?.(e);
  };

  return (
    <div className="relative w-full">
      <Search
        className={clsx(
          'absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none',
          iconSize[size],
        )}
      />
      <AntInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className={clsx(
          'rounded-xl border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm',
          'focus:border-primary focus:ring-4 focus:ring-primary/20 hover:border-gray-300 dark:hover:border-gray-600',
          'transition-all duration-300 shadow-sm hover:shadow-md',
          sizeClasses[size],
          className,
        )}
        {...props}
      />
    </div>
  );
};

export const SearchInput = StyledSearchInput;

export default AntInput;
