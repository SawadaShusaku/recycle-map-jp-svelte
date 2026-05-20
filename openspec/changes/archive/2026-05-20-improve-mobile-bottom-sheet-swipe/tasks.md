## 1. Validation and Scope Check

- [x] 1.1 Confirm the change is limited to the mobile bottom sheet UI and does not require data, D1, GeoJSON, deduplication, or geocoding changes.
- [x] 1.2 Inspect the current bottom sheet, popup card, and hero image pointer handlers in `src/routes/+page.svelte`.
- [x] 1.3 Identify interactive descendants that must not start sheet dragging, including links, buttons, tabs, form controls, and route controls.

## 2. Gesture Implementation

- [x] 2.1 Move bottom sheet drag handling from the handle-only target to the sheet surface while keeping the visible handle affordance.
- [x] 2.2 Add drag-start gating so interactive controls keep their normal tap/click behavior.
- [x] 2.3 Add direction-aware gesture handling so vertically dominant gestures resize or close the sheet and horizontally dominant hero gestures keep controlling the image carousel.
- [x] 2.4 Ensure sheet height clamping, close threshold behavior, and selected facility clearing remain consistent with the existing behavior.

## 3. UI Cleanup

- [x] 3.1 Remove the mobile bottom sheet in-sheet close button affordance while preserving desktop detail panel close behavior.
- [x] 3.2 Adjust bottom sheet CSS only as needed for expanded drag coverage, touch action, and non-overlapping mobile layout.
- [x] 3.3 Verify the image section, description sections, tabs, and routing controls remain usable after gesture changes.

## 4. Verification

- [x] 4.1 Run `npm run check`.
- [x] 4.2 Run focused mobile browser or Playwright verification for bottom sheet drag, close, and image carousel gestures.
- [x] 4.3 Run `npm run smoke` because the change touches pointer events, viewport sizing, and SSR-sensitive browser APIs.
- [x] 4.4 Review `jj diff` and update the change description with `jj describe` after implementation verification.
