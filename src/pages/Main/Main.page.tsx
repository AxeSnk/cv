import {Section, Header, Card} from "../../components";

function Main(): JSX.Element {

  return (
    <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0">
      <div className="lg:flex lg:justify-between lg:gap-4">
        <Header/>
        <main className="pt-12 lg:w-1/2 lg:py-24">
          <Section title="Опыт · 3 года 1 м">
            <ol>
              <li className="mb-12">
                <Card
                  date="Ноябь 2020 — Ноябь 2023"
                  href="https://newswave.io/"
                  company="Newswave"
                  position="Frontend разработчик"
                  description={<p>
                    ▶︎ Обязанности:<br/>
                    - разработка и интеграция нового функционала;<br/>
                    - доработка, оптимизация функционала, исправление ошибок;<br/>
                    - адаптивная кросс-браузерная верстка;<br/>
                    - участие в проектировании архитектурных решений проекта;<br/>
                    - проведение код-ревью, планирования и ревью спринта;<br/>
                    ▶︎ Успехи:<br/>
                    - проведена оптимизация сборки, уменьшен размер бандла в 2 раза;<br/>
                    - настроен линтер;<br/>
                    - внедрен TypeScript;<br/>
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