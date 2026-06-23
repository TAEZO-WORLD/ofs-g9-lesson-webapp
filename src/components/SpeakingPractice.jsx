import SectionCard from './SectionCard';

export default function SpeakingPractice({
  data,
  answers = {},
  onAnswerChange,
  disabled,
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
        const wordCount = value.trim().split(/\s+/).filter(Boolean).length;

        return (
          <div key={prompt.id} className="question-block">
            <p className="question-block__label">
              {index + 1}. {prompt.question}
            </p>
            <textarea
              className="text-area"
              rows={3}
              placeholder={prompt.placeholder}
              value={value}
              onChange={(e) => onAnswerChange?.(prompt.id, e.target.value)}
              disabled={disabled}
              aria-label={`Writing Practice Response ${index + 1}`}
            />
            <p className="word-count">
              {wordCount} {wordCount === 1 ? 'word' : 'words'}
            </p>
          </div>
        );
      })}
    </SectionCard>
  );
}