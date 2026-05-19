# note-sanitization Specification

## Purpose
Ensure public API responses and UI displays expose only user-facing, informative note content by filtering out facility-type labels and other non-informative strings.

## Requirements

### Requirement: Expanded note sanitization patterns
The `sanitizePublicText` function SHALL exclude notes that contain facility-type names, operating-hour references, or other non-informative strings from public API responses.

#### Scenario: Exclude facility-type labels
- **WHEN** a note contains a string matching facility-type patterns such as "自治体施設", "郵便局", "市役所", "区役所"
- **THEN** `sanitizePublicText` returns `null`
- **AND** the note is not exposed in the public API or rendered in the popup

#### Scenario: Exclude operating-hour references
- **WHEN** a note contains a string matching operating-hour patterns such as "開館時間", "閉館時間", "営業時間", "受付時間"
- **THEN** `sanitizePublicText` returns `null`
- **AND** the operating hours remain displayed only via the dedicated `hours` field

#### Scenario: Preserve valid location hints
- **WHEN** a note contains a concrete location hint such as "入口横", "1階ロビー", "駐車場内"
- **THEN** `sanitizePublicText` preserves the note
- **AND** it is returned unchanged in the public API

### Requirement: Pattern extensibility
The sanitization pattern list SHALL be maintained as a configurable array to allow future additions without structural code changes.

#### Scenario: Add new unwanted pattern
- **WHEN** a new unwanted note pattern is identified
- **THEN** a developer adds a new regex to the pattern array
- **AND** existing tests continue to pass
- **AND** the new pattern is applied immediately across all public text fields
