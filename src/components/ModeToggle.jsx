export default function ModeToggle({ mode, onModeChange }) {
  return (
    <div className="mode-toggle" role="group" aria-label="View mode">
      <button
        type="button"
        className={`mode-toggle__btn${mode === 'student' ? ' mode-toggle__btn--active' : ''}`}
        onClick={() => onModeChange('student')}
        aria-pressed={mode === 'student'}
      >
        Student
      </button>
      <button
        type="button"
        className={`mode-toggle__btn${mode === 'teacher' ? ' mode-toggle__btn--active' : ''}`}
        onClick={() => onModeChange('teacher')}
        aria-pressed={mode === 'teacher'}
      >
        Teacher
      </button>
    </div>
  );
}