## ADDED Requirements

### Requirement: Japan-wide cluster display at low zoom
The system SHALL display a single unified cluster representing all of Japan when the current map zoom level is at or below the configured `JAPAN_WIDE_CLUSTER_MAX_ZOOM` threshold.

#### Scenario: Zoom level at or below threshold
- **WHEN** the map zoom level is less than or equal to `JAPAN_WIDE_CLUSTER_MAX_ZOOM`
- **THEN** the map displays one unified Japan-wide cluster instead of prefecture-level administrative summary polygons
- **AND** the cluster shows the total facility count across all active filters

#### Scenario: Zoom level above threshold
- **WHEN** the map zoom level exceeds `JAPAN_WIDE_CLUSTER_MAX_ZOOM`
- **THEN** the map displays the existing prefecture or municipality administrative summary layers according to the current summary level logic
- **AND** the Japan-wide cluster is not rendered

### Requirement: Japan-wide cluster position
The Japan-wide cluster SHALL be positioned at the centroid (mean latitude and longitude) of all currently visible facilities.

#### Scenario: Filtered facilities
- **WHEN** category or area filters are active
- **THEN** the Japan-wide cluster position is calculated from only the facilities matching the active filters
- **AND** the displayed facility count reflects the filtered total

#### Scenario: No visible facilities
- **WHEN** no facilities match the active filters
- **THEN** the Japan-wide cluster is not displayed

### Requirement: Japan-wide cluster interaction
Clicking the Japan-wide cluster SHALL zoom the map to the prefecture cluster zoom level.

#### Scenario: User clicks Japan-wide cluster
- **WHEN** the user clicks the Japan-wide cluster
- **THEN** the map zooms to `PREFECTURE_CLICK_ZOOM`
- **AND** the map centers on the cluster position
- **AND** the facility detail panel is not opened

### Requirement: Configurable zoom threshold
The zoom threshold for displaying the Japan-wide cluster SHALL be defined as a constant in `src/lib/constants/map.ts`.

#### Scenario: Adjusting threshold
- **WHEN** a developer changes the `JAPAN_WIDE_CLUSTER_MAX_ZOOM` constant value
- **THEN** the Japan-wide cluster display behavior updates accordingly without requiring changes to other code
