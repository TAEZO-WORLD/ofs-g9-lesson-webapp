import SectionCard from './SectionCard';

export default function ArticleReading({ data }) {
  if (!data) return null;

  const sourceText = data.sourceNote || data.source;

  return (
    <SectionCard icon="📖" title={data.title}>
      {sourceText && !data.sourceLabel && !data.citation && (
        <p className="article__source">{sourceText}</p>
      )}

      {data.pages ? (
        <div className="article__content" data-reading-container="true">
          {data.pages.map((page, pIdx) => (
            <div key={pIdx} className="article__page" data-page={page.pageNumber || (pIdx + 1)}>
              {page.sourceLabel && (
                <p className="article__source-label" data-source-label="true" style={{ fontWeight: 700, color: 'var(--color-navy)', marginBottom: '0.25rem' }}>
                  {page.sourceLabel}
                </p>
              )}
              {page.citation && (
                <p className="article__citation" data-source-citation="true" style={{ fontStyle: 'italic', color: 'var(--color-navy-soft)', marginBottom: '1.25rem' }}>
                  {page.citation}
                </p>
              )}
              {page.epigraph && (
                <blockquote className="article__epigraph">
                  {page.epigraph}
                </blockquote>
              )}
              {page.title && <h3 className="article__page-title">{page.title}</h3>}
              {page.paragraphs?.map((p, idx) => (
                <p key={idx} className="article__paragraph" data-source-block={idx + 1}>{p}</p>
              ))}
              {page.factBox && (
                <div className="article__fact-box">
                  {page.factBox.map((item, fIdx) => (
                    <div key={fIdx} className="article__fact-line">{item}</div>
                  ))}
                </div>
              )}
              {page.visualLabels && (
                <div className="article__visual-labels-box" data-visual-labels="true">
                  <div className="article__visual-labels-title">Visual & Diagram Labels</div>
                  <div className="article__visual-labels-list">
                    {page.visualLabels.map((lbl, lIdx) => (
                      <span key={lIdx} className="article__visual-label-item">{lbl}</span>
                    ))}
                  </div>
                </div>
              )}
              {page.sections?.map((section, sIdx) => (
                <div key={sIdx} className="article__section">
                  {section.heading && <h3 className="article__heading">{section.heading}</h3>}
                  {section.subheading && <h4 className="article__subheading">{section.subheading}</h4>}
                  {section.intro && <p className="article__paragraph">{section.intro}</p>}
                  {section.bullets && (
                    <ul className="article__list">
                      {section.bullets.map((b, bIdx) => (
                        <li key={bIdx}>{b}</li>
                      ))}
                    </ul>
                  )}
                  {section.paragraphs?.map((p, pIdx) => (
                    <p key={pIdx} className="article__paragraph">{p}</p>
                  ))}
                  {section.paragraphsAfterBullets?.map((p, pIdx) => (
                    <p key={pIdx} className="article__paragraph">{p}</p>
                  ))}
                  {section.secondaryBullets && (
                    <ul className="article__list">
                      {section.secondaryBullets.map((b, bIdx) => (
                        <li key={bIdx}>{b}</li>
                      ))}
                    </ul>
                  )}
                  {section.cards && (
                    <div className="article__cards">
                      {section.cards.map((card, cIdx) => (
                        <p key={cIdx} className="article__card-paragraph article__paragraph">{card}</p>
                      ))}
                    </div>
                  )}
                  {section.visualLabels && (
                    <div className="article__visual-labels-box" data-visual-labels="true">
                      <div className="article__visual-labels-title">Visual & Diagram Labels</div>
                      <div className="article__visual-labels-list">
                        {section.visualLabels.map((lbl, lIdx) => (
                          <span key={lIdx} className="article__visual-label-item">{lbl}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : data.sections ? (
        <div className="article__content" data-reading-container="true">
          {data.intro && <p className="article__paragraph">{data.intro}</p>}
          {data.sections.map((section, sIdx) => (
            <div key={sIdx} className="article__section">
              {section.heading && <h3 className="article__heading">{section.heading}</h3>}
              {section.subheading && <h4 className="article__subheading">{section.subheading}</h4>}
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
        <div className="article__content" data-reading-container="true">
          {data.sourceLabel && (
            <p className="article__source-label" data-source-label="true" style={{ fontWeight: 700, color: 'var(--color-navy)', marginBottom: '0.25rem' }}>
              {data.sourceLabel}
            </p>
          )}
          {data.citation && (
            <p className="article__citation" data-source-citation="true" style={{ fontStyle: 'italic', color: 'var(--color-navy-soft)', marginBottom: '1.25rem' }}>
              {data.citation}
            </p>
          )}
          {data.paragraphs?.map((paragraph, index) => (
            <p key={index} className="article__paragraph" data-source-block={index + 1}>
              {paragraph}
            </p>
          ))}
        </div>
      )}
      {data.source && !data.pages && !data.sections && (
        <p className="article__source-footer" data-source-label="true" style={{ marginTop: '0.75rem', fontStyle: 'italic', color: 'var(--color-muted)' }}>
          {data.source}
        </p>
      )}
    </SectionCard>
  );
}