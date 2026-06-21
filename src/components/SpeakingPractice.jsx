import SectionCard from './SectionCard';

export default function SpeakingPractice({ data }) {
  return (
    <SectionCard icon="🎤" title={data.title} instructions={data.instructions}>
      <ol className="prompt-list">
        {data.prompts.map((prompt, index) => (
          <li key={index} className="prompt-list__item">
            <strong>{index + 1}.</strong> {prompt}
          </li>
        ))}
      </ol>
    </SectionCard>
  );
}