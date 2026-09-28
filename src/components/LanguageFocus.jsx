import SectionCard from './SectionCard';

export default function LanguageFocus({ data }) {
  if (!data) return null;

  const patterns = Array.isArray(data.patterns) ? data.patterns : [];
  const items = Array.isArray(data.items) ? data.items : [];
  const examples = Array.isArray(data.examples) ? data.examples : [];
  const practice = Array.isArray(data.practice) ? data.practice : [];
  const sections = Array.isArray(data.sections) ? data.sections : [];

  return (
    <SectionCard icon="✦" title={data.title || "Language Focus"} instructions={data.instructions}>
      {data.topic && (
        <p style={{ fontWeight: 600, color: 'var(--color-navy)', marginBottom: '0.5rem' }}>
          {data.topic}
        </p>
      )}
      {data.explanation && <p style={{ marginBottom: '0.75rem', lineHeight: 1.5 }}>{data.explanation}</p>}

      {patterns.length > 0 && (
        <div className="language-patterns" style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {patterns.map((pat, idx) => (
            <div key={idx} className="language-pattern-card" style={{ padding: '0.85rem 1rem', background: 'var(--color-bg-subtle, #f8fafc)', borderRadius: '8px', borderLeft: '4px solid var(--color-navy, #1e293b)' }}>
              {pat.name && <h4 style={{ margin: '0 0 0.35rem 0', color: 'var(--color-navy)', fontSize: '0.98rem', fontWeight: 600 }}>{pat.name}</h4>}
              {pat.explanation && <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: 'var(--color-text-main, #334155)', lineHeight: 1.5 }}>{pat.explanation}</p>}
              {pat.example && (
                <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.88rem', color: 'var(--color-navy-soft, #475569)' }}>
                  <strong>Example:</strong> <em>{pat.example}</em>
                </p>
              )}
              {pat.sourceExample && (
                <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--color-navy-soft, #475569)' }}>
                  <strong>From Text:</strong> <em>{pat.sourceExample}</em>
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {items.length > 0 && (
        <div className="language-items" style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {items.map((item, idx) => (
            <div key={idx} className="language-item-card" style={{ padding: '0.85rem 1rem', background: 'var(--color-bg-subtle, #f8fafc)', borderRadius: '8px', borderLeft: '4px solid var(--color-navy, #1e293b)' }}>
              {(item.name || item.term) && <h4 style={{ margin: '0 0 0.35rem 0', color: 'var(--color-navy)', fontSize: '0.98rem', fontWeight: 600 }}>{item.name || item.term}</h4>}
              {item.explanation && <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: 'var(--color-text-main, #334155)', lineHeight: 1.5 }}>{item.explanation}</p>}
              {item.example && (
                <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--color-navy-soft, #475569)' }}>
                  <strong>Example:</strong> <em>{item.example}</em>
                </p>
              )}
            </div>
          ))}
        </div>
      )}

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
        <ul className="examples-list" style={{ marginTop: '0.75rem' }}>
          {examples.map((example, index) => (
            <li key={index}>{example}</li>
          ))}
        </ul>
      )}

      {practice.length > 0 && (
        <div className="language-practice" style={{ marginTop: '1rem' }}>
          <p style={{ fontWeight: 600, color: 'var(--color-navy)', marginBottom: '0.5rem' }}>
            Practice
          </p>
          <ol style={{ paddingLeft: '1.25rem', lineHeight: 1.5 }}>
            {practice.map((item, index) => (
              <li key={index} style={{ marginBottom: '0.35rem' }}>{typeof item === 'string' ? item : item.question || item.prompt || item.text}</li>
            ))}
          </ol>
        </div>
      )}
    </SectionCard>
  );
}