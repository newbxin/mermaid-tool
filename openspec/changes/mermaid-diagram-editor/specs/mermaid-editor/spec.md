## ADDED Requirements

### Requirement: CodeMirror editor with Mermaid syntax highlighting
The system SHALL provide a CodeMirror 6 editor instance configured with Mermaid keyword highlighting. The editor MUST occupy the full height of its parent panel and accept any text input.

#### Scenario: Editor renders with Mermaid keywords highlighted
- **WHEN** user types Mermaid code containing keywords such as `flowchart`, `sequenceDiagram`, `graph`, `-->`
- **THEN** the editor highlights those keywords using a distinct color from regular text

#### Scenario: Editor accepts multi-line input
- **WHEN** user types or pastes multi-line Mermaid code
- **THEN** the editor preserves line breaks and renders all content

### Requirement: Panel maximize toggle
The editor panel SHALL provide a maximize button that, when clicked, expands the editor panel to fill the full width of the page and collapses the preview panel.

#### Scenario: Editor maximized
- **WHEN** user clicks the maximize button in the editor panel header
- **THEN** the editor panel expands to full page width and the preview panel becomes hidden

#### Scenario: Editor restored from maximized
- **WHEN** user clicks the maximize button again while the editor is maximized
- **THEN** the layout returns to the default 1/3 editor + 2/3 preview split

### Requirement: Default placeholder content
The editor SHALL display a default Mermaid example upon first load so the user can immediately see the tool in action.

#### Scenario: First load shows example
- **WHEN** the application loads for the first time
- **THEN** the editor contains a short, valid Mermaid flowchart example
