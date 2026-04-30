## MODIFIED Requirements

### Requirement: Zoom and pan
The preview panel SHALL support zooming via `Shift` + mouse wheel and panning via mouse drag on the rendered diagram. Normal mouse wheel input MUST remain available for scrolling the preview area. Zoom limits MUST be defined by global preview configuration constants. The minimum zoom value MUST support `0.1` scale, displayed to the user as `10%`. The maximum zoom value MUST support `20` scale, displayed to the user as `2000%`. The preview panel SHALL provide a labeled zoom step input, displayed to the left of the labeled zoom percentage control, for configuring wheel and button zoom increments as a percentage.

#### Scenario: Shift mouse wheel zooms diagram
- **WHEN** user holds `Shift` and scrolls the mouse wheel over the rendered diagram
- **THEN** the diagram scales up or down within the globally configured zoom range
- **AND** the diagram point under the mouse cursor remains under the cursor during zoom
- **AND** the preview area does not horizontally scroll from the same gesture

#### Scenario: Shift mouse wheel handles browser horizontal wheel deltas
- **WHEN** the browser reports `Shift` + mouse wheel movement as horizontal wheel delta
- **THEN** the diagram still scales up or down within the globally configured zoom range
- **AND** the diagram point under the mouse cursor remains under the cursor during zoom
- **AND** the browser's default horizontal scrolling is prevented

#### Scenario: Mouse wheel scrolls preview area
- **WHEN** user scrolls the mouse wheel over the rendered diagram without holding `Shift`
- **THEN** the preview area scrolls normally
- **AND** the diagram zoom level does not change

#### Scenario: Mouse drag pans diagram
- **WHEN** user holds the left mouse button and drags while the diagram is zoomed
- **THEN** the diagram pans following the mouse movement

#### Scenario: Mouse drag does not select text
- **WHEN** user drags a zoomed rendered diagram across SVG text or page text
- **THEN** the diagram pans without selecting text in the preview area

#### Scenario: Zoom level display
- **WHEN** the zoom level changes
- **THEN** a labeled zoom percentage indicator is shown (e.g., "100%", "150%", "2000%")

#### Scenario: Configurable wheel zoom step
- **WHEN** user enters a valid zoom step that is a positive integer multiple of `10`
- **THEN** `Shift` + mouse wheel zoom and zoom button controls use that step as the zoom percentage increment

#### Scenario: Invalid wheel zoom step
- **WHEN** user enters a zoom step that is empty, non-numeric, non-positive, or not a multiple of `10`
- **THEN** a friendly validation message is shown
- **AND** `Shift` + mouse wheel zoom and zoom button controls continue using the last valid step

#### Scenario: Zoom buttons adjust diagram
- **WHEN** user clicks the zoom-out or zoom-in button beside the zoom percentage field
- **THEN** the diagram zoom decreases or increases by the current valid zoom step
- **AND** the zoom remains within the globally configured zoom range

#### Scenario: Zoom controls are labeled
- **WHEN** the preview header is displayed
- **THEN** the zoom step input and zoom percentage control are visually distinguished by labels

#### Scenario: Zoom percentage supports direct input
- **WHEN** user enters a valid zoom percentage that is a positive integer multiple of `10` between `10` and `2000`
- **THEN** the diagram zoom updates to that percentage

#### Scenario: Invalid zoom percentage input
- **WHEN** user enters a zoom percentage that is empty, non-numeric, non-positive, not a multiple of `10`, less than `10`, or greater than `2000`
- **THEN** a friendly validation message is shown
- **AND** the rendered diagram keeps the last valid zoom level

#### Scenario: Maximum zoom is globally configured
- **WHEN** the preview zoom reaches the configured maximum
- **THEN** additional zoom-in wheel, button, or direct input does not increase the zoom beyond `2000%`

#### Scenario: Minimum zoom is globally configured
- **WHEN** the preview zoom reaches the configured minimum
- **THEN** additional zoom-out wheel, button, or direct input does not decrease the zoom below `10%`
