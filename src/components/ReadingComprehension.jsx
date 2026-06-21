import SectionCard from './SectionCard';
import QuestionOptions from './QuestionOptions';
import QuizFeedback from './QuizFeedback';
import { getCorrectAnswer, getExplanation, isAnswerCorrect } from '../utils/questionHelpers';

export default function ReadingComprehension({
  data,
  answers,
  onAnswerChange,
  disabled,
  submitted,
  answerKey,
}) {
  return (
    <SectionCard icon="🔍" title={data.title}>
      {data.questions.map((q, index) => {
        const answerKeyValue = answerKey?.[q.id];
        const correctAnswer = getCorrectAnswer(q, answerKeyValue);
        const explanation = getExplanation(q, null);
        const selected = answers[q.id] ?? '';
        const isCorrect = submitted && isAnswerCorrect(selected, correctAnswer);

        return (
          <div key={q.id} className="question-block">
            <p className="question-block__label">
              {index + 1}. {q.question}
            </p>
            <QuestionOptions
              name={q.id}
              options={q.options}
              value={selected}
              onChange={(value) => onAnswerChange(q.id, value)}
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
        );
      })}
    </SectionCard>
  );
}