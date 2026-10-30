export function getInitialLang() {
  try {
    const saved = localStorage.getItem('lang');
    if (saved === 'ru' || saved === 'en') return saved;
    if (navigator.language?.toLowerCase().startsWith('ru')) return 'ru';
  } catch (e) { }
  return 'ru';
}
