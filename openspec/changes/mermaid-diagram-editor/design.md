## Context

Greenfield client-side SPA for rendering Mermaid diagrams. No backend, no external services. The user opens the HTML file (or a local dev server), pastes Mermaid code into an editor panel, clicks Convert, and sees the rendered diagram in a preview panel. All processing happens in the browser.

Constraints:
- Mermaid.js is large (~1MB) and should not block initial load
- Rendered SVG must be sanitized before DOM injection (security)
- Layout must support per-panel maximization
- Theme must switch without page reload

## Goals / Non-Goals

**Goals:**
- Split-pane layout: editor (1/3) | center bar | preview (2/3)
- CodeMirror 6 editor with Mermaid keyword highlighting
- Click-to-render (no auto-render on keystroke)
- SVG zoom, pan, and export (SVG download + canvas-based PNG)
- Dark/light theme via CSS custom properties
- Per-panel maximization toggles

**Non-Goals:**
- Mobile responsiveness (desktop-first tool)
- Code persistence across sessions (no localStorage)
- Multiple tabs or files
- Collaborative editing
- Backend/server-side rendering

## Decisions

### 1. Build tool: Vite over Create React App

Vite provides fast HMR, native TypeScript support, and zero-config setup. CRA is effectively unmaintained. Vite's dev server is faster and the build output is smaller.

### 2. Editor: CodeMirror 6 over Monaco

Monaco is heavier (~5MB vs CodeMirror's modular ~300KB). For a single-language editor with basic highlighting, CodeMirror 6's composable architecture is a better fit. We define a lightweight Mermaid `LanguageSupport` via `StreamLanguage` for keywords.

### 3. Mermaid.js: dynamic import on Convert click

Mermaid bundles to ~1MB. Using `const mermaid = await import('mermaid')` on first Convert click keeps initial page load at ~50KB (gzipped) and avoids the cost until the user actually needs it.

### 4. Layout: CSS Grid with class toggles

Panels live in a 3-column grid: `grid-template-columns: 1fr 48px 2fr`. Maximization toggles the corresponding column to `0fr` with a CSS transition. No JS layout calculation needed.

### 5. Zoom/pan: CSS transform on wrapper div

Rather than manipulating SVG `viewBox`, which is fragile across diagram types, we apply `transform: scale() translate()` on a wrapper `<div>`. Pan is computed from mouse drag deltas, zoom from wheel events. This works identically for all diagram types.

### 6. Theme: CSS custom properties with `data-theme` attribute

A single CSS variable set defines both themes. `<html data-theme="light|dark">` switches the entire tree. A React context provides the toggle without prop drilling.

### 7. SVG export: serialize + download, PNG via canvas

- SVG: Serialize the sanitized SVG string, create a Blob, trigger download via `URL.createObjectURL`.
- PNG: Draw SVG onto an offscreen `<canvas>`, `toBlob()`, then download. Handles the case where SVG contains `<foreignObject>` by first inlining stylesheets.

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Mermaid render can produce SVG with inline scripts | Sanitize via DOMPurify before `dangerouslySetInnerHTML` |
| Large diagrams may overflow preview area | CSS `overflow: auto` on container, user can pan/zoom |
| mermaid.js import may fail (network) | Show clear error state, allow retry |
| CodeMirror 6 has no official Mermaid language package | Define a lightweight StreamLanguage; accept that highlighting is basic (keywords only) |

## Open Questions

_Resolved in exploration phase — no open questions remain._
