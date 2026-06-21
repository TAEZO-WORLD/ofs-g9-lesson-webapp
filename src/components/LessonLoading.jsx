export default function LessonLoading({ message = 'Loading lesson…' }) {
  return (
    <div className="status-panel" role="status" aria-live="polite">
      <p className="status-panel__message">{message}</p>
    </div>
  );
}