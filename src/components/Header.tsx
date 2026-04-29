import { useTheme } from '../hooks/useTheme';

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="app-header">
      <div>
        <h1>Mermaid Tool</h1>
        <span>Client-side diagram editor</span>
      </div>
      <button className="toolbar-button" type="button" onClick={toggleTheme}>
        {theme === 'dark' ? 'Light' : 'Dark'}
      </button>
    </header>
  );
}
