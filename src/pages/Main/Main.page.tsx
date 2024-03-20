import { useTranslation } from "react-i18next";

import {Section, Header, Card} from "../../components";

function Main(): JSX.Element {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  }

  return (
    <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0">
      <div className="flex gap-4 justify-end py-2">
        <button className={`${i18n.language === 'en' && "text-sky-100"} hover:text-sky-100`} onClick={() => changeLanguage('en')}>EN</button>
        <button className={`${i18n.language === 'ru' && "text-sky-100"} hover:text-sky-100`} onClick={() => changeLanguage('ru')}>RU</button>
      </div>
      <div className="lg:flex lg:justify-between lg:gap-4">
        <Header/>
        <main className="pt-12 lg:w-1/2 lg:py-24">
          <Section title={t('titleExperience')}>
            <ol>
              <li className="mb-12">
                <Card
                  date={`${t('month.november')} 2020 — ${t('month.november')} 2023`}
                  href="https://newswave.io/"
                  company="Newswave"
                  position={t('position')}
                  description={<p>
                    ▶︎ {t('description.responsibilities.title')}:<br/>
                    - {t('description.responsibilities.r1')};<br/>
                    - {t('description.responsibilities.r2')};<br/>
                    - {t('description.responsibilities.r3')};<br/>
                    - {t('description.responsibilities.r4')};<br/>
                    - {t('description.responsibilities.r5')};<br/>
                    ▶︎ {t('description.success.title')}:<br/>
                    - {t('description.success.s1')};<br/>
                    - {t('description.success.s2')};<br/>
                    - {t('description.success.s3')};<br/>
                  </p>}
                  stack={["JavaScript", "TypeScript","HTML", "SCSS", "React", "Redux", "MobX", "Webpack", "Git"]}
                />
              </li>
            </ol>
          </Section>
        </main>
      </div>
    </div>
  );
}

export default Main;