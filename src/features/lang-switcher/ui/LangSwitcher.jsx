export function LangSwitcher({lang, onChange}) {
  return (
    <div className="switch" role="tablist" aria-label="Language">
      {['ru', 'en'].map((l) => (
        <button key={l} className={lang === l ? 'active' : ''} onClick={() => onChange(l)}>
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
