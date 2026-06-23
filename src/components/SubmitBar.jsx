export default function SubmitBar({
  submitted,
  onSubmit,
  disabled,
  studentName,
  onStudentNameChange,
  studentCode,
  onStudentCodeChange,
  submissionMessage,
}) {
  return (
    <div className="submit-bar">
      {!submitted && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            textAlign: 'left',
            marginBottom: '1.5rem',
            borderBottom: '1px solid var(--color-border)',
            paddingBottom: '1.5rem',
          }}
        >
          <div>
            <label
              className="question-block__label"
              htmlFor="student-name-input"
              style={{ display: 'block', marginBottom: '0.35rem' }}
            >
              Student Name
            </label>
            <input
              id="student-name-input"
              type="text"
              className="text-input"
              placeholder="Type your name here..."
              value={studentName}
              onChange={(e) => onStudentNameChange(e.target.value)}
              disabled={submitted}
              style={{ maxWidth: '400px' }}
            />
          </div>

          <div>
            <label
              className="question-block__label"
              htmlFor="student-code-input"
              style={{ display: 'block', marginBottom: '0.35rem' }}
            >
              Student Code / Class ID
            </label>
            <input
              id="student-code-input"
              type="text"
              className="text-input"
              placeholder="Example: G9-001, G9-002, or your initials"
              value={studentCode}
              onChange={(e) => onStudentCodeChange(e.target.value)}
              disabled={submitted}
              style={{ maxWidth: '400px' }}
            />
          </div>
        </div>
      )}

      {submitted ? (
        <div className="submitted-banner" role="status">
          ✓ {submissionMessage || 'Your lesson has been submitted.'}
        </div>
      ) : (
        <p className="submit-bar__note">
          Complete the activities above, then submit your work.
        </p>
      )}

      <button
        type="button"
        className="btn-primary"
        onClick={onSubmit}
        disabled={disabled || submitted || !studentName.trim() || !studentCode.trim()}
      >
        {submitted ? 'Submitted' : 'Submit lesson'}
      </button>
    </div>
  );
}