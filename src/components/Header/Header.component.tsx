import { useTranslation } from "react-i18next";

import {Social} from "../../components";

function Header(): JSX.Element {
  const { t } = useTranslation();

  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-sky-100 sm:text-5xl">
          <a href="/">{t('name')}</a>
        </h1>
        <h2 className="mt-3 mb-2 text-lg font-medium tracking-tight text-sky-100 sm:text-xl">{t('position')}</h2>
        <p>{t('about.a1')}.<br/> {t('about.a2')}.</p>
      </div>
      <ul className="ml-1 mt-8 flex items-center" aria-label="Social media">
        <Social
          id="telegram"
          title="telegram"
          href="https://t.me/Axesnk"
          icon="telegram"          
        />
        <Social
          id="whatsapp"
          title="whatsapp"
          href="https://api.whatsapp.com/send?phone=+79647505374"
          icon="whatsapp"          
        />
        <Social
          id="habr"
          title="habr"  
          href="https://career.habr.com/axesnk"
          icon="habr"          
        />
        <Social
          id="linkedin"
          title="LinkedIn"
          href="https://linkedin.com/in/александр-аксенов-04781a18b"
          icon="linkedin"          
        />
        <Social
          id="github"
          title="GitHub"
          href="https://github.com/AxeSnk"
          icon="github"          
        />
        <Social
          id="mail"
          title="mail"
          href="mailto:alexanderaxenov@mail.ru"
          icon="mail"          
        />
      </ul>
    </header>
  );
}

export default Header;