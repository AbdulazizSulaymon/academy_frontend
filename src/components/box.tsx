import clsx from 'clsx';
import { Props } from '@src/types';

export const Box = ({ children, className, ...props }: Props & { className?: string }) => {
  return (
    <div
      className={clsx(
        'p-4 md:p-5 xl:p-6 rounded-2xl transition-all duration-300',
        'bg-white dark:bg-[#18181B]',
        'border border-gray-100 dark:border-gray-800',
        'shadow-sm hover:shadow-md',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// export const Box = ({ children, className, ...props }: Props) => {
//   return (
//     <div className={'shadow p-3 xl:p-5 2xl:p-6 bg-white dark:bg-[#1d1c1f] rounded-lg ' + className} {...props}>
//       {children}
//     </div>
//   );
// };
