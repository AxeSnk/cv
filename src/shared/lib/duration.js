/**
 * Стаж: считаем месяцы между YYYY-MM датами (включительно по нач. месяцу).
 * end === null означает «по настоящее время».
 */
export function monthsBetween(start, end) {
  const [sy, sm] = start.split('-').map(Number);
  let ey, em;
  if (end) {
    [ey, em] = end.split('-').map(Number);
  } else {
    const now = new Date();
    ey = now.getFullYear();
    em = now.getMonth() + 1;
  }
  return (ey - sy) * 12 + (em - sm) + 1;
}

function plural(n, forms) {
  if (n % 10 === 1 && n % 100 !== 11) return forms.y1;
  if ([2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100)) return forms.y2;
  return forms.y5;
}

/** 31 месяц + forms {y1..y5, m1..m5} -> '2 года 7 месяцев' */
export function formatDuration(months, forms) {
  const y = Math.floor(months / 12);
  const m = months % 12;
  const parts = [];
  if (y > 0) parts.push(`${y} ${plural(y, forms)}`);
  if (m > 0) parts.push(`${m} ${plural(m, {y1: forms.m1, y2: forms.m2, y5: forms.m5})}`);
  return parts.join(' ') || `0 ${forms.m2}`;
}

/**
 * Общий стаж без задвоения перекрывающихся периодов:
 * сортируем интервалы и мержим пересекающиеся.
 */
export function totalMonthsOf(items) {
  const now = new Date();
  const current = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const intervals = items
    .map((j) => ({s: j.start, e: j.end || current}))
    .sort((a, b) => a.s.localeCompare(b.s));

  const merged = [];
  for (const {s, e} of intervals) {
    const last = merged[merged.length - 1];
    if (last && s <= last.e) {
      if (e > last.e) last.e = e;
    } else merged.push({s, e});
  }
  return merged.reduce((sum, {s, e}) => sum + monthsBetween(s, e), 0);
}
