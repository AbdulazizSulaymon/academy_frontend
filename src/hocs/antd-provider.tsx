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

const AntdProvider = observer(({ children }: Props) => {
  const { isDarkMode } = useMyTheme();
  const { user } = useLayoutStore();

  const locale = useMemo(() => (user?.lang === 'en' ? en_US : user?.lang === 'ru' ? ru_RU : uzUZ), [user?.lang]);
  const themeConfig = useMemo(
    () => ({
      token: {
        colorPrimary: isDarkMode ? darkPrimaryColor : lightPrimaryColor,
        // colorPrimary: '#00b96b',
        fontFamily: globalFontFamily,
        // motion: false,
        colorBgContainer: isDarkMode ? '#141317' : '#fff',
        // colorBorder: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#00000010',
        // colorPrimaryBg: isDarkMode ? '#ffffff22' : '#1C1C1C22',
      },
      algorithm: isDarkMode ? [theme.darkAlgorithm] : [],
      // algorithm: theme.darkAlgorithm,
      // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
      components: {
        Table: {
          rowSelectedBg: 'transparent',
          rowSelectedHoverBg: 'transparent',
          headerColor: isDarkMode ? '#ffffff70' : '#1C1C1Cbb',
          headerSplitColor: 'transparent',
        },
        Modal: {
          motion: false,
          // contentBg: 'black',
        },
        ...(isDarkMode
          ? {
              Input: {
                colorBorder: '#1f1f1f',
              },
              Button: {
                defaultBorderColor: '#1f1f1f',
              },
              Card: {
                colorBorderSecondary: '#1f1f1f',
              },
            }
          : {}),
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

export default React.memo(AntdProvider);
