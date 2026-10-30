import {Section, Reveal} from '../../../shared/ui';

export function Contacts({t}) {
  return (
    <Section id="contacts" title={t.contacts.title}>
      <div className="contact-grid">
        {t.contacts.items.map((c, i) => (
          <Reveal key={c.href} delay={i * 60}>
            <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
              <span className="label">{c.label}</span>
              <span className="value">{c.value}</span>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
