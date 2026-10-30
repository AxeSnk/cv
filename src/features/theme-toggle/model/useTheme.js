import {useEffect, useState} from 'react';
import {THEME_KEY} from '../../../shared/config';

/** Тема: 'light' | 'dark', синхронизируется с <html data-theme> и localStorage. */
export function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'dark');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) { }
  }, [theme]);

  return [theme, setTheme];
}
