import React from 'react';
import clsx from 'clsx';
import { X } from 'lucide-react';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'small' | 'medium' | 'large';
  onClear?: () => void;
  allowClear?: boolean;
}

export const Input: React.FC<InputProps> = ({
  size = 'medium',
  className,
  allowClear = false,
  onClear,
  value,
  ...props
}) => {
  const sizeClasses = {
    small: 'h-9 px-3 text-sm',
    medium: 'h-10 px-4 text-base',
    large: 'h-12 px-5 text-base',
  };

  const showClear = allowClear && value;

  return (
    <div className="relative w-full">
      <input
        value={value}
        className={clsx(
          'w-full bg-gray-100 border-none rounded-xl text-gray-800 placeholder-gray-400',
          'focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all',
          sizeClasses[size],
          showClear && 'pr-10',
          className,
        )}
        {...props}
      />
      {showClear && (
        <div
          onClick={onClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gray-300 hover:bg-gray-400 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-3.5 h-3.5 text-gray-600" />
        </div>
      )}
    </div>
  );
};

interface SearchInputProps extends Omit<InputProps, 'allowClear'> {
  onSearch?: (value: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  onClear,
  onKeyDown,
  value,
  ...props
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(value as string);
    }
    onKeyDown?.(e);
  };

  return (
    <Input
      value={value}
      allowClear
      onClear={onClear}
      onKeyDown={handleKeyDown}
      {...props}
    />
  );
};
