import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LatestLessonRedirect from './components/LatestLessonRedirect';
import LessonArchivePage from './pages/LessonArchivePage';
import StudentPage from './pages/StudentPage';
import TeacherPage from './pages/TeacherPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LatestLessonRedirect mode="student" />} />
        <Route path="/student" element={<LatestLessonRedirect mode="student" />} />
        <Route path="/teacher" element={<LatestLessonRedirect mode="teacher" />} />
        <Route path="/lessons" element={<LessonArchivePage />} />
        <Route path="/lessons/:lessonSlug/student" element={<StudentPage />} />
        <Route path="/lessons/:lessonSlug/teacher" element={<TeacherPage />} />
      </Routes>
    </BrowserRouter>
  );
}