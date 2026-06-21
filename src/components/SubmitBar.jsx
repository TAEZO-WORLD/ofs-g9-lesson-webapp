export default function SubmitBar({ submitted, onSubmit, disabled }) {
  return (
    <div className="submit-bar">
      {submitted ? (
        <div className="submitted-banner" role="status">
          ✓ Lesson submitted — review your writing feedback below
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
        disabled={disabled || submitted}
      >
        {submitted ? 'Submitted' : 'Submit lesson'}
      </button>
    </div>
  );
}