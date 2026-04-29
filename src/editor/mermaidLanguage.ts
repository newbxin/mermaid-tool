import { StreamLanguage, syntaxHighlighting, HighlightStyle } from '@codemirror/language';
import { tags } from '@lezer/highlight';

const keywords = new Set([
  'flowchart',
  'graph',
  'sequenceDiagram',
  'classDiagram',
  'stateDiagram',
  'stateDiagram-v2',
  'erDiagram',
  'gantt',
  'pie',
  'gitGraph',
  'mindmap',
  'timeline',
  'sankey',
  'quadrantChart',
  'participant',
  'actor',
  'subgraph',
  'end',
  'direction',
  'TB',
  'TD',
  'BT',
  'LR',
  'RL',
]);

export const mermaidLanguage = StreamLanguage.define({
  token(stream) {
    if (stream.eatSpace()) {
      return null;
    }

    if (stream.match(/%%.*/)) {
      return 'comment';
    }

    if (stream.match(/-->|---|-\.-|==>|-.->|--|->/)) {
      return 'operator';
    }

    if (stream.match(/"[^"]*"/)) {
      return 'string';
    }

    const word = stream.match(/[A-Za-z][\w-]*/, false);
    if (word && word !== true) {
      stream.match(word[0]);
      return keywords.has(word[0]) ? 'keyword' : 'variableName';
    }

    stream.next();
    return null;
  },
});

export const mermaidHighlighting = syntaxHighlighting(
  HighlightStyle.define([
    { tag: tags.keyword, color: 'var(--syntax-keyword)', fontWeight: '600' },
    { tag: tags.operator, color: 'var(--syntax-operator)' },
    { tag: tags.string, color: 'var(--syntax-string)' },
    { tag: tags.comment, color: 'var(--syntax-comment)', fontStyle: 'italic' },
    { tag: tags.variableName, color: 'var(--syntax-variable)' },
  ]),
);
