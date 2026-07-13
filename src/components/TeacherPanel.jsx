// ─── helpers ────────────────────────────────────────────────────────────────

/**
 * Render a teaching-script body value that may be a string or an array.
 * Tries multiple field names so old lessons (script) and new lessons (actions,
 * content, steps, teacherTalk) both work.
 */
function ScriptBody({ phase }) {
  const raw =
    phase.script ??
    phase.actions ??
    phase.content ??
    phase.steps ??
    phase.teacherTalk ??
    phase.description ??
    null;

  if (!raw) return null;

  if (Array.isArray(raw)) {
    return (
      <ul style={{ margin: '0.4rem 0 0', paddingLeft: '1.25rem', lineHeight: '1.65' }}>
        {raw.map((item, i) => (
          <li key={i} style={{ marginBottom: '0.25rem' }}>{item}</li>
        ))}
      </ul>
    );
  }

  return <p style={{ margin: '0.4rem 0 0', lineHeight: '1.65' }}>{raw}</p>;
}

// ─── component ───────────────────────────────────────────────────────────────

export default function TeacherPanel({ teacher, lessonData }) {
  const { answerKey, modelAnswer, rubric, teacherNotes, teachingScript } = teacher;

  // Accept either "teacherReadingGuide" (old lessons) or "detailedReadingGuide" (Cubism+)
  const readingGuide = teacher.teacherReadingGuide ?? teacher.detailedReadingGuide ?? null;

  return (
    <div className="teacher-page">
      <div className="teacher-panel">
        <h3 className="teacher-panel__title">Answer key</h3>
        <div className="teacher-panel__content">
          <div className="answer-key-item">
            <div className="answer-key-item__label">Main idea</div>
            <div className="answer-key-item__value">{answerKey.mainIdea}</div>
          </div>
          {Object.entries(answerKey.readingComprehension).map(([id, value]) => (
            <div key={id} className="answer-key-item">
              <div className="answer-key-item__label">Comprehension — {id}</div>
              <div className="answer-key-item__value">{value}</div>
            </div>
          ))}
          {Object.entries(answerKey.evidenceFromText).map(([id, value]) => (
            <div key={id} className="answer-key-item">
              <div className="answer-key-item__label">Evidence — {id}</div>
              <div className="answer-key-item__value">{value}</div>
            </div>
          ))}
          {answerKey.languageFocus && (
            <div className="answer-key-item">
              <div className="answer-key-item__label">Language focus</div>
              <div className="answer-key-item__value">
                {Object.values(answerKey.languageFocus).join('; ')}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="teacher-panel" style={{ borderLeft: '5px solid var(--color-sage)' }}>
        <h3 className="teacher-panel__title">Writing Check & Student Model Answers</h3>
        <div className="teacher-panel__content">
          <p style={{ fontStyle: 'italic', color: 'var(--color-muted)', marginBottom: '1.25rem' }}>
            ℹ️ Students receive a rule-based writing check and can compare their answers with model answers. This is not AI feedback.
          </p>

          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Evidence from the Text Model Answers
          </h4>
          <ul style={{ paddingLeft: '1.25rem', marginBottom: '1.25rem' }}>
            {lessonData?.evidenceFromText?.prompts?.map((prompt, idx) => (
              <li key={prompt.id} style={{ marginBottom: '0.5rem' }}>
                <strong>Prompt {idx + 1}:</strong> {prompt.statement}
                <div style={{ fontStyle: 'italic', color: 'var(--color-navy-soft)', marginTop: '0.2rem', paddingLeft: '0.5rem', borderLeft: '2px solid var(--color-border)' }}>
                  "{prompt.modelAnswer || teacher.answerKey?.evidenceFromText?.[prompt.id]}"
                </div>
              </li>
            ))}
          </ul>

          {(lessonData?.writingPractice || lessonData?.speakingPractice) && (
            <>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Writing Practice Model Answers
              </h4>
              <ul style={{ paddingLeft: '1.25rem', marginBottom: '1.25rem' }}>
                {(lessonData.writingPractice || lessonData.speakingPractice).prompts.map((prompt, idx) => {
                  const questionText = typeof prompt === 'string' ? prompt : prompt.question;
                  const promptId = typeof prompt === 'string' ? `wp${idx + 1}` : (prompt.id || `wp${idx + 1}`);
                  const modelAns = typeof prompt === 'string' ? '' : prompt.modelAnswer;

                  return (
                    <li key={promptId} style={{ marginBottom: '0.5rem' }}>
                      <strong>Question {idx + 1}:</strong> {questionText}
                      {modelAns && (
                        <div style={{ fontStyle: 'italic', color: 'var(--color-navy-soft)', marginTop: '0.2rem', paddingLeft: '0.5rem', borderLeft: '2px solid var(--color-border)' }}>
                          "{modelAns}"
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </>
          )}

          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Writing Task Model Answer
          </h4>
          <div style={{ fontStyle: 'italic', color: 'var(--color-navy-soft)', paddingLeft: '0.5rem', borderLeft: '2px solid var(--color-border)' }}>
            "{teacher.modelAnswer || lessonData?.writingTask?.modelAnswer}"
          </div>
        </div>
      </div>

      <div className="teacher-panel">
        <h3 className="teacher-panel__title">Model answer</h3>
        <div className="teacher-panel__content">
          <p>{modelAnswer}</p>
        </div>
      </div>

      <div className="teacher-panel">
        <h3 className="teacher-panel__title">Rubric</h3>
        <div className="teacher-panel__content">
          <div className="rubric-cards">
            {rubric.map((row, idx) => (
              <div key={row.criterion ?? row.category ?? idx} className="rubric-card">
                <h4 className="rubric-card__criterion">{row.criterion ?? row.category}</h4>
                <div className="rubric-card__levels">
                  <div className="rubric-card__level rubric-card__level--excellent">
                    <span className="rubric-card__label">Excellent</span>
                    <p>{row.excellent}</p>
                  </div>
                  <div className="rubric-card__level rubric-card__level--developing">
                    <span className="rubric-card__label">Developing</span>
                    <p>{row.developing}</p>
                  </div>
                  <div className="rubric-card__level rubric-card__level--beginning">
                    <span className="rubric-card__label">Beginning</span>
                    <p>{row.beginning}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="teacher-panel">
        <h3 className="teacher-panel__title">Teacher notes</h3>
        <div className="teacher-panel__content">
          <ul className="teacher-notes-list">
            {teacherNotes.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="teacher-panel">
        <h3 className="teacher-panel__title">Teaching script</h3>
        <div className="teacher-panel__content">
          {teachingScript.map((phase, index) => {
            const heading = phase.phase ?? phase.title ?? phase.heading ?? `Phase ${index + 1}`;
            const duration = phase.duration ?? phase.time ?? null;
            return (
              <div key={index} className="script-phase">
                <p className="script-phase__name">
                  {heading}
                  {duration && (
                    <span style={{ fontWeight: 400, fontSize: '0.82rem', color: 'var(--color-muted)', marginLeft: '0.5rem' }}>
                      ({duration})
                    </span>
                  )}
                </p>
                <ScriptBody phase={phase} />
              </div>
            );
          })}
        </div>
      </div>

      {readingGuide && (
        <div className="teacher-panel">
          <h3 className="teacher-panel__title">Detailed Reading Teaching Guide</h3>
          <div className="teacher-panel__content reading-guide">
            {/* 1. Teacher's Opening Script */}
            {readingGuide.openingScript && (
              <div className="guide-section">
                <h4 className="guide-section__subtitle">1. Teacher's Opening Script</h4>
                <div className="script-container">
                  {readingGuide.openingScript.map((item, index) => (
                    <div key={index} className="script-line">
                      <p className="script-line__english">{item.english}</p>
                      <p className="script-line__korean">{item.korean}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. Warm-up / Icebreaking Questions */}
            {(readingGuide.warmupGuide ?? readingGuide.warmUpDiscussion) && (
              <div className="guide-section">
                <h4 className="guide-section__subtitle">2. Warm-up / Icebreaking Questions</h4>
                <div className="warmup-guide-container">
                  {(readingGuide.warmupGuide ?? readingGuide.warmUpDiscussion).map((item, index) => {
                    // Support both old field names (korean / teacherFollowUp / teacherFollowUpKorean)
                    // and new field names (translation / followUp)
                    const koreanText = item.korean ?? item.translation ?? null;
                    const followUpText = item.teacherFollowUp ?? item.followUp ?? null;
                    const followUpKorean = item.teacherFollowUpKorean ?? null;
                    return (
                      <div key={index} className="warmup-guide-item">
                        <p className="warmup-question__english"><strong>Q{index + 1}:</strong> {item.question}</p>
                        {koreanText && <p className="warmup-question__korean">{koreanText}</p>}
                        {followUpText && (
                          <div className="warmup-followup">
                            <p className="warmup-followup__english">💡 <em>Follow-up:</em> {followUpText}</p>
                            {followUpKorean && <p className="warmup-followup__korean">{followUpKorean}</p>}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 3. Sentence-by-Sentence Passage Analysis */}
            {(readingGuide.sentenceAnalysis ?? readingGuide.sentences) && (
              <div className="guide-section">
                <h4 className="guide-section__subtitle">3. Sentence-by-Sentence Passage Analysis</h4>
                <div className="sentence-analysis-container">
                  {(readingGuide.sentenceAnalysis ?? readingGuide.sentences).map((sentence) => (
                    <div key={sentence.sentenceNumber} className="sentence-analysis-card">
                      <div className="sentence-analysis-card__header">
                        <span className="sentence-number">Sentence {sentence.sentenceNumber}</span>
                        <p className="sentence-original">"{sentence.original}"</p>
                      </div>
                      
                      <div className="analysis-block">
                        <h5 className="analysis-block__title">A. English Chunk Reading</h5>
                        <p className="chunk-reading">{sentence.chunkReading}</p>
                      </div>
                      
                      <div className="analysis-block">
                        <h5 className="analysis-block__title">B. Direct Korean Translation</h5>
                        <p className="direct-korean">{sentence.directKorean}</p>
                      </div>
                      
                      <div className="analysis-block">
                        <h5 className="analysis-block__title">C. Natural Korean Translation</h5>
                        <p className="natural-korean">{sentence.naturalKorean}</p>
                      </div>

                      {sentence.mustKnowChunks && sentence.mustKnowChunks.length > 0 && (
                        <div className="analysis-block">
                          <h5 className="analysis-block__title">D. Must-Know Chunks</h5>
                          <div className="must-know-chunks-list">
                            {sentence.mustKnowChunks.map((c, i) => (
                              <div key={i} className="must-know-chunk-item">
                                <p className="chunk-text"><strong>{c.chunk}</strong>: {c.meaning}</p>
                                {c.use && <p className="chunk-use"><em>Use:</em> {c.use}</p>}
                                {c.example && <p className="chunk-example"><em>Example:</em> "{c.example}"</p>}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {sentence.mustKnowGrammar && (
                        <div className="analysis-block">
                          <h5 className="analysis-block__title">E. Must-Know Grammar</h5>
                          <p className="grammar-text">{sentence.mustKnowGrammar}</p>
                        </div>
                      )}

                      {sentence.feynmanExplanation && (
                        <div className="analysis-block">
                          <h5 className="analysis-block__title">F. Feynman Explanation</h5>
                          <p className="feynman-text">{sentence.feynmanExplanation}</p>
                        </div>
                      )}

                      {sentence.teachingTranscript && sentence.teachingTranscript.length > 0 && (
                        <div className="analysis-block">
                          <h5 className="analysis-block__title">G. Teaching Transcript</h5>
                          <div className="teaching-transcript-list">
                            {sentence.teachingTranscript.map((t, i) => (
                              <div key={i} className="transcript-item">
                                <p className="transcript-item__english">{t.english}</p>
                                <p className="transcript-item__korean">{t.korean}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Final Writing Support */}
            {readingGuide.finalWritingSupport && (
              <div className="guide-section" style={{ marginTop: '2rem' }}>
                <h4 className="guide-section__subtitle">4. Final Writing Support</h4>
                <div className="writing-support-container" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  
                  {readingGuide.finalWritingSupport.sentenceFrames && (
                    <div className="analysis-block">
                      <h5 className="analysis-block__title">Sentence Frames</h5>
                      <ul style={{ margin: '0.5rem 0 0', paddingLeft: '1.25rem', lineHeight: '1.5' }}>
                        {readingGuide.finalWritingSupport.sentenceFrames.map((frame, index) => (
                          <li key={index} style={{ marginBottom: '0.25rem' }}>{frame}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {readingGuide.finalWritingSupport.usefulConnectors && (
                    <div className="analysis-block">
                      <h5 className="analysis-block__title">Useful Connectors</h5>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                        {readingGuide.finalWritingSupport.usefulConnectors.map((conn, index) => (
                          <span key={index} style={{ padding: '0.25rem 0.5rem', backgroundColor: 'var(--color-cream)', borderRadius: '4px', fontSize: '0.85rem', border: '1px solid #e0d5c8' }}>
                            {conn}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {readingGuide.finalWritingSupport.usefulVocabulary && (
                    <div className="analysis-block">
                      <h5 className="analysis-block__title">Useful Vocabulary</h5>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                        {readingGuide.finalWritingSupport.usefulVocabulary.map((vocab, index) => (
                          <span key={index} style={{ padding: '0.25rem 0.5rem', backgroundColor: 'var(--color-cream)', borderRadius: '4px', fontSize: '0.85rem', border: '1px solid #e0d5c8' }}>
                            {vocab}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {readingGuide.finalWritingSupport.paragraphOutline && (
                    <div className="analysis-block">
                      <h5 className="analysis-block__title">One Paragraph Outline</h5>
                      <ol style={{ margin: '0.5rem 0 0', paddingLeft: '1.25rem', lineHeight: '1.5' }}>
                        {readingGuide.finalWritingSupport.paragraphOutline.map((step, index) => (
                          <li key={index} style={{ marginBottom: '0.25rem' }}>{step}</li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {readingGuide.finalWritingSupport.commonMistakes && (
                    <div className="analysis-block">
                      <h5 className="analysis-block__title">Common Mistakes (Korean ESL Students)</h5>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
                        {readingGuide.finalWritingSupport.commonMistakes.map((item, index) => (
                          <div key={index} style={{ padding: '0.5rem', borderRadius: '6px', backgroundColor: 'var(--color-cream)', borderLeft: '3px solid #d9534f' }}>
                            <p style={{ margin: '0 0 4px', fontWeight: 600, color: '#d9534f' }}>❌ Mistake: {item.mistake}</p>
                            <p style={{ margin: '0', fontWeight: 600, color: '#5cb85c' }}>👉 Correction: {item.correction}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {readingGuide.finalWritingSupport.teacherCorrectionFocus && (
                    <div className="analysis-block">
                      <h5 className="analysis-block__title">Teacher Correction Focus</h5>
                      <ul style={{ margin: '0.5rem 0 0', paddingLeft: '1.25rem', lineHeight: '1.5' }}>
                        {readingGuide.finalWritingSupport.teacherCorrectionFocus.map((focus, index) => (
                          <li key={index} style={{ marginBottom: '0.25rem' }}>{focus}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}