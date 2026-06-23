import { useState } from 'react';
import { useParams } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import LessonError from '../components/LessonError';
import LessonLoading from '../components/LessonLoading';
import StudentLesson from '../components/StudentLesson';
import { useLessonData } from '../hooks/useLessonData';
import { gradeWritingWithAI } from '../utils/gradeWritingWithAI';
import { getCorrectAnswer, isAnswerCorrect } from '../utils/questionHelpers';

function buildInitialAnswers(questions) {
  return Object.fromEntries(questions.map((q) => [q.id, '']));
}

function buildInitialEvidence(prompts) {
  return Object.fromEntries(prompts.map((p) => [p.id, '']));
}

function buildInitialSelfCheck(items) {
  return Object.fromEntries(items.map((_, index) => [index, false]));
}

function buildInitialPracticeAnswers(practiceData) {
  if (!practiceData || !practiceData.prompts) return {};
  return Object.fromEntries(
    practiceData.prompts.map((p, index) => {
      const id = typeof p === 'string' ? `wp${index + 1}` : (p.id || `wp${index + 1}`);
      return [id, ''];
    })
  );
}

function StudentLessonContent({ lessonData, lessonSlug }) {
  const [studentName, setStudentName] = useState('');
  const [studentCode, setStudentCode] = useState('');
  const [mainIdeaAnswer, setMainIdeaAnswer] = useState('');
  const [comprehensionAnswers, setComprehensionAnswers] = useState(() =>
    buildInitialAnswers(lessonData.readingComprehension.questions),
  );
  const [evidenceAnswers, setEvidenceAnswers] = useState(() =>
    buildInitialEvidence(lessonData.evidenceFromText.prompts),
  );
  const [writingAnswer, setWritingAnswer] = useState('');
  const [writingPracticeAnswers, setWritingPracticeAnswers] = useState(() =>
    buildInitialPracticeAnswers(lessonData.writingPractice || lessonData.speakingPractice)
  );
  const [selfCheckState, setSelfCheckState] = useState(() =>
    buildInitialSelfCheck(lessonData.selfCheck.items),
  );
  const [submitted, setSubmitted] = useState(false);
  const [writingFeedback, setWritingFeedback] = useState(null);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');

  const handleComprehensionChange = (id, value) => {
    setComprehensionAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleEvidenceChange = (id, value) => {
    setEvidenceAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleWritingPracticeChange = (id, value) => {
    setWritingPracticeAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelfCheckToggle = (index) => {
    setSelfCheckState((prev) => ({ ...prev, [index] : !prev[index] }));
  };

  const handleSubmit = async () => {
    if (!writingAnswer.trim() || !studentName.trim() || !studentCode.trim() || submitted) return;

    setFeedbackLoading(true);
    try {
      const feedback = await gradeWritingWithAI(writingAnswer, lessonData);
      setWritingFeedback(feedback);

      // Unique ID for the submission
      const submissionId = crypto.randomUUID 
        ? crypto.randomUUID() 
        : `sub_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`;

      // Compute auto-grading on client
      const miCorrect = getCorrectAnswer(
        lessonData.mainIdeaQuestion,
        lessonData.teacher?.answerKey?.mainIdea
      );
      const mainIdeaResult = isAnswerCorrect(mainIdeaAnswer, miCorrect) ? 'O' : 'X';

      const readingComprehensionResults = {};
      if (lessonData.readingComprehension?.questions) {
        lessonData.readingComprehension.questions.forEach((q) => {
          const correctAns = getCorrectAnswer(
            q,
            lessonData.teacher?.answerKey?.readingComprehension?.[q.id]
          );
          const studentAns = comprehensionAnswers[q.id];
          readingComprehensionResults[q.id] = isAnswerCorrect(studentAns, correctAns) ? 'O' : 'X';
        });
      }

      let correctCount = 0;
      let totalCount = 0;
      if (lessonData.mainIdeaQuestion) {
        totalCount++;
        if (mainIdeaResult === 'O') correctCount++;
      }
      Object.values(readingComprehensionResults).forEach((res) => {
        totalCount++;
        if (res === 'O') correctCount++;
      });
      const autoGradedScore = `${correctCount}/${totalCount}`;

      const wordCount = writingAnswer.trim().split(/\s+/).filter(Boolean).length;

      const payload = {
        id: submissionId,
        lessonSlug,
        lessonTitle: lessonData.lessonTitle,
        studentName: studentName.trim(),
        studentCode: studentCode.trim(),
        submittedAt: new Date().toISOString(),
        mainIdeaAnswer,
        mainIdeaResult,
        readingComprehensionAnswers: comprehensionAnswers,
        readingComprehensionResults,
        evidenceAnswers,
        languageFocusAnswers: null,
        writingPracticeAnswers,
        finalWritingTaskAnswer: writingAnswer,
        finalWritingTaskWordCount: wordCount,
        selfCheckItems: selfCheckState,
        autoGradedScore,
        feedback,
        modelAnswer: lessonData.teacher?.modelAnswer || null
      };

      try {
        const response = await fetch('/api/submissions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          setSubmissionMessage('Your lesson has been submitted.');
        } else {
          throw new Error('API submission returned non-200');
        }
      } catch (err) {
        console.warn('API submission failed, falling back to local storage:', err);
        try {
          const key = `submissions_${lessonSlug}`;
          const existing = JSON.parse(localStorage.getItem(key) || '[]');
          
          // Count previous local attempts for same student code
          const previousAttempts = existing.filter(
            (sub) => sub.studentCode === studentCode.trim()
          ).length;
          const attemptNumber = previousAttempts + 1;

          const localPayload = {
            id: submissionId,
            lessonSlug,
            lessonTitle: lessonData.lessonTitle,
            studentName: studentName.trim(),
            studentCode: studentCode.trim(),
            attemptNumber,
            createdAt: new Date().toISOString(),
            payload: {
              ...payload,
              attemptNumber
            }
          };

          existing.push(localPayload);
          localStorage.setItem(key, JSON.stringify(existing));
        } catch (storageErr) {
          console.error('Failed to save to localStorage:', storageErr);
        }
        setSubmissionMessage('Saved locally. Cloud sync is not available yet.');
      }

      setSubmitted(true);
    } catch (e) {
      console.error('Error executing submit:', e);
    } finally {
      setFeedbackLoading(false);
    }
  };

  return (
    <StudentLesson
      lessonData={lessonData}
      mainIdeaAnswer={mainIdeaAnswer}
      onMainIdeaChange={setMainIdeaAnswer}
      comprehensionAnswers={comprehensionAnswers}
      onComprehensionChange={handleComprehensionChange}
      evidenceAnswers={evidenceAnswers}
      onEvidenceChange={handleEvidenceChange}
      writingAnswer={writingAnswer}
      onWritingChange={setWritingAnswer}
      writingPracticeAnswers={writingPracticeAnswers}
      onWritingPracticeChange={handleWritingPracticeChange}
      selfCheckState={selfCheckState}
      onSelfCheckToggle={handleSelfCheckToggle}
      studentName={studentName}
      onStudentNameChange={setStudentName}
      studentCode={studentCode}
      onStudentCodeChange={setStudentCode}
      submitted={submitted}
      writingFeedback={writingFeedback}
      feedbackLoading={feedbackLoading}
      submissionMessage={submissionMessage}
      onSubmit={handleSubmit}
    />
  );
}

export default function StudentPage() {
  const { lessonSlug } = useParams();
  const { lessonData, loading, error } = useLessonData(lessonSlug);

  return (
    <div className="app">
      <AppHeader />
      <div className="lesson-layout">
        {loading && <LessonLoading />}
        {!loading && error && <LessonError slug={lessonSlug} message={error} />}
        {!loading && lessonData && (
          <StudentLessonContent key={lessonSlug} lessonData={lessonData} lessonSlug={lessonSlug} />
        )}
      </div>
    </div>
  );
}