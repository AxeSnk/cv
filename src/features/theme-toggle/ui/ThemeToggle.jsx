import {useTheme} from '../model/useTheme';

export function ThemeToggle({t}) {
  const [theme, setTheme] = useTheme();
  return (
    <button
      className="icon-btn"
      title={theme === 'dark' ? t.controls.themeLight : t.controls.themeDark}
      aria-label={theme === 'dark' ? t.controls.themeLight : t.controls.themeDark}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}
