export default function RuleBasedWritingCheck({ feedback }) {
  if (!feedback || feedback.length === 0) return null;

  const getBadgeStyle = (status) => {
    switch (status) {
      case 'good':
        return {
          bg: '#e8f5ec',
          color: '#2e7d32',
          icon: '✓',
          label: 'Good'
        };
      case 'try-this':
        return {
          bg: '#fff8e1',
          color: '#f57f17',
          icon: '△',
          label: 'Try this'
        };
      case 'missing':
      default:
        return {
          bg: '#ffebee',
          color: '#c62828',
          icon: '✗',
          label: 'Missing'
        };
    }
  };

  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <h4 
        style={{
          fontSize: '0.9rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: 'var(--color-navy)',
          marginBottom: '0.75rem',
          borderBottom: '1px solid var(--color-border)',
          paddingBottom: '0.25rem'
        }}
      >
        Rule-based Writing Check
      </h4>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {feedback.map((item, idx) => {
          const badge = getBadgeStyle(item.status);
          return (
            <li 
              key={idx} 
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.5rem',
                fontSize: '0.9rem',
                lineHeight: '1.4'
              }}
            >
              <span 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '1.25rem',
                  height: '1.25rem',
                  borderRadius: '50%',
                  backgroundColor: badge.bg,
                  color: badge.color,
                  fontWeight: 'bold',
                  fontSize: '0.75rem',
                  flexShrink: 0,
                  marginTop: '0.1rem'
                }}
              >
                {badge.icon}
              </span>
              <span style={{ color: 'var(--color-ink)' }}>
                <strong>{badge.label}:</strong> {item.text}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
