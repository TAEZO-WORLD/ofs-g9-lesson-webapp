/**
 * Resolve the correct option text for a multiple-choice question.
 * Uses correctIndex when present, otherwise falls back to teacher answerKey text.
 */
export function getCorrectAnswer(question, answerKeyValue) {
  if (
    question.correctIndex != null &&
    question.options?.[question.correctIndex] != null
  ) {
    return question.options[question.correctIndex];
  }

  if (answerKeyValue && question.options) {
    const index = question.options.indexOf(answerKeyValue);
    if (index >= 0) return answerKeyValue;
  }

  return answerKeyValue ?? null;
}

export function getExplanation(question, fallbackExplanation) {
  return question.explanation ?? fallbackExplanation ?? null;
}

export function isAnswerCorrect(selectedAnswer, correctAnswer) {
  if (!selectedAnswer || !correctAnswer) return false;
  return selectedAnswer === correctAnswer;
}