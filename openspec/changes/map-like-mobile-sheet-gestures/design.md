## Context

The mobile facility detail surface is a fixed bottom sheet in `src/routes/+page.svelte`. It has a visible handle, but map applications train users to drag and scroll the sheet from broad sheet regions rather than from the small handle alone. The current browser behavior can expose pull-to-refresh when a downward swipe begins inside the sheet at a scroll boundary.

This change is UI-only. It does not alter facility data, public API responses, D1 schema, GeoJSON shape, deduplication behavior, geocoding, or data validation requirements.

## Goals / Non-Goals

**Goals:**

- Make the mobile bottom sheet handle vertical gestures like Google Maps / Apple Maps style sheets.
- Allow normal sheet content scrolling while the content can scroll.
- Move or close the sheet when a vertical gesture reaches a scroll boundary or begins on non-scrollable sheet content.
- Prevent browser pull-to-refresh and background map/page movement while the sheet is open.
- Keep existing desktop behavior unchanged.

**Non-Goals:**

- No handle-only drag model.
- No new modal framework or external dependency.
- No changes to popup content, markers, route calculation, data serving, or data quality rules.

## Decisions

1. Use gesture arbitration instead of handle-only dragging.
   - The sheet keeps a broad pointer gesture surface.
   - Interactive controls remain tappable; taps are not converted into drags unless movement crosses the existing threshold.
   - Text inputs/select-like elements stay exempt so browser editing gestures remain available.

2. Prevent browser pull-to-refresh at sheet scroll boundaries.
   - Add sheet-level touch tracking that detects vertical gestures.
   - If inner content cannot scroll further in the gesture direction, call `preventDefault()` on the touch move before the browser takes over.
   - If inner content can scroll, let it scroll and update the touch baseline so handoff remains stable.

3. Keep sheet movement and content scroll separate but coordinated.
   - Use the existing pointer-driven sheet resize/close behavior for the actual sheet movement.
   - Use the new touch guard only to stop browser-native overscroll/pull-to-refresh at the same gesture boundaries.

4. Preserve modal background behavior.
   - Keep mobile-only body scroll locking and MapLibre interaction suspension while the sheet is open.
   - Keep backdrop close and modal dialog semantics.

## Risks / Trade-offs

- Browser touch behavior differs across iOS Safari and Chromium mobile. → Use both body locking and sheet-level boundary `preventDefault()` rather than relying on `overscroll-behavior` alone.
- Over-eager prevention can break natural content scrolling. → Only prevent vertical touch movement when the sheet should handle the gesture or the relevant scrollable content is at its boundary.
- Interactive controls could feel sticky if treated as drag handles. → Keep pointer drag ignored for controls, but still guard vertical touch movement from becoming browser pull-to-refresh.
