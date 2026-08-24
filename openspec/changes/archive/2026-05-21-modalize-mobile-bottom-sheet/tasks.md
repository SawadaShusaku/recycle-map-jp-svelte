## 1. Scope Validation

- [x] 1.1 Confirm this change does not modify facility data, ward data, GeoJSON generation, D1 schema, API response shape, or data validation behavior.

## 2. Mobile Modal Behavior

- [x] 2.1 Add a mobile-only body scroll lock that stores and restores the previous page scroll position while the bottom sheet is open.
- [x] 2.2 Disable MapLibre background interactions while the mobile bottom sheet is open, then restore the previous interaction state when it closes.
- [x] 2.3 Add modal dialog semantics to the mobile bottom sheet without changing desktop detail panel behavior.
- [x] 2.4 Add touch and overscroll containment to the bottom sheet/backdrop while preserving sheet-local scrolling, dragging, media swipe, and controls.

## 3. Verification

- [x] 3.1 Run `npm run check`.
- [x] 3.2 Run `npm run smoke` because this change touches browser and mobile viewport behavior.
- [x] 3.3 Review the resulting Jujutsu diff and describe the working-copy change with `jj describe`.
