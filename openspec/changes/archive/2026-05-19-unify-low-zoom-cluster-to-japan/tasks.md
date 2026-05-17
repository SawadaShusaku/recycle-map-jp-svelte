## 1. Add configuration constant

- [x] 1.1 Add `JAPAN_WIDE_CLUSTER_MAX_ZOOM = 3` to `src/lib/constants/map.ts`
- [x] 1.2 Export the new constant from `src/lib/map/facility-rendering.ts` if needed by other modules
- [x] 1.3 Verify the constant is imported correctly in `src/routes/+page.svelte`

## 2. Implement Japan-wide cluster data helper

- [x] 2.1 Add `buildJapanWideSummaryFeatureCollection(facilities)` to `src/lib/map/facility-rendering.ts`
- [x] 2.2 The helper returns a `FeatureCollection<Point>` with a single feature containing:
  - `coordinates`: centroid (mean lng/lat) of all valid facilities
  - `properties`: `facilityCount` (total), `label` (e.g. "日本全国"), `cityLabel` (same as label)
- [x] 2.3 Handle empty facilities case by returning empty `FeatureCollection`
- [x] 2.4 Add unit tests for the helper in `src/lib/map/__tests__/facility-rendering.test.ts`

## 3. Update page-level derived state

- [x] 3.1 Add `showJapanWideCluster` derived state in `src/routes/+page.svelte` using `currentZoom <= JAPAN_WIDE_CLUSTER_MAX_ZOOM`
- [x] 3.2 Add `japanWideSummarySourceData` derived from `buildJapanWideSummaryFeatureCollection(facilities)`
- [x] 3.3 Ensure `summaryLevel` derivation remains unchanged (still `'prefecture' | 'municipality'`)

## 4. Add Japan-wide cluster map layers

- [x] 4.1 Add a new `GeoJSONSource` with `id="japan-wide-cluster"` and `data={japanWideSummarySourceData}` in the MapLibre component tree
- [x] 4.2 Add a `CircleLayer` for the Japan-wide cluster background with `minzoom={0}` and `maxzoom={JAPAN_WIDE_CLUSTER_MAX_ZOOM + 0.01}`
- [x] 4.3 Add a `SymbolLayer` for the Japan-wide cluster label showing the label text and facility count
- [x] 4.4 Style the cluster using existing color constants (`CLUSTER_COLOR`, `CLUSTER_CIRCLE_STROKE_COLOR`, etc.)

## 5. Control administrative summary layer visibility

- [x] 5.1 Set `minzoom` on administrative summary layers (FillLayer, LineLayer, SymbolLayer) to `JAPAN_WIDE_CLUSTER_MAX_ZOOM + 0.01`
- [x] 5.2 Alternatively, use conditional `{#if !showJapanWideCluster}` blocks around the administrative summary GeoJSON sources
- [x] 5.3 Verify that administrative summaries do not render when Japan-wide cluster is active

## 6. Implement Japan-wide cluster click interaction

- [x] 6.1 Add `handleJapanWideClusterClick` function that calls `map.easeTo` with zoom `PREFECTURE_CLICK_ZOOM` and center at cluster position
- [x] 6.2 Attach the click handler to the Japan-wide cluster CircleLayer and SymbolLayer
- [x] 6.3 Ensure `selectedFacilityId` is cleared on click (same as existing summary click behavior)

## 7. Testing and verification

- [x] 7.1 Run `npm run test` to verify unit tests pass
- [x] 7.2 Run `npm run check` for TypeScript type checking
- [x] 7.3 Run `npm run smoke` to verify SSR and browser rendering work correctly
- [x] 7.4 Manually verify in browser:
  - At zoom ≤ 3, only Japan-wide cluster is visible
  - At zoom > 3, prefecture/municipality summaries appear
  - Clicking Japan-wide cluster zooms to ~9.2
  - Filter changes update cluster position and count

## 8. Finalize

- [x] 8.1 Review code for consistency with existing patterns
- [x] 8.2 Update `jj describe` with change summary
