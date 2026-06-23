import { useState } from 'react';
import { useParams } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import LessonError from '../components/LessonError';
import LessonLoading from '../components/LessonLoading';
import StudentLesson from '../components/StudentLesson';
import { useLessonData } from '../hooks/useLessonData';
import { gradeWritingWithAI } from '../utils/gradeWritingWithAI';

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
    if (!writingAnswer.trim() || !studentName.trim() || submitted) return;

    setFeedbackLoading(true);
    try {
      const feedback = await gradeWritingWithAI(writingAnswer, lessonData);
      setWritingFeedback(feedback);

      const payload = {
        studentName: studentName.trim(),
        mainIdeaAnswer,
        comprehensionAnswers,
        evidenceAnswers,
        languageFocusAnswers: null,
        writingPracticeAnswers,
        finalWritingTaskAnswer: writingAnswer,
        selfCheckItems: selfCheckState,
        lessonSlug,
        lessonTitle: lessonData.lessonTitle,
        submittedTimestamp: new Date().toISOString(),
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
          existing.push({
            id: `local_${Date.now()}`,
            lessonSlug,
            lessonTitle: lessonData.lessonTitle,
            studentName: studentName.trim(),
            createdAt: new Date().toISOString(),
            payload,
          });
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