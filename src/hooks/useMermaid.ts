import { useCallback, useRef, useState } from 'react';
import DOMPurify from 'dompurify';

export type RenderStatus = 'idle' | 'loading' | 'success' | 'error';

export interface MermaidRenderState {
  status: RenderStatus;
  svg: string;
  error: string;
  diagramType: string;
}

type MermaidModule = typeof import('mermaid');

const initialState: MermaidRenderState = {
  status: 'idle',
  svg: '',
  error: '',
  diagramType: '',
};

function detectDiagramType(code: string) {
  const firstLine = code
    .split('\n')
    .map((line) => line.trim())
    .find((line) => line && !line.startsWith('%%'));

  return firstLine?.split(/\s+/)[0] ?? 'unknown';
}

function messageFromError(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
}

export function useMermaid() {
  const mermaidModule = useRef<MermaidModule | null>(null);
  const renderCounter = useRef(0);
  const [state, setState] = useState<MermaidRenderState>(initialState);

  const render = useCallback(async (code: string) => {
    const source = code.trim();
    if (!source) {
      setState({
        status: 'error',
        svg: '',
        diagramType: '',
        error: 'Enter Mermaid code before converting.',
      });
      return;
    }

    setState((current) => ({ ...current, status: 'loading', error: '' }));

    try {
      if (!mermaidModule.current) {
        mermaidModule.current = await import('mermaid');
        mermaidModule.current.default.initialize({
          startOnLoad: false,
          securityLevel: 'strict',
          theme: 'base',
          deterministicIds: true,
        });
      }

      await mermaidModule.current.default.parse(source);
      const id = `mermaid-diagram-${Date.now()}-${renderCounter.current++}`;
      const { svg } = await mermaidModule.current.default.render(id, source);
      const sanitizedSvg = DOMPurify.sanitize(svg, {
        USE_PROFILES: { svg: true, svgFilters: true },
      });

      setState({
        status: 'success',
        svg: sanitizedSvg,
        error: '',
        diagramType: detectDiagramType(source),
      });
    } catch (error) {
      setState({
        status: 'error',
        svg: '',
        diagramType: '',
        error: messageFromError(error),
      });
    }
  }, []);

  return { ...state, render };
}
