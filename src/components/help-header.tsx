import React, { ReactNode } from 'react';
import { Typography } from 'antd';

const { Title, Text } = Typography;

type HelpHeaderProps = {
  badgeIcon?: ReactNode;
  badgeText: ReactNode;
  title: ReactNode;
  description: ReactNode;
  right?: ReactNode;
};

export function HelpHeader({ badgeIcon, badgeText, title, description, right }: HelpHeaderProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary-600 to-primary-700 p-6 mb-6">
      <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
      <div className="relative flex items-start justify-between gap-4 flex-col md:flex-row">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 text-white text-sm font-medium w-fit">
            {badgeIcon}
            <span>{badgeText}</span>
          </div>
          <Title level={3} className="!mt-3 !mb-1 !text-white">
            {title}
          </Title>
          <Text className="text-white/80">{description}</Text>
        </div>

        {right ? <div className="w-full md:w-[520px]">{right}</div> : null}
      </div>
    </div>
  );
}

