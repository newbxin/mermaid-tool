import type { RenderStatus } from '../hooks/useMermaid';

interface StatusBarProps {
  status: RenderStatus;
  diagramType: string;
  error: string;
}

export function StatusBar({ status, diagramType, error }: StatusBarProps) {
  const label =
    status === 'loading'
      ? 'Rendering...'
      : status === 'success'
        ? `Diagram type: ${diagramType}`
        : status === 'error'
          ? `Error: ${error}`
          : 'Ready';

  return <footer className={`status-bar status-bar--${status}`}>{label}</footer>;
}
