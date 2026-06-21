import { Link } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import LessonError from '../components/LessonError';
import LessonLoading from '../components/LessonLoading';
import { useLessonIndex } from '../hooks/useLessonIndex';
import { lessonStudentPath } from '../utils/lessonApi';

export default function LessonArchivePage() {
  const { index, loading, error } = useLessonIndex();

  return (
    <div className="app">
      <AppHeader label="OFS Grade 9 · Lesson Archive" />
      <div className="lesson-layout">
        <header className="lesson-hero">
          <h1>Lesson archive</h1>
          <p>Choose a lesson to open the student page.</p>
        </header>

        {loading && <LessonLoading message="Loading lesson archive…" />}
        {!loading && error && <LessonError message={error} />}
        {!loading && index && (
          <div className="archive-list">
            {index.lessons.map((lesson) => (
              <article key={lesson.slug} className="archive-card">
                <div className="archive-card__meta">
                  <span className="archive-card__date">{lesson.date}</span>
                  {index.latest === lesson.slug && (
                    <span className="archive-card__badge">Latest</span>
                  )}
                </div>
                <h2 className="archive-card__title">{lesson.title}</h2>
                <p className="archive-card__unit">{lesson.ofsUnit}</p>
                <p className="archive-card__type">
                  <strong>Text type:</strong> {lesson.textType}
                </p>
                <div className="archive-card__links">
                  <Link
                    to={lessonStudentPath(lesson.slug)}
                    className="archive-card__link archive-card__link--student"
                  >
                    Student page
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}