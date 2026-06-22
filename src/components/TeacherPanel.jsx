export default function TeacherPanel({ teacher }) {
  const { answerKey, modelAnswer, rubric, teacherNotes, teachingScript } = teacher;

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
            {rubric.map((row) => (
              <div key={row.criterion} className="rubric-card">
                <h4 className="rubric-card__criterion">{row.criterion}</h4>
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
          {teachingScript.map((phase, index) => (
            <div key={index} className="script-phase">
              <p className="script-phase__name">{phase.phase}</p>
              <p>{phase.script}</p>
            </div>
          ))}
        </div>
      </div>

      {teacher.teacherReadingGuide && (
        <div className="teacher-panel">
          <h3 className="teacher-panel__title">Detailed Reading Teaching Guide</h3>
          <div className="teacher-panel__content reading-guide">
            {/* 1. Teacher's Opening Script */}
            {teacher.teacherReadingGuide.openingScript && (
              <div className="guide-section">
                <h4 className="guide-section__subtitle">1. Teacher's Opening Script</h4>
                <div className="script-container">
                  {teacher.teacherReadingGuide.openingScript.map((item, index) => (
                    <div key={index} className="script-line">
                      <p className="script-line__english">{item.english}</p>
                      <p className="script-line__korean">{item.korean}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. Warm-up / Icebreaking Questions */}
            {teacher.teacherReadingGuide.warmupGuide && (
              <div className="guide-section">
                <h4 className="guide-section__subtitle">2. Warm-up / Icebreaking Questions</h4>
                <div className="warmup-guide-container">
                  {teacher.teacherReadingGuide.warmupGuide.map((item, index) => (
                    <div key={index} className="warmup-guide-item">
                      <p className="warmup-question__english"><strong>Q{index + 1}:</strong> {item.question}</p>
                      <p className="warmup-question__korean">{item.korean}</p>
                      {item.teacherFollowUp && (
                        <div className="warmup-followup">
                          <p className="warmup-followup__english">💡 <em>Follow-up:</em> {item.teacherFollowUp}</p>
                          <p className="warmup-followup__korean">{item.teacherFollowUpKorean}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Sentence-by-Sentence Passage Analysis */}
            {teacher.teacherReadingGuide.sentenceAnalysis && (
              <div className="guide-section">
                <h4 className="guide-section__subtitle">3. Sentence-by-Sentence Passage Analysis</h4>
                <div className="sentence-analysis-container">
                  {teacher.teacherReadingGuide.sentenceAnalysis.map((sentence) => (
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
          </div>
        </div>
      )}
    </div>
  );
}