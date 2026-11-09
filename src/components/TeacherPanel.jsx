// ─── helpers ────────────────────────────────────────────────────────────────

/**
 * Safely format an answer value which might be a primitive, an object with
 * rationale/correctIndex/modelAnswer, or null/undefined. Never returns an object
 * to prevent React crash.
 */
function renderAnswerValue(val) {
  if (val === undefined || val === null) return '—';
  if (typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean') {
    return String(val);
  }
  if (typeof val === 'object') {
    if (val.rationale) {
      const prefix = (val.correctIndex !== undefined && !String(val.rationale).startsWith('Option'))
        ? `Option ${typeof val.correctIndex === 'number' ? String.fromCharCode(65 + val.correctIndex) : val.correctIndex} — `
        : '';
      return `${prefix}${val.rationale}`;
    }
    if (val.modelAnswer) return String(val.modelAnswer);
    if (val.answer) return String(val.answer);
    if (val.correctIndex !== undefined) {
      return `Option ${typeof val.correctIndex === 'number' ? String.fromCharCode(65 + val.correctIndex) : val.correctIndex}`;
    }
    if (val.text || val.statement) return String(val.text || val.statement);
    return JSON.stringify(val);
  }
  return String(val);
}

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

  return (
    <div style={{ marginTop: '0.4rem', lineHeight: '1.65' }}>
      {phase.objective && (
        <p style={{ margin: '0 0 0.25rem', fontSize: '0.92rem' }}>
          <strong>Objective:</strong> {phase.objective}
        </p>
      )}
      {raw && (Array.isArray(raw) ? (
        <ul style={{ margin: '0.25rem 0', paddingLeft: '1.25rem' }}>
          {raw.map((item, i) => (
            <li key={i} style={{ marginBottom: '0.25rem' }}>{typeof item === 'object' ? JSON.stringify(item) : item}</li>
          ))}
        </ul>
      ) : (
        <p style={{ margin: '0 0 0.25rem' }}>{typeof raw === 'object' ? JSON.stringify(raw) : raw}</p>
      ))}
      {phase.teacherActions && phase.teacherActions !== raw && (
        <p style={{ margin: '0 0 0.25rem', fontSize: '0.92rem' }}>
          <strong>Teacher Actions:</strong> {typeof phase.teacherActions === 'object' ? JSON.stringify(phase.teacherActions) : phase.teacherActions}
        </p>
      )}
      {phase.scriptEn && (
        <p style={{ margin: '0 0 0.25rem', fontSize: '0.92rem', color: 'var(--color-navy)' }}>
          <strong>Teacher Script (EN):</strong> &ldquo;{phase.scriptEn}&rdquo;
        </p>
      )}
      {phase.scriptKo && (
        <p style={{ margin: '0 0 0.25rem', fontSize: '0.9rem', color: 'var(--color-navy-soft)' }}>
          <strong>Teacher Script (KO):</strong> &ldquo;{phase.scriptKo}&rdquo;
        </p>
      )}
      {phase.studentActions && (
        <p style={{ margin: '0 0 0.25rem', fontSize: '0.92rem' }}>
          <strong>Expected Student Actions:</strong> {typeof phase.studentActions === 'object' ? JSON.stringify(phase.studentActions) : phase.studentActions}
        </p>
      )}
      {phase.misconception && (
        <p style={{ margin: '0 0 0.25rem', fontSize: '0.9rem', color: '#b45309' }}>
          <strong>Likely Misconception:</strong> {phase.misconception}
        </p>
      )}
      {phase.correctiveFeedback && (
        <p style={{ margin: '0 0 0.25rem', fontSize: '0.9rem', color: '#15803d' }}>
          <strong>Corrective Feedback:</strong> {phase.correctiveFeedback}
        </p>
      )}
      {phase.transition && (
        <p style={{ margin: '0', fontSize: '0.9rem', fontStyle: 'italic', color: 'var(--color-muted)' }}>
          <strong>Transition:</strong> {phase.transition}
        </p>
      )}
    </div>
  );
}

// ─── component ───────────────────────────────────────────────────────────────

