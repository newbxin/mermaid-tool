## 1. Preview Zoom Configuration

- [x] 1.1 Add a global preview configuration module, such as `src/config/preview.ts`.
- [x] 1.2 Export `PREVIEW_MIN_ZOOM = 0.1`.
- [x] 1.3 Export `PREVIEW_MAX_ZOOM = 20`.

## 2. Preview Panel Integration

- [x] 2.1 Import the preview zoom constants in `src/components/PreviewPanel.tsx`.
- [x] 2.2 Remove the component-local `minZoom` and `maxZoom` constants.
- [x] 2.3 Update the wheel zoom clamp to use `PREVIEW_MIN_ZOOM` and `PREVIEW_MAX_ZOOM`.
- [x] 2.4 Verify the zoom percentage display reaches `2000%`.
- [x] 2.5 Replace click-to-reset zoom percentage with editable zoom percentage control.
- [x] 2.6 Prevent text selection while dragging the zoomed preview diagram.

## 3. Validation

- [x] 3.1 Run the TypeScript/Vite build.
- [ ] 3.2 Manually render a Mermaid diagram and confirm `Shift` + wheel zoom is clamped between 10% and 2000%.
- [ ] 3.3 Confirm panning still works when zoom is greater than 100%.
- [ ] 3.4 Confirm SVG and PNG export behavior is unchanged.

## 4. Configurable Zoom Step

- [x] 4.1 Add a labeled zoom step input to the left of the zoom percentage control.
- [x] 4.2 Use the last valid step value for wheel zoom increments.
- [x] 4.3 Validate that the step is a positive integer multiple of `10`.
- [x] 4.4 Show friendly validation feedback for invalid step input.
- [x] 4.5 Add labels that distinguish the step input from the zoom percentage display.
- [x] 4.6 Run the TypeScript/Vite build.

## 5. Shift-Wheel and Direct Zoom Controls

- [x] 5.1 Require `Shift` for mouse wheel zoom and allow normal wheel scrolling otherwise.
- [x] 5.2 Add minus and plus buttons beside the zoom percentage field.
- [x] 5.3 Use the current valid zoom step for minus and plus button increments.
- [x] 5.4 Support direct zoom percentage input.
- [x] 5.5 Validate direct zoom percentage as a `10` multiple between `10` and `2000`.
- [x] 5.6 Show friendly validation feedback for invalid direct zoom input without changing rendered zoom.
- [x] 5.7 Update OpenSpec design and requirement scenarios for the new zoom interaction.
- [x] 5.8 Run the TypeScript/Vite build after the interaction update.

## 6. Shift-Wheel Horizontal Scroll Fix

- [x] 6.1 Replace React preview `onWheel` handling with a native non-passive `wheel` listener.
- [x] 6.2 Prevent default browser horizontal scrolling for `Shift` + wheel zoom gestures.
- [x] 6.3 Use `deltaY` or fallback `deltaX` to determine zoom direction.
- [x] 6.4 Keep plain wheel scrolling behavior unchanged when `Shift` is not held.
- [x] 6.5 Update OpenSpec design and requirement scenarios for the horizontal scroll fix.
- [x] 6.6 Run the TypeScript/Vite build after the horizontal scroll fix.

## 7. Cursor-Anchored Wheel Zoom

- [x] 7.1 Add a diagram canvas ref for measuring the current transformed diagram bounds.
- [x] 7.2 Anchor `Shift` + wheel zoom to the mouse cursor by adjusting pan during zoom changes.
- [x] 7.3 Use a top-left transform origin so cursor-anchor math is stable.
- [x] 7.4 Preserve existing plus/minus button and direct-input zoom behavior.
- [x] 7.5 Update OpenSpec design and requirement scenarios for cursor-anchored wheel zoom.
- [x] 7.6 Run the TypeScript/Vite build after the cursor-anchored zoom update.
