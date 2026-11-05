export default function LessonHeader({ lessonTitle, ofsUnit, lessonGoal, sourceLabel, citation }) {
  return (
    <header className="lesson-hero">
      <p className="lesson-hero__unit">{ofsUnit}</p>
      <h1>{lessonTitle}</h1>
      {(sourceLabel || citation) && (
        <div className="lesson-hero__source-info" style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--color-navy-soft)' }}>
          {sourceLabel && <span style={{ fontWeight: 700, marginRight: '0.4rem' }}>{sourceLabel}</span>}
          {citation && <span style={{ fontStyle: 'italic' }}>{citation}</span>}
        </div>
      )}
      <div className="lesson-hero__goal">
        <span className="lesson-hero__goal-label">Lesson goal</span>
        {lessonGoal}
      </div>
    </header>
  );
}