import React from 'react';
import { Fade } from 'react-awesome-reveal';

export interface DashboardCardProps {
  title: string;
  description: string;
  gradient: string;
  icon: React.ReactNode;
  delay?: number;
}

const DashboardCard = ({ title, description, gradient, icon }: DashboardCardProps) => {
  const IconComponent = icon;

  return (
    <Fade triggerOnce className={'min-w-[220px]'} delay={200} duration={700}>
      <div className={`dashboard-card ${gradient}`}>
        <div>
          {/*// @ts-ignore*/}
          <IconComponent className={'dashboard-card-icon'} />
        </div>
        <div className="flex flex-col items-start justify-center">
          <span className="dashboard-card-title">{title || ''}</span>
          <span className="dashboard-card-description"> {description || ''}</span>
        </div>
      </div>
    </Fade>
  );
};

export default DashboardCard;
