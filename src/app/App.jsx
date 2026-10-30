import {useEffect, useState} from 'react';
import {CursorGlow} from '../features/cursor-glow';
import {HomePage} from '../pages/home';
import {getInitialLang} from '../shared/lib/lang';
import './styles/global.css';

export function App() {
  const [lang, setLang] = useState(getInitialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <>
      <CursorGlow />
      <HomePage lang={lang} onLangChange={setLang} />
    </>
  );
}
