import { useState } from 'react';
import { CenterBar } from './components/CenterBar';
import { EditorPanel } from './components/EditorPanel';
import { Header } from './components/Header';
import { PreviewPanel } from './components/PreviewPanel';
import { StatusBar } from './components/StatusBar';
import { ThemeProvider } from './hooks/useTheme';
import { useMermaid } from './hooks/useMermaid';

const defaultCode = `flowchart LR
  Start([Paste Mermaid code])
  Edit[Edit in CodeMirror]
  Convert{Click Convert}
  Preview[Inspect SVG preview]
  Export[Export SVG or PNG]

  Start --> Edit --> Convert
  Convert --> Preview --> Export`;

type MaximizedPanel = 'editor' | 'preview' | null;

function MermaidTool() {
  const [code, setCode] = useState(defaultCode);
  const [maximizedPanel, setMaximizedPanel] = useState<MaximizedPanel>(null);
  const mermaid = useMermaid();

  const toggleMaximized = (panel: Exclude<MaximizedPanel, null>) => {
    setMaximizedPanel((current) => (current === panel ? null : panel));
  };

  return (
    <div className="app-shell">
      <Header />
      <main className={`workspace ${maximizedPanel === 'editor' ? 'left-maximized' : ''} ${maximizedPanel === 'preview' ? 'right-maximized' : ''}`}>
        <EditorPanel
          code={code}
          isMaximized={maximizedPanel === 'editor'}
          onChange={setCode}
          onToggleMaximize={() => toggleMaximized('editor')}
        />
        <CenterBar isRendering={mermaid.status === 'loading'} onConvert={() => void mermaid.render(code)} />
        <PreviewPanel
          svg={mermaid.svg}
          error={mermaid.status === 'error' ? mermaid.error : ''}
          isMaximized={maximizedPanel === 'preview'}
          onToggleMaximize={() => toggleMaximized('preview')}
        />
      </main>
      <StatusBar status={mermaid.status} diagramType={mermaid.diagramType} error={mermaid.error} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MermaidTool />
    </ThemeProvider>
  );
}
