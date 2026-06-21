export default function SectionCard({ icon, title, instructions, children }) {
  return (
    <section className="section-card">
      <div className="section-card__header">
        {icon && <span className="section-card__icon" aria-hidden="true">{icon}</span>}
        <h2>{title}</h2>
      </div>
      {instructions && (
        <p className="section-card__instructions">{instructions}</p>
      )}
      {children}
    </section>
  );
}