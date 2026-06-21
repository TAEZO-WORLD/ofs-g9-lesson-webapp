import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { fetchLessonIndex, lessonStudentPath, lessonTeacherPath } from '../utils/lessonApi';
import AppHeader from './AppHeader';
import LessonLoading from './LessonLoading';
import LessonError from './LessonError';

export default function LatestLessonRedirect({ mode = 'student' }) {
  const [target, setTarget] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLessonIndex()
      .then((index) => {
        if (!index.latest) {
          setError('No latest lesson is configured.');
          return;
        }

        setTarget(
          mode === 'teacher'
            ? lessonTeacherPath(index.latest)
            : lessonStudentPath(index.latest),
        );
      })
      .catch((err) => {
        setError(err.message || 'Could not load the latest lesson.');
      });
  }, [mode]);

  if (target) {
    return <Navigate to={target} replace />;
  }

  if (error) {
    return (
      <div className="app">
        <AppHeader />
        <div className="lesson-layout">
          <LessonError message={error} />
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <AppHeader />
      <div className="lesson-layout">
        <LessonLoading message="Finding the latest lesson…" />
      </div>
    </div>
  );
}