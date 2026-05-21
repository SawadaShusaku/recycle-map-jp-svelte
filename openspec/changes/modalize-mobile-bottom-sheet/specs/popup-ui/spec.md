## ADDED Requirements

### Requirement: Mobile bottom sheet modal behavior
On viewports narrower than 640px, the facility bottom sheet SHALL behave as a modal dialog while open, preventing interaction with the background map and page until the sheet is closed.

#### Scenario: Bottom sheet blocks background gestures
- **WHEN** a facility bottom sheet is open on a viewport with width < 640px
- **THEN** dragging, scrolling, pinching, or tapping outside the sheet does not pan, zoom, or otherwise operate the map
- **AND** the page behind the sheet does not scroll or rubber-band

#### Scenario: Bottom sheet keeps local interactions
- **WHEN** a facility bottom sheet is open on a viewport with width < 640px
- **THEN** the user can still scroll sheet content, use controls inside the sheet, swipe facility media, drag the sheet handle, and close the sheet

#### Scenario: Bottom sheet exposes modal semantics
- **WHEN** a facility bottom sheet is open on a viewport with width < 640px
- **THEN** the sheet is exposed as a dialog with modal semantics
- **AND** the backdrop can be tapped to close the sheet

## MODIFIED Requirements

### Requirement: Popup transitions are animated
The popup SHALL animate between closed and open states so facility details appear smoothly without obscuring the selected marker or shifting unrelated map controls. On mobile viewports, the bottom sheet SHALL slide from the bottom edge and then remain the active modal detail surface; on desktop viewports, the marker-attached popup SHALL use a subtle enter and exit transition.

#### Scenario: Desktop popup opens
- **WHEN** the user opens a facility popup on a viewport with width >= 640px
- **THEN** the popup appears with a brief transition
- **AND** the transition preserves the popup position above the selected marker

#### Scenario: Mobile bottom sheet opens
- **WHEN** the user opens a facility popup on a viewport with width < 640px
- **THEN** the bottom sheet slides up from the bottom of the viewport
- **AND** the map remains visible but background map interaction is disabled until the sheet closes

#### Scenario: Popup closes
- **WHEN** the user closes a desktop popup or mobile bottom sheet
- **THEN** the popup content exits with a brief transition
- **AND** the selected facility state is cleared after the close interaction
