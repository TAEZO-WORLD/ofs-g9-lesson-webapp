import SectionCard from './SectionCard';

export default function SelfCheck({ data, checked, onToggle }) {
  return (
    <SectionCard icon="✓" title={data.title} instructions={data.instructions}>
      <ul className="checklist">
        {data.items.map((item, index) => {
          const id = `self-check-${index}`;
          return (
            <li key={id} className="checklist__item">
              <input
                type="checkbox"
                id={id}
                checked={checked[index] ?? false}
                onChange={() => onToggle(index)}
              />
              <label htmlFor={id}>{item}</label>
            </li>
          );
        })}
      </ul>
    </SectionCard>
  );
}