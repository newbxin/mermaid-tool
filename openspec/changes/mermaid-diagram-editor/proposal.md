## Why

Mermaid diagrams are widely used in technical documentation, but rendering them requires a live environment — either a Markdown editor with Mermaid support or the online mermaid.live editor. Developers working in air-gapped environments or wanting a clean, distraction-free local tool have no lightweight option. This project delivers a browser-based tool that runs entirely client-side: paste code, click render, inspect the result. No server, no account, no network dependency.

## What Changes

- Add a React 18 + TypeScript + Vite web application
- Add CodeMirror 6 editor panel with Mermaid syntax highlighting (left 1/3 of page)
- Add Mermaid.js SVG rendering preview panel (right 2/3 of page)
- Add a center "Convert" button that triggers rendering from editor code
- Add dark/light theme toggle
- Add per-panel maximization (either editor or preview fills full width)
- Add zoom, pan, and export (SVG/PNG) controls in the preview panel
- Sanitize rendered SVG via DOMPurify before injecting into DOM

## Capabilities

### New Capabilities

- `mermaid-editor`: CodeMirror 6 panel with Mermaid syntax highlighting, panel maximize toggle
- `mermaid-preview`: SVG rendering panel with zoom, pan, and SVG/PNG export controls
- `layout-control`: 1/3 editor + center bar + 2/3 preview split layout, with per-panel maximization
- `theme-switch`: CSS custom property-based dark/light theme toggle persisted across session

### Modified Capabilities

_None — greenfield project._

## Impact

- Project: `d:/Code/mermaid-tool` (new project, no existing code)
- Dependencies: mermaid.js (~1MB, lazy-loaded on first Convert click), CodeMirror 6, DOMPurify, React 18
- No API, no backend, no external services
