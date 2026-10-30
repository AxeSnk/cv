import {Section, Reveal} from '../../../shared/ui';

export function Education({t}) {
  return (
    <Section id="education" title={t.education.title}>
      {t.education.items.map((e) => (
        <Reveal className="edu" key={e.school}>
          <h3>{e.school}</h3>
          <p>
            {e.detail} · {e.year}
          </p>
        </Reveal>
      ))}
    </Section>
  );
}
