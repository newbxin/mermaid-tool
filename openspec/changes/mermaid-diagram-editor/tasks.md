## 1. Project Setup

- [x] 1.1 Initialize Vite project with React + TypeScript template
- [x] 1.2 Install dependencies: mermaid, codemirror, @codemirror/view, @codemirror/state, @codemirror/language, @codemirror/theme-one-dark, @codemirror/basic-setup, dompurify, file-saver, @types/dompurify
- [x] 1.3 Update project config (vite.config.ts, tsconfig.json) for single-page app

## 2. Theme System

- [x] 2.1 Define CSS custom properties in styles/tokens.css for light and dark themes
- [x] 2.2 Create global.css with data-theme switching logic
- [x] 2.3 Implement useTheme hook with React context for toggle state
- [x] 2.4 Add theme toggle button to application header

## 3. Layout Shell

- [x] 3.1 Build App.tsx with CSS Grid 3-column layout (1fr 48px 2fr)
- [x] 3.2 Implement Header component with app title and theme toggle
- [x] 3.3 Implement StatusBar component with Ready/Rendering/Error states
- [x] 3.4 Add panel maximization CSS classes (left-maximized, right-maximized)
- [x] 3.5 Implement maximization toggle logic in App state

## 4. Editor Panel

- [x] 4.1 Create EditorPanel component wrapper with panel header and maximize button
- [x] 4.2 Integrate CodeMirror 6 with basic setup extensions
- [x] 4.3 Define Mermaid StreamLanguage with keyword highlighting (flowchart, graph, sequenceDiagram, classDiagram, stateDiagram, erDiagram, gantt, pie, gitGraph, mindmap, timeline, sankey, quadrantChart, participant, subgraph, end, direction, -->, ---, -.-)
- [x] 4.4 Configure CodeMirror theme to follow application theme (dark/light)
- [x] 4.5 Add default placeholder Mermaid flowchart example in initial editor state

## 5. Mermaid Rendering Engine

- [x] 5.1 Implement useMermaid hook with lazy import strategy
- [x] 5.2 Configure mermaid to use compatible render mode
- [x] 5.3 Implement SVG sanitization via DOMPurify after render
- [x] 5.4 Handle mermaid parse errors and surface user-friendly messages
- [x] 5.5 Track render status: idle | loading | success | error

## 6. Center Bar

- [x] 6.1 Create CenterBar component (48px wide vertical bar)
- [x] 6.2 Add Convert button with loading/disabled states
- [x] 6.3 Wire Convert button to trigger useMermaid.render(code)

## 7. Preview Panel

- [x] 7.1 Create PreviewPanel component with panel header, maximize button, zoom controls, and export buttons
- [x] 7.2 Implement SVG rendering area with overflow handling
- [x] 7.3 Implement CSS transform-based zoom via mouse wheel (clamped 25%-300%)
- [x] 7.4 Implement pan via mouse drag on zoomed SVG (mousedown/mousemove/mouseup)
- [x] 7.5 Add zoom percentage display and zoom reset button
- [x] 7.6 Implement SVG export (serialize + Blob download)
- [x] 7.7 Implement PNG export (SVG → canvas → toBlob → download)
- [x] 7.8 Display error state when rendering fails
- [x] 7.9 Display empty state when no diagram has been rendered

## 8. Integration & Polish

- [x] 8.1 Wire all components together in App and verify data flow
- [x] 8.2 Test all Mermaid diagram types render correctly
- [x] 8.3 Verify theme switching affects all components including CodeMirror
- [x] 8.4 Verify maximization works for both panels and restores correctly
- [x] 8.5 Add favicon and page title
- [x] 8.6 Run application build and verify production output
