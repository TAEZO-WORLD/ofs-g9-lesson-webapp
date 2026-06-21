/**
 * Placeholder for AI-powered writing feedback.
 * Replace this implementation with a real API call when ready.
 *
 * @param {string} studentAnswer - The student's written response
 * @param {object} lessonData - Full lesson data from lesson-data.json
 * @returns {Promise<{ score: string, strengths: string[], improvements: string[], summary: string }>}
 */
export async function gradeWritingWithAI(studentAnswer, lessonData) {
  const wordCount = studentAnswer.trim().split(/\s+/).filter(Boolean).length;
  const target = lessonData.writingTask?.wordTarget;
  const hasConnector = /because|as a result|therefore|so\b/i.test(studentAnswer);

  const meetsWordCount =
    !target || (wordCount >= target.min && wordCount <= target.max + 20);

  return {
    score: meetsWordCount && hasConnector ? 'Developing+' : 'Developing',
    strengths: [
      wordCount > 0
        ? `You wrote ${wordCount} words — keep building your ideas.`
        : 'You started your response.',
      hasConnector
        ? 'You used cause-and-effect language.'
        : 'Your opinion is a good starting point.',
    ],
    improvements: [
      !hasConnector
        ? 'Try adding a cause-and-effect connector (because, as a result, therefore).'
        : 'Add a second reason with a specific example.',
      !meetsWordCount && target
        ? `Aim for ${target.min}–${target.max} words in your paragraph.`
        : 'Check your opening sentence — is your opinion clear?',
    ],
    summary:
      'This is placeholder feedback. Connect gradeWritingWithAI to your AI service for detailed, personalised comments.',
  };
}