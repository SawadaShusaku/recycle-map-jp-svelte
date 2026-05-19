## 1. Data Investigation

- [x] 1.1 Query local or preview D1 to sample `facilities.notes` and `place_collection_entries.notes` values
- [x] 1.2 Identify and categorize unwanted patterns (facility-type labels, operating-hour strings, etc.)
- [x] 1.3 Document findings in a markdown report under `openspec/changes/review-popup-note-display/audit-report.md`
- [x] 1.4 Determine whether pollution is primarily in `facilities.notes` or `place_collection_entries.notes`

## 2. Sanitization Implementation

- [x] 2.1 Extend `INTERNAL_NOTE_PATTERNS` in `src/lib/public-data-quality.ts` with new regex patterns for identified unwanted strings
- [x] 2.2 Add unit tests in `src/lib/server/__tests__/public-facility.test.ts` covering new exclusion patterns and preservation of valid notes
- [x] 2.3 Run `npm run test` to verify sanitization logic passes
- [x] 2.4 Run `npm run smoke` to ensure SSR and popup rendering remain intact

## 3. Frontend Verification

- [x] 3.1 Verify popup UI (`+page.svelte`) handles `null` notes gracefully without layout shifts
- [x] 3.2 Confirm valid location hints (e.g., "入口横") still render correctly in category detail tab
- [x] 3.3 Check that operating hours continue to display via the dedicated `hours` field when `notes` is sanitized to `null`

## 4. Data Pipeline Feedback

- [x] 4.1 Summarize audit findings and recommended upstream fixes for the private data pipeline
- [x] 4.2 Propose schema or validation changes to prevent future note pollution at the source
