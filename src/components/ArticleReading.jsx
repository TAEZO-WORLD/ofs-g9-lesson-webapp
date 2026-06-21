import SectionCard from './SectionCard';

export default function ArticleReading({ data }) {
  return (
    <SectionCard icon="📖" title={data.title}>
      <p className="article__source">{data.source}</p>
      {data.paragraphs.map((paragraph, index) => (
        <p key={index} className="article__paragraph">
          {paragraph}
        </p>
      ))}
    </SectionCard>
  );
}