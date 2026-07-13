import SectionCard from './SectionCard';
import WrittenResponseWithCheck from './WrittenResponseWithCheck';

export default function WritingPractice({
  data,
  answers = {},
  onAnswerChange,
  disabled,
  onWritingCheck,
  vocabularyList = []
}) {
  if (!data) return null;

  const rawPrompts = data.prompts ?? [];
  const normalizedPrompts = rawPrompts.map((p, index) => {
    if (typeof p === 'string') {
      return {
        id: `wp${index + 1}`,
        question: p,
        placeholder: 'Write 2–4 sentences here...',
      };
    }
    return {
      id: p.id || `wp${index + 1}`,
      question: p.question,
      placeholder: p.placeholder || 'Write 2–4 sentences here...',
      modelAnswer: p.modelAnswer,
      compareTip: p.compareTip,
      targetWords: p.targetWords,
      targetVocabulary: p.targetVocabulary,
      targetConnectors: p.targetConnectors
    };
  });

  const title = 'Writing Practice';
  const instructions =
    data.instructions ||
    data.description ||
    'Write short responses to the questions below. Use complete sentences.';

  return (
    <SectionCard icon="📝" title={title} instructions={instructions}>
      {normalizedPrompts.map((prompt, index) => {
        const value = answers[prompt.id] ?? '';

        return (
          <div key={prompt.id} className="question-block">
            <p className="question-block__label">
              {index + 1}. {prompt.question}
            </p>
            <WrittenResponseWithCheck
              id={prompt.id}
              value={value}
              onChange={(val) => onAnswerChange?.(prompt.id, val)}
              disabled={disabled}
              placeholder={prompt.placeholder}
              rows={3}
              modelAnswer={prompt.modelAnswer}
              compareTip={prompt.compareTip || "Check whether your answer is a complete sentence and gives a clear reason or example."}
              checkType="short"
              checkSettings={{
                targetWords: prompt.targetWords || 8,
                targetVocabulary: prompt.targetVocabulary || vocabularyList,
                targetConnectors: prompt.targetConnectors
              }}
              onCheck={onWritingCheck}
              showWordCount={true}
            />
          </div>
        );
      })}
    </SectionCard>
  );
}
