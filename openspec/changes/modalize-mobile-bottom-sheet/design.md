## Context

The mobile facility detail surface is rendered in `src/routes/+page.svelte` as a fixed bottom sheet with a backdrop and drag-to-resize behavior. It already uses `role="dialog"`, but the background map and viewport can still respond to touch gestures, especially on mobile browsers where `overflow: hidden` alone is not reliable.

This change is UI-only. It does not alter facility data, public API responses, D1 schema, GeoJSON shape, deduplication behavior, geocoding, or data validation requirements.

## Goals / Non-Goals

**Goals:**

- Make the smartphone bottom sheet act as a modal detail view while selected facility details are open.
- Prevent accidental background page scrolling, map dragging, zoom gestures, and mobile rubber-band overscroll behind the sheet.
- Keep bottom sheet content usable, including internal scrolling, drag-to-resize/close, media carousel swipes, route controls, and backdrop tap-to-close.
- Preserve existing desktop detail panel and popup behavior.

**Non-Goals:**

- No changes to facility data, place deduplication, GeoJSON schema, D1 queries, or API response shape.
- No new modal framework or external dependency.
- No redesign of popup content, marker behavior, routing, or media loading.

## Decisions

1. Lock the document body while the mobile sheet is open.
   - Use a Svelte `$effect` that applies a fixed-position body lock only in the browser when `isMobile && selectedFacility` is true.
   - Store the current scroll position and restore it on cleanup so closing the sheet does not jump the page.
   - Alternative considered: `document.body.style.overflow = 'hidden'` only. This is simpler, but iOS Safari can still allow viewport movement and rubber-band scrolling in some nested touch scenarios.

2. Disable MapLibre interactions while the mobile sheet is open.
   - Temporarily disable drag pan, scroll zoom, box zoom, double-click zoom, touch zoom/rotate, and keyboard interactions when the sheet is modal.
   - Re-enable only the interactions that were enabled before the modal opened.
   - Alternative considered: relying only on the backdrop. The backdrop blocks pointer events visually, but disabling MapLibre directly prevents interaction leakage from gesture edge cases and keeps the modal contract explicit.

3. Keep sheet-local gestures inside the sheet.
   - Preserve the existing pointer-based sheet drag code and scrollable ancestor checks.
   - Add CSS touch containment to the sheet/backdrop so background overscroll is suppressed while content inside the sheet can still scroll where intended.
   - Alternative considered: disabling all touch movement while open. That would make the sheet feel locked and would break content scrolling and media gestures.

4. Strengthen modal accessibility semantics.
   - Add `aria-modal="true"` to the mobile bottom sheet dialog.
   - Keep the existing backdrop and close behaviors.
   - Full focus trapping is not included in this narrow change because the app's primary issue is mobile touch/background interaction, and the sheet is already the active visual surface.

## Risks / Trade-offs

- iOS Safari body locking can cause scroll position jumps if cleanup is incomplete. → Store and restore `window.scrollY` and reset all inline body styles on cleanup.
- Map interactions may remain disabled if cleanup is missed. → Put all interaction toggling inside an effect cleanup tied to `isMobile && selectedFacility`.
- Internal sheet scrolling could be over-constrained by touch CSS. → Apply strict touch blocking to backdrop and sheet container, while keeping the sheet body as the scroll/content surface controlled by existing code.
- Accessibility improves with modal semantics but is not a complete focus trap. → Keep this scoped to mobile background motion prevention and consider focus management as a follow-up if keyboard mobile usage becomes a priority.
