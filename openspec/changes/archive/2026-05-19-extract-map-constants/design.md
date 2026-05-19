## Context

Currently, map constants are split across two locations:

- **`src/lib/map/facility-rendering.ts`**: 13 exported zoom/radius/marker constants + 4 module-private calculation constants. Consumed by `admin-boundaries.ts`, `facility-rendering.test.ts`, and indirectly by `+page.svelte`.
- **`src/routes/+page.svelte`**: ~25 inline constants covering cluster rendering styles (radius, color, font, opacity, stroke, label) and bottom-sheet dimensions. None are reusable outside this file.

This split means:
- Tuning cluster appearance requires editing both files
- No constants file exists — no established pattern for future constants
- The `+page.svelte` constants are invisible to tooling (import analysis, grep for usage)

## Goals / Non-Goals

**Goals:**
- Create `src/lib/constants/map.ts` as the single file for all map-related constants
- Move all exported constants from `facility-rendering.ts` to `map.ts` and re-export them from `facility-rendering.ts` for backward compatibility
- Move all inline cluster/zoom/rendering constants from `+page.svelte` to `map.ts`
- Group constants logically with JSDoc comments

**Non-Goals:**
- No runtime behavior changes — all values, groupings, and calculations remain identical
- No extraction of non-map constants (storage keys, route estimation, site metadata, etc.) — these can follow in future changes
- No extraction of module-private computation constants (e.g., `PREFECTURE_CLUSTER_MIN_RADIUS_SCALE`) unless they are useful for testing or cross-file reuse

## Decisions

1. **Single file vs. directory of files** → Start with `map.ts` only. The constants count (~40) fits one file. Split into multiple files only if it exceeds ~100 lines or covers clearly unrelated domains (e.g., animation timings vs. zoom thresholds).

2. **Backward compatibility via re-export** → `facility-rendering.ts` will re-export all moved constants with `export { ... } from './constants/map'`. This avoids breaking existing imports in one go. In a follow-up, imports can be updated to point directly to `$lib/constants/map`.

3. **Grouping structure** → Use `// ---- group name ----` section comments and TypeScript `namespace`-style grouping:
   - Cluster zoom thresholds
   - Cluster pixel radii
   - Cluster rendering styles (colors, opacities, strokes)
   - Cluster label styles (fonts, sizes, halos)
   - Marker dimensions
   - Bottom sheet dimensions
   - Animation durations
   - Animation offsets / padding

4. **No runtime config** → All constants are compile-time literals. No env-var or runtime configuration for these values — they are visual design constants, not deployment configuration.

5. **Prefer `as const` for grouped objects** → Instead of many individual exports, group related constants into `as const` objects (e.g., `CLUSTER_RADIUS_PX`, `CLUSTER_HALO_RADIUS_PX`, `CLUSTER_TEXT_SIZE_PX`) matching the existing pattern in `+page.svelte`.

## Risks / Trade-offs

- **[Churn risk]** Moving ~40 constants changes import paths. Mitigation: re-export from original file for backward compatibility; update imports in a dedicated commit.
- **[Test risk]** Test imports rely on `facility-rendering.ts` exports. Mitigation: backward-compatible re-exports mean zero test changes.
- **[Scope creep]** Temptation to extract all constants at once. Mitigation: explicitly non-goal to extract non-map constants.

## Migration Plan

1. Create `src/lib/constants/map.ts` with all constants grouped and documented
2. Replace `facility-rendering.ts` constants with re-exports from `map.ts`
3. Replace `+page.svelte` inline constants with imports from `$lib/constants/map`
4. Run `npm run check` and `npm run test`
5. Sweep for any remaining references to the old export locations
