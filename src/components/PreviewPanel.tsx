import type { CSSProperties } from 'react';
import { useEffect, useRef, useState } from 'react';
import { Download, Maximize2, Minimize2 } from 'lucide-react';
import { PREVIEW_DEFAULT_ZOOM_STEP_PERCENT, PREVIEW_MAX_ZOOM, PREVIEW_MIN_ZOOM } from '../config/preview';
import { downloadSvgAsPng, downloadTextFile } from '../lib/download';
import { DownloadFormatSelect, IconButton, TooltipHint } from './ui';
import type { DownloadFormat } from './ui';

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

interface ZoomAnchor {
  clientX: number;
  clientY: number;
}

interface Viewport {
  zoom: number;
  pan: Point;
}

const ZOOM_MIN_PERCENT = Math.round(PREVIEW_MIN_ZOOM * 100);
const ZOOM_MAX_PERCENT = Math.round(PREVIEW_MAX_ZOOM * 100);

function clampZoom(nextZoom: number) {
  return Math.min(PREVIEW_MAX_ZOOM, Math.max(PREVIEW_MIN_ZOOM, Number(nextZoom.toFixed(2))));
}

function isPositiveTenMultiple(value: string) {
  return /^\d+$/.test(value) && Number(value) > 0 && Number(value) % 10 === 0;
}

const DEFAULT_VIEWPORT: Viewport = {
  zoom: 1,
  pan: { x: 0, y: 0 },
};

const SCREEN_READER_ONLY_STYLE: CSSProperties = {
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
};

