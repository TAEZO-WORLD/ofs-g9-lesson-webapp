import { Link } from 'react-router-dom';

export default function LessonError({ slug, message }) {
  const detail = message ?? (slug ? `Lesson "${slug}" could not be found.` : 'This lesson could not be loaded.');

  return (
    <div className="status-panel status-panel--error" role="alert">
      <h2 className="status-panel__title">Lesson not available</h2>
      <p className="status-panel__message">{detail}</p>
      <p className="status-panel__hint">Check the link or choose another lesson from the archive.</p>
      <Link to="/lessons" className="status-panel__link">
        View lesson archive
      </Link>
    </div>
  );
}