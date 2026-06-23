import { useState, useEffect } from 'react';
import { getCorrectAnswer, isAnswerCorrect } from '../utils/questionHelpers';

export default function StudentSubmissionsMonitor({ lessonSlug, lessonData }) {
  const [passcode, setPasscode] = useState(
    () => sessionStorage.getItem('teacher_passcode') || ''
  );
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [cloudStatus, setCloudStatus] = useState('idle'); // 'idle' | 'connected' | 'disconnected' | 'loading'
  const [expandedSubmissions, setExpandedSubmissions] = useState({});

  const savePasscode = (val) => {
    setPasscode(val);
    sessionStorage.setItem('teacher_passcode', val);
  };

  const loadSubmissions = async () => {
    if (!passcode.trim()) {
      setErrorMsg('Please enter the teacher passcode.');
      return;
    }
    setIsLoading(true);
    setErrorMsg('');
    setSubmissions([]);
    setCloudStatus('loading');

    try {
      const response = await fetch(
        `/api/submissions?lessonSlug=${lessonSlug}&teacherPasscode=${encodeURIComponent(
          passcode
        )}`
      );
      if (response.ok) {
        const data = await response.json();
        setSubmissions(data.submissions || []);
        setCloudStatus('connected');
      } else {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || `Server returned ${response.status}`);
      }
    } catch (err) {
      console.warn('Backend fetch failed, using local storage fallback:', err);
      // Fallback to local storage
      const key = `submissions_${lessonSlug}`;
      const localData = JSON.parse(localStorage.getItem(key) || '[]');
      setSubmissions(localData);
      setCloudStatus('disconnected');

      if (
        err.message.includes('passcode') ||
        err.message.includes('Passcode') ||
        err.message.includes('401')
      ) {
        setErrorMsg('Invalid passcode.');
      } else {
        setErrorMsg(
          'Submission monitoring is not connected yet. Check Cloudflare D1 binding and TEACHER_PASSCODE.'
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (passcode.trim()) {
      loadSubmissions();
    }
  }, [lessonSlug]);

  const toggleExpand = (id) => {
    setExpandedSubmissions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const exportToCSV = () => {
    if (!submissions || submissions.length === 0) return;
    const headers = [
      'Student Name',
      'Submitted At',
      'MCQ Score',
      'Main Idea Answer',
      'Writing Task Answer',
    ];
    const rows = submissions.map((s) => {
      const mcqResult = calculateMCQScore(s.payload || s);
      return [
        s.studentName,
        new Date(s.createdAt || s.submittedTimestamp).toLocaleString(),
        `${mcqResult.correctCount}/${mcqResult.totalCount}`,
        s.payload?.mainIdeaAnswer || '',
        s.payload?.finalWritingTaskAnswer || s.payload?.writingAnswer || '',
      ];
    });
    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [
        headers.join(','),
        ...rows.map((row) =>
          row.map((val) => `"${String(val).replace(/"/g, '""')}"`).join(',')
        ),
      ].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `submissions_${lessonSlug}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToJSON = () => {
    if (!submissions || submissions.length === 0) return;
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(submissions, null, 2));
    const link = document.createElement('a');
    link.setAttribute('href', dataStr);
    link.setAttribute('download', `submissions_${lessonSlug}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const calculateMCQScore = (payload) => {
    let correctCount = 0;
    let totalCount = 0;

    if (!payload) return { correctCount, totalCount };

    // Main idea
    if (lessonData.mainIdeaQuestion) {
      totalCount++;
      const correctAnswer = getCorrectAnswer(
        lessonData.mainIdeaQuestion,
        lessonData.teacher?.answerKey?.mainIdea
      );
      if (isAnswerCorrect(payload.mainIdeaAnswer, correctAnswer)) {
        correctCount++;
      }
    }

    // Reading comprehension
    if (lessonData.readingComprehension?.questions) {
      lessonData.readingComprehension.questions.forEach((q) => {
        totalCount++;
        const correctAnswer = getCorrectAnswer(
          q,
          lessonData.teacher?.answerKey?.readingComprehension?.[q.id]
        );
        const studentAns = payload.comprehensionAnswers?.[q.id];
        if (isAnswerCorrect(studentAns, correctAnswer)) {
          correctCount++;
        }
      });
    }

    return { correctCount, totalCount };
  };

  return (
    <div className="teacher-panel">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '2px solid #d4c4b0',
          paddingBottom: '0.5rem',
          marginBottom: '0.75rem',
          flexWrap: 'wrap',
          gap: '0.5rem',
        }}
      >
        <h3 className="teacher-panel__title" style={{ borderBottom: 'none', margin: 0 }}>
          Student Submissions Monitor
        </h3>
        {cloudStatus === 'connected' && (
          <span
            style={{
              fontSize: '0.75rem',
              backgroundColor: '#e8f5ec',
              color: '#5b8a72',
              padding: '0.2rem 0.5rem',
              borderRadius: '999px',
              fontWeight: 600,
            }}
          >
            ● Cloud Connected
          </span>
        )}
        {cloudStatus === 'disconnected' && (
          <span
            style={{
              fontSize: '0.75rem',
              backgroundColor: '#fdeeed',
              color: '#e07a5f',
              padding: '0.2rem 0.5rem',
              borderRadius: '999px',
              fontWeight: 600,
            }}
          >
            ● Local Mode
          </span>
        )}
      </div>

      <div className="teacher-panel__content">
        {/* Passcode Control Panel */}
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            alignItems: 'center',
            marginBottom: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <input
            type="password"
            className="text-input"
            placeholder="Enter teacher passcode"
            value={passcode}
            onChange={(e) => savePasscode(e.target.value)}
            style={{ maxWidth: '240px', padding: '0.5rem 0.75rem', fontSize: '0.9rem' }}
          />
          <button
            onClick={loadSubmissions}
            disabled={isLoading || !passcode.trim()}
            className="btn-primary"
            style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem', borderRadius: '8px' }}
          >
            {isLoading ? 'Loading...' : 'Load Submissions'}
          </button>
          {submissions.length > 0 && (
            <>
              <button
                onClick={loadSubmissions}
                disabled={isLoading}
                className="btn-primary"
                style={{
                  padding: '0.5rem 1.25rem',
                  fontSize: '0.9rem',
                  borderRadius: '8px',
                  backgroundColor: 'var(--color-navy)',
                }}
              >
                Refresh
              </button>
              <button
                onClick={exportToCSV}
                className="btn-primary"
                style={{
                  padding: '0.5rem 1.25rem',
                  fontSize: '0.9rem',
                  borderRadius: '8px',
                  backgroundColor: '#5b8a72',
                }}
              >
                Export CSV
              </button>
              <button
                onClick={exportToJSON}
                className="btn-primary"
                style={{
                  padding: '0.5rem 1.25rem',
                  fontSize: '0.9rem',
                  borderRadius: '8px',
                  backgroundColor: '#7f8c8d',
                }}
              >
                Export JSON
              </button>
            </>
          )}
        </div>

        {/* Setup/Connection warning */}
        {errorMsg && (
          <div
            className="quiz-feedback quiz-feedback--incorrect"
            style={{ marginBottom: '1rem', display: 'block' }}
          >
            <p className="quiz-feedback__mark" style={{ margin: 0 }}>
              {errorMsg.includes('passcode') ? 'Security Note' : 'Connection Note'}
            </p>
            <p className="quiz-feedback__explanation" style={{ margin: '4px 0 0', color: 'var(--color-ink)' }}>
              {errorMsg}
            </p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && submissions.length === 0 && (
          <p style={{ fontStyle: 'italic', color: 'var(--color-muted)', textAlign: 'center', padding: '1rem 0' }}>
            No submissions yet for this lesson.
          </p>
        )}

        {/* Submissions List */}
        {submissions.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            {submissions.map((sub) => {
              const payload = sub.payload || {};
              const mcqScore = calculateMCQScore(payload);
              const isExpanded = !!expandedSubmissions[sub.id];

              return (
                <div
                  key={sub.id}
                  className="rubric-card"
                  style={{ display: 'block', padding: '1.25rem', borderColor: '#d4c4b0' }}
                >
                  {/* Card Header (Clickable for expand/collapse) */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer',
                      flexWrap: 'wrap',
                      gap: '0.5rem',
                    }}
                    onClick={() => toggleExpand(sub.id)}
                  >
                    <div>
                      <strong style={{ color: 'var(--color-navy)', fontSize: '1.05rem' }}>
                        {sub.studentName}
                      </strong>
                      <span
                        style={{
                          fontSize: '0.8rem',
                          color: 'var(--color-muted)',
                          marginLeft: '0.75rem',
                        }}
                      >
                        {new Date(sub.createdAt || sub.submittedTimestamp).toLocaleString()}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span
                        className="feedback-panel__score"
                        style={{
                          marginBottom: 0,
                          fontSize: '0.75rem',
                          padding: '0.2rem 0.5rem',
                        }}
                      >
                        Score: {mcqScore.correctCount} / {mcqScore.totalCount}
                      </span>
                      <button
                        className="mode-toggle__btn mode-toggle__btn--active"
                        style={{
                          fontSize: '0.75rem',
                          padding: '0.25rem 0.6rem',
                          cursor: 'pointer',
                        }}
                      >
                        {isExpanded ? 'Hide Details' : 'Show Details'}
                      </button>
                    </div>
                  </div>

                  {/* Card Details (Collapsible Section) */}
                  {isExpanded && (
                    <div
                      style={{
                        marginTop: '1.25rem',
                        borderTop: '1px solid #e0d5c8',
                        paddingTop: '1rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                      }}
                    >
                      {/* 1. Main Idea Question */}
                      {lessonData.mainIdeaQuestion && (
                        <div style={{ paddingBottom: '0.75rem', borderBottom: '1px dashed #e0d5c8' }}>
                          <h5 style={{ margin: '0 0 0.5rem', fontSize: '0.85rem', color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                            Main Idea
                          </h5>
                          <p style={{ margin: '0 0 4px', fontWeight: 600, fontSize: '0.9rem' }}>
                            Q: {lessonData.mainIdeaQuestion.question}
                          </p>
                          <div style={{ fontSize: '0.9rem', padding: '0.5rem', borderRadius: '6px', backgroundColor: 'var(--color-cream)' }}>
                            <p style={{ margin: '0 0 4px' }}>
                              <strong>Student Answer:</strong> {payload.mainIdeaAnswer || <em style={{ color: 'var(--color-muted)' }}>None</em>}
                            </p>
                            <p style={{ margin: '0 0 4px' }}>
                              <strong>Correct Answer:</strong> {getCorrectAnswer(lessonData.mainIdeaQuestion, lessonData.teacher?.answerKey?.mainIdea)}
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '6px', fontSize: '0.85rem', fontWeight: 600 }}>
                              Result:{' '}
                              {isAnswerCorrect(payload.mainIdeaAnswer, getCorrectAnswer(lessonData.mainIdeaQuestion, lessonData.teacher?.answerKey?.mainIdea)) ? (
                                <span style={{ color: '#5b8a72' }}>O / Correct</span>
                              ) : (
                                <span style={{ color: '#e07a5f' }}>X / Try again</span>
                              )}
                            </div>
                            {lessonData.mainIdeaQuestion.explanation && (
                              <p style={{ margin: '6px 0 0', fontSize: '0.85rem', color: 'var(--color-muted)' }}>
                                <em>Explanation:</em> {lessonData.mainIdeaQuestion.explanation}
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {/* 2. Reading Comprehension */}
                      {lessonData.readingComprehension?.questions && (
                        <div style={{ paddingBottom: '0.75rem', borderBottom: '1px dashed #e0d5c8' }}>
                          <h5 style={{ margin: '0 0 0.5rem', fontSize: '0.85rem', color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                            Reading Comprehension
                          </h5>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {lessonData.readingComprehension.questions.map((q, idx) => {
                              const studentAns = payload.comprehensionAnswers?.[q.id];
                              const correctAns = getCorrectAnswer(q, lessonData.teacher?.answerKey?.readingComprehension?.[q.id]);
                              const isCorrect = isAnswerCorrect(studentAns, correctAns);

                              return (
                                <div key={q.id} style={{ fontSize: '0.9rem', padding: '0.5rem', borderRadius: '6px', backgroundColor: 'var(--color-cream)' }}>
                                  <p style={{ margin: '0 0 4px', fontWeight: 600 }}>
                                    {idx + 1}. {q.question}
                                  </p>
                                  <p style={{ margin: '0 0 4px' }}>
                                    <strong>Student Answer:</strong> {studentAns || <em style={{ color: 'var(--color-muted)' }}>None</em>}
                                  </p>
                                  <p style={{ margin: '0 0 4px' }}>
                                    <strong>Correct Answer:</strong> {correctAns}
                                  </p>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '6px', fontSize: '0.85rem', fontWeight: 600 }}>
                                    Result:{' '}
                                    {isCorrect ? (
                                      <span style={{ color: '#5b8a72' }}>O / Correct</span>
                                    ) : (
                                      <span style={{ color: '#e07a5f' }}>X / Try again</span>
                                    )}
                                  </div>
                                  {q.explanation && (
                                    <p style={{ margin: '6px 0 0', fontSize: '0.85rem', color: 'var(--color-muted)' }}>
                                      <em>Explanation:</em> {q.explanation}
                                    </p>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* 3. Evidence Written Answers */}
                      {lessonData.evidenceFromText?.prompts && (
                        <div style={{ paddingBottom: '0.75rem', borderBottom: '1px dashed #e0d5c8' }}>
                          <h5 style={{ margin: '0 0 0.5rem', fontSize: '0.85rem', color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                            Evidence Written Answers
                          </h5>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {lessonData.evidenceFromText.prompts.map((p, idx) => {
                              const studentAns = payload.evidenceAnswers?.[p.id];
                              const suggestedAns = lessonData.teacher?.answerKey?.evidenceFromText?.[p.id];

                              return (
                                <div key={p.id} style={{ fontSize: '0.9rem', padding: '0.5rem', borderRadius: '6px', backgroundColor: 'var(--color-cream)' }}>
                                  <p style={{ margin: '0 0 4px', fontWeight: 600 }}>
                                    {idx + 1}. {p.statement}
                                  </p>
                                  <p style={{ margin: '0 0 4px', whiteSpace: 'pre-wrap' }}>
                                    <strong>Student Answer:</strong> {studentAns || <em style={{ color: 'var(--color-muted)' }}>None</em>}
                                  </p>
                                  {suggestedAns && (
                                    <p style={{ margin: '4px 0 0', color: 'var(--color-muted)' }}>
                                      <strong>Suggested Answer:</strong> {suggestedAns}
                                    </p>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* 4. Writing Practice */}
                      {(lessonData.writingPractice || lessonData.speakingPractice) && (
                        <div style={{ paddingBottom: '0.75rem', borderBottom: '1px dashed #e0d5c8' }}>
                          <h5 style={{ margin: '0 0 0.5rem', fontSize: '0.85rem', color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                            Writing Practice
                          </h5>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {(lessonData.writingPractice || lessonData.speakingPractice).prompts.map((p, idx) => {
                              const questionText = typeof p === 'string' ? p : p.question;
                              const promptId = typeof p === 'string' ? `wp${idx + 1}` : (p.id || `wp${idx + 1}`);
                              const studentAns = payload.writingPracticeAnswers?.[promptId];

                              return (
                                <div key={promptId} style={{ fontSize: '0.9rem', padding: '0.5rem', borderRadius: '6px', backgroundColor: 'var(--color-cream)' }}>
                                  <p style={{ margin: '0 0 4px', fontWeight: 600 }}>
                                    {idx + 1}. {questionText}
                                  </p>
                                  <p style={{ margin: '0 0 4px', whiteSpace: 'pre-wrap' }}>
                                    <strong>Student Answer:</strong> {studentAns || <em style={{ color: 'var(--color-muted)' }}>None</em>}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* 5. Final Writing Task */}
                      {lessonData.writingTask && (
                        <div>
                          <h5 style={{ margin: '0 0 0.5rem', fontSize: '0.85rem', color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                            Final Writing Task
                          </h5>
                          <div style={{ fontSize: '0.9rem', padding: '0.5rem', borderRadius: '6px', backgroundColor: 'var(--color-cream)' }}>
                            <p style={{ margin: '0 0 6px', fontWeight: 600 }}>
                              Prompt: {lessonData.writingTask.prompt}
                            </p>
                            <div style={{ borderLeft: '3px solid var(--color-sage)', paddingLeft: '8px', margin: '8px 0', whiteSpace: 'pre-wrap', fontStyle: 'italic' }}>
                              {payload.finalWritingTaskAnswer || payload.writingAnswer || <em style={{ color: 'var(--color-muted)' }}>None</em>}
                            </div>
                            
                            {/* Word Count */}
                            <p style={{ fontSize: '0.8rem', color: 'var(--color-muted)', margin: '8px 0 4px' }}>
                              Word Count: {(payload.finalWritingTaskAnswer || payload.writingAnswer || '').trim().split(/\s+/).filter(Boolean).length} words
                            </p>

                            {/* Model Answer comparison */}
                            {lessonData.teacher?.modelAnswer && (
                              <div style={{ marginTop: '12px', borderTop: '1px dashed #e0d5c8', paddingTop: '8px' }}>
                                <strong style={{ display: 'block', marginBottom: '4px', fontSize: '0.85rem', color: 'var(--color-navy)' }}>
                                  Model Answer:
                                </strong>
                                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-navy-soft)' }}>
                                  {lessonData.teacher.modelAnswer}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
