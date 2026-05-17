## 1. Create `src/lib/constants/map.ts`

- [x] 1.1 Create `src/lib/constants/` directory
- [x] 1.2 Define `ClusterZoomValues` type and group all cluster zoom thresholds from `facility-rendering.ts`
- [x] 1.3 Move all cluster radius/dimension constants into grouped `as const` objects
- [x] 1.4 Move marker icon dimension constants
- [x] 1.5 Move cluster rendering style constants from `+page.svelte` (colors, opacities, strokes, fonts)
- [x] 1.6 Move cluster radius/halo/text size grouped objects from `+page.svelte`
- [x] 1.7 Move bottom sheet VH constants from `+page.svelte`
- [x] 1.8 Move `DEFAULT_MAP_STYLE_URL` and `SWIPE_THRESHOLD_PX` from `+page.svelte`
- [x] 1.9 Organize into section-grouped exports with JSDoc comments

## 2. Update `src/lib/map/facility-rendering.ts`

- [x] 2.1 Remove all exported constant definitions
- [x] 2.2 Add re-exports: `export { ... } from '$lib/constants/map'`

## 3. Update `src/routes/+page.svelte`

- [x] 3.1 Replace all inline constant definitions with imports from `$lib/constants/map`
- [x] 3.2 Remove `DEFAULT_MAP_STYLE_URL`, cluster constants, sheet VH constants, `SWIPE_THRESHOLD_PX`
- [x] 3.3 Import `ClusterZoomValues` type from `$lib/constants/map` (remove local definition if exists)

## 4. Verify

- [x] 4.1 Run `npm run check` for type errors
- [x] 4.2 Run `npm run test` for unit tests
- [x] 4.3 Run `npm run smoke` for SSR/build correctness
