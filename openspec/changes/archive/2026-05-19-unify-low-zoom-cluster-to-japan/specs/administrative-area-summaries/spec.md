## ADDED Requirements

### Requirement: Administrative summaries hidden at very low zoom
The app SHALL hide all administrative summary polygon and label layers when the map zoom level is at or below `JAPAN_WIDE_CLUSTER_MAX_ZOOM`.

#### Scenario: Japan-wide cluster takes precedence
- **WHEN** the map zoom level is at or below `JAPAN_WIDE_CLUSTER_MAX_ZOOM`
- **THEN** prefecture and municipality administrative summary polygons, outlines, and labels are not rendered
- **AND** the Japan-wide cluster layer is displayed instead

#### Scenario: Administrative summaries resume above threshold
- **WHEN** the map zoom level exceeds `JAPAN_WIDE_CLUSTER_MAX_ZOOM`
- **THEN** administrative summary layers resume rendering according to the existing summary level logic
- **AND** the Japan-wide cluster is hidden
