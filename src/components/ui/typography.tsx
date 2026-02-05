import { Typography as AntTypography, TypographyProps as AntTypographyProps } from 'antd';
import React from 'react';
import clsx from 'clsx';

const { Title, Text, Paragraph } = AntTypography;

interface StyledTitleProps extends AntTypographyProps {
  level?: 1 | 2 | 3 | 4 | 5;
}

export const StyledTitle: React.FC<StyledTitleProps> = ({
  level = 2,
  className,
  ...props
}) => {
  const levelClasses = {
    1: 'text-3xl md:text-4xl lg:text-5xl',
    2: 'text-2xl md:text-3xl',
    3: 'text-xl md:text-2xl',
    4: 'text-lg md:text-xl',
    5: 'text-base md:text-lg',
  };

  return (
    <Title
      level={level}
      className={clsx(
        '!font-bold !text-gray-900 dark:!text-white',
        levelClasses[level],
        className,
      )}
      {...props}
    />
  );
};

export const CustomTitle = StyledTitle;

interface StyledTextProps extends AntTypographyProps {}

export const StyledText: React.FC<StyledTextProps> = ({
  className,
  type,
  ...props
}) => {
  const typeClasses = {
    secondary: '!text-gray-500 dark:!text-gray-400',
    success: '!text-green-600 dark:!text-green-400',
    warning: '!text-orange-600 dark:!text-orange-400',
    danger: '!text-red-600 dark:!text-red-400',
  };

  return (
    <Text
      className={clsx(
        '!text-gray-700 dark:!text-gray-300',
        type && typeClasses[type as keyof typeof typeClasses],
        className,
      )}
      {...props}
    />
  );
};

export const CustomText = StyledText;

interface StyledParagraphProps extends AntTypographyProps {}

export const StyledParagraph: React.FC<StyledParagraphProps> = ({
  className,
  ...props
}) => {
  return (
    <Paragraph
      className={clsx(
        '!text-gray-600 dark:!text-gray-400 !leading-relaxed',
        className,
      )}
      {...props}
    />
  );
};

export const CustomParagraph = StyledParagraph;

export const Typography = AntTypography;

export { Title, Text, Paragraph };

export default AntTypography;
