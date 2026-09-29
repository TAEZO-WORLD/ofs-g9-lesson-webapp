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
        const qId = q.id || `rc${index + 1}`;
        const answerKeyValue = Array.isArray(answerKey)
          ? answerKey[index]
          : (answerKey?.[qId] ?? answerKey?.[q.id]);
        const correctAnswer = getCorrectAnswer(q, answerKeyValue);
        const explanation = getExplanation(q, null);
        const selected = answers[qId] ?? answers[q.id] ?? '';
        const isCorrect = submitted && isAnswerCorrect(selected, correctAnswer);

        return (
          <div key={qId} className="question-block">
            <p className="question-block__label">
              {index + 1}. {q.question}
            </p>
            <QuestionOptions
              name={qId}
              options={q.options}
              value={selected}
              onChange={(value) => onAnswerChange(qId, value)}
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