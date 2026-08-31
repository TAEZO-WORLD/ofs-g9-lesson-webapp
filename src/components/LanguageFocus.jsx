import SectionCard from './SectionCard';

export default function LanguageFocus({ data }) {
  if (!data) return null;

  const examples = Array.isArray(data.examples) ? data.examples : [];
  const practice = Array.isArray(data.practice) ? data.practice : [];
  const sections = Array.isArray(data.sections) ? data.sections : [];

  return (
    <SectionCard icon="✦" title={data.title || "Language Focus"}>
      {data.topic && (
        <p>
          <strong>{data.topic}</strong>
        </p>
      )}
      {data.explanation && <p>{data.explanation}</p>}

      {sections.length > 0 && (
        <div className="language-sections" style={{ marginTop: '0.75rem' }}>
          {sections.map((sec, idx) => (
            <div key={idx} style={{ marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: idx < sections.length - 1 ? '1px solid var(--color-border)' : 'none' }}>
              {sec.heading && <h4 style={{ color: 'var(--color-navy)', marginBottom: '0.3rem', fontSize: '0.95rem' }}>{sec.heading}</h4>}
              {sec.explanation && <p style={{ fontStyle: 'italic', marginBottom: '0.4rem', color: 'var(--color-navy-soft)' }}>{sec.explanation}</p>}
              {Array.isArray(sec.examples) && (
                <ul className="examples-list">
                  {sec.examples.map((ex, i) => (
                    <li key={i}>{ex}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {examples.length > 0 && (
        <ul className="examples-list">
          {examples.map((example, index) => (
            <li key={index}>{example}</li>
          ))}
        </ul>
      )}

      {practice.length > 0 && (
        <div className="language-practice">
          <p>
            <strong>Practice</strong>
          </p>
          <ol>
            {practice.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ol>
        </div>
      )}
    </SectionCard>
  );
}