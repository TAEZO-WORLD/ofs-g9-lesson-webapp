import SectionCard from './SectionCard';

export default function WritingTask({
  data,
  modelAnswer,
  writingAnswer,
  onWritingChange,
  submitted,
  feedback,
  loading,
}) {
  const wordCount = writingAnswer.trim().split(/\s+/).filter(Boolean).length;
  const { min, max } = data.wordTarget ?? {};

  return (
    <SectionCard icon="✍" title={data.title}>
      <p>{data.prompt}</p>
      {data.checklist && (
        <ul className="examples-list">
          {data.checklist.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
      <textarea
        className="text-area"
        rows={8}
        placeholder="Type your opinion paragraph here…"
        value={writingAnswer}
        onChange={(e) => onWritingChange(e.target.value)}
        disabled={submitted}
        aria-label="Writing task response"
      />
      {min && max && (
        <p className="word-count">
          {wordCount} words · target {min}–{max}
        </p>
      )}

      {submitted && feedback && (
        <div className="feedback-panel" role="status">
          <span className="feedback-panel__score">{feedback.score}</span>
          <p>{feedback.summary}</p>
          <p>
            <strong>Strengths</strong>
          </p>
          <ul>
            {feedback.strengths.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <p>
            <strong>Next steps</strong>
          </p>
          <ul>
            {feedback.improvements.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {submitted && modelAnswer && (
        <div className="model-answer-reveal">
          <p className="model-answer-reveal__label">Model answer</p>
          <p>{modelAnswer}</p>
        </div>
      )}

      {loading && (
        <p className="section-card__instructions">Generating feedback…</p>
      )}
    </SectionCard>
  );
}