export default function SubmitBar({
  submitted,
  onSubmit,
  disabled,
  studentName,
  onStudentNameChange,
  submissionMessage,
}) {
  return (
    <div className="submit-bar">
      {!submitted && (
        <div
          className="question-block"
          style={{
            borderBottom: 'none',
            paddingBottom: '1rem',
            textAlign: 'left',
          }}
        >
          <label
            className="question-block__label"
            htmlFor="student-name-input"
            style={{ display: 'block', marginBottom: '0.5rem' }}
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
        disabled={disabled || submitted || !studentName.trim()}
      >
        {submitted ? 'Submitted' : 'Submit lesson'}
      </button>
    </div>
  );
}