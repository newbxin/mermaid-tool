## Why

The preview panel currently clamps Mermaid diagram zoom to 300% with a component-local constant. Very large diagrams can still be difficult to inspect at that limit, especially when users need to review dense labels, node details, or exported diagram structure.

Moving the zoom limit into a global configuration keeps the behavior easy to tune from one place and avoids scattering display constraints inside UI components. Raising the maximum to 2000% gives users enough range for detailed inspection without changing the existing wheel-based interaction model.

## What Changes

- Add a global preview zoom configuration for minimum and maximum zoom values.
- Replace the preview panel's local `maxZoom = 3` limit with the global maximum zoom value.
- Set the maximum preview zoom to `20`, which displays as `2000%`.
- Keep the current minimum zoom behavior at `0.25` / `25%`.
- Add a user-facing zoom step input next to the zoom percentage control.
- Validate the zoom step as a positive integer multiple of `10` and show a friendly inline message when invalid.
- Preserve existing zoom reset, pan, and percentage display behavior.

## Capabilities

### Modified Capabilities

- `mermaid-preview`: Preview zoom limits become globally configurable, the maximum supported zoom increases from 300% to 2000%, and users can configure the wheel zoom step.

### New Capabilities

_None._

## Impact

- Affects `src/components/PreviewPanel.tsx`.
- Affects preview header styles for labeled zoom controls and validation feedback.
- Adds a small shared configuration module, expected at `src/config/preview.ts` or an equivalent project-level config location.
- No dependency changes.
- No changes to Mermaid rendering, SVG sanitization, export behavior, or layout behavior.
