# Map Overlay UI

## Purpose

Define the map-level overlay layout and gesture behavior for controls, custom popups, and mobile bottom sheets.

## Requirements

### Requirement: Full-screen map layout
The map SHALL occupy the entire viewport (100vw, 100vh) without being constrained by a side panel.

#### Scenario: User views the application
- **WHEN** the application loads
- **THEN** the map covers the entire browser window

### Requirement: Floating App Header
The application header SHALL float over the top-left corner of the map, containing the search bar and filter controls.

#### Scenario: Header visibility
- **WHEN** the map is displayed
- **THEN** the header is visible floating above the map layer without obscuring the entire map

### Requirement: Popup container transparency and padding reset
The map overlay CSS SHALL preserve transparent background and zero padding on MapLibre popup containers so that custom popup content styling is fully effective.

#### Scenario: Popup renders with custom card
- **WHEN** a MapLibre popup opens
- **THEN** the `.maplibregl-popup-content` element has no default padding or opaque background
- **AND** the custom card styling inside the popup is visible without interference from default MapLibre styles

### Requirement: Expanded bottom sheet hit area
The mobile bottom sheet SHALL capture upward and downward swipe gestures across its surface area, except where explicitly prevented by interactive child elements or internal scrollable areas, similar to standard mobile map applications.

#### Scenario: Swipe on body of bottom sheet
- **WHEN** the user swipes up or down on the main body of the bottom sheet
- **THEN** the sheet responds to the swipe gesture by expanding or collapsing when the gesture is not claimed by internal content scrolling

#### Scenario: Swipe on interactive button
- **WHEN** the user taps or swipes starting from a button inside the bottom sheet
- **THEN** taps remain available to the button
- **AND** vertical gestures do not trigger browser pull-to-refresh or background map movement
