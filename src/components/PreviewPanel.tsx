import { useEffect, useRef, useState } from 'react';
import { downloadSvgAsPng, downloadTextFile } from '../lib/download';

interface PreviewPanelProps {
  svg: string;
  error: string;
  isMaximized: boolean;
  onToggleMaximize: () => void;
}

interface Point {
  x: number;
  y: number;
}

const minZoom = 0.25;
const maxZoom = 3;

export function PreviewPanel({ svg, error, isMaximized, onToggleMaximize }: PreviewPanelProps) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState<Point>({ x: 0, y: 0 });
  const dragStart = useRef<Point | null>(null);

  useEffect(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [svg]);

  const canExport = Boolean(svg);

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (!svg) {
      return;
    }

    event.preventDefault();
    const delta = event.deltaY > 0 ? -0.1 : 0.1;
    setZoom((current) => Math.min(maxZoom, Math.max(minZoom, Number((current + delta).toFixed(2)))));
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!svg || zoom <= 1) {
      return;
    }

    dragStart.current = { x: event.clientX - pan.x, y: event.clientY - pan.y };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStart.current) {
      return;
    }

    setPan({
      x: event.clientX - dragStart.current.x,
      y: event.clientY - dragStart.current.y,
    });
  };

  const handlePointerUp = () => {
    dragStart.current = null;
  };

  const resetZoom = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  return (
    <section className="panel preview-panel" aria-label="Mermaid preview">
      <div className="panel-header">
        <h2>Preview</h2>
        <div className="preview-actions">
          <button className="toolbar-button" type="button" onClick={resetZoom} disabled={!svg}>
            {Math.round(zoom * 100)}%
          </button>
          <button
            className="toolbar-button"
            type="button"
            disabled={!canExport}
            onClick={() => downloadTextFile('diagram.svg', svg, 'image/svg+xml;charset=utf-8')}
          >
            SVG
          </button>
          <button
            className="toolbar-button"
            type="button"
            disabled={!canExport}
            onClick={() => void downloadSvgAsPng('diagram.png', svg)}
          >
            PNG
          </button>
          <button className="icon-button" type="button" onClick={onToggleMaximize}>
            {isMaximized ? 'Restore' : 'Maximize'}
          </button>
        </div>
      </div>
      <div
        className={`preview-stage${zoom > 1 ? ' preview-stage--pannable' : ''}`}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {error ? <div className="preview-message preview-message--error">{error}</div> : null}
        {!error && !svg ? <div className="preview-message">Convert Mermaid code to preview the diagram.</div> : null}
        {svg ? (
          <div
            className="diagram-canvas"
            style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})` }}
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        ) : null}
      </div>
    </section>
  );
}
