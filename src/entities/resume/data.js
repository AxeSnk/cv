export const data = {
  ru: {
    title: 'Аксенов Александр — Frontend разработчик',
    nav: {
      experience: 'Опыт',
      skills: 'Навыки',
      education: 'Образование',
      contacts: 'Контакты',
    },
    controls: {
      themeLight: 'Светлая тема',
      themeDark: 'Тёмная тема',
      lang: 'Переключить язык',
      pdf: 'Скачать PDF',
    },
    hero: {
      name: 'Аксенов Александр',
      role: 'Frontend разработчик',
      summary:
        'Frontend-разработчик с фокусом на экосистему React. Специализируюсь на создании высокопроизводительных интерфейсов, оптимизации метрик Core Web Vitals и рефакторинге legacy-кода. Умею превращать макеты в стабильные, масштабируемые решения, уделяя особое внимание качеству кода и скорости загрузки страниц.',
      info: ['36 лет', 'Ставрополь', 'Удалённая работа · редкие командировки'],
      unit: {y1: 'год', y2: 'года', y5: 'лет', m1: 'месяц', m2: 'месяца', m5: 'месяцев'},
    },
    experience: {
      title: 'Опыт работы',
      totalLabel: 'Общий опыт',
      items: [
        {
          company: 'Консист',
          link: 'https://www.cbgr.ru/',
          role: 'Frontend разработчик',
          period: 'Апрель 2024 — настоящее время',
          start: '2024-04',
          end: null,
          stack: 'React, TypeScript, styled-components, SCSS, Redux, Webpack',
          unit: {y1: 'год', y2: 'года', y5: 'лет', m1: 'месяц', m2: 'месяца', m5: 'месяцев'},
          points: [
            'Провёл масштабный рефакторинг UI-компонентов, вынеся общую логику в кастомные хуки — сократил дублирование кода на ~40% и ускорил внедрение новых фич.',
            'Оптимизировал логику рендеринга тяжёлых таблиц данных, применив виртуализацию и мемоизацию — снизил количество перерисовок и улучшил отзывчивость интерфейса (снижение INP в 5 раз).',
            'Участвовал в планировании спринтов и проведении код-ревью, поддерживая высокий стандарт качества кода в команде.',
          ],
        },
        {
          company: 'БИМСофт',
          role: 'Frontend-разработчик',
          period: 'Июнь 2023 — Январь 2024',
          start: '2023-06',
          end: '2024-01',
          stack: 'React, TypeScript, AntD, Redux, Webpack',
          unit: {y1: 'год', y2: 'года', y5: 'лет', m1: 'месяц', m2: 'месяца', m5: 'месяцев'},
          points: [
            'Провёл рефакторинг UI-компонентов на базе библиотеки AntD: унифицировал стили и пропсы, что позволило сократить время разработки типовых страниц с 3 дней до 1 дня.',
            'Реализовал адаптивную кросс-браузерную вёрстку для сложных компонентов, обеспечив корректное отображение во всех целевых браузерах.',
          ],
        },
        {
          company: 'Newswave',
          link: 'https://newswave.io',
          role: 'Frontend-разработчик',
          period: 'Ноябрь 2020 — Июнь 2023',
          start: '2020-11',
          end: '2023-06',
          stack: 'React, JavaScript, TypeScript, Redux/MobX, Webpack, SASS',
          unit: {y1: 'год', y2: 'года', y5: 'лет', m1: 'месяц', m2: 'месяца', m5: 'месяцев'},
          points: [
            'Провёл глубокую оптимизацию сборки (Webpack) и архитектуры приложения — размер бандла уменьшен в 2 раза.',
            'Внедрил TypeScript в проект, ранее написанный на JavaScript, и настроил ESLint для поддержания единого стиля кода.',
            'Регулярно проводил код-ревью.',
          ],
        },
      ],
    },
    skills: {
      title: 'Навыки',
      groups: [
        {name: 'Языки и основы', items: ['TypeScript', 'JavaScript']},
        {name: 'Фреймворки и состояние', items: ['React', 'Redux', 'MobX']},
        {name: 'Инструменты', items: ['Webpack', 'Git', 'SCSS', 'styled-components', 'AntD', 'ESLint']},
      ],
    },
    contacts: {
      title: 'Контакты',
      items: [
        {label: 'Телефон', value: '+7 (934) 051-53-74', href: 'tel:+79340515374'},
        {label: 'Email', value: 'alexanderaxenov@mail.ru', href: 'mailto:alexanderaxenov@mail.ru'},
        {label: 'Telegram', value: '@Axesnk', href: 'https://t.me/Axesnk'},
        {label: 'GitHub', value: 'github.com/AxeSnk', href: 'https://github.com/AxeSnk'},
        {label: 'Хабр Карьера', value: 'career.habr.com/axesnk', href: 'https://career.habr.com/axesnk'},
      ],
    },
  },
  en: {
    title: 'Alexander Aksenov — Frontend Developer',
    nav: {
      experience: 'Experience',
      skills: 'Skills',
      contacts: 'Contacts',
    },
    controls: {
      themeLight: 'Light theme',
      themeDark: 'Dark theme',
      lang: 'Switch language',
      pdf: 'Download CV',
    },
    hero: {
      name: 'Alexander Aksenov',
      role: 'Frontend Developer',
      summary:
        'Frontend developer focused on the React ecosystem. I specialize in building high-performance UIs, optimizing Core Web Vitals metrics, and refactoring legacy code. I turn designs into stable, scalable solutions with particular attention to code quality and page load speed.',
      info: ['36 y.o.', 'Stavropol, Russia', 'Remote work · occasional business trips'],
      unit: {y1: 'year', y2: 'years', y5: 'years', m1: 'month', m2: 'months', m5: 'months'},
    },
    experience: {
      title: 'Work Experience',
      totalLabel: 'Total experience',
      items: [
        {
          company: 'Consist',
          link: 'https://www.cbgr.ru/',
          role: 'Frontend Developer',
          period: 'April 2024 — Present',
          start: '2024-04',
          end: null,
          stack: 'React, TypeScript, styled-components, SCSS, Redux, Webpack',
          unit: {y1: 'year', y2: 'years', y5: 'years', m1: 'month', m2: 'months', m5: 'months'},
          points: [
            'Carried out a large-scale UI component refactor, extracting shared logic into custom hooks — reduced code duplication by ~40% and sped up feature delivery.',
            'Optimized rendering of heavy data tables using virtualization and memoization — reduced re-renders and improved UI responsiveness (5x lower INP).',
            'Participated in sprint planning and code reviews, maintaining a high code quality standard across the team.',
          ],
        },
        {
          company: 'BIMSoft',
          role: 'Frontend Developer',
          period: 'June 2023 — January 2024',
          start: '2023-06',
          end: '2024-01',
          stack: 'React, TypeScript, AntD, Redux, Webpack',
          unit: {y1: 'year', y2: 'years', y5: 'years', m1: 'month', m2: 'months', m5: 'months'},
          points: [
            'Refactored UI components based on the AntD library: unified styles and props, cutting the development time of typical pages from 3 days to 1 day.',
            'Implemented responsive cross-browser layout for complex components, ensuring correct rendering in all target browsers.',
          ],
        },
        {
          company: 'Newswave',
          link: 'https://newswave.io',
          role: 'Frontend Developer',
          period: 'November 2020 — June 2023',
          start: '2020-11',
          end: '2023-06',
          stack: 'React, JavaScript, TypeScript, Redux/MobX, Webpack, SASS',
          unit: {y1: 'year', y2: 'years', y5: 'years', m1: 'month', m2: 'months', m5: 'months'},
          points: [
            'Deep optimization of the Webpack build and application architecture — bundle size reduced by 2x.',
            'Migrated a JavaScript project to TypeScript and set up ESLint to maintain a consistent code style.',
            'Conducted code reviews on a regular basis.',
          ],
        },
      ],
    },
    skills: {
      title: 'Skills',
      groups: [
        {name: 'Languages & fundamentals', items: ['TypeScript', 'JavaScript']},
        {name: 'Frameworks & state', items: ['React', 'Redux', 'MobX']},
        {name: 'Tools', items: ['Webpack', 'Git', 'SCSS', 'styled-components', 'AntD', 'ESLint']},
      ],
    },
    contacts: {
      title: 'Contacts',
      items: [
        {label: 'Phone', value: '+7 (934) 051-53-74', href: 'tel:+79340515374'},
        {label: 'Email', value: 'alexanderaxenov@mail.ru', href: 'mailto:alexanderaxenov@mail.ru'},
        {label: 'Telegram', value: '@Axesnk', href: 'https://t.me/Axesnk'},
        {label: 'GitHub', value: 'github.com/AxeSnk', href: 'https://github.com/AxeSnk'},
        {label: 'Habr Career', value: 'career.habr.com/axesnk', href: 'https://career.habr.com/axesnk'},
      ],
    },
  },
};
