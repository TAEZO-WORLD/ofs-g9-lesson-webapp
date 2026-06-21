export default function QuizFeedback({ isCorrect, correctAnswer, explanation }) {
  return (
    <div
      className={`quiz-feedback${isCorrect ? ' quiz-feedback--correct' : ' quiz-feedback--incorrect'}`}
      role="status"
    >
      <p className="quiz-feedback__mark">
        {isCorrect ? '✓ Correct' : '✗ Try again / Incorrect'}
      </p>
      {!isCorrect && correctAnswer && (
        <p className="quiz-feedback__answer">
          <strong>Correct answer:</strong> {correctAnswer}
        </p>
      )}
      {explanation && (
        <p className="quiz-feedback__explanation">{explanation}</p>
      )}
    </div>
  );
}