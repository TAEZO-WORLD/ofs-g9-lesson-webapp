import SectionCard from './SectionCard';
import QuestionOptions from './QuestionOptions';

export default function ReadingComprehension({ data, answers, onAnswerChange, disabled }) {
  return (
    <SectionCard icon="🔍" title={data.title}>
      {data.questions.map((q, index) => (
        <div key={q.id} className="question-block">
          <p className="question-block__label">
            {index + 1}. {q.question}
          </p>
          <QuestionOptions
            name={q.id}
            options={q.options}
            value={answers[q.id] ?? ''}
            onChange={(value) => onAnswerChange(q.id, value)}
            disabled={disabled}
          />
        </div>
      ))}
    </SectionCard>
  );
}