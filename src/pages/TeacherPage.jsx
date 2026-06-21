import lessonData from '../data/lesson-data.json';
import AppHeader from '../components/AppHeader';
import LessonHeader from '../components/LessonHeader';
import TeacherPanel from '../components/TeacherPanel';

export default function TeacherPage() {
  return (
    <div className="app">
      <AppHeader label="OFS Grade 9 · Teacher Resources" />
      <div className="lesson-layout lesson-layout--teacher-page">
        <LessonHeader
          lessonTitle={lessonData.lessonTitle}
          ofsUnit={lessonData.ofsUnit}
          lessonGoal={lessonData.lessonGoal}
        />
        <TeacherPanel teacher={lessonData.teacher} />
      </div>
    </div>
  );
}