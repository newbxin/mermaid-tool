import { useEffect, useMemo, useRef } from 'react';
import { basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { indentWithTab } from '@codemirror/commands';
import { mermaidHighlighting, mermaidLanguage } from '../editor/mermaidLanguage';
import { useTheme } from '../hooks/useTheme';

interface EditorPanelProps {
  code: string;
  isMaximized: boolean;
  onChange: (value: string) => void;
  onToggleMaximize: () => void;
}

export function EditorPanel({ code, isMaximized, onChange, onToggleMaximize }: EditorPanelProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const viewRef = useRef<EditorView | null>(null);
  const codeRef = useRef(code);
  const onChangeRef = useRef(onChange);
  const { theme } = useTheme();

  onChangeRef.current = onChange;

  const editorTheme = useMemo(
    () =>
      EditorView.theme({
        '&': {
          height: '100%',
          color: 'var(--editor-text)',
          backgroundColor: 'var(--editor-bg)',
        },
        '.cm-scroller': {
          fontFamily: 'var(--font-mono)',
          fontSize: '14px',
          lineHeight: '1.6',
        },
        '.cm-content': {
          caretColor: 'var(--accent)',
          padding: '16px 0',
        },
        '.cm-gutters': {
          backgroundColor: 'var(--editor-gutter)',
          color: 'var(--text-muted)',
          borderRight: '1px solid var(--border)',
        },
        '.cm-activeLine, .cm-activeLineGutter': {
          backgroundColor: 'var(--editor-active-line)',
        },
        '.cm-selectionBackground, &.cm-focused .cm-selectionBackground': {
          backgroundColor: 'var(--selection)',
        },
        '&.cm-focused': {
          outline: 'none',
        },
      }),
    [theme],
  );

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const view = new EditorView({
      parent: containerRef.current,
      state: EditorState.create({
        doc: code,
        extensions: [
          basicSetup,
          keymap.of([indentWithTab]),
          mermaidLanguage,
          mermaidHighlighting,
          editorTheme,
          EditorView.lineWrapping,
          EditorView.updateListener.of((update) => {
            if (update.docChanged) {
              const nextCode = update.state.doc.toString();
              codeRef.current = nextCode;
              onChangeRef.current(nextCode);
            }
          }),
        ],
      }),
    });

    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
  }, [editorTheme]);

  useEffect(() => {
    const view = viewRef.current;
    if (!view || code === codeRef.current) {
      return;
    }

    codeRef.current = code;
    view.dispatch({
      changes: { from: 0, to: view.state.doc.length, insert: code },
    });
  }, [code]);

  return (
    <section className="panel editor-panel" aria-label="Mermaid editor">
      <div className="panel-header">
        <h2>Editor</h2>
        <button className="icon-button" type="button" onClick={onToggleMaximize}>
          {isMaximized ? 'Restore' : 'Maximize'}
        </button>
      </div>
      <div className="editor-host" ref={containerRef} />
    </section>
  );
}
