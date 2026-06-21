export default function TeacherPanel({ teacher }) {
  const { answerKey, modelAnswer, rubric, teacherNotes, teachingScript } = teacher;

  return (
    <div className="teacher-page">
      <div className="teacher-panel">
        <h3 className="teacher-panel__title">Answer key</h3>
        <div className="teacher-panel__content">
          <div className="answer-key-item">
            <div className="answer-key-item__label">Main idea</div>
            <div className="answer-key-item__value">{answerKey.mainIdea}</div>
          </div>
          {Object.entries(answerKey.readingComprehension).map(([id, value]) => (
            <div key={id} className="answer-key-item">
              <div className="answer-key-item__label">Comprehension — {id}</div>
              <div className="answer-key-item__value">{value}</div>
            </div>
          ))}
          {Object.entries(answerKey.evidenceFromText).map(([id, value]) => (
            <div key={id} className="answer-key-item">
              <div className="answer-key-item__label">Evidence — {id}</div>
              <div className="answer-key-item__value">{value}</div>
            </div>
          ))}
          {answerKey.languageFocus && (
            <div className="answer-key-item">
              <div className="answer-key-item__label">Language focus</div>
              <div className="answer-key-item__value">
                {Object.values(answerKey.languageFocus).join('; ')}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="teacher-panel">
        <h3 className="teacher-panel__title">Model answer</h3>
        <div className="teacher-panel__content">
          <p>{modelAnswer}</p>
        </div>
      </div>

      <div className="teacher-panel">
        <h3 className="teacher-panel__title">Rubric</h3>
        <div className="teacher-panel__content">
          <div className="rubric-cards">
            {rubric.map((row) => (
              <div key={row.criterion} className="rubric-card">
                <h4 className="rubric-card__criterion">{row.criterion}</h4>
                <div className="rubric-card__levels">
                  <div className="rubric-card__level rubric-card__level--excellent">
                    <span className="rubric-card__label">Excellent</span>
                    <p>{row.excellent}</p>
                  </div>
                  <div className="rubric-card__level rubric-card__level--developing">
                    <span className="rubric-card__label">Developing</span>
                    <p>{row.developing}</p>
                  </div>
                  <div className="rubric-card__level rubric-card__level--beginning">
                    <span className="rubric-card__label">Beginning</span>
                    <p>{row.beginning}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="teacher-panel">
        <h3 className="teacher-panel__title">Teacher notes</h3>
        <div className="teacher-panel__content">
          <ul className="teacher-notes-list">
            {teacherNotes.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="teacher-panel">
        <h3 className="teacher-panel__title">Teaching script</h3>
        <div className="teacher-panel__content">
          {teachingScript.map((phase, index) => (
            <div key={index} className="script-phase">
              <p className="script-phase__name">{phase.phase}</p>
              <p>{phase.script}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}