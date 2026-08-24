## Why

Mobile users can currently interact with the map and page behind the facility bottom sheet, which makes the detail surface feel less modal and can cause accidental map movement while reading or dragging the sheet. The bottom sheet should behave like a focused modal detail view on smartphone-sized screens while preserving the existing sheet content and drag affordances.

## What Changes

- Treat the mobile facility bottom sheet as a modal dialog while it is open.
- Prevent background page scrolling, map panning, and window overscroll from touch gestures outside the sheet.
- Preserve bottom sheet interactions: backdrop tap to close, drag-to-resize/close, internal content scrolling, hero media swipe, and close button behavior.
- Add accessibility semantics that communicate the mobile detail sheet as a modal dialog.
- Avoid changes to facility data, D1 APIs, geocoding, or public data quality behavior.

## Capabilities

### New Capabilities

### Modified Capabilities

- `popup-ui`: Mobile bottom sheet behavior changes from a map overlay that leaves the map usable after opening to a modal detail view that blocks background interaction while open.

## Impact

- Affected code: `src/routes/+page.svelte` mobile bottom sheet state, lifecycle effects, MapLibre interaction toggling, and sheet/backdrop CSS.
- Affected specs: `openspec/specs/popup-ui/spec.md` via a change delta.
- No API, database schema, seed, data validation, deployment, or dependency changes are expected.
