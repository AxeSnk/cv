import {useEffect, useState} from 'react';

/** Следит за <html data-theme> (тему меняет ThemeToggle). */
export function useThemeAttr() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'dark');
  useEffect(() => {
    const mo = new MutationObserver(() => setTheme(document.documentElement.dataset.theme || 'dark'));
    mo.observe(document.documentElement, {attributes: true, attributeFilter: ['data-theme']});
    return () => mo.disconnect();
  }, []);
  return theme;
}
