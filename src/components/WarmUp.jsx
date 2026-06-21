import SectionCard from './SectionCard';

export default function WarmUp({ data }) {
  return (
    <SectionCard icon="☀" title={data.title} instructions={data.instructions}>
      <ol className="warmup-list">
        {data.questions.map((question, index) => (
          <li key={index} className="warmup-list__item">
            <strong>{index + 1}.</strong> {question}
          </li>
        ))}
      </ol>
    </SectionCard>
  );
}