import { useParams } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import LessonError from '../components/LessonError';
import LessonHeader from '../components/LessonHeader';
import LessonLoading from '../components/LessonLoading';
import TeacherPanel from '../components/TeacherPanel';
import StudentSubmissionsMonitor from '../components/StudentSubmissionsMonitor';
import { useLessonData } from '../hooks/useLessonData';

export default function TeacherPage() {
  const { lessonSlug } = useParams();
  const { lessonData, loading, error } = useLessonData(lessonSlug);

  return (
    <div className="app">
      <AppHeader label="OFS Grade 9 · Teacher Resources" />
      <div className="lesson-layout lesson-layout--teacher-page">
        {loading && <LessonLoading />}
        {!loading && error && <LessonError slug={lessonSlug} message={error} />}
        {!loading && lessonData && (
          <>
            <LessonHeader
              lessonTitle={lessonData.lessonTitle}
              ofsUnit={lessonData.ofsUnit}
              lessonGoal={lessonData.lessonGoal}
            />
            <TeacherPanel teacher={lessonData.teacher} />
            <StudentSubmissionsMonitor lessonSlug={lessonSlug} lessonData={lessonData} />
          </>
        )}
      </div>
    </div>
  );
}