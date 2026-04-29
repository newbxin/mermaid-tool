## ADDED Requirements

### Requirement: Render Mermaid code to SVG
The system SHALL render valid Mermaid code into an SVG diagram and display it in the preview panel. Rendering MUST only occur when the user clicks the Convert button.

#### Scenario: Valid code renders diagram
- **WHEN** user clicks the Convert button with valid Mermaid code in the editor
- **THEN** the preview panel displays the rendered SVG diagram

#### Scenario: Invalid code shows error
- **WHEN** user clicks the Convert button with invalid Mermaid code
- **THEN** the preview panel displays an error message describing what went wrong

#### Scenario: Render only on button click
- **WHEN** user edits code in the editor without clicking Convert
- **THEN** the preview panel retains the previously rendered diagram (or remains empty if nothing was rendered)

### Requirement: SVG sanitization
The system MUST sanitize all rendered SVG through DOMPurify before injecting it into the DOM.

#### Scenario: SVG is sanitized
- **WHEN** Mermaid produces SVG output containing inline scripts or event handlers
- **THEN** those scripts and handlers are stripped before the SVG is displayed

### Requirement: Zoom and pan
The preview panel SHALL support zooming via mouse wheel and panning via mouse drag on the rendered diagram.

#### Scenario: Mouse wheel zooms diagram
- **WHEN** user scrolls the mouse wheel over the rendered diagram
- **THEN** the diagram scales up or down centered on the cursor position

#### Scenario: Mouse drag pans diagram
- **WHEN** user holds the left mouse button and drags while the diagram is zoomed
- **THEN** the diagram pans following the mouse movement

#### Scenario: Zoom level display
- **WHEN** the zoom level changes
- **THEN** a zoom percentage indicator is shown (e.g., "100%", "150%")

### Requirement: Export SVG
The system SHALL allow the user to download the rendered diagram as an SVG file.

#### Scenario: Download SVG
- **WHEN** user clicks the Export SVG button
- **THEN** the browser downloads the rendered diagram as a `.svg` file

### Requirement: Export PNG
The system SHALL allow the user to download the rendered diagram as a PNG image.

#### Scenario: Download PNG
- **WHEN** user clicks the Export PNG button
- **THEN** the browser downloads the rendered diagram as a `.png` file

### Requirement: Mermaid lazy loading
The mermaid.js library SHALL be dynamically imported only when the user clicks the Convert button for the first time.

#### Scenario: First Convert click loads mermaid
- **WHEN** user clicks Convert for the first time
- **THEN** the mermaid.js library is loaded asynchronously before rendering

#### Scenario: Subsequent renders use cached module
- **WHEN** user clicks Convert after mermaid.js has been loaded
- **THEN** the already-loaded module is used immediately without re-downloading

### Requirement: Panel maximize toggle
The preview panel SHALL provide a maximize button that expands it to fill the full page width and collapses the editor panel.

#### Scenario: Preview maximized
- **WHEN** user clicks the maximize button in the preview panel header
- **THEN** the preview panel expands to full page width and the editor panel becomes hidden

#### Scenario: Preview restored from maximized
- **WHEN** user clicks the maximize button again while the preview is maximized
- **THEN** the layout returns to the default 1/3 + 2/3 split
