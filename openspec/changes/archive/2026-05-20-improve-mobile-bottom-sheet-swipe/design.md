## Context

The mobile facility detail surface is implemented in `src/routes/+page.svelte` as a bottom sheet that renders the same hero/media block and popup card used by the desktop detail panel. The current sheet height drag handlers are attached only to the small handle area, while the media hero has separate horizontal swipe handling for image navigation.

The requested change is UI-only: it affects smartphone sheet controls and gesture recognition, but does not change facility data, APIs, D1 access, GeoJSON/seed generation, geocoding, deduplication, or public/private data boundaries.

## Goals / Non-Goals

**Goals:**

- Remove the mobile bottom sheet close button affordance from the sheet UI.
- Let users drag the mobile bottom sheet vertically from most of the sheet surface, including image and descriptive content areas where no more specific vertical gesture should take precedence.
- Preserve horizontal media carousel swipes and normal activation of links, tabs, buttons, and route controls.
- Keep the implementation compatible with Svelte 5 runes and SSR by using browser-only APIs only inside pointer event handlers or guarded code.

**Non-Goals:**

- No changes to desktop detail panel behavior beyond avoiding regressions.
- No changes to map marker selection, facility data, data validation, deduplication, GeoJSON schema, D1 schema, or media sanitization.
- No new gesture library or external dependency.

## Decisions

1. Attach sheet drag recognition to the bottom sheet container instead of only the handle.

   This expands the drag hit area without duplicating gesture listeners across the hero, popup body, and description sections. The alternative was attaching handlers to each major child section, but that would make future detail content easier to miss and would increase event-order complexity.

2. Gate drag start for interactive controls and horizontally dominant image gestures.

   Pointer down events that originate from buttons, links, form controls, tabs, or other explicit controls should not start sheet dragging. For the hero image area, horizontal movement should remain available for previous/next image navigation, while vertical movement can be treated as sheet dragging once the gesture direction is clear. The alternative was making the whole sheet always capture every pointer gesture, but that would break expected taps and carousel swipes.

3. Keep the visible handle as an affordance but remove the mobile close button.

   The handle remains useful as a discoverability cue and a precise drag target. Closing should happen through downward sheet drag below the close threshold or backdrop tap, rather than an in-sheet X button. The alternative was replacing the close button with a different icon-only control, but the request explicitly removes the X affordance.

4. Keep the change local to `src/routes/+page.svelte`.

   The current sheet, hero, and popup composition all live in this file, so a local refactor is sufficient. Extracting a dedicated bottom sheet component can be considered later if the gesture logic grows beyond this change.

## Risks / Trade-offs

- [Risk] Expanded drag handling could interfere with content scrolling or taps. -> Mitigation: ignore interactive descendants at drag start, use movement thresholds before committing to a drag, and verify on a mobile viewport.
- [Risk] Vertical sheet dragging and horizontal media swiping can compete in the hero section. -> Mitigation: use direction locking so horizontal gestures stay with the carousel and vertical gestures move the sheet.
- [Risk] Pointer capture on the wrong element can prevent child controls from receiving expected events. -> Mitigation: capture only after drag intent is established or only for non-interactive drag origins.
- [Risk] Browser-only viewport math can cause SSR runtime issues if evaluated during render. -> Mitigation: keep `window.innerHeight` access inside pointer handlers and run `npm run smoke`.

## Migration Plan

Implement as a frontend-only change, run checks, then deploy through the normal Cloudflare build flow. Rollback is reverting the Svelte component changes; no data migration or schema rollback is required.

## Open Questions

None. The implementation should use the existing sheet height thresholds unless testing shows they need small tuning.
