import { gray } from '@ant-design/colors';
import { css } from '@emotion/react';
import { Button, Drawer } from 'antd';
import { DrawerProps } from 'antd/es/drawer';
import { DrawerPanelProps } from 'antd/es/drawer/DrawerPanel';
import React from 'react';
import { RxEnterFullScreen, RxExitFullScreen } from 'react-icons/rx';
import { useMyTheme } from '@hooks/use-my-theme';

export const MyDrawer = ({
  children,
  title,
  width,
  extra,
  ...props
}: { children: React.ReactNode } & DrawerProps & Omit<DrawerPanelProps, 'prefixCls'>) => {
  const { isDarkMode } = useMyTheme();
  const [fullscreen, setFullscreen] = React.useState(false);

  return (
    <Drawer
      title={
        <div className={'flex items-center gap-3'}>
          <Button
            type={'text'}
            size={'small'}
            className={`px-1 text-xl`}
            onClick={() => setFullscreen((v) => !v)}
            css={css`
              color: ${isDarkMode ? gray[2] : gray[4]};
            `}
          >
            {!fullscreen ? <RxEnterFullScreen /> : <RxExitFullScreen />}
          </Button>
          <span className={''}>{title}</span>
        </div>
      }
      width={fullscreen ? '100%' : width}
      {...props}
    >
      {children}
      <div className={'mt-2 flex gap-2 items-center justify-end'}>{extra}</div>
    </Drawer>
  );
};
