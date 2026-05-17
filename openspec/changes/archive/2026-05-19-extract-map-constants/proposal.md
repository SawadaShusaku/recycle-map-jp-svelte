## Why

Map-related constants (zoom levels, cluster radii, animation durations, marker dimensions) are currently scattered across `src/lib/map/facility-rendering.ts` and `src/routes/+page.svelte`. This duplication makes tuning visual behavior risky and discovery of existing constants difficult. A dedicated `src/lib/constants/map.ts` provides a single source of truth that both server-side logic and client-side rendering can import from.

## What Changes

- Create `src/lib/constants/map.ts` with all map-related numeric/string constants
- Move exported constants from `src/lib/map/facility-rendering.ts` into the new file
- Move cluster/zoom/rendering constants from `src/routes/+page.svelte` into the new file
- Update all imports across the project to reference `$lib/constants/map.ts`
- Keep module-private constants in their original files (no unnecessary exports)

## Capabilities

### New Capabilities
<!-- No new user-facing capabilities — this is an internal refactoring. -->

### Modified Capabilities
<!-- No spec-level behavior changes — constants extraction is a pure refactor. -->

## Impact

- `src/lib/map/facility-rendering.ts`: constants removed, re-exported from new file (backward-compatible)
- `src/routes/+page.svelte`: inline constants removed, imported from new file
- `src/lib/map/admin-boundaries.ts`, `src/lib/map/__tests__/facility-rendering.test.ts`: may need import updates if they reference moved constants
- No runtime behavior changes — all values remain identical
