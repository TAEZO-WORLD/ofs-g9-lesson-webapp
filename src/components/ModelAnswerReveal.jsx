export default function ModelAnswerReveal({ modelAnswer }) {
  if (!modelAnswer) return null;

  return (
    <div 
      className="model-answer-reveal"
      style={{
        marginBottom: '1.25rem',
        padding: '1rem',
        backgroundColor: 'var(--color-cream)',
        border: '1px dashed var(--color-sage)',
        borderRadius: '8px'
      }}
    >
      <h4 
        className="model-answer-reveal__label"
        style={{
          fontSize: '0.8rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: 'var(--color-sage)',
          margin: '0 0 0.5rem 0'
        }}
      >
        Model Answer
      </h4>
      <p style={{ margin: 0, fontSize: '0.925rem', color: 'var(--color-navy-soft)', fontStyle: 'italic', lineHeight: '1.5' }}>
        {modelAnswer}
      </p>
    </div>
  );
}
