## ADDED Requirements

### Requirement: Haversine distance calculation
The system SHALL calculate the straight-line distance between two geographic coordinates using the Haversine formula.

#### Scenario: Calculating straight-line distance
- **WHEN** two pairs of latitude and longitude are provided
- **THEN** the system returns the distance in kilometers

### Requirement: Estimated road distance
The system SHALL apply a detour coefficient of 1.3 to the straight-line distance to calculate the estimated road distance.

#### Scenario: Detour coefficient application
- **WHEN** straight-line distance is computed
- **THEN** it is multiplied by 1.3 to derive the estimated road distance

### Requirement: Travel time estimation
The system SHALL calculate travel time based on the estimated road distance and standard speeds for travel modes (Foot: 4.8 km/h, Bicycle: 15 km/h, Car: 30 km/h).

#### Scenario: Foot travel time
- **WHEN** travel mode is foot
- **THEN** time in minutes is `(distance / 4.8) * 60`

#### Scenario: Bicycle travel time
- **WHEN** travel mode is bicycle
- **THEN** time in minutes is `(distance / 15) * 60`

#### Scenario: Car travel time
- **WHEN** travel mode is car
- **THEN** time in minutes is `(distance / 30) * 60`
