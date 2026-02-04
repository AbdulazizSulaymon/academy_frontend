import { Segmented, SegmentedProps } from 'antd';
import clsx from 'clsx';
import React from 'react';
import { useLocationParams } from '@hooks/use-location-params';

type SegmentedOption =
  | string
  | number
  | { label: React.ReactNode; value: string | number; disabled?: boolean; icon?: React.ReactNode };

type TabProps = Omit<SegmentedProps, 'options'> & {
  options: SegmentedOption[];
  queryName: string;
  views?: { value: string; view: React.ReactNode }[];
  defaultValue?: string;
  bodyClassName?: string;
};

export const SegmentedTab: React.FC<TabProps> = ({
  options,
  queryName,
  views,
  defaultValue,
  onChange,
  bodyClassName,
  ...props
}) => {
  const { query, push } = useLocationParams();

  const getFirstEnabledOption = (): string => {
    const firstEnabled = options.find(
      (option) => typeof option !== 'string' && typeof option !== 'number' && !option.disabled,
    );
    return typeof firstEnabled === 'object' ? String(firstEnabled?.value) : String(firstEnabled);
  };

  const value: string = (query[queryName] as string) || defaultValue || getFirstEnabledOption();
  const currentView = views?.find((item) => item.value === value)?.view;

  return (
    <>
      <Segmented
        options={options}
        value={value}
        onChange={(v) => {
          const newValue = String(v);
          push({ query: { [queryName]: newValue } }, { update: true });
          onChange?.(newValue);
        }}
        {...props}
      />
      {currentView && <div className={clsx('mt-4', bodyClassName)}>{currentView}</div>}
    </>
  );
};
