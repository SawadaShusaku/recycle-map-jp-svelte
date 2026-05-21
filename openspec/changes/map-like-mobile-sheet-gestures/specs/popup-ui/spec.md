## ADDED Requirements

### Requirement: Mobile bottom sheet map-style gesture arbitration
On viewports narrower than 640px, the facility bottom sheet SHALL arbitrate vertical gestures across the sheet surface like a map application bottom sheet: scroll sheet content when possible, move the sheet when content cannot scroll further, and prevent the browser page from taking over the gesture.

#### Scenario: Downward swipe at top of sheet content
- **WHEN** a facility bottom sheet is open on a viewport with width < 640px
- **AND** the user swipes downward inside the sheet while the relevant sheet content is already scrolled to its top
- **THEN** the browser pull-to-refresh UI does not appear
- **AND** the page behind the sheet does not move
- **AND** the gesture is handled by the sheet

#### Scenario: Scrollable content can still move
- **WHEN** a facility bottom sheet is open on a viewport with width < 640px
- **AND** the user swipes vertically inside scrollable sheet content that can still scroll in that direction
- **THEN** the content scrolls normally
- **AND** the browser page does not refresh or scroll behind the sheet

#### Scenario: Non-scrollable sheet surface
- **WHEN** a facility bottom sheet is open on a viewport with width < 640px
- **AND** the user swipes vertically from a non-scrollable region of the sheet such as the media/header area or body whitespace
- **THEN** the gesture is handled by the sheet rather than the browser page

#### Scenario: Controls remain tappable
- **WHEN** a facility bottom sheet is open on a viewport with width < 640px
- **THEN** buttons, links, tabs, media controls, and route controls inside the sheet remain tappable
- **AND** tapping the backdrop still closes the sheet

### Requirement: Mobile bottom sheet modal background lock
On viewports narrower than 640px, the facility bottom sheet SHALL behave as a modal detail surface while open, preventing interaction with the background map and page until the sheet is closed.

#### Scenario: Bottom sheet blocks background gestures
- **WHEN** a facility bottom sheet is open on a viewport with width < 640px
- **THEN** dragging, scrolling, pinching, or tapping outside the sheet does not pan, zoom, or otherwise operate the map
- **AND** the page behind the sheet does not scroll or rubber-band

#### Scenario: Bottom sheet exposes modal semantics
- **WHEN** a facility bottom sheet is open on a viewport with width < 640px
- **THEN** the sheet is exposed as a dialog with modal semantics
- **AND** the backdrop can be tapped to close the sheet

## MODIFIED Requirements

### Requirement: Popup transitions are animated
The popup SHALL animate between closed and open states so facility details appear smoothly without obscuring the selected marker or shifting unrelated map controls. On mobile viewports, the bottom sheet SHALL slide from the bottom edge and then remain the active map-style modal detail surface; on desktop viewports, the marker-attached popup SHALL use a subtle enter and exit transition.

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
