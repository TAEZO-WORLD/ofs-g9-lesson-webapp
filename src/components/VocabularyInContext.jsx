import SectionCard from './SectionCard';

export default function VocabularyInContext({ data }) {
  if (!data || !data.items) return null;

  return (
    <SectionCard icon="📝" title={data.title || "Vocabulary in Context"} instructions={data.instructions}>
      <div className="vocab-grid">
        {data.items.map((item, index) => (
          <div key={item.word || index} className="vocab-card">
            <div className="vocab-card__word">
              {item.word}
              {item.partOfSpeech && (
                <span className="vocab-card__pos" style={{ fontSize: '0.8rem', fontWeight: 'normal', color: 'var(--color-navy-soft, #475569)', marginLeft: '0.35rem' }}>
                  ({item.partOfSpeech})
                </span>
              )}
            </div>
            {item.korean && (
              <div className="vocab-card__korean" style={{ fontSize: '0.85rem', color: 'var(--color-coral-dark, #c2410c)', marginBottom: '0.35rem', fontWeight: 500 }}>
                {item.korean}
              </div>
            )}
            <p className="vocab-card__definition">{item.definition}</p>
            {item.sentence && <p className="vocab-card__sentence">&ldquo;{item.sentence}&rdquo;</p>}
          </div>
        ))}
      </div>
    </SectionCard>
  );
}