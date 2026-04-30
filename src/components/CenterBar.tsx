import { ArrowRight, LoaderCircle } from 'lucide-react';
import { TooltipHint } from './ui';

interface CenterBarProps {
  isRendering: boolean;
  onConvert: () => void;
}

export function CenterBar({ isRendering, onConvert }: CenterBarProps) {
  const Icon = isRendering ? LoaderCircle : ArrowRight;

  return (
    <aside className="center-bar">
      <TooltipHint content={isRendering ? 'Rendering' : 'Convert'}>
        <button
          className="convert-button"
          type="button"
          onClick={onConvert}
          disabled={isRendering}
          aria-label={isRendering ? 'Rendering preview' : 'Convert Mermaid code to preview'}
          title={isRendering ? 'Rendering' : 'Convert'}
        >
          <Icon className={`convert-button__icon${isRendering ? ' convert-button__icon--spinning' : ''}`} aria-hidden="true" />
        </button>
      </TooltipHint>
    </aside>
  );
}
