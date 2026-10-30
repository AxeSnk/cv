# CV — Аксенов Александр, Frontend разработчик

Одностраничный сайт-резюме. React + Vite, переключение языков RU/EN и светлой/тёмной темы.

## Разработка

```bash
npm install
npm run dev
```

## Сборка

```bash
npm run build      # результат в dist/
npm run preview    # локальный просмотр сборки
```

## Деплой на GitHub Pages

1. В настройках репозитория (Settings → Pages) выберите Source: **GitHub Actions** или ветку `gh-pages`.
2. Либо соберите и опубликуйте вручную:

```bash
npm run build
npm run deploy   # публикует dist/ в ветку gh-pages
```

Базовый путь настроен как `/cv/` (репозиторий `AxeSnk/cv`).
