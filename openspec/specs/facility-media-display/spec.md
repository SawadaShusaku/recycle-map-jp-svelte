# facility-media-display Specification

## Purpose
TBD - created by archiving change restore-facility-media-and-place-deduplication. Update Purpose after archive.
## Requirements
### Requirement: Approved facility media
The app SHALL display facility media only from approved public media references.

#### Scenario: Facility has approved image
- **WHEN** a facility record includes an approved image or street-level media reference
- **THEN** the facility detail surface displays the media with appropriate alt text or fallback label
- **AND** the media display includes source attribution or a source link when required by the provider

#### Scenario: Facility has no approved image
- **WHEN** a facility record has no approved media reference
- **THEN** the popup and detail surfaces remain usable without a broken image, empty frame, or loading spinner

### Requirement: Media request failure fallback
The app SHALL gracefully recover when optional facility media cannot be loaded.

#### Scenario: Media fetch fails
- **WHEN** the app fails to fetch optional nearby media or an image request fails
- **THEN** the popup/detail content still renders facility name, address, categories, route controls, and public source information
- **AND** the failure does not prevent the marker popup from opening

### Requirement: Public media field minimization
Public facility media fields SHALL contain only display-safe URLs, attribution, provider identifiers, and alt text required by the user-facing app.

#### Scenario: Serialize media fields
- **WHEN** the API serializes a facility with media
- **THEN** the response includes only approved public media fields
- **AND** it does not include private scraping metadata, provider response bodies, token-bearing URLs, or internal review notes
- **AND** it does not include facility-type labels, operating-hour references, or other non-informative strings that belong in dedicated fields or should be omitted entirely

### Requirement: Media associated with normalized places or entries
Approved public media SHALL be associated with the level it describes: a place when it represents the whole location, or a collection entry when it represents category-specific reception details.

#### Scenario: Place-level media exists
- **WHEN** approved media describes the overall place
- **THEN** the public API can return that media for the place detail view
- **AND** the media includes required alt text and attribution/source fields

#### Scenario: Entry-level media exists
- **WHEN** approved media describes a category-specific counter, box, or location hint
- **THEN** the media is associated with the relevant collection entry
- **AND** the UI can present it without implying it applies to unrelated categories at the same place

#### Scenario: Media URL is unsafe
- **WHEN** a media URL contains access tokens, API keys, signatures, or provider response internals
- **THEN** seed validation fails or removes that media from public serving output

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

