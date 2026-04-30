## Context

The preview panel stores zoom as a numeric scale factor. The UI renders it as a percentage with `Math.round(zoom * 100)`, so a maximum scale of `20` corresponds to `2000%`.

Today the zoom boundaries are defined directly in `PreviewPanel.tsx`:

```ts
const minZoom = 0.25;
const maxZoom = 3;
```

The requested change is intentionally narrow: keep the preview's local zoom/pan state model, but make the zoom limits centrally configurable, require `Shift` for wheel zoom, and add direct zoom controls.

## Goals / Non-Goals

**Goals:**
- Define preview zoom limits in a global configuration module.
- Set the minimum preview zoom to 10%.
- Increase maximum preview zoom to 2000%.
- Keep the preview panel responsible for local zoom and pan state.
- Make the new constants easy to reuse in future preview controls or tests.
- Let users configure the wheel/button zoom step from the preview header.
- Clearly label the zoom step input and editable zoom percentage control.
- Validate the zoom step as a positive integer multiple of `10`.
- Allow users to zoom via `Shift` + wheel, minus/plus buttons, or a direct percentage input.
- Validate direct zoom percentage input as a `10`-multiple between `10` and `2000`.

**Non-Goals:**
- Add a user-facing settings screen.
- Add sliders for zoom.
- Change pan behavior, transform origin, export behavior, or Mermaid rendering.
- Persist zoom settings across sessions.

## Design

Add a dedicated preview config module:

```ts
export const PREVIEW_MIN_ZOOM = 0.1;
export const PREVIEW_MAX_ZOOM = 20;
```

Then import those constants in `PreviewPanel.tsx` and use them in shared clamp logic. The delta for `Shift` + wheel and the minus/plus buttons is based on a preview-local zoom step percentage, defaulting to `10`:

```ts
const step = zoomStep / 100;
const delta = event.deltaY > 0 ? -step : step;
setZoom((current) => clampZoom(current + delta));
```

The preview stage uses a native non-passive `wheel` listener instead of React `onWheel` so `Shift` + wheel can reliably prevent the browser's default horizontal scrolling. The handler uses `deltaY` when present and falls back to `deltaX` because browsers may report `Shift` + wheel as horizontal wheel movement.

For wheel zoom, the diagram uses a top-left transform origin and updates pan while changing zoom so the diagram point under the mouse cursor remains under that cursor. Button and direct-input zoom keep the existing simple zoom behavior.

This keeps the behavior simple:

```text
wheel event
    |
    v
Shift held?
    | no
    v
allow native preview scrolling

Shift held?
    | yes
    v
prevent default horizontal scrolling
    |
    v
read deltaY, or deltaX when deltaY is zero
    |
    v
current zoom + delta + cursor anchor
    |
    v
clamp between global min/max and adjust pan
    |
    v
render transform scale(zoom)
    |
    v
display Math.round(zoom * 100)%
```

Add a compact labeled step input to the left of the current zoom percentage control, and replace the old reset button with an editable percentage field flanked by zoom buttons:

```text
Step [ 10 ]  Zoom [-][100][%][+]
```

Both inputs keep the user-entered text so invalid values can be corrected naturally. A parsed step value is only applied to wheel/button zoom when it is a positive integer multiple of `10`; otherwise the last valid step remains active and an inline `aria-live` message explains the issue. A parsed zoom percentage is applied immediately only when it is a positive integer multiple of `10` within `10` through `2000`; otherwise the rendered diagram keeps the last valid zoom level.

## Decisions

### 1. Use a TypeScript config module

A TypeScript module gives named exports, type checking, and straightforward imports. It also avoids introducing build-time environment variables for a value that is currently an application constant.

### 2. Store zoom as scale factors, not percentages

The preview panel already uses scale factors for CSS transforms. Keeping `20` instead of `2000` avoids conversion churn and matches the existing `zoom * 100` display logic.

### 3. Keep the minimum zoom in the same config

Defining both bounds together makes the zoom policy coherent and prevents a future mismatch where one boundary is global and the other remains local.

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| At 2000%, users can pan far away from the visible diagram | Keep the editable zoom field so users can return directly to `100` |
| Very large scaled SVGs may feel less smooth on low-powered machines | Preserve current wheel step and only render via CSS transform |
| A global constant may be mistaken for runtime user configuration | Name and locate it as application configuration, not user preferences |
| Invalid zoom step input could make wheel/button zoom unpredictable | Keep using the previous valid step while showing inline validation feedback |
| Invalid zoom percentage input could move the diagram unexpectedly | Keep the rendered zoom at the last valid value until the input is corrected |

## Open Questions

_None. The requested value and scope are clear._
