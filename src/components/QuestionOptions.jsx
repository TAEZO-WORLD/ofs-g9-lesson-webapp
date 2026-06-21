export default function QuestionOptions({
  name,
  options,
  value,
  onChange,
  disabled = false,
}) {
  return (
    <div className="options-list" role="radiogroup" aria-label={name}>
      {options.map((option, index) => {
        const id = `${name}-option-${index}`;
        return (
          <label key={id} className="option-label" htmlFor={id}>
            <input
              type="radio"
              id={id}
              name={name}
              value={option}
              checked={value === option}
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