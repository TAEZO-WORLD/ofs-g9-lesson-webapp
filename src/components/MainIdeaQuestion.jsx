import SectionCard from './SectionCard';
import QuestionOptions from './QuestionOptions';
import QuizFeedback from './QuizFeedback';
import { getCorrectAnswer, getExplanation, isAnswerCorrect } from '../utils/questionHelpers';

export default function MainIdeaQuestion({
  data,
  answer,
  onAnswerChange,
  disabled,
  submitted,
  answerKeyValue,
}) {
  const correctAnswer = getCorrectAnswer(data, answerKeyValue);
  const explanation = getExplanation(data, null);
  const isCorrect = submitted && isAnswerCorrect(answer, correctAnswer);

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
          submitted={submitted}
          correctAnswer={correctAnswer}
        />
        {submitted && (
          <QuizFeedback
            isCorrect={isCorrect}
            correctAnswer={correctAnswer}
            explanation={explanation}
          />
        )}
      </div>
    </SectionCard>
  );
}