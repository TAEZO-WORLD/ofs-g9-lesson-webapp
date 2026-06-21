import SectionCard from './SectionCard';

export default function EvidenceFromText({ data, answers, onAnswerChange, disabled }) {
  return (
    <SectionCard icon="📌" title={data.title} instructions={data.instructions}>
      {data.prompts.map((prompt, index) => (
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
        </div>
      ))}
    </SectionCard>
  );
}