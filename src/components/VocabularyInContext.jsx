import SectionCard from './SectionCard';

export default function VocabularyInContext({ data }) {
  return (
    <SectionCard icon="📝" title={data.title} instructions={data.instructions}>
      <div className="vocab-grid">
        {data.items.map((item) => (
          <div key={item.word} className="vocab-card">
            <div className="vocab-card__word">{item.word}</div>
            <p className="vocab-card__definition">{item.definition}</p>
            <p className="vocab-card__sentence">&ldquo;{item.sentence}&rdquo;</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}