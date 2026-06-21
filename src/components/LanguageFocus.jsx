import SectionCard from './SectionCard';

export default function LanguageFocus({ data }) {
  return (
    <SectionCard icon="✦" title={data.title}>
      <p>
        <strong>{data.topic}</strong>
      </p>
      <p>{data.explanation}</p>
      <ul className="examples-list">
        {data.examples.map((example, index) => (
          <li key={index}>{example}</li>
        ))}
      </ul>
      <div className="language-practice">
        <p>
          <strong>Practice</strong>
        </p>
        <ol>
          {data.practice.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ol>
      </div>
    </SectionCard>
  );
}