## Why

Smartphone users currently have to target the small bottom-sheet handle or close button to control the facility detail sheet. This makes the sheet feel harder to manipulate on touch devices, especially when users naturally swipe over the image or description areas.

## What Changes

- Remove the mobile bottom sheet close ("X") button from the sheet UI.
- Allow vertical swipe gestures across the bottom sheet surface to resize or close the sheet, including image and description sections where the gesture does not conflict with a more specific interaction.
- Preserve horizontal image carousel swipes so left/right gestures continue to change images without accidentally moving the sheet.
- Keep taps on links, buttons, tabs, route controls, and other interactive controls working normally.
- Keep existing data display and public-data safeguards unchanged.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `popup-ui`: Update mobile bottom sheet close and swipe behavior requirements.

## Impact

- Affected UI: mobile facility detail bottom sheet in `src/routes/+page.svelte`.
- Affected interactions: pointer/touch gesture handling for sheet drag, image carousel swipe, scrollable popup content, and close affordances.
- Affected tests: Svelte type checking and focused browser/E2E coverage for mobile bottom sheet gesture behavior; run smoke because the change touches browser-only pointer and viewport APIs.
- No API, database, seed, geocoding, or private/public data pipeline changes.
