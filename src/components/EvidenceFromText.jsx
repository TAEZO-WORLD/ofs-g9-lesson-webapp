import SectionCard from './SectionCard';

export default function EvidenceFromText({
  data,
  answers,
  onAnswerChange,
  disabled,
  submitted,
  suggestedAnswers,
}) {
  return (
    <SectionCard icon="📌" title={data.title} instructions={data.instructions}>
      {data.prompts.map((prompt, index) => {
        const suggested = suggestedAnswers?.[prompt.id];

        return (
          <div key={prompt.id} className="question-block">
            <p className="question-block__label">
              {index + 1}. {prompt.statement}
            </p>
            <textarea
              className="text-area"
              rows={2}
              placeholder="Quote or paraphrase evidence from the article…"
              value={answers[prompt.id] ?? ''}
              onChange={(e) => onAnswerChange(prompt.id, e.target.value)}
              disabled={disabled}
              aria-label={`Evidence for: ${prompt.statement}`}
            />
            {submitted && suggested && (
              <div className="evidence-feedback">
                <p className="evidence-feedback__note">
                  Compare your answer with the suggested evidence.
                </p>
                <p className="evidence-feedback__suggested">
                  <strong>Suggested evidence:</strong> {suggested}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </SectionCard>
  );
}