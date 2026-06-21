import LessonHeader from './LessonHeader';
import WarmUp from './WarmUp';
import ArticleReading from './ArticleReading';
import VocabularyInContext from './VocabularyInContext';
import MainIdeaQuestion from './MainIdeaQuestion';
import ReadingComprehension from './ReadingComprehension';
import EvidenceFromText from './EvidenceFromText';
import LanguageFocus from './LanguageFocus';
import SpeakingPractice from './SpeakingPractice';
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
  selfCheckState,
  onSelfCheckToggle,
  submitted,
  writingFeedback,
  feedbackLoading,
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
      />
      <ReadingComprehension
        data={lessonData.readingComprehension}
        answers={comprehensionAnswers}
        onAnswerChange={onComprehensionChange}
        disabled={submitted}
      />
      <EvidenceFromText
        data={lessonData.evidenceFromText}
        answers={evidenceAnswers}
        onAnswerChange={onEvidenceChange}
        disabled={submitted}
      />
      <LanguageFocus data={lessonData.languageFocus} />
      <SpeakingPractice data={lessonData.speakingPractice} />
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
      />
    </div>
  );
}