import SectionCard from './SectionCard';
import WrittenResponseWithCheck from './WrittenResponseWithCheck';

export default function WritingTask({
  data,
  modelAnswer,
  writingAnswer,
  onWritingChange,
  submitted,
  feedback,
  loading,
  onWritingCheck,
  vocabularyList = []
}) {
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
      
      <WrittenResponseWithCheck
        id="writingTask"
        value={writingAnswer}
        onChange={onWritingChange}
        disabled={submitted}
        placeholder="Type your opinion paragraph here…"
        rows={8}
        modelAnswer={modelAnswer || data.modelAnswer}
        compareTip={data.compareGuide}
        revisionTips={data.revisionTips || [
          "Check your spelling and punctuation.",
          "Read your paragraph aloud to see if it flows smoothly.",
          "Ensure you have both reasons and at least one concern/risk if requested."
        ]}
        checkType="paragraph"
        checkSettings={{
          targetWordRange: data.wordTarget || { min: 80, max: 120 },
          targetVocabulary: data.targetVocabulary || vocabularyList,
          targetConnectors: data.targetConnectors
        }}
        onCheck={onWritingCheck}
        showWordCount={true}
      />

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
        <div className="model-answer-reveal" style={{ marginTop: '1rem' }}>
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