const CIS_COUNTRIES = ['RU', 'UA', 'BY', 'KZ', 'KG', 'TJ', 'TM', 'UZ', 'AZ', 'AM', 'GE', 'MD'];

async function detectCountry() {
  try {
    const res = await fetch('https://api.country.is/', { cache: 'no-store' });
    const data = await res.json();
    return data.country;
  } catch (e) {
    return null;
  }
}

export async function getInitialLang() {
  try {
    const saved = localStorage.getItem('lang');
    if (saved === 'ru' || saved === 'en') return saved;

    const country = await detectCountry();
    if (country && CIS_COUNTRIES.includes(country)) return 'ru';
    if (country) return 'en';

    if (navigator.language?.toLowerCase().startsWith('ru')) return 'ru';
  } catch (e) { }
  return 'ru';
}
