## ADDED Requirements

### Requirement: Default split layout
The application SHALL display a three-column layout: editor panel (1/3 of viewport width), center bar with Convert button, and preview panel (2/3 of viewport width).

#### Scenario: Default layout on load
- **WHEN** the application loads
- **THEN** the editor occupies approximately 1/3 of the available width, a narrow center bar spans the middle, and the preview occupies approximately 2/3 of the width

#### Scenario: Layout fills viewport height
- **WHEN** the application is displayed
- **THEN** the panels fill the full available viewport height (excluding header and status bar)

### Requirement: Center bar with Convert button
A center bar SHALL sit between the editor and preview panels, containing a Convert button that triggers Mermaid rendering.

#### Scenario: Convert button renders diagram
- **WHEN** user clicks the Convert button
- **THEN** the Mermaid code from the editor is rendered and displayed in the preview panel

#### Scenario: Center bar is a thin column
- **WHEN** the application is in default layout
- **THEN** the center bar is approximately 48px wide and contains only the Convert button

### Requirement: Per-panel maximization
Each panel SHALL provide a maximize/restore control. When one panel is maximized, the other SHALL be hidden. The center bar SHALL remain visible.

#### Scenario: Editor maximization collapses preview
- **WHEN** user maximizes the editor panel
- **THEN** the editor fills the full content area and the preview panel is hidden
- **AND** the center bar with Convert button remains visible

#### Scenario: Preview maximization collapses editor
- **WHEN** user maximizes the preview panel
- **THEN** the preview fills the full content area and the editor panel is hidden
- **AND** the center bar with Convert button remains visible

#### Scenario: Only one panel can be maximized at a time
- **WHEN** one panel is already maximized and user maximizes the other
- **THEN** the first panel is restored and the second panel becomes maximized

### Requirement: Status bar
The application SHALL display a status bar at the bottom indicating the current state: Ready, Rendering..., Diagram rendered successfully, or Error with message.

#### Scenario: Idle state
- **WHEN** no rendering is in progress
- **THEN** the status bar shows "Ready"

#### Scenario: Loading state
- **WHEN** Mermaid code is being rendered
- **THEN** the status bar shows "Rendering..."

#### Scenario: Success state
- **WHEN** a diagram has been rendered successfully
- **THEN** the status bar shows the detected diagram type (e.g., "Diagram type: flowchart")

#### Scenario: Error state
- **WHEN** rendering fails
- **THEN** the status bar shows an error summary in an error-styled format
