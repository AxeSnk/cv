import {useEffect, useState} from 'react';
import {CursorGlow} from '../features/cursor-glow';
import {RobotBackground} from '../features/robot-background';
import {HomePage} from '../pages/home';
import {getInitialLang} from '../shared/lib/lang';
import './styles/global.css';

export function App() {
  const [lang, setLang] = useState('ru');
  const [langReady, setLangReady] = useState(false);

  useEffect(() => {
    getInitialLang().then((detected) => {
      setLang(detected);
      setLangReady(true);
    });
  }, []);

  useEffect(() => {
    if (langReady) document.documentElement.lang = lang;
  }, [lang, langReady]);

  if (!langReady) return null;

  return (
    <>
      <RobotBackground />
      <CursorGlow />
      <HomePage lang={lang} onLangChange={setLang} />
    </>
  );
}
