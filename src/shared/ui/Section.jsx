import {Reveal} from './Reveal';

export function Section({id, title, children}) {
  return (
    <section id={id} className="section">
      <Reveal as="h2">{title}</Reveal>
      {children}
    </section>
  );
}
