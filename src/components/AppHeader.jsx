export default function AppHeader({ label = 'OFS Grade 9 · International English' }) {
  return (
    <header className="app-header">
      <div className="app-header__inner">
        <span className="app-header__brand">{label}</span>
      </div>
    </header>
  );
}