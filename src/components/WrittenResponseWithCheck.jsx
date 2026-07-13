import { useState } from 'react';
import RuleBasedWritingCheck from './RuleBasedWritingCheck';
import ModelAnswerReveal from './ModelAnswerReveal';
import {
  generateEvidenceFeedback,
  generateShortAnswerFeedback,
  generateParagraphFeedback
} from '../utils/ruleBasedWritingCheck';

export default function WrittenResponseWithCheck({
  id,
  value,
  onChange,
  disabled,
  placeholder,
  rows = 3,
  modelAnswer,
  compareTip,
  revisionTips,
  checkType = 'short',
  checkSettings = {},
  articleText = '',
  onCheck,
  showWordCount = false
}) {
  const [hasChecked, setHasChecked] = useState(false);
  const [localFeedback, setLocalFeedback] = useState([]);

  // Word count helper
  const wordCount = value.trim().split(/\s+/).filter(Boolean).length;

  const handleCheckClick = () => {
    if (!value.trim()) return;

    let feedback = [];
    if (checkType === 'evidence') {
      feedback = generateEvidenceFeedback(value, modelAnswer, articleText);
    } else if (checkType === 'short') {
      feedback = generateShortAnswerFeedback(value, checkSettings);
    } else if (checkType === 'paragraph') {
      feedback = generateParagraphFeedback(value, checkSettings);
    }

    setLocalFeedback(feedback);
    setHasChecked(true);

    if (onCheck) {
      onCheck(id, feedback);
    }
  };

  return (
    <div className="written-response-with-check" style={{ marginBottom: '1.5rem' }}>
      <textarea
        className="text-area"
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        style={{ width: '100%', marginBottom: '0.5rem' }}
      />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        {showWordCount ? (
          <p className="word-count" style={{ margin: 0 }}>
            {wordCount} {wordCount === 1 ? 'word' : 'words'}
          </p>
        ) : (
          <div />
        )}
        
        <button
          onClick={handleCheckClick}
          disabled={!value.trim() || disabled}
          className="btn-primary"
          style={{
            padding: '0.45rem 1.25rem',
            fontSize: '0.875rem',
            borderRadius: '999px',
            background: 'linear-gradient(135deg, var(--color-sage) 0%, var(--color-navy-soft) 100%)',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
          }}
        >
          Check & Compare
        </button>
      </div>

      {hasChecked && (
        <div 
          className="feedback-reveal-container" 
          style={{
            marginTop: '1rem',
            padding: '1.25rem',
            backgroundColor: '#fafaf9',
            border: '1px solid var(--color-border)',
            borderRadius: '12px',
            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.02)',
            animation: 'fadeIn 0.3s ease-in-out'
          }}
        >
          {/* 1. Rule-Based Writing Check */}
          <RuleBasedWritingCheck feedback={localFeedback} />

          {/* 2. Model Answer */}
          <ModelAnswerReveal modelAnswer={modelAnswer} />


          {/* 3. Compare Your Answer */}
          {(compareTip || checkType === 'paragraph') && (
            <div style={{ marginBottom: revisionTips && revisionTips.length > 0 ? '1.25rem' : '0' }}>
              <h4 
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: 'var(--color-navy)',
                  marginBottom: '0.5rem'
                }}
              >
                Compare your answer
              </h4>
              {checkType === 'paragraph' ? (
                <ol style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.875rem', color: 'var(--color-muted)', lineHeight: '1.5' }}>
                  <li>Did you answer the exact question?</li>
                  <li>Did you include evidence from the article?</li>
                  <li>Did you explain your idea clearly?</li>
                  <li>Did you use the target language from today’s lesson?</li>
                </ol>
              ) : (
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-muted)', lineHeight: '1.5' }}>
                  {compareTip || 'Compare your answer to check for clarity, vocabulary, and grammar.'}
                </p>
              )}
            </div>
          )}

          {/* 4. Revision Tips */}
          {revisionTips && revisionTips.length > 0 && (
            <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--color-border)' }}>
              <h4 
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: 'var(--color-coral-dark)',
                  marginBottom: '0.5rem'
                }}
              >
                Revision Tips
              </h4>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.875rem', color: 'var(--color-muted)', lineHeight: '1.5' }}>
                {revisionTips.map((tip, idx) => (
                  <li key={idx} style={{ marginBottom: '0.25rem' }}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