export default function TeacherPanel({ teacher, lessonData }) {
  if (!teacher) return null;
  const answerKey = teacher.answerKey || {};
  const modelAnswer = teacher.modelAnswer || '';

  // Rubric: can be an Array or an Object ({ title, categories: [...] })
  const rubricList = Array.isArray(teacher.rubric)
    ? teacher.rubric
    : Array.isArray(teacher.rubric?.categories)
      ? teacher.rubric.categories
      : [];
  const rubricTitle = teacher.rubric?.title || null;

  const teacherNotes = Array.isArray(teacher.teacherNotes) ? teacher.teacherNotes : [];
  const teachingScript = Array.isArray(teacher.teachingScript) ? teacher.teachingScript : [];

  // Accept either "teacherReadingGuide" (old lessons) or "detailedReadingGuide" (Cubism+) or top-level properties
  const readingGuide = teacher.teacherReadingGuide ?? teacher.detailedReadingGuide ?? null;

  const openingScript = teacher.teachersOpeningScript ?? teacher.openingScript ?? readingGuide?.openingScript ?? null;
  const rawWarmup = teacher.warmUpTeacherGuide ?? readingGuide?.warmupGuide ?? readingGuide?.warmUpDiscussion ?? null;
  const warmupList = Array.isArray(rawWarmup)
    ? rawWarmup
    : rawWarmup && typeof rawWarmup === 'object'
      ? Object.entries(rawWarmup).map(([key, val], idx) => ({
          question: lessonData?.warmUp?.questions?.[idx]?.question || val.question || val.focus || `Question ${idx + 1}`,
          focus: val.focus,
          teacherTalk: val.teacherTalk,
          sampleAnswer: val.sampleStudentAnswer || val.sampleAnswer,
          followUp: val.followUpQuestion || val.followUp || val.teacherFollowUp,
          korean: val.korean || val.translation,
          likelyResponses: val.likelyResponses,
          usefulLanguage: val.usefulLanguage,
          caution: val.caution,
          purpose: val.purpose,
        }))
      : [];

  const sourceReadingGuide = teacher.sourceReadingGuide ?? readingGuide?.sourceReadingGuide ?? readingGuide?.sourceLayoutNote ?? null;
  const sentenceAnalysis = readingGuide?.sentenceAnalysis ?? readingGuide?.sentences ?? teacher.sentenceAnalysis ?? teacher.detailedReadingGuide?.sentenceAnalysis ?? null;
  const finalWritingSupport = teacher.finalWritingSupport ?? readingGuide?.finalWritingSupport ?? null;
  const hasReadingGuide = !!(openingScript || warmupList.length > 0 || sourceReadingGuide || (Array.isArray(sentenceAnalysis) && sentenceAnalysis.length > 0) || finalWritingSupport);

  // Normalize Comprehension entries
  let comprehensionEntries = [];
  if (Array.isArray(answerKey.readingComprehension)) {
    comprehensionEntries = answerKey.readingComprehension.map((item, idx) => ({
      id: item.id || `rc${idx + 1}`,
      value: renderAnswerValue(item)
    }));
  } else if (answerKey.readingComprehension && typeof answerKey.readingComprehension === 'object') {
    comprehensionEntries = Object.entries(answerKey.readingComprehension).map(([id, value]) => ({
      id,
      value: renderAnswerValue(value)
    }));
  }

  // Normalize Evidence entries
  let evidenceEntries = [];
  if (Array.isArray(answerKey.evidenceFromText)) {
    evidenceEntries = answerKey.evidenceFromText.map((item, idx) => ({
      id: item.id || `ev${idx + 1}`,
      value: renderAnswerValue(item)
    }));
  } else if (answerKey.evidenceFromText && typeof answerKey.evidenceFromText === 'object') {
    evidenceEntries = Object.entries(answerKey.evidenceFromText).map(([id, value]) => ({
      id,
      value: renderAnswerValue(value)
    }));
  }

  // Normalize Language Focus
  let languageFocusDisplay = '';
  if (Array.isArray(answerKey.languageFocus)) {
    languageFocusDisplay = answerKey.languageFocus
      .map(item => (typeof item === 'object' ? (item.explanation || item.structure || JSON.stringify(item)) : String(item)))
      .join('; ');
  } else if (answerKey.languageFocus && typeof answerKey.languageFocus === 'object') {
    languageFocusDisplay = Object.values(answerKey.languageFocus)
      .map(item => (typeof item === 'object' ? (item.explanation || item.structure || JSON.stringify(item)) : String(item)))
      .join('; ');
  } else if (answerKey.languageFocus) {
    languageFocusDisplay = String(answerKey.languageFocus);
  }

  return (
    <div className="teacher-page">
      <div className="teacher-panel">
        <h3 className="teacher-panel__title">Answer key</h3>
        <div className="teacher-panel__content">
          <div className="answer-key-item">
            <div className="answer-key-item__label">Main idea</div>
            <div className="answer-key-item__value">{renderAnswerValue(answerKey.mainIdea)}</div>
          </div>
          {comprehensionEntries.map(({ id, value }) => (
            <div key={id} className="answer-key-item">
              <div className="answer-key-item__label">Comprehension — {id}</div>
              <div className="answer-key-item__value">{value}</div>
            </div>
          ))}
          {evidenceEntries.map(({ id, value }) => (
            <div key={id} className="answer-key-item">
              <div className="answer-key-item__label">Evidence — {id}</div>
              <div className="answer-key-item__value">{value}</div>
            </div>
          ))}
          {languageFocusDisplay && (
            <div className="answer-key-item">
              <div className="answer-key-item__label">Language focus</div>
              <div className="answer-key-item__value">
                {languageFocusDisplay}
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
            {lessonData?.evidenceFromText?.prompts?.map((prompt, idx) => {
              const promptText = prompt.question || prompt.statement || prompt.prompt || `Prompt ${idx + 1}`;
              const promptModel = prompt.modelAnswer ||
                (Array.isArray(teacher.answerKey?.evidenceFromText)
                  ? teacher.answerKey.evidenceFromText.find(e => e.id === prompt.id)?.modelAnswer
                  : (typeof teacher.answerKey?.evidenceFromText === 'object' ? teacher.answerKey?.evidenceFromText?.[prompt.id] : ''));

              return (
                <li key={prompt.id || idx} style={{ marginBottom: '0.5rem' }}>
                  <strong>Prompt {idx + 1}:</strong> {promptText}
                  {promptModel && (
                    <div style={{ fontStyle: 'italic', color: 'var(--color-navy-soft)', marginTop: '0.2rem', paddingLeft: '0.5rem', borderLeft: '2px solid var(--color-border)' }}>
                      "{typeof promptModel === 'object' ? renderAnswerValue(promptModel) : promptModel}"
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          {(lessonData?.writingPractice || lessonData?.speakingPractice)?.prompts?.length > 0 && (
            <>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Writing Practice Model Answers
              </h4>
              <ul style={{ paddingLeft: '1.25rem', marginBottom: '1.25rem' }}>
                {(lessonData.writingPractice || lessonData.speakingPractice).prompts.map((prompt, idx) => {
                  const questionText = typeof prompt === 'string' ? prompt : (prompt.question || prompt.prompt || `Question ${idx + 1}`);
                  const promptId = typeof prompt === 'string' ? `wp${idx + 1}` : (prompt.id || `wp${idx + 1}`);
                  const modelAns = typeof prompt === 'string' ? '' : (prompt.modelAnswer || '');

                  return (
                    <li key={promptId} style={{ marginBottom: '0.5rem' }}>
                      <strong>Question {idx + 1}:</strong> {questionText}
                      {modelAns && (
                        <div style={{ fontStyle: 'italic', color: 'var(--color-navy-soft)', marginTop: '0.2rem', paddingLeft: '0.5rem', borderLeft: '2px solid var(--color-border)' }}>
                          "{typeof modelAns === 'object' ? renderAnswerValue(modelAns) : modelAns}"
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
            "{typeof teacher.modelAnswer === 'object' ? (teacher.modelAnswer.finalWritingTask || teacher.modelAnswer.modelAnswer || JSON.stringify(teacher.modelAnswer)) : (teacher.modelAnswer || lessonData?.writingTask?.modelAnswer || '')}"
          </div>
        </div>
      </div>

      <div className="teacher-panel">
        <h3 className="teacher-panel__title">Model answer</h3>
        <div className="teacher-panel__content">
          <p>{typeof modelAnswer === 'object' ? (modelAnswer.finalWritingTask || modelAnswer.modelAnswer || JSON.stringify(modelAnswer)) : modelAnswer}</p>
        </div>
      </div>

      {rubricList.length > 0 && (
        <div className="teacher-panel">
          <h3 className="teacher-panel__title">Rubric</h3>
          <div className="teacher-panel__content">
            {rubricTitle && (
              <p style={{ fontWeight: 600, color: 'var(--color-navy)', marginBottom: '1rem' }}>
                {rubricTitle}
              </p>
            )}
            <div className="rubric-cards">
              {rubricList.map((row, idx) => {
                const criterionTitle = row.criterion ?? row.category ?? row.name ?? `Category ${idx + 1}`;
                const excellentText = row.excellent ?? row.score4 ?? '';
                const developingText = row.developing ?? (
                  row.score3 && row.score2
                    ? `[Score 3] ${row.score3}\n\n[Score 2] ${row.score2}`
                    : (row.score3 || row.score2 || '')
                );
                const beginningText = row.beginning ?? row.score1 ?? '';

                return (
                  <div key={criterionTitle + idx} className="rubric-card">
                    <h4 className="rubric-card__criterion">{criterionTitle}</h4>
                    {row.description && (
                      <p style={{ fontSize: '0.86rem', color: 'var(--color-muted)', marginBottom: '0.75rem', fontStyle: 'italic' }}>
                        {row.description}
                      </p>
                    )}
                    <div className="rubric-card__levels">
                      <div className="rubric-card__level rubric-card__level--excellent">
                        <span className="rubric-card__label">{row.score4 ? 'Score 4 (Excellent)' : 'Excellent'}</span>
                        <p style={{ whiteSpace: 'pre-line' }}>{excellentText}</p>
                      </div>
                      <div className="rubric-card__level rubric-card__level--developing">
                        <span className="rubric-card__label">{row.score3 ? 'Score 3 / 2 (Developing)' : 'Developing'}</span>
                        <p style={{ whiteSpace: 'pre-line' }}>{developingText}</p>
                      </div>
                      <div className="rubric-card__level rubric-card__level--beginning">
                        <span className="rubric-card__label">{row.score1 ? 'Score 1 (Beginning)' : 'Beginning'}</span>
                        <p style={{ whiteSpace: 'pre-line' }}>{beginningText}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <div className="teacher-panel">
        <h3 className="teacher-panel__title">Teacher notes</h3>
        <div className="teacher-panel__content">
          <ul className="teacher-notes-list">
            {teacherNotes.map((note, index) => (
              <li key={index}>
                {typeof note === 'string'
                  ? note
                  : note && typeof note === 'object' && (note.topic || note.note)
                    ? <><strong>{note.topic ? `${note.topic}: ` : ''}</strong>{note.note || JSON.stringify(note)}</>
                    : JSON.stringify(note)}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="teacher-panel">
        <h3 className="teacher-panel__title">Teaching script</h3>
        <div className="teacher-panel__content">
          {teachingScript.map((phase, index) => {
            const heading = (phase.phase && phase.phaseName)
              ? `Phase ${phase.phase}: ${phase.phaseName}`
              : (phase.phase ?? phase.title ?? phase.heading ?? `Phase ${index + 1}`);
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

      {hasReadingGuide && (
        <div className="teacher-panel">
          <h3 className="teacher-panel__title">Detailed Reading Teaching Guide</h3>
          <div className="teacher-panel__content reading-guide">
            {/* 1. Teacher's Opening Script */}
            {openingScript && (
              <div className="guide-section">
                <h4 className="guide-section__subtitle">1. Teacher's Opening Script</h4>
                <div className="script-container">
                  {(Array.isArray(openingScript) ? openingScript : Object.values(openingScript)).map((item, index) => {
                    const label = item.label || item.option || item.title || null;
                    const purpose = item.teachingPurpose || item.purpose || null;
                    return (
                      <div key={index} className="script-line">
                        {label && <p style={{ fontWeight: 700, color: 'var(--color-navy)', marginBottom: '0.25rem' }}>{label}</p>}
                        {item.english && <p className="script-line__english">{item.english}</p>}
                        {(item.korean ?? item.directKorean) && (
                          <p className="script-line__korean">{item.korean ?? item.directKorean}</p>
                        )}
                        {item.naturalKorean && (
                          <p className="script-line__korean" style={{ marginTop: '0.2rem' }}>{item.naturalKorean}</p>
                        )}
                        {purpose && (
                          <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', marginTop: '0.25rem' }}>
                            🎯 <em>Purpose:</em> {purpose}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 2. Warm-up / Icebreaking Questions */}
            {warmupList.length > 0 && (
              <div className="guide-section">
                <h4 className="guide-section__subtitle">2. Warm-up / Icebreaking Questions</h4>
                <div className="warmup-guide-container">
                  {warmupList.map((item, index) => {
                    const koreanText = item.korean ?? item.translation ?? null;
                    const followUpText = item.teacherFollowUp ?? item.followUp ?? item.followUpQuestion ?? (Array.isArray(item.followUps) ? item.followUps.join(' / ') : null);
                    const followUpKorean = item.teacherFollowUpKorean ?? null;
                    return (
                      <div key={index} className="warmup-guide-item">
                        <p className="warmup-question__english">
                          <strong>Q{index + 1}:</strong> {item.question || item.focus || `Question ${index + 1}`}
                        </p>
                        {item.focus && item.question && item.focus !== item.question && (
                          <p style={{ fontSize: '0.88rem', color: 'var(--color-navy-soft)', margin: '0.2rem 0' }}>
                            🎯 <em>Focus:</em> {item.focus}
                          </p>
                        )}
                        {item.teacherTalk && (
                          <div style={{ fontSize: '0.9rem', color: 'var(--color-navy)', margin: '0.35rem 0', paddingLeft: '0.6rem', borderLeft: '2px solid var(--color-sage)' }}>
                            <strong>Teacher Talk:</strong> {item.teacherTalk}
                          </div>
                        )}
                        {item.sampleAnswer && (
                          <div style={{ fontSize: '0.88rem', color: '#1e40af', margin: '0.3rem 0', fontStyle: 'italic' }}>
                            💬 <em>Sample Answer:</em> &ldquo;{item.sampleAnswer}&rdquo;
                          </div>
                        )}
                        {koreanText && <p className="warmup-question__korean">{koreanText}</p>}
                        {Array.isArray(item.likelyResponses) && item.likelyResponses.length > 0 && (
                          <div style={{ fontSize: '0.88rem', marginTop: '0.35rem', color: 'var(--color-navy-soft)' }}>
                            <strong>Likely responses:</strong> {item.likelyResponses.join(' | ')}
                          </div>
                        )}
                        {followUpText && (
                          <div className="warmup-followup">
                            <p className="warmup-followup__english">💡 <em>Follow-up:</em> {followUpText}</p>
                            {followUpKorean && <p className="warmup-followup__korean">{followUpKorean}</p>}
                          </div>
                        )}
                        {Array.isArray(item.usefulLanguage) && item.usefulLanguage.length > 0 && (
                          <div style={{ fontSize: '0.86rem', marginTop: '0.25rem', color: 'var(--color-navy-soft)' }}>
                            <strong>Useful language:</strong> {item.usefulLanguage.join(', ')}
                          </div>
                        )}
                        {item.caution && (
                          <div style={{ fontSize: '0.86rem', marginTop: '0.25rem', color: '#b45309' }}>
                            ⚠️ <em>Caution:</em> {item.caution}
                          </div>
                        )}
                        {item.purpose && (
                          <div style={{ fontSize: '0.86rem', marginTop: '0.25rem', color: 'var(--color-muted)' }}>
                            🎯 <em>Purpose:</em> {item.purpose}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 2b. Source Reading & Layout Guide */}
            {sourceReadingGuide && (
              <div className="guide-section">
                <h4 className="guide-section__subtitle">
                  {sourceReadingGuide.title || 'Source Reading & Layout Guide'}
                </h4>
                <div className="analysis-block" style={{ padding: '0.85rem 1rem', background: 'var(--color-cream)', borderRadius: '8px' }}>
                  {sourceReadingGuide.description && (
                    <p style={{ marginBottom: '0.5rem' }}>{sourceReadingGuide.description}</p>
                  )}
                  {Array.isArray(sourceReadingGuide.points) && (
                    <ul style={{ margin: '0.4rem 0 0', paddingLeft: '1.25rem', lineHeight: 1.6 }}>
                      {sourceReadingGuide.points.map((pt, pIdx) => (
                        <li key={pIdx} style={{ marginBottom: '0.3rem' }}>{pt}</li>
                      ))}
                    </ul>
                  )}
                  {Array.isArray(sourceReadingGuide.sections) && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '0.5rem' }}>
                      {sourceReadingGuide.sections.map((sec, sIdx) => (
                        <div key={sIdx} style={{ paddingLeft: '0.75rem', borderLeft: '3px solid var(--color-sage)' }}>
                          {sec.label && <p style={{ fontWeight: 700, margin: '0 0 0.2rem' }}>{sec.label}</p>}
                          {sec.notes && <p style={{ margin: 0, fontSize: '0.9rem' }}>{sec.notes}</p>}
                        </div>
                      ))}
                    </div>
                  )}
                  {/* For object-based sourceReadingGuide in recent lessons */}
                  {typeof sourceReadingGuide === 'object' && !Array.isArray(sourceReadingGuide) && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '0.5rem' }}>
                      {Object.entries(sourceReadingGuide)
                        .filter(([k]) => !['title', 'description', 'points', 'sections'].includes(k))
                        .map(([key, val]) => (
                          <div key={key} style={{ paddingLeft: '0.75rem', borderLeft: '3px solid var(--color-sage)' }}>
                            <p style={{ fontWeight: 700, margin: '0 0 0.2rem', textTransform: 'capitalize' }}>
                              {key.replace(/([A-Z])/g, ' $1')}
                            </p>
                            <p style={{ margin: 0, fontSize: '0.9rem' }}>
                              {typeof val === 'string' ? val : JSON.stringify(val)}
                            </p>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 3. Sentence-by-Sentence Passage Analysis */}
            {Array.isArray(sentenceAnalysis) && sentenceAnalysis.length > 0 && (
              <div className="guide-section">
                <h4 className="guide-section__subtitle">3. Sentence-by-Sentence Passage Analysis</h4>
                <div className="sentence-analysis-container">
                  {sentenceAnalysis.map((sentence) => (
                    <div key={sentence.sentenceNumber} className="sentence-analysis-card">
                      <div className="sentence-analysis-card__header">
                        <span className="sentence-number">Sentence {sentence.sentenceNumber}</span>
                        <p className="sentence-original">"{sentence.original}"</p>
                      </div>
                      
                      {sentence.chunkReading && (
                        <div className="analysis-block">
                          <h5 className="analysis-block__title">A. English Chunk Reading</h5>
                          <p className="chunk-reading">{sentence.chunkReading}</p>
                        </div>
                      )}
                      
                      {sentence.directKorean && (
                        <div className="analysis-block">
                          <h5 className="analysis-block__title">B. Direct Korean Translation</h5>
                          <p className="direct-korean">{sentence.directKorean}</p>
                        </div>
                      )}
                      
                      {sentence.naturalKorean && (
                        <div className="analysis-block">
                          <h5 className="analysis-block__title">C. Natural Korean Translation</h5>
                          <p className="natural-korean">{sentence.naturalKorean}</p>
                        </div>
                      )}

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
                          {sentence.feynmanExplanationKo && (
                            <p className="feynman-text" style={{ color: 'var(--color-navy-soft)', marginTop: '0.35rem', fontSize: '0.92rem' }}>
                              {sentence.feynmanExplanationKo}
                            </p>
                          )}
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
            {finalWritingSupport && (
              <div className="guide-section" style={{ marginTop: '2rem' }}>
                <h4 className="guide-section__subtitle">4. Final Writing Support</h4>
                <div className="writing-support-container" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  
                  {/* Sentence Frames / Starters */}
                  {(finalWritingSupport.sentenceFrames || finalWritingSupport.sentenceStarters) && (
                    <div className="analysis-block">
                      <h5 className="analysis-block__title">Sentence Frames & Starters</h5>
                      <ul style={{ margin: '0.5rem 0 0', paddingLeft: '1.25rem', lineHeight: '1.5' }}>
                        {(Array.isArray(finalWritingSupport.sentenceFrames || finalWritingSupport.sentenceStarters)
                          ? (finalWritingSupport.sentenceFrames || finalWritingSupport.sentenceStarters)
                          : Object.values(finalWritingSupport.sentenceFrames || finalWritingSupport.sentenceStarters).flat()
                        ).map((frame, index) => (
                          <li key={index} style={{ marginBottom: '0.25rem' }}>{frame}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Useful Vocabulary / Source Vocabulary */}
                  {(finalWritingSupport.usefulVocabulary || finalWritingSupport.sourceVocabulary) && (
                    <div className="analysis-block">
                      <h5 className="analysis-block__title">Source & Useful Vocabulary</h5>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                        {(finalWritingSupport.usefulVocabulary || finalWritingSupport.sourceVocabulary).map((vocab, index) => (
                          <span key={index} style={{ padding: '0.25rem 0.5rem', backgroundColor: 'var(--color-cream)', borderRadius: '4px', fontSize: '0.85rem', border: '1px solid #e0d5c8' }}>
                            {typeof vocab === 'string' ? vocab : JSON.stringify(vocab)}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Useful Connectors & Rhetorical Markers */}
                  {(finalWritingSupport.usefulConnectors || finalWritingSupport.contrastMarkers || finalWritingSupport.causeEffectLanguage || finalWritingSupport.attributionPhrases) && (
                    <div className="analysis-block">
                      <h5 className="analysis-block__title">Useful Connectors & Rhetorical Markers</h5>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                        {[
                          ...(finalWritingSupport.usefulConnectors || []),
                          ...(finalWritingSupport.contrastMarkers || []),
                          ...(finalWritingSupport.causeEffectLanguage || []),
                          ...(finalWritingSupport.attributionPhrases || [])
                        ].map((conn, index) => (
                          <span key={index} style={{ padding: '0.25rem 0.5rem', backgroundColor: 'var(--color-cream)', borderRadius: '4px', fontSize: '0.85rem', border: '1px solid #e0d5c8' }}>
                            {conn}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Paragraph Outline */}
                  {finalWritingSupport.paragraphOutline && (
                    <div className="analysis-block">
                      <h5 className="analysis-block__title">Paragraph Outline</h5>
                      <ol style={{ margin: '0.5rem 0 0', paddingLeft: '1.25rem', lineHeight: '1.5' }}>
                        {finalWritingSupport.paragraphOutline.map((step, index) => (
                          <li key={index} style={{ marginBottom: '0.25rem' }}>{step}</li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {/* Common Mistakes / Korean ESL Errors */}
                  {(finalWritingSupport.commonMistakes || finalWritingSupport.koreanEslErrorPairs) && (
                    <div className="analysis-block">
                      <h5 className="analysis-block__title">Common Mistakes (Korean ESL Students)</h5>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
                        {(finalWritingSupport.commonMistakes || finalWritingSupport.koreanEslErrorPairs).map((item, index) => (
                          <div key={index} style={{ padding: '0.6rem 0.8rem', borderRadius: '6px', backgroundColor: 'var(--color-cream)', borderLeft: '3px solid #d9534f' }}>
                            <p style={{ margin: '0 0 4px', fontWeight: 600, color: '#d9534f' }}>❌ Mistake: {item.mistake || item.error}</p>
                            <p style={{ margin: '0 0 4px', fontWeight: 600, color: '#15803d' }}>👉 Correction: {item.correction}</p>
                            {item.explanation && (
                              <p style={{ margin: '0', fontSize: '0.85rem', color: 'var(--color-muted)' }}>💡 <em>Explanation:</em> {item.explanation}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Teacher Correction Focus / Priorities */}
                  {(finalWritingSupport.teacherCorrectionFocus ?? finalWritingSupport.teacherCorrectionPriorities ?? finalWritingSupport.correctionPriorities) && (
                    <div className="analysis-block">
                      <h5 className="analysis-block__title">Teacher Correction Focus</h5>
                      <ul style={{ margin: '0.5rem 0 0', paddingLeft: '1.25rem', lineHeight: '1.5' }}>
                        {(finalWritingSupport.teacherCorrectionFocus ?? finalWritingSupport.teacherCorrectionPriorities ?? finalWritingSupport.correctionPriorities).map((focus, index) => (
                          <li key={index} style={{ marginBottom: '0.25rem' }}>{focus}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Differentiation / G1 Scaffold & G2 Extension */}
                  {(finalWritingSupport.differentiation || finalWritingSupport.g1Scaffold || finalWritingSupport.g2Extension) && (
                    <div className="analysis-block">
                      <h5 className="analysis-block__title">G1 Scaffold & G2 Extension</h5>
                      <div style={{ marginTop: '0.4rem', fontSize: '0.92rem', lineHeight: 1.55 }}>
                        {(finalWritingSupport.g1Scaffold || finalWritingSupport.differentiation?.g1Scaffold) && (
                          <p style={{ margin: '0 0 0.4rem' }}>
                            <strong>G1 Scaffold:</strong> {finalWritingSupport.g1Scaffold || finalWritingSupport.differentiation?.g1Scaffold}
                          </p>
                        )}
                        {(finalWritingSupport.g2Extension || finalWritingSupport.differentiation?.g2Extension) && (
                          <p style={{ margin: 0 }}>
                            <strong>G2 Extension:</strong> {finalWritingSupport.g2Extension || finalWritingSupport.differentiation?.g2Extension}
                          </p>
                        )}
                      </div>
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