export function PreviewPanel({ svg, error, isMaximized, onToggleMaximize }: PreviewPanelProps) {
  const [viewport, setViewport] = useState<Viewport>(DEFAULT_VIEWPORT);
  const [zoomStepInput, setZoomStepInput] = useState(String(PREVIEW_DEFAULT_ZOOM_STEP_PERCENT));
  const [zoomStepPercent, setZoomStepPercent] = useState(PREVIEW_DEFAULT_ZOOM_STEP_PERCENT);
  const [zoomStepError, setZoomStepError] = useState('');
  const [zoomInput, setZoomInput] = useState('100');
  const [zoomError, setZoomError] = useState('');
  const [downloadFormat, setDownloadFormat] = useState<DownloadFormat>('svg');
  const previewStageRef = useRef<HTMLDivElement | null>(null);
  const diagramFrameRef = useRef<HTMLDivElement | null>(null);
  const dragStart = useRef<Point | null>(null);
  const svgRef = useRef(svg);
  const zoomStepPercentRef = useRef(zoomStepPercent);

  useEffect(() => {
    setViewport(DEFAULT_VIEWPORT);
    setZoomInput('100');
    setZoomError('');
  }, [svg]);

  useEffect(() => {
    svgRef.current = svg;
  }, [svg]);

  useEffect(() => {
    zoomStepPercentRef.current = zoomStepPercent;
  }, [zoomStepPercent]);

  useEffect(() => {
    const previewStage = previewStageRef.current;

    if (!previewStage) {
      return undefined;
    }

    const handleNativeWheel = (event: WheelEvent) => {
      if (!svgRef.current || !event.shiftKey) {
        return;
      }

      const wheelDelta = event.deltaY !== 0 ? event.deltaY : event.deltaX;

      if (wheelDelta === 0) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      const wheelStep = zoomStepPercentRef.current / 100;
      const delta = wheelDelta > 0 ? -wheelStep : wheelStep;
      applyZoomDelta(delta, { clientX: event.clientX, clientY: event.clientY });
    };

    previewStage.addEventListener('wheel', handleNativeWheel, { passive: false });

    return () => {
      previewStage.removeEventListener('wheel', handleNativeWheel);
    };
  }, []);

  const canExport = Boolean(svg);
  const { zoom, pan } = viewport;
  const currentZoomPercent = Math.round(zoom * 100);

  const applyZoomDelta = (delta: number, anchor?: ZoomAnchor) => {
    setViewport((currentViewport) => {
      const nextZoom = clampZoom(currentViewport.zoom + delta);
      const frameRect = diagramFrameRef.current?.getBoundingClientRect();
      let nextPan = currentViewport.pan;

      if (anchor && frameRect && nextZoom !== currentViewport.zoom) {
        const contentX = (anchor.clientX - frameRect.left - currentViewport.pan.x) / currentViewport.zoom;
        const contentY = (anchor.clientY - frameRect.top - currentViewport.pan.y) / currentViewport.zoom;

        nextPan = {
          x: anchor.clientX - frameRect.left - contentX * nextZoom,
          y: anchor.clientY - frameRect.top - contentY * nextZoom,
        };
      }

      setZoomInput(String(Math.round(nextZoom * 100)));
      setZoomError('');
      return {
        zoom: nextZoom,
        pan: nextPan,
      };
    });
  };

  const handleZoomStepChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value.trim();
    setZoomStepInput(nextValue);

    if (!isPositiveTenMultiple(nextValue)) {
      setZoomStepError('请输入 10 的正整数倍作为步长。');
      return;
    }

    const nextStep = Number(nextValue);
    setZoomStepPercent(nextStep);
    setZoomStepError('');
  };

  const handleZoomInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value.trim();
    setZoomInput(nextValue);

    if (!isPositiveTenMultiple(nextValue)) {
      setZoomError('缩放倍率需要是 10 的正整数倍。');
      return;
    }

    const nextPercent = Number(nextValue);
    if (nextPercent < ZOOM_MIN_PERCENT || nextPercent > ZOOM_MAX_PERCENT) {
      setZoomError(`缩放倍率请输入 ${ZOOM_MIN_PERCENT} 到 ${ZOOM_MAX_PERCENT} 之间的 10 倍数。`);
      return;
    }

    setViewport((currentViewport) => ({
      ...currentViewport,
      zoom: nextPercent / 100,
    }));
    setZoomInput(String(nextPercent));
    setZoomError('');
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!svg || zoom <= 1) {
      return;
    }

    event.preventDefault();
    dragStart.current = { x: event.clientX - pan.x, y: event.clientY - pan.y };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStart.current) {
      return;
    }

    event.preventDefault();
    setViewport((currentViewport) => ({
      ...currentViewport,
      pan: {
        x: event.clientX - dragStart.current!.x,
        y: event.clientY - dragStart.current!.y,
      },
    }));
  };

  const handlePointerUp = () => {
    dragStart.current = null;
  };

  const zoomOut = () => {
    applyZoomDelta(-(zoomStepPercent / 100));
  };

  const zoomIn = () => {
    applyZoomDelta(zoomStepPercent / 100);
  };

  const handleDownload = () => {
    if (!svg) {
      return;
    }

    if (downloadFormat === 'png') {
      void downloadSvgAsPng('diagram.png', svg);
      return;
    }

    downloadTextFile('diagram.svg', svg, 'image/svg+xml;charset=utf-8');
  };

  return (
    <section className="panel preview-panel" aria-label="Mermaid preview">
      <div className="panel-header">
        <h2>Preview</h2>
        <div className="preview-actions">
          <div className="zoom-controls">
            <label className="zoom-control">
              <span>Step</span>
              <TooltipHint content={zoomStepError} disabled={!zoomStepError} open={Boolean(zoomStepError)}>
                <input
                  className="zoom-step-input"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={zoomStepInput}
                  onChange={handleZoomStepChange}
                  aria-invalid={Boolean(zoomStepError)}
                  aria-describedby={zoomStepError ? 'zoom-step-error' : undefined}
                />
              </TooltipHint>
            </label>
            <div className="zoom-control">
              <span>Zoom</span>
              <div className="zoom-percent-control">
                <button
                  className="zoom-adjust-button"
                  type="button"
                  onClick={zoomOut}
                  disabled={!svg || currentZoomPercent <= ZOOM_MIN_PERCENT}
                  aria-label="Zoom out"
                >
                  -
                </button>
                <TooltipHint content={zoomError} disabled={!zoomError} open={Boolean(zoomError)}>
                  <input
                    className="zoom-percent-input"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={zoomInput}
                    onChange={handleZoomInputChange}
                    disabled={!svg}
                    aria-label="Zoom percentage"
                    aria-invalid={Boolean(zoomError)}
                    aria-describedby={zoomError ? 'zoom-error' : undefined}
                  />
                </TooltipHint>
                <span className="zoom-percent-suffix">%</span>
                <button
                  className="zoom-adjust-button"
                  type="button"
                  onClick={zoomIn}
                  disabled={!svg || currentZoomPercent >= ZOOM_MAX_PERCENT}
                  aria-label="Zoom in"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          {zoomStepError ? (
            <span id="zoom-step-error" role="status" aria-live="polite" style={SCREEN_READER_ONLY_STYLE}>
              {zoomStepError}
            </span>
          ) : null}
          {zoomError ? (
            <span id="zoom-error" role="status" aria-live="polite" style={SCREEN_READER_ONLY_STYLE}>
              {zoomError}
            </span>
          ) : null}
          <DownloadFormatSelect value={downloadFormat} onValueChange={setDownloadFormat} disabled={!canExport} />
          <TooltipHint content="Download diagram">
            <IconButton
              icon={Download}
              type="button"
              disabled={!canExport}
              onClick={handleDownload}
              aria-label={`Download diagram as ${downloadFormat.toUpperCase()}`}
              title="Download"
            />
          </TooltipHint>
          <TooltipHint content={isMaximized ? 'Restore' : 'Maximize'}>
            <IconButton
              icon={isMaximized ? Minimize2 : Maximize2}
              type="button"
              onClick={onToggleMaximize}
              aria-label={isMaximized ? 'Restore preview panel' : 'Maximize preview panel'}
              aria-pressed={isMaximized}
              title={isMaximized ? 'Restore' : 'Maximize'}
            />
          </TooltipHint>
        </div>
      </div>
      <div
        ref={previewStageRef}
        className={`preview-stage${zoom > 1 ? ' preview-stage--pannable' : ''}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {error ? <div className="preview-message preview-message--error">{error}</div> : null}
        {!error && !svg ? <div className="preview-message">Convert Mermaid code to preview the diagram.</div> : null}
        {svg ? (
          <div ref={diagramFrameRef} className="diagram-frame">
            <div
              className="diagram-canvas"
              style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})` }}
              dangerouslySetInnerHTML={{ __html: svg }}
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
