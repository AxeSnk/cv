import {LangSwitcher} from '../../../features/lang-switcher';
import {ThemeToggle} from '../../../features/theme-toggle';

export function Header({t, lang, onLangChange}) {
  return (
    <header className="header">
      <nav className="nav">
        <a href="#experience">{t.nav.experience}</a>
        <a href="#skills">{t.nav.skills}</a>
        <a href="#contacts">{t.nav.contacts}</a>
      </nav>
      <div className="controls">
        <LangSwitcher lang={lang} onChange={onLangChange} />
        <ThemeToggle t={t} />
      </div>
    </header>
  );
}
