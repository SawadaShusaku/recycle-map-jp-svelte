## 1. Scope Validation

- [x] 1.1 Confirm this change does not modify facility data, ward data, GeoJSON generation, D1 schema, API response shape, or data validation behavior.

## 2. Mobile Sheet Gesture Behavior

- [x] 2.1 Add mobile-only body scroll locking and modal background interaction suspension while the bottom sheet is open.
- [x] 2.2 Add sheet-level touch boundary guarding so downward swipes at content top do not trigger browser pull-to-refresh.
- [x] 2.3 Preserve map-app-style broad sheet gestures while keeping controls tappable and content scrollable.
- [x] 2.4 Add modal semantics and touch/overscroll containment for the mobile sheet and backdrop.

## 3. Verification

- [x] 3.1 Run `npm run check`.
- [x] 3.2 Run `npm run smoke`.
- [x] 3.3 Run a mobile-width browser check that opens a facility sheet and verifies modal/touch containment state.
- [x] 3.4 Review the Jujutsu diff and describe the working-copy change with `jj describe`.
