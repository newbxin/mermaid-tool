## ADDED Requirements

### Requirement: Theme toggle
The system SHALL provide a theme toggle in the application header that switches between light and dark themes.

#### Scenario: Default theme
- **WHEN** the application first loads
- **THEN** the dark theme is active

#### Scenario: Toggle to light theme
- **WHEN** user clicks the theme toggle while dark theme is active
- **THEN** all UI elements switch to light theme colors immediately

#### Scenario: Toggle back to dark theme
- **WHEN** user clicks the theme toggle while light theme is active
- **THEN** all UI elements switch to dark theme colors immediately

### Requirement: CSS custom property-based theming
All colors SHALL be defined using CSS custom properties on the root element, and theme switching SHALL change the `data-theme` attribute on the document root element.

#### Scenario: Theme variables defined
- **WHEN** the application stylesheets are loaded
- **THEN** CSS custom properties for surface colors, text colors, accent colors, borders, and editor/preview backgrounds are defined for both themes

#### Scenario: Theme switch updates data attribute
- **WHEN** user toggles the theme
- **THEN** the `data-theme` attribute on the root element changes between `"dark"` and `"light"`

### Requirement: CodeMirror theme follows application theme
The CodeMirror editor theme SHALL match the current application theme (dark editor background in dark mode, light in light mode).

#### Scenario: Editor theme matches dark mode
- **WHEN** dark theme is active
- **THEN** the CodeMirror editor uses a dark background and light-colored text

#### Scenario: Editor theme matches light mode
- **WHEN** light theme is active
- **THEN** the CodeMirror editor uses a light background and dark-colored text
