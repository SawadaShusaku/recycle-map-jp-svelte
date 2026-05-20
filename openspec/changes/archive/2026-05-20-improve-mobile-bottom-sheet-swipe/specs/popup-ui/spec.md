## MODIFIED Requirements

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

## ADDED Requirements

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

## MODIFIED Requirements

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
