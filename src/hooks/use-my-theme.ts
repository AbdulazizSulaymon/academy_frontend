import { useTheme } from 'next-themes';
import { useLocalStorageState } from 'ahooks';
import { useLayoutEffect, useMemo } from 'react';

export type Theme = 'dark' | 'light';

export const useMyTheme = () => {
  const { systemTheme, theme, setTheme, ...props } = useTheme();
  const currentTheme: Theme = useMemo(() => (theme === 'system' ? systemTheme : theme) as Theme, [theme, systemTheme]);

  const [localTheme, setLocalTheme] = useLocalStorageState<Theme>('theme-original', {
    defaultValue: currentTheme,
  });

  const setThemeCallback = (t: Theme, isStatic?: boolean) => {
    setTheme(t);
    if (!isStatic) setLocalTheme(t);
  };

  // console.log(theme);
  // useLayoutEffect(() => {
  //   if (!theme) {
  //     console.log(" setTheme('light');");
  //     setTheme('light');
  //   }
  // }, [theme]);

  return {
    systemTheme,
    setTheme: setThemeCallback,
    theme: currentTheme as Theme,
    realTheme: theme,
    isDarkMode: currentTheme === 'dark',
    toggleTheme: () => setThemeCallback(currentTheme === 'dark' ? 'light' : 'dark'),
    localTheme,
    ...props,
  };
};
