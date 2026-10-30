import {Header} from '../../../widgets/header';
import {Hero} from '../../../widgets/hero';
import {Experience} from '../../../widgets/experience';
import {Skills} from '../../../widgets/skills';
import {Education} from '../../../widgets/education';
import {Contacts} from '../../../widgets/contacts';
import {resumeData} from '../../../entities/resume';

export function HomePage({lang, onLangChange}) {
  const t = resumeData[lang];

  // <title> зависит от языка
  if (typeof document !== 'undefined') document.title = t.title;

  return (
    <div className="page">
      <Header t={t} lang={lang} onLangChange={onLangChange} />
      <main>
        <Hero t={t} />
        <Experience t={t} />
        <Skills t={t} />
        <Contacts t={t} />
      </main>
      <footer className="footer">
        © {new Date().getFullYear()} Alexander Aksenov ·{' '}
        <a href="https://github.com/AxeSnk/cv" target="_blank" rel="noreferrer">
          source
        </a>
      </footer>
    </div>
  );
}
