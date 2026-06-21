import SectionCard from './SectionCard';
import QuestionOptions from './QuestionOptions';

export default function MainIdeaQuestion({ data, answer, onAnswerChange, disabled }) {
  return (
    <SectionCard icon="💡" title={data.title}>
      <div className="question-block">
        <p className="question-block__label">{data.question}</p>
        <QuestionOptions
          name="main-idea"
          options={data.options}
          value={answer}
          onChange={onAnswerChange}
          disabled={disabled}
        />
      </div>
    </SectionCard>
  );
}