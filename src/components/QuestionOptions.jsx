import { useId } from 'react';

export default function QuestionOptions({
  name,
  options,
  value,
  onChange,
  disabled = false,
  submitted = false,
  correctAnswer = null,
}) {
  const autoId = useId();
  const cleanAutoId = autoId.replace(/:/g, '_');
  const radioGroupName = (name && String(name).trim())
    ? String(name).trim()
    : `qgroup_${cleanAutoId}`;

  return (
    <div className="options-list" role="radiogroup" aria-label={radioGroupName}>
      {options.map((option, index) => {
        const id = `${radioGroupName}_opt_${index}`;
        const isSelected = value === option;
        const isCorrectOption = submitted && correctAnswer === option;
        const isWrongSelection = submitted && isSelected && correctAnswer !== option;

        let optionClass = 'option-label';
        if (isSelected && !submitted) optionClass += ' option-label--selected';
        if (isCorrectOption) optionClass += ' option-label--correct';
        if (isWrongSelection) optionClass += ' option-label--incorrect';

        return (
          <label key={id} className={optionClass} htmlFor={id}>
            <input
              type="radio"
              id={id}
              name={radioGroupName}
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