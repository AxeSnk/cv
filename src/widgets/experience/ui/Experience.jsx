import {Section, Reveal, ChipRow} from '../../../shared/ui';
import {monthsBetween, formatDuration, totalMonthsOf} from '../../../shared/lib/duration';

export function Experience({t}) {
  const unit = t.experience.items[0].unit;
  const total = formatDuration(totalMonthsOf(t.experience.items), unit);

  return (
    <Section id="experience" title={t.experience.title}>
      <Reveal as="p" className="total-badge">
        {t.experience.totalLabel}: <b>{total}</b>
      </Reveal>
      <div className="timeline">
        {t.experience.items.map((job, i) => (
          <Reveal as="article" className="job" key={job.company} delay={i * 80}>
            <div className="job-head">
              <h3>
                {job.link ? (
                  <a href={job.link} target="_blank" rel="noreferrer">
                    {job.company}
                  </a>
                ) : (
                  job.company
                )}
              </h3>
              <span className="period">
                {job.period} · {formatDuration(monthsBetween(job.start, job.end), job.unit)}
              </span>
            </div>
            <p className="role">{job.role}</p>
            <ul>
              {job.points.map((p, idx) => (
                <li key={idx}>{p}</li>
              ))}
            </ul>
            <ChipRow items={job.stack.split(', ')} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
