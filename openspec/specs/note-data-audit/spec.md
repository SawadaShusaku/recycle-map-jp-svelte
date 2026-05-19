# note-data-audit Specification

## Purpose
Provide automated detection and reporting of unwanted string patterns within `notes` fields across the dataset, enabling data quality review and pipeline feedback.

## Requirements

### Requirement: Automated detection of unwanted note patterns
The system SHALL provide a mechanism to detect and report unwanted string patterns within `notes` fields across the dataset.

#### Scenario: Detect facility-level note pollution
- **WHEN** the audit process scans `facilities.notes`
- **THEN** it identifies notes containing facility-type labels such as "自治体施設", "郵便局", or generic operating-hour strings like "開館時間"
- **AND** it produces a report listing affected facility IDs and their raw note values

#### Scenario: Detect entry-level note pollution
- **WHEN** the audit process scans `place_collection_entries.notes`
- **THEN** it applies the same detection patterns
- **AND** it reports any entry-level notes that contain facility-type or operating-hour strings instead of location hints

### Requirement: Audit report format
The audit output SHALL be human-readable and actionable, supporting both developer review and pipeline feedback.

#### Scenario: Generate structured audit report
- **WHEN** the audit completes
- **THEN** it outputs a structured report (JSON or markdown) grouped by pattern type
- **AND** each entry includes the record ID, the matched pattern, and the full note text
