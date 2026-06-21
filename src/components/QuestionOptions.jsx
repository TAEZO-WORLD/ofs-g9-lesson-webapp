export default function QuestionOptions({
  name,
  options,
  value,
  onChange,
  disabled = false,
  submitted = false,
  correctAnswer = null,
}) {
  return (
    <div className="options-list" role="radiogroup" aria-label={name}>
      {options.map((option, index) => {
        const id = `${name}-option-${index}`;
        const isSelected = value === option;
        const isCorrectOption = submitted && correctAnswer === option;
        const isWrongSelection = submitted && isSelected && correctAnswer !== option;

        let optionClass = 'option-label';
        if (isCorrectOption) optionClass += ' option-label--correct';
        if (isWrongSelection) optionClass += ' option-label--incorrect';

        return (
          <label key={id} className={optionClass} htmlFor={id}>
            <input
              type="radio"
              id={id}
              name={name}
              value={option}
              checked={isSelected}
              onChange={() => onChange(option)}
              disabled={disabled}
            />
            <span>{option}</span>
          </label>
        );
      })}
    </div>
  );
}