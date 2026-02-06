import { ConfigProvider, theme, App as AntApp } from 'antd';
import en_US from 'antd/locale/en_US';
import ru_RU from 'antd/locale/ru_RU';
import { observer } from 'mobx-react';
import React, { useMemo } from 'react';
import { Props } from '@src/types';
import uzUZ from '@data/locale/uz_UZ';
import { useMyTheme } from '@hooks/use-my-theme';
import { useLayoutStore } from '@src/stores/layout-store';

export const globalFontFamily = "'Rubik', 'Montserrat', sans-serif";
export const darkPrimaryColor = '#16CC53';
export const lightPrimaryColor = '#16CC53';

const StudentAntdProvider = observer(({ children }: Props) => {
  const { isDarkMode } = useMyTheme();
  const { user } = useLayoutStore();

  const locale = useMemo(() => (user?.lang === 'en' ? en_US : user?.lang === 'ru' ? ru_RU : uzUZ), [user?.lang]);
  const themeConfig = useMemo(
    () => ({
      token: {
        colorPrimary: isDarkMode ? darkPrimaryColor : lightPrimaryColor,
        fontFamily: globalFontFamily,
        colorBgContainer: isDarkMode ? '#0A0A0B' : '#ffffff',
        colorBgElevated: isDarkMode ? '#18181B' : '#ffffff',
        colorBgLayout: isDarkMode ? '#0A0A0B' : '#F4F4F5',
        colorBorder: isDarkMode ? '#27272A' : '#E4E4E7',
        colorBorderSecondary: isDarkMode ? '#3F3F46' : '#F4F4F5',
        colorText: isDarkMode ? '#FAFAFA' : '#18181B',
        colorTextSecondary: isDarkMode ? '#A1A1AA' : '#71717A',
        colorTextTertiary: isDarkMode ? '#71717A' : '#A1A1AA',
        colorError: '#EF4444',
        colorSuccess: '#16CC53',
        colorWarning: '#F59E0B',
        colorInfo: '#3B82F6',
        borderRadius: 12,
        borderRadiusLG: 16,
        borderRadiusSM: 8,
        borderRadiusXS: 6,
        controlHeight: 48,
        controlHeightLG: 56,
        controlHeightSM: 36,
        fontSize: 14,
        fontSizeHeading1: 32,
        fontSizeHeading2: 24,
        fontSizeHeading3: 20,
        fontSizeHeading4: 18,
        fontSizeHeading5: 16,
      },
      algorithm: isDarkMode ? [theme.darkAlgorithm] : [],
      components: {
        Button: {
          borderRadius: 12,
          controlHeight: 48,
          controlHeightLG: 56,
          controlHeightSM: 36,
          fontWeight: 600,
          defaultShadow: isDarkMode ? 'none' : '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          primaryShadow: '0 4px 12px rgba(22, 204, 83, 0.3)',
        },
        Input: {
          borderRadius: 12,
          controlHeight: 48,
          controlHeightLG: 56,
          controlHeightSM: 36,
          colorBorder: isDarkMode ? '#27272A' : '#E4E4E7',
          colorBorderHover: isDarkMode ? '#3F3F46' : '#16CC53',
          activeBorderColor: isDarkMode ? '#16CC53' : '#16CC53',
          colorBgContainer: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)',
          colorBgContainerHover: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.9)',
        },
        InputNumber: {
          borderRadius: 12,
          controlHeight: 48,
          colorBorder: isDarkMode ? '#27272A' : '#E4E4E7',
          colorBgContainer: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)',
        },
        Select: {
          borderRadius: 12,
          controlHeight: 48,
          controlHeightLG: 56,
          controlHeightSM: 36,
          optionSelectedBg: isDarkMode ? 'rgba(22, 204, 83, 0.15)' : 'rgba(22, 204, 83, 0.1)',
          colorBgContainer: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)',
        },
        Modal: {
          borderRadiusLG: 16,
          contentBg: isDarkMode ? '#0A0A0B' : '#ffffff',
        },
        Card: {
          borderRadiusLG: 16,
          colorBorderSecondary: isDarkMode ? '#27272A' : '#F4F4F5',
        },
        Table: {
          borderRadiusLG: 12,
          headerColor: isDarkMode ? '#FAFAFA' : '#18181B',
          headerBg: isDarkMode ? '#18181B' : '#F4F4F5',
          rowSelectedBg: isDarkMode ? 'rgba(22, 204, 83, 0.15)' : 'rgba(22, 204, 83, 0.1)',
          rowSelectedHoverBg: isDarkMode ? 'rgba(22, 204, 83, 0.2)' : 'rgba(22, 204, 83, 0.15)',
          headerSplitColor: 'transparent',
        },
        Tabs: {
          itemActiveColor: isDarkMode ? '#16CC53' : '#16CC53',
          itemSelectedColor: isDarkMode ? '#16CC53' : '#16CC53',
          inkBarColor: isDarkMode ? '#16CC53' : '#16CC53',
        },
        Tag: {
          borderRadiusSM: 8,
        },
        Progress: {
          borderRadius: 8,
        },
        Rate: {
          colorFill: 'rgba(22, 204, 83, 0.2)',
        },
      },
    }),
    [isDarkMode],
  );

  return (
    <ConfigProvider
      //@ts-ignore
      locale={locale}
      theme={themeConfig}
    >
      <AntApp>{children}</AntApp>
    </ConfigProvider>
  );
});

export default React.memo(StudentAntdProvider);
