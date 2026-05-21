## Why

The mobile facility bottom sheet still lets browser-level pull-to-refresh win in common downward swipe paths, so the sheet does not behave like the map bottom sheets users know from Google Maps or Apple Maps. Users expect the sheet itself to arbitrate vertical gestures across the sheet surface: internal content scrolls when it can, otherwise the sheet moves, and the browser page never refreshes from that gesture.

## What Changes

- Treat the mobile facility bottom sheet as a map-style gesture surface, not a tiny handle-only control.
- Prevent browser pull-to-refresh and background page movement for vertical gestures that begin inside the sheet.
- Preserve native-feeling internal sheet scrolling when scrollable content can still move.
- Transfer vertical gestures from internal scroll to sheet resize/close when the scroll boundary is reached.
- Preserve taps and controls inside the sheet, including tabs, route controls, links, media controls, and the backdrop close action.
- Avoid changes to facility data, D1 APIs, geocoding, or public data quality behavior.

## Capabilities

### New Capabilities

### Modified Capabilities

- `popup-ui`: Mobile bottom sheet gesture behavior changes to match map apps: the sheet surface owns vertical gesture arbitration and prevents browser pull-to-refresh/background movement while open.

## Impact

- Affected code: `src/routes/+page.svelte` mobile bottom sheet gesture handling, modal body lock, MapLibre interaction toggling, and touch/overscroll CSS.
- Affected specs: `openspec/specs/popup-ui/spec.md` via a change delta.
- No API, database schema, seed, data validation, deployment, or dependency changes are expected.
