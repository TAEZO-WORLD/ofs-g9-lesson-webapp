import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import StudentPage from './pages/StudentPage';
import TeacherPage from './pages/TeacherPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/student" replace />} />
        <Route path="/student" element={<StudentPage />} />
        <Route path="/teacher" element={<TeacherPage />} />
      </Routes>
    </BrowserRouter>
  );
}