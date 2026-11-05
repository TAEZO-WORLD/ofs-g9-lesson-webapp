import SectionCard from './SectionCard';

export default function WarmUp({ data }) {
  const starters = Array.isArray(data?.sentenceStarters) ? data.sentenceStarters : [];
  return (
    <SectionCard icon="☀" title={data.title} instructions={data.instructions}>
      <ol className="warmup-list">
        {data.questions.map((question, index) => {
          const qText = typeof question === 'object' ? question.question : question;
          const starter = (typeof question === 'object' ? question.sentenceStarter : null) ?? starters[index];
          return (
            <li key={index} className="warmup-list__item">
              <div><strong>{index + 1}.</strong> {qText}</div>
              {starter && (
                <div style={{ marginTop: '0.35rem', fontSize: '0.88rem', color: 'var(--color-navy-soft)', fontStyle: 'italic' }}>
                  💬 Starter: &ldquo;{starter}&rdquo;
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </SectionCard>
  );
}