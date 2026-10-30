import {Avatar} from '../../../entities/resume/ui';
import {PdfDownload} from '../../../features/pdf-download';

export function Hero({t}) {
  return (
    <section className="hero">
      <div className="hero-inner">
        <Avatar />
        <div>
          <h1>{t.hero.name}</h1>
          <p className="role">{t.hero.role}</p>
          <p className="summary">{t.hero.summary}</p>
          <ul className="facts">
            {t.hero.info.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <div className="hero-actions">
            <PdfDownload label={t.controls.pdf} />
          </div>
        </div>
      </div>
    </section>
  );
}
