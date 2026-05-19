## MODIFIED Requirements

### Requirement: Public media field minimization
Public facility media fields SHALL contain only display-safe URLs, attribution, provider identifiers, and alt text required by the user-facing app.

#### Scenario: Serialize media fields
- **WHEN** the API serializes a facility with media
- **THEN** the response includes only approved public media fields
- **AND** it does not include private scraping metadata, provider response bodies, token-bearing URLs, or internal review notes
- **AND** it does not include facility-type labels, operating-hour references, or other non-informative strings that belong in dedicated fields or should be omitted entirely

## ADDED Requirements

### Requirement: Note content quality in public display
Public facility and collection entry notes SHALL contain only user-facing, informative content. Generic facility descriptors and operating-hour strings that duplicate structured fields MUST be filtered out.

#### Scenario: Facility note with operating hours
- **WHEN** a facility note contains "開館時間：9時～17時"
- **THEN** the public API returns `null` for the note field
- **AND** the popup displays operating hours only from the dedicated `hours` field

#### Scenario: Facility note with facility type
- **WHEN** a facility note contains "この施設は自治体施設です"
- **THEN** the public API returns `null` for the note field
- **AND** the popup does not display the facility-type string as a note

#### Scenario: Entry note with valid location hint
- **WHEN** a collection entry note contains "入口横のボックス"
- **THEN** the public API preserves and returns the note
- **AND** the popup displays the note under the category detail tab
