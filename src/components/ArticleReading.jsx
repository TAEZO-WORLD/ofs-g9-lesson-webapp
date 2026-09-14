import SectionCard from './SectionCard';

export default function ArticleReading({ data }) {
  if (!data) return null;

  const sourceText = data.sourceNote || data.source;

  return (
    <SectionCard icon="📖" title={data.title}>
      {sourceText && <p className="article__source">{sourceText}</p>}

      {data.sections ? (
        <div className="article__content">
          {data.intro && <p className="article__paragraph">{data.intro}</p>}
          {data.sections.map((section, sIdx) => (
            <div key={sIdx} className="article__section">
              {section.heading && <h3 className="article__heading">{section.heading}</h3>}
              {section.paragraphs?.map((p, pIdx) => (
                <p key={pIdx} className="article__paragraph">{p}</p>
              ))}
              {section.table && (
                <div className="article__table-wrapper">
                  <table className="article__table">
                    <thead>
                      <tr>
                        {section.table.headers.map((h, hIdx) => (
                          <th key={hIdx}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row, rIdx) => (
                        <tr key={rIdx}>
                          {row.map((cell, cIdx) => (
                            <td key={cIdx}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {section.bullets && (
                <ul className="article__list">
                  {section.bullets.map((bullet, bIdx) => (
                    <li key={bIdx}>{bullet}</li>
                  ))}
                </ul>
              )}
              {section.paragraphsAfterBullets?.map((p, pIdx) => (
                <p key={pIdx} className="article__paragraph">{p}</p>
              ))}
              {section.secondaryBullets && (
                <ul className="article__list">
                  {section.secondaryBullets.map((bullet, bIdx) => (
                    <li key={bIdx}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      ) : (
        data.paragraphs?.map((paragraph, index) => (
          <p key={index} className="article__paragraph">
            {paragraph}
          </p>
        ))
      )}
    </SectionCard>
  );
}