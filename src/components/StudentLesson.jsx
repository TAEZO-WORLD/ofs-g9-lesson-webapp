import LessonHeader from './LessonHeader';
import WarmUp from './WarmUp';
import ArticleReading from './ArticleReading';
import VocabularyInContext from './VocabularyInContext';
import MainIdeaQuestion from './MainIdeaQuestion';
import ReadingComprehension from './ReadingComprehension';
import EvidenceFromText from './EvidenceFromText';
import LanguageFocus from './LanguageFocus';
import WritingPractice from './WritingPractice';
import WritingTask from './WritingTask';
import SelfCheck from './SelfCheck';
import SubmitBar from './SubmitBar';

export default function StudentLesson({
  lessonData,
  mainIdeaAnswer,
  onMainIdeaChange,
  comprehensionAnswers,
  onComprehensionChange,
  evidenceAnswers,
  onEvidenceChange,
  writingAnswer,
  onWritingChange,
  writingPracticeAnswers,
  onWritingPracticeChange,
  selfCheckState,
  onSelfCheckToggle,
  studentName,
  onStudentNameChange,
  studentCode,
  onStudentCodeChange,
  submitted,
  writingFeedback,
  feedbackLoading,
  submissionMessage,
  onSubmit,
}) {
  return (
    <div className="lesson-main">
      <LessonHeader
        lessonTitle={lessonData.lessonTitle}
        ofsUnit={lessonData.ofsUnit}
        lessonGoal={lessonData.lessonGoal}
      />
      <WarmUp data={lessonData.warmUp} />
      <ArticleReading data={lessonData.article} />
      <VocabularyInContext data={lessonData.vocabularyInContext} />
      <MainIdeaQuestion
        data={lessonData.mainIdeaQuestion}
        answer={mainIdeaAnswer}
        onAnswerChange={onMainIdeaChange}
        disabled={submitted}
        submitted={submitted}
        answerKeyValue={lessonData.teacher.answerKey.mainIdea}
      />
      <ReadingComprehension
        data={lessonData.readingComprehension}
        answers={comprehensionAnswers}
        onAnswerChange={onComprehensionChange}
        disabled={submitted}
        submitted={submitted}
        answerKey={lessonData.teacher.answerKey.readingComprehension}
      />
      <EvidenceFromText
        data={lessonData.evidenceFromText}
        answers={evidenceAnswers}
        onAnswerChange={onEvidenceChange}
        disabled={submitted}
        submitted={submitted}
        suggestedAnswers={lessonData.teacher.answerKey.evidenceFromText}
      />
      <LanguageFocus data={lessonData.languageFocus} />
      <WritingPractice
        data={lessonData.writingPractice || lessonData.speakingPractice}
        answers={writingPracticeAnswers}
        onAnswerChange={onWritingPracticeChange}
        disabled={submitted}
      />
      <WritingTask
        data={lessonData.writingTask}
        modelAnswer={submitted ? lessonData.teacher.modelAnswer : null}
        writingAnswer={writingAnswer}
        onWritingChange={onWritingChange}
        submitted={submitted}
        feedback={writingFeedback}
        loading={feedbackLoading}
      />
      <SelfCheck
        data={lessonData.selfCheck}
        checked={selfCheckState}
        onToggle={onSelfCheckToggle}
      />
      <SubmitBar
        submitted={submitted}
        onSubmit={onSubmit}
        disabled={!writingAnswer.trim()}
        studentName={studentName}
        onStudentNameChange={onStudentNameChange}
        studentCode={studentCode}
        onStudentCodeChange={onStudentCodeChange}
        submissionMessage={submissionMessage}
      />
    </div>
  );
}