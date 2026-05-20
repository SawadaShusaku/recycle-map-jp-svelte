# Popup UI

## Purpose

Define popup and bottom sheet behavior for facility details across desktop and mobile viewports.
## Requirements
### Requirement: Popup appears above marker
The popup SHALL be vertically offset so that it does not overlap the marker icon. On mobile viewports, this is achieved by panning the map so the marker remains visible above the bottom sheet.

#### Scenario: User clicks a marker on desktop
- **WHEN** user clicks a map marker on a viewport with width >= 640px
- **THEN** the popup opens with its bottom tip above the marker, not covering it

#### Scenario: User clicks a marker on mobile
- **WHEN** user clicks a map marker on a viewport with width < 640px
- **THEN** the map pans so the marker is centered above the bottom sheet
- **AND** the marker is not covered by the bottom sheet

### Requirement: Responsive popup display mode
The popup SHALL display as a bottom sheet on viewports narrower than 640px, and as a standard marker-attached popup on viewports 640px and wider.

#### Scenario: User clicks marker on smartphone
- **WHEN** user clicks a map marker on a viewport with width < 640px
- **THEN** a bottom sheet slides up from the bottom of the screen
- **AND** the map pans to center the marker above the bottom sheet

#### Scenario: User clicks marker on desktop
- **WHEN** user clicks a map marker on a viewport with width >= 640px
- **THEN** a popup appears above the marker as before
- **AND** the map does NOT pan automatically

### Requirement: Bottom sheet swipe to close
The bottom sheet SHALL close when the user swipes downward on the sheet surface past the close threshold. The mobile bottom sheet SHALL NOT show an in-sheet close button.

#### Scenario: User swipes down on bottom sheet handle
- **WHEN** user touches the bottom sheet handle and swipes downward past the close threshold
- **THEN** the bottom sheet slides down and closes
- **AND** the selected facility state is cleared

#### Scenario: User swipes down on bottom sheet content
- **WHEN** user touches a non-interactive area of the bottom sheet content and swipes downward past the close threshold
- **THEN** the bottom sheet slides down and closes
- **AND** the selected facility state is cleared

#### Scenario: User views bottom sheet controls
- **WHEN** the mobile bottom sheet is open
- **THEN** no close button is displayed inside the bottom sheet
- **AND** the sheet can still be dismissed by dragging downward or tapping the backdrop

### Requirement: Bottom sheet content parity
The bottom sheet SHALL contain the same content structure as the desktop popup: facility name, category color bar, category chips, basic/details tabs, address/hours/notes, category details, travel mode selector, and routing button.

#### Scenario: Bottom sheet renders for any facility
- **WHEN** the bottom sheet is displayed for any facility
- **THEN** all content elements match the desktop popup layout and information
- **AND** tab switching between "基本情報" and "カテゴリ詳細" works identically

### Requirement: Popup content structure
The popup SHALL display facility name, address, category chips, optional hours/notes, and routing controls. It SHALL NOT display a prefecture label.

#### Scenario: Popup opens for a facility
- **WHEN** the popup renders for any facility
- **THEN** it shows the facility name, address, category chips, and optional hours/notes
- **AND** it does NOT show a prefecture label such as "東京都"

### Requirement: Travel mode segment control
The popup SHALL provide a travel mode selector using three icon buttons (foot, bike, car) instead of a `<select>` dropdown.

#### Scenario: User chooses travel mode
- **WHEN** the popup is open
- **THEN** three icon buttons representing walking, cycling, and driving are visible
- **AND** clicking an icon selects that travel mode
- **AND** the selected icon is visually distinct from unselected icons

### Requirement: Routing call-to-action
The popup SHALL contain a "経路を検索" button that spans enough width to be easily clickable.

#### Scenario: User requests a route
- **WHEN** the popup is open
- **THEN** a clearly visible "経路を検索" button is present
- **AND** clicking it initiates route calculation with the selected travel mode

### Requirement: Close button size
Desktop popup close controls SHALL provide a minimum tap target of 32 x 32 pixels. The mobile bottom sheet SHALL omit an in-sheet close button.

#### Scenario: User closes desktop popup
- **WHEN** the desktop popup is open
- **THEN** the close button is at least 32 x 32 px
- **AND** clicking it closes the popup

#### Scenario: User opens mobile bottom sheet
- **WHEN** the mobile bottom sheet is open
- **THEN** no in-sheet close button is present
- **AND** the bottom sheet remains dismissible through supported mobile dismissal gestures

### Requirement: Reduced padding for content space
The popup SHALL use compact padding to maximize usable content area within its fixed width.

#### Scenario: Popup renders on desktop
- **WHEN** the popup is displayed on a desktop viewport
- **THEN** horizontal and vertical padding is minimized while maintaining readability
- **AND** content does not touch the card edges

### Requirement: Popup transitions are animated
The popup SHALL animate between closed and open states so facility details appear smoothly without obscuring the selected marker or shifting unrelated map controls. On mobile viewports, the bottom sheet SHALL slide from the bottom edge; on desktop viewports, the marker-attached popup SHALL use a subtle enter and exit transition.

#### Scenario: Desktop popup opens
- **WHEN** the user opens a facility popup on a viewport with width >= 640px
- **THEN** the popup appears with a brief transition
- **AND** the transition preserves the popup position above the selected marker

#### Scenario: Mobile bottom sheet opens
- **WHEN** the user opens a facility popup on a viewport with width < 640px
- **THEN** the bottom sheet slides up from the bottom of the viewport
- **AND** the map remains usable after the transition completes

#### Scenario: Popup closes
- **WHEN** the user closes a desktop popup or mobile bottom sheet
- **THEN** the popup content exits with a brief transition
- **AND** the selected facility state is cleared after the close interaction

### Requirement: Popup animations respect reduced motion preferences
Popup and bottom sheet animations SHALL honor the user's reduced motion preference by removing or minimizing motion while preserving the same open and close behavior.

#### Scenario: Reduced motion is enabled
- **WHEN** the user has enabled reduced motion at the system level
- **AND** the user opens or closes a popup
- **THEN** the popup state changes without a large slide, scale, or movement animation
- **AND** all popup content remains available

### Requirement: Popup facility media
The popup and mobile bottom sheet SHALL display approved facility media when media is available for the selected facility.

#### Scenario: Popup opens with media
- **WHEN** the user opens a facility popup for a facility with approved media
- **THEN** the popup or detail panel displays the media without hiding the facility name, address, categories, or route controls
- **AND** attribution or a provider link is available when required

#### Scenario: Popup opens without media
- **WHEN** the user opens a facility popup for a facility without approved media
- **THEN** the popup displays the normal facility information layout without a broken media placeholder

### Requirement: Bottom sheet vertical drag coverage
The bottom sheet SHALL allow vertical drag resizing from the handle, media hero, and content areas where the gesture does not conflict with a more specific interaction.

#### Scenario: User drags up on bottom sheet content
- **WHEN** user starts a vertical drag from a non-interactive area of the bottom sheet content
- **THEN** the bottom sheet height increases up to its maximum height
- **AND** buttons, links, tabs, and route controls are not activated by the drag

#### Scenario: User drags vertically on the image section
- **WHEN** user starts a vertically dominant drag on the image section
- **THEN** the bottom sheet moves vertically instead of changing images

#### Scenario: User swipes horizontally on the image section
- **WHEN** user starts a horizontally dominant swipe on the image section with multiple images available
- **THEN** the image carousel changes to the previous or next image
- **AND** the bottom sheet height does not change because of that horizontal swipe
