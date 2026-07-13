import SectionCard from './SectionCard';
import WrittenResponseWithCheck from './WrittenResponseWithCheck';

export default function EvidenceFromText({
  data,
  answers,
  onAnswerChange,
  disabled,
  submitted,
  suggestedAnswers,
  onWritingCheck,
  articleText,
}) {
  return (
    <SectionCard icon="📌" title={data.title} instructions={data.instructions}>
      {data.prompts.map((prompt, index) => {
        const suggested = suggestedAnswers?.[prompt.id] || prompt.modelAnswer;

        return (
          <div key={prompt.id} className="question-block">
            <p className="question-block__label">
              {index + 1}. {prompt.statement}
            </p>
            <WrittenResponseWithCheck
              id={prompt.id}
              value={answers[prompt.id] ?? ''}
              onChange={(val) => onAnswerChange(prompt.id, val)}
              disabled={disabled}
              placeholder="Quote or paraphrase evidence from the article…"
              rows={2}
              modelAnswer={suggested}
              compareTip={prompt.compareTip || "Did your answer come directly from the article? If not, revise it using a phrase or exact quote from the text."}
              checkType="evidence"
              articleText={articleText}
              onCheck={onWritingCheck}
            />
          </div>
        );
      })}
    </SectionCard>
  );
}