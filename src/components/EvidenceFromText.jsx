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
  if (!data) return null;
  const prompts = data.prompts || data.questions || [];

  return (
    <SectionCard icon="📌" title={data.title || "Evidence from the Text"} instructions={data.instructions}>
      {prompts.map((prompt, index) => {
        const questionText = prompt.question || prompt.prompt || prompt.statement || prompt.instruction || prompt.text || '';
        const displayQuestion = /^\d+\.\s*/.test(questionText)
          ? questionText
          : `${index + 1}. ${questionText}`;
        const suggested = suggestedAnswers?.[prompt.id] || prompt.modelAnswer;
        const compareTip = prompt.compareTip || (Array.isArray(prompt.compareTips) ? prompt.compareTips.join(' ') : prompt.compareTips) || "Did your answer come directly from the article? If not, revise it using a phrase or exact quote from the text.";

        return (
          <div key={prompt.id || index} className="question-block">
            <p className="question-block__label">
              {displayQuestion}
            </p>
            <WrittenResponseWithCheck
              id={prompt.id || `evidence-${index + 1}`}
              value={answers[prompt.id || `evidence-${index + 1}`] ?? ''}
              onChange={(val) => onAnswerChange(prompt.id || `evidence-${index + 1}`, val)}
              disabled={disabled}
              placeholder="Quote or paraphrase evidence from the article…"
              rows={2}
              modelAnswer={suggested}
              compareTip={compareTip}
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