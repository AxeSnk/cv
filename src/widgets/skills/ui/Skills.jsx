import {Section, Reveal, ChipRow} from '../../../shared/ui';

export function Skills({t}) {
  return (
    <Section id="skills" title={t.skills.title}>
      <div className="skill-groups">
        {t.skills.groups.map((g, i) => (
          <Reveal className="skill-group" key={g.name} delay={i * 80}>
            <h3>{g.name}</h3>
            <ChipRow items={g.items} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
