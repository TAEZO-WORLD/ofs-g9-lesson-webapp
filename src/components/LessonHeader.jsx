export default function LessonHeader({ lessonTitle, ofsUnit, lessonGoal }) {
  return (
    <header className="lesson-hero">
      <p className="lesson-hero__unit">{ofsUnit}</p>
      <h1>{lessonTitle}</h1>
      <div className="lesson-hero__goal">
        <span className="lesson-hero__goal-label">Lesson goal</span>
        {lessonGoal}
      </div>
    </header>
  );
}