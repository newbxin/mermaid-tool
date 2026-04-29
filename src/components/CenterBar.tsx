interface CenterBarProps {
  isRendering: boolean;
  onConvert: () => void;
}

export function CenterBar({ isRendering, onConvert }: CenterBarProps) {
  return (
    <aside className="center-bar">
      <button className="convert-button" type="button" onClick={onConvert} disabled={isRendering}>
        {isRendering ? '...' : 'Convert'}
      </button>
    </aside>
  );
}
