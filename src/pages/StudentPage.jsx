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

function StudentLessonContent({ lessonData }) {
  const [mainIdeaAnswer, setMainIdeaAnswer] = useState('');
  const [comprehensionAnswers, setComprehensionAnswers] = useState(() =>
    buildInitialAnswers(lessonData.readingComprehension.questions),
  );
  const [evidenceAnswers, setEvidenceAnswers] = useState(() =>
    buildInitialEvidence(lessonData.evidenceFromText.prompts),
  );
  const [writingAnswer, setWritingAnswer] = useState('');
  const [selfCheckState, setSelfCheckState] = useState(() =>
    buildInitialSelfCheck(lessonData.selfCheck.items),
  );
  const [submitted, setSubmitted] = useState(false);
  const [writingFeedback, setWritingFeedback] = useState(null);
  const [feedbackLoading, setFeedbackLoading] = useState(false);

  const handleComprehensionChange = (id, value) => {
    setComprehensionAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleEvidenceChange = (id, value) => {
    setEvidenceAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelfCheckToggle = (index) => {
    setSelfCheckState((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleSubmit = async () => {
    if (!writingAnswer.trim() || submitted) return;

    setFeedbackLoading(true);
    try {
      const feedback = await gradeWritingWithAI(writingAnswer, lessonData);
      setWritingFeedback(feedback);
      setSubmitted(true);
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
      selfCheckState={selfCheckState}
      onSelfCheckToggle={handleSelfCheckToggle}
      submitted={submitted}
      writingFeedback={writingFeedback}
      feedbackLoading={feedbackLoading}
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
          <StudentLessonContent key={lessonSlug} lessonData={lessonData} />
        )}
      </div>
    </div>
  );
}